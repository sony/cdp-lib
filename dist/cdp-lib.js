/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-06-15T03:38:42.086Z
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
const base_1 = __webpack_require__(0);
const fs = base_1.Utils.fs;
const glob = base_1.Utils.glob;
const $ = base_1.Utils.$;
const _ = base_1.Utils._;
const debug = base_1.Utils.debug;
const templatePath = base_1.Utils.templatePath;
const copyTpl = base_1.Utils.copyTpl;
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
        else if (node.match(/^<\w[^>]*[^/]>.*$/)) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjFhNzdmYjgyZjM4YTYzMWY5NzQiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2luZGV4LnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJvc1wiIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL3Rvb2xzLnRzIiwid2VicGFjazovLy9leHRlcm5hbC8gXCJjaGlsZF9wcm9jZXNzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaEVBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7QUNEakMsaUM7Ozs7Ozs7Ozs7OztBQ0FBLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQXlDM0IsZ0JBQUU7QUF4Q04scUNBQTZCO0FBeUN6QixvQkFBSTtBQXhDUixzQ0FBa0M7QUF5QzlCLHNCQUFLO0FBeENULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCxxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUErQjtBQXlDM0Isc0JBQUs7QUF4Q1QsNENBQTRDO0FBeUN4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XHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDMzKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2MWE3N2ZiODJmMzhhNjMxZjk3NCIsImV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJhc2VcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gXCIuL2xpYnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdG9vbHNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gXCJnbG9iXCI7XHJcbmltcG9ydCAqIGFzIGhvZ2FuIGZyb20gXCJob2dhbi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBfbCBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCAqIGFzIF9zIGZyb20gXCJ1bmRlcnNjb3JlLnN0cmluZ1wiO1xyXG5pbXBvcnQgKiBhcyB3aGljaCBmcm9tIFwid2hpY2hcIjtcclxuaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwidXVpZFwiO1xyXG5pbXBvcnQgKiBhcyBjaGFsayBmcm9tIFwiY2hhbGtcIjtcclxuaW1wb3J0ICogYXMgc2VtdmVyUmVnZXggZnJvbSBcInNlbXZlci1yZWdleFwiO1xyXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSBcImNsaS1zcGlubmVyXCI7XHJcblxyXG5jb25zdCAkOiBKUXVlcnlTdGF0aWMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgX3dpbmRvdyA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QganNkb20gPSByZXF1aXJlKFwianNkb21cIik7XHJcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGpzZG9tLkpTRE9NKSB7ICAgIC8vIHYxMCtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqc2RvbS5KU0RPTSgpLndpbmRvdztcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHY5LjEyLnhcclxuICAgICAgICAgICAgcmV0dXJuIGpzZG9tLmpzZG9tKCkuZGVmYXVsdFZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBwYXRjaCBzY29wZTpcclxuICAgICgocm9vdDogYW55KSA9PiB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBqc2RvbSA5LjQuMCAtIDkuMTIuMCDjgavlrp/oo4XjgZXjgozjgabjgYTjgosgRE9NUGFyc2VyIOOBryBYTUwg44GuIHNlcmlhbGl6ZSDjgYzjgafjgY3jgarjgYTjgZ/jgoEsXHJcbiAgICAgICAgICogeG1sZG9tIOOBq+e9ruOBjeaPm+OBiOOCi1xyXG4gICAgICAgICAqIGpzZG9tIDEwLjEuMCDjgb7jgafli5XjgYvjgarjgYTjgZPjgajjgpLnorroqo1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCB4bWxkb20gPSByZXF1aXJlKFwieG1sZG9tXCIpO1xyXG4gICAgICAgIHJvb3QuRE9NUGFyc2VyID0geG1sZG9tLkRPTVBhcnNlcjtcclxuICAgICAgICAvLyB4bWxkb20g44Gr44GvIGRvbS50b1N0cmluZygpIOOBjOWun+ijheOBleOCjOOBpuOBhOOCi+OBjOOAgWdsb2JhbCDjgavjgoIgZXhwb3J0IOOBmeOCi1xyXG4gICAgICAgICg8YW55Pmdsb2JhbCkuWE1MU2VyaWFsaXplciA9IHJvb3QuWE1MU2VyaWFsaXplciA9IHhtbGRvbS5YTUxTZXJpYWxpemVyO1xyXG4gICAgfSkoX3dpbmRvdyk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmUoXCJqcXVlcnlcIikoX3dpbmRvdyk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgdHlwZSBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IHR5cGVvZiBfcyAmIHR5cGVvZiBfbDtcclxuY29uc3QgX206IE1peGluZWRVbmRlcnNjb3JlU3RhdGljID0gPGFueT5fbC5taXhpbig8YW55Pl9zLmV4cG9ydHMoKSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgX20gYXMgXyxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgc2VtdmVyUmVnZXgsXHJcbiAgICBTcGlubmVyLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL2xpYnMudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IGZzLCAkIH0gZnJvbSBcIi4vbGlic1wiO1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUdsb2JhbFNldHRpbmdzXHJcbiAqIEBicmllZiDjgrDjg63jg7zjg5Djg6voqK3lrprjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIGZvcmNlPzogYm9vbGVhbjsgICAgICAgICAgICAvLyDjgqjjg6njg7zntpnntprnlKhcclxuICAgIHZlcmJvc2U/OiBib29sZWFuOyAgICAgICAgICAvLyDoqbPntLDjg63jgrBcclxuICAgIHNpbGVudD86IGJvb2xlYW47ICAgICAgICAgICAvLyBzaWxlbnQgbW9kZVxyXG4gICAgdGFyZ2V0RGlyPzogc3RyaW5nOyAgICAgICAgIC8vIOS9nOalreODh+OCo+ODrOOCr+ODiOODqlxyXG4gICAgbGFuZz86IFwiZW4tVVNcIiB8IFwiamEtSlBcIjtcclxufVxyXG5cclxubGV0IF9zZXR0aW5nczogSUdsb2JhbFNldHRpbmdzID0ge1xyXG4gICAgZm9yY2U6IGZhbHNlLFxyXG4gICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgbGFuZzogXCJlbi1VU1wiLFxyXG59O1xyXG5cclxubGV0IF9saWJQYXRoOiBzdHJpbmc7ICAgLy8gY2RwLWxpYiDjga7lrZjlnKjjgZfjgabjgYTjgosgcGF0aFxyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIOioreWumuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtJR2xvYmFsU2V0dGluZ3N9IG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgX3NldHRpbmdzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOioreWumuaMh+WumlxyXG4gKlxyXG4gKiBAcGFyYW0ge0lHbG9iYWxTZXR0aW5nc30gb3B0aW9ucyDjg63jgrDjgavkvb/nlKjjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTZXR0aW5ncyhzZXR0aW5nczogSUdsb2JhbFNldHRpbmdzKTogdm9pZCB7XHJcbiAgICBpZiAoc2V0dGluZ3MpIHtcclxuICAgICAgICBfc2V0dGluZ3MuZm9yY2UgICAgID0gc2V0dGluZ3MuZm9yY2UgICAgICAgIHx8IF9zZXR0aW5ncy5mb3JjZTtcclxuICAgICAgICBfc2V0dGluZ3MudmVyYm9zZSAgID0gc2V0dGluZ3MudmVyYm9zZSAgICAgIHx8IF9zZXR0aW5ncy52ZXJib3NlO1xyXG4gICAgICAgIF9zZXR0aW5ncy5zaWxlbnQgICAgPSBzZXR0aW5ncy5zaWxlbnQgICAgICAgfHwgX3NldHRpbmdzLnNpbGVudDtcclxuICAgICAgICBfc2V0dGluZ3MudGFyZ2V0RGlyID0gc2V0dGluZ3MudGFyZ2V0RGlyICAgIHx8IF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbiAgICAgICAgX3NldHRpbmdzLmxhbmcgICAgICA9IHNldHRpbmdzLmxhbmcgICAgICAgICB8fCBfc2V0dGluZ3MubGFuZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYW5nOiBcImVuLVVTXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFwiY2RwLWxpYlwiIOOBjOWtmOWcqOOBmeOCi+ODkeOCueOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IGNkcC1saWIg44G444GuIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaWJQYXRoKCk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSBfbGliUGF0aCkge1xyXG4gICAgICAgIGNvbnN0IFRSWV9DT1VOVCA9IDM7XHJcbiAgICAgICAgbGV0IHRyaWVkID0gMDtcclxuICAgICAgICBfbGliUGF0aCA9IF9fZGlybmFtZTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoVFJZX0NPVU5UIDw9IHRyaWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImxpYiBwYXRoIGlzIG5vdCByZXNvbHZlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2xpYlBhdGggPSBwYXRoLmpvaW4oX2xpYlBhdGgsIFwiLi5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gcGF0aC5qb2luKF9saWJQYXRoLCBcImNkcC1saWJcIik7XHJcbiAgICAgICAgICAgIGlmIChmcy5wYXRoRXhpc3RzU3luYyhjaGVjaykpIHtcclxuICAgICAgICAgICAgICAgIF9saWJQYXRoID0gY2hlY2s7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmllZCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbGliUGF0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaMh+WumuOBleOCjOOBnyB0YXJnZXREaXIg44KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gdGFyZ2V0RGlyIOOBuOOBriBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGFyZ2V0RGlyKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gX3NldHRpbmdzLnRhcmdldERpcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmxvZygpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSB7QW55W119ICBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBsb2cobWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIV9zZXR0aW5ncy5zaWxlbnQpIHtcclxuICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog6Kmz57Sw44Ot44Kw5Ye65YqbXHJcbiAqIGNvbnNvbGUuZGVidWcoKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0ge0FueVtdfSAgb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZGVidWcobWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIV9zZXR0aW5ncy5zaWxlbnQgJiYgX3NldHRpbmdzLnZlcmJvc2UpIHtcclxuICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJERUJVRzogXCIgKyBtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmpJzoqLxcclxuICogY29uc29sZS5hc3NlcnQoKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIHtCb29sZWFufSB0ZXN0ICAgICAgICAgICDmpJzoqLzjgZnjgovlvI9cclxuICogQHBhcmFtIHtTdHJpbmd9ICBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIHtBbnlbXX0gICBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnQodGVzdD86IGJvb2xlYW4sIG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCF0ZXN0KSB7XHJcbiAgICAgICAgaWYgKF9zZXR0aW5ncy5mb3JjZSkge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxubGV0IF9sYW5nOiBhbnk7XHJcblxyXG4vKipcclxuICog44Ot44O844Kr44Op44Kk44K6XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkg44Kt44O85paH5a2X5YiXXHJcbiAqIEByZXR1cm4g57+76Kiz44GV44KM44Gf5paH5a2X5YiXXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghX2xhbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBfbGFuZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJyZXMvbG9jYWxlc1wiLCBcIm1lc3NhZ2VzLlwiICsgX3NldHRpbmdzLmxhbmcgKyBcIi5qc29uXCIpLCBcInV0ZjhcIikudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTGFuZ3VhZ2UgcmVzb3VyY2UgSlNPTiBwYXJzZSBlcnJvcjogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc291Y2UgPSAkLmV4dGVuZCh7fSwgX2xhbmcpO1xyXG4gICAgY29uc3QgcHJvcHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgd2hpbGUgKDAgPCBwcm9wcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBwcm9wID0gcHJvcHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAocmVzb3VjZVtwcm9wXSkge1xyXG4gICAgICAgICAgICByZXNvdWNlID0gcmVzb3VjZVtwcm9wXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwicmVzb3VjZSBub3QgZm91bmQuIGtleTogXCIgKyBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb3VjZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3NldHRpbmdzLnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgeyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiwgR2VuZXJhdG9yQmFzZSB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JFbGVjdHJvblxyXG4gKiBAYnJpZWYgRGVza3RvcCBFbGVjdHJvbiDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckVsZWN0cm9uIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3L2FwcFwiLCAvLyBUT0RPOiDmmqvlrppcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgc3JjQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQ6IFwic2NyaXB0c1wiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldDogXCJzdHlsZXNoZWV0c1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwidGVtcGxhdGVzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SURlc2t0b3BBcHBDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIFRPRE86XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KFwidW5kZXIgY29uc3RydWN0aW9uLlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidWlsZC10cy1jbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLW5vcm1hbGl6ZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElEZXNrdG9wQXBwQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElEZXNrdG9wQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvZGVza3RvcC9nZW5lcmF0b3ItZWxlY3Rvcm9uLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JFbGVjdHJvbiB9IGZyb20gXCIuL2dlbmVyYXRvci1lbGVjdG9yb25cIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWVsZWN0b3JvblwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JEZXNrdG9wKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yRWxlY3Ryb24oY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvZGVza3RvcC9pbmRleC50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0ICogYXMgb3MgZnJvbSBcIm9zXCI7XHJcbmltcG9ydCB7XHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElEZXBlbmRlbmN5LFxyXG4gICAgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbixcclxuICAgIEdlbmVyYXRvckJhc2UsXHJcbiAgICBVdGlscyxcclxufSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJTGlicmFyeUNvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmNvbnN0IGZzICAgICAgICAgICAgPSBVdGlscy5mcztcclxuY29uc3QgZ2xvYiAgICAgICAgICA9IFV0aWxzLmdsb2I7XHJcbmNvbnN0ICQgICAgICAgICAgICAgPSBVdGlscy4kO1xyXG5jb25zdCBfICAgICAgICAgICAgID0gVXRpbHMuXztcclxuY29uc3QgZGVidWcgICAgICAgICA9IFV0aWxzLmRlYnVnO1xyXG5jb25zdCB0ZW1wbGF0ZVBhdGggID0gVXRpbHMudGVtcGxhdGVQYXRoO1xyXG5jb25zdCBjb3B5VHBsICAgICAgID0gVXRpbHMuY29weVRwbDtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yTW9kdWxlXHJcbiAqIEBicmllZiBMaWJyYXJ5IE1vZHVsZSDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvck1vZHVsZSBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJzcmNcIixcclxuICAgICAgICAgICAgcGtnOiBcImRpc3RcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYnVpbHRcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICB0ZW1wOiBcIi50ZW1wXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuZW5zdXJlTW9kdWxlUHJvcHMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdFNldHRpbmdzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTb3VyY2VUZW1wbGF0ZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlVmlzdWFsU3R1ZGlvU29sdXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJzcmNtYXAuanNcIixcclxuICAgICAgICAgICAgXCJidW5kbGUtZmluYWxpemVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwicmVtYXAtY292ZXJhZ2UuanNcIixcclxuICAgICAgICBdO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcm90ZWN0ZWQgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmWi+eZuuaZguOBruS+neWtmOODouOCuOODpeODvOODq+ODquOCueODiOOBruWPluW+l1xyXG4gICAgICog5b+F6KaB44Gr5b+c44GY44Gm44Kq44O844OQ44O844Op44Kk44OJXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7SURlcGVuZGVuY3l9XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgZGVmYXVsdERldkRlcGVuZGVuY2llcygpOiBJRGVwZW5kZW5jeVtdIHtcclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gc3VwZXIuZGVmYXVsdERldkRlcGVuZGVuY2llcy5jb25jYXQoW1xyXG4gICAgICAgICAgICB7IG5hbWU6IFwiQHR5cGVzL2phc21pbmVcIiwgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZHRzLWJ1bmRsZVwiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHlwZXNjcmlwdC1mb3JtYXR0ZXJcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgIF0pO1xyXG5cclxuICAgICAgICBjb25zdCBleHRyYSA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5ub2RlanMpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwiamFzbWluZS1ub2RlXCIsIHZlcnNpb246IFwiXjIuMC4wXCIsIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInJlcXVpcmVqc1wiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGRlcGVuZHMuY29uY2F0KGV4dHJhKSwgKGRlcGVuZCkgPT4gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJTGlicmFyeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJTGlicmFyeUNvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBtb2R1bGUg5ZCNLCBtYWluIOODleOCoeOCpOODq+WQjeOBruS/neiovFxyXG4gICAgICogLSAxOiBtb2R1bGVOYW1lIOOBjOaMh+WumuOBleOCjOOBpuOBhOOCi+WgtOWQiOOBr+S9v+eUqOOBmeOCi1xyXG4gICAgICogLSAyOiBwcm9qZWN0TmFtZSDjgYzkvb/nlKjlj6/og73jgarloLTlkIjjga/jgZ3jgozjgpLkvb/nlKjjgZnjgotcclxuICAgICAqIC0gMzogcHJvamVjdE5hbWUg44GM5L2/55So5LiN5Y+v44Gu5aC05ZCI44Gv44CBXCItXCIg44Gk44Gq44GO5paH5a2X5YiX44KS55Sf5oiQ44GZ44KLXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZW5zdXJlTW9kdWxlUHJvcHMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gbW9kdWxlIG5hbWVcclxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lKSB7XHJcbiAgICAgICAgICAgIGlmICghL14uKlsoXFxcXHxcXHN8L3w6fCp8P3xcInw8fD58fCldLiokLy50ZXN0KHRoaXMuY29uZmlnLnByb2plY3ROYW1lKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubW9kdWxlTmFtZSA9IHRoaXMuY29uZmlnLnByb2plY3ROYW1lO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcubW9kdWxlTmFtZSA9IF8udHJpbShfLmRhc2hlcml6ZSh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSksIFwiLVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1ZyhcIm1vZHVsZU5hbWU6IFwiICsgdGhpcy5jb25maWcubW9kdWxlTmFtZSk7XHJcblxyXG4gICAgICAgIC8vIG1haW4gZmlsZSBuYW1lXHJcbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jb25maWcubWFpbkJhc2VOYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLm1haW5CYXNlTmFtZSA9IHRoaXMuY29uZmlnLm1vZHVsZU5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlYnVnKFwibWFpbkJhc2VOYW1lOiBcIiArIHRoaXMuY29uZmlnLm1haW5CYXNlTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg4fjgqPjg6zjgq/jg4jjg6rmp4vmiJDmg4XloLHjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwibGlicmFyeS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4joqK3lrprjg5XjgqHjgqTjg6vjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVQcm9qZWN0U2V0dGluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gcHJvamVjdC5jb25maWcuanNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfcHJvamVjdC5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicHJvamVjdC5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRzY29uZmlnXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAvLyB0ZXN0IHRzY29uZmlnLmpzb25cclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy50ZXN0Lmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwidW5pdFwiLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIG1haW4gdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLm91dHB1dC1zYW1lLWRpci5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGVzbGludHJjLmpzb25cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcImVzbGludFwiLCBcImVzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMucXVlcnlFc0xpbnRFbnZQYXJhbSgpLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRlc3RlbVxyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcubm9kZWpzKSB7XHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeS90b29scy90ZXN0ZW1cIiksIFwiX3Rlc3RlbS5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInJ1bm5lclwiLCBcInRlc3RlbS5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRlc3RlbVN0dWZmUGF0aCA9IHRlbXBsYXRlUGF0aChcImxpYnJhcnkvdG9vbHMvdGVzdGVtL3J1bm5lclwiKTtcclxuXHJcbiAgICAgICAgICAgIGdsb2Iuc3luYyhcIioqXCIsIHtcclxuICAgICAgICAgICAgICAgIGN3ZDogdGVzdGVtU3R1ZmZQYXRoLFxyXG4gICAgICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVzdGVtU3R1ZmZQYXRoLCBmaWxlKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInJ1bm5lclwiLCBmaWxlKVxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIC5naXRpZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCIuZ2l0aWdub3JlXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIi5naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gUkVBRE1FLm1kXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX1JFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJSRUFETUUubWRcIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHBhY2thZ2UuanNvblxyXG4gICAgICAgIHRoaXMuY29uZmlnLmRldkRlcGVuZGVuY2llcyA9IGF3YWl0IHRoaXMucXVlcnlEZXBlbmRlbmNpZXNQYXJhbSh0aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMgfHwgdGhpcy5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzKTtcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfcGFja2FnZS5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInBhY2thZ2UuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgr3jg7zjgrnjga7pm5vlvaLkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVTb3VyY2VUZW1wbGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCBfbW9kdWxlID0gcGF0aC5iYXNlbmFtZSh0aGlzLl9jb25maWcubW9kdWxlTmFtZSwgXCIuanNcIik7XHJcbiAgICAgICAgY29uc3QgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgIHNhbXBsZUNsYXNzOiBfLmNsYXNzaWZ5KF9tb2R1bGUpLFxyXG4gICAgICAgICAgICBzYW1wbGVNb2R1bGU6IF9tb2R1bGUsXHJcbiAgICAgICAgICAgIGJ1aWx0OiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcmlwdCA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnLnNjcmlwdCB8fCBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8vIGluZGV4LnRzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwic3JjXCIsIFwiX2luZGV4LnRzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgc2NyaXB0LCBfbW9kdWxlICsgXCIudHNcIiksXHJcbiAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXguc3BlYy50c1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcInNyY1wiLCBcIl9pbmRleC5zcGVjLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwidW5pdFwiLCBfbW9kdWxlICsgXCIuc3BlYy50c1wiKSxcclxuICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmlzdWFsIFN0dWRpbyDjga7jgr3jg6rjg6Xjg7zjgrfjg6fjg7Pjg5XjgqHjgqTjg6vkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVWaXN1YWxTdHVkaW9Tb2x1dGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBjb25zdCB2c1BhcmFtID0gKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgY3JlYXRlR1VJRCA9IFV0aWxzLmNyZWF0ZUdVSUQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwYXJhbTogSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbiA9ICQuZXh0ZW5kKHt9LCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3ROYW1lICAgICAgID0gdGhpcy5fY29uZmlnLnByb2plY3ROYW1lO1xyXG4gICAgICAgICAgICBwYXJhbS5wcm9qZWN0R1VJRCAgICAgICA9IGNyZWF0ZUdVSUQoKTtcclxuICAgICAgICAgICAgcGFyYW0udHlwZXMgICAgICAgICAgICAgPSBwYXJhbS50eXBlcy5yZXBsYWNlKFwiQFwiLCBcIiU0MFwiKTsgLy8gZXNjYXBlIFwiQFwiIHRvIFwiJTQwXCJcclxuICAgICAgICAgICAgcGFyYW0ubWFpbkJhc2VOYW1lICAgICAgPSB0aGlzLl9jb25maWcubWFpbkJhc2VOYW1lO1xyXG4gICAgICAgICAgICBwYXJhbS5saWNlbnNlICAgICAgICAgICA9ICF0aGlzLl9jb25maWcucHJpdmF0ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRvb2xzXHJcbiAgICAgICAgICAgIHBhcmFtLndlYnBhY2sgPSB0aGlzLmlzRW5hYmxlVG9vbChcIndlYnBhY2tcIik7XHJcbiAgICAgICAgICAgIHBhcmFtLnRlc3RlbSA9ICF0aGlzLmNvbmZpZy5ub2RlanM7XHJcblxyXG4gICAgICAgICAgICBwYXJhbS5vdXRwdXRTYW1lRGlyID0gdGhpcy5jb25maWcub3V0cHV0U2FtZURpcjtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHVwIGJ1aWx0IGpzIGdyb3VwXHJcbiAgICAgICAgICAgIHBhcmFtLmpzR3JvdXAgPSBbXTtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbS5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5qc0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0uYnVpbHQgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRfdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbl9tYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm1pbmlmeSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgcGtnIGdyb3VwXHJcbiAgICAgICAgICAgICAgICBwYXJhbS5qc0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0ucGtnICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZF90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbWFwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldHVwIHRlc3QganMgZ3JvdXBcclxuICAgICAgICAgICAgcGFyYW0udHNHcm91cCA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLnRlc3QgKyBcIlxcXFx1bml0XFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUgKyBcIi5zcGVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5idWlsdCArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gLnNsblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3NvbHV0aW9uLnNsbi50cGxcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5zbG5cIiksXHJcbiAgICAgICAgICAgIHZzUGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyAuY3Nwcm9qXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9YbWxTdHJpbmcgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBob2dhbiA9IFV0aWxzLmhvZ2FuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IFV0aWxzLm5vcm1hbGl6ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRwbCA9IHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyh0cGwpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc3QucmVuZGVyKHZzUGFyYW0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxET00gPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHRvWG1sU3RyaW5nKGZpbGUpKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b1htbE5vZGUgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuc3RyMlhtbE5vZGUodG9YbWxTdHJpbmcoZmlsZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJHByb2ogPSB0b1htbERPTShcIl9wcm9qZWN0LmNzcHJvai50cGxcIik7XHJcbiAgICAgICAgICAgIGNvbnN0ICRncFRTID0gdG9YbWxOb2RlKFwiX3RzLml0ZW0uZ3JvdXAudHBsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BKUyA9IHRvWG1sTm9kZShcIl9qcy5pdGVtLmdyb3VwLnRwbFwiKTtcclxuXHJcbiAgICAgICAgICAgICRwcm9qXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIkl0ZW1Hcm91cFwiKVxyXG4gICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncFRTKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncEpTKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0WE1MID0gVXRpbHMuZm9ybWF0WE1MO1xyXG4gICAgICAgICAgICBjb25zdCBkc3RQYXRoID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLmNzcHJvalwiKTtcclxuICAgICAgICAgICAgZGVidWcoVXRpbHMueG1sTm9kZTJTdHIoJHByb2opKTtcclxuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkc3RQYXRoLCBmb3JtYXRYTUwoVXRpbHMueG1sTm9kZTJTdHIoJHByb2opKSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbGlicmFyeS9nZW5lcmF0b3ItbW9kdWxlLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JNb2R1bGUgfSBmcm9tIFwiLi9nZW5lcmF0b3ItbW9kdWxlXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvck1vZHVsZShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2luZGV4LnRzIiwiLyogdHNsaW50OmRpc2FibGU6bm8tdW51c2VkLXZhcmlhYmxlIG5vLXVudXNlZC12YXJzICovXHJcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXHJcblxyXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24sXHJcbiAgICBHZW5lcmF0b3JCYXNlLFxyXG4gICAgVXRpbHMsXHJcbn0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmNvbnN0IGZzICAgICAgICAgICAgPSBVdGlscy5mcztcclxuY29uc3QgZ2xvYiAgICAgICAgICA9IFV0aWxzLmdsb2I7XHJcbmNvbnN0ICQgICAgICAgICAgICAgPSBVdGlscy4kO1xyXG5jb25zdCBfICAgICAgICAgICAgID0gVXRpbHMuXztcclxuY29uc3QgZGVidWcgICAgICAgICA9IFV0aWxzLmRlYnVnO1xyXG5jb25zdCB0ZW1wbGF0ZVBhdGggID0gVXRpbHMudGVtcGxhdGVQYXRoO1xyXG5jb25zdCBjb3B5VHBsICAgICAgID0gVXRpbHMuY29weVRwbDtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgR2VuZXJhdG9yQ29yZG92YVxyXG4gKiBAYnJpZWYgTW9iaWxlIENvcmRvdmEg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JDb3Jkb3ZhIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcImFwcFwiLFxyXG4gICAgICAgICAgICBwa2c6IFwid3d3XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImFwcFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHRlbXA6IFwiLnRlbXBcIixcclxuICAgICAgICAgICAgbGliOiBcImxpYlwiLFxyXG4gICAgICAgICAgICBleHRlcm5hbDogXCJleHRlcm5hbFwiLFxyXG4gICAgICAgICAgICBwb3J0aW5nOiBcInBvcnRpbmdcIixcclxuICAgICAgICAgICAgcmVzOiBcInJlc1wiLFxyXG4gICAgICAgICAgICBzcmNDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHNjcmlwdDogXCJzY3JpcHRzXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiBcInN0eWxlc2hlZXRzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJ0ZW1wbGF0ZXNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvYmFja2JvbmVcIiwgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvanF1ZXJ5XCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvcmVxdWlyZWpzXCIsICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvanF1ZXJ5XCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvdW5kZXJzY29yZVwiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJhdXRvcHJlZml4ZXJcIiwgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjbGVhbi1jc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJmcy1leHRyYVwiLCAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJodG1sLW1pbmlmaWVyXCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJub2RlLXNhc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwb3N0Y3NzLWNsaVwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogZGVwZW5kLm5hbWUsIHZlcnNpb246IGRlcGVuZC52ZXJzaW9uLCB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGRlcGVuZHMuY29uY2F0KGV4dHJhKSwgKGRlcGVuZCkgPT4gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25maWdyYXRpb24g44Gr44Ki44Kv44K744K5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGNvbmZpZygpOiBJTW9iaWxlQXBwQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElNb2JpbGVBcHBDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvZ2VuZXJhdG9yLWNvcmRvdmEudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckNvcmRvdmEgfSBmcm9tIFwiLi9nZW5lcmF0b3ItY29yZG92YVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItY29yZG92YVwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JNb2JpbGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JDb3Jkb3ZhKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL21vYmlsZS9pbmRleC50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJV2ViQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCcm93c2VyXHJcbiAqIEBicmllZiBXZWIgQnJvd3NlciDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckJyb3dzZXIgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSVdlYkFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJV2ViQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2dlbmVyYXRvci1icm93c2VyLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JCcm93c2VyIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWJyb3dzZXJcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJyb3dzZXJcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQnJvd3Nlcihjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy93ZWIvaW5kZXgudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm9zXCJcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIFV0aWxzIGZyb20gXCIuL3V0aWxzXCI7XHJcbmV4cG9ydCB7IFV0aWxzIH07XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uLFxyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElMaWJyYXJ5Q29uZmlncmF0aW9uLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlSW5mbyxcclxuICAgIElFeHRlcm5hbE1vZHVsZXMsXHJcbiAgICBJTW9iaWxlQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSURlc2t0b3BBcHBDb25maWdyYXRpb24sXHJcbiAgICBJV2ViQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgLy8vL1xyXG4gICAgbmV3R2VuZXJhdG9yXHJcbn0gZnJvbSBcIi4vZ2VuZXJhdG9yc1wiO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbixcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSVByb2plY3RDb25maWdyYXRpb24sXHJcbiAgICBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24sXHJcbiAgICBJTGlicmFyeUNvbmZpZ3JhdGlvbixcclxuICAgIElFeHRlcm5hbE1vZHVsZUluZm8sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVzLFxyXG4gICAgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbixcclxuICAgIElEZXNrdG9wQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSVdlYkFwcENvbmZpZ3JhdGlvbixcclxufTtcclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGNsYXNzIENEUExpYlxyXG4gKiBAYnJpZWYgQ0RQIGJvaWxlcnBsYXRlIOeUn+aIkOapn+iDveOCkuaPkOS+m+OBmeOCi+OCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ0RQTGliIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIG1haW4gY29tbWFuZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGV4ZWN1dGUoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIFV0aWxzLnNldFNldHRpbmdzKGNvbmZpZy5zZXR0aW5ncyk7XHJcbiAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvcihjb25maWcpLnJ1bigpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY2RwLWxpYi50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGNoYWxrLFxyXG4gICAgXyxcclxuICAgICQsXHJcbiAgICAvLy8vXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIGdldFNwaW5uZXIsXHJcbiAgICBnZXRUYXJnZXREaXIsXHJcbiAgICB0ZW1wbGF0ZVBhdGgsXHJcbiAgICBjb3B5VHBsLFxyXG4gICAgbG9nLFxyXG4gICAgZGVidWcsXHJcbiAgICB0cmFuc2xhdGUsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSVdlYnBhY2tDb25maWdyYXRpb24sXHJcbn0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCYXNlXHJcbiAqIEBicmllZiDjgZnjgbnjgabjga4gR2VuZXJhdG9yIOOBruaXouWumuOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3Byb2plY3RSb290RGlyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVByb2plY3RDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdFJvb3REaXIgPSBnZXRUYXJnZXREaXIoKSA/XHJcbiAgICAgICAgICAgIGdldFRhcmdldERpcigpIDpcclxuICAgICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QmFzZVN0cnVjdHVyZSgpLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaXZhdGUgPSBcIk5PTkVcIiA9PT0gdGhpcy5fY29uZmlnLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykub3V0cHV0U2FtZURpclxyXG4gICAgICAgICAgICA9IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjID09PSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0O1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm5vZGVqcyA9ICgoZW52OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnYpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJub2RlXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWxlY3Ryb25cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5lbnYpO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9jb25maWcsIG51bGwsIDQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHpueQhumWi+WniyAo44Ko44Oz44OI44OqKVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImNyZWF0ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmtub3duIGFjdGlvbjogXCIgKyB0aGlzLl9jb25maWcuYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGFic3RyYWN0IG1ldGhvZHM6XHJcblxyXG4gICAgLy8g5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgIGFic3RyYWN0IGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uO1xyXG5cclxuICAgIC8vIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8g5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICBhYnN0cmFjdCBnZXQgdGFza0xpc3QoKTogc3RyaW5nW107XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCy5o2X44OG44Kt44K544OI44KS6YCa55+lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleSDjg63jg7zjgqvjg6njgqTjgrrjg6rjgr3jg7zjgrnjgq3jg7zjgpLmjIflrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2dyZXNzKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9nKGNoYWxrLmN5YW4odHJhbnNsYXRlKGtleSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHdvcmsgZGlyZWN0b3J5IOOBruWkieabtFxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZGlyKGRpcmVjdG9yeTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgcHJvY2Vzcy5jaGRpcihkaXJlY3RvcnkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcHJvamVjdCByb290IGRpcmVjdG9yeSDjga7lj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgcm9vdERpcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9qZWN0Um9vdERpcjtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRlbXBsYXRlIGRpcmVjdG9yeSDjgpLmjIflrprjgZfjgabphY3kuIvjga7jg5XjgqHjgqTjg6vjgpLjgrPjg5Tjg7xcclxuICAgICAqIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIOOBruioreWumuOBjOWPjeaYoOOBleOCjOOCi1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXQgIOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZHN0Um9vdCDjgrPjg5Tjg7zlhYjjgpLmjIflrpouIOaMh+WumuOBjOeEoeOBhOWgtOWQiOOBryByb290RGlyIOOBjOioreWumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY29weVRwbERpcih0YXJnZXQ6IHN0cmluZywgZHN0Um9vdD86IHN0cmluZywgb3B0aW9ucz86IGdsb2IuSU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBkc3RSb290ID0gZHN0Um9vdCB8fCB0aGlzLnJvb3REaXI7XHJcbiAgICAgICAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgICAgICAgICAgY3dkOiB0ZW1wbGF0ZVBhdGgodGFyZ2V0KSxcclxuICAgICAgICAgICAgbm9kaXI6IHRydWUsXHJcbiAgICAgICAgICAgIGRvdDogdHJ1ZSxcclxuICAgICAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwgb3B0aW9ucylcclxuICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRzdCA9IHBhdGguam9pbihkc3RSb290LFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3NyYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3BrZy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnBrZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2J1aWx0LywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvZG9jLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZG9jKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGFzay8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rlc3QvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90eXBlcy8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3RlbXAvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlbXApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMocGF0aC5qb2luKHRlbXBsYXRlUGF0aCh0YXJnZXQpLCBmaWxlKSwgZHN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUgbW9kdWxlIOOBriB2ZXJzaW9uIOWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvbWlzZTxzdHJpbmc+fSB2ZXJzaW9uIHRleHRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBleGVjQ29tbWFuZChcIm5wbVwiLCBbXCJpbmZvXCIsIG5hbWUsIFwidmVyc2lvblwiXSwge1xyXG4gICAgICAgICAgICAgICAgc3RkaW86IFwicGlwZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Bpbm5lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBfLnRyaW0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44Gu6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjb252ZXJ0LXNvdXJjZS1tYXBcIiwgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkZWxcIiwgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJlc2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJucG0tcnVuLWFsbFwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwbGF0b1wiLCAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwLWxvYWRlclwiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0c2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlZG9jXCIsICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0XCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtaW5pZnkgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlczogW1wiZXM1XCJdLCAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidWdsaWZ5LWVzXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgZXM6IFtcImVzMjAxNVwiXSwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBsZXQgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5taW5pZnkpIHtcclxuICAgICAgICAgICAgZXh0cmEgPSBleHRyYS5jb25jYXQobWluaWZ5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJ3ZWJwYWNrXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcIm55Y1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJueWNcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwidGVzdGVtXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInRlc3RlbVwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJwaGFudG9tanMtcHJlYnVpbHRcIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwicGhhbnRvbWpzLXByZWJ1aWx0XCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoYmFzZS5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBkZXBlbmRlbmNpZXMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7SURlcGVuZGVuY3lbXX0gZGVwZW5kZW5jaWVzIOS+neWtmOmWouS/guODquOCueODiFxyXG4gICAgICogQHJldHVybiB7eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW47IH1bXX0g44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Gr5oyH5a6a44GZ44KL6YWN5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBhc3luYyBxdWVyeURlcGVuZGVuY2llc1BhcmFtKGRlcGVuZGVuY2llczogSURlcGVuZGVuY3lbXSk6IFByb21pc2U8eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW4gfVtdPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcImJhc2UuY3JlYXRlLnF1ZXJ5VmVyc2lvblwiKTtcclxuXHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IDx7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbjsgfVtdPmRlcGVuZGVuY2llc1xyXG4gICAgICAgICAgICAuZmlsdGVyKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGRlcGVuZC5lcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gISFkZXBlbmQuZXMuZmluZCgoZXNWZXJzaW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLmVzID09PSBlc1ZlcnNpb247XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeShkZXBlbmRzLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gKGNvbnRleHQ6IGFueSk6IGFueSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChcInN0cmluZ1wiID09PSB0eXBlb2YgY29udGV4dCAmJiAhdGhpcy5fY29uZmlnLnNldHRpbmdzLnNpbGVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IGdldFNwaW5uZXIoY2hhbGsueWVsbG93KGNvbnRleHQpLCA1KTtcclxuICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzcGlubmVyO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBuID0gZGVwZW5kcy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kc1tpXS52ZXJzaW9uKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gcHJvZ3Jlc3MoZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0udmVyc2lvbiA9IFwiXlwiICsgYXdhaXQgdGhpcy5xdWVyeU5vZGVNb2R1bGVMYXRlc3RWZXJzaW9uKGRlcGVuZHNbaV0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyhzcGlubmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaSA9PT0gbiAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGRlcGVuZHNbaV0ubGFzdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBkZXBlbmRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd2VicGFjay5jb25maWcuanMg44GuIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBsaWJyYXJ5VGFyZ2V0IOOBq+aMh+WumuOBmeOCi+aWh+Wtl+WIl1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlXZWJwYWNrTGlicmFyeVRhcmdldCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5tb2R1bGUpIHtcclxuICAgICAgICAgICAgY2FzZSBcImNvbW1vbmpzXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb21tb25qczJcIjtcclxuICAgICAgICAgICAgY2FzZSBcImFtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiYW1kXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ1bWRcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInVtZFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBlc2xpbnRyYyDjga4gZW52IOOBq+aMh+WumuOBmeOCiyB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0gZW52IOOBq+aMh+WumuOBmeOCi+ODhuODs+ODl+ODrOODvOODiOODkeODqeODoeODvOOCv+OCquODluOCuOOCp+OCr+ODiFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlFc0xpbnRFbnZQYXJhbSgpOiBhbnkge1xyXG4gICAgICAgIGNvbnN0IGNvbXBpbGVTZXR0aW5nID0gPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZXM2OiBcImVzNVwiICE9PSBjb21waWxlU2V0dGluZy5lcyxcclxuICAgICAgICAgICAgbm9kZTogXCJ3ZWJcIiAhPT0gY29tcGlsZVNldHRpbmcuZW52LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24udG9vbHMg44OX44Ot44OR44OG44Kj44Gu5oyH5a6a54q25rOB44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtICB7U3RyaW5nfSAgbmFtZSDjg4Tjg7zjg6vlkI3jgpLmjIflrppcclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHRydWU6IOaMh+WumuOBleOCjOOBpuOBhOOCiyAvIGZhbHNlOiDmjIflrprjgZXjgozjgabjgYTjgarjgYRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGlzRW5hYmxlVG9vbChuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISEoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLnRvb2xzLmZpbmQoKHRvb2wpID0+IG5hbWUgPT09IHRvb2wpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUg5Yem55CG44Gu44Ko44Oz44OI44OqXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgcnVuQ3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQmFzZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuOBriBjcmVhdGUg5Yem55CGXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlQmFzZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwiYmFzZS5jcmVhdGUuZm91bmRhdGlvblwiKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3REaXIoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlCYXNlU3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jb3B5Q29tbW9uRmlsZXMoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlUYXNrU2NyaXB0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlUHJvamVjdERpcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZnMuZXhpc3RzU3luYyh0aGlzLnJvb3REaXIpKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKHRyYW5zbGF0ZShcImJhc2UuY3JlYXRlLmVycm9yLmFscmVhZHlFeGlzdFwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLm1rZGlyc1N5bmModGhpcy5yb290RGlyKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWFsemAmuani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlCYXNlU3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcImJhc2Uvc3RydWN0dXJlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Z+65pys44OV44Kh44Kk44Or44Gu44Kz44OU44O8XHJcbiAgICAgKiB0ZW1wbGF0ZSDjga7jgrPjg5Tjg7zjgoLooYzjgYZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5Q29tbW9uRmlsZXMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZVwiKTtcclxuICAgICAgICBjb25zdCBkc3REaXIgPSB0aGlzLnJvb3REaXI7XHJcblxyXG4gICAgICAgIC8vIC5ucG1pZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIi5ucG1pZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiLm5wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIEJBTk5FUlxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9CQU5ORVJcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiQkFOTkVSXCIpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIExJQ0VOU0VcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5saWNlbnNlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJBcGFjaGUtMi4wXCI6XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9MSUNFTlNFLkFwYWNoZS0yLjBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFwiTUlUXCI6XHJcbiAgICAgICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuTUlUXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTElDRU5TRVwiKSxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuY29weXJpZ2h0XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE5PVElDRVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcIl9OT1RJQ0VcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwiTk9USUNFXCIpLFxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGJ1aWxkIHRvb2xzOiB3ZWJwYWNrXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbTogSVdlYnBhY2tDb25maWdyYXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICBub2RlanM6ICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykubm9kZWpzLFxyXG4gICAgICAgICAgICAgICAgZ3VpZGU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB0YXNrUGF0aDogdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJ0b29scy93ZWJwYWNrL193ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihkc3REaXIsIFwid2VicGFjay5jb25maWcuanNcIiksXHJcbiAgICAgICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0YXNrIHNjcmlwdCDjga7jgrPjg5Tjg7xcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjb3B5VGFza1NjcmlwdHMoKTogdm9pZCB7XHJcbiAgICAgICAgY29uc3Qgc3JjRGlyID0gdGVtcGxhdGVQYXRoKFwiYmFzZS90YXNrXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzayk7XHJcblxyXG4gICAgICAgIHRoaXMudGFza0xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIHRhc2spLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgdGFzayksXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvZ2VuZXJhdG9yLWJhc2UudHMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44K944O844K544OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzY3JpcHQ/OiBzdHJpbmc7ICAgICAgICAgICAgLy8ganModHMpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgc3R5bGVzaGVldD86IHN0cmluZzsgICAgICAgIC8vIGNzcyhjc3MpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7ICAgICAgICAgIC8vIGh0bWwodGVtcGxhdGUpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHNyYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K944O844K544Kz44O844OJ44Gu44Or44O844OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBwa2c/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkeODg+OCseODvOOCuOWFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgYnVpbHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg7Pjg5HjgqTjg6vlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGRvYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0YXNrPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCueOCr+ODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVzdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4bjgrnjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHR5cGVzPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDlnovlrprnvqnjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRlbXA/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBzcmNDb25maWc/OiBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb247ICAgIC8vIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gICAgbGliPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRlcm5hbCBsaWJyYXJ5IG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGV4dGVybmFsPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgbW9kdWxlIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcG9ydGluZz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3J0aW5nIG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHJlcz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oq44K944O844K544OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElEZXBlbmRlbmN5XHJcbiAqIEBicmllZiBwYWNrYWdlLmpzb24g44Gr5oyH5a6a44GZ44KLIGRlcGVuZGVuY2llcyDmg4XloLHjgpLmoLzntI3jgZnjgovjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3kge1xyXG4gICAgbmFtZTogc3RyaW5nOyAgICAgICAgICAgLy8gbW9kdWxlIG5hbWUgZXgpIFwidHlwZXNjcmlwdFwiXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nOyAgICAgICAvLyDmjIflrprjg5Djg7zjgrjjg6fjg7MuIOeEoeaMh+WumuOBruWgtOWQiOOBr+acgOaWsOODkOODvOOCuOODp+ODs1xyXG4gICAgZXM/OiBzdHJpbmdbXTsgICAgICAgICAgLy8g5oyH5a6a44GV44KM44GfIEVTIHZlcnNpb24g44Gu44Go44GN44Gu44G/5pyJ5Yq544Gr44GZ44KLXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jlhbHpgJrjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgcHJvamVjdFR5cGU6IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OI56iu6aGeIGV4KSBcImxpYnJhcnlcIlxyXG4gICAgYWN0aW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXgpIFwiY3JlYXRlXCJcclxuICAgIHZlcnNpb246IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkOODvOOCuOODp+ODsyBleCkgXCIxLjAuMFwiXHJcbiAgICBsaWNlbnNlOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6njgqTjgrvjg7PjgrkgZXgpIFwiQXBhY2hlLTIuMFwiXHJcbiAgICBwcml2YXRlPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwcml2YXRlIOODkeODg+OCseODvOOCuOOBruWgtOWQiCB0cnVlXHJcbiAgICBzZXR0aW5nczogVXRpbHMuSUdsb2JhbFNldHRpbmdzOyAgICAgICAgICAgICAgICAvLyDjg63jgrDjgqrjg5fjgrfjg6fjg7NcclxuICAgIG1vZHVsZU5hbWU/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGltcG9ydCDjgavmjIflrprjgZnjgosg44Oi44K444Ol44O844Or5ZCNIGV4KSBcImNkcC1saWJcIlxyXG4gICAgbWFpbkJhc2VOYW1lPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oh44Kk44Oz44OV44Kh44Kk44Or5ZCNIGV4KSBcImNkcC1saWJcIiAvIFwiaW5kZXhcIlxyXG4gICAgbmFtZXNwYWNlPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Or44O844OI5ZCN5YmN56m66ZaTXHJcbiAgICBzdHJ1Y3R1cmVDb25maWc/OiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbjsgICAvLyBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gICAgY29weXJpZ2h0Pzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Kz44OU44O844Op44Kk44OI5paH5a2X5YiXIGV4KSBcIkNvcHlyaWdodCAoYykgMjAxNyBTb255IENvcnBvcmF0aW9uXCJcclxuICAgIGRldkRlcGVuZGVuY2llcz86IElEZXBlbmRlbmN5W107ICAgICAgICAgICAgICAgIC8vIOmWi+eZuueUqOS+neWtmOODouOCuOODpeODvOODq+aDheWgsVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQnVpbGRUYXJnZXRDb25maWdyYXRpb25cclxuICogQGJyaWVmIOODk+ODq+ODieOCv+ODvOOCsuODg+ODiOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQnVpbGRUYXJnZXRDb25maWdyYXRpb24ge1xyXG4gICAgZXM/OiBcImVzNVwiIHwgXCJlczIwMTVcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg44GuIHRyYW5zcGlsZSB0YXJnZXRcclxuICAgIG1vZHVsZT86IFwibm9uZVwiIHwgXCJjb21tb25qc1wiIHwgXCJhbWRcIiB8IFwidW1kXCI7ICAgICAgICAgICAgICAgLy8gSmF2YVNjcmlwdCBtb2R1bGUgc3lzdGVtXHJcbiAgICBlbnY/OiBcIndlYlwiIHwgXCJub2RlXCIgfCBcImVsZWN0cm9uXCIgfCBcImVsZWN0cm9uLXJlbmRlcmVyXCI7ICAgIC8vIOWun+ihjOeSsOWig+OBriB0YXJnZXRcclxuICAgIG5vZGVqcz86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIOOBruWgtOWQiOOBqyB0cnVlXHJcbiAgICBtaW5pZnk/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg6rjg6rjg7zjgrnmmYLjgasgbWluaWZ5IOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICAvLyBidWlsZCB0b29sXHJcbiAgICB0b29scz86IHN0cmluZ1tdOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDml6Llrprjga4gYnVpbGQgdG9vbCBleCkgW1wid2VicGFja1wiXVxyXG4gICAgb3V0cHV0U2FtZURpcj86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3JjIOOBqCBidWlsdCDjgYzlkIzjgZjjg4fjgqPjg6zjgq/jg4jjg6rjgavjgarjgovloLTlkIggdHJ1ZVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJV2VicGFja0NvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgV2VicGFjayDnlKjjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVdlYnBhY2tDb25maWdyYXRpb24ge1xyXG4gICAgbm9kZWpzOiBib29sZWFuOyAgICAvLyBcIm5vZGVcIiB8IFwiZWxlY3Ryb25cIiDjga7loLTlkIjjgasgdHJ1ZVxyXG4gICAgZ3VpZGU6IGJvb2xlYW47ICAgICAvLyBndWlkZSDjgrPjg6Hjg7Pjg4jjgpLku5jliqDjgZnjgovloLTlkIjjga8gdHJ1ZSDjgpLmjIflrppcclxuICAgIHRhc2tQYXRoOiBzdHJpbmc7ICAgLy8gJ3Rhc2snIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uXHJcbiAqIEBicmllZiBWaXN1YWwgU3R1ZGlvIOeUqOOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uIGV4dGVuZHMgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOWQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIHByb2plY3RHVUlEOiBzdHJpbmc7ICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4ggR1VJRCBleCkgezUxQjQxMzU5LThEMkMtNDJERi04NDE0LUU4NUIwMjk5MzIzOH1cclxuICAgIG1haW5CYXNlTmFtZTogc3RyaW5nOyAgICAgICAvLyDjg6HjgqTjg7Pjg5XjgqHjgqTjg6vlkI0gZXgpIFwiY2RwLWxpYlwiIC8gaW5kZXhcclxuICAgIGxpY2Vuc2U6IGJvb2xlYW47ICAgICAgICAgICAvLyBMSUNFTlNFIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICB3ZWJwYWNrOiBib29sZWFuOyAgICAgICAgICAgLy8gd2VicGFjay5jb25maWcuanMg44KS6L+95Yqg44GZ44KL5aC05ZCI44GvIHRydWVcclxuICAgIHRlc3RlbTogYm9vbGVhbjsgICAgICAgICAgICAvLyB0ZXN0ZW0gcnVubmVyIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICBvdXRwdXRTYW1lRGlyOiBib29sZWFuOyAgICAgLy8gc3JjIOOBqCBidWlsdCDjgYzlkIzjgZjjg4fjgqPjg6zjgq/jg4jjg6rjgavjgarjgovloLTlkIggdHJ1ZVxyXG4gICAgdHNHcm91cDoge1xyXG4gICAgICAgIHJlbGF0aXZlUGF0aDogc3RyaW5nOyAgIC8vIFwiaG9nZWhvZ2VcXFwiXHJcbiAgICAgICAgZmlsZU5hbWU6IHN0cmluZzsgICAgICAgLy8gXCJjZHAtbGliXCJcclxuICAgICAgICBkZXBlbmRlZTogYm9vbGVhbjsgICAgICAvLyDkvp3lrZjlhYjjgpLov73liqDjgZnjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIG1hcDogYm9vbGVhbjsgICAgICAgICAgIC8vIC5tYXAg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgIH1bXTtcclxuICAgIGpzR3JvdXA6IHtcclxuICAgICAgICByZWxhdGl2ZVBhdGg6IHN0cmluZzsgICAvLyBcImhvZ2Vob2dlXFxcIlxyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmc7ICAgICAgIC8vIFwiY2RwLWxpYlwiXHJcbiAgICAgICAgZGVwZW5kZWU6IGJvb2xlYW47ICAgICAgLy8g5L6d5a2Y5YWI44KS6L+95Yqg44GZ44KL5aC05ZCIIHRydWVcclxuICAgICAgICBkX3RzOiBib29sZWFuOyAgICAgICAgICAvLyAuZC50cyDjg5XjgqHjgqTjg6vjgYzjgYLjgovloLTlkIggdHJ1ZVxyXG4gICAgICAgIG1hcDogYm9vbGVhbjsgICAgICAgICAgIC8vIC5tYXAg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtaW5fbWFwOiBib29sZWFuOyAgICAgICAvLyAubWluIC5tYXAg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgIH1bXTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcIi4uL3V0aWxzL3NldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTGlicmFyeSB9IGZyb20gXCIuL2xpYnJhcnlcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTW9iaWxlIH0gZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvckRlc2t0b3AgfSBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvcldlYiB9IGZyb20gXCIuL3dlYlwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vYmFzZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWJyYXJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21vYmlsZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3dlYlwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3IoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgc3dpdGNoIChjb25maWcucHJvamVjdFR5cGUpIHtcclxuICAgICAgICBjYXNlIFwibGlicmFyeVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJtb2JpbGVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJkZXNrdG9wXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JEZXNrdG9wKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIndlYlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZyk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBcInVuc3VwcG9ydGVkIHByb2plY3Qga2luZDogXCIgKyBjb25maWcucHJvamVjdFR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL2dlbmVyYXRvcnMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQgeyBzcGF3biwgU3Bhd25PcHRpb25zIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIFNwaW5uZXIsXHJcbn0gZnJvbSBcIi4vbGlic1wiO1xyXG5cclxuaW1wb3J0IHtcclxuICAgIGFzc2VydCxcclxuICAgIGdldExpYlBhdGgsXHJcbn0gZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY29tbWFuZCBsaW5lIGVycm9yIGFuZCBraWxsIHByb2Nlc3MuXHJcbiAqIFdoZW4gdGhlIGFwcGxpY2F0aW9uIHJlY2VpdmVkIGVycm9yIGZyb20gY2xpLCBwbGVhc2UgY2FsbCB0aGlzIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yICBlcnJvciBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBhc3NlcnQoZmFsc2UsIGVycm9yKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBcInRlbXBsYXRlc1wiIOODh+OCo+ODrOOCr+ODiOODquOBi+OCieOBruODkeOCueOCkuWPluW+ly5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSB0YXJnZXQg44K/44O844Ky44OD44OI44KS5oyH5a6aLiBudWxsIOOBruWgtOWQiOOBr+OAgXRlbXBsYXRlcyDjgpLov5TljbRcclxuICogQHJldHVybiB7U3RyaW5nfSB0ZW1wbGF0ZXMvaG9nZWhvZ2VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0ZW1wbGF0ZVBhdGgodGFyZ2V0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKG51bGwgPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwidGVtcGxhdGVzXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJ0ZW1wbGF0ZXNcIiwgdGFyZ2V0KTtcclxuICAgIH1cclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBHZXQgc3Bpbm5lciBpbnN0YW5jZS5cclxuICogQ0xJIGhlbHBlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgW2Zvcm1hdF0gIHNwaW5uZXIgZm9ybWF0IHN0cmluZy5cclxuICogQHBhcmFtICB7TnVtYmVyfSAgW2luZGV4XSAgIHNwaW5uZXIgaW5kZXggZGVmaW5lZCBieSBjbGktc3Bpbm5lci4gKGRlZmF1bHQ6IHJhbmRvbSBbMC0yOV0pXHJcbiAqIEByZXR1cm4ge1NwaW5uZXJ9IGNsaS1zcGlubmVyIGluc3RhbmNlLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFNwaW5uZXIoZm9ybWF0Pzogc3RyaW5nLCBpbmRleD86IG51bWJlcik6IHsgc3RhcnQ6ICgpID0+IHZvaWQ7IHN0b3A6IChjbGVhbj86IGJvb2xlYW4pID0+IHZvaWQ7IH0ge1xyXG4gICAgY29uc3Qgc3Bpbm5lcnMgPSBbXHJcbiAgICAgICAgXCJ8Ly1cXFxcXCIsXHJcbiAgICAgICAgXCLilKTilJjilLTilJTilJzilIzilKzilJBcIixcclxuICAgICAgICBcIuKXouKXo+KXpOKXpVwiLFxyXG4gICAgICAgIFwi4paM4paA4paQ4paEXCIsXHJcbiAgICAgICAgXCLilonilorilovilozilo3ilo7ilo/ilo7ilo3ilozilovilorilolcIixcclxuICAgICAgICBcIuKWgeKWg+KWhOKWheKWhuKWh+KWiOKWh+KWhuKWheKWhOKWg1wiLFxyXG4gICAgICAgIFwi4pix4piy4pi0XCIsXHJcbiAgICAgICAgXCIub09AKlwiLFxyXG4gICAgICAgIFwi4peQ4peT4peR4peSXCIsXHJcbiAgICAgICAgLy8vL1xyXG4gICAgICAgIFwi4peh4pehIOKKmeKKmSDil6Dil6BcIixcclxuICAgICAgICBcIuKWoOKWoeKWquKWq1wiLFxyXG4gICAgICAgIFwi4oaQ4oaW4oaR4oaX4oaS4oaY4oaT4oaZXCIsXHJcbiAgICAgICAgXCIub0/CsE9vLlwiLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IGZtdCA9IGZvcm1hdCB8fCBcIiVzXCI7XHJcbiAgICBjb25zdCBzcGlubmVyID0gbmV3IFNwaW5uZXIoZm10KTtcclxuICAgIGNvbnN0IGlkeCA9IChudWxsICE9IGluZGV4ICYmIDAgPD0gaW5kZXggJiYgaW5kZXggPCAxNCkgPyBpbmRleCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgIHNwaW5uZXIuc2V0U3Bpbm5lclN0cmluZyhzcGlubmVyc1tpZHhdKTtcclxuICAgIHJldHVybiBzcGlubmVyO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgTm9ybWFsaXplVGV4dE9wdGlvbnNcclxuICogQGJyaWVmIG5vcm1hbGl6ZVRleHQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgZW9sPzogc3RyaW5nOyAgIC8vIGRlZmF1bHQ6IG9zLkVPTFxyXG4gICAgYm9tPzogYm9vbGVhbjsgIC8vIGRlZmF1bHQ6IHRydWVcclxuICAgIHRhYj86IG51bWJlcjsgICAvLyB0YWIg44KS5aSJ5o+b44GZ44KL44K544Oa44O844K544Gu5pWw44KS5oyH5a6aLiBkZWZhdWx0OiDlpInmj5vjgZfjgarjgYRcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSB0ZXh0IGxpbmUtZmVlZC5cclxuICogZm9yIHdpbmRvd3MgZ2l0IHVzZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICB0ZXh0ICAgICAgaW5wdXQgdGV4dC5cclxuICogQHBhcmFtICB7Tm9ybWFsaXplVGV4dE9wdGlvbnN9IFtvcHRpb25zXSBvcHRpb24uXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gbm9ybWFsaXplZCB0ZXh0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodGV4dDogc3RyaW5nLCBvcHRpb25zPzogTm9ybWFsaXplVGV4dE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBOb3JtYWxpemVUZXh0T3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGV4dCA9IHRleHRcclxuICAgICAgICAucmVwbGFjZSgvXlxcdWZlZmYvZ20sIFwiXCIpICAgLy8gcmVtb3ZlIGJvbVxyXG4gICAgICAgIC5yZXBsYWNlKC9cXHJcXG4vZ20sIFwiXFxuXCIpICAgIC8vIG9uY2UgXCJcXG5cIlxyXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZ20sIFwiXFxuXCIpXHJcbiAgICA7XHJcblxyXG4gICAgaWYgKG9wdC5ib20pIHtcclxuICAgICAgICB0ZXh0ID0gXCJcXHVmZWZmXCIgKyB0ZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKFwiXFxuXCIgIT09IG9wdC5lb2wpIHtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4vZ20sIG9wdC5lb2wpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdC50YWIpIHtcclxuICAgICAgICBjb25zdCBzcGFjZXMgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0LnRhYjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IFwiIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2dtLCBzcGFjZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZXh0O1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zXHJcbiAqIEBicmllZiBleGVjQ29tbWFuZCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnMgZXh0ZW5kcyBTcGF3bk9wdGlvbnMge1xyXG4gICAgc3Bpbm5lcj86IHtcclxuICAgICAgICBmb3JtYXQ/OiBzdHJpbmc7ICAgIC8vIGV4KSBcIiVzXCJcclxuICAgICAgICBpbmRleD86IG51bWJlcjsgICAgIC8vIDAgLSA5IOOBruaVsOWApOOCkuaMh+WumlxyXG4gICAgfTtcclxuICAgIHN0ZG91dD86IChkYXRhOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICBzdGRlcnI/OiAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcblxyXG4vKipcclxuICogRXhlY3V0ZSBjb21tYW5kIGxpbmUgYnkgc3Bhd24uXHJcbiAqIGNhbGwgc3Bhd24uIGlmIGVycm9yIG9jY3VyZWQsIGN1aSBpcyBraWxsZWQgcHJvY2Nlc3MuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmd9ICAgICAgICAgICAgICAgY29tbWFuZCAgICBtYWluIGNvbW1hbmQuIGV4KSBcImNvcmRvdmFcIlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nW119ICAgICAgICAgICAgIGFyZ3MgICAgICAgY29tbWFuZCBhcmdzLiBleCkgW1wicGx1Z2luXCIsIFwiYWRkXCIsIHBsdWdpbk5hbWVdXHJcbiAqIEBwYXJhbSAgIHtFeGVjQ29tbWFuZE9wdGlvbnN9ICAgW29wdGlvbnNdICBjbGktc3Bpbm5lclwicyBvcHRpb25zLlxyXG4gKiBAcmV0dXJucyB7TnVtYmVyfSBlcnJvciBjb2RlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZXhlY0NvbW1hbmQoY29tbWFuZDogc3RyaW5nLCBhcmdzOiBzdHJpbmdbXSwgb3B0aW9ucz86IEV4ZWNDb21tYW5kT3B0aW9ucyk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdDogRXhlY0NvbW1hbmRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICAgICAgc3RkaW86IFwiaW5oZXJpdFwiLFxyXG4gICAgICAgICAgICBzcGlubmVyOiB7IGZvcm1hdDogXCIlc1wiIH0sXHJcbiAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4geyAvKiBub29wICovIH0sXHJcbiAgICAgICAgICAgIHN0ZGVycjogKGRhdGE6IHN0cmluZyk6IHZvaWQgPT4geyAvKiBub29wICovIH0sXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIHdoaWNoKGNvbW1hbmQsIChlcnJvciwgcmVzb2x2ZWRDb21tYW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlRXJyb3IoSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG9wdC5zcGlubmVyID8gZ2V0U3Bpbm5lcihvcHQuc3Bpbm5lci5mb3JtYXQsIG9wdC5zcGlubmVyLmluZGV4KSA6IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzcGlubmVyLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gc3Bhd24ocmVzb2x2ZWRDb21tYW5kLCBhcmdzLCBvcHQpXHJcbiAgICAgICAgICAgICAgICAub24oXCJlcnJvclwiLCBoYW5kbGVFcnJvcilcclxuICAgICAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Bpbm5lci5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGNvZGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoXCJwaXBlXCIgPT09IG9wdC5zdGRpbykge1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc3Rkb3V0Lm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdC5zdGRvdXQoZGF0YS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgY2hpbGQuc3RkZXJyLm9uKFwiZGF0YVwiLCAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIG9wdC5zdGRlcnIoZGF0YS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnNcclxuICogQGJyaWVmIGNvcHlUcGwoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29weVRlbXBsYXRlT3B0aW9ucyBleHRlbmRzIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIGRlbGltaXRlcnM/OiBcInt7IH19XCIgfCBcIjwlICU+XCI7IC8vIHRlbXBsYXRlIOOBq+S9v+eUqOOBmeOCiyBkZWxpbWl0ZXIuIGRlZmF1bHQ6IFwie3sgfX1cIlxyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0ZW1wbGF0ZSB3aXRoIGhvZ2FuLlxyXG4gKiBzeW5jIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgIHNyYyAgICAgICBzb3VyY2UgZmlsZSBwYXRoLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBkc3QgICAgICAgZGVzdGluYXRpb24gZmlsZSBwYXRoLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgICBwYXJhbXMgICAgdGVtcGxhdGUgcGFyYW1ldGVycy5cclxuICogQHBhcmFtIHtDb3B5VGVtcGxhdGVPcHRpb25zfSAgW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUcGwoc3JjOiBzdHJpbmcsIGRzdDogc3RyaW5nLCBwYXJhbXM6IE9iamVjdCwgb3B0aW9ucz86IENvcHlUZW1wbGF0ZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgIGNvbnN0IG9wdCA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIGRlbGltaXRlcnM6IFwie3sgfX1cIixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmMoc3JjKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0KTtcclxuICAgIGNvbnN0IG91dHB1dCA9IG5vcm1hbGl6ZVRleHQoanN0LnJlbmRlcihwYXJhbXMpLCBvcHQpO1xyXG5cclxuICAgIGZzLmVuc3VyZUZpbGVTeW5jKGRzdCk7XHJcbiAgICBmcy53cml0ZUZpbGVTeW5jKGRzdCwgb3V0cHV0LCBcInV0ZjhcIik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR1VJRCBnZW5lcmF0ZS5cclxuICogcmV0dXJuZWQgYXMgV2luZG93cyByZWdpc3RyeSB0eXBlIGZvcm1hdC5cclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBcIntcIiArIHV1aWQudjQoKS50b1VwcGVyQ2FzZSgpICsgXCJ9XCI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJuIHtqUXVlcnl9IFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyMlhtbE5vZGUoc3RyOiBzdHJpbmcpOiBKUXVlcnkge1xyXG4gICAgcmV0dXJuICQoJC5wYXJzZVhNTChzdHIpKS5jaGlsZHJlbigpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBzdHJpbmcgZnJvbSBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJuIHtqUXVlcnl9IFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24geG1sTm9kZTJTdHIoJHhtbDogSlF1ZXJ5KTogc3RyaW5nIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICByZXR1cm4gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZygkeG1sWzBdKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9uc1xyXG4gKiBAYnJpZWYgZm9ybWF0WE1MKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBzdGVwPzogbnVtYmVyOyAgIC8vIOepuueZveOCueODmuODvOOCueaVsC4gZGVmYXVsdDogMlxyXG59XHJcblxyXG4vKipcclxuICogWE1MIGZvcm1hdHRlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgc3RyICAgICAgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcGFyYW0gIHtGb3JtYXRYbWxPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIFhNTFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFhNTChzdHI6IHN0cmluZywgb3B0aW9ucz86IEZvcm1hdFhtbE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBGb3JtYXRYbWxPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgc3RlcDogMixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgbGV0IHhtbCA9IFwiXCI7XHJcbiAgICBsZXQgcGFkID0gMDtcclxuICAgIGxldCBpbmRlbnQ6IG51bWJlcjtcclxuICAgIGxldCBub2RlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3Qgc3RyQXJyID0gbm9ybWFsaXplVGV4dChzdHIsIHsgZW9sOiBcIlxcblwiIH0pXHJcbiAgICAgICAgLnJlcGxhY2UoLyg+KSg8KShcXC8qKS9nLCBcIiQxXFxuJDIkM1wiKSAvLyBpbnNlcnQgTEYgdG8gZWFjaCBub2RlIG9uY2UuXHJcbiAgICAgICAgLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IHNwYWNlcyA9IChsZW46IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICBjb25zdCBfaW5kZW50ID0gbGVuICogb3B0LnN0ZXA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICBub2RlID0gJC50cmltKHN0ckFycltpXSk7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0Y2goLy4rPFxcL1xcd1tePl0qPiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXC9cXHcvKSkge1xyXG4gICAgICAgICAgICBpZiAocGFkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGFkIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFx3W14+XSpbXi9dPi4qJC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgeG1sICs9IHNwYWNlcyhwYWQpICsgbm9kZSArIG9wdC5lb2w7XHJcbiAgICAgICAgcGFkICs9IGluZGVudDtcclxuICAgIH1cclxuXHJcbiAgICB4bWwgPSB4bWwucmVwbGFjZSgvXFxuXFxuL2dtLCBcIlxcblwiKTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplVGV4dCh4bWwsIG9wdCk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy90b29scy50cyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJjaGlsZF9wcm9jZXNzXCJcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNoYWxrXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifVxuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xpLXNwaW5uZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNsaS1zcGlubmVyXCIsXCJjb21tb25qczJcIjpcImNsaS1zcGlubmVyXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn1cbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImdsb2JcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImdsb2JcIixcImNvbW1vbmpzMlwiOlwiZ2xvYlwifVxuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW12ZXItcmVnZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn1cbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInV1aWRcIixcImNvbW1vbmpzMlwiOlwidXVpZFwifVxuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwid2hpY2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4bWxkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIkhvZ2FuXCIsXCJjb21tb25qc1wiOlwiaG9nYW4uanNcIixcImNvbW1vbmpzMlwiOlwiaG9nYW4uanNcIixcImFtZFwiOlwiaG9nYW4uanNcIn1cbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwifVxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZS5zdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCIsXCJjb21tb25qczJcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCJ9XG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqcXVlcnlcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwialF1ZXJ5XCIsXCJjb21tb25qc1wiOlwianF1ZXJ5XCIsXCJjb21tb25qczJcIjpcImpxdWVyeVwiLFwiYW1kXCI6XCJqcXVlcnlcIn1cbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdfQ==