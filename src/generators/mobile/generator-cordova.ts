/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import * as path from "path";
import * as os from "os";
import {
    fs,
    glob,
    $,
    _,
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
            await this.mergeCordovaScaffold();
            await this.addCordovaExtentionFiles();
            await this.addCordovaPlatforms();
            await this.chdir("..");
        } else {
            // TODO:
        }
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

    private async mergeCordovaScaffold(): Promise<void> {
        debug("mergeCordovaScaffold");
    }

    private async addCordovaExtentionFiles(): Promise<void> {
        debug("addCordovaExtentionFiles");
    }

    private async addCordovaPlatforms(): Promise<void> {
        debug("addCordovaPlatforms");
    }

    //___________________________________________________________________________________________________________________//
}
