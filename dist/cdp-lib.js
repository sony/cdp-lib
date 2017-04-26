/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-04-26T12:10:41.630Z
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
/******/     return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(8);
exports.fs = fs;
const glob = __webpack_require__(9);
exports.glob = glob;
const hogan = __webpack_require__(14);
exports.hogan = hogan;
const _l = __webpack_require__(15);
const _s = __webpack_require__(16);
const which = __webpack_require__(12);
exports.which = which;
const uuid = __webpack_require__(11);
exports.uuid = uuid;
const chalk = __webpack_require__(6);
exports.chalk = chalk;
const cli_spinner_1 = __webpack_require__(7);
exports.Spinner = cli_spinner_1.Spinner;
const $ = (() => {
    global.DOMParser = __webpack_require__(13).DOMParser;
    const jsdom = __webpack_require__(10);
    return __webpack_require__(17)(jsdom.jsdom().defaultView);
})();
exports.$ = $;
const _m = _l.mixin(_s.exports());
exports._ = _m;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(2));
//___________________________________________________________________________________________________________________//
/**
 * @class CDPLib
 * @brief CDP boilerplate 生成機能を提供するクラス
 */
class CDPLib {
    /**
     * main command
     */
    static execute(options) {
        console.log("ok");
    }
}
exports.CDPLib = CDPLib;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(0));
__export(__webpack_require__(3));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const libs_1 = __webpack_require__(0);
const child_process_1 = __webpack_require__(4);
const os = __webpack_require__(5);
///////////////////////////////////////////////////////////////////////
// exports methods:
/**
 * Handle command line error and kill process.
 * When the application received error from cli, please call this method.
 *
 * @param {String} error  error information.
 */
function handleError(error) {
    console.error(libs_1.chalk.red(error));
    // returned exit code = 1 (fail)
    process.exit(1);
}
exports.handleError = handleError;
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
        .replace(/\r\n/gm, "\n") // once '\n'
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
    const df = libs_1.$.Deferred();
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
            df.resolve(code);
        });
    });
    return df.promise();
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
    libs_1.fs.copySync(dst, output, "utf8");
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
/* 4 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("cli-spinner");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("glob");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("jsdom");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("uuid");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("which");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("xmldom");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("hogan.js");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("underscore.string");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("jquery");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmUzNGYzZmZlNWJjZWExNjI5NjQiLCJjZHA6Ly8vY2RwLWxpYi91dGlscy9saWJzLnRzIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvdG9vbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJjbGktc3Bpbm5lclwiLFwiY29tbW9uanMyXCI6XCJjbGktc3Bpbm5lclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwianNkb21cIixcImNvbW1vbmpzMlwiOlwianNkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBLGtDQUErQjtBQW9CM0IsZ0JBQUU7QUFuQk4sb0NBQTZCO0FBb0J6QixvQkFBSTtBQW5CUixzQ0FBa0M7QUFvQjlCLHNCQUFLO0FBbkJULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBb0IzQixzQkFBSztBQW5CVCxxQ0FBNkI7QUFvQnpCLG9CQUFJO0FBbkJSLHFDQUErQjtBQW9CM0Isc0JBQUs7QUFuQlQsNkNBQXNDO0FBb0JsQyxrQkFwQksscUJBQU8sQ0FvQkw7QUFsQlgsTUFBTSxDQUFDLEdBQWlCLENBQUM7SUFDZixNQUFPLENBQUMsU0FBUyxHQUFHLG1CQUFPLENBQUMsRUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RELE1BQU0sS0FBSyxHQUFHLG1CQUFPLENBQUMsRUFBTyxDQUFDLENBQUM7SUFDL0IsTUFBTSxDQUFDLG1CQUFPLENBQUMsRUFBUSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQyxFQUFFLENBQUM7QUFTRCxjQUFDO0FBTkwsTUFBTSxFQUFFLEdBQWlDLEVBQUUsQ0FBQyxLQUFLLENBQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7QUFPM0QsZUFBQzs7Ozs7Ozs7Ozs7OztBQ3hCWCxpQ0FBd0I7QUFVeEIsdUhBQXVIO0FBRXZIOzs7R0FHRztBQUNIO0lBQ0k7O09BRUc7SUFDSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQTRCO1FBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQztDQUNKO0FBUEQsd0JBT0M7Ozs7Ozs7Ozs7Ozs7QUN2QkQsaUNBQXVCO0FBQ3ZCLGlDQUF3Qjs7Ozs7Ozs7OztBQ0R4QixzQ0FRZ0I7QUFFaEIsK0NBQW9EO0FBRXBELGtDQUF5QjtBQUV6Qix1RUFBdUU7QUFDdkUsbUJBQW1CO0FBRW5COzs7OztHQUtHO0FBQ0gscUJBQTRCLEtBQWE7SUFDckMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDaEMsZ0NBQWdDO0lBQ2hDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUpELGtDQUlDO0FBRUQsdUhBQXVIO0FBRXZIOzs7Ozs7O0dBT0c7QUFDSCxvQkFBMkIsTUFBZSxFQUFFLEtBQWM7SUFDdEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLElBQUksQ0FBQztJQUMzQixNQUFNLE9BQU8sR0FBRyxJQUFJLGNBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxNQUFNLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsb0NBQW9DO0lBQ3JJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBTkQsZ0NBTUM7QUFjRDs7Ozs7OztHQU9HO0FBQ0gsdUJBQThCLElBQVksRUFBRSxPQUE4QjtJQUN0RSxNQUFNLEdBQUcsR0FBeUIsUUFBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUU7UUFDM0MsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHO1FBQ1gsR0FBRyxFQUFFLElBQUk7S0FDWixFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRVosSUFBSSxHQUFHLElBQUk7U0FDTixPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFHLGFBQWE7U0FDeEMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBSSxZQUFZO1NBQ3ZDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQ3pCO0lBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ1YsTUFBTSxNQUFNLEdBQUcsQ0FBQztZQUNaLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNYLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMvQixDQUFDLElBQUksR0FBRyxDQUFDO1lBQ2IsQ0FBQztZQUNELE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDYixDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE5QkQsc0NBOEJDO0FBZUQ7Ozs7Ozs7O0dBUUc7QUFDSCxxQkFBNEIsT0FBZSxFQUFFLElBQWMsRUFBRSxPQUE0QjtJQUNyRixNQUFNLEVBQUUsR0FBRyxRQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDeEIsTUFBTSxHQUFHLEdBQXVCLFFBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1FBQ3pDLEtBQUssRUFBRSxTQUFTO1FBQ2hCLE9BQU8sRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUU7S0FDNUIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVaLFlBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsZUFBZTtRQUNsQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ1IsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDdkYsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNWLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwQixDQUFDO1FBRUQscUJBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQzthQUM1QixFQUFFLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQzthQUN4QixFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSTtZQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QixDQUFDO1lBQ0QsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN4QixDQUFDO0FBNUJELGtDQTRCQztBQVlEOzs7Ozs7OztHQVFHO0FBQ0gsaUJBQXdCLEdBQVcsRUFBRSxHQUFXLEVBQUUsTUFBYyxFQUFFLE9BQTZCO0lBQzNGLE1BQU0sR0FBRyxHQUFHLFFBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFO1FBQ3JCLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRztRQUNYLEdBQUcsRUFBRSxJQUFJO1FBQ1QsVUFBVSxFQUFFLE9BQU87S0FDdEIsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVaLE1BQU0sR0FBRyxHQUFHLFlBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzFHLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRXRELFNBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNyQyxDQUFDO0FBWEQsMEJBV0M7QUFFRCx1SEFBdUg7QUFFdkg7Ozs7O0dBS0c7QUFDSDtJQUNJLE1BQU0sQ0FBQyxHQUFHLEdBQUcsV0FBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQztBQUMvQyxDQUFDO0FBRkQsZ0NBRUM7QUFFRCx1SEFBdUg7QUFFdkg7Ozs7O0dBS0c7QUFDSCxxQkFBNEIsR0FBVztJQUNuQyxNQUFNLENBQUMsUUFBQyxDQUFDLFFBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN6QyxDQUFDO0FBRkQsa0NBRUM7QUFVRDs7Ozs7O0dBTUc7QUFDSCxtQkFBMEIsR0FBVyxFQUFFLE9BQTBCO0lBQzdELE1BQU0sR0FBRyxHQUFxQixRQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRTtRQUN2QyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUc7UUFDWCxHQUFHLEVBQUUsSUFBSTtRQUNULElBQUksRUFBRSxDQUFDO0tBQ1YsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNaLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksTUFBYyxDQUFDO0lBQ25CLElBQUksSUFBWSxDQUFDO0lBRWpCLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUM7U0FDM0MsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQywrQkFBK0I7U0FDbkUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpCLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBVztRQUN2QixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDWCxNQUFNLE9BQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUMvQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQy9CLENBQUMsSUFBSSxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQztJQUVGLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3JDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLEdBQUcsUUFBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNWLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUNELEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUM7UUFDcEMsR0FBRyxJQUFJLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBRWxDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUE3Q0QsOEJBNkNDOzs7Ozs7O0FDM1FELDBDOzs7Ozs7QUNBQSwrQjs7Ozs7O0FDQUEsa0M7Ozs7OztBQ0FBLHdDOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSxpQzs7Ozs7O0FDQUEsa0M7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSxxQzs7Ozs7O0FDQUEsbUM7Ozs7OztBQ0FBLDhDOzs7Ozs7QUNBQSxtQyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMTgpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJlMzRmM2ZmZTViY2VhMTYyOTY0IiwiaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzLWV4dHJhXCI7XHJcbmltcG9ydCAqIGFzIGdsb2IgZnJvbSBcImdsb2JcIjtcclxuaW1wb3J0ICogYXMgaG9nYW4gZnJvbSBcImhvZ2FuLmpzXCI7XHJcbmltcG9ydCAqIGFzIF9sIGZyb20gXCJsb2Rhc2hcIjtcclxuaW1wb3J0ICogYXMgX3MgZnJvbSBcInVuZGVyc2NvcmUuc3RyaW5nXCI7XHJcbmltcG9ydCAqIGFzIHdoaWNoIGZyb20gXCJ3aGljaFwiO1xyXG5pbXBvcnQgKiBhcyB1dWlkIGZyb20gXCJ1dWlkXCI7XHJcbmltcG9ydCAqIGFzIGNoYWxrIGZyb20gXCJjaGFsa1wiO1xyXG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSBcImNsaS1zcGlubmVyXCI7XHJcblxyXG5jb25zdCAkOiBKUXVlcnlTdGF0aWMgPSAoKCkgPT4ge1xyXG4gICAgKDxhbnk+Z2xvYmFsKS5ET01QYXJzZXIgPSByZXF1aXJlKFwieG1sZG9tXCIpLkRPTVBhcnNlcjtcclxuICAgIGNvbnN0IGpzZG9tID0gcmVxdWlyZShcImpzZG9tXCIpO1xyXG4gICAgcmV0dXJuIHJlcXVpcmUoXCJqcXVlcnlcIikoanNkb20uanNkb20oKS5kZWZhdWx0Vmlldyk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgdHlwZSBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IHR5cGVvZiBfcyAmIHR5cGVvZiBfbDtcclxuY29uc3QgX206IE1peGluZWRVbmRlcnNjb3JlU3RhdGljID0gPGFueT5fbC5taXhpbig8YW55Pl9zLmV4cG9ydHMoKSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgX20gYXMgXyxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwiZXhwb3J0ICogZnJvbSBcIi4vdXRpbHNcIjtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElCb2lsZXJwbGF0ZU9wdGlvbnNcclxuICogQGJyaWVmICAgICBib2lsZXJwbGF0ZSDjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUJvaWxlcnBsYXRlT3B0aW9ucyB7XHJcbiAgICBraW5kOiBcImFwcFwiIHwgXCJtb2R1bGVcIjsgICAgIC8vIGJvaWxlcnBsYXRlIOOBrueorumhnuOCkuaMh+WumlxyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDRFBMaWJcclxuICogQGJyaWVmIENEUCBib2lsZXJwbGF0ZSDnlJ/miJDmqZ/og73jgpLmj5DkvpvjgZnjgovjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDRFBMaWIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBtYWluIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlKG9wdGlvbnM6IElCb2lsZXJwbGF0ZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm9rXCIpO1xyXG4gICAgfVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvY2RwLWxpYi50cyIsImV4cG9ydCAqIGZyb20gXCIuL2xpYnNcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vdG9vbHNcIjtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9pbmRleC50cyIsImltcG9ydCB7XHJcbiAgICBmcyxcclxuICAgIGhvZ2FuLFxyXG4gICAgJCxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgU3Bpbm5lcixcclxufSBmcm9tIFwiLi9saWJzXCI7XHJcblxyXG5pbXBvcnQgeyBzcGF3biwgU3Bhd25PcHRpb25zIH0gZnJvbSBcImNoaWxkX3Byb2Nlc3NcIjtcclxuXHJcbmltcG9ydCAqIGFzIG9zIGZyb20gXCJvc1wiO1xyXG5cclxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuLy8gZXhwb3J0cyBtZXRob2RzOlxyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBjb21tYW5kIGxpbmUgZXJyb3IgYW5kIGtpbGwgcHJvY2Vzcy5cclxuICogV2hlbiB0aGUgYXBwbGljYXRpb24gcmVjZWl2ZWQgZXJyb3IgZnJvbSBjbGksIHBsZWFzZSBjYWxsIHRoaXMgbWV0aG9kLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXJyb3IgIGVycm9yIGluZm9ybWF0aW9uLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGhhbmRsZUVycm9yKGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoY2hhbGsucmVkKGVycm9yKSk7XHJcbiAgICAvLyByZXR1cm5lZCBleGl0IGNvZGUgPSAxIChmYWlsKVxyXG4gICAgcHJvY2Vzcy5leGl0KDEpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdldCBzcGlubmVyIGluc3RhbmNlLlxyXG4gKiBDTEkgaGVscGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICBbZm9ybWF0XSAgc3Bpbm5lciBmb3JtYXQgc3RyaW5nLlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9ICBbaW5kZXhdICAgc3Bpbm5lciBpbmRleCBkZWZpbmVkIGJ5IGNsaS1zcGlubmVyLiAoZGVmYXVsdDogcmFuZG9tIFswLTldKVxyXG4gKiBAcmV0dXJuIHtTcGlubmVyfSBjbGktc3Bpbm5lciBpbnN0YW5jZS5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRTcGlubmVyKGZvcm1hdD86IHN0cmluZywgaW5kZXg/OiBudW1iZXIpOiB7IHN0YXJ0OiAoKSA9PiB2b2lkOyBzdG9wOiAoY2xlYW4/OiBib29sZWFuKSA9PiB2b2lkOyB9IHtcclxuICAgIGNvbnN0IGZtdCA9IGZvcm1hdCB8fCBcIiVzXCI7XHJcbiAgICBjb25zdCBzcGlubmVyID0gbmV3IFNwaW5uZXIoZm10KTtcclxuICAgIGNvbnN0IGlkeCA9IChudWxsICE9IGluZGV4ICYmIDAgPD0gaW5kZXggJiYgaW5kZXggPCAxMCkgPyBpbmRleCA6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpOyAvLyByYW5kb20gdmFsdWUgb2YgcHJlc2V0IGFycmF5WzAtOV1cclxuICAgIHNwaW5uZXIuc2V0U3Bpbm5lclN0cmluZyhTcGlubmVyLnNwaW5uZXJzW2lkeF0pO1xyXG4gICAgcmV0dXJuIHNwaW5uZXI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9uc1xyXG4gKiBAYnJpZWYgbm9ybWFsaXplVGV4dCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBlb2w/OiBzdHJpbmc7ICAgLy8gZGVmYXVsdDogb3MuRU9MXHJcbiAgICBib20/OiBib29sZWFuOyAgLy8gZGVmYXVsdDogdHJ1ZVxyXG4gICAgdGFiPzogbnVtYmVyOyAgIC8vIHRhYiDjgpLlpInmj5vjgZnjgovjgrnjg5rjg7zjgrnjga7mlbDjgpLmjIflrpouIGRlZmF1bHQ6IOWkieaPm+OBl+OBquOBhFxyXG59XHJcblxyXG4vKipcclxuICogTm9ybWFsaXplIHRleHQgbGluZS1mZWVkLlxyXG4gKiBmb3Igd2luZG93cyBnaXQgdXNlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgICAgIHRleHQgICAgICBpbnB1dCB0ZXh0LlxyXG4gKiBAcGFyYW0gIHtOb3JtYWxpemVUZXh0T3B0aW9uc30gW29wdGlvbnNdIG9wdGlvbi5cclxuICogQHJldHVybiB7U3RyaW5nfSBub3JtYWxpemVkIHRleHQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVGV4dCh0ZXh0OiBzdHJpbmcsIG9wdGlvbnM/OiBOb3JtYWxpemVUZXh0T3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IE5vcm1hbGl6ZVRleHRPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB0ZXh0ID0gdGV4dFxyXG4gICAgICAgIC5yZXBsYWNlKC9eXFx1ZmVmZi9nbSwgXCJcIikgICAvLyByZW1vdmUgYm9tXHJcbiAgICAgICAgLnJlcGxhY2UoL1xcclxcbi9nbSwgXCJcXG5cIikgICAgLy8gb25jZSAnXFxuJ1xyXG4gICAgICAgIC5yZXBsYWNlKC9cXHIvZ20sIFwiXFxuXCIpXHJcbiAgICA7XHJcblxyXG4gICAgaWYgKG9wdC5ib20pIHtcclxuICAgICAgICB0ZXh0ID0gXCJcXHVmZWZmXCIgKyB0ZXh0O1xyXG4gICAgfVxyXG4gICAgaWYgKFwiXFxuXCIgIT09IG9wdC5lb2wpIHtcclxuICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4vZ20sIG9wdC5lb2wpO1xyXG4gICAgfVxyXG4gICAgaWYgKG9wdC50YWIpIHtcclxuICAgICAgICBjb25zdCBzcGFjZXMgPSAoKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcyA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb3B0LnRhYjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBzICs9IFwiIFwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzO1xyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFx0L2dtLCBzcGFjZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0ZXh0O1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zXHJcbiAqIEBicmllZiBleGVjQ29tbWFuZCgpIOOBq+aMh+WumuOBmeOCi+OCquODl+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBFeGVjQ29tbWFuZE9wdGlvbnMgZXh0ZW5kcyBTcGF3bk9wdGlvbnMge1xyXG4gICAgc3Bpbm5lcj86IHtcclxuICAgICAgICBmb3JtYXQ/OiBzdHJpbmc7ICAgIC8vIGV4KSBcIiVzXCJcclxuICAgICAgICBpbmRleD86IG51bWJlcjsgICAgIC8vIDAgLSA5IOOBruaVsOWApOOCkuaMh+WumlxyXG4gICAgfTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEV4ZWN1dGUgY29tbWFuZCBsaW5lIGJ5IHNwYXduLlxyXG4gKiBjYWxsIHNwYXduLiBpZiBlcnJvciBvY2N1cmVkLCBjdWkgaXMga2lsbGVkIHByb2NjZXNzLlxyXG4gKlxyXG4gKiBAcGFyYW0gICB7U3RyaW5nfSAgICAgICAgICAgICAgIGNvbW1hbmQgICAgbWFpbiBjb21tYW5kLiBleCkgXCJjb3Jkb3ZhXCJcclxuICogQHBhcmFtICAge1N0cmluZ1tdfSAgICAgICAgICAgICBhcmdzICAgICAgIGNvbW1hbmQgYXJncy4gZXgpIFtcInBsdWdpblwiLCBcImFkZFwiLCBwbHVnaW5OYW1lXVxyXG4gKiBAcGFyYW0gICB7RXhlY0NvbW1hbmRPcHRpb25zfSAgIFtvcHRpb25zXSAgY2xpLXNwaW5uZXJcInMgb3B0aW9ucy5cclxuICogQHJldHVybnMge051bWJlcn0gZXJyb3IgY29kZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNDb21tYW5kKGNvbW1hbmQ6IHN0cmluZywgYXJnczogc3RyaW5nW10sIG9wdGlvbnM/OiBFeGVjQ29tbWFuZE9wdGlvbnMpOiBKUXVlcnlQcm9taXNlPG51bWJlcj4ge1xyXG4gICAgY29uc3QgZGYgPSAkLkRlZmVycmVkKCk7XHJcbiAgICBjb25zdCBvcHQ6IEV4ZWNDb21tYW5kT3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgc3RkaW86IFwiaW5oZXJpdFwiLFxyXG4gICAgICAgIHNwaW5uZXI6IHsgZm9ybWF0OiBcIiVzXCIgfSxcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIHdoaWNoKGNvbW1hbmQsIChlcnJvciwgcmVzb2x2ZWRDb21tYW5kKSA9PiB7XHJcbiAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZUVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzcGlubmVyID0gb3B0LnNwaW5uZXIgPyBnZXRTcGlubmVyKG9wdC5zcGlubmVyLmZvcm1hdCwgb3B0LnNwaW5uZXIuaW5kZXgpIDogbnVsbDtcclxuICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICBzcGlubmVyLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzcGF3bihyZXNvbHZlZENvbW1hbmQsIGFyZ3MsIG9wdClcclxuICAgICAgICAgICAgLm9uKFwiZXJyb3JcIiwgaGFuZGxlRXJyb3IpXHJcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNwaW5uZXIuc3RvcCh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGRmLnJlc29sdmUoY29kZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGRmLnByb21pc2UoKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnNcclxuICogQGJyaWVmIGNvcHlUcGwoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgQ29weVRlbXBsYXRlT3B0aW9ucyBleHRlbmRzIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIGRlbGltaXRlcnM/OiBcInt7IH19XCIgfCBcIjwlICU+XCI7IC8vIHRlbXBsYXRlIOOBq+S9v+eUqOOBmeOCiyBkZWxpbWl0ZXIuIGRlZmF1bHQ6IFwie3sgfX1cIlxyXG59XHJcblxyXG4vKipcclxuICogQ29weSB0ZW1wbGF0ZSB3aXRoIGhvZ2FuLlxyXG4gKiBzeW5jIGZ1bmN0aW9uXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgICAgICAgIHNyYyAgICAgICBzb3VyY2UgZmlsZSBwYXRoLlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBkc3QgICAgICAgZGVzdGluYXRpb24gZmlsZSBwYXRoLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICAgICAgICAgICBwYXJhbXMgICAgdGVtcGxhdGUgcGFyYW1ldGVycy5cclxuICogQHBhcmFtIHtDb3B5VGVtcGxhdGVPcHRpb25zfSAgW29wdGlvbnNdIG9wdGlvbnMgb2JqZWN0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNvcHlUcGwoc3JjOiBzdHJpbmcsIGRzdDogc3RyaW5nLCBwYXJhbXM6IE9iamVjdCwgb3B0aW9ucz86IENvcHlUZW1wbGF0ZU9wdGlvbnMpOiB2b2lkIHtcclxuICAgIGNvbnN0IG9wdCA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgICAgIGRlbGltaXRlcnM6IFwie3sgfX1cIixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG5cclxuICAgIGNvbnN0IGpzdCA9IGhvZ2FuLmNvbXBpbGUobm9ybWFsaXplVGV4dChmcy5yZWFkRmlsZVN5bmMoc3JjKS50b1N0cmluZygpLCB7IGVvbDogXCJcXG5cIiwgYm9tOiBmYWxzZSB9KSwgb3B0KTtcclxuICAgIGNvbnN0IG91dHB1dCA9IG5vcm1hbGl6ZVRleHQoanN0LnJlbmRlcihwYXJhbXMpLCBvcHQpO1xyXG5cclxuICAgIGZzLmNvcHlTeW5jKGRzdCwgb3V0cHV0LCBcInV0ZjhcIik7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogR1VJRCBnZW5lcmF0ZS5cclxuICogcmV0dXJuZWQgYXMgV2luZG93cyByZWdpc3RyeSB0eXBlIGZvcm1hdC5cclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdVSUQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBcIntcIiArIHV1aWQudjQoKS50b1VwcGVyQ2FzZSgpICsgXCJ9XCI7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQ3JlYXRlIFhNTCBET00gbm9kZS5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHIgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcmV0dXJuIHtqUXVlcnl9IFhNTCBOb2RlIGluc3RhbmNlXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gc3RyMlhtbE5vZGUoc3RyOiBzdHJpbmcpOiBKUXVlcnkge1xyXG4gICAgcmV0dXJuICQoJC5wYXJzZVhNTChzdHIpKS5jaGlsZHJlbigpO1xyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBGb3JtYXRYbWxPcHRpb25zXHJcbiAqIEBicmllZiBmb3JtYXRYTUwoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9ucyBleHRlbmRzIE5vcm1hbGl6ZVRleHRPcHRpb25zIHtcclxuICAgIHN0ZXA/OiBudW1iZXI7ICAgLy8g56m655m944K544Oa44O844K55pWwLiBkZWZhdWx0OiAyXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBYTUwgZm9ybWF0dGVyLlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgICAgICBzdHIgICAgICAgc3RyaW5nIHhtbCBmb3JtYXQuIGV4KSAnPHByZWZlcmVuY2UgbmFtZT1cIkRpc2FsbG93T3ZlcnNjcm9sbFwiIHZhbHVlPVwidHJ1ZVwiLz4nXHJcbiAqIEBwYXJhbSAge0Zvcm1hdFhtbE9wdGlvbnN9IFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgWE1MXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0WE1MKHN0cjogc3RyaW5nLCBvcHRpb25zPzogRm9ybWF0WG1sT3B0aW9ucyk6IHN0cmluZyB7XHJcbiAgICBjb25zdCBvcHQ6IEZvcm1hdFhtbE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBzdGVwOiAyLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcbiAgICBsZXQgeG1sID0gXCJcIjtcclxuICAgIGxldCBwYWQgPSAwO1xyXG4gICAgbGV0IGluZGVudDogbnVtYmVyO1xyXG4gICAgbGV0IG5vZGU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdCBzdHJBcnIgPSBub3JtYWxpemVUZXh0KHN0ciwgeyBlb2w6IFwiXFxuXCIgfSlcclxuICAgICAgICAucmVwbGFjZSgvKD4pKDwpKFxcLyopL2csIFwiJDFcXG4kMiQzXCIpIC8vIGluc2VydCBMRiB0byBlYWNoIG5vZGUgb25jZS5cclxuICAgICAgICAuc3BsaXQoXCJcXG5cIik7XHJcblxyXG4gICAgY29uc3Qgc3BhY2VzID0gKGxlbjogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgIGNvbnN0IF9pbmRlbnQgPSBsZW4gKiBvcHQuc3RlcDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9pbmRlbnQ7IGkrKykge1xyXG4gICAgICAgICAgICBzICs9IFwiIFwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH07XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJBcnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIG5vZGUgPSAkLnRyaW0oc3RyQXJyW2ldKTtcclxuICAgICAgICBpZiAobm9kZS5tYXRjaCgvLis8XFwvXFx3W14+XSo+JC8pKSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLm1hdGNoKC9ePFxcL1xcdy8pKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwYWQgLT0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXHdbXj5dKlteXFwvXT4uKiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAxO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGluZGVudCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHhtbCArPSBzcGFjZXMocGFkKSArIG5vZGUgKyBvcHQuZW9sO1xyXG4gICAgICAgIHBhZCArPSBpbmRlbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgeG1sID0geG1sLnJlcGxhY2UoL1xcblxcbi9nbSwgXCJcXG5cIik7XHJcblxyXG4gICAgcmV0dXJuIG5vcm1hbGl6ZVRleHQoeG1sLCBvcHQpO1xyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvdG9vbHMudHMiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwiY2hpbGRfcHJvY2Vzc1wiXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm9zXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIFwib3NcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjaGFsa1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiY2hhbGtcIixcImNvbW1vbmpzMlwiOlwiY2hhbGtcIn1cbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2xpLXNwaW5uZXJcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNsaS1zcGlubmVyXCIsXCJjb21tb25qczJcIjpcImNsaS1zcGlubmVyXCJ9XG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifVxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJnbG9iXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn1cbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianNkb21cIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImpzZG9tXCIsXCJjb21tb25qczJcIjpcImpzZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1dWlkXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ1dWlkXCIsXCJjb21tb25qczJcIjpcInV1aWRcIn1cbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIndoaWNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ3aGljaFwiLFwiY29tbW9uanMyXCI6XCJ3aGljaFwifVxuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwieG1sZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJ4bWxkb21cIixcImNvbW1vbmpzMlwiOlwieG1sZG9tXCJ9XG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJob2dhbi5qc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9XG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJsb2Rhc2hcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn1cbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInVuZGVyc2NvcmUuc3RyaW5nXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wiLFwiY29tbW9uanMyXCI6XCJ1bmRlcnNjb3JlLnN0cmluZ1wifVxuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwianF1ZXJ5XCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcImpRdWVyeVwiLFwiY29tbW9uanNcIjpcImpxdWVyeVwiLFwiY29tbW9uanMyXCI6XCJqcXVlcnlcIixcImFtZFwiOlwianF1ZXJ5XCJ9XG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXX0=