/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */

import * as path from "path";
import * as os from "os";
import {
    IBaseStructureConfigration,
    IDependency,
    IVisualStudioConfigration,
    GeneratorBase,
    Utils,
} from "../base";
import { ILibraryConfigration } from "./interfaces";

const fs            = Utils.fs;
const $             = Utils.$;
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
        await this.createVisualStudioSolution();
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
            path.join(this.rootDir, this._config.structureConfig.test, "jasmine", _module + ".spec.ts"),
            param,
            { delimiters: "<% %>" }
        );
    }

    /**
     * Visual Studio のソリューションファイル作成
     */
    private async createVisualStudioSolution(): Promise<void> {
        const vsParam = (() => {
            const createGUID = Utils.createGUID;

            const param: IVisualStudioConfigration = $.extend({}, this._config.structureConfig);

            param.projectName = this._config.projectName;
            param.projectGUID = createGUID();
            param.types = param.types.replace("@", "%40"); // escape "@" to "%40"
            param.moduleName = path.basename(this._config.moduleName, ".js");

            // setup bult js group
            param.jsGroup = [
                {
                    relativePath: param.built + "\\",
                    fileName: param.moduleName,
                    d_ts: true,
                    map: true,
                },
            ];

            // setup test js group
            param.tsGroup = [
                {
                    relativePath: param.test + "\\jasmine\\",
                    fileName: param.moduleName + ".spec",
                    map: false,
                },
            ];

            return param;
        })();

        // .sln
        copyTpl(
            path.join(templatePath("base/visual.studio"), "_solution.sln.tpl"),
            path.join(this.rootDir, vsParam.projectName + ".sln"),
            vsParam,
            { delimiters: "<% %>" }
        );

        // .csproj
        const createProj = (() => {
            const toXmlString = (file: string) => {
                const hogan = Utils.hogan;
                const normalizeText = Utils.normalizeText;
                const options = {
                    eol: os.EOL,
                    bom: true,
                    delimiters: "{{ }}",
                };

                const tpl = path.join(templatePath("base/visual.studio"), file);
                const jst = hogan.compile(normalizeText(fs.readFileSync(tpl).toString(), { eol: "\n", bom: false }), options);
                return jst.render(vsParam);
            };

            const toXmlDOM = (file: string) => {
                return $($.parseXML(toXmlString(file)));
            };

            const toXmlNode = (file: string) => {
                return Utils.str2XmlNode(toXmlString(file));
            };

            const $proj = toXmlDOM("_project.csproj.tpl");
            const $gpTS = toXmlNode("_ts.item.group.tpl");
            const $gpJS = toXmlNode("_js.item.group.tpl");

            $proj
                .find("ItemGroup")
                .last()
                .after($gpTS)
                .after($gpJS)
                ;

            const formatXML = Utils.formatXML;
            const dstPath = path.join(this.rootDir, vsParam.projectName + ".csproj");
            debug(Utils.xmlNode2Str($proj));
            fs.writeFileSync(dstPath, formatXML(Utils.xmlNode2Str($proj)));
        })();
    }
}
