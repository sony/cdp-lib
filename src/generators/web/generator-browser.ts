/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { IBaseStructureConfigration, GeneratorBase } from "../base";
import { IWebAppConfigration } from "./interfaces";

/**
 * @class GeneratorBrowser
 * @brief Web Browser 用 Generator クラス
 */
export class GeneratorBrowser extends GeneratorBase {

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
            "build-ts-clean.js",
            "build-ts-normalize.js",
        ];
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * configration にアクセス
     */
    private get config(): IWebAppConfigration {
        return <IWebAppConfigration>this._config;
    }
}
