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
    async create(config: IWebAppConfigration): Promise<void> {
        // TODO:
        return Promise.reject("under construction.");
    }
}
