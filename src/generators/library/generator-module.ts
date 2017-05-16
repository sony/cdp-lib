/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import * as path from "path";
import {
    IBaseStructureConfigration,
    IDependency,
    GeneratorBase,
    Utils,
} from "../base";
import { ILibraryConfigration } from "./interfaces";

const fs            = Utils.fs;
const _             = Utils._;
const debug         = Utils.debug;
const templatePath  = Utils.templatePath;
const copyTpl       = Utils.copyTpl;

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
    async create(): Promise<void> {
        await this.ensureModuleName();
        await this.createDirectoryStructure();
        await this.createPackageJSON();
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
    // protected methods:

    /**
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDevDependencies}
     */
    protected get devDependencies(): IDependency[] {
        // TODO: Node/Browser で切り替え
        const depends = super.devDependencies.concat([
            { name: "jasmine-node", version: "^2.0.0",  },
            { name: "webpack",      version: undefined, },
        ]);

        return _.sortBy(depends, (depend) => {
            return depend.name;
        });
    }

    ///////////////////////////////////////////////////////////////////////
    // private methods:

    /**
     * configration にアクセス
     */
    private get config(): ILibraryConfigration {
        return <ILibraryConfigration>this._config;
    }

    /**
     * module 名の保証
     * - 1: moduleName が指定されている場合は使用する
     * - 2: projectName が使用可能な場合はそれを使用する
     * - 3: projectName が使用不可の場合は、index.js を使用する
     */
    private ensureModuleName(): string {
        if (null == this.config.moduleName) {
            if (!/^.*[(\\|\s|/|:|\*|?|\"|<|>|\|)].*$/.test(this.config.projectName)) {
                this.config.moduleName = this.config.projectName + ".js";
            } else {
                this.config.moduleName = "index.js";
            }
        }
        debug("moduleName: " + this.config.moduleName);
        return this.config.moduleName;
    }

    /**
     * ディレクトリ構成情報のコピー
     */
    private createDirectoryStructure(): void {
        this.copyTplDir("library/structure");
    }

    /**
     * package.json の作成
     */
    private async createPackageJSON(): Promise<void> {
        if (null == this.config.devDependencies) {
            this.config.devDependencies = await this.queryDevDependenciesParam();
        }
        copyTpl(
            path.join(templatePath("library"), "_package.json"),
            path.join(this.rootDir, "package.json"),
            this._config,
            { delimiters: "<% %>" }
        );
    }
}
