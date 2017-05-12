/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { IBaseStructureConfigration, GeneratorBase } from "../base";
import { ILibraryConfigration } from "./interfaces";

/**
 * @class GeneratorModule
 * @brief Library Module 用 Generator クラス
 */
export class GeneratorModule extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure(): IBaseStructureConfigration {
        return {
            src: "src",
            pkg: "dist",
            built: "built",
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
    async create(config: ILibraryConfigration): Promise<void> {
        // TODO:
        console.log("check.");
    }
}
