/*!
 * cdp-lib.js 0.1.1
 *
 * Date: 2017-10-27T09:08:49.185Z
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
            { name: "@cdp/mobile", version: undefined, },
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGFmNWZmYmE4YWZhNmJjMzE1NGUiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicGF0aFwiIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9iYXNlL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi91dGlscy9saWJzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcIm9zXCIiLCJjZHA6Ly8vY2RwLWxpYi91dGlscy9zZXR0aW5ncy50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvbGlicmFyeS9nZW5lcmF0b3ItbW9kdWxlLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9tb2JpbGUvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL21vYmlsZS9nZW5lcmF0b3ItY29yZG92YS50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvZGVza3RvcC9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvZGVza3RvcC9nZW5lcmF0b3ItZWxlY3Rvcm9uLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy93ZWIvaW5kZXgudHMiLCJjZHA6Ly8vY2RwLWxpYi9nZW5lcmF0b3JzL3dlYi9nZW5lcmF0b3ItYnJvd3Nlci50cyIsImNkcDovLy9jZHAtbGliL2NkcC1saWIudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImdsb2JcIixcImNvbW1vbmpzMlwiOlwiZ2xvYlwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiSG9nYW5cIixcImNvbW1vbmpzXCI6XCJob2dhbi5qc1wiLFwiY29tbW9uanMyXCI6XCJob2dhbi5qc1wiLFwiYW1kXCI6XCJob2dhbi5qc1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wiLFwiY29tbW9uanMyXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJzZW12ZXItcmVnZXhcIixcImNvbW1vbmpzMlwiOlwic2VtdmVyLXJlZ2V4XCJ9Iiwid2VicGFjazovLy9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiY2xpLXNwaW5uZXJcIixcImNvbW1vbmpzMlwiOlwiY2xpLXNwaW5uZXJcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJqc2RvbVwiLFwiY29tbW9uanMyXCI6XCJqc2RvbVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9IiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvdG9vbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9pbmRleC50cyIsImNkcDovLy9jZHAtbGliL2dlbmVyYXRvcnMvYmFzZS9pbnRlcmZhY2VzLnRzIiwiY2RwOi8vL2NkcC1saWIvZ2VuZXJhdG9ycy9iYXNlL2dlbmVyYXRvci1iYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REEsaUM7Ozs7Ozs7Ozs7OztBQ0FBLGtDQUE2QjtBQUM3QixrQ0FBaUM7Ozs7Ozs7Ozs7Ozs7QUNEakMsaUNBQXVCO0FBQ3ZCLGtDQUF3QjtBQUN4QixpQ0FBMkI7Ozs7Ozs7Ozs7QUNGM0IsbUNBQStCO0FBeUMzQixnQkFBRTtBQXhDTixxQ0FBNkI7QUF5Q3pCLG9CQUFJO0FBeENSLHNDQUFrQztBQXlDOUIsc0JBQUs7QUF4Q1QsbUNBQTZCO0FBQzdCLG1DQUF3QztBQUN4QyxzQ0FBK0I7QUF5QzNCLHNCQUFLO0FBeENULHFDQUE2QjtBQXlDekIsb0JBQUk7QUF4Q1Isc0NBQStCO0FBeUMzQixzQkFBSztBQXhDVCw0Q0FBNEM7QUF5Q3hDLGtDQUFXO0FBeENmLDhDQUFzQztBQXlDbEMsa0JBekNLLHFCQUFP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WCxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSTthQUM5QyxDQUFDO1lBQ0YsZUFBTyxDQUNILElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLGtDQUFrQyxDQUFDLEVBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLG1CQUFtQixDQUFDLEVBQ3RDLEtBQUssRUFDTCxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FDMUIsQ0FBQztRQUNOLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxlQUFlO1FBQ25CLE1BQU0sTUFBTSxHQUFHLG9CQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDekMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTFFLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDM0IsVUFBRSxDQUFDLFFBQVEsQ0FDUCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQzFCLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQTNhRCxzQ0EyYUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGFmNWZmYmE4YWZhNmJjMzE1NGUiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwicGF0aFwiXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vZ2VuZXJhdG9yLWJhc2VcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW5kZXgudHMiLCJleHBvcnQgKiBmcm9tIFwiLi9saWJzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Rvb2xzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBmcyBmcm9tIFwiZnMtZXh0cmFcIjtcclxuaW1wb3J0ICogYXMgZ2xvYiBmcm9tIFwiZ2xvYlwiO1xyXG5pbXBvcnQgKiBhcyBob2dhbiBmcm9tIFwiaG9nYW4uanNcIjtcclxuaW1wb3J0ICogYXMgX2wgZnJvbSBcImxvZGFzaFwiO1xyXG5pbXBvcnQgKiBhcyBfcyBmcm9tIFwidW5kZXJzY29yZS5zdHJpbmdcIjtcclxuaW1wb3J0ICogYXMgd2hpY2ggZnJvbSBcIndoaWNoXCI7XHJcbmltcG9ydCAqIGFzIHV1aWQgZnJvbSBcInV1aWRcIjtcclxuaW1wb3J0ICogYXMgY2hhbGsgZnJvbSBcImNoYWxrXCI7XHJcbmltcG9ydCAqIGFzIHNlbXZlclJlZ2V4IGZyb20gXCJzZW12ZXItcmVnZXhcIjtcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJjbGktc3Bpbm5lclwiO1xyXG5cclxuY29uc3QgJDogSlF1ZXJ5U3RhdGljID0gKCgpID0+IHtcclxuICAgIGNvbnN0IF93aW5kb3cgPSAoKCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGpzZG9tID0gcmVxdWlyZShcImpzZG9tXCIpO1xyXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBqc2RvbS5KU0RPTSkgeyAgICAvLyB2MTArXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcganNkb20uSlNET00oKS53aW5kb3c7XHJcbiAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB2OS4xMi54XHJcbiAgICAgICAgICAgIHJldHVybiBqc2RvbS5qc2RvbSgpLmRlZmF1bHRWaWV3O1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgLy8gcGF0Y2ggc2NvcGU6XHJcbiAgICAoKHJvb3Q6IGFueSkgPT4ge1xyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICoganNkb20gOS40LjAgLSA5LjEyLjAg44Gr5a6f6KOF44GV44KM44Gm44GE44KLIERPTVBhcnNlciDjga8gWE1MIOOBriBzZXJpYWxpemUg44GM44Gn44GN44Gq44GE44Gf44KBLFxyXG4gICAgICAgICAqIHhtbGRvbSDjgavnva7jgY3mj5vjgYjjgotcclxuICAgICAgICAgKiBqc2RvbSAxMC4xLjAg44G+44Gn5YuV44GL44Gq44GE44GT44Go44KS56K66KqNXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgY29uc3QgeG1sZG9tID0gcmVxdWlyZShcInhtbGRvbVwiKTtcclxuICAgICAgICByb290LkRPTVBhcnNlciA9IHhtbGRvbS5ET01QYXJzZXI7XHJcbiAgICAgICAgLy8geG1sZG9tIOOBq+OBryBkb20udG9TdHJpbmcoKSDjgYzlrp/oo4XjgZXjgozjgabjgYTjgovjgYzjgIFnbG9iYWwg44Gr44KCIGV4cG9ydCDjgZnjgotcclxuICAgICAgICAoPGFueT5nbG9iYWwpLlhNTFNlcmlhbGl6ZXIgPSByb290LlhNTFNlcmlhbGl6ZXIgPSB4bWxkb20uWE1MU2VyaWFsaXplcjtcclxuICAgIH0pKF93aW5kb3cpO1xyXG5cclxuICAgIHJldHVybiByZXF1aXJlKFwianF1ZXJ5XCIpKF93aW5kb3cpO1xyXG59KSgpO1xyXG5cclxuZXhwb3J0IHR5cGUgTWl4aW5lZFVuZGVyc2NvcmVTdGF0aWMgPSB0eXBlb2YgX3MgJiB0eXBlb2YgX2w7XHJcbmNvbnN0IF9tOiBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IDxhbnk+X2wubWl4aW4oPGFueT5fcy5leHBvcnRzKCkpO1xyXG5cclxuZXhwb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIF9tIGFzIF8sXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBjaGFsayxcclxuICAgIHNlbXZlclJlZ2V4LFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwib3NcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJvc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgZnMsICQgfSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJR2xvYmFsU2V0dGluZ3NcclxuICogQGJyaWVmIOOCsOODreODvOODkOODq+ioreWumuOCpOODs+OCv+ODvOODleOCp+OCpOOCuVxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJR2xvYmFsU2V0dGluZ3Mge1xyXG4gICAgZm9yY2U/OiBib29sZWFuOyAgICAgICAgICAgIC8vIOOCqOODqeODvOe2mee2mueUqFxyXG4gICAgdmVyYm9zZT86IGJvb2xlYW47ICAgICAgICAgIC8vIOips+e0sOODreOCsFxyXG4gICAgc2lsZW50PzogYm9vbGVhbjsgICAgICAgICAgIC8vIHNpbGVudCBtb2RlXHJcbiAgICB0YXJnZXREaXI/OiBzdHJpbmc7ICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44OqXHJcbiAgICBsYW5nPzogXCJlbi1VU1wiIHwgXCJqYS1KUFwiO1xyXG59XHJcblxyXG5sZXQgX3NldHRpbmdzOiBJR2xvYmFsU2V0dGluZ3MgPSB7XHJcbiAgICBmb3JjZTogZmFsc2UsXHJcbiAgICB2ZXJib3NlOiBmYWxzZSxcclxuICAgIHNpbGVudDogZmFsc2UsXHJcbiAgICBsYW5nOiBcImVuLVVTXCIsXHJcbn07XHJcblxyXG5sZXQgX2xpYlBhdGg6IHN0cmluZzsgICAvLyBjZHAtbGliIOOBruWtmOWcqOOBl+OBpuOBhOOCiyBwYXRoXHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBleHBvcnRzIG1ldGhvZHM6XHJcblxyXG4vKipcclxuICog6Kit5a6a5Y+W5b6XXHJcbiAqXHJcbiAqIEByZXR1cm5zIG9wdGlvbnMg44Ot44Kw44Gr5L2/55So44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2V0dGluZ3MoKTogSUdsb2JhbFNldHRpbmdzIHtcclxuICAgIHJldHVybiAkLmV4dGVuZCh7fSwgX3NldHRpbmdzKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIOioreWumuaMh+WumlxyXG4gKlxyXG4gKiBAcGFyYW0gb3B0aW9ucyDjg63jgrDjgavkvb/nlKjjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTZXR0aW5ncyhzZXR0aW5nczogSUdsb2JhbFNldHRpbmdzKTogdm9pZCB7XHJcbiAgICBpZiAoc2V0dGluZ3MpIHtcclxuICAgICAgICBfc2V0dGluZ3MuZm9yY2UgICAgID0gc2V0dGluZ3MuZm9yY2UgICAgICAgIHx8IF9zZXR0aW5ncy5mb3JjZTtcclxuICAgICAgICBfc2V0dGluZ3MudmVyYm9zZSAgID0gc2V0dGluZ3MudmVyYm9zZSAgICAgIHx8IF9zZXR0aW5ncy52ZXJib3NlO1xyXG4gICAgICAgIF9zZXR0aW5ncy5zaWxlbnQgICAgPSBzZXR0aW5ncy5zaWxlbnQgICAgICAgfHwgX3NldHRpbmdzLnNpbGVudDtcclxuICAgICAgICBfc2V0dGluZ3MudGFyZ2V0RGlyID0gc2V0dGluZ3MudGFyZ2V0RGlyICAgIHx8IF9zZXR0aW5ncy50YXJnZXREaXI7XHJcbiAgICAgICAgX3NldHRpbmdzLmxhbmcgICAgICA9IHNldHRpbmdzLmxhbmcgICAgICAgICB8fCBfc2V0dGluZ3MubGFuZztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgX3NldHRpbmdzID0ge1xyXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZlcmJvc2U6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaWxlbnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBsYW5nOiBcImVuLVVTXCIsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFwiY2RwLWxpYlwiIOOBjOWtmOWcqOOBmeOCi+ODkeOCueOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJucyBjZHAtbGliIOOBuOOBriBwYXRoXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0TGliUGF0aCgpOiBzdHJpbmcge1xyXG4gICAgaWYgKG51bGwgPT0gX2xpYlBhdGgpIHtcclxuICAgICAgICBjb25zdCBUUllfQ09VTlQgPSAzO1xyXG4gICAgICAgIGxldCB0cmllZCA9IDA7XHJcbiAgICAgICAgX2xpYlBhdGggPSBfX2Rpcm5hbWU7XHJcbiAgICAgICAgd2hpbGUgKHRydWUpIHtcclxuICAgICAgICAgICAgaWYgKFRSWV9DT1VOVCA8PSB0cmllZCkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoXCJsaWIgcGF0aCBpcyBub3QgcmVzb2x2ZWQuXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9saWJQYXRoID0gcGF0aC5qb2luKF9saWJQYXRoLCBcIi4uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjaGVjayA9IHBhdGguam9pbihfbGliUGF0aCwgXCJjZHAtbGliXCIpO1xyXG4gICAgICAgICAgICBpZiAoZnMucGF0aEV4aXN0c1N5bmMoY2hlY2spKSB7XHJcbiAgICAgICAgICAgICAgICBfbGliUGF0aCA9IGNoZWNrO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJpZWQrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX2xpYlBhdGg7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmjIflrprjgZXjgozjgZ8gdGFyZ2V0RGlyIOOCkuWPluW+l1xyXG4gKlxyXG4gKiBAcmV0dXJucyB0YXJnZXREaXIg44G444GuIHBhdGhcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRUYXJnZXREaXIoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBfc2V0dGluZ3MudGFyZ2V0RGlyO1xyXG59XHJcblxyXG4vKipcclxuICog44Ot44Kw5Ye65YqbXHJcbiAqIGNvbnNvbGUubG9nKCkg44Go5ZCM562JXHJcbiAqXHJcbiAqIEBwYXJhbSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghX3NldHRpbmdzLnNpbGVudCkge1xyXG4gICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UsIG9wdGlvbmFsUGFyYW1zKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDoqbPntLDjg63jgrDlh7rliptcclxuICogY29uc29sZS5kZWJ1ZygpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0gbWVzc2FnZSAgICAgICAg5Ye65Yqb44Oh44OD44K744O844K4XHJcbiAqIEBwYXJhbSBvcHRpb25hbFBhcmFtcyDku5jliqDmg4XloLFcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWJ1ZyhtZXNzYWdlPzogc3RyaW5nLCAuLi5vcHRpb25hbFBhcmFtczogYW55W10pOiB2b2lkIHtcclxuICAgIGlmICghX3NldHRpbmdzLnNpbGVudCAmJiBfc2V0dGluZ3MudmVyYm9zZSkge1xyXG4gICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJERUJVRzogXCIgKyBtZXNzYWdlLCBvcHRpb25hbFBhcmFtcyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIkRFQlVHOiBcIiArIG1lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOaknOiovFxyXG4gKiBjb25zb2xlLmFzc2VydCgpIOOBqOWQjOetiVxyXG4gKlxyXG4gKiBAcGFyYW0gdGVzdCAgICAgICAgICAg5qSc6Ki844GZ44KL5byPXHJcbiAqIEBwYXJhbSBtZXNzYWdlICAgICAgICDlh7rlipvjg6Hjg4Pjgrvjg7zjgrhcclxuICogQHBhcmFtIG9wdGlvbmFsUGFyYW1zIOS7mOWKoOaDheWgsVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydCh0ZXN0PzogYm9vbGVhbiwgbWVzc2FnZT86IHN0cmluZywgLi4ub3B0aW9uYWxQYXJhbXM6IGFueVtdKTogdm9pZCB7XHJcbiAgICBpZiAoIXRlc3QpIHtcclxuICAgICAgICBpZiAoX3NldHRpbmdzLmZvcmNlKSB7XHJcbiAgICAgICAgICAgIGlmICgwIDwgb3B0aW9uYWxQYXJhbXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4obWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKDAgPCBvcHRpb25hbFBhcmFtcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgb3B0aW9uYWxQYXJhbXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcm9jZXNzLmV4aXQoMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgX2xhbmc6IGFueTtcclxuXHJcbi8qKlxyXG4gKiDjg63jg7zjgqvjg6njgqTjgrpcclxuICpcclxuICogQHBhcmFtIGtleSDjgq3jg7zmloflrZfliJdcclxuICogQHJldHVybnMg57+76Kiz44GV44KM44Gf5paH5a2X5YiXXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmICghX2xhbmcpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBfbGFuZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGdldExpYlBhdGgoKSwgXCJyZXMvbG9jYWxlc1wiLCBcIm1lc3NhZ2VzLlwiICsgX3NldHRpbmdzLmxhbmcgKyBcIi5qc29uXCIpLCBcInV0ZjhcIikudG9TdHJpbmcoKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwiTGFuZ3VhZ2UgcmVzb3VyY2UgSlNPTiBwYXJzZSBlcnJvcjogXCIgKyBlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHJlc291Y2UgPSAkLmV4dGVuZCh7fSwgX2xhbmcpO1xyXG4gICAgY29uc3QgcHJvcHMgPSBrZXkuc3BsaXQoXCIuXCIpO1xyXG4gICAgd2hpbGUgKDAgPCBwcm9wcy5sZW5ndGgpIHtcclxuICAgICAgICBjb25zdCBwcm9wID0gcHJvcHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAocmVzb3VjZVtwcm9wXSkge1xyXG4gICAgICAgICAgICByZXNvdWNlID0gcmVzb3VjZVtwcm9wXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhc3NlcnQoZmFsc2UsIFwicmVzb3VjZSBub3QgZm91bmQuIGtleTogXCIgKyBrZXkpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb3VjZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3NldHRpbmdzLnRzIiwiaW1wb3J0IHsgR2VuZXJhdG9yQmFzZSwgSVByb2plY3RDb25maWdyYXRpb24gfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBHZW5lcmF0b3JNb2R1bGUgfSBmcm9tIFwiLi9nZW5lcmF0b3ItbW9kdWxlXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1tb2R1bGVcIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvck1vZHVsZShjb25maWcpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9saWJyYXJ5L2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uLFxyXG4gICAgR2VuZXJhdG9yQmFzZSxcclxuICAgIFV0aWxzLFxyXG59IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IElMaWJyYXJ5Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuY29uc3QgZnMgICAgICAgICAgICA9IFV0aWxzLmZzO1xyXG5jb25zdCBnbG9iICAgICAgICAgID0gVXRpbHMuZ2xvYjtcclxuY29uc3QgJCAgICAgICAgICAgICA9IFV0aWxzLiQ7XHJcbmNvbnN0IF8gICAgICAgICAgICAgPSBVdGlscy5fO1xyXG5jb25zdCBkZWJ1ZyAgICAgICAgID0gVXRpbHMuZGVidWc7XHJcbmNvbnN0IHRlbXBsYXRlUGF0aCAgPSBVdGlscy50ZW1wbGF0ZVBhdGg7XHJcbmNvbnN0IGNvcHlUcGwgICAgICAgPSBVdGlscy5jb3B5VHBsO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JNb2R1bGVcclxuICogQGJyaWVmIExpYnJhcnkgTW9kdWxlIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yTW9kdWxlIGV4dGVuZHMgR2VuZXJhdG9yQmFzZSB7XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGltcHJlbWVudGVzOiBHZW5lcmF0b3JCYXNlXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml6Llrprjga4gZGlyZWN0b3J5IOani+mAoOOCkui/lOWNtFxyXG4gICAgICovXHJcbiAgICBkZWZhdWx0QmFzZVN0cnVjdHVyZSgpOiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3JjOiBcInNyY1wiLFxyXG4gICAgICAgICAgICBwa2c6IFwiZGlzdFwiLFxyXG4gICAgICAgICAgICBidWlsdDogXCJidWlsdFwiLFxyXG4gICAgICAgICAgICBkb2M6IFwiZG9jc1wiLFxyXG4gICAgICAgICAgICB0YXNrOiBcInRhc2tzXCIsXHJcbiAgICAgICAgICAgIHRlc3Q6IFwidGVzdHNcIixcclxuICAgICAgICAgICAgdHlwZXM6IFwiQHR5cGVzXCIsXHJcbiAgICAgICAgICAgIHRlbXA6IFwiLnRlbXBcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5lbnN1cmVNb2R1bGVQcm9wcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVQcm9qZWN0U2V0dGluZ3MoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVWaXN1YWxTdHVkaW9Tb2x1dGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkdHMtYnVuZGxlXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0LWZvcm1hdHRlclwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLm5vZGVqcykge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJqYXNtaW5lLW5vZGVcIiwgdmVyc2lvbjogXCJeMi4wLjBcIiwgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwicmVxdWlyZWpzXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gXy5zb3J0QnkoZGVwZW5kcy5jb25jYXQoZXh0cmEpLCAoZGVwZW5kKSA9PiBkZXBlbmQubmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElMaWJyYXJ5Q29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4gPElMaWJyYXJ5Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG1vZHVsZSDlkI0sIG1haW4g44OV44Kh44Kk44Or5ZCN44Gu5L+d6Ki8XHJcbiAgICAgKiAtIDE6IG1vZHVsZU5hbWUg44GM5oyH5a6a44GV44KM44Gm44GE44KL5aC05ZCI44Gv5L2/55So44GZ44KLXHJcbiAgICAgKiAtIDI6IHByb2plY3ROYW1lIOOBjOS9v+eUqOWPr+iDveOBquWgtOWQiOOBr+OBneOCjOOCkuS9v+eUqOOBmeOCi1xyXG4gICAgICogLSAzOiBwcm9qZWN0TmFtZSDjgYzkvb/nlKjkuI3lj6/jga7loLTlkIjjga/jgIFcIi1cIiDjgaTjgarjgY7mloflrZfliJfjgpLnlJ/miJDjgZnjgotcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBlbnN1cmVNb2R1bGVQcm9wcygpOiB2b2lkIHtcclxuICAgICAgICAvLyBtb2R1bGUgbmFtZVxyXG4gICAgICAgIGlmIChudWxsID09IHRoaXMuY29uZmlnLm1vZHVsZU5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCEvXi4qWyhcXFxcfFxcc3wvfDp8Knw/fFwifDx8Pnx8KV0uKiQvLnRlc3QodGhpcy5jb25maWcucHJvamVjdE5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gdGhpcy5jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lID0gXy50cmltKF8uZGFzaGVyaXplKHRoaXMuY29uZmlnLnByb2plY3ROYW1lKSwgXCItXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRlYnVnKFwibW9kdWxlTmFtZTogXCIgKyB0aGlzLmNvbmZpZy5tb2R1bGVOYW1lKTtcclxuXHJcbiAgICAgICAgLy8gbWFpbiBmaWxlIG5hbWVcclxuICAgICAgICBpZiAobnVsbCA9PSB0aGlzLmNvbmZpZy5tYWluQmFzZU5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5jb25maWcubWFpbkJhc2VOYW1lID0gdGhpcy5jb25maWcubW9kdWxlTmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZGVidWcoXCJtYWluQmFzZU5hbWU6IFwiICsgdGhpcy5jb25maWcubWFpbkJhc2VOYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODh+OCo+ODrOOCr+ODiOODquani+aIkOaDheWgseOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZURpcmVjdG9yeVN0cnVjdHVyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNvcHlUcGxEaXIoXCJsaWJyYXJ5L3N0cnVjdHVyZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwcm9qZWN0LmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdHNjb25maWdcclxuICAgICAgICBpZiAoIXRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXIpIHtcclxuICAgICAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIHRlc3QgdHNjb25maWcuanNvblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwiX3RzY29uZmlnLnRlc3QuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIFwidHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfdHNjb25maWcub3V0cHV0LXNhbWUtZGlyLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gZXNsaW50cmMuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9lc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwiZXNsaW50XCIsIFwiZXNsaW50cmMuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5xdWVyeUVzTGludEVudlBhcmFtKCksXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gdGVzdGVtXHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmZpZy5ub2RlanMpIHtcclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5L3Rvb2xzL3Rlc3RlbVwiKSwgXCJfdGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIFwidGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGVzdGVtU3R1ZmZQYXRoID0gdGVtcGxhdGVQYXRoKFwibGlicmFyeS90b29scy90ZXN0ZW0vcnVubmVyXCIpO1xyXG5cclxuICAgICAgICAgICAgZ2xvYi5zeW5jKFwiKipcIiwge1xyXG4gICAgICAgICAgICAgICAgY3dkOiB0ZXN0ZW1TdHVmZlBhdGgsXHJcbiAgICAgICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZXN0ZW1TdHVmZlBhdGgsIGZpbGUpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRlc3QsIFwicnVubmVyXCIsIGZpbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gLmdpdGlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSRUFETUUubWRcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJfUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIlJFQURNRS5tZFwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzID0gYXdhaXQgdGhpcy5xdWVyeURlcGVuZGVuY2llc1BhcmFtKHRoaXMuY29uZmlnLmRldkRlcGVuZGVuY2llcyB8fCB0aGlzLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJsaWJyYXJ5XCIpLCBcIl9wYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwicGFja2FnZS5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOOCveODvOOCueOBrumbm+W9ouS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVNvdXJjZVRlbXBsYXRlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IF9tb2R1bGUgPSBwYXRoLmJhc2VuYW1lKHRoaXMuX2NvbmZpZy5tb2R1bGVOYW1lLCBcIi5qc1wiKTtcclxuICAgICAgICBjb25zdCBwYXJhbSA9IHtcclxuICAgICAgICAgICAgc2FtcGxlQ2xhc3M6IF8uY2xhc3NpZnkoX21vZHVsZSksXHJcbiAgICAgICAgICAgIHNhbXBsZU1vZHVsZTogX21vZHVsZSxcclxuICAgICAgICAgICAgYnVpbHQ6IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuYnVpbHQsXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3Qgc2NyaXB0ID0gKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0IHx8IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgLy8gaW5kZXgudHNcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibGlicmFyeVwiKSwgXCJzcmNcIiwgXCJfaW5kZXgudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLCBzY3JpcHQsIF9tb2R1bGUgKyBcIi50c1wiKSxcclxuICAgICAgICAgICAgcGFyYW0sXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBpbmRleC5zcGVjLnRzXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImxpYnJhcnlcIiksIFwic3JjXCIsIFwiX2luZGV4LnNwZWMudHNcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJ1bml0XCIsIF9tb2R1bGUgKyBcIi5zcGVjLnRzXCIpLFxyXG4gICAgICAgICAgICBwYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHZzUGFyYW0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBjcmVhdGVHVUlEID0gVXRpbHMuY3JlYXRlR1VJRDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uID0gPGFueT4kLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZyk7XHJcblxyXG4gICAgICAgICAgICBwYXJhbS5wcm9qZWN0TmFtZSAgICAgICA9IHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZTtcclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdEdVSUQgICAgICAgPSBjcmVhdGVHVUlEKCk7XHJcbiAgICAgICAgICAgIHBhcmFtLnR5cGVzICAgICAgICAgICAgID0gcGFyYW0udHlwZXMucmVwbGFjZShcIkBcIiwgXCIlNDBcIik7IC8vIGVzY2FwZSBcIkBcIiB0byBcIiU0MFwiXHJcbiAgICAgICAgICAgIHBhcmFtLm1haW5CYXNlTmFtZSAgICAgID0gdGhpcy5fY29uZmlnLm1haW5CYXNlTmFtZTtcclxuICAgICAgICAgICAgcGFyYW0ubGljZW5zZSAgICAgICAgICAgPSAhdGhpcy5fY29uZmlnLnByaXZhdGU7XHJcblxyXG4gICAgICAgICAgICAvLyB0b29sc1xyXG4gICAgICAgICAgICBwYXJhbS53ZWJwYWNrID0gdGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpO1xyXG4gICAgICAgICAgICBwYXJhbS50ZXN0ZW0gPSAhdGhpcy5jb25maWcubm9kZWpzO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ub3V0cHV0U2FtZURpciA9IHRoaXMuY29uZmlnLm91dHB1dFNhbWVEaXI7XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR1cCBidWlsdCBqcyBncm91cFxyXG4gICAgICAgICAgICBwYXJhbS5qc0dyb3VwID0gW107XHJcbiAgICAgICAgICAgIGlmICghcGFyYW0ub3V0cHV0U2FtZURpcikge1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLmJ1aWx0ICsgXCJcXFxcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IHBhcmFtLm1haW5CYXNlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBkX3RzOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtaW5fbWFwOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5taW5pZnkpIHtcclxuICAgICAgICAgICAgICAgIC8vIHNldHVwIHBrZyBncm91cFxyXG4gICAgICAgICAgICAgICAgcGFyYW0uanNHcm91cC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICByZWxhdGl2ZVBhdGg6IHBhcmFtLnBrZyArIFwiXFxcXFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBwYXJhbS5tYWluQmFzZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVwZW5kZWU6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRfdHM6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgbWluX21hcDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBzZXR1cCB0ZXN0IGpzIGdyb3VwXHJcbiAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAgPSBbXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiBwYXJhbS50ZXN0ICsgXCJcXFxcdW5pdFxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lICsgXCIuc3BlY1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogdGhpcy5jb25maWcub3V0cHV0U2FtZURpcixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgIGlmIChwYXJhbS5vdXRwdXRTYW1lRGlyKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcGFyYW0uYnVpbHQgKyBcIlxcXFxcIixcclxuICAgICAgICAgICAgICAgICAgICBmaWxlTmFtZTogcGFyYW0ubWFpbkJhc2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8vIC5zbG5cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBcIl9zb2x1dGlvbi5zbG4udHBsXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB2c1BhcmFtLnByb2plY3ROYW1lICsgXCIuc2xuXCIpLFxyXG4gICAgICAgICAgICB2c1BhcmFtLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gLmNzcHJvalxyXG4gICAgICAgICgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sU3RyaW5nID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaG9nYW4gPSBVdGlscy5ob2dhbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZVRleHQgPSBVdGlscy5ub3JtYWxpemVUZXh0O1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICAgICAgICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgZGVsaW1pdGVyczogXCJ7eyB9fVwiLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB0cGwgPSBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwiYmFzZS92aXN1YWwuc3R1ZGlvXCIpLCBmaWxlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmModHBsKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4ganN0LnJlbmRlcih2c1BhcmFtKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHRvWG1sRE9NID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC5wYXJzZVhNTCh0b1htbFN0cmluZyhmaWxlKSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxOb2RlID0gKGZpbGU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFV0aWxzLnN0cjJYbWxOb2RlKHRvWG1sU3RyaW5nKGZpbGUpKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0ICRwcm9qID0gdG9YbWxET00oXCJfcHJvamVjdC5jc3Byb2oudHBsXCIpO1xyXG4gICAgICAgICAgICBjb25zdCAkZ3BUUyA9IHRvWG1sTm9kZShcIl90cy5pdGVtLmdyb3VwLnRwbFwiKTtcclxuICAgICAgICAgICAgY29uc3QgJGdwSlMgPSB0b1htbE5vZGUoXCJfanMuaXRlbS5ncm91cC50cGxcIik7XHJcblxyXG4gICAgICAgICAgICAkcHJvalxyXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJJdGVtR3JvdXBcIilcclxuICAgICAgICAgICAgICAgIC5sYXN0KClcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BUUylcclxuICAgICAgICAgICAgICAgIC5hZnRlcigkZ3BKUylcclxuICAgICAgICAgICAgICAgIDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdFhNTCA9IFV0aWxzLmZvcm1hdFhNTDtcclxuICAgICAgICAgICAgY29uc3QgZHN0UGF0aCA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5jc3Byb2pcIik7XHJcbiAgICAgICAgICAgIGRlYnVnKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSk7XHJcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgZm9ybWF0WE1MKFV0aWxzLnhtbE5vZGUyU3RyKCRwcm9qKSkpO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2xpYnJhcnkvZ2VuZXJhdG9yLW1vZHVsZS50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yQ29yZG92YSB9IGZyb20gXCIuL2dlbmVyYXRvci1jb3Jkb3ZhXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1jb3Jkb3ZhXCI7XHJcblxyXG4vKipcclxuICogZ2VuZXJhdG9yIOeUn+aIkOmWouaVsFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckNvcmRvdmEoY29uZmlnKTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvbW9iaWxlL2luZGV4LnRzIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgICQsXHJcbiAgICBfLFxyXG4gICAgaG9nYW4sXHJcbiAgICBkZWJ1ZyxcclxuICAgIHRlbXBsYXRlUGF0aCxcclxuICAgIGNvcHlUcGwsXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIHN0cjJYbWxOb2RlLFxyXG4gICAgeG1sTm9kZTJTdHIsXHJcbiAgICBub3JtYWxpemVUZXh0LFxyXG4gICAgZm9ybWF0WE1MLFxyXG4gICAgY3JlYXRlR1VJRCxcclxufSBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuaW1wb3J0IHtcclxuICAgIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLFxyXG4gICAgSURlcGVuZGVuY3ksXHJcbiAgICBJVmlzdWFsU3R1ZGlvQ29uZmlncmF0aW9uLFxyXG4gICAgR2VuZXJhdG9yQmFzZSxcclxufSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJTW9iaWxlQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JDb3Jkb3ZhXHJcbiAqIEBicmllZiBNb2JpbGUgQ29yZG92YSDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckNvcmRvdmEgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICAgICAgdGVtcDogXCIudGVtcFwiLFxyXG4gICAgICAgICAgICBsaWI6IFwibGliXCIsXHJcbiAgICAgICAgICAgIGV4dGVybmFsOiBcImV4dGVybmFsXCIsXHJcbiAgICAgICAgICAgIHBvcnRpbmc6IFwicG9ydGluZ1wiLFxyXG4gICAgICAgICAgICByZXM6IFwicmVzXCIsXHJcbiAgICAgICAgICAgIHNyY0NvbmZpZzoge1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0OiBcInNjcmlwdHNcIixcclxuICAgICAgICAgICAgICAgIHN0eWxlc2hlZXQ6IFwic3R5bGVzaGVldHNcIixcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiBcInRlbXBsYXRlc1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjcmVhdGUgYWN0aW9uIGVudHJ5XHJcbiAgICAgKiBAcGFyYW0ge0lMaWJyYXJ5Q29uZmlncmF0aW9ufSBjb25maWcg44Kz44Oz44OV44Kj44Kw6Kit5a6aXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGNyZWF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLmNvbmZpZywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZUNvcmRvdmEoKSkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoZGlyKHRoaXMucm9vdERpcik7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlQ29yZG92YVNjYWZmb2xkKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlQ29uZmlnWE1MKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YVBsYXRmb3JtcygpO1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmFkZENvcmRvdmFQbHVnaW5zKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuYWRkQ29yZG92YUV4dGVudGlvbkZpbGVzKCk7XHJcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuY2FjaGVDb3Jkb3ZhUGFja2FnZUpTT04oKTtcclxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGRpcihcIi4uXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVByb2plY3RTZXR0aW5ncygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlU291cmNlVGVtcGxhdGUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlv4XopoHjgajjgZnjgosgdGFzayBzY3JpcHQg5LiA6Kan44KS6L+U5Y20LiBhY3Rpb246IGNyZWF0ZSDjga7jgajjgY3jgavlkbzjgbDjgozjgotcclxuICAgICAqL1xyXG4gICAgZ2V0IHRhc2tMaXN0KCk6IHN0cmluZ1tdIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcImJhbm5lci5qc1wiLFxyXG4gICAgICAgICAgICBcImNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiY29tbWFuZC5qc1wiLFxyXG4gICAgICAgICAgICBcImV4dGVybmFsLXJlYXJyYW5nZS5qc1wiLFxyXG4gICAgICAgICAgICBcIm1pbmlmeS5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1bmRsZS1maW5hbGl6ZXIuanNcIixcclxuICAgICAgICAgICAgXCJyZW1hcC1jb3ZlcmFnZS5qc1wiLFxyXG4gICAgICAgIF07XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBzdXBlci5kZWZhdWx0RGV2RGVwZW5kZW5jaWVzLmNvbmNhdChbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvamFzbWluZVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAdHlwZXMvcmVxdWlyZWpzXCIsICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJhdXRvcHJlZml4ZXJcIiwgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjbGVhbi1jc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJmcy1leHRyYVwiLCAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJodG1sLW1pbmlmaWVyXCIsICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJub2RlLXNhc3NcIiwgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwb3N0Y3NzLWNsaVwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzbWFydHdhdGNoXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGV4dHJhID0gW107XHJcbiAgICAgICAgdGhpcy5jb25maWcuZGV2RGVwZW5kZW5jaWVzLmZvckVhY2goKGRlcGVuZCkgPT4ge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogZGVwZW5kLm5hbWUsIHZlcnNpb246IGRlcGVuZC52ZXJzaW9uLCB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVDb3Jkb3ZhKCkpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwiQHR5cGVzL2NvcmRvdmFcIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVzbGludHJjIOOBq+aMh+WumuOBmeOCiyB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge09iamVjdH0g44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeUVzTGludEVudlBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgYmFzZSA9IHN1cGVyLnF1ZXJ5RXNMaW50RW52UGFyYW0oKTtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAuLi5iYXNlLFxyXG4gICAgICAgICAgICAuLi57XHJcbiAgICAgICAgICAgICAgICBjb3Jkb3ZhOiB0aGlzLmlzRW5hYmxlQ29yZG92YSgpLFxyXG4gICAgICAgICAgICAgICAgaGFtbWVyanM6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJoYW1tZXJqc1wiKSxcclxuICAgICAgICAgICAgICAgIGlzY3JvbGw6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpLFxyXG4gICAgICAgICAgICAgICAgZmxpcHNuYXA6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJmbGlwc25hcFwiKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogdHNjb25maWcuYmFzZSDjgavmjIflrprjgZnjgosgdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IOODhuODs+ODl+ODrOODvOODiOODkeODqeODoeODvOOCv+OCquODluOCuOOCp+OCr+ODiFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgcXVlcnlUc0NvbmZpZ0Jhc2VQYXJhbSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIC4uLnRoaXMuX2NvbmZpZyxcclxuICAgICAgICAgICAgLi4ue1xyXG4gICAgICAgICAgICAgICAgY29yZG92YTogdGhpcy5pc0VuYWJsZUNvcmRvdmEoKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwcml2YXRlIG1ldGhvZHM6XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDplovnmbrmmYLjga7kvp3lrZjjg6Ljgrjjg6Xjg7zjg6vjg6rjgrnjg4jjga7lj5blvpdcclxuICAgICAqIOW/heimgeOBq+W/nOOBmOOBpuOCquODvOODkOODvOODqeOCpOODiVxyXG4gICAgICpcclxuICAgICAqIEByZXR1cm4ge0lEZXBlbmRlbmN5fVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBkZWZhdWx0RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJAY2RwL21vYmlsZVwiLCAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwiYmFja2JvbmVcIiwgICAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICAgICAgeyBuYW1lOiBcImpxdWVyeVwiLCAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJyZXF1aXJlanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidW5kZXJzY29yZVwiLCAgIHZlcnNpb246IHVuZGVmaW5lZCwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjb25zdCBleHRyYSA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29uZmlnLmRlcGVuZGVuY2llcy5mb3JFYWNoKChkZXBlbmQpID0+IHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IGRlcGVuZC5uYW1lLCB2ZXJzaW9uOiBkZXBlbmQudmVyc2lvbiwgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHJldHVybiBfLnNvcnRCeShkZXBlbmRzLmNvbmNhdChleHRyYSksIChkZXBlbmQpID0+IGRlcGVuZC5uYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGNvbmZpZ3JhdGlvbiDjgavjgqLjgq/jgrvjgrlcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXQgY29uZmlnKCk6IElNb2JpbGVBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SU1vYmlsZUFwcENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOBruacieWKuS/nhKHlirnjg4Hjgqfjg4Pjgq9cclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJucyB0cnVlOiDmnInlirkgLyBmYWxzZTog54Sh5Yq5XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNFbmFibGVDb3Jkb3ZhKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoMCA8IHRoaXMuY29uZmlnLnBsYXRmb3Jtcy5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbGliL3BvcnRpbmcg44Gu6Kit5a6a54q25rOB44Gu44OB44Kn44OD44KvXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHRhcmdldFxyXG4gICAgICogQHJldHVybnMgdHJ1ZTog6Kit5a6aIC8gZmFsc2U6IOacquioreWumlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGhhc1N0cnVjdHVyZU9mKHRhcmdldDogXCJsaWJcIiB8IFwicG9ydGluZ1wiKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNvbmZpZy5wcm9qZWN0U3RydWN0dXJlICYmIDAgPD0gdGhpcy5jb25maWcucHJvamVjdFN0cnVjdHVyZS5pbmRleE9mKHRhcmdldCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog44Kk44Oz44K544OI44O844Or5a++6LGhL+mdnuWvvuixoeODgeOCp+ODg+OCr1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBuYW1lICAgIFtpbl0g44Oi44K444Ol44O844Or5ZCNXHJcbiAgICAgKiBAcGFyYW0gZGVwZW5kcyBbaW5dIOaknOe0ouWvvuixoSAo5pei5a6aIHRoaXMuY29uZmlnLmRlcGVuZGVuY2llcylcclxuICAgICAqIEByZXR1cm5zIHRydWU6IOWvvuixoSAvIGZhbHNlOiDpnZ7lr77osaFcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc0luc3RhbGxhdGlvblRhcmdldChuYW1lOiBzdHJpbmcsIGRlcGVuZHM6IElEZXBlbmRlbmN5W10gPSB0aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gISFkZXBlbmRzLmZpbmQoKGRlcGVuZCkgPT4gbmFtZSA9PT0gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOCkueUqOOBhOOBn+ODl+ODreOCuOOCp+OCr+ODiOS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZUNvcmRvdmFTY2FmZm9sZCgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmNyZWF0ZUNvcmRvdmFTY2FmZm9sZFwiKTtcclxuICAgICAgICBkZWJ1ZyhcImNyZWF0ZUNvcmRvdmFTY2FmZm9sZFwiKTtcclxuXHJcbiAgICAgICAgLy8gYCQgY29yZG92YSBjcmVhdGUgY29vbC1tb2JpbGUgY29tLnNvbnkuY2RwLmNvb2xtb2JpbGUgXCJDb29sIE1vYmlsZVwiYFxyXG4gICAgICAgIGF3YWl0IGV4ZWNDb21tYW5kKFwiY29yZG92YVwiLCBbXCJjcmVhdGVcIiwgdGhpcy5jb25maWcucHJvamVjdE5hbWUsIHRoaXMuY29uZmlnLmFwcElkLCB0aGlzLmNvbmZpZy5hcHBOYW1lXSk7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBmaWxlc1xyXG4gICAgICAgIGdsb2Iuc3luYyhcInd3dy8qKi8qXCIsIHtcclxuICAgICAgICAgICAgY3dkOiB0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSxcclxuICAgICAgICB9KS5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLnJlbW92ZVN5bmMocGF0aC5qb2luKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBmaWxlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgZnMucmVtb3ZlU3luYyhwYXRoLmpvaW4odGhpcy5jb25maWcucHJvamVjdE5hbWUsIFwicmVzXCIpKTtcclxuICAgICAgICBmcy5yZW1vdmVTeW5jKHBhdGguam9pbih0aGlzLmNvbmZpZy5wcm9qZWN0TmFtZSwgXCIubnBtaWdub3JlXCIpKTtcclxuXHJcbiAgICAgICAgLy8gbW92ZSByb290IGRpcmVjdG9yeVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRoaXMuY29uZmlnLnByb2plY3ROYW1lLCBcIi4vXCIpO1xyXG4gICAgICAgIGZzLnJlbW92ZVN5bmModGhpcy5jb25maWcucHJvamVjdE5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlnLnhtbCDjga7kv67mraNcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyB1cGRhdGVDb25maWdYTUwoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS51cGRhdGVDb25maWdYbWxcIik7XHJcbiAgICAgICAgZGVidWcoXCJ1cGRhdGVDb25maWdYTUxcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbmZpZ1htbFBhdGggPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgXCJjb25maWcueG1sXCIpO1xyXG4gICAgICAgIGNvbnN0ICRjb25maWdYbWxEb20gPSAkKHN0cjJYbWxOb2RlKGZzLnJlYWRGaWxlU3luYyhjb25maWdYbWxQYXRoKS50b1N0cmluZygpKSk7XHJcblxyXG4gICAgICAgICRjb25maWdYbWxEb21cclxuICAgICAgICAgICAgLmZpbmQoXCJ3aWRnZXRcIilcclxuICAgICAgICAgICAgLmF0dHIoXCJ2ZXJzaW9uXCIsIHRoaXMuY29uZmlnLnZlcnNpb24pXHJcbiAgICAgICAgICAgIC5hdHRyKFwiaW9zLUNGQnVuZGxlSWRlbnRpZmllclwiLCB0aGlzLmNvbmZpZy5hcHBJZClcclxuICAgICAgICAgICAgLnByZXBlbmQoc3RyMlhtbE5vZGUoYFxyXG4gICAgICAgICAgICAgICAgPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz5cclxuICAgICAgICAgICAgICAgIDxwcmVmZXJlbmNlIG5hbWU9XCJLZXlib2FyZERpc3BsYXlSZXF1aXJlc1VzZXJBY3Rpb25cIiB2YWx1ZT1cImZhbHNlXCIvPlxyXG4gICAgICAgICAgICAgICAgPHByZWZlcmVuY2UgbmFtZT1cIkJhY2tncm91bmRDb2xvclwiIHZhbHVlPVwiMHhmZjAwMDAwMFwiIC8+XHJcbiAgICAgICAgICAgIGApKVxyXG4gICAgICAgICAgICA7XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBjb3Jkb3ZhIHRlYW0gaW5mb3JtYXRpb25cclxuICAgICAgICAkY29uZmlnWG1sRG9tXHJcbiAgICAgICAgICAgIC5maW5kKFwiZGVzY3JpcHRpb25cIilcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG4gICAgICAgICRjb25maWdYbWxEb21cclxuICAgICAgICAgICAgLmZpbmQoXCJhdXRob3JcIilcclxuICAgICAgICAgICAgLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGNvbmZpZ1htbFBhdGgsIGZvcm1hdFhNTCh4bWxOb2RlMlN0cigkY29uZmlnWG1sRG9tKSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogcGxhdGZvcm0g6L+95YqgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkQ29yZG92YVBsYXRmb3JtcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBkZWJ1ZyhcImFkZENvcmRvdmFQbGF0Zm9ybXNcIik7XHJcblxyXG4gICAgICAgIGNvbnN0IHRhcmdldHMgPSB0aGlzLmNvbmZpZy5wbGF0Zm9ybXMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5kZXggPSB0YXJnZXRzLmluZGV4T2YoXCJpb3NcIik7XHJcbiAgICAgICAgaWYgKDAgPD0gaW5kZXggJiYgXCJkYXJ3aW5cIiAhPT0gcHJvY2Vzcy5wbGF0Zm9ybSkge1xyXG4gICAgICAgICAgICB0aGlzLndhcm4oXCJtb2JpbGUuY3JlYXRlLmNvcmRvdmEuaU9TV2FybmluZ1wiKTtcclxuICAgICAgICAgICAgdGFyZ2V0cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0cy5sZW5ndGggPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmFkZFBsYXRmb3Jtc1wiKTtcclxuXHJcbiAgICAgICAgLy8gYCQgY29yZG92YSBwbGF0Zm9ybSBhZGQgYW5kcm9pZCBpb3NgXHJcbiAgICAgICAgYXdhaXQgZXhlY0NvbW1hbmQoXCJjb3Jkb3ZhXCIsIFtcInBsYXRmb3JtXCIsIFwiYWRkXCJdLmNvbmNhdCh0YXJnZXRzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBwbHVnaW4g6L+95YqgXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgYWRkQ29yZG92YVBsdWdpbnMoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgdGhpcy5wcm9ncmVzcyhcIm1vYmlsZS5jcmVhdGUuY29yZG92YS5hZGRQbHVnaW5zXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiYWRkQ29yZG92YVBsdWdpbnNcIik7XHJcblxyXG4gICAgICAgIC8qXHJcbiAgICAgICAgICogSS9GIOOBr+ikh+aVsOOBruODl+ODqeOCsOOCpOODs+OCkuS4gOaLrOOBp+i/veWKoOOBmeOCi+OBk+OBqOOBjOWPr+iDveOBoOOBjOOAgVxyXG4gICAgICAgICAqIGNvcmRvdmEgdmVyc2lvbiDjgpLliKTlrprjgZfjgabjgYTjgovjg5fjg6njgrDjgqTjg7Pjga/oqqTliKTlrprjgZnjgovjgZPjgajjgYzjgYLjgovjgZ/jgoHjgIFcclxuICAgICAgICAgKiAx44Gk44Ga44Gk6L+95Yqg44GZ44KLXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiDku6XkuIvjga7kuI3lhbflkIjjgavpoZ7kvLzjgZnjgovnj77osaFcclxuICAgICAgICAgKiBodHRwczovL2lzc3Vlcy5hcGFjaGUub3JnL2ppcmEvYnJvd3NlL0NCLTEyNjYzXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSB0aGlzLmNvbmZpZy5jb3Jkb3ZhX3BsdWdpbi5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgLy8gYCQgY29yZG92YSBwbHVnaW4gYWRkIGNvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3NlcmBcclxuICAgICAgICAgICAgYXdhaXQgZXhlY0NvbW1hbmQoXCJjb3Jkb3ZhXCIsIFtcInBsdWdpblwiLCBcImFkZFwiLCB0aGlzLmNvbmZpZy5jb3Jkb3ZhX3BsdWdpbltpXS5uYW1lXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29yZG92YSBwcm9qZWN0IOOBq+i/veWKoOOBmeOCi+ODquOCveODvOOCueOCkuOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGFkZENvcmRvdmFFeHRlbnRpb25GaWxlcygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5jb3Jkb3ZhLmFkZEV4dGVuc2lvbnNcIik7XHJcbiAgICAgICAgZGVidWcoXCJhZGRDb3Jkb3ZhRXh0ZW50aW9uRmlsZXNcIik7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwibW9iaWxlL2NvcmRvdmFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb3Jkb3ZhIOOBjOeUn+aIkOOBl+OBnyBwYWNrYWdlLmpzb24g44KS44Kt44Oj44OD44K344OlXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYXN5bmMgY2FjaGVDb3Jkb3ZhUGFja2FnZUpTT04oKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoXCIuL3BhY2thZ2UuanNvblwiKSkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhcIi4vcGFja2FnZS5qc29uXCIpLnRvU3RyaW5nKCkpO1xyXG5cclxuICAgICAgICAgICAgLy8gcmVtb3ZlIGNvcmRvdmEgdGVhbSBpbmZvcm1hdGlvblxyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLm5hbWU7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24udmVyc2lvbjtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5kaXNwbGF5TmFtZTtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29uZmlnLmNvcmRvdmFQYWNrYWdlSnNvbi5tYWluO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLnNjcmlwdHM7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24uYXV0aG9yO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICAgICAvLyDjg5XjgqHjgqTjg6vjga/jgYTjgaPjgZ/jgpPliYrpmaRcclxuICAgICAgICAgICAgZnMucmVtb3ZlU3luYyhcIi4vcGFja2FnZS5qc29uXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog44OH44Kj44Os44Kv44OI44Oq5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlRGlyZWN0b3J5U3RydWN0dXJlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJtb2JpbGUuY3JlYXRlLmFwcC5jcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmVcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVEaXJlY3RvcnlTdHJ1Y3R1cmVcIik7XHJcblxyXG4gICAgICAgIC8vIGFwcCBiYXNlIHN0cnVjdHVyZVxyXG4gICAgICAgIHRoaXMuY29weVRwbERpcihcIm1vYmlsZS9zdHJ1Y3R1cmUvYmFzZVwiKTtcclxuXHJcbiAgICAgICAgLy8gbGliXHJcbiAgICAgICAgaWYgKHRoaXMuaGFzU3RydWN0dXJlT2YoXCJsaWJcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGUvc3RydWN0dXJlL2xpYlwiLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmxpYilcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHBvcnRpbmdcclxuICAgICAgICBpZiAodGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIikpIHtcclxuICAgICAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICAgICAgXCJtb2JpbGUvc3RydWN0dXJlL3BvcnRpbmdcIixcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nKVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgLy8gY3JlYXRlOiBkZXYvcG9ydGluZy9AdHlwZXNcclxuICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGgoXCJiYXNlLy5naXRrZWVwXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wb3J0aW5nLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcyxcclxuICAgICAgICAgICAgICAgICAgICBcIi5naXRrZWVwXCJcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IFBMQVRGT1JNU19ST09UID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwbGF0Zm9ybXNcIik7XHJcbiAgICAgICAgICAgIGZzLnJlYWRkaXJTeW5jKFBMQVRGT1JNU19ST09UKVxyXG4gICAgICAgICAgICAgICAgLmZvckVhY2goKHBsYXRmb3JtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZzLnN0YXRTeW5jKHBhdGguam9pbihQTEFURk9STVNfUk9PVCwgcGxhdGZvcm0pKS5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29weVRwbERpcihcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwibW9iaWxlL3N0cnVjdHVyZS9wb3J0aW5nXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oUExBVEZPUk1TX1JPT1QsIHBsYXRmb3JtLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucG9ydGluZylcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHd3d1xyXG4gICAgICAgIGNvbnN0IFdXVyA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wa2cpO1xyXG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhXV1cpKSB7XHJcbiAgICAgICAgICAgIGZzLm1rZGlyKFdXVyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZzLmNvcHlTeW5jKHRlbXBsYXRlUGF0aChcImJhc2UvLmdpdGtlZXBcIiksIHBhdGguam9pbihXV1csIFwiLmdpdGtlZXBcIikpO1xyXG5cclxuICAgICAgICAvLyB0YXNrXHJcbiAgICAgICAgZ2xvYi5zeW5jKFwiKiovKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGVtcGxhdGVQYXRoKFwibW9iaWxlL3Rhc2tcIiksXHJcbiAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICBmcy5jb3B5U3luYyhcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdGFza1wiKSwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGFzaywgZmlsZSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOODl+ODreOCuOOCp+OCr+ODiOioreWumuODleOCoeOCpOODq+OBruS9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVByb2plY3RTZXR0aW5ncygpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5hcHAuY3JlYXRlUHJvamVjdFNldHRpbmdzXCIpO1xyXG4gICAgICAgIGRlYnVnKFwiY3JlYXRlUHJvamVjdFNldHRpbmdzXCIpO1xyXG5cclxuICAgICAgICAvLyBwcm9qZWN0LmNvbmZpZy5qc1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX3Byb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInByb2plY3QuY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAkLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBob2dhbjogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhvZ2FuLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgaGFtbWVyanM6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJoYW1tZXJqc1wiKSxcclxuICAgICAgICAgICAgICAgIGlzY3JvbGw6IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIHRzY29uZmlnXHJcbiAgICAgICAgLy8gdHNjb25maWcuYmFzZS5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfdHNjb25maWcuYmFzZS5qc29uXCIpLFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcInRzY29uZmlnLmJhc2UuanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5xdWVyeVRzQ29uZmlnQmFzZVBhcmFtKCksXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gbWFpbiB0c2NvbmZpZy5qc29uXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZVwiKSwgXCJfdHNjb25maWcuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ0c2NvbmZpZy5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcsXHJcbiAgICAgICAgICAgIHsgZGVsaW1pdGVyczogXCI8JSAlPlwiLCBib206IGZhbHNlLCB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gZXNsaW50cmMuanNvblxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX2VzbGludHJjLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJlc2xpbnRcIiwgXCJlc2xpbnRyYy5qc29uXCIpLFxyXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5RXNMaW50RW52UGFyYW0oKSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyB0ZXN0ZW1cclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3Rvb2xzL3Rlc3RlbVwiKSwgXCJfdGVzdGVtLmpzb25cIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudGVzdCwgXCJydW5uZXJcIiwgXCJ0ZXN0ZW0uanNvblwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHRlc3RlbVN0dWZmUGF0aCA9IHRlbXBsYXRlUGF0aChcIm1vYmlsZS90b29scy90ZXN0ZW0vcnVubmVyXCIpO1xyXG5cclxuICAgICAgICBnbG9iLnN5bmMoXCIqKlwiLCB7XHJcbiAgICAgICAgICAgIGN3ZDogdGVzdGVtU3R1ZmZQYXRoLFxyXG4gICAgICAgICAgICBub2RpcjogdHJ1ZSxcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlc3RlbVN0dWZmUGF0aCwgZmlsZSksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LCBcInJ1bm5lclwiLCBmaWxlKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIC5naXRpZ25vcmVcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlXCIpLCBcIl9naXRpZ25vcmVcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiLmdpdGlnbm9yZVwiKSxcclxuICAgICAgICAgICAgdGhpcy5fY29uZmlnLFxyXG4gICAgICAgICAgICB7IGJvbTogZmFsc2UsIH1cclxuICAgICAgICApO1xyXG5cclxuICAgICAgICAvLyBSRUFETUUubWRcclxuICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlXCIpLCBcIl9SRUFETUUubWRcIiksXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIFwiUkVBRE1FLm1kXCIpLFxyXG4gICAgICAgICAgICAkLmV4dGVuZCh7fSwgdGhpcy5fY29uZmlnLCB7XHJcbiAgICAgICAgICAgICAgICBjb3Jkb3ZhOiB0aGlzLmlzRW5hYmxlQ29yZG92YSgpLFxyXG4gICAgICAgICAgICAgICAgbGliOiB0aGlzLmhhc1N0cnVjdHVyZU9mKFwibGliXCIpLFxyXG4gICAgICAgICAgICAgICAgcG9ydGluZzogdGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIiksXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogdGVtcGxhdGVzL21vYmlsZS9hZGRvbiDjgYvjgonjgrPjg5Tjg7zjgZnjgovloLTlkIjjga/jgZPjgZPjgaflr77lv5xcclxuXHJcbiAgICAgICAgLy8gcGFja2FnZS5qc29uXHJcbiAgICAgICAgY29uc3QgcmVzb2x2ZWRDb25maWcgPSAkLmV4dGVuZCh0cnVlLCB7fSwgdGhpcy5jb25maWcpO1xyXG4gICAgICAgIHJlc29sdmVkQ29uZmlnLmRlcGVuZGVuY2llcyA9IGF3YWl0IHRoaXMucXVlcnlEZXBlbmRlbmNpZXNQYXJhbSh0aGlzLmRlZmF1bHREZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIHJlc29sdmVkQ29uZmlnLmRldkRlcGVuZGVuY2llcyA9IGF3YWl0IHRoaXMucXVlcnlEZXBlbmRlbmNpZXNQYXJhbSh0aGlzLmRlZmF1bHREZXZEZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGVcIiksIFwiX3BhY2thZ2UuanNvblwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIiksXHJcbiAgICAgICAgICAgIHJlc29sdmVkQ29uZmlnLFxyXG4gICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIGNvcmRvdmFQYWNrYWdlSlNPTiDjgajjg57jg7zjgrhcclxuICAgICAgICBpZiAodGhpcy5jb25maWcuY29yZG92YVBhY2thZ2VKc29uKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IFBLR19QQVRIID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJwYWNrYWdlLmpzb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHBrZyA9IEpTT04ucGFyc2UoZnMucmVhZEZpbGVTeW5jKFBLR19QQVRIKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgJC5leHRlbmQodHJ1ZSwgcGtnLCB0aGlzLmNvbmZpZy5jb3Jkb3ZhUGFja2FnZUpzb24pO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc29ydEtleXMgPSAodGFyZ2V0OiBvYmplY3QpOiBvYmplY3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydGVkID0ge307XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh0YXJnZXQpLnNvcnQoKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0ZWRba2V5XSA9IHRhcmdldFtrZXldO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc29ydGVkO1xyXG5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcGtnLmRlcGVuZGVuY2llcyAgICA9IHNvcnRLZXlzKHBrZy5kZXBlbmRlbmNpZXMpO1xyXG4gICAgICAgICAgICBwa2cuZGV2RGVwZW5kZW5jaWVzID0gc29ydEtleXMocGtnLmRldkRlcGVuZGVuY2llcyk7XHJcblxyXG4gICAgICAgICAgICBmcy53cml0ZUZpbGVTeW5jKFBLR19QQVRILCBKU09OLnN0cmluZ2lmeShwa2csIG51bGwsIDIpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjgr3jg7zjgrnjga7pm5vlvaLkvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVTb3VyY2VUZW1wbGF0ZSgpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICB0aGlzLnByb2dyZXNzKFwibW9iaWxlLmNyZWF0ZS5hcHAuY3JlYXRlU291cmNlVGVtcGxhdGVcIik7XHJcbiAgICAgICAgZGVidWcoXCJjcmVhdGVTb3VyY2VUZW1wbGF0ZVwiKTtcclxuXHJcbiAgICAgICAgLy8gY29weSBzb3VyY2VzXHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFxyXG4gICAgICAgICAgICBcIm1vYmlsZS9zcmMvc3RydWN0dXJlXCIsXHJcbiAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgeyAvLyBjb25maWcudHNcclxuICAgICAgICAgICAgY29uc3QgYWRkaXRpb25hbCA9ICgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb25maWcuZGVwZW5kZW5jaWVzLmxlbmd0aCA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aW9uYWw6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RXaXRoQ3VzdG9tTmFtZTogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cyA9IFsuLi50aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMsIC4uLnRoaXMuY29uZmlnLnJlc291cmNlX2FkZG9uXTtcclxuICAgICAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmZpbGVOYW1lIHx8IGluZm8udmVuZGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5hZGRpdGlvbmFsLmxpc3RXaXRoQ3VzdG9tTmFtZS5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmVuZGVyTmFtZTogaW5mby52ZW5kZXJOYW1lIHx8IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGluZm8uZmlsZU5hbWUgfHwgaW5mby5hbGlhcyB8fCBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtLmFkZGl0aW9uYWwubGlzdC5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICAgICAgfSkoKTtcclxuXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyY1wiKSwgXCJfY29uZmlnLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy5zY3JpcHQsIFwiY29uZmlnLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgJC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZywgYWRkaXRpb25hbCksXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7IC8vIGFwcC50c1xyXG4gICAgICAgICAgICBjb25zdCBnbG9iYWxzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMubGVuZ3RoIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFyYW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpbXBvcnRzTGlzdDogW10sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHNMaXN0OiBbXSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFzRXhwb3J0czogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0cyA9IFsuLi50aGlzLmNvbmZpZy5kZXBlbmRlbmNpZXMsIC4uLnRoaXMuY29uZmlnLnJlc291cmNlX2FkZG9uXTtcclxuICAgICAgICAgICAgICAgIHRhcmdldHMuZm9yRWFjaCgoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmZvLmdsb2JhbEV4cG9ydCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5nbG9iYWxzLmV4cG9ydHNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsRXhwb3J0OiBpbmZvLmdsb2JhbEV4cG9ydCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZU5hbWU6IGluZm8uYWxpYXMgfHwgaW5mby5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbS5nbG9iYWxzLmltcG9ydHNMaXN0LnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlTmFtZTogaW5mby5hbGlhcyB8fCBpbmZvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcGFyYW0uZ2xvYmFscy5oYXNFeHBvcnRzID0gKDAgPCBwYXJhbS5nbG9iYWxzLmV4cG9ydHNMaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyYW07XHJcbiAgICAgICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS9zcmNcIiksIFwiX2FwcC50c1wiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0aGlzLnJvb3REaXIsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWcuc2NyaXB0LCBcImFwcC50c1wiKSxcclxuICAgICAgICAgICAgICAgIGdsb2JhbHMsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiB9XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7Ly8gbG9jYWxpemUgcmVzb3VyY2VzXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyYy9fbG9jYWxlc1wiKSwgXCJfbWVzc2FnZXMuZW4tVVMuanNvblwiKSxcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb3REaXIsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcucmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibG9jYWxlc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwibWVzc2FnZXMuZW4tVVMuanNvblwiXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcsXHJcbiAgICAgICAgICAgICAgICB7IGRlbGltaXRlcnM6IFwiPCUgJT5cIiwgYm9tOiBmYWxzZSwgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgICAgICBjb3B5VHBsKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcIm1vYmlsZS9zcmMvX2xvY2FsZXNcIiksIFwiX21lc3NhZ2VzLmphLUpQLmpzb25cIiksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnJlcyxcclxuICAgICAgICAgICAgICAgICAgICBcImxvY2FsZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcIm1lc3NhZ2VzLmphLUpQLmpzb25cIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIsIGJvbTogZmFsc2UsIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgLy8gcmVtb3ZlIC5naXRrZWVwXHJcbiAgICAgICAgICAgIGZzLnVubGlua1N5bmMocGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5yZXMsXHJcbiAgICAgICAgICAgICAgICBcIi5naXRrZWVwXCJcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB7Ly8gcGF0Y2guZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyYy9fcGF0Y2guZGVwZW5kZW5jaWVzXCIpLCBcIl9pbmRleC5kLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5leHRlcm5hbCxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJwYXRjaC5kZXBlbmRlbmNpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICBcImluZGV4LmQudHNcIlxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBoYW1tZXJqczogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImhhbW1lcmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIGZsaXBzbmFwOiB0aGlzLmlzSW5zdGFsbGF0aW9uVGFyZ2V0KFwiZmxpcHNuYXBcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgaXNjcm9sbDogdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImlzY3JvbGxcIiksXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAvLyBjb3B5IHBhdGNoIGQudHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJoYW1tZXJqc1wiKSkge1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmModGVtcGxhdGVQYXRoKFwibW9iaWxlL3NyYy9fcGF0Y2guZGVwZW5kZW5jaWVzL2pxdWVyeS5oYW1tZXIuZC50c1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0Y2guZGVwZW5kZW5jaWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianF1ZXJ5LmhhbW1lci5kLnRzXCJcclxuICAgICAgICAgICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImZsaXBzbmFwXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvc3JjL19wYXRjaC5kZXBlbmRlbmNpZXMvZmxpcHNuYXAuZC50c1wiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGF0Y2guZGVwZW5kZW5jaWVzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmxpcHNuYXAuZC50c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJpc2Nyb2xsXCIpKSB7XHJcbiAgICAgICAgICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvc3JjL19wYXRjaC5kZXBlbmRlbmNpZXMvaXNjcm9sbC5kLnRzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZXh0ZXJuYWwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50eXBlcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXRjaC5kZXBlbmRlbmNpZXNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpc2Nyb2xsLmQudHNcIlxyXG4gICAgICAgICAgICAgICAgICAgICkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZW1vdmUgLmdpdGtlZXBcclxuICAgICAgICAgICAgZnMudW5saW5rU3luYyhwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3REaXIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLmV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnR5cGVzLFxyXG4gICAgICAgICAgICAgICAgXCIuZ2l0a2VlcFwiXHJcbiAgICAgICAgICAgICkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgey8vIGluZGV4Lmh0bWxcclxuICAgICAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgICAgIHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvc3JjXCIpLCBcIl9pbmRleC5odG1sXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyYywgXCJpbmRleC5odG1sXCIpLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5jb25maWdcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWaXN1YWwgU3R1ZGlvIOOBruOCveODquODpeODvOOCt+ODp+ODs+ODleOCoeOCpOODq+S9nOaIkFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFzeW5jIGNyZWF0ZVZpc3VhbFN0dWRpb1NvbHV0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGNvbnN0IHZzUGFyYW0gPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbTogSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbiA9IDxhbnk+JC5leHRlbmQoe30sIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcpO1xyXG5cclxuICAgICAgICAgICAgcGFyYW0ucHJvamVjdE5hbWUgPSB0aGlzLl9jb25maWcucHJvamVjdE5hbWU7XHJcbiAgICAgICAgICAgIHBhcmFtLnByb2plY3RHVUlEID0gY3JlYXRlR1VJRCgpO1xyXG4gICAgICAgICAgICBwYXJhbS50eXBlcyA9IHBhcmFtLnR5cGVzLnJlcGxhY2UoXCJAXCIsIFwiJTQwXCIpOyAvLyBlc2NhcGUgXCJAXCIgdG8gXCIlNDBcIlxyXG4gICAgICAgICAgICBwYXJhbS5saWNlbnNlID0gIXRoaXMuX2NvbmZpZy5wcml2YXRlO1xyXG5cclxuICAgICAgICAgICAgLy8gZXh0ZXJuYWxcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmNvcmRvdmEgICAgPSB0aGlzLmlzRW5hYmxlQ29yZG92YSgpO1xyXG4gICAgICAgICAgICAoPGFueT5wYXJhbSkuaG9nYW4gICAgICA9IHRoaXMuaXNJbnN0YWxsYXRpb25UYXJnZXQoXCJob2dhbi5qc1wiKTtcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmhhbW1lcmpzICAgPSB0aGlzLmlzSW5zdGFsbGF0aW9uVGFyZ2V0KFwiaGFtbWVyanNcIik7XHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5pc2Nyb2xsICAgID0gdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImlzY3JvbGxcIik7XHJcbiAgICAgICAgICAgICg8YW55PnBhcmFtKS5mbGlwc25hcCAgID0gdGhpcy5pc0luc3RhbGxhdGlvblRhcmdldChcImZsaXBzbmFwXCIpO1xyXG5cclxuICAgICAgICAgICAgLy8gcHJvamVjdCBzdHJ1Y3R1cmVcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmVuYWJsZUxpYiAgICAgID0gdGhpcy5oYXNTdHJ1Y3R1cmVPZihcImxpYlwiKTtcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLmVuYWJsZVBvcnRpbmcgID0gdGhpcy5oYXNTdHJ1Y3R1cmVPZihcInBvcnRpbmdcIik7XHJcblxyXG4gICAgICAgICAgICAvLyBwbGF0Zm9ybXNcclxuICAgICAgICAgICAgKDxhbnk+cGFyYW0pLnBsYXRmb3JtcyA9IFsuLi50aGlzLmNvbmZpZy5wbGF0Zm9ybXNdO1xyXG5cclxuICAgICAgICAgICAgLy8gc2V0dXAgYnVpbHQgdHMgZ3JvdXBcclxuICAgICAgICAgICAgcGFyYW0udHNHcm91cCA9IFtdO1xyXG4gICAgICAgICAgICBnbG9iLnN5bmMoXCIqKi8qLnRzXCIsIHtcclxuICAgICAgICAgICAgICAgIGN3ZDogcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vdERpcixcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zcmMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW0uc3JjQ29uZmlnLnNjcmlwdFxyXG4gICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfSkuZm9yRWFjaCgoZmlsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVsYXRpdmVQYXRoID0gcGF0aC5qb2luKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnNyYyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbS5zcmNDb25maWcuc2NyaXB0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguZGlybmFtZShmaWxlKVxyXG4gICAgICAgICAgICAgICAgKS5yZXBsYWNlKC9cXC8vZywgXCJcXFxcXCIpICsgXCJcXFxcXCI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmaWxlTmFtZSA9IHBhdGguYmFzZW5hbWUoZmlsZSwgXCIudHNcIik7XHJcbiAgICAgICAgICAgICAgICBwYXJhbS50c0dyb3VwLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbGF0aXZlUGF0aDogcmVsYXRpdmVQYXRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBkZXBlbmRlZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLyBzZXR1cCB0ZXN0IHRzIGdyb3VwXHJcbiAgICAgICAgICAgIGdsb2Iuc3luYyhcIioqLyoudHNcIiwge1xyXG4gICAgICAgICAgICAgICAgY3dkOiBwYXRoLmpvaW4oXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb290RGlyLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidW5pdFwiXHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9KS5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwYXJhbS50ZXN0ICsgXCJcXFxcdW5pdFxcXFxcIjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZpbGVOYW1lID0gcGF0aC5iYXNlbmFtZShmaWxlLCBcIi50c1wiKTtcclxuICAgICAgICAgICAgICAgIHBhcmFtLnRzR3JvdXAucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVsYXRpdmVQYXRoOiByZWxhdGl2ZVBhdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsZU5hbWU6IGZpbGVOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlcGVuZGVlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1hcDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbTtcclxuICAgICAgICB9KSgpO1xyXG5cclxuICAgICAgICAvLyAuc2xuXHJcbiAgICAgICAgY29weVRwbChcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRlbXBsYXRlUGF0aChcImJhc2UvdmlzdWFsLnN0dWRpb1wiKSwgXCJfc29sdXRpb24uc2xuLnRwbFwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKHRoaXMucm9vdERpciwgdnNQYXJhbS5wcm9qZWN0TmFtZSArIFwiLnNsblwiKSxcclxuICAgICAgICAgICAgdnNQYXJhbSxcclxuICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIC8vIC5jc3Byb2pcclxuICAgICAgICAoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0b1htbFN0cmluZyA9IChmaWxlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgICAgICAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIGRlbGltaXRlcnM6IFwie3sgfX1cIixcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKGZpbGUpLnRvU3RyaW5nKCksIHsgZW9sOiBcIlxcblwiLCBib206IGZhbHNlIH0pLCBvcHRpb25zKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBqc3QucmVuZGVyKHZzUGFyYW0pO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdG9YbWxET00gPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnBhcnNlWE1MKHRvWG1sU3RyaW5nKGZpbGUpKSk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0b1htbE5vZGUgPSAoZmlsZTogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyMlhtbE5vZGUodG9YbWxTdHJpbmcoZmlsZSkpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJHByb2ogPSB0b1htbERPTShwYXRoLmpvaW4odGVtcGxhdGVQYXRoKFwibW9iaWxlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3Byb2plY3QuY3Nwcm9qLnRwbFwiKSk7XHJcbiAgICAgICAgICAgIGNvbnN0ICRncFRTID0gdG9YbWxOb2RlKHBhdGguam9pbih0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Zpc3VhbC5zdHVkaW9cIiksIFwiX3RzLml0ZW0uZ3JvdXAudHBsXCIpKTtcclxuXHJcbiAgICAgICAgICAgICRwcm9qXHJcbiAgICAgICAgICAgICAgICAuZmluZChcIkl0ZW1Hcm91cFwiKVxyXG4gICAgICAgICAgICAgICAgLmxhc3QoKVxyXG4gICAgICAgICAgICAgICAgLmFmdGVyKCRncFRTKVxyXG4gICAgICAgICAgICAgICAgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZHN0UGF0aCA9IHBhdGguam9pbih0aGlzLnJvb3REaXIsIHZzUGFyYW0ucHJvamVjdE5hbWUgKyBcIi5jc3Byb2pcIik7XHJcbiAgICAgICAgICAgIGRlYnVnKHhtbE5vZGUyU3RyKCRwcm9qKSk7XHJcbiAgICAgICAgICAgIGZzLndyaXRlRmlsZVN5bmMoZHN0UGF0aCwgZm9ybWF0WE1MKHhtbE5vZGUyU3RyKCRwcm9qKSkpO1xyXG4gICAgICAgIH0pKCk7XHJcblxyXG4gICAgICAgIC8vIHdlYi5jb25maWdcclxuICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdmlzdWFsLnN0dWRpby9fd2ViLmNvbmZpZ1wiKSwgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ3ZWIuY29uZmlnXCIpKTtcclxuICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdmlzdWFsLnN0dWRpby9fd2ViLkRlYnVnLmNvbmZpZ1wiKSwgcGF0aC5qb2luKHRoaXMucm9vdERpciwgXCJ3ZWIuRGVidWcuY29uZmlnXCIpKTtcclxuICAgICAgICBmcy5jb3B5U3luYyh0ZW1wbGF0ZVBhdGgoXCJtb2JpbGUvdmlzdWFsLnN0dWRpby9fd2ViLlJlbGVhc2UuY29uZmlnXCIpLCBwYXRoLmpvaW4odGhpcy5yb290RGlyLCBcIndlYi5SZWxlYXNlLmNvbmZpZ1wiKSk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL21vYmlsZS9nZW5lcmF0b3ItY29yZG92YS50cyIsImltcG9ydCB7IEdlbmVyYXRvckJhc2UsIElQcm9qZWN0Q29uZmlncmF0aW9uIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgR2VuZXJhdG9yRWxlY3Ryb24gfSBmcm9tIFwiLi9nZW5lcmF0b3ItZWxlY3Rvcm9uXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL2dlbmVyYXRvci1lbGVjdG9yb25cIjtcclxuXHJcbi8qKlxyXG4gKiBnZW5lcmF0b3Ig55Sf5oiQ6Zai5pWwXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbmV3R2VuZXJhdG9yRGVza3RvcChjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogR2VuZXJhdG9yQmFzZSB7XHJcbiAgICByZXR1cm4gbmV3IEdlbmVyYXRvckVsZWN0cm9uKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Rlc2t0b3AvaW5kZXgudHMiLCIvKiB0c2xpbnQ6ZGlzYWJsZTpuby11bnVzZWQtdmFyaWFibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cclxuXHJcbmltcG9ydCB7IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uLCBHZW5lcmF0b3JCYXNlIH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHsgSURlc2t0b3BBcHBDb25maWdyYXRpb24gfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG4vKipcclxuICogQGNsYXNzIEdlbmVyYXRvckVsZWN0cm9uXHJcbiAqIEBicmllZiBEZXNrdG9wIEVsZWN0cm9uIOeUqCBHZW5lcmF0b3Ig44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgR2VuZXJhdG9yRWxlY3Ryb24gZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3cvYXBwXCIsIC8vIFRPRE86IOaaq+WumlxyXG4gICAgICAgICAgICBidWlsdDogXCJhcHBcIixcclxuICAgICAgICAgICAgZG9jOiBcImRvY3NcIixcclxuICAgICAgICAgICAgdGFzazogXCJ0YXNrc1wiLFxyXG4gICAgICAgICAgICB0ZXN0OiBcInRlc3RzXCIsXHJcbiAgICAgICAgICAgIHR5cGVzOiBcIkB0eXBlc1wiLFxyXG4gICAgICAgICAgICBzcmNDb25maWc6IHtcclxuICAgICAgICAgICAgICAgIHNjcmlwdDogXCJzY3JpcHRzXCIsXHJcbiAgICAgICAgICAgICAgICBzdHlsZXNoZWV0OiBcInN0eWxlc2hlZXRzXCIsXHJcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCJ0ZW1wbGF0ZXNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJRGVza3RvcEFwcENvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSURlc2t0b3BBcHBDb25maWdyYXRpb24ge1xyXG4gICAgICAgIHJldHVybiA8SURlc2t0b3BBcHBDb25maWdyYXRpb24+dGhpcy5fY29uZmlnO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi8uLi9zcmMvZ2VuZXJhdG9ycy9kZXNrdG9wL2dlbmVyYXRvci1lbGVjdG9yb24udHMiLCJpbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7IEdlbmVyYXRvckJyb3dzZXIgfSBmcm9tIFwiLi9nZW5lcmF0b3ItYnJvd3NlclwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9nZW5lcmF0b3ItYnJvd3NlclwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3JXZWIoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgcmV0dXJuIG5ldyBHZW5lcmF0b3JCcm93c2VyKGNvbmZpZyk7XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL3dlYi9pbmRleC50cyIsIi8qIHRzbGludDpkaXNhYmxlOm5vLXVudXNlZC12YXJpYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xyXG5cclxuaW1wb3J0IHsgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sIEdlbmVyYXRvckJhc2UgfSBmcm9tIFwiLi4vYmFzZVwiO1xyXG5pbXBvcnQgeyBJV2ViQXBwQ29uZmlncmF0aW9uIH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCcm93c2VyXHJcbiAqIEBicmllZiBXZWIgQnJvd3NlciDnlKggR2VuZXJhdG9yIOOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIEdlbmVyYXRvckJyb3dzZXIgZXh0ZW5kcyBHZW5lcmF0b3JCYXNlIHtcclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gaW1wcmVtZW50ZXM6IEdlbmVyYXRvckJhc2VcclxuXHJcbiAgICAvKipcclxuICAgICAqIOaXouWumuOBriBkaXJlY3Rvcnkg5qeL6YCg44KS6L+U5Y20XHJcbiAgICAgKi9cclxuICAgIGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzcmM6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIHBrZzogXCJ3d3dcIixcclxuICAgICAgICAgICAgYnVpbHQ6IFwiYXBwXCIsXHJcbiAgICAgICAgICAgIGRvYzogXCJkb2NzXCIsXHJcbiAgICAgICAgICAgIHRhc2s6IFwidGFza3NcIixcclxuICAgICAgICAgICAgdGVzdDogXCJ0ZXN0c1wiLFxyXG4gICAgICAgICAgICB0eXBlczogXCJAdHlwZXNcIixcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY3JlYXRlIGFjdGlvbiBlbnRyeVxyXG4gICAgICogQHBhcmFtIHtJTGlicmFyeUNvbmZpZ3JhdGlvbn0gY29uZmlnIOOCs+ODs+ODleOCo+OCsOioreWumlxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgLy8gVE9ETzpcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmRlciBjb25zdHJ1Y3Rpb24uXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICAgKi9cclxuICAgIGdldCB0YXNrTGlzdCgpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgXCJiYW5uZXIuanNcIixcclxuICAgICAgICAgICAgXCJjbGVhbi5qc1wiLFxyXG4gICAgICAgICAgICBcInNyY21hcC5qc1wiLFxyXG4gICAgICAgICAgICBcImJ1aWxkLXRzLWNsZWFuLmpzXCIsXHJcbiAgICAgICAgICAgIFwiYnVpbGQtdHMtbm9ybWFsaXplLmpzXCIsXHJcbiAgICAgICAgXTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHJpdmF0ZSBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogY29uZmlncmF0aW9uIOOBq+OCouOCr+OCu+OCuVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldCBjb25maWcoKTogSVdlYkFwcENvbmZpZ3JhdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxJV2ViQXBwQ29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvd2ViL2dlbmVyYXRvci1icm93c2VyLnRzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb24sXHJcbiAgICBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbixcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSUxpYnJhcnlDb25maWdyYXRpb24sXHJcbiAgICBJRXh0ZXJuYWxNb2R1bGVJbmZvLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlcyxcclxuICAgIElNb2JpbGVBcHBDb25maWdyYXRpb24sXHJcbiAgICBJRGVza3RvcEFwcENvbmZpZ3JhdGlvbixcclxuICAgIElXZWJBcHBDb25maWdyYXRpb24sXHJcbiAgICAvLy8vXHJcbiAgICBuZXdHZW5lcmF0b3JcclxufSBmcm9tIFwiLi9nZW5lcmF0b3JzXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgSVNvdXJjZURpcmN0b3J5Q29uZmlncmF0aW9uLFxyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJUHJvamVjdENvbmZpZ3JhdGlvbixcclxuICAgIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbixcclxuICAgIElMaWJyYXJ5Q29uZmlncmF0aW9uLFxyXG4gICAgSUV4dGVybmFsTW9kdWxlSW5mbyxcclxuICAgIElFeHRlcm5hbE1vZHVsZXMsXHJcbiAgICBJTW9iaWxlQXBwQ29uZmlncmF0aW9uLFxyXG4gICAgSURlc2t0b3BBcHBDb25maWdyYXRpb24sXHJcbiAgICBJV2ViQXBwQ29uZmlncmF0aW9uLFxyXG59O1xyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgQ0RQTGliXHJcbiAqIEBicmllZiBDRFAgYm9pbGVycGxhdGUg55Sf5oiQ5qmf6IO944KS5o+Q5L6b44GZ44KL44Kv44Op44K5XHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDRFBMaWIge1xyXG5cclxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbiAgICAvLyBwdWJpYyBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbWFpbiBjb21tYW5kXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZXhlY3V0ZShjb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgVXRpbHMuc2V0U2V0dGluZ3MoY29uZmlnLnNldHRpbmdzKTtcclxuICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yKGNvbmZpZykucnVuKCk7XHJcbiAgICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9jZHAtbGliLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImZzLWV4dHJhXCIsXCJjb21tb25qczJcIjpcImZzLWV4dHJhXCJ9XG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn1cbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImhvZ2FuLmpzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIkhvZ2FuXCIsXCJjb21tb25qc1wiOlwiaG9nYW4uanNcIixcImNvbW1vbmpzMlwiOlwiaG9nYW4uanNcIixcImFtZFwiOlwiaG9nYW4uanNcIn1cbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZGFzaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwibG9kYXNoXCIsXCJjb21tb25qczJcIjpcImxvZGFzaFwifVxuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidW5kZXJzY29yZS5zdHJpbmdcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCIsXCJjb21tb25qczJcIjpcInVuZGVyc2NvcmUuc3RyaW5nXCJ9XG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGljaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwid2hpY2hcIixcImNvbW1vbmpzMlwiOlwid2hpY2hcIn1cbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInV1aWRcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInV1aWRcIixcImNvbW1vbmpzMlwiOlwidXVpZFwifVxuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNoYWxrXCIsXCJjb21tb25qczJcIjpcImNoYWxrXCJ9XG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZW12ZXItcmVnZXhcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInNlbXZlci1yZWdleFwiLFwiY29tbW9uanMyXCI6XCJzZW12ZXItcmVnZXhcIn1cbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsaS1zcGlubmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjbGktc3Bpbm5lclwiLFwiY29tbW9uanMyXCI6XCJjbGktc3Bpbm5lclwifVxuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ4bWxkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn1cbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpxdWVyeVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuaW1wb3J0IHsgc3Bhd24sIFNwYXduT3B0aW9ucyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBob2dhbixcclxuICAgICQsXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBTcGlubmVyLFxyXG59IGZyb20gXCIuL2xpYnNcIjtcclxuXHJcbmltcG9ydCB7XHJcbiAgICBhc3NlcnQsXHJcbiAgICBnZXRMaWJQYXRoLFxyXG59IGZyb20gXCIuL3NldHRpbmdzXCI7XHJcblxyXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4vLyBleHBvcnRzIG1ldGhvZHM6XHJcblxyXG4vKipcclxuICogSGFuZGxlIGNvbW1hbmQgbGluZSBlcnJvciBhbmQga2lsbCBwcm9jZXNzLlxyXG4gKiBXaGVuIHRoZSBhcHBsaWNhdGlvbiByZWNlaXZlZCBlcnJvciBmcm9tIGNsaSwgcGxlYXNlIGNhbGwgdGhpcyBtZXRob2QuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBlcnJvciAgZXJyb3IgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlRXJyb3IoZXJyb3I6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgYXNzZXJ0KGZhbHNlLCBlcnJvcik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogXCJ0ZW1wbGF0ZXNcIiDjg4fjgqPjg6zjgq/jg4jjg6rjgYvjgonjga7jg5HjgrnjgpLlj5blvpcuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdGFyZ2V0IOOCv+ODvOOCsuODg+ODiOOCkuaMh+Wumi4gbnVsbCDjga7loLTlkIjjga/jgIF0ZW1wbGF0ZXMg44KS6L+U5Y20XHJcbiAqIEByZXR1cm4ge1N0cmluZ30gdGVtcGxhdGVzL2hvZ2Vob2dlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gdGVtcGxhdGVQYXRoKHRhcmdldDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGlmIChudWxsID09IHRhcmdldCkge1xyXG4gICAgICAgIHJldHVybiBwYXRoLmpvaW4oZ2V0TGliUGF0aCgpLCBcInRlbXBsYXRlc1wiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIHBhdGguam9pbihnZXRMaWJQYXRoKCksIFwidGVtcGxhdGVzXCIsIHRhcmdldCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR2V0IHNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqIENMSSBoZWxwZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gIFtmb3JtYXRdICBzcGlubmVyIGZvcm1hdCBzdHJpbmcuXHJcbiAqIEBwYXJhbSAge051bWJlcn0gIFtpbmRleF0gICBzcGlubmVyIGluZGV4IGRlZmluZWQgYnkgY2xpLXNwaW5uZXIuIChkZWZhdWx0OiByYW5kb20gWzAtMjldKVxyXG4gKiBAcmV0dXJuIHtTcGlubmVyfSBjbGktc3Bpbm5lciBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGlubmVyKGZvcm1hdD86IHN0cmluZywgaW5kZXg/OiBudW1iZXIpOiB7IHN0YXJ0OiAoKSA9PiB2b2lkOyBzdG9wOiAoY2xlYW4/OiBib29sZWFuKSA9PiB2b2lkOyB9IHtcclxuICAgIGNvbnN0IHNwaW5uZXJzID0gW1xyXG4gICAgICAgIFwifC8tXFxcXFwiLFxyXG4gICAgICAgIFwi4pSk4pSY4pS04pSU4pSc4pSM4pSs4pSQXCIsXHJcbiAgICAgICAgXCLil6Lil6Pil6Til6VcIixcclxuICAgICAgICBcIuKWjOKWgOKWkOKWhFwiLFxyXG4gICAgICAgIFwi4paJ4paK4paL4paM4paN4paO4paP4paO4paN4paM4paL4paK4paJXCIsXHJcbiAgICAgICAgXCLiloHiloPiloTiloXilobilofilojilofilobiloXiloTiloNcIixcclxuICAgICAgICBcIuKYseKYsuKYtFwiLFxyXG4gICAgICAgIFwiLm9PQCpcIixcclxuICAgICAgICBcIuKXkOKXk+KXkeKXklwiLFxyXG4gICAgICAgIC8vLy9cclxuICAgICAgICBcIuKXoeKXoSDiipniipkg4peg4pegXCIsXHJcbiAgICAgICAgXCLilqDilqHilqrilqtcIixcclxuICAgICAgICBcIuKGkOKGluKGkeKGl+KGkuKGmOKGk+KGmVwiLFxyXG4gICAgICAgIFwiLm9PwrBPby5cIixcclxuICAgIF07XHJcbiAgICBjb25zdCBmbXQgPSBmb3JtYXQgfHwgXCIlc1wiO1xyXG4gICAgY29uc3Qgc3Bpbm5lciA9IG5ldyBTcGlubmVyKGZtdCk7XHJcbiAgICBjb25zdCBpZHggPSAobnVsbCAhPSBpbmRleCAmJiAwIDw9IGluZGV4ICYmIGluZGV4IDwgMTQpID8gaW5kZXggOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICBzcGlubmVyLnNldFNwaW5uZXJTdHJpbmcoc3Bpbm5lcnNbaWR4XSk7XHJcbiAgICByZXR1cm4gc3Bpbm5lcjtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIE5vcm1hbGl6ZVRleHRPcHRpb25zXHJcbiAqIEBicmllZiBub3JtYWxpemVUZXh0KCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIGVvbD86IHN0cmluZzsgICAvLyBkZWZhdWx0OiBvcy5FT0xcclxuICAgIGJvbT86IGJvb2xlYW47ICAvLyBkZWZhdWx0OiB0cnVlXHJcbiAgICB0YWI/OiBudW1iZXI7ICAgLy8gdGFiIOOCkuWkieaPm+OBmeOCi+OCueODmuODvOOCueOBruaVsOOCkuaMh+Wumi4gZGVmYXVsdDog5aSJ5o+b44GX44Gq44GEXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBOb3JtYWxpemUgdGV4dCBsaW5lLWZlZWQuXHJcbiAqIGZvciB3aW5kb3dzIGdpdCB1c2VyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICAgICAgdGV4dCAgICAgIGlucHV0IHRleHQuXHJcbiAqIEBwYXJhbSAge05vcm1hbGl6ZVRleHRPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9uLlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IG5vcm1hbGl6ZWQgdGV4dC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVUZXh0KHRleHQ6IHN0cmluZywgb3B0aW9ucz86IE5vcm1hbGl6ZVRleHRPcHRpb25zKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG9wdDogTm9ybWFsaXplVGV4dE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIHRleHQgPSB0ZXh0XHJcbiAgICAgICAgLnJlcGxhY2UoL15cXHVmZWZmL2dtLCBcIlwiKSAgIC8vIHJlbW92ZSBib21cclxuICAgICAgICAucmVwbGFjZSgvXFxyXFxuL2dtLCBcIlxcblwiKSAgICAvLyBvbmNlIFwiXFxuXCJcclxuICAgICAgICAucmVwbGFjZSgvXFxyL2dtLCBcIlxcblwiKVxyXG4gICAgO1xyXG5cclxuICAgIGlmIChvcHQuYm9tKSB7XHJcbiAgICAgICAgdGV4dCA9IFwiXFx1ZmVmZlwiICsgdGV4dDtcclxuICAgIH1cclxuICAgIGlmIChcIlxcblwiICE9PSBvcHQuZW9sKSB7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2dtLCBvcHQuZW9sKTtcclxuICAgIH1cclxuICAgIGlmIChvcHQudGFiKSB7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdC50YWI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nbSwgc3BhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9uc1xyXG4gKiBAYnJpZWYgZXhlY0NvbW1hbmQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zIGV4dGVuZHMgU3Bhd25PcHRpb25zIHtcclxuICAgIHNwaW5uZXI/OiB7XHJcbiAgICAgICAgZm9ybWF0Pzogc3RyaW5nOyAgICAvLyBleCkgXCIlc1wiXHJcbiAgICAgICAgaW5kZXg/OiBudW1iZXI7ICAgICAvLyAwIC0gOSDjga7mlbDlgKTjgpLmjIflrppcclxuICAgIH07XHJcbiAgICBzdGRvdXQ/OiAoZGF0YTogc3RyaW5nKSA9PiB2b2lkO1xyXG4gICAgc3RkZXJyPzogKGRhdGE6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGUgY29tbWFuZCBsaW5lIGJ5IHNwYXduLlxyXG4gKiBjYWxsIHNwYXduLiBpZiBlcnJvciBvY2N1cmVkLCBjdWkgaXMga2lsbGVkIHByb2NjZXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgICAgICAgIGNvbW1hbmQgICAgbWFpbiBjb21tYW5kLiBleCkgXCJjb3Jkb3ZhXCJcclxuICogQHBhcmFtICAge1N0cmluZ1tdfSAgICAgICAgICAgICBhcmdzICAgICAgIGNvbW1hbmQgYXJncy4gZXgpIFtcInBsdWdpblwiLCBcImFkZFwiLCBwbHVnaW5OYW1lXVxyXG4gKiBAcGFyYW0gICB7RXhlY0NvbW1hbmRPcHRpb25zfSAgIFtvcHRpb25zXSAgY2xpLXNwaW5uZXJcInMgb3B0aW9ucy5cclxuICogQHJldHVybnMge051bWJlcn0gZXJyb3IgY29kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBFeGVjQ29tbWFuZE9wdGlvbnMpOiBQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCBvcHQ6IEV4ZWNDb21tYW5kT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgICAgIHN0ZGlvOiBcImluaGVyaXRcIixcclxuICAgICAgICAgICAgc3Bpbm5lcjogeyBmb3JtYXQ6IFwiJXNcIiB9LFxyXG4gICAgICAgICAgICBzdGRvdXQ6IChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHsgLyogbm9vcCAqLyB9LFxyXG4gICAgICAgICAgICBzdGRlcnI6IChkYXRhOiBzdHJpbmcpOiB2b2lkID0+IHsgLyogbm9vcCAqLyB9LFxyXG4gICAgICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICB3aGljaChjb21tYW5kLCAoZXJyb3IsIHJlc29sdmVkQ29tbWFuZCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBvcHQuc3Bpbm5lciA/IGdldFNwaW5uZXIob3B0LnNwaW5uZXIuZm9ybWF0LCBvcHQuc3Bpbm5lci5pbmRleCkgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZCA9IHNwYXduKHJlc29sdmVkQ29tbWFuZCwgYXJncywgb3B0KVxyXG4gICAgICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgaGFuZGxlRXJyb3IpXHJcbiAgICAgICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShjb2RlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgaWYgKFwicGlwZVwiID09PSBvcHQuc3RkaW8pIHtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnN0ZG91dC5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHQuc3Rkb3V0KGRhdGEudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGNoaWxkLnN0ZGVyci5vbihcImRhdGFcIiwgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBvcHQuc3RkZXJyKGRhdGEudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zXHJcbiAqIEBicmllZiBjb3B5VHBsKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBkZWxpbWl0ZXJzPzogXCJ7eyB9fVwiIHwgXCI8JSAlPlwiOyAvLyB0ZW1wbGF0ZSDjgavkvb/nlKjjgZnjgosgZGVsaW1pdGVyLiBkZWZhdWx0OiBcInt7IH19XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGVtcGxhdGUgd2l0aCBob2dhbi5cclxuICogc3luYyBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBzcmMgICAgICAgc291cmNlIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgZHN0ICAgICAgIGRlc3RpbmF0aW9uIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgICAgcGFyYW1zICAgIHRlbXBsYXRlIHBhcmFtZXRlcnMuXHJcbiAqIEBwYXJhbSB7Q29weVRlbXBsYXRlT3B0aW9uc30gIFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5VHBsKHNyYzogc3RyaW5nLCBkc3Q6IHN0cmluZywgcGFyYW1zOiBPYmplY3QsIG9wdGlvbnM/OiBDb3B5VGVtcGxhdGVPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHQgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKHNyYykudG9TdHJpbmcoKSwgeyBlb2w6IFwiXFxuXCIsIGJvbTogZmFsc2UgfSksIG9wdCk7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBub3JtYWxpemVUZXh0KGpzdC5yZW5kZXIocGFyYW1zKSwgb3B0KTtcclxuXHJcbiAgICBmcy5lbnN1cmVGaWxlU3luYyhkc3QpO1xyXG4gICAgZnMud3JpdGVGaWxlU3luYyhkc3QsIG91dHB1dCwgXCJ1dGY4XCIpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdVSUQgZ2VuZXJhdGUuXHJcbiAqIHJldHVybmVkIGFzIFdpbmRvd3MgcmVnaXN0cnkgdHlwZSBmb3JtYXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHVUlEKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJ7XCIgKyB1dWlkLnY0KCkudG9VcHBlckNhc2UoKSArIFwifVwiO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAgIHN0ciAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEByZXR1cm5zIFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyMlhtbE5vZGUoc3RyOiBzdHJpbmcpOiBKUXVlcnkge1xyXG4gICAgbGV0IGZ1bGxYTUwgPSB0cnVlO1xyXG4gICAgaWYgKCEvPD94bWwvaS50ZXN0KHN0cikpIHtcclxuICAgICAgICBmdWxsWE1MID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBjb25zdCAkeG1sID0gJCgkLnBhcnNlWE1MKHN0cikpO1xyXG4gICAgcmV0dXJuIGZ1bGxYTUwgPyAkeG1sIDogJHhtbC5jaGlsZHJlbigpO1xyXG59XHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBzdHJpbmcgZnJvbSBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJuIHtqUXVlcnl9IFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24geG1sTm9kZTJTdHIoJHhtbDogSlF1ZXJ5KTogc3RyaW5nIHtcclxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXHJcbiAgICByZXR1cm4gbmV3IFhNTFNlcmlhbGl6ZXIoKS5zZXJpYWxpemVUb1N0cmluZygkeG1sWzBdKTtcclxuICAgIC8qIGVzbGludC1lbmFibGUgbm8tdW5kZWYgKi9cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9uc1xyXG4gKiBAYnJpZWYgZm9ybWF0WE1MKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBzdGVwPzogbnVtYmVyOyAgIC8vIOepuueZveOCueODmuODvOOCueaVsC4gZGVmYXVsdDogMlxyXG59XHJcblxyXG4vKipcclxuICogWE1MIGZvcm1hdHRlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgc3RyICAgICAgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcGFyYW0gIHtGb3JtYXRYbWxPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIFhNTFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFhNTChzdHI6IHN0cmluZywgb3B0aW9ucz86IEZvcm1hdFhtbE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBGb3JtYXRYbWxPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgc3RlcDogMixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgbGV0IHhtbCA9IFwiXCI7XHJcbiAgICBsZXQgcGFkID0gMDtcclxuICAgIGxldCBpbmRlbnQ6IG51bWJlcjtcclxuICAgIGxldCBub2RlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3Qgc3RyQXJyID0gbm9ybWFsaXplVGV4dChzdHIsIHsgZW9sOiBcIlxcblwiIH0pXHJcbiAgICAgICAgLnJlcGxhY2UoLyg+KSg8KShcXC8qKS9nLCBcIiQxXFxuJDIkM1wiKSAvLyBpbnNlcnQgTEYgdG8gZWFjaCBub2RlIG9uY2UuXHJcbiAgICAgICAgLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IHNwYWNlcyA9IChsZW46IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICBjb25zdCBfaW5kZW50ID0gbGVuICogb3B0LnN0ZXA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICBub2RlID0gJC50cmltKHN0ckFycltpXSk7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0Y2goLy4rPFxcL1xcd1tePl0qPiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXC9cXHcvKSkge1xyXG4gICAgICAgICAgICBpZiAocGFkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGFkIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFx3W14+XSpbXi9dPi4qJC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgeG1sICs9IHNwYWNlcyhwYWQpICsgbm9kZSArIFwiXFxuXCI7XHJcbiAgICAgICAgcGFkICs9IGluZGVudDtcclxuICAgIH1cclxuXHJcbiAgICB4bWwgPSB4bWxcclxuICAgICAgICAucmVwbGFjZSgvXFxuXFxuL2dtLCBcIlxcblwiKVxyXG4gICAgICAgIC5yZXBsYWNlKC9eICtcXG4vZ20sIFwiXCIpXHJcbiAgICAgICAgO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVUZXh0KHhtbCwgb3B0KTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3Rvb2xzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcIi4uL3V0aWxzL3NldHRpbmdzXCI7XHJcblxyXG5pbXBvcnQgeyBHZW5lcmF0b3JCYXNlLCBJUHJvamVjdENvbmZpZ3JhdGlvbiB9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTGlicmFyeSB9IGZyb20gXCIuL2xpYnJhcnlcIjtcclxuaW1wb3J0IHsgbmV3R2VuZXJhdG9yTW9iaWxlIH0gZnJvbSBcIi4vbW9iaWxlXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvckRlc2t0b3AgfSBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmltcG9ydCB7IG5ld0dlbmVyYXRvcldlYiB9IGZyb20gXCIuL3dlYlwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vYmFzZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9saWJyYXJ5XCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL21vYmlsZVwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9kZXNrdG9wXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3dlYlwiO1xyXG5cclxuLyoqXHJcbiAqIGdlbmVyYXRvciDnlJ/miJDplqLmlbBcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBuZXdHZW5lcmF0b3IoY29uZmlnOiBJUHJvamVjdENvbmZpZ3JhdGlvbik6IEdlbmVyYXRvckJhc2Uge1xyXG4gICAgc3dpdGNoIChjb25maWcucHJvamVjdFR5cGUpIHtcclxuICAgICAgICBjYXNlIFwibGlicmFyeVwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yTGlicmFyeShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJtb2JpbGVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmVyYXRvck1vYmlsZShjb25maWcpO1xyXG4gICAgICAgIGNhc2UgXCJkZXNrdG9wXCI6XHJcbiAgICAgICAgICAgIHJldHVybiBuZXdHZW5lcmF0b3JEZXNrdG9wKGNvbmZpZyk7XHJcbiAgICAgICAgY2FzZSBcIndlYlwiOlxyXG4gICAgICAgICAgICByZXR1cm4gbmV3R2VuZXJhdG9yV2ViKGNvbmZpZyk7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCBcInVuc3VwcG9ydGVkIHByb2plY3Qga2luZDogXCIgKyBjb25maWcucHJvamVjdFR5cGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL2dlbmVyYXRvcnMvaW5kZXgudHMiLCJpbXBvcnQgKiBhcyBVdGlscyBmcm9tIFwiLi4vLi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44K944O844K544OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBzY3JpcHQ/OiBzdHJpbmc7ICAgICAgICAgICAgLy8ganModHMpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgc3R5bGVzaGVldD86IHN0cmluZzsgICAgICAgIC8vIGNzcyhjc3MpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG4gICAgdGVtcGxhdGU/OiBzdHJpbmc7ICAgICAgICAgIC8vIGh0bWwodGVtcGxhdGUpIOODleOCoeOCpOODq+S/neWtmOWFiFxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI44OH44Kj44Os44Kv44OI44Oq44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHNyYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44K944O844K544Kz44O844OJ44Gu44Or44O844OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBwa2c/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODkeODg+OCseODvOOCuOWFiOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgYnVpbHQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjgrPjg7Pjg5HjgqTjg6vlhYjjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGRvYz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44OJ44Kt44Ol44Oh44Oz44OI44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICB0YXNrPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCv+OCueOCr+ODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgdGVzdD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg4bjgrnjg4jjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHR5cGVzPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCDlnovlrprnvqnjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHRlbXA/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5L2c5qWt44OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbiAgICBzcmNDb25maWc/OiBJU291cmNlRGlyY3RvcnlDb25maWdyYXRpb247ICAgIC8vIElTb3VyY2VEaXJjdG9yeUNvbmZpZ3JhdGlvblxyXG4gICAgbGliPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRlcm5hbCBsaWJyYXJ5IG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIGV4dGVybmFsPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXh0ZXJuYWwgbW9kdWxlIOODh+OCo+ODrOOCr+ODiOODquWQjVxyXG4gICAgcG9ydGluZz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBwb3J0aW5nIG1vZHVsZSDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxuICAgIHJlcz86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oq44K944O844K544OH44Kj44Os44Kv44OI44Oq5ZCNXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElEZXBlbmRlbmN5XHJcbiAqIEBicmllZiBwYWNrYWdlLmpzb24g44Gr5oyH5a6a44GZ44KLIGRlcGVuZGVuY2llcyDmg4XloLHjgpLmoLzntI3jgZnjgovjgqTjg7Pjgr/jg7zjg5XjgqfjgqTjgrlcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlcGVuZGVuY3kge1xyXG4gICAgbmFtZTogc3RyaW5nOyAgICAgICAgICAgLy8gbW9kdWxlIG5hbWUgZXgpIFwidHlwZXNjcmlwdFwiXHJcbiAgICB2ZXJzaW9uPzogc3RyaW5nOyAgICAgICAvLyDmjIflrprjg5Djg7zjgrjjg6fjg7MuIOeEoeaMh+WumuOBruWgtOWQiOOBr+acgOaWsOODkOODvOOCuOODp+ODs1xyXG4gICAgZXM/OiBzdHJpbmdbXTsgICAgICAgICAgLy8g5oyH5a6a44GV44KM44GfIEVTIHZlcnNpb24g44Gu44Go44GN44Gu44G/5pyJ5Yq544Gr44GZ44KLXHJcbiAgICBnbG9iYWxFeHBvcnQ/OiBzdHJpbmc7ICAvLyBnbG9iYWwgZXhwb3J0IOOCkuW/heimgeOBqOOBmeOCi+OCguOBruOBryBnbG9iYWwgT2JqZWN0IOWQjeOCkuaMh+WumlxyXG4gICAgYWxpYXM/OiBzdHJpbmc7ICAgICAgICAgLy8gYWxpYXMg44KS6Kit5a6a44GZ44KL5aC05ZCI44Gr5oyH5a6aXHJcbiAgICB2ZW5kZXJOYW1lPzogc3RyaW5nOyAgICAvLyB2ZW5kZXIg5ZCN44KS6Kit5a6a44GZ44KL5aC05ZCI44Gr5oyH5a6aXHJcbiAgICBmaWxlTmFtZT86IHN0cmluZzsgICAgICAvLyBmaWxlIOWQjeOCkuioreWumuOBmeOCi+WgtOWQiOOBq+aMh+WumlxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJUHJvamVjdENvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44OX44Ot44K444Kn44Kv44OI5YWx6YCa44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3ROYW1lOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOWQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIHByb2plY3RUeXBlOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODl+ODreOCuOOCp+OCr+ODiOeorumhniBleCkgXCJsaWJyYXJ5XCJcclxuICAgIGFjdGlvbjogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4KSBcImNyZWF0ZVwiXHJcbiAgICB2ZXJzaW9uOiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5Djg7zjgrjjg6fjg7MgZXgpIFwiMS4wLjBcIlxyXG4gICAgbGljZW5zZTogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Op44Kk44K744Oz44K5IGV4KSBcIkFwYWNoZS0yLjBcIlxyXG4gICAgcHJpdmF0ZT86IGJvb2xlYW47ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpdmF0ZSDjg5Hjg4PjgrHjg7zjgrjjga7loLTlkIggdHJ1ZVxyXG4gICAgc2V0dGluZ3M6IFV0aWxzLklHbG9iYWxTZXR0aW5nczsgICAgICAgICAgICAgICAgLy8g44Ot44Kw44Kq44OX44K344On44OzXHJcbiAgICBtb2R1bGVOYW1lPzogc3RyaW5nOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbXBvcnQg44Gr5oyH5a6a44GZ44KLIOODouOCuOODpeODvOODq+WQjSBleCkgXCJjZHAtbGliXCJcclxuICAgIG1haW5CYXNlTmFtZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODoeOCpOODs+ODleOCoeOCpOODq+WQjSBleCkgXCJjZHAtbGliXCIgLyBcImluZGV4XCJcclxuICAgIG5hbWVzcGFjZT86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOODq+ODvOODiOWQjeWJjeepuumWk1xyXG4gICAgc3RydWN0dXJlQ29uZmlnPzogSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb247ICAgLy8gSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb25cclxuICAgIGNvcHlyaWdodD86IHN0cmluZzsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIOOCs+ODlOODvOODqeOCpOODiOaWh+Wtl+WIlyBleCkgXCJDb3B5cmlnaHQgKGMpIDIwMTcgU29ueSBDb3Jwb3JhdGlvblwiXHJcbiAgICBkZXZEZXBlbmRlbmNpZXM/OiBJRGVwZW5kZW5jeVtdOyAgICAgICAgICAgICAgICAvLyDplovnmbrnlKjkvp3lrZjjg6Ljgrjjg6Xjg7zjg6vmg4XloLFcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5Pjg6vjg4njgr/jg7zjgrLjg4Pjg4jjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uIHtcclxuICAgIGVzPzogXCJlczVcIiB8IFwiZXMyMDE1XCI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUeXBlU2NyaXB0IOOBriB0cmFuc3BpbGUgdGFyZ2V0XHJcbiAgICBtb2R1bGU/OiBcIm5vbmVcIiB8IFwiY29tbW9uanNcIiB8IFwiYW1kXCIgfCBcInVtZFwiOyAgICAgICAgICAgICAgIC8vIEphdmFTY3JpcHQgbW9kdWxlIHN5c3RlbVxyXG4gICAgZW52PzogXCJ3ZWJcIiB8IFwibm9kZVwiIHwgXCJlbGVjdHJvblwiIHwgXCJlbGVjdHJvbi1yZW5kZXJlclwiOyAgICAvLyDlrp/ooYznkrDlooPjga4gdGFyZ2V0XHJcbiAgICBub2RlanM/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBcIm5vZGVcIiB8IFwiZWxlY3Ryb25cIiDjga7loLTlkIjjgasgdHJ1ZVxyXG4gICAgbWluaWZ5PzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g44Oq44Oq44O844K55pmC44GrIG1pbmlmeSDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgLy8gYnVpbGQgdG9vbFxyXG4gICAgdG9vbHM/OiBzdHJpbmdbXTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8g5pei5a6a44GuIGJ1aWxkIHRvb2wgZXgpIFtcIndlYnBhY2tcIl1cclxuICAgIG91dHB1dFNhbWVEaXI/OiBib29sZWFuOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNyYyDjgaggYnVpbHQg44GM5ZCM44GY44OH44Kj44Os44Kv44OI44Oq44Gr44Gq44KL5aC05ZCIIHRydWVcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVdlYnBhY2tDb25maWdyYXRpb25cclxuICogQGJyaWVmIFdlYnBhY2sg55So44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElXZWJwYWNrQ29uZmlncmF0aW9uIHtcclxuICAgIG5vZGVqczogYm9vbGVhbjsgICAgLy8gXCJub2RlXCIgfCBcImVsZWN0cm9uXCIg44Gu5aC05ZCI44GrIHRydWVcclxuICAgIGd1aWRlOiBib29sZWFuOyAgICAgLy8gZ3VpZGUg44Kz44Oh44Oz44OI44KS5LuY5Yqg44GZ44KL5aC05ZCI44GvIHRydWUg44KS5oyH5a6aXHJcbiAgICB0YXNrUGF0aDogc3RyaW5nOyAgIC8vICd0YXNrJyDjg4fjgqPjg6zjgq/jg4jjg6rlkI1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgVmlzdWFsIFN0dWRpbyDnlKjjgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVZpc3VhbFN0dWRpb0NvbmZpZ3JhdGlvbiBleHRlbmRzIElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3ROYW1lOiBzdHJpbmc7ICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jlkI0gZXgpIFwiY2RwLWxpYlwiXHJcbiAgICBwcm9qZWN0R1VJRDogc3RyaW5nOyAgICAgICAgLy8g44OX44Ot44K444Kn44Kv44OIIEdVSUQgZXgpIHs1MUI0MTM1OS04RDJDLTQyREYtODQxNC1FODVCMDI5OTMyMzh9XHJcbiAgICBtYWluQmFzZU5hbWU6IHN0cmluZzsgICAgICAgLy8g44Oh44Kk44Oz44OV44Kh44Kk44Or5ZCNIGV4KSBcImNkcC1saWJcIiAvIGluZGV4XHJcbiAgICBsaWNlbnNlOiBib29sZWFuOyAgICAgICAgICAgLy8gTElDRU5TRSDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgd2VicGFjazogYm9vbGVhbjsgICAgICAgICAgIC8vIHdlYnBhY2suY29uZmlnLmpzIOOCkui/veWKoOOBmeOCi+WgtOWQiOOBryB0cnVlXHJcbiAgICB0ZXN0ZW06IGJvb2xlYW47ICAgICAgICAgICAgLy8gdGVzdGVtIHJ1bm5lciDjgpLov73liqDjgZnjgovloLTlkIjjga8gdHJ1ZVxyXG4gICAgb3V0cHV0U2FtZURpcjogYm9vbGVhbjsgICAgIC8vIHNyYyDjgaggYnVpbHQg44GM5ZCM44GY44OH44Kj44Os44Kv44OI44Oq44Gr44Gq44KL5aC05ZCIIHRydWVcclxuICAgIHRzR3JvdXA6IHtcclxuICAgICAgICByZWxhdGl2ZVBhdGg6IHN0cmluZzsgICAvLyBcImhvZ2Vob2dlXFxcIlxyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmc7ICAgICAgIC8vIFwiY2RwLWxpYlwiXHJcbiAgICAgICAgZGVwZW5kZWU6IGJvb2xlYW47ICAgICAgLy8g5L6d5a2Y5YWI44KS6L+95Yqg44GZ44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtYXA6IGJvb2xlYW47ICAgICAgICAgICAvLyAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICB9W107XHJcbiAgICBqc0dyb3VwOiB7XHJcbiAgICAgICAgcmVsYXRpdmVQYXRoOiBzdHJpbmc7ICAgLy8gXCJob2dlaG9nZVxcXCJcclxuICAgICAgICBmaWxlTmFtZTogc3RyaW5nOyAgICAgICAvLyBcImNkcC1saWJcIlxyXG4gICAgICAgIGRlcGVuZGVlOiBib29sZWFuOyAgICAgIC8vIOS+neWtmOWFiOOCkui/veWKoOOBmeOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgZF90czogYm9vbGVhbjsgICAgICAgICAgLy8gLmQudHMg44OV44Kh44Kk44Or44GM44GC44KL5aC05ZCIIHRydWVcclxuICAgICAgICBtYXA6IGJvb2xlYW47ICAgICAgICAgICAvLyAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICAgICAgbWluX21hcDogYm9vbGVhbjsgICAgICAgLy8gLm1pbiAubWFwIOODleOCoeOCpOODq+OBjOOBguOCi+WgtOWQiCB0cnVlXHJcbiAgICB9W107XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uLy4uL3NyYy9nZW5lcmF0b3JzL2Jhc2UvaW50ZXJmYWNlcy50cyIsImltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHtcclxuICAgIGZzLFxyXG4gICAgZ2xvYixcclxuICAgIGNoYWxrLFxyXG4gICAgXyxcclxuICAgICQsXHJcbiAgICAvLy8vXHJcbiAgICBleGVjQ29tbWFuZCxcclxuICAgIGdldFNwaW5uZXIsXHJcbiAgICBnZXRUYXJnZXREaXIsXHJcbiAgICB0ZW1wbGF0ZVBhdGgsXHJcbiAgICBjb3B5VHBsLFxyXG4gICAgbG9nLFxyXG4gICAgZGVidWcsXHJcbiAgICB0cmFuc2xhdGUsXHJcbn0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XHJcblxyXG5pbXBvcnQge1xyXG4gICAgSUJhc2VTdHJ1Y3R1cmVDb25maWdyYXRpb24sXHJcbiAgICBJRGVwZW5kZW5jeSxcclxuICAgIElQcm9qZWN0Q29uZmlncmF0aW9uLFxyXG4gICAgSUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uLFxyXG4gICAgSVdlYnBhY2tDb25maWdyYXRpb24sXHJcbn0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBHZW5lcmF0b3JCYXNlXHJcbiAqIEBicmllZiDjgZnjgbnjgabjga4gR2VuZXJhdG9yIOOBruaXouWumuOCr+ODqeOCuVxyXG4gKi9cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEdlbmVyYXRvckJhc2Uge1xyXG5cclxuICAgIHByaXZhdGUgX3Byb2plY3RSb290RGlyOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBjb25zdHJ1Y3RvclxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7SVByb2plY3RDb25maWdyYXRpb259IGNvbmZpZyDjgrPjg7Pjg5XjgqPjgrBcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jb25maWc6IElQcm9qZWN0Q29uZmlncmF0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5fcHJvamVjdFJvb3REaXIgPSBnZXRUYXJnZXREaXIoKSA/XHJcbiAgICAgICAgICAgIGdldFRhcmdldERpcigpIDpcclxuICAgICAgICAgICAgcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksIHRoaXMuX2NvbmZpZy5wcm9qZWN0TmFtZSk7XHJcblxyXG4gICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcgPSAkLmV4dGVuZCh7fSwgdGhpcy5kZWZhdWx0QmFzZVN0cnVjdHVyZSgpLCB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnKTtcclxuXHJcbiAgICAgICAgdGhpcy5fY29uZmlnLnByaXZhdGUgPSBcIk5PTkVcIiA9PT0gdGhpcy5fY29uZmlnLmxpY2Vuc2U7XHJcblxyXG4gICAgICAgICg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykub3V0cHV0U2FtZURpclxyXG4gICAgICAgICAgICA9IHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjID09PSB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmJ1aWx0O1xyXG5cclxuICAgICAgICAoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm5vZGVqcyA9ICgoZW52OiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgc3dpdGNoIChlbnYpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJub2RlXCI6XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwiZWxlY3Ryb25cIjpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5lbnYpO1xyXG5cclxuICAgICAgICBkZWJ1ZyhKU09OLnN0cmluZ2lmeSh0aGlzLl9jb25maWcsIG51bGwsIDQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG4gICAgLy8gcHViaWMgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWHpueQhumWi+WniyAo44Ko44Oz44OI44OqKVxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJ1bigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuX2NvbmZpZy5hY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSBcImNyZWF0ZVwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuQ3JlYXRlKCk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJ1bmtub3duIGFjdGlvbjogXCIgKyB0aGlzLl9jb25maWcuYWN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIGFic3RyYWN0IG1ldGhvZHM6XHJcblxyXG4gICAgLy8g5pei5a6a44GuIGRpcmVjdG9yeSDmp4vpgKDjgpLov5TljbRcclxuICAgIGFic3RyYWN0IGRlZmF1bHRCYXNlU3RydWN0dXJlKCk6IElCYXNlU3RydWN0dXJlQ29uZmlncmF0aW9uO1xyXG5cclxuICAgIC8vIGFjdGlvbjogY3JlYXRlIOOBruOBqOOBjeOBq+WRvOOBsOOCjOOCi1xyXG4gICAgYWJzdHJhY3QgYXN5bmMgY3JlYXRlKCk6IFByb21pc2U8dm9pZD47XHJcblxyXG4gICAgLy8g5b+F6KaB44Go44GZ44KLIHRhc2sgc2NyaXB0IOS4gOimp+OCkui/lOWNtC4gYWN0aW9uOiBjcmVhdGUg44Gu44Go44GN44Gr5ZG844Gw44KM44KLXHJcbiAgICBhYnN0cmFjdCBnZXQgdGFza0xpc3QoKTogc3RyaW5nW107XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByb3RlY3RlZCBtZXRob2RzOlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6YCy5o2X44OG44Kt44K544OI44KS6YCa55+lXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGtleSDjg63jg7zjgqvjg6njgqTjgrrjg6rjgr3jg7zjgrnjgq3jg7zjgpLmjIflrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHByb2dyZXNzKGtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgbG9nKCg8YW55PmNoYWxrKS5jeWFuKHRyYW5zbGF0ZShrZXkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDorablkYrjg4bjgq3jgrnjg4jjgpLpgJrnn6VcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ga2V5IOODreODvOOCq+ODqeOCpOOCuuODquOCveODvOOCueOCreODvOOCkuaMh+WumlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgd2FybihrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGxvZygoPGFueT5jaGFsaykueWVsbG93KHRyYW5zbGF0ZShrZXkpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3b3JrIGRpcmVjdG9yeSDjga7lpInmm7RcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gZGlyZWN0b3J5IHRhcmdldCBkaXJlY3RvcnkuXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBjaGRpcihkaXJlY3Rvcnk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHByb2Nlc3MuY2hkaXIoZGlyZWN0b3J5KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHByb2plY3Qgcm9vdCBkaXJlY3Rvcnkg44Gu5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdG9yeSB0YXJnZXQgZGlyZWN0b3J5LlxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgZ2V0IHJvb3REaXIoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcHJvamVjdFJvb3REaXI7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB0ZW1wbGF0ZSBkaXJlY3Rvcnkg44KS5oyH5a6a44GX44Gm6YWN5LiL44Gu44OV44Kh44Kk44Or44KS44Kz44OU44O8XHJcbiAgICAgKiBJQmFzZVN0cnVjdHVyZUNvbmZpZ3JhdGlvbiDjga7oqK3lrprjgYzlj43mmKDjgZXjgozjgotcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0ICDjgr/jg7zjgrLjg4Pjg4jjgpLmjIflrpouIG51bGwg44Gu5aC05ZCI44Gv44CBdGVtcGxhdGVzIOOCkui/lOWNtFxyXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRzdFJvb3Qg44Kz44OU44O85YWI44KS5oyH5a6aLiDmjIflrprjgYznhKHjgYTloLTlkIjjga8gcm9vdERpciDjgYzoqK3lrppcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNvcHlUcGxEaXIodGFyZ2V0OiBzdHJpbmcsIGRzdFJvb3Q/OiBzdHJpbmcsIG9wdGlvbnM/OiBnbG9iLklPcHRpb25zKTogdm9pZCB7XHJcbiAgICAgICAgZHN0Um9vdCA9IGRzdFJvb3QgfHwgdGhpcy5yb290RGlyO1xyXG4gICAgICAgIG9wdGlvbnMgPSAkLmV4dGVuZCh7XHJcbiAgICAgICAgICAgIGN3ZDogdGVtcGxhdGVQYXRoKHRhcmdldCksXHJcbiAgICAgICAgICAgIG5vZGlyOiB0cnVlLFxyXG4gICAgICAgICAgICBkb3Q6IHRydWUsXHJcbiAgICAgICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIGdsb2Iuc3luYyhcIioqXCIsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5mb3JFYWNoKChmaWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkc3QgPSBwYXRoLmpvaW4oZHN0Um9vdCxcclxuICAgICAgICAgICAgICAgICAgICBmaWxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9zcmMvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9wa2cvLCAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5wa2cpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9idWlsdC8sICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5idWlsdClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL2RvYy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLmRvYylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL3Rhc2svLCAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRhc2spXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90ZXN0LywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZXN0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvdHlwZXMvLCAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcudHlwZXMpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC90ZW1wXFwvLywgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50ZW1wICsgXCIvXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9saWIvLCAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcubGliIHx8IFwibGliXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9leHRlcm5hbC8sICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuZXh0ZXJuYWwgfHwgXCJleHRlcm5hbFwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvcG9ydGluZy8sICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnBvcnRpbmcgfHwgXCJwb3J0aW5nXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9yZXMvLCAgICAgICAgIHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcucmVzIHx8IFwicmVzXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgL3NjcmlwdC8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnLnNjcmlwdCB8fCBcInNjcmlwdHNcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwic2NyaXB0c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvc3R5bGVzaGVldC8sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKHRoaXMuX2NvbmZpZy5zdHJ1Y3R1cmVDb25maWcuc3JjQ29uZmlnLnN0eWxlc2hlZXQgfHwgXCJzdHlsZXNoZWV0c1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJzdHlsZXNoZWV0c1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvdGVtcGxhdGUvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy5zcmNDb25maWdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICh0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnNyY0NvbmZpZy50ZW1wbGF0ZSB8fCBcInRlbXBsYXRlc1wiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogXCJ0ZW1wbGF0ZXNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgZnMuY29weVN5bmMocGF0aC5qb2luKHRlbXBsYXRlUGF0aCh0YXJnZXQpLCBmaWxlKSwgZHN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIG5vZGUgbW9kdWxlIOOBriB2ZXJzaW9uIOWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSB7UHJvbWlzZTxzdHJpbmc+fSB2ZXJzaW9uIHRleHRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIHF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24obmFtZTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdmVyc2lvbjogc3RyaW5nO1xyXG4gICAgICAgICAgICBleGVjQ29tbWFuZChcIm5wbVwiLCBbXCJpbmZvXCIsIG5hbWUsIFwidmVyc2lvblwiXSwge1xyXG4gICAgICAgICAgICAgICAgc3RkaW86IFwicGlwZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Bpbm5lcjogbnVsbCxcclxuICAgICAgICAgICAgICAgIHN0ZG91dDogKGRhdGE6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb24gPSBfLnRyaW0oZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodmVyc2lvbik7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKChyZWFzb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZWplY3QocmVhc29uKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pei5a6a44Gu6ZaL55m65pmC44Gu5L6d5a2Y44Oi44K444Ol44O844Or44Oq44K544OI44Gu5Y+W5b6XXHJcbiAgICAgKiDlv4XopoHjgavlv5zjgZjjgabjgqrjg7zjg5Djg7zjg6njgqTjg4lcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtJRGVwZW5kZW5jeX1cclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldCBkZWZhdWx0RGV2RGVwZW5kZW5jaWVzKCk6IElEZXBlbmRlbmN5W10ge1xyXG4gICAgICAgIGNvbnN0IGJhc2UgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJjb252ZXJ0LXNvdXJjZS1tYXBcIiwgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJkZWxcIiwgICAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJlc2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJucG0tcnVuLWFsbFwiLCAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJwbGF0b1wiLCAgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJzb3VyY2UtbWFwXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0c2xpbnRcIiwgICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlZG9jXCIsICAgICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ0eXBlc2NyaXB0XCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0sXHJcbiAgICAgICAgXTtcclxuICAgICAgICBjb25zdCBtaW5pZnkgPSBbXHJcbiAgICAgICAgICAgIHsgbmFtZTogXCJ1Z2xpZnktanNcIiwgICAgdmVyc2lvbjogdW5kZWZpbmVkLCBlczogW1wiZXM1XCJdLCAgICB9LFxyXG4gICAgICAgICAgICB7IG5hbWU6IFwidWdsaWZ5LWVzXCIsICAgIHZlcnNpb246IHVuZGVmaW5lZCwgZXM6IFtcImVzMjAxNVwiXSwgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBsZXQgZXh0cmEgPSBbXTtcclxuICAgICAgICBpZiAoKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5taW5pZnkpIHtcclxuICAgICAgICAgICAgZXh0cmEgPSBleHRyYS5jb25jYXQobWluaWZ5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwid2VicGFja1wiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJ3ZWJwYWNrXCIsICAgICAgICAgICB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJzb3VyY2UtbWFwLWxvYWRlclwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJueWNcIikpIHtcclxuICAgICAgICAgICAgZXh0cmEucHVzaCh7IG5hbWU6IFwibnljXCIsIHZlcnNpb246IHVuZGVmaW5lZCwgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlVG9vbChcInRlc3RlbVwiKSkge1xyXG4gICAgICAgICAgICBleHRyYS5wdXNoKHsgbmFtZTogXCJ0ZXN0ZW1cIiwgdmVyc2lvbjogdW5kZWZpbmVkLCB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVUb29sKFwicGhhbnRvbWpzLXByZWJ1aWx0XCIpKSB7XHJcbiAgICAgICAgICAgIGV4dHJhLnB1c2goeyBuYW1lOiBcInBoYW50b21qcy1wcmVidWlsdFwiLCB2ZXJzaW9uOiB1bmRlZmluZWQsIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIF8uc29ydEJ5KGJhc2UuY29uY2F0KGV4dHJhKSwgKGRlcGVuZCkgPT4gZGVwZW5kLm5hbWUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZGVwZW5kZW5jaWVzIOOBriB0ZW1wbGF0ZSBwYXJhbWFldGVyIOOCkuWPluW+l1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSAge0lEZXBlbmRlbmN5W119IGRlcGVuZGVuY2llcyDkvp3lrZjplqLkv4Ljg6rjgrnjg4hcclxuICAgICAqIEByZXR1cm4ge3sgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuOyB9W119IOODhuODs+ODl+ODrOODvOODiOODkeODqeODoeODvOOCv+OBq+aMh+WumuOBmeOCi+mFjeWIl1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgYXN5bmMgcXVlcnlEZXBlbmRlbmNpZXNQYXJhbShkZXBlbmRlbmNpZXM6IElEZXBlbmRlbmN5W10pOiBQcm9taXNlPHsgbmFtZTogc3RyaW5nOyB2ZXJzaW9uOiBzdHJpbmc7IGxhc3Q/OiBib29sZWFuIH1bXT4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJiYXNlLmNyZWF0ZS5xdWVyeVZlcnNpb25cIik7XHJcblxyXG4gICAgICAgIGNvbnN0IGRlcGVuZHMgPSA8eyBuYW1lOiBzdHJpbmc7IHZlcnNpb246IHN0cmluZzsgbGFzdD86IGJvb2xlYW47IH1bXT5kZXBlbmRlbmNpZXNcclxuICAgICAgICAgICAgLmZpbHRlcigoZGVwZW5kKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobnVsbCA9PSBkZXBlbmQuZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEhZGVwZW5kLmVzLmZpbmQoKGVzVmVyc2lvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5lcyA9PT0gZXNWZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVidWcoSlNPTi5zdHJpbmdpZnkoZGVwZW5kcywgbnVsbCwgNCkpO1xyXG5cclxuICAgICAgICBjb25zdCBwcm9ncmVzcyA9IChjb250ZXh0OiBhbnkpOiBhbnkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoXCJzdHJpbmdcIiA9PT0gdHlwZW9mIGNvbnRleHQgJiYgIXRoaXMuX2NvbmZpZy5zZXR0aW5ncy5zaWxlbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBnZXRTcGlubmVyKCg8YW55PmNoYWxrKS55ZWxsb3coY29udGV4dCksIDUpO1xyXG4gICAgICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNwaW5uZXI7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29udGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dC5zdG9wKHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIG4gPSBkZXBlbmRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobnVsbCA9PSBkZXBlbmRzW2ldLnZlcnNpb24pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwaW5uZXIgPSBwcm9ncmVzcyhkZXBlbmRzW2ldLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS52ZXJzaW9uID0gXCJeXCIgKyBhd2FpdCB0aGlzLnF1ZXJ5Tm9kZU1vZHVsZUxhdGVzdFZlcnNpb24oZGVwZW5kc1tpXS5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHByb2dyZXNzKHNwaW5uZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09PSBuIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgZGVwZW5kc1tpXS5sYXN0ID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGRlcGVuZHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiB3ZWJwYWNrLmNvbmZpZy5qcyDjga4gdGVtcGxhdGUgcGFyYW1hZXRlciDjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGxpYnJhcnlUYXJnZXQg44Gr5oyH5a6a44GZ44KL5paH5a2X5YiXXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeVdlYnBhY2tMaWJyYXJ5VGFyZ2V0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICgoPElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbj50aGlzLl9jb25maWcpLm1vZHVsZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiY29tbW9uanNcIjpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbW1vbmpzMlwiO1xyXG4gICAgICAgICAgICBjYXNlIFwiYW1kXCI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJhbWRcIjtcclxuICAgICAgICAgICAgY2FzZSBcInVtZFwiOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidW1kXCI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIGVzbGludHJjIOOBriBlbnYg44Gr5oyH5a6a44GZ44KLIHRlbXBsYXRlIHBhcmFtYWV0ZXIg44KS5Y+W5b6XXHJcbiAgICAgKlxyXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBlbnYg44Gr5oyH5a6a44GZ44KL44OG44Oz44OX44Os44O844OI44OR44Op44Oh44O844K/44Kq44OW44K444Kn44Kv44OIXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBxdWVyeUVzTGludEVudlBhcmFtKCk6IGFueSB7XHJcbiAgICAgICAgY29uc3QgY29tcGlsZVNldHRpbmcgPSA8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZztcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBlczY6IFwiZXM1XCIgIT09IGNvbXBpbGVTZXR0aW5nLmVzLFxyXG4gICAgICAgICAgICBub2RlOiBcIndlYlwiICE9PSBjb21waWxlU2V0dGluZy5lbnYsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElCdWlsZFRhcmdldENvbmZpZ3JhdGlvbi50b29scyDjg5fjg63jg5Hjg4bjgqPjga7mjIflrprnirbms4HjgpLlj5blvpdcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBuYW1lIOODhOODvOODq+WQjeOCkuaMh+WumlxyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gdHJ1ZTog5oyH5a6a44GV44KM44Gm44GE44KLIC8gZmFsc2U6IOaMh+WumuOBleOCjOOBpuOBhOOBquOBhFxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgaXNFbmFibGVUb29sKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhISg8SUJ1aWxkVGFyZ2V0Q29uZmlncmF0aW9uPnRoaXMuX2NvbmZpZykudG9vbHMuZmluZCgodG9vbCkgPT4gbmFtZSA9PT0gdG9vbCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAgIC8vIHByaXZhdGUgbWV0aG9kczpcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSDlh6bnkIbjga7jgqjjg7Pjg4jjg6pcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBydW5DcmVhdGUoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVCYXNlKCk7XHJcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICAvL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa44GuIGNyZWF0ZSDlh6bnkIZcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhc3luYyBjcmVhdGVCYXNlKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMucHJvZ3Jlc3MoXCJiYXNlLmNyZWF0ZS5mb3VuZGF0aW9uXCIpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY3JlYXRlUHJvamVjdERpcigpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weUJhc2VTdHJ1Y3R1cmUoKTtcclxuICAgICAgICBhd2FpdCB0aGlzLmNvcHlDb21tb25GaWxlcygpO1xyXG4gICAgICAgIGF3YWl0IHRoaXMuY29weVRhc2tTY3JpcHRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDjg5fjg63jgrjjgqfjgq/jg4jjg4fjgqPjg6zjgq/jg4jjg6rjga7kvZzmiJBcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVQcm9qZWN0RGlyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChmcy5leGlzdHNTeW5jKHRoaXMucm9vdERpcikpIHtcclxuICAgICAgICAgICAgdGhyb3cgRXJyb3IodHJhbnNsYXRlKFwiYmFzZS5jcmVhdGUuZXJyb3IuYWxyZWFkeUV4aXN0XCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZnMubWtkaXJzU3luYyh0aGlzLnJvb3REaXIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YWx6YCa5qeL5oiQ5oOF5aCx44Gu44Kz44OU44O8XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY29weUJhc2VTdHJ1Y3R1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jb3B5VHBsRGlyKFwiYmFzZS9zdHJ1Y3R1cmVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDln7rmnKzjg5XjgqHjgqTjg6vjga7jgrPjg5Tjg7xcclxuICAgICAqIHRlbXBsYXRlIOOBruOCs+ODlOODvOOCguihjOOBhlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlDb21tb25GaWxlcygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlXCIpO1xyXG4gICAgICAgIGNvbnN0IGRzdERpciA9IHRoaXMucm9vdERpcjtcclxuXHJcbiAgICAgICAgLy8gLm5wbWlnbm9yZVxyXG4gICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX25wbWlnbm9yZVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCIubnBtaWdub3JlXCIpLFxyXG4gICAgICAgICAgICB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gQkFOTkVSXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0JBTk5FUlwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJCQU5ORVJcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gTElDRU5TRVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy5fY29uZmlnLmxpY2Vuc2UpIHtcclxuICAgICAgICAgICAgY2FzZSBcIkFwYWNoZS0yLjBcIjpcclxuICAgICAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX0xJQ0VOU0UuQXBhY2hlLTIuMFwiKSxcclxuICAgICAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCBcIkxJQ0VOU0VcIiksXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNSVRcIjpcclxuICAgICAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgXCJfTElDRU5TRS5NSVRcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJMSUNFTlNFXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbmZpZy5jb3B5cmlnaHRcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTk9USUNFXHJcbiAgICAgICAgZnMuY29weVN5bmMoXHJcbiAgICAgICAgICAgIHBhdGguam9pbihzcmNEaXIsIFwiX05PVElDRVwiKSxcclxuICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJOT1RJQ0VcIiksXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgLy8gYnVpbGQgdG9vbHM6IHdlYnBhY2tcclxuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZVRvb2woXCJ3ZWJwYWNrXCIpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtOiBJV2VicGFja0NvbmZpZ3JhdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIG5vZGVqczogKDxJQnVpbGRUYXJnZXRDb25maWdyYXRpb24+dGhpcy5fY29uZmlnKS5ub2RlanMsXHJcbiAgICAgICAgICAgICAgICBndWlkZTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHRhc2tQYXRoOiB0aGlzLl9jb25maWcuc3RydWN0dXJlQ29uZmlnLnRhc2ssXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvcHlUcGwoXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oc3JjRGlyLCBcInRvb2xzL3dlYnBhY2svX3dlYnBhY2suY29uZmlnLmpzXCIpLFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKGRzdERpciwgXCJ3ZWJwYWNrLmNvbmZpZy5qc1wiKSxcclxuICAgICAgICAgICAgICAgIHBhcmFtLFxyXG4gICAgICAgICAgICAgICAgeyBkZWxpbWl0ZXJzOiBcIjwlICU+XCIgfVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIHRhc2sgc2NyaXB0IOOBruOCs+ODlOODvFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNvcHlUYXNrU2NyaXB0cygpOiB2b2lkIHtcclxuICAgICAgICBjb25zdCBzcmNEaXIgPSB0ZW1wbGF0ZVBhdGgoXCJiYXNlL3Rhc2tcIik7XHJcbiAgICAgICAgY29uc3QgZHN0RGlyID0gcGF0aC5qb2luKHRoaXMucm9vdERpciwgdGhpcy5fY29uZmlnLnN0cnVjdHVyZUNvbmZpZy50YXNrKTtcclxuXHJcbiAgICAgICAgdGhpcy50YXNrTGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XHJcbiAgICAgICAgICAgIGZzLmNvcHlTeW5jKFxyXG4gICAgICAgICAgICAgICAgcGF0aC5qb2luKHNyY0RpciwgdGFzayksXHJcbiAgICAgICAgICAgICAgICBwYXRoLmpvaW4oZHN0RGlyLCB0YXNrKSxcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vLi4vc3JjL2dlbmVyYXRvcnMvYmFzZS9nZW5lcmF0b3ItYmFzZS50cyJdfQ==