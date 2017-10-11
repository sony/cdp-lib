import * as path from "path";
import * as os from "os";
import {
    fs,
    glob,
    $,
    _,
    hogan,
    debug,
    templatePath,
    copyTpl,
    execCommand,
    str2XmlNode,
    xmlNode2Str,
    normalizeText,
    formatXML,
    createGUID,
} from "../../utils";
import {
    IBaseStructureConfigration,
    IDependency,
    IVisualStudioConfigration,
    GeneratorBase,
} from "../base";
import { IMobileAppConfigration } from "./interfaces";

/**
 * @class GeneratorCordova
 * @brief Mobile Cordova 用 Generator クラス
 */
export class GeneratorCordova extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure(): IBaseStructureConfigration {
        return {
            src: "app",
            pkg: "www",
            built: "app",
            doc: "docs",
            task: "tasks",
            test: "tests",
            types: "@types",
            temp: ".temp",
            lib: "lib",
            external: "external",
            porting: "porting",
            res: "res",
            srcConfig: {
                script: "scripts",
                stylesheet: "stylesheets",
                template: "templates",
            },
        };
    }

    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    async create(): Promise<void> {
        debug(JSON.stringify(this.config, null, 4));

        if (this.isEnableCordova()) {
            await this.chdir(this.rootDir);
            await this.createCordovaScaffold();
            await this.updateConfigXML();
            await this.addCordovaPlatforms();
            await this.addCordovaPlugins();
            await this.addCordovaExtentionFiles();
            await this.cacheCordovaPackageJSON();
            await this.chdir("..");
        }

        await this.createDirectoryStructure();
        await this.createProjectSettings();
        await this.createSourceTemplate();
        await this.createVisualStudioSolution();
    }

    /**
     * 必要とする task script 一覧を返却. action: create のときに呼ばれる
     */
    get taskList(): string[] {
        return [
            "banner.js",
            "clean.js",
            "command.js",
            "external-rearrange.js",
            "minify.js",
            "srcmap.js",
            "bundle-finalizer.js",
            "remap-coverage.js",
        ];
    }

    ///////////////////////////////////////////////////////////////////////
    // protected methods:

    /**
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDependency}
     */
    protected get defaultDevDependencies(): IDependency[] {
        const depends = super.defaultDevDependencies.concat([
            { name: "@types/jasmine",       version: undefined, },
            { name: "@types/requirejs",     version: undefined, },
            { name: "autoprefixer",         version: undefined, },
            { name: "clean-css",            version: undefined, },
            { name: "fs-extra",             version: undefined, },
            { name: "html-minifier",        version: undefined, },
            { name: "node-sass",            version: undefined, },
            { name: "postcss-cli",          version: undefined, },
            { name: "smartwatch",           version: undefined, },
        ]);

        const extra = [];
        this.config.devDependencies.forEach((depend) => {
            extra.push({ name: depend.name, version: depend.version, });
        });

        if (this.isEnableCordova()) {
            extra.push({ name: "@types/cordova", version: undefined, });
        }

        return _.sortBy(depends.concat(extra), (depend) => depend.name);
    }

    /**
     * eslintrc に指定する template paramaeter を取得
     *
     * @return {Object} テンプレートパラメータオブジェクト
     */
    protected queryEsLintEnvParam(): any {
        const base = super.queryEsLintEnvParam();
        return {
            ...base,
            ...{
                cordova: this.isEnableCordova(),
                hammerjs: this.isInstallationTarget("hammerjs"),
                iscroll: this.isInstallationTarget("iscroll"),
                flipsnap: this.isInstallationTarget("flipsnap"),
            },
        };
    }

    /**
     * tsconfig.base に指定する template paramaeter を取得
     *
     * @return {Object} テンプレートパラメータオブジェクト
     */
    protected queryTsConfigBaseParam(): any {
        return {
            ...this._config,
            ...{
                cordova: this.isEnableCordova(),
            },
        };
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDependency}
     */
    private get defaultDependencies(): IDependency[] {
        const depends = [
            { name: "@cdp/mobile",  version: undefined, },
            { name: "backbone",     version: undefined, },
            { name: "jquery",       version: undefined, },
            { name: "requirejs",    version: undefined, },
            { name: "underscore",   version: undefined, },
        ];

        const extra = [];
        this.config.dependencies.forEach((depend) => {
            extra.push({ name: depend.name, version: depend.version, });
        });

        return _.sortBy(depends.concat(extra), (depend) => depend.name);
    }

    /**
     * configration にアクセス
     */
    private get config(): IMobileAppConfigration {
        return <IMobileAppConfigration>this._config;
    }

    /**
     * cordova の有効/無効チェック
     *
     * @returns true: 有効 / false: 無効
     */
    private isEnableCordova(): boolean {
        return (0 < this.config.platforms.length);
    }

    /**
     * lib/porting の設定状況のチェック
     *
     * @param target
     * @returns true: 設定 / false: 未設定
     */
    private hasStructureOf(target: "lib" | "porting"): boolean {
        return (this.config.projectStructure && 0 <= this.config.projectStructure.indexOf(target));
    }

    /**
     * インストール対象/非対象チェック
     *
     * @param name    [in] モジュール名
     * @param depends [in] 検索対象 (既定 this.config.dependencies)
     * @returns true: 対象 / false: 非対象
     */
    private isInstallationTarget(name: string, depends: IDependency[] = this.config.dependencies): boolean {
        return !!depends.find((depend) => name === depend.name);
    }

    //___________________________________________________________________________________________________________________//

    /**
     * cordova を用いたプロジェクト作成
     */
    private async createCordovaScaffold(): Promise<void> {
        this.progress("mobile.create.cordova.createCordovaScaffold");
        debug("createCordovaScaffold");

        // `$ cordova create cool-mobile com.sony.cdp.coolmobile "Cool Mobile"`
        await execCommand("cordova", ["create", this.config.projectName, this.config.appId, this.config.appName]);

        // remove files
        glob.sync("www/**/*", {
            cwd: this.config.projectName,
        }).forEach((file) => {
            fs.removeSync(path.join(this.config.projectName, file));
        });
        fs.removeSync(path.join(this.config.projectName, "res"));
        fs.removeSync(path.join(this.config.projectName, ".npmignore"));

        // move root directory
        fs.copySync(this.config.projectName, "./");
        fs.removeSync(this.config.projectName);
    }

    /**
     * config.xml の修正
     */
    private async updateConfigXML(): Promise<void> {
        this.progress("mobile.create.cordova.updateConfigXml");
        debug("updateConfigXML");

        const configXmlPath = path.join(process.cwd(), "config.xml");
        const $configXmlDom = $(str2XmlNode(fs.readFileSync(configXmlPath).toString()));

        $configXmlDom
            .find("widget")
            .attr("version", this.config.version)
            .attr("ios-CFBundleIdentifier", this.config.appId)
            .prepend(str2XmlNode(`
                <preference name="DisallowOverscroll" value="true"/>
                <preference name="KeyboardDisplayRequiresUserAction" value="false"/>
                <preference name="BackgroundColor" value="0xff000000" />
            `))
            ;

        // remove cordova team information
        $configXmlDom
            .find("description")
            .remove();
        $configXmlDom
            .find("author")
            .remove();

        fs.writeFileSync(configXmlPath, formatXML(xmlNode2Str($configXmlDom)));
    }

    /**
     * platform 追加
     */
    private async addCordovaPlatforms(): Promise<void> {
        debug("addCordovaPlatforms");

        const targets = this.config.platforms.slice();

        const index = targets.indexOf("ios");
        if (0 <= index && "darwin" !== process.platform) {
            this.warn("mobile.create.cordova.iOSWarning");
            targets.splice(index, 1);
            if (targets.length <= 0) {
                return Promise.resolve();
            }
        }

        this.progress("mobile.create.cordova.addPlatforms");

        // `$ cordova platform add android ios`
        await execCommand("cordova", ["platform", "add"].concat(targets));
    }

    /**
     * plugin 追加
     */
    private async addCordovaPlugins(): Promise<void> {
        this.progress("mobile.create.cordova.addPlugins");
        debug("addCordovaPlugins");

        /*
         * I/F は複数のプラグインを一括で追加することが可能だが、
         * cordova version を判定しているプラグインは誤判定することがあるため、
         * 1つずつ追加する
         *
         * 以下の不具合に類似する現象
         * https://issues.apache.org/jira/browse/CB-12663
         */
        for (let i = 0, n = this.config.cordova_plugin.length; i < n; i++) {
            // `$ cordova plugin add cordova-plugin-inappbrowser`
            await execCommand("cordova", ["plugin", "add", this.config.cordova_plugin[i].name]);
        }
    }

    /**
     * cordova project に追加するリソースをコピー
     */
    private async addCordovaExtentionFiles(): Promise<void> {
        this.progress("mobile.create.cordova.addExtensions");
        debug("addCordovaExtentionFiles");
        this.copyTplDir("mobile/cordova");
    }

    /**
     * cordova が生成した package.json をキャッシュ
     */
    private async cacheCordovaPackageJSON(): Promise<void> {
        if (fs.existsSync("./package.json")) {
            this.config.cordovaPackageJson = JSON.parse(fs.readFileSync("./package.json").toString());

            // remove cordova team information
            delete this.config.cordovaPackageJson.name;
            delete this.config.cordovaPackageJson.version;
            delete this.config.cordovaPackageJson.displayName;
            delete this.config.cordovaPackageJson.main;
            delete this.config.cordovaPackageJson.scripts;
            delete this.config.cordovaPackageJson.author;
            delete this.config.cordovaPackageJson.description;
            delete this.config.cordovaPackageJson.license;

            // ファイルはいったん削除
            fs.removeSync("./package.json");
        }
    }

    //___________________________________________________________________________________________________________________//

    /**
     * ディレクトリ構成情報のコピー
     */
    private createDirectoryStructure(): void {
        this.progress("mobile.create.app.createDirectoryStructure");
        debug("createDirectoryStructure");

        // app base structure
        this.copyTplDir("mobile/structure/base");

        // lib
        if (this.hasStructureOf("lib")) {
            this.copyTplDir(
                "mobile/structure/lib",
                path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.lib)
            );
        }

        // porting
        if (this.hasStructureOf("porting")) {
            this.copyTplDir(
                "mobile/structure/porting",
                path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.porting)
            );

            // create: dev/porting/@types
            fs.copySync(
                templatePath("base/.gitkeep"),
                path.join(
                    this.rootDir,
                    this.config.structureConfig.src,
                    this.config.structureConfig.porting,
                    this.config.structureConfig.types,
                    ".gitkeep"
                )
            );

            const PLATFORMS_ROOT = path.join(this.rootDir, "platforms");
            fs.readdirSync(PLATFORMS_ROOT)
                .forEach((platform) => {
                    if (fs.statSync(path.join(PLATFORMS_ROOT, platform)).isDirectory()) {
                        this.copyTplDir(
                            "mobile/structure/porting",
                            path.join(PLATFORMS_ROOT, platform, this.config.structureConfig.porting)
                        );
                    }
                });
        }

        // www
        const WWW = path.join(this.rootDir, this.config.structureConfig.pkg);
        if (!fs.existsSync(WWW)) {
            fs.mkdir(WWW);
        }
        fs.copySync(templatePath("base/.gitkeep"), path.join(WWW, ".gitkeep"));

        // task
        glob.sync("**/*", {
            cwd: templatePath("mobile/task"),
        }).forEach((file) => {
            fs.copySync(
                path.join(templatePath("mobile/task"), file),
                path.join(this.rootDir, this.config.structureConfig.task, file)
            );
        });
    }

    /**
     * プロジェクト設定ファイルの作成
     */
    private async createProjectSettings(): Promise<void> {
        this.progress("mobile.create.app.createProjectSettings");
        debug("createProjectSettings");

        // project.config.js
        copyTpl(
            path.join(templatePath("mobile"), "_project.config.js"),
            path.join(this.rootDir, "project.config.js"),
            $.extend({}, this._config, {
                hogan: this.isInstallationTarget("hogan.js"),
                hammerjs: this.isInstallationTarget("hammerjs"),
                iscroll: this.isInstallationTarget("iscroll"),
            }),
            { delimiters: "<% %>" }
        );

        // tsconfig
        // tsconfig.base.json
        copyTpl(
            path.join(templatePath("mobile"), "_tsconfig.base.json"),
            path.join(this.rootDir, "tsconfig.base.json"),
            this.queryTsConfigBaseParam(),
            { delimiters: "<% %>", bom: false, }
        );

        // main tsconfig.json
        copyTpl(
            path.join(templatePath("mobile"), "_tsconfig.json"),
            path.join(this.rootDir, "tsconfig.json"),
            this._config,
            { delimiters: "<% %>", bom: false, }
        );

        // eslintrc.json
        copyTpl(
            path.join(templatePath("mobile"), "_eslintrc.json"),
            path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"),
            this.queryEsLintEnvParam(),
            { delimiters: "<% %>", bom: false, }
        );

        // testem
        copyTpl(
            path.join(templatePath("mobile/tools/testem"), "_testem.json"),
            path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"),
            this._config,
            { delimiters: "<% %>", bom: false, }
        );

        const testemStuffPath = templatePath("mobile/tools/testem/runner");

        glob.sync("**", {
            cwd: testemStuffPath,
            nodir: true,
        })
            .forEach((file) => {
                fs.copySync(
                    path.join(testemStuffPath, file),
                    path.join(this.rootDir, this._config.structureConfig.test, "runner", file)
                );
            });

        // .gitignore
        copyTpl(
            path.join(templatePath("mobile"), "_gitignore"),
            path.join(this.rootDir, ".gitignore"),
            this._config,
            { bom: false, }
        );

        // README.md
        copyTpl(
            path.join(templatePath("mobile"), "_README.md"),
            path.join(this.rootDir, "README.md"),
            $.extend({}, this._config, {
                cordova: this.isEnableCordova(),
                lib: this.hasStructureOf("lib"),
                porting: this.hasStructureOf("porting"),
            }),
            { delimiters: "<% %>" }
        );

        // TODO: templates/mobile/addon からコピーする場合はここで対応

        // package.json
        const resolvedConfig = $.extend(true, {}, this.config);
        resolvedConfig.dependencies = await this.queryDependenciesParam(this.defaultDependencies);
        resolvedConfig.devDependencies = await this.queryDependenciesParam(this.defaultDevDependencies);
        copyTpl(
            path.join(templatePath("mobile"), "_package.json"),
            path.join(this.rootDir, "package.json"),
            resolvedConfig,
            { delimiters: "<% %>", bom: false, }
        );

        // cordovaPackageJSON とマージ
        if (this.config.cordovaPackageJson) {
            const PKG_PATH = path.join(this.rootDir, "package.json");
            const pkg = JSON.parse(fs.readFileSync(PKG_PATH).toString());
            $.extend(true, pkg, this.config.cordovaPackageJson);

            const sortKeys = (target: object): object => {
                const sorted = {};
                Object.keys(target).sort().forEach((key) => {
                    sorted[key] = target[key];
                });
                return sorted;

            };
            pkg.dependencies    = sortKeys(pkg.dependencies);
            pkg.devDependencies = sortKeys(pkg.devDependencies);

            fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2));
        }
    }

    /**
     * ソースの雛形作成
     */
    private async createSourceTemplate(): Promise<void> {
        this.progress("mobile.create.app.createSourceTemplate");
        debug("createSourceTemplate");

        // copy sources
        this.copyTplDir(
            "mobile/src/structure",
            path.join(this.rootDir)
        );

        { // config.ts
            const additional = (() => {
                if (this.config.dependencies.length < 0) {
                    return null;
                }
                const param = {
                    additional: {
                        list: [],
                        listWithCustomName: [],
                    },
                };

                const targets = [...this.config.dependencies, ...this.config.resource_addon];
                targets.forEach((info) => {
                    if (info.fileName || info.venderName) {
                        param.additional.listWithCustomName.push({
                            moduleName: info.alias || info.name,
                            venderName: info.venderName || info.alias || info.name,
                            fileName: info.fileName || info.alias || info.name,
                        });
                    } else {
                        param.additional.list.push({
                            moduleName: info.alias || info.name,
                        });
                    }
                });
                return param;
            })();

            copyTpl(
                path.join(templatePath("mobile/src"), "_config.ts"),
                path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.srcConfig.script, "config.ts"),
                $.extend({}, this._config, additional),
                { delimiters: "<% %>" }
            );
        }

        { // app.ts
            const globals = (() => {
                if (this.config.dependencies.length < 0) {
                    return null;
                }
                const param = {
                    globals: {
                        importsList: [],
                        exportsList: [],
                        hasExports: false,
                    },
                };

                const targets = [...this.config.dependencies, ...this.config.resource_addon];
                targets.forEach((info) => {
                    if (info.globalExport) {
                        param.globals.exportsList.push({
                            globalExport: info.globalExport,
                            moduleName: info.alias || info.name,
                        });
                    } else {
                        param.globals.importsList.push({
                            moduleName: info.alias || info.name,
                        });
                    }
                });
                param.globals.hasExports = (0 < param.globals.exportsList.length);
                return param;
            })();

            copyTpl(
                path.join(templatePath("mobile/src"), "_app.ts"),
                path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.srcConfig.script, "app.ts"),
                globals,
                { delimiters: "<% %>" }
            );
        }

        {// localize resources
            copyTpl(
                path.join(templatePath("mobile/src/_locales"), "_messages.en-US.json"),
                path.join(
                    this.rootDir,
                    this.config.structureConfig.src,
                    this.config.structureConfig.res,
                    "locales",
                    "messages.en-US.json"
                ),
                this.config,
                { delimiters: "<% %>", bom: false, }
            );
            copyTpl(
                path.join(templatePath("mobile/src/_locales"), "_messages.ja-JP.json"),
                path.join(
                    this.rootDir,
                    this.config.structureConfig.src,
                    this.config.structureConfig.res,
                    "locales",
                    "messages.ja-JP.json"
                ),
                this.config,
                { delimiters: "<% %>", bom: false, }
            );
            // remove .gitkeep
            fs.unlinkSync(path.join(
                this.rootDir,
                this.config.structureConfig.src,
                this.config.structureConfig.res,
                ".gitkeep"
            ));
        }

        {// patch.dependencies
            copyTpl(
                path.join(templatePath("mobile/src/_patch.dependencies"), "_index.d.ts"),
                path.join(
                    this.rootDir,
                    this.config.structureConfig.src,
                    this.config.structureConfig.external,
                    this.config.structureConfig.types,
                    "patch.dependencies",
                    "index.d.ts"
                ),
                {
                    hammerjs: this.isInstallationTarget("hammerjs"),
                    flipsnap: this.isInstallationTarget("flipsnap"),
                    iscroll: this.isInstallationTarget("iscroll"),
                }
            );

            // copy patch d.ts
            if (this.isInstallationTarget("hammerjs")) {
                fs.copySync(templatePath("mobile/src/_patch.dependencies/jquery.hammer.d.ts"),
                    path.join(
                        this.rootDir,
                        this.config.structureConfig.src,
                        this.config.structureConfig.external,
                        this.config.structureConfig.types,
                        "patch.dependencies",
                        "jquery.hammer.d.ts"
                    ));
            }
            if (this.isInstallationTarget("flipsnap")) {
                fs.copySync(templatePath("mobile/src/_patch.dependencies/flipsnap.d.ts"),
                    path.join(
                        this.rootDir,
                        this.config.structureConfig.src,
                        this.config.structureConfig.external,
                        this.config.structureConfig.types,
                        "patch.dependencies",
                        "flipsnap.d.ts"
                    ));
            }
            if (this.isInstallationTarget("iscroll")) {
                fs.copySync(templatePath("mobile/src/_patch.dependencies/iscroll.d.ts"),
                    path.join(
                        this.rootDir,
                        this.config.structureConfig.src,
                        this.config.structureConfig.external,
                        this.config.structureConfig.types,
                        "patch.dependencies",
                        "iscroll.d.ts"
                    ));
            }

            // remove .gitkeep
            fs.unlinkSync(path.join(
                this.rootDir,
                this.config.structureConfig.src,
                this.config.structureConfig.external,
                this.config.structureConfig.types,
                ".gitkeep"
            ));
        }

        {// index.html
            copyTpl(
                path.join(templatePath("mobile/src"), "_index.html"),
                path.join(this.rootDir, this.config.structureConfig.src, "index.html"),
                this.config
            );
        }
    }

    /**
     * Visual Studio のソリューションファイル作成
     */
    private async createVisualStudioSolution(): Promise<void> {
        const vsParam = (() => {
            const param: IVisualStudioConfigration = <any>$.extend({}, this._config.structureConfig);

            param.projectName = this._config.projectName;
            param.projectGUID = createGUID();
            param.types = param.types.replace("@", "%40"); // escape "@" to "%40"
            param.license = !this._config.private;

            // external
            (<any>param).cordova    = this.isEnableCordova();
            (<any>param).hogan      = this.isInstallationTarget("hogan.js");
            (<any>param).hammerjs   = this.isInstallationTarget("hammerjs");
            (<any>param).iscroll    = this.isInstallationTarget("iscroll");
            (<any>param).flipsnap   = this.isInstallationTarget("flipsnap");

            // project structure
            (<any>param).enableLib      = this.hasStructureOf("lib");
            (<any>param).enablePorting  = this.hasStructureOf("porting");

            // platforms
            (<any>param).platforms = [...this.config.platforms];

            // setup built ts group
            param.tsGroup = [];
            glob.sync("**/*.ts", {
                cwd: path.join(
                    this.rootDir,
                    param.src,
                    param.srcConfig.script
                ),
            }).forEach((file) => {
                const relativePath = path.join(
                    param.src,
                    param.srcConfig.script,
                    path.dirname(file)
                ).replace(/\//g, "\\") + "\\";
                const fileName = path.basename(file, ".ts");
                param.tsGroup.push({
                    relativePath: relativePath,
                    fileName: fileName,
                    dependee: true,
                    map: false,
                });
            });
            // setup test ts group
            glob.sync("**/*.ts", {
                cwd: path.join(
                    this.rootDir,
                    this.config.structureConfig.test,
                    "unit"
                ),
            }).forEach((file) => {
                const relativePath = param.test + "\\unit\\";
                const fileName = path.basename(file, ".ts");
                param.tsGroup.push({
                    relativePath: relativePath,
                    fileName: fileName,
                    dependee: true,
                    map: false,
                });
            });
            return param;
        })();

        // .sln
        copyTpl(
            path.join(templatePath("base/visual.studio"), "_solution.sln.tpl"),
            path.join(this.rootDir, vsParam.projectName + ".sln"),
            vsParam,
            { delimiters: "<% %>" }
        );

        // .csproj
        (() => {
            const toXmlString = (file: string) => {
                const options = {
                    eol: os.EOL,
                    bom: true,
                    delimiters: "{{ }}",
                };
                const jst = hogan.compile(normalizeText(fs.readFileSync(file).toString(), { eol: "\n", bom: false }), options);
                return jst.render(vsParam);
            };

            const toXmlDOM = (file: string) => {
                return $($.parseXML(toXmlString(file)));
            };

            const toXmlNode = (file: string) => {
                return str2XmlNode(toXmlString(file));
            };

            const $proj = toXmlDOM(path.join(templatePath("mobile/visual.studio"), "_project.csproj.tpl"));
            const $gpTS = toXmlNode(path.join(templatePath("base/visual.studio"), "_ts.item.group.tpl"));

            $proj
                .find("ItemGroup")
                .last()
                .after($gpTS)
                ;

            const dstPath = path.join(this.rootDir, vsParam.projectName + ".csproj");
            debug(xmlNode2Str($proj));
            fs.writeFileSync(dstPath, formatXML(xmlNode2Str($proj)));
        })();

        // web.config
        fs.copySync(templatePath("mobile/visual.studio/_web.config"), path.join(this.rootDir, "web.config"));
        fs.copySync(templatePath("mobile/visual.studio/_web.Debug.config"), path.join(this.rootDir, "web.Debug.config"));
        fs.copySync(templatePath("mobile/visual.studio/_web.Release.config"), path.join(this.rootDir, "web.Release.config"));
    }
}
