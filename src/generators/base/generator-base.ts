import * as path from "path";
import {
    fs,
    glob,
    chalk,
    _,
    $,
    ////
    execCommand,
    getTargetDir,
    templatePath,
    copyTpl,
    log,
    debug,
    translate,
} from "../../utils";

import {
    IBaseStructureConfigration,
    IProjectConfigration,
} from "./interfaces";

/**
 * @class GeneratorBase
 * @brief すべての Generator の既定クラス
 */
export abstract class GeneratorBase {

    private _projectRootDir: string;

    /**
     * constructor
     *
     * @param {IProjectConfigration} config コンフィグ
     */
    constructor(private _config: IProjectConfigration) {
        this._projectRootDir = getTargetDir() ?
            getTargetDir() :
            path.join(process.cwd(), this._config.projectName);
        this._config.structureConfig = $.extend({}, this.defaultBaseStructure(), this._config.structureConfig);

        debug(JSON.stringify(this._config, null, 4));
    }

    ///////////////////////////////////////////////////////////////////////
    // pubic methods:

    /**
     * 処理開始 (エントリ)
     *
     */
    public run(): Promise<void> {
        switch (this._config.action) {
            case "create":
                return this.runCreate(this._config);
            default:
                return Promise.reject("unknown action: " + this._config.action);
        }
    }

    ///////////////////////////////////////////////////////////////////////
    // abstract methods:

    // 既定の directory 構造を返却
    abstract defaultBaseStructure(): IBaseStructureConfigration;

    // action: create のときに呼ばれる
    abstract async create(config: IProjectConfigration): Promise<void>;

    ///////////////////////////////////////////////////////////////////////
    // protected methods:

    /**
     * 進捗テキストを通知
     *
     * @param {String} key ローカライズリソースキーを指定
     */
    protected progress(key: string): void {
        log(chalk.green(translate(key)));
    }

    /**
     * work directory の変更
     *
     * @param {String} directory target directory.
     */
    protected chdir(directory: string): void {
        process.chdir(directory);
    }

    /**
     * project root directory の取得
     *
     * @param {String} directory target directory.
     */
    protected get rootDir(): string {
        return this._projectRootDir;
    }

    /**
     * template directory を指定して配下のファイルをコピー
     * IBaseStructureConfigration の設定が反映される
     *
     * @param {String} path    ターゲットを指定. null の場合は、templates を返却
     * @param {String} dstRoot コピー先を指定. 指定が無い場合は rootDir が設定
     */
    protected copyTplDir(target: string, dstRoot?: string, options?: glob.IOptions): void {
        dstRoot = dstRoot || this.rootDir;
        options = $.extend({
            cwd: templatePath(target),
            nodir: true,
            dot: true,
        }, options);

        glob.sync("**", options)
            .forEach((file) => {
                const dst = path.join(dstRoot,
                    file
                        .replace(/src/, this._config.structureConfig.src)
                        .replace(/pkg/,     this._config.structureConfig.pkg)
                        .replace(/built/,   this._config.structureConfig.built)
                        .replace(/doc/,     this._config.structureConfig.doc)
                        .replace(/task/,    this._config.structureConfig.task)
                        .replace(/test/,    this._config.structureConfig.test)
                        .replace(/types/,   this._config.structureConfig.types)
                );
                fs.copySync(path.join(templatePath(target), file), dst);
        });
    }

    /**
     * project root directory の取得
     *
     * @param {String} directory target directory.
     */
    protected queryNodeModuleLatestVersion(name: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let version: string;
            execCommand("npm", ["info", name, "version"], {
                stdio: "pipe",
                spinner: null,
                stdout: (data: string) => {
                    version = _.trim(data);
                },
            })
                .then(() => {
                    resolve(version);
                })
                .catch((reason) => {
                    reject(reason);
                });
        });
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * create 処理のエントリ
     */
    private async runCreate(config: IProjectConfigration): Promise<void> {
        await this.createBase();
        await this.create(config);
    }

    //___________________________________________________________________________________________________________________//

    /**
     * 共通の create 処理
     */
    private async createBase(): Promise<void> {
        await this.createProjectDir();
        await this.copyBaseStructure();
        await this.copyCommonFiles();
    }

    /**
     * プロジェクトディレクトリの作成
     */
    private createProjectDir(): void {
        fs.mkdirsSync(this.rootDir);
    }

    /**
     * 共通構成情報のコピー
     */
    private copyBaseStructure(): void {
        this.copyTplDir("base/structure");
    }

    /**
     * 基本ファイルのコピー
     * template のコピーも行う
     */
    private copyCommonFiles(): void {
        const srcDir = templatePath("base");
        const dstDir = this.rootDir;

        // .npmignore
        copyTpl(
            path.join(srcDir, ".npmignore"),
            path.join(dstDir, ".npmignore"),
            this._config.structureConfig
        );

        // BANNER
        fs.copySync(
            path.join(srcDir, "_BANNER"),
            path.join(dstDir, "BANNER"),
        );

        // LICENSE
        switch (this._config.license) {
            case "Apache-2.0":
                fs.copySync(
                    path.join(srcDir, "_LICENSE.Apache-2.0"),
                    path.join(dstDir, ".LICENSE"),
                );
                break;
            case "MIT":
                copyTpl(
                    path.join(srcDir, "_LICENSE.MIT"),
                    path.join(dstDir, ".LICENSE"),
                    this._config.copyright
                );
                break;
            default:
                break;
        }

        // NOTICE
        fs.copySync(
            path.join(srcDir, "_NOTICE"),
            path.join(dstDir, "NOTICE"),
        );
    }
}
