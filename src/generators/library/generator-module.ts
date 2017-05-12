/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { GeneratorBase } from "../base";
import { ILibraryConfigration } from "./interfaces";

/**
 * @class GeneratorModule
 * @brief Library Module 用 Generator クラス
 */
export class GeneratorModule extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    create(config: ILibraryConfigration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // TODO:
            reject("under construction.");
        });
    }
}
