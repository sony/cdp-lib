/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { GeneratorBase } from "../base";
import { IWebAppConfigration } from "./interfaces";

/**
 * @class GeneratorBrowser
 * @brief Web Browser 用 Generator クラス
 */
export class GeneratorBrowser extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    create(config: IWebAppConfigration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // TODO:
            reject("under construction.");
        });
    }
}
