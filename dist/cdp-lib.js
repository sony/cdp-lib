/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-06-16T07:24:45.631Z
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
            yield this.createDirectoryStructure();
            yield this.createProjectSettings();
            yield this.createSourceTemplate();
            yield this.createVisualStudioSolution();
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
    //___________________________________________________________________________________________________________________//
    /**
     * ディレクトリ構成情報のコピー
     */
    createDirectoryStructure() {
        // app base structure
        this.copyTplDir("mobile/structure/base");
        // lib
        if (this.config.projectStructure && 0 <= this.config.projectStructure.indexOf("lib")) {
            this.copyTplDir("mobile/structure/lib", path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.lib));
        }
        // porting
        if (this.config.projectStructure && 0 <= this.config.projectStructure.indexOf("porting")) {
            this.copyTplDir("mobile/structure/porting", path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.porting));
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
    }
    /**
     * プロジェクト設定ファイルの作成
     */
    createProjectSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            //// project.config.js
            //copyTpl(
            //    path.join(templatePath("library"), "_project.config.js"),
            //    path.join(this.rootDir, "project.config.js"),
            //    this._config,
            //    { delimiters: "<% %>" }
            //);
            //// tsconfig
            //if (!this.config.outputSameDir) {
            //    // main tsconfig.json
            //    copyTpl(
            //        path.join(templatePath("library"), "_tsconfig.json"),
            //        path.join(this.rootDir, "tsconfig.json"),
            //        this._config,
            //        { delimiters: "<% %>", bom: false, }
            //    );
            //    // test tsconfig.json
            //    copyTpl(
            //        path.join(templatePath("library"), "_tsconfig.test.json"),
            //        path.join(this.rootDir, this._config.structureConfig.test, "unit", "tsconfig.json"),
            //        this._config,
            //        { delimiters: "<% %>", bom: false, }
            //    );
            //} else {
            //    // main tsconfig.json
            //    copyTpl(
            //        path.join(templatePath("library"), "_tsconfig.output-same-dir.json"),
            //        path.join(this.rootDir, "tsconfig.json"),
            //        this._config,
            //        { delimiters: "<% %>", bom: false, }
            //    );
            //}
            //// eslintrc.json
            //copyTpl(
            //    path.join(templatePath("library"), "_eslintrc.json"),
            //    path.join(this.rootDir, this._config.structureConfig.test, "eslint", "eslintrc.json"),
            //    this.queryEsLintEnvParam(),
            //    { delimiters: "<% %>", bom: false, }
            //);
            //// testem
            //if (!this.config.nodejs) {
            //    copyTpl(
            //        path.join(templatePath("library/tools/testem"), "_testem.json"),
            //        path.join(this.rootDir, this._config.structureConfig.test, "runner", "testem.json"),
            //        this._config,
            //        { delimiters: "<% %>", bom: false, }
            //    );
            //    const testemStuffPath = templatePath("library/tools/testem/runner");
            //    glob.sync("**", {
            //        cwd: testemStuffPath,
            //        nodir: true,
            //    })
            //        .forEach((file) => {
            //            fs.copySync(
            //                path.join(testemStuffPath, file),
            //                path.join(this.rootDir, this._config.structureConfig.test, "runner", file)
            //            );
            //        });
            //}
            //// .gitignore
            //copyTpl(
            //    path.join(templatePath("library"), ".gitignore"),
            //    path.join(this.rootDir, ".gitignore"),
            //    this._config,
            //    { bom: false, }
            //);
            //// README.md
            //copyTpl(
            //    path.join(templatePath("library"), "_README.md"),
            //    path.join(this.rootDir, "README.md"),
            //    this._config,
            //    { delimiters: "<% %>" }
            //);
            //// package.json
            //this.config.devDependencies = await this.queryDependenciesParam(this.config.devDependencies || this.defaultDevDependencies);
            //copyTpl(
            //    path.join(templatePath("library"), "_package.json"),
            //    path.join(this.rootDir, "package.json"),
            //    this._config,
            //    { delimiters: "<% %>", bom: false, }
            //);
        });
    }
    /**
     * ソースの雛形作成
     */
    createSourceTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            //const _module = path.basename(this._config.moduleName, ".js");
            //const param = {
            //    sampleClass: _.classify(_module),
            //    sampleModule: _module,
            //    built: this._config.structureConfig.built,
            //};
            //const script = (() => {
            //    if (this._config.structureConfig.srcConfig) {
            //        return this._config.structureConfig.srcConfig.script || "";
            //    }
            //    return "";
            //})();
            //// index.ts
            //copyTpl(
            //    path.join(templatePath("library"), "src", "_index.ts"),
            //    path.join(this.rootDir, this._config.structureConfig.src, script, _module + ".ts"),
            //    param,
            //    { delimiters: "<% %>" }
            //);
            //// index.spec.ts
            //copyTpl(
            //    path.join(templatePath("library"), "src", "_index.spec.ts"),
            //    path.join(this.rootDir, this._config.structureConfig.test, "unit", _module + ".spec.ts"),
            //    param,
            //    { delimiters: "<% %>" }
            //);
        });
    }
    /**
     * Visual Studio のソリューションファイル作成
     */
    createVisualStudioSolution() {
        return __awaiter(this, void 0, void 0, function* () {
            //const vsParam = (() => {
            //    const createGUID = Utils.createGUID;
            //    const param: IVisualStudioConfigration = $.extend({}, this._config.structureConfig);
            //    param.projectName = this._config.projectName;
            //    param.projectGUID = createGUID();
            //    param.types = param.types.replace("@", "%40"); // escape "@" to "%40"
            //    param.mainBaseName = this._config.mainBaseName;
            //    param.license = !this._config.private;
            //    // tools
            //    param.webpack = this.isEnableTool("webpack");
            //    param.testem = !this.config.nodejs;
            //    param.outputSameDir = this.config.outputSameDir;
            //    // setup built js group
            //    param.jsGroup = [];
            //    if (!param.outputSameDir) {
            //        param.jsGroup.push({
            //            relativePath: param.built + "\\",
            //            fileName: param.mainBaseName,
            //            dependee: true,
            //            d_ts: true,
            //            map: true,
            //            min_map: false,
            //        });
            //    }
            //    if (this.config.minify) {
            //        // setup pkg group
            //        param.jsGroup.push({
            //            relativePath: param.pkg + "\\",
            //            fileName: param.mainBaseName,
            //            dependee: false,
            //            d_ts: false,
            //            map: false,
            //            min_map: true,
            //        });
            //    }
            //    // setup test js group
            //    param.tsGroup = [
            //        {
            //            relativePath: param.test + "\\unit\\",
            //            fileName: param.mainBaseName + ".spec",
            //            dependee: true,
            //            map: this.config.outputSameDir,
            //        },
            //    ];
            //    if (param.outputSameDir) {
            //        param.tsGroup.push({
            //            relativePath: param.built + "\\",
            //            fileName: param.mainBaseName,
            //            dependee: false,
            //            map: true,
            //        });
            //    }
            //    return param;
            //})();
            //// .sln
            //copyTpl(
            //    path.join(templatePath("base/visual.studio"), "_solution.sln.tpl"),
            //    path.join(this.rootDir, vsParam.projectName + ".sln"),
            //    vsParam,
            //    { delimiters: "<% %>" }
            //);
            //// .csproj
            //(() => {
            //    const toXmlString = (file: string) => {
            //        const hogan = Utils.hogan;
            //        const normalizeText = Utils.normalizeText;
            //        const options = {
            //            eol: os.EOL,
            //            bom: true,
            //            delimiters: "{{ }}",
            //        };
            //        const tpl = path.join(templatePath("base/visual.studio"), file);
            //        const jst = hogan.compile(normalizeText(fs.readFileSync(tpl).toString(), { eol: "\n", bom: false }), options);
            //        return jst.render(vsParam);
            //    };
            //    const toXmlDOM = (file: string) => {
            //        return $($.parseXML(toXmlString(file)));
            //    };
            //    const toXmlNode = (file: string) => {
            //        return Utils.str2XmlNode(toXmlString(file));
            //    };
            //    const $proj = toXmlDOM("_project.csproj.tpl");
            //    const $gpTS = toXmlNode("_ts.item.group.tpl");
            //    const $gpJS = toXmlNode("_js.item.group.tpl");
            //    $proj
            //        .find("ItemGroup")
            //        .last()
            //        .after($gpTS)
            //        .after($gpJS)
            //        ;
            //    const formatXML = Utils.formatXML;
            //    const dstPath = path.join(this.rootDir, vsParam.projectName + ".csproj");
            //    debug(Utils.xmlNode2Str($proj));
            //    fs.writeFileSync(dstPath, formatXML(Utils.xmlNode2Str($proj)));
            //})();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDQwYjY3ZTY3M2NmODczMzQ5NTQiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJvc1wiIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7QUNEakMsaUM7Ozs7Ozs7Ozs7OztBQ0FBLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQXlDM0IsZ0JBQUU7QUF4Q04scUNBQTZCO0FBeUN6QixvQkFBSTtBQXhDUixzQ0FBa0M7QUF5QzlCLHNCQUFLO0FBeENULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCxxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUErQjtBQXlDM0Isc0JBQUs7QUF4Q1QsNENBQTRDO0FBeUN4QyxrQ0FBVztBQXhDZiw4Q0FBc0M7QUF5Q2xDLGtCQXpDSyxxQkFBTyxDQXlDTDtBQXZDWCxNQUFNLENBQUMsR0FBaUIsQ0FBQztJQUNyQixNQUFNLE9BQU8sR0FBRyxDQUFDO1FBQ2IsTUFBTSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxFQUFPLENBQUMsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxVQUFVLEtBQUssT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO1FBQ3BDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO1FBQ3JDLENBQUM7SUFDTCxDQUFDLENBQUMsRUFBRSxDQUFDO0lBRUwsZUFBZTtJQUNmLENBQUMsQ0FBQyxJQUFTO1FBQ1A7Ozs7V0FJRztRQUNILE1BQU0sTUFBTSxHQUFHLG1CQUFPLENBQUMsRUFBUSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2xDLHlEQUF5RDtRQUNuRCxNQUFPLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUM1RSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVaLE1BQU0sQ0FBQyxtQkFBTyxDQUFDLEVBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFTRCxjQUFDO0FBTkwsTUFBTSxFQUFFLEdBQWlDLEVBQUUsQ0FBQyxLQUFLLENBQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFPM0QsZUFBQzs7Ozs7Ozs7OztBQzdDWCxvQ0FBNkI7QUFDN0Isc0NBQStCO0FBYy9CLElBQUksU0FBUyxHQUFvQjtJQUM3QixLQUFLLEVBQUUsS0FBSztJQUNaLE9BQU8sRUFBRSxLQUFLO0lBQ2QsTUFBTSxFQUFFLEtBQUs7SUFDYixJQUFJLEVBQUUsT0FBTztDQUNoQixDQUFDO0FBRUYsSUFBSSxRQUFnQixDQUFDLENBQUcsdUJBQXVCO0FBRS9DLHVFQUF1RTtBQUN2RSxtQkFBbUI7QUFFbkI7Ozs7R0FJRztBQUNIO0lBQ0ksTUFBTSxDQUFDLFFBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCxrQ0FFQztBQUVEOzs7O0dBSUc7QUFDSCxxQkFBNEIsUUFBeUI7SUFDakQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNYLFNBQVMsQ0FBQyxLQUFLLEdBQU8sUUFBUSxDQUFDLEtBQUssSUFBVyxTQUFTLENBQUMsS0FBSyxDQUFDO1FBQy9ELFNBQVMsQ0FBQyxPQUFPLEdBQUssUUFBUSxDQUFDLE9BQU8sSUFBUyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2pFLFNBQVMsQ0FBQyxNQUFNLEdBQU0sUUFBUSxDQUFDLE1BQU0sSUFBVSxTQUFTLENBQUMsTUFBTSxDQUFDO1FBQ2hFLFNBQVMsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsSUFBTyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ25FLFNBQVMsQ0FBQyxJQUFJLEdBQVEsUUFBUSxDQUFDLElBQUksSUFBWSxTQUFTLENBQUMsSUFBSSxDQUFDO0lBQ2xFLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLFNBQVMsR0FBRztZQUNSLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLEtBQUs7WUFDZCxNQUFNLEVBQUUsS0FBSztZQUNiLElBQUksRUFBRSxPQUFPO1NBQ2hCLENBQUM7SUFDTixDQUFDO0FBQ0wsQ0FBQztBQWZELGtDQWVDO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNkLFFBQVEsR0FBRyxTQUFTLENBQUM7UUFDckIsT0FBTyxJQUFJLEVBQUUsQ0FBQztZQUNWLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7WUFDRCxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDckMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDN0MsRUFBRSxDQUFDLENBQUMsU0FBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQ2pCLEtBQUssQ0FBQztZQUNWLENBQUM7WUFDRCxLQUFLLEVBQUUsQ0FBQztRQUNaLENBQUM7SUFDTCxDQUFDO0lBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNwQixDQUFDO0FBbkJELGdDQW1CQztBQUVEOzs7O0dBSUc7QUFDSDtJQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBQy9CLENBQUM7QUFGRCxvQ0FFQztBQUVEOzs7Ozs7R0FNRztBQUNILGFBQW9CLE9BQWdCLEVBQUUsR0FBRyxjQUFxQjtJQUMxRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3pCLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQVJELGtCQVFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsZUFBc0IsT0FBZ0IsRUFBRSxHQUFHLGNBQXFCO0lBQzVELEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7SUFDTCxDQUFDO0FBQ0wsQ0FBQztBQVJELHNCQVFDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILGdCQUF1QixJQUFjLEVBQUUsT0FBZ0IsRUFBRSxHQUFHLGNBQXFCO0lBQzdFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNSLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDMUMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUIsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFDM0MsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDM0IsQ0FBQztZQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsQ0FBQztJQUNMLENBQUM7QUFDTCxDQUFDO0FBakJELHdCQWlCQztBQUVELElBQUksS0FBVSxDQUFDO0FBRWY7Ozs7O0dBS0c7QUFDSCxtQkFBMEIsR0FBVztJQUNqQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDVCxJQUFJLENBQUM7WUFDRCxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFFLENBQUMsWUFBWSxDQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLGFBQWEsRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FDckcsQ0FBQztRQUNOLENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxLQUFLLENBQUMsc0NBQXNDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDTCxDQUFDO0lBRUQsSUFBSSxPQUFPLEdBQUcsUUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbEMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEIsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsS0FBSyxFQUFFLDBCQUEwQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUF2QkQsOEJBdUJDOzs7Ozs7Ozs7QUN6TEQsc0RBQXNEO0FBQ3RELG1DQUFtQzs7Ozs7Ozs7OztBQUVuQyxzQ0FBb0U7QUFHcEU7OztHQUdHO0FBQ0gsdUJBQStCLFNBQVEsb0JBQWE7SUFFaEQsdUVBQXVFO0lBQ3ZFLDZCQUE2QjtJQUU3Qjs7T0FFRztJQUNILG9CQUFvQjtRQUNoQixNQUFNLENBQUM7WUFDSCxHQUFHLEVBQUUsS0FBSztZQUNWLEdBQUcsRUFBRSxTQUFTO1lBQ2QsS0FBSyxFQUFFLEtBQUs7WUFDWixHQUFHLEVBQUUsTUFBTTtZQUNYLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsUUFBUTtZQUNmLFNBQVMsRUFBRTtnQkFDUCxNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFLGFBQWE7Z0JBQ3pCLFFBQVEsRUFBRSxXQUFXO2FBQ3hCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDRyxNQUFNOztZQUNSLFFBQVE7WUFDUixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0gsSUFBSSxRQUFRO1FBQ1IsTUFBTSxDQUFDO1lBQ0gsV0FBVztZQUNYLFVBQVU7WUFDVixXQUFXO1lBQ1gsbUJBQW1CO1lBQ25CLHVCQUF1QjtTQUMxQixDQUFDO0lBQ04sQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxtQkFBbUI7SUFFbkI7O09BRUc7SUFDSCxJQUFZLE1BQU07UUFDZCxNQUFNLENBQTBCLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDakQsQ0FBQztDQUNKO0FBeERELDhDQXdEQzs7Ozs7Ozs7Ozs7OztBQ2pFRCxxREFBMEQ7QUFHMUQsaUNBQXNDO0FBRXRDOztHQUVHO0FBQ0gsNkJBQW9DLE1BQTRCO0lBQzVELE1BQU0sQ0FBQyxJQUFJLHVDQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFGRCxrREFFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEQsb0NBQTZCO0FBQzdCLG1DQUF5QjtBQUN6QixzQ0FNaUI7QUFHakIsTUFBTSxFQUFFLEdBQWMsWUFBSyxDQUFDLEVBQUUsQ0FBQztBQUMvQixNQUFNLElBQUksR0FBWSxZQUFLLENBQUMsSUFBSSxDQUFDO0FBQ2pDLE1BQU0sQ0FBQyxHQUFlLFlBQUssQ0FBQyxDQUFDLENBQUM7QUFDOUIsTUFBTSxDQUFDLEdBQWUsWUFBSyxDQUFDLENBQUMsQ0FBQztBQUM5QixNQUFNLEtBQUssR0FBVyxZQUFLLENBQUMsS0FBSyxDQUFDO0FBQ2xDLE1BQU0sWUFBWSxHQUFJLFlBQUssQ0FBQyxZQUFZLENBQUM7QUFDekMsTUFBTSxPQUFPLEdBQVMsWUFBSyxDQUFDLE9BQU8sQ0FBQztBQUVwQzs7O0dBR0c7QUFDSCxxQkFBNkIsU0FBUSxvQkFBYTtJQUU5Qyx1RUFBdUU7SUFDdkUsNkJBQTZCO0lBRTdCOztPQUVHO0lBQ0gsb0JBQW9CO1FBQ2hCLE1BQU0sQ0FBQztZQUNILEdBQUcsRUFBRSxLQUFLO1lBQ1YsR0FBRyxFQUFFLE1BQU07WUFDWCxLQUFLLEVBQUUsT0FBTztZQUNkLEdBQUcsRUFBRSxNQUFNO1lBQ1gsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsT0FBTztZQUNiLEtBQUssRUFBRSxRQUFRO1lBQ2YsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDRyxNQUFNOztZQUNSLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztZQUN0QyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1lBQ25DLE1BQU0sSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDbEMsTUFBTSxJQUFJLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztRQUM1QyxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNILElBQUksUUFBUTtRQUNSLE1BQU0sQ0FBQztZQUNILFdBQVc7WUFDWCxVQUFVO1lBQ1YsV0FBVztZQUNYLHFCQUFxQjtZQUNyQixtQkFBbUI7U0FDdEIsQ0FBQztJQUNOLENBQUM7SUFFRCx1RUFBdUU7SUFDdkUscUJBQXFCO0lBRXJCOzs7OztPQUtHO0lBQ0gsSUFBYyxzQkFBc0I7UUFDaEMsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQztZQUNoRCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBUSxPQUFPLEVBQUUsU0FBUyxHQUFHO1lBQ3JELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBWSxPQUFPLEVBQUUsU0FBUyxHQUFHO1lBQ3JELEVBQUUsSUFBSSxFQUFFLHNCQUFzQixFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQUc7U0FDeEQsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFHLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxtQkFBbUI7SUFFbkI7O09BRUc7SUFDSCxJQUFZLE1BQU07UUFDZCxNQUFNLENBQXVCLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssaUJBQWlCO1FBQ3JCLGNBQWM7UUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsaUNBQWlDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztZQUNyRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0UsQ0FBQztRQUNMLENBQUM7UUFDRCxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFL0MsaUJBQWlCO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEQsQ0FBQztRQUNELEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7T0FFRztJQUNLLHdCQUF3QjtRQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVEOztPQUVHO0lBQ1cscUJBQXFCOztZQUMvQixvQkFBb0I7WUFDcEIsT0FBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLG9CQUFvQixDQUFDLEVBQ3hELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxtQkFBbUIsQ0FBQyxFQUM1QyxJQUFJLENBQUMsT0FBTyxFQUNaLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUMxQixDQUFDO1lBRUYsV0FBVztZQUNYLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxFQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLEVBQ3hDLElBQUksQ0FBQyxPQUFPLEVBQ1osRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FDdkMsQ0FBQztnQkFDRixxQkFBcUI7Z0JBQ3JCLE9BQU8sQ0FDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxxQkFBcUIsQ0FBQyxFQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxlQUFlLENBQUMsRUFDbkYsSUFBSSxDQUFDLE9BQU8sRUFDWixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxDQUN2QyxDQUFDO1lBQ04sQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLHFCQUFxQjtnQkFDckIsT0FBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGdDQUFnQyxDQUFDLEVBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxlQUFlLENBQUMsRUFDeEMsSUFBSSxDQUFDLE9BQU8sRUFDWixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxDQUN2QyxDQUFDO1lBQ04sQ0FBQztZQUVELGdCQUFnQjtZQUNoQixPQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsRUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsZUFBZSxDQUFDLEVBQ3JGLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUMxQixFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEtBQUssR0FBRyxDQUN2QyxDQUFDO1lBRUYsU0FBUztZQUNULEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixPQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsc0JBQXNCLENBQUMsRUFBRSxjQUFjLENBQUMsRUFDL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLEVBQ25GLElBQUksQ0FBQyxPQUFPLEVBQ1osRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FDdkMsQ0FBQztnQkFFRixNQUFNLGVBQWUsR0FBRyxZQUFZLENBQUMsNkJBQTZCLENBQUMsQ0FBQztnQkFFcEUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1osR0FBRyxFQUFFLGVBQWU7b0JBQ3BCLEtBQUssRUFBRSxJQUFJO2lCQUNkLENBQUM7cUJBQ0csT0FBTyxDQUFDLENBQUMsSUFBSTtvQkFDVixFQUFFLENBQUMsUUFBUSxDQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxFQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FDN0UsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztZQUNYLENBQUM7WUFFRCxhQUFhO1lBQ2IsT0FBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQ3JDLElBQUksQ0FBQyxPQUFPLEVBQ1osRUFBRSxHQUFHLEVBQUUsS0FBSyxHQUFHLENBQ2xCLENBQUM7WUFFRixZQUFZO1lBQ1osT0FBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxFQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDLEVBQ3BDLElBQUksQ0FBQyxPQUFPLEVBQ1osRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLENBQzFCLENBQUM7WUFFRixlQUFlO1lBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLEdBQUcsTUFBTSxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDNUgsT0FBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLGVBQWUsQ0FBQyxFQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLEVBQ3ZDLElBQUksQ0FBQyxPQUFPLEVBQ1osRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FDdkMsQ0FBQztRQUNOLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1csb0JBQW9COztZQUM5QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzlELE1BQU0sS0FBSyxHQUFHO2dCQUNWLFdBQVcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQztnQkFDaEMsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxLQUFLO2FBQzVDLENBQUM7WUFFRixNQUFNLE1BQU0sR0FBRyxDQUFDO2dCQUNaLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztnQkFDL0QsQ0FBQztnQkFDRCxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVMLFdBQVc7WUFDWCxPQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxFQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLEdBQUcsS0FBSyxDQUFDLEVBQ2xGLEtBQUssRUFDTCxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FDMUIsQ0FBQztZQUVGLGdCQUFnQjtZQUNoQixPQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEVBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sR0FBRyxVQUFVLENBQUMsRUFDeEYsS0FBSyxFQUNMLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUMxQixDQUFDO1FBQ04sQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVywwQkFBMEI7O1lBQ3BDLE1BQU0sT0FBTyxHQUFHLENBQUM7Z0JBQ2IsTUFBTSxVQUFVLEdBQUcsWUFBSyxDQUFDLFVBQVUsQ0FBQztnQkFFcEMsTUFBTSxLQUFLLEdBQThCLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRXBGLEtBQUssQ0FBQyxXQUFXLEdBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUM7Z0JBQ25ELEtBQUssQ0FBQyxXQUFXLEdBQVMsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxLQUFLLEdBQWUsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsc0JBQXNCO2dCQUNqRixLQUFLLENBQUMsWUFBWSxHQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO2dCQUNwRCxLQUFLLENBQUMsT0FBTyxHQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBRWhELFFBQVE7Z0JBQ1IsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUM3QyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBRW5DLEtBQUssQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUM7Z0JBRWhELHVCQUF1QjtnQkFDdkIsS0FBSyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Z0JBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO3dCQUNmLFlBQVksRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUk7d0JBQ2hDLFFBQVEsRUFBRSxLQUFLLENBQUMsWUFBWTt3QkFDNUIsUUFBUSxFQUFFLElBQUk7d0JBQ2QsSUFBSSxFQUFFLElBQUk7d0JBQ1YsR0FBRyxFQUFFLElBQUk7d0JBQ1QsT0FBTyxFQUFFLEtBQUs7cUJBQ2pCLENBQUMsQ0FBQztnQkFDUCxDQUFDO2dCQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDckIsa0JBQWtCO29CQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzt3QkFDZixZQUFZLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJO3dCQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFlBQVk7d0JBQzVCLFFBQVEsRUFBRSxLQUFLO3dCQUNmLElBQUksRUFBRSxLQUFLO3dCQUNYLEdBQUcsRUFBRSxLQUFLO3dCQUNWLE9BQU8sRUFBRSxJQUFJO3FCQUNoQixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxzQkFBc0I7Z0JBQ3RCLEtBQUssQ0FBQyxPQUFPLEdBQUc7b0JBQ1o7d0JBQ0ksWUFBWSxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsVUFBVTt3QkFDckMsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZLEdBQUcsT0FBTzt3QkFDdEMsUUFBUSxFQUFFLElBQUk7d0JBQ2QsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYTtxQkFDakM7aUJBQ0osQ0FBQztnQkFDRixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDdEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7d0JBQ2YsWUFBWSxFQUFFLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSTt3QkFDaEMsUUFBUSxFQUFFLEtBQUssQ0FBQyxZQUFZO3dCQUM1QixRQUFRLEVBQUUsS0FBSzt3QkFDZixHQUFHLEVBQUUsSUFBSTtxQkFDWixDQUFDLENBQUM7Z0JBQ1AsQ0FBQztnQkFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFTCxPQUFPO1lBQ1AsT0FBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsbUJBQW1CLENBQUMsRUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLEVBQ3JELE9BQU8sRUFDUCxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FDMUIsQ0FBQztZQUVGLFVBQVU7WUFDVixDQUFDO2dCQUNHLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBWTtvQkFDN0IsTUFBTSxLQUFLLEdBQUcsWUFBSyxDQUFDLEtBQUssQ0FBQztvQkFDMUIsTUFBTSxhQUFhLEdBQUcsWUFBSyxDQUFDLGFBQWEsQ0FBQztvQkFDMUMsTUFBTSxPQUFPLEdBQUc7d0JBQ1osR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHO3dCQUNYLEdBQUcsRUFBRSxJQUFJO3dCQUNULFVBQVUsRUFBRSxPQUFPO3FCQUN0QixDQUFDO29CQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ2hFLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM5RyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxDQUFDO2dCQUVGLE1BQU0sUUFBUSxHQUFHLENBQUMsSUFBWTtvQkFDMUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLENBQUMsQ0FBQztnQkFFRixNQUFNLFNBQVMsR0FBRyxDQUFDLElBQVk7b0JBQzNCLE1BQU0sQ0FBQyxZQUFLLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUM7Z0JBRUYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLENBQUM7Z0JBQzlDLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO2dCQUM5QyxNQUFNLEtBQUssR0FBRyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFFOUMsS0FBSztxQkFDQSxJQUFJLENBQUMsV0FBVyxDQUFDO3FCQUNqQixJQUFJLEVBQUU7cUJBQ04sS0FBSyxDQUFDLEtBQUssQ0FBQztxQkFDWixLQUFLLENBQUMsS0FBSyxDQUFDLENBQ1o7Z0JBRUwsTUFBTSxTQUFTLEdBQUcsWUFBSyxDQUFDLFNBQVMsQ0FBQztnQkFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUM7Z0JBQ3pFLEtBQUssQ0FBQyxZQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEVBQUUsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxZQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0NBQ0o7QUF0V0QsMENBc1dDOzs7Ozs7Ozs7Ozs7O0FDNVhELGtEQUFxRDtBQUdyRCxpQ0FBbUM7QUFFbkM7O0dBRUc7QUFDSCw2QkFBb0MsTUFBNEI7SUFDNUQsTUFBTSxDQUFDLElBQUksa0NBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRkQsa0RBRUM7Ozs7Ozs7OztBQ1hELHNEQUFzRDtBQUN0RCxtQ0FBbUM7Ozs7Ozs7Ozs7QUFFbkMsb0NBQTZCO0FBRTdCLHVDQWFxQjtBQUNyQixzQ0FLaUI7QUFHakI7OztHQUdHO0FBQ0gsc0JBQThCLFNBQVEsb0JBQWE7SUFFL0MsdUVBQXVFO0lBQ3ZFLDZCQUE2QjtJQUU3Qjs7T0FFRztJQUNILG9CQUFvQjtRQUNoQixNQUFNLENBQUM7WUFDSCxHQUFHLEVBQUUsS0FBSztZQUNWLEdBQUcsRUFBRSxLQUFLO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixHQUFHLEVBQUUsTUFBTTtZQUNYLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsUUFBUTtZQUNmLElBQUksRUFBRSxPQUFPO1lBQ2IsR0FBRyxFQUFFLEtBQUs7WUFDVixRQUFRLEVBQUUsVUFBVTtZQUNwQixPQUFPLEVBQUUsU0FBUztZQUNsQixHQUFHLEVBQUUsS0FBSztZQUNWLFNBQVMsRUFBRTtnQkFDUCxNQUFNLEVBQUUsU0FBUztnQkFDakIsVUFBVSxFQUFFLGFBQWE7Z0JBQ3pCLFFBQVEsRUFBRSxXQUFXO2FBQ3hCO1NBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7O09BR0c7SUFDRyxNQUFNOztZQUNSLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUM7WUFDSCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFdBQVc7WUFDWCxxQkFBcUI7WUFDckIsbUJBQW1CO1NBQ3RCLENBQUM7SUFDTixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLHFCQUFxQjtJQUVyQjs7Ozs7T0FLRztJQUNILElBQWMsc0JBQXNCO1FBQ2hDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxNQUFNLENBQUM7WUFDaEQsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQU8sT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBUSxPQUFPLEVBQUUsU0FBUyxHQUFHO1lBQ3JELEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBUyxPQUFPLEVBQUUsU0FBUyxHQUFHO1lBQ3JELEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFNLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFTLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUssT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxjQUFjLEVBQVUsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQWEsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQWMsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxlQUFlLEVBQVMsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxXQUFXLEVBQWEsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxhQUFhLEVBQVcsT0FBTyxFQUFFLFNBQVMsR0FBRztTQUN4RCxDQUFDLENBQUM7UUFFSCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTTtZQUN2QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFNBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxtQkFBbUI7SUFFbkI7O09BRUc7SUFDSCxJQUFZLE1BQU07UUFDZCxNQUFNLENBQXlCLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ1csc0JBQXNCOztZQUNoQyxNQUFNLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUUxRCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQixNQUFNLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO2dCQUNuQyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDN0IsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztnQkFDdEMsTUFBTSxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFFRCxNQUFNLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7WUFDbkMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUNsQyxNQUFNLElBQUksQ0FBQywwQkFBMEIsRUFBRSxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVELHVIQUF1SDtJQUV2SDs7T0FFRztJQUNXLHFCQUFxQjs7WUFDL0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO1lBQzdELGFBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBRS9CLHVFQUF1RTtZQUN2RSxNQUFNLG1CQUFXLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUUxRyxlQUFlO1lBQ2YsWUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ2xCLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVc7YUFDL0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUk7Z0JBQ1osVUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDNUQsQ0FBQyxDQUFDLENBQUM7WUFDSCxVQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6RCxVQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUVoRSxzQkFBc0I7WUFDdEIsVUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUMzQyxVQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVyxlQUFlOztZQUN6QixJQUFJLENBQUMsUUFBUSxDQUFDLHVDQUF1QyxDQUFDLENBQUM7WUFDdkQsYUFBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFFekIsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDN0QsTUFBTSxhQUFhLEdBQUcsU0FBQyxDQUFDLG1CQUFXLENBQUMsVUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFaEYsYUFBYTtpQkFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUNkLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7aUJBQ3BDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztpQkFDakQsT0FBTyxDQUFDLG1CQUFXLENBQUM7Ozs7YUFJcEIsQ0FBQyxDQUFDLENBQ0Y7WUFFTCxrQ0FBa0M7WUFDbEMsYUFBYTtpQkFDUixJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUNuQixNQUFNLEVBQUUsQ0FBQztZQUNkLGFBQWE7aUJBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDZCxNQUFNLEVBQUUsQ0FBQztZQUVkLFVBQUUsQ0FBQyxhQUFhLENBQUMsYUFBYSxFQUFFLGlCQUFTLENBQUMsbUJBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVyxtQkFBbUI7O1lBQzdCLGFBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBRTdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLFFBQVEsS0FBSyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDN0IsQ0FBQztZQUNMLENBQUM7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLG9DQUFvQyxDQUFDLENBQUM7WUFFcEQsdUNBQXVDO1lBQ3ZDLE1BQU0sbUJBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNwRixDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNXLGlCQUFpQjs7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2xELGFBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRTNCOzs7Ozs7O2VBT0c7WUFDSCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ2hFLHFEQUFxRDtnQkFDckQsTUFBTSxtQkFBVyxDQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4RixDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVyx3QkFBd0I7O1lBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMscUNBQXFDLENBQUMsQ0FBQztZQUNyRCxhQUFLLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDdEMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDVyx1QkFBdUI7O1lBQ2pDLEVBQUUsQ0FBQyxDQUFDLFVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFFMUYsa0NBQWtDO2dCQUNsQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2dCQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDO2dCQUMzQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2dCQUM5QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO2dCQUM3QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDO2dCQUU5QyxjQUFjO2dCQUNkLFVBQUUsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNwQyxDQUFDO1FBQ0wsQ0FBQztLQUFBO0lBRUQsdUhBQXVIO0lBRXZIOztPQUVHO0lBQ0ssd0JBQXdCO1FBQzVCLHFCQUFxQjtRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFekMsTUFBTTtRQUNOLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixJQUFJLENBQUMsVUFBVSxDQUNYLHNCQUFzQixFQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUM1RixDQUFDO1FBQ04sQ0FBQztRQUVELFVBQVU7UUFDVixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLFVBQVUsQ0FDWCwwQkFBMEIsRUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDaEcsQ0FBQztZQUVGLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztZQUM1RCxVQUFFLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQztpQkFDekIsT0FBTyxDQUFDLENBQUMsUUFBUTtnQkFDZCxFQUFFLENBQUMsQ0FBQyxVQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNqRSxJQUFJLENBQUMsVUFBVSxDQUNYLDBCQUEwQixFQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQzNFLENBQUM7Z0JBQ04sQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQztRQUVELE1BQU07UUFDTixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixVQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxVQUFFLENBQUMsUUFBUSxDQUFDLG9CQUFZLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRUQ7O09BRUc7SUFDVyxxQkFBcUI7O1lBQy9CLHNCQUFzQjtZQUN0QixVQUFVO1lBQ1YsK0RBQStEO1lBQy9ELG1EQUFtRDtZQUNuRCxtQkFBbUI7WUFDbkIsNkJBQTZCO1lBQzdCLElBQUk7WUFFSixhQUFhO1lBQ2IsbUNBQW1DO1lBQ25DLDJCQUEyQjtZQUMzQixjQUFjO1lBQ2QsK0RBQStEO1lBQy9ELG1EQUFtRDtZQUNuRCx1QkFBdUI7WUFDdkIsOENBQThDO1lBQzlDLFFBQVE7WUFDUiwyQkFBMkI7WUFDM0IsY0FBYztZQUNkLG9FQUFvRTtZQUNwRSw4RkFBOEY7WUFDOUYsdUJBQXVCO1lBQ3ZCLDhDQUE4QztZQUM5QyxRQUFRO1lBQ1IsVUFBVTtZQUNWLDJCQUEyQjtZQUMzQixjQUFjO1lBQ2QsK0VBQStFO1lBQy9FLG1EQUFtRDtZQUNuRCx1QkFBdUI7WUFDdkIsOENBQThDO1lBQzlDLFFBQVE7WUFDUixHQUFHO1lBRUgsa0JBQWtCO1lBQ2xCLFVBQVU7WUFDViwyREFBMkQ7WUFDM0QsNEZBQTRGO1lBQzVGLGlDQUFpQztZQUNqQywwQ0FBMEM7WUFDMUMsSUFBSTtZQUVKLFdBQVc7WUFDWCw0QkFBNEI7WUFDNUIsY0FBYztZQUNkLDBFQUEwRTtZQUMxRSw4RkFBOEY7WUFDOUYsdUJBQXVCO1lBQ3ZCLDhDQUE4QztZQUM5QyxRQUFRO1lBRVIsMEVBQTBFO1lBRTFFLHVCQUF1QjtZQUN2QiwrQkFBK0I7WUFDL0Isc0JBQXNCO1lBQ3RCLFFBQVE7WUFDUiw4QkFBOEI7WUFDOUIsMEJBQTBCO1lBQzFCLG1EQUFtRDtZQUNuRCw0RkFBNEY7WUFDNUYsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixHQUFHO1lBRUgsZUFBZTtZQUNmLFVBQVU7WUFDVix1REFBdUQ7WUFDdkQsNENBQTRDO1lBQzVDLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsSUFBSTtZQUVKLGNBQWM7WUFDZCxVQUFVO1lBQ1YsdURBQXVEO1lBQ3ZELDJDQUEyQztZQUMzQyxtQkFBbUI7WUFDbkIsNkJBQTZCO1lBQzdCLElBQUk7WUFFSixpQkFBaUI7WUFDakIsOEhBQThIO1lBQzlILFVBQVU7WUFDViwwREFBMEQ7WUFDMUQsOENBQThDO1lBQzlDLG1CQUFtQjtZQUNuQiwwQ0FBMEM7WUFDMUMsSUFBSTtRQUNSLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1csb0JBQW9COztZQUM5QixnRUFBZ0U7WUFDaEUsaUJBQWlCO1lBQ2pCLHVDQUF1QztZQUN2Qyw0QkFBNEI7WUFDNUIsZ0RBQWdEO1lBQ2hELElBQUk7WUFFSix5QkFBeUI7WUFDekIsbURBQW1EO1lBQ25ELHFFQUFxRTtZQUNyRSxPQUFPO1lBQ1AsZ0JBQWdCO1lBQ2hCLE9BQU87WUFFUCxhQUFhO1lBQ2IsVUFBVTtZQUNWLDZEQUE2RDtZQUM3RCx5RkFBeUY7WUFDekYsWUFBWTtZQUNaLDZCQUE2QjtZQUM3QixJQUFJO1lBRUosa0JBQWtCO1lBQ2xCLFVBQVU7WUFDVixrRUFBa0U7WUFDbEUsK0ZBQStGO1lBQy9GLFlBQVk7WUFDWiw2QkFBNkI7WUFDN0IsSUFBSTtRQUNSLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ1csMEJBQTBCOztZQUNwQywwQkFBMEI7WUFDMUIsMENBQTBDO1lBRTFDLDBGQUEwRjtZQUUxRixtREFBbUQ7WUFDbkQsdUNBQXVDO1lBQ3ZDLDJFQUEyRTtZQUMzRSxxREFBcUQ7WUFDckQsNENBQTRDO1lBRTVDLGNBQWM7WUFDZCxtREFBbUQ7WUFDbkQseUNBQXlDO1lBRXpDLHNEQUFzRDtZQUV0RCw2QkFBNkI7WUFDN0IseUJBQXlCO1lBQ3pCLGlDQUFpQztZQUNqQyw4QkFBOEI7WUFDOUIsK0NBQStDO1lBQy9DLDJDQUEyQztZQUMzQyw2QkFBNkI7WUFDN0IseUJBQXlCO1lBQ3pCLHdCQUF3QjtZQUN4Qiw2QkFBNkI7WUFDN0IsYUFBYTtZQUNiLE9BQU87WUFDUCwrQkFBK0I7WUFDL0IsNEJBQTRCO1lBQzVCLDhCQUE4QjtZQUM5Qiw2Q0FBNkM7WUFDN0MsMkNBQTJDO1lBQzNDLDhCQUE4QjtZQUM5QiwwQkFBMEI7WUFDMUIseUJBQXlCO1lBQ3pCLDRCQUE0QjtZQUM1QixhQUFhO1lBQ2IsT0FBTztZQUVQLDRCQUE0QjtZQUM1Qix1QkFBdUI7WUFDdkIsV0FBVztZQUNYLG9EQUFvRDtZQUNwRCxxREFBcUQ7WUFDckQsNkJBQTZCO1lBQzdCLDZDQUE2QztZQUM3QyxZQUFZO1lBQ1osUUFBUTtZQUNSLGdDQUFnQztZQUNoQyw4QkFBOEI7WUFDOUIsK0NBQStDO1lBQy9DLDJDQUEyQztZQUMzQyw4QkFBOEI7WUFDOUIsd0JBQXdCO1lBQ3hCLGFBQWE7WUFDYixPQUFPO1lBRVAsbUJBQW1CO1lBQ25CLE9BQU87WUFFUCxTQUFTO1lBQ1QsVUFBVTtZQUNWLHlFQUF5RTtZQUN6RSw0REFBNEQ7WUFDNUQsY0FBYztZQUNkLDZCQUE2QjtZQUM3QixJQUFJO1lBRUosWUFBWTtZQUNaLFVBQVU7WUFDViw2Q0FBNkM7WUFDN0Msb0NBQW9DO1lBQ3BDLG9EQUFvRDtZQUNwRCwyQkFBMkI7WUFDM0IsMEJBQTBCO1lBQzFCLHdCQUF3QjtZQUN4QixrQ0FBa0M7WUFDbEMsWUFBWTtZQUVaLDBFQUEwRTtZQUMxRSx3SEFBd0g7WUFDeEgscUNBQXFDO1lBQ3JDLFFBQVE7WUFFUiwwQ0FBMEM7WUFDMUMsa0RBQWtEO1lBQ2xELFFBQVE7WUFFUiwyQ0FBMkM7WUFDM0Msc0RBQXNEO1lBQ3RELFFBQVE7WUFFUixvREFBb0Q7WUFDcEQsb0RBQW9EO1lBQ3BELG9EQUFvRDtZQUVwRCxXQUFXO1lBQ1gsNEJBQTRCO1lBQzVCLGlCQUFpQjtZQUNqQix1QkFBdUI7WUFDdkIsdUJBQXVCO1lBQ3ZCLFdBQVc7WUFFWCx3Q0FBd0M7WUFDeEMsK0VBQStFO1lBQy9FLHNDQUFzQztZQUN0QyxxRUFBcUU7WUFDckUsT0FBTztRQUNYLENBQUM7S0FBQTtDQUNKO0FBdmhCRCw0Q0F1aEJDOzs7Ozs7Ozs7Ozs7O0FDcmpCRCxtREFBdUQ7QUFHdkQsaUNBQW9DO0FBRXBDOztHQUVHO0FBQ0gsNEJBQW1DLE1BQTRCO0lBQzNELE1BQU0sQ0FBQyxJQUFJLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFGRCxnREFFQzs7Ozs7Ozs7O0FDWEQsc0RBQXNEO0FBQ3RELG1DQUFtQzs7Ozs7Ozs7OztBQUVuQyxzQ0FBb0U7QUFHcEU7OztHQUdHO0FBQ0gsc0JBQThCLFNBQVEsb0JBQWE7SUFFL0MsdUVBQXVFO0lBQ3ZFLDZCQUE2QjtJQUU3Qjs7T0FFRztJQUNILG9CQUFvQjtRQUNoQixNQUFNLENBQUM7WUFDSCxHQUFHLEVBQUUsS0FBSztZQUNWLEdBQUcsRUFBRSxLQUFLO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixHQUFHLEVBQUUsTUFBTTtZQUNYLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLE9BQU87WUFDYixLQUFLLEVBQUUsUUFBUTtTQUNsQixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7T0FHRztJQUNHLE1BQU07O1lBQ1IsUUFBUTtZQUNSLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxJQUFJLFFBQVE7UUFDUixNQUFNLENBQUM7WUFDSCxXQUFXO1lBQ1gsVUFBVTtZQUNWLFdBQVc7WUFDWCxtQkFBbUI7WUFDbkIsdUJBQXVCO1NBQzFCLENBQUM7SUFDTixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLG1CQUFtQjtJQUVuQjs7T0FFRztJQUNILElBQVksTUFBTTtRQUNkLE1BQU0sQ0FBc0IsSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUM3QyxDQUFDO0NBQ0o7QUFuREQsNENBbURDOzs7Ozs7Ozs7Ozs7O0FDNURELG9EQUF1RDtBQUd2RCxrQ0FBb0M7QUFFcEM7O0dBRUc7QUFDSCx5QkFBZ0MsTUFBNEI7SUFDeEQsTUFBTSxDQUFDLElBQUksb0NBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUZELDBDQUVDOzs7Ozs7O0FDWEQsK0I7Ozs7Ozs7OztBQ0FBLHFDQUFpQztBQUN4QixzQkFBSztBQUVkLDZDQWFzQjtBQWV0Qix1SEFBdUg7QUFFdkg7OztHQUdHO0FBQ0g7SUFFSSx1RUFBdUU7SUFDdkUsaUJBQWlCO0lBRWpCOztPQUVHO0lBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUE0QjtRQUM5QyxLQUFLLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMseUJBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUN0QyxDQUFDO0NBQ0o7QUFaRCx5QkFZQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakRELG9DQUE2QjtBQUM3Qix1Q0FlcUI7QUFVckI7OztHQUdHO0FBQ0g7SUFJSTs7OztPQUlHO0lBQ0gsWUFBc0IsT0FBNkI7UUFBN0IsWUFBTyxHQUFQLE9BQU8sQ0FBc0I7UUFDL0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxvQkFBWSxFQUFFO1lBQ2pDLG9CQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxHQUFHLFNBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFdkcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsTUFBTSxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBRTVCLElBQUksQ0FBQyxPQUFRLENBQUMsYUFBYTtjQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1FBRW5ELElBQUksQ0FBQyxPQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFXO1lBQzNELE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsS0FBSyxNQUFNLENBQUM7Z0JBQ1osS0FBSyxVQUFVO29CQUNYLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCO29CQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDckIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUE0QixJQUFJLENBQUMsT0FBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELGFBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELHVFQUF1RTtJQUN2RSxpQkFBaUI7SUFFakI7OztPQUdHO0lBQ0ksR0FBRztRQUNOLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLLFFBQVE7Z0JBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1QjtnQkFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hFLENBQUM7SUFDTCxDQUFDO0lBY0QsdUVBQXVFO0lBQ3ZFLHFCQUFxQjtJQUVyQjs7OztPQUlHO0lBQ08sUUFBUSxDQUFDLEdBQVc7UUFDMUIsV0FBRyxDQUFDLGFBQUssQ0FBQyxJQUFJLENBQUMsaUJBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyxJQUFJLENBQUMsR0FBVztRQUN0QixXQUFHLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNPLEtBQUssQ0FBQyxTQUFpQjtRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsSUFBYyxPQUFPO1FBQ2pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQ2hDLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDTyxVQUFVLENBQUMsTUFBYyxFQUFFLE9BQWdCLEVBQUUsT0FBdUI7UUFDMUUsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxTQUFDLENBQUMsTUFBTSxDQUFDO1lBQ2YsR0FBRyxFQUFFLG9CQUFZLENBQUMsTUFBTSxDQUFDO1lBQ3pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsR0FBRyxFQUFFLElBQUk7U0FDWixFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRVosWUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxDQUFDLElBQUk7WUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDekIsSUFBSTtpQkFDQyxPQUFPLENBQUMsS0FBSyxFQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztpQkFDcEQsT0FBTyxDQUFDLEtBQUssRUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7aUJBQ3BELE9BQU8sQ0FBQyxPQUFPLEVBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO2lCQUN0RCxPQUFPLENBQUMsS0FBSyxFQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQztpQkFDcEQsT0FBTyxDQUFDLE1BQU0sRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUM7aUJBQ3JELE9BQU8sQ0FBQyxNQUFNLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO2lCQUNyRCxPQUFPLENBQUMsT0FBTyxFQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztpQkFDdEQsT0FBTyxDQUFDLFFBQVEsRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2lCQUM3RCxPQUFPLENBQUMsS0FBSyxFQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUM7aUJBQ2pFLE9BQU8sQ0FBQyxVQUFVLEVBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxJQUFJLFVBQVUsQ0FBQztpQkFDM0UsT0FBTyxDQUFDLFNBQVMsRUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxPQUFPLElBQUksU0FBUyxDQUFDO2lCQUN6RSxPQUFPLENBQUMsS0FBSyxFQUFVLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUM7aUJBQ2pFLE9BQU8sQ0FDSixRQUFRLEVBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUztrQkFDaEMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQztrQkFDNUQsU0FBUyxDQUNsQjtpQkFDQSxPQUFPLENBQ0osWUFBWSxFQUNaLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVM7a0JBQ2hDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxhQUFhLENBQUM7a0JBQ3BFLGFBQWEsQ0FDdEI7aUJBQ0EsT0FBTyxDQUNKLFVBQVUsRUFDVixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTO2tCQUNoQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksV0FBVyxDQUFDO2tCQUNoRSxXQUFXLENBQ3BCLENBQ1IsQ0FBQztZQUNGLFVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxvQkFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7O09BSUc7SUFDTyw0QkFBNEIsQ0FBQyxJQUFZO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1lBQy9CLElBQUksT0FBZSxDQUFDO1lBQ3BCLG1CQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDMUMsS0FBSyxFQUFFLE1BQU07Z0JBQ2IsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsTUFBTSxFQUFFLENBQUMsSUFBWTtvQkFDakIsT0FBTyxHQUFHLFNBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNCLENBQUM7YUFDSixDQUFDO2lCQUNHLElBQUksQ0FBQztnQkFDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLE1BQU07Z0JBQ1YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxJQUFjLHNCQUFzQjtRQUNoQyxNQUFNLElBQUksR0FBRztZQUNULEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFJLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFtQixPQUFPLEVBQUUsU0FBUyxHQUFHO1lBQ3JELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBZ0IsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxhQUFhLEVBQVcsT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQWlCLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFZLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUssT0FBTyxFQUFFLFNBQVMsR0FBRztZQUNyRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQWdCLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFlLE9BQU8sRUFBRSxTQUFTLEdBQUc7WUFDckQsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFZLE9BQU8sRUFBRSxTQUFTLEdBQUc7U0FDeEQsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHO1lBQ1gsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFLLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQU07WUFDN0QsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFLLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUc7U0FDaEUsQ0FBQztRQUVGLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztRQUNmLEVBQUUsQ0FBQyxDQUE0QixJQUFJLENBQUMsT0FBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEQsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNyRCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDeEQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxPQUFPLEVBQUUsU0FBUyxHQUFHLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQsTUFBTSxDQUFDLFNBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ2Esc0JBQXNCLENBQUMsWUFBMkI7O1lBQzlELElBQUksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUUxQyxNQUFNLE9BQU8sR0FBeUQsWUFBWTtpQkFDN0UsTUFBTSxDQUFDLENBQUMsTUFBTTtnQkFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ0osTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVM7d0JBQzlCLE1BQU0sQ0FBNEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUFDO29CQUNyRSxDQUFDLENBQUMsQ0FBQztnQkFDUCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFUCxhQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEMsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFZO2dCQUMxQixFQUFFLENBQUMsQ0FBQyxRQUFRLEtBQUssT0FBTyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO29CQUMvRCxNQUFNLE9BQU8sR0FBRyxrQkFBVSxDQUFDLGFBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkIsQ0FBQztZQUNMLENBQUMsQ0FBQztZQUVGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQzdDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDN0IsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDMUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxHQUFHLElBQUcsTUFBTSxJQUFJLENBQUMsNEJBQTRCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDO29CQUNwRixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3RCLENBQUM7Z0JBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixDQUFDO1lBQ0wsQ0FBQztZQUVELE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDbkIsQ0FBQztLQUFBO0lBRUQ7Ozs7T0FJRztJQUNPLHlCQUF5QjtRQUMvQixNQUFNLENBQUMsQ0FBNEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3RELEtBQUssVUFBVTtnQkFDWCxNQUFNLENBQUMsV0FBVyxDQUFDO1lBQ3ZCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCLEtBQUssS0FBSztnQkFDTixNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ2pCO2dCQUNJLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFDekIsQ0FBQztJQUNMLENBQUM7SUFFRDs7OztPQUlHO0lBQ08sbUJBQW1CO1FBQ3pCLE1BQU0sY0FBYyxHQUE2QixJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlELE1BQU0sQ0FBQztZQUNILEdBQUcsRUFBRSxLQUFLLEtBQUssY0FBYyxDQUFDLEVBQUU7WUFDaEMsSUFBSSxFQUFFLEtBQUssS0FBSyxjQUFjLENBQUMsR0FBRztTQUNyQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7OztPQUtHO0lBQ08sWUFBWSxDQUFDLElBQVk7UUFDL0IsTUFBTSxDQUFDLENBQUMsQ0FBNEIsSUFBSSxDQUFDLE9BQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQztJQUMxRixDQUFDO0lBRUQsdUVBQXVFO0lBQ3ZFLG1CQUFtQjtJQUVuQjs7T0FFRztJQUNXLFNBQVM7O1lBQ25CLE1BQU0sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FBQTtJQUVELHVIQUF1SDtJQUV2SDs7T0FFRztJQUNXLFVBQVU7O1lBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN4QyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQzlCLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDN0IsTUFBTSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSyxnQkFBZ0I7UUFDcEIsRUFBRSxDQUFDLENBQUMsVUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sS0FBSyxDQUFDLGlCQUFTLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFDRCxVQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxpQkFBaUI7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7O09BR0c7SUFDSyxlQUFlO1FBQ25CLE1BQU0sTUFBTSxHQUFHLG9CQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1QixhQUFhO1FBQ2IsZUFBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxFQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsRUFDL0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQy9CLENBQUM7UUFFRixTQUFTO1FBQ1QsVUFBRSxDQUFDLFFBQVEsQ0FDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsRUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQzlCLENBQUM7UUFFRixVQUFVO1FBQ1YsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssWUFBWTtnQkFDYixVQUFFLENBQUMsUUFBUSxDQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLHFCQUFxQixDQUFDLEVBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUMvQixDQUFDO2dCQUNGLEtBQUssQ0FBQztZQUNWLEtBQUssS0FBSztnQkFDTixlQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsY0FBYyxDQUFDLEVBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxFQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FDekIsQ0FBQztnQkFDRixLQUFLLENBQUM7WUFDVjtnQkFDSSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBRUQsU0FBUztRQUNULFVBQUUsQ0FBQyxRQUFRLENBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLEVBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUM5QixDQUFDO1FBRUYsdUJBQXVCO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sS0FBSyxHQUF5QjtnQkFDaEMsTUFBTSxFQUE2QixJQUFJLENBQUMsT0FBUSxDQUFDLE1BQU07Z0JBQ3ZELEtBQUssRUFBRSxJQUFJO2dCQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJO2FBQzlDLENBQUM7WUFDRixlQUFPLENBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsa0NBQWtDLENBQUMsRUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsRUFDdEMsS0FBSyxFQUNMLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxDQUMxQixDQUFDO1FBQ04sQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNLLGVBQWU7UUFDbkIsTUFBTSxNQUFNLEdBQUcsb0JBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN6QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFMUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJO1lBQ3ZCLFVBQUUsQ0FBQyxRQUFRLENBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUMxQixDQUFDO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUEzYUQsc0NBMmFDOzs7Ozs7Ozs7O0FDemNELHFDQUFxQztBQUM1QixzQkFBSzs7Ozs7Ozs7Ozs7OztBQ0RkLDBDQUEyQztBQUczQyx5Q0FBZ0Q7QUFDaEQseUNBQThDO0FBQzlDLHlDQUFnRDtBQUNoRCxzQ0FBd0M7QUFFeEMsaUNBQXVCO0FBQ3ZCLGlDQUEwQjtBQUMxQixrQ0FBeUI7QUFDekIsaUNBQTBCO0FBQzFCLGtDQUFzQjtBQUV0Qjs7R0FFRztBQUNILHNCQUE2QixNQUE0QjtJQUNyRCxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUN6QixLQUFLLFNBQVM7WUFDVixNQUFNLENBQUMsNkJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsS0FBSyxRQUFRO1lBQ1QsTUFBTSxDQUFDLDJCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3RDLEtBQUssU0FBUztZQUNWLE1BQU0sQ0FBQyw2QkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN2QyxLQUFLLEtBQUs7WUFDTixNQUFNLENBQUMscUJBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQztZQUNJLGlCQUFNLENBQUMsS0FBSyxFQUFFLDRCQUE0QixHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3BCLENBQUM7QUFDTCxDQUFDO0FBZEQsb0NBY0M7Ozs7Ozs7Ozs7QUMvQkQsb0NBQTZCO0FBQzdCLG1DQUF5QjtBQUN6QixnREFBb0Q7QUFFcEQsc0NBT2dCO0FBRWhCLDBDQUdvQjtBQUVwQix1RUFBdUU7QUFDdkUsbUJBQW1CO0FBRW5COzs7OztHQUtHO0FBQ0gscUJBQTRCLEtBQWE7SUFDckMsaUJBQU0sQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUZELGtDQUVDO0FBRUQsdUhBQXVIO0FBRXZIOzs7OztHQUtHO0FBQ0gsc0JBQTZCLE1BQWM7SUFDdkMsRUFBRSxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQVUsRUFBRSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFVLEVBQUUsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEQsQ0FBQztBQUNMLENBQUM7QUFORCxvQ0FNQztBQUVELHVIQUF1SDtBQUV2SDs7Ozs7OztHQU9HO0FBQ0gsb0JBQTJCLE1BQWUsRUFBRSxLQUFjO0lBQ3RELE1BQU0sUUFBUSxHQUFHO1FBQ2IsT0FBTztRQUNQLFVBQVU7UUFDVixNQUFNO1FBQ04sTUFBTTtRQUNOLGVBQWU7UUFDZixjQUFjO1FBQ2QsS0FBSztRQUNMLE9BQU87UUFDUCxNQUFNO1FBQ04sSUFBSTtRQUNKLFVBQVU7UUFDVixNQUFNO1FBQ04sVUFBVTtRQUNWLFNBQVM7S0FDWixDQUFDO0lBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQztJQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2pHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN4QyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25CLENBQUM7QUF0QkQsZ0NBc0JDO0FBY0Q7Ozs7Ozs7R0FPRztBQUNILHVCQUE4QixJQUFZLEVBQUUsT0FBOEI7SUFDdEUsTUFBTSxHQUFHLEdBQXlCLFFBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1FBQzNDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO0tBQ1osRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVaLElBQUksR0FBRyxJQUFJO1NBQ04sT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBRyxhQUFhO1NBQ3hDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUksWUFBWTtTQUN2QyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUN6QjtJQUVELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDM0IsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNWLE1BQU0sTUFBTSxHQUFHLENBQUM7WUFDWixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDL0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQztZQUNiLENBQUM7WUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNMLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBOUJELHNDQThCQztBQWlCRDs7Ozs7Ozs7R0FRRztBQUNILHFCQUE0QixPQUFlLEVBQUUsSUFBYyxFQUFFLE9BQTRCO0lBQ3JGLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQy9CLE1BQU0sR0FBRyxHQUF1QixRQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxLQUFLLEVBQUUsU0FBUztZQUNoQixPQUFPLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFO1lBQ3pCLE1BQU0sRUFBRSxDQUFDLElBQVksT0FBd0IsQ0FBQztZQUM5QyxNQUFNLEVBQUUsQ0FBQyxJQUFZLE9BQXdCLENBQUM7U0FDakQsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVaLFlBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsZUFBZTtZQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNSLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQztZQUVELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ3ZGLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLENBQUM7WUFFRCxNQUFNLEtBQUssR0FBRyxxQkFBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO2lCQUMxQyxFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztpQkFDeEIsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUk7Z0JBQ2QsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFDVixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2dCQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztZQUVQLEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSTtvQkFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSTtvQkFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUF0Q0Qsa0NBc0NDO0FBWUQ7Ozs7Ozs7O0dBUUc7QUFDSCxpQkFBd0IsR0FBVyxFQUFFLEdBQVcsRUFBRSxNQUFjLEVBQUUsT0FBNkI7SUFDM0YsTUFBTSxHQUFHLEdBQUcsUUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7UUFDckIsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7UUFDVCxVQUFVLEVBQUUsT0FBTztLQUN0QixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRVosTUFBTSxHQUFHLEdBQUcsWUFBSyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsU0FBRSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDMUcsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFdEQsU0FBRSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixTQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQVpELDBCQVlDO0FBRUQsdUhBQXVIO0FBRXZIOzs7OztHQUtHO0FBQ0g7SUFDSSxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxHQUFHLENBQUM7QUFDL0MsQ0FBQztBQUZELGdDQUVDO0FBRUQsdUhBQXVIO0FBRXZIOzs7OztHQUtHO0FBQ0gscUJBQTRCLEdBQVc7SUFDbkMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0lBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixDQUFDO0lBQ0QsTUFBTSxJQUFJLEdBQUcsUUFBQyxDQUFDLFFBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDNUMsQ0FBQztBQVBELGtDQU9DO0FBRUQ7Ozs7O0dBS0c7QUFDSCxxQkFBNEIsSUFBWTtJQUNwQyw2QkFBNkI7SUFDN0IsTUFBTSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEQsNEJBQTRCO0FBQ2hDLENBQUM7QUFKRCxrQ0FJQztBQVVEOzs7Ozs7R0FNRztBQUNILG1CQUEwQixHQUFXLEVBQUUsT0FBMEI7SUFDN0QsTUFBTSxHQUFHLEdBQXFCLFFBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsSUFBSSxFQUFFLENBQUM7S0FDVixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ1osSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQ2IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSSxNQUFjLENBQUM7SUFDbkIsSUFBSSxJQUFZLENBQUM7SUFFakIsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUMzQyxPQUFPLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLCtCQUErQjtTQUNuRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFFakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNYLE1BQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDL0IsQ0FBQyxJQUFJLEdBQUcsQ0FBQztRQUNiLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDO0lBRUYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDckMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksR0FBRyxRQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsR0FBRyxJQUFJLENBQUMsQ0FBQztZQUNiLENBQUM7UUFDTCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQ0QsR0FBRyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELEdBQUcsR0FBRyxHQUFHO1NBQ0osT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7U0FDdkIsT0FBTyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FDdEI7SUFFTCxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBaERELDhCQWdEQzs7Ozs7OztBQzlVRCwwQzs7Ozs7O0FDQUEsa0M7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSx5Qzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSw4Qzs7Ozs7O0FDQUEsbUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBkNDBiNjdlNjczY2Y4NzMzNDk1NCIsImV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJhc2VcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gXCIuL2xpYnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdG9vbHNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gXCJnbG9iXCI7XHJcbmltcG9ydCAqIGFzIGhvZ2FuIGZyb20gXCJob2dhbi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBfbCBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCAqIGFzIF9zIGZyb20gXCJ1bmRlcnNjb3JlLnN0cmluZ1wiO1xyXG5pbXBvcnQgKiBhcyB3aGljaCBmcm9tIFwid2hpY2hcIjtcclxuaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwidXVpZFwiO1xyXG5pbXBvcnQgKiBhcyBjaGFsayBmcm9tIFwiY2hhbGtcIjtcclxuaW1wb3J0ICogYXMgc2VtdmVyUmVnZXggZnJvbSBcInNlbXZlci1yZWdleFwiO1xyXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSBcImNsaS1zcGlubmVyXCI7XHJcblxyXG5jb25zdCAkOiBKUXVlcnlTdGF0aWMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgX3dpbmRvdyA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QganNkb20gPSByZXF1aXJlKFwianNkb21cIik7XHJcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGpzZG9tLkpTRE9NKSB7ICAgIC8vIHYxMCtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqc2RvbS5KU0RPTSgpLndpbmRvdztcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHY5LjEyLnhcclxuICAgICAgICAgICAgcmV0dXJuIGpzZG9tLmpzZG9tKCkuZGVmYXVsdFZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBwYXRjaCBzY29wZTpcclxuICAgICgocm9vdDogYW55KSA9PiB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBqc2RvbSA5LjQuMCAtIDkuMTIuMCDjgavlrp/oo4XjgZXjgozjgabjgYTjgosgRE9NUGFyc2VyIOOBryBYTUwg44GuIHNlcmlhbGl6ZSDjgYzjgafjgY3jgarjgYTjgZ/jgoEsXHJcbiAgICAgICAgICogeG1sZG9tIOOBq+e9ruOBjeaPm+OBiOOCi1xyXG4gICAgICAgICAqIGpzZG9tIDEwLjEuMCDjgb7jgafli5XjgYvjgarjgYTjgZPjgajjgpLnorroqo1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCB4bWxkb20gPSByZXF1aXJlKFwieG1sZG9tXCIpO1xyXG4gICAgICAgIHJvb3QuRE9NUGFyc2VyID0geG1sZG9tLkRPTVBhcnNlcjtcclxuICAgICAgICAvLyB4bWxkb20g44Gr44GvIGRvbS50b1N0cmluZygpIOOBjOWun+ijheOBleOCjOOBpuOBhOOCi+OBjOOAgWdsb2JhbCDjgavjgoIgZXhwb3J0IOOBmeOCi1xyXG4gICAgICAgICg8YW55Pmdsb2JhbCkuWE1MU2VyaWFsaXplciA9IHJvb3QuWE1MU2VyaWFsaXplciA9IHhtbGRvbS5YTUxTZXJpYWxpemVyO1xyXG4gICAgfSkoX3dpbmRvdyk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmUoXCJqcXVlcnlcIikoX3dpbmRvdyk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgdHlwZSBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IHR5cGVvZiBfcyAmIHR5cGVvZiBfbDtcclxuY29uc3QgX206IE1peGluZWRVbmRlcnNjb3JlU3RhdGljID0gPGFueT5fbC5taXhpbig8YW55Pl9zLmV4cG9ydHMoKSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgX20gYXMgXyxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgc2VtdmVyUmVnZXgsXHJcbiAgICBTcGlubmVyLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL2xpYnMudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGZzLCAkIH0gZnJvbSBcIi4vbGlic1wiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUdsb2JhbFNldHRpbmdzXHJcbiAqIEBicmllZiDjgrDjg63jg7zjg5Djg6voqK3lrprjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIGZvcmNlPzogYm9vbGVhbjsgICAgICAgICAgICAvLyDjgqjjg6njg7zntpnntprnlKhcclxuICAgIHZlcmJvc2U/OiBib29sZWFuOyAgICAgICAgICAvLyDoqbPntLDjg63jgrBcclxuICAgIHNpbGVudD86IGJvb2xlYW47ICAgICAgICAgICAvLyBzaWxlbnQgbW9kZVxyXG4gICAgdGFyZ2V0RGlyPzogc3RyaW5nOyAgICAgICAgIC8vIOS9nOalreODh+OCo+ODrOOCr+ODiOODqlxyXG4gICAgbGFuZz86IFwiZW4tVVNcIiB8IFwiamEtSlBcIjtcclxufVxyXG5cclxubGV0IF9zZXR0aW5nczogSUdsb2JhbFNldHRpbmdzID0ge1xyXG4gICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgbGFuZzogXCJlbi1VU1wiLFxyXG59O1xyXG5cclxubGV0IF9saWJQYXRoOiBzdHJpbmc7ICAgLy8gY2RwLWxpYiDjga7lrZjlnKjjgZfjgabjgYTjgosgcGF0aFxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIOioreWumuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJucyBvcHRpb25zIOODreOCsOOBq+S9v+eUqOOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNldHRpbmdzKCk6IElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICByZXR1cm4gJC5leHRlbmQoe30sIF9zZXR0aW5ncyk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoqK3lrprmjIflrppcclxuICpcclxuICogQHBhcmFtIG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2V0dGluZ3Moc2V0dGluZ3M6IElHbG9iYWxTZXR0aW5ncyk6IHZvaWQge1xyXG4gICAgaWYgKHNldHRpbmdzKSB7XHJcbiAgICAgICAgX3NldHRpbmdzLmZvcmNlICAgICA9IHNldHRpbmdzLmZvcmNlICAgICAgICB8fCBfc2V0dGluZ3MuZm9yY2U7XHJcbiAgICAgICAgX3NldHRpbmdzLnZlcmJvc2UgICA9IHNldHRpbmdzLnZlcmJvc2UgICAgICB8fCBfc2V0dGluZ3MudmVyYm9zZTtcclxuICAgICAgICBfc2V0dGluZ3Muc2lsZW50ICAgID0gc2V0dGluZ3Muc2lsZW50ICAgICAgIHx8IF9zZXR0aW5ncy5zaWxlbnQ7XHJcbiAgICAgICAgX3NldHRpbmdzLnRhcmdldERpciA9IHNldHRpbmdzLnRhcmdldERpciAgICB8fCBfc2V0dGluZ3MudGFyZ2V0RGlyO1xyXG4gICAgICAgIF9zZXR0aW5ncy5sYW5nICAgICAgPSBzZXR0aW5ncy5sYW5nICAgICAgICAgfHwgX3NldHRpbmdzLmxhbmc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIF9zZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgICAgICAgICB2ZXJib3NlOiBmYWxzZSxcclxuICAgICAgICAgICAgc2lsZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgbGFuZzogXCJlbi1VU1wiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBcImNkcC1saWJcIiDjgYzlrZjlnKjjgZnjgovjg5HjgrnjgpLlj5blvpdcclxuICpcclxuICogQHJldHVybnMgY2RwLWxpYiDjgbjjga4gcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldExpYlBhdGgoKTogc3RyaW5nIHtcclxuICAgIGlmIChudWxsID09IF9saWJQYXRoKSB7XHJcbiAgICAgICAgY29uc3QgVFJZX0NPVU5UID0gMztcclxuICAgICAgICBsZXQgdHJpZWQgPSAwO1xyXG4gICAgICAgIF9saWJQYXRoID0gX19kaXJuYW1lO1xyXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XHJcbiAgICAgICAgICAgIGlmIChUUllfQ09VTlQgPD0gdHJpZWQpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKFwibGliIHBhdGggaXMgbm90IHJlc29sdmVkLlwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfbGliUGF0aCA9IHBhdGguam9pbihfbGliUGF0aCwgXCIuLlwiKTtcclxuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSBwYXRoLmpvaW4oX2xpYlBhdGgsIFwiY2RwLWxpYlwiKTtcclxuICAgICAgICAgICAgaWYgKGZzLnBhdGhFeGlzdHNTeW5jKGNoZWNrKSkge1xyXG4gICAgICAgICAgICAgICAgX2xpYlBhdGggPSBjaGVjaztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyaWVkKys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIF9saWJQYXRoO1xyXG59XHJcblxyXG4vKipcclxuICog5oyH5a6a44GV44KM44GfIHRhcmdldERpciDjgpLlj5blvpdcclxuICpcclxuICogQHJldHVybnMgdGFyZ2V0RGlyIOOBuOOBriBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0RGlyKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3NldHRpbmdzLnRhcmdldERpcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmxvZygpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0gbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIV9zZXR0aW5ncy5zaWxlbnQpIHtcclxuICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6Kmz57Sw44Ot44Kw5Ye65YqbXHJcbiAqIGNvbnNvbGUuZGVidWcoKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVidWcobWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIV9zZXR0aW5ncy5zaWxlbnQgJiYgX3NldHRpbmdzLnZlcmJvc2UpIHtcclxuICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJERUJVRzogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmpJzoqLxcclxuICogY29uc29sZS5hc3NlcnQoKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHRlc3QgICAgICAgICAgIOaknOiovOOBmeOCi+W8j1xyXG4gKiBAcGFyYW0gbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQodGVzdD86IGJvb2xlYW4sIG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCF0ZXN0KSB7XHJcbiAgICAgICAgaWYgKF9zZXR0aW5ncy5mb3JjZSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubGV0IF9sYW5nOiBhbnk7XHJcblxyXG4vKipcclxuICog44Ot44O844Kr44Op44Kk44K6XHJcbiAqXHJcbiAqIEBwYXJhbSBrZXkg44Kt44O85paH5a2X5YiXXHJcbiAqIEByZXR1cm5zIOe/u+ios+OBleOCjOOBn+aWh+Wtl+WIl1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAoIV9sYW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgX2xhbmcgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwicmVzL2xvY2FsZXNcIiwgXCJtZXNzYWdlcy5cIiArIF9zZXR0aW5ncy5sYW5nICsgXCIuanNvblwiKSwgXCJ1dGY4XCIpLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcIkxhbmd1YWdlIHJlc291cmNlIEpTT04gcGFyc2UgZXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZXNvdWNlID0gJC5leHRlbmQoe30sIF9sYW5nKTtcclxuICAgIGNvbnN0IHByb3BzID0ga2V5LnNwbGl0KFwiLlwiKTtcclxuICAgIHdoaWxlICgwIDwgcHJvcHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgcHJvcCA9IHByb3BzLnNoaWZ0KCk7XHJcbiAgICAgICAgaWYgKHJlc291Y2VbcHJvcF0pIHtcclxuICAgICAgICAgICAgcmVzb3VjZSA9IHJlc291Y2VbcHJvcF07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBcInJlc291Y2Ugbm90IGZvdW5kLiBrZXk6IFwiICsga2V5KTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc291Y2U7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9zZXR0aW5ncy50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yRWxlY3Ryb25cclxuICogQGJyaWVmIERlc2t0b3AgRWxlY3Ryb24g55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JFbGVjdHJvbiBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3dy9hcHBcIiwgLy8gVE9ETzog5pqr5a6aXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHNyY0NvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0OiBcInNjcmlwdHNcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6IFwic3R5bGVzaGVldHNcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcInRlbXBsYXRlc1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lEZXNrdG9wQXBwQ29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBUT0RPOlxyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcInVuZGVyIGNvbnN0cnVjdGlvbi5cIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1ub3JtYWxpemUuanNcIixcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJRGVza3RvcEFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Rlc2t0b3AvZ2VuZXJhdG9yLWVsZWN0b3Jvbi50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yRWxlY3Ryb24gfSBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1lbGVjdG9yb25cIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yRGVza3RvcChjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckVsZWN0cm9uKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24sXHJcbiAgICBHZW5lcmF0b3JCYXNlLFxyXG4gICAgVXRpbHMsXHJcbn0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSUxpYnJhcnlDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5jb25zdCBmcyAgICAgICAgICAgID0gVXRpbHMuZnM7XHJcbmNvbnN0IGdsb2IgICAgICAgICAgPSBVdGlscy5nbG9iO1xyXG5jb25zdCAkICAgICAgICAgICAgID0gVXRpbHMuJDtcclxuY29uc3QgXyAgICAgICAgICAgICA9IFV0aWxzLl87XHJcbmNvbnN0IGRlYnVnICAgICAgICAgPSBVdGlscy5kZWJ1ZztcclxuY29uc3QgdGVtcGxhdGVQYXRoICA9IFV0aWxzLnRlbXBsYXRlUGF0aDtcclxuY29uc3QgY29weVRwbCAgICAgICA9IFV0aWxzLmNvcHlUcGw7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvck1vZHVsZVxyXG4gKiBAYnJpZWYgTGlicmFyeSBNb2R1bGUg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JNb2R1bGUgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwic3JjXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJkaXN0XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImJ1aWx0XCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgdGVtcDogXCIudGVtcFwiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmVuc3VyZU1vZHVsZVByb3BzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3RTZXR0aW5ncygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU291cmNlVGVtcGxhdGUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVuZGxlLWZpbmFsaXplci5qc1wiLFxyXG4gICAgICAgICAgICBcInJlbWFwLWNvdmVyYWdlLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJvdGVjdGVkIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHREZXZEZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IHN1cGVyLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMuY29uY2F0KFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9qYXNtaW5lXCIsICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImR0cy1idW5kbGVcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInR5cGVzY3JpcHQtZm9ybWF0dGVyXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcubm9kZWpzKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcImphc21pbmUtbm9kZVwiLCB2ZXJzaW9uOiBcIl4yLjAuMFwiLCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJyZXF1aXJlanNcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSUxpYnJhcnlDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SUxpYnJhcnlDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW9kdWxlIOWQjSwgbWFpbiDjg5XjgqHjgqTjg6vlkI3jga7kv53oqLxcclxuICAgICAqIC0gMTogbW9kdWxlTmFtZSDjgYzmjIflrprjgZXjgozjgabjgYTjgovloLTlkIjjga/kvb/nlKjjgZnjgotcclxuICAgICAqIC0gMjogcHJvamVjdE5hbWUg44GM5L2/55So5Y+v6IO944Gq5aC05ZCI44Gv44Gd44KM44KS5L2/55So44GZ44KLXHJcbiAgICAgKiAtIDM6IHByb2plY3ROYW1lIOOBjOS9v+eUqOS4jeWPr+OBruWgtOWQiOOBr+OAgVwiLVwiIOOBpOOBquOBjuaWh+Wtl+WIl+OCkueUn+aIkOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuc3VyZU1vZHVsZVByb3BzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIG1vZHVsZSBuYW1lXHJcbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jb25maWcubW9kdWxlTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIS9eLipbKFxcXFx8XFxzfC98OnwqfD98XCJ8PHw+fHwpXS4qJC8udGVzdCh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUgPSB0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUgPSBfLnRyaW0oXy5kYXNoZXJpemUodGhpcy5jb25maWcucHJvamVjdE5hbWUpLCBcIi1cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWcoXCJtb2R1bGVOYW1lOiBcIiArIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUpO1xyXG5cclxuICAgICAgICAvLyBtYWluIGZpbGUgbmFtZVxyXG4gICAgICAgIGlmIChudWxsID09IHRoaXMuY29uZmlnLm1haW5CYXNlTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUgPSB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1ZyhcIm1haW5CYXNlTmFtZTogXCIgKyB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OH44Kj44Os44Kv44OI44Oq5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcImxpYnJhcnkvc3RydWN0dXJlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI6Kit5a6a44OV44Kh44Kk44Or44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlUHJvamVjdFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIHByb2plY3QuY29uZmlnLmpzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3Byb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInByb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0c2NvbmZpZ1xyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAvLyBtYWluIHRzY29uZmlnLmpzb25cclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gdGVzdCB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcudGVzdC5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInVuaXRcIiwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBtYWluIHRzY29uZmlnLmpzb25cclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy5vdXRwdXQtc2FtZS1kaXIuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlc2xpbnRyYy5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX2VzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJlc2xpbnRcIiwgXCJlc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5RXNMaW50RW52UGFyYW0oKSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0ZXN0ZW1cclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLm5vZGVqcykge1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnkvdG9vbHMvdGVzdGVtXCIpLCBcIl90ZXN0ZW0uanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgXCJ0ZXN0ZW0uanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0ZXN0ZW1TdHVmZlBhdGggPSB0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5L3Rvb2xzL3Rlc3RlbS9ydW5uZXJcIik7XHJcblxyXG4gICAgICAgICAgICBnbG9iLnN5bmMoXCIqKlwiLCB7XHJcbiAgICAgICAgICAgICAgICBjd2Q6IHRlc3RlbVN0dWZmUGF0aCxcclxuICAgICAgICAgICAgICAgIG5vZGlyOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlc3RlbVN0dWZmUGF0aCwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgZmlsZSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAuZ2l0aWdub3JlXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCIuZ2l0aWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFJFQURNRS5tZFxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9SRUFETUUubWRcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBwYWNrYWdlLmpzb25cclxuICAgICAgICB0aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0odGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzIHx8IHRoaXMuZGVmYXVsdERldkRlcGVuZGVuY2llcyk7XHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3BhY2thZ2UuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44K944O844K544Gu6Zub5b2i5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlU291cmNlVGVtcGxhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgX21vZHVsZSA9IHBhdGguYmFzZW5hbWUodGhpcy5fY29uZmlnLm1vZHVsZU5hbWUsIFwiLmpzXCIpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBzYW1wbGVDbGFzczogXy5jbGFzc2lmeShfbW9kdWxlKSxcclxuICAgICAgICAgICAgc2FtcGxlTW9kdWxlOiBfbW9kdWxlLFxyXG4gICAgICAgICAgICBidWlsdDogdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JpcHQgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQgfHwgXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyBpbmRleC50c1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcInNyY1wiLCBcIl9pbmRleC50c1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHNjcmlwdCwgX21vZHVsZSArIFwiLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGluZGV4LnNwZWMudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXguc3BlYy50c1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInVuaXRcIiwgX21vZHVsZSArIFwiLnNwZWMudHNcIiksXHJcbiAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZpc3VhbCBTdHVkaW8g44Gu44K944Oq44Ol44O844K344On44Oz44OV44Kh44Kk44Or5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlVmlzdWFsU3R1ZGlvU29sdXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdnNQYXJhbSA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUdVSUQgPSBVdGlscy5jcmVhdGVHVUlEO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcGFyYW06IElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24gPSAkLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBwYXJhbS5wcm9qZWN0TmFtZSAgICAgICA9IHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZTtcclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdEdVSUQgICAgICAgPSBjcmVhdGVHVUlEKCk7XHJcbiAgICAgICAgICAgIHBhcmFtLnR5cGVzICAgICAgICAgICAgID0gcGFyYW0udHlwZXMucmVwbGFjZShcIkBcIiwgXCIlNDBcIik7IC8vIGVzY2FwZSBcIkBcIiB0byBcIiU0MFwiXHJcbiAgICAgICAgICAgIHBhcmFtLm1haW5CYXNlTmFtZSAgICAgID0gdGhpcy5fY29uZmlnLm1haW5CYXNlTmFtZTtcclxuICAgICAgICAgICAgcGFyYW0ubGljZW5zZSAgICAgICAgICAgPSAhdGhpcy5fY29uZmlnLnByaXZhdGU7XHJcblxyXG4gICAgICAgICAgICAvLyB0b29sc1xyXG4gICAgICAgICAgICBwYXJhbS53ZWJwYWNrID0gdGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpO1xyXG4gICAgICAgICAgICBwYXJhbS50ZXN0ZW0gPSAhdGhpcy5jb25maWcubm9kZWpzO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ub3V0cHV0U2FtZURpciA9IHRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXI7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR1cCBidWlsdCBqcyBncm91cFxyXG4gICAgICAgICAgICBwYXJhbS5qc0dyb3VwID0gW107XHJcbiAgICAgICAgICAgIGlmICghcGFyYW0ub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLmJ1aWx0ICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkX3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5taW5pZnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNldHVwIHBrZyBncm91cFxyXG4gICAgICAgICAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLnBrZyArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRfdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluX21hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR1cCB0ZXN0IGpzIGdyb3VwXHJcbiAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS50ZXN0ICsgXCJcXFxcdW5pdFxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lICsgXCIuc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5jb25maWcub3V0cHV0U2FtZURpcixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmIChwYXJhbS5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0uYnVpbHQgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8vIC5zbG5cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBcIl9zb2x1dGlvbi5zbG4udHBsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB2c1BhcmFtLnByb2plY3ROYW1lICsgXCIuc2xuXCIpLFxyXG4gICAgICAgICAgICB2c1BhcmFtLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gLmNzcHJvalxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sU3RyaW5nID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaG9nYW4gPSBVdGlscy5ob2dhbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSBVdGlscy5ub3JtYWxpemVUZXh0O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICAgICAgICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cGwgPSBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmModHBsKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganN0LnJlbmRlcih2c1BhcmFtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sRE9NID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC5wYXJzZVhNTCh0b1htbFN0cmluZyhmaWxlKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxOb2RlID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnN0cjJYbWxOb2RlKHRvWG1sU3RyaW5nKGZpbGUpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRwcm9qID0gdG9YbWxET00oXCJfcHJvamVjdC5jc3Byb2oudHBsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BUUyA9IHRvWG1sTm9kZShcIl90cy5pdGVtLmdyb3VwLnRwbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgJGdwSlMgPSB0b1htbE5vZGUoXCJfanMuaXRlbS5ncm91cC50cGxcIik7XHJcblxyXG4gICAgICAgICAgICAkcHJvalxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJJdGVtR3JvdXBcIilcclxuICAgICAgICAgICAgICAgIC5sYXN0KClcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BUUylcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BKUylcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdFhNTCA9IFV0aWxzLmZvcm1hdFhNTDtcclxuICAgICAgICAgICAgY29uc3QgZHN0UGF0aCA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5jc3Byb2pcIik7XHJcbiAgICAgICAgICAgIGRlYnVnKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSk7XHJcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgZm9ybWF0WE1MKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSkpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yTW9kdWxlIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLW1vZHVsZVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItbW9kdWxlXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvckxpYnJhcnkoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JNb2R1bGUoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgICQsXHJcbiAgICBfLFxyXG4gICAgY2hhbGssXHJcbiAgICBkZWJ1ZyxcclxuICAgIHRlbXBsYXRlUGF0aCxcclxuICAgIGNvcHlUcGwsXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIHN0cjJYbWxOb2RlLFxyXG4gICAgeG1sTm9kZTJTdHIsXHJcbiAgICBmb3JtYXRYTUwsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcbmltcG9ydCB7XHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElEZXBlbmRlbmN5LFxyXG4gICAgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbixcclxuICAgIEdlbmVyYXRvckJhc2UsXHJcbn0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQ29yZG92YVxyXG4gKiBAYnJpZWYgTW9iaWxlIENvcmRvdmEg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JDb3Jkb3ZhIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHRlbXA6IFwiLnRlbXBcIixcclxuICAgICAgICAgICAgbGliOiBcImxpYlwiLFxyXG4gICAgICAgICAgICBleHRlcm5hbDogXCJleHRlcm5hbFwiLFxyXG4gICAgICAgICAgICBwb3J0aW5nOiBcInBvcnRpbmdcIixcclxuICAgICAgICAgICAgcmVzOiBcInJlc1wiLFxyXG4gICAgICAgICAgICBzcmNDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHNjcmlwdDogXCJzY3JpcHRzXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiBcInN0eWxlc2hlZXRzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJ0ZW1wbGF0ZXNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVQcm9qZWN0U3RydWN0dXJlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVuZGxlLWZpbmFsaXplci5qc1wiLFxyXG4gICAgICAgICAgICBcInJlbWFwLWNvdmVyYWdlLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJvdGVjdGVkIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHREZXZEZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IHN1cGVyLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMuY29uY2F0KFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9iYWNrYm9uZVwiLCAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9qYXNtaW5lXCIsICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9qcXVlcnlcIiwgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9yZXF1aXJlanNcIiwgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9qcXVlcnlcIiwgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy91bmRlcnNjb3JlXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImF1dG9wcmVmaXhlclwiLCAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImNsZWFuLWNzc1wiLCAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImZzLWV4dHJhXCIsICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImh0bWwtbWluaWZpZXJcIiwgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIm5vZGUtc2Fzc1wiLCAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInBvc3Rjc3MtY2xpXCIsICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXh0cmEgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMuZm9yRWFjaCgoZGVwZW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBkZXBlbmQubmFtZSwgdmVyc2lvbjogZGVwZW5kLnZlcnNpb24sIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoZGVwZW5kcy5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElNb2JpbGVBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SU1vYmlsZUFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4jmp4vmiJDjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVQcm9qZWN0U3RydWN0dXJlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IGNvcmRvdmFFbmFibGVkID0gKDAgPCB0aGlzLmNvbmZpZy5wbGF0Zm9ybXMubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgaWYgKGNvcmRvdmFFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hkaXIodGhpcy5yb290RGlyKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVDb3Jkb3ZhU2NhZmZvbGQoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb25maWdYTUwoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGRDb3Jkb3ZhUGxhdGZvcm1zKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YVBsdWdpbnMoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXMoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jYWNoZUNvcmRvdmFQYWNrYWdlSlNPTigpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZGlyKFwiLi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdFNldHRpbmdzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTb3VyY2VUZW1wbGF0ZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlVmlzdWFsU3R1ZGlvU29sdXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSDjgpLnlKjjgYTjgZ/jg5fjg63jgrjjgqfjgq/jg4jkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVDb3Jkb3ZhU2NhZmZvbGQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5jcmVhdGVDb3Jkb3ZhU2NhZmZvbGRcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVDb3Jkb3ZhU2NhZmZvbGRcIik7XHJcblxyXG4gICAgICAgIC8vIGAkIGNvcmRvdmEgY3JlYXRlIGNvb2wtbW9iaWxlIGNvbS5zb255LmNkcC5jb29sbW9iaWxlIFwiQ29vbCBNb2JpbGVcImBcclxuICAgICAgICBhd2FpdCBleGVjQ29tbWFuZChcImNvcmRvdmFcIiwgW1wiY3JlYXRlXCIsIHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCB0aGlzLmNvbmZpZy5hcHBJZCwgdGhpcy5jb25maWcuYXBwTmFtZV0pO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgZmlsZXNcclxuICAgICAgICBnbG9iLnN5bmMoXCJ3d3cvKiovKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGhpcy5jb25maWcucHJvamVjdE5hbWUsXHJcbiAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGguam9pbih0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgZmlsZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGZzLnJlbW92ZVN5bmMocGF0aC5qb2luKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBcInJlc1wiKSk7XHJcbiAgICAgICAgZnMucmVtb3ZlU3luYyhwYXRoLmpvaW4odGhpcy5jb25maWcucHJvamVjdE5hbWUsIFwiLm5wbWlnbm9yZVwiKSk7XHJcblxyXG4gICAgICAgIC8vIG1vdmUgcm9vdCBkaXJlY3RvcnlcclxuICAgICAgICBmcy5jb3B5U3luYyh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgXCIuL1wiKTtcclxuICAgICAgICBmcy5yZW1vdmVTeW5jKHRoaXMuY29uZmlnLnByb2plY3ROYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZy54bWwg44Gu5L+u5q2jXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgdXBkYXRlQ29uZmlnWE1MKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEudXBkYXRlQ29uZmlnWG1sXCIpO1xyXG4gICAgICAgIGRlYnVnKFwidXBkYXRlQ29uZmlnWE1MXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBjb25maWdYbWxQYXRoID0gcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIFwiY29uZmlnLnhtbFwiKTtcclxuICAgICAgICBjb25zdCAkY29uZmlnWG1sRG9tID0gJChzdHIyWG1sTm9kZShmcy5yZWFkRmlsZVN5bmMoY29uZmlnWG1sUGF0aCkudG9TdHJpbmcoKSkpO1xyXG5cclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwid2lkZ2V0XCIpXHJcbiAgICAgICAgICAgIC5hdHRyKFwidmVyc2lvblwiLCB0aGlzLmNvbmZpZy52ZXJzaW9uKVxyXG4gICAgICAgICAgICAuYXR0cihcImlvcy1DRkJ1bmRsZUlkZW50aWZpZXJcIiwgdGhpcy5jb25maWcuYXBwSWQpXHJcbiAgICAgICAgICAgIC5wcmVwZW5kKHN0cjJYbWxOb2RlKGBcclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+XHJcbiAgICAgICAgICAgICAgICA8cHJlZmVyZW5jZSBuYW1lPVwiS2V5Ym9hcmREaXNwbGF5UmVxdWlyZXNVc2VyQWN0aW9uXCIgdmFsdWU9XCJmYWxzZVwiLz5cclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJCYWNrZ3JvdW5kQ29sb3JcIiB2YWx1ZT1cIjB4ZmYwMDAwMDBcIiAvPlxyXG4gICAgICAgICAgICBgKSlcclxuICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAvLyByZW1vdmUgY29yZG92YSB0ZWFtIGluZm9ybWF0aW9uXHJcbiAgICAgICAgJGNvbmZpZ1htbERvbVxyXG4gICAgICAgICAgICAuZmluZChcImRlc2NyaXB0aW9uXCIpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwiYXV0aG9yXCIpXHJcbiAgICAgICAgICAgIC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgZnMud3JpdGVGaWxlU3luYyhjb25maWdYbWxQYXRoLCBmb3JtYXRYTUwoeG1sTm9kZTJTdHIoJGNvbmZpZ1htbERvbSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHBsYXRmb3JtIOi/veWKoFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFQbGF0Zm9ybXMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgZGVidWcoXCJhZGRDb3Jkb3ZhUGxhdGZvcm1zXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5pbmRleE9mKFwiaW9zXCIpO1xyXG4gICAgICAgIGlmICgwIDw9IGluZGV4ICYmIFwiZGFyd2luXCIgIT09IHByb2Nlc3MucGxhdGZvcm0pIHtcclxuICAgICAgICAgICAgdGhpcy53YXJuKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmlPU1dhcm5pbmdcIik7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcucGxhdGZvcm1zLmxlbmd0aCA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuYWRkUGxhdGZvcm1zXCIpO1xyXG5cclxuICAgICAgICAvLyBgJCBjb3Jkb3ZhIHBsYXRmb3JtIGFkZCBhbmRyb2lkIGlvc2BcclxuICAgICAgICBhd2FpdCBleGVjQ29tbWFuZChcImNvcmRvdmFcIiwgW1wicGxhdGZvcm1cIiwgXCJhZGRcIl0uY29uY2F0KHRoaXMuY29uZmlnLnBsYXRmb3JtcykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGx1Z2luIOi/veWKoFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFQbHVnaW5zKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuYWRkUGx1Z2luc1wiKTtcclxuICAgICAgICBkZWJ1ZyhcImFkZENvcmRvdmFQbHVnaW5zXCIpO1xyXG5cclxuICAgICAgICAvKlxyXG4gICAgICAgICAqIEkvRiDjga/opIfmlbDjga7jg5fjg6njgrDjgqTjg7PjgpLkuIDmi6zjgafov73liqDjgZnjgovjgZPjgajjgYzlj6/og73jgaDjgYzjgIFcclxuICAgICAgICAgKiBjb3Jkb3ZhIHZlcnNpb24g44KS5Yik5a6a44GX44Gm44GE44KL44OX44Op44Kw44Kk44Oz44Gv6Kqk5Yik5a6a44GZ44KL44GT44Go44GM44GC44KL44Gf44KB44CBXHJcbiAgICAgICAgICogMeOBpOOBmuOBpOi/veWKoOOBmeOCi1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICog5Lul5LiL44Gu5LiN5YW35ZCI44Gr6aGe5Ly844GZ44KL54++6LGhXHJcbiAgICAgICAgICogaHR0cHM6Ly9pc3N1ZXMuYXBhY2hlLm9yZy9qaXJhL2Jyb3dzZS9DQi0xMjY2M1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gdGhpcy5jb25maWcuY29yZG92YV9wbHVnaW4ubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vIGAkIGNvcmRvdmEgcGx1Z2luIGFkZCBjb3Jkb3ZhLXBsdWdpbi1pbmFwcGJyb3dzZXJgXHJcbiAgICAgICAgICAgIGF3YWl0IGV4ZWNDb21tYW5kKFwiY29yZG92YVwiLCBbXCJwbHVnaW5cIiwgXCJhZGRcIiwgdGhpcy5jb25maWcuY29yZG92YV9wbHVnaW5baV0ubmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvcmRvdmEgcHJvamVjdCDjgavov73liqDjgZnjgovjg6rjgr3jg7zjgrnjgpLjgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBhZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5hZGRFeHRlbnNpb25zXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiYWRkQ29yZG92YUV4dGVudGlvbkZpbGVzXCIpO1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcIm1vYmlsZS9jb3Jkb3ZhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSDjgYznlJ/miJDjgZfjgZ8gcGFja2FnZS5qc29uIOOCkuOCreODo+ODg+OCt+ODpVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNhY2hlQ29yZG92YVBhY2thZ2VKU09OKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKFwiLi9wYWNrYWdlLmpzb25cIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoXCIuL3BhY2thZ2UuanNvblwiKS50b1N0cmluZygpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlbW92ZSBjb3Jkb3ZhIHRlYW0gaW5mb3JtYXRpb25cclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5uYW1lO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLnZlcnNpb247XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24ubWFpbjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5zY3JpcHRzO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmF1dGhvcjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5saWNlbnNlO1xyXG5cclxuICAgICAgICAgICAgLy8g44OV44Kh44Kk44Or44Gv44GE44Gj44Gf44KT5YmK6ZmkXHJcbiAgICAgICAgICAgIGZzLnJlbW92ZVN5bmMoXCIuL3BhY2thZ2UuanNvblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODh+OCo+ODrOOCr+ODiOODquani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgICAgICAvLyBhcHAgYmFzZSBzdHJ1Y3R1cmVcclxuICAgICAgICB0aGlzLmNvcHlUcGxEaXIoXCJtb2JpbGUvc3RydWN0dXJlL2Jhc2VcIik7XHJcblxyXG4gICAgICAgIC8vIGxpYlxyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5wcm9qZWN0U3RydWN0dXJlICYmIDAgPD0gdGhpcy5jb25maWcucHJvamVjdFN0cnVjdHVyZS5pbmRleE9mKFwibGliXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29weVRwbERpcihcclxuICAgICAgICAgICAgICAgIFwibW9iaWxlL3N0cnVjdHVyZS9saWJcIixcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5saWIpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBwb3J0aW5nXHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLnByb2plY3RTdHJ1Y3R1cmUgJiYgMCA8PSB0aGlzLmNvbmZpZy5wcm9qZWN0U3RydWN0dXJlLmluZGV4T2YoXCJwb3J0aW5nXCIpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29weVRwbERpcihcclxuICAgICAgICAgICAgICAgIFwibW9iaWxlL3N0cnVjdHVyZS9wb3J0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZylcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFBMQVRGT1JNU19ST09UID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwbGF0Zm9ybXNcIik7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKFBMQVRGT1JNU19ST09UKVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKHBhdGguam9pbihQTEFURk9STVNfUk9PVCwgcGxhdGZvcm0pKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weVRwbERpcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibW9iaWxlL3N0cnVjdHVyZS9wb3J0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oUExBVEZPUk1TX1JPT1QsIHBsYXRmb3JtLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHd3d1xyXG4gICAgICAgIGNvbnN0IFdXVyA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wa2cpO1xyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhXV1cpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyKFdXVyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRlbXBsYXRlUGF0aChcImJhc2UvLmdpdGtlZXBcIiksIHBhdGguam9pbihXV1csIFwiLmdpdGtlZXBcIikpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI6Kit5a6a44OV44Kh44Kk44Or44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlUHJvamVjdFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vLy8gcHJvamVjdC5jb25maWcuanNcclxuICAgICAgICAvL2NvcHlUcGwoXHJcbiAgICAgICAgLy8gICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3Byb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicHJvamVjdC5jb25maWcuanNcIiksXHJcbiAgICAgICAgLy8gICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgIC8vICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICAvLyk7XHJcblxyXG4gICAgICAgIC8vLy8gdHNjb25maWdcclxuICAgICAgICAvL2lmICghdGhpcy5jb25maWcub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgIC8vICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgIC8vICAgIGNvcHlUcGwoXHJcbiAgICAgICAgLy8gICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgIC8vICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAvLyAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAvLyAgICApO1xyXG4gICAgICAgIC8vICAgIC8vIHRlc3QgdHNjb25maWcuanNvblxyXG4gICAgICAgIC8vICAgIGNvcHlUcGwoXHJcbiAgICAgICAgLy8gICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy50ZXN0Lmpzb25cIiksXHJcbiAgICAgICAgLy8gICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAvLyAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgIC8vICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgIC8vICAgICk7XHJcbiAgICAgICAgLy99IGVsc2Uge1xyXG4gICAgICAgIC8vICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgIC8vICAgIGNvcHlUcGwoXHJcbiAgICAgICAgLy8gICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy5vdXRwdXQtc2FtZS1kaXIuanNvblwiKSxcclxuICAgICAgICAvLyAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgIC8vICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgLy8gICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgLy8gICAgKTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8vLyBlc2xpbnRyYy5qc29uXHJcbiAgICAgICAgLy9jb3B5VHBsKFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9lc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJlc2xpbnRcIiwgXCJlc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgIC8vICAgIHRoaXMucXVlcnlFc0xpbnRFbnZQYXJhbSgpLFxyXG4gICAgICAgIC8vICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgLy8pO1xyXG5cclxuICAgICAgICAvLy8vIHRlc3RlbVxyXG4gICAgICAgIC8vaWYgKCF0aGlzLmNvbmZpZy5ub2RlanMpIHtcclxuICAgICAgICAvLyAgICBjb3B5VHBsKFxyXG4gICAgICAgIC8vICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeS90b29scy90ZXN0ZW1cIiksIFwiX3Rlc3RlbS5qc29uXCIpLFxyXG4gICAgICAgIC8vICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIFwidGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgLy8gICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAvLyAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAvLyAgICApO1xyXG5cclxuICAgICAgICAvLyAgICBjb25zdCB0ZXN0ZW1TdHVmZlBhdGggPSB0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5L3Rvb2xzL3Rlc3RlbS9ydW5uZXJcIik7XHJcblxyXG4gICAgICAgIC8vICAgIGdsb2Iuc3luYyhcIioqXCIsIHtcclxuICAgICAgICAvLyAgICAgICAgY3dkOiB0ZXN0ZW1TdHVmZlBhdGgsXHJcbiAgICAgICAgLy8gICAgICAgIG5vZGlyOiB0cnVlLFxyXG4gICAgICAgIC8vICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVzdGVtU3R1ZmZQYXRoLCBmaWxlKSxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIGZpbGUpXHJcbiAgICAgICAgLy8gICAgICAgICAgICApO1xyXG4gICAgICAgIC8vICAgICAgICB9KTtcclxuICAgICAgICAvL31cclxuXHJcbiAgICAgICAgLy8vLyAuZ2l0aWdub3JlXHJcbiAgICAgICAgLy9jb3B5VHBsKFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIi5naXRpZ25vcmVcIiksXHJcbiAgICAgICAgLy8gICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCIuZ2l0aWdub3JlXCIpLFxyXG4gICAgICAgIC8vICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAvLyAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICAvLyk7XHJcblxyXG4gICAgICAgIC8vLy8gUkVBRE1FLm1kXHJcbiAgICAgICAgLy9jb3B5VHBsKFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9SRUFETUUubWRcIiksXHJcbiAgICAgICAgLy8gICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJSRUFETUUubWRcIiksXHJcbiAgICAgICAgLy8gICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgIC8vICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICAvLyk7XHJcblxyXG4gICAgICAgIC8vLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgLy90aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0odGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzIHx8IHRoaXMuZGVmYXVsdERldkRlcGVuZGVuY2llcyk7XHJcbiAgICAgICAgLy9jb3B5VHBsKFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgLy8gICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgLy8gICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgIC8vICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgLy8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44K944O844K544Gu6Zub5b2i5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlU291cmNlVGVtcGxhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy9jb25zdCBfbW9kdWxlID0gcGF0aC5iYXNlbmFtZSh0aGlzLl9jb25maWcubW9kdWxlTmFtZSwgXCIuanNcIik7XHJcbiAgICAgICAgLy9jb25zdCBwYXJhbSA9IHtcclxuICAgICAgICAvLyAgICBzYW1wbGVDbGFzczogXy5jbGFzc2lmeShfbW9kdWxlKSxcclxuICAgICAgICAvLyAgICBzYW1wbGVNb2R1bGU6IF9tb2R1bGUsXHJcbiAgICAgICAgLy8gICAgYnVpbHQ6IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQsXHJcbiAgICAgICAgLy99O1xyXG5cclxuICAgICAgICAvL2NvbnN0IHNjcmlwdCA9ICgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgaWYgKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnKSB7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQgfHwgXCJcIjtcclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy8gICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgLy99KSgpO1xyXG5cclxuICAgICAgICAvLy8vIGluZGV4LnRzXHJcbiAgICAgICAgLy9jb3B5VHBsKFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcInNyY1wiLCBcIl9pbmRleC50c1wiKSxcclxuICAgICAgICAvLyAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgc2NyaXB0LCBfbW9kdWxlICsgXCIudHNcIiksXHJcbiAgICAgICAgLy8gICAgcGFyYW0sXHJcbiAgICAgICAgLy8gICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgIC8vKTtcclxuXHJcbiAgICAgICAgLy8vLyBpbmRleC5zcGVjLnRzXHJcbiAgICAgICAgLy9jb3B5VHBsKFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcInNyY1wiLCBcIl9pbmRleC5zcGVjLnRzXCIpLFxyXG4gICAgICAgIC8vICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIF9tb2R1bGUgKyBcIi5zcGVjLnRzXCIpLFxyXG4gICAgICAgIC8vICAgIHBhcmFtLFxyXG4gICAgICAgIC8vICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICAvLyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vY29uc3QgdnNQYXJhbSA9ICgoKSA9PiB7XHJcbiAgICAgICAgLy8gICAgY29uc3QgY3JlYXRlR1VJRCA9IFV0aWxzLmNyZWF0ZUdVSUQ7XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnN0IHBhcmFtOiBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uID0gJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcpO1xyXG5cclxuICAgICAgICAvLyAgICBwYXJhbS5wcm9qZWN0TmFtZSA9IHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZTtcclxuICAgICAgICAvLyAgICBwYXJhbS5wcm9qZWN0R1VJRCA9IGNyZWF0ZUdVSUQoKTtcclxuICAgICAgICAvLyAgICBwYXJhbS50eXBlcyA9IHBhcmFtLnR5cGVzLnJlcGxhY2UoXCJAXCIsIFwiJTQwXCIpOyAvLyBlc2NhcGUgXCJAXCIgdG8gXCIlNDBcIlxyXG4gICAgICAgIC8vICAgIHBhcmFtLm1haW5CYXNlTmFtZSA9IHRoaXMuX2NvbmZpZy5tYWluQmFzZU5hbWU7XHJcbiAgICAgICAgLy8gICAgcGFyYW0ubGljZW5zZSA9ICF0aGlzLl9jb25maWcucHJpdmF0ZTtcclxuXHJcbiAgICAgICAgLy8gICAgLy8gdG9vbHNcclxuICAgICAgICAvLyAgICBwYXJhbS53ZWJwYWNrID0gdGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpO1xyXG4gICAgICAgIC8vICAgIHBhcmFtLnRlc3RlbSA9ICF0aGlzLmNvbmZpZy5ub2RlanM7XHJcblxyXG4gICAgICAgIC8vICAgIHBhcmFtLm91dHB1dFNhbWVEaXIgPSB0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyO1xyXG5cclxuICAgICAgICAvLyAgICAvLyBzZXR1cCBidWlsdCBqcyBncm91cFxyXG4gICAgICAgIC8vICAgIHBhcmFtLmpzR3JvdXAgPSBbXTtcclxuICAgICAgICAvLyAgICBpZiAoIXBhcmFtLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAvLyAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0uYnVpbHQgKyBcIlxcXFxcIixcclxuICAgICAgICAvLyAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGRfdHM6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtYXA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtaW5fbWFwOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG4gICAgICAgIC8vICAgIGlmICh0aGlzLmNvbmZpZy5taW5pZnkpIHtcclxuICAgICAgICAvLyAgICAgICAgLy8gc2V0dXAgcGtnIGdyb3VwXHJcbiAgICAgICAgLy8gICAgICAgIHBhcmFtLmpzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLnBrZyArIFwiXFxcXFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGRfdHM6IGZhbHNlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgbWFwOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIG1pbl9tYXA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgIH0pO1xyXG4gICAgICAgIC8vICAgIH1cclxuXHJcbiAgICAgICAgLy8gICAgLy8gc2V0dXAgdGVzdCBqcyBncm91cFxyXG4gICAgICAgIC8vICAgIHBhcmFtLnRzR3JvdXAgPSBbXHJcbiAgICAgICAgLy8gICAgICAgIHtcclxuICAgICAgICAvLyAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0udGVzdCArIFwiXFxcXHVuaXRcXFxcXCIsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lICsgXCIuc3BlY1wiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGVwZW5kZWU6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICBtYXA6IHRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXIsXHJcbiAgICAgICAgLy8gICAgICAgIH0sXHJcbiAgICAgICAgLy8gICAgXTtcclxuICAgICAgICAvLyAgICBpZiAocGFyYW0ub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgIC8vICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5idWlsdCArIFwiXFxcXFwiLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgICAgIG1hcDogdHJ1ZSxcclxuICAgICAgICAvLyAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gICAgfVxyXG5cclxuICAgICAgICAvLyAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgLy99KSgpO1xyXG5cclxuICAgICAgICAvLy8vIC5zbG5cclxuICAgICAgICAvL2NvcHlUcGwoXHJcbiAgICAgICAgLy8gICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgXCJfc29sdXRpb24uc2xuLnRwbFwiKSxcclxuICAgICAgICAvLyAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB2c1BhcmFtLnByb2plY3ROYW1lICsgXCIuc2xuXCIpLFxyXG4gICAgICAgIC8vICAgIHZzUGFyYW0sXHJcbiAgICAgICAgLy8gICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgIC8vKTtcclxuXHJcbiAgICAgICAgLy8vLyAuY3Nwcm9qXHJcbiAgICAgICAgLy8oKCkgPT4ge1xyXG4gICAgICAgIC8vICAgIGNvbnN0IHRvWG1sU3RyaW5nID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICBjb25zdCBob2dhbiA9IFV0aWxzLmhvZ2FuO1xyXG4gICAgICAgIC8vICAgICAgICBjb25zdCBub3JtYWxpemVUZXh0ID0gVXRpbHMubm9ybWFsaXplVGV4dDtcclxuICAgICAgICAvLyAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgICAgIC8vICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyAgICAgICAgY29uc3QgdHBsID0gcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgZmlsZSk7XHJcbiAgICAgICAgLy8gICAgICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmModHBsKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0aW9ucyk7XHJcbiAgICAgICAgLy8gICAgICAgIHJldHVybiBqc3QucmVuZGVyKHZzUGFyYW0pO1xyXG4gICAgICAgIC8vICAgIH07XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnN0IHRvWG1sRE9NID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHRvWG1sU3RyaW5nKGZpbGUpKSk7XHJcbiAgICAgICAgLy8gICAgfTtcclxuXHJcbiAgICAgICAgLy8gICAgY29uc3QgdG9YbWxOb2RlID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICByZXR1cm4gVXRpbHMuc3RyMlhtbE5vZGUodG9YbWxTdHJpbmcoZmlsZSkpO1xyXG4gICAgICAgIC8vICAgIH07XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnN0ICRwcm9qID0gdG9YbWxET00oXCJfcHJvamVjdC5jc3Byb2oudHBsXCIpO1xyXG4gICAgICAgIC8vICAgIGNvbnN0ICRncFRTID0gdG9YbWxOb2RlKFwiX3RzLml0ZW0uZ3JvdXAudHBsXCIpO1xyXG4gICAgICAgIC8vICAgIGNvbnN0ICRncEpTID0gdG9YbWxOb2RlKFwiX2pzLml0ZW0uZ3JvdXAudHBsXCIpO1xyXG5cclxuICAgICAgICAvLyAgICAkcHJvalxyXG4gICAgICAgIC8vICAgICAgICAuZmluZChcIkl0ZW1Hcm91cFwiKVxyXG4gICAgICAgIC8vICAgICAgICAubGFzdCgpXHJcbiAgICAgICAgLy8gICAgICAgIC5hZnRlcigkZ3BUUylcclxuICAgICAgICAvLyAgICAgICAgLmFmdGVyKCRncEpTKVxyXG4gICAgICAgIC8vICAgICAgICA7XHJcblxyXG4gICAgICAgIC8vICAgIGNvbnN0IGZvcm1hdFhNTCA9IFV0aWxzLmZvcm1hdFhNTDtcclxuICAgICAgICAvLyAgICBjb25zdCBkc3RQYXRoID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLmNzcHJvalwiKTtcclxuICAgICAgICAvLyAgICBkZWJ1ZyhVdGlscy54bWxOb2RlMlN0cigkcHJvaikpO1xyXG4gICAgICAgIC8vICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgZm9ybWF0WE1MKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSkpO1xyXG4gICAgICAgIC8vfSkoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JDb3Jkb3ZhIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQ29yZG92YShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSVdlYkFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQnJvd3NlclxyXG4gKiBAYnJpZWYgV2ViIEJyb3dzZXIg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JCcm93c2VyIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElXZWJBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SVdlYkFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQnJvd3NlciB9IGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1icm93c2VyXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcldlYihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckJyb3dzZXIoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi91dGlsc1wiO1xyXG5leHBvcnQgeyBVdGlscyB9O1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbixcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSVByb2plY3RDb25maWdyYXRpb24sXHJcbiAgICBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElFeHRlcm5hbE1vZHVsZUluZm8sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVzLFxyXG4gICAgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbixcclxuICAgIElEZXNrdG9wQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSVdlYkFwcENvbmZpZ3JhdGlvbixcclxuICAgIC8vLy9cclxuICAgIG5ld0dlbmVyYXRvclxyXG59IGZyb20gXCIuL2dlbmVyYXRvcnNcIjtcclxuXHJcbmV4cG9ydCB7XHJcbiAgICBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24sXHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSUxpYnJhcnlDb25maWdyYXRpb24sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVJbmZvLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlcyxcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbn07XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDRFBMaWJcclxuICogQGJyaWVmIENEUCBib2lsZXJwbGF0ZSDnlJ/miJDmqZ/og73jgpLmj5DkvpvjgZnjgovjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENEUExpYiB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtYWluIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBVdGlscy5zZXRTZXR0aW5ncyhjb25maWcuc2V0dGluZ3MpO1xyXG4gICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3IoY29uZmlnKS5ydW4oKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2NkcC1saWIudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGdsb2IsXHJcbiAgICBjaGFsayxcclxuICAgIF8sXHJcbiAgICAkLFxyXG4gICAgLy8vL1xyXG4gICAgZXhlY0NvbW1hbmQsXHJcbiAgICBnZXRTcGlubmVyLFxyXG4gICAgZ2V0VGFyZ2V0RGlyLFxyXG4gICAgdGVtcGxhdGVQYXRoLFxyXG4gICAgY29weVRwbCxcclxuICAgIGxvZyxcclxuICAgIGRlYnVnLFxyXG4gICAgdHJhbnNsYXRlLFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJwYWNrQ29uZmlncmF0aW9uLFxyXG59IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQmFzZVxyXG4gKiBAYnJpZWYg44GZ44G544Gm44GuIEdlbmVyYXRvciDjga7ml6Llrprjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICBwcml2YXRlIF9wcm9qZWN0Um9vdERpcjogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uc3RydWN0b3JcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge0lQcm9qZWN0Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44KwXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbikge1xyXG4gICAgICAgIHRoaXMuX3Byb2plY3RSb290RGlyID0gZ2V0VGFyZ2V0RGlyKCkgP1xyXG4gICAgICAgICAgICBnZXRUYXJnZXREaXIoKSA6XHJcbiAgICAgICAgICAgIHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCB0aGlzLl9jb25maWcucHJvamVjdE5hbWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnID0gJC5leHRlbmQoe30sIHRoaXMuZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKSwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5wcml2YXRlID0gXCJOT05FXCIgPT09IHRoaXMuX2NvbmZpZy5saWNlbnNlO1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm91dHB1dFNhbWVEaXJcclxuICAgICAgICAgICAgPSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyA9PT0gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdDtcclxuXHJcbiAgICAgICAgKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMgPSAoKGVudjogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZW52KSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwibm9kZVwiOlxyXG4gICAgICAgICAgICAgICAgY2FzZSBcImVsZWN0cm9uXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZW52KTtcclxuXHJcbiAgICAgICAgZGVidWcoSlNPTi5zdHJpbmdpZnkodGhpcy5fY29uZmlnLCBudWxsLCA0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHB1YmljIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlh6bnkIbplovlp4sgKOOCqOODs+ODiOODqilcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBydW4oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLl9jb25maWcuYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJjcmVhdGVcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1bkNyZWF0ZSgpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5rbm93biBhY3Rpb246IFwiICsgdGhpcy5fY29uZmlnLmFjdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBhYnN0cmFjdCBtZXRob2RzOlxyXG5cclxuICAgIC8vIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICBhYnN0cmFjdCBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjtcclxuXHJcbiAgICAvLyBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgIGFic3RyYWN0IGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+O1xyXG5cclxuICAgIC8vIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdO1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcm90ZWN0ZWQgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAsuaNl+ODhuOCreOCueODiOOCkumAmuefpVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkg44Ot44O844Kr44Op44Kk44K644Oq44K944O844K544Kt44O844KS5oyH5a6aXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBwcm9ncmVzcyhrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay5jeWFuKHRyYW5zbGF0ZShrZXkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorablkYrjg4bjgq3jgrnjg4jjgpLpgJrnn6VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5IOODreODvOOCq+ODqeOCpOOCuuODquOCveODvOOCueOCreODvOOCkuaMh+WumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgd2FybihrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZyhjaGFsay55ZWxsb3codHJhbnNsYXRlKGtleSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdvcmsgZGlyZWN0b3J5IOOBruWkieabtFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZGlyKGRpcmVjdG9yeTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgcHJvY2Vzcy5jaGRpcihkaXJlY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvamVjdCByb290IGRpcmVjdG9yeSDjga7lj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgcm9vdERpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Um9vdERpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlbXBsYXRlIGRpcmVjdG9yeSDjgpLmjIflrprjgZfjgabphY3kuIvjga7jg5XjgqHjgqTjg6vjgpLjgrPjg5Tjg7xcclxuICAgICAqIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIOOBruioreWumuOBjOWPjeaYoOOBleOCjOOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgIOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHN0Um9vdCDjgrPjg5Tjg7zlhYjjgpLmjIflrpouIOaMh+WumuOBjOeEoeOBhOWgtOWQiOOBryByb290RGlyIOOBjOioreWumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29weVRwbERpcih0YXJnZXQ6IHN0cmluZywgZHN0Um9vdD86IHN0cmluZywgb3B0aW9ucz86IGdsb2IuSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBkc3RSb290ID0gZHN0Um9vdCB8fCB0aGlzLnJvb3REaXI7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgY3dkOiB0ZW1wbGF0ZVBhdGgodGFyZ2V0KSxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdDogdHJ1ZSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRzdCA9IHBhdGguam9pbihkc3RSb290LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3NyYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3BrZy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnBrZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2J1aWx0LywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvZG9jLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZG9jKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGFzay8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rlc3QvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlcy8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3RlbXBcXC8vLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlbXAgKyBcIi9cIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2xpYi8sICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5saWIgfHwgXCJsaWJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2V4dGVybmFsLywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5leHRlcm5hbCB8fCBcImV4dGVybmFsXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9wb3J0aW5nLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZyB8fCBcInBvcnRpbmdcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Jlcy8sICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5yZXMgfHwgXCJyZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvc2NyaXB0LyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0IHx8IFwic2NyaXB0c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJzY3JpcHRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9zdHlsZXNoZWV0LyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc3R5bGVzaGVldCB8fCBcInN0eWxlc2hlZXRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInN0eWxlc2hlZXRzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC90ZW1wbGF0ZS8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnLnRlbXBsYXRlIHx8IFwidGVtcGxhdGVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInRlbXBsYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhwYXRoLmpvaW4odGVtcGxhdGVQYXRoKHRhcmdldCksIGZpbGUpLCBkc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbm9kZSBtb2R1bGUg44GuIHZlcnNpb24g5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtQcm9taXNlPHN0cmluZz59IHZlcnNpb24gdGV4dFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlOb2RlTW9kdWxlTGF0ZXN0VmVyc2lvbihuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB2ZXJzaW9uOiBzdHJpbmc7XHJcbiAgICAgICAgICAgIGV4ZWNDb21tYW5kKFwibnBtXCIsIFtcImluZm9cIiwgbmFtZSwgXCJ2ZXJzaW9uXCJdLCB7XHJcbiAgICAgICAgICAgICAgICBzdGRpbzogXCJwaXBlXCIsXHJcbiAgICAgICAgICAgICAgICBzcGlubmVyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgc3Rkb3V0OiAoZGF0YTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyc2lvbiA9IF8udHJpbShkYXRhKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh2ZXJzaW9uKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKHJlYXNvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChyZWFzb24pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga7plovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHREZXZEZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcImNvbnZlcnQtc291cmNlLW1hcFwiLCAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImRlbFwiLCAgICAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImVzbGludFwiLCAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIm5wbS1ydW4tYWxsXCIsICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInBsYXRvXCIsICAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInNvdXJjZS1tYXBcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInNvdXJjZS1tYXAtbG9hZGVyXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInRzbGludFwiLCAgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInR5cGVkb2NcIiwgICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInR5cGVzY3JpcHRcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdO1xyXG4gICAgICAgIGNvbnN0IG1pbmlmeSA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcInVnbGlmeS1qc1wiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIGVzOiBbXCJlczVcIl0sICAgIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktZXNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlczogW1wiZXMyMDE1XCJdLCB9LFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGxldCBleHRyYSA9IFtdO1xyXG4gICAgICAgIGlmICgoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1pbmlmeSkge1xyXG4gICAgICAgICAgICBleHRyYSA9IGV4dHJhLmNvbmNhdChtaW5pZnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcIndlYnBhY2tcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwibnljXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcIm55Y1wiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ0ZXN0ZW1cIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwidGVzdGVtXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcInBoYW50b21qcy1wcmVidWlsdFwiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJwaGFudG9tanMtcHJlYnVpbHRcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShiYXNlLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlcGVuZGVuY2llcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtJRGVwZW5kZW5jeVtdfSBkZXBlbmRlbmNpZXMg5L6d5a2Y6Zai5L+C44Oq44K544OIXHJcbiAgICAgKiBAcmV0dXJuIHt7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbjsgfVtdfSDjg4bjg7Pjg5fjg6zjg7zjg4jjg5Hjg6njg6Hjg7zjgr/jgavmjIflrprjgZnjgovphY3liJdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFzeW5jIHF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0oZGVwZW5kZW5jaWVzOiBJRGVwZW5kZW5jeVtdKTogUHJvbWlzZTx7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbiB9W10+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwiYmFzZS5jcmVhdGUucXVlcnlWZXJzaW9uXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gPHsgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuOyB9W10+ZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kLmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWRlcGVuZC5lcy5maW5kKChlc1ZlcnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZXMgPT09IGVzVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlYnVnKEpTT04uc3RyaW5naWZ5KGRlcGVuZHMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAoY29udGV4dDogYW55KTogYW55ID0+IHtcclxuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBjb250ZXh0ICYmICF0aGlzLl9jb25maWcuc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gZ2V0U3Bpbm5lcihjaGFsay55ZWxsb3coY29udGV4dCksIDUpO1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwaW5uZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBkZXBlbmRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobnVsbCA9PSBkZXBlbmRzW2ldLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBwcm9ncmVzcyhkZXBlbmRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS52ZXJzaW9uID0gXCJeXCIgKyBhd2FpdCB0aGlzLnF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24oZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzKHNwaW5uZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09PSBuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS5sYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3ZWJwYWNrLmNvbmZpZy5qcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxpYnJhcnlUYXJnZXQg44Gr5oyH5a6a44GZ44KL5paH5a2X5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeVdlYnBhY2tMaWJyYXJ5VGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICgoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1vZHVsZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1vbmpzMlwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiYW1kXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhbWRcIjtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW1kXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVzbGludHJjIOOBriBlbnYg44Gr5oyH5a6a44GZ44KLIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBlbnYg44Gr5oyH5a6a44GZ44KL44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeUVzTGludEVudlBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgY29tcGlsZVNldHRpbmcgPSA8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlczY6IFwiZXM1XCIgIT09IGNvbXBpbGVTZXR0aW5nLmVzLFxyXG4gICAgICAgICAgICBub2RlOiBcIndlYlwiICE9PSBjb21waWxlU2V0dGluZy5lbnYsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbi50b29scyDjg5fjg63jg5Hjg4bjgqPjga7mjIflrprnirbms4HjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lIOODhOODvOODq+WQjeOCkuaMh+WumlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZTog5oyH5a6a44GV44KM44Gm44GE44KLIC8gZmFsc2U6IOaMh+WumuOBleOCjOOBpuOBhOOBquOBhFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbmFibGVUb29sKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykudG9vbHMuZmluZCgodG9vbCkgPT4gbmFtZSA9PT0gdG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSDlh6bnkIbjga7jgqjjg7Pjg4jjg6pcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBydW5DcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVCYXNlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa44GuIGNyZWF0ZSDlh6bnkIZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVCYXNlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJiYXNlLmNyZWF0ZS5mb3VuZGF0aW9uXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdERpcigpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weUJhc2VTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlDb21tb25GaWxlcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weVRhc2tTY3JpcHRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4jjg4fjgqPjg6zjgq/jg4jjg6rjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9qZWN0RGlyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMucm9vdERpcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IodHJhbnNsYXRlKFwiYmFzZS5jcmVhdGUuZXJyb3IuYWxyZWFkeUV4aXN0XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMubWtkaXJzU3luYyh0aGlzLnJvb3REaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weUJhc2VTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwiYmFzZS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln7rmnKzjg5XjgqHjgqTjg6vjga7jgrPjg5Tjg7xcclxuICAgICAqIHRlbXBsYXRlIOOBruOCs+ODlOODvOOCguihjOOBhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlDb21tb25GaWxlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHRoaXMucm9vdERpcjtcclxuXHJcbiAgICAgICAgLy8gLm5wbWlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiLm5wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCIubnBtaWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQkFOTkVSXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0JBTk5FUlwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJCQU5ORVJcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gTElDRU5TRVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZmlnLmxpY2Vuc2UpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkFwYWNoZS0yLjBcIjpcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuQXBhY2hlLTIuMFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIkxJQ0VOU0VcIiksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNSVRcIjpcclxuICAgICAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTElDRU5TRS5NSVRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jb3B5cmlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTk9USUNFXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX05PVElDRVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJOT1RJQ0VcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gYnVpbGQgdG9vbHM6IHdlYnBhY2tcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJV2VicGFja0NvbmZpZ3JhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIG5vZGVqczogKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMsXHJcbiAgICAgICAgICAgICAgICBndWlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRhc2tQYXRoOiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRhc2ssXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcInRvb2xzL3dlYnBhY2svX3dlYnBhY2suY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJ3ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRhc2sgc2NyaXB0IOOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlUYXNrU2NyaXB0cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Rhc2tcIik7XHJcbiAgICAgICAgY29uc3QgZHN0RGlyID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgdGFzayksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCB0YXNrKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5leHBvcnQgeyBVdGlscyB9O1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjgr3jg7zjgrnjg4fjgqPjg6zjgq/jg4jjg6rjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uIHtcclxuICAgIHNjcmlwdD86IHN0cmluZzsgICAgICAgICAgICAvLyBqcyh0cykg44OV44Kh44Kk44Or5L+d5a2Y5YWIXHJcbiAgICBzdHlsZXNoZWV0Pzogc3RyaW5nOyAgICAgICAgLy8gY3NzKGNzcykg44OV44Kh44Kk44Or5L+d5a2Y5YWIXHJcbiAgICB0ZW1wbGF0ZT86IHN0cmluZzsgICAgICAgICAgLy8gaHRtbCh0ZW1wbGF0ZSkg44OV44Kh44Kk44Or5L+d5a2Y5YWIXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jjg4fjgqPjg6zjgq/jg4jjg6rjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgc3JjPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgr3jg7zjgrnjgrPjg7zjg4njga7jg6vjg7zjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHBrZz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OR44OD44Kx44O844K45YWI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBidWlsdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCs+ODs+ODkeOCpOODq+WFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgZG9jPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4njgq3jg6Xjg6Hjg7Pjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRhc2s/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K/44K544Kv44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0ZXN0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODhuOCueODiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdHlwZXM/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlU2NyaXB0IOWei+Wumue+qeODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVtcD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDkvZzmpa3jg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHNyY0NvbmZpZz86IElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbjsgICAgLy8gSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uXHJcbiAgICBsaWI/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGludGVybmFsIGxpYnJhcnkgbW9kdWxlIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgZXh0ZXJuYWw/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleHRlcm5hbCBtb2R1bGUg44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBwb3J0aW5nPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvcnRpbmcgbW9kdWxlIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcmVzPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6rjgr3jg7zjgrnjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSURlcGVuZGVuY3lcclxuICogQGJyaWVmIHBhY2thZ2UuanNvbiDjgavmjIflrprjgZnjgosgZGVwZW5kZW5jaWVzIOaDheWgseOCkuagvOe0jeOBmeOCi+OCpOODs+OCv+ODvOODleOCp+OCpOOCuVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJRGVwZW5kZW5jeSB7XHJcbiAgICBuYW1lOiBzdHJpbmc7ICAgICAgICAgICAvLyBtb2R1bGUgbmFtZSBleCkgXCJ0eXBlc2NyaXB0XCJcclxuICAgIHZlcnNpb24/OiBzdHJpbmc7ICAgICAgIC8vIOaMh+WumuODkOODvOOCuOODp+ODsy4g54Sh5oyH5a6a44Gu5aC05ZCI44Gv5pyA5paw44OQ44O844K444On44OzXHJcbiAgICBlcz86IHN0cmluZ1tdOyAgICAgICAgICAvLyDmjIflrprjgZXjgozjgZ8gRVMgdmVyc2lvbiDjga7jgajjgY3jga7jgb/mnInlirnjgavjgZnjgotcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODl+ODreOCuOOCp+OCr+ODiOWFsemAmuOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJUHJvamVjdENvbmZpZ3JhdGlvbiB7XHJcbiAgICBwcm9qZWN0TmFtZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBwcm9qZWN0VHlwZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jnqK7poZ4gZXgpIFwibGlicmFyeVwiXHJcbiAgICBhY3Rpb246IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBleCkgXCJjcmVhdGVcIlxyXG4gICAgdmVyc2lvbjogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OQ44O844K444On44OzIGV4KSBcIjEuMC4wXCJcclxuICAgIGxpY2Vuc2U6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODqeOCpOOCu+ODs+OCuSBleCkgXCJBcGFjaGUtMi4wXCJcclxuICAgIHByaXZhdGU/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaXZhdGUg44OR44OD44Kx44O844K444Gu5aC05ZCIIHRydWVcclxuICAgIHNldHRpbmdzOiBVdGlscy5JR2xvYmFsU2V0dGluZ3M7ICAgICAgICAgICAgICAgIC8vIOODreOCsOOCquODl+OCt+ODp+ODs1xyXG4gICAgbW9kdWxlTmFtZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW1wb3J0IOOBq+aMh+WumuOBmeOCiyDjg6Ljgrjjg6Xjg7zjg6vlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBtYWluQmFzZU5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6HjgqTjg7Pjg5XjgqHjgqTjg6vlkI0gZXgpIFwiY2RwLWxpYlwiIC8gXCJpbmRleFwiXHJcbiAgICBuYW1lc3BhY2U/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6vjg7zjg4jlkI3liY3nqbrplpNcclxuICAgIHN0cnVjdHVyZUNvbmZpZz86IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uOyAgIC8vIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uXHJcbiAgICBjb3B5cmlnaHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg5Tjg7zjg6njgqTjg4jmloflrZfliJcgZXgpIFwiQ29weXJpZ2h0IChjKSAyMDE3IFNvbnkgQ29ycG9yYXRpb25cIlxyXG4gICAgZGV2RGVwZW5kZW5jaWVzPzogSURlcGVuZGVuY3lbXTsgICAgICAgICAgICAgICAgLy8g6ZaL55m655So5L6d5a2Y44Oi44K444Ol44O844Or5oOF5aCxXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OT44Or44OJ44K/44O844Ky44OD44OI44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbiB7XHJcbiAgICBlcz86IFwiZXM1XCIgfCBcImVzMjAxNVwiOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDjga4gdHJhbnNwaWxlIHRhcmdldFxyXG4gICAgbW9kdWxlPzogXCJub25lXCIgfCBcImNvbW1vbmpzXCIgfCBcImFtZFwiIHwgXCJ1bWRcIjsgICAgICAgICAgICAgICAvLyBKYXZhU2NyaXB0IG1vZHVsZSBzeXN0ZW1cclxuICAgIGVudj86IFwid2ViXCIgfCBcIm5vZGVcIiB8IFwiZWxlY3Ryb25cIiB8IFwiZWxlY3Ryb24tcmVuZGVyZXJcIjsgICAgLy8g5a6f6KGM55Kw5aKD44GuIHRhcmdldFxyXG4gICAgbm9kZWpzPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gXCJub2RlXCIgfCBcImVsZWN0cm9uXCIg44Gu5aC05ZCI44GrIHRydWVcclxuICAgIG1pbmlmeT86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODquODquODvOOCueaZguOBqyBtaW5pZnkg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIC8vIGJ1aWxkIHRvb2xcclxuICAgIHRvb2xzPzogc3RyaW5nW107ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOaXouWumuOBriBidWlsZCB0b29sIGV4KSBbXCJ3ZWJwYWNrXCJdXHJcbiAgICBvdXRwdXRTYW1lRGlyPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcmMg44GoIGJ1aWx0IOOBjOWQjOOBmOODh+OCo+ODrOOCr+ODiOODquOBq+OBquOCi+WgtOWQiCB0cnVlXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElXZWJwYWNrQ29uZmlncmF0aW9uXHJcbiAqIEBicmllZiBXZWJwYWNrIOeUqOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJV2VicGFja0NvbmZpZ3JhdGlvbiB7XHJcbiAgICBub2RlanM6IGJvb2xlYW47ICAgIC8vIFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIOOBruWgtOWQiOOBqyB0cnVlXHJcbiAgICBndWlkZTogYm9vbGVhbjsgICAgIC8vIGd1aWRlIOOCs+ODoeODs+ODiOOCkuS7mOWKoOOBmeOCi+WgtOWQiOOBryB0cnVlIOOCkuaMh+WumlxyXG4gICAgdGFza1BhdGg6IHN0cmluZzsgICAvLyAndGFzaycg44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb25cclxuICogQGJyaWVmIFZpc3VhbCBTdHVkaW8g55So44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24gZXh0ZW5kcyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBwcm9qZWN0TmFtZTogc3RyaW5nOyAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgcHJvamVjdEdVSUQ6IHN0cmluZzsgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiCBHVUlEIGV4KSB7NTFCNDEzNTktOEQyQy00MkRGLTg0MTQtRTg1QjAyOTkzMjM4fVxyXG4gICAgbWFpbkJhc2VOYW1lOiBzdHJpbmc7ICAgICAgIC8vIOODoeOCpOODs+ODleOCoeOCpOODq+WQjSBleCkgXCJjZHAtbGliXCIgLyBpbmRleFxyXG4gICAgbGljZW5zZTogYm9vbGVhbjsgICAgICAgICAgIC8vIExJQ0VOU0Ug44KS6L+95Yqg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIHdlYnBhY2s6IGJvb2xlYW47ICAgICAgICAgICAvLyB3ZWJwYWNrLmNvbmZpZy5qcyDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgdGVzdGVtOiBib29sZWFuOyAgICAgICAgICAgIC8vIHRlc3RlbSBydW5uZXIg44KS6L+95Yqg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIG91dHB1dFNhbWVEaXI6IGJvb2xlYW47ICAgICAvLyBzcmMg44GoIGJ1aWx0IOOBjOWQjOOBmOODh+OCo+ODrOOCr+ODiOODquOBq+OBquOCi+WgtOWQiCB0cnVlXHJcbiAgICB0c0dyb3VwOiB7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmc7ICAgLy8gXCJob2dlaG9nZVxcXCJcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nOyAgICAgICAvLyBcImNkcC1saWJcIlxyXG4gICAgICAgIGRlcGVuZGVlOiBib29sZWFuOyAgICAgIC8vIOS+neWtmOWFiOOCkui/veWKoOOBmeOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWFwOiBib29sZWFuOyAgICAgICAgICAgLy8gLm1hcCDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgfVtdO1xyXG4gICAganNHcm91cDoge1xyXG4gICAgICAgIHJlbGF0aXZlUGF0aDogc3RyaW5nOyAgIC8vIFwiaG9nZWhvZ2VcXFwiXHJcbiAgICAgICAgZmlsZU5hbWU6IHN0cmluZzsgICAgICAgLy8gXCJjZHAtbGliXCJcclxuICAgICAgICBkZXBlbmRlZTogYm9vbGVhbjsgICAgICAvLyDkvp3lrZjlhYjjgpLov73liqDjgZnjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIGRfdHM6IGJvb2xlYW47ICAgICAgICAgIC8vIC5kLnRzIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWFwOiBib29sZWFuOyAgICAgICAgICAgLy8gLm1hcCDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIG1pbl9tYXA6IGJvb2xlYW47ICAgICAgIC8vIC5taW4gLm1hcCDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgfVtdO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9iYXNlL2ludGVyZmFjZXMudHMiLCJpbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vdXRpbHMvc2V0dGluZ3NcIjtcclxuXHJcbmltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JMaWJyYXJ5IH0gZnJvbSBcIi4vbGlicmFyeVwiO1xyXG5pbXBvcnQgeyBuZXdHZW5lcmF0b3JNb2JpbGUgfSBmcm9tIFwiLi9tb2JpbGVcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yRGVza3RvcCB9IGZyb20gXCIuL2Rlc2t0b3BcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yV2ViIH0gZnJvbSBcIi4vd2ViXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9iYXNlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2xpYnJhcnlcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2Rlc2t0b3BcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vd2ViXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvcihjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICBzd2l0Y2ggKGNvbmZpZy5wcm9qZWN0VHlwZSkge1xyXG4gICAgICAgIGNhc2UgXCJsaWJyYXJ5XCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIm1vYmlsZVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcImRlc2t0b3BcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvckRlc2t0b3AoY29uZmlnKTtcclxuICAgICAgICBjYXNlIFwid2ViXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JXZWIoY29uZmlnKTtcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwidW5zdXBwb3J0ZWQgcHJvamVjdCBraW5kOiBcIiArIGNvbmZpZy5wcm9qZWN0VHlwZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvZ2VuZXJhdG9ycy9pbmRleC50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7IHNwYXduLCBTcGF3bk9wdGlvbnMgfSBmcm9tIFwiY2hpbGRfcHJvY2Vzc1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgd2hpY2gsXHJcbiAgICB1dWlkLFxyXG4gICAgU3Bpbm5lcixcclxufSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgYXNzZXJ0LFxyXG4gICAgZ2V0TGliUGF0aCxcclxufSBmcm9tIFwiLi9zZXR0aW5nc1wiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjb21tYW5kIGxpbmUgZXJyb3IgYW5kIGtpbGwgcHJvY2Vzcy5cclxuICogV2hlbiB0aGUgYXBwbGljYXRpb24gcmVjZWl2ZWQgZXJyb3IgZnJvbSBjbGksIHBsZWFzZSBjYWxsIHRoaXMgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3IgIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGFzc2VydChmYWxzZSwgZXJyb3IpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIFwidGVtcGxhdGVzXCIg44OH44Kj44Os44Kv44OI44Oq44GL44KJ44Gu44OR44K544KS5Y+W5b6XLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHRhcmdldCDjgr/jg7zjgrLjg4Pjg4jjgpLmjIflrpouIG51bGwg44Gu5aC05ZCI44Gv44CBdGVtcGxhdGVzIOOCkui/lOWNtFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHRlbXBsYXRlcy9ob2dlaG9nZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHRlbXBsYXRlUGF0aCh0YXJnZXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSB0YXJnZXQpIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJ0ZW1wbGF0ZXNcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiLCB0YXJnZXQpO1xyXG4gICAgfVxyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGlubmVyIGluc3RhbmNlLlxyXG4gKiBDTEkgaGVscGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBbZm9ybWF0XSAgc3Bpbm5lciBmb3JtYXQgc3RyaW5nLlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBbaW5kZXhdICAgc3Bpbm5lciBpbmRleCBkZWZpbmVkIGJ5IGNsaS1zcGlubmVyLiAoZGVmYXVsdDogcmFuZG9tIFswLTI5XSlcclxuICogQHJldHVybiB7U3Bpbm5lcn0gY2xpLXNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3Bpbm5lcihmb3JtYXQ/OiBzdHJpbmcsIGluZGV4PzogbnVtYmVyKTogeyBzdGFydDogKCkgPT4gdm9pZDsgc3RvcDogKGNsZWFuPzogYm9vbGVhbikgPT4gdm9pZDsgfSB7XHJcbiAgICBjb25zdCBzcGlubmVycyA9IFtcclxuICAgICAgICBcInwvLVxcXFxcIixcclxuICAgICAgICBcIuKUpOKUmOKUtOKUlOKUnOKUjOKUrOKUkFwiLFxyXG4gICAgICAgIFwi4pei4pej4pek4pelXCIsXHJcbiAgICAgICAgXCLiloziloDilpDiloRcIixcclxuICAgICAgICBcIuKWieKWiuKWi+KWjOKWjeKWjuKWj+KWjuKWjeKWjOKWi+KWiuKWiVwiLFxyXG4gICAgICAgIFwi4paB4paD4paE4paF4paG4paH4paI4paH4paG4paF4paE4paDXCIsXHJcbiAgICAgICAgXCLimLHimLLimLRcIixcclxuICAgICAgICBcIi5vT0AqXCIsXHJcbiAgICAgICAgXCLil5Dil5Pil5Hil5JcIixcclxuICAgICAgICAvLy8vXHJcbiAgICAgICAgXCLil6Hil6Eg4oqZ4oqZIOKXoOKXoFwiLFxyXG4gICAgICAgIFwi4pag4pah4paq4parXCIsXHJcbiAgICAgICAgXCLihpDihpbihpHihpfihpLihpjihpPihplcIixcclxuICAgICAgICBcIi5vT8KwT28uXCIsXHJcbiAgICBdO1xyXG4gICAgY29uc3QgZm10ID0gZm9ybWF0IHx8IFwiJXNcIjtcclxuICAgIGNvbnN0IHNwaW5uZXIgPSBuZXcgU3Bpbm5lcihmbXQpO1xyXG4gICAgY29uc3QgaWR4ID0gKG51bGwgIT0gaW5kZXggJiYgMCA8PSBpbmRleCAmJiBpbmRleCA8IDE0KSA/IGluZGV4IDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgc3Bpbm5lci5zZXRTcGlubmVyU3RyaW5nKHNwaW5uZXJzW2lkeF0pO1xyXG4gICAgcmV0dXJuIHNwaW5uZXI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9uc1xyXG4gKiBAYnJpZWYgbm9ybWFsaXplVGV4dCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBlb2w/OiBzdHJpbmc7ICAgLy8gZGVmYXVsdDogb3MuRU9MXHJcbiAgICBib20/OiBib29sZWFuOyAgLy8gZGVmYXVsdDogdHJ1ZVxyXG4gICAgdGFiPzogbnVtYmVyOyAgIC8vIHRhYiDjgpLlpInmj5vjgZnjgovjgrnjg5rjg7zjgrnjga7mlbDjgpLmjIflrpouIGRlZmF1bHQ6IOWkieaPm+OBl+OBquOBhFxyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIHRleHQgbGluZS1mZWVkLlxyXG4gKiBmb3Igd2luZG93cyBnaXQgdXNlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgIHRleHQgICAgICBpbnB1dCB0ZXh0LlxyXG4gKiBAcGFyYW0gIHtOb3JtYWxpemVUZXh0T3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbi5cclxuICogQHJldHVybiB7U3RyaW5nfSBub3JtYWxpemVkIHRleHQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBOb3JtYWxpemVUZXh0T3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IE5vcm1hbGl6ZVRleHRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFx1ZmVmZi9nbSwgXCJcIikgICAvLyByZW1vdmUgYm9tXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcclxcbi9nbSwgXCJcXG5cIikgICAgLy8gb25jZSBcIlxcblwiXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcci9nbSwgXCJcXG5cIilcclxuICAgIDtcclxuXHJcbiAgICBpZiAob3B0LmJvbSkge1xyXG4gICAgICAgIHRleHQgPSBcIlxcdWZlZmZcIiArIHRleHQ7XHJcbiAgICB9XHJcbiAgICBpZiAoXCJcXG5cIiAhPT0gb3B0LmVvbCkge1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbi9nbSwgb3B0LmVvbCk7XHJcbiAgICB9XHJcbiAgICBpZiAob3B0LnRhYikge1xyXG4gICAgICAgIGNvbnN0IHNwYWNlcyA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHQudGFiOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHM7XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXHQvZ20sIHNwYWNlcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRleHQ7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnNcclxuICogQGJyaWVmIGV4ZWNDb21tYW5kKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9ucyBleHRlbmRzIFNwYXduT3B0aW9ucyB7XHJcbiAgICBzcGlubmVyPzoge1xyXG4gICAgICAgIGZvcm1hdD86IHN0cmluZzsgICAgLy8gZXgpIFwiJXNcIlxyXG4gICAgICAgIGluZGV4PzogbnVtYmVyOyAgICAgLy8gMCAtIDkg44Gu5pWw5YCk44KS5oyH5a6aXHJcbiAgICB9O1xyXG4gICAgc3Rkb3V0PzogKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcclxuICAgIHN0ZGVycj86IChkYXRhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIGNvbW1hbmQgbGluZSBieSBzcGF3bi5cclxuICogY2FsbCBzcGF3bi4gaWYgZXJyb3Igb2NjdXJlZCwgY3VpIGlzIGtpbGxlZCBwcm9jY2Vzcy5cclxuICpcclxuICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgICAgICBjb21tYW5kICAgIG1haW4gY29tbWFuZC4gZXgpIFwiY29yZG92YVwiXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmdbXX0gICAgICAgICAgICAgYXJncyAgICAgICBjb21tYW5kIGFyZ3MuIGV4KSBbXCJwbHVnaW5cIiwgXCJhZGRcIiwgcGx1Z2luTmFtZV1cclxuICogQHBhcmFtICAge0V4ZWNDb21tYW5kT3B0aW9uc30gICBbb3B0aW9uc10gIGNsaS1zcGlubmVyXCJzIG9wdGlvbnMuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGVycm9yIGNvZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogRXhlY0NvbW1hbmRPcHRpb25zKTogUHJvbWlzZTxudW1iZXI+IHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0OiBFeGVjQ29tbWFuZE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgICAgICBzdGRpbzogXCJpbmhlcml0XCIsXHJcbiAgICAgICAgICAgIHNwaW5uZXI6IHsgZm9ybWF0OiBcIiVzXCIgfSxcclxuICAgICAgICAgICAgc3Rkb3V0OiAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7IC8qIG5vb3AgKi8gfSxcclxuICAgICAgICAgICAgc3RkZXJyOiAoZGF0YTogc3RyaW5nKTogdm9pZCA9PiB7IC8qIG5vb3AgKi8gfSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgd2hpY2goY29tbWFuZCwgKGVycm9yLCByZXNvbHZlZENvbW1hbmQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcGlubmVyID0gb3B0LnNwaW5uZXIgPyBnZXRTcGlubmVyKG9wdC5zcGlubmVyLmZvcm1hdCwgb3B0LnNwaW5uZXIuaW5kZXgpIDogbnVsbDtcclxuICAgICAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBzcGF3bihyZXNvbHZlZENvbW1hbmQsIGFyZ3MsIG9wdClcclxuICAgICAgICAgICAgICAgIC5vbihcImVycm9yXCIsIGhhbmRsZUVycm9yKVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnN0b3AodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoY29kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChcInBpcGVcIiA9PT0gb3B0LnN0ZGlvKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRvdXQub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0LnN0ZG91dChkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBjaGlsZC5zdGRlcnIub24oXCJkYXRhXCIsIChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3B0LnN0ZGVycihkYXRhLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgQ29weVRlbXBsYXRlT3B0aW9uc1xyXG4gKiBAYnJpZWYgY29weVRwbCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgZGVsaW1pdGVycz86IFwie3sgfX1cIiB8IFwiPCUgJT5cIjsgLy8gdGVtcGxhdGUg44Gr5L2/55So44GZ44KLIGRlbGltaXRlci4gZGVmYXVsdDogXCJ7eyB9fVwiXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDb3B5IHRlbXBsYXRlIHdpdGggaG9nYW4uXHJcbiAqIHN5bmMgZnVuY3Rpb25cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgc3JjICAgICAgIHNvdXJjZSBmaWxlIHBhdGguXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgIGRzdCAgICAgICBkZXN0aW5hdGlvbiBmaWxlIHBhdGguXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgICAgICAgICAgIHBhcmFtcyAgICB0ZW1wbGF0ZSBwYXJhbWV0ZXJzLlxyXG4gKiBAcGFyYW0ge0NvcHlUZW1wbGF0ZU9wdGlvbnN9ICBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY29weVRwbChzcmM6IHN0cmluZywgZHN0OiBzdHJpbmcsIHBhcmFtczogT2JqZWN0LCBvcHRpb25zPzogQ29weVRlbXBsYXRlT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3B0ID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyhzcmMpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHQpO1xyXG4gICAgY29uc3Qgb3V0cHV0ID0gbm9ybWFsaXplVGV4dChqc3QucmVuZGVyKHBhcmFtcyksIG9wdCk7XHJcblxyXG4gICAgZnMuZW5zdXJlRmlsZVN5bmMoZHN0KTtcclxuICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0LCBvdXRwdXQsIFwidXRmOFwiKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBHVUlEIGdlbmVyYXRlLlxyXG4gKiByZXR1cm5lZCBhcyBXaW5kb3dzIHJlZ2lzdHJ5IHR5cGUgZm9ybWF0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR1VJRCgpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIFwie1wiICsgdXVpZC52NCgpLnRvVXBwZXJDYXNlKCkgKyBcIn1cIjtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgWE1MIERPTSBub2RlLlxyXG4gKlxyXG4gKiBAcGFyYW0gICBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJucyBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cjJYbWxOb2RlKHN0cjogc3RyaW5nKTogSlF1ZXJ5IHtcclxuICAgIGxldCBmdWxsWE1MID0gdHJ1ZTtcclxuICAgIGlmICghLzw/eG1sL2kudGVzdChzdHIpKSB7XHJcbiAgICAgICAgZnVsbFhNTCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgJHhtbCA9ICQoJC5wYXJzZVhNTChzdHIpKTtcclxuICAgIHJldHVybiBmdWxsWE1MID8gJHhtbCA6ICR4bWwuY2hpbGRyZW4oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgc3RyaW5nIGZyb20gRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHJldHVybiB7alF1ZXJ5fSBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHhtbE5vZGUyU3RyKCR4bWw6IEpRdWVyeSk6IHN0cmluZyB7XHJcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlZiAqL1xyXG4gICAgcmV0dXJuIG5ldyBYTUxTZXJpYWxpemVyKCkuc2VyaWFsaXplVG9TdHJpbmcoJHhtbFswXSk7XHJcbiAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLXVuZGVmICovXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnNcclxuICogQGJyaWVmIGZvcm1hdFhNTCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zIGV4dGVuZHMgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgc3RlcD86IG51bWJlcjsgICAvLyDnqbrnmb3jgrnjg5rjg7zjgrnmlbAuIGRlZmF1bHQ6IDJcclxufVxyXG5cclxuLyoqXHJcbiAqIFhNTCBmb3JtYXR0ZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgIHN0ciAgICAgICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHBhcmFtICB7Rm9ybWF0WG1sT3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGZvcm1hdHRlZCBYTUxcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXRYTUwoc3RyOiBzdHJpbmcsIG9wdGlvbnM/OiBGb3JtYXRYbWxPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogRm9ybWF0WG1sT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIHN0ZXA6IDIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuICAgIGxldCB4bWwgPSBcIlwiO1xyXG4gICAgbGV0IHBhZCA9IDA7XHJcbiAgICBsZXQgaW5kZW50OiBudW1iZXI7XHJcbiAgICBsZXQgbm9kZTogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0IHN0ckFyciA9IG5vcm1hbGl6ZVRleHQoc3RyLCB7IGVvbDogXCJcXG5cIiB9KVxyXG4gICAgICAgIC5yZXBsYWNlKC8oPikoPCkoXFwvKikvZywgXCIkMVxcbiQyJDNcIikgLy8gaW5zZXJ0IExGIHRvIGVhY2ggbm9kZSBvbmNlLlxyXG4gICAgICAgIC5zcGxpdChcIlxcblwiKTtcclxuXHJcbiAgICBjb25zdCBzcGFjZXMgPSAobGVuOiBudW1iZXIpID0+IHtcclxuICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgX2luZGVudCA9IGxlbiAqIG9wdC5zdGVwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX2luZGVudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHMgKz0gXCIgXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzO1xyXG4gICAgfTtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgbm9kZSA9ICQudHJpbShzdHJBcnJbaV0pO1xyXG4gICAgICAgIGlmIChub2RlLm1hdGNoKC8uKzxcXC9cXHdbXj5dKj4kLykpIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFwvXFx3LykpIHtcclxuICAgICAgICAgICAgaWYgKHBhZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHBhZCAtPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcd1tePl0qW14vXT4uKiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhtbCArPSBzcGFjZXMocGFkKSArIG5vZGUgKyBcIlxcblwiO1xyXG4gICAgICAgIHBhZCArPSBpbmRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgeG1sID0geG1sXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcblxcbi9nbSwgXCJcXG5cIilcclxuICAgICAgICAucmVwbGFjZSgvXiArXFxuL2dtLCBcIlwiKVxyXG4gICAgICAgIDtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplVGV4dCh4bWwsIG9wdCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy90b29scy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifVxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xpLXNwaW5uZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNsaS1zcGlubmVyXCIsXCJjb21tb25qczJcIjpcImNsaS1zcGlubmVyXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn1cbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsb2JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImdsb2JcIixcImNvbW1vbmpzMlwiOlwiZ2xvYlwifVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW12ZXItcmVnZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn1cbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInV1aWRcIixcImNvbW1vbmpzMlwiOlwidXVpZFwifVxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hpY2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4bWxkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIkhvZ2FuXCIsXCJjb21tb25qc1wiOlwiaG9nYW4uanNcIixcImNvbW1vbmpzMlwiOlwiaG9nYW4uanNcIixcImFtZFwiOlwiaG9nYW4uanNcIn1cbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwifVxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZS5zdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCIsXCJjb21tb25qczJcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCJ9XG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdfQ==