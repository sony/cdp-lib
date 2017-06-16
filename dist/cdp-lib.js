/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-06-16T03:49:35.849Z
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
/******/     // identity function for calling harmony imports with the correct context
/******/     __webpack_require__.i = function(value) { return value; };
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
/******/     return __webpack_require__(__webpack_require__.s = 33);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(16));
__export(__webpack_require__(15));


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
__export(__webpack_require__(18));
__export(__webpack_require__(4));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(22);
exports.fs = fs;
const glob = __webpack_require__(23);
exports.glob = glob;
const hogan = __webpack_require__(29);
exports.hogan = hogan;
const _l = __webpack_require__(30);
const _s = __webpack_require__(31);
const which = __webpack_require__(27);
exports.which = which;
const uuid = __webpack_require__(26);
exports.uuid = uuid;
const chalk = __webpack_require__(20);
exports.chalk = chalk;
const semverRegex = __webpack_require__(25);
exports.semverRegex = semverRegex;
const cli_spinner_1 = __webpack_require__(21);
exports.Spinner = cli_spinner_1.Spinner;
const $ = (() => {
    const _window = (() => {
        const jsdom = __webpack_require__(24);
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
        const xmldom = __webpack_require__(28);
        root.DOMParser = xmldom.DOMParser;
        // xmldom には dom.toString() が実装されているが、global にも export する
        global.XMLSerializer = root.XMLSerializer = xmldom.XMLSerializer;
    })(_window);
    return __webpack_require__(32)(_window);
})();
exports.$ = $;
const _m = _l.mixin(_s.exports());
exports._ = _m;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(1);
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
/* 5 */
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
const base_1 = __webpack_require__(0);
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const generator_electoron_1 = __webpack_require__(5);
__export(__webpack_require__(5));
/**
 * generator 生成関数
 */
function newGeneratorDesktop(config) {
    return new generator_electoron_1.GeneratorElectron(config);
}
exports.newGeneratorDesktop = newGeneratorDesktop;


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
const path = __webpack_require__(1);
const os = __webpack_require__(13);
const base_1 = __webpack_require__(0);
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
            copyTpl(path.join(templatePath("library"), ".gitignore"), path.join(this.rootDir, ".gitignore"), this._config, { bom: false, });
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
/* 9 */
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
const path = __webpack_require__(1);
const utils_1 = __webpack_require__(2);
const base_1 = __webpack_require__(0);
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
            yield this.createProjectStructure();
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
            { name: "@types/backbone", version: undefined, },
            { name: "@types/jasmine", version: undefined, },
            { name: "@types/jquery", version: undefined, },
            { name: "@types/requirejs", version: undefined, },
            { name: "@types/jquery", version: undefined, },
            { name: "@types/underscore", version: undefined, },
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
        return utils_1._.sortBy(depends.concat(extra), (depend) => depend.name);
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
     * プロジェクト構成の作成
     */
    createProjectStructure() {
        return __awaiter(this, void 0, void 0, function* () {
            const cordovaEnabled = (0 < this.config.platforms.length);
            if (cordovaEnabled) {
                yield this.chdir(this.rootDir);
                yield this.createCordovaScaffold();
                yield this.updateConfigXML();
                yield this.addCordovaPlatforms();
                yield this.addCordovaPlugins();
                yield this.addCordovaExtentionFiles();
                yield this.cacheCordovaPackageJSON();
                yield this.chdir("..");
            }
            // TODO:
        });
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
            const index = this.config.platforms.indexOf("ios");
            if (0 <= index && "darwin" !== process.platform) {
                this.warn("mobile.create.cordova.iOSWarning");
                this.config.platforms.splice(index, 1);
                if (this.config.platforms.length <= 0) {
                    return Promise.resolve();
                }
            }
            this.progress("mobile.create.cordova.addPlatforms");
            // `$ cordova platform add android ios`
            yield utils_1.execCommand("cordova", ["platform", "add"].concat(this.config.platforms));
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
                delete this.config.cordovaPackageJson.main;
                delete this.config.cordovaPackageJson.scripts;
                delete this.config.cordovaPackageJson.author;
                delete this.config.cordovaPackageJson.license;
                // ファイルはいったん削除
                utils_1.fs.removeSync("./package.json");
            }
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
const base_1 = __webpack_require__(0);
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const generator_browser_1 = __webpack_require__(11);
__export(__webpack_require__(11));
/**
 * generator 生成関数
 */
function newGeneratorWeb(config) {
    return new generator_browser_1.GeneratorBrowser(config);
}
exports.newGeneratorWeb = newGeneratorWeb;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
exports.Utils = Utils;
const generators_1 = __webpack_require__(17);
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
/* 15 */
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
const path = __webpack_require__(1);
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
                .replace(/temp/, this._config.structureConfig.temp));
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
            { name: "source-map-loader", version: undefined, },
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
        utils_1.copyTpl(path.join(srcDir, ".npmignore"), path.join(dstDir, ".npmignore"), this._config.structureConfig);
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


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
exports.Utils = Utils;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __webpack_require__(4);
const library_1 = __webpack_require__(8);
const mobile_1 = __webpack_require__(10);
const desktop_1 = __webpack_require__(6);
const web_1 = __webpack_require__(12);
__export(__webpack_require__(0));
__export(__webpack_require__(8));
__export(__webpack_require__(10));
__export(__webpack_require__(6));
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(1);
const os = __webpack_require__(13);
const child_process_1 = __webpack_require__(19);
const libs_1 = __webpack_require__(3);
const settings_1 = __webpack_require__(4);
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
/* 19 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("cli-spinner");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("semver-regex");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("which");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("xmldom");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("hogan.js");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("underscore.string");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(14);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZGM1ZmQ3MzRkZTFmMWYzNmUwYTUiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJvc1wiIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7QUNEakMsaUM7Ozs7Ozs7Ozs7OztBQ0FBLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQXlDM0IsZ0JBQUU7QUF4Q04scUNBQTZCO0FBeUN6QixvQkFBSTtBQXhDUixzQ0FBa0M7QUF5QzlCLHNCQUFLO0FBeENULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCxxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUErQjtBQXlDM0Isc0JBQUs7QUF4Q1QsNENBQTRDO0FBeUN4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SUFFRCxHQUFHLEdBQUcsR0FBRztTQUNKLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDO1NBQ3ZCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQ3RCO0lBRUwsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQWhERCw4QkFnREM7Ozs7Ozs7QUM5VUQsMEM7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsOEM7Ozs7OztBQ0FBLG1DIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZGM1ZmQ3MzRkZTFmMWYzNmUwYTUiLCJleHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1iYXNlXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tIFwiLi9saWJzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Rvb2xzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tIFwiZ2xvYlwiO1xyXG5pbXBvcnQgKiBhcyBob2dhbiBmcm9tIFwiaG9nYW4uanNcIjtcclxuaW1wb3J0ICogYXMgX2wgZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBfcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgd2hpY2ggZnJvbSBcIndoaWNoXCI7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0ICogYXMgY2hhbGsgZnJvbSBcImNoYWxrXCI7XHJcbmltcG9ydCAqIGFzIHNlbXZlclJlZ2V4IGZyb20gXCJzZW12ZXItcmVnZXhcIjtcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJjbGktc3Bpbm5lclwiO1xyXG5cclxuY29uc3QgJDogSlF1ZXJ5U3RhdGljID0gKCgpID0+IHtcclxuICAgIGNvbnN0IF93aW5kb3cgPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGpzZG9tID0gcmVxdWlyZShcImpzZG9tXCIpO1xyXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBqc2RvbS5KU0RPTSkgeyAgICAvLyB2MTArXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcganNkb20uSlNET00oKS53aW5kb3c7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2OS4xMi54XHJcbiAgICAgICAgICAgIHJldHVybiBqc2RvbS5qc2RvbSgpLmRlZmF1bHRWaWV3O1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gcGF0Y2ggc2NvcGU6XHJcbiAgICAoKHJvb3Q6IGFueSkgPT4ge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICoganNkb20gOS40LjAgLSA5LjEyLjAg44Gr5a6f6KOF44GV44KM44Gm44GE44KLIERPTVBhcnNlciDjga8gWE1MIOOBriBzZXJpYWxpemUg44GM44Gn44GN44Gq44GE44Gf44KBLFxyXG4gICAgICAgICAqIHhtbGRvbSDjgavnva7jgY3mj5vjgYjjgotcclxuICAgICAgICAgKiBqc2RvbSAxMC4xLjAg44G+44Gn5YuV44GL44Gq44GE44GT44Go44KS56K66KqNXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgeG1sZG9tID0gcmVxdWlyZShcInhtbGRvbVwiKTtcclxuICAgICAgICByb290LkRPTVBhcnNlciA9IHhtbGRvbS5ET01QYXJzZXI7XHJcbiAgICAgICAgLy8geG1sZG9tIOOBq+OBryBkb20udG9TdHJpbmcoKSDjgYzlrp/oo4XjgZXjgozjgabjgYTjgovjgYzjgIFnbG9iYWwg44Gr44KCIGV4cG9ydCDjgZnjgotcclxuICAgICAgICAoPGFueT5nbG9iYWwpLlhNTFNlcmlhbGl6ZXIgPSByb290LlhNTFNlcmlhbGl6ZXIgPSB4bWxkb20uWE1MU2VyaWFsaXplcjtcclxuICAgIH0pKF93aW5kb3cpO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlKFwianF1ZXJ5XCIpKF93aW5kb3cpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHR5cGUgTWl4aW5lZFVuZGVyc2NvcmVTdGF0aWMgPSB0eXBlb2YgX3MgJiB0eXBlb2YgX2w7XHJcbmNvbnN0IF9tOiBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IDxhbnk+X2wubWl4aW4oPGFueT5fcy5leHBvcnRzKCkpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIF9tIGFzIF8sXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBjaGFsayxcclxuICAgIHNlbXZlclJlZ2V4LFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBmcywgJCB9IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5nc1xyXG4gKiBAYnJpZWYg44Kw44Ot44O844OQ44Or6Kit5a6a44Kk44Oz44K/44O844OV44Kn44Kk44K5XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICBmb3JjZT86IGJvb2xlYW47ICAgICAgICAgICAgLy8g44Ko44Op44O857aZ57aa55SoXHJcbiAgICB2ZXJib3NlPzogYm9vbGVhbjsgICAgICAgICAgLy8g6Kmz57Sw44Ot44KwXHJcbiAgICBzaWxlbnQ/OiBib29sZWFuOyAgICAgICAgICAgLy8gc2lsZW50IG1vZGVcclxuICAgIHRhcmdldERpcj86IHN0cmluZzsgICAgICAgICAvLyDkvZzmpa3jg4fjgqPjg6zjgq/jg4jjg6pcclxuICAgIGxhbmc/OiBcImVuLVVTXCIgfCBcImphLUpQXCI7XHJcbn1cclxuXHJcbmxldCBfc2V0dGluZ3M6IElHbG9iYWxTZXR0aW5ncyA9IHtcclxuICAgIGZvcmNlOiBmYWxzZSxcclxuICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgc2lsZW50OiBmYWxzZSxcclxuICAgIGxhbmc6IFwiZW4tVVNcIixcclxufTtcclxuXHJcbmxldCBfbGliUGF0aDogc3RyaW5nOyAgIC8vIGNkcC1saWIg44Gu5a2Y5Zyo44GX44Gm44GE44KLIHBhdGhcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiDoqK3lrprlj5blvpdcclxuICpcclxuICogQHJldHVybnMgb3B0aW9ucyDjg63jgrDjgavkvb/nlKjjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBJR2xvYmFsU2V0dGluZ3Mge1xyXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBfc2V0dGluZ3MpO1xyXG59XHJcblxyXG4vKipcclxuICog6Kit5a6a5oyH5a6aXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zIOODreOCsOOBq+S9v+eUqOOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNldHRpbmdzKHNldHRpbmdzOiBJR2xvYmFsU2V0dGluZ3MpOiB2b2lkIHtcclxuICAgIGlmIChzZXR0aW5ncykge1xyXG4gICAgICAgIF9zZXR0aW5ncy5mb3JjZSAgICAgPSBzZXR0aW5ncy5mb3JjZSAgICAgICAgfHwgX3NldHRpbmdzLmZvcmNlO1xyXG4gICAgICAgIF9zZXR0aW5ncy52ZXJib3NlICAgPSBzZXR0aW5ncy52ZXJib3NlICAgICAgfHwgX3NldHRpbmdzLnZlcmJvc2U7XHJcbiAgICAgICAgX3NldHRpbmdzLnNpbGVudCAgICA9IHNldHRpbmdzLnNpbGVudCAgICAgICB8fCBfc2V0dGluZ3Muc2lsZW50O1xyXG4gICAgICAgIF9zZXR0aW5ncy50YXJnZXREaXIgPSBzZXR0aW5ncy50YXJnZXREaXIgICAgfHwgX3NldHRpbmdzLnRhcmdldERpcjtcclxuICAgICAgICBfc2V0dGluZ3MubGFuZyAgICAgID0gc2V0dGluZ3MubGFuZyAgICAgICAgIHx8IF9zZXR0aW5ncy5sYW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGZvcmNlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNpbGVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhbmc6IFwiZW4tVVNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogXCJjZHAtbGliXCIg44GM5a2Y5Zyo44GZ44KL44OR44K544KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm5zIGNkcC1saWIg44G444GuIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaWJQYXRoKCk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSBfbGliUGF0aCkge1xyXG4gICAgICAgIGNvbnN0IFRSWV9DT1VOVCA9IDM7XHJcbiAgICAgICAgbGV0IHRyaWVkID0gMDtcclxuICAgICAgICBfbGliUGF0aCA9IF9fZGlybmFtZTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoVFJZX0NPVU5UIDw9IHRyaWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImxpYiBwYXRoIGlzIG5vdCByZXNvbHZlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2xpYlBhdGggPSBwYXRoLmpvaW4oX2xpYlBhdGgsIFwiLi5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gcGF0aC5qb2luKF9saWJQYXRoLCBcImNkcC1saWJcIik7XHJcbiAgICAgICAgICAgIGlmIChmcy5wYXRoRXhpc3RzU3luYyhjaGVjaykpIHtcclxuICAgICAgICAgICAgICAgIF9saWJQYXRoID0gY2hlY2s7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmllZCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbGliUGF0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaMh+WumuOBleOCjOOBnyB0YXJnZXREaXIg44KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm5zIHRhcmdldERpciDjgbjjga4gcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldERpcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjg63jgrDlh7rliptcclxuICogY29uc29sZS5sb2coKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOips+e0sOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmRlYnVnKCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50ICYmIF9zZXR0aW5ncy52ZXJib3NlKSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRFQlVHOiBcIiArIG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5qSc6Ki8XHJcbiAqIGNvbnNvbGUuYXNzZXJ0KCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSB0ZXN0ICAgICAgICAgICDmpJzoqLzjgZnjgovlvI9cclxuICogQHBhcmFtIG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHRlc3Q/OiBib29sZWFuLCBtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghdGVzdCkge1xyXG4gICAgICAgIGlmIChfc2V0dGluZ3MuZm9yY2UpIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBfbGFuZzogYW55O1xyXG5cclxuLyoqXHJcbiAqIOODreODvOOCq+ODqeOCpOOCulxyXG4gKlxyXG4gKiBAcGFyYW0ga2V5IOOCreODvOaWh+Wtl+WIl1xyXG4gKiBAcmV0dXJucyDnv7voqLPjgZXjgozjgZ/mloflrZfliJdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFfbGFuZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIF9sYW5nID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInJlcy9sb2NhbGVzXCIsIFwibWVzc2FnZXMuXCIgKyBfc2V0dGluZ3MubGFuZyArIFwiLmpzb25cIiksIFwidXRmOFwiKS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJMYW5ndWFnZSByZXNvdXJjZSBKU09OIHBhcnNlIGVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzb3VjZSA9ICQuZXh0ZW5kKHt9LCBfbGFuZyk7XHJcbiAgICBjb25zdCBwcm9wcyA9IGtleS5zcGxpdChcIi5cIik7XHJcbiAgICB3aGlsZSAoMCA8IHByb3BzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmIChyZXNvdWNlW3Byb3BdKSB7XHJcbiAgICAgICAgICAgIHJlc291Y2UgPSByZXNvdWNlW3Byb3BdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgXCJyZXNvdWNlIG5vdCBmb3VuZC4ga2V5OiBcIiArIGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXNvdWNlO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvc2V0dGluZ3MudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSURlc2t0b3BBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckVsZWN0cm9uXHJcbiAqIEBicmllZiBEZXNrdG9wIEVsZWN0cm9uIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yRWxlY3Ryb24gZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3cvYXBwXCIsIC8vIFRPRE86IOaaq+WumlxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICBzcmNDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHNjcmlwdDogXCJzY3JpcHRzXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiBcInN0eWxlc2hlZXRzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJ0ZW1wbGF0ZXNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJRGVza3RvcEFwcENvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSURlc2t0b3BBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SURlc2t0b3BBcHBDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckVsZWN0cm9uIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWVsZWN0b3JvblwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvckRlc2t0b3AoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JFbGVjdHJvbihjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uLFxyXG4gICAgR2VuZXJhdG9yQmFzZSxcclxuICAgIFV0aWxzLFxyXG59IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElMaWJyYXJ5Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuY29uc3QgZnMgICAgICAgICAgICA9IFV0aWxzLmZzO1xyXG5jb25zdCBnbG9iICAgICAgICAgID0gVXRpbHMuZ2xvYjtcclxuY29uc3QgJCAgICAgICAgICAgICA9IFV0aWxzLiQ7XHJcbmNvbnN0IF8gICAgICAgICAgICAgPSBVdGlscy5fO1xyXG5jb25zdCBkZWJ1ZyAgICAgICAgID0gVXRpbHMuZGVidWc7XHJcbmNvbnN0IHRlbXBsYXRlUGF0aCAgPSBVdGlscy50ZW1wbGF0ZVBhdGg7XHJcbmNvbnN0IGNvcHlUcGwgICAgICAgPSBVdGlscy5jb3B5VHBsO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JNb2R1bGVcclxuICogQGJyaWVmIExpYnJhcnkgTW9kdWxlIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yTW9kdWxlIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcInNyY1wiLFxyXG4gICAgICAgICAgICBwa2c6IFwiZGlzdFwiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJidWlsdFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHRlbXA6IFwiLnRlbXBcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVNb2R1bGVQcm9wcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVQcm9qZWN0U2V0dGluZ3MoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVWaXN1YWxTdHVkaW9Tb2x1dGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkdHMtYnVuZGxlXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0LWZvcm1hdHRlclwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5vZGVqcykge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJqYXNtaW5lLW5vZGVcIiwgdmVyc2lvbjogXCJeMi4wLjBcIiwgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwicmVxdWlyZWpzXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoZGVwZW5kcy5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElMaWJyYXJ5Q29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElMaWJyYXJ5Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1vZHVsZSDlkI0sIG1haW4g44OV44Kh44Kk44Or5ZCN44Gu5L+d6Ki8XHJcbiAgICAgKiAtIDE6IG1vZHVsZU5hbWUg44GM5oyH5a6a44GV44KM44Gm44GE44KL5aC05ZCI44Gv5L2/55So44GZ44KLXHJcbiAgICAgKiAtIDI6IHByb2plY3ROYW1lIOOBjOS9v+eUqOWPr+iDveOBquWgtOWQiOOBr+OBneOCjOOCkuS9v+eUqOOBmeOCi1xyXG4gICAgICogLSAzOiBwcm9qZWN0TmFtZSDjgYzkvb/nlKjkuI3lj6/jga7loLTlkIjjga/jgIFcIi1cIiDjgaTjgarjgY7mloflrZfliJfjgpLnlJ/miJDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbnN1cmVNb2R1bGVQcm9wcygpOiB2b2lkIHtcclxuICAgICAgICAvLyBtb2R1bGUgbmFtZVxyXG4gICAgICAgIGlmIChudWxsID09IHRoaXMuY29uZmlnLm1vZHVsZU5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCEvXi4qWyhcXFxcfFxcc3wvfDp8Knw/fFwifDx8Pnx8KV0uKiQvLnRlc3QodGhpcy5jb25maWcucHJvamVjdE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gdGhpcy5jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gXy50cmltKF8uZGFzaGVyaXplKHRoaXMuY29uZmlnLnByb2plY3ROYW1lKSwgXCItXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlYnVnKFwibW9kdWxlTmFtZTogXCIgKyB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lKTtcclxuXHJcbiAgICAgICAgLy8gbWFpbiBmaWxlIG5hbWVcclxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcubWFpbkJhc2VOYW1lID0gdGhpcy5jb25maWcubW9kdWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWcoXCJtYWluQmFzZU5hbWU6IFwiICsgdGhpcy5jb25maWcubWFpbkJhc2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODh+OCo+ODrOOCr+ODiOODquani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvcHlUcGxEaXIoXCJsaWJyYXJ5L3N0cnVjdHVyZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdHNjb25maWdcclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIHRlc3QgdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLnRlc3QuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcub3V0cHV0LXNhbWUtZGlyLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXNsaW50cmMuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9lc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwiZXNsaW50XCIsIFwiZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5xdWVyeUVzTGludEVudlBhcmFtKCksXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdGVzdGVtXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5ub2RlanMpIHtcclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5L3Rvb2xzL3Rlc3RlbVwiKSwgXCJfdGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIFwidGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGVzdGVtU3R1ZmZQYXRoID0gdGVtcGxhdGVQYXRoKFwibGlicmFyeS90b29scy90ZXN0ZW0vcnVubmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwge1xyXG4gICAgICAgICAgICAgICAgY3dkOiB0ZXN0ZW1TdHVmZlBhdGgsXHJcbiAgICAgICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZXN0ZW1TdHVmZlBhdGgsIGZpbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIGZpbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLmdpdGlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIi5naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSRUFETUUubWRcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIlJFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzID0gYXdhaXQgdGhpcy5xdWVyeURlcGVuZGVuY2llc1BhcmFtKHRoaXMuY29uZmlnLmRldkRlcGVuZGVuY2llcyB8fCB0aGlzLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicGFja2FnZS5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCveODvOOCueOBrumbm+W9ouS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IF9tb2R1bGUgPSBwYXRoLmJhc2VuYW1lKHRoaXMuX2NvbmZpZy5tb2R1bGVOYW1lLCBcIi5qc1wiKTtcclxuICAgICAgICBjb25zdCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgc2FtcGxlQ2xhc3M6IF8uY2xhc3NpZnkoX21vZHVsZSksXHJcbiAgICAgICAgICAgIHNhbXBsZU1vZHVsZTogX21vZHVsZSxcclxuICAgICAgICAgICAgYnVpbHQ6IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0IHx8IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXgudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXgudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLCBzY3JpcHQsIF9tb2R1bGUgKyBcIi50c1wiKSxcclxuICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBpbmRleC5zcGVjLnRzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwic3JjXCIsIFwiX2luZGV4LnNwZWMudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIF9tb2R1bGUgKyBcIi5zcGVjLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHZzUGFyYW0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVHVUlEID0gVXRpbHMuY3JlYXRlR1VJRDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uID0gJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdE5hbWUgICAgICAgPSB0aGlzLl9jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3RHVUlEICAgICAgID0gY3JlYXRlR1VJRCgpO1xyXG4gICAgICAgICAgICBwYXJhbS50eXBlcyAgICAgICAgICAgICA9IHBhcmFtLnR5cGVzLnJlcGxhY2UoXCJAXCIsIFwiJTQwXCIpOyAvLyBlc2NhcGUgXCJAXCIgdG8gXCIlNDBcIlxyXG4gICAgICAgICAgICBwYXJhbS5tYWluQmFzZU5hbWUgICAgICA9IHRoaXMuX2NvbmZpZy5tYWluQmFzZU5hbWU7XHJcbiAgICAgICAgICAgIHBhcmFtLmxpY2Vuc2UgICAgICAgICAgID0gIXRoaXMuX2NvbmZpZy5wcml2YXRlO1xyXG5cclxuICAgICAgICAgICAgLy8gdG9vbHNcclxuICAgICAgICAgICAgcGFyYW0ud2VicGFjayA9IHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKTtcclxuICAgICAgICAgICAgcGFyYW0udGVzdGVtID0gIXRoaXMuY29uZmlnLm5vZGVqcztcclxuXHJcbiAgICAgICAgICAgIHBhcmFtLm91dHB1dFNhbWVEaXIgPSB0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgYnVpbHQganMgZ3JvdXBcclxuICAgICAgICAgICAgcGFyYW0uanNHcm91cCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLmpzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5idWlsdCArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZF90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluX21hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcubWluaWZ5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXR1cCBwa2cgZ3JvdXBcclxuICAgICAgICAgICAgICAgIHBhcmFtLmpzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5wa2cgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkX3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbl9tYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgdGVzdCBqcyBncm91cFxyXG4gICAgICAgICAgICBwYXJhbS50c0dyb3VwID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0udGVzdCArIFwiXFxcXHVuaXRcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSArIFwiLnNwZWNcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAocGFyYW0ub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0udHNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLmJ1aWx0ICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyAuc2xuXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgXCJfc29sdXRpb24uc2xuLnRwbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLnNsblwiKSxcclxuICAgICAgICAgICAgdnNQYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIC5jc3Byb2pcclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b1htbFN0cmluZyA9IChmaWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhvZ2FuID0gVXRpbHMuaG9nYW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gVXRpbHMubm9ybWFsaXplVGV4dDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGltaXRlcnM6IFwie3sgfX1cIixcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdHBsID0gcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgZmlsZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKHRwbCkudG9TdHJpbmcoKSwgeyBlb2w6IFwiXFxuXCIsIGJvbTogZmFsc2UgfSksIG9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGpzdC5yZW5kZXIodnNQYXJhbSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b1htbERPTSA9IChmaWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkKCQucGFyc2VYTUwodG9YbWxTdHJpbmcoZmlsZSkpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sTm9kZSA9IChmaWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBVdGlscy5zdHIyWG1sTm9kZSh0b1htbFN0cmluZyhmaWxlKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkcHJvaiA9IHRvWG1sRE9NKFwiX3Byb2plY3QuY3Nwcm9qLnRwbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgJGdwVFMgPSB0b1htbE5vZGUoXCJfdHMuaXRlbS5ncm91cC50cGxcIik7XHJcbiAgICAgICAgICAgIGNvbnN0ICRncEpTID0gdG9YbWxOb2RlKFwiX2pzLml0ZW0uZ3JvdXAudHBsXCIpO1xyXG5cclxuICAgICAgICAgICAgJHByb2pcclxuICAgICAgICAgICAgICAgIC5maW5kKFwiSXRlbUdyb3VwXCIpXHJcbiAgICAgICAgICAgICAgICAubGFzdCgpXHJcbiAgICAgICAgICAgICAgICAuYWZ0ZXIoJGdwVFMpXHJcbiAgICAgICAgICAgICAgICAuYWZ0ZXIoJGdwSlMpXHJcbiAgICAgICAgICAgICAgICA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBmb3JtYXRYTUwgPSBVdGlscy5mb3JtYXRYTUw7XHJcbiAgICAgICAgICAgIGNvbnN0IGRzdFBhdGggPSBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB2c1BhcmFtLnByb2plY3ROYW1lICsgXCIuY3Nwcm9qXCIpO1xyXG4gICAgICAgICAgICBkZWJ1ZyhVdGlscy54bWxOb2RlMlN0cigkcHJvaikpO1xyXG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGRzdFBhdGgsIGZvcm1hdFhNTChVdGlscy54bWxOb2RlMlN0cigkcHJvaikpKTtcclxuICAgICAgICB9KSgpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2dlbmVyYXRvci1tb2R1bGUudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvck1vZHVsZSB9IGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLW1vZHVsZVwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yTW9kdWxlKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGdsb2IsXHJcbiAgICAkLFxyXG4gICAgXyxcclxuICAgIGNoYWxrLFxyXG4gICAgZGVidWcsXHJcbiAgICB0ZW1wbGF0ZVBhdGgsXHJcbiAgICBjb3B5VHBsLFxyXG4gICAgZXhlY0NvbW1hbmQsXHJcbiAgICBzdHIyWG1sTm9kZSxcclxuICAgIHhtbE5vZGUyU3RyLFxyXG4gICAgZm9ybWF0WE1MLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24sXHJcbiAgICBHZW5lcmF0b3JCYXNlLFxyXG59IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElNb2JpbGVBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckNvcmRvdmFcclxuICogQGJyaWVmIE1vYmlsZSBDb3Jkb3ZhIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yQ29yZG92YSBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3d1wiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICB0ZW1wOiBcIi50ZW1wXCIsXHJcbiAgICAgICAgICAgIGxpYjogXCJsaWJcIixcclxuICAgICAgICAgICAgZXh0ZXJuYWw6IFwiZXh0ZXJuYWxcIixcclxuICAgICAgICAgICAgcG9ydGluZzogXCJwb3J0aW5nXCIsXHJcbiAgICAgICAgICAgIHJlczogXCJyZXNcIixcclxuICAgICAgICAgICAgc3JjQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQ6IFwic2NyaXB0c1wiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldDogXCJzdHlsZXNoZWV0c1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwidGVtcGxhdGVzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdFN0cnVjdHVyZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvYmFja2JvbmVcIiwgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvanF1ZXJ5XCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvcmVxdWlyZWpzXCIsICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvanF1ZXJ5XCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvdW5kZXJzY29yZVwiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJhdXRvcHJlZml4ZXJcIiwgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjbGVhbi1jc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJmcy1leHRyYVwiLCAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJodG1sLW1pbmlmaWVyXCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJub2RlLXNhc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwb3N0Y3NzLWNsaVwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogZGVwZW5kLm5hbWUsIHZlcnNpb246IGRlcGVuZC52ZXJzaW9uLCB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGRlcGVuZHMuY29uY2F0KGV4dHJhKSwgKGRlcGVuZCkgPT4gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJTW9iaWxlQXBwQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElNb2JpbGVBcHBDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI5qeL5oiQ44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlUHJvamVjdFN0cnVjdHVyZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBjb3Jkb3ZhRW5hYmxlZCA9ICgwIDwgdGhpcy5jb25maWcucGxhdGZvcm1zLmxlbmd0aCk7XHJcblxyXG4gICAgICAgIGlmIChjb3Jkb3ZhRW5hYmxlZCkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZGlyKHRoaXMucm9vdERpcik7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQ29yZG92YVNjYWZmb2xkKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29uZmlnWE1MKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YVBsYXRmb3JtcygpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFkZENvcmRvdmFQbHVnaW5zKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YUV4dGVudGlvbkZpbGVzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2FjaGVDb3Jkb3ZhUGFja2FnZUpTT04oKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGRpcihcIi4uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSDjgpLnlKjjgYTjgZ/jg5fjg63jgrjjgqfjgq/jg4jkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVDb3Jkb3ZhU2NhZmZvbGQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5jcmVhdGVDb3Jkb3ZhU2NhZmZvbGRcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVDb3Jkb3ZhU2NhZmZvbGRcIik7XHJcblxyXG4gICAgICAgIC8vIGAkIGNvcmRvdmEgY3JlYXRlIGNvb2wtbW9iaWxlIGNvbS5zb255LmNkcC5jb29sbW9iaWxlIFwiQ29vbCBNb2JpbGVcImBcclxuICAgICAgICBhd2FpdCBleGVjQ29tbWFuZChcImNvcmRvdmFcIiwgW1wiY3JlYXRlXCIsIHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCB0aGlzLmNvbmZpZy5hcHBJZCwgdGhpcy5jb25maWcuYXBwTmFtZV0pO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgZmlsZXNcclxuICAgICAgICBnbG9iLnN5bmMoXCJ3d3cvKiovKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGhpcy5jb25maWcucHJvamVjdE5hbWUsXHJcbiAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGguam9pbih0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgZmlsZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZzLnJlbW92ZVN5bmMocGF0aC5qb2luKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBcInJlc1wiKSk7XHJcbiAgICAgICAgZnMucmVtb3ZlU3luYyhwYXRoLmpvaW4odGhpcy5jb25maWcucHJvamVjdE5hbWUsIFwiLm5wbWlnbm9yZVwiKSk7XHJcblxyXG4gICAgICAgIC8vIG1vdmUgcm9vdCBkaXJlY3RvcnlcclxuICAgICAgICBmcy5jb3B5U3luYyh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgXCIuL1wiKTtcclxuICAgICAgICBmcy5yZW1vdmVTeW5jKHRoaXMuY29uZmlnLnByb2plY3ROYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZy54bWwg44Gu5L+u5q2jXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgdXBkYXRlQ29uZmlnWE1MKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEudXBkYXRlQ29uZmlnWG1sXCIpO1xyXG4gICAgICAgIGRlYnVnKFwidXBkYXRlQ29uZmlnWE1MXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBjb25maWdYbWxQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiY29uZmlnLnhtbFwiKTtcclxuICAgICAgICBjb25zdCAkY29uZmlnWG1sRG9tID0gJChzdHIyWG1sTm9kZShmcy5yZWFkRmlsZVN5bmMoY29uZmlnWG1sUGF0aCkudG9TdHJpbmcoKSkpO1xyXG5cclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwid2lkZ2V0XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwidmVyc2lvblwiLCB0aGlzLmNvbmZpZy52ZXJzaW9uKVxyXG4gICAgICAgICAgICAuYXR0cihcImlvcy1DRkJ1bmRsZUlkZW50aWZpZXJcIiwgdGhpcy5jb25maWcuYXBwSWQpXHJcbiAgICAgICAgICAgIC5wcmVwZW5kKHN0cjJYbWxOb2RlKGBcclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+XHJcbiAgICAgICAgICAgICAgICA8cHJlZmVyZW5jZSBuYW1lPVwiS2V5Ym9hcmREaXNwbGF5UmVxdWlyZXNVc2VyQWN0aW9uXCIgdmFsdWU9XCJmYWxzZVwiLz5cclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJCYWNrZ3JvdW5kQ29sb3JcIiB2YWx1ZT1cIjB4ZmYwMDAwMDBcIiAvPlxyXG4gICAgICAgICAgICBgKSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgY29yZG92YSB0ZWFtIGluZm9ybWF0aW9uXHJcbiAgICAgICAgJGNvbmZpZ1htbERvbVxyXG4gICAgICAgICAgICAuZmluZChcImRlc2NyaXB0aW9uXCIpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwiYXV0aG9yXCIpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhjb25maWdYbWxQYXRoLCBmb3JtYXRYTUwoeG1sTm9kZTJTdHIoJGNvbmZpZ1htbERvbSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHBsYXRmb3JtIOi/veWKoFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFQbGF0Zm9ybXMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgZGVidWcoXCJhZGRDb3Jkb3ZhUGxhdGZvcm1zXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5pbmRleE9mKFwiaW9zXCIpO1xyXG4gICAgICAgIGlmICgwIDw9IGluZGV4ICYmIFwiZGFyd2luXCIgIT09IHByb2Nlc3MucGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmlPU1dhcm5pbmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcucGxhdGZvcm1zLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuYWRkUGxhdGZvcm1zXCIpO1xyXG5cclxuICAgICAgICAvLyBgJCBjb3Jkb3ZhIHBsYXRmb3JtIGFkZCBhbmRyb2lkIGlvc2BcclxuICAgICAgICBhd2FpdCBleGVjQ29tbWFuZChcImNvcmRvdmFcIiwgW1wicGxhdGZvcm1cIiwgXCJhZGRcIl0uY29uY2F0KHRoaXMuY29uZmlnLnBsYXRmb3JtcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGx1Z2luIOi/veWKoFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFQbHVnaW5zKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuYWRkUGx1Z2luc1wiKTtcclxuICAgICAgICBkZWJ1ZyhcImFkZENvcmRvdmFQbHVnaW5zXCIpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEkvRiDjga/opIfmlbDjga7jg5fjg6njgrDjgqTjg7PjgpLkuIDmi6zjgafov73liqDjgZnjgovjgZPjgajjgYzlj6/og73jgaDjgYzjgIFcclxuICAgICAgICAgKiBjb3Jkb3ZhIHZlcnNpb24g44KS5Yik5a6a44GX44Gm44GE44KL44OX44Op44Kw44Kk44Oz44Gv6Kqk5Yik5a6a44GZ44KL44GT44Go44GM44GC44KL44Gf44KB44CBXHJcbiAgICAgICAgICogMeOBpOOBmuOBpOi/veWKoOOBmeOCi1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICog5Lul5LiL44Gu5LiN5YW35ZCI44Gr6aGe5Ly844GZ44KL54++6LGhXHJcbiAgICAgICAgICogaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DQi0xMjY2M1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5jb25maWcuY29yZG92YV9wbHVnaW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGAkIGNvcmRvdmEgcGx1Z2luIGFkZCBjb3Jkb3ZhLXBsdWdpbi1pbmFwcGJyb3dzZXJgXHJcbiAgICAgICAgICAgIGF3YWl0IGV4ZWNDb21tYW5kKFwiY29yZG92YVwiLCBbXCJwbHVnaW5cIiwgXCJhZGRcIiwgdGhpcy5jb25maWcuY29yZG92YV9wbHVnaW5baV0ubmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcmRvdmEgcHJvamVjdCDjgavov73liqDjgZnjgovjg6rjgr3jg7zjgrnjgpLjgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5hZGRFeHRlbnNpb25zXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiYWRkQ29yZG92YUV4dGVudGlvbkZpbGVzXCIpO1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcIm1vYmlsZS9jb3Jkb3ZhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSDjgYznlJ/miJDjgZfjgZ8gcGFja2FnZS5qc29uIOOCkuOCreODo+ODg+OCt+ODpVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNhY2hlQ29yZG92YVBhY2thZ2VKU09OKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKFwiLi9wYWNrYWdlLmpzb25cIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoXCIuL3BhY2thZ2UuanNvblwiKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBjb3Jkb3ZhIHRlYW0gaW5mb3JtYXRpb25cclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5uYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLnZlcnNpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24ubWFpbjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5zY3JpcHRzO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmF1dGhvcjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5saWNlbnNlO1xyXG5cclxuICAgICAgICAgICAgLy8g44OV44Kh44Kk44Or44Gv44GE44Gj44Gf44KT5YmK6ZmkXHJcbiAgICAgICAgICAgIGZzLnJlbW92ZVN5bmMoXCIuL3BhY2thZ2UuanNvblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JDb3Jkb3ZhIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQ29yZG92YShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSVdlYkFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQnJvd3NlclxyXG4gKiBAYnJpZWYgV2ViIEJyb3dzZXIg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JCcm93c2VyIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElXZWJBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SVdlYkFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQnJvd3NlciB9IGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcldlYihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckJyb3dzZXIoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5leHBvcnQgeyBVdGlscyB9O1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbixcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSVByb2plY3RDb25maWdyYXRpb24sXHJcbiAgICBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElFeHRlcm5hbE1vZHVsZUluZm8sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVzLFxyXG4gICAgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbixcclxuICAgIElEZXNrdG9wQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSVdlYkFwcENvbmZpZ3JhdGlvbixcclxuICAgIC8vLy9cclxuICAgIG5ld0dlbmVyYXRvclxyXG59IGZyb20gXCIuL2dlbmVyYXRvcnNcIjtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24sXHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSUxpYnJhcnlDb25maWdyYXRpb24sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVJbmZvLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlcyxcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbn07XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDRFBMaWJcclxuICogQGJyaWVmIENEUCBib2lsZXJwbGF0ZSDnlJ/miJDmqZ/og73jgpLmj5DkvpvjgZnjgovjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENEUExpYiB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYWluIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBVdGlscy5zZXRTZXR0aW5ncyhjb25maWcuc2V0dGluZ3MpO1xyXG4gICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3IoY29uZmlnKS5ydW4oKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2NkcC1saWIudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGdsb2IsXHJcbiAgICBjaGFsayxcclxuICAgIF8sXHJcbiAgICAkLFxyXG4gICAgLy8vL1xyXG4gICAgZXhlY0NvbW1hbmQsXHJcbiAgICBnZXRTcGlubmVyLFxyXG4gICAgZ2V0VGFyZ2V0RGlyLFxyXG4gICAgdGVtcGxhdGVQYXRoLFxyXG4gICAgY29weVRwbCxcclxuICAgIGxvZyxcclxuICAgIGRlYnVnLFxyXG4gICAgdHJhbnNsYXRlLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJwYWNrQ29uZmlncmF0aW9uLFxyXG59IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQmFzZVxyXG4gKiBAYnJpZWYg44GZ44G544Gm44GuIEdlbmVyYXRvciDjga7ml6Llrprjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9wcm9qZWN0Um9vdERpcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQcm9qZWN0Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44KwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3RSb290RGlyID0gZ2V0VGFyZ2V0RGlyKCkgP1xyXG4gICAgICAgICAgICBnZXRUYXJnZXREaXIoKSA6XHJcbiAgICAgICAgICAgIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB0aGlzLl9jb25maWcucHJvamVjdE5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnID0gJC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKSwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcml2YXRlID0gXCJOT05FXCIgPT09IHRoaXMuX2NvbmZpZy5saWNlbnNlO1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm91dHB1dFNhbWVEaXJcclxuICAgICAgICAgICAgPSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyA9PT0gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdDtcclxuXHJcbiAgICAgICAgKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMgPSAoKGVudjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW52KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibm9kZVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImVsZWN0cm9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZW52KTtcclxuXHJcbiAgICAgICAgZGVidWcoSlNPTi5zdHJpbmdpZnkodGhpcy5fY29uZmlnLCBudWxsLCA0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh6bnkIbplovlp4sgKOOCqOODs+ODiOODqilcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jb25maWcuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcmVhdGVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5rbm93biBhY3Rpb246IFwiICsgdGhpcy5fY29uZmlnLmFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBhYnN0cmFjdCBtZXRob2RzOlxyXG5cclxuICAgIC8vIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICBhYnN0cmFjdCBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjtcclxuXHJcbiAgICAvLyBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgIGFic3RyYWN0IGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8vIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcm90ZWN0ZWQgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAsuaNl+ODhuOCreOCueODiOOCkumAmuefpVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkg44Ot44O844Kr44Op44Kk44K644Oq44K944O844K544Kt44O844KS5oyH5a6aXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9ncmVzcyhrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay5jeWFuKHRyYW5zbGF0ZShrZXkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorablkYrjg4bjgq3jgrnjg4jjgpLpgJrnn6VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5IOODreODvOOCq+ODqeOCpOOCuuODquOCveODvOOCueOCreODvOOCkuaMh+WumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgd2FybihrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay55ZWxsb3codHJhbnNsYXRlKGtleSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdvcmsgZGlyZWN0b3J5IOOBruWkieabtFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZGlyKGRpcmVjdG9yeTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgcHJvY2Vzcy5jaGRpcihkaXJlY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvamVjdCByb290IGRpcmVjdG9yeSDjga7lj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgcm9vdERpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Um9vdERpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlbXBsYXRlIGRpcmVjdG9yeSDjgpLmjIflrprjgZfjgabphY3kuIvjga7jg5XjgqHjgqTjg6vjgpLjgrPjg5Tjg7xcclxuICAgICAqIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIOOBruioreWumuOBjOWPjeaYoOOBleOCjOOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgIOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHN0Um9vdCDjgrPjg5Tjg7zlhYjjgpLmjIflrpouIOaMh+WumuOBjOeEoeOBhOWgtOWQiOOBryByb290RGlyIOOBjOioreWumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29weVRwbERpcih0YXJnZXQ6IHN0cmluZywgZHN0Um9vdD86IHN0cmluZywgb3B0aW9ucz86IGdsb2IuSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBkc3RSb290ID0gZHN0Um9vdCB8fCB0aGlzLnJvb3REaXI7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgY3dkOiB0ZW1wbGF0ZVBhdGgodGFyZ2V0KSxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdDogdHJ1ZSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRzdCA9IHBhdGguam9pbihkc3RSb290LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3NyYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3BrZy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnBrZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2J1aWx0LywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvZG9jLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZG9jKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGFzay8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rlc3QvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlcy8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3RlbXAvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlbXApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMocGF0aC5qb2luKHRlbXBsYXRlUGF0aCh0YXJnZXQpLCBmaWxlKSwgZHN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUgbW9kdWxlIOOBriB2ZXJzaW9uIOWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvbWlzZTxzdHJpbmc+fSB2ZXJzaW9uIHRleHRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBleGVjQ29tbWFuZChcIm5wbVwiLCBbXCJpbmZvXCIsIG5hbWUsIFwidmVyc2lvblwiXSwge1xyXG4gICAgICAgICAgICAgICAgc3RkaW86IFwicGlwZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Bpbm5lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBfLnRyaW0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44Gu6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjb252ZXJ0LXNvdXJjZS1tYXBcIiwgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkZWxcIiwgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJlc2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJucG0tcnVuLWFsbFwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwbGF0b1wiLCAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwLWxvYWRlclwiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0c2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlZG9jXCIsICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0XCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtaW5pZnkgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlczogW1wiZXM1XCJdLCAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidWdsaWZ5LWVzXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgZXM6IFtcImVzMjAxNVwiXSwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBsZXQgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5taW5pZnkpIHtcclxuICAgICAgICAgICAgZXh0cmEgPSBleHRyYS5jb25jYXQobWluaWZ5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJ3ZWJwYWNrXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcIm55Y1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJueWNcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwidGVzdGVtXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInRlc3RlbVwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJwaGFudG9tanMtcHJlYnVpbHRcIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwicGhhbnRvbWpzLXByZWJ1aWx0XCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoYmFzZS5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXBlbmRlbmNpZXMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7SURlcGVuZGVuY3lbXX0gZGVwZW5kZW5jaWVzIOS+neWtmOmWouS/guODquOCueODiFxyXG4gICAgICogQHJldHVybiB7eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW47IH1bXX0g44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Gr5oyH5a6a44GZ44KL6YWN5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhc3luYyBxdWVyeURlcGVuZGVuY2llc1BhcmFtKGRlcGVuZGVuY2llczogSURlcGVuZGVuY3lbXSk6IFByb21pc2U8eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW4gfVtdPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcImJhc2UuY3JlYXRlLnF1ZXJ5VmVyc2lvblwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IDx7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbjsgfVtdPmRlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAuZmlsdGVyKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGRlcGVuZC5lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFkZXBlbmQuZXMuZmluZCgoZXNWZXJzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLmVzID09PSBlc1ZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeShkZXBlbmRzLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gKGNvbnRleHQ6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgY29udGV4dCAmJiAhdGhpcy5fY29uZmlnLnNldHRpbmdzLnNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IGdldFNwaW5uZXIoY2hhbGsueWVsbG93KGNvbnRleHQpLCA1KTtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGlubmVyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gZGVwZW5kcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kc1tpXS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gcHJvZ3Jlc3MoZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0udmVyc2lvbiA9IFwiXlwiICsgYXdhaXQgdGhpcy5xdWVyeU5vZGVNb2R1bGVMYXRlc3RWZXJzaW9uKGRlcGVuZHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyhzcGlubmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0ubGFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZXBlbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2VicGFjay5jb25maWcuanMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBsaWJyYXJ5VGFyZ2V0IOOBq+aMh+WumuOBmeOCi+aWh+Wtl+WIl1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlXZWJwYWNrTGlicmFyeVRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5tb2R1bGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNvbW1vbmpzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tb25qczJcIjtcclxuICAgICAgICAgICAgY2FzZSBcImFtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYW1kXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bWRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInVtZFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBlc2xpbnRyYyDjga4gZW52IOOBq+aMh+WumuOBmeOCiyB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gZW52IOOBq+aMh+WumuOBmeOCi+ODhuODs+ODl+ODrOODvOODiOODkeODqeODoeODvOOCv+OCquODluOCuOOCp+OCr+ODiFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlFc0xpbnRFbnZQYXJhbSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBpbGVTZXR0aW5nID0gPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXM2OiBcImVzNVwiICE9PSBjb21waWxlU2V0dGluZy5lcyxcclxuICAgICAgICAgICAgbm9kZTogXCJ3ZWJcIiAhPT0gY29tcGlsZVNldHRpbmcuZW52LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24udG9vbHMg44OX44Ot44OR44OG44Kj44Gu5oyH5a6a54q25rOB44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZSDjg4Tjg7zjg6vlkI3jgpLmjIflrppcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWU6IOaMh+WumuOBleOCjOOBpuOBhOOCiyAvIGZhbHNlOiDmjIflrprjgZXjgozjgabjgYTjgarjgYRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGlzRW5hYmxlVG9vbChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISEoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLnRvb2xzLmZpbmQoKHRvb2wpID0+IG5hbWUgPT09IHRvb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUg5Yem55CG44Gu44Ko44Oz44OI44OqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcnVuQ3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQmFzZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuOBriBjcmVhdGUg5Yem55CGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlQmFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwiYmFzZS5jcmVhdGUuZm91bmRhdGlvblwiKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3REaXIoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlCYXNlU3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5Q29tbW9uRmlsZXMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlUYXNrU2NyaXB0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlUHJvamVjdERpcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLnJvb3REaXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKHRyYW5zbGF0ZShcImJhc2UuY3JlYXRlLmVycm9yLmFscmVhZHlFeGlzdFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLm1rZGlyc1N5bmModGhpcy5yb290RGlyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlCYXNlU3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcImJhc2Uvc3RydWN0dXJlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Z+65pys44OV44Kh44Kk44Or44Gu44Kz44OU44O8XHJcbiAgICAgKiB0ZW1wbGF0ZSDjga7jgrPjg5Tjg7zjgoLooYzjgYZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5Q29tbW9uRmlsZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZVwiKTtcclxuICAgICAgICBjb25zdCBkc3REaXIgPSB0aGlzLnJvb3REaXI7XHJcblxyXG4gICAgICAgIC8vIC5ucG1pZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIi5ucG1pZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiLm5wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEJBTk5FUlxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9CQU5ORVJcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiQkFOTkVSXCIpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIExJQ0VOU0VcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5saWNlbnNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJBcGFjaGUtMi4wXCI6XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9MSUNFTlNFLkFwYWNoZS0yLjBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTUlUXCI6XHJcbiAgICAgICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuTUlUXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTElDRU5TRVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY29weXJpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5PVElDRVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9OT1RJQ0VcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTk9USUNFXCIpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGJ1aWxkIHRvb2xzOiB3ZWJwYWNrXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbTogSVdlYnBhY2tDb25maWdyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBub2RlanM6ICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykubm9kZWpzLFxyXG4gICAgICAgICAgICAgICAgZ3VpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0YXNrUGF0aDogdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJ0b29scy93ZWJwYWNrL193ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwid2VicGFjay5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YXNrIHNjcmlwdCDjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5VGFza1NjcmlwdHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZS90YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzayk7XHJcblxyXG4gICAgICAgIHRoaXMudGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIHRhc2spLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgdGFzayksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvZ2VuZXJhdG9yLWJhc2UudHMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44K944O844K544OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzY3JpcHQ/OiBzdHJpbmc7ICAgICAgICAgICAgLy8ganModHMpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgc3R5bGVzaGVldD86IHN0cmluZzsgICAgICAgIC8vIGNzcyhjc3MpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7ICAgICAgICAgIC8vIGh0bWwodGVtcGxhdGUpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHNyYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K944O844K544Kz44O844OJ44Gu44Or44O844OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBwa2c/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkeODg+OCseODvOOCuOWFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgYnVpbHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg7Pjg5HjgqTjg6vlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGRvYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0YXNrPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCueOCr+ODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVzdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4bjgrnjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHR5cGVzPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDlnovlrprnvqnjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRlbXA/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBzcmNDb25maWc/OiBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb247ICAgIC8vIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gICAgbGliPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRlcm5hbCBsaWJyYXJ5IG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGV4dGVybmFsPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgbW9kdWxlIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcG9ydGluZz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3J0aW5nIG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHJlcz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oq44K944O844K544OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElEZXBlbmRlbmN5XHJcbiAqIEBicmllZiBwYWNrYWdlLmpzb24g44Gr5oyH5a6a44GZ44KLIGRlcGVuZGVuY2llcyDmg4XloLHjgpLmoLzntI3jgZnjgovjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3kge1xyXG4gICAgbmFtZTogc3RyaW5nOyAgICAgICAgICAgLy8gbW9kdWxlIG5hbWUgZXgpIFwidHlwZXNjcmlwdFwiXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nOyAgICAgICAvLyDmjIflrprjg5Djg7zjgrjjg6fjg7MuIOeEoeaMh+WumuOBruWgtOWQiOOBr+acgOaWsOODkOODvOOCuOODp+ODs1xyXG4gICAgZXM/OiBzdHJpbmdbXTsgICAgICAgICAgLy8g5oyH5a6a44GV44KM44GfIEVTIHZlcnNpb24g44Gu44Go44GN44Gu44G/5pyJ5Yq544Gr44GZ44KLXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jlhbHpgJrjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgcHJvamVjdFR5cGU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI56iu6aGeIGV4KSBcImxpYnJhcnlcIlxyXG4gICAgYWN0aW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXgpIFwiY3JlYXRlXCJcclxuICAgIHZlcnNpb246IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkOODvOOCuOODp+ODsyBleCkgXCIxLjAuMFwiXHJcbiAgICBsaWNlbnNlOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6njgqTjgrvjg7PjgrkgZXgpIFwiQXBhY2hlLTIuMFwiXHJcbiAgICBwcml2YXRlPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcml2YXRlIOODkeODg+OCseODvOOCuOOBruWgtOWQiCB0cnVlXHJcbiAgICBzZXR0aW5nczogVXRpbHMuSUdsb2JhbFNldHRpbmdzOyAgICAgICAgICAgICAgICAvLyDjg63jgrDjgqrjg5fjgrfjg6fjg7NcclxuICAgIG1vZHVsZU5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydCDjgavmjIflrprjgZnjgosg44Oi44K444Ol44O844Or5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgbWFpbkJhc2VOYW1lPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oh44Kk44Oz44OV44Kh44Kk44Or5ZCNIGV4KSBcImNkcC1saWJcIiAvIFwiaW5kZXhcIlxyXG4gICAgbmFtZXNwYWNlPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Or44O844OI5ZCN5YmN56m66ZaTXHJcbiAgICBzdHJ1Y3R1cmVDb25maWc/OiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjsgICAvLyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gICAgY29weXJpZ2h0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Kz44OU44O844Op44Kk44OI5paH5a2X5YiXIGV4KSBcIkNvcHlyaWdodCAoYykgMjAxNyBTb255IENvcnBvcmF0aW9uXCJcclxuICAgIGRldkRlcGVuZGVuY2llcz86IElEZXBlbmRlbmN5W107ICAgICAgICAgICAgICAgIC8vIOmWi+eZuueUqOS+neWtmOODouOCuOODpeODvOODq+aDheWgsVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQnVpbGRUYXJnZXRDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODk+ODq+ODieOCv+ODvOOCsuODg+ODiOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24ge1xyXG4gICAgZXM/OiBcImVzNVwiIHwgXCJlczIwMTVcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg44GuIHRyYW5zcGlsZSB0YXJnZXRcclxuICAgIG1vZHVsZT86IFwibm9uZVwiIHwgXCJjb21tb25qc1wiIHwgXCJhbWRcIiB8IFwidW1kXCI7ICAgICAgICAgICAgICAgLy8gSmF2YVNjcmlwdCBtb2R1bGUgc3lzdGVtXHJcbiAgICBlbnY/OiBcIndlYlwiIHwgXCJub2RlXCIgfCBcImVsZWN0cm9uXCIgfCBcImVsZWN0cm9uLXJlbmRlcmVyXCI7ICAgIC8vIOWun+ihjOeSsOWig+OBriB0YXJnZXRcclxuICAgIG5vZGVqcz86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIOOBruWgtOWQiOOBqyB0cnVlXHJcbiAgICBtaW5pZnk/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6rjg6rjg7zjgrnmmYLjgasgbWluaWZ5IOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICAvLyBidWlsZCB0b29sXHJcbiAgICB0b29scz86IHN0cmluZ1tdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDml6Llrprjga4gYnVpbGQgdG9vbCBleCkgW1wid2VicGFja1wiXVxyXG4gICAgb3V0cHV0U2FtZURpcj86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3JjIOOBqCBidWlsdCDjgYzlkIzjgZjjg4fjgqPjg6zjgq/jg4jjg6rjgavjgarjgovloLTlkIggdHJ1ZVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJV2VicGFja0NvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgV2VicGFjayDnlKjjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYnBhY2tDb25maWdyYXRpb24ge1xyXG4gICAgbm9kZWpzOiBib29sZWFuOyAgICAvLyBcIm5vZGVcIiB8IFwiZWxlY3Ryb25cIiDjga7loLTlkIjjgasgdHJ1ZVxyXG4gICAgZ3VpZGU6IGJvb2xlYW47ICAgICAvLyBndWlkZSDjgrPjg6Hjg7Pjg4jjgpLku5jliqDjgZnjgovloLTlkIjjga8gdHJ1ZSDjgpLmjIflrppcclxuICAgIHRhc2tQYXRoOiBzdHJpbmc7ICAgLy8gJ3Rhc2snIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uXHJcbiAqIEBicmllZiBWaXN1YWwgU3R1ZGlvIOeUqOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uIGV4dGVuZHMgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOWQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIHByb2plY3RHVUlEOiBzdHJpbmc7ICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4ggR1VJRCBleCkgezUxQjQxMzU5LThEMkMtNDJERi04NDE0LUU4NUIwMjk5MzIzOH1cclxuICAgIG1haW5CYXNlTmFtZTogc3RyaW5nOyAgICAgICAvLyDjg6HjgqTjg7Pjg5XjgqHjgqTjg6vlkI0gZXgpIFwiY2RwLWxpYlwiIC8gaW5kZXhcclxuICAgIGxpY2Vuc2U6IGJvb2xlYW47ICAgICAgICAgICAvLyBMSUNFTlNFIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICB3ZWJwYWNrOiBib29sZWFuOyAgICAgICAgICAgLy8gd2VicGFjay5jb25maWcuanMg44KS6L+95Yqg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIHRlc3RlbTogYm9vbGVhbjsgICAgICAgICAgICAvLyB0ZXN0ZW0gcnVubmVyIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICBvdXRwdXRTYW1lRGlyOiBib29sZWFuOyAgICAgLy8gc3JjIOOBqCBidWlsdCDjgYzlkIzjgZjjg4fjgqPjg6zjgq/jg4jjg6rjgavjgarjgovloLTlkIggdHJ1ZVxyXG4gICAgdHNHcm91cDoge1xyXG4gICAgICAgIHJlbGF0aXZlUGF0aDogc3RyaW5nOyAgIC8vIFwiaG9nZWhvZ2VcXFwiXHJcbiAgICAgICAgZmlsZU5hbWU6IHN0cmluZzsgICAgICAgLy8gXCJjZHAtbGliXCJcclxuICAgICAgICBkZXBlbmRlZTogYm9vbGVhbjsgICAgICAvLyDkvp3lrZjlhYjjgpLov73liqDjgZnjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIG1hcDogYm9vbGVhbjsgICAgICAgICAgIC8vIC5tYXAg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgIH1bXTtcclxuICAgIGpzR3JvdXA6IHtcclxuICAgICAgICByZWxhdGl2ZVBhdGg6IHN0cmluZzsgICAvLyBcImhvZ2Vob2dlXFxcIlxyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmc7ICAgICAgIC8vIFwiY2RwLWxpYlwiXHJcbiAgICAgICAgZGVwZW5kZWU6IGJvb2xlYW47ICAgICAgLy8g5L6d5a2Y5YWI44KS6L+95Yqg44GZ44KL5aC05ZCIIHRydWVcclxuICAgICAgICBkX3RzOiBib29sZWFuOyAgICAgICAgICAvLyAuZC50cyDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIG1hcDogYm9vbGVhbjsgICAgICAgICAgIC8vIC5tYXAg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtaW5fbWFwOiBib29sZWFuOyAgICAgICAvLyAubWluIC5tYXAg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgIH1bXTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcIi4uL3V0aWxzL3NldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTGlicmFyeSB9IGZyb20gXCIuL2xpYnJhcnlcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTW9iaWxlIH0gZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvckRlc2t0b3AgfSBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvcldlYiB9IGZyb20gXCIuL3dlYlwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vYmFzZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWJyYXJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21vYmlsZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3dlYlwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3IoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgc3dpdGNoIChjb25maWcucHJvamVjdFR5cGUpIHtcclxuICAgICAgICBjYXNlIFwibGlicmFyeVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJtb2JpbGVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJkZXNrdG9wXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JEZXNrdG9wKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIndlYlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZyk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBcInVuc3VwcG9ydGVkIHByb2plY3Qga2luZDogXCIgKyBjb25maWcucHJvamVjdFR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL2dlbmVyYXRvcnMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQgeyBzcGF3biwgU3Bhd25PcHRpb25zIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIFNwaW5uZXIsXHJcbn0gZnJvbSBcIi4vbGlic1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFzc2VydCxcclxuICAgIGdldExpYlBhdGgsXHJcbn0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY29tbWFuZCBsaW5lIGVycm9yIGFuZCBraWxsIHByb2Nlc3MuXHJcbiAqIFdoZW4gdGhlIGFwcGxpY2F0aW9uIHJlY2VpdmVkIGVycm9yIGZyb20gY2xpLCBwbGVhc2UgY2FsbCB0aGlzIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yICBlcnJvciBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBhc3NlcnQoZmFsc2UsIGVycm9yKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBcInRlbXBsYXRlc1wiIOODh+OCo+ODrOOCr+ODiOODquOBi+OCieOBruODkeOCueOCkuWPluW+ly5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSB0YXJnZXQg44K/44O844Ky44OD44OI44KS5oyH5a6aLiBudWxsIOOBruWgtOWQiOOBr+OAgXRlbXBsYXRlcyDjgpLov5TljbRcclxuICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZXMvaG9nZWhvZ2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZVBhdGgodGFyZ2V0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKG51bGwgPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwidGVtcGxhdGVzXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJ0ZW1wbGF0ZXNcIiwgdGFyZ2V0KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBHZXQgc3Bpbm5lciBpbnN0YW5jZS5cclxuICogQ0xJIGhlbHBlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgW2Zvcm1hdF0gIHNwaW5uZXIgZm9ybWF0IHN0cmluZy5cclxuICogQHBhcmFtICB7TnVtYmVyfSAgW2luZGV4XSAgIHNwaW5uZXIgaW5kZXggZGVmaW5lZCBieSBjbGktc3Bpbm5lci4gKGRlZmF1bHQ6IHJhbmRvbSBbMC0yOV0pXHJcbiAqIEByZXR1cm4ge1NwaW5uZXJ9IGNsaS1zcGlubmVyIGluc3RhbmNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwaW5uZXIoZm9ybWF0Pzogc3RyaW5nLCBpbmRleD86IG51bWJlcik6IHsgc3RhcnQ6ICgpID0+IHZvaWQ7IHN0b3A6IChjbGVhbj86IGJvb2xlYW4pID0+IHZvaWQ7IH0ge1xyXG4gICAgY29uc3Qgc3Bpbm5lcnMgPSBbXHJcbiAgICAgICAgXCJ8Ly1cXFxcXCIsXHJcbiAgICAgICAgXCLilKTilJjilLTilJTilJzilIzilKzilJBcIixcclxuICAgICAgICBcIuKXouKXo+KXpOKXpVwiLFxyXG4gICAgICAgIFwi4paM4paA4paQ4paEXCIsXHJcbiAgICAgICAgXCLilonilorilovilozilo3ilo7ilo/ilo7ilo3ilozilovilorilolcIixcclxuICAgICAgICBcIuKWgeKWg+KWhOKWheKWhuKWh+KWiOKWh+KWhuKWheKWhOKWg1wiLFxyXG4gICAgICAgIFwi4pix4piy4pi0XCIsXHJcbiAgICAgICAgXCIub09AKlwiLFxyXG4gICAgICAgIFwi4peQ4peT4peR4peSXCIsXHJcbiAgICAgICAgLy8vL1xyXG4gICAgICAgIFwi4peh4pehIOKKmeKKmSDil6Dil6BcIixcclxuICAgICAgICBcIuKWoOKWoeKWquKWq1wiLFxyXG4gICAgICAgIFwi4oaQ4oaW4oaR4oaX4oaS4oaY4oaT4oaZXCIsXHJcbiAgICAgICAgXCIub0/CsE9vLlwiLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IGZtdCA9IGZvcm1hdCB8fCBcIiVzXCI7XHJcbiAgICBjb25zdCBzcGlubmVyID0gbmV3IFNwaW5uZXIoZm10KTtcclxuICAgIGNvbnN0IGlkeCA9IChudWxsICE9IGluZGV4ICYmIDAgPD0gaW5kZXggJiYgaW5kZXggPCAxNCkgPyBpbmRleCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIHNwaW5uZXIuc2V0U3Bpbm5lclN0cmluZyhzcGlubmVyc1tpZHhdKTtcclxuICAgIHJldHVybiBzcGlubmVyO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgTm9ybWFsaXplVGV4dE9wdGlvbnNcclxuICogQGJyaWVmIG5vcm1hbGl6ZVRleHQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgZW9sPzogc3RyaW5nOyAgIC8vIGRlZmF1bHQ6IG9zLkVPTFxyXG4gICAgYm9tPzogYm9vbGVhbjsgIC8vIGRlZmF1bHQ6IHRydWVcclxuICAgIHRhYj86IG51bWJlcjsgICAvLyB0YWIg44KS5aSJ5o+b44GZ44KL44K544Oa44O844K544Gu5pWw44KS5oyH5a6aLiBkZWZhdWx0OiDlpInmj5vjgZfjgarjgYRcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSB0ZXh0IGxpbmUtZmVlZC5cclxuICogZm9yIHdpbmRvd3MgZ2l0IHVzZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICB0ZXh0ICAgICAgaW5wdXQgdGV4dC5cclxuICogQHBhcmFtICB7Tm9ybWFsaXplVGV4dE9wdGlvbnN9IFtvcHRpb25zXSBvcHRpb24uXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gbm9ybWFsaXplZCB0ZXh0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodGV4dDogc3RyaW5nLCBvcHRpb25zPzogTm9ybWFsaXplVGV4dE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBOb3JtYWxpemVUZXh0T3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGV4dCA9IHRleHRcclxuICAgICAgICAucmVwbGFjZSgvXlxcdWZlZmYvZ20sIFwiXCIpICAgLy8gcmVtb3ZlIGJvbVxyXG4gICAgICAgIC5yZXBsYWNlKC9cXHJcXG4vZ20sIFwiXFxuXCIpICAgIC8vIG9uY2UgXCJcXG5cIlxyXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZ20sIFwiXFxuXCIpXHJcbiAgICA7XHJcblxyXG4gICAgaWYgKG9wdC5ib20pIHtcclxuICAgICAgICB0ZXh0ID0gXCJcXHVmZWZmXCIgKyB0ZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKFwiXFxuXCIgIT09IG9wdC5lb2wpIHtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4vZ20sIG9wdC5lb2wpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdC50YWIpIHtcclxuICAgICAgICBjb25zdCBzcGFjZXMgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0LnRhYjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IFwiIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2dtLCBzcGFjZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZXh0O1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zXHJcbiAqIEBicmllZiBleGVjQ29tbWFuZCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnMgZXh0ZW5kcyBTcGF3bk9wdGlvbnMge1xyXG4gICAgc3Bpbm5lcj86IHtcclxuICAgICAgICBmb3JtYXQ/OiBzdHJpbmc7ICAgIC8vIGV4KSBcIiVzXCJcclxuICAgICAgICBpbmRleD86IG51bWJlcjsgICAgIC8vIDAgLSA5IOOBruaVsOWApOOCkuaMh+WumlxyXG4gICAgfTtcclxuICAgIHN0ZG91dD86IChkYXRhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBzdGRlcnI/OiAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSBjb21tYW5kIGxpbmUgYnkgc3Bhd24uXHJcbiAqIGNhbGwgc3Bhd24uIGlmIGVycm9yIG9jY3VyZWQsIGN1aSBpcyBraWxsZWQgcHJvY2Nlc3MuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgICAgICAgICAgY29tbWFuZCAgICBtYWluIGNvbW1hbmQuIGV4KSBcImNvcmRvdmFcIlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nW119ICAgICAgICAgICAgIGFyZ3MgICAgICAgY29tbWFuZCBhcmdzLiBleCkgW1wicGx1Z2luXCIsIFwiYWRkXCIsIHBsdWdpbk5hbWVdXHJcbiAqIEBwYXJhbSAgIHtFeGVjQ29tbWFuZE9wdGlvbnN9ICAgW29wdGlvbnNdICBjbGktc3Bpbm5lclwicyBvcHRpb25zLlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBlcnJvciBjb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXhlY0NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IEV4ZWNDb21tYW5kT3B0aW9ucyk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdDogRXhlY0NvbW1hbmRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICAgICAgc3RkaW86IFwiaW5oZXJpdFwiLFxyXG4gICAgICAgICAgICBzcGlubmVyOiB7IGZvcm1hdDogXCIlc1wiIH0sXHJcbiAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4geyAvKiBub29wICovIH0sXHJcbiAgICAgICAgICAgIHN0ZGVycjogKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4geyAvKiBub29wICovIH0sXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHdoaWNoKGNvbW1hbmQsIChlcnJvciwgcmVzb2x2ZWRDb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG9wdC5zcGlubmVyID8gZ2V0U3Bpbm5lcihvcHQuc3Bpbm5lci5mb3JtYXQsIG9wdC5zcGlubmVyLmluZGV4KSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGlubmVyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc3Bhd24ocmVzb2x2ZWRDb21tYW5kLCBhcmdzLCBvcHQpXHJcbiAgICAgICAgICAgICAgICAub24oXCJlcnJvclwiLCBoYW5kbGVFcnJvcilcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXCJwaXBlXCIgPT09IG9wdC5zdGRpbykge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdC5zdGRvdXQoZGF0YS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdC5zdGRlcnIoZGF0YS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnNcclxuICogQGJyaWVmIGNvcHlUcGwoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29weVRlbXBsYXRlT3B0aW9ucyBleHRlbmRzIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIGRlbGltaXRlcnM/OiBcInt7IH19XCIgfCBcIjwlICU+XCI7IC8vIHRlbXBsYXRlIOOBq+S9v+eUqOOBmeOCiyBkZWxpbWl0ZXIuIGRlZmF1bHQ6IFwie3sgfX1cIlxyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0ZW1wbGF0ZSB3aXRoIGhvZ2FuLlxyXG4gKiBzeW5jIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgIHNyYyAgICAgICBzb3VyY2UgZmlsZSBwYXRoLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBkc3QgICAgICAgZGVzdGluYXRpb24gZmlsZSBwYXRoLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgICBwYXJhbXMgICAgdGVtcGxhdGUgcGFyYW1ldGVycy5cclxuICogQHBhcmFtIHtDb3B5VGVtcGxhdGVPcHRpb25zfSAgW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUcGwoc3JjOiBzdHJpbmcsIGRzdDogc3RyaW5nLCBwYXJhbXM6IE9iamVjdCwgb3B0aW9ucz86IENvcHlUZW1wbGF0ZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgIGNvbnN0IG9wdCA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIGRlbGltaXRlcnM6IFwie3sgfX1cIixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmMoc3JjKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0KTtcclxuICAgIGNvbnN0IG91dHB1dCA9IG5vcm1hbGl6ZVRleHQoanN0LnJlbmRlcihwYXJhbXMpLCBvcHQpO1xyXG5cclxuICAgIGZzLmVuc3VyZUZpbGVTeW5jKGRzdCk7XHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRzdCwgb3V0cHV0LCBcInV0ZjhcIik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR1VJRCBnZW5lcmF0ZS5cclxuICogcmV0dXJuZWQgYXMgV2luZG93cyByZWdpc3RyeSB0eXBlIGZvcm1hdC5cclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBcIntcIiArIHV1aWQudjQoKS50b1VwcGVyQ2FzZSgpICsgXCJ9XCI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICAgc3RyICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHJldHVybnMgWE1MIE5vZGUgaW5zdGFuY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHIyWG1sTm9kZShzdHI6IHN0cmluZyk6IEpRdWVyeSB7XHJcbiAgICBsZXQgZnVsbFhNTCA9IHRydWU7XHJcbiAgICBpZiAoIS88P3htbC9pLnRlc3Qoc3RyKSkge1xyXG4gICAgICAgIGZ1bGxYTUwgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0ICR4bWwgPSAkKCQucGFyc2VYTUwoc3RyKSk7XHJcbiAgICByZXR1cm4gZnVsbFhNTCA/ICR4bWwgOiAkeG1sLmNoaWxkcmVuKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgWE1MIHN0cmluZyBmcm9tIERPTSBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEByZXR1cm4ge2pRdWVyeX0gWE1MIE5vZGUgaW5zdGFuY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB4bWxOb2RlMlN0cigkeG1sOiBKUXVlcnkpOiBzdHJpbmcge1xyXG4gICAgLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cclxuICAgIHJldHVybiBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKCR4bWxbMF0pO1xyXG4gICAgLyogZXNsaW50LWVuYWJsZSBuby11bmRlZiAqL1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zXHJcbiAqIEBicmllZiBmb3JtYXRYTUwoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9ucyBleHRlbmRzIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIHN0ZXA/OiBudW1iZXI7ICAgLy8g56m655m944K544Oa44O844K55pWwLiBkZWZhdWx0OiAyXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBYTUwgZm9ybWF0dGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICBzdHIgICAgICAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEBwYXJhbSAge0Zvcm1hdFhtbE9wdGlvbnN9IFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgWE1MXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0WE1MKHN0cjogc3RyaW5nLCBvcHRpb25zPzogRm9ybWF0WG1sT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IEZvcm1hdFhtbE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBzdGVwOiAyLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcbiAgICBsZXQgeG1sID0gXCJcIjtcclxuICAgIGxldCBwYWQgPSAwO1xyXG4gICAgbGV0IGluZGVudDogbnVtYmVyO1xyXG4gICAgbGV0IG5vZGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdCBzdHJBcnIgPSBub3JtYWxpemVUZXh0KHN0ciwgeyBlb2w6IFwiXFxuXCIgfSlcclxuICAgICAgICAucmVwbGFjZSgvKD4pKDwpKFxcLyopL2csIFwiJDFcXG4kMiQzXCIpIC8vIGluc2VydCBMRiB0byBlYWNoIG5vZGUgb25jZS5cclxuICAgICAgICAuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgY29uc3Qgc3BhY2VzID0gKGxlbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgIGNvbnN0IF9pbmRlbnQgPSBsZW4gKiBvcHQuc3RlcDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICBzICs9IFwiIFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIG5vZGUgPSAkLnRyaW0oc3RyQXJyW2ldKTtcclxuICAgICAgICBpZiAobm9kZS5tYXRjaCgvLis8XFwvXFx3W14+XSo+JC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcL1xcdy8pKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYWQgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXHdbXj5dKlteL10+LiokLykpIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB4bWwgKz0gc3BhY2VzKHBhZCkgKyBub2RlICsgXCJcXG5cIjtcclxuICAgICAgICBwYWQgKz0gaW5kZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHhtbCA9IHhtbFxyXG4gICAgICAgIC5yZXBsYWNlKC9cXG5cXG4vZ20sIFwiXFxuXCIpXHJcbiAgICAgICAgLnJlcGxhY2UoL14gK1xcbi9nbSwgXCJcIilcclxuICAgICAgICA7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZVRleHQoeG1sLCBvcHQpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvdG9vbHMudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn1cbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsaS1zcGlubmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjbGktc3Bpbm5lclwiLFwiY29tbW9uanMyXCI6XCJjbGktc3Bpbm5lclwifVxuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImZzLWV4dHJhXCIsXCJjb21tb25qczJcIjpcImZzLWV4dHJhXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn1cbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJqc2RvbVwiLFwiY29tbW9uanMyXCI6XCJqc2RvbVwifVxuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VtdmVyLXJlZ2V4XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJzZW12ZXItcmVnZXhcIixcImNvbW1vbmpzMlwiOlwic2VtdmVyLXJlZ2V4XCJ9XG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ1dWlkXCIsXCJjb21tb25qczJcIjpcInV1aWRcIn1cbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoaWNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ3aGljaFwiLFwiY29tbW9uanMyXCI6XCJ3aGljaFwifVxuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieG1sZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ4bWxkb21cIixcImNvbW1vbmpzMlwiOlwieG1sZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9XG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn1cbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuZGVyc2NvcmUuc3RyaW5nXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wiLFwiY29tbW9uanMyXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wifVxuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXX0=