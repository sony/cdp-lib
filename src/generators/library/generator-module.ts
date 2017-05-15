/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import {
    IBaseStructureConfigration,
    GeneratorBase,
    Utils,
} from "../base";
import { ILibraryConfigration } from "./interfaces";

const debug = Utils.debug;

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
        const moduleName = this.ensureModuleName(config);
        debug("moduleName: " + moduleName);
        this.copyDirectoryStructure();
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * module 名の保証
     * - 1: moduleName が指定されている場合は使用する
     * - 2: projectName が使用可能な場合はそれを使用する
     * - 3: projectName が使用不可の場合は、index.js を使用する
     */
    private ensureModuleName(config: ILibraryConfigration): string {
        if (null == config.moduleName) {
            if (!/^.*[(\\|\b|/|:|\*|?|\"|<|>|\|)].*$/.test(config.projectName)) {
                config.moduleName = config.projectName + ".js";
            } else {
                config.moduleName = "index.js";
            }
        }
        return config.moduleName;
    }

    /**
     * ディレクトリ構成情報のコピー
     */
    private copyDirectoryStructure(): void {
        this.copyTplDir("library/structure");
    }

    /**
     * devDependencies 情報を生成
     */
    //private async prepareDevDependenciesList(config: ILibraryConfigration): Promise<{ name: string; version: string }[]> {
    //    const devDependencies = [
    //        { name: "convert-source-map", version: undefined, es: "all", },
    //        { name: "del ", version: undefined, es: "all", },
    //        { name: "dts-bundle", version: undefined, es: "all", },
    //        { name: "eslint", version: undefined, es: "all", },
    //        { name: "jasmine-node", version: "^2.0.0", es: "all", },
    //        { name: "npm-run-all", version: undefined, es: "all", },
    //        { name: "plato", version: undefined, es: "all", },
    //        { name: "remap-istanbul", version: undefined, es: "all", },
    //        { name: "source-map", version: undefined, es: "all", },
    //        { name: "source-map-loader", version: undefined, es: "all", },
    //        { name: "tslint", version: undefined, es: "all", },
    //        { name: "typedoc", version: undefined, es: "all", },
    //        { name: "typescript", version: undefined, es: "all", },
    //        { name: "typescript-formatter", version: undefined, es: "all", },
    //        { name: "webpack", version: undefined, es: "all", },
    //    ];
    //}
}
