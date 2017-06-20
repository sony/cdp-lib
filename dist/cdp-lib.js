/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-06-20T08:11:59.857Z
 */

module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/     // The module cache
/******/     var installedModules = {};
/******/
/******/     // The require function
/******/     function __webpack_require__(moduleId) {
/******/
/******/         // Check if module is in cache
/******/         if(installedModules[moduleId]) {
/******/             return installedModules[moduleId].exports;
/******/         }
/******/         // Create a new module (and put it into the cache)
/******/         var module = installedModules[moduleId] = {
/******/             i: moduleId,
/******/             l: false,
/******/             exports: {}
/******/         };
/******/
/******/         // Execute the module function
/******/         modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/         // Flag the module as loaded
/******/         module.l = true;
/******/
/******/         // Return the exports of the module
/******/         return module.exports;
/******/     }
/******/
/******/
/******/     // expose the modules object (__webpack_modules__)
/******/     __webpack_require__.m = modules;
/******/
/******/     // expose the module cache
/******/     __webpack_require__.c = installedModules;
/******/
/******/     // define getter function for harmony exports
/******/     __webpack_require__.d = function(exports, name, getter) {
/******/         if(!__webpack_require__.o(exports, name)) {
/******/             Object.defineProperty(exports, name, {
/******/                 configurable: false,
/******/                 enumerable: true,
/******/                 get: getter
/******/             });
/******/         }
/******/     };
/******/
/******/     // getDefaultExport function for compatibility with non-harmony modules
/******/     __webpack_require__.n = function(module) {
/******/         var getter = module && module.__esModule ?
/******/             function getDefault() { return module['default']; } :
/******/             function getModuleExports() { return module; };
/******/         __webpack_require__.d(getter, 'a', getter);
/******/         return getter;
/******/     };
/******/
/******/     // Object.prototype.hasOwnProperty.call
/******/     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/     // __webpack_public_path__
/******/     __webpack_require__.p = "";
/******/
/******/     // Load entry module and return exports
/******/     return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(32));
__export(__webpack_require__(33));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
__export(__webpack_require__(29));
__export(__webpack_require__(5));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(16);
exports.fs = fs;
const glob = __webpack_require__(17);
exports.glob = glob;
const hogan = __webpack_require__(18);
exports.hogan = hogan;
const _l = __webpack_require__(19);
const _s = __webpack_require__(20);
const which = __webpack_require__(21);
exports.which = which;
const uuid = __webpack_require__(22);
exports.uuid = uuid;
const chalk = __webpack_require__(23);
exports.chalk = chalk;
const semverRegex = __webpack_require__(24);
exports.semverRegex = semverRegex;
const cli_spinner_1 = __webpack_require__(25);
exports.Spinner = cli_spinner_1.Spinner;
const $ = (() => {
    const _window = (() => {
        const jsdom = __webpack_require__(26);
        if ("function" === typeof jsdom.JSDOM) {
            return new jsdom.JSDOM().window;
        }
        else {
            return jsdom.jsdom().defaultView;
        }
    })();
    // patch scope:
    ((root) => {
        /*
         * jsdom 9.4.0 - 9.12.0 に実装されている DOMParser は XML の serialize ができないため,
         * xmldom に置き換える
         * jsdom 10.1.0 まで動かないことを確認
         */
        const xmldom = __webpack_require__(27);
        root.DOMParser = xmldom.DOMParser;
        // xmldom には dom.toString() が実装されているが、global にも export する
        global.XMLSerializer = root.XMLSerializer = xmldom.XMLSerializer;
    })(_window);
    return __webpack_require__(28)(_window);
})();
exports.$ = $;
const _m = _l.mixin(_s.exports());
exports._ = _m;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(0);
const libs_1 = __webpack_require__(3);
let _settings = {
    force: false,
    verbose: false,
    silent: false,
    lang: "en-US",
};
let _libPath; // cdp-lib の存在している path
///////////////////////////////////////////////////////////////////////
// exports methods:
/**
 * 設定取得
 *
 * @returns options ログに使用するオプション
 */
function getSettings() {
    return libs_1.$.extend({}, _settings);
}
exports.getSettings = getSettings;
/**
 * 設定指定
 *
 * @param options ログに使用するオプション
 */
function setSettings(settings) {
    if (settings) {
        _settings.force = settings.force || _settings.force;
        _settings.verbose = settings.verbose || _settings.verbose;
        _settings.silent = settings.silent || _settings.silent;
        _settings.targetDir = settings.targetDir || _settings.targetDir;
        _settings.lang = settings.lang || _settings.lang;
    }
    else {
        _settings = {
            force: false,
            verbose: false,
            silent: false,
            lang: "en-US",
        };
    }
}
exports.setSettings = setSettings;
/**
 * "cdp-lib" が存在するパスを取得
 *
 * @returns cdp-lib への path
 */
function getLibPath() {
    if (null == _libPath) {
        const TRY_COUNT = 3;
        let tried = 0;
        _libPath = __dirname;
        while (true) {
            if (TRY_COUNT <= tried) {
                throw Error("lib path is not resolved.");
            }
            _libPath = path.join(_libPath, "..");
            const check = path.join(_libPath, "cdp-lib");
            if (libs_1.fs.pathExistsSync(check)) {
                _libPath = check;
                break;
            }
            tried++;
        }
    }
    return _libPath;
}
exports.getLibPath = getLibPath;
/**
 * 指定された targetDir を取得
 *
 * @returns targetDir への path
 */
function getTargetDir() {
    return _settings.targetDir;
}
exports.getTargetDir = getTargetDir;
/**
 * ログ出力
 * console.log() と同等
 *
 * @param message        出力メッセージ
 * @param optionalParams 付加情報
 */
function log(message, ...optionalParams) {
    if (!_settings.silent) {
        if (0 < optionalParams.length) {
            console.log(message, optionalParams);
        }
        else {
            console.log(message);
        }
    }
}
exports.log = log;
/**
 * 詳細ログ出力
 * console.debug() と同等
 *
 * @param message        出力メッセージ
 * @param optionalParams 付加情報
 */
function debug(message, ...optionalParams) {
    if (!_settings.silent && _settings.verbose) {
        if (0 < optionalParams.length) {
            console.error("DEBUG: " + message, optionalParams);
        }
        else {
            console.error("DEBUG: " + message);
        }
    }
}
exports.debug = debug;
/**
 * 検証
 * console.assert() と同等
 *
 * @param test           検証する式
 * @param message        出力メッセージ
 * @param optionalParams 付加情報
 */
function assert(test, message, ...optionalParams) {
    if (!test) {
        if (_settings.force) {
            if (0 < optionalParams.length) {
                console.warn(message, optionalParams);
            }
            else {
                console.warn(message);
            }
        }
        else {
            if (0 < optionalParams.length) {
                console.error(message, optionalParams);
            }
            else {
                console.error(message);
            }
            process.exit(1);
        }
    }
}
exports.assert = assert;
let _lang;
/**
 * ローカライズ
 *
 * @param key キー文字列
 * @returns 翻訳された文字列
 */
function translate(key) {
    if (!_lang) {
        try {
            _lang = JSON.parse(libs_1.fs.readFileSync(path.join(getLibPath(), "res/locales", "messages." + _settings.lang + ".json"), "utf8").toString());
        }
        catch (error) {
            throw Error("Language resource JSON parse error: " + error.message);
        }
    }
    let resouce = libs_1.$.extend({}, _lang);
    const props = key.split(".");
    while (0 < props.length) {
        const prop = props.shift();
        if (resouce[prop]) {
            resouce = resouce[prop];
        }
        else {
            assert(false, "resouce not found. key: " + key);
            return null;
        }
    }
    return resouce;
}
exports.translate = translate;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const generator_module_1 = __webpack_require__(7);
__export(__webpack_require__(7));
/**
 * generator 生成関数
 */
function newGeneratorLibrary(config) {
    return new generator_module_1.GeneratorModule(config);
}
exports.newGeneratorLibrary = newGeneratorLibrary;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(0);
const os = __webpack_require__(4);
const base_1 = __webpack_require__(1);
const fs = base_1.Utils.fs;
const glob = base_1.Utils.glob;
const $ = base_1.Utils.$;
const _ = base_1.Utils._;
const debug = base_1.Utils.debug;
const templatePath = base_1.Utils.templatePath;
const copyTpl = base_1.Utils.copyTpl;
/**
 * @class GeneratorModule
 * @brief Library Module 用 Generator クラス
 */
class GeneratorModule extends base_1.GeneratorBase {
    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase
    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure() {
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
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureModuleProps();
            yield this.createDirectoryStructure();
            yield this.createProjectSettings();
            yield this.createSourceTemplate();
            yield this.createVisualStudioSolution();
        });
    }
    /**
     * 必要とする task script 一覧を返却. action: create のときに呼ばれる
     */
    get taskList() {
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
    get defaultDevDependencies() {
        const depends = super.defaultDevDependencies.concat([
            { name: "@types/jasmine", version: undefined, },
            { name: "dts-bundle", version: undefined, },
            { name: "typescript-formatter", version: undefined, },
        ]);
        const extra = [];
        if (this.config.nodejs) {
            extra.push({ name: "jasmine-node", version: "^2.0.0", });
        }
        else {
            extra.push({ name: "requirejs", version: undefined, });
        }
        return _.sortBy(depends.concat(extra), (depend) => depend.name);
    }
    ///////////////////////////////////////////////////////////////////////
    // private methods:
    /**
     * configration にアクセス
     */
    get config() {
        return this._config;
    }
    /**
     * module 名, main ファイル名の保証
     * - 1: moduleName が指定されている場合は使用する
     * - 2: projectName が使用可能な場合はそれを使用する
     * - 3: projectName が使用不可の場合は、"-" つなぎ文字列を生成する
     */
    ensureModuleProps() {
        // module name
        if (null == this.config.moduleName) {
            if (!/^.*[(\\|\s|/|:|*|?|"|<|>||)].*$/.test(this.config.projectName)) {
                this.config.moduleName = this.config.projectName;
            }
            else {
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
    createDirectoryStructure() {
        this.copyTplDir("library/structure");
    }
    /**
     * プロジェクト設定ファイルの作成
     */
    createProjectSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            // project.config.js
            copyTpl(path.join(templatePath("library"), "_project.config.js"), path.join(this.rootDir, "project.config.js"), this._config, { delimiters: "<% %>" });
            // tsconfig
            if (!this.config.outputSameDir) {
                // main tsconfig.json
                copyTpl(path.join(templatePath("library"), "_tsconfig.json"), path.join(this.rootDir, "tsconfig.json"), this._config, { delimiters: "<% %>", bom: false, });
                // test tsconfig.json
                copyTpl(path.join(templatePath("library"), "_tsconfig.test.json"), path.join(this.rootDir, this._config.structureConfig.test, "unit", "tsconfig.json"), this._config, { delimiters: "<% %>", bom: false, });
            }
            else {
                // main tsconfig.json
                copyTpl(path.join(templatePath("library"), "_tsconfig.output-same-dir.json"), path.join(this.rootDir, "tsconfig.json"), this._config, { delimiters: "<% %>", bom: false, });
            }
            // eslintrc.json
            copyTpl(path.join(templatePath("library"), "_eslintrc.json"), path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"), this.queryEsLintEnvParam(), { delimiters: "<% %>", bom: false, });
            // testem
            if (!this.config.nodejs) {
                copyTpl(path.join(templatePath("library/tools/testem"), "_testem.json"), path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"), this._config, { delimiters: "<% %>", bom: false, });
                const testemStuffPath = templatePath("library/tools/testem/runner");
                glob.sync("**", {
                    cwd: testemStuffPath,
                    nodir: true,
                })
                    .forEach((file) => {
                    fs.copySync(path.join(testemStuffPath, file), path.join(this.rootDir, this._config.structureConfig.test, "runner", file));
                });
            }
            // .gitignore
            copyTpl(path.join(templatePath("library"), "_gitignore"), path.join(this.rootDir, ".gitignore"), this._config, { bom: false, });
            // README.md
            copyTpl(path.join(templatePath("library"), "_README.md"), path.join(this.rootDir, "README.md"), this._config, { delimiters: "<% %>" });
            // package.json
            this.config.devDependencies = yield this.queryDependenciesParam(this.config.devDependencies || this.defaultDevDependencies);
            copyTpl(path.join(templatePath("library"), "_package.json"), path.join(this.rootDir, "package.json"), this._config, { delimiters: "<% %>", bom: false, });
        });
    }
    /**
     * ソースの雛形作成
     */
    createSourceTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
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
            copyTpl(path.join(templatePath("library"), "src", "_index.ts"), path.join(this.rootDir, this._config.structureConfig.src, script, _module + ".ts"), param, { delimiters: "<% %>" });
            // index.spec.ts
            copyTpl(path.join(templatePath("library"), "src", "_index.spec.ts"), path.join(this.rootDir, this._config.structureConfig.test, "unit", _module + ".spec.ts"), param, { delimiters: "<% %>" });
        });
    }
    /**
     * Visual Studio のソリューションファイル作成
     */
    createVisualStudioSolution() {
        return __awaiter(this, void 0, void 0, function* () {
            const vsParam = (() => {
                const createGUID = base_1.Utils.createGUID;
                const param = $.extend({}, this._config.structureConfig);
                param.projectName = this._config.projectName;
                param.projectGUID = createGUID();
                param.types = param.types.replace("@", "%40"); // escape "@" to "%40"
                param.mainBaseName = this._config.mainBaseName;
                param.license = !this._config.private;
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
            copyTpl(path.join(templatePath("base/visual.studio"), "_solution.sln.tpl"), path.join(this.rootDir, vsParam.projectName + ".sln"), vsParam, { delimiters: "<% %>" });
            // .csproj
            (() => {
                const toXmlString = (file) => {
                    const hogan = base_1.Utils.hogan;
                    const normalizeText = base_1.Utils.normalizeText;
                    const options = {
                        eol: os.EOL,
                        bom: true,
                        delimiters: "{{ }}",
                    };
                    const tpl = path.join(templatePath("base/visual.studio"), file);
                    const jst = hogan.compile(normalizeText(fs.readFileSync(tpl).toString(), { eol: "\n", bom: false }), options);
                    return jst.render(vsParam);
                };
                const toXmlDOM = (file) => {
                    return $($.parseXML(toXmlString(file)));
                };
                const toXmlNode = (file) => {
                    return base_1.Utils.str2XmlNode(toXmlString(file));
                };
                const $proj = toXmlDOM("_project.csproj.tpl");
                const $gpTS = toXmlNode("_ts.item.group.tpl");
                const $gpJS = toXmlNode("_js.item.group.tpl");
                $proj
                    .find("ItemGroup")
                    .last()
                    .after($gpTS)
                    .after($gpJS);
                const formatXML = base_1.Utils.formatXML;
                const dstPath = path.join(this.rootDir, vsParam.projectName + ".csproj");
                debug(base_1.Utils.xmlNode2Str($proj));
                fs.writeFileSync(dstPath, formatXML(base_1.Utils.xmlNode2Str($proj)));
            })();
        });
    }
}
exports.GeneratorModule = GeneratorModule;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const generator_cordova_1 = __webpack_require__(9);
__export(__webpack_require__(9));
/**
 * generator 生成関数
 */
function newGeneratorMobile(config) {
    return new generator_cordova_1.GeneratorCordova(config);
}
exports.newGeneratorMobile = newGeneratorMobile;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(0);
const os = __webpack_require__(4);
const utils_1 = __webpack_require__(2);
const base_1 = __webpack_require__(1);
/**
 * @class GeneratorCordova
 * @brief Mobile Cordova 用 Generator クラス
 */
class GeneratorCordova extends base_1.GeneratorBase {
    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase
    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure() {
        return {
            src: "app",
            pkg: "www",
            built: "app",
            doc: "docs",
            task: "tasks",
            test: "tests",
            types: "@types",
            temp: ".temp",
            lib: "lib",
            external: "external",
            porting: "porting",
            res: "res",
            srcConfig: {
                script: "scripts",
                stylesheet: "stylesheets",
                template: "templates",
            },
        };
    }
    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.debug(JSON.stringify(this.config, null, 4));
            if (this.isEnableCordova()) {
                yield this.chdir(this.rootDir);
                yield this.createCordovaScaffold();
                yield this.updateConfigXML();
                yield this.addCordovaPlatforms();
                yield this.addCordovaPlugins();
                yield this.addCordovaExtentionFiles();
                yield this.cacheCordovaPackageJSON();
                yield this.chdir("..");
            }
            yield this.createDirectoryStructure();
            yield this.createProjectSettings();
            yield this.createSourceTemplate();
            yield this.createVisualStudioSolution();
        });
    }
    /**
     * 必要とする task script 一覧を返却. action: create のときに呼ばれる
     */
    get taskList() {
        return [
            "banner.js",
            "clean.js",
            "command.js",
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
    get defaultDevDependencies() {
        const depends = super.defaultDevDependencies.concat([
            { name: "@types/jasmine", version: undefined, },
            { name: "@types/requirejs", version: undefined, },
            { name: "autoprefixer", version: undefined, },
            { name: "clean-css", version: undefined, },
            { name: "fs-extra", version: undefined, },
            { name: "html-minifier", version: undefined, },
            { name: "node-sass", version: undefined, },
            { name: "postcss-cli", version: undefined, },
        ]);
        const extra = [];
        this.config.devDependencies.forEach((depend) => {
            extra.push({ name: depend.name, version: depend.version, });
        });
        if (this.isEnableCordova()) {
            extra.push({ name: "@types/cordova", version: undefined, });
        }
        return utils_1._.sortBy(depends.concat(extra), (depend) => depend.name);
    }
    ///////////////////////////////////////////////////////////////////////
    // private methods:
    /**
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDependency}
     */
    get defaultDependencies() {
        const depends = [
            { name: "@cdp/mobile", version: "git+ssh://git@github.com/CDP-Tokyo/cdp-js.git#dev", },
            { name: "backbone", version: undefined, },
            { name: "jquery", version: undefined, },
            { name: "requirejs", version: undefined, },
            { name: "underscore", version: undefined, },
        ];
        const extra = [];
        this.config.dependencies.forEach((depend) => {
            extra.push({ name: depend.name, version: depend.version, });
        });
        return utils_1._.sortBy(depends.concat(extra), (depend) => depend.name);
    }
    /**
     * configration にアクセス
     */
    get config() {
        return this._config;
    }
    /**
     * cordova の有効/無効チェック
     *
     * @returns true: 有効 / false: 無効
     */
    isEnableCordova() {
        return (0 < this.config.platforms.length);
    }
    /**
     * lib/porting の設定状況のチェック
     *
     * @param target
     * @returns true: 設定 / false: 未設定
     */
    hasStructureOf(target) {
        return (this.config.projectStructure && 0 <= this.config.projectStructure.indexOf(target));
    }
    /**
     * インストール対象/非対象チェック
     *
     * @param name    [in] モジュール名
     * @param depends [in] 検索対象 (既定 this.config.dependencies)
     * @returns true: 対象 / false: 非対象
     */
    isInstallationTarget(name, depends = this.config.dependencies) {
        return !!depends.find((depend) => name === depend.name);
    }
    //___________________________________________________________________________________________________________________//
    /**
     * cordova を用いたプロジェクト作成
     */
    createCordovaScaffold() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("mobile.create.cordova.createCordovaScaffold");
            utils_1.debug("createCordovaScaffold");
            // `$ cordova create cool-mobile com.sony.cdp.coolmobile "Cool Mobile"`
            yield utils_1.execCommand("cordova", ["create", this.config.projectName, this.config.appId, this.config.appName]);
            // remove files
            utils_1.glob.sync("www/**/*", {
                cwd: this.config.projectName,
            }).forEach((file) => {
                utils_1.fs.removeSync(path.join(this.config.projectName, file));
            });
            utils_1.fs.removeSync(path.join(this.config.projectName, "res"));
            utils_1.fs.removeSync(path.join(this.config.projectName, ".npmignore"));
            // move root directory
            utils_1.fs.copySync(this.config.projectName, "./");
            utils_1.fs.removeSync(this.config.projectName);
        });
    }
    /**
     * config.xml の修正
     */
    updateConfigXML() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("mobile.create.cordova.updateConfigXml");
            utils_1.debug("updateConfigXML");
            const configXmlPath = path.join(process.cwd(), "config.xml");
            const $configXmlDom = utils_1.$(utils_1.str2XmlNode(utils_1.fs.readFileSync(configXmlPath).toString()));
            $configXmlDom
                .find("widget")
                .attr("version", this.config.version)
                .attr("ios-CFBundleIdentifier", this.config.appId)
                .prepend(utils_1.str2XmlNode(`
                <preference name="DisallowOverscroll" value="true"/>
                <preference name="KeyboardDisplayRequiresUserAction" value="false"/>
                <preference name="BackgroundColor" value="0xff000000" />
            `));
            // remove cordova team information
            $configXmlDom
                .find("description")
                .remove();
            $configXmlDom
                .find("author")
                .remove();
            utils_1.fs.writeFileSync(configXmlPath, utils_1.formatXML(utils_1.xmlNode2Str($configXmlDom)));
        });
    }
    /**
     * platform 追加
     */
    addCordovaPlatforms() {
        return __awaiter(this, void 0, void 0, function* () {
            utils_1.debug("addCordovaPlatforms");
            const targets = this.config.platforms.slice();
            const index = targets.indexOf("ios");
            if (0 <= index && "darwin" !== process.platform) {
                this.warn("mobile.create.cordova.iOSWarning");
                targets.splice(index, 1);
                if (targets.length <= 0) {
                    return Promise.resolve();
                }
            }
            this.progress("mobile.create.cordova.addPlatforms");
            // `$ cordova platform add android ios`
            yield utils_1.execCommand("cordova", ["platform", "add"].concat(targets));
        });
    }
    /**
     * plugin 追加
     */
    addCordovaPlugins() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("mobile.create.cordova.addPlugins");
            utils_1.debug("addCordovaPlugins");
            /*
             * I/F は複数のプラグインを一括で追加することが可能だが、
             * cordova version を判定しているプラグインは誤判定することがあるため、
             * 1つずつ追加する
             *
             * 以下の不具合に類似する現象
             * https://issues.apache.org/jira/browse/CB-12663
             */
            for (let i = 0, n = this.config.cordova_plugin.length; i < n; i++) {
                // `$ cordova plugin add cordova-plugin-inappbrowser`
                yield utils_1.execCommand("cordova", ["plugin", "add", this.config.cordova_plugin[i].name]);
            }
        });
    }
    /**
     * cordova project に追加するリソースをコピー
     */
    addCordovaExtentionFiles() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("mobile.create.cordova.addExtensions");
            utils_1.debug("addCordovaExtentionFiles");
            this.copyTplDir("mobile/cordova");
        });
    }
    /**
     * cordova が生成した package.json をキャッシュ
     */
    cacheCordovaPackageJSON() {
        return __awaiter(this, void 0, void 0, function* () {
            if (utils_1.fs.existsSync("./package.json")) {
                this.config.cordovaPackageJson = JSON.parse(utils_1.fs.readFileSync("./package.json").toString());
                // remove cordova team information
                delete this.config.cordovaPackageJson.name;
                delete this.config.cordovaPackageJson.version;
                delete this.config.cordovaPackageJson.displayName;
                delete this.config.cordovaPackageJson.main;
                delete this.config.cordovaPackageJson.scripts;
                delete this.config.cordovaPackageJson.author;
                delete this.config.cordovaPackageJson.description;
                delete this.config.cordovaPackageJson.license;
                // ファイルはいったん削除
                utils_1.fs.removeSync("./package.json");
            }
        });
    }
    //___________________________________________________________________________________________________________________//
    /**
     * ディレクトリ構成情報のコピー
     */
    createDirectoryStructure() {
        this.progress("mobile.create.app.createDirectoryStructure");
        utils_1.debug("createDirectoryStructure");
        // app base structure
        this.copyTplDir("mobile/structure/base");
        // lib
        if (this.hasStructureOf("lib")) {
            this.copyTplDir("mobile/structure/lib", path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.lib));
        }
        // porting
        if (this.hasStructureOf("porting")) {
            this.copyTplDir("mobile/structure/porting", path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.porting));
            // create: dev/porting/@types
            utils_1.fs.copySync(utils_1.templatePath("base/.gitkeep"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.porting, this.config.structureConfig.types, ".gitkeep"));
            const PLATFORMS_ROOT = path.join(this.rootDir, "platforms");
            utils_1.fs.readdirSync(PLATFORMS_ROOT)
                .forEach((platform) => {
                if (utils_1.fs.statSync(path.join(PLATFORMS_ROOT, platform)).isDirectory()) {
                    this.copyTplDir("mobile/structure/porting", path.join(PLATFORMS_ROOT, platform, this.config.structureConfig.porting));
                }
            });
        }
        // www
        const WWW = path.join(this.rootDir, this.config.structureConfig.pkg);
        if (!utils_1.fs.existsSync(WWW)) {
            utils_1.fs.mkdir(WWW);
        }
        utils_1.fs.copySync(utils_1.templatePath("base/.gitkeep"), path.join(WWW, ".gitkeep"));
        // task
        utils_1.glob.sync("**/*", {
            cwd: utils_1.templatePath("mobile/task"),
        }).forEach((file) => {
            utils_1.fs.copySync(path.join(utils_1.templatePath("mobile/task"), file), path.join(this.rootDir, this.config.structureConfig.task, file));
        });
    }
    /**
     * プロジェクト設定ファイルの作成
     */
    createProjectSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("mobile.create.app.createProjectSettings");
            utils_1.debug("createProjectSettings");
            // project.config.js
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_project.config.js"), path.join(this.rootDir, "project.config.js"), utils_1.$.extend({}, this._config, {
                hogan: this.isInstallationTarget("hogan.js"),
                hammerjs: this.isInstallationTarget("hammerjs"),
                iscroll: this.isInstallationTarget("iscroll"),
            }), { delimiters: "<% %>" });
            // tsconfig
            // tsconfig.base.json
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_tsconfig.base.json"), path.join(this.rootDir, "tsconfig.base.json"), this._config, { delimiters: "<% %>", bom: false, });
            // main tsconfig.json
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_tsconfig.json"), path.join(this.rootDir, "tsconfig.json"), this._config, { delimiters: "<% %>", bom: false, });
            // eslintrc.json
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_eslintrc.json"), path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"), this.queryEsLintEnvParam(), { delimiters: "<% %>", bom: false, });
            // testem
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile/tools/testem"), "_testem.json"), path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"), this._config, { delimiters: "<% %>", bom: false, });
            const testemStuffPath = utils_1.templatePath("mobile/tools/testem/runner");
            utils_1.glob.sync("**", {
                cwd: testemStuffPath,
                nodir: true,
            })
                .forEach((file) => {
                utils_1.fs.copySync(path.join(testemStuffPath, file), path.join(this.rootDir, this._config.structureConfig.test, "runner", file));
            });
            // .gitignore
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_gitignore"), path.join(this.rootDir, ".gitignore"), this._config, { bom: false, });
            // README.md
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_README.md"), path.join(this.rootDir, "README.md"), utils_1.$.extend({}, this._config, {
                cordova: this.isEnableCordova(),
                lib: this.hasStructureOf("lib"),
                porting: this.hasStructureOf("porting"),
            }), { delimiters: "<% %>" });
            // TODO: templates/mobile/addon からコピーする場合はここで対応
            // package.json
            const resolvedConfig = utils_1.$.extend(true, {}, this.config);
            resolvedConfig.dependencies = yield this.queryDependenciesParam(this.defaultDependencies);
            resolvedConfig.devDependencies = yield this.queryDependenciesParam(this.defaultDevDependencies);
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_package.json"), path.join(this.rootDir, "package.json"), resolvedConfig, { delimiters: "<% %>", bom: false, });
            // cordovaPackageJSON とマージ
            if (this.config.cordovaPackageJson) {
                const PKG_PATH = path.join(this.rootDir, "package.json");
                const pkg = JSON.parse(utils_1.fs.readFileSync(PKG_PATH).toString());
                utils_1.$.extend(true, pkg, this.config.cordovaPackageJson);
                const sortKeys = (target) => {
                    const sorted = {};
                    Object.keys(target).sort().forEach((key) => {
                        sorted[key] = target[key];
                    });
                    return sorted;
                };
                pkg.dependencies = sortKeys(pkg.dependencies);
                pkg.devDependencies = sortKeys(pkg.devDependencies);
                utils_1.fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2), "utf-8");
            }
        });
    }
    /**
     * ソースの雛形作成
     */
    createSourceTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("mobile.create.app.createSourceTemplate");
            utils_1.debug("createSourceTemplate");
            // copy sources
            this.copyTplDir("mobile/src/structure", path.join(this.rootDir));
            {
                const additional = (() => {
                    if (this.config.dependencies.length < 0) {
                        return null;
                    }
                    const param = {
                        additional: {
                            list: [],
                            listWithCustomName: [],
                        },
                    };
                    const targets = [...this.config.dependencies, ...this.config.resource_addon];
                    targets.forEach((info) => {
                        if (info.fileName || info.venderName) {
                            param.additional.listWithCustomName.push({
                                moduleName: info.alias || info.name,
                                venderName: info.venderName || info.alias || info.name,
                                fileName: info.fileName || info.alias || info.name,
                            });
                        }
                        else {
                            param.additional.list.push({
                                moduleName: info.alias || info.name,
                            });
                        }
                    });
                    return param;
                })();
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src"), "_config.ts"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.srcConfig.script, "config.ts"), utils_1.$.extend({}, this._config, additional), { delimiters: "<% %>" });
            }
            {
                const globals = (() => {
                    if (this.config.dependencies.length < 0) {
                        return null;
                    }
                    const param = {
                        globals: {
                            importsList: [],
                            exportsList: [],
                            hasExports: false,
                        },
                    };
                    const targets = [...this.config.dependencies, ...this.config.resource_addon];
                    targets.forEach((info) => {
                        if (info.globalExport) {
                            param.globals.exportsList.push({
                                globalExport: info.globalExport,
                                moduleName: info.alias || info.name,
                            });
                        }
                        else {
                            param.globals.importsList.push({
                                moduleName: info.alias || info.name,
                            });
                        }
                    });
                    param.globals.hasExports = (0 < param.globals.exportsList.length);
                    return param;
                })();
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src"), "_app.ts"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.srcConfig.script, "app.ts"), globals, { delimiters: "<% %>" });
            }
            {
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src"), "_messages.en-US.json"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.res, "locales", "messages.en-US.json"), this.config, { delimiters: "<% %>", bom: false, });
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src"), "_messages.ja-JP.json"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.res, "locales", "messages.ja-JP.json"), this.config, { delimiters: "<% %>", bom: false, });
            }
            {
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src"), "_index.html"), path.join(this.rootDir, this.config.structureConfig.src, "index.html"), this.config);
            }
        });
    }
    /**
     * Visual Studio のソリューションファイル作成
     */
    createVisualStudioSolution() {
        return __awaiter(this, void 0, void 0, function* () {
            const vsParam = (() => {
                const param = utils_1.$.extend({}, this._config.structureConfig);
                param.projectName = this._config.projectName;
                param.projectGUID = utils_1.createGUID();
                param.types = param.types.replace("@", "%40"); // escape "@" to "%40"
                param.license = !this._config.private;
                // external
                param.cordova = this.isEnableCordova();
                param.hogan = this.isInstallationTarget("hogan.js");
                param.hammerjs = this.isInstallationTarget("hammerjs");
                param.iscroll = this.isInstallationTarget("iscroll");
                param.flipsnap = this.isInstallationTarget("flipsnap");
                // project structure
                param.enableLib = this.hasStructureOf("lib");
                param.enablePorting = this.hasStructureOf("porting");
                // platforms
                param.platforms = [...this.config.platforms];
                // setup built ts group
                param.tsGroup = [];
                utils_1.glob.sync("**/*.ts", {
                    cwd: path.join(this.rootDir, param.src, param.srcConfig.script),
                }).forEach((file) => {
                    const relativePath = path.join(param.src, param.srcConfig.script, path.dirname(file)).replace(/\//g, "\\") + "\\";
                    const fileName = path.basename(file, ".ts");
                    param.tsGroup.push({
                        relativePath: relativePath,
                        fileName: fileName,
                        dependee: true,
                        map: false,
                    });
                });
                // setup test ts group
                utils_1.glob.sync("**/*.ts", {
                    cwd: path.join(this.rootDir, this.config.structureConfig.test, "unit"),
                }).forEach((file) => {
                    const relativePath = param.test + "\\unit\\";
                    const fileName = path.basename(file, ".ts");
                    param.tsGroup.push({
                        relativePath: relativePath,
                        fileName: fileName,
                        dependee: true,
                        map: false,
                    });
                });
                return param;
            })();
            // .sln
            utils_1.copyTpl(path.join(utils_1.templatePath("base/visual.studio"), "_solution.sln.tpl"), path.join(this.rootDir, vsParam.projectName + ".sln"), vsParam, { delimiters: "<% %>" });
            // .csproj
            (() => {
                const toXmlString = (file) => {
                    const options = {
                        eol: os.EOL,
                        bom: true,
                        delimiters: "{{ }}",
                    };
                    const jst = utils_1.hogan.compile(utils_1.normalizeText(utils_1.fs.readFileSync(file).toString(), { eol: "\n", bom: false }), options);
                    return jst.render(vsParam);
                };
                const toXmlDOM = (file) => {
                    return utils_1.$(utils_1.$.parseXML(toXmlString(file)));
                };
                const toXmlNode = (file) => {
                    return utils_1.str2XmlNode(toXmlString(file));
                };
                const $proj = toXmlDOM(path.join(utils_1.templatePath("mobile/visual.studio"), "_project.csproj.tpl"));
                const $gpTS = toXmlNode(path.join(utils_1.templatePath("base/visual.studio"), "_ts.item.group.tpl"));
                $proj
                    .find("ItemGroup")
                    .last()
                    .after($gpTS);
                const dstPath = path.join(this.rootDir, vsParam.projectName + ".csproj");
                utils_1.debug(utils_1.xmlNode2Str($proj));
                utils_1.fs.writeFileSync(dstPath, utils_1.formatXML(utils_1.xmlNode2Str($proj)));
            })();
        });
    }
}
exports.GeneratorCordova = GeneratorCordova;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const generator_electoron_1 = __webpack_require__(11);
__export(__webpack_require__(11));
/**
 * generator 生成関数
 */
function newGeneratorDesktop(config) {
    return new generator_electoron_1.GeneratorElectron(config);
}
exports.newGeneratorDesktop = newGeneratorDesktop;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __webpack_require__(1);
/**
 * @class GeneratorElectron
 * @brief Desktop Electron 用 Generator クラス
 */
class GeneratorElectron extends base_1.GeneratorBase {
    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase
    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure() {
        return {
            src: "app",
            pkg: "www/app",
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
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            return Promise.reject("under construction.");
        });
    }
    /**
     * 必要とする task script 一覧を返却. action: create のときに呼ばれる
     */
    get taskList() {
        return [
            "banner.js",
            "clean.js",
            "srcmap.js",
            "build-ts-clean.js",
            "build-ts-normalize.js",
        ];
    }
    ///////////////////////////////////////////////////////////////////////
    // private methods:
    /**
     * configration にアクセス
     */
    get config() {
        return this._config;
    }
}
exports.GeneratorElectron = GeneratorElectron;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const generator_browser_1 = __webpack_require__(13);
__export(__webpack_require__(13));
/**
 * generator 生成関数
 */
function newGeneratorWeb(config) {
    return new generator_browser_1.GeneratorBrowser(config);
}
exports.newGeneratorWeb = newGeneratorWeb;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable:no-unused-variable no-unused-vars */
/* eslint-disable no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = __webpack_require__(1);
/**
 * @class GeneratorBrowser
 * @brief Web Browser 用 Generator クラス
 */
class GeneratorBrowser extends base_1.GeneratorBase {
    ///////////////////////////////////////////////////////////////////////
    // imprementes: GeneratorBase
    /**
     * 既定の directory 構造を返却
     */
    defaultBaseStructure() {
        return {
            src: "app",
            pkg: "www",
            built: "app",
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
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            return Promise.reject("under construction.");
        });
    }
    /**
     * 必要とする task script 一覧を返却. action: create のときに呼ばれる
     */
    get taskList() {
        return [
            "banner.js",
            "clean.js",
            "srcmap.js",
            "build-ts-clean.js",
            "build-ts-normalize.js",
        ];
    }
    ///////////////////////////////////////////////////////////////////////
    // private methods:
    /**
     * configration にアクセス
     */
    get config() {
        return this._config;
    }
}
exports.GeneratorBrowser = GeneratorBrowser;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
exports.Utils = Utils;
const generators_1 = __webpack_require__(31);
//___________________________________________________________________________________________________________________//
/**
 * @class CDPLib
 * @brief CDP boilerplate 生成機能を提供するクラス
 */
class CDPLib {
    ///////////////////////////////////////////////////////////////////////
    // pubic methods:
    /**
     * main command
     */
    static execute(config) {
        Utils.setSettings(config.settings);
        return generators_1.newGenerator(config).run();
    }
}
exports.default = CDPLib;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("hogan.js");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("underscore.string");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("which");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("semver-regex");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("cli-spinner");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("xmldom");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(0);
const os = __webpack_require__(4);
const child_process_1 = __webpack_require__(30);
const libs_1 = __webpack_require__(3);
const settings_1 = __webpack_require__(5);
///////////////////////////////////////////////////////////////////////
// exports methods:
/**
 * Handle command line error and kill process.
 * When the application received error from cli, please call this method.
 *
 * @param {String} error  error information.
 */
function handleError(error) {
    settings_1.assert(false, error);
}
exports.handleError = handleError;
//___________________________________________________________________________________________________________________//
/**
 * "templates" ディレクトリからのパスを取得.
 *
 * @param  {String} target ターゲットを指定. null の場合は、templates を返却
 * @return {String} templates/hogehoge
 */
function templatePath(target) {
    if (null == target) {
        return path.join(settings_1.getLibPath(), "templates");
    }
    else {
        return path.join(settings_1.getLibPath(), "templates", target);
    }
}
exports.templatePath = templatePath;
//___________________________________________________________________________________________________________________//
/**
 * Get spinner instance.
 * CLI helper.
 *
 * @param  {String}  [format]  spinner format string.
 * @param  {Number}  [index]   spinner index defined by cli-spinner. (default: random [0-29])
 * @return {Spinner} cli-spinner instance.
 */
function getSpinner(format, index) {
    const spinners = [
        "|/-\\",
        "┤┘┴└├┌┬┐",
        "◢◣◤◥",
        "▌▀▐▄",
        "▉▊▋▌▍▎▏▎▍▌▋▊▉",
        "▁▃▄▅▆▇█▇▆▅▄▃",
        "☱☲☴",
        ".oO@*",
        "◐◓◑◒",
        ////
        "◡◡ ⊙⊙ ◠◠",
        "■□▪▫",
        "←↖↑↗→↘↓↙",
        ".oO°Oo.",
    ];
    const fmt = format || "%s";
    const spinner = new libs_1.Spinner(fmt);
    const idx = (null != index && 0 <= index && index < 14) ? index : Math.floor(Math.random() * 10);
    spinner.setSpinnerString(spinners[idx]);
    return spinner;
}
exports.getSpinner = getSpinner;
/**
 * Normalize text line-feed.
 * for windows git user.
 *
 * @param  {String}               text      input text.
 * @param  {NormalizeTextOptions} [options] option.
 * @return {String} normalized text.
 */
function normalizeText(text, options) {
    const opt = libs_1.$.extend({}, {
        eol: os.EOL,
        bom: true,
    }, options);
    text = text
        .replace(/^\ufeff/gm, "") // remove bom
        .replace(/\r\n/gm, "\n") // once "\n"
        .replace(/\r/gm, "\n");
    if (opt.bom) {
        text = "\ufeff" + text;
    }
    if ("\n" !== opt.eol) {
        text = text.replace(/\n/gm, opt.eol);
    }
    if (opt.tab) {
        const spaces = (() => {
            let s = "";
            for (let i = 0; i < opt.tab; i++) {
                s += " ";
            }
            return s;
        })();
        text = text.replace(/\t/gm, spaces);
    }
    return text;
}
exports.normalizeText = normalizeText;
/**
 * Execute command line by spawn.
 * call spawn. if error occured, cui is killed proccess.
 *
 * @param   {String}               command    main command. ex) "cordova"
 * @param   {String[]}             args       command args. ex) ["plugin", "add", pluginName]
 * @param   {ExecCommandOptions}   [options]  cli-spinner"s options.
 * @returns {Number} error code
 */
function execCommand(command, args, options) {
    return new Promise((resolve, reject) => {
        const opt = libs_1.$.extend({}, {
            stdio: "inherit",
            spinner: { format: "%s" },
            stdout: (data) => { },
            stderr: (data) => { },
        }, options);
        libs_1.which(command, (error, resolvedCommand) => {
            if (error) {
                handleError(JSON.stringify(error));
            }
            const spinner = opt.spinner ? getSpinner(opt.spinner.format, opt.spinner.index) : null;
            if (spinner) {
                spinner.start();
            }
            const child = child_process_1.spawn(resolvedCommand, args, opt)
                .on("error", handleError)
                .on("close", (code) => {
                if (spinner) {
                    spinner.stop(true);
                }
                resolve(code);
            });
            if ("pipe" === opt.stdio) {
                child.stdout.on("data", (data) => {
                    opt.stdout(data.toString());
                });
                child.stderr.on("data", (data) => {
                    opt.stderr(data.toString());
                });
            }
        });
    });
}
exports.execCommand = execCommand;
/**
 * Copy template with hogan.
 * sync function
 *
 * @param {String}               src       source file path.
 * @param {String}               dst       destination file path.
 * @param {Object}               params    template parameters.
 * @param {CopyTemplateOptions}  [options] options object.
 */
function copyTpl(src, dst, params, options) {
    const opt = libs_1.$.extend({}, {
        eol: os.EOL,
        bom: true,
        delimiters: "{{ }}",
    }, options);
    const jst = libs_1.hogan.compile(normalizeText(libs_1.fs.readFileSync(src).toString(), { eol: "\n", bom: false }), opt);
    const output = normalizeText(jst.render(params), opt);
    libs_1.fs.ensureFileSync(dst);
    libs_1.fs.writeFileSync(dst, output, "utf8");
}
exports.copyTpl = copyTpl;
//___________________________________________________________________________________________________________________//
/**
 * GUID generate.
 * returned as Windows registry type format.
 *
 * @return {String}
 */
function createGUID() {
    return "{" + libs_1.uuid.v4().toUpperCase() + "}";
}
exports.createGUID = createGUID;
//___________________________________________________________________________________________________________________//
/**
 * Create XML DOM node.
 *
 * @param   str  string xml format. ex) '<preference name="DisallowOverscroll" value="true"/>'
 * @returns XML Node instance
 */
function str2XmlNode(str) {
    let fullXML = true;
    if (!/<?xml/i.test(str)) {
        fullXML = false;
    }
    const $xml = libs_1.$(libs_1.$.parseXML(str));
    return fullXML ? $xml : $xml.children();
}
exports.str2XmlNode = str2XmlNode;
/**
 * Create XML string from DOM node.
 *
 * @param  {String} str  string xml format. ex) '<preference name="DisallowOverscroll" value="true"/>'
 * @return {jQuery} XML Node instance
 */
function xmlNode2Str($xml) {
    /* eslint-disable no-undef */
    return new XMLSerializer().serializeToString($xml[0]);
    /* eslint-enable no-undef */
}
exports.xmlNode2Str = xmlNode2Str;
/**
 * XML formatter.
 *
 * @param  {String}           str       string xml format. ex) '<preference name="DisallowOverscroll" value="true"/>'
 * @param  {FormatXmlOptions} [options] options object.
 * @return {String} formatted XML
 */
function formatXML(str, options) {
    const opt = libs_1.$.extend({}, {
        eol: os.EOL,
        bom: true,
        step: 2,
    }, options);
    let xml = "";
    let pad = 0;
    let indent;
    let node;
    const strArr = normalizeText(str, { eol: "\n" })
        .replace(/(>)(<)(\/*)/g, "$1\n$2$3") // insert LF to each node once.
        .split("\n");
    const spaces = (len) => {
        let s = "";
        const _indent = len * opt.step;
        for (let i = 0; i < _indent; i++) {
            s += " ";
        }
        return s;
    };
    for (let i = 0; i < strArr.length; i++) {
        indent = 0;
        node = libs_1.$.trim(strArr[i]);
        if (node.match(/.+<\/\w[^>]*>$/)) {
            indent = 0;
        }
        else if (node.match(/^<\/\w/)) {
            if (pad > 0) {
                pad -= 1;
            }
        }
        else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
            indent = 1;
        }
        else {
            indent = 0;
        }
        xml += spaces(pad) + node + "\n";
        pad += indent;
    }
    xml = xml
        .replace(/\n\n/gm, "\n")
        .replace(/^ +\n/gm, "");
    return normalizeText(xml, opt);
}
exports.formatXML = formatXML;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __webpack_require__(5);
const library_1 = __webpack_require__(6);
const mobile_1 = __webpack_require__(8);
const desktop_1 = __webpack_require__(10);
const web_1 = __webpack_require__(12);
__export(__webpack_require__(1));
__export(__webpack_require__(6));
__export(__webpack_require__(8));
__export(__webpack_require__(10));
__export(__webpack_require__(12));
/**
 * generator 生成関数
 */
function newGenerator(config) {
    switch (config.projectType) {
        case "library":
            return library_1.newGeneratorLibrary(config);
        case "mobile":
            return mobile_1.newGeneratorMobile(config);
        case "desktop":
            return desktop_1.newGeneratorDesktop(config);
        case "web":
            return web_1.newGeneratorWeb(config);
        default:
            settings_1.assert(false, "unsupported project kind: " + config.projectType);
            return null;
    }
}
exports.newGenerator = newGenerator;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
exports.Utils = Utils;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(0);
const utils_1 = __webpack_require__(2);
/**
 * @class GeneratorBase
 * @brief すべての Generator の既定クラス
 */
class GeneratorBase {
    /**
     * constructor
     *
     * @param {IProjectConfigration} config コンフィグ
     */
    constructor(_config) {
        this._config = _config;
        this._projectRootDir = utils_1.getTargetDir() ?
            utils_1.getTargetDir() :
            path.join(process.cwd(), this._config.projectName);
        this._config.structureConfig = utils_1.$.extend({}, this.defaultBaseStructure(), this._config.structureConfig);
        this._config.private = "NONE" === this._config.license;
        this._config.outputSameDir
            = this._config.structureConfig.src === this._config.structureConfig.built;
        this._config.nodejs = ((env) => {
            switch (env) {
                case "node":
                case "electron":
                    return true;
                default:
                    return false;
            }
        })(this._config.env);
        utils_1.debug(JSON.stringify(this._config, null, 4));
    }
    ///////////////////////////////////////////////////////////////////////
    // pubic methods:
    /**
     * 処理開始 (エントリ)
     *
     */
    run() {
        switch (this._config.action) {
            case "create":
                return this.runCreate();
            default:
                return Promise.reject("unknown action: " + this._config.action);
        }
    }
    ///////////////////////////////////////////////////////////////////////
    // protected methods:
    /**
     * 進捗テキストを通知
     *
     * @param key ローカライズリソースキーを指定
     */
    progress(key) {
        utils_1.log(utils_1.chalk.cyan(utils_1.translate(key)));
    }
    /**
     * 警告テキストを通知
     *
     * @param key ローカライズリソースキーを指定
     */
    warn(key) {
        utils_1.log(utils_1.chalk.yellow(utils_1.translate(key)));
    }
    /**
     * work directory の変更
     *
     * @param directory target directory.
     */
    chdir(directory) {
        process.chdir(directory);
    }
    /**
     * project root directory の取得
     *
     * @param {String} directory target directory.
     */
    get rootDir() {
        return this._projectRootDir;
    }
    /**
     * template directory を指定して配下のファイルをコピー
     * IBaseStructureConfigration の設定が反映される
     *
     * @param {String} target  ターゲットを指定. null の場合は、templates を返却
     * @param {String} dstRoot コピー先を指定. 指定が無い場合は rootDir が設定
     */
    copyTplDir(target, dstRoot, options) {
        dstRoot = dstRoot || this.rootDir;
        options = utils_1.$.extend({
            cwd: utils_1.templatePath(target),
            nodir: true,
            dot: true,
        }, options);
        utils_1.glob.sync("**", options)
            .forEach((file) => {
            const dst = path.join(dstRoot, file
                .replace(/src/, this._config.structureConfig.src)
                .replace(/pkg/, this._config.structureConfig.pkg)
                .replace(/built/, this._config.structureConfig.built)
                .replace(/doc/, this._config.structureConfig.doc)
                .replace(/task/, this._config.structureConfig.task)
                .replace(/test/, this._config.structureConfig.test)
                .replace(/types/, this._config.structureConfig.types)
                .replace(/temp\//, this._config.structureConfig.temp + "/")
                .replace(/lib/, this._config.structureConfig.lib || "lib")
                .replace(/external/, this._config.structureConfig.external || "external")
                .replace(/porting/, this._config.structureConfig.porting || "porting")
                .replace(/res/, this._config.structureConfig.res || "res")
                .replace(/script/, this._config.structureConfig.srcConfig
                ? (this._config.structureConfig.srcConfig.script || "scripts")
                : "scripts")
                .replace(/stylesheet/, this._config.structureConfig.srcConfig
                ? (this._config.structureConfig.srcConfig.stylesheet || "stylesheets")
                : "stylesheets")
                .replace(/template/, this._config.structureConfig.srcConfig
                ? (this._config.structureConfig.srcConfig.template || "templates")
                : "templates"));
            utils_1.fs.copySync(path.join(utils_1.templatePath(target), file), dst);
        });
    }
    /**
     * node module の version 取得
     *
     * @param {Promise<string>} version text
     */
    queryNodeModuleLatestVersion(name) {
        return new Promise((resolve, reject) => {
            let version;
            utils_1.execCommand("npm", ["info", name, "version"], {
                stdio: "pipe",
                spinner: null,
                stdout: (data) => {
                    version = utils_1._.trim(data);
                },
            })
                .then(() => {
                resolve(version);
            })
                .catch((reason) => {
                reject(reason);
            });
        });
    }
    /**
     * 既定の開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDependency}
     */
    get defaultDevDependencies() {
        const base = [
            { name: "convert-source-map", version: undefined, },
            { name: "del", version: undefined, },
            { name: "eslint", version: undefined, },
            { name: "npm-run-all", version: undefined, },
            { name: "plato", version: undefined, },
            { name: "source-map", version: undefined, },
            { name: "tslint", version: undefined, },
            { name: "typedoc", version: undefined, },
            { name: "typescript", version: undefined, },
        ];
        const minify = [
            { name: "uglify-js", version: undefined, es: ["es5"], },
            { name: "uglify-es", version: undefined, es: ["es2015"], },
        ];
        let extra = [];
        if (this._config.minify) {
            extra = extra.concat(minify);
        }
        if (this.isEnableTool("webpack")) {
            extra.push({ name: "webpack", version: undefined, });
            extra.push({ name: "source-map-loader", version: undefined, });
        }
        if (this.isEnableTool("nyc")) {
            extra.push({ name: "nyc", version: undefined, });
        }
        if (this.isEnableTool("testem")) {
            extra.push({ name: "testem", version: undefined, });
        }
        if (this.isEnableTool("phantomjs-prebuilt")) {
            extra.push({ name: "phantomjs-prebuilt", version: undefined, });
        }
        return utils_1._.sortBy(base.concat(extra), (depend) => depend.name);
    }
    /**
     * dependencies の template paramaeter を取得
     *
     * @param  {IDependency[]} dependencies 依存関係リスト
     * @return {{ name: string; version: string; last?: boolean; }[]} テンプレートパラメータに指定する配列
     */
    queryDependenciesParam(dependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("base.create.queryVersion");
            const depends = dependencies
                .filter((depend) => {
                if (null == depend.es) {
                    return true;
                }
                else {
                    return !!depend.es.find((esVersion) => {
                        return this._config.es === esVersion;
                    });
                }
            });
            utils_1.debug(JSON.stringify(depends, null, 4));
            const progress = (context) => {
                if ("string" === typeof context && !this._config.settings.silent) {
                    const spinner = utils_1.getSpinner(utils_1.chalk.yellow(context), 5);
                    spinner.start();
                    return spinner;
                }
                else if (context) {
                    context.stop(true);
                }
            };
            for (let i = 0, n = depends.length; i < n; i++) {
                if (null == depends[i].version) {
                    const spinner = progress(depends[i].name);
                    depends[i].version = "^" + (yield this.queryNodeModuleLatestVersion(depends[i].name));
                    progress(spinner);
                }
                if (i === n - 1) {
                    depends[i].last = true;
                }
            }
            return depends;
        });
    }
    /**
     * webpack.config.js の template paramaeter を取得
     *
     * @return {String} libraryTarget に指定する文字列
     */
    queryWebpackLibraryTarget() {
        switch (this._config.module) {
            case "commonjs":
                return "commonjs2";
            case "amd":
                return "amd";
            case "umd":
                return "umd";
            default:
                return undefined;
        }
    }
    /**
     * eslintrc の env に指定する template paramaeter を取得
     *
     * @return {Object} env に指定するテンプレートパラメータオブジェクト
     */
    queryEsLintEnvParam() {
        const compileSetting = this._config;
        return {
            es6: "es5" !== compileSetting.es,
            node: "web" !== compileSetting.env,
        };
    }
    /**
     * IBuildTargetConfigration.tools プロパティの指定状況を取得
     *
     * @param  {String}  name ツール名を指定
     * @return {Boolean} true: 指定されている / false: 指定されていない
     */
    isEnableTool(name) {
        return !!this._config.tools.find((tool) => name === tool);
    }
    ///////////////////////////////////////////////////////////////////////
    // private methods:
    /**
     * create 処理のエントリ
     */
    runCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createBase();
            yield this.create();
        });
    }
    //___________________________________________________________________________________________________________________//
    /**
     * 共通の create 処理
     */
    createBase() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("base.create.foundation");
            yield this.createProjectDir();
            yield this.copyBaseStructure();
            yield this.copyCommonFiles();
            yield this.copyTaskScripts();
        });
    }
    /**
     * プロジェクトディレクトリの作成
     */
    createProjectDir() {
        if (utils_1.fs.existsSync(this.rootDir)) {
            throw Error(utils_1.translate("base.create.error.alreadyExist"));
        }
        utils_1.fs.mkdirsSync(this.rootDir);
    }
    /**
     * 共通構成情報のコピー
     */
    copyBaseStructure() {
        this.copyTplDir("base/structure");
    }
    /**
     * 基本ファイルのコピー
     * template のコピーも行う
     */
    copyCommonFiles() {
        const srcDir = utils_1.templatePath("base");
        const dstDir = this.rootDir;
        // .npmignore
        utils_1.copyTpl(path.join(srcDir, "_npmignore"), path.join(dstDir, ".npmignore"), this._config.structureConfig);
        // BANNER
        utils_1.fs.copySync(path.join(srcDir, "_BANNER"), path.join(dstDir, "BANNER"));
        // LICENSE
        switch (this._config.license) {
            case "Apache-2.0":
                utils_1.fs.copySync(path.join(srcDir, "_LICENSE.Apache-2.0"), path.join(dstDir, "LICENSE"));
                break;
            case "MIT":
                utils_1.copyTpl(path.join(srcDir, "_LICENSE.MIT"), path.join(dstDir, "LICENSE"), this._config.copyright);
                break;
            default:
                break;
        }
        // NOTICE
        utils_1.fs.copySync(path.join(srcDir, "_NOTICE"), path.join(dstDir, "NOTICE"));
        // build tools: webpack
        if (this.isEnableTool("webpack")) {
            const param = {
                nodejs: this._config.nodejs,
                guide: true,
                taskPath: this._config.structureConfig.task,
            };
            utils_1.copyTpl(path.join(srcDir, "tools/webpack/_webpack.config.js"), path.join(dstDir, "webpack.config.js"), param, { delimiters: "<% %>" });
        }
    }
    /**
     * task script のコピー
     */
    copyTaskScripts() {
        const srcDir = utils_1.templatePath("base/task");
        const dstDir = path.join(this.rootDir, this._config.structureConfig.task);
        this.taskList.forEach((task) => {
            utils_1.fs.copySync(path.join(srcDir, task), path.join(dstDir, task));
        });
    }
}
exports.GeneratorBase = GeneratorBase;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDIxMWE1ZDE5MTY4OTVlNjcxMjQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIFwib3NcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9saWJyYXJ5L2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9saWJyYXJ5L2dlbmVyYXRvci1tb2R1bGUudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL21vYmlsZS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2dlbmVyYXRvci1icm93c2VyLnRzIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwid2hpY2hcIixcImNvbW1vbmpzMlwiOlwid2hpY2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImNoYWxrXCIsXCJjb21tb25qczJcIjpcImNoYWxrXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwianNkb21cIixcImNvbW1vbmpzMlwiOlwianNkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwieG1sZG9tXCIsXCJjb21tb25qczJcIjpcInhtbGRvbVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9IiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvdG9vbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcImNoaWxkX3Byb2Nlc3NcIiIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW50ZXJmYWNlcy50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLGlDOzs7Ozs7Ozs7Ozs7QUNBQSxrQ0FBNkI7QUFDN0Isa0NBQWlDOzs7Ozs7Ozs7Ozs7O0FDRGpDLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQXlDM0IsZ0JBQUU7QUF4Q04scUNBQTZCO0FBeUN6QixvQkFBSTtBQXhDUixzQ0FBa0M7QUF5QzlCLHNCQUFLO0FBeENULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCxxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUErQjtBQXlDM0Isc0JBQUs7QUF4Q1QsNENBQTRDO0FBeUN4QyxrQ0FBVztBQXhDZiw4Q0FBc0M7QUF5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TW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDIxMWE1ZDE5MTY4OTVlNjcxMjQiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJhc2VcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJleHBvcnQgKiBmcm9tIFwiLi9saWJzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Rvb2xzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tIFwiZ2xvYlwiO1xyXG5pbXBvcnQgKiBhcyBob2dhbiBmcm9tIFwiaG9nYW4uanNcIjtcclxuaW1wb3J0ICogYXMgX2wgZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBfcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgd2hpY2ggZnJvbSBcIndoaWNoXCI7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0ICogYXMgY2hhbGsgZnJvbSBcImNoYWxrXCI7XHJcbmltcG9ydCAqIGFzIHNlbXZlclJlZ2V4IGZyb20gXCJzZW12ZXItcmVnZXhcIjtcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJjbGktc3Bpbm5lclwiO1xyXG5cclxuY29uc3QgJDogSlF1ZXJ5U3RhdGljID0gKCgpID0+IHtcclxuICAgIGNvbnN0IF93aW5kb3cgPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGpzZG9tID0gcmVxdWlyZShcImpzZG9tXCIpO1xyXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBqc2RvbS5KU0RPTSkgeyAgICAvLyB2MTArXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcganNkb20uSlNET00oKS53aW5kb3c7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2OS4xMi54XHJcbiAgICAgICAgICAgIHJldHVybiBqc2RvbS5qc2RvbSgpLmRlZmF1bHRWaWV3O1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gcGF0Y2ggc2NvcGU6XHJcbiAgICAoKHJvb3Q6IGFueSkgPT4ge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICoganNkb20gOS40LjAgLSA5LjEyLjAg44Gr5a6f6KOF44GV44KM44Gm44GE44KLIERPTVBhcnNlciDjga8gWE1MIOOBriBzZXJpYWxpemUg44GM44Gn44GN44Gq44GE44Gf44KBLFxyXG4gICAgICAgICAqIHhtbGRvbSDjgavnva7jgY3mj5vjgYjjgotcclxuICAgICAgICAgKiBqc2RvbSAxMC4xLjAg44G+44Gn5YuV44GL44Gq44GE44GT44Go44KS56K66KqNXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgeG1sZG9tID0gcmVxdWlyZShcInhtbGRvbVwiKTtcclxuICAgICAgICByb290LkRPTVBhcnNlciA9IHhtbGRvbS5ET01QYXJzZXI7XHJcbiAgICAgICAgLy8geG1sZG9tIOOBq+OBryBkb20udG9TdHJpbmcoKSDjgYzlrp/oo4XjgZXjgozjgabjgYTjgovjgYzjgIFnbG9iYWwg44Gr44KCIGV4cG9ydCDjgZnjgotcclxuICAgICAgICAoPGFueT5nbG9iYWwpLlhNTFNlcmlhbGl6ZXIgPSByb290LlhNTFNlcmlhbGl6ZXIgPSB4bWxkb20uWE1MU2VyaWFsaXplcjtcclxuICAgIH0pKF93aW5kb3cpO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlKFwianF1ZXJ5XCIpKF93aW5kb3cpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHR5cGUgTWl4aW5lZFVuZGVyc2NvcmVTdGF0aWMgPSB0eXBlb2YgX3MgJiB0eXBlb2YgX2w7XHJcbmNvbnN0IF9tOiBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IDxhbnk+X2wubWl4aW4oPGFueT5fcy5leHBvcnRzKCkpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIF9tIGFzIF8sXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBjaGFsayxcclxuICAgIHNlbXZlclJlZ2V4LFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZnMsICQgfSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJR2xvYmFsU2V0dGluZ3NcclxuICogQGJyaWVmIOOCsOODreODvOODkOODq+ioreWumuOCpOODs+OCv+ODvOODleOCp+OCpOOCuVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsU2V0dGluZ3Mge1xyXG4gICAgZm9yY2U/OiBib29sZWFuOyAgICAgICAgICAgIC8vIOOCqOODqeODvOe2mee2mueUqFxyXG4gICAgdmVyYm9zZT86IGJvb2xlYW47ICAgICAgICAgIC8vIOips+e0sOODreOCsFxyXG4gICAgc2lsZW50PzogYm9vbGVhbjsgICAgICAgICAgIC8vIHNpbGVudCBtb2RlXHJcbiAgICB0YXJnZXREaXI/OiBzdHJpbmc7ICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44OqXHJcbiAgICBsYW5nPzogXCJlbi1VU1wiIHwgXCJqYS1KUFwiO1xyXG59XHJcblxyXG5sZXQgX3NldHRpbmdzOiBJR2xvYmFsU2V0dGluZ3MgPSB7XHJcbiAgICBmb3JjZTogZmFsc2UsXHJcbiAgICB2ZXJib3NlOiBmYWxzZSxcclxuICAgIHNpbGVudDogZmFsc2UsXHJcbiAgICBsYW5nOiBcImVuLVVTXCIsXHJcbn07XHJcblxyXG5sZXQgX2xpYlBhdGg6IHN0cmluZzsgICAvLyBjZHAtbGliIOOBruWtmOWcqOOBl+OBpuOBhOOCiyBwYXRoXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBleHBvcnRzIG1ldGhvZHM6XHJcblxyXG4vKipcclxuICog6Kit5a6a5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm5zIG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgX3NldHRpbmdzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOioreWumuaMh+WumlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyDjg63jgrDjgavkvb/nlKjjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTZXR0aW5ncyhzZXR0aW5nczogSUdsb2JhbFNldHRpbmdzKTogdm9pZCB7XHJcbiAgICBpZiAoc2V0dGluZ3MpIHtcclxuICAgICAgICBfc2V0dGluZ3MuZm9yY2UgICAgID0gc2V0dGluZ3MuZm9yY2UgICAgICAgIHx8IF9zZXR0aW5ncy5mb3JjZTtcclxuICAgICAgICBfc2V0dGluZ3MudmVyYm9zZSAgID0gc2V0dGluZ3MudmVyYm9zZSAgICAgIHx8IF9zZXR0aW5ncy52ZXJib3NlO1xyXG4gICAgICAgIF9zZXR0aW5ncy5zaWxlbnQgICAgPSBzZXR0aW5ncy5zaWxlbnQgICAgICAgfHwgX3NldHRpbmdzLnNpbGVudDtcclxuICAgICAgICBfc2V0dGluZ3MudGFyZ2V0RGlyID0gc2V0dGluZ3MudGFyZ2V0RGlyICAgIHx8IF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbiAgICAgICAgX3NldHRpbmdzLmxhbmcgICAgICA9IHNldHRpbmdzLmxhbmcgICAgICAgICB8fCBfc2V0dGluZ3MubGFuZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYW5nOiBcImVuLVVTXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFwiY2RwLWxpYlwiIOOBjOWtmOWcqOOBmeOCi+ODkeOCueOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJucyBjZHAtbGliIOOBuOOBriBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGliUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKG51bGwgPT0gX2xpYlBhdGgpIHtcclxuICAgICAgICBjb25zdCBUUllfQ09VTlQgPSAzO1xyXG4gICAgICAgIGxldCB0cmllZCA9IDA7XHJcbiAgICAgICAgX2xpYlBhdGggPSBfX2Rpcm5hbWU7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKFRSWV9DT1VOVCA8PSB0cmllZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJsaWIgcGF0aCBpcyBub3QgcmVzb2x2ZWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9saWJQYXRoID0gcGF0aC5qb2luKF9saWJQYXRoLCBcIi4uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVjayA9IHBhdGguam9pbihfbGliUGF0aCwgXCJjZHAtbGliXCIpO1xyXG4gICAgICAgICAgICBpZiAoZnMucGF0aEV4aXN0c1N5bmMoY2hlY2spKSB7XHJcbiAgICAgICAgICAgICAgICBfbGliUGF0aCA9IGNoZWNrO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJpZWQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xpYlBhdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmjIflrprjgZXjgozjgZ8gdGFyZ2V0RGlyIOOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJucyB0YXJnZXREaXIg44G444GuIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXREaXIoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBfc2V0dGluZ3MudGFyZ2V0RGlyO1xyXG59XHJcblxyXG4vKipcclxuICog44Ot44Kw5Ye65YqbXHJcbiAqIGNvbnNvbGUubG9nKCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghX3NldHRpbmdzLnNpbGVudCkge1xyXG4gICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoqbPntLDjg63jgrDlh7rliptcclxuICogY29uc29sZS5kZWJ1ZygpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0gbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghX3NldHRpbmdzLnNpbGVudCAmJiBfc2V0dGluZ3MudmVyYm9zZSkge1xyXG4gICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJERUJVRzogXCIgKyBtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRFQlVHOiBcIiArIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOaknOiovFxyXG4gKiBjb25zb2xlLmFzc2VydCgpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0gdGVzdCAgICAgICAgICAg5qSc6Ki844GZ44KL5byPXHJcbiAqIEBwYXJhbSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydCh0ZXN0PzogYm9vbGVhbiwgbWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIXRlc3QpIHtcclxuICAgICAgICBpZiAoX3NldHRpbmdzLmZvcmNlKSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgX2xhbmc6IGFueTtcclxuXHJcbi8qKlxyXG4gKiDjg63jg7zjgqvjg6njgqTjgrpcclxuICpcclxuICogQHBhcmFtIGtleSDjgq3jg7zmloflrZfliJdcclxuICogQHJldHVybnMg57+76Kiz44GV44KM44Gf5paH5a2X5YiXXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghX2xhbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBfbGFuZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJyZXMvbG9jYWxlc1wiLCBcIm1lc3NhZ2VzLlwiICsgX3NldHRpbmdzLmxhbmcgKyBcIi5qc29uXCIpLCBcInV0ZjhcIikudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTGFuZ3VhZ2UgcmVzb3VyY2UgSlNPTiBwYXJzZSBlcnJvcjogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc291Y2UgPSAkLmV4dGVuZCh7fSwgX2xhbmcpO1xyXG4gICAgY29uc3QgcHJvcHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgd2hpbGUgKDAgPCBwcm9wcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBwcm9wID0gcHJvcHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAocmVzb3VjZVtwcm9wXSkge1xyXG4gICAgICAgICAgICByZXNvdWNlID0gcmVzb3VjZVtwcm9wXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwicmVzb3VjZSBub3QgZm91bmQuIGtleTogXCIgKyBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb3VjZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3NldHRpbmdzLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JNb2R1bGUgfSBmcm9tIFwiLi9nZW5lcmF0b3ItbW9kdWxlXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvck1vZHVsZShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uLFxyXG4gICAgR2VuZXJhdG9yQmFzZSxcclxuICAgIFV0aWxzLFxyXG59IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElMaWJyYXJ5Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuY29uc3QgZnMgICAgICAgICAgICA9IFV0aWxzLmZzO1xyXG5jb25zdCBnbG9iICAgICAgICAgID0gVXRpbHMuZ2xvYjtcclxuY29uc3QgJCAgICAgICAgICAgICA9IFV0aWxzLiQ7XHJcbmNvbnN0IF8gICAgICAgICAgICAgPSBVdGlscy5fO1xyXG5jb25zdCBkZWJ1ZyAgICAgICAgID0gVXRpbHMuZGVidWc7XHJcbmNvbnN0IHRlbXBsYXRlUGF0aCAgPSBVdGlscy50ZW1wbGF0ZVBhdGg7XHJcbmNvbnN0IGNvcHlUcGwgICAgICAgPSBVdGlscy5jb3B5VHBsO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JNb2R1bGVcclxuICogQGJyaWVmIExpYnJhcnkgTW9kdWxlIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yTW9kdWxlIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcInNyY1wiLFxyXG4gICAgICAgICAgICBwa2c6IFwiZGlzdFwiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJidWlsdFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHRlbXA6IFwiLnRlbXBcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVNb2R1bGVQcm9wcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVQcm9qZWN0U2V0dGluZ3MoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVWaXN1YWxTdHVkaW9Tb2x1dGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkdHMtYnVuZGxlXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0LWZvcm1hdHRlclwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5vZGVqcykge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJqYXNtaW5lLW5vZGVcIiwgdmVyc2lvbjogXCJeMi4wLjBcIiwgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwicmVxdWlyZWpzXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoZGVwZW5kcy5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElMaWJyYXJ5Q29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElMaWJyYXJ5Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1vZHVsZSDlkI0sIG1haW4g44OV44Kh44Kk44Or5ZCN44Gu5L+d6Ki8XHJcbiAgICAgKiAtIDE6IG1vZHVsZU5hbWUg44GM5oyH5a6a44GV44KM44Gm44GE44KL5aC05ZCI44Gv5L2/55So44GZ44KLXHJcbiAgICAgKiAtIDI6IHByb2plY3ROYW1lIOOBjOS9v+eUqOWPr+iDveOBquWgtOWQiOOBr+OBneOCjOOCkuS9v+eUqOOBmeOCi1xyXG4gICAgICogLSAzOiBwcm9qZWN0TmFtZSDjgYzkvb/nlKjkuI3lj6/jga7loLTlkIjjga/jgIFcIi1cIiDjgaTjgarjgY7mloflrZfliJfjgpLnlJ/miJDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbnN1cmVNb2R1bGVQcm9wcygpOiB2b2lkIHtcclxuICAgICAgICAvLyBtb2R1bGUgbmFtZVxyXG4gICAgICAgIGlmIChudWxsID09IHRoaXMuY29uZmlnLm1vZHVsZU5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCEvXi4qWyhcXFxcfFxcc3wvfDp8Knw/fFwifDx8Pnx8KV0uKiQvLnRlc3QodGhpcy5jb25maWcucHJvamVjdE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gdGhpcy5jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gXy50cmltKF8uZGFzaGVyaXplKHRoaXMuY29uZmlnLnByb2plY3ROYW1lKSwgXCItXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlYnVnKFwibW9kdWxlTmFtZTogXCIgKyB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lKTtcclxuXHJcbiAgICAgICAgLy8gbWFpbiBmaWxlIG5hbWVcclxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcubWFpbkJhc2VOYW1lID0gdGhpcy5jb25maWcubW9kdWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWcoXCJtYWluQmFzZU5hbWU6IFwiICsgdGhpcy5jb25maWcubWFpbkJhc2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODh+OCo+ODrOOCr+ODiOODquani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvcHlUcGxEaXIoXCJsaWJyYXJ5L3N0cnVjdHVyZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdHNjb25maWdcclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIHRlc3QgdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLnRlc3QuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcub3V0cHV0LXNhbWUtZGlyLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXNsaW50cmMuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9lc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwiZXNsaW50XCIsIFwiZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5xdWVyeUVzTGludEVudlBhcmFtKCksXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdGVzdGVtXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5ub2RlanMpIHtcclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5L3Rvb2xzL3Rlc3RlbVwiKSwgXCJfdGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIFwidGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGVzdGVtU3R1ZmZQYXRoID0gdGVtcGxhdGVQYXRoKFwibGlicmFyeS90b29scy90ZXN0ZW0vcnVubmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwge1xyXG4gICAgICAgICAgICAgICAgY3dkOiB0ZXN0ZW1TdHVmZlBhdGgsXHJcbiAgICAgICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZXN0ZW1TdHVmZlBhdGgsIGZpbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIGZpbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLmdpdGlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSRUFETUUubWRcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIlJFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzID0gYXdhaXQgdGhpcy5xdWVyeURlcGVuZGVuY2llc1BhcmFtKHRoaXMuY29uZmlnLmRldkRlcGVuZGVuY2llcyB8fCB0aGlzLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicGFja2FnZS5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCveODvOOCueOBrumbm+W9ouS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IF9tb2R1bGUgPSBwYXRoLmJhc2VuYW1lKHRoaXMuX2NvbmZpZy5tb2R1bGVOYW1lLCBcIi5qc1wiKTtcclxuICAgICAgICBjb25zdCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgc2FtcGxlQ2xhc3M6IF8uY2xhc3NpZnkoX21vZHVsZSksXHJcbiAgICAgICAgICAgIHNhbXBsZU1vZHVsZTogX21vZHVsZSxcclxuICAgICAgICAgICAgYnVpbHQ6IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0IHx8IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXgudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXgudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLCBzY3JpcHQsIF9tb2R1bGUgKyBcIi50c1wiKSxcclxuICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBpbmRleC5zcGVjLnRzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwic3JjXCIsIFwiX2luZGV4LnNwZWMudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIF9tb2R1bGUgKyBcIi5zcGVjLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHZzUGFyYW0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVHVUlEID0gVXRpbHMuY3JlYXRlR1VJRDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uID0gPGFueT4kLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBwYXJhbS5wcm9qZWN0TmFtZSAgICAgICA9IHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZTtcclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdEdVSUQgICAgICAgPSBjcmVhdGVHVUlEKCk7XHJcbiAgICAgICAgICAgIHBhcmFtLnR5cGVzICAgICAgICAgICAgID0gcGFyYW0udHlwZXMucmVwbGFjZShcIkBcIiwgXCIlNDBcIik7IC8vIGVzY2FwZSBcIkBcIiB0byBcIiU0MFwiXHJcbiAgICAgICAgICAgIHBhcmFtLm1haW5CYXNlTmFtZSAgICAgID0gdGhpcy5fY29uZmlnLm1haW5CYXNlTmFtZTtcclxuICAgICAgICAgICAgcGFyYW0ubGljZW5zZSAgICAgICAgICAgPSAhdGhpcy5fY29uZmlnLnByaXZhdGU7XHJcblxyXG4gICAgICAgICAgICAvLyB0b29sc1xyXG4gICAgICAgICAgICBwYXJhbS53ZWJwYWNrID0gdGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpO1xyXG4gICAgICAgICAgICBwYXJhbS50ZXN0ZW0gPSAhdGhpcy5jb25maWcubm9kZWpzO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ub3V0cHV0U2FtZURpciA9IHRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXI7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR1cCBidWlsdCBqcyBncm91cFxyXG4gICAgICAgICAgICBwYXJhbS5qc0dyb3VwID0gW107XHJcbiAgICAgICAgICAgIGlmICghcGFyYW0ub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLmJ1aWx0ICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkX3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5taW5pZnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNldHVwIHBrZyBncm91cFxyXG4gICAgICAgICAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLnBrZyArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRfdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluX21hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR1cCB0ZXN0IGpzIGdyb3VwXHJcbiAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS50ZXN0ICsgXCJcXFxcdW5pdFxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lICsgXCIuc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5jb25maWcub3V0cHV0U2FtZURpcixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmIChwYXJhbS5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0uYnVpbHQgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8vIC5zbG5cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBcIl9zb2x1dGlvbi5zbG4udHBsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB2c1BhcmFtLnByb2plY3ROYW1lICsgXCIuc2xuXCIpLFxyXG4gICAgICAgICAgICB2c1BhcmFtLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gLmNzcHJvalxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sU3RyaW5nID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaG9nYW4gPSBVdGlscy5ob2dhbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSBVdGlscy5ub3JtYWxpemVUZXh0O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICAgICAgICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cGwgPSBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmModHBsKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganN0LnJlbmRlcih2c1BhcmFtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sRE9NID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC5wYXJzZVhNTCh0b1htbFN0cmluZyhmaWxlKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxOb2RlID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnN0cjJYbWxOb2RlKHRvWG1sU3RyaW5nKGZpbGUpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRwcm9qID0gdG9YbWxET00oXCJfcHJvamVjdC5jc3Byb2oudHBsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BUUyA9IHRvWG1sTm9kZShcIl90cy5pdGVtLmdyb3VwLnRwbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgJGdwSlMgPSB0b1htbE5vZGUoXCJfanMuaXRlbS5ncm91cC50cGxcIik7XHJcblxyXG4gICAgICAgICAgICAkcHJvalxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJJdGVtR3JvdXBcIilcclxuICAgICAgICAgICAgICAgIC5sYXN0KClcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BUUylcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BKUylcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdFhNTCA9IFV0aWxzLmZvcm1hdFhNTDtcclxuICAgICAgICAgICAgY29uc3QgZHN0UGF0aCA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5jc3Byb2pcIik7XHJcbiAgICAgICAgICAgIGRlYnVnKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSk7XHJcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgZm9ybWF0WE1MKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSkpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQ29yZG92YSB9IGZyb20gXCIuL2dlbmVyYXRvci1jb3Jkb3ZhXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1jb3Jkb3ZhXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckNvcmRvdmEoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbW9iaWxlL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgICQsXHJcbiAgICBfLFxyXG4gICAgaG9nYW4sXHJcbiAgICBkZWJ1ZyxcclxuICAgIHRlbXBsYXRlUGF0aCxcclxuICAgIGNvcHlUcGwsXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIHN0cjJYbWxOb2RlLFxyXG4gICAgeG1sTm9kZTJTdHIsXHJcbiAgICBub3JtYWxpemVUZXh0LFxyXG4gICAgZm9ybWF0WE1MLFxyXG4gICAgY3JlYXRlR1VJRCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uLFxyXG4gICAgR2VuZXJhdG9yQmFzZSxcclxufSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJTW9iaWxlQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JDb3Jkb3ZhXHJcbiAqIEBicmllZiBNb2JpbGUgQ29yZG92YSDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckNvcmRvdmEgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgdGVtcDogXCIudGVtcFwiLFxyXG4gICAgICAgICAgICBsaWI6IFwibGliXCIsXHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBcImV4dGVybmFsXCIsXHJcbiAgICAgICAgICAgIHBvcnRpbmc6IFwicG9ydGluZ1wiLFxyXG4gICAgICAgICAgICByZXM6IFwicmVzXCIsXHJcbiAgICAgICAgICAgIHNyY0NvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0OiBcInNjcmlwdHNcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6IFwic3R5bGVzaGVldHNcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcInRlbXBsYXRlc1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZUNvcmRvdmEoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZGlyKHRoaXMucm9vdERpcik7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQ29yZG92YVNjYWZmb2xkKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29uZmlnWE1MKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YVBsYXRmb3JtcygpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFkZENvcmRvdmFQbHVnaW5zKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YUV4dGVudGlvbkZpbGVzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2FjaGVDb3Jkb3ZhUGFja2FnZUpTT04oKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGRpcihcIi4uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3RTZXR0aW5ncygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU291cmNlVGVtcGxhdGUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY29tbWFuZC5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvcmVxdWlyZWpzXCIsICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJhdXRvcHJlZml4ZXJcIiwgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjbGVhbi1jc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJmcy1leHRyYVwiLCAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJodG1sLW1pbmlmaWVyXCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJub2RlLXNhc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwb3N0Y3NzLWNsaVwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogZGVwZW5kLm5hbWUsIHZlcnNpb246IGRlcGVuZC52ZXJzaW9uLCB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVDb3Jkb3ZhKCkpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwiQHR5cGVzL2NvcmRvdmFcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgZGVmYXVsdERlcGVuZGVuY2llcygpOiBJRGVwZW5kZW5jeVtdIHtcclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6IFwiQGNkcC9tb2JpbGVcIiwgIHZlcnNpb246IFwiZ2l0K3NzaDovL2dpdEBnaXRodWIuY29tL0NEUC1Ub2t5by9jZHAtanMuZ2l0I2RldlwiLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiYmFja2JvbmVcIiwgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImpxdWVyeVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJyZXF1aXJlanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidW5kZXJzY29yZVwiLCAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjb25zdCBleHRyYSA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IGRlcGVuZC5uYW1lLCB2ZXJzaW9uOiBkZXBlbmQudmVyc2lvbiwgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElNb2JpbGVBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SU1vYmlsZUFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOBruacieWKuS/nhKHlirnjg4Hjgqfjg4Pjgq9cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlOiDmnInlirkgLyBmYWxzZTog54Sh5Yq5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNFbmFibGVDb3Jkb3ZhKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoMCA8IHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGliL3BvcnRpbmcg44Gu6Kit5a6a54q25rOB44Gu44OB44Kn44OD44KvXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICogQHJldHVybnMgdHJ1ZTog6Kit5a6aIC8gZmFsc2U6IOacquioreWumlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhc1N0cnVjdHVyZU9mKHRhcmdldDogXCJsaWJcIiB8IFwicG9ydGluZ1wiKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNvbmZpZy5wcm9qZWN0U3RydWN0dXJlICYmIDAgPD0gdGhpcy5jb25maWcucHJvamVjdFN0cnVjdHVyZS5pbmRleE9mKHRhcmdldCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Kk44Oz44K544OI44O844Or5a++6LGhL+mdnuWvvuixoeODgeOCp+ODg+OCr1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lICAgIFtpbl0g44Oi44K444Ol44O844Or5ZCNXHJcbiAgICAgKiBAcGFyYW0gZGVwZW5kcyBbaW5dIOaknOe0ouWvvuixoSAo5pei5a6aIHRoaXMuY29uZmlnLmRlcGVuZGVuY2llcylcclxuICAgICAqIEByZXR1cm5zIHRydWU6IOWvvuixoSAvIGZhbHNlOiDpnZ7lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0luc3RhbGxhdGlvblRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IElEZXBlbmRlbmN5W10gPSB0aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISFkZXBlbmRzLmZpbmQoKGRlcGVuZCkgPT4gbmFtZSA9PT0gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOCkueUqOOBhOOBn+ODl+ODreOCuOOCp+OCr+ODiOS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZUNvcmRvdmFTY2FmZm9sZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmNyZWF0ZUNvcmRvdmFTY2FmZm9sZFwiKTtcclxuICAgICAgICBkZWJ1ZyhcImNyZWF0ZUNvcmRvdmFTY2FmZm9sZFwiKTtcclxuXHJcbiAgICAgICAgLy8gYCQgY29yZG92YSBjcmVhdGUgY29vbC1tb2JpbGUgY29tLnNvbnkuY2RwLmNvb2xtb2JpbGUgXCJDb29sIE1vYmlsZVwiYFxyXG4gICAgICAgIGF3YWl0IGV4ZWNDb21tYW5kKFwiY29yZG92YVwiLCBbXCJjcmVhdGVcIiwgdGhpcy5jb25maWcucHJvamVjdE5hbWUsIHRoaXMuY29uZmlnLmFwcElkLCB0aGlzLmNvbmZpZy5hcHBOYW1lXSk7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBmaWxlc1xyXG4gICAgICAgIGdsb2Iuc3luYyhcInd3dy8qKi8qXCIsIHtcclxuICAgICAgICAgICAgY3dkOiB0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSxcclxuICAgICAgICB9KS5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLnJlbW92ZVN5bmMocGF0aC5qb2luKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBmaWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnMucmVtb3ZlU3luYyhwYXRoLmpvaW4odGhpcy5jb25maWcucHJvamVjdE5hbWUsIFwicmVzXCIpKTtcclxuICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGguam9pbih0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgXCIubnBtaWdub3JlXCIpKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZSByb290IGRpcmVjdG9yeVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBcIi4vXCIpO1xyXG4gICAgICAgIGZzLnJlbW92ZVN5bmModGhpcy5jb25maWcucHJvamVjdE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlnLnhtbCDjga7kv67mraNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb25maWdYTUwoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS51cGRhdGVDb25maWdYbWxcIik7XHJcbiAgICAgICAgZGVidWcoXCJ1cGRhdGVDb25maWdYTUxcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1htbFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJjb25maWcueG1sXCIpO1xyXG4gICAgICAgIGNvbnN0ICRjb25maWdYbWxEb20gPSAkKHN0cjJYbWxOb2RlKGZzLnJlYWRGaWxlU3luYyhjb25maWdYbWxQYXRoKS50b1N0cmluZygpKSk7XHJcblxyXG4gICAgICAgICRjb25maWdYbWxEb21cclxuICAgICAgICAgICAgLmZpbmQoXCJ3aWRnZXRcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJ2ZXJzaW9uXCIsIHRoaXMuY29uZmlnLnZlcnNpb24pXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaW9zLUNGQnVuZGxlSWRlbnRpZmllclwiLCB0aGlzLmNvbmZpZy5hcHBJZClcclxuICAgICAgICAgICAgLnByZXBlbmQoc3RyMlhtbE5vZGUoYFxyXG4gICAgICAgICAgICAgICAgPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz5cclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJLZXlib2FyZERpc3BsYXlSZXF1aXJlc1VzZXJBY3Rpb25cIiB2YWx1ZT1cImZhbHNlXCIvPlxyXG4gICAgICAgICAgICAgICAgPHByZWZlcmVuY2UgbmFtZT1cIkJhY2tncm91bmRDb2xvclwiIHZhbHVlPVwiMHhmZjAwMDAwMFwiIC8+XHJcbiAgICAgICAgICAgIGApKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBjb3Jkb3ZhIHRlYW0gaW5mb3JtYXRpb25cclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwiZGVzY3JpcHRpb25cIilcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgICAgICRjb25maWdYbWxEb21cclxuICAgICAgICAgICAgLmZpbmQoXCJhdXRob3JcIilcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGNvbmZpZ1htbFBhdGgsIGZvcm1hdFhNTCh4bWxOb2RlMlN0cigkY29uZmlnWG1sRG9tKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGxhdGZvcm0g6L+95YqgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkQ29yZG92YVBsYXRmb3JtcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBkZWJ1ZyhcImFkZENvcmRvdmFQbGF0Zm9ybXNcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmNvbmZpZy5wbGF0Zm9ybXMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXJnZXRzLmluZGV4T2YoXCJpb3NcIik7XHJcbiAgICAgICAgaWYgKDAgPD0gaW5kZXggJiYgXCJkYXJ3aW5cIiAhPT0gcHJvY2Vzcy5wbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICB0aGlzLndhcm4oXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuaU9TV2FybmluZ1wiKTtcclxuICAgICAgICAgICAgdGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmFkZFBsYXRmb3Jtc1wiKTtcclxuXHJcbiAgICAgICAgLy8gYCQgY29yZG92YSBwbGF0Zm9ybSBhZGQgYW5kcm9pZCBpb3NgXHJcbiAgICAgICAgYXdhaXQgZXhlY0NvbW1hbmQoXCJjb3Jkb3ZhXCIsIFtcInBsYXRmb3JtXCIsIFwiYWRkXCJdLmNvbmNhdCh0YXJnZXRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwbHVnaW4g6L+95YqgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkQ29yZG92YVBsdWdpbnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5hZGRQbHVnaW5zXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiYWRkQ29yZG92YVBsdWdpbnNcIik7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogSS9GIOOBr+ikh+aVsOOBruODl+ODqeOCsOOCpOODs+OCkuS4gOaLrOOBp+i/veWKoOOBmeOCi+OBk+OBqOOBjOWPr+iDveOBoOOBjOOAgVxyXG4gICAgICAgICAqIGNvcmRvdmEgdmVyc2lvbiDjgpLliKTlrprjgZfjgabjgYTjgovjg5fjg6njgrDjgqTjg7Pjga/oqqTliKTlrprjgZnjgovjgZPjgajjgYzjgYLjgovjgZ/jgoHjgIFcclxuICAgICAgICAgKiAx44Gk44Ga44Gk6L+95Yqg44GZ44KLXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiDku6XkuIvjga7kuI3lhbflkIjjgavpoZ7kvLzjgZnjgovnj77osaFcclxuICAgICAgICAgKiBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NCLTEyNjYzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmNvbmZpZy5jb3Jkb3ZhX3BsdWdpbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYCQgY29yZG92YSBwbHVnaW4gYWRkIGNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3NlcmBcclxuICAgICAgICAgICAgYXdhaXQgZXhlY0NvbW1hbmQoXCJjb3Jkb3ZhXCIsIFtcInBsdWdpblwiLCBcImFkZFwiLCB0aGlzLmNvbmZpZy5jb3Jkb3ZhX3BsdWdpbltpXS5uYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSBwcm9qZWN0IOOBq+i/veWKoOOBmeOCi+ODquOCveODvOOCueOCkuOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFFeHRlbnRpb25GaWxlcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmFkZEV4dGVuc2lvbnNcIik7XHJcbiAgICAgICAgZGVidWcoXCJhZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXNcIik7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwibW9iaWxlL2NvcmRvdmFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOBjOeUn+aIkOOBl+OBnyBwYWNrYWdlLmpzb24g44KS44Kt44Oj44OD44K344OlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY2FjaGVDb3Jkb3ZhUGFja2FnZUpTT04oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoXCIuL3BhY2thZ2UuanNvblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcIi4vcGFja2FnZS5qc29uXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvcmRvdmEgdGVhbSBpbmZvcm1hdGlvblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLm5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24udmVyc2lvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5tYWluO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLnNjcmlwdHM7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24uYXV0aG9yO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICAgICAvLyDjg5XjgqHjgqTjg6vjga/jgYTjgaPjgZ/jgpPliYrpmaRcclxuICAgICAgICAgICAgZnMucmVtb3ZlU3luYyhcIi4vcGFja2FnZS5qc29uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OH44Kj44Os44Kv44OI44Oq5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmFwcC5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmVcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmVcIik7XHJcblxyXG4gICAgICAgIC8vIGFwcCBiYXNlIHN0cnVjdHVyZVxyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcIm1vYmlsZS9zdHJ1Y3R1cmUvYmFzZVwiKTtcclxuXHJcbiAgICAgICAgLy8gbGliXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU3RydWN0dXJlT2YoXCJsaWJcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGUvc3RydWN0dXJlL2xpYlwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmxpYilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHBvcnRpbmdcclxuICAgICAgICBpZiAodGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGUvc3RydWN0dXJlL3BvcnRpbmdcIixcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlOiBkZXYvcG9ydGluZy9AdHlwZXNcclxuICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGgoXCJiYXNlLy5naXRrZWVwXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcyxcclxuICAgICAgICAgICAgICAgICAgICBcIi5naXRrZWVwXCJcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFBMQVRGT1JNU19ST09UID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwbGF0Zm9ybXNcIik7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKFBMQVRGT1JNU19ST09UKVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKHBhdGguam9pbihQTEFURk9STVNfUk9PVCwgcGxhdGZvcm0pKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weVRwbERpcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibW9iaWxlL3N0cnVjdHVyZS9wb3J0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oUExBVEZPUk1TX1JPT1QsIHBsYXRmb3JtLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHd3d1xyXG4gICAgICAgIGNvbnN0IFdXVyA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wa2cpO1xyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhXV1cpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyKFdXVyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRlbXBsYXRlUGF0aChcImJhc2UvLmdpdGtlZXBcIiksIHBhdGguam9pbihXV1csIFwiLmdpdGtlZXBcIikpO1xyXG5cclxuICAgICAgICAvLyB0YXNrXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKiovKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGVtcGxhdGVQYXRoKFwibW9iaWxlL3Rhc2tcIiksXHJcbiAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdGFza1wiKSwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaywgZmlsZSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5hcHAuY3JlYXRlUHJvamVjdFNldHRpbmdzXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiY3JlYXRlUHJvamVjdFNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX3Byb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInByb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAkLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBob2dhbjogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhvZ2FuLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgaGFtbWVyanM6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJoYW1tZXJqc1wiKSxcclxuICAgICAgICAgICAgICAgIGlzY3JvbGw6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRzY29uZmlnXHJcbiAgICAgICAgLy8gdHNjb25maWcuYmFzZS5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfdHNjb25maWcuYmFzZS5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmJhc2UuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX3RzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGVzbGludHJjLmpzb25cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlXCIpLCBcIl9lc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwiZXNsaW50XCIsIFwiZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5xdWVyeUVzTGludEVudlBhcmFtKCksXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdGVzdGVtXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS90b29scy90ZXN0ZW1cIiksIFwiX3Rlc3RlbS5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIFwidGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBjb25zdCB0ZXN0ZW1TdHVmZlBhdGggPSB0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdG9vbHMvdGVzdGVtL3J1bm5lclwiKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwge1xyXG4gICAgICAgICAgICBjd2Q6IHRlc3RlbVN0dWZmUGF0aCxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZXN0ZW1TdHVmZlBhdGgsIGZpbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgZmlsZSlcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyAuZ2l0aWdub3JlXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfZ2l0aWdub3JlXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIi5naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gUkVBRE1FLm1kXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIlJFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZywge1xyXG4gICAgICAgICAgICAgICAgY29yZG92YTogdGhpcy5pc0VuYWJsZUNvcmRvdmEoKSxcclxuICAgICAgICAgICAgICAgIGxpYjogdGhpcy5oYXNTdHJ1Y3R1cmVPZihcImxpYlwiKSxcclxuICAgICAgICAgICAgICAgIHBvcnRpbmc6IHRoaXMuaGFzU3RydWN0dXJlT2YoXCJwb3J0aW5nXCIpLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFRPRE86IHRlbXBsYXRlcy9tb2JpbGUvYWRkb24g44GL44KJ44Kz44OU44O844GZ44KL5aC05ZCI44Gv44GT44GT44Gn5a++5b+cXHJcblxyXG4gICAgICAgIC8vIHBhY2thZ2UuanNvblxyXG4gICAgICAgIGNvbnN0IHJlc29sdmVkQ29uZmlnID0gJC5leHRlbmQodHJ1ZSwge30sIHRoaXMuY29uZmlnKTtcclxuICAgICAgICByZXNvbHZlZENvbmZpZy5kZXBlbmRlbmNpZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0odGhpcy5kZWZhdWx0RGVwZW5kZW5jaWVzKTtcclxuICAgICAgICByZXNvbHZlZENvbmZpZy5kZXZEZXBlbmRlbmNpZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0odGhpcy5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzKTtcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlXCIpLCBcIl9wYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicGFja2FnZS5qc29uXCIpLFxyXG4gICAgICAgICAgICByZXNvbHZlZENvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBjb3Jkb3ZhUGFja2FnZUpTT04g44Go44Oe44O844K4XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbikge1xyXG4gICAgICAgICAgICBjb25zdCBQS0dfUEFUSCA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicGFja2FnZS5qc29uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBwa2cgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhQS0dfUEFUSCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICQuZXh0ZW5kKHRydWUsIHBrZywgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNvcnRLZXlzID0gKHRhcmdldDogb2JqZWN0KTogb2JqZWN0ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvcnRlZCA9IHt9O1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXModGFyZ2V0KS5zb3J0KCkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgc29ydGVkW2tleV0gPSB0YXJnZXRba2V5XTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNvcnRlZDtcclxuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHBrZy5kZXBlbmRlbmNpZXMgICAgPSBzb3J0S2V5cyhwa2cuZGVwZW5kZW5jaWVzKTtcclxuICAgICAgICAgICAgcGtnLmRldkRlcGVuZGVuY2llcyA9IHNvcnRLZXlzKHBrZy5kZXZEZXBlbmRlbmNpZXMpO1xyXG5cclxuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhQS0dfUEFUSCwgSlNPTi5zdHJpbmdpZnkocGtnLCBudWxsLCAyKSwgXCJ1dGYtOFwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgr3jg7zjgrnjga7pm5vlvaLkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVTb3VyY2VUZW1wbGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5hcHAuY3JlYXRlU291cmNlVGVtcGxhdGVcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVTb3VyY2VUZW1wbGF0ZVwiKTtcclxuXHJcbiAgICAgICAgLy8gY29weSBzb3VyY2VzXHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICBcIm1vYmlsZS9zcmMvc3RydWN0dXJlXCIsXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgeyAvLyBjb25maWcudHNcclxuICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbCA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZGVwZW5kZW5jaWVzLmxlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RXaXRoQ3VzdG9tTmFtZTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cyA9IFsuLi50aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMsIC4uLnRoaXMuY29uZmlnLnJlc291cmNlX2FkZG9uXTtcclxuICAgICAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmZpbGVOYW1lIHx8IGluZm8udmVuZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5hZGRpdGlvbmFsLmxpc3RXaXRoQ3VzdG9tTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVuZGVyTmFtZTogaW5mby52ZW5kZXJOYW1lIHx8IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGluZm8uZmlsZU5hbWUgfHwgaW5mby5hbGlhcyB8fCBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLmFkZGl0aW9uYWwubGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyY1wiKSwgXCJfY29uZmlnLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQsIFwiY29uZmlnLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZywgYWRkaXRpb25hbCksXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7IC8vIGFwcC50c1xyXG4gICAgICAgICAgICBjb25zdCBnbG9iYWxzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMubGVuZ3RoIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzTGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHNMaXN0OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXhwb3J0czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cyA9IFsuLi50aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMsIC4uLnRoaXMuY29uZmlnLnJlc291cmNlX2FkZG9uXTtcclxuICAgICAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmdsb2JhbEV4cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5nbG9iYWxzLmV4cG9ydHNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXhwb3J0OiBpbmZvLmdsb2JhbEV4cG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5nbG9iYWxzLmltcG9ydHNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogaW5mby5hbGlhcyB8fCBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uZ2xvYmFscy5oYXNFeHBvcnRzID0gKDAgPCBwYXJhbS5nbG9iYWxzLmV4cG9ydHNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS9zcmNcIiksIFwiX2FwcC50c1wiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0LCBcImFwcC50c1wiKSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHMsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7Ly8gbG9jYWxpemUgcmVzb3VyY2VzXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyY1wiKSwgXCJfbWVzc2FnZXMuZW4tVVMuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3REaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibG9jYWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZXMuZW4tVVMuanNvblwiXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS9zcmNcIiksIFwiX21lc3NhZ2VzLmphLUpQLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnJlcyxcclxuICAgICAgICAgICAgICAgICAgICBcImxvY2FsZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VzLmphLUpQLmpzb25cIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHsvLyBpbmRleC5odG1sXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyY1wiKSwgXCJfaW5kZXguaHRtbFwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIFwiaW5kZXguaHRtbFwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmlzdWFsIFN0dWRpbyDjga7jgr3jg6rjg6Xjg7zjgrfjg6fjg7Pjg5XjgqHjgqTjg6vkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVWaXN1YWxTdHVkaW9Tb2x1dGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB2c1BhcmFtID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW06IElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24gPSA8YW55PiQuZXh0ZW5kKHt9LCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3ROYW1lID0gdGhpcy5fY29uZmlnLnByb2plY3ROYW1lO1xyXG4gICAgICAgICAgICBwYXJhbS5wcm9qZWN0R1VJRCA9IGNyZWF0ZUdVSUQoKTtcclxuICAgICAgICAgICAgcGFyYW0udHlwZXMgPSBwYXJhbS50eXBlcy5yZXBsYWNlKFwiQFwiLCBcIiU0MFwiKTsgLy8gZXNjYXBlIFwiQFwiIHRvIFwiJTQwXCJcclxuICAgICAgICAgICAgcGFyYW0ubGljZW5zZSA9ICF0aGlzLl9jb25maWcucHJpdmF0ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4dGVybmFsXHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5jb3Jkb3ZhICAgID0gdGhpcy5pc0VuYWJsZUNvcmRvdmEoKTtcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmhvZ2FuICAgICAgPSB0aGlzLmlzSW5zdGFsbGF0aW9uVGFyZ2V0KFwiaG9nYW4uanNcIik7XHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5oYW1tZXJqcyAgID0gdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhhbW1lcmpzXCIpO1xyXG4gICAgICAgICAgICAoPGFueT5wYXJhbSkuaXNjcm9sbCAgICA9IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpO1xyXG4gICAgICAgICAgICAoPGFueT5wYXJhbSkuZmxpcHNuYXAgICA9IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJmbGlwc25hcFwiKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHByb2plY3Qgc3RydWN0dXJlXHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5lbmFibGVMaWIgICAgICA9IHRoaXMuaGFzU3RydWN0dXJlT2YoXCJsaWJcIik7XHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5lbmFibGVQb3J0aW5nICA9IHRoaXMuaGFzU3RydWN0dXJlT2YoXCJwb3J0aW5nXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcGxhdGZvcm1zXHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5wbGF0Zm9ybXMgPSBbLi4udGhpcy5jb25maWcucGxhdGZvcm1zXTtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHVwIGJ1aWx0IHRzIGdyb3VwXHJcbiAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAgPSBbXTtcclxuICAgICAgICAgICAgZ2xvYi5zeW5jKFwiKiovKi50c1wiLCB7XHJcbiAgICAgICAgICAgICAgICBjd2Q6IHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3REaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnNyY0NvbmZpZy5zY3JpcHRcclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0pLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3JjQ29uZmlnLnNjcmlwdCxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmRpcm5hbWUoZmlsZSlcclxuICAgICAgICAgICAgICAgICkucmVwbGFjZSgvXFwvL2csIFwiXFxcXFwiKSArIFwiXFxcXFwiO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmlsZU5hbWUgPSBwYXRoLmJhc2VuYW1lKGZpbGUsIFwiLnRzXCIpO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0udHNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHJlbGF0aXZlUGF0aCxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogZmlsZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8gc2V0dXAgdGVzdCB0cyBncm91cFxyXG4gICAgICAgICAgICBnbG9iLnN5bmMoXCIqKi8qLnRzXCIsIHtcclxuICAgICAgICAgICAgICAgIGN3ZDogcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCxcclxuICAgICAgICAgICAgICAgICAgICBcInVuaXRcIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGFyYW0udGVzdCArIFwiXFxcXHVuaXRcXFxcXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHBhdGguYmFzZW5hbWUoZmlsZSwgXCIudHNcIik7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcmVsYXRpdmVQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gLnNsblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3NvbHV0aW9uLnNsbi50cGxcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5zbG5cIiksXHJcbiAgICAgICAgICAgIHZzUGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyAuY3Nwcm9qXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9YbWxTdHJpbmcgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyhmaWxlKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganN0LnJlbmRlcih2c1BhcmFtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sRE9NID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC5wYXJzZVhNTCh0b1htbFN0cmluZyhmaWxlKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxOb2RlID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0cjJYbWxOb2RlKHRvWG1sU3RyaW5nKGZpbGUpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRwcm9qID0gdG9YbWxET00ocGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS92aXN1YWwuc3R1ZGlvXCIpLCBcIl9wcm9qZWN0LmNzcHJvai50cGxcIikpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BUUyA9IHRvWG1sTm9kZShwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBcIl90cy5pdGVtLmdyb3VwLnRwbFwiKSk7XHJcblxyXG4gICAgICAgICAgICAkcHJvalxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJJdGVtR3JvdXBcIilcclxuICAgICAgICAgICAgICAgIC5sYXN0KClcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BUUylcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRzdFBhdGggPSBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB2c1BhcmFtLnByb2plY3ROYW1lICsgXCIuY3Nwcm9qXCIpO1xyXG4gICAgICAgICAgICBkZWJ1Zyh4bWxOb2RlMlN0cigkcHJvaikpO1xyXG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRzdFBhdGgsIGZvcm1hdFhNTCh4bWxOb2RlMlN0cigkcHJvaikpKTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvZ2VuZXJhdG9yLWNvcmRvdmEudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckVsZWN0cm9uIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWVsZWN0b3JvblwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvckRlc2t0b3AoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JFbGVjdHJvbihjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2luZGV4LnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgeyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiwgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JFbGVjdHJvblxyXG4gKiBAYnJpZWYgRGVza3RvcCBFbGVjdHJvbiDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckVsZWN0cm9uIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3L2FwcFwiLCAvLyBUT0RPOiDmmqvlrppcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgc3JjQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQ6IFwic2NyaXB0c1wiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldDogXCJzdHlsZXNoZWV0c1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwidGVtcGxhdGVzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SURlc2t0b3BBcHBDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElEZXNrdG9wQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvZGVza3RvcC9nZW5lcmF0b3ItZWxlY3Rvcm9uLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JCcm93c2VyIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWJyb3dzZXJcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJyb3dzZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQnJvd3Nlcihjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy93ZWIvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSVdlYkFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQnJvd3NlclxyXG4gKiBAYnJpZWYgV2ViIEJyb3dzZXIg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JCcm93c2VyIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElXZWJBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SVdlYkFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XHJcbmV4cG9ydCB7IFV0aWxzIH07XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uLFxyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElMaWJyYXJ5Q29uZmlncmF0aW9uLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlSW5mbyxcclxuICAgIElFeHRlcm5hbE1vZHVsZXMsXHJcbiAgICBJTW9iaWxlQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSURlc2t0b3BBcHBDb25maWdyYXRpb24sXHJcbiAgICBJV2ViQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgLy8vL1xyXG4gICAgbmV3R2VuZXJhdG9yXHJcbn0gZnJvbSBcIi4vZ2VuZXJhdG9yc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbixcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSVByb2plY3RDb25maWdyYXRpb24sXHJcbiAgICBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElFeHRlcm5hbE1vZHVsZUluZm8sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVzLFxyXG4gICAgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbixcclxuICAgIElEZXNrdG9wQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSVdlYkFwcENvbmZpZ3JhdGlvbixcclxufTtcclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGNsYXNzIENEUExpYlxyXG4gKiBAYnJpZWYgQ0RQIGJvaWxlcnBsYXRlIOeUn+aIkOapn+iDveOCkuaPkOS+m+OBmeOCi+OCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0RQTGliIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIG1haW4gY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4ZWN1dGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIFV0aWxzLnNldFNldHRpbmdzKGNvbmZpZy5zZXR0aW5ncyk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvcihjb25maWcpLnJ1bigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY2RwLWxpYi50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifVxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2xvYlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9XG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9XG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn1cbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuZGVyc2NvcmUuc3RyaW5nXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wiLFwiY29tbW9uanMyXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wifVxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hpY2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ1dWlkXCIsXCJjb21tb25qczJcIjpcInV1aWRcIn1cbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VtdmVyLXJlZ2V4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJzZW12ZXItcmVnZXhcIixcImNvbW1vbmpzMlwiOlwic2VtdmVyLXJlZ2V4XCJ9XG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGktc3Bpbm5lclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJqc2RvbVwiLFwiY29tbW9uanMyXCI6XCJqc2RvbVwifVxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieG1sZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ4bWxkb21cIixcImNvbW1vbmpzMlwiOlwieG1sZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7IHNwYXduLCBTcGF3bk9wdGlvbnMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgd2hpY2gsXHJcbiAgICB1dWlkLFxyXG4gICAgU3Bpbm5lcixcclxufSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYXNzZXJ0LFxyXG4gICAgZ2V0TGliUGF0aCxcclxufSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjb21tYW5kIGxpbmUgZXJyb3IgYW5kIGtpbGwgcHJvY2Vzcy5cclxuICogV2hlbiB0aGUgYXBwbGljYXRpb24gcmVjZWl2ZWQgZXJyb3IgZnJvbSBjbGksIHBsZWFzZSBjYWxsIHRoaXMgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3IgIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFzc2VydChmYWxzZSwgZXJyb3IpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIFwidGVtcGxhdGVzXCIg44OH44Kj44Os44Kv44OI44Oq44GL44KJ44Gu44OR44K544KS5Y+W5b6XLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRhcmdldCDjgr/jg7zjgrLjg4Pjg4jjgpLmjIflrpouIG51bGwg44Gu5aC05ZCI44Gv44CBdGVtcGxhdGVzIOOCkui/lOWNtFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlcy9ob2dlaG9nZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlUGF0aCh0YXJnZXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSB0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJ0ZW1wbGF0ZXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGlubmVyIGluc3RhbmNlLlxyXG4gKiBDTEkgaGVscGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBbZm9ybWF0XSAgc3Bpbm5lciBmb3JtYXQgc3RyaW5nLlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBbaW5kZXhdICAgc3Bpbm5lciBpbmRleCBkZWZpbmVkIGJ5IGNsaS1zcGlubmVyLiAoZGVmYXVsdDogcmFuZG9tIFswLTI5XSlcclxuICogQHJldHVybiB7U3Bpbm5lcn0gY2xpLXNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3Bpbm5lcihmb3JtYXQ/OiBzdHJpbmcsIGluZGV4PzogbnVtYmVyKTogeyBzdGFydDogKCkgPT4gdm9pZDsgc3RvcDogKGNsZWFuPzogYm9vbGVhbikgPT4gdm9pZDsgfSB7XHJcbiAgICBjb25zdCBzcGlubmVycyA9IFtcclxuICAgICAgICBcInwvLVxcXFxcIixcclxuICAgICAgICBcIuKUpOKUmOKUtOKUlOKUnOKUjOKUrOKUkFwiLFxyXG4gICAgICAgIFwi4pei4pej4pek4pelXCIsXHJcbiAgICAgICAgXCLiloziloDilpDiloRcIixcclxuICAgICAgICBcIuKWieKWiuKWi+KWjOKWjeKWjuKWj+KWjuKWjeKWjOKWi+KWiuKWiVwiLFxyXG4gICAgICAgIFwi4paB4paD4paE4paF4paG4paH4paI4paH4paG4paF4paE4paDXCIsXHJcbiAgICAgICAgXCLimLHimLLimLRcIixcclxuICAgICAgICBcIi5vT0AqXCIsXHJcbiAgICAgICAgXCLil5Dil5Pil5Hil5JcIixcclxuICAgICAgICAvLy8vXHJcbiAgICAgICAgXCLil6Hil6Eg4oqZ4oqZIOKXoOKXoFwiLFxyXG4gICAgICAgIFwi4pag4pah4paq4parXCIsXHJcbiAgICAgICAgXCLihpDihpbihpHihpfihpLihpjihpPihplcIixcclxuICAgICAgICBcIi5vT8KwT28uXCIsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZm10ID0gZm9ybWF0IHx8IFwiJXNcIjtcclxuICAgIGNvbnN0IHNwaW5uZXIgPSBuZXcgU3Bpbm5lcihmbXQpO1xyXG4gICAgY29uc3QgaWR4ID0gKG51bGwgIT0gaW5kZXggJiYgMCA8PSBpbmRleCAmJiBpbmRleCA8IDE0KSA/IGluZGV4IDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgc3Bpbm5lci5zZXRTcGlubmVyU3RyaW5nKHNwaW5uZXJzW2lkeF0pO1xyXG4gICAgcmV0dXJuIHNwaW5uZXI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9uc1xyXG4gKiBAYnJpZWYgbm9ybWFsaXplVGV4dCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBlb2w/OiBzdHJpbmc7ICAgLy8gZGVmYXVsdDogb3MuRU9MXHJcbiAgICBib20/OiBib29sZWFuOyAgLy8gZGVmYXVsdDogdHJ1ZVxyXG4gICAgdGFiPzogbnVtYmVyOyAgIC8vIHRhYiDjgpLlpInmj5vjgZnjgovjgrnjg5rjg7zjgrnjga7mlbDjgpLmjIflrpouIGRlZmF1bHQ6IOWkieaPm+OBl+OBquOBhFxyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIHRleHQgbGluZS1mZWVkLlxyXG4gKiBmb3Igd2luZG93cyBnaXQgdXNlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgIHRleHQgICAgICBpbnB1dCB0ZXh0LlxyXG4gKiBAcGFyYW0gIHtOb3JtYWxpemVUZXh0T3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbi5cclxuICogQHJldHVybiB7U3RyaW5nfSBub3JtYWxpemVkIHRleHQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBOb3JtYWxpemVUZXh0T3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IE5vcm1hbGl6ZVRleHRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFx1ZmVmZi9nbSwgXCJcIikgICAvLyByZW1vdmUgYm9tXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcclxcbi9nbSwgXCJcXG5cIikgICAgLy8gb25jZSBcIlxcblwiXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nbSwgXCJcXG5cIilcclxuICAgIDtcclxuXHJcbiAgICBpZiAob3B0LmJvbSkge1xyXG4gICAgICAgIHRleHQgPSBcIlxcdWZlZmZcIiArIHRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoXCJcXG5cIiAhPT0gb3B0LmVvbCkge1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nbSwgb3B0LmVvbCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0LnRhYikge1xyXG4gICAgICAgIGNvbnN0IHNwYWNlcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHQudGFiOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZ20sIHNwYWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnNcclxuICogQGJyaWVmIGV4ZWNDb21tYW5kKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9ucyBleHRlbmRzIFNwYXduT3B0aW9ucyB7XHJcbiAgICBzcGlubmVyPzoge1xyXG4gICAgICAgIGZvcm1hdD86IHN0cmluZzsgICAgLy8gZXgpIFwiJXNcIlxyXG4gICAgICAgIGluZGV4PzogbnVtYmVyOyAgICAgLy8gMCAtIDkg44Gu5pWw5YCk44KS5oyH5a6aXHJcbiAgICB9O1xyXG4gICAgc3Rkb3V0PzogKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIHN0ZGVycj86IChkYXRhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIGNvbW1hbmQgbGluZSBieSBzcGF3bi5cclxuICogY2FsbCBzcGF3bi4gaWYgZXJyb3Igb2NjdXJlZCwgY3VpIGlzIGtpbGxlZCBwcm9jY2Vzcy5cclxuICpcclxuICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgICAgICBjb21tYW5kICAgIG1haW4gY29tbWFuZC4gZXgpIFwiY29yZG92YVwiXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmdbXX0gICAgICAgICAgICAgYXJncyAgICAgICBjb21tYW5kIGFyZ3MuIGV4KSBbXCJwbHVnaW5cIiwgXCJhZGRcIiwgcGx1Z2luTmFtZV1cclxuICogQHBhcmFtICAge0V4ZWNDb21tYW5kT3B0aW9uc30gICBbb3B0aW9uc10gIGNsaS1zcGlubmVyXCJzIG9wdGlvbnMuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGVycm9yIGNvZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogRXhlY0NvbW1hbmRPcHRpb25zKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0OiBFeGVjQ29tbWFuZE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgICAgICBzdGRpbzogXCJpbmhlcml0XCIsXHJcbiAgICAgICAgICAgIHNwaW5uZXI6IHsgZm9ybWF0OiBcIiVzXCIgfSxcclxuICAgICAgICAgICAgc3Rkb3V0OiAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7IC8qIG5vb3AgKi8gfSxcclxuICAgICAgICAgICAgc3RkZXJyOiAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7IC8qIG5vb3AgKi8gfSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgd2hpY2goY29tbWFuZCwgKGVycm9yLCByZXNvbHZlZENvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcGlubmVyID0gb3B0LnNwaW5uZXIgPyBnZXRTcGlubmVyKG9wdC5zcGlubmVyLmZvcm1hdCwgb3B0LnNwaW5uZXIuaW5kZXgpIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzcGF3bihyZXNvbHZlZENvbW1hbmQsIGFyZ3MsIG9wdClcclxuICAgICAgICAgICAgICAgIC5vbihcImVycm9yXCIsIGhhbmRsZUVycm9yKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnN0b3AodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcInBpcGVcIiA9PT0gb3B0LnN0ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0LnN0ZG91dChkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0LnN0ZGVycihkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgQ29weVRlbXBsYXRlT3B0aW9uc1xyXG4gKiBAYnJpZWYgY29weVRwbCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgZGVsaW1pdGVycz86IFwie3sgfX1cIiB8IFwiPCUgJT5cIjsgLy8gdGVtcGxhdGUg44Gr5L2/55So44GZ44KLIGRlbGltaXRlci4gZGVmYXVsdDogXCJ7eyB9fVwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb3B5IHRlbXBsYXRlIHdpdGggaG9nYW4uXHJcbiAqIHN5bmMgZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgc3JjICAgICAgIHNvdXJjZSBmaWxlIHBhdGguXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgIGRzdCAgICAgICBkZXN0aW5hdGlvbiBmaWxlIHBhdGguXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgIHBhcmFtcyAgICB0ZW1wbGF0ZSBwYXJhbWV0ZXJzLlxyXG4gKiBAcGFyYW0ge0NvcHlUZW1wbGF0ZU9wdGlvbnN9ICBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29weVRwbChzcmM6IHN0cmluZywgZHN0OiBzdHJpbmcsIHBhcmFtczogT2JqZWN0LCBvcHRpb25zPzogQ29weVRlbXBsYXRlT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0ID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyhzcmMpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHQpO1xyXG4gICAgY29uc3Qgb3V0cHV0ID0gbm9ybWFsaXplVGV4dChqc3QucmVuZGVyKHBhcmFtcyksIG9wdCk7XHJcblxyXG4gICAgZnMuZW5zdXJlRmlsZVN5bmMoZHN0KTtcclxuICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0LCBvdXRwdXQsIFwidXRmOFwiKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBHVUlEIGdlbmVyYXRlLlxyXG4gKiByZXR1cm5lZCBhcyBXaW5kb3dzIHJlZ2lzdHJ5IHR5cGUgZm9ybWF0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR1VJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwie1wiICsgdXVpZC52NCgpLnRvVXBwZXJDYXNlKCkgKyBcIn1cIjtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgWE1MIERPTSBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0gICBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJucyBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cjJYbWxOb2RlKHN0cjogc3RyaW5nKTogSlF1ZXJ5IHtcclxuICAgIGxldCBmdWxsWE1MID0gdHJ1ZTtcclxuICAgIGlmICghLzw/eG1sL2kudGVzdChzdHIpKSB7XHJcbiAgICAgICAgZnVsbFhNTCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgJHhtbCA9ICQoJC5wYXJzZVhNTChzdHIpKTtcclxuICAgIHJldHVybiBmdWxsWE1MID8gJHhtbCA6ICR4bWwuY2hpbGRyZW4oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgc3RyaW5nIGZyb20gRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHJldHVybiB7alF1ZXJ5fSBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHhtbE5vZGUyU3RyKCR4bWw6IEpRdWVyeSk6IHN0cmluZyB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4gICAgcmV0dXJuIG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoJHhtbFswXSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnNcclxuICogQGJyaWVmIGZvcm1hdFhNTCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgc3RlcD86IG51bWJlcjsgICAvLyDnqbrnmb3jgrnjg5rjg7zjgrnmlbAuIGRlZmF1bHQ6IDJcclxufVxyXG5cclxuLyoqXHJcbiAqIFhNTCBmb3JtYXR0ZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgIHN0ciAgICAgICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHBhcmFtICB7Rm9ybWF0WG1sT3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBYTUxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRYTUwoc3RyOiBzdHJpbmcsIG9wdGlvbnM/OiBGb3JtYXRYbWxPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogRm9ybWF0WG1sT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIHN0ZXA6IDIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuICAgIGxldCB4bWwgPSBcIlwiO1xyXG4gICAgbGV0IHBhZCA9IDA7XHJcbiAgICBsZXQgaW5kZW50OiBudW1iZXI7XHJcbiAgICBsZXQgbm9kZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0IHN0ckFyciA9IG5vcm1hbGl6ZVRleHQoc3RyLCB7IGVvbDogXCJcXG5cIiB9KVxyXG4gICAgICAgIC5yZXBsYWNlKC8oPikoPCkoXFwvKikvZywgXCIkMVxcbiQyJDNcIikgLy8gaW5zZXJ0IExGIHRvIGVhY2ggbm9kZSBvbmNlLlxyXG4gICAgICAgIC5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBjb25zdCBzcGFjZXMgPSAobGVuOiBudW1iZXIpID0+IHtcclxuICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgX2luZGVudCA9IGxlbiAqIG9wdC5zdGVwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX2luZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgbm9kZSA9ICQudHJpbShzdHJBcnJbaV0pO1xyXG4gICAgICAgIGlmIChub2RlLm1hdGNoKC8uKzxcXC9cXHdbXj5dKj4kLykpIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFwvXFx3LykpIHtcclxuICAgICAgICAgICAgaWYgKHBhZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBhZCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcd1tePl0qW14vXT4uKiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhtbCArPSBzcGFjZXMocGFkKSArIG5vZGUgKyBcIlxcblwiO1xyXG4gICAgICAgIHBhZCArPSBpbmRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgeG1sID0geG1sXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcblxcbi9nbSwgXCJcXG5cIilcclxuICAgICAgICAucmVwbGFjZSgvXiArXFxuL2dtLCBcIlwiKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplVGV4dCh4bWwsIG9wdCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy90b29scy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IGFzc2VydCB9IGZyb20gXCIuLi91dGlscy9zZXR0aW5nc1wiO1xyXG5cclxuaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvckxpYnJhcnkgfSBmcm9tIFwiLi9saWJyYXJ5XCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvck1vYmlsZSB9IGZyb20gXCIuL21vYmlsZVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JEZXNrdG9wIH0gZnJvbSBcIi4vZGVza3RvcFwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JXZWIgfSBmcm9tIFwiLi93ZWJcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2Jhc2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGlicmFyeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9tb2JpbGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZGVza3RvcFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi93ZWJcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHN3aXRjaCAoY29uZmlnLnByb2plY3RUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImxpYnJhcnlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvckxpYnJhcnkoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwibW9iaWxlXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JNb2JpbGUoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwiZGVza3RvcFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yRGVza3RvcChjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvcldlYihjb25maWcpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgXCJ1bnN1cHBvcnRlZCBwcm9qZWN0IGtpbmQ6IFwiICsgY29uZmlnLnByb2plY3RUeXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy9nZW5lcmF0b3JzL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcbmV4cG9ydCB7IFV0aWxzIH07XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb25cclxuICogQGJyaWVmIOOCveODvOOCueODh+OCo+ODrOOCr+ODiOODquOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24ge1xyXG4gICAgc2NyaXB0Pzogc3RyaW5nOyAgICAgICAgICAgIC8vIGpzKHRzKSDjg5XjgqHjgqTjg6vkv53lrZjlhYhcclxuICAgIHN0eWxlc2hlZXQ/OiBzdHJpbmc7ICAgICAgICAvLyBjc3MoY3NzKSDjg5XjgqHjgqTjg6vkv53lrZjlhYhcclxuICAgIHRlbXBsYXRlPzogc3RyaW5nOyAgICAgICAgICAvLyBodG1sKHRlbXBsYXRlKSDjg5XjgqHjgqTjg6vkv53lrZjlhYhcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODl+ODreOCuOOCp+OCr+ODiOODh+OCo+ODrOOCr+ODiOODquOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzcmM/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCveODvOOCueOCs+ODvOODieOBruODq+ODvOODiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcGtnPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5Hjg4PjgrHjg7zjgrjlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGJ1aWx0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Kz44Oz44OR44Kk44Or5YWI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBkb2M/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODieOCreODpeODoeODs+ODiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGFzaz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr/jgrnjgq/jg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRlc3Q/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OG44K544OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0eXBlcz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg5Z6L5a6a576p44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0ZW1wPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOS9nOalreODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgc3JjQ29uZmlnPzogSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uOyAgICAvLyBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb25cclxuICAgIGxpYj86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW50ZXJuYWwgbGlicmFyeSBtb2R1bGUg44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBleHRlcm5hbD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4dGVybmFsIG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHBvcnRpbmc/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9ydGluZyBtb2R1bGUg44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICByZXM/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODquOCveODvOOCueODh+OCo+ODrOOCr+ODiOODquWQjVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJRGVwZW5kZW5jeVxyXG4gKiBAYnJpZWYgcGFja2FnZS5qc29uIOOBq+aMh+WumuOBmeOCiyBkZXBlbmRlbmNpZXMg5oOF5aCx44KS5qC857SN44GZ44KL44Kk44Oz44K/44O844OV44Kn44Kk44K5XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElEZXBlbmRlbmN5IHtcclxuICAgIG5hbWU6IHN0cmluZzsgICAgICAgICAgIC8vIG1vZHVsZSBuYW1lIGV4KSBcInR5cGVzY3JpcHRcIlxyXG4gICAgdmVyc2lvbj86IHN0cmluZzsgICAgICAgLy8g5oyH5a6a44OQ44O844K444On44OzLiDnhKHmjIflrprjga7loLTlkIjjga/mnIDmlrDjg5Djg7zjgrjjg6fjg7NcclxuICAgIGVzPzogc3RyaW5nW107ICAgICAgICAgIC8vIOaMh+WumuOBleOCjOOBnyBFUyB2ZXJzaW9uIOOBruOBqOOBjeOBruOBv+acieWKueOBq+OBmeOCi1xyXG4gICAgZ2xvYmFsRXhwb3J0Pzogc3RyaW5nOyAgLy8gZ2xvYmFsIGV4cG9ydCDjgpLlv4XopoHjgajjgZnjgovjgoLjga7jga8gZ2xvYmFsIE9iamVjdCDlkI3jgpLmjIflrppcclxuICAgIGFsaWFzPzogc3RyaW5nOyAgICAgICAgIC8vIGFsaWFzIOOCkuioreWumuOBmeOCi+WgtOWQiOOBq+aMh+WumlxyXG4gICAgdmVuZGVyTmFtZT86IHN0cmluZzsgICAgLy8gdmVuZGVyIOWQjeOCkuioreWumuOBmeOCi+WgtOWQiOOBq+aMh+WumlxyXG4gICAgZmlsZU5hbWU/OiBzdHJpbmc7ICAgICAgLy8gZmlsZSDlkI3jgpLoqK3lrprjgZnjgovloLTlkIjjgavmjIflrppcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODl+ODreOCuOOCp+OCr+ODiOWFsemAmuOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvamVjdENvbmZpZ3JhdGlvbiB7XHJcbiAgICBwcm9qZWN0TmFtZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBwcm9qZWN0VHlwZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jnqK7poZ4gZXgpIFwibGlicmFyeVwiXHJcbiAgICBhY3Rpb246IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleCkgXCJjcmVhdGVcIlxyXG4gICAgdmVyc2lvbjogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OQ44O844K444On44OzIGV4KSBcIjEuMC4wXCJcclxuICAgIGxpY2Vuc2U6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODqeOCpOOCu+ODs+OCuSBleCkgXCJBcGFjaGUtMi4wXCJcclxuICAgIHByaXZhdGU/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaXZhdGUg44OR44OD44Kx44O844K444Gu5aC05ZCIIHRydWVcclxuICAgIHNldHRpbmdzOiBVdGlscy5JR2xvYmFsU2V0dGluZ3M7ICAgICAgICAgICAgICAgIC8vIOODreOCsOOCquODl+OCt+ODp+ODs1xyXG4gICAgbW9kdWxlTmFtZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IOOBq+aMh+WumuOBmeOCiyDjg6Ljgrjjg6Xjg7zjg6vlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBtYWluQmFzZU5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6HjgqTjg7Pjg5XjgqHjgqTjg6vlkI0gZXgpIFwiY2RwLWxpYlwiIC8gXCJpbmRleFwiXHJcbiAgICBuYW1lc3BhY2U/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6vjg7zjg4jlkI3liY3nqbrplpNcclxuICAgIHN0cnVjdHVyZUNvbmZpZz86IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uOyAgIC8vIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uXHJcbiAgICBjb3B5cmlnaHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg5Tjg7zjg6njgqTjg4jmloflrZfliJcgZXgpIFwiQ29weXJpZ2h0IChjKSAyMDE3IFNvbnkgQ29ycG9yYXRpb25cIlxyXG4gICAgZGV2RGVwZW5kZW5jaWVzPzogSURlcGVuZGVuY3lbXTsgICAgICAgICAgICAgICAgLy8g6ZaL55m655So5L6d5a2Y44Oi44K444Ol44O844Or5oOF5aCxXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OT44Or44OJ44K/44O844Ky44OD44OI44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbiB7XHJcbiAgICBlcz86IFwiZXM1XCIgfCBcImVzMjAxNVwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDjga4gdHJhbnNwaWxlIHRhcmdldFxyXG4gICAgbW9kdWxlPzogXCJub25lXCIgfCBcImNvbW1vbmpzXCIgfCBcImFtZFwiIHwgXCJ1bWRcIjsgICAgICAgICAgICAgICAvLyBKYXZhU2NyaXB0IG1vZHVsZSBzeXN0ZW1cclxuICAgIGVudj86IFwid2ViXCIgfCBcIm5vZGVcIiB8IFwiZWxlY3Ryb25cIiB8IFwiZWxlY3Ryb24tcmVuZGVyZXJcIjsgICAgLy8g5a6f6KGM55Kw5aKD44GuIHRhcmdldFxyXG4gICAgbm9kZWpzPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJub2RlXCIgfCBcImVsZWN0cm9uXCIg44Gu5aC05ZCI44GrIHRydWVcclxuICAgIG1pbmlmeT86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODquODquODvOOCueaZguOBqyBtaW5pZnkg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIC8vIGJ1aWxkIHRvb2xcclxuICAgIHRvb2xzPzogc3RyaW5nW107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaXouWumuOBriBidWlsZCB0b29sIGV4KSBbXCJ3ZWJwYWNrXCJdXHJcbiAgICBvdXRwdXRTYW1lRGlyPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcmMg44GoIGJ1aWx0IOOBjOWQjOOBmOODh+OCo+ODrOOCr+ODiOODquOBq+OBquOCi+WgtOWQiCB0cnVlXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElXZWJwYWNrQ29uZmlncmF0aW9uXHJcbiAqIEBicmllZiBXZWJwYWNrIOeUqOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJV2VicGFja0NvbmZpZ3JhdGlvbiB7XHJcbiAgICBub2RlanM6IGJvb2xlYW47ICAgIC8vIFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIOOBruWgtOWQiOOBqyB0cnVlXHJcbiAgICBndWlkZTogYm9vbGVhbjsgICAgIC8vIGd1aWRlIOOCs+ODoeODs+ODiOOCkuS7mOWKoOOBmeOCi+WgtOWQiOOBryB0cnVlIOOCkuaMh+WumlxyXG4gICAgdGFza1BhdGg6IHN0cmluZzsgICAvLyAndGFzaycg44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb25cclxuICogQGJyaWVmIFZpc3VhbCBTdHVkaW8g55So44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24gZXh0ZW5kcyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBwcm9qZWN0TmFtZTogc3RyaW5nOyAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgcHJvamVjdEdVSUQ6IHN0cmluZzsgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiCBHVUlEIGV4KSB7NTFCNDEzNTktOEQyQy00MkRGLTg0MTQtRTg1QjAyOTkzMjM4fVxyXG4gICAgbWFpbkJhc2VOYW1lOiBzdHJpbmc7ICAgICAgIC8vIOODoeOCpOODs+ODleOCoeOCpOODq+WQjSBleCkgXCJjZHAtbGliXCIgLyBpbmRleFxyXG4gICAgbGljZW5zZTogYm9vbGVhbjsgICAgICAgICAgIC8vIExJQ0VOU0Ug44KS6L+95Yqg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIHdlYnBhY2s6IGJvb2xlYW47ICAgICAgICAgICAvLyB3ZWJwYWNrLmNvbmZpZy5qcyDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgdGVzdGVtOiBib29sZWFuOyAgICAgICAgICAgIC8vIHRlc3RlbSBydW5uZXIg44KS6L+95Yqg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIG91dHB1dFNhbWVEaXI6IGJvb2xlYW47ICAgICAvLyBzcmMg44GoIGJ1aWx0IOOBjOWQjOOBmOODh+OCo+ODrOOCr+ODiOODquOBq+OBquOCi+WgtOWQiCB0cnVlXHJcbiAgICB0c0dyb3VwOiB7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmc7ICAgLy8gXCJob2dlaG9nZVxcXCJcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nOyAgICAgICAvLyBcImNkcC1saWJcIlxyXG4gICAgICAgIGRlcGVuZGVlOiBib29sZWFuOyAgICAgIC8vIOS+neWtmOWFiOOCkui/veWKoOOBmeOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWFwOiBib29sZWFuOyAgICAgICAgICAgLy8gLm1hcCDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgfVtdO1xyXG4gICAganNHcm91cDoge1xyXG4gICAgICAgIHJlbGF0aXZlUGF0aDogc3RyaW5nOyAgIC8vIFwiaG9nZWhvZ2VcXFwiXHJcbiAgICAgICAgZmlsZU5hbWU6IHN0cmluZzsgICAgICAgLy8gXCJjZHAtbGliXCJcclxuICAgICAgICBkZXBlbmRlZTogYm9vbGVhbjsgICAgICAvLyDkvp3lrZjlhYjjgpLov73liqDjgZnjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIGRfdHM6IGJvb2xlYW47ICAgICAgICAgIC8vIC5kLnRzIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWFwOiBib29sZWFuOyAgICAgICAgICAgLy8gLm1hcCDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIG1pbl9tYXA6IGJvb2xlYW47ICAgICAgIC8vIC5taW4gLm1hcCDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgfVtdO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2ludGVyZmFjZXMudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGdsb2IsXHJcbiAgICBjaGFsayxcclxuICAgIF8sXHJcbiAgICAkLFxyXG4gICAgLy8vL1xyXG4gICAgZXhlY0NvbW1hbmQsXHJcbiAgICBnZXRTcGlubmVyLFxyXG4gICAgZ2V0VGFyZ2V0RGlyLFxyXG4gICAgdGVtcGxhdGVQYXRoLFxyXG4gICAgY29weVRwbCxcclxuICAgIGxvZyxcclxuICAgIGRlYnVnLFxyXG4gICAgdHJhbnNsYXRlLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJwYWNrQ29uZmlncmF0aW9uLFxyXG59IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQmFzZVxyXG4gKiBAYnJpZWYg44GZ44G544Gm44GuIEdlbmVyYXRvciDjga7ml6Llrprjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9wcm9qZWN0Um9vdERpcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQcm9qZWN0Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44KwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3RSb290RGlyID0gZ2V0VGFyZ2V0RGlyKCkgP1xyXG4gICAgICAgICAgICBnZXRUYXJnZXREaXIoKSA6XHJcbiAgICAgICAgICAgIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB0aGlzLl9jb25maWcucHJvamVjdE5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnID0gJC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKSwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcml2YXRlID0gXCJOT05FXCIgPT09IHRoaXMuX2NvbmZpZy5saWNlbnNlO1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm91dHB1dFNhbWVEaXJcclxuICAgICAgICAgICAgPSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyA9PT0gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdDtcclxuXHJcbiAgICAgICAgKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMgPSAoKGVudjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW52KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibm9kZVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImVsZWN0cm9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZW52KTtcclxuXHJcbiAgICAgICAgZGVidWcoSlNPTi5zdHJpbmdpZnkodGhpcy5fY29uZmlnLCBudWxsLCA0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh6bnkIbplovlp4sgKOOCqOODs+ODiOODqilcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jb25maWcuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcmVhdGVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5rbm93biBhY3Rpb246IFwiICsgdGhpcy5fY29uZmlnLmFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBhYnN0cmFjdCBtZXRob2RzOlxyXG5cclxuICAgIC8vIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICBhYnN0cmFjdCBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjtcclxuXHJcbiAgICAvLyBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgIGFic3RyYWN0IGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8vIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcm90ZWN0ZWQgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAsuaNl+ODhuOCreOCueODiOOCkumAmuefpVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkg44Ot44O844Kr44Op44Kk44K644Oq44K944O844K544Kt44O844KS5oyH5a6aXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9ncmVzcyhrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay5jeWFuKHRyYW5zbGF0ZShrZXkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorablkYrjg4bjgq3jgrnjg4jjgpLpgJrnn6VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5IOODreODvOOCq+ODqeOCpOOCuuODquOCveODvOOCueOCreODvOOCkuaMh+WumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgd2FybihrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay55ZWxsb3codHJhbnNsYXRlKGtleSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdvcmsgZGlyZWN0b3J5IOOBruWkieabtFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZGlyKGRpcmVjdG9yeTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgcHJvY2Vzcy5jaGRpcihkaXJlY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvamVjdCByb290IGRpcmVjdG9yeSDjga7lj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgcm9vdERpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Um9vdERpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlbXBsYXRlIGRpcmVjdG9yeSDjgpLmjIflrprjgZfjgabphY3kuIvjga7jg5XjgqHjgqTjg6vjgpLjgrPjg5Tjg7xcclxuICAgICAqIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIOOBruioreWumuOBjOWPjeaYoOOBleOCjOOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgIOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHN0Um9vdCDjgrPjg5Tjg7zlhYjjgpLmjIflrpouIOaMh+WumuOBjOeEoeOBhOWgtOWQiOOBryByb290RGlyIOOBjOioreWumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29weVRwbERpcih0YXJnZXQ6IHN0cmluZywgZHN0Um9vdD86IHN0cmluZywgb3B0aW9ucz86IGdsb2IuSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBkc3RSb290ID0gZHN0Um9vdCB8fCB0aGlzLnJvb3REaXI7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgY3dkOiB0ZW1wbGF0ZVBhdGgodGFyZ2V0KSxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdDogdHJ1ZSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRzdCA9IHBhdGguam9pbihkc3RSb290LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3NyYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3BrZy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnBrZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2J1aWx0LywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvZG9jLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZG9jKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGFzay8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rlc3QvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlcy8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3RlbXBcXC8vLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlbXAgKyBcIi9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2xpYi8sICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5saWIgfHwgXCJsaWJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2V4dGVybmFsLywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5leHRlcm5hbCB8fCBcImV4dGVybmFsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9wb3J0aW5nLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZyB8fCBcInBvcnRpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Jlcy8sICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5yZXMgfHwgXCJyZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvc2NyaXB0LyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0IHx8IFwic2NyaXB0c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJzY3JpcHRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9zdHlsZXNoZWV0LyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc3R5bGVzaGVldCB8fCBcInN0eWxlc2hlZXRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInN0eWxlc2hlZXRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC90ZW1wbGF0ZS8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnLnRlbXBsYXRlIHx8IFwidGVtcGxhdGVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInRlbXBsYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhwYXRoLmpvaW4odGVtcGxhdGVQYXRoKHRhcmdldCksIGZpbGUpLCBkc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm9kZSBtb2R1bGUg44GuIHZlcnNpb24g5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9taXNlPHN0cmluZz59IHZlcnNpb24gdGV4dFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlOb2RlTW9kdWxlTGF0ZXN0VmVyc2lvbihuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGV4ZWNDb21tYW5kKFwibnBtXCIsIFtcImluZm9cIiwgbmFtZSwgXCJ2ZXJzaW9uXCJdLCB7XHJcbiAgICAgICAgICAgICAgICBzdGRpbzogXCJwaXBlXCIsXHJcbiAgICAgICAgICAgICAgICBzcGlubmVyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc3Rkb3V0OiAoZGF0YTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IF8udHJpbShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga7plovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHREZXZEZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcImNvbnZlcnQtc291cmNlLW1hcFwiLCAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImRlbFwiLCAgICAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImVzbGludFwiLCAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIm5wbS1ydW4tYWxsXCIsICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInBsYXRvXCIsICAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInNvdXJjZS1tYXBcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInRzbGludFwiLCAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInR5cGVkb2NcIiwgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInR5cGVzY3JpcHRcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGNvbnN0IG1pbmlmeSA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcInVnbGlmeS1qc1wiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIGVzOiBbXCJlczVcIl0sICAgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktZXNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlczogW1wiZXMyMDE1XCJdLCB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBleHRyYSA9IFtdO1xyXG4gICAgICAgIGlmICgoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1pbmlmeSkge1xyXG4gICAgICAgICAgICBleHRyYSA9IGV4dHJhLmNvbmNhdChtaW5pZnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcIndlYnBhY2tcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInNvdXJjZS1tYXAtbG9hZGVyXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcIm55Y1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJueWNcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwidGVzdGVtXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInRlc3RlbVwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJwaGFudG9tanMtcHJlYnVpbHRcIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwicGhhbnRvbWpzLXByZWJ1aWx0XCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoYmFzZS5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXBlbmRlbmNpZXMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7SURlcGVuZGVuY3lbXX0gZGVwZW5kZW5jaWVzIOS+neWtmOmWouS/guODquOCueODiFxyXG4gICAgICogQHJldHVybiB7eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW47IH1bXX0g44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Gr5oyH5a6a44GZ44KL6YWN5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhc3luYyBxdWVyeURlcGVuZGVuY2llc1BhcmFtKGRlcGVuZGVuY2llczogSURlcGVuZGVuY3lbXSk6IFByb21pc2U8eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW4gfVtdPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcImJhc2UuY3JlYXRlLnF1ZXJ5VmVyc2lvblwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IDx7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbjsgfVtdPmRlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAuZmlsdGVyKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGRlcGVuZC5lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFkZXBlbmQuZXMuZmluZCgoZXNWZXJzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLmVzID09PSBlc1ZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeShkZXBlbmRzLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gKGNvbnRleHQ6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgY29udGV4dCAmJiAhdGhpcy5fY29uZmlnLnNldHRpbmdzLnNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IGdldFNwaW5uZXIoY2hhbGsueWVsbG93KGNvbnRleHQpLCA1KTtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGlubmVyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gZGVwZW5kcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kc1tpXS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gcHJvZ3Jlc3MoZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0udmVyc2lvbiA9IFwiXlwiICsgYXdhaXQgdGhpcy5xdWVyeU5vZGVNb2R1bGVMYXRlc3RWZXJzaW9uKGRlcGVuZHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyhzcGlubmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0ubGFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZXBlbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2VicGFjay5jb25maWcuanMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBsaWJyYXJ5VGFyZ2V0IOOBq+aMh+WumuOBmeOCi+aWh+Wtl+WIl1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlXZWJwYWNrTGlicmFyeVRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5tb2R1bGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNvbW1vbmpzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tb25qczJcIjtcclxuICAgICAgICAgICAgY2FzZSBcImFtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYW1kXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bWRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInVtZFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBlc2xpbnRyYyDjga4gZW52IOOBq+aMh+WumuOBmeOCiyB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gZW52IOOBq+aMh+WumuOBmeOCi+ODhuODs+ODl+ODrOODvOODiOODkeODqeODoeODvOOCv+OCquODluOCuOOCp+OCr+ODiFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlFc0xpbnRFbnZQYXJhbSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBpbGVTZXR0aW5nID0gPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXM2OiBcImVzNVwiICE9PSBjb21waWxlU2V0dGluZy5lcyxcclxuICAgICAgICAgICAgbm9kZTogXCJ3ZWJcIiAhPT0gY29tcGlsZVNldHRpbmcuZW52LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24udG9vbHMg44OX44Ot44OR44OG44Kj44Gu5oyH5a6a54q25rOB44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZSDjg4Tjg7zjg6vlkI3jgpLmjIflrppcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWU6IOaMh+WumuOBleOCjOOBpuOBhOOCiyAvIGZhbHNlOiDmjIflrprjgZXjgozjgabjgYTjgarjgYRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGlzRW5hYmxlVG9vbChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISEoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLnRvb2xzLmZpbmQoKHRvb2wpID0+IG5hbWUgPT09IHRvb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUg5Yem55CG44Gu44Ko44Oz44OI44OqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcnVuQ3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQmFzZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuOBriBjcmVhdGUg5Yem55CGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlQmFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwiYmFzZS5jcmVhdGUuZm91bmRhdGlvblwiKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3REaXIoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlCYXNlU3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5Q29tbW9uRmlsZXMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlUYXNrU2NyaXB0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlUHJvamVjdERpcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLnJvb3REaXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKHRyYW5zbGF0ZShcImJhc2UuY3JlYXRlLmVycm9yLmFscmVhZHlFeGlzdFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLm1rZGlyc1N5bmModGhpcy5yb290RGlyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlCYXNlU3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcImJhc2Uvc3RydWN0dXJlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Z+65pys44OV44Kh44Kk44Or44Gu44Kz44OU44O8XHJcbiAgICAgKiB0ZW1wbGF0ZSDjga7jgrPjg5Tjg7zjgoLooYzjgYZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5Q29tbW9uRmlsZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZVwiKTtcclxuICAgICAgICBjb25zdCBkc3REaXIgPSB0aGlzLnJvb3REaXI7XHJcblxyXG4gICAgICAgIC8vIC5ucG1pZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9ucG1pZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiLm5wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEJBTk5FUlxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9CQU5ORVJcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiQkFOTkVSXCIpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIExJQ0VOU0VcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5saWNlbnNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJBcGFjaGUtMi4wXCI6XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9MSUNFTlNFLkFwYWNoZS0yLjBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTUlUXCI6XHJcbiAgICAgICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuTUlUXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTElDRU5TRVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY29weXJpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5PVElDRVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9OT1RJQ0VcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTk9USUNFXCIpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGJ1aWxkIHRvb2xzOiB3ZWJwYWNrXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbTogSVdlYnBhY2tDb25maWdyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBub2RlanM6ICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykubm9kZWpzLFxyXG4gICAgICAgICAgICAgICAgZ3VpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0YXNrUGF0aDogdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJ0b29scy93ZWJwYWNrL193ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwid2VicGFjay5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YXNrIHNjcmlwdCDjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5VGFza1NjcmlwdHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZS90YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzayk7XHJcblxyXG4gICAgICAgIHRoaXMudGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIHRhc2spLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgdGFzayksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvZ2VuZXJhdG9yLWJhc2UudHMiXX0=