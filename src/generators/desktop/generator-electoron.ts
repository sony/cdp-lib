/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import { IBaseStructureConfigration, GeneratorBase } from "../base";
import { IDesktopAppConfigration } from "./interfaces";

/**
 * @class GeneratorElectron
 * @brief Desktop Electron 用 Generator クラス
 */
export class GeneratorElectron extends GeneratorBase {

    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase

    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure(): IBaseStructureConfigration {
        return {
            src: "app",
            pkg: "www/app", // TODO: 暫定
            built: "app",
            doc: "docs",
            task: "tasks",
            test: "tests",
            types: "@types",
            srcConfig: {
                script: "scripts",
                stylesheet: "stylesheets",
                template: "templates",
            },
        };
    }

    /**
     * create action entry
     * @param {IDesktopAppConfigration} config コンフィグ設定
     */
    async create(config: IDesktopAppConfigration): Promise<void> {
        // TODO:
        return Promise.reject("under construction.");
    }
}
