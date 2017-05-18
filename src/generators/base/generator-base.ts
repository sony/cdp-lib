import * as path from "path";
import {
    fs,
    glob,
    chalk,
    _,
    $,
    ////
    execCommand,
    getSpinner,
    getTargetDir,
    templatePath,
    copyTpl,
    log,
    debug,
    translate,
} from "../../utils";

import {
    IBaseStructureConfigration,
    IDependency,
    IProjectConfigration,
    IBuildTargetConfigration,
    IWebpackConfigration,
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
    constructor(protected _config: IProjectConfigration) {
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
                return this.runCreate();
            default:
                return Promise.reject("unknown action: " + this._config.action);
        }
    }

    ///////////////////////////////////////////////////////////////////////
    // abstract methods:

    // 既定の directory 構造を返却
    abstract defaultBaseStructure(): IBaseStructureConfigration;

    // action: create のときに呼ばれる
    abstract async create(): Promise<void>;

    // 必要とする task script 一覧を返却. action: create のときに呼ばれる
    abstract get taskList(): string[];

    ///////////////////////////////////////////////////////////////////////
    // protected methods:

    /**
     * 進捗テキストを通知
     *
     * @param {String} key ローカライズリソースキーを指定
     */
    protected progress(key: string): void {
        log(chalk.cyan(translate(key)));
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
                        .replace(/src/,     this._config.structureConfig.src)
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
     * node module の version 取得
     *
     * @param {Promise<string>} version text
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

    /**
     * 既定の開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDependency}
     */
    protected get defaultDevDependencies(): IDependency[] {
        const base = [
            { name: "convert-source-map",   version: undefined, },
            { name: "del",                  version: undefined, },
            { name: "dts-bundle",           version: undefined, },
            { name: "eslint",               version: undefined, },
            { name: "npm-run-all",          version: undefined, },
            { name: "plato",                version: undefined, },
            { name: "remap-istanbul",       version: undefined, },
            { name: "source-map",           version: undefined, },
            { name: "source-map-loader",    version: undefined, },
            { name: "tslint",               version: undefined, },
            { name: "typedoc",              version: undefined, },
            { name: "typescript",           version: undefined, },
            { name: "typescript-formatter", version: undefined, },
        ];
        const minify = [
            { name: "uglify-js",            version: undefined, es: ["es5"],    },
            { name: "uglify-es",            version: undefined, es: ["es2015"], },
        ];

        let extra = [];
        if ((<IBuildTargetConfigration>this._config).minify) {
            extra = extra.concat(minify);
        }
        if (this.isEnableTool("webpack")) {
            extra.push({ name: "webpack", version: undefined, });
        }

        return _.sortBy(base.concat(minify, extra), (depend) => depend.name);
    }

    /**
     * dependencies の template paramaeter を取得
     *
     * @param  {IDependency[]} dependencies 依存関係リスト
     * @return {{ name: string; version: string; last?: boolean; }[]} テンプレートパラメータに指定する配列
     */
    protected async queryDependenciesParam(dependencies: IDependency[]): Promise<{ name: string; version: string; last?: boolean }[]> {
        this.progress("base.create.queryVersion");

        const depends = <{ name: string; version: string; last?: boolean; }[]>dependencies
            .filter((depend) => {
                if (null == depend.es) {
                    return true;
                } else {
                    return !!depend.es.find((esVersion) => {
                        return (<IBuildTargetConfigration>this._config).es === esVersion;
                    });
                }
            });

        const progress = (context: any): any => {
            if ("string" === typeof context && !this._config.settings.silent) {
                const spinner = getSpinner(chalk.yellow(context), 5);
                spinner.start();
                return spinner;
            } else if (context) {
                context.stop(true);
            }
        };

        for (let i = 0, n = depends.length; i < n; i++) {
            if (null == depends[i].version) {
                const spinner = progress(depends[i].name);
                depends[i].version = "^" + await this.queryNodeModuleLatestVersion(depends[i].name);
                progress(spinner);
            }
            if (i === n - 1) {
                depends[i].last = true;
            }
        }

        return depends;
    }

    /**
     * webpack.config.js の template paramaeter を取得
     *
     * @return {String} libraryTarget に指定する文字列
     */
    protected queryWebpackLibraryTarget(): string {
        switch ((<IBuildTargetConfigration>this._config).module) {
            case "commonjs":
                return "commonjs2";
            case "amd":
                return "amd";
            case "umd":
                return "umd";
            default:
                return undefined;
        }
    }

    /**
     * eslintrc の env に指定する template paramaeter を取得
     *
     * @return {Object} env に指定するテンプレートパラメータオブジェクト
     */
    protected queryEsLintEnvParam(): any {
        const compileSetting = <IBuildTargetConfigration>this._config;
        return {
            es6: "es5" !== compileSetting.es,
            node: "web" !== compileSetting.env,
        };
    }

    /**
     * IBuildTargetConfigration.tools プロパティの指定状況を取得
     *
     * @param  {String}  name ツール名を指定
     * @return {Boolean} true: 指定されている / false: 指定されていない
     */
    protected isEnableTool(name: string): boolean {
        return !!(<IBuildTargetConfigration>this._config).tools.find((tool) => name === tool);
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * create 処理のエントリ
     */
    private async runCreate(): Promise<void> {
        await this.createBase();
        await this.create();
    }

    //___________________________________________________________________________________________________________________//

    /**
     * 共通の create 処理
     */
    private async createBase(): Promise<void> {
        this.progress("base.create.foundation");
        await this.createProjectDir();
        await this.copyBaseStructure();
        await this.copyCommonFiles();
        await this.copyTaskScripts();
    }

    /**
     * プロジェクトディレクトリの作成
     */
    private createProjectDir(): void {
        if (fs.existsSync(this.rootDir)) {
            throw Error(translate("base.create.error.alreadyExist"));
        }
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
                    path.join(dstDir, "LICENSE"),
                );
                break;
            case "MIT":
                copyTpl(
                    path.join(srcDir, "_LICENSE.MIT"),
                    path.join(dstDir, "LICENSE"),
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

        // build tools: webpack
        if (this.isEnableTool("webpack")) {
            const param: IWebpackConfigration = {
                node: (() => {
                    switch ((<IBuildTargetConfigration>this._config).env) {
                        case "node":
                            return true;
                        default:
                            return false;
                    }
                })(),
                guide: true,
            };
            copyTpl(
                path.join(srcDir, "tools", "_webpack.config.js"),
                path.join(dstDir, "webpack.config.js"),
                param,
                { delimiters: "<% %>" }
            );
        }
    }

    /**
     * task script のコピー
     */
    private copyTaskScripts(): void {
        const srcDir = templatePath("base/task");
        const dstDir = path.join(this.rootDir, this._config.structureConfig.task);

        this.taskList.forEach((task) => {
            fs.copySync(
                path.join(srcDir, task),
                path.join(dstDir, task),
            );
        });
    }
}
