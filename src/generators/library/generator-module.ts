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
const glob          = Utils.glob;
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
            temp: ".temp",
        };
    }

    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    async create(): Promise<void> {
        await this.ensureModuleProps();
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
            "bundle-finalizer.js",
            "remap-coverage.js",
        ];
    }

    ///////////////////////////////////////////////////////////////////////
    // protected methods:

    /**
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDependency}
     */
    protected get defaultDevDependencies(): IDependency[] {
        const depends = super.defaultDevDependencies.concat([
            { name: "@types/jasmine",       version: undefined, },
            { name: "dts-bundle",           version: undefined, },
            { name: "typescript-formatter", version: undefined, },
        ]);

        const extra = [];
        if (this.config.nodejs) {
            extra.push({ name: "jasmine-node", version: "^2.0.0", });
        } else {
            extra.push({ name: "requirejs", version: undefined, });
        }

        return _.sortBy(depends.concat(extra), (depend) => depend.name);
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
     * module 名, main ファイル名の保証
     * - 1: moduleName が指定されている場合は使用する
     * - 2: projectName が使用可能な場合はそれを使用する
     * - 3: projectName が使用不可の場合は、"-" つなぎ文字列を生成する
     */
    private ensureModuleProps(): void {
        // module name
        if (null == this.config.moduleName) {
            if (!/^.*[(\\|\s|/|:|*|?|"|<|>||)].*$/.test(this.config.projectName)) {
                this.config.moduleName = this.config.projectName;
            } else {
                this.config.moduleName = _.trim(_.dasherize(this.config.projectName), "-");
            }
        }
        debug("moduleName: " + this.config.moduleName);

        // main file name
        if (null == this.config.mainBaseName) {
            this.config.mainBaseName = this.config.moduleName;
        }
        debug("mainBaseName: " + this.config.mainBaseName);
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

        // tsconfig
        if (!this.config.outputSameDir) {
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
                path.join(this.rootDir, this._config.structureConfig.test, "unit", "tsconfig.json"),
                this._config,
                { delimiters: "<% %>", bom: false, }
            );
        } else {
            // main tsconfig.json
            copyTpl(
                path.join(templatePath("library"), "_tsconfig.output-same-dir.json"),
                path.join(this.rootDir, "tsconfig.json"),
                this._config,
                { delimiters: "<% %>", bom: false, }
            );
        }

        // eslintrc.json
        copyTpl(
            path.join(templatePath("library"), "_eslintrc.json"),
            path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"),
            this.queryEsLintEnvParam(),
            { delimiters: "<% %>", bom: false, }
        );

        // testem
        if (!this.config.nodejs) {
            copyTpl(
                path.join(templatePath("library/tools/testem"), "_testem.json"),
                path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"),
                this._config,
                { delimiters: "<% %>", bom: false, }
            );

            const testemStuffPath = templatePath("library/tools/testem/runner");

            glob.sync("**", {
                cwd: testemStuffPath,
                nodir: true,
            })
                .forEach((file) => {
                    fs.copySync(
                        path.join(testemStuffPath, file),
                        path.join(this.rootDir, this._config.structureConfig.test, "runner", file)
                    );
                });
        }

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
        this.config.devDependencies = await this.queryDependenciesParam(this.config.devDependencies || this.defaultDevDependencies);
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
            path.join(this.rootDir, this._config.structureConfig.test, "unit", _module + ".spec.ts"),
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

            param.projectName       = this._config.projectName;
            param.projectGUID       = createGUID();
            param.types             = param.types.replace("@", "%40"); // escape "@" to "%40"
            param.mainBaseName      = this._config.mainBaseName;
            param.license           = !this._config.private;

            // tools
            param.webpack = this.isEnableTool("webpack");
            param.testem = !this.config.nodejs;

            param.outputSameDir = this.config.outputSameDir;

            // setup built js group
            param.jsGroup = [];
            if (!param.outputSameDir) {
                param.jsGroup.push({
                    relativePath: param.built + "\\",
                    fileName: param.mainBaseName,
                    dependee: true,
                    d_ts: true,
                    map: true,
                    min_map: false,
                });
            }
            if (this.config.minify) {
                // setup pkg group
                param.jsGroup.push({
                    relativePath: param.pkg + "\\",
                    fileName: param.mainBaseName,
                    dependee: false,
                    d_ts: false,
                    map: false,
                    min_map: true,
                });
            }

            // setup test js group
            param.tsGroup = [
                {
                    relativePath: param.test + "\\unit\\",
                    fileName: param.mainBaseName + ".spec",
                    dependee: true,
                    map: this.config.outputSameDir,
                },
            ];
            if (param.outputSameDir) {
                param.tsGroup.push({
                    relativePath: param.built + "\\",
                    fileName: param.mainBaseName,
                    dependee: false,
                    map: true,
                });
            }

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
        (() => {
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
