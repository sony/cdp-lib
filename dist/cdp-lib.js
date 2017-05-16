/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-05-16T05:49:35.756Z
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
__export(__webpack_require__(17));
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
        try {
            _lang = JSON.parse(libs_1.fs.readFileSync(path.join(_settings.libPath, "res/locales", "messages." + _settings.lang + ".json"), "utf8").toString());
        }
        catch (error) {
            throw Error("Language resource JSON parse error" + error.message);
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
const base_1 = __webpack_require__(0);
const fs = base_1.Utils.fs;
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
        };
    }
    /**
     * create action entry
     * @param {ILibraryConfigration} config コンフィグ設定
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureModuleName();
            yield this.createDirectoryStructure();
            yield this.createProjectSettings();
            yield this.createSourceTemplate();
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
    // protected methods:
    /**
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDevDependencies}
     */
    get devDependencies() {
        const depends = super.devDependencies.concat([
            { name: "@types/jasmine", version: undefined, },
            { name: "jasmine-node", version: "^2.0.0", },
            { name: "webpack", version: undefined, },
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
    get config() {
        return this._config;
    }
    /**
     * module 名の保証
     * - 1: moduleName が指定されている場合は使用する
     * - 2: projectName が使用可能な場合はそれを使用する
     * - 3: projectName が使用不可の場合は、index.js を使用する
     */
    ensureModuleName() {
        if (null == this.config.moduleName) {
            if (!/^.*[(\\|\s|/|:|\*|?|\"|<|>|\|)].*$/.test(this.config.projectName)) {
                this.config.moduleName = this.config.projectName + ".js";
            }
            else {
                this.config.moduleName = "index.js";
            }
        }
        debug("moduleName: " + this.config.moduleName);
        return this.config.moduleName;
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
            // webpack.config.js
            if (null == this.config.webpackLibrary) {
                this.config.webpackLibrary = this.queryWebpackLibraryTarget();
            }
            copyTpl(path.join(templatePath("library"), "_webpack.config.js"), path.join(this.rootDir, "webpack.config.js"), this.config, { delimiters: "<% %>" });
            // main tsconfig.json
            copyTpl(path.join(templatePath("library"), "_tsconfig.json"), path.join(this.rootDir, "tsconfig.json"), this._config, { delimiters: "<% %>", bom: false, });
            // test tsconfig.json
            copyTpl(path.join(templatePath("library"), "_tsconfig.test.json"), path.join(this.rootDir, this._config.structureConfig.test, "jasmine", "tsconfig.json"), this._config, { delimiters: "<% %>", bom: false, });
            // eslintrc.json
            copyTpl(path.join(templatePath("library"), "_eslintrc.json"), path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"), this.queryEsLintEnvParam(), { delimiters: "<% %>", bom: false, });
            // .gitignore
            copyTpl(path.join(templatePath("library"), ".gitignore"), path.join(this.rootDir, ".gitignore"), this._config, { bom: false, });
            // README.md
            copyTpl(path.join(templatePath("library"), "_README.md"), path.join(this.rootDir, "README.md"), this._config, { delimiters: "<% %>" });
            // package.json
            if (null == this.config.devDependencies) {
                this.config.devDependencies = yield this.queryDevDependenciesParam();
            }
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
            copyTpl(path.join(templatePath("library"), "src", "_index.spec.ts"), path.join(this.rootDir, this._config.structureConfig.test, "jasmine", _module + "spec.ts"), param, { delimiters: "<% %>" });
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
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
     * 開発時の依存モジュールリストの取得
     * 必要に応じてオーバーライド
     *
     * @return {IDevDependencies}
     */
    get devDependencies() {
        return [
            { name: "convert-source-map", version: undefined, },
            { name: "del", version: undefined, },
            { name: "dts-bundle", version: undefined, },
            { name: "eslint", version: undefined, },
            { name: "npm-run-all", version: undefined, },
            { name: "plato", version: undefined, },
            { name: "remap-istanbul", version: undefined, },
            { name: "source-map", version: undefined, },
            { name: "source-map-loader", version: undefined, },
            { name: "tslint", version: undefined, },
            { name: "typedoc", version: undefined, },
            { name: "typescript", version: undefined, },
            { name: "typescript-formatter", version: undefined, },
            { name: "uglify-js", version: undefined, esTarget: ["es5"], },
            { name: "uglify-es", version: undefined, esTarget: ["es2015"], },
        ];
    }
    /**
     * dependencies の template paramaeter を取得
     *
     * @return {{ name: string; version: string; last?: boolean; }[]} テンプレートパラメータに指定する配列
     */
    queryDevDependenciesParam() {
        return __awaiter(this, void 0, void 0, function* () {
            this.progress("base.create.queryVersion");
            const depends = this.devDependencies
                .filter((depend) => {
                if (null == depend.esTarget) {
                    return true;
                }
                else {
                    return !!depend.esTarget.find((esVersion) => {
                        return this._config.esTarget === esVersion;
                    });
                }
            });
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
        switch (this._config.moduleSystem) {
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
            es6: "es5" !== compileSetting.esTarget,
            node: "web" !== compileSetting.webpackTarget,
        };
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
exports.Utils = Utils;


/***/ }),
/* 16 */
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
const path = __webpack_require__(1);
const os = __webpack_require__(19);
const child_process_1 = __webpack_require__(18);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZTg3MzIyMDczZDE3YWE3Y2ViNjgiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcIm9zXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7QUNEakMsaUM7Ozs7Ozs7Ozs7OztBQ0FBLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQTRCM0IsZ0JBQUU7QUEzQk4scUNBQTZCO0FBNEJ6QixvQkFBSTtBQTNCUixzQ0FBa0M7QUE0QjlCLHNCQUFLO0FBM0JULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBNEIzQixzQkFBSztBQTNCVCxxQ0FBNkI7QUE0QnpCLG9CQUFJO0FBM0JSLHNDQUErQjtBQTRCM0Isc0JBQUs7QUEzQlQsNENBQTRDO0FBNEJ4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Ozs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEsOEM7Ozs7OztBQ0FBLG1DIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAzMyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZTg3MzIyMDczZDE3YWE3Y2ViNjgiLCJleHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1iYXNlXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicGF0aFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInBhdGhcIlxuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgKiBmcm9tIFwiLi9saWJzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Rvb2xzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tIFwiZ2xvYlwiO1xyXG5pbXBvcnQgKiBhcyBob2dhbiBmcm9tIFwiaG9nYW4uanNcIjtcclxuaW1wb3J0ICogYXMgX2wgZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBfcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgd2hpY2ggZnJvbSBcIndoaWNoXCI7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0ICogYXMgY2hhbGsgZnJvbSBcImNoYWxrXCI7XHJcbmltcG9ydCAqIGFzIHNlbXZlclJlZ2V4IGZyb20gXCJzZW12ZXItcmVnZXhcIjtcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJjbGktc3Bpbm5lclwiO1xyXG5cclxuY29uc3QgJDogSlF1ZXJ5U3RhdGljID0gKCgpID0+IHtcclxuICAgICg8YW55Pmdsb2JhbCkuRE9NUGFyc2VyID0gcmVxdWlyZShcInhtbGRvbVwiKS5ET01QYXJzZXI7XHJcbiAgICBjb25zdCBfd2luZG93ID0gKCgpID0+IHtcclxuICAgICAgICBjb25zdCBqc2RvbSA9IHJlcXVpcmUoXCJqc2RvbVwiKTtcclxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YganNkb20uSlNET00pIHsgICAgLy8gdjEwK1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpzZG9tLkpTRE9NKCkud2luZG93O1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdjkuMTIueFxyXG4gICAgICAgICAgICByZXR1cm4ganNkb20uanNkb20oKS5kZWZhdWx0VmlldztcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIHJlcXVpcmUoXCJqcXVlcnlcIikoX3dpbmRvdyk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgdHlwZSBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IHR5cGVvZiBfcyAmIHR5cGVvZiBfbDtcclxuY29uc3QgX206IE1peGluZWRVbmRlcnNjb3JlU3RhdGljID0gPGFueT5fbC5taXhpbig8YW55Pl9zLmV4cG9ydHMoKSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgX20gYXMgXyxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgc2VtdmVyUmVnZXgsXHJcbiAgICBTcGlubmVyLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL2xpYnMudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGZzLCAkIH0gZnJvbSBcIi4vbGlic1wiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUdsb2JhbFNldHRpbmdzXHJcbiAqIEBicmllZiDjgrDjg63jg7zjg5Djg6voqK3lrprjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIGZvcmNlPzogYm9vbGVhbjsgICAgICAgICAgICAvLyDjgqjjg6njg7zntpnntprnlKhcclxuICAgIHZlcmJvc2U/OiBib29sZWFuOyAgICAgICAgICAvLyDoqbPntLDjg63jgrBcclxuICAgIHNpbGVudD86IGJvb2xlYW47ICAgICAgICAgICAvLyBzaWxlbnQgbW9kZVxyXG4gICAgbGliUGF0aD86IHN0cmluZzsgICAgICAgICAgIC8vIGNkcC1saWIg5pys5L2T44GM44GC44KL44OH44Kj44Os44Kv44OI44OqXHJcbiAgICB0YXJnZXREaXI/OiBzdHJpbmc7ICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44OqXHJcbiAgICBsYW5nPzogXCJlbi1VU1wiIHwgXCJqYS1KUFwiO1xyXG59XHJcblxyXG5sZXQgX3NldHRpbmdzOiBJR2xvYmFsU2V0dGluZ3MgPSB7XHJcbiAgICBmb3JjZTogZmFsc2UsXHJcbiAgICB2ZXJib3NlOiBmYWxzZSxcclxuICAgIHNpbGVudDogZmFsc2UsXHJcbiAgICBsaWJQYXRoOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJub2RlX21vZHVsZXNcIiwgXCJjZHAtbGliXCIpLFxyXG4gICAgbGFuZzogXCJlbi1VU1wiLFxyXG59O1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIOioreWumuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtJR2xvYmFsU2V0dGluZ3N9IG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgX3NldHRpbmdzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOioreWumuaMh+WumlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lHbG9iYWxTZXR0aW5nc30gb3B0aW9ucyDjg63jgrDjgavkvb/nlKjjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTZXR0aW5ncyhzZXR0aW5nczogSUdsb2JhbFNldHRpbmdzKTogdm9pZCB7XHJcbiAgICBpZiAoc2V0dGluZ3MpIHtcclxuICAgICAgICBfc2V0dGluZ3MuZm9yY2UgICAgID0gc2V0dGluZ3MuZm9yY2UgICAgICAgIHx8IF9zZXR0aW5ncy5mb3JjZTtcclxuICAgICAgICBfc2V0dGluZ3MudmVyYm9zZSAgID0gc2V0dGluZ3MudmVyYm9zZSAgICAgIHx8IF9zZXR0aW5ncy52ZXJib3NlO1xyXG4gICAgICAgIF9zZXR0aW5ncy5zaWxlbnQgICAgPSBzZXR0aW5ncy5zaWxlbnQgICAgICAgfHwgX3NldHRpbmdzLnNpbGVudDtcclxuICAgICAgICBfc2V0dGluZ3MubGliUGF0aCAgID0gc2V0dGluZ3MubGliUGF0aCAgICAgIHx8IF9zZXR0aW5ncy5saWJQYXRoO1xyXG4gICAgICAgIF9zZXR0aW5ncy50YXJnZXREaXIgPSBzZXR0aW5ncy50YXJnZXREaXIgICAgfHwgX3NldHRpbmdzLnRhcmdldERpcjtcclxuICAgICAgICBfc2V0dGluZ3MubGFuZyAgICAgID0gc2V0dGluZ3MubGFuZyAgICAgICAgIHx8IF9zZXR0aW5ncy5sYW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGZvcmNlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNpbGVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxpYlBhdGg6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCBcIm5vZGVfbW9kdWxlc1wiLCBcImNkcC1saWJcIiksXHJcbiAgICAgICAgICAgIGxhbmc6IFwiZW4tVVNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogXCJjZHAtbGliXCIg44GM5a2Y5Zyo44GZ44KL44OR44K544KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gY2RwLWxpYiDjgbjjga4gcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpYlBhdGgoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBfc2V0dGluZ3MubGliUGF0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaMh+WumuOBleOCjOOBnyB0YXJnZXREaXIg44KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gdGFyZ2V0RGlyIOOBuOOBriBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0RGlyKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3NldHRpbmdzLnRhcmdldERpcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmxvZygpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSB7QW55W119ICBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIV9zZXR0aW5ncy5zaWxlbnQpIHtcclxuICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6Kmz57Sw44Ot44Kw5Ye65YqbXHJcbiAqIGNvbnNvbGUuZGVidWcoKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0ge0FueVtdfSAgb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVidWcobWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIV9zZXR0aW5ncy5zaWxlbnQgJiYgX3NldHRpbmdzLnZlcmJvc2UpIHtcclxuICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJERUJVRzogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmpJzoqLxcclxuICogY29uc29sZS5hc3NlcnQoKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHtCb29sZWFufSB0ZXN0ICAgICAgICAgICDmpJzoqLzjgZnjgovlvI9cclxuICogQHBhcmFtIHtTdHJpbmd9ICBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIHtBbnlbXX0gICBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQodGVzdD86IGJvb2xlYW4sIG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCF0ZXN0KSB7XHJcbiAgICAgICAgaWYgKF9zZXR0aW5ncy5mb3JjZSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubGV0IF9sYW5nOiBhbnk7XHJcblxyXG4vKipcclxuICog44Ot44O844Kr44Op44Kk44K6XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkg44Kt44O85paH5a2X5YiXXHJcbiAqIEByZXR1cm4g57+76Kiz44GV44KM44Gf5paH5a2X5YiXXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghX2xhbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBfbGFuZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKF9zZXR0aW5ncy5saWJQYXRoLCBcInJlcy9sb2NhbGVzXCIsIFwibWVzc2FnZXMuXCIgKyBfc2V0dGluZ3MubGFuZyArIFwiLmpzb25cIiksIFwidXRmOFwiKS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJMYW5ndWFnZSByZXNvdXJjZSBKU09OIHBhcnNlIGVycm9yXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc291Y2UgPSAkLmV4dGVuZCh7fSwgX2xhbmcpO1xyXG4gICAgY29uc3QgcHJvcHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgd2hpbGUgKDAgPCBwcm9wcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBwcm9wID0gcHJvcHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAocmVzb3VjZVtwcm9wXSkge1xyXG4gICAgICAgICAgICByZXNvdWNlID0gcmVzb3VjZVtwcm9wXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwicmVzb3VjZSBub3QgZm91bmQuIGtleTogXCIgKyBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb3VjZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3NldHRpbmdzLnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgeyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiwgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JFbGVjdHJvblxyXG4gKiBAYnJpZWYgRGVza3RvcCBFbGVjdHJvbiDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckVsZWN0cm9uIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3L2FwcFwiLCAvLyBUT0RPOiDmmqvlrppcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgc3JjQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQ6IFwic2NyaXB0c1wiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldDogXCJzdHlsZXNoZWV0c1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwidGVtcGxhdGVzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SURlc2t0b3BBcHBDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElEZXNrdG9wQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvZGVza3RvcC9nZW5lcmF0b3ItZWxlY3Rvcm9uLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JFbGVjdHJvbiB9IGZyb20gXCIuL2dlbmVyYXRvci1lbGVjdG9yb25cIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWVsZWN0b3JvblwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JEZXNrdG9wKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yRWxlY3Ryb24oY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvZGVza3RvcC9pbmRleC50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIEdlbmVyYXRvckJhc2UsXHJcbiAgICBVdGlscyxcclxufSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJTGlicmFyeUNvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmNvbnN0IGZzICAgICAgICAgICAgPSBVdGlscy5mcztcclxuY29uc3QgXyAgICAgICAgICAgICA9IFV0aWxzLl87XHJcbmNvbnN0IGRlYnVnICAgICAgICAgPSBVdGlscy5kZWJ1ZztcclxuY29uc3QgdGVtcGxhdGVQYXRoICA9IFV0aWxzLnRlbXBsYXRlUGF0aDtcclxuY29uc3QgY29weVRwbCAgICAgICA9IFV0aWxzLmNvcHlUcGw7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvck1vZHVsZVxyXG4gKiBAYnJpZWYgTGlicmFyeSBNb2R1bGUg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JNb2R1bGUgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwic3JjXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJkaXN0XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImJ1aWx0XCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVNb2R1bGVOYW1lKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3RTZXR0aW5ncygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU291cmNlVGVtcGxhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGV2RGVwZW5kZW5jaWVzfVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRldkRlcGVuZGVuY2llcygpOiBJRGVwZW5kZW5jeVtdIHtcclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gc3VwZXIuZGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImphc21pbmUtbm9kZVwiLCAgICAgdmVyc2lvbjogXCJeMi4wLjBcIiwgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ3ZWJwYWNrXCIsICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGRlcGVuZHMsIChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlcGVuZC5uYW1lO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJTGlicmFyeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJTGlicmFyeUNvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb2R1bGUg5ZCN44Gu5L+d6Ki8XHJcbiAgICAgKiAtIDE6IG1vZHVsZU5hbWUg44GM5oyH5a6a44GV44KM44Gm44GE44KL5aC05ZCI44Gv5L2/55So44GZ44KLXHJcbiAgICAgKiAtIDI6IHByb2plY3ROYW1lIOOBjOS9v+eUqOWPr+iDveOBquWgtOWQiOOBr+OBneOCjOOCkuS9v+eUqOOBmeOCi1xyXG4gICAgICogLSAzOiBwcm9qZWN0TmFtZSDjgYzkvb/nlKjkuI3lj6/jga7loLTlkIjjga/jgIFpbmRleC5qcyDjgpLkvb/nlKjjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbnN1cmVNb2R1bGVOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jb25maWcubW9kdWxlTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIS9eLipbKFxcXFx8XFxzfC98OnxcXCp8P3xcXFwifDx8PnxcXHwpXS4qJC8udGVzdCh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUgPSB0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSArIFwiLmpzXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gXCJpbmRleC5qc1wiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlYnVnKFwibW9kdWxlTmFtZTogXCIgKyB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcubW9kdWxlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODh+OCo+ODrOOCr+ODiOODquani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvcHlUcGxEaXIoXCJsaWJyYXJ5L3N0cnVjdHVyZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gd2VicGFjay5jb25maWcuanNcclxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmNvbmZpZy53ZWJwYWNrTGlicmFyeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy53ZWJwYWNrTGlicmFyeSA9IHRoaXMucXVlcnlXZWJwYWNrTGlicmFyeVRhcmdldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfd2VicGFjay5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwid2VicGFjay5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRlc3QgdHNjb25maWcuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy50ZXN0Lmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJqYXNtaW5lXCIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGVzbGludHJjLmpzb25cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcImVzbGludFwiLCBcImVzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMucXVlcnlFc0xpbnRFbnZQYXJhbSgpLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIC5naXRpZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCIuZ2l0aWdub3JlXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIi5naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gUkVBRE1FLm1kXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX1JFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJSRUFETUUubWRcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHBhY2thZ2UuanNvblxyXG4gICAgICAgIGlmIChudWxsID09IHRoaXMuY29uZmlnLmRldkRlcGVuZGVuY2llcykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5RGV2RGVwZW5kZW5jaWVzUGFyYW0oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3BhY2thZ2UuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44K944O844K544Gu6Zub5b2i5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlU291cmNlVGVtcGxhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgX21vZHVsZSA9IHBhdGguYmFzZW5hbWUodGhpcy5fY29uZmlnLm1vZHVsZU5hbWUsIFwiLmpzXCIpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBzYW1wbGVDbGFzczogXy5jbGFzc2lmeShfbW9kdWxlKSxcclxuICAgICAgICAgICAgc2FtcGxlTW9kdWxlOiBfbW9kdWxlLFxyXG4gICAgICAgICAgICBidWlsdDogdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JpcHQgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQgfHwgXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyBpbmRleC50c1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcInNyY1wiLCBcIl9pbmRleC50c1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHNjcmlwdCwgX21vZHVsZSArIFwiLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGluZGV4LnNwZWMudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXguc3BlYy50c1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcImphc21pbmVcIiwgX21vZHVsZSArIFwic3BlYy50c1wiKSxcclxuICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2dlbmVyYXRvci1tb2R1bGUudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvck1vZHVsZSB9IGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLW1vZHVsZVwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yTW9kdWxlKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCAgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElNb2JpbGVBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckNvcmRvdmFcclxuICogQGJyaWVmIE1vYmlsZSBDb3Jkb3ZhIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yQ29yZG92YSBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3d1wiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInVuZGVyIGNvbnN0cnVjdGlvbi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1ub3JtYWxpemUuanNcIixcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJTW9iaWxlQXBwQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElNb2JpbGVBcHBDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvZ2VuZXJhdG9yLWNvcmRvdmEudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckNvcmRvdmEgfSBmcm9tIFwiLi9nZW5lcmF0b3ItY29yZG92YVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItY29yZG92YVwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JNb2JpbGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JDb3Jkb3ZhKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL21vYmlsZS9pbmRleC50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJV2ViQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCcm93c2VyXHJcbiAqIEBicmllZiBXZWIgQnJvd3NlciDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckJyb3dzZXIgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSVdlYkFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJV2ViQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2dlbmVyYXRvci1icm93c2VyLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JCcm93c2VyIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWJyb3dzZXJcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJyb3dzZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQnJvd3Nlcihjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy93ZWIvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5leHBvcnQgeyBVdGlscyB9O1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbixcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSVByb2plY3RDb25maWdyYXRpb24sXHJcbiAgICBJQ29tcGlsZUNvbmZpZ3JhdGlvbixcclxuICAgIElMaWJyYXJ5Q29uZmlncmF0aW9uLFxyXG4gICAgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbixcclxuICAgIElEZXNrdG9wQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSVdlYkFwcENvbmZpZ3JhdGlvbixcclxuICAgIC8vLy9cclxuICAgIG5ld0dlbmVyYXRvclxyXG59IGZyb20gXCIuL2dlbmVyYXRvcnNcIjtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24sXHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUNvbXBpbGVDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbn07XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDRFBMaWJcclxuICogQGJyaWVmIENEUCBib2lsZXJwbGF0ZSDnlJ/miJDmqZ/og73jgpLmj5DkvpvjgZnjgovjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENEUExpYiB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYWluIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBVdGlscy5zZXRTZXR0aW5ncyhjb25maWcuc2V0dGluZ3MpO1xyXG4gICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3IoY29uZmlnKS5ydW4oKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2NkcC1saWIudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGdsb2IsXHJcbiAgICBjaGFsayxcclxuICAgIF8sXHJcbiAgICAkLFxyXG4gICAgLy8vL1xyXG4gICAgZXhlY0NvbW1hbmQsXHJcbiAgICBnZXRTcGlubmVyLFxyXG4gICAgZ2V0VGFyZ2V0RGlyLFxyXG4gICAgdGVtcGxhdGVQYXRoLFxyXG4gICAgY29weVRwbCxcclxuICAgIGxvZyxcclxuICAgIGRlYnVnLFxyXG4gICAgdHJhbnNsYXRlLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElDb21waWxlQ29uZmlncmF0aW9uLFxyXG59IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQmFzZVxyXG4gKiBAYnJpZWYg44GZ44G544Gm44GuIEdlbmVyYXRvciDjga7ml6Llrprjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9wcm9qZWN0Um9vdERpcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQcm9qZWN0Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44KwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3RSb290RGlyID0gZ2V0VGFyZ2V0RGlyKCkgP1xyXG4gICAgICAgICAgICBnZXRUYXJnZXREaXIoKSA6XHJcbiAgICAgICAgICAgIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB0aGlzLl9jb25maWcucHJvamVjdE5hbWUpO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QmFzZVN0cnVjdHVyZSgpLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgZGVidWcoSlNPTi5zdHJpbmdpZnkodGhpcy5fY29uZmlnLCBudWxsLCA0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh6bnkIbplovlp4sgKOOCqOODs+ODiOODqilcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jb25maWcuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcmVhdGVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5rbm93biBhY3Rpb246IFwiICsgdGhpcy5fY29uZmlnLmFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBhYnN0cmFjdCBtZXRob2RzOlxyXG5cclxuICAgIC8vIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICBhYnN0cmFjdCBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjtcclxuXHJcbiAgICAvLyBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgIGFic3RyYWN0IGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8vIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcm90ZWN0ZWQgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAsuaNl+ODhuOCreOCueODiOOCkumAmuefpVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkg44Ot44O844Kr44Op44Kk44K644Oq44K944O844K544Kt44O844KS5oyH5a6aXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9ncmVzcyhrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay5jeWFuKHRyYW5zbGF0ZShrZXkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3b3JrIGRpcmVjdG9yeSDjga7lpInmm7RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjaGRpcihkaXJlY3Rvcnk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHByb2Nlc3MuY2hkaXIoZGlyZWN0b3J5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb2plY3Qgcm9vdCBkaXJlY3Rvcnkg44Gu5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdG9yeSB0YXJnZXQgZGlyZWN0b3J5LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHJvb3REaXIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvamVjdFJvb3REaXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0ZW1wbGF0ZSBkaXJlY3Rvcnkg44KS5oyH5a6a44GX44Gm6YWN5LiL44Gu44OV44Kh44Kk44Or44KS44Kz44OU44O8XHJcbiAgICAgKiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiDjga7oqK3lrprjgYzlj43mmKDjgZXjgozjgotcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcGF0aCAgICDjgr/jg7zjgrLjg4Pjg4jjgpLmjIflrpouIG51bGwg44Gu5aC05ZCI44Gv44CBdGVtcGxhdGVzIOOCkui/lOWNtFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRzdFJvb3Qg44Kz44OU44O85YWI44KS5oyH5a6aLiDmjIflrprjgYznhKHjgYTloLTlkIjjga8gcm9vdERpciDjgYzoqK3lrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvcHlUcGxEaXIodGFyZ2V0OiBzdHJpbmcsIGRzdFJvb3Q/OiBzdHJpbmcsIG9wdGlvbnM/OiBnbG9iLklPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgZHN0Um9vdCA9IGRzdFJvb3QgfHwgdGhpcy5yb290RGlyO1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGN3ZDogdGVtcGxhdGVQYXRoKHRhcmdldCksXHJcbiAgICAgICAgICAgIG5vZGlyOiB0cnVlLFxyXG4gICAgICAgICAgICBkb3Q6IHRydWUsXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGdsb2Iuc3luYyhcIioqXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkc3QgPSBwYXRoLmpvaW4oZHN0Um9vdCxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9zcmMvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9wa2cvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wa2cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9idWlsdC8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2RvYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmRvYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rhc2svLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRhc2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90ZXN0LywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdHlwZXMvLCAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMpXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMocGF0aC5qb2luKHRlbXBsYXRlUGF0aCh0YXJnZXQpLCBmaWxlKSwgZHN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUgbW9kdWxlIOOBriB2ZXJzaW9uIOWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvbWlzZTxzdHJpbmc+fSB2ZXJzaW9uIHRleHRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBleGVjQ29tbWFuZChcIm5wbVwiLCBbXCJpbmZvXCIsIG5hbWUsIFwidmVyc2lvblwiXSwge1xyXG4gICAgICAgICAgICAgICAgc3RkaW86IFwicGlwZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Bpbm5lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBfLnRyaW0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGV2RGVwZW5kZW5jaWVzfVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRldkRlcGVuZGVuY2llcygpOiBJRGVwZW5kZW5jeVtdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICB7IG5hbWU6IFwiY29udmVydC1zb3VyY2UtbWFwXCIsICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZGVsXCIsICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZHRzLWJ1bmRsZVwiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZXNsaW50XCIsICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwibnBtLXJ1bi1hbGxcIiwgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwicGxhdG9cIiwgICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwicmVtYXAtaXN0YW5idWxcIiwgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwic291cmNlLW1hcFwiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwic291cmNlLW1hcC1sb2FkZXJcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHNsaW50XCIsICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHlwZWRvY1wiLCAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHlwZXNjcmlwdFwiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHlwZXNjcmlwdC1mb3JtYXR0ZXJcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidWdsaWZ5LWpzXCIsICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlc1RhcmdldDogW1wiZXM1XCJdLCAgICAgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktZXNcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIGVzVGFyZ2V0OiBbXCJlczIwMTVcIl0sICAgfSxcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVwZW5kZW5jaWVzIOOBriB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge3sgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuOyB9W119IOODhuODs+ODl+ODrOODvOODiOODkeODqeODoeODvOOCv+OBq+aMh+WumuOBmeOCi+mFjeWIl1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgcXVlcnlEZXZEZXBlbmRlbmNpZXNQYXJhbSgpOiBQcm9taXNlPHsgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuIH1bXT4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJiYXNlLmNyZWF0ZS5xdWVyeVZlcnNpb25cIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSA8eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW47IH1bXT50aGlzLmRldkRlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAuZmlsdGVyKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGRlcGVuZC5lc1RhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFkZXBlbmQuZXNUYXJnZXQuZmluZCgoZXNWZXJzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPElDb21waWxlQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZXNUYXJnZXQgPT09IGVzVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gKGNvbnRleHQ6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgY29udGV4dCAmJiAhdGhpcy5fY29uZmlnLnNldHRpbmdzLnNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IGdldFNwaW5uZXIoY2hhbGsueWVsbG93KGNvbnRleHQpLCA1KTtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGlubmVyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gZGVwZW5kcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kc1tpXS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gcHJvZ3Jlc3MoZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0udmVyc2lvbiA9IFwiXlwiICsgYXdhaXQgdGhpcy5xdWVyeU5vZGVNb2R1bGVMYXRlc3RWZXJzaW9uKGRlcGVuZHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyhzcGlubmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0ubGFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZXBlbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2VicGFjay5jb25maWcuanMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBsaWJyYXJ5VGFyZ2V0IOOBq+aMh+WumuOBmeOCi+aWh+Wtl+WIl1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlXZWJwYWNrTGlicmFyeVRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoKDxJQ29tcGlsZUNvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1vZHVsZVN5c3RlbSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1vbmpzMlwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiYW1kXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhbWRcIjtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW1kXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVzbGludHJjIOOBriBlbnYg44Gr5oyH5a6a44GZ44KLIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBlbnYg44Gr5oyH5a6a44GZ44KL44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeUVzTGludEVudlBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgY29tcGlsZVNldHRpbmcgPSA8SUNvbXBpbGVDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGVzNjogXCJlczVcIiAhPT0gY29tcGlsZVNldHRpbmcuZXNUYXJnZXQsXHJcbiAgICAgICAgICAgIG5vZGU6IFwid2ViXCIgIT09IGNvbXBpbGVTZXR0aW5nLndlYnBhY2tUYXJnZXQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIOWHpueQhuOBruOCqOODs+ODiOODqlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIHJ1bkNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZUJhc2UoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbHpgJrjga4gY3JlYXRlIOWHpueQhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZUJhc2UoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcImJhc2UuY3JlYXRlLmZvdW5kYXRpb25cIik7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVQcm9qZWN0RGlyKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5QmFzZVN0cnVjdHVyZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weUNvbW1vbkZpbGVzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5VGFza1NjcmlwdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOODh+OCo+ODrOOCr+ODiOODquOBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVByb2plY3REaXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmModGhpcy5yb290RGlyKSkge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcih0cmFuc2xhdGUoXCJiYXNlLmNyZWF0ZS5lcnJvci5hbHJlYWR5RXhpc3RcIikpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmcy5ta2RpcnNTeW5jKHRoaXMucm9vdERpcik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbHpgJrmp4vmiJDmg4XloLHjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5QmFzZVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvcHlUcGxEaXIoXCJiYXNlL3N0cnVjdHVyZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWfuuacrOODleOCoeOCpOODq+OBruOCs+ODlOODvFxyXG4gICAgICogdGVtcGxhdGUg44Gu44Kz44OU44O844KC6KGM44GGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weUNvbW1vbkZpbGVzKCk6IHZvaWQge1xyXG4gICAgICAgIGNvbnN0IHNyY0RpciA9IHRlbXBsYXRlUGF0aChcImJhc2VcIik7XHJcbiAgICAgICAgY29uc3QgZHN0RGlyID0gdGhpcy5yb290RGlyO1xyXG5cclxuICAgICAgICAvLyAubnBtaWdub3JlXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCIubnBtaWdub3JlXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIi5ucG1pZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWdcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBCQU5ORVJcclxuICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfQkFOTkVSXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIkJBTk5FUlwiKSxcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBMSUNFTlNFXHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jb25maWcubGljZW5zZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiQXBhY2hlLTIuMFwiOlxyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTElDRU5TRS5BcGFjaGUtMi4wXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiLkxJQ0VOU0VcIiksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNSVRcIjpcclxuICAgICAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTElDRU5TRS5NSVRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCIuTElDRU5TRVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY29weXJpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5PVElDRVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9OT1RJQ0VcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTk9USUNFXCIpLFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YXNrIHNjcmlwdCDjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5VGFza1NjcmlwdHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZS90YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzayk7XHJcblxyXG4gICAgICAgIHRoaXMudGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIHRhc2spLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgdGFzayksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvZ2VuZXJhdG9yLWJhc2UudHMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44K944O844K544OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzY3JpcHQ/OiBzdHJpbmc7ICAgICAgICAgICAgLy8ganModHMpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgc3R5bGVzaGVldD86IHN0cmluZzsgICAgICAgIC8vIGNzcyhjc3MpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7ICAgICAgICAgIC8vIGh0bWwodGVtcGxhdGUpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHNyYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K944O844K544Kz44O844OJ44Gu44Or44O844OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBwa2c/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkeODg+OCseODvOOCuOWFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgYnVpbHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg7Pjg5HjgqTjg6vlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGRvYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0YXNrPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCueOCr+ODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVzdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4bjgrnjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHR5cGVzPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDlnovlrprnvqnjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHNyY0NvbmZpZz86IElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbjsgICAgLy8gSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElEZXBlbmRlbmN5XHJcbiAqIEBicmllZiBwYWNrYWdlLmpzb24g44Gr5oyH5a6a44GZ44KLIGRlcGVuZGVuY2llcyDmg4XloLHjgpLmoLzntI3jgZnjgovjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3kge1xyXG4gICAgbmFtZTogc3RyaW5nOyAgICAgICAgICAgLy8gbW9kdWxlIG5hbWUgZXgpIFwidHlwZXNjcmlwdFwiXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nOyAgICAgICAvLyDmjIflrprjg5Djg7zjgrjjg6fjg7MuIOeEoeaMh+WumuOBruWgtOWQiOOBr+acgOaWsOODkOODvOOCuOODp+ODs1xyXG4gICAgZXNUYXJnZXQ/OiBzdHJpbmdbXTsgICAgLy8g5oyH5a6a44GV44KM44GfIEVTIHZlcnNpb24g44Gu44Go44GN44Gu44G/5pyJ5Yq544Gr44GZ44KLXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jlhbHpgJrjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgcHJvamVjdEtpbmQ6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI56iu6aGeIGV4KSBcImxpYnJhcnlcIlxyXG4gICAgYWN0aW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXgpIFwiY3JlYXRlXCJcclxuICAgIHZlcnNpb246IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkOODvOOCuOODp+ODsyBleCkgXCIxLjAuMFwiXHJcbiAgICBsaWNlbnNlOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6njgqTjgrvjg7PjgrkgZXgpIFwiQXBhY2hlLTIuMFwiXHJcbiAgICBzZXR0aW5nczogVXRpbHMuSUdsb2JhbFNldHRpbmdzOyAgICAgICAgICAgICAgICAvLyDjg63jgrDjgqrjg5fjgrfjg6fjg7NcclxuICAgIG1vZHVsZU5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODoeOCpOODs+ODleOCoeOCpOODq+WQjVxyXG4gICAgbmFtZXNwYWNlPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Or44O844OI5ZCN5YmN56m66ZaTXHJcbiAgICBzdHJ1Y3R1cmVDb25maWc/OiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjsgICAvLyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gICAgY29weXJpZ2h0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Kz44OU44O844Op44Kk44OI5paH5a2X5YiXIGV4KSBcIkNvcHlyaWdodCAoYykgMjAxNyBTb255IENvcnBvcmF0aW9uXCJcclxuICAgIGRldkRlcGVuZGVuY2llcz86IElEZXBlbmRlbmN5W107ICAgICAgICAgICAgICAgIC8vIOmWi+eZuueUqOS+neWtmOODouOCuOODpeODvOODq+aDheWgsVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQ29tcGlsZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44Kz44Oz44OR44Kk44Or44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElDb21waWxlQ29uZmlncmF0aW9uIHtcclxuICAgIC8vIFR5cGVTY3JpcHRcclxuICAgIGVzVGFyZ2V0PzogXCJlczVcIiB8IFwiZXMyMDE1XCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg44GuIHRyYW5zcGlsZSB0YXJnZXRcclxuICAgIG1vZHVsZVN5c3RlbT86IFwibm9uZVwiIHwgXCJjb21tb25qc1wiIHwgXCJhbWRcIiB8IFwidW1kXCI7ICAgICAvLyBKYXZhU2NyaXB0IG1vZHVsZSBzeXN0ZW1cclxuICAgIC8vIFdlYnBhY2tcclxuICAgIHdlYnBhY2tUYXJnZXQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2VicGFjayB0YXJnZXQgY29uZmlndXJhdGlvblxyXG4gICAgd2VicGFja0xpYnJhcnk/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZWJwYWNrIGxpYnJhcnlUYXJnZXQgY29uZmlndXJhdGlvblxyXG4gICAgLy8gQ1NTXHJcbiAgICBzdXBwb3J0Q1NTPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENTUyDjgpLlkKvjgoHjgovloLTlkIjjgavjga8gdHJ1ZVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2ludGVyZmFjZXMudHMiLCJpbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vdXRpbHMvc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JMaWJyYXJ5IH0gZnJvbSBcIi4vbGlicmFyeVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JNb2JpbGUgfSBmcm9tIFwiLi9tb2JpbGVcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yRGVza3RvcCB9IGZyb20gXCIuL2Rlc2t0b3BcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yV2ViIH0gZnJvbSBcIi4vd2ViXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9iYXNlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpYnJhcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Rlc2t0b3BcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vd2ViXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICBzd2l0Y2ggKGNvbmZpZy5wcm9qZWN0S2luZCkge1xyXG4gICAgICAgIGNhc2UgXCJsaWJyYXJ5XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIm1vYmlsZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcImRlc2t0b3BcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvckRlc2t0b3AoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwid2ViXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JXZWIoY29uZmlnKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwidW5zdXBwb3J0ZWQgcHJvamVjdCBraW5kOiBcIiArIGNvbmZpZy5wcm9qZWN0S2luZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvZ2VuZXJhdG9ycy9pbmRleC50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7IHNwYXduLCBTcGF3bk9wdGlvbnMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgd2hpY2gsXHJcbiAgICB1dWlkLFxyXG4gICAgU3Bpbm5lcixcclxufSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYXNzZXJ0LFxyXG4gICAgZ2V0TGliUGF0aCxcclxufSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjb21tYW5kIGxpbmUgZXJyb3IgYW5kIGtpbGwgcHJvY2Vzcy5cclxuICogV2hlbiB0aGUgYXBwbGljYXRpb24gcmVjZWl2ZWQgZXJyb3IgZnJvbSBjbGksIHBsZWFzZSBjYWxsIHRoaXMgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3IgIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFzc2VydChmYWxzZSwgZXJyb3IpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIFwidGVtcGxhdGVzXCIg44OH44Kj44Os44Kv44OI44Oq44GL44KJ44Gu44OR44K544KS5Y+W5b6XLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRhcmdldCDjgr/jg7zjgrLjg4Pjg4jjgpLmjIflrpouIG51bGwg44Gu5aC05ZCI44Gv44CBdGVtcGxhdGVzIOOCkui/lOWNtFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlcy9ob2dlaG9nZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlUGF0aCh0YXJnZXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSB0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJ0ZW1wbGF0ZXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGlubmVyIGluc3RhbmNlLlxyXG4gKiBDTEkgaGVscGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBbZm9ybWF0XSAgc3Bpbm5lciBmb3JtYXQgc3RyaW5nLlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBbaW5kZXhdICAgc3Bpbm5lciBpbmRleCBkZWZpbmVkIGJ5IGNsaS1zcGlubmVyLiAoZGVmYXVsdDogcmFuZG9tIFswLTI5XSlcclxuICogQHJldHVybiB7U3Bpbm5lcn0gY2xpLXNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3Bpbm5lcihmb3JtYXQ/OiBzdHJpbmcsIGluZGV4PzogbnVtYmVyKTogeyBzdGFydDogKCkgPT4gdm9pZDsgc3RvcDogKGNsZWFuPzogYm9vbGVhbikgPT4gdm9pZDsgfSB7XHJcbiAgICBjb25zdCBzcGlubmVycyA9IFtcclxuICAgICAgICBcInwvLVxcXFxcIixcclxuICAgICAgICBcIuKUpOKUmOKUtOKUlOKUnOKUjOKUrOKUkFwiLFxyXG4gICAgICAgIFwi4pei4pej4pek4pelXCIsXHJcbiAgICAgICAgXCLiloziloDilpDiloRcIixcclxuICAgICAgICBcIuKWieKWiuKWi+KWjOKWjeKWjuKWj+KWjuKWjeKWjOKWi+KWiuKWiVwiLFxyXG4gICAgICAgIFwi4paB4paD4paE4paF4paG4paH4paI4paH4paG4paF4paE4paDXCIsXHJcbiAgICAgICAgXCLimLHimLLimLRcIixcclxuICAgICAgICBcIi5vT0AqXCIsXHJcbiAgICAgICAgXCLil5Dil5Pil5Hil5JcIixcclxuICAgICAgICAvLy8vXHJcbiAgICAgICAgXCLil6Hil6Eg4oqZ4oqZIOKXoOKXoFwiLFxyXG4gICAgICAgIFwi4pag4pah4paq4parXCIsXHJcbiAgICAgICAgXCLihpDihpbihpHihpfihpLihpjihpPihplcIixcclxuICAgICAgICBcIi5vT8KwT28uXCIsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZm10ID0gZm9ybWF0IHx8IFwiJXNcIjtcclxuICAgIGNvbnN0IHNwaW5uZXIgPSBuZXcgU3Bpbm5lcihmbXQpO1xyXG4gICAgY29uc3QgaWR4ID0gKG51bGwgIT0gaW5kZXggJiYgMCA8PSBpbmRleCAmJiBpbmRleCA8IDE0KSA/IGluZGV4IDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgc3Bpbm5lci5zZXRTcGlubmVyU3RyaW5nKHNwaW5uZXJzW2lkeF0pO1xyXG4gICAgcmV0dXJuIHNwaW5uZXI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9uc1xyXG4gKiBAYnJpZWYgbm9ybWFsaXplVGV4dCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBlb2w/OiBzdHJpbmc7ICAgLy8gZGVmYXVsdDogb3MuRU9MXHJcbiAgICBib20/OiBib29sZWFuOyAgLy8gZGVmYXVsdDogdHJ1ZVxyXG4gICAgdGFiPzogbnVtYmVyOyAgIC8vIHRhYiDjgpLlpInmj5vjgZnjgovjgrnjg5rjg7zjgrnjga7mlbDjgpLmjIflrpouIGRlZmF1bHQ6IOWkieaPm+OBl+OBquOBhFxyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIHRleHQgbGluZS1mZWVkLlxyXG4gKiBmb3Igd2luZG93cyBnaXQgdXNlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgIHRleHQgICAgICBpbnB1dCB0ZXh0LlxyXG4gKiBAcGFyYW0gIHtOb3JtYWxpemVUZXh0T3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbi5cclxuICogQHJldHVybiB7U3RyaW5nfSBub3JtYWxpemVkIHRleHQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBOb3JtYWxpemVUZXh0T3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IE5vcm1hbGl6ZVRleHRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFx1ZmVmZi9nbSwgXCJcIikgICAvLyByZW1vdmUgYm9tXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcclxcbi9nbSwgXCJcXG5cIikgICAgLy8gb25jZSBcIlxcblwiXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nbSwgXCJcXG5cIilcclxuICAgIDtcclxuXHJcbiAgICBpZiAob3B0LmJvbSkge1xyXG4gICAgICAgIHRleHQgPSBcIlxcdWZlZmZcIiArIHRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoXCJcXG5cIiAhPT0gb3B0LmVvbCkge1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nbSwgb3B0LmVvbCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0LnRhYikge1xyXG4gICAgICAgIGNvbnN0IHNwYWNlcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHQudGFiOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZ20sIHNwYWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnNcclxuICogQGJyaWVmIGV4ZWNDb21tYW5kKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9ucyBleHRlbmRzIFNwYXduT3B0aW9ucyB7XHJcbiAgICBzcGlubmVyPzoge1xyXG4gICAgICAgIGZvcm1hdD86IHN0cmluZzsgICAgLy8gZXgpIFwiJXNcIlxyXG4gICAgICAgIGluZGV4PzogbnVtYmVyOyAgICAgLy8gMCAtIDkg44Gu5pWw5YCk44KS5oyH5a6aXHJcbiAgICB9O1xyXG4gICAgc3Rkb3V0PzogKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIHN0ZGVycj86IChkYXRhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIGNvbW1hbmQgbGluZSBieSBzcGF3bi5cclxuICogY2FsbCBzcGF3bi4gaWYgZXJyb3Igb2NjdXJlZCwgY3VpIGlzIGtpbGxlZCBwcm9jY2Vzcy5cclxuICpcclxuICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgICAgICBjb21tYW5kICAgIG1haW4gY29tbWFuZC4gZXgpIFwiY29yZG92YVwiXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmdbXX0gICAgICAgICAgICAgYXJncyAgICAgICBjb21tYW5kIGFyZ3MuIGV4KSBbXCJwbHVnaW5cIiwgXCJhZGRcIiwgcGx1Z2luTmFtZV1cclxuICogQHBhcmFtICAge0V4ZWNDb21tYW5kT3B0aW9uc30gICBbb3B0aW9uc10gIGNsaS1zcGlubmVyXCJzIG9wdGlvbnMuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGVycm9yIGNvZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogRXhlY0NvbW1hbmRPcHRpb25zKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0OiBFeGVjQ29tbWFuZE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgICAgICBzdGRpbzogXCJpbmhlcml0XCIsXHJcbiAgICAgICAgICAgIHNwaW5uZXI6IHsgZm9ybWF0OiBcIiVzXCIgfSxcclxuICAgICAgICAgICAgc3Rkb3V0OiAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7IC8qIG5vb3AgKi8gfSxcclxuICAgICAgICAgICAgc3RkZXJyOiAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7IC8qIG5vb3AgKi8gfSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgd2hpY2goY29tbWFuZCwgKGVycm9yLCByZXNvbHZlZENvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcGlubmVyID0gb3B0LnNwaW5uZXIgPyBnZXRTcGlubmVyKG9wdC5zcGlubmVyLmZvcm1hdCwgb3B0LnNwaW5uZXIuaW5kZXgpIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzcGF3bihyZXNvbHZlZENvbW1hbmQsIGFyZ3MsIG9wdClcclxuICAgICAgICAgICAgICAgIC5vbihcImVycm9yXCIsIGhhbmRsZUVycm9yKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnN0b3AodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcInBpcGVcIiA9PT0gb3B0LnN0ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0LnN0ZG91dChkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0LnN0ZGVycihkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgQ29weVRlbXBsYXRlT3B0aW9uc1xyXG4gKiBAYnJpZWYgY29weVRwbCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgZGVsaW1pdGVycz86IFwie3sgfX1cIiB8IFwiPCUgJT5cIjsgLy8gdGVtcGxhdGUg44Gr5L2/55So44GZ44KLIGRlbGltaXRlci4gZGVmYXVsdDogXCJ7eyB9fVwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb3B5IHRlbXBsYXRlIHdpdGggaG9nYW4uXHJcbiAqIHN5bmMgZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgc3JjICAgICAgIHNvdXJjZSBmaWxlIHBhdGguXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgIGRzdCAgICAgICBkZXN0aW5hdGlvbiBmaWxlIHBhdGguXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgIHBhcmFtcyAgICB0ZW1wbGF0ZSBwYXJhbWV0ZXJzLlxyXG4gKiBAcGFyYW0ge0NvcHlUZW1wbGF0ZU9wdGlvbnN9ICBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29weVRwbChzcmM6IHN0cmluZywgZHN0OiBzdHJpbmcsIHBhcmFtczogT2JqZWN0LCBvcHRpb25zPzogQ29weVRlbXBsYXRlT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0ID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyhzcmMpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHQpO1xyXG4gICAgY29uc3Qgb3V0cHV0ID0gbm9ybWFsaXplVGV4dChqc3QucmVuZGVyKHBhcmFtcyksIG9wdCk7XHJcblxyXG4gICAgZnMuZW5zdXJlRmlsZVN5bmMoZHN0KTtcclxuICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0LCBvdXRwdXQsIFwidXRmOFwiKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBHVUlEIGdlbmVyYXRlLlxyXG4gKiByZXR1cm5lZCBhcyBXaW5kb3dzIHJlZ2lzdHJ5IHR5cGUgZm9ybWF0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR1VJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwie1wiICsgdXVpZC52NCgpLnRvVXBwZXJDYXNlKCkgKyBcIn1cIjtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgWE1MIERPTSBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0ciAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEByZXR1cm4ge2pRdWVyeX0gWE1MIE5vZGUgaW5zdGFuY2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzdHIyWG1sTm9kZShzdHI6IHN0cmluZyk6IEpRdWVyeSB7XHJcbiAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHN0cikpLmNoaWxkcmVuKCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnNcclxuICogQGJyaWVmIGZvcm1hdFhNTCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgc3RlcD86IG51bWJlcjsgICAvLyDnqbrnmb3jgrnjg5rjg7zjgrnmlbAuIGRlZmF1bHQ6IDJcclxufVxyXG5cclxuLyoqXHJcbiAqIFhNTCBmb3JtYXR0ZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgIHN0ciAgICAgICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHBhcmFtICB7Rm9ybWF0WG1sT3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBYTUxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRYTUwoc3RyOiBzdHJpbmcsIG9wdGlvbnM/OiBGb3JtYXRYbWxPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogRm9ybWF0WG1sT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIHN0ZXA6IDIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuICAgIGxldCB4bWwgPSBcIlwiO1xyXG4gICAgbGV0IHBhZCA9IDA7XHJcbiAgICBsZXQgaW5kZW50OiBudW1iZXI7XHJcbiAgICBsZXQgbm9kZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0IHN0ckFyciA9IG5vcm1hbGl6ZVRleHQoc3RyLCB7IGVvbDogXCJcXG5cIiB9KVxyXG4gICAgICAgIC5yZXBsYWNlKC8oPikoPCkoXFwvKikvZywgXCIkMVxcbiQyJDNcIikgLy8gaW5zZXJ0IExGIHRvIGVhY2ggbm9kZSBvbmNlLlxyXG4gICAgICAgIC5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBjb25zdCBzcGFjZXMgPSAobGVuOiBudW1iZXIpID0+IHtcclxuICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgX2luZGVudCA9IGxlbiAqIG9wdC5zdGVwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX2luZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgbm9kZSA9ICQudHJpbShzdHJBcnJbaV0pO1xyXG4gICAgICAgIGlmIChub2RlLm1hdGNoKC8uKzxcXC9cXHdbXj5dKj4kLykpIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFwvXFx3LykpIHtcclxuICAgICAgICAgICAgaWYgKHBhZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBhZCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcd1tePl0qW15cXC9dPi4qJC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgeG1sICs9IHNwYWNlcyhwYWQpICsgbm9kZSArIG9wdC5lb2w7XHJcbiAgICAgICAgcGFkICs9IGluZGVudDtcclxuICAgIH1cclxuXHJcbiAgICB4bWwgPSB4bWwucmVwbGFjZSgvXFxuXFxuL2dtLCBcIlxcblwiKTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplVGV4dCh4bWwsIG9wdCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy90b29scy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwib3NcIlxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNoYWxrXCIsXCJjb21tb25qczJcIjpcImNoYWxrXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjbGktc3Bpbm5lclwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn1cbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifVxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2xvYlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9XG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc2RvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwianNkb21cIixcImNvbW1vbmpzMlwiOlwianNkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlbXZlci1yZWdleFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwic2VtdmVyLXJlZ2V4XCIsXCJjb21tb25qczJcIjpcInNlbXZlci1yZWdleFwifVxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGljaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwid2hpY2hcIixcImNvbW1vbmpzMlwiOlwid2hpY2hcIn1cbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInhtbGRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwieG1sZG9tXCIsXCJjb21tb25qczJcIjpcInhtbGRvbVwifVxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaG9nYW4uanNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiSG9nYW5cIixcImNvbW1vbmpzXCI6XCJob2dhbi5qc1wiLFwiY29tbW9uanMyXCI6XCJob2dhbi5qc1wiLFwiYW1kXCI6XCJob2dhbi5qc1wifVxuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJsb2Rhc2hcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlLnN0cmluZ1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn1cbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpxdWVyeVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl19