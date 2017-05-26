﻿/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-05-26T12:48:08.061Z
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
 * @return {IGlobalSettings} options ログに使用するオプション
 */
function getSettings() {
    return libs_1.$.extend({}, _settings);
}
exports.getSettings = getSettings;
/**
 * 設定指定
 *
 * @param {IGlobalSettings} options ログに使用するオプション
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
 * @return {String} cdp-lib への path
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
 * @return {String} targetDir への path
 */
function getTargetDir() {
    return _settings.targetDir;
}
exports.getTargetDir = getTargetDir;
/**
 * ログ出力
 * console.log() と同等
 *
 * @param {String} message        出力メッセージ
 * @param {Any[]}  optionalParams 付加情報
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
 * @param {String} message        出力メッセージ
 * @param {Any[]}  optionalParams 付加情報
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
 * @param {Boolean} test           検証する式
 * @param {String}  message        出力メッセージ
 * @param {Any[]}   optionalParams 付加情報
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
 * @param {String} key キー文字列
 * @return 翻訳された文字列
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
        ]);
        let extra = [];
        if (this.config.nodejs) {
            extra.push({ name: "jasmine-node", version: "^2.0.0", });
        }
        else {
            extra.push({ name: "requirejs", version: "^2.0.0", });
        }
        if (this.isEnableTool("testem")) {
            extra.push({ name: "testem", version: undefined, });
        }
        if (this.isEnableTool("phantomjs-prebuilt")) {
            extra.push({ name: "phantomjs-prebuilt", version: undefined, });
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
            if (!/^.*[(\\|\s|/|:|\*|?|\"|<|>|\|)].*$/.test(this.config.projectName)) {
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
                copyTpl(path.join(templatePath("base/tools/testem"), "_testem.json"), path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"), this._config, { delimiters: "<% %>", bom: false, });
                const testemStuffPath = templatePath("base/tools/testem/files");
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
            const createProj = (() => {
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
     * @param {String} key ローカライズリソースキーを指定
     */
    progress(key) {
        utils_1.log(utils_1.chalk.cyan(utils_1.translate(key)));
    }
    /**
     * work directory の変更
     *
     * @param {String} directory target directory.
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
            { name: "dts-bundle", version: undefined, },
            { name: "eslint", version: undefined, },
            { name: "npm-run-all", version: undefined, },
            { name: "plato", version: undefined, },
            { name: "source-map", version: undefined, },
            { name: "source-map-loader", version: undefined, },
            { name: "tslint", version: undefined, },
            { name: "typedoc", version: undefined, },
            { name: "typescript", version: undefined, },
            { name: "typescript-formatter", version: undefined, },
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
 * @param  {String} str  string xml format. ex) '<preference name="DisallowOverscroll" value="true"/>'
 * @return {jQuery} XML Node instance
 */
function str2XmlNode(str) {
    return libs_1.$(libs_1.$.parseXML(str)).children();
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
        else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
            indent = 1;
        }
        else {
            indent = 0;
        }
        xml += spaces(pad) + node + opt.eol;
        pad += indent;
    }
    xml = xml.replace(/\n\n/gm, "\n");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDI0ZjNmNjE1ZjlhNDM4M2U5MzMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJvc1wiIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7QUNEakMsaUM7Ozs7Ozs7Ozs7OztBQ0FBLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQXlDM0IsZ0JBQUU7QUF4Q04scUNBQTZCO0FBeUN6QixvQkFBSTtBQXhDUixzQ0FBa0M7QUF5QzlCLHNCQUFLO0FBeENULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCxxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUErQjtBQXlDM0Isc0JBQUs7QUF4Q1QsNENBQTRDO0FBeUN4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QUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQTdDRCw4QkE2Q0M7Ozs7Ozs7QUN0VUQsMEM7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsOEM7Ozs7OztBQ0FBLG1DIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMDI0ZjNmNjE1ZjlhNDM4M2U5MzMiLCJleHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1iYXNlXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tIFwiLi9saWJzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Rvb2xzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tIFwiZ2xvYlwiO1xyXG5pbXBvcnQgKiBhcyBob2dhbiBmcm9tIFwiaG9nYW4uanNcIjtcclxuaW1wb3J0ICogYXMgX2wgZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBfcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgd2hpY2ggZnJvbSBcIndoaWNoXCI7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0ICogYXMgY2hhbGsgZnJvbSBcImNoYWxrXCI7XHJcbmltcG9ydCAqIGFzIHNlbXZlclJlZ2V4IGZyb20gXCJzZW12ZXItcmVnZXhcIjtcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJjbGktc3Bpbm5lclwiO1xyXG5cclxuY29uc3QgJDogSlF1ZXJ5U3RhdGljID0gKCgpID0+IHtcclxuICAgIGNvbnN0IF93aW5kb3cgPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGpzZG9tID0gcmVxdWlyZShcImpzZG9tXCIpO1xyXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBqc2RvbS5KU0RPTSkgeyAgICAvLyB2MTArXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcganNkb20uSlNET00oKS53aW5kb3c7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2OS4xMi54XHJcbiAgICAgICAgICAgIHJldHVybiBqc2RvbS5qc2RvbSgpLmRlZmF1bHRWaWV3O1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gcGF0Y2ggc2NvcGU6XHJcbiAgICAoKHJvb3Q6IGFueSkgPT4ge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICoganNkb20gOS40LjAgLSA5LjEyLjAg44Gr5a6f6KOF44GV44KM44Gm44GE44KLIERPTVBhcnNlciDjga8gWE1MIOOBriBzZXJpYWxpemUg44GM44Gn44GN44Gq44GE44Gf44KBLFxyXG4gICAgICAgICAqIHhtbGRvbSDjgavnva7jgY3mj5vjgYjjgotcclxuICAgICAgICAgKiBqc2RvbSAxMC4xLjAg44G+44Gn5YuV44GL44Gq44GE44GT44Go44KS56K66KqNXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgeG1sZG9tID0gcmVxdWlyZShcInhtbGRvbVwiKTtcclxuICAgICAgICByb290LkRPTVBhcnNlciA9IHhtbGRvbS5ET01QYXJzZXI7XHJcbiAgICAgICAgLy8geG1sZG9tIOOBq+OBryBkb20udG9TdHJpbmcoKSDjgYzlrp/oo4XjgZXjgozjgabjgYTjgovjgYzjgIFnbG9iYWwg44Gr44KCIGV4cG9ydCDjgZnjgotcclxuICAgICAgICAoPGFueT5nbG9iYWwpLlhNTFNlcmlhbGl6ZXIgPSByb290LlhNTFNlcmlhbGl6ZXIgPSB4bWxkb20uWE1MU2VyaWFsaXplcjtcclxuICAgIH0pKF93aW5kb3cpO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlKFwianF1ZXJ5XCIpKF93aW5kb3cpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHR5cGUgTWl4aW5lZFVuZGVyc2NvcmVTdGF0aWMgPSB0eXBlb2YgX3MgJiB0eXBlb2YgX2w7XHJcbmNvbnN0IF9tOiBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IDxhbnk+X2wubWl4aW4oPGFueT5fcy5leHBvcnRzKCkpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIF9tIGFzIF8sXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBjaGFsayxcclxuICAgIHNlbXZlclJlZ2V4LFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBmcywgJCB9IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5nc1xyXG4gKiBAYnJpZWYg44Kw44Ot44O844OQ44Or6Kit5a6a44Kk44Oz44K/44O844OV44Kn44Kk44K5XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICBmb3JjZT86IGJvb2xlYW47ICAgICAgICAgICAgLy8g44Ko44Op44O857aZ57aa55SoXHJcbiAgICB2ZXJib3NlPzogYm9vbGVhbjsgICAgICAgICAgLy8g6Kmz57Sw44Ot44KwXHJcbiAgICBzaWxlbnQ/OiBib29sZWFuOyAgICAgICAgICAgLy8gc2lsZW50IG1vZGVcclxuICAgIHRhcmdldERpcj86IHN0cmluZzsgICAgICAgICAvLyDkvZzmpa3jg4fjgqPjg6zjgq/jg4jjg6pcclxuICAgIGxhbmc/OiBcImVuLVVTXCIgfCBcImphLUpQXCI7XHJcbn1cclxuXHJcbmxldCBfc2V0dGluZ3M6IElHbG9iYWxTZXR0aW5ncyA9IHtcclxuICAgIGZvcmNlOiBmYWxzZSxcclxuICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgc2lsZW50OiBmYWxzZSxcclxuICAgIGxhbmc6IFwiZW4tVVNcIixcclxufTtcclxuXHJcbmxldCBfbGliUGF0aDogc3RyaW5nOyAgIC8vIGNkcC1saWIg44Gu5a2Y5Zyo44GX44Gm44GE44KLIHBhdGhcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiDoqK3lrprlj5blvpdcclxuICpcclxuICogQHJldHVybiB7SUdsb2JhbFNldHRpbmdzfSBvcHRpb25zIOODreOCsOOBq+S9v+eUqOOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdzKCk6IElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICByZXR1cm4gJC5leHRlbmQoe30sIF9zZXR0aW5ncyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoqK3lrprmjIflrppcclxuICpcclxuICogQHBhcmFtIHtJR2xvYmFsU2V0dGluZ3N9IG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElHbG9iYWxTZXR0aW5ncyk6IHZvaWQge1xyXG4gICAgaWYgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgX3NldHRpbmdzLmZvcmNlICAgICA9IHNldHRpbmdzLmZvcmNlICAgICAgICB8fCBfc2V0dGluZ3MuZm9yY2U7XHJcbiAgICAgICAgX3NldHRpbmdzLnZlcmJvc2UgICA9IHNldHRpbmdzLnZlcmJvc2UgICAgICB8fCBfc2V0dGluZ3MudmVyYm9zZTtcclxuICAgICAgICBfc2V0dGluZ3Muc2lsZW50ICAgID0gc2V0dGluZ3Muc2lsZW50ICAgICAgIHx8IF9zZXR0aW5ncy5zaWxlbnQ7XHJcbiAgICAgICAgX3NldHRpbmdzLnRhcmdldERpciA9IHNldHRpbmdzLnRhcmdldERpciAgICB8fCBfc2V0dGluZ3MudGFyZ2V0RGlyO1xyXG4gICAgICAgIF9zZXR0aW5ncy5sYW5nICAgICAgPSBzZXR0aW5ncy5sYW5nICAgICAgICAgfHwgX3NldHRpbmdzLmxhbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9zZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICB2ZXJib3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2lsZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgbGFuZzogXCJlbi1VU1wiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcImNkcC1saWJcIiDjgYzlrZjlnKjjgZnjgovjg5HjgrnjgpLlj5blvpdcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSBjZHAtbGliIOOBuOOBriBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGliUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKG51bGwgPT0gX2xpYlBhdGgpIHtcclxuICAgICAgICBjb25zdCBUUllfQ09VTlQgPSAzO1xyXG4gICAgICAgIGxldCB0cmllZCA9IDA7XHJcbiAgICAgICAgX2xpYlBhdGggPSBfX2Rpcm5hbWU7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKFRSWV9DT1VOVCA8PSB0cmllZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJsaWIgcGF0aCBpcyBub3QgcmVzb2x2ZWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9saWJQYXRoID0gcGF0aC5qb2luKF9saWJQYXRoLCBcIi4uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVjayA9IHBhdGguam9pbihfbGliUGF0aCwgXCJjZHAtbGliXCIpO1xyXG4gICAgICAgICAgICBpZiAoZnMucGF0aEV4aXN0c1N5bmMoY2hlY2spKSB7XHJcbiAgICAgICAgICAgICAgICBfbGliUGF0aCA9IGNoZWNrO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJpZWQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xpYlBhdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmjIflrprjgZXjgozjgZ8gdGFyZ2V0RGlyIOOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRhcmdldERpciDjgbjjga4gcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldERpcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjg63jgrDlh7rliptcclxuICogY29uc29sZS5sb2coKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0ge0FueVtdfSAgb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOips+e0sOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmRlYnVnKCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIHtBbnlbXX0gIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50ICYmIF9zZXR0aW5ncy52ZXJib3NlKSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRFQlVHOiBcIiArIG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5qSc6Ki8XHJcbiAqIGNvbnNvbGUuYXNzZXJ0KCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVzdCAgICAgICAgICAg5qSc6Ki844GZ44KL5byPXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSB7QW55W119ICAgb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHRlc3Q/OiBib29sZWFuLCBtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghdGVzdCkge1xyXG4gICAgICAgIGlmIChfc2V0dGluZ3MuZm9yY2UpIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBfbGFuZzogYW55O1xyXG5cclxuLyoqXHJcbiAqIOODreODvOOCq+ODqeOCpOOCulxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IOOCreODvOaWh+Wtl+WIl1xyXG4gKiBAcmV0dXJuIOe/u+ios+OBleOCjOOBn+aWh+Wtl+WIl1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIV9sYW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgX2xhbmcgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwicmVzL2xvY2FsZXNcIiwgXCJtZXNzYWdlcy5cIiArIF9zZXR0aW5ncy5sYW5nICsgXCIuanNvblwiKSwgXCJ1dGY4XCIpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkxhbmd1YWdlIHJlc291cmNlIEpTT04gcGFyc2UgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXNvdWNlID0gJC5leHRlbmQoe30sIF9sYW5nKTtcclxuICAgIGNvbnN0IHByb3BzID0ga2V5LnNwbGl0KFwiLlwiKTtcclxuICAgIHdoaWxlICgwIDwgcHJvcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgcHJvcCA9IHByb3BzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHJlc291Y2VbcHJvcF0pIHtcclxuICAgICAgICAgICAgcmVzb3VjZSA9IHJlc291Y2VbcHJvcF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBcInJlc291Y2Ugbm90IGZvdW5kLiBrZXk6IFwiICsga2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc291Y2U7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9zZXR0aW5ncy50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yRWxlY3Ryb25cclxuICogQGJyaWVmIERlc2t0b3AgRWxlY3Ryb24g55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JFbGVjdHJvbiBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3dy9hcHBcIiwgLy8gVE9ETzog5pqr5a6aXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHNyY0NvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0OiBcInNjcmlwdHNcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6IFwic3R5bGVzaGVldHNcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcInRlbXBsYXRlc1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lEZXNrdG9wQXBwQ29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInVuZGVyIGNvbnN0cnVjdGlvbi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1ub3JtYWxpemUuanNcIixcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJRGVza3RvcEFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Rlc2t0b3AvZ2VuZXJhdG9yLWVsZWN0b3Jvbi50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yRWxlY3Ryb24gfSBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1lbGVjdG9yb25cIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yRGVza3RvcChjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckVsZWN0cm9uKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7XHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElEZXBlbmRlbmN5LFxyXG4gICAgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbixcclxuICAgIEdlbmVyYXRvckJhc2UsXHJcbiAgICBVdGlscyxcclxufSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJTGlicmFyeUNvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmNvbnN0IGZzICAgICAgICAgICAgPSBVdGlscy5mcztcclxuY29uc3QgZ2xvYiAgICAgICAgICA9IFV0aWxzLmdsb2I7XHJcbmNvbnN0ICQgICAgICAgICAgICAgPSBVdGlscy4kO1xyXG5jb25zdCBfICAgICAgICAgICAgID0gVXRpbHMuXztcclxuY29uc3QgZGVidWcgICAgICAgICA9IFV0aWxzLmRlYnVnO1xyXG5jb25zdCB0ZW1wbGF0ZVBhdGggID0gVXRpbHMudGVtcGxhdGVQYXRoO1xyXG5jb25zdCBjb3B5VHBsICAgICAgID0gVXRpbHMuY29weVRwbDtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yTW9kdWxlXHJcbiAqIEBicmllZiBMaWJyYXJ5IE1vZHVsZSDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvck1vZHVsZSBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJzcmNcIixcclxuICAgICAgICAgICAgcGtnOiBcImRpc3RcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYnVpbHRcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICB0ZW1wOiBcIi50ZW1wXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlTW9kdWxlUHJvcHMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdFNldHRpbmdzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTb3VyY2VUZW1wbGF0ZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlVmlzdWFsU3R1ZGlvU29sdXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidW5kbGUtZmluYWxpemVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwicmVtYXAtY292ZXJhZ2UuanNcIixcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcm90ZWN0ZWQgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmWi+eZuuaZguOBruS+neWtmOODouOCuOODpeODvOODq+ODquOCueODiOOBruWPluW+l1xyXG4gICAgICog5b+F6KaB44Gr5b+c44GY44Gm44Kq44O844OQ44O844Op44Kk44OJXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7SURlcGVuZGVuY3l9XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgZGVmYXVsdERldkRlcGVuZGVuY2llcygpOiBJRGVwZW5kZW5jeVtdIHtcclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gc3VwZXIuZGVmYXVsdERldkRlcGVuZGVuY2llcy5jb25jYXQoW1xyXG4gICAgICAgICAgICB7IG5hbWU6IFwiQHR5cGVzL2phc21pbmVcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBsZXQgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcubm9kZWpzKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcImphc21pbmUtbm9kZVwiLCB2ZXJzaW9uOiBcIl4yLjAuMFwiLCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJyZXF1aXJlanNcIiwgdmVyc2lvbjogXCJeMi4wLjBcIiwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcInRlc3RlbVwiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJ0ZXN0ZW1cIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwicGhhbnRvbWpzLXByZWJ1aWx0XCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInBoYW50b21qcy1wcmVidWlsdFwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGRlcGVuZHMuY29uY2F0KGV4dHJhKSwgKGRlcGVuZCkgPT4gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJTGlicmFyeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJTGlicmFyeUNvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb2R1bGUg5ZCNLCBtYWluIOODleOCoeOCpOODq+WQjeOBruS/neiovFxyXG4gICAgICogLSAxOiBtb2R1bGVOYW1lIOOBjOaMh+WumuOBleOCjOOBpuOBhOOCi+WgtOWQiOOBr+S9v+eUqOOBmeOCi1xyXG4gICAgICogLSAyOiBwcm9qZWN0TmFtZSDjgYzkvb/nlKjlj6/og73jgarloLTlkIjjga/jgZ3jgozjgpLkvb/nlKjjgZnjgotcclxuICAgICAqIC0gMzogcHJvamVjdE5hbWUg44GM5L2/55So5LiN5Y+v44Gu5aC05ZCI44Gv44CBXCItXCIg44Gk44Gq44GO5paH5a2X5YiX44KS55Sf5oiQ44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5zdXJlTW9kdWxlUHJvcHMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gbW9kdWxlIG5hbWVcclxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghL14uKlsoXFxcXHxcXHN8L3w6fFxcKnw/fFxcXCJ8PHw+fFxcfCldLiokLy50ZXN0KHRoaXMuY29uZmlnLnByb2plY3ROYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubW9kdWxlTmFtZSA9IHRoaXMuY29uZmlnLnByb2plY3ROYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubW9kdWxlTmFtZSA9IF8udHJpbShfLmRhc2hlcml6ZSh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSksIFwiLVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1ZyhcIm1vZHVsZU5hbWU6IFwiICsgdGhpcy5jb25maWcubW9kdWxlTmFtZSk7XHJcblxyXG4gICAgICAgIC8vIG1haW4gZmlsZSBuYW1lXHJcbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jb25maWcubWFpbkJhc2VOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm1haW5CYXNlTmFtZSA9IHRoaXMuY29uZmlnLm1vZHVsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlYnVnKFwibWFpbkJhc2VOYW1lOiBcIiArIHRoaXMuY29uZmlnLm1haW5CYXNlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg4fjgqPjg6zjgq/jg4jjg6rmp4vmiJDmg4XloLHjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwibGlicmFyeS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4joqK3lrprjg5XjgqHjgqTjg6vjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVQcm9qZWN0U2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gcHJvamVjdC5jb25maWcuanNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfcHJvamVjdC5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicHJvamVjdC5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRzY29uZmlnXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyB0ZXN0IHRzY29uZmlnLmpzb25cclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy50ZXN0Lmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwidW5pdFwiLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLm91dHB1dC1zYW1lLWRpci5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGVzbGludHJjLmpzb25cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcImVzbGludFwiLCBcImVzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMucXVlcnlFc0xpbnRFbnZQYXJhbSgpLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRlc3RlbVxyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcubm9kZWpzKSB7XHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS90b29scy90ZXN0ZW1cIiksIFwiX3Rlc3RlbS5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInJ1bm5lclwiLCBcInRlc3RlbS5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RlbVN0dWZmUGF0aCA9IHRlbXBsYXRlUGF0aChcImJhc2UvdG9vbHMvdGVzdGVtL2ZpbGVzXCIpO1xyXG5cclxuICAgICAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwge1xyXG4gICAgICAgICAgICAgICAgY3dkOiB0ZXN0ZW1TdHVmZlBhdGgsXHJcbiAgICAgICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZXN0ZW1TdHVmZlBhdGgsIGZpbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIGZpbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLmdpdGlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIi5naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSRUFETUUubWRcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIlJFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzID0gYXdhaXQgdGhpcy5xdWVyeURlcGVuZGVuY2llc1BhcmFtKHRoaXMuY29uZmlnLmRldkRlcGVuZGVuY2llcyB8fCB0aGlzLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicGFja2FnZS5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCveODvOOCueOBrumbm+W9ouS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IF9tb2R1bGUgPSBwYXRoLmJhc2VuYW1lKHRoaXMuX2NvbmZpZy5tb2R1bGVOYW1lLCBcIi5qc1wiKTtcclxuICAgICAgICBjb25zdCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgc2FtcGxlQ2xhc3M6IF8uY2xhc3NpZnkoX21vZHVsZSksXHJcbiAgICAgICAgICAgIHNhbXBsZU1vZHVsZTogX21vZHVsZSxcclxuICAgICAgICAgICAgYnVpbHQ6IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0IHx8IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXgudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXgudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLCBzY3JpcHQsIF9tb2R1bGUgKyBcIi50c1wiKSxcclxuICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBpbmRleC5zcGVjLnRzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwic3JjXCIsIFwiX2luZGV4LnNwZWMudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIF9tb2R1bGUgKyBcIi5zcGVjLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHZzUGFyYW0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVHVUlEID0gVXRpbHMuY3JlYXRlR1VJRDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uID0gJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdE5hbWUgICAgICAgPSB0aGlzLl9jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3RHVUlEICAgICAgID0gY3JlYXRlR1VJRCgpO1xyXG4gICAgICAgICAgICBwYXJhbS50eXBlcyAgICAgICAgICAgICA9IHBhcmFtLnR5cGVzLnJlcGxhY2UoXCJAXCIsIFwiJTQwXCIpOyAvLyBlc2NhcGUgXCJAXCIgdG8gXCIlNDBcIlxyXG4gICAgICAgICAgICBwYXJhbS5tYWluQmFzZU5hbWUgICAgICA9IHRoaXMuX2NvbmZpZy5tYWluQmFzZU5hbWU7XHJcbiAgICAgICAgICAgIHBhcmFtLmxpY2Vuc2UgICAgICAgICAgID0gIXRoaXMuX2NvbmZpZy5wcml2YXRlO1xyXG5cclxuICAgICAgICAgICAgLy8gdG9vbHNcclxuICAgICAgICAgICAgcGFyYW0ud2VicGFjayA9IHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKTtcclxuICAgICAgICAgICAgcGFyYW0udGVzdGVtID0gIXRoaXMuY29uZmlnLm5vZGVqcztcclxuXHJcbiAgICAgICAgICAgIHBhcmFtLm91dHB1dFNhbWVEaXIgPSB0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgYnVpbHQganMgZ3JvdXBcclxuICAgICAgICAgICAgcGFyYW0uanNHcm91cCA9IFtdO1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLmpzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5idWlsdCArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZF90czogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluX21hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcubWluaWZ5KSB7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXR1cCBwa2cgZ3JvdXBcclxuICAgICAgICAgICAgICAgIHBhcmFtLmpzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5wa2cgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBkX3RzOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbl9tYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgdGVzdCBqcyBncm91cFxyXG4gICAgICAgICAgICBwYXJhbS50c0dyb3VwID0gW1xyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0udGVzdCArIFwiXFxcXHVuaXRcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSArIFwiLnNwZWNcIixcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICBpZiAocGFyYW0ub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0udHNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLmJ1aWx0ICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyAuc2xuXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgXCJfc29sdXRpb24uc2xuLnRwbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLnNsblwiKSxcclxuICAgICAgICAgICAgdnNQYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIC5jc3Byb2pcclxuICAgICAgICBjb25zdCBjcmVhdGVQcm9qID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9YbWxTdHJpbmcgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBob2dhbiA9IFV0aWxzLmhvZ2FuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IFV0aWxzLm5vcm1hbGl6ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRwbCA9IHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyh0cGwpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc3QucmVuZGVyKHZzUGFyYW0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxET00gPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHRvWG1sU3RyaW5nKGZpbGUpKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b1htbE5vZGUgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuc3RyMlhtbE5vZGUodG9YbWxTdHJpbmcoZmlsZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJHByb2ogPSB0b1htbERPTShcIl9wcm9qZWN0LmNzcHJvai50cGxcIik7XHJcbiAgICAgICAgICAgIGNvbnN0ICRncFRTID0gdG9YbWxOb2RlKFwiX3RzLml0ZW0uZ3JvdXAudHBsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BKUyA9IHRvWG1sTm9kZShcIl9qcy5pdGVtLmdyb3VwLnRwbFwiKTtcclxuXHJcbiAgICAgICAgICAgICRwcm9qXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIkl0ZW1Hcm91cFwiKVxyXG4gICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncFRTKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncEpTKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0WE1MID0gVXRpbHMuZm9ybWF0WE1MO1xyXG4gICAgICAgICAgICBjb25zdCBkc3RQYXRoID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLmNzcHJvalwiKTtcclxuICAgICAgICAgICAgZGVidWcoVXRpbHMueG1sTm9kZTJTdHIoJHByb2opKTtcclxuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkc3RQYXRoLCBmb3JtYXRYTUwoVXRpbHMueG1sTm9kZTJTdHIoJHByb2opKSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbGlicmFyeS9nZW5lcmF0b3ItbW9kdWxlLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JNb2R1bGUgfSBmcm9tIFwiLi9nZW5lcmF0b3ItbW9kdWxlXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvck1vZHVsZShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2luZGV4LnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgeyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiwgIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJTW9iaWxlQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JDb3Jkb3ZhXHJcbiAqIEBicmllZiBNb2JpbGUgQ29yZG92YSDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckNvcmRvdmEgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSU1vYmlsZUFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJTW9iaWxlQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JDb3Jkb3ZhIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQ29yZG92YShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSVdlYkFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQnJvd3NlclxyXG4gKiBAYnJpZWYgV2ViIEJyb3dzZXIg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JCcm93c2VyIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElXZWJBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SVdlYkFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQnJvd3NlciB9IGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcldlYihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckJyb3dzZXIoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5leHBvcnQgeyBVdGlscyB9O1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbixcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSVByb2plY3RDb25maWdyYXRpb24sXHJcbiAgICBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbiAgICAvLy8vXHJcbiAgICBuZXdHZW5lcmF0b3JcclxufSBmcm9tIFwiLi9nZW5lcmF0b3JzXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uLFxyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElMaWJyYXJ5Q29uZmlncmF0aW9uLFxyXG4gICAgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbixcclxuICAgIElEZXNrdG9wQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSVdlYkFwcENvbmZpZ3JhdGlvbixcclxufTtcclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGNsYXNzIENEUExpYlxyXG4gKiBAYnJpZWYgQ0RQIGJvaWxlcnBsYXRlIOeUn+aIkOapn+iDveOCkuaPkOS+m+OBmeOCi+OCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0RQTGliIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIG1haW4gY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4ZWN1dGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIFV0aWxzLnNldFNldHRpbmdzKGNvbmZpZy5zZXR0aW5ncyk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvcihjb25maWcpLnJ1bigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY2RwLWxpYi50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGNoYWxrLFxyXG4gICAgXyxcclxuICAgICQsXHJcbiAgICAvLy8vXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIGdldFNwaW5uZXIsXHJcbiAgICBnZXRUYXJnZXREaXIsXHJcbiAgICB0ZW1wbGF0ZVBhdGgsXHJcbiAgICBjb3B5VHBsLFxyXG4gICAgbG9nLFxyXG4gICAgZGVidWcsXHJcbiAgICB0cmFuc2xhdGUsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSVdlYnBhY2tDb25maWdyYXRpb24sXHJcbn0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCYXNlXHJcbiAqIEBicmllZiDjgZnjgbnjgabjga4gR2VuZXJhdG9yIOOBruaXouWumuOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3Byb2plY3RSb290RGlyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVByb2plY3RDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdFJvb3REaXIgPSBnZXRUYXJnZXREaXIoKSA/XHJcbiAgICAgICAgICAgIGdldFRhcmdldERpcigpIDpcclxuICAgICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QmFzZVN0cnVjdHVyZSgpLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaXZhdGUgPSBcIk5PTkVcIiA9PT0gdGhpcy5fY29uZmlnLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykub3V0cHV0U2FtZURpclxyXG4gICAgICAgICAgICA9IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjID09PSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0O1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm5vZGVqcyA9ICgoZW52OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnYpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJub2RlXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWxlY3Ryb25cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5lbnYpO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9jb25maWcsIG51bGwsIDQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHpueQhumWi+WniyAo44Ko44Oz44OI44OqKVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImNyZWF0ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmtub3duIGFjdGlvbjogXCIgKyB0aGlzLl9jb25maWcuYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGFic3RyYWN0IG1ldGhvZHM6XHJcblxyXG4gICAgLy8g5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgIGFic3RyYWN0IGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uO1xyXG5cclxuICAgIC8vIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8g5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICBhYnN0cmFjdCBnZXQgdGFza0xpc3QoKTogc3RyaW5nW107XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCy5o2X44OG44Kt44K544OI44KS6YCa55+lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSDjg63jg7zjgqvjg6njgqTjgrrjg6rjgr3jg7zjgrnjgq3jg7zjgpLmjIflrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2dyZXNzKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9nKGNoYWxrLmN5YW4odHJhbnNsYXRlKGtleSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdvcmsgZGlyZWN0b3J5IOOBruWkieabtFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZGlyKGRpcmVjdG9yeTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgcHJvY2Vzcy5jaGRpcihkaXJlY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvamVjdCByb290IGRpcmVjdG9yeSDjga7lj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgcm9vdERpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Um9vdERpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlbXBsYXRlIGRpcmVjdG9yeSDjgpLmjIflrprjgZfjgabphY3kuIvjga7jg5XjgqHjgqTjg6vjgpLjgrPjg5Tjg7xcclxuICAgICAqIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIOOBruioreWumuOBjOWPjeaYoOOBleOCjOOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgIOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHN0Um9vdCDjgrPjg5Tjg7zlhYjjgpLmjIflrpouIOaMh+WumuOBjOeEoeOBhOWgtOWQiOOBryByb290RGlyIOOBjOioreWumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29weVRwbERpcih0YXJnZXQ6IHN0cmluZywgZHN0Um9vdD86IHN0cmluZywgb3B0aW9ucz86IGdsb2IuSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBkc3RSb290ID0gZHN0Um9vdCB8fCB0aGlzLnJvb3REaXI7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgY3dkOiB0ZW1wbGF0ZVBhdGgodGFyZ2V0KSxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdDogdHJ1ZSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRzdCA9IHBhdGguam9pbihkc3RSb290LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3NyYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3BrZy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnBrZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2J1aWx0LywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvZG9jLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZG9jKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGFzay8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rlc3QvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlcy8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3RlbXAvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlbXApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMocGF0aC5qb2luKHRlbXBsYXRlUGF0aCh0YXJnZXQpLCBmaWxlKSwgZHN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUgbW9kdWxlIOOBriB2ZXJzaW9uIOWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvbWlzZTxzdHJpbmc+fSB2ZXJzaW9uIHRleHRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBleGVjQ29tbWFuZChcIm5wbVwiLCBbXCJpbmZvXCIsIG5hbWUsIFwidmVyc2lvblwiXSwge1xyXG4gICAgICAgICAgICAgICAgc3RkaW86IFwicGlwZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Bpbm5lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBfLnRyaW0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44Gu6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjb252ZXJ0LXNvdXJjZS1tYXBcIiwgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkZWxcIiwgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkdHMtYnVuZGxlXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJlc2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJucG0tcnVuLWFsbFwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwbGF0b1wiLCAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwLWxvYWRlclwiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0c2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlZG9jXCIsICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0XCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0LWZvcm1hdHRlclwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtaW5pZnkgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlczogW1wiZXM1XCJdLCAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidWdsaWZ5LWVzXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgZXM6IFtcImVzMjAxNVwiXSwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBsZXQgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5taW5pZnkpIHtcclxuICAgICAgICAgICAgZXh0cmEgPSBleHRyYS5jb25jYXQobWluaWZ5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJ3ZWJwYWNrXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcIm55Y1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJueWNcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShiYXNlLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlcGVuZGVuY2llcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtJRGVwZW5kZW5jeVtdfSBkZXBlbmRlbmNpZXMg5L6d5a2Y6Zai5L+C44Oq44K544OIXHJcbiAgICAgKiBAcmV0dXJuIHt7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbjsgfVtdfSDjg4bjg7Pjg5fjg6zjg7zjg4jjg5Hjg6njg6Hjg7zjgr/jgavmjIflrprjgZnjgovphY3liJdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFzeW5jIHF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0oZGVwZW5kZW5jaWVzOiBJRGVwZW5kZW5jeVtdKTogUHJvbWlzZTx7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbiB9W10+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwiYmFzZS5jcmVhdGUucXVlcnlWZXJzaW9uXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gPHsgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuOyB9W10+ZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kLmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWRlcGVuZC5lcy5maW5kKChlc1ZlcnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZXMgPT09IGVzVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlYnVnKEpTT04uc3RyaW5naWZ5KGRlcGVuZHMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAoY29udGV4dDogYW55KTogYW55ID0+IHtcclxuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBjb250ZXh0ICYmICF0aGlzLl9jb25maWcuc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gZ2V0U3Bpbm5lcihjaGFsay55ZWxsb3coY29udGV4dCksIDUpO1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwaW5uZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBkZXBlbmRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobnVsbCA9PSBkZXBlbmRzW2ldLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBwcm9ncmVzcyhkZXBlbmRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS52ZXJzaW9uID0gXCJeXCIgKyBhd2FpdCB0aGlzLnF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24oZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzKHNwaW5uZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09PSBuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS5sYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3ZWJwYWNrLmNvbmZpZy5qcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxpYnJhcnlUYXJnZXQg44Gr5oyH5a6a44GZ44KL5paH5a2X5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeVdlYnBhY2tMaWJyYXJ5VGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICgoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1vZHVsZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1vbmpzMlwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiYW1kXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhbWRcIjtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW1kXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVzbGludHJjIOOBriBlbnYg44Gr5oyH5a6a44GZ44KLIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBlbnYg44Gr5oyH5a6a44GZ44KL44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeUVzTGludEVudlBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgY29tcGlsZVNldHRpbmcgPSA8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlczY6IFwiZXM1XCIgIT09IGNvbXBpbGVTZXR0aW5nLmVzLFxyXG4gICAgICAgICAgICBub2RlOiBcIndlYlwiICE9PSBjb21waWxlU2V0dGluZy5lbnYsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbi50b29scyDjg5fjg63jg5Hjg4bjgqPjga7mjIflrprnirbms4HjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lIOODhOODvOODq+WQjeOCkuaMh+WumlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZTog5oyH5a6a44GV44KM44Gm44GE44KLIC8gZmFsc2U6IOaMh+WumuOBleOCjOOBpuOBhOOBquOBhFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbmFibGVUb29sKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykudG9vbHMuZmluZCgodG9vbCkgPT4gbmFtZSA9PT0gdG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSDlh6bnkIbjga7jgqjjg7Pjg4jjg6pcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBydW5DcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVCYXNlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa44GuIGNyZWF0ZSDlh6bnkIZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVCYXNlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJiYXNlLmNyZWF0ZS5mb3VuZGF0aW9uXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdERpcigpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weUJhc2VTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlDb21tb25GaWxlcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weVRhc2tTY3JpcHRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4jjg4fjgqPjg6zjgq/jg4jjg6rjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9qZWN0RGlyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMucm9vdERpcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IodHJhbnNsYXRlKFwiYmFzZS5jcmVhdGUuZXJyb3IuYWxyZWFkeUV4aXN0XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMubWtkaXJzU3luYyh0aGlzLnJvb3REaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weUJhc2VTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwiYmFzZS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln7rmnKzjg5XjgqHjgqTjg6vjga7jgrPjg5Tjg7xcclxuICAgICAqIHRlbXBsYXRlIOOBruOCs+ODlOODvOOCguihjOOBhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlDb21tb25GaWxlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHRoaXMucm9vdERpcjtcclxuXHJcbiAgICAgICAgLy8gLm5wbWlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiLm5wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCIubnBtaWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQkFOTkVSXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0JBTk5FUlwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJCQU5ORVJcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gTElDRU5TRVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZmlnLmxpY2Vuc2UpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkFwYWNoZS0yLjBcIjpcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuQXBhY2hlLTIuMFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIkxJQ0VOU0VcIiksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNSVRcIjpcclxuICAgICAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTElDRU5TRS5NSVRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jb3B5cmlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTk9USUNFXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX05PVElDRVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJOT1RJQ0VcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gYnVpbGQgdG9vbHM6IHdlYnBhY2tcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJV2VicGFja0NvbmZpZ3JhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIG5vZGVqczogKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMsXHJcbiAgICAgICAgICAgICAgICBndWlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRhc2tQYXRoOiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRhc2ssXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcInRvb2xzL3dlYnBhY2svX3dlYnBhY2suY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJ3ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRhc2sgc2NyaXB0IOOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlUYXNrU2NyaXB0cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Rhc2tcIik7XHJcbiAgICAgICAgY29uc3QgZHN0RGlyID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgdGFzayksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCB0YXNrKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5leHBvcnQgeyBVdGlscyB9O1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjgr3jg7zjgrnjg4fjgqPjg6zjgq/jg4jjg6rjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uIHtcclxuICAgIHNjcmlwdD86IHN0cmluZzsgICAgICAgICAgICAvLyBqcyh0cykg44OV44Kh44Kk44Or5L+d5a2Y5YWIXHJcbiAgICBzdHlsZXNoZWV0Pzogc3RyaW5nOyAgICAgICAgLy8gY3NzKGNzcykg44OV44Kh44Kk44Or5L+d5a2Y5YWIXHJcbiAgICB0ZW1wbGF0ZT86IHN0cmluZzsgICAgICAgICAgLy8gaHRtbCh0ZW1wbGF0ZSkg44OV44Kh44Kk44Or5L+d5a2Y5YWIXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jjg4fjgqPjg6zjgq/jg4jjg6rjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgc3JjPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr3jg7zjgrnjgrPjg7zjg4njga7jg6vjg7zjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHBrZz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OR44OD44Kx44O844K45YWI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBidWlsdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCs+ODs+ODkeOCpOODq+WFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgZG9jPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4njgq3jg6Xjg6Hjg7Pjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRhc2s/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K/44K544Kv44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0ZXN0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODhuOCueODiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdHlwZXM/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlU2NyaXB0IOWei+Wumue+qeODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVtcD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkvZzmpa3jg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHNyY0NvbmZpZz86IElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbjsgICAgLy8gSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElEZXBlbmRlbmN5XHJcbiAqIEBicmllZiBwYWNrYWdlLmpzb24g44Gr5oyH5a6a44GZ44KLIGRlcGVuZGVuY2llcyDmg4XloLHjgpLmoLzntI3jgZnjgovjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3kge1xyXG4gICAgbmFtZTogc3RyaW5nOyAgICAgICAgICAgLy8gbW9kdWxlIG5hbWUgZXgpIFwidHlwZXNjcmlwdFwiXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nOyAgICAgICAvLyDmjIflrprjg5Djg7zjgrjjg6fjg7MuIOeEoeaMh+WumuOBruWgtOWQiOOBr+acgOaWsOODkOODvOOCuOODp+ODs1xyXG4gICAgZXM/OiBzdHJpbmdbXTsgICAgICAgICAgLy8g5oyH5a6a44GV44KM44GfIEVTIHZlcnNpb24g44Gu44Go44GN44Gu44G/5pyJ5Yq544Gr44GZ44KLXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jlhbHpgJrjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgcHJvamVjdFR5cGU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI56iu6aGeIGV4KSBcImxpYnJhcnlcIlxyXG4gICAgYWN0aW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXgpIFwiY3JlYXRlXCJcclxuICAgIHZlcnNpb246IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkOODvOOCuOODp+ODsyBleCkgXCIxLjAuMFwiXHJcbiAgICBsaWNlbnNlOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6njgqTjgrvjg7PjgrkgZXgpIFwiQXBhY2hlLTIuMFwiXHJcbiAgICBwcml2YXRlPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcml2YXRlIOODkeODg+OCseODvOOCuOOBruWgtOWQiCB0cnVlXHJcbiAgICBzZXR0aW5nczogVXRpbHMuSUdsb2JhbFNldHRpbmdzOyAgICAgICAgICAgICAgICAvLyDjg63jgrDjgqrjg5fjgrfjg6fjg7NcclxuICAgIG1vZHVsZU5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydCDjgavmjIflrprjgZnjgosg44Oi44K444Ol44O844Or5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgbWFpbkJhc2VOYW1lPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oh44Kk44Oz44OV44Kh44Kk44Or5ZCNIGV4KSBcImNkcC1saWJcIiAvIFwiaW5kZXhcIlxyXG4gICAgbmFtZXNwYWNlPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Or44O844OI5ZCN5YmN56m66ZaTXHJcbiAgICBzdHJ1Y3R1cmVDb25maWc/OiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjsgICAvLyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gICAgY29weXJpZ2h0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Kz44OU44O844Op44Kk44OI5paH5a2X5YiXIGV4KSBcIkNvcHlyaWdodCAoYykgMjAxNyBTb255IENvcnBvcmF0aW9uXCJcclxuICAgIGRldkRlcGVuZGVuY2llcz86IElEZXBlbmRlbmN5W107ICAgICAgICAgICAgICAgIC8vIOmWi+eZuueUqOS+neWtmOODouOCuOODpeODvOODq+aDheWgsVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQnVpbGRUYXJnZXRDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODk+ODq+ODieOCv+ODvOOCsuODg+ODiOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24ge1xyXG4gICAgZXM/OiBcImVzNVwiIHwgXCJlczIwMTVcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg44GuIHRyYW5zcGlsZSB0YXJnZXRcclxuICAgIG1vZHVsZT86IFwibm9uZVwiIHwgXCJjb21tb25qc1wiIHwgXCJhbWRcIiB8IFwidW1kXCI7ICAgICAgICAgICAgICAgLy8gSmF2YVNjcmlwdCBtb2R1bGUgc3lzdGVtXHJcbiAgICBlbnY/OiBcIndlYlwiIHwgXCJub2RlXCIgfCBcImVsZWN0cm9uXCIgfCBcImVsZWN0cm9uLXJlbmRlcmVyXCI7ICAgIC8vIOWun+ihjOeSsOWig+OBriB0YXJnZXRcclxuICAgIG5vZGVqcz86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIOOBruWgtOWQiOOBqyB0cnVlXHJcbiAgICBtaW5pZnk/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6rjg6rjg7zjgrnmmYLjgasgbWluaWZ5IOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICAvLyBidWlsZCB0b29sXHJcbiAgICB0b29scz86IHN0cmluZ1tdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDml6Llrprjga4gYnVpbGQgdG9vbCBleCkgW1wid2VicGFja1wiXVxyXG4gICAgb3V0cHV0U2FtZURpcj86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3JjIOOBqCBidWlsdCDjgYzlkIzjgZjjg4fjgqPjg6zjgq/jg4jjg6rjgavjgarjgovloLTlkIggdHJ1ZVxyXG4gICAgLy8gQ1NTXHJcbiAgICBzdXBwb3J0Q1NTPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbVEJEXSBDU1Mg44KS5ZCr44KB44KL5aC05ZCI44Gr44GvIHRydWVcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVdlYnBhY2tDb25maWdyYXRpb25cclxuICogQGJyaWVmIFdlYnBhY2sg55So44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElXZWJwYWNrQ29uZmlncmF0aW9uIHtcclxuICAgIG5vZGVqczogYm9vbGVhbjsgICAgLy8gXCJub2RlXCIgfCBcImVsZWN0cm9uXCIg44Gu5aC05ZCI44GrIHRydWVcclxuICAgIGd1aWRlOiBib29sZWFuOyAgICAgLy8gZ3VpZGUg44Kz44Oh44Oz44OI44KS5LuY5Yqg44GZ44KL5aC05ZCI44GvIHRydWUg44KS5oyH5a6aXHJcbiAgICB0YXNrUGF0aDogc3RyaW5nOyAgIC8vICd0YXNrJyDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgVmlzdWFsIFN0dWRpbyDnlKjjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbiBleHRlbmRzIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3ROYW1lOiBzdHJpbmc7ICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBwcm9qZWN0R1VJRDogc3RyaW5nOyAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OIIEdVSUQgZXgpIHs1MUI0MTM1OS04RDJDLTQyREYtODQxNC1FODVCMDI5OTMyMzh9XHJcbiAgICBtYWluQmFzZU5hbWU6IHN0cmluZzsgICAgICAgLy8g44Oh44Kk44Oz44OV44Kh44Kk44Or5ZCNIGV4KSBcImNkcC1saWJcIiAvIGluZGV4XHJcbiAgICBsaWNlbnNlOiBib29sZWFuOyAgICAgICAgICAgLy8gTElDRU5TRSDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgd2VicGFjazogYm9vbGVhbjsgICAgICAgICAgIC8vIHdlYnBhY2suY29uZmlnLmpzIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICB0ZXN0ZW06IGJvb2xlYW47ICAgICAgICAgICAgLy8gdGVzdGVtIHJ1bm5lciDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgb3V0cHV0U2FtZURpcjogYm9vbGVhbjsgICAgIC8vIHNyYyDjgaggYnVpbHQg44GM5ZCM44GY44OH44Kj44Os44Kv44OI44Oq44Gr44Gq44KL5aC05ZCIIHRydWVcclxuICAgIHRzR3JvdXA6IHtcclxuICAgICAgICByZWxhdGl2ZVBhdGg6IHN0cmluZzsgICAvLyBcImhvZ2Vob2dlXFxcIlxyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmc7ICAgICAgIC8vIFwiY2RwLWxpYlwiXHJcbiAgICAgICAgZGVwZW5kZWU6IGJvb2xlYW47ICAgICAgLy8g5L6d5a2Y5YWI44KS6L+95Yqg44GZ44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtYXA6IGJvb2xlYW47ICAgICAgICAgICAvLyAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICB9W107XHJcbiAgICBqc0dyb3VwOiB7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmc7ICAgLy8gXCJob2dlaG9nZVxcXCJcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nOyAgICAgICAvLyBcImNkcC1saWJcIlxyXG4gICAgICAgIGRlcGVuZGVlOiBib29sZWFuOyAgICAgIC8vIOS+neWtmOWFiOOCkui/veWKoOOBmeOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgZF90czogYm9vbGVhbjsgICAgICAgICAgLy8gLmQudHMg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtYXA6IGJvb2xlYW47ICAgICAgICAgICAvLyAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWluX21hcDogYm9vbGVhbjsgICAgICAgLy8gLm1pbiAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICB9W107XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW50ZXJmYWNlcy50cyIsImltcG9ydCB7IGFzc2VydCB9IGZyb20gXCIuLi91dGlscy9zZXR0aW5nc1wiO1xyXG5cclxuaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvckxpYnJhcnkgfSBmcm9tIFwiLi9saWJyYXJ5XCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvck1vYmlsZSB9IGZyb20gXCIuL21vYmlsZVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JEZXNrdG9wIH0gZnJvbSBcIi4vZGVza3RvcFwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JXZWIgfSBmcm9tIFwiLi93ZWJcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2Jhc2VcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbGlicmFyeVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9tb2JpbGVcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZGVza3RvcFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi93ZWJcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHN3aXRjaCAoY29uZmlnLnByb2plY3RUeXBlKSB7XHJcbiAgICAgICAgY2FzZSBcImxpYnJhcnlcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvckxpYnJhcnkoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwibW9iaWxlXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JNb2JpbGUoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwiZGVza3RvcFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yRGVza3RvcChjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJ3ZWJcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvcldlYihjb25maWcpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgXCJ1bnN1cHBvcnRlZCBwcm9qZWN0IGtpbmQ6IFwiICsgY29uZmlnLnByb2plY3RUeXBlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy9nZW5lcmF0b3JzL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHsgc3Bhd24sIFNwYXduT3B0aW9ucyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBob2dhbixcclxuICAgICQsXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBTcGlubmVyLFxyXG59IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhc3NlcnQsXHJcbiAgICBnZXRMaWJQYXRoLFxyXG59IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBleHBvcnRzIG1ldGhvZHM6XHJcblxyXG4vKipcclxuICogSGFuZGxlIGNvbW1hbmQgbGluZSBlcnJvciBhbmQga2lsbCBwcm9jZXNzLlxyXG4gKiBXaGVuIHRoZSBhcHBsaWNhdGlvbiByZWNlaXZlZCBlcnJvciBmcm9tIGNsaSwgcGxlYXNlIGNhbGwgdGhpcyBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvciAgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgYXNzZXJ0KGZhbHNlLCBlcnJvcik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogXCJ0ZW1wbGF0ZXNcIiDjg4fjgqPjg6zjgq/jg4jjg6rjgYvjgonjga7jg5HjgrnjgpLlj5blvpcuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdGFyZ2V0IOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAqIEByZXR1cm4ge1N0cmluZ30gdGVtcGxhdGVzL2hvZ2Vob2dlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVQYXRoKHRhcmdldDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmIChudWxsID09IHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwidGVtcGxhdGVzXCIsIHRhcmdldCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR2V0IHNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqIENMSSBoZWxwZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gIFtmb3JtYXRdICBzcGlubmVyIGZvcm1hdCBzdHJpbmcuXHJcbiAqIEBwYXJhbSAge051bWJlcn0gIFtpbmRleF0gICBzcGlubmVyIGluZGV4IGRlZmluZWQgYnkgY2xpLXNwaW5uZXIuIChkZWZhdWx0OiByYW5kb20gWzAtMjldKVxyXG4gKiBAcmV0dXJuIHtTcGlubmVyfSBjbGktc3Bpbm5lciBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGlubmVyKGZvcm1hdD86IHN0cmluZywgaW5kZXg/OiBudW1iZXIpOiB7IHN0YXJ0OiAoKSA9PiB2b2lkOyBzdG9wOiAoY2xlYW4/OiBib29sZWFuKSA9PiB2b2lkOyB9IHtcclxuICAgIGNvbnN0IHNwaW5uZXJzID0gW1xyXG4gICAgICAgIFwifC8tXFxcXFwiLFxyXG4gICAgICAgIFwi4pSk4pSY4pS04pSU4pSc4pSM4pSs4pSQXCIsXHJcbiAgICAgICAgXCLil6Lil6Pil6Til6VcIixcclxuICAgICAgICBcIuKWjOKWgOKWkOKWhFwiLFxyXG4gICAgICAgIFwi4paJ4paK4paL4paM4paN4paO4paP4paO4paN4paM4paL4paK4paJXCIsXHJcbiAgICAgICAgXCLiloHiloPiloTiloXilobilofilojilofilobiloXiloTiloNcIixcclxuICAgICAgICBcIuKYseKYsuKYtFwiLFxyXG4gICAgICAgIFwiLm9PQCpcIixcclxuICAgICAgICBcIuKXkOKXk+KXkeKXklwiLFxyXG4gICAgICAgIC8vLy9cclxuICAgICAgICBcIuKXoeKXoSDiipniipkg4peg4pegXCIsXHJcbiAgICAgICAgXCLilqDilqHilqrilqtcIixcclxuICAgICAgICBcIuKGkOKGluKGkeKGl+KGkuKGmOKGk+KGmVwiLFxyXG4gICAgICAgIFwiLm9PwrBPby5cIixcclxuICAgIF07XHJcbiAgICBjb25zdCBmbXQgPSBmb3JtYXQgfHwgXCIlc1wiO1xyXG4gICAgY29uc3Qgc3Bpbm5lciA9IG5ldyBTcGlubmVyKGZtdCk7XHJcbiAgICBjb25zdCBpZHggPSAobnVsbCAhPSBpbmRleCAmJiAwIDw9IGluZGV4ICYmIGluZGV4IDwgMTQpID8gaW5kZXggOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBzcGlubmVyLnNldFNwaW5uZXJTdHJpbmcoc3Bpbm5lcnNbaWR4XSk7XHJcbiAgICByZXR1cm4gc3Bpbm5lcjtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIE5vcm1hbGl6ZVRleHRPcHRpb25zXHJcbiAqIEBicmllZiBub3JtYWxpemVUZXh0KCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIGVvbD86IHN0cmluZzsgICAvLyBkZWZhdWx0OiBvcy5FT0xcclxuICAgIGJvbT86IGJvb2xlYW47ICAvLyBkZWZhdWx0OiB0cnVlXHJcbiAgICB0YWI/OiBudW1iZXI7ICAgLy8gdGFiIOOCkuWkieaPm+OBmeOCi+OCueODmuODvOOCueOBruaVsOOCkuaMh+Wumi4gZGVmYXVsdDog5aSJ5o+b44GX44Gq44GEXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemUgdGV4dCBsaW5lLWZlZWQuXHJcbiAqIGZvciB3aW5kb3dzIGdpdCB1c2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgdGV4dCAgICAgIGlucHV0IHRleHQuXHJcbiAqIEBwYXJhbSAge05vcm1hbGl6ZVRleHRPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9uLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IG5vcm1hbGl6ZWQgdGV4dC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUZXh0KHRleHQ6IHN0cmluZywgb3B0aW9ucz86IE5vcm1hbGl6ZVRleHRPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogTm9ybWFsaXplVGV4dE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHVmZWZmL2dtLCBcIlwiKSAgIC8vIHJlbW92ZSBib21cclxuICAgICAgICAucmVwbGFjZSgvXFxyXFxuL2dtLCBcIlxcblwiKSAgICAvLyBvbmNlIFwiXFxuXCJcclxuICAgICAgICAucmVwbGFjZSgvXFxyL2dtLCBcIlxcblwiKVxyXG4gICAgO1xyXG5cclxuICAgIGlmIChvcHQuYm9tKSB7XHJcbiAgICAgICAgdGV4dCA9IFwiXFx1ZmVmZlwiICsgdGV4dDtcclxuICAgIH1cclxuICAgIGlmIChcIlxcblwiICE9PSBvcHQuZW9sKSB7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2dtLCBvcHQuZW9sKTtcclxuICAgIH1cclxuICAgIGlmIChvcHQudGFiKSB7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdC50YWI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nbSwgc3BhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9uc1xyXG4gKiBAYnJpZWYgZXhlY0NvbW1hbmQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zIGV4dGVuZHMgU3Bhd25PcHRpb25zIHtcclxuICAgIHNwaW5uZXI/OiB7XHJcbiAgICAgICAgZm9ybWF0Pzogc3RyaW5nOyAgICAvLyBleCkgXCIlc1wiXHJcbiAgICAgICAgaW5kZXg/OiBudW1iZXI7ICAgICAvLyAwIC0gOSDjga7mlbDlgKTjgpLmjIflrppcclxuICAgIH07XHJcbiAgICBzdGRvdXQ/OiAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgc3RkZXJyPzogKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGUgY29tbWFuZCBsaW5lIGJ5IHNwYXduLlxyXG4gKiBjYWxsIHNwYXduLiBpZiBlcnJvciBvY2N1cmVkLCBjdWkgaXMga2lsbGVkIHByb2NjZXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgICAgICAgIGNvbW1hbmQgICAgbWFpbiBjb21tYW5kLiBleCkgXCJjb3Jkb3ZhXCJcclxuICogQHBhcmFtICAge1N0cmluZ1tdfSAgICAgICAgICAgICBhcmdzICAgICAgIGNvbW1hbmQgYXJncy4gZXgpIFtcInBsdWdpblwiLCBcImFkZFwiLCBwbHVnaW5OYW1lXVxyXG4gKiBAcGFyYW0gICB7RXhlY0NvbW1hbmRPcHRpb25zfSAgIFtvcHRpb25zXSAgY2xpLXNwaW5uZXJcInMgb3B0aW9ucy5cclxuICogQHJldHVybnMge051bWJlcn0gZXJyb3IgY29kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBFeGVjQ29tbWFuZE9wdGlvbnMpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCBvcHQ6IEV4ZWNDb21tYW5kT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgICAgIHN0ZGlvOiBcImluaGVyaXRcIixcclxuICAgICAgICAgICAgc3Bpbm5lcjogeyBmb3JtYXQ6IFwiJXNcIiB9LFxyXG4gICAgICAgICAgICBzdGRvdXQ6IChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHsgLyogbm9vcCAqLyB9LFxyXG4gICAgICAgICAgICBzdGRlcnI6IChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHsgLyogbm9vcCAqLyB9LFxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB3aGljaChjb21tYW5kLCAoZXJyb3IsIHJlc29sdmVkQ29tbWFuZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBvcHQuc3Bpbm5lciA/IGdldFNwaW5uZXIob3B0LnNwaW5uZXIuZm9ybWF0LCBvcHQuc3Bpbm5lci5pbmRleCkgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHNwYXduKHJlc29sdmVkQ29tbWFuZCwgYXJncywgb3B0KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgaGFuZGxlRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKFwicGlwZVwiID09PSBvcHQuc3RkaW8pIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHQuc3Rkb3V0KGRhdGEudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHQuc3RkZXJyKGRhdGEudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zXHJcbiAqIEBicmllZiBjb3B5VHBsKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBkZWxpbWl0ZXJzPzogXCJ7eyB9fVwiIHwgXCI8JSAlPlwiOyAvLyB0ZW1wbGF0ZSDjgavkvb/nlKjjgZnjgosgZGVsaW1pdGVyLiBkZWZhdWx0OiBcInt7IH19XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGVtcGxhdGUgd2l0aCBob2dhbi5cclxuICogc3luYyBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBzcmMgICAgICAgc291cmNlIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgZHN0ICAgICAgIGRlc3RpbmF0aW9uIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgICAgcGFyYW1zICAgIHRlbXBsYXRlIHBhcmFtZXRlcnMuXHJcbiAqIEBwYXJhbSB7Q29weVRlbXBsYXRlT3B0aW9uc30gIFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5VHBsKHNyYzogc3RyaW5nLCBkc3Q6IHN0cmluZywgcGFyYW1zOiBPYmplY3QsIG9wdGlvbnM/OiBDb3B5VGVtcGxhdGVPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHQgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKHNyYykudG9TdHJpbmcoKSwgeyBlb2w6IFwiXFxuXCIsIGJvbTogZmFsc2UgfSksIG9wdCk7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBub3JtYWxpemVUZXh0KGpzdC5yZW5kZXIocGFyYW1zKSwgb3B0KTtcclxuXHJcbiAgICBmcy5lbnN1cmVGaWxlU3luYyhkc3QpO1xyXG4gICAgZnMud3JpdGVGaWxlU3luYyhkc3QsIG91dHB1dCwgXCJ1dGY4XCIpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdVSUQgZ2VuZXJhdGUuXHJcbiAqIHJldHVybmVkIGFzIFdpbmRvd3MgcmVnaXN0cnkgdHlwZSBmb3JtYXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHVUlEKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJ7XCIgKyB1dWlkLnY0KCkudG9VcHBlckNhc2UoKSArIFwifVwiO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHJldHVybiB7alF1ZXJ5fSBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cjJYbWxOb2RlKHN0cjogc3RyaW5nKTogSlF1ZXJ5IHtcclxuICAgIHJldHVybiAkKCQucGFyc2VYTUwoc3RyKSkuY2hpbGRyZW4oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgc3RyaW5nIGZyb20gRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHJldHVybiB7alF1ZXJ5fSBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHhtbE5vZGUyU3RyKCR4bWw6IEpRdWVyeSk6IHN0cmluZyB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4gICAgcmV0dXJuIG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoJHhtbFswXSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnNcclxuICogQGJyaWVmIGZvcm1hdFhNTCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgc3RlcD86IG51bWJlcjsgICAvLyDnqbrnmb3jgrnjg5rjg7zjgrnmlbAuIGRlZmF1bHQ6IDJcclxufVxyXG5cclxuLyoqXHJcbiAqIFhNTCBmb3JtYXR0ZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgIHN0ciAgICAgICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHBhcmFtICB7Rm9ybWF0WG1sT3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBYTUxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRYTUwoc3RyOiBzdHJpbmcsIG9wdGlvbnM/OiBGb3JtYXRYbWxPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogRm9ybWF0WG1sT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIHN0ZXA6IDIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuICAgIGxldCB4bWwgPSBcIlwiO1xyXG4gICAgbGV0IHBhZCA9IDA7XHJcbiAgICBsZXQgaW5kZW50OiBudW1iZXI7XHJcbiAgICBsZXQgbm9kZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0IHN0ckFyciA9IG5vcm1hbGl6ZVRleHQoc3RyLCB7IGVvbDogXCJcXG5cIiB9KVxyXG4gICAgICAgIC5yZXBsYWNlKC8oPikoPCkoXFwvKikvZywgXCIkMVxcbiQyJDNcIikgLy8gaW5zZXJ0IExGIHRvIGVhY2ggbm9kZSBvbmNlLlxyXG4gICAgICAgIC5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBjb25zdCBzcGFjZXMgPSAobGVuOiBudW1iZXIpID0+IHtcclxuICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgX2luZGVudCA9IGxlbiAqIG9wdC5zdGVwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX2luZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgbm9kZSA9ICQudHJpbShzdHJBcnJbaV0pO1xyXG4gICAgICAgIGlmIChub2RlLm1hdGNoKC8uKzxcXC9cXHdbXj5dKj4kLykpIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFwvXFx3LykpIHtcclxuICAgICAgICAgICAgaWYgKHBhZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBhZCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcd1tePl0qW15cXC9dPi4qJC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgeG1sICs9IHNwYWNlcyhwYWQpICsgbm9kZSArIG9wdC5lb2w7XHJcbiAgICAgICAgcGFkICs9IGluZGVudDtcclxuICAgIH1cclxuXHJcbiAgICB4bWwgPSB4bWwucmVwbGFjZSgvXFxuXFxuL2dtLCBcIlxcblwiKTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplVGV4dCh4bWwsIG9wdCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy90b29scy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifVxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xpLXNwaW5uZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNsaS1zcGlubmVyXCIsXCJjb21tb25qczJcIjpcImNsaS1zcGlubmVyXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn1cbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsb2JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImdsb2JcIixcImNvbW1vbmpzMlwiOlwiZ2xvYlwifVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW12ZXItcmVnZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn1cbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInV1aWRcIixcImNvbW1vbmpzMlwiOlwidXVpZFwifVxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hpY2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4bWxkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIkhvZ2FuXCIsXCJjb21tb25qc1wiOlwiaG9nYW4uanNcIixcImNvbW1vbmpzMlwiOlwiaG9nYW4uanNcIixcImFtZFwiOlwiaG9nYW4uanNcIn1cbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwifVxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZS5zdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCIsXCJjb21tb25qczJcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCJ9XG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdfQ==