/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-05-12T10:12:20.328Z
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
__export(__webpack_require__(15));
__export(__webpack_require__(14));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(2));
__export(__webpack_require__(17));
__export(__webpack_require__(3));


/***/ }),
/* 2 */
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
    global.DOMParser = __webpack_require__(28).DOMParser;
    const _window = (() => {
        const jsdom = __webpack_require__(24);
        if ("function" === typeof jsdom.JSDOM) {
            return new jsdom.JSDOM().window;
        }
        else {
            return jsdom.jsdom().defaultView;
        }
    })();
    return __webpack_require__(32)(_window);
})();
exports.$ = $;
const _m = _l.mixin(_s.exports());
exports._ = _m;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(4);
const libs_1 = __webpack_require__(2);
let _settings = {
    force: false,
    verbose: false,
    silent: false,
    libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
    lang: "en-US",
};
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
        _settings.libPath = settings.libPath || _settings.libPath;
        _settings.targetDir = settings.targetDir || _settings.targetDir;
        _settings.lang = settings.lang || _settings.lang;
    }
    else {
        _settings = {
            force: false,
            verbose: false,
            silent: false,
            libPath: path.join(process.cwd(), "node_modules", "cdp-lib"),
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
    return _settings.libPath;
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
        _lang = JSON.parse(libs_1.fs.readFileSync(path.join(_settings.libPath, "res/locales", "messages." + _settings.lang + ".json"), "utf8").toString());
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

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
    create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            return Promise.reject("under construction.");
        });
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
const base_1 = __webpack_require__(0);
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
        };
    }
    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            console.log("check.");
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
    create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            return Promise.reject("under construction.");
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
    create(config) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO:
            return Promise.reject("under construction.");
        });
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(1);
exports.Utils = Utils;
const generators_1 = __webpack_require__(16);
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
        console.log(JSON.stringify(config, null, 4));
        return generators_1.newGenerator(config).run();
    }
}
exports.default = CDPLib;


/***/ }),
/* 14 */
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
const path = __webpack_require__(4);
const utils_1 = __webpack_require__(1);
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
                return this.runCreate(this._config);
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
        // TODO:
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
     * @param {String} path    ターゲットを指定. null の場合は、templates を返却
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
                .replace(/types/, this._config.structureConfig.types));
            utils_1.fs.copySync(path.join(utils_1.templatePath(target), file), dst);
        });
    }
    ///////////////////////////////////////////////////////////////////////
    // private methods:
    /**
     * create 処理のエントリ
     */
    runCreate(config) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createBase();
            yield this.create(config);
        });
    }
    //___________________________________________________________________________________________________________________//
    /**
     * 共通の create 処理
     */
    createBase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createProjectDir();
            yield this.copyBaseStructure();
            yield this.copyCommonFiles();
        });
    }
    /**
     * プロジェクトディレクトリの作成
     */
    createProjectDir() {
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
                utils_1.fs.copySync(path.join(srcDir, "_LICENSE.Apache-2.0"), path.join(dstDir, ".LICENSE"));
                break;
            case "MIT":
                utils_1.copyTpl(path.join(srcDir, "_LICENSE.MIT"), path.join(dstDir, ".LICENSE"), this._config.copyright);
                break;
            default:
                break;
        }
        // NOTICE
        utils_1.fs.copySync(path.join(srcDir, "_NOTICE"), path.join(dstDir, "NOTICE"));
    }
}
exports.GeneratorBase = GeneratorBase;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(1);
exports.Utils = Utils;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = __webpack_require__(3);
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
    switch (config.projectKind) {
        case "library":
            return library_1.newGeneratorLibrary(config);
        case "mobile":
            return mobile_1.newGeneratorMobile(config);
        case "desktop":
            return desktop_1.newGeneratorDesktop(config);
        case "web":
            return web_1.newGeneratorWeb(config);
        default:
            settings_1.assert(false, "unsupported project kind: " + config.projectKind);
            return null;
    }
}
exports.newGenerator = newGenerator;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(4);
const os = __webpack_require__(19);
const child_process_1 = __webpack_require__(18);
const libs_1 = __webpack_require__(2);
const settings_1 = __webpack_require__(3);
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
 * @param  {Number}  [index]   spinner index defined by cli-spinner. (default: random [0-9])
 * @return {Spinner} cli-spinner instance.
 */
function getSpinner(format, index) {
    const fmt = format || "%s";
    const spinner = new libs_1.Spinner(fmt);
    const idx = (null != index && 0 <= index && index < 10) ? index : Math.floor(Math.random() * 9); // random value of preset array[0-9]
    spinner.setSpinnerString(libs_1.Spinner.spinners[idx]);
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
        }, options);
        libs_1.which(command, (error, resolvedCommand) => {
            if (error) {
                handleError(JSON.stringify(error));
            }
            const spinner = opt.spinner ? getSpinner(opt.spinner.format, opt.spinner.index) : null;
            if (spinner) {
                spinner.start();
            }
            child_process_1.spawn(resolvedCommand, args, opt)
                .on("error", handleError)
                .on("close", (code) => {
                if (spinner) {
                    spinner.stop(true);
                }
                resolve(code);
            });
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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("os");

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

module.exports = __webpack_require__(13);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYWYxMTNmZjU0ZGFjMTQxMDk2YWMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi91dGlscy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL2xpYnMudHMiLCJjZHA6Ly8vY2RwLWxpYi91dGlscy9zZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIFwicGF0aFwiIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7Ozs7Ozs7QUNEakMsaUNBQXVCO0FBQ3ZCLGtDQUF3QjtBQUN4QixpQ0FBMkI7Ozs7Ozs7Ozs7QUNGM0IsbUNBQStCO0FBNEIzQixnQkFBRTtBQTNCTixxQ0FBNkI7QUE0QnpCLG9CQUFJO0FBM0JSLHNDQUFrQztBQTRCOUIsc0JBQUs7QUEzQlQsbUNBQTZCO0FBQzdCLG1DQUF3QztBQUN4QyxzQ0FBK0I7QUE0QjNCLHNCQUFLO0FBM0JULHFDQUE2QjtBQTRCekIsb0JBQUk7QUEzQlIsc0NBQStCO0FBNEIzQixzQkFBSztBQTNCVCw0Q0FBNEM7QUE0QnhDLGtDQUFXO0FBM0JmLDhDQUFzQztBQTRCbEMsa0JBNUJLLHFCQUFPLENBNEJMO0FBMUJYLE1BQU0sQ0FBQyxHQUFpQixDQUFDO0lBQ2YsTUFBTyxDQUFDLFNBQVMsR0FBRyxtQkFBTyxDQUFDLEVBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUN0RCxNQUFNLE9BQU8sR0FBRyxDQUFDO1FBQ2IsTUFBTSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFPLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3BDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3JDLENBQUM7SUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ0wsTUFBTSxDQUFDLG1CQUFPLENBQUMsRUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQVNELGNBQUM7QUFOTCxNQUFNLEVBQUUsR0FBaUMsRUFBRSxDQUFDLEtBQUssQ0FBTSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztBQU8zRCxlQUFDOzs7Ozs7Ozs7O0FDaENYLG9DQUE2QjtBQUM3QixzQ0FBK0I7QUFlL0IsSUFBSSxTQUFTLEdBQW9CO0lBQzdCLEtBQUssRUFBRSxLQUFLO0lBQ1osT0FBTyxFQUFFLEtBQUs7SUFDZCxNQUFNLEVBQUUsS0FBSztJQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDO0lBQzVELElBQUksRUFBRSxPQUFPO0NBQ2hCLENBQUM7QUFFRix1RUFBdUU7QUFDdkUsbUJBQW1CO0FBRW5COzs7O0dBSUc7QUFDSDtJQUNJLE1BQU0sQ0FBQyxRQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRkQsa0NBRUM7QUFFRDs7OztHQUlHO0FBQ0gscUJBQTRCLFFBQXlCO0lBQ2pELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDWCxTQUFTLENBQUMsS0FBSyxHQUFPLFFBQVEsQ0FBQyxLQUFLLElBQVcsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUMvRCxTQUFTLENBQUMsT0FBTyxHQUFLLFFBQVEsQ0FBQyxPQUFPLElBQVMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNqRSxTQUFTLENBQUMsTUFBTSxHQUFNLFFBQVEsQ0FBQyxNQUFNLElBQVUsU0FBUyxDQUFDLE1BQU0sQ0FBQztRQUNoRSxTQUFTLENBQUMsT0FBTyxHQUFLLFFBQVEsQ0FBQyxPQUFPLElBQVMsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUNqRSxTQUFTLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxTQUFTLElBQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQztRQUNuRSxTQUFTLENBQUMsSUFBSSxHQUFRLFFBQVEsQ0FBQyxJQUFJLElBQVksU0FBUyxDQUFDLElBQUksQ0FBQztJQUNsRSxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixTQUFTLEdBQUc7WUFDUixLQUFLLEVBQUUsS0FBSztZQUNaLE9BQU8sRUFBRSxLQUFLO1lBQ2QsTUFBTSxFQUFFLEtBQUs7WUFDYixPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztZQUM1RCxJQUFJLEVBQUUsT0FBTztTQUNoQixDQUFDO0lBQ04sQ0FBQztBQUNMLENBQUM7QUFqQkQsa0NBaUJDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFDN0IsQ0FBQztBQUZELGdDQUVDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQ0ksTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFDL0IsQ0FBQztBQUZELG9DQUVDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsYUFBb0IsT0FBZ0IsRUFBRSxHQUFHLGNBQXFCO0lBQzFELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDcEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBUkQsa0JBUUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxlQUFzQixPQUFnQixFQUFFLEdBQUcsY0FBcUI7SUFDNUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBUkQsc0JBUUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsZ0JBQXVCLElBQWMsRUFBRSxPQUFnQixFQUFFLEdBQUcsY0FBcUI7SUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ1IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztZQUMzQyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMzQixDQUFDO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFqQkQsd0JBaUJDO0FBRUQsSUFBSSxLQUFVLENBQUM7QUFFZjs7Ozs7R0FLRztBQUNILG1CQUEwQixHQUFXO0lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNULEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQUUsQ0FBQyxZQUFZLENBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQzFHLENBQUM7SUFDTixDQUFDO0lBRUQsSUFBSSxPQUFPLEdBQUcsUUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxFQUFFLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFuQkQsOEJBbUJDOzs7Ozs7O0FDdEtELGlDOzs7Ozs7OztBQ0FBLHNEQUFzRDtBQUN0RCxtQ0FBbUM7Ozs7Ozs7Ozs7QUFFbkMsc0NBQW9FO0FBR3BFOzs7R0FHRztBQUNILHVCQUErQixTQUFRLG9CQUFhO0lBRWhELHVFQUF1RTtJQUN2RSw2QkFBNkI7SUFFN0I7O09BRUc7SUFDSCxvQkFBb0I7UUFDaEIsTUFBTSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsU0FBUztZQUNkLEtBQUssRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLFFBQVE7WUFDZixTQUFTLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFNBQVM7Z0JBQ2pCLFVBQVUsRUFBRSxhQUFhO2dCQUN6QixRQUFRLEVBQUUsV0FBVzthQUN4QjtTQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0csTUFBTSxDQUFDLE1BQStCOztZQUN4QyxRQUFRO1lBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7Q0FDSjtBQWpDRCw4Q0FpQ0M7Ozs7Ozs7Ozs7Ozs7QUMxQ0QscURBQTBEO0FBRzFELGlDQUFzQztBQUV0Qzs7R0FFRztBQUNILDZCQUFvQyxNQUE0QjtJQUM1RCxNQUFNLENBQUMsSUFBSSx1Q0FBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRkQsa0RBRUM7Ozs7Ozs7OztBQ1hELHNEQUFzRDtBQUN0RCxtQ0FBbUM7Ozs7Ozs7Ozs7QUFFbkMsc0NBQW9FO0FBR3BFOzs7R0FHRztBQUNILHFCQUE2QixTQUFRLG9CQUFhO0lBRTlDLHVFQUF1RTtJQUN2RSw2QkFBNkI7SUFFN0I7O09BRUc7SUFDSCxvQkFBb0I7UUFDaEIsTUFBTSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsTUFBTTtZQUNYLEtBQUssRUFBRSxPQUFPO1lBQ2QsR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLFFBQVE7U0FDbEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDRyxNQUFNLENBQUMsTUFBNEI7O1lBQ3JDLFFBQVE7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLENBQUM7S0FBQTtDQUNKO0FBNUJELDBDQTRCQzs7Ozs7Ozs7Ozs7OztBQ3JDRCxrREFBcUQ7QUFHckQsaUNBQW1DO0FBRW5DOztHQUVHO0FBQ0gsNkJBQW9DLE1BQTRCO0lBQzVELE1BQU0sQ0FBQyxJQUFJLGtDQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUZELGtEQUVDOzs7Ozs7Ozs7QUNYRCxzREFBc0Q7QUFDdEQsbUNBQW1DOzs7Ozs7Ozs7O0FBRW5DLHNDQUFxRTtBQUdyRTs7O0dBR0c7QUFDSCxzQkFBOEIsU0FBUSxvQkFBYTtJQUUvQyx1RUFBdUU7SUFDdkUsNkJBQTZCO0lBRTdCOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2hCLE1BQU0sQ0FBQztZQUNILEdBQUcsRUFBRSxLQUFLO1lBQ1YsR0FBRyxFQUFFLEtBQUs7WUFDVixLQUFLLEVBQUUsS0FBSztZQUNaLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxRQUFRO1NBQ2xCLENBQUM7SUFDTixDQUFDO0lBRUQ7OztPQUdHO0lBQ0csTUFBTSxDQUFDLE1BQThCOztZQUN2QyxRQUFRO1lBQ1IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7Q0FDSjtBQTVCRCw0Q0E0QkM7Ozs7Ozs7Ozs7Ozs7QUNyQ0QsbURBQXVEO0FBR3ZELGlDQUFvQztBQUVwQzs7R0FFRztBQUNILDRCQUFtQyxNQUE0QjtJQUMzRCxNQUFNLENBQUMsSUFBSSxvQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRkQsZ0RBRUM7Ozs7Ozs7OztBQ1hELHNEQUFzRDtBQUN0RCxtQ0FBbUM7Ozs7Ozs7Ozs7QUFFbkMsc0NBQW9FO0FBR3BFOzs7R0FHRztBQUNILHNCQUE4QixTQUFRLG9CQUFhO0lBRS9DLHVFQUF1RTtJQUN2RSw2QkFBNkI7SUFFN0I7O09BRUc7SUFDSCxvQkFBb0I7UUFDaEIsTUFBTSxDQUFDO1lBQ0gsR0FBRyxFQUFFLEtBQUs7WUFDVixHQUFHLEVBQUUsS0FBSztZQUNWLEtBQUssRUFBRSxLQUFLO1lBQ1osR0FBRyxFQUFFLE1BQU07WUFDWCxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxPQUFPO1lBQ2IsS0FBSyxFQUFFLFFBQVE7U0FDbEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDRyxNQUFNLENBQUMsTUFBMkI7O1lBQ3BDLFFBQVE7WUFDUixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtDQUNKO0FBNUJELDRDQTRCQzs7Ozs7Ozs7Ozs7OztBQ3JDRCxvREFBdUQ7QUFHdkQsa0NBQW9DO0FBRXBDOztHQUVHO0FBQ0gseUJBQWdDLE1BQTRCO0lBQ3hELE1BQU0sQ0FBQyxJQUFJLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFGRCwwQ0FFQzs7Ozs7Ozs7OztBQ1hELHFDQUFpQztBQUN4QixzQkFBSztBQUVkLDZDQVdzQjtBQWF0Qix1SEFBdUg7QUFFdkg7OztHQUdHO0FBQ0g7SUFFSSx1RUFBdUU7SUFDdkUsaUJBQWlCO0lBRWpCOztPQUVHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUE0QjtRQUM5QyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyx5QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RDLENBQUM7Q0FDSjtBQWJELHlCQWFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0Qsb0NBQTZCO0FBQzdCLHVDQVFxQjtBQU9yQjs7O0dBR0c7QUFDSDtJQUlJOzs7O09BSUc7SUFDSCxZQUFvQixPQUE2QjtRQUE3QixZQUFPLEdBQVAsT0FBTyxDQUFzQjtRQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFZLEVBQUU7WUFDakMsb0JBQVksRUFBRTtZQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsU0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUMzRyxDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLGlCQUFpQjtJQUVqQjs7O09BR0c7SUFDSSxHQUFHO1FBQ04sTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssUUFBUTtnQkFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDeEM7Z0JBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4RSxDQUFDO0lBQ0wsQ0FBQztJQVdELHVFQUF1RTtJQUN2RSxxQkFBcUI7SUFFckI7Ozs7T0FJRztJQUNPLFFBQVEsQ0FBQyxHQUFXO1FBQzFCLFFBQVE7SUFDWixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLEtBQUssQ0FBQyxTQUFpQjtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBYyxPQUFPO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWdCLEVBQUUsT0FBdUI7UUFDMUUsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxTQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2YsR0FBRyxFQUFFLG9CQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDWixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRVosWUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxDQUFDLElBQUk7WUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDekIsSUFBSTtpQkFDQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztpQkFDaEQsT0FBTyxDQUFDLEtBQUssRUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BELE9BQU8sQ0FBQyxPQUFPLEVBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO2lCQUN0RCxPQUFPLENBQUMsS0FBSyxFQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztpQkFDcEQsT0FBTyxDQUFDLE1BQU0sRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7aUJBQ3JELE9BQU8sQ0FBQyxNQUFNLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2lCQUNyRCxPQUFPLENBQUMsT0FBTyxFQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUM5RCxDQUFDO1lBQ0YsVUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG9CQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLG1CQUFtQjtJQUVuQjs7T0FFRztJQUNXLFNBQVMsQ0FBQyxNQUE0Qjs7WUFDaEQsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDeEIsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FBQTtJQUVELHVIQUF1SDtJQUV2SDs7T0FFRztJQUNXLFVBQVU7O1lBQ3BCLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDOUIsTUFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUMvQixNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUNqQyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNLLGdCQUFnQjtRQUNwQixVQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxlQUFlO1FBQ25CLE1BQU0sTUFBTSxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixhQUFhO1FBQ2IsZUFBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQy9CLENBQUM7UUFFRixTQUFTO1FBQ1QsVUFBRSxDQUFDLFFBQVEsQ0FDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQzlCLENBQUM7UUFFRixVQUFVO1FBQ1YsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssWUFBWTtnQkFDYixVQUFFLENBQUMsUUFBUSxDQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLEVBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxDQUNoQyxDQUFDO2dCQUNGLEtBQUssQ0FBQztZQUNWLEtBQUssS0FBSztnQkFDTixlQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDekIsQ0FBQztnQkFDRixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsU0FBUztRQUNULFVBQUUsQ0FBQyxRQUFRLENBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUM5QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBeExELHNDQXdMQzs7Ozs7Ozs7OztBQzVNRCxxQ0FBcUM7QUFDNUIsc0JBQUs7Ozs7Ozs7Ozs7Ozs7QUNEZCwwQ0FBMkM7QUFHM0MseUNBQWdEO0FBQ2hELHlDQUE4QztBQUM5Qyx5Q0FBZ0Q7QUFDaEQsc0NBQXdDO0FBRXhDLGlDQUF1QjtBQUN2QixpQ0FBMEI7QUFDMUIsa0NBQXlCO0FBQ3pCLGlDQUEwQjtBQUMxQixrQ0FBc0I7QUFFdEI7O0dBRUc7QUFDSCxzQkFBNkIsTUFBNEI7SUFDckQsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDekIsS0FBSyxTQUFTO1lBQ1YsTUFBTSxDQUFDLDZCQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssUUFBUTtZQUNULE1BQU0sQ0FBQywyQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxLQUFLLFNBQVM7WUFDVixNQUFNLENBQUMsNkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsS0FBSyxLQUFLO1lBQ04sTUFBTSxDQUFDLHFCQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkM7WUFDSSxpQkFBTSxDQUFDLEtBQUssRUFBRSw0QkFBNEIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNwQixDQUFDO0FBQ0wsQ0FBQztBQWRELG9DQWNDOzs7Ozs7Ozs7O0FDL0JELG9DQUE2QjtBQUM3QixtQ0FBeUI7QUFDekIsZ0RBQW9EO0FBRXBELHNDQU9nQjtBQUVoQiwwQ0FHb0I7QUFFcEIsdUVBQXVFO0FBQ3ZFLG1CQUFtQjtBQUVuQjs7Ozs7R0FLRztBQUNILHFCQUE0QixLQUFhO0lBQ3JDLGlCQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFGRCxrQ0FFQztBQUVELHVIQUF1SDtBQUV2SDs7Ozs7R0FLRztBQUNILHNCQUE2QixNQUFjO0lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFVLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBVSxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hELENBQUM7QUFDTCxDQUFDO0FBTkQsb0NBTUM7QUFFRCx1SEFBdUg7QUFFdkg7Ozs7Ozs7R0FPRztBQUNILG9CQUEyQixNQUFlLEVBQUUsS0FBYztJQUN0RCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksSUFBSSxDQUFDO0lBQzNCLE1BQU0sT0FBTyxHQUFHLElBQUksY0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2pDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxvQ0FBb0M7SUFDckksT0FBTyxDQUFDLGdCQUFnQixDQUFDLGNBQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUFORCxnQ0FNQztBQWNEOzs7Ozs7O0dBT0c7QUFDSCx1QkFBOEIsSUFBWSxFQUFFLE9BQThCO0lBQ3RFLE1BQU0sR0FBRyxHQUF5QixRQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtRQUMzQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtLQUNaLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFWixJQUFJLEdBQUcsSUFBSTtTQUNOLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUcsYUFBYTtTQUN4QyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFJLFlBQVk7U0FDdkMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDekI7SUFFRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNWLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQzNCLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVixNQUFNLE1BQU0sR0FBRyxDQUFDO1lBQ1osSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1gsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQy9CLENBQUMsSUFBSSxHQUFHLENBQUM7WUFDYixDQUFDO1lBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNiLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTlCRCxzQ0E4QkM7QUFlRDs7Ozs7Ozs7R0FRRztBQUNILHFCQUE0QixPQUFlLEVBQUUsSUFBYyxFQUFFLE9BQTRCO0lBQ3JGLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQy9CLE1BQU0sR0FBRyxHQUF1QixRQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1NBQzVCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFWixZQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLGVBQWU7WUFDbEMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUM7WUFFRCxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUN2RixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixDQUFDO1lBRUQscUJBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztpQkFDNUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7aUJBQ3hCLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7b0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztnQkFDRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTNCRCxrQ0EyQkM7QUFZRDs7Ozs7Ozs7R0FRRztBQUNILGlCQUF3QixHQUFXLEVBQUUsR0FBVyxFQUFFLE1BQWMsRUFBRSxPQUE2QjtJQUMzRixNQUFNLEdBQUcsR0FBRyxRQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtRQUNyQixHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULFVBQVUsRUFBRSxPQUFPO0tBQ3RCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFWixNQUFNLEdBQUcsR0FBRyxZQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMxRyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUV0RCxTQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQVhELDBCQVdDO0FBRUQsdUhBQXVIO0FBRXZIOzs7OztHQUtHO0FBQ0g7SUFDSSxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDL0MsQ0FBQztBQUZELGdDQUVDO0FBRUQsdUhBQXVIO0FBRXZIOzs7OztHQUtHO0FBQ0gscUJBQTRCLEdBQVc7SUFDbkMsTUFBTSxDQUFDLFFBQUMsQ0FBQyxRQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDekMsQ0FBQztBQUZELGtDQUVDO0FBVUQ7Ozs7OztHQU1HO0FBQ0gsbUJBQTBCLEdBQVcsRUFBRSxPQUEwQjtJQUM3RCxNQUFNLEdBQUcsR0FBcUIsUUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7UUFDdkMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxJQUFJLEVBQUUsQ0FBQztLQUNWLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDWixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDYixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDWixJQUFJLE1BQWMsQ0FBQztJQUNuQixJQUFJLElBQVksQ0FBQztJQUVqQixNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDO1NBQzNDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBVSxDQUFDLENBQUMsK0JBQStCO1NBQ25FLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqQixNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1gsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDL0IsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMvQixDQUFDLElBQUksR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUM7SUFFRixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxHQUFHLFFBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QixFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVixHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFDRCxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BDLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVsQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBN0NELDhCQTZDQzs7Ozs7OztBQzVSRCwwQzs7Ozs7O0FDQUEsK0I7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEseUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLHFDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsOEM7Ozs7OztBQ0FBLG1DIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYWYxMTNmZjU0ZGFjMTQxMDk2YWMiLCJleHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1iYXNlXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2luZGV4LnRzIiwiZXhwb3J0ICogZnJvbSBcIi4vbGlic1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi90b29sc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XHJcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSBcImdsb2JcIjtcclxuaW1wb3J0ICogYXMgaG9nYW4gZnJvbSBcImhvZ2FuLmpzXCI7XHJcbmltcG9ydCAqIGFzIF9sIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgX3MgZnJvbSBcInVuZGVyc2NvcmUuc3RyaW5nXCI7XHJcbmltcG9ydCAqIGFzIHdoaWNoIGZyb20gXCJ3aGljaFwiO1xyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gXCJ1dWlkXCI7XHJcbmltcG9ydCAqIGFzIGNoYWxrIGZyb20gXCJjaGFsa1wiO1xyXG5pbXBvcnQgKiBhcyBzZW12ZXJSZWdleCBmcm9tIFwic2VtdmVyLXJlZ2V4XCI7XHJcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tIFwiY2xpLXNwaW5uZXJcIjtcclxuXHJcbmNvbnN0ICQ6IEpRdWVyeVN0YXRpYyA9ICgoKSA9PiB7XHJcbiAgICAoPGFueT5nbG9iYWwpLkRPTVBhcnNlciA9IHJlcXVpcmUoXCJ4bWxkb21cIikuRE9NUGFyc2VyO1xyXG4gICAgY29uc3QgX3dpbmRvdyA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QganNkb20gPSByZXF1aXJlKFwianNkb21cIik7XHJcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGpzZG9tLkpTRE9NKSB7ICAgIC8vIHYxMCtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqc2RvbS5KU0RPTSgpLndpbmRvdztcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHY5LjEyLnhcclxuICAgICAgICAgICAgcmV0dXJuIGpzZG9tLmpzZG9tKCkuZGVmYXVsdFZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuICAgIHJldHVybiByZXF1aXJlKFwianF1ZXJ5XCIpKF93aW5kb3cpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHR5cGUgTWl4aW5lZFVuZGVyc2NvcmVTdGF0aWMgPSB0eXBlb2YgX3MgJiB0eXBlb2YgX2w7XHJcbmNvbnN0IF9tOiBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IDxhbnk+X2wubWl4aW4oPGFueT5fcy5leHBvcnRzKCkpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIF9tIGFzIF8sXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBjaGFsayxcclxuICAgIHNlbXZlclJlZ2V4LFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBmcywgJCB9IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5nc1xyXG4gKiBAYnJpZWYg44Kw44Ot44O844OQ44Or6Kit5a6a44Kk44Oz44K/44O844OV44Kn44Kk44K5XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICBmb3JjZT86IGJvb2xlYW47ICAgICAgICAgICAgLy8g44Ko44Op44O857aZ57aa55SoXHJcbiAgICB2ZXJib3NlPzogYm9vbGVhbjsgICAgICAgICAgLy8g6Kmz57Sw44Ot44KwXHJcbiAgICBzaWxlbnQ/OiBib29sZWFuOyAgICAgICAgICAgLy8gc2lsZW50IG1vZGVcclxuICAgIGxpYlBhdGg/OiBzdHJpbmc7ICAgICAgICAgICAvLyBjZHAtbGliIOacrOS9k+OBjOOBguOCi+ODh+OCo+ODrOOCr+ODiOODqlxyXG4gICAgdGFyZ2V0RGlyPzogc3RyaW5nOyAgICAgICAgIC8vIOS9nOalreODh+OCo+ODrOOCr+ODiOODqlxyXG4gICAgbGFuZz86IFwiZW4tVVNcIiB8IFwiamEtSlBcIjtcclxufVxyXG5cclxubGV0IF9zZXR0aW5nczogSUdsb2JhbFNldHRpbmdzID0ge1xyXG4gICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgbGliUGF0aDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwibm9kZV9tb2R1bGVzXCIsIFwiY2RwLWxpYlwiKSxcclxuICAgIGxhbmc6IFwiZW4tVVNcIixcclxufTtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiDoqK3lrprlj5blvpdcclxuICpcclxuICogQHJldHVybiB7SUdsb2JhbFNldHRpbmdzfSBvcHRpb25zIOODreOCsOOBq+S9v+eUqOOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdzKCk6IElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICByZXR1cm4gJC5leHRlbmQoe30sIF9zZXR0aW5ncyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoqK3lrprmjIflrppcclxuICpcclxuICogQHBhcmFtIHtJR2xvYmFsU2V0dGluZ3N9IG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElHbG9iYWxTZXR0aW5ncyk6IHZvaWQge1xyXG4gICAgaWYgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgX3NldHRpbmdzLmZvcmNlICAgICA9IHNldHRpbmdzLmZvcmNlICAgICAgICB8fCBfc2V0dGluZ3MuZm9yY2U7XHJcbiAgICAgICAgX3NldHRpbmdzLnZlcmJvc2UgICA9IHNldHRpbmdzLnZlcmJvc2UgICAgICB8fCBfc2V0dGluZ3MudmVyYm9zZTtcclxuICAgICAgICBfc2V0dGluZ3Muc2lsZW50ICAgID0gc2V0dGluZ3Muc2lsZW50ICAgICAgIHx8IF9zZXR0aW5ncy5zaWxlbnQ7XHJcbiAgICAgICAgX3NldHRpbmdzLmxpYlBhdGggICA9IHNldHRpbmdzLmxpYlBhdGggICAgICB8fCBfc2V0dGluZ3MubGliUGF0aDtcclxuICAgICAgICBfc2V0dGluZ3MudGFyZ2V0RGlyID0gc2V0dGluZ3MudGFyZ2V0RGlyICAgIHx8IF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbiAgICAgICAgX3NldHRpbmdzLmxhbmcgICAgICA9IHNldHRpbmdzLmxhbmcgICAgICAgICB8fCBfc2V0dGluZ3MubGFuZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBsaWJQYXRoOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJub2RlX21vZHVsZXNcIiwgXCJjZHAtbGliXCIpLFxyXG4gICAgICAgICAgICBsYW5nOiBcImVuLVVTXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFwiY2RwLWxpYlwiIOOBjOWtmOWcqOOBmeOCi+ODkeOCueOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGNkcC1saWIg44G444GuIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaWJQYXRoKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3NldHRpbmdzLmxpYlBhdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmjIflrprjgZXjgozjgZ8gdGFyZ2V0RGlyIOOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRhcmdldERpciDjgbjjga4gcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldERpcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjg63jgrDlh7rliptcclxuICogY29uc29sZS5sb2coKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0ge0FueVtdfSAgb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOips+e0sOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmRlYnVnKCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIHtBbnlbXX0gIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50ICYmIF9zZXR0aW5ncy52ZXJib3NlKSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRFQlVHOiBcIiArIG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5qSc6Ki8XHJcbiAqIGNvbnNvbGUuYXNzZXJ0KCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gdGVzdCAgICAgICAgICAg5qSc6Ki844GZ44KL5byPXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSB7QW55W119ICAgb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHRlc3Q/OiBib29sZWFuLCBtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghdGVzdCkge1xyXG4gICAgICAgIGlmIChfc2V0dGluZ3MuZm9yY2UpIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBfbGFuZzogYW55O1xyXG5cclxuLyoqXHJcbiAqIOODreODvOOCq+ODqeOCpOOCulxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IOOCreODvOaWh+Wtl+WIl1xyXG4gKiBAcmV0dXJuIOe/u+ios+OBleOCjOOBn+aWh+Wtl+WIl1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIV9sYW5nKSB7XHJcbiAgICAgICAgX2xhbmcgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcclxuICAgICAgICAgICAgcGF0aC5qb2luKF9zZXR0aW5ncy5saWJQYXRoLCBcInJlcy9sb2NhbGVzXCIsIFwibWVzc2FnZXMuXCIgKyBfc2V0dGluZ3MubGFuZyArIFwiLmpzb25cIiksIFwidXRmOFwiKS50b1N0cmluZygpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzb3VjZSA9ICQuZXh0ZW5kKHt9LCBfbGFuZyk7XHJcbiAgICBjb25zdCBwcm9wcyA9IGtleS5zcGxpdChcIi5cIik7XHJcbiAgICB3aGlsZSAoMCA8IHByb3BzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmIChyZXNvdWNlW3Byb3BdKSB7XHJcbiAgICAgICAgICAgIHJlc291Y2UgPSByZXNvdWNlW3Byb3BdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgXCJyZXNvdWNlIG5vdCBmb3VuZC4ga2V5OiBcIiArIGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXNvdWNlO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvc2V0dGluZ3MudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yRWxlY3Ryb25cclxuICogQGJyaWVmIERlc2t0b3AgRWxlY3Ryb24g55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JFbGVjdHJvbiBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3dy9hcHBcIiwgLy8gVE9ETzog5pqr5a6aXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHNyY0NvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0OiBcInNjcmlwdHNcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6IFwic3R5bGVzaGVldHNcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcInRlbXBsYXRlc1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lEZXNrdG9wQXBwQ29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZShjb25maWc6IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckVsZWN0cm9uIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWVsZWN0b3JvblwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvckRlc2t0b3AoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JFbGVjdHJvbihjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2luZGV4LnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgeyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiwgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElMaWJyYXJ5Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JNb2R1bGVcclxuICogQGJyaWVmIExpYnJhcnkgTW9kdWxlIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yTW9kdWxlIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcInNyY1wiLFxyXG4gICAgICAgICAgICBwa2c6IFwiZGlzdFwiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJidWlsdFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKGNvbmZpZzogSUxpYnJhcnlDb25maWdyYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2suXCIpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2dlbmVyYXRvci1tb2R1bGUudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvck1vZHVsZSB9IGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLW1vZHVsZVwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yTW9kdWxlKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCAgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElNb2JpbGVBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckNvcmRvdmFcclxuICogQGJyaWVmIE1vYmlsZSBDb3Jkb3ZhIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yQ29yZG92YSBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3d1wiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZShjb25maWc6IElNb2JpbGVBcHBDb25maWdyYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInVuZGVyIGNvbnN0cnVjdGlvbi5cIik7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL21vYmlsZS9nZW5lcmF0b3ItY29yZG92YS50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQ29yZG92YSB9IGZyb20gXCIuL2dlbmVyYXRvci1jb3Jkb3ZhXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1jb3Jkb3ZhXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckNvcmRvdmEoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbW9iaWxlL2luZGV4LnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgeyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiwgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElXZWJBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckJyb3dzZXJcclxuICogQGJyaWVmIFdlYiBCcm93c2VyIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yQnJvd3NlciBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3d1wiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZShjb25maWc6IElXZWJBcHBDb25maWdyYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInVuZGVyIGNvbnN0cnVjdGlvbi5cIik7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQnJvd3NlciB9IGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcldlYihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckJyb3dzZXIoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24sXHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUNvbXBpbGVDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbiAgICAvLy8vXHJcbiAgICBuZXdHZW5lcmF0b3JcclxufSBmcm9tIFwiLi9nZW5lcmF0b3JzXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uLFxyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElDb21waWxlQ29uZmlncmF0aW9uLFxyXG4gICAgSUxpYnJhcnlDb25maWdyYXRpb24sXHJcbiAgICBJTW9iaWxlQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSURlc2t0b3BBcHBDb25maWdyYXRpb24sXHJcbiAgICBJV2ViQXBwQ29uZmlncmF0aW9uLFxyXG59O1xyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ0RQTGliXHJcbiAqIEBicmllZiBDRFAgYm9pbGVycGxhdGUg55Sf5oiQ5qmf6IO944KS5o+Q5L6b44GZ44KL44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDRFBMaWIge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwdWJpYyBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFpbiBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZXhlY3V0ZShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgVXRpbHMuc2V0U2V0dGluZ3MoY29uZmlnLnNldHRpbmdzKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShjb25maWcsIG51bGwsIDQpKTtcclxuICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yKGNvbmZpZykucnVuKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9jZHAtbGliLnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgJCxcclxuICAgIC8vLy9cclxuICAgIGdldFRhcmdldERpcixcclxuICAgIHRlbXBsYXRlUGF0aCxcclxuICAgIGNvcHlUcGwsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxufSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckJhc2VcclxuICogQGJyaWVmIOOBmeOBueOBpuOBriBHZW5lcmF0b3Ig44Gu5pei5a6a44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcHJvamVjdFJvb3REaXI6IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbnN0cnVjdG9yXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtJUHJvamVjdENvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsFxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdFJvb3REaXIgPSBnZXRUYXJnZXREaXIoKSA/XHJcbiAgICAgICAgICAgIGdldFRhcmdldERpcigpIDpcclxuICAgICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZSk7XHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyA9ICQuZXh0ZW5kKHt9LCB0aGlzLmRlZmF1bHRCYXNlU3RydWN0dXJlKCksIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwdWJpYyBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yem55CG6ZaL5aeLICjjgqjjg7Pjg4jjg6opXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcnVuKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZmlnLmFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlIFwiY3JlYXRlXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5ydW5DcmVhdGUodGhpcy5fY29uZmlnKTtcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInVua25vd24gYWN0aW9uOiBcIiArIHRoaXMuX2NvbmZpZy5hY3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gYWJzdHJhY3QgbWV0aG9kczpcclxuXHJcbiAgICAvLyDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgYWJzdHJhY3QgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb247XHJcblxyXG4gICAgLy8gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICBhYnN0cmFjdCBhc3luYyBjcmVhdGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCy5o2X44OG44Kt44K544OI44KS6YCa55+lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSDjg63jg7zjgqvjg6njgqTjgrrjg6rjgr3jg7zjgrnjgq3jg7zjgpLmjIflrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2dyZXNzKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdvcmsgZGlyZWN0b3J5IOOBruWkieabtFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZGlyKGRpcmVjdG9yeTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgcHJvY2Vzcy5jaGRpcihkaXJlY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvamVjdCByb290IGRpcmVjdG9yeSDjga7lj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgcm9vdERpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Um9vdERpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlbXBsYXRlIGRpcmVjdG9yeSDjgpLmjIflrprjgZfjgabphY3kuIvjga7jg5XjgqHjgqTjg6vjgpLjgrPjg5Tjg7xcclxuICAgICAqIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIOOBruioreWumuOBjOWPjeaYoOOBleOCjOOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoICAgIOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHN0Um9vdCDjgrPjg5Tjg7zlhYjjgpLmjIflrpouIOaMh+WumuOBjOeEoeOBhOWgtOWQiOOBryByb290RGlyIOOBjOioreWumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29weVRwbERpcih0YXJnZXQ6IHN0cmluZywgZHN0Um9vdD86IHN0cmluZywgb3B0aW9ucz86IGdsb2IuSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBkc3RSb290ID0gZHN0Um9vdCB8fCB0aGlzLnJvb3REaXI7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgY3dkOiB0ZW1wbGF0ZVBhdGgodGFyZ2V0KSxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdDogdHJ1ZSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRzdCA9IHBhdGguam9pbihkc3RSb290LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3NyYy8sIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvcGtnLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcucGtnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvYnVpbHQvLCAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9kb2MvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5kb2MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90YXNrLywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGVzdC8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3R5cGVzLywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnR5cGVzKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKHBhdGguam9pbih0ZW1wbGF0ZVBhdGgodGFyZ2V0KSwgZmlsZSksIGRzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSDlh6bnkIbjga7jgqjjg7Pjg4jjg6pcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBydW5DcmVhdGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQmFzZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlKGNvbmZpZyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuOBriBjcmVhdGUg5Yem55CGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlQmFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3REaXIoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlCYXNlU3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5Q29tbW9uRmlsZXMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOODh+OCo+ODrOOCr+ODiOODquOBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVByb2plY3REaXIoKTogdm9pZCB7XHJcbiAgICAgICAgZnMubWtkaXJzU3luYyh0aGlzLnJvb3REaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weUJhc2VTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwiYmFzZS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln7rmnKzjg5XjgqHjgqTjg6vjga7jgrPjg5Tjg7xcclxuICAgICAqIHRlbXBsYXRlIOOBruOCs+ODlOODvOOCguihjOOBhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlDb21tb25GaWxlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHRoaXMucm9vdERpcjtcclxuXHJcbiAgICAgICAgLy8gLm5wbWlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiLm5wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCIubnBtaWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQkFOTkVSXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0JBTk5FUlwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJCQU5ORVJcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gTElDRU5TRVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZmlnLmxpY2Vuc2UpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkFwYWNoZS0yLjBcIjpcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuQXBhY2hlLTIuMFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIi5MSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTUlUXCI6XHJcbiAgICAgICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuTUlUXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiLkxJQ0VOU0VcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLmNvcHlyaWdodFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBOT1RJQ0VcclxuICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTk9USUNFXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIk5PVElDRVwiKSxcclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2dlbmVyYXRvci1iYXNlLnRzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcbmV4cG9ydCB7IFV0aWxzIH07XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb25cclxuICogQGJyaWVmIOOCveODvOOCueODh+OCo+ODrOOCr+ODiOODquOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24ge1xyXG4gICAgc2NyaXB0Pzogc3RyaW5nOyAgICAgICAgICAgIC8vIGpzKHRzKSDjg5XjgqHjgqTjg6vkv53lrZjlhYhcclxuICAgIHN0eWxlc2hlZXQ/OiBzdHJpbmc7ICAgICAgICAvLyBjc3MoY3NzKSDjg5XjgqHjgqTjg6vkv53lrZjlhYhcclxuICAgIHRlbXBsYXRlPzogc3RyaW5nOyAgICAgICAgICAvLyBodG1sKHRlbXBsYXRlKSDjg5XjgqHjgqTjg6vkv53lrZjlhYhcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODl+ODreOCuOOCp+OCr+ODiOODh+OCo+ODrOOCr+ODiOODquOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzcmM/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCveODvOOCueOCs+ODvOODieOBruODq+ODvOODiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcGtnPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5Hjg4PjgrHjg7zjgrjlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGJ1aWx0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Kz44Oz44OR44Kk44Or5YWI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBkb2M/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODieOCreODpeODoeODs+ODiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGFzaz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr/jgrnjgq/jg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRlc3Q/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OG44K544OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0eXBlcz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg5Z6L5a6a576p44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBzcmNDb25maWc/OiBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb247ICAgIC8vIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJUHJvamVjdENvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI5YWx6YCa44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3ROYW1lOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOWQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIHByb2plY3RLaW5kOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOeorumhniBleCkgXCJsaWJyYXJ5XCJcclxuICAgIGFjdGlvbjogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4KSBcImNyZWF0ZVwiXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5Djg7zjgrjjg6fjg7MgZXgpIFwiMS4wLjBcIlxyXG4gICAgbGljZW5zZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Op44Kk44K744Oz44K5IGV4KSBcIkFwYWNoZS0yLjBcIlxyXG4gICAgc2V0dGluZ3M6IFV0aWxzLklHbG9iYWxTZXR0aW5nczsgICAgICAgICAgICAgICAgLy8g44Ot44Kw44Kq44OX44K344On44OzXHJcbiAgICBuYW1lc3BhY2U/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6vjg7zjg4jlkI3liY3nqbrplpNcclxuICAgIHN0cnVjdHVyZUNvbmZpZz86IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uOyAgIC8vIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uXHJcbiAgICBjb3B5cmlnaHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg5Tjg7zjg6njgqTjg4jmloflrZfliJcgZXgpIFwiQ29weXJpZ2h0IChjKSAyMDE3IFNvbnkgQ29ycG9yYXRpb25cIlxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQ29tcGlsZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44Kz44Oz44OR44Kk44Or44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElDb21waWxlQ29uZmlncmF0aW9uIHtcclxuICAgIC8vIFR5cGVTY3JpcHRcclxuICAgIHRzVHJhbnNwaWxlVGFyZ2V0PzogXCJlczVcIiB8IFwiZXMyMDE1XCI7ICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg44GuIHRyYW5zcGlsZSB0YXJnZXRcclxuICAgIG1vZHVsZVN5c3RlbT86IFwibm9uZVwiIHwgXCJjb21tb25qc1wiIHwgXCJhbWRcIiB8IFwidW1kXCI7ICAgICAvLyBKYXZhU2NyaXB0IG1vZHVsZSBzeXN0ZW1cclxuICAgIC8vIFdlYnBhY2tcclxuICAgIHdlYnBhY2tUYXJnZXQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2VicGFjayB0YXJnZXQgY29uZmlndXJhdGlvblxyXG4gICAgLy8gQ1NTXHJcbiAgICBzdXBwb3J0Q1NTPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENTUyDjgpLlkKvjgoHjgovloLTlkIjjgavjga8gdHJ1ZVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2ludGVyZmFjZXMudHMiLCJpbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vdXRpbHMvc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JMaWJyYXJ5IH0gZnJvbSBcIi4vbGlicmFyeVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JNb2JpbGUgfSBmcm9tIFwiLi9tb2JpbGVcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yRGVza3RvcCB9IGZyb20gXCIuL2Rlc2t0b3BcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yV2ViIH0gZnJvbSBcIi4vd2ViXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9iYXNlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpYnJhcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Rlc2t0b3BcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vd2ViXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICBzd2l0Y2ggKGNvbmZpZy5wcm9qZWN0S2luZCkge1xyXG4gICAgICAgIGNhc2UgXCJsaWJyYXJ5XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIm1vYmlsZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcImRlc2t0b3BcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvckRlc2t0b3AoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwid2ViXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JXZWIoY29uZmlnKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwidW5zdXBwb3J0ZWQgcHJvamVjdCBraW5kOiBcIiArIGNvbmZpZy5wcm9qZWN0S2luZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvZ2VuZXJhdG9ycy9pbmRleC50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7IHNwYXduLCBTcGF3bk9wdGlvbnMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgd2hpY2gsXHJcbiAgICB1dWlkLFxyXG4gICAgU3Bpbm5lcixcclxufSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYXNzZXJ0LFxyXG4gICAgZ2V0TGliUGF0aCxcclxufSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjb21tYW5kIGxpbmUgZXJyb3IgYW5kIGtpbGwgcHJvY2Vzcy5cclxuICogV2hlbiB0aGUgYXBwbGljYXRpb24gcmVjZWl2ZWQgZXJyb3IgZnJvbSBjbGksIHBsZWFzZSBjYWxsIHRoaXMgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3IgIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFzc2VydChmYWxzZSwgZXJyb3IpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIFwidGVtcGxhdGVzXCIg44OH44Kj44Os44Kv44OI44Oq44GL44KJ44Gu44OR44K544KS5Y+W5b6XLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRhcmdldCDjgr/jg7zjgrLjg4Pjg4jjgpLmjIflrpouIG51bGwg44Gu5aC05ZCI44Gv44CBdGVtcGxhdGVzIOOCkui/lOWNtFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlcy9ob2dlaG9nZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlUGF0aCh0YXJnZXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSB0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJ0ZW1wbGF0ZXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGlubmVyIGluc3RhbmNlLlxyXG4gKiBDTEkgaGVscGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBbZm9ybWF0XSAgc3Bpbm5lciBmb3JtYXQgc3RyaW5nLlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBbaW5kZXhdICAgc3Bpbm5lciBpbmRleCBkZWZpbmVkIGJ5IGNsaS1zcGlubmVyLiAoZGVmYXVsdDogcmFuZG9tIFswLTldKVxyXG4gKiBAcmV0dXJuIHtTcGlubmVyfSBjbGktc3Bpbm5lciBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGlubmVyKGZvcm1hdD86IHN0cmluZywgaW5kZXg/OiBudW1iZXIpOiB7IHN0YXJ0OiAoKSA9PiB2b2lkOyBzdG9wOiAoY2xlYW4/OiBib29sZWFuKSA9PiB2b2lkOyB9IHtcclxuICAgIGNvbnN0IGZtdCA9IGZvcm1hdCB8fCBcIiVzXCI7XHJcbiAgICBjb25zdCBzcGlubmVyID0gbmV3IFNwaW5uZXIoZm10KTtcclxuICAgIGNvbnN0IGlkeCA9IChudWxsICE9IGluZGV4ICYmIDAgPD0gaW5kZXggJiYgaW5kZXggPCAxMCkgPyBpbmRleCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpOyAvLyByYW5kb20gdmFsdWUgb2YgcHJlc2V0IGFycmF5WzAtOV1cclxuICAgIHNwaW5uZXIuc2V0U3Bpbm5lclN0cmluZyhTcGlubmVyLnNwaW5uZXJzW2lkeF0pO1xyXG4gICAgcmV0dXJuIHNwaW5uZXI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9uc1xyXG4gKiBAYnJpZWYgbm9ybWFsaXplVGV4dCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBlb2w/OiBzdHJpbmc7ICAgLy8gZGVmYXVsdDogb3MuRU9MXHJcbiAgICBib20/OiBib29sZWFuOyAgLy8gZGVmYXVsdDogdHJ1ZVxyXG4gICAgdGFiPzogbnVtYmVyOyAgIC8vIHRhYiDjgpLlpInmj5vjgZnjgovjgrnjg5rjg7zjgrnjga7mlbDjgpLmjIflrpouIGRlZmF1bHQ6IOWkieaPm+OBl+OBquOBhFxyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIHRleHQgbGluZS1mZWVkLlxyXG4gKiBmb3Igd2luZG93cyBnaXQgdXNlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgIHRleHQgICAgICBpbnB1dCB0ZXh0LlxyXG4gKiBAcGFyYW0gIHtOb3JtYWxpemVUZXh0T3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbi5cclxuICogQHJldHVybiB7U3RyaW5nfSBub3JtYWxpemVkIHRleHQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBOb3JtYWxpemVUZXh0T3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IE5vcm1hbGl6ZVRleHRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFx1ZmVmZi9nbSwgXCJcIikgICAvLyByZW1vdmUgYm9tXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcclxcbi9nbSwgXCJcXG5cIikgICAgLy8gb25jZSBcIlxcblwiXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nbSwgXCJcXG5cIilcclxuICAgIDtcclxuXHJcbiAgICBpZiAob3B0LmJvbSkge1xyXG4gICAgICAgIHRleHQgPSBcIlxcdWZlZmZcIiArIHRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoXCJcXG5cIiAhPT0gb3B0LmVvbCkge1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nbSwgb3B0LmVvbCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0LnRhYikge1xyXG4gICAgICAgIGNvbnN0IHNwYWNlcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHQudGFiOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZ20sIHNwYWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnNcclxuICogQGJyaWVmIGV4ZWNDb21tYW5kKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9ucyBleHRlbmRzIFNwYXduT3B0aW9ucyB7XHJcbiAgICBzcGlubmVyPzoge1xyXG4gICAgICAgIGZvcm1hdD86IHN0cmluZzsgICAgLy8gZXgpIFwiJXNcIlxyXG4gICAgICAgIGluZGV4PzogbnVtYmVyOyAgICAgLy8gMCAtIDkg44Gu5pWw5YCk44KS5oyH5a6aXHJcbiAgICB9O1xyXG59XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSBjb21tYW5kIGxpbmUgYnkgc3Bhd24uXHJcbiAqIGNhbGwgc3Bhd24uIGlmIGVycm9yIG9jY3VyZWQsIGN1aSBpcyBraWxsZWQgcHJvY2Nlc3MuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgICAgICAgICAgY29tbWFuZCAgICBtYWluIGNvbW1hbmQuIGV4KSBcImNvcmRvdmFcIlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nW119ICAgICAgICAgICAgIGFyZ3MgICAgICAgY29tbWFuZCBhcmdzLiBleCkgW1wicGx1Z2luXCIsIFwiYWRkXCIsIHBsdWdpbk5hbWVdXHJcbiAqIEBwYXJhbSAgIHtFeGVjQ29tbWFuZE9wdGlvbnN9ICAgW29wdGlvbnNdICBjbGktc3Bpbm5lclwicyBvcHRpb25zLlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBlcnJvciBjb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXhlY0NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IEV4ZWNDb21tYW5kT3B0aW9ucyk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdDogRXhlY0NvbW1hbmRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICAgICAgc3RkaW86IFwiaW5oZXJpdFwiLFxyXG4gICAgICAgICAgICBzcGlubmVyOiB7IGZvcm1hdDogXCIlc1wiIH0sXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHdoaWNoKGNvbW1hbmQsIChlcnJvciwgcmVzb2x2ZWRDb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG9wdC5zcGlubmVyID8gZ2V0U3Bpbm5lcihvcHQuc3Bpbm5lci5mb3JtYXQsIG9wdC5zcGlubmVyLmluZGV4KSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGlubmVyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNwYXduKHJlc29sdmVkQ29tbWFuZCwgYXJncywgb3B0KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgaGFuZGxlRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zXHJcbiAqIEBicmllZiBjb3B5VHBsKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBkZWxpbWl0ZXJzPzogXCJ7eyB9fVwiIHwgXCI8JSAlPlwiOyAvLyB0ZW1wbGF0ZSDjgavkvb/nlKjjgZnjgosgZGVsaW1pdGVyLiBkZWZhdWx0OiBcInt7IH19XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGVtcGxhdGUgd2l0aCBob2dhbi5cclxuICogc3luYyBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBzcmMgICAgICAgc291cmNlIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgZHN0ICAgICAgIGRlc3RpbmF0aW9uIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgICAgcGFyYW1zICAgIHRlbXBsYXRlIHBhcmFtZXRlcnMuXHJcbiAqIEBwYXJhbSB7Q29weVRlbXBsYXRlT3B0aW9uc30gIFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5VHBsKHNyYzogc3RyaW5nLCBkc3Q6IHN0cmluZywgcGFyYW1zOiBPYmplY3QsIG9wdGlvbnM/OiBDb3B5VGVtcGxhdGVPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHQgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKHNyYykudG9TdHJpbmcoKSwgeyBlb2w6IFwiXFxuXCIsIGJvbTogZmFsc2UgfSksIG9wdCk7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBub3JtYWxpemVUZXh0KGpzdC5yZW5kZXIocGFyYW1zKSwgb3B0KTtcclxuXHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRzdCwgb3V0cHV0LCBcInV0ZjhcIik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR1VJRCBnZW5lcmF0ZS5cclxuICogcmV0dXJuZWQgYXMgV2luZG93cyByZWdpc3RyeSB0eXBlIGZvcm1hdC5cclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBcIntcIiArIHV1aWQudjQoKS50b1VwcGVyQ2FzZSgpICsgXCJ9XCI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJuIHtqUXVlcnl9IFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyMlhtbE5vZGUoc3RyOiBzdHJpbmcpOiBKUXVlcnkge1xyXG4gICAgcmV0dXJuICQoJC5wYXJzZVhNTChzdHIpKS5jaGlsZHJlbigpO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zXHJcbiAqIEBicmllZiBmb3JtYXRYTUwoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9ucyBleHRlbmRzIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIHN0ZXA/OiBudW1iZXI7ICAgLy8g56m655m944K544Oa44O844K55pWwLiBkZWZhdWx0OiAyXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBYTUwgZm9ybWF0dGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICBzdHIgICAgICAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEBwYXJhbSAge0Zvcm1hdFhtbE9wdGlvbnN9IFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgWE1MXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0WE1MKHN0cjogc3RyaW5nLCBvcHRpb25zPzogRm9ybWF0WG1sT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IEZvcm1hdFhtbE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBzdGVwOiAyLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcbiAgICBsZXQgeG1sID0gXCJcIjtcclxuICAgIGxldCBwYWQgPSAwO1xyXG4gICAgbGV0IGluZGVudDogbnVtYmVyO1xyXG4gICAgbGV0IG5vZGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdCBzdHJBcnIgPSBub3JtYWxpemVUZXh0KHN0ciwgeyBlb2w6IFwiXFxuXCIgfSlcclxuICAgICAgICAucmVwbGFjZSgvKD4pKDwpKFxcLyopL2csIFwiJDFcXG4kMiQzXCIpIC8vIGluc2VydCBMRiB0byBlYWNoIG5vZGUgb25jZS5cclxuICAgICAgICAuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgY29uc3Qgc3BhY2VzID0gKGxlbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgIGNvbnN0IF9pbmRlbnQgPSBsZW4gKiBvcHQuc3RlcDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICBzICs9IFwiIFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIG5vZGUgPSAkLnRyaW0oc3RyQXJyW2ldKTtcclxuICAgICAgICBpZiAobm9kZS5tYXRjaCgvLis8XFwvXFx3W14+XSo+JC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcL1xcdy8pKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYWQgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXHdbXj5dKlteXFwvXT4uKiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhtbCArPSBzcGFjZXMocGFkKSArIG5vZGUgKyBvcHQuZW9sO1xyXG4gICAgICAgIHBhZCArPSBpbmRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgeG1sID0geG1sLnJlcGxhY2UoL1xcblxcbi9nbSwgXCJcXG5cIik7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZVRleHQoeG1sLCBvcHQpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvdG9vbHMudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm9zXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifVxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xpLXNwaW5uZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNsaS1zcGlubmVyXCIsXCJjb21tb25qczJcIjpcImNsaS1zcGlubmVyXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn1cbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsb2JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImdsb2JcIixcImNvbW1vbmpzMlwiOlwiZ2xvYlwifVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW12ZXItcmVnZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn1cbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInV1aWRcIixcImNvbW1vbmpzMlwiOlwidXVpZFwifVxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hpY2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4bWxkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIkhvZ2FuXCIsXCJjb21tb25qc1wiOlwiaG9nYW4uanNcIixcImNvbW1vbmpzMlwiOlwiaG9nYW4uanNcIixcImFtZFwiOlwiaG9nYW4uanNcIn1cbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwifVxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZS5zdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCIsXCJjb21tb25qczJcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCJ9XG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdfQ==