/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import * as path from "path";
import * as os from "os";
import {
    IBaseStructureConfigration,
    IDependency,
    IVisualStudioConfigration,
    GeneratorBase,
    Utils,
} from "../base";
import { IMobileAppConfigration } from "./interfaces";

const fs            = Utils.fs;
const glob          = Utils.glob;
const $             = Utils.$;
const _             = Utils._;
const debug         = Utils.debug;
const templatePath  = Utils.templatePath;
const copyTpl       = Utils.copyTpl;

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
        // TODO:
        return Promise.reject("under construction.");
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
}
