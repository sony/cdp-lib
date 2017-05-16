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
        await this.createProjectSettings();
        await this.createSourceTemplate();
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
        const depends = super.devDependencies.concat([
            { name: "@types/jasmine",   version: undefined, },
            { name: "jasmine-node",     version: "^2.0.0",  },
            { name: "webpack",          version: undefined, },
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
     * プロジェクト設定ファイルの作成
     */
    private async createProjectSettings(): Promise<void> {
        // project.config.js
        copyTpl(
            path.join(templatePath("library"), "_project.config.js"),
            path.join(this.rootDir, "project.config.js"),
            this._config,
            { delimiters: "<% %>" }
        );

        // webpack.config.js
        if (null == this.config.webpackLibrary) {
            this.config.webpackLibrary = this.queryWebpackLibraryTarget();
        }
        copyTpl(
            path.join(templatePath("library"), "_webpack.config.js"),
            path.join(this.rootDir, "webpack.config.js"),
            this.config,
            { delimiters: "<% %>" }
        );

        // main tsconfig.json
        copyTpl(
            path.join(templatePath("library"), "_tsconfig.json"),
            path.join(this.rootDir, "tsconfig.json"),
            this._config,
            { delimiters: "<% %>", bom: false, }
        );

        // test tsconfig.json
        copyTpl(
            path.join(templatePath("library"), "_tsconfig.test.json"),
            path.join(this.rootDir, this._config.structureConfig.test, "jasmine", "tsconfig.json"),
            this._config,
            { delimiters: "<% %>", bom: false, }
        );

        // eslintrc.json
        copyTpl(
            path.join(templatePath("library"), "_eslintrc.json"),
            path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"),
            this.queryEsLintEnvParam(),
            { delimiters: "<% %>", bom: false, }
        );

        // .gitignore
        copyTpl(
            path.join(templatePath("library"), ".gitignore"),
            path.join(this.rootDir, ".gitignore"),
            this._config,
            { bom: false, }
        );

        // README.md
        copyTpl(
            path.join(templatePath("library"), "_README.md"),
            path.join(this.rootDir, "README.md"),
            this._config,
            { delimiters: "<% %>" }
        );

        // package.json
        if (null == this.config.devDependencies) {
            this.config.devDependencies = await this.queryDevDependenciesParam();
        }
        copyTpl(
            path.join(templatePath("library"), "_package.json"),
            path.join(this.rootDir, "package.json"),
            this._config,
            { delimiters: "<% %>", bom: false, }
        );
    }

    /**
     * ソースの雛形作成
     */
    private async createSourceTemplate(): Promise<void> {
        const _module = path.basename(this._config.moduleName, ".js");
        const param = {
            sampleClass: _.classify(_module),
            sampleModule: _module,
            built: this._config.structureConfig.built,
        };

        const script = (() => {
            if (this._config.structureConfig.srcConfig) {
                return this._config.structureConfig.srcConfig.script || "";
            }
            return "";
        })();

        // index.ts
        copyTpl(
            path.join(templatePath("library"), "src", "_index.ts"),
            path.join(this.rootDir, this._config.structureConfig.src, script, _module + ".ts"),
            param,
            { delimiters: "<% %>" }
        );

        // index.spec.ts
        copyTpl(
            path.join(templatePath("library"), "src", "_index.spec.ts"),
            path.join(this.rootDir, this._config.structureConfig.test, "jasmine", _module + "spec.ts"),
            param,
            { delimiters: "<% %>" }
        );
    }
}
