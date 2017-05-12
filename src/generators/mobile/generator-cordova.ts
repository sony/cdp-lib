/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { GeneratorBase } from "../base";
import { IMobileAppConfigration } from "./interfaces";

/**
 * @class GeneratorCordova
 * @brief Mobile Cordova 用 Generator クラス
 */
export class GeneratorCordova extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    create(config: IMobileAppConfigration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // TODO:
            reject("under construction.");
        });
    }
}
