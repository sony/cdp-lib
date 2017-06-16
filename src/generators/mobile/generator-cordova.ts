/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import * as path from "path";
import * as os from "os";
import {
    fs,
    glob,
    $,
    _,
    chalk,
    debug,
    templatePath,
    copyTpl,
    execCommand,
    str2XmlNode,
    xmlNode2Str,
    formatXML,
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
        await this.createProjectStructure();
    }

    /**
     * 必要とする task script 一覧を返却. action: create のときに呼ばれる
     */
    get taskList(): string[] {
        return [
            "banner.js",
            "clean.js",
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
            { name: "@types/backbone",      version: undefined, },
            { name: "@types/jasmine",       version: undefined, },
            { name: "@types/jquery",        version: undefined, },
            { name: "@types/requirejs",     version: undefined, },
            { name: "@types/jquery",        version: undefined, },
            { name: "@types/underscore",    version: undefined, },
            { name: "autoprefixer",         version: undefined, },
            { name: "clean-css",            version: undefined, },
            { name: "fs-extra",             version: undefined, },
            { name: "html-minifier",        version: undefined, },
            { name: "node-sass",            version: undefined, },
            { name: "postcss-cli",          version: undefined, },
        ]);

        const extra = [];
        this.config.devDependencies.forEach((depend) => {
            extra.push({ name: depend.name, version: depend.version, });
        });

        return _.sortBy(depends.concat(extra), (depend) => depend.name);
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * configration にアクセス
     */
    private get config(): IMobileAppConfigration {
        return <IMobileAppConfigration>this._config;
    }

    /**
     * プロジェクト構成の作成
     */
    private async createProjectStructure(): Promise<void> {
        const cordovaEnabled = (0 < this.config.platforms.length);

        if (cordovaEnabled) {
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

        const index = this.config.platforms.indexOf("ios");
        if (0 <= index && "darwin" !== process.platform) {
            this.warn("mobile.create.cordova.iOSWarning");
            this.config.platforms.splice(index, 1);
            if (this.config.platforms.length <= 0) {
                return Promise.resolve();
            }
        }

        this.progress("mobile.create.cordova.addPlatforms");

        // `$ cordova platform add android ios`
        await execCommand("cordova", ["platform", "add"].concat(this.config.platforms));
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
            delete this.config.cordovaPackageJson.main;
            delete this.config.cordovaPackageJson.scripts;
            delete this.config.cordovaPackageJson.author;
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
        // app base structure
        this.copyTplDir("mobile/structure/base");

        // lib
        if (this.config.projectStructure && 0 <= this.config.projectStructure.indexOf("lib")) {
            this.copyTplDir(
                "mobile/structure/lib",
                path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.lib)
            );
        }

        // porting
        if (this.config.projectStructure && 0 <= this.config.projectStructure.indexOf("porting")) {
            this.copyTplDir(
                "mobile/structure/porting",
                path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.porting)
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
    }

    /**
     * プロジェクト設定ファイルの作成
     */
    private async createProjectSettings(): Promise<void> {
        //// project.config.js
        //copyTpl(
        //    path.join(templatePath("library"), "_project.config.js"),
        //    path.join(this.rootDir, "project.config.js"),
        //    this._config,
        //    { delimiters: "<% %>" }
        //);

        //// tsconfig
        //if (!this.config.outputSameDir) {
        //    // main tsconfig.json
        //    copyTpl(
        //        path.join(templatePath("library"), "_tsconfig.json"),
        //        path.join(this.rootDir, "tsconfig.json"),
        //        this._config,
        //        { delimiters: "<% %>", bom: false, }
        //    );
        //    // test tsconfig.json
        //    copyTpl(
        //        path.join(templatePath("library"), "_tsconfig.test.json"),
        //        path.join(this.rootDir, this._config.structureConfig.test, "unit", "tsconfig.json"),
        //        this._config,
        //        { delimiters: "<% %>", bom: false, }
        //    );
        //} else {
        //    // main tsconfig.json
        //    copyTpl(
        //        path.join(templatePath("library"), "_tsconfig.output-same-dir.json"),
        //        path.join(this.rootDir, "tsconfig.json"),
        //        this._config,
        //        { delimiters: "<% %>", bom: false, }
        //    );
        //}

        //// eslintrc.json
        //copyTpl(
        //    path.join(templatePath("library"), "_eslintrc.json"),
        //    path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"),
        //    this.queryEsLintEnvParam(),
        //    { delimiters: "<% %>", bom: false, }
        //);

        //// testem
        //if (!this.config.nodejs) {
        //    copyTpl(
        //        path.join(templatePath("library/tools/testem"), "_testem.json"),
        //        path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"),
        //        this._config,
        //        { delimiters: "<% %>", bom: false, }
        //    );

        //    const testemStuffPath = templatePath("library/tools/testem/runner");

        //    glob.sync("**", {
        //        cwd: testemStuffPath,
        //        nodir: true,
        //    })
        //        .forEach((file) => {
        //            fs.copySync(
        //                path.join(testemStuffPath, file),
        //                path.join(this.rootDir, this._config.structureConfig.test, "runner", file)
        //            );
        //        });
        //}

        //// .gitignore
        //copyTpl(
        //    path.join(templatePath("library"), ".gitignore"),
        //    path.join(this.rootDir, ".gitignore"),
        //    this._config,
        //    { bom: false, }
        //);

        //// README.md
        //copyTpl(
        //    path.join(templatePath("library"), "_README.md"),
        //    path.join(this.rootDir, "README.md"),
        //    this._config,
        //    { delimiters: "<% %>" }
        //);

        //// package.json
        //this.config.devDependencies = await this.queryDependenciesParam(this.config.devDependencies || this.defaultDevDependencies);
        //copyTpl(
        //    path.join(templatePath("library"), "_package.json"),
        //    path.join(this.rootDir, "package.json"),
        //    this._config,
        //    { delimiters: "<% %>", bom: false, }
        //);
    }

    /**
     * ソースの雛形作成
     */
    private async createSourceTemplate(): Promise<void> {
        //const _module = path.basename(this._config.moduleName, ".js");
        //const param = {
        //    sampleClass: _.classify(_module),
        //    sampleModule: _module,
        //    built: this._config.structureConfig.built,
        //};

        //const script = (() => {
        //    if (this._config.structureConfig.srcConfig) {
        //        return this._config.structureConfig.srcConfig.script || "";
        //    }
        //    return "";
        //})();

        //// index.ts
        //copyTpl(
        //    path.join(templatePath("library"), "src", "_index.ts"),
        //    path.join(this.rootDir, this._config.structureConfig.src, script, _module + ".ts"),
        //    param,
        //    { delimiters: "<% %>" }
        //);

        //// index.spec.ts
        //copyTpl(
        //    path.join(templatePath("library"), "src", "_index.spec.ts"),
        //    path.join(this.rootDir, this._config.structureConfig.test, "unit", _module + ".spec.ts"),
        //    param,
        //    { delimiters: "<% %>" }
        //);
    }

    /**
     * Visual Studio のソリューションファイル作成
     */
    private async createVisualStudioSolution(): Promise<void> {
        //const vsParam = (() => {
        //    const createGUID = Utils.createGUID;

        //    const param: IVisualStudioConfigration = $.extend({}, this._config.structureConfig);

        //    param.projectName = this._config.projectName;
        //    param.projectGUID = createGUID();
        //    param.types = param.types.replace("@", "%40"); // escape "@" to "%40"
        //    param.mainBaseName = this._config.mainBaseName;
        //    param.license = !this._config.private;

        //    // tools
        //    param.webpack = this.isEnableTool("webpack");
        //    param.testem = !this.config.nodejs;

        //    param.outputSameDir = this.config.outputSameDir;

        //    // setup built js group
        //    param.jsGroup = [];
        //    if (!param.outputSameDir) {
        //        param.jsGroup.push({
        //            relativePath: param.built + "\\",
        //            fileName: param.mainBaseName,
        //            dependee: true,
        //            d_ts: true,
        //            map: true,
        //            min_map: false,
        //        });
        //    }
        //    if (this.config.minify) {
        //        // setup pkg group
        //        param.jsGroup.push({
        //            relativePath: param.pkg + "\\",
        //            fileName: param.mainBaseName,
        //            dependee: false,
        //            d_ts: false,
        //            map: false,
        //            min_map: true,
        //        });
        //    }

        //    // setup test js group
        //    param.tsGroup = [
        //        {
        //            relativePath: param.test + "\\unit\\",
        //            fileName: param.mainBaseName + ".spec",
        //            dependee: true,
        //            map: this.config.outputSameDir,
        //        },
        //    ];
        //    if (param.outputSameDir) {
        //        param.tsGroup.push({
        //            relativePath: param.built + "\\",
        //            fileName: param.mainBaseName,
        //            dependee: false,
        //            map: true,
        //        });
        //    }

        //    return param;
        //})();

        //// .sln
        //copyTpl(
        //    path.join(templatePath("base/visual.studio"), "_solution.sln.tpl"),
        //    path.join(this.rootDir, vsParam.projectName + ".sln"),
        //    vsParam,
        //    { delimiters: "<% %>" }
        //);

        //// .csproj
        //(() => {
        //    const toXmlString = (file: string) => {
        //        const hogan = Utils.hogan;
        //        const normalizeText = Utils.normalizeText;
        //        const options = {
        //            eol: os.EOL,
        //            bom: true,
        //            delimiters: "{{ }}",
        //        };

        //        const tpl = path.join(templatePath("base/visual.studio"), file);
        //        const jst = hogan.compile(normalizeText(fs.readFileSync(tpl).toString(), { eol: "\n", bom: false }), options);
        //        return jst.render(vsParam);
        //    };

        //    const toXmlDOM = (file: string) => {
        //        return $($.parseXML(toXmlString(file)));
        //    };

        //    const toXmlNode = (file: string) => {
        //        return Utils.str2XmlNode(toXmlString(file));
        //    };

        //    const $proj = toXmlDOM("_project.csproj.tpl");
        //    const $gpTS = toXmlNode("_ts.item.group.tpl");
        //    const $gpJS = toXmlNode("_js.item.group.tpl");

        //    $proj
        //        .find("ItemGroup")
        //        .last()
        //        .after($gpTS)
        //        .after($gpJS)
        //        ;

        //    const formatXML = Utils.formatXML;
        //    const dstPath = path.join(this.rootDir, vsParam.projectName + ".csproj");
        //    debug(Utils.xmlNode2Str($proj));
        //    fs.writeFileSync(dstPath, formatXML(Utils.xmlNode2Str($proj)));
        //})();
    }
}
