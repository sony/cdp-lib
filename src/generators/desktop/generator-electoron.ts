/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { GeneratorBase } from "../base";
import { IDesktopAppConfigration } from "./interfaces";

/**
 * @class GeneratorElectron
 * @brief Desktop Electron 用 Generator クラス
 */
export class GeneratorElectron extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * create action entry
     * @param {IDesktopAppConfigration} config コンフィグ設定
     */
    create(config: IDesktopAppConfigration): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // TODO:
            reject("under construction.");
        });
    }
}
