/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-07-26T07:21:42.809Z
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
            "external-rearrange.js",
            "minify.js",
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
            { name: "smartwatch", version: undefined, },
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
    /**
     * eslintrc に指定する template paramaeter を取得
     *
     * @return {Object} テンプレートパラメータオブジェクト
     */
    queryEsLintEnvParam() {
        const base = super.queryEsLintEnvParam();
        return Object.assign({}, base, {
            cordova: this.isEnableCordova(),
            hammerjs: this.isInstallationTarget("hammerjs"),
            iscroll: this.isInstallationTarget("iscroll"),
            flipsnap: this.isInstallationTarget("flipsnap"),
        });
    }
    /**
     * tsconfig.base に指定する template paramaeter を取得
     *
     * @return {Object} テンプレートパラメータオブジェクト
     */
    queryTsConfigBaseParam() {
        return Object.assign({}, this._config, {
            cordova: this.isEnableCordova(),
        });
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
            { name: "@cdp/mobile", version: "git+ssh://git@github.com/CDP-Tokyo/cdp-js.git", },
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
            utils_1.copyTpl(path.join(utils_1.templatePath("mobile"), "_tsconfig.base.json"), path.join(this.rootDir, "tsconfig.base.json"), this.queryTsConfigBaseParam(), { delimiters: "<% %>", bom: false, });
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
                utils_1.fs.writeFileSync(PKG_PATH, JSON.stringify(pkg, null, 2));
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
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src/_locales"), "_messages.en-US.json"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.res, "locales", "messages.en-US.json"), this.config, { delimiters: "<% %>", bom: false, });
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src/_locales"), "_messages.ja-JP.json"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.res, "locales", "messages.ja-JP.json"), this.config, { delimiters: "<% %>", bom: false, });
                // remove .gitkeep
                utils_1.fs.unlinkSync(path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.res, ".gitkeep"));
            }
            {
                utils_1.copyTpl(path.join(utils_1.templatePath("mobile/src/_patch.dependencies"), "_index.d.ts"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.external, this.config.structureConfig.types, "patch.dependencies", "index.d.ts"), {
                    hammerjs: this.isInstallationTarget("hammerjs"),
                    flipsnap: this.isInstallationTarget("flipsnap"),
                    iscroll: this.isInstallationTarget("iscroll"),
                });
                // copy patch d.ts
                if (this.isInstallationTarget("hammerjs")) {
                    utils_1.fs.copySync(utils_1.templatePath("mobile/src/_patch.dependencies/jquery.hammer.d.ts"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.external, this.config.structureConfig.types, "patch.dependencies", "jquery.hammer.d.ts"));
                }
                if (this.isInstallationTarget("flipsnap")) {
                    utils_1.fs.copySync(utils_1.templatePath("mobile/src/_patch.dependencies/flipsnap.d.ts"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.external, this.config.structureConfig.types, "patch.dependencies", "flipsnap.d.ts"));
                }
                if (this.isInstallationTarget("iscroll")) {
                    utils_1.fs.copySync(utils_1.templatePath("mobile/src/_patch.dependencies/iscroll.d.ts"), path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.external, this.config.structureConfig.types, "patch.dependencies", "iscroll.d.ts"));
                }
                // remove .gitkeep
                utils_1.fs.unlinkSync(path.join(this.rootDir, this.config.structureConfig.src, this.config.structureConfig.external, this.config.structureConfig.types, ".gitkeep"));
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
            // web.config
            utils_1.fs.copySync(utils_1.templatePath("mobile/visual.studio/_web.config"), path.join(this.rootDir, "web.config"));
            utils_1.fs.copySync(utils_1.templatePath("mobile/visual.studio/_web.Debug.config"), path.join(this.rootDir, "web.Debug.config"));
            utils_1.fs.copySync(utils_1.templatePath("mobile/visual.studio/_web.Release.config"), path.join(this.rootDir, "web.Release.config"));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjBkMGE3ZWI1YjQxMjIxMzNhOTQiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcInBhdGhcIiIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvbGlicy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIFwib3NcIiIsImNkcDovLy9jZHAtbGliL3V0aWxzL3NldHRpbmdzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9saWJyYXJ5L2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9saWJyYXJ5L2dlbmVyYXRvci1tb2R1bGUudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL21vYmlsZS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbW9iaWxlL2dlbmVyYXRvci1jb3Jkb3ZhLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvd2ViL2dlbmVyYXRvci1icm93c2VyLnRzIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwid2hpY2hcIixcImNvbW1vbmpzMlwiOlwid2hpY2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcImNoYWxrXCIsXCJjb21tb25qczJcIjpcImNoYWxrXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwianNkb21cIixcImNvbW1vbmpzMlwiOlwianNkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwieG1sZG9tXCIsXCJjb21tb25qczJcIjpcInhtbGRvbVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9IiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvdG9vbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcImNoaWxkX3Byb2Nlc3NcIiIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL2Jhc2UvaW50ZXJmYWNlcy50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDN0RBLGlDOzs7Ozs7Ozs7Ozs7QUNBQSxrQ0FBNkI7QUFDN0Isa0NBQWlDOzs7Ozs7Ozs7Ozs7O0FDRGpDLGlDQUF1QjtBQUN2QixrQ0FBd0I7QUFDeEIsaUNBQTJCOzs7Ozs7Ozs7O0FDRjNCLG1DQUErQjtBQXlDM0IsZ0JBQUU7QUF4Q04scUNBQTZCO0FBeUN6QixvQkFBSTtBQXhDUixzQ0FBa0M7QUF5QzlCLHNCQUFLO0FBeENULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCxxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUErQjtBQXlDM0Isc0JBQUs7QUF4Q1QsNENBQTRDO0FBeUN4QyxrQ0FBVztBQXhDZiw4Q0FBc0M7QUF5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Y2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE0KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmMGQwYTdlYjViNDEyMjEzM2E5NCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJwYXRoXCJcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItYmFzZVwiO1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9pbmRleC50cyIsImV4cG9ydCAqIGZyb20gXCIuL2xpYnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdG9vbHNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc2V0dGluZ3NcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gXCJnbG9iXCI7XHJcbmltcG9ydCAqIGFzIGhvZ2FuIGZyb20gXCJob2dhbi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBfbCBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCAqIGFzIF9zIGZyb20gXCJ1bmRlcnNjb3JlLnN0cmluZ1wiO1xyXG5pbXBvcnQgKiBhcyB3aGljaCBmcm9tIFwid2hpY2hcIjtcclxuaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwidXVpZFwiO1xyXG5pbXBvcnQgKiBhcyBjaGFsayBmcm9tIFwiY2hhbGtcIjtcclxuaW1wb3J0ICogYXMgc2VtdmVyUmVnZXggZnJvbSBcInNlbXZlci1yZWdleFwiO1xyXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSBcImNsaS1zcGlubmVyXCI7XHJcblxyXG5jb25zdCAkOiBKUXVlcnlTdGF0aWMgPSAoKCkgPT4ge1xyXG4gICAgY29uc3QgX3dpbmRvdyA9ICgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QganNkb20gPSByZXF1aXJlKFwianNkb21cIik7XHJcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGpzZG9tLkpTRE9NKSB7ICAgIC8vIHYxMCtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBqc2RvbS5KU0RPTSgpLndpbmRvdztcclxuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHY5LjEyLnhcclxuICAgICAgICAgICAgcmV0dXJuIGpzZG9tLmpzZG9tKCkuZGVmYXVsdFZpZXc7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICAvLyBwYXRjaCBzY29wZTpcclxuICAgICgocm9vdDogYW55KSA9PiB7XHJcbiAgICAgICAgLypcclxuICAgICAgICAgKiBqc2RvbSA5LjQuMCAtIDkuMTIuMCDjgavlrp/oo4XjgZXjgozjgabjgYTjgosgRE9NUGFyc2VyIOOBryBYTUwg44GuIHNlcmlhbGl6ZSDjgYzjgafjgY3jgarjgYTjgZ/jgoEsXHJcbiAgICAgICAgICogeG1sZG9tIOOBq+e9ruOBjeaPm+OBiOOCi1xyXG4gICAgICAgICAqIGpzZG9tIDEwLjEuMCDjgb7jgafli5XjgYvjgarjgYTjgZPjgajjgpLnorroqo1cclxuICAgICAgICAgKi9cclxuICAgICAgICBjb25zdCB4bWxkb20gPSByZXF1aXJlKFwieG1sZG9tXCIpO1xyXG4gICAgICAgIHJvb3QuRE9NUGFyc2VyID0geG1sZG9tLkRPTVBhcnNlcjtcclxuICAgICAgICAvLyB4bWxkb20g44Gr44GvIGRvbS50b1N0cmluZygpIOOBjOWun+ijheOBleOCjOOBpuOBhOOCi+OBjOOAgWdsb2JhbCDjgavjgoIgZXhwb3J0IOOBmeOCi1xyXG4gICAgICAgICg8YW55Pmdsb2JhbCkuWE1MU2VyaWFsaXplciA9IHJvb3QuWE1MU2VyaWFsaXplciA9IHhtbGRvbS5YTUxTZXJpYWxpemVyO1xyXG4gICAgfSkoX3dpbmRvdyk7XHJcblxyXG4gICAgcmV0dXJuIHJlcXVpcmUoXCJqcXVlcnlcIikoX3dpbmRvdyk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgdHlwZSBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IHR5cGVvZiBfcyAmIHR5cGVvZiBfbDtcclxuY29uc3QgX206IE1peGluZWRVbmRlcnNjb3JlU3RhdGljID0gPGFueT5fbC5taXhpbig8YW55Pl9zLmV4cG9ydHMoKSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgX20gYXMgXyxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgc2VtdmVyUmVnZXgsXHJcbiAgICBTcGlubmVyLFxyXG59O1xyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL2xpYnMudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm9zXCJcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBmcywgJCB9IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5nc1xyXG4gKiBAYnJpZWYg44Kw44Ot44O844OQ44Or6Kit5a6a44Kk44Oz44K/44O844OV44Kn44Kk44K5XHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElHbG9iYWxTZXR0aW5ncyB7XHJcbiAgICBmb3JjZT86IGJvb2xlYW47ICAgICAgICAgICAgLy8g44Ko44Op44O857aZ57aa55SoXHJcbiAgICB2ZXJib3NlPzogYm9vbGVhbjsgICAgICAgICAgLy8g6Kmz57Sw44Ot44KwXHJcbiAgICBzaWxlbnQ/OiBib29sZWFuOyAgICAgICAgICAgLy8gc2lsZW50IG1vZGVcclxuICAgIHRhcmdldERpcj86IHN0cmluZzsgICAgICAgICAvLyDkvZzmpa3jg4fjgqPjg6zjgq/jg4jjg6pcclxuICAgIGxhbmc/OiBcImVuLVVTXCIgfCBcImphLUpQXCI7XHJcbn1cclxuXHJcbmxldCBfc2V0dGluZ3M6IElHbG9iYWxTZXR0aW5ncyA9IHtcclxuICAgIGZvcmNlOiBmYWxzZSxcclxuICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgc2lsZW50OiBmYWxzZSxcclxuICAgIGxhbmc6IFwiZW4tVVNcIixcclxufTtcclxuXHJcbmxldCBfbGliUGF0aDogc3RyaW5nOyAgIC8vIGNkcC1saWIg44Gu5a2Y5Zyo44GX44Gm44GE44KLIHBhdGhcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiDoqK3lrprlj5blvpdcclxuICpcclxuICogQHJldHVybnMgb3B0aW9ucyDjg63jgrDjgavkvb/nlKjjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTZXR0aW5ncygpOiBJR2xvYmFsU2V0dGluZ3Mge1xyXG4gICAgcmV0dXJuICQuZXh0ZW5kKHt9LCBfc2V0dGluZ3MpO1xyXG59XHJcblxyXG4vKipcclxuICog6Kit5a6a5oyH5a6aXHJcbiAqXHJcbiAqIEBwYXJhbSBvcHRpb25zIOODreOCsOOBq+S9v+eUqOOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNldHRpbmdzKHNldHRpbmdzOiBJR2xvYmFsU2V0dGluZ3MpOiB2b2lkIHtcclxuICAgIGlmIChzZXR0aW5ncykge1xyXG4gICAgICAgIF9zZXR0aW5ncy5mb3JjZSAgICAgPSBzZXR0aW5ncy5mb3JjZSAgICAgICAgfHwgX3NldHRpbmdzLmZvcmNlO1xyXG4gICAgICAgIF9zZXR0aW5ncy52ZXJib3NlICAgPSBzZXR0aW5ncy52ZXJib3NlICAgICAgfHwgX3NldHRpbmdzLnZlcmJvc2U7XHJcbiAgICAgICAgX3NldHRpbmdzLnNpbGVudCAgICA9IHNldHRpbmdzLnNpbGVudCAgICAgICB8fCBfc2V0dGluZ3Muc2lsZW50O1xyXG4gICAgICAgIF9zZXR0aW5ncy50YXJnZXREaXIgPSBzZXR0aW5ncy50YXJnZXREaXIgICAgfHwgX3NldHRpbmdzLnRhcmdldERpcjtcclxuICAgICAgICBfc2V0dGluZ3MubGFuZyAgICAgID0gc2V0dGluZ3MubGFuZyAgICAgICAgIHx8IF9zZXR0aW5ncy5sYW5nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBfc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGZvcmNlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmVyYm9zZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHNpbGVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIGxhbmc6IFwiZW4tVVNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogXCJjZHAtbGliXCIg44GM5a2Y5Zyo44GZ44KL44OR44K544KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm5zIGNkcC1saWIg44G444GuIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRMaWJQYXRoKCk6IHN0cmluZyB7XHJcbiAgICBpZiAobnVsbCA9PSBfbGliUGF0aCkge1xyXG4gICAgICAgIGNvbnN0IFRSWV9DT1VOVCA9IDM7XHJcbiAgICAgICAgbGV0IHRyaWVkID0gMDtcclxuICAgICAgICBfbGliUGF0aCA9IF9fZGlybmFtZTtcclxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xyXG4gICAgICAgICAgICBpZiAoVFJZX0NPVU5UIDw9IHRyaWVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcihcImxpYiBwYXRoIGlzIG5vdCByZXNvbHZlZC5cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2xpYlBhdGggPSBwYXRoLmpvaW4oX2xpYlBhdGgsIFwiLi5cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrID0gcGF0aC5qb2luKF9saWJQYXRoLCBcImNkcC1saWJcIik7XHJcbiAgICAgICAgICAgIGlmIChmcy5wYXRoRXhpc3RzU3luYyhjaGVjaykpIHtcclxuICAgICAgICAgICAgICAgIF9saWJQYXRoID0gY2hlY2s7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmllZCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBfbGliUGF0aDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOaMh+WumuOBleOCjOOBnyB0YXJnZXREaXIg44KS5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm5zIHRhcmdldERpciDjgbjjga4gcGF0aFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhcmdldERpcigpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDjg63jgrDlh7rliptcclxuICogY29uc29sZS5sb2coKSDjgajlkIznrYlcclxuICpcclxuICogQHBhcmFtIG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbG9nKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOips+e0sOODreOCsOWHuuWKm1xyXG4gKiBjb25zb2xlLmRlYnVnKCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGRlYnVnKG1lc3NhZ2U/OiBzdHJpbmcsIC4uLm9wdGlvbmFsUGFyYW1zOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgaWYgKCFfc2V0dGluZ3Muc2lsZW50ICYmIF9zZXR0aW5ncy52ZXJib3NlKSB7XHJcbiAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRFQlVHOiBcIiArIG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiREVCVUc6IFwiICsgbWVzc2FnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5qSc6Ki8XHJcbiAqIGNvbnNvbGUuYXNzZXJ0KCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSB0ZXN0ICAgICAgICAgICDmpJzoqLzjgZnjgovlvI9cclxuICogQHBhcmFtIG1lc3NhZ2UgICAgICAgIOWHuuWKm+ODoeODg+OCu+ODvOOCuFxyXG4gKiBAcGFyYW0gb3B0aW9uYWxQYXJhbXMg5LuY5Yqg5oOF5aCxXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KHRlc3Q/OiBib29sZWFuLCBtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghdGVzdCkge1xyXG4gICAgICAgIGlmIChfc2V0dGluZ3MuZm9yY2UpIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoMCA8IG9wdGlvbmFsUGFyYW1zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBfbGFuZzogYW55O1xyXG5cclxuLyoqXHJcbiAqIOODreODvOOCq+ODqeOCpOOCulxyXG4gKlxyXG4gKiBAcGFyYW0ga2V5IOOCreODvOaWh+Wtl+WIl1xyXG4gKiBAcmV0dXJucyDnv7voqLPjgZXjgozjgZ/mloflrZfliJdcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgaWYgKCFfbGFuZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIF9sYW5nID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInJlcy9sb2NhbGVzXCIsIFwibWVzc2FnZXMuXCIgKyBfc2V0dGluZ3MubGFuZyArIFwiLmpzb25cIiksIFwidXRmOFwiKS50b1N0cmluZygpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJMYW5ndWFnZSByZXNvdXJjZSBKU09OIHBhcnNlIGVycm9yOiBcIiArIGVycm9yLm1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmVzb3VjZSA9ICQuZXh0ZW5kKHt9LCBfbGFuZyk7XHJcbiAgICBjb25zdCBwcm9wcyA9IGtleS5zcGxpdChcIi5cIik7XHJcbiAgICB3aGlsZSAoMCA8IHByb3BzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHByb3AgPSBwcm9wcy5zaGlmdCgpO1xyXG4gICAgICAgIGlmIChyZXNvdWNlW3Byb3BdKSB7XHJcbiAgICAgICAgICAgIHJlc291Y2UgPSByZXNvdWNlW3Byb3BdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2VydChmYWxzZSwgXCJyZXNvdWNlIG5vdCBmb3VuZC4ga2V5OiBcIiArIGtleSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiByZXNvdWNlO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvc2V0dGluZ3MudHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvck1vZHVsZSB9IGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLW1vZHVsZVwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JMaWJyYXJ5KGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yTW9kdWxlKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24sXHJcbiAgICBHZW5lcmF0b3JCYXNlLFxyXG4gICAgVXRpbHMsXHJcbn0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSUxpYnJhcnlDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5jb25zdCBmcyAgICAgICAgICAgID0gVXRpbHMuZnM7XHJcbmNvbnN0IGdsb2IgICAgICAgICAgPSBVdGlscy5nbG9iO1xyXG5jb25zdCAkICAgICAgICAgICAgID0gVXRpbHMuJDtcclxuY29uc3QgXyAgICAgICAgICAgICA9IFV0aWxzLl87XHJcbmNvbnN0IGRlYnVnICAgICAgICAgPSBVdGlscy5kZWJ1ZztcclxuY29uc3QgdGVtcGxhdGVQYXRoICA9IFV0aWxzLnRlbXBsYXRlUGF0aDtcclxuY29uc3QgY29weVRwbCAgICAgICA9IFV0aWxzLmNvcHlUcGw7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvck1vZHVsZVxyXG4gKiBAYnJpZWYgTGlicmFyeSBNb2R1bGUg55SoIEdlbmVyYXRvciDjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBHZW5lcmF0b3JNb2R1bGUgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwic3JjXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJkaXN0XCIsXHJcbiAgICAgICAgICAgIGJ1aWx0OiBcImJ1aWx0XCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgdGVtcDogXCIudGVtcFwiLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBhd2FpdCB0aGlzLmVuc3VyZU1vZHVsZVByb3BzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3RTZXR0aW5ncygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU291cmNlVGVtcGxhdGUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVuZGxlLWZpbmFsaXplci5qc1wiLFxyXG4gICAgICAgICAgICBcInJlbWFwLWNvdmVyYWdlLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJvdGVjdGVkIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHREZXZEZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IHN1cGVyLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMuY29uY2F0KFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9qYXNtaW5lXCIsICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImR0cy1idW5kbGVcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInR5cGVzY3JpcHQtZm9ybWF0dGVyXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jb25maWcubm9kZWpzKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcImphc21pbmUtbm9kZVwiLCB2ZXJzaW9uOiBcIl4yLjAuMFwiLCB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJyZXF1aXJlanNcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSUxpYnJhcnlDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SUxpYnJhcnlDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbW9kdWxlIOWQjSwgbWFpbiDjg5XjgqHjgqTjg6vlkI3jga7kv53oqLxcclxuICAgICAqIC0gMTogbW9kdWxlTmFtZSDjgYzmjIflrprjgZXjgozjgabjgYTjgovloLTlkIjjga/kvb/nlKjjgZnjgotcclxuICAgICAqIC0gMjogcHJvamVjdE5hbWUg44GM5L2/55So5Y+v6IO944Gq5aC05ZCI44Gv44Gd44KM44KS5L2/55So44GZ44KLXHJcbiAgICAgKiAtIDM6IHByb2plY3ROYW1lIOOBjOS9v+eUqOS4jeWPr+OBruWgtOWQiOOBr+OAgVwiLVwiIOOBpOOBquOBjuaWh+Wtl+WIl+OCkueUn+aIkOOBmeOCi1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGVuc3VyZU1vZHVsZVByb3BzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIG1vZHVsZSBuYW1lXHJcbiAgICAgICAgaWYgKG51bGwgPT0gdGhpcy5jb25maWcubW9kdWxlTmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIS9eLipbKFxcXFx8XFxzfC98OnwqfD98XCJ8PHw+fHwpXS4qJC8udGVzdCh0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUgPSB0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUgPSBfLnRyaW0oXy5kYXNoZXJpemUodGhpcy5jb25maWcucHJvamVjdE5hbWUpLCBcIi1cIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWcoXCJtb2R1bGVOYW1lOiBcIiArIHRoaXMuY29uZmlnLm1vZHVsZU5hbWUpO1xyXG5cclxuICAgICAgICAvLyBtYWluIGZpbGUgbmFtZVxyXG4gICAgICAgIGlmIChudWxsID09IHRoaXMuY29uZmlnLm1haW5CYXNlTmFtZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUgPSB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1ZyhcIm1haW5CYXNlTmFtZTogXCIgKyB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OH44Kj44Os44Kv44OI44Oq5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcImxpYnJhcnkvc3RydWN0dXJlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OX44Ot44K444Kn44Kv44OI6Kit5a6a44OV44Kh44Kk44Or44Gu5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlUHJvamVjdFNldHRpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIC8vIHByb2plY3QuY29uZmlnLmpzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3Byb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInByb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0c2NvbmZpZ1xyXG4gICAgICAgIGlmICghdGhpcy5jb25maWcub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAvLyBtYWluIHRzY29uZmlnLmpzb25cclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gdGVzdCB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcudGVzdC5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInVuaXRcIiwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBtYWluIHRzY29uZmlnLmpzb25cclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl90c2NvbmZpZy5vdXRwdXQtc2FtZS1kaXIuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBlc2xpbnRyYy5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX2VzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJlc2xpbnRcIiwgXCJlc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5RXNMaW50RW52UGFyYW0oKSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0ZXN0ZW1cclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLm5vZGVqcykge1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnkvdG9vbHMvdGVzdGVtXCIpLCBcIl90ZXN0ZW0uanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgXCJ0ZXN0ZW0uanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0ZXN0ZW1TdHVmZlBhdGggPSB0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5L3Rvb2xzL3Rlc3RlbS9ydW5uZXJcIik7XHJcblxyXG4gICAgICAgICAgICBnbG9iLnN5bmMoXCIqKlwiLCB7XHJcbiAgICAgICAgICAgICAgICBjd2Q6IHRlc3RlbVN0dWZmUGF0aCxcclxuICAgICAgICAgICAgICAgIG5vZGlyOiB0cnVlLFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKGZpbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlc3RlbVN0dWZmUGF0aCwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgZmlsZSlcclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyAuZ2l0aWdub3JlXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX2dpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCIuZ2l0aWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIFJFQURNRS5tZFxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9SRUFETUUubWRcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBwYWNrYWdlLmpzb25cclxuICAgICAgICB0aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMgPSBhd2FpdCB0aGlzLnF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0odGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzIHx8IHRoaXMuZGVmYXVsdERldkRlcGVuZGVuY2llcyk7XHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3BhY2thZ2UuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44K944O844K544Gu6Zub5b2i5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlU291cmNlVGVtcGxhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgX21vZHVsZSA9IHBhdGguYmFzZW5hbWUodGhpcy5fY29uZmlnLm1vZHVsZU5hbWUsIFwiLmpzXCIpO1xyXG4gICAgICAgIGNvbnN0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBzYW1wbGVDbGFzczogXy5jbGFzc2lmeShfbW9kdWxlKSxcclxuICAgICAgICAgICAgc2FtcGxlTW9kdWxlOiBfbW9kdWxlLFxyXG4gICAgICAgICAgICBidWlsdDogdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBzY3JpcHQgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQgfHwgXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyBpbmRleC50c1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcInNyY1wiLCBcIl9pbmRleC50c1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHNjcmlwdCwgX21vZHVsZSArIFwiLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGluZGV4LnNwZWMudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXguc3BlYy50c1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInVuaXRcIiwgX21vZHVsZSArIFwiLnNwZWMudHNcIiksXHJcbiAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZpc3VhbCBTdHVkaW8g44Gu44K944Oq44Ol44O844K344On44Oz44OV44Kh44Kk44Or5L2c5oiQXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY3JlYXRlVmlzdWFsU3R1ZGlvU29sdXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgY29uc3QgdnNQYXJhbSA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0ZUdVSUQgPSBVdGlscy5jcmVhdGVHVUlEO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcGFyYW06IElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24gPSA8YW55PiQuZXh0ZW5kKHt9LCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3ROYW1lICAgICAgID0gdGhpcy5fY29uZmlnLnByb2plY3ROYW1lO1xyXG4gICAgICAgICAgICBwYXJhbS5wcm9qZWN0R1VJRCAgICAgICA9IGNyZWF0ZUdVSUQoKTtcclxuICAgICAgICAgICAgcGFyYW0udHlwZXMgICAgICAgICAgICAgPSBwYXJhbS50eXBlcy5yZXBsYWNlKFwiQFwiLCBcIiU0MFwiKTsgLy8gZXNjYXBlIFwiQFwiIHRvIFwiJTQwXCJcclxuICAgICAgICAgICAgcGFyYW0ubWFpbkJhc2VOYW1lICAgICAgPSB0aGlzLl9jb25maWcubWFpbkJhc2VOYW1lO1xyXG4gICAgICAgICAgICBwYXJhbS5saWNlbnNlICAgICAgICAgICA9ICF0aGlzLl9jb25maWcucHJpdmF0ZTtcclxuXHJcbiAgICAgICAgICAgIC8vIHRvb2xzXHJcbiAgICAgICAgICAgIHBhcmFtLndlYnBhY2sgPSB0aGlzLmlzRW5hYmxlVG9vbChcIndlYnBhY2tcIik7XHJcbiAgICAgICAgICAgIHBhcmFtLnRlc3RlbSA9ICF0aGlzLmNvbmZpZy5ub2RlanM7XHJcblxyXG4gICAgICAgICAgICBwYXJhbS5vdXRwdXRTYW1lRGlyID0gdGhpcy5jb25maWcub3V0cHV0U2FtZURpcjtcclxuXHJcbiAgICAgICAgICAgIC8vIHNldHVwIGJ1aWx0IGpzIGdyb3VwXHJcbiAgICAgICAgICAgIHBhcmFtLmpzR3JvdXAgPSBbXTtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbS5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS5qc0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0uYnVpbHQgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRfdHM6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1pbl9tYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuY29uZmlnLm1pbmlmeSkge1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0dXAgcGtnIGdyb3VwXHJcbiAgICAgICAgICAgICAgICBwYXJhbS5qc0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0ucGtnICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgZF90czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbWFwOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHNldHVwIHRlc3QganMgZ3JvdXBcclxuICAgICAgICAgICAgcGFyYW0udHNHcm91cCA9IFtcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLnRlc3QgKyBcIlxcXFx1bml0XFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUgKyBcIi5zcGVjXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgbWFwOiB0aGlzLmNvbmZpZy5vdXRwdXRTYW1lRGlyLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgaWYgKHBhcmFtLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS5idWlsdCArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gLnNsblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3NvbHV0aW9uLnNsbi50cGxcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5zbG5cIiksXHJcbiAgICAgICAgICAgIHZzUGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyAuY3Nwcm9qXHJcbiAgICAgICAgKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdG9YbWxTdHJpbmcgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBob2dhbiA9IFV0aWxzLmhvZ2FuO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplVGV4dCA9IFV0aWxzLm5vcm1hbGl6ZVRleHQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgICAgICAgICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHRwbCA9IHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIGZpbGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QganN0ID0gaG9nYW4uY29tcGlsZShub3JtYWxpemVUZXh0KGZzLnJlYWRGaWxlU3luYyh0cGwpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc3QucmVuZGVyKHZzUGFyYW0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxET00gPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHRvWG1sU3RyaW5nKGZpbGUpKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b1htbE5vZGUgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVXRpbHMuc3RyMlhtbE5vZGUodG9YbWxTdHJpbmcoZmlsZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJHByb2ogPSB0b1htbERPTShcIl9wcm9qZWN0LmNzcHJvai50cGxcIik7XHJcbiAgICAgICAgICAgIGNvbnN0ICRncFRTID0gdG9YbWxOb2RlKFwiX3RzLml0ZW0uZ3JvdXAudHBsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BKUyA9IHRvWG1sTm9kZShcIl9qcy5pdGVtLmdyb3VwLnRwbFwiKTtcclxuXHJcbiAgICAgICAgICAgICRwcm9qXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIkl0ZW1Hcm91cFwiKVxyXG4gICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncFRTKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncEpTKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0WE1MID0gVXRpbHMuZm9ybWF0WE1MO1xyXG4gICAgICAgICAgICBjb25zdCBkc3RQYXRoID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLmNzcHJvalwiKTtcclxuICAgICAgICAgICAgZGVidWcoVXRpbHMueG1sTm9kZTJTdHIoJHByb2opKTtcclxuICAgICAgICAgICAgZnMud3JpdGVGaWxlU3luYyhkc3RQYXRoLCBmb3JtYXRYTUwoVXRpbHMueG1sTm9kZTJTdHIoJHByb2opKSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbGlicmFyeS9nZW5lcmF0b3ItbW9kdWxlLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JDb3Jkb3ZhIH0gZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWNvcmRvdmFcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTW9iaWxlKGNvbmZpZzogSVByb2plY3RDb25maWdyYXRpb24pOiBHZW5lcmF0b3JCYXNlIHtcclxuICAgIHJldHVybiBuZXcgR2VuZXJhdG9yQ29yZG92YShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgJCxcclxuICAgIF8sXHJcbiAgICBob2dhbixcclxuICAgIGRlYnVnLFxyXG4gICAgdGVtcGxhdGVQYXRoLFxyXG4gICAgY29weVRwbCxcclxuICAgIGV4ZWNDb21tYW5kLFxyXG4gICAgc3RyMlhtbE5vZGUsXHJcbiAgICB4bWxOb2RlMlN0cixcclxuICAgIG5vcm1hbGl6ZVRleHQsXHJcbiAgICBmb3JtYXRYTUwsXHJcbiAgICBjcmVhdGVHVUlELFxyXG59IGZyb20gXCIuLi8uLi91dGlsc1wiO1xyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElWaXN1YWxTdHVkaW9Db25maWdyYXRpb24sXHJcbiAgICBHZW5lcmF0b3JCYXNlLFxyXG59IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElNb2JpbGVBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckNvcmRvdmFcclxuICogQGJyaWVmIE1vYmlsZSBDb3Jkb3ZhIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yQ29yZG92YSBleHRlbmRzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBpbXByZW1lbnRlczogR2VuZXJhdG9yQmFzZVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgICAqL1xyXG4gICAgZGVmYXVsdEJhc2VTdHJ1Y3R1cmUoKTogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNyYzogXCJhcHBcIixcclxuICAgICAgICAgICAgcGtnOiBcInd3d1wiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICB0ZW1wOiBcIi50ZW1wXCIsXHJcbiAgICAgICAgICAgIGxpYjogXCJsaWJcIixcclxuICAgICAgICAgICAgZXh0ZXJuYWw6IFwiZXh0ZXJuYWxcIixcclxuICAgICAgICAgICAgcG9ydGluZzogXCJwb3J0aW5nXCIsXHJcbiAgICAgICAgICAgIHJlczogXCJyZXNcIixcclxuICAgICAgICAgICAgc3JjQ29uZmlnOiB7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQ6IFwic2NyaXB0c1wiLFxyXG4gICAgICAgICAgICAgICAgc3R5bGVzaGVldDogXCJzdHlsZXNoZWV0c1wiLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IFwidGVtcGxhdGVzXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY3Rpb24gZW50cnlcclxuICAgICAqIEBwYXJhbSB7SUxpYnJhcnlDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrDoqK3lrppcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGRlYnVnKEpTT04uc3RyaW5naWZ5KHRoaXMuY29uZmlnLCBudWxsLCA0KSk7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlQ29yZG92YSgpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2hkaXIodGhpcy5yb290RGlyKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVDb3Jkb3ZhU2NhZmZvbGQoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVDb25maWdYTUwoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGRDb3Jkb3ZhUGxhdGZvcm1zKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YVBsdWdpbnMoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5hZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXMoKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jYWNoZUNvcmRvdmFQYWNrYWdlSlNPTigpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZGlyKFwiLi5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdFNldHRpbmdzKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVTb3VyY2VUZW1wbGF0ZSgpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlVmlzdWFsU3R1ZGlvU29sdXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOW/heimgeOBqOOBmeOCiyB0YXNrIHNjcmlwdCDkuIDopqfjgpLov5TljbQuIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgICovXHJcbiAgICBnZXQgdGFza0xpc3QoKTogc3RyaW5nW10ge1xyXG4gICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgIFwiYmFubmVyLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY2xlYW4uanNcIixcclxuICAgICAgICAgICAgXCJjb21tYW5kLmpzXCIsXHJcbiAgICAgICAgICAgIFwiZXh0ZXJuYWwtcmVhcnJhbmdlLmpzXCIsXHJcbiAgICAgICAgICAgIFwibWluaWZ5LmpzXCIsXHJcbiAgICAgICAgICAgIFwic3JjbWFwLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVuZGxlLWZpbmFsaXplci5qc1wiLFxyXG4gICAgICAgICAgICBcInJlbWFwLWNvdmVyYWdlLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJvdGVjdGVkIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IGRlZmF1bHREZXZEZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IHN1cGVyLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMuY29uY2F0KFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9qYXNtaW5lXCIsICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkB0eXBlcy9yZXF1aXJlanNcIiwgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImF1dG9wcmVmaXhlclwiLCAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImNsZWFuLWNzc1wiLCAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImZzLWV4dHJhXCIsICAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImh0bWwtbWluaWZpZXJcIiwgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcIm5vZGUtc2Fzc1wiLCAgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInBvc3Rjc3MtY2xpXCIsICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInNtYXJ0d2F0Y2hcIiwgICAgICAgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdKTtcclxuXHJcbiAgICAgICAgY29uc3QgZXh0cmEgPSBbXTtcclxuICAgICAgICB0aGlzLmNvbmZpZy5kZXZEZXBlbmRlbmNpZXMuZm9yRWFjaCgoZGVwZW5kKSA9PiB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBkZXBlbmQubmFtZSwgdmVyc2lvbjogZGVwZW5kLnZlcnNpb24sIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZUNvcmRvdmEoKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJAdHlwZXMvY29yZG92YVwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGRlcGVuZHMuY29uY2F0KGV4dHJhKSwgKGRlcGVuZCkgPT4gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZXNsaW50cmMg44Gr5oyH5a6a44GZ44KLIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSDjg4bjg7Pjg5fjg6zjg7zjg4jjg5Hjg6njg6Hjg7zjgr/jgqrjg5bjgrjjgqfjgq/jg4hcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHF1ZXJ5RXNMaW50RW52UGFyYW0oKTogYW55IHtcclxuICAgICAgICBjb25zdCBiYXNlID0gc3VwZXIucXVlcnlFc0xpbnRFbnZQYXJhbSgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLmJhc2UsXHJcbiAgICAgICAgICAgIC4uLntcclxuICAgICAgICAgICAgICAgIGNvcmRvdmE6IHRoaXMuaXNFbmFibGVDb3Jkb3ZhKCksXHJcbiAgICAgICAgICAgICAgICBoYW1tZXJqczogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhhbW1lcmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgaXNjcm9sbDogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImlzY3JvbGxcIiksXHJcbiAgICAgICAgICAgICAgICBmbGlwc25hcDogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImZsaXBzbmFwXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0c2NvbmZpZy5iYXNlIOOBq+aMh+WumuOBmeOCiyB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0g44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeVRzQ29uZmlnQmFzZVBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgLi4udGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICAuLi57XHJcbiAgICAgICAgICAgICAgICBjb3Jkb3ZhOiB0aGlzLmlzRW5hYmxlQ29yZG92YSgpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmWi+eZuuaZguOBruS+neWtmOODouOCuOODpeODvOODq+ODquOCueODiOOBruWPluW+l1xyXG4gICAgICog5b+F6KaB44Gr5b+c44GY44Gm44Kq44O844OQ44O844Op44Kk44OJXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7SURlcGVuZGVuY3l9XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0IGRlZmF1bHREZXBlbmRlbmNpZXMoKTogSURlcGVuZGVuY3lbXSB7XHJcbiAgICAgICAgY29uc3QgZGVwZW5kcyA9IFtcclxuICAgICAgICAgICAgeyBuYW1lOiBcIkBjZHAvbW9iaWxlXCIsICB2ZXJzaW9uOiBcImdpdCtzc2g6Ly9naXRAZ2l0aHViLmNvbS9DRFAtVG9reW8vY2RwLWpzLmdpdFwiLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiYmFja2JvbmVcIiwgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImpxdWVyeVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJyZXF1aXJlanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidW5kZXJzY29yZVwiLCAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjb25zdCBleHRyYSA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IGRlcGVuZC5uYW1lLCB2ZXJzaW9uOiBkZXBlbmQudmVyc2lvbiwgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElNb2JpbGVBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SU1vYmlsZUFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOBruacieWKuS/nhKHlirnjg4Hjgqfjg4Pjgq9cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlOiDmnInlirkgLyBmYWxzZTog54Sh5Yq5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNFbmFibGVDb3Jkb3ZhKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoMCA8IHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGliL3BvcnRpbmcg44Gu6Kit5a6a54q25rOB44Gu44OB44Kn44OD44KvXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICogQHJldHVybnMgdHJ1ZTog6Kit5a6aIC8gZmFsc2U6IOacquioreWumlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhc1N0cnVjdHVyZU9mKHRhcmdldDogXCJsaWJcIiB8IFwicG9ydGluZ1wiKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNvbmZpZy5wcm9qZWN0U3RydWN0dXJlICYmIDAgPD0gdGhpcy5jb25maWcucHJvamVjdFN0cnVjdHVyZS5pbmRleE9mKHRhcmdldCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Kk44Oz44K544OI44O844Or5a++6LGhL+mdnuWvvuixoeODgeOCp+ODg+OCr1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lICAgIFtpbl0g44Oi44K444Ol44O844Or5ZCNXHJcbiAgICAgKiBAcGFyYW0gZGVwZW5kcyBbaW5dIOaknOe0ouWvvuixoSAo5pei5a6aIHRoaXMuY29uZmlnLmRlcGVuZGVuY2llcylcclxuICAgICAqIEByZXR1cm5zIHRydWU6IOWvvuixoSAvIGZhbHNlOiDpnZ7lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0luc3RhbGxhdGlvblRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IElEZXBlbmRlbmN5W10gPSB0aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISFkZXBlbmRzLmZpbmQoKGRlcGVuZCkgPT4gbmFtZSA9PT0gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOCkueUqOOBhOOBn+ODl+ODreOCuOOCp+OCr+ODiOS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZUNvcmRvdmFTY2FmZm9sZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmNyZWF0ZUNvcmRvdmFTY2FmZm9sZFwiKTtcclxuICAgICAgICBkZWJ1ZyhcImNyZWF0ZUNvcmRvdmFTY2FmZm9sZFwiKTtcclxuXHJcbiAgICAgICAgLy8gYCQgY29yZG92YSBjcmVhdGUgY29vbC1tb2JpbGUgY29tLnNvbnkuY2RwLmNvb2xtb2JpbGUgXCJDb29sIE1vYmlsZVwiYFxyXG4gICAgICAgIGF3YWl0IGV4ZWNDb21tYW5kKFwiY29yZG92YVwiLCBbXCJjcmVhdGVcIiwgdGhpcy5jb25maWcucHJvamVjdE5hbWUsIHRoaXMuY29uZmlnLmFwcElkLCB0aGlzLmNvbmZpZy5hcHBOYW1lXSk7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBmaWxlc1xyXG4gICAgICAgIGdsb2Iuc3luYyhcInd3dy8qKi8qXCIsIHtcclxuICAgICAgICAgICAgY3dkOiB0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSxcclxuICAgICAgICB9KS5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLnJlbW92ZVN5bmMocGF0aC5qb2luKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBmaWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnMucmVtb3ZlU3luYyhwYXRoLmpvaW4odGhpcy5jb25maWcucHJvamVjdE5hbWUsIFwicmVzXCIpKTtcclxuICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGguam9pbih0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgXCIubnBtaWdub3JlXCIpKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZSByb290IGRpcmVjdG9yeVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBcIi4vXCIpO1xyXG4gICAgICAgIGZzLnJlbW92ZVN5bmModGhpcy5jb25maWcucHJvamVjdE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlnLnhtbCDjga7kv67mraNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb25maWdYTUwoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS51cGRhdGVDb25maWdYbWxcIik7XHJcbiAgICAgICAgZGVidWcoXCJ1cGRhdGVDb25maWdYTUxcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1htbFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJjb25maWcueG1sXCIpO1xyXG4gICAgICAgIGNvbnN0ICRjb25maWdYbWxEb20gPSAkKHN0cjJYbWxOb2RlKGZzLnJlYWRGaWxlU3luYyhjb25maWdYbWxQYXRoKS50b1N0cmluZygpKSk7XHJcblxyXG4gICAgICAgICRjb25maWdYbWxEb21cclxuICAgICAgICAgICAgLmZpbmQoXCJ3aWRnZXRcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJ2ZXJzaW9uXCIsIHRoaXMuY29uZmlnLnZlcnNpb24pXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaW9zLUNGQnVuZGxlSWRlbnRpZmllclwiLCB0aGlzLmNvbmZpZy5hcHBJZClcclxuICAgICAgICAgICAgLnByZXBlbmQoc3RyMlhtbE5vZGUoYFxyXG4gICAgICAgICAgICAgICAgPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz5cclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJLZXlib2FyZERpc3BsYXlSZXF1aXJlc1VzZXJBY3Rpb25cIiB2YWx1ZT1cImZhbHNlXCIvPlxyXG4gICAgICAgICAgICAgICAgPHByZWZlcmVuY2UgbmFtZT1cIkJhY2tncm91bmRDb2xvclwiIHZhbHVlPVwiMHhmZjAwMDAwMFwiIC8+XHJcbiAgICAgICAgICAgIGApKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBjb3Jkb3ZhIHRlYW0gaW5mb3JtYXRpb25cclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwiZGVzY3JpcHRpb25cIilcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgICAgICRjb25maWdYbWxEb21cclxuICAgICAgICAgICAgLmZpbmQoXCJhdXRob3JcIilcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGNvbmZpZ1htbFBhdGgsIGZvcm1hdFhNTCh4bWxOb2RlMlN0cigkY29uZmlnWG1sRG9tKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGxhdGZvcm0g6L+95YqgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkQ29yZG92YVBsYXRmb3JtcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBkZWJ1ZyhcImFkZENvcmRvdmFQbGF0Zm9ybXNcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmNvbmZpZy5wbGF0Zm9ybXMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXJnZXRzLmluZGV4T2YoXCJpb3NcIik7XHJcbiAgICAgICAgaWYgKDAgPD0gaW5kZXggJiYgXCJkYXJ3aW5cIiAhPT0gcHJvY2Vzcy5wbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICB0aGlzLndhcm4oXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuaU9TV2FybmluZ1wiKTtcclxuICAgICAgICAgICAgdGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmFkZFBsYXRmb3Jtc1wiKTtcclxuXHJcbiAgICAgICAgLy8gYCQgY29yZG92YSBwbGF0Zm9ybSBhZGQgYW5kcm9pZCBpb3NgXHJcbiAgICAgICAgYXdhaXQgZXhlY0NvbW1hbmQoXCJjb3Jkb3ZhXCIsIFtcInBsYXRmb3JtXCIsIFwiYWRkXCJdLmNvbmNhdCh0YXJnZXRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwbHVnaW4g6L+95YqgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkQ29yZG92YVBsdWdpbnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5hZGRQbHVnaW5zXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiYWRkQ29yZG92YVBsdWdpbnNcIik7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogSS9GIOOBr+ikh+aVsOOBruODl+ODqeOCsOOCpOODs+OCkuS4gOaLrOOBp+i/veWKoOOBmeOCi+OBk+OBqOOBjOWPr+iDveOBoOOBjOOAgVxyXG4gICAgICAgICAqIGNvcmRvdmEgdmVyc2lvbiDjgpLliKTlrprjgZfjgabjgYTjgovjg5fjg6njgrDjgqTjg7Pjga/oqqTliKTlrprjgZnjgovjgZPjgajjgYzjgYLjgovjgZ/jgoHjgIFcclxuICAgICAgICAgKiAx44Gk44Ga44Gk6L+95Yqg44GZ44KLXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiDku6XkuIvjga7kuI3lhbflkIjjgavpoZ7kvLzjgZnjgovnj77osaFcclxuICAgICAgICAgKiBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NCLTEyNjYzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmNvbmZpZy5jb3Jkb3ZhX3BsdWdpbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYCQgY29yZG92YSBwbHVnaW4gYWRkIGNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3NlcmBcclxuICAgICAgICAgICAgYXdhaXQgZXhlY0NvbW1hbmQoXCJjb3Jkb3ZhXCIsIFtcInBsdWdpblwiLCBcImFkZFwiLCB0aGlzLmNvbmZpZy5jb3Jkb3ZhX3BsdWdpbltpXS5uYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSBwcm9qZWN0IOOBq+i/veWKoOOBmeOCi+ODquOCveODvOOCueOCkuOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFFeHRlbnRpb25GaWxlcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmFkZEV4dGVuc2lvbnNcIik7XHJcbiAgICAgICAgZGVidWcoXCJhZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXNcIik7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwibW9iaWxlL2NvcmRvdmFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOBjOeUn+aIkOOBl+OBnyBwYWNrYWdlLmpzb24g44KS44Kt44Oj44OD44K344OlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY2FjaGVDb3Jkb3ZhUGFja2FnZUpTT04oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoXCIuL3BhY2thZ2UuanNvblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcIi4vcGFja2FnZS5qc29uXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvcmRvdmEgdGVhbSBpbmZvcm1hdGlvblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLm5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24udmVyc2lvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5tYWluO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLnNjcmlwdHM7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24uYXV0aG9yO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICAgICAvLyDjg5XjgqHjgqTjg6vjga/jgYTjgaPjgZ/jgpPliYrpmaRcclxuICAgICAgICAgICAgZnMucmVtb3ZlU3luYyhcIi4vcGFja2FnZS5qc29uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OH44Kj44Os44Kv44OI44Oq5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmFwcC5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmVcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmVcIik7XHJcblxyXG4gICAgICAgIC8vIGFwcCBiYXNlIHN0cnVjdHVyZVxyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcIm1vYmlsZS9zdHJ1Y3R1cmUvYmFzZVwiKTtcclxuXHJcbiAgICAgICAgLy8gbGliXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU3RydWN0dXJlT2YoXCJsaWJcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGUvc3RydWN0dXJlL2xpYlwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmxpYilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHBvcnRpbmdcclxuICAgICAgICBpZiAodGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGUvc3RydWN0dXJlL3BvcnRpbmdcIixcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlOiBkZXYvcG9ydGluZy9AdHlwZXNcclxuICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGgoXCJiYXNlLy5naXRrZWVwXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcyxcclxuICAgICAgICAgICAgICAgICAgICBcIi5naXRrZWVwXCJcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFBMQVRGT1JNU19ST09UID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwbGF0Zm9ybXNcIik7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKFBMQVRGT1JNU19ST09UKVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKHBhdGguam9pbihQTEFURk9STVNfUk9PVCwgcGxhdGZvcm0pKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weVRwbERpcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibW9iaWxlL3N0cnVjdHVyZS9wb3J0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oUExBVEZPUk1TX1JPT1QsIHBsYXRmb3JtLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHd3d1xyXG4gICAgICAgIGNvbnN0IFdXVyA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wa2cpO1xyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhXV1cpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyKFdXVyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRlbXBsYXRlUGF0aChcImJhc2UvLmdpdGtlZXBcIiksIHBhdGguam9pbihXV1csIFwiLmdpdGtlZXBcIikpO1xyXG5cclxuICAgICAgICAvLyB0YXNrXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKiovKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGVtcGxhdGVQYXRoKFwibW9iaWxlL3Rhc2tcIiksXHJcbiAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdGFza1wiKSwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaywgZmlsZSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5hcHAuY3JlYXRlUHJvamVjdFNldHRpbmdzXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiY3JlYXRlUHJvamVjdFNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX3Byb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInByb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAkLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBob2dhbjogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhvZ2FuLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgaGFtbWVyanM6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJoYW1tZXJqc1wiKSxcclxuICAgICAgICAgICAgICAgIGlzY3JvbGw6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRzY29uZmlnXHJcbiAgICAgICAgLy8gdHNjb25maWcuYmFzZS5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfdHNjb25maWcuYmFzZS5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmJhc2UuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5xdWVyeVRzQ29uZmlnQmFzZVBhcmFtKCksXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfdHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gZXNsaW50cmMuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX2VzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJlc2xpbnRcIiwgXCJlc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5RXNMaW50RW52UGFyYW0oKSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0ZXN0ZW1cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3Rvb2xzL3Rlc3RlbVwiKSwgXCJfdGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgXCJ0ZXN0ZW0uanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RlbVN0dWZmUGF0aCA9IHRlbXBsYXRlUGF0aChcIm1vYmlsZS90b29scy90ZXN0ZW0vcnVubmVyXCIpO1xyXG5cclxuICAgICAgICBnbG9iLnN5bmMoXCIqKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGVzdGVtU3R1ZmZQYXRoLFxyXG4gICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlc3RlbVN0dWZmUGF0aCwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInJ1bm5lclwiLCBmaWxlKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC5naXRpZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlXCIpLCBcIl9naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSRUFETUUubWRcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlXCIpLCBcIl9SRUFETUUubWRcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICAkLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBjb3Jkb3ZhOiB0aGlzLmlzRW5hYmxlQ29yZG92YSgpLFxyXG4gICAgICAgICAgICAgICAgbGliOiB0aGlzLmhhc1N0cnVjdHVyZU9mKFwibGliXCIpLFxyXG4gICAgICAgICAgICAgICAgcG9ydGluZzogdGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIiksXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogdGVtcGxhdGVzL21vYmlsZS9hZGRvbiDjgYvjgonjgrPjg5Tjg7zjgZnjgovloLTlkIjjga/jgZPjgZPjgaflr77lv5xcclxuXHJcbiAgICAgICAgLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRDb25maWcgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJlc29sdmVkQ29uZmlnLmRlcGVuZGVuY2llcyA9IGF3YWl0IHRoaXMucXVlcnlEZXBlbmRlbmNpZXNQYXJhbSh0aGlzLmRlZmF1bHREZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIHJlc29sdmVkQ29uZmlnLmRldkRlcGVuZGVuY2llcyA9IGF3YWl0IHRoaXMucXVlcnlEZXBlbmRlbmNpZXNQYXJhbSh0aGlzLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX3BhY2thZ2UuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHJlc29sdmVkQ29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGNvcmRvdmFQYWNrYWdlSlNPTiDjgajjg57jg7zjgrhcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFBLR19QQVRIID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFBLR19QQVRIKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgcGtnLCB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc29ydEtleXMgPSAodGFyZ2V0OiBvYmplY3QpOiBvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGVkID0ge307XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXQpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRba2V5XSA9IHRhcmdldFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydGVkO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcGtnLmRlcGVuZGVuY2llcyAgICA9IHNvcnRLZXlzKHBrZy5kZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgICAgICBwa2cuZGV2RGVwZW5kZW5jaWVzID0gc29ydEtleXMocGtnLmRldkRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKFBLR19QQVRILCBKU09OLnN0cmluZ2lmeShwa2csIG51bGwsIDIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgr3jg7zjgrnjga7pm5vlvaLkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVTb3VyY2VUZW1wbGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5hcHAuY3JlYXRlU291cmNlVGVtcGxhdGVcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVTb3VyY2VUZW1wbGF0ZVwiKTtcclxuXHJcbiAgICAgICAgLy8gY29weSBzb3VyY2VzXHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICBcIm1vYmlsZS9zcmMvc3RydWN0dXJlXCIsXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgeyAvLyBjb25maWcudHNcclxuICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbCA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZGVwZW5kZW5jaWVzLmxlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RXaXRoQ3VzdG9tTmFtZTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cyA9IFsuLi50aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMsIC4uLnRoaXMuY29uZmlnLnJlc291cmNlX2FkZG9uXTtcclxuICAgICAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmZpbGVOYW1lIHx8IGluZm8udmVuZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5hZGRpdGlvbmFsLmxpc3RXaXRoQ3VzdG9tTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVuZGVyTmFtZTogaW5mby52ZW5kZXJOYW1lIHx8IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGluZm8uZmlsZU5hbWUgfHwgaW5mby5hbGlhcyB8fCBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLmFkZGl0aW9uYWwubGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyY1wiKSwgXCJfY29uZmlnLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQsIFwiY29uZmlnLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZywgYWRkaXRpb25hbCksXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7IC8vIGFwcC50c1xyXG4gICAgICAgICAgICBjb25zdCBnbG9iYWxzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMubGVuZ3RoIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzTGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHNMaXN0OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXhwb3J0czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cyA9IFsuLi50aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMsIC4uLnRoaXMuY29uZmlnLnJlc291cmNlX2FkZG9uXTtcclxuICAgICAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmdsb2JhbEV4cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5nbG9iYWxzLmV4cG9ydHNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXhwb3J0OiBpbmZvLmdsb2JhbEV4cG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5nbG9iYWxzLmltcG9ydHNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogaW5mby5hbGlhcyB8fCBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uZ2xvYmFscy5oYXNFeHBvcnRzID0gKDAgPCBwYXJhbS5nbG9iYWxzLmV4cG9ydHNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS9zcmNcIiksIFwiX2FwcC50c1wiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0LCBcImFwcC50c1wiKSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHMsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7Ly8gbG9jYWxpemUgcmVzb3VyY2VzXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyYy9fbG9jYWxlc1wiKSwgXCJfbWVzc2FnZXMuZW4tVVMuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3REaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibG9jYWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZXMuZW4tVVMuanNvblwiXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS9zcmMvX2xvY2FsZXNcIiksIFwiX21lc3NhZ2VzLmphLUpQLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnJlcyxcclxuICAgICAgICAgICAgICAgICAgICBcImxvY2FsZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VzLmphLUpQLmpzb25cIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIC5naXRrZWVwXHJcbiAgICAgICAgICAgIGZzLnVubGlua1N5bmMocGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5yZXMsXHJcbiAgICAgICAgICAgICAgICBcIi5naXRrZWVwXCJcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7Ly8gcGF0Y2guZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyYy9fcGF0Y2guZGVwZW5kZW5jaWVzXCIpLCBcIl9pbmRleC5kLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5leHRlcm5hbCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYXRjaC5kZXBlbmRlbmNpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImluZGV4LmQudHNcIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW1tZXJqczogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhhbW1lcmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsaXBzbmFwOiB0aGlzLmlzSW5zdGFsbGF0aW9uVGFyZ2V0KFwiZmxpcHNuYXBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNjcm9sbDogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImlzY3JvbGxcIiksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb3B5IHBhdGNoIGQudHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJoYW1tZXJqc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmModGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyYy9fcGF0Y2guZGVwZW5kZW5jaWVzL2pxdWVyeS5oYW1tZXIuZC50c1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0Y2guZGVwZW5kZW5jaWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianF1ZXJ5LmhhbW1lci5kLnRzXCJcclxuICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImZsaXBzbmFwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvc3JjL19wYXRjaC5kZXBlbmRlbmNpZXMvZmxpcHNuYXAuZC50c1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0Y2guZGVwZW5kZW5jaWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxpcHNuYXAuZC50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvc3JjL19wYXRjaC5kZXBlbmRlbmNpZXMvaXNjcm9sbC5kLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZXh0ZXJuYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXRjaC5kZXBlbmRlbmNpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpc2Nyb2xsLmQudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZW1vdmUgLmdpdGtlZXBcclxuICAgICAgICAgICAgZnMudW5saW5rU3luYyhwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3REaXIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnR5cGVzLFxyXG4gICAgICAgICAgICAgICAgXCIuZ2l0a2VlcFwiXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgey8vIGluZGV4Lmh0bWxcclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvc3JjXCIpLCBcIl9pbmRleC5odG1sXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHZzUGFyYW0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbTogSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbiA9IDxhbnk+JC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdE5hbWUgPSB0aGlzLl9jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3RHVUlEID0gY3JlYXRlR1VJRCgpO1xyXG4gICAgICAgICAgICBwYXJhbS50eXBlcyA9IHBhcmFtLnR5cGVzLnJlcGxhY2UoXCJAXCIsIFwiJTQwXCIpOyAvLyBlc2NhcGUgXCJAXCIgdG8gXCIlNDBcIlxyXG4gICAgICAgICAgICBwYXJhbS5saWNlbnNlID0gIXRoaXMuX2NvbmZpZy5wcml2YXRlO1xyXG5cclxuICAgICAgICAgICAgLy8gZXh0ZXJuYWxcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmNvcmRvdmEgICAgPSB0aGlzLmlzRW5hYmxlQ29yZG92YSgpO1xyXG4gICAgICAgICAgICAoPGFueT5wYXJhbSkuaG9nYW4gICAgICA9IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJob2dhbi5qc1wiKTtcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmhhbW1lcmpzICAgPSB0aGlzLmlzSW5zdGFsbGF0aW9uVGFyZ2V0KFwiaGFtbWVyanNcIik7XHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5pc2Nyb2xsICAgID0gdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImlzY3JvbGxcIik7XHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5mbGlwc25hcCAgID0gdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImZsaXBzbmFwXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJvamVjdCBzdHJ1Y3R1cmVcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmVuYWJsZUxpYiAgICAgID0gdGhpcy5oYXNTdHJ1Y3R1cmVPZihcImxpYlwiKTtcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmVuYWJsZVBvcnRpbmcgID0gdGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBwbGF0Zm9ybXNcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLnBsYXRmb3JtcyA9IFsuLi50aGlzLmNvbmZpZy5wbGF0Zm9ybXNdO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgYnVpbHQgdHMgZ3JvdXBcclxuICAgICAgICAgICAgcGFyYW0udHNHcm91cCA9IFtdO1xyXG4gICAgICAgICAgICBnbG9iLnN5bmMoXCIqKi8qLnRzXCIsIHtcclxuICAgICAgICAgICAgICAgIGN3ZDogcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3JjQ29uZmlnLnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zcmNDb25maWcuc2NyaXB0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguZGlybmFtZShmaWxlKVxyXG4gICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9cXC8vZywgXCJcXFxcXCIpICsgXCJcXFxcXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHBhdGguYmFzZW5hbWUoZmlsZSwgXCIudHNcIik7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcmVsYXRpdmVQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzZXR1cCB0ZXN0IHRzIGdyb3VwXHJcbiAgICAgICAgICAgIGdsb2Iuc3luYyhcIioqLyoudHNcIiwge1xyXG4gICAgICAgICAgICAgICAgY3dkOiBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidW5pdFwiXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXJhbS50ZXN0ICsgXCJcXFxcdW5pdFxcXFxcIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gcGF0aC5iYXNlbmFtZShmaWxlLCBcIi50c1wiKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiByZWxhdGl2ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyAuc2xuXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgXCJfc29sdXRpb24uc2xuLnRwbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLnNsblwiKSxcclxuICAgICAgICAgICAgdnNQYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIC5jc3Byb2pcclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b1htbFN0cmluZyA9IChmaWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGltaXRlcnM6IFwie3sgfX1cIixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKGZpbGUpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc3QucmVuZGVyKHZzUGFyYW0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxET00gPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHRvWG1sU3RyaW5nKGZpbGUpKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b1htbE5vZGUgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyMlhtbE5vZGUodG9YbWxTdHJpbmcoZmlsZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJHByb2ogPSB0b1htbERPTShwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3Byb2plY3QuY3Nwcm9qLnRwbFwiKSk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRncFRTID0gdG9YbWxOb2RlKHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3RzLml0ZW0uZ3JvdXAudHBsXCIpKTtcclxuXHJcbiAgICAgICAgICAgICRwcm9qXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIkl0ZW1Hcm91cFwiKVxyXG4gICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncFRTKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZHN0UGF0aCA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5jc3Byb2pcIik7XHJcbiAgICAgICAgICAgIGRlYnVnKHhtbE5vZGUyU3RyKCRwcm9qKSk7XHJcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgZm9ybWF0WE1MKHhtbE5vZGUyU3RyKCRwcm9qKSkpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8vIHdlYi5jb25maWdcclxuICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdmlzdWFsLnN0dWRpby9fd2ViLmNvbmZpZ1wiKSwgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ3ZWIuY29uZmlnXCIpKTtcclxuICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdmlzdWFsLnN0dWRpby9fd2ViLkRlYnVnLmNvbmZpZ1wiKSwgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ3ZWIuRGVidWcuY29uZmlnXCIpKTtcclxuICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdmlzdWFsLnN0dWRpby9fd2ViLlJlbGVhc2UuY29uZmlnXCIpLCBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIndlYi5SZWxlYXNlLmNvbmZpZ1wiKSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL21vYmlsZS9nZW5lcmF0b3ItY29yZG92YS50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yRWxlY3Ryb24gfSBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1lbGVjdG9yb25cIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yRGVza3RvcChjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckVsZWN0cm9uKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSURlc2t0b3BBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckVsZWN0cm9uXHJcbiAqIEBicmllZiBEZXNrdG9wIEVsZWN0cm9uIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yRWxlY3Ryb24gZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3cvYXBwXCIsIC8vIFRPRE86IOaaq+WumlxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICBzcmNDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHNjcmlwdDogXCJzY3JpcHRzXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiBcInN0eWxlc2hlZXRzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJ0ZW1wbGF0ZXNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJRGVza3RvcEFwcENvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSURlc2t0b3BBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SURlc2t0b3BBcHBDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckJyb3dzZXIgfSBmcm9tIFwiLi9nZW5lcmF0b3ItYnJvd3NlclwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItYnJvd3NlclwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JXZWIoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JCcm93c2VyKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9pbmRleC50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJV2ViQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCcm93c2VyXHJcbiAqIEBicmllZiBXZWIgQnJvd3NlciDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckJyb3dzZXIgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSVdlYkFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJV2ViQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2dlbmVyYXRvci1icm93c2VyLnRzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24sXHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSUxpYnJhcnlDb25maWdyYXRpb24sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVJbmZvLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlcyxcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbiAgICAvLy8vXHJcbiAgICBuZXdHZW5lcmF0b3JcclxufSBmcm9tIFwiLi9nZW5lcmF0b3JzXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uLFxyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElMaWJyYXJ5Q29uZmlncmF0aW9uLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlSW5mbyxcclxuICAgIElFeHRlcm5hbE1vZHVsZXMsXHJcbiAgICBJTW9iaWxlQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSURlc2t0b3BBcHBDb25maWdyYXRpb24sXHJcbiAgICBJV2ViQXBwQ29uZmlncmF0aW9uLFxyXG59O1xyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ0RQTGliXHJcbiAqIEBicmllZiBDRFAgYm9pbGVycGxhdGUg55Sf5oiQ5qmf6IO944KS5o+Q5L6b44GZ44KL44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDRFBMaWIge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwdWJpYyBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFpbiBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZXhlY3V0ZShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgVXRpbHMuc2V0U2V0dGluZ3MoY29uZmlnLnNldHRpbmdzKTtcclxuICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yKGNvbmZpZykucnVuKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9jZHAtbGliLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImZzLWV4dHJhXCIsXCJjb21tb25qczJcIjpcImZzLWV4dHJhXCJ9XG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn1cbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIkhvZ2FuXCIsXCJjb21tb25qc1wiOlwiaG9nYW4uanNcIixcImNvbW1vbmpzMlwiOlwiaG9nYW4uanNcIixcImFtZFwiOlwiaG9nYW4uanNcIn1cbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwifVxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZS5zdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCIsXCJjb21tb25qczJcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGljaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwid2hpY2hcIixcImNvbW1vbmpzMlwiOlwid2hpY2hcIn1cbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInV1aWRcIixcImNvbW1vbmpzMlwiOlwidXVpZFwifVxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNoYWxrXCIsXCJjb21tb25qczJcIjpcImNoYWxrXCJ9XG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW12ZXItcmVnZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn1cbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsaS1zcGlubmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjbGktc3Bpbm5lclwiLFwiY29tbW9uanMyXCI6XCJjbGktc3Bpbm5lclwifVxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4bWxkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpxdWVyeVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHsgc3Bhd24sIFNwYXduT3B0aW9ucyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBob2dhbixcclxuICAgICQsXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBTcGlubmVyLFxyXG59IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhc3NlcnQsXHJcbiAgICBnZXRMaWJQYXRoLFxyXG59IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBleHBvcnRzIG1ldGhvZHM6XHJcblxyXG4vKipcclxuICogSGFuZGxlIGNvbW1hbmQgbGluZSBlcnJvciBhbmQga2lsbCBwcm9jZXNzLlxyXG4gKiBXaGVuIHRoZSBhcHBsaWNhdGlvbiByZWNlaXZlZCBlcnJvciBmcm9tIGNsaSwgcGxlYXNlIGNhbGwgdGhpcyBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvciAgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgYXNzZXJ0KGZhbHNlLCBlcnJvcik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogXCJ0ZW1wbGF0ZXNcIiDjg4fjgqPjg6zjgq/jg4jjg6rjgYvjgonjga7jg5HjgrnjgpLlj5blvpcuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdGFyZ2V0IOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAqIEByZXR1cm4ge1N0cmluZ30gdGVtcGxhdGVzL2hvZ2Vob2dlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVQYXRoKHRhcmdldDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmIChudWxsID09IHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwidGVtcGxhdGVzXCIsIHRhcmdldCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR2V0IHNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqIENMSSBoZWxwZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gIFtmb3JtYXRdICBzcGlubmVyIGZvcm1hdCBzdHJpbmcuXHJcbiAqIEBwYXJhbSAge051bWJlcn0gIFtpbmRleF0gICBzcGlubmVyIGluZGV4IGRlZmluZWQgYnkgY2xpLXNwaW5uZXIuIChkZWZhdWx0OiByYW5kb20gWzAtMjldKVxyXG4gKiBAcmV0dXJuIHtTcGlubmVyfSBjbGktc3Bpbm5lciBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGlubmVyKGZvcm1hdD86IHN0cmluZywgaW5kZXg/OiBudW1iZXIpOiB7IHN0YXJ0OiAoKSA9PiB2b2lkOyBzdG9wOiAoY2xlYW4/OiBib29sZWFuKSA9PiB2b2lkOyB9IHtcclxuICAgIGNvbnN0IHNwaW5uZXJzID0gW1xyXG4gICAgICAgIFwifC8tXFxcXFwiLFxyXG4gICAgICAgIFwi4pSk4pSY4pS04pSU4pSc4pSM4pSs4pSQXCIsXHJcbiAgICAgICAgXCLil6Lil6Pil6Til6VcIixcclxuICAgICAgICBcIuKWjOKWgOKWkOKWhFwiLFxyXG4gICAgICAgIFwi4paJ4paK4paL4paM4paN4paO4paP4paO4paN4paM4paL4paK4paJXCIsXHJcbiAgICAgICAgXCLiloHiloPiloTiloXilobilofilojilofilobiloXiloTiloNcIixcclxuICAgICAgICBcIuKYseKYsuKYtFwiLFxyXG4gICAgICAgIFwiLm9PQCpcIixcclxuICAgICAgICBcIuKXkOKXk+KXkeKXklwiLFxyXG4gICAgICAgIC8vLy9cclxuICAgICAgICBcIuKXoeKXoSDiipniipkg4peg4pegXCIsXHJcbiAgICAgICAgXCLilqDilqHilqrilqtcIixcclxuICAgICAgICBcIuKGkOKGluKGkeKGl+KGkuKGmOKGk+KGmVwiLFxyXG4gICAgICAgIFwiLm9PwrBPby5cIixcclxuICAgIF07XHJcbiAgICBjb25zdCBmbXQgPSBmb3JtYXQgfHwgXCIlc1wiO1xyXG4gICAgY29uc3Qgc3Bpbm5lciA9IG5ldyBTcGlubmVyKGZtdCk7XHJcbiAgICBjb25zdCBpZHggPSAobnVsbCAhPSBpbmRleCAmJiAwIDw9IGluZGV4ICYmIGluZGV4IDwgMTQpID8gaW5kZXggOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBzcGlubmVyLnNldFNwaW5uZXJTdHJpbmcoc3Bpbm5lcnNbaWR4XSk7XHJcbiAgICByZXR1cm4gc3Bpbm5lcjtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIE5vcm1hbGl6ZVRleHRPcHRpb25zXHJcbiAqIEBicmllZiBub3JtYWxpemVUZXh0KCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIGVvbD86IHN0cmluZzsgICAvLyBkZWZhdWx0OiBvcy5FT0xcclxuICAgIGJvbT86IGJvb2xlYW47ICAvLyBkZWZhdWx0OiB0cnVlXHJcbiAgICB0YWI/OiBudW1iZXI7ICAgLy8gdGFiIOOCkuWkieaPm+OBmeOCi+OCueODmuODvOOCueOBruaVsOOCkuaMh+Wumi4gZGVmYXVsdDog5aSJ5o+b44GX44Gq44GEXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemUgdGV4dCBsaW5lLWZlZWQuXHJcbiAqIGZvciB3aW5kb3dzIGdpdCB1c2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgdGV4dCAgICAgIGlucHV0IHRleHQuXHJcbiAqIEBwYXJhbSAge05vcm1hbGl6ZVRleHRPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9uLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IG5vcm1hbGl6ZWQgdGV4dC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUZXh0KHRleHQ6IHN0cmluZywgb3B0aW9ucz86IE5vcm1hbGl6ZVRleHRPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogTm9ybWFsaXplVGV4dE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHVmZWZmL2dtLCBcIlwiKSAgIC8vIHJlbW92ZSBib21cclxuICAgICAgICAucmVwbGFjZSgvXFxyXFxuL2dtLCBcIlxcblwiKSAgICAvLyBvbmNlIFwiXFxuXCJcclxuICAgICAgICAucmVwbGFjZSgvXFxyL2dtLCBcIlxcblwiKVxyXG4gICAgO1xyXG5cclxuICAgIGlmIChvcHQuYm9tKSB7XHJcbiAgICAgICAgdGV4dCA9IFwiXFx1ZmVmZlwiICsgdGV4dDtcclxuICAgIH1cclxuICAgIGlmIChcIlxcblwiICE9PSBvcHQuZW9sKSB7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2dtLCBvcHQuZW9sKTtcclxuICAgIH1cclxuICAgIGlmIChvcHQudGFiKSB7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdC50YWI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nbSwgc3BhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9uc1xyXG4gKiBAYnJpZWYgZXhlY0NvbW1hbmQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zIGV4dGVuZHMgU3Bhd25PcHRpb25zIHtcclxuICAgIHNwaW5uZXI/OiB7XHJcbiAgICAgICAgZm9ybWF0Pzogc3RyaW5nOyAgICAvLyBleCkgXCIlc1wiXHJcbiAgICAgICAgaW5kZXg/OiBudW1iZXI7ICAgICAvLyAwIC0gOSDjga7mlbDlgKTjgpLmjIflrppcclxuICAgIH07XHJcbiAgICBzdGRvdXQ/OiAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgc3RkZXJyPzogKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGUgY29tbWFuZCBsaW5lIGJ5IHNwYXduLlxyXG4gKiBjYWxsIHNwYXduLiBpZiBlcnJvciBvY2N1cmVkLCBjdWkgaXMga2lsbGVkIHByb2NjZXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgICAgICAgIGNvbW1hbmQgICAgbWFpbiBjb21tYW5kLiBleCkgXCJjb3Jkb3ZhXCJcclxuICogQHBhcmFtICAge1N0cmluZ1tdfSAgICAgICAgICAgICBhcmdzICAgICAgIGNvbW1hbmQgYXJncy4gZXgpIFtcInBsdWdpblwiLCBcImFkZFwiLCBwbHVnaW5OYW1lXVxyXG4gKiBAcGFyYW0gICB7RXhlY0NvbW1hbmRPcHRpb25zfSAgIFtvcHRpb25zXSAgY2xpLXNwaW5uZXJcInMgb3B0aW9ucy5cclxuICogQHJldHVybnMge051bWJlcn0gZXJyb3IgY29kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBFeGVjQ29tbWFuZE9wdGlvbnMpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCBvcHQ6IEV4ZWNDb21tYW5kT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgICAgIHN0ZGlvOiBcImluaGVyaXRcIixcclxuICAgICAgICAgICAgc3Bpbm5lcjogeyBmb3JtYXQ6IFwiJXNcIiB9LFxyXG4gICAgICAgICAgICBzdGRvdXQ6IChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHsgLyogbm9vcCAqLyB9LFxyXG4gICAgICAgICAgICBzdGRlcnI6IChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHsgLyogbm9vcCAqLyB9LFxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB3aGljaChjb21tYW5kLCAoZXJyb3IsIHJlc29sdmVkQ29tbWFuZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBvcHQuc3Bpbm5lciA/IGdldFNwaW5uZXIob3B0LnNwaW5uZXIuZm9ybWF0LCBvcHQuc3Bpbm5lci5pbmRleCkgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHNwYXduKHJlc29sdmVkQ29tbWFuZCwgYXJncywgb3B0KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgaGFuZGxlRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKFwicGlwZVwiID09PSBvcHQuc3RkaW8pIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHQuc3Rkb3V0KGRhdGEudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHQuc3RkZXJyKGRhdGEudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zXHJcbiAqIEBicmllZiBjb3B5VHBsKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBkZWxpbWl0ZXJzPzogXCJ7eyB9fVwiIHwgXCI8JSAlPlwiOyAvLyB0ZW1wbGF0ZSDjgavkvb/nlKjjgZnjgosgZGVsaW1pdGVyLiBkZWZhdWx0OiBcInt7IH19XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGVtcGxhdGUgd2l0aCBob2dhbi5cclxuICogc3luYyBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBzcmMgICAgICAgc291cmNlIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgZHN0ICAgICAgIGRlc3RpbmF0aW9uIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgICAgcGFyYW1zICAgIHRlbXBsYXRlIHBhcmFtZXRlcnMuXHJcbiAqIEBwYXJhbSB7Q29weVRlbXBsYXRlT3B0aW9uc30gIFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5VHBsKHNyYzogc3RyaW5nLCBkc3Q6IHN0cmluZywgcGFyYW1zOiBPYmplY3QsIG9wdGlvbnM/OiBDb3B5VGVtcGxhdGVPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHQgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKHNyYykudG9TdHJpbmcoKSwgeyBlb2w6IFwiXFxuXCIsIGJvbTogZmFsc2UgfSksIG9wdCk7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBub3JtYWxpemVUZXh0KGpzdC5yZW5kZXIocGFyYW1zKSwgb3B0KTtcclxuXHJcbiAgICBmcy5lbnN1cmVGaWxlU3luYyhkc3QpO1xyXG4gICAgZnMud3JpdGVGaWxlU3luYyhkc3QsIG91dHB1dCwgXCJ1dGY4XCIpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdVSUQgZ2VuZXJhdGUuXHJcbiAqIHJldHVybmVkIGFzIFdpbmRvd3MgcmVnaXN0cnkgdHlwZSBmb3JtYXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHVUlEKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJ7XCIgKyB1dWlkLnY0KCkudG9VcHBlckNhc2UoKSArIFwifVwiO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIHN0ciAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEByZXR1cm5zIFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyMlhtbE5vZGUoc3RyOiBzdHJpbmcpOiBKUXVlcnkge1xyXG4gICAgbGV0IGZ1bGxYTUwgPSB0cnVlO1xyXG4gICAgaWYgKCEvPD94bWwvaS50ZXN0KHN0cikpIHtcclxuICAgICAgICBmdWxsWE1MID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCAkeG1sID0gJCgkLnBhcnNlWE1MKHN0cikpO1xyXG4gICAgcmV0dXJuIGZ1bGxYTUwgPyAkeG1sIDogJHhtbC5jaGlsZHJlbigpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBzdHJpbmcgZnJvbSBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJuIHtqUXVlcnl9IFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24geG1sTm9kZTJTdHIoJHhtbDogSlF1ZXJ5KTogc3RyaW5nIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICByZXR1cm4gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZygkeG1sWzBdKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9uc1xyXG4gKiBAYnJpZWYgZm9ybWF0WE1MKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBzdGVwPzogbnVtYmVyOyAgIC8vIOepuueZveOCueODmuODvOOCueaVsC4gZGVmYXVsdDogMlxyXG59XHJcblxyXG4vKipcclxuICogWE1MIGZvcm1hdHRlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgc3RyICAgICAgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcGFyYW0gIHtGb3JtYXRYbWxPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIFhNTFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFhNTChzdHI6IHN0cmluZywgb3B0aW9ucz86IEZvcm1hdFhtbE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBGb3JtYXRYbWxPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgc3RlcDogMixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgbGV0IHhtbCA9IFwiXCI7XHJcbiAgICBsZXQgcGFkID0gMDtcclxuICAgIGxldCBpbmRlbnQ6IG51bWJlcjtcclxuICAgIGxldCBub2RlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3Qgc3RyQXJyID0gbm9ybWFsaXplVGV4dChzdHIsIHsgZW9sOiBcIlxcblwiIH0pXHJcbiAgICAgICAgLnJlcGxhY2UoLyg+KSg8KShcXC8qKS9nLCBcIiQxXFxuJDIkM1wiKSAvLyBpbnNlcnQgTEYgdG8gZWFjaCBub2RlIG9uY2UuXHJcbiAgICAgICAgLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IHNwYWNlcyA9IChsZW46IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICBjb25zdCBfaW5kZW50ID0gbGVuICogb3B0LnN0ZXA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICBub2RlID0gJC50cmltKHN0ckFycltpXSk7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0Y2goLy4rPFxcL1xcd1tePl0qPiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXC9cXHcvKSkge1xyXG4gICAgICAgICAgICBpZiAocGFkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGFkIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFx3W14+XSpbXi9dPi4qJC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgeG1sICs9IHNwYWNlcyhwYWQpICsgbm9kZSArIFwiXFxuXCI7XHJcbiAgICAgICAgcGFkICs9IGluZGVudDtcclxuICAgIH1cclxuXHJcbiAgICB4bWwgPSB4bWxcclxuICAgICAgICAucmVwbGFjZSgvXFxuXFxuL2dtLCBcIlxcblwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9eICtcXG4vZ20sIFwiXCIpXHJcbiAgICAgICAgO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVUZXh0KHhtbCwgb3B0KTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3Rvb2xzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcIi4uL3V0aWxzL3NldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTGlicmFyeSB9IGZyb20gXCIuL2xpYnJhcnlcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTW9iaWxlIH0gZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvckRlc2t0b3AgfSBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvcldlYiB9IGZyb20gXCIuL3dlYlwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vYmFzZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWJyYXJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21vYmlsZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3dlYlwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3IoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgc3dpdGNoIChjb25maWcucHJvamVjdFR5cGUpIHtcclxuICAgICAgICBjYXNlIFwibGlicmFyeVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJtb2JpbGVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJkZXNrdG9wXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JEZXNrdG9wKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIndlYlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZyk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBcInVuc3VwcG9ydGVkIHByb2plY3Qga2luZDogXCIgKyBjb25maWcucHJvamVjdFR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL2dlbmVyYXRvcnMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44K944O844K544OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzY3JpcHQ/OiBzdHJpbmc7ICAgICAgICAgICAgLy8ganModHMpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgc3R5bGVzaGVldD86IHN0cmluZzsgICAgICAgIC8vIGNzcyhjc3MpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7ICAgICAgICAgIC8vIGh0bWwodGVtcGxhdGUpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHNyYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K944O844K544Kz44O844OJ44Gu44Or44O844OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBwa2c/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkeODg+OCseODvOOCuOWFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgYnVpbHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg7Pjg5HjgqTjg6vlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGRvYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0YXNrPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCueOCr+ODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVzdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4bjgrnjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHR5cGVzPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDlnovlrprnvqnjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRlbXA/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBzcmNDb25maWc/OiBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb247ICAgIC8vIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gICAgbGliPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRlcm5hbCBsaWJyYXJ5IG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGV4dGVybmFsPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgbW9kdWxlIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcG9ydGluZz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3J0aW5nIG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHJlcz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oq44K944O844K544OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElEZXBlbmRlbmN5XHJcbiAqIEBicmllZiBwYWNrYWdlLmpzb24g44Gr5oyH5a6a44GZ44KLIGRlcGVuZGVuY2llcyDmg4XloLHjgpLmoLzntI3jgZnjgovjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3kge1xyXG4gICAgbmFtZTogc3RyaW5nOyAgICAgICAgICAgLy8gbW9kdWxlIG5hbWUgZXgpIFwidHlwZXNjcmlwdFwiXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nOyAgICAgICAvLyDmjIflrprjg5Djg7zjgrjjg6fjg7MuIOeEoeaMh+WumuOBruWgtOWQiOOBr+acgOaWsOODkOODvOOCuOODp+ODs1xyXG4gICAgZXM/OiBzdHJpbmdbXTsgICAgICAgICAgLy8g5oyH5a6a44GV44KM44GfIEVTIHZlcnNpb24g44Gu44Go44GN44Gu44G/5pyJ5Yq544Gr44GZ44KLXHJcbiAgICBnbG9iYWxFeHBvcnQ/OiBzdHJpbmc7ICAvLyBnbG9iYWwgZXhwb3J0IOOCkuW/heimgeOBqOOBmeOCi+OCguOBruOBryBnbG9iYWwgT2JqZWN0IOWQjeOCkuaMh+WumlxyXG4gICAgYWxpYXM/OiBzdHJpbmc7ICAgICAgICAgLy8gYWxpYXMg44KS6Kit5a6a44GZ44KL5aC05ZCI44Gr5oyH5a6aXHJcbiAgICB2ZW5kZXJOYW1lPzogc3RyaW5nOyAgICAvLyB2ZW5kZXIg5ZCN44KS6Kit5a6a44GZ44KL5aC05ZCI44Gr5oyH5a6aXHJcbiAgICBmaWxlTmFtZT86IHN0cmluZzsgICAgICAvLyBmaWxlIOWQjeOCkuioreWumuOBmeOCi+WgtOWQiOOBq+aMh+WumlxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJUHJvamVjdENvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI5YWx6YCa44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3ROYW1lOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOWQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIHByb2plY3RUeXBlOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOeorumhniBleCkgXCJsaWJyYXJ5XCJcclxuICAgIGFjdGlvbjogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4KSBcImNyZWF0ZVwiXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5Djg7zjgrjjg6fjg7MgZXgpIFwiMS4wLjBcIlxyXG4gICAgbGljZW5zZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Op44Kk44K744Oz44K5IGV4KSBcIkFwYWNoZS0yLjBcIlxyXG4gICAgcHJpdmF0ZT86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpdmF0ZSDjg5Hjg4PjgrHjg7zjgrjjga7loLTlkIggdHJ1ZVxyXG4gICAgc2V0dGluZ3M6IFV0aWxzLklHbG9iYWxTZXR0aW5nczsgICAgICAgICAgICAgICAgLy8g44Ot44Kw44Kq44OX44K344On44OzXHJcbiAgICBtb2R1bGVOYW1lPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnQg44Gr5oyH5a6a44GZ44KLIOODouOCuOODpeODvOODq+WQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIG1haW5CYXNlTmFtZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODoeOCpOODs+ODleOCoeOCpOODq+WQjSBleCkgXCJjZHAtbGliXCIgLyBcImluZGV4XCJcclxuICAgIG5hbWVzcGFjZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODq+ODvOODiOWQjeWJjeepuumWk1xyXG4gICAgc3RydWN0dXJlQ29uZmlnPzogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb247ICAgLy8gSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb25cclxuICAgIGNvcHlyaWdodD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCs+ODlOODvOODqeOCpOODiOaWh+Wtl+WIlyBleCkgXCJDb3B5cmlnaHQgKGMpIDIwMTcgU29ueSBDb3Jwb3JhdGlvblwiXHJcbiAgICBkZXZEZXBlbmRlbmNpZXM/OiBJRGVwZW5kZW5jeVtdOyAgICAgICAgICAgICAgICAvLyDplovnmbrnlKjkvp3lrZjjg6Ljgrjjg6Xjg7zjg6vmg4XloLFcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5Pjg6vjg4njgr/jg7zjgrLjg4Pjg4jjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uIHtcclxuICAgIGVzPzogXCJlczVcIiB8IFwiZXMyMDE1XCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlU2NyaXB0IOOBriB0cmFuc3BpbGUgdGFyZ2V0XHJcbiAgICBtb2R1bGU/OiBcIm5vbmVcIiB8IFwiY29tbW9uanNcIiB8IFwiYW1kXCIgfCBcInVtZFwiOyAgICAgICAgICAgICAgIC8vIEphdmFTY3JpcHQgbW9kdWxlIHN5c3RlbVxyXG4gICAgZW52PzogXCJ3ZWJcIiB8IFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIHwgXCJlbGVjdHJvbi1yZW5kZXJlclwiOyAgICAvLyDlrp/ooYznkrDlooPjga4gdGFyZ2V0XHJcbiAgICBub2RlanM/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcIm5vZGVcIiB8IFwiZWxlY3Ryb25cIiDjga7loLTlkIjjgasgdHJ1ZVxyXG4gICAgbWluaWZ5PzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oq44Oq44O844K55pmC44GrIG1pbmlmeSDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgLy8gYnVpbGQgdG9vbFxyXG4gICAgdG9vbHM/OiBzdHJpbmdbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pei5a6a44GuIGJ1aWxkIHRvb2wgZXgpIFtcIndlYnBhY2tcIl1cclxuICAgIG91dHB1dFNhbWVEaXI/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNyYyDjgaggYnVpbHQg44GM5ZCM44GY44OH44Kj44Os44Kv44OI44Oq44Gr44Gq44KL5aC05ZCIIHRydWVcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVdlYnBhY2tDb25maWdyYXRpb25cclxuICogQGJyaWVmIFdlYnBhY2sg55So44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElXZWJwYWNrQ29uZmlncmF0aW9uIHtcclxuICAgIG5vZGVqczogYm9vbGVhbjsgICAgLy8gXCJub2RlXCIgfCBcImVsZWN0cm9uXCIg44Gu5aC05ZCI44GrIHRydWVcclxuICAgIGd1aWRlOiBib29sZWFuOyAgICAgLy8gZ3VpZGUg44Kz44Oh44Oz44OI44KS5LuY5Yqg44GZ44KL5aC05ZCI44GvIHRydWUg44KS5oyH5a6aXHJcbiAgICB0YXNrUGF0aDogc3RyaW5nOyAgIC8vICd0YXNrJyDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgVmlzdWFsIFN0dWRpbyDnlKjjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbiBleHRlbmRzIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3ROYW1lOiBzdHJpbmc7ICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBwcm9qZWN0R1VJRDogc3RyaW5nOyAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OIIEdVSUQgZXgpIHs1MUI0MTM1OS04RDJDLTQyREYtODQxNC1FODVCMDI5OTMyMzh9XHJcbiAgICBtYWluQmFzZU5hbWU6IHN0cmluZzsgICAgICAgLy8g44Oh44Kk44Oz44OV44Kh44Kk44Or5ZCNIGV4KSBcImNkcC1saWJcIiAvIGluZGV4XHJcbiAgICBsaWNlbnNlOiBib29sZWFuOyAgICAgICAgICAgLy8gTElDRU5TRSDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgd2VicGFjazogYm9vbGVhbjsgICAgICAgICAgIC8vIHdlYnBhY2suY29uZmlnLmpzIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICB0ZXN0ZW06IGJvb2xlYW47ICAgICAgICAgICAgLy8gdGVzdGVtIHJ1bm5lciDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgb3V0cHV0U2FtZURpcjogYm9vbGVhbjsgICAgIC8vIHNyYyDjgaggYnVpbHQg44GM5ZCM44GY44OH44Kj44Os44Kv44OI44Oq44Gr44Gq44KL5aC05ZCIIHRydWVcclxuICAgIHRzR3JvdXA6IHtcclxuICAgICAgICByZWxhdGl2ZVBhdGg6IHN0cmluZzsgICAvLyBcImhvZ2Vob2dlXFxcIlxyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmc7ICAgICAgIC8vIFwiY2RwLWxpYlwiXHJcbiAgICAgICAgZGVwZW5kZWU6IGJvb2xlYW47ICAgICAgLy8g5L6d5a2Y5YWI44KS6L+95Yqg44GZ44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtYXA6IGJvb2xlYW47ICAgICAgICAgICAvLyAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICB9W107XHJcbiAgICBqc0dyb3VwOiB7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmc7ICAgLy8gXCJob2dlaG9nZVxcXCJcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nOyAgICAgICAvLyBcImNkcC1saWJcIlxyXG4gICAgICAgIGRlcGVuZGVlOiBib29sZWFuOyAgICAgIC8vIOS+neWtmOWFiOOCkui/veWKoOOBmeOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgZF90czogYm9vbGVhbjsgICAgICAgICAgLy8gLmQudHMg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtYXA6IGJvb2xlYW47ICAgICAgICAgICAvLyAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWluX21hcDogYm9vbGVhbjsgICAgICAgLy8gLm1pbiAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICB9W107XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW50ZXJmYWNlcy50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGNoYWxrLFxyXG4gICAgXyxcclxuICAgICQsXHJcbiAgICAvLy8vXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIGdldFNwaW5uZXIsXHJcbiAgICBnZXRUYXJnZXREaXIsXHJcbiAgICB0ZW1wbGF0ZVBhdGgsXHJcbiAgICBjb3B5VHBsLFxyXG4gICAgbG9nLFxyXG4gICAgZGVidWcsXHJcbiAgICB0cmFuc2xhdGUsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSVdlYnBhY2tDb25maWdyYXRpb24sXHJcbn0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCYXNlXHJcbiAqIEBicmllZiDjgZnjgbnjgabjga4gR2VuZXJhdG9yIOOBruaXouWumuOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3Byb2plY3RSb290RGlyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVByb2plY3RDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdFJvb3REaXIgPSBnZXRUYXJnZXREaXIoKSA/XHJcbiAgICAgICAgICAgIGdldFRhcmdldERpcigpIDpcclxuICAgICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QmFzZVN0cnVjdHVyZSgpLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaXZhdGUgPSBcIk5PTkVcIiA9PT0gdGhpcy5fY29uZmlnLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykub3V0cHV0U2FtZURpclxyXG4gICAgICAgICAgICA9IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjID09PSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0O1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm5vZGVqcyA9ICgoZW52OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnYpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJub2RlXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWxlY3Ryb25cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5lbnYpO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9jb25maWcsIG51bGwsIDQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHpueQhumWi+WniyAo44Ko44Oz44OI44OqKVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImNyZWF0ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmtub3duIGFjdGlvbjogXCIgKyB0aGlzLl9jb25maWcuYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGFic3RyYWN0IG1ldGhvZHM6XHJcblxyXG4gICAgLy8g5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgIGFic3RyYWN0IGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uO1xyXG5cclxuICAgIC8vIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8g5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICBhYnN0cmFjdCBnZXQgdGFza0xpc3QoKTogc3RyaW5nW107XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCy5o2X44OG44Kt44K544OI44KS6YCa55+lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSDjg63jg7zjgqvjg6njgqTjgrrjg6rjgr3jg7zjgrnjgq3jg7zjgpLmjIflrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2dyZXNzKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9nKGNoYWxrLmN5YW4odHJhbnNsYXRlKGtleSkpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOitpuWRiuODhuOCreOCueODiOOCkumAmuefpVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBrZXkg44Ot44O844Kr44Op44Kk44K644Oq44K944O844K544Kt44O844KS5oyH5a6aXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCB3YXJuKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9nKGNoYWxrLnllbGxvdyh0cmFuc2xhdGUoa2V5KSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogd29yayBkaXJlY3Rvcnkg44Gu5aSJ5pu0XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGRpcmVjdG9yeSB0YXJnZXQgZGlyZWN0b3J5LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgY2hkaXIoZGlyZWN0b3J5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBwcm9jZXNzLmNoZGlyKGRpcmVjdG9yeSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwcm9qZWN0IHJvb3QgZGlyZWN0b3J5IOOBruWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkaXJlY3RvcnkgdGFyZ2V0IGRpcmVjdG9yeS5cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCByb290RGlyKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2plY3RSb290RGlyO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdGVtcGxhdGUgZGlyZWN0b3J5IOOCkuaMh+WumuOBl+OBpumFjeS4i+OBruODleOCoeOCpOODq+OCkuOCs+ODlOODvFxyXG4gICAgICogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24g44Gu6Kit5a6a44GM5Y+N5pig44GV44KM44KLXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldCAg44K/44O844Ky44OD44OI44KS5oyH5a6aLiBudWxsIOOBruWgtOWQiOOBr+OAgXRlbXBsYXRlcyDjgpLov5TljbRcclxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkc3RSb290IOOCs+ODlOODvOWFiOOCkuaMh+Wumi4g5oyH5a6a44GM54Sh44GE5aC05ZCI44GvIHJvb3REaXIg44GM6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjb3B5VHBsRGlyKHRhcmdldDogc3RyaW5nLCBkc3RSb290Pzogc3RyaW5nLCBvcHRpb25zPzogZ2xvYi5JT3B0aW9ucyk6IHZvaWQge1xyXG4gICAgICAgIGRzdFJvb3QgPSBkc3RSb290IHx8IHRoaXMucm9vdERpcjtcclxuICAgICAgICBvcHRpb25zID0gJC5leHRlbmQoe1xyXG4gICAgICAgICAgICBjd2Q6IHRlbXBsYXRlUGF0aCh0YXJnZXQpLFxyXG4gICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICAgICAgZG90OiB0cnVlLFxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICBnbG9iLnN5bmMoXCIqKlwiLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHN0ID0gcGF0aC5qb2luKGRzdFJvb3QsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvc3JjLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvcGtnLywgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcucGtnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvYnVpbHQvLCAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9kb2MvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5kb2MpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90YXNrLywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGVzdC8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3R5cGVzLywgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnR5cGVzKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdGVtcFxcLy8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVtcCArIFwiL1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvbGliLywgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmxpYiB8fCBcImxpYlwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvZXh0ZXJuYWwvLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsIHx8IFwiZXh0ZXJuYWxcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3BvcnRpbmcvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nIHx8IFwicG9ydGluZ1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvcmVzLywgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnJlcyB8fCBcInJlc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC9zY3JpcHQvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICh0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQgfHwgXCJzY3JpcHRzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcInNjcmlwdHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL3N0eWxlc2hlZXQvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICh0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zdHlsZXNoZWV0IHx8IFwic3R5bGVzaGVldHNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwic3R5bGVzaGVldHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL3RlbXBsYXRlLyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAodGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcudGVtcGxhdGUgfHwgXCJ0ZW1wbGF0ZXNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwidGVtcGxhdGVzXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKHBhdGguam9pbih0ZW1wbGF0ZVBhdGgodGFyZ2V0KSwgZmlsZSksIGRzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBub2RlIG1vZHVsZSDjga4gdmVyc2lvbiDlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1Byb21pc2U8c3RyaW5nPn0gdmVyc2lvbiB0ZXh0XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeU5vZGVNb2R1bGVMYXRlc3RWZXJzaW9uKG5hbWU6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHZlcnNpb246IHN0cmluZztcclxuICAgICAgICAgICAgZXhlY0NvbW1hbmQoXCJucG1cIiwgW1wiaW5mb1wiLCBuYW1lLCBcInZlcnNpb25cIl0sIHtcclxuICAgICAgICAgICAgICAgIHN0ZGlvOiBcInBpcGVcIixcclxuICAgICAgICAgICAgICAgIHNwaW5uZXI6IG51bGwsXHJcbiAgICAgICAgICAgICAgICBzdGRvdXQ6IChkYXRhOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gXy50cmltKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHZlcnNpb24pO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgocmVhc29uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlYXNvbik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBrumWi+eZuuaZguOBruS+neWtmOODouOCuOODpeODvOODq+ODquOCueODiOOBruWPluW+l1xyXG4gICAgICog5b+F6KaB44Gr5b+c44GY44Gm44Kq44O844OQ44O844Op44Kk44OJXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7SURlcGVuZGVuY3l9XHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBnZXQgZGVmYXVsdERldkRlcGVuZGVuY2llcygpOiBJRGVwZW5kZW5jeVtdIHtcclxuICAgICAgICBjb25zdCBiYXNlID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6IFwiY29udmVydC1zb3VyY2UtbWFwXCIsICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZGVsXCIsICAgICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiZXNsaW50XCIsICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwibnBtLXJ1bi1hbGxcIiwgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwicGxhdG9cIiwgICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwic291cmNlLW1hcFwiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHNsaW50XCIsICAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHlwZWRvY1wiLCAgICAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidHlwZXNjcmlwdFwiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgY29uc3QgbWluaWZ5ID0gW1xyXG4gICAgICAgICAgICB7IG5hbWU6IFwidWdsaWZ5LWpzXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgZXM6IFtcImVzNVwiXSwgICAgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcInVnbGlmeS1lc1wiLCAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIGVzOiBbXCJlczIwMTVcIl0sIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgbGV0IGV4dHJhID0gW107XHJcbiAgICAgICAgaWYgKCg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykubWluaWZ5KSB7XHJcbiAgICAgICAgICAgIGV4dHJhID0gZXh0cmEuY29uY2F0KG1pbmlmeSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcIndlYnBhY2tcIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwid2VicGFja1wiLCAgICAgICAgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwic291cmNlLW1hcC1sb2FkZXJcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwibnljXCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcIm55Y1wiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ0ZXN0ZW1cIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwidGVzdGVtXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcInBoYW50b21qcy1wcmVidWlsdFwiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJwaGFudG9tanMtcHJlYnVpbHRcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShiYXNlLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGRlcGVuZGVuY2llcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtJRGVwZW5kZW5jeVtdfSBkZXBlbmRlbmNpZXMg5L6d5a2Y6Zai5L+C44Oq44K544OIXHJcbiAgICAgKiBAcmV0dXJuIHt7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbjsgfVtdfSDjg4bjg7Pjg5fjg6zjg7zjg4jjg5Hjg6njg6Hjg7zjgr/jgavmjIflrprjgZnjgovphY3liJdcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGFzeW5jIHF1ZXJ5RGVwZW5kZW5jaWVzUGFyYW0oZGVwZW5kZW5jaWVzOiBJRGVwZW5kZW5jeVtdKTogUHJvbWlzZTx7IG5hbWU6IHN0cmluZzsgdmVyc2lvbjogc3RyaW5nOyBsYXN0PzogYm9vbGVhbiB9W10+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwiYmFzZS5jcmVhdGUucXVlcnlWZXJzaW9uXCIpO1xyXG5cclxuICAgICAgICBjb25zdCBkZXBlbmRzID0gPHsgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuOyB9W10+ZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gZGVwZW5kLmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhIWRlcGVuZC5lcy5maW5kKChlc1ZlcnNpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykuZXMgPT09IGVzVmVyc2lvbjtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRlYnVnKEpTT04uc3RyaW5naWZ5KGRlcGVuZHMsIG51bGwsIDQpKTtcclxuXHJcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3MgPSAoY29udGV4dDogYW55KTogYW55ID0+IHtcclxuICAgICAgICAgICAgaWYgKFwic3RyaW5nXCIgPT09IHR5cGVvZiBjb250ZXh0ICYmICF0aGlzLl9jb25maWcuc2V0dGluZ3Muc2lsZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcGlubmVyID0gZ2V0U3Bpbm5lcihjaGFsay55ZWxsb3coY29udGV4dCksIDUpO1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwaW5uZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBkZXBlbmRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobnVsbCA9PSBkZXBlbmRzW2ldLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBwcm9ncmVzcyhkZXBlbmRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS52ZXJzaW9uID0gXCJeXCIgKyBhd2FpdCB0aGlzLnF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24oZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzKHNwaW5uZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09PSBuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS5sYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3ZWJwYWNrLmNvbmZpZy5qcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxpYnJhcnlUYXJnZXQg44Gr5oyH5a6a44GZ44KL5paH5a2X5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeVdlYnBhY2tMaWJyYXJ5VGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICgoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1vZHVsZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1vbmpzMlwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiYW1kXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhbWRcIjtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW1kXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVzbGludHJjIOOBriBlbnYg44Gr5oyH5a6a44GZ44KLIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBlbnYg44Gr5oyH5a6a44GZ44KL44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeUVzTGludEVudlBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgY29tcGlsZVNldHRpbmcgPSA8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlczY6IFwiZXM1XCIgIT09IGNvbXBpbGVTZXR0aW5nLmVzLFxyXG4gICAgICAgICAgICBub2RlOiBcIndlYlwiICE9PSBjb21waWxlU2V0dGluZy5lbnYsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbi50b29scyDjg5fjg63jg5Hjg4bjgqPjga7mjIflrprnirbms4HjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lIOODhOODvOODq+WQjeOCkuaMh+WumlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZTog5oyH5a6a44GV44KM44Gm44GE44KLIC8gZmFsc2U6IOaMh+WumuOBleOCjOOBpuOBhOOBquOBhFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbmFibGVUb29sKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykudG9vbHMuZmluZCgodG9vbCkgPT4gbmFtZSA9PT0gdG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSDlh6bnkIbjga7jgqjjg7Pjg4jjg6pcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBydW5DcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVCYXNlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa44GuIGNyZWF0ZSDlh6bnkIZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVCYXNlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJiYXNlLmNyZWF0ZS5mb3VuZGF0aW9uXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdERpcigpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weUJhc2VTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlDb21tb25GaWxlcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weVRhc2tTY3JpcHRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4jjg4fjgqPjg6zjgq/jg4jjg6rjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9qZWN0RGlyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMucm9vdERpcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IodHJhbnNsYXRlKFwiYmFzZS5jcmVhdGUuZXJyb3IuYWxyZWFkeUV4aXN0XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMubWtkaXJzU3luYyh0aGlzLnJvb3REaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weUJhc2VTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwiYmFzZS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln7rmnKzjg5XjgqHjgqTjg6vjga7jgrPjg5Tjg7xcclxuICAgICAqIHRlbXBsYXRlIOOBruOCs+ODlOODvOOCguihjOOBhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlDb21tb25GaWxlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHRoaXMucm9vdERpcjtcclxuXHJcbiAgICAgICAgLy8gLm5wbWlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX25wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCIubnBtaWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQkFOTkVSXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0JBTk5FUlwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJCQU5ORVJcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gTElDRU5TRVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZmlnLmxpY2Vuc2UpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkFwYWNoZS0yLjBcIjpcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuQXBhY2hlLTIuMFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIkxJQ0VOU0VcIiksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNSVRcIjpcclxuICAgICAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTElDRU5TRS5NSVRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jb3B5cmlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTk9USUNFXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX05PVElDRVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJOT1RJQ0VcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gYnVpbGQgdG9vbHM6IHdlYnBhY2tcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJV2VicGFja0NvbmZpZ3JhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIG5vZGVqczogKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMsXHJcbiAgICAgICAgICAgICAgICBndWlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRhc2tQYXRoOiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRhc2ssXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcInRvb2xzL3dlYnBhY2svX3dlYnBhY2suY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJ3ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRhc2sgc2NyaXB0IOOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlUYXNrU2NyaXB0cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Rhc2tcIik7XHJcbiAgICAgICAgY29uc3QgZHN0RGlyID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgdGFzayksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCB0YXNrKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyJdfQ==