/*!
 * cdp-lib.js 0.0.1
 *
 * Date: 2017-05-08T03:54:49.968Z
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
    const _window = (() => {
        const jsdom = __webpack_require__(10);
        if ("function" === typeof jsdom.JSDOM) {
            return new jsdom.JSDOM().window;
        }
        else {
            return jsdom.jsdom().defaultView;
        }
    })();
    return __webpack_require__(17)(_window);
})();
exports.$ = $;
const _m = _l.mixin(_s.exports());
exports._ = _m;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utils = __webpack_require__(2);
exports.Utils = Utils;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzY5OTkyNjg1YmQ0NDg2MWU2NjEiLCJjZHA6Ly8vY2RwLWxpYi91dGlscy9saWJzLnRzIiwiY2RwOi8vL2NkcC1saWIvY2RwLWxpYi50cyIsImNkcDovLy9jZHAtbGliL3V0aWxzL2luZGV4LnRzIiwiY2RwOi8vL2NkcC1saWIvdXRpbHMvdG9vbHMudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyBcImNoaWxkX3Byb2Nlc3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIFwib3NcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJjaGFsa1wiLFwiY29tbW9uanMyXCI6XCJjaGFsa1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJjbGktc3Bpbm5lclwiLFwiY29tbW9uanMyXCI6XCJjbGktc3Bpbm5lclwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJmcy1leHRyYVwiLFwiY29tbW9uanMyXCI6XCJmcy1leHRyYVwifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwvIHtcImNvbW1vbmpzXCI6XCJnbG9iXCIsXCJjb21tb25qczJcIjpcImdsb2JcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwianNkb21cIixcImNvbW1vbmpzMlwiOlwianNkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcIndoaWNoXCIsXCJjb21tb25qczJcIjpcIndoaWNoXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wiY29tbW9uanNcIjpcInhtbGRvbVwiLFwiY29tbW9uanMyXCI6XCJ4bWxkb21cIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJIb2dhblwiLFwiY29tbW9uanNcIjpcImhvZ2FuLmpzXCIsXCJjb21tb25qczJcIjpcImhvZ2FuLmpzXCIsXCJhbWRcIjpcImhvZ2FuLmpzXCJ9Iiwid2VicGFjazovLy9leHRlcm5hbC8ge1wicm9vdFwiOlwiX1wiLFwiY29tbW9uanNcIjpcImxvZGFzaFwiLFwiY29tbW9uanMyXCI6XCJsb2Rhc2hcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsLyB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7O0FDaEVBLGtDQUErQjtBQTJCM0IsZ0JBQUU7QUExQk4sb0NBQTZCO0FBMkJ6QixvQkFBSTtBQTFCUixzQ0FBa0M7QUEyQjlCLHNCQUFLO0FBMUJULG1DQUE2QjtBQUM3QixtQ0FBd0M7QUFDeEMsc0NBQStCO0FBMkIzQixzQkFBSztB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LENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVixHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNMLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLENBQUM7UUFDRCxHQUFHLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO1FBQ3BDLEdBQUcsSUFBSSxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVELEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUVsQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBN0NELDhCQTZDQzs7Ozs7OztBQzNRRCwwQzs7Ozs7O0FDQUEsK0I7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSx3Qzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLGlDOzs7Ozs7QUNBQSxrQzs7Ozs7O0FDQUEsaUM7Ozs7OztBQ0FBLGtDOzs7Ozs7QUNBQSxtQzs7Ozs7O0FDQUEscUM7Ozs7OztBQ0FBLG1DOzs7Ozs7QUNBQSw4Qzs7Ozs7O0FDQUEsbUMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDE4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBjNjk5OTI2ODViZDQ0ODYxZTY2MSIsImltcG9ydCAqIGFzIGZzIGZyb20gXCJmcy1leHRyYVwiO1xyXG5pbXBvcnQgKiBhcyBnbG9iIGZyb20gXCJnbG9iXCI7XHJcbmltcG9ydCAqIGFzIGhvZ2FuIGZyb20gXCJob2dhbi5qc1wiO1xyXG5pbXBvcnQgKiBhcyBfbCBmcm9tIFwibG9kYXNoXCI7XHJcbmltcG9ydCAqIGFzIF9zIGZyb20gXCJ1bmRlcnNjb3JlLnN0cmluZ1wiO1xyXG5pbXBvcnQgKiBhcyB3aGljaCBmcm9tIFwid2hpY2hcIjtcclxuaW1wb3J0ICogYXMgdXVpZCBmcm9tIFwidXVpZFwiO1xyXG5pbXBvcnQgKiBhcyBjaGFsayBmcm9tIFwiY2hhbGtcIjtcclxuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gXCJjbGktc3Bpbm5lclwiO1xyXG5cclxuY29uc3QgJDogSlF1ZXJ5U3RhdGljID0gKCgpID0+IHtcclxuICAgICg8YW55Pmdsb2JhbCkuRE9NUGFyc2VyID0gcmVxdWlyZShcInhtbGRvbVwiKS5ET01QYXJzZXI7XHJcbiAgICBjb25zdCBfd2luZG93ID0gKCgpID0+IHtcclxuICAgICAgICBjb25zdCBqc2RvbSA9IHJlcXVpcmUoXCJqc2RvbVwiKTtcclxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YganNkb20uSlNET00pIHsgICAgLy8gdjEwK1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGpzZG9tLkpTRE9NKCkud2luZG93O1xyXG4gICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdjkuMTIueFxyXG4gICAgICAgICAgICByZXR1cm4ganNkb20uanNkb20oKS5kZWZhdWx0VmlldztcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG4gICAgcmV0dXJuIHJlcXVpcmUoXCJqcXVlcnlcIikoX3dpbmRvdyk7XHJcbn0pKCk7XHJcblxyXG5leHBvcnQgdHlwZSBNaXhpbmVkVW5kZXJzY29yZVN0YXRpYyA9IHR5cGVvZiBfcyAmIHR5cGVvZiBfbDtcclxuY29uc3QgX206IE1peGluZWRVbmRlcnNjb3JlU3RhdGljID0gPGFueT5fbC5taXhpbig8YW55Pl9zLmV4cG9ydHMoKSk7XHJcblxyXG5leHBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBnbG9iLFxyXG4gICAgaG9nYW4sXHJcbiAgICAkLFxyXG4gICAgX20gYXMgXyxcclxuICAgIHdoaWNoLFxyXG4gICAgdXVpZCxcclxuICAgIGNoYWxrLFxyXG4gICAgU3Bpbm5lcixcclxufTtcclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uLy4uL3NyYy91dGlscy9saWJzLnRzIiwiaW1wb3J0ICogYXMgVXRpbHMgZnJvbSBcIi4vdXRpbHNcIjtcclxuZXhwb3J0IHsgVXRpbHMgfTtcclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElQcm9qZWN0Q29uZmlncmF0aW9uXHJcbiAqIEBicmllZiDjg5fjg63jgrjjgqfjgq/jg4jlhbHpgJrjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVByb2plY3RDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdE5hbWU6IHN0cmluZzsgICAgLy8g44OX44Ot44K444Kn44Kv44OI5ZCNIGV4KSBjZHAtbGliXHJcbiAgICBwcm9qZWN0S2luZDogc3RyaW5nOyAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jnqK7poZ4gZXgpIGxpYnJhcnlcclxuICAgIHZlcnNpb246IHN0cmluZzsgICAgICAgIC8vIOODkOODvOOCuOODp+ODsyBleCkgMS4wLjBcclxuICAgIGxpY2Vuc2U6IHN0cmluZzsgICAgICAgIC8vIOODqeOCpOOCu+ODs+OCuSBleCkgQXBhY2hlLTIuMFxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJQ29tcGlsZUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYg44Kz44Oz44OR44Kk44Or44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElDb21waWxlQ29uZmlncmF0aW9uIHtcclxuICAgIC8vIFR5cGVTY3JpcHRcclxuICAgIHRzVHJhbnNwaWxlVGFyZ2V0PzogXCJlczVcIiB8IFwiZXMyMDE1XCI7ICAgICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQg44GuIHRyYW5zcGlsZSB0YXJnZXRcclxuICAgIG1vZHVsZVN5c3RlbT86IFwibm9uZVwiIHwgXCJjb21tb25qc1wiIHwgXCJhbWRcIiB8IFwidW1kXCI7ICAgICAvLyBKYXZhU2NyaXB0IG1vZHVsZSBzeXN0ZW1cclxuICAgIC8vIFdlYnBhY2tcclxuICAgIHdlYnBhY2tUYXJnZXQ/OiBzdHJpbmc7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2VicGFjayB0YXJnZXQgY29uZmlndXJhdGlvblxyXG4gICAgLy8gQ1NTXHJcbiAgICBzdXBwb3J0Q1NTPzogYm9vbGVhbjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENTUyDjgpLlkKvjgoHjgovloLTlkIjjgavjga8gdHJ1ZVxyXG59XHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBJTGlicmFyeUNvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgbGlicmFyeSBtb2R1bGUg44OX44Ot44K444Kn44Kv44OI44Gu44Kz44Oz44OV44Kj44Ku44Ol44Os44O844K344On44Oz6Kit5a6aXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIElMaWJyYXJ5Q29uZmlncmF0aW9uIGV4dGVuZHMgSVByb2plY3RDb25maWdyYXRpb24sIElDb21waWxlQ29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3RLaW5kOiBcImxpYnJhcnlcIjsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jnqK7poZ4gZXgpIGxpYnJhcnlcclxuICAgIHdlYnBhY2tUYXJnZXQ/OiBcIm5vZGVcIiB8IFwid2ViXCIgfCBcImVsZWN0cm9uXCIgfCBcImVsZWN0cm9uLXJlbmRlcmVyXCI7ICAvLyBXZWJwYWNrIHRhcmdldCBjb25maWd1cmF0aW9uXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIElNb2JpbGVBcHBDb25maWdyYXRpb25cclxuICogQGJyaWVmIG1vYmlsZSDjg5fjg63jgrjjgqfjgq/jg4jjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1vYmlsZUFwcENvbmZpZ3JhdGlvbiBleHRlbmRzIElQcm9qZWN0Q29uZmlncmF0aW9uLCBJQ29tcGlsZUNvbmZpZ3JhdGlvbiB7XHJcbiAgICBwcm9qZWN0S2luZDogXCJtb2JpbGVcIjsgIC8vIOODl+ODreOCuOOCp+OCr+ODiOeorumhnlxyXG4gICAgd2VicGFja1RhcmdldD86IFwid2ViXCI7ICAvLyBXZWJwYWNrIHRhcmdldCBjb25maWd1cmF0aW9uXHJcbiAgICBzdXBwb3J0Q1NTOiB0cnVlOyAgICAgICAvLyBDU1Mg44KS5ZCr44KB44KL5aC05ZCI44Gr44GvIHRydWVcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSURlc2t0b3BBcHBDb25maWdyYXRpb25cclxuICogQGJyaWVmIG1vYmlsZSDjg5fjg63jgrjjgqfjgq/jg4jjga7jgrPjg7Pjg5XjgqPjgq7jg6Xjg6zjg7zjgrfjg6fjg7PoqK3lrppcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgSURlc2t0b3BBcHBDb25maWdyYXRpb24gZXh0ZW5kcyBJUHJvamVjdENvbmZpZ3JhdGlvbiwgSUNvbXBpbGVDb25maWdyYXRpb24ge1xyXG4gICAgcHJvamVjdEtpbmQ6IFwiZGVza3RvcFwiOyAgICAgICAgICAgICAgICAgICAgICAgICAvLyDjg5fjg63jgrjjgqfjgq/jg4jnqK7poZ5cclxuICAgIHdlYnBhY2tUYXJnZXQ/OiBcIndlYlwiIHwgXCJlbGVjdHJvbi1yZW5kZXJlclwiOyAgICAvLyBXZWJwYWNrIHRhcmdldCBjb25maWd1cmF0aW9uXHJcbiAgICBzdXBwb3J0Q1NTOiB0cnVlOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDU1Mg44KS5ZCr44KB44KL5aC05ZCI44Gr44GvIHRydWVcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgSVdlYkFwcENvbmZpZ3JhdGlvblxyXG4gKiBAYnJpZWYgd2ViIOODl+ODreOCuOOCp+OCr+ODiOOBruOCs+ODs+ODleOCo+OCruODpeODrOODvOOCt+ODp+ODs+ioreWumlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJV2ViQXBwQ29uZmlncmF0aW9uIGV4dGVuZHMgSVByb2plY3RDb25maWdyYXRpb24sIElDb21waWxlQ29uZmlncmF0aW9uIHtcclxuICAgIHByb2plY3RLaW5kOiBcIndlYlwiOyAgICAgLy8g44OX44Ot44K444Kn44Kv44OI56iu6aGeXHJcbiAgICB3ZWJwYWNrVGFyZ2V0PzogXCJ3ZWJcIjsgIC8vIFdlYnBhY2sgdGFyZ2V0IGNvbmZpZ3VyYXRpb25cclxuICAgIHN1cHBvcnRDU1M6IHRydWU7ICAgICAgIC8vIENTUyDjgpLlkKvjgoHjgovloLTlkIjjgavjga8gdHJ1ZVxyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBDRFBMaWJcclxuICogQGJyaWVmIENEUCBib2lsZXJwbGF0ZSDnlJ/miJDmqZ/og73jgpLmj5DkvpvjgZnjgovjgq/jg6njgrlcclxuICovXHJcbmV4cG9ydCBjbGFzcyBDRFBMaWIge1xyXG4gICAgLyoqXHJcbiAgICAgKiBtYWluIGNvbW1hbmRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBleGVjdXRlKG9wdGlvbnM6IElQcm9qZWN0Q29uZmlncmF0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJva1wiKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2NkcC1saWIudHMiLCJleHBvcnQgKiBmcm9tIFwiLi9saWJzXCI7XHJcbmV4cG9ydCAqIGZyb20gXCIuL3Rvb2xzXCI7XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi8uLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJpbXBvcnQge1xyXG4gICAgZnMsXHJcbiAgICBob2dhbixcclxuICAgICQsXHJcbiAgICB3aGljaCxcclxuICAgIHV1aWQsXHJcbiAgICBjaGFsayxcclxuICAgIFNwaW5uZXIsXHJcbn0gZnJvbSBcIi4vbGlic1wiO1xyXG5cclxuaW1wb3J0IHsgc3Bhd24sIFNwYXduT3B0aW9ucyB9IGZyb20gXCJjaGlsZF9wcm9jZXNzXCI7XHJcblxyXG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcclxuXHJcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXHJcbi8vIGV4cG9ydHMgbWV0aG9kczpcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgY29tbWFuZCBsaW5lIGVycm9yIGFuZCBraWxsIHByb2Nlc3MuXHJcbiAqIFdoZW4gdGhlIGFwcGxpY2F0aW9uIHJlY2VpdmVkIGVycm9yIGZyb20gY2xpLCBwbGVhc2UgY2FsbCB0aGlzIG1ldGhvZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGVycm9yICBlcnJvciBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYW5kbGVFcnJvcihlcnJvcjogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmVycm9yKGNoYWxrLnJlZChlcnJvcikpO1xyXG4gICAgLy8gcmV0dXJuZWQgZXhpdCBjb2RlID0gMSAoZmFpbClcclxuICAgIHByb2Nlc3MuZXhpdCgxKTtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBHZXQgc3Bpbm5lciBpbnN0YW5jZS5cclxuICogQ0xJIGhlbHBlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgW2Zvcm1hdF0gIHNwaW5uZXIgZm9ybWF0IHN0cmluZy5cclxuICogQHBhcmFtICB7TnVtYmVyfSAgW2luZGV4XSAgIHNwaW5uZXIgaW5kZXggZGVmaW5lZCBieSBjbGktc3Bpbm5lci4gKGRlZmF1bHQ6IHJhbmRvbSBbMC05XSlcclxuICogQHJldHVybiB7U3Bpbm5lcn0gY2xpLXNwaW5uZXIgaW5zdGFuY2UuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3Bpbm5lcihmb3JtYXQ/OiBzdHJpbmcsIGluZGV4PzogbnVtYmVyKTogeyBzdGFydDogKCkgPT4gdm9pZDsgc3RvcDogKGNsZWFuPzogYm9vbGVhbikgPT4gdm9pZDsgfSB7XHJcbiAgICBjb25zdCBmbXQgPSBmb3JtYXQgfHwgXCIlc1wiO1xyXG4gICAgY29uc3Qgc3Bpbm5lciA9IG5ldyBTcGlubmVyKGZtdCk7XHJcbiAgICBjb25zdCBpZHggPSAobnVsbCAhPSBpbmRleCAmJiAwIDw9IGluZGV4ICYmIGluZGV4IDwgMTApID8gaW5kZXggOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTsgLy8gcmFuZG9tIHZhbHVlIG9mIHByZXNldCBhcnJheVswLTldXHJcbiAgICBzcGlubmVyLnNldFNwaW5uZXJTdHJpbmcoU3Bpbm5lci5zcGlubmVyc1tpZHhdKTtcclxuICAgIHJldHVybiBzcGlubmVyO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgTm9ybWFsaXplVGV4dE9wdGlvbnNcclxuICogQGJyaWVmIG5vcm1hbGl6ZVRleHQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTm9ybWFsaXplVGV4dE9wdGlvbnMge1xyXG4gICAgZW9sPzogc3RyaW5nOyAgIC8vIGRlZmF1bHQ6IG9zLkVPTFxyXG4gICAgYm9tPzogYm9vbGVhbjsgIC8vIGRlZmF1bHQ6IHRydWVcclxuICAgIHRhYj86IG51bWJlcjsgICAvLyB0YWIg44KS5aSJ5o+b44GZ44KL44K544Oa44O844K544Gu5pWw44KS5oyH5a6aLiBkZWZhdWx0OiDlpInmj5vjgZfjgarjgYRcclxufVxyXG5cclxuLyoqXHJcbiAqIE5vcm1hbGl6ZSB0ZXh0IGxpbmUtZmVlZC5cclxuICogZm9yIHdpbmRvd3MgZ2l0IHVzZXIuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgICAgICAgICB0ZXh0ICAgICAgaW5wdXQgdGV4dC5cclxuICogQHBhcmFtICB7Tm9ybWFsaXplVGV4dE9wdGlvbnN9IFtvcHRpb25zXSBvcHRpb24uXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gbm9ybWFsaXplZCB0ZXh0LlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVRleHQodGV4dDogc3RyaW5nLCBvcHRpb25zPzogTm9ybWFsaXplVGV4dE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBOb3JtYWxpemVUZXh0T3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCB7XHJcbiAgICAgICAgZW9sOiBvcy5FT0wsXHJcbiAgICAgICAgYm9tOiB0cnVlLFxyXG4gICAgfSwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGV4dCA9IHRleHRcclxuICAgICAgICAucmVwbGFjZSgvXlxcdWZlZmYvZ20sIFwiXCIpICAgLy8gcmVtb3ZlIGJvbVxyXG4gICAgICAgIC5yZXBsYWNlKC9cXHJcXG4vZ20sIFwiXFxuXCIpICAgIC8vIG9uY2UgJ1xcbidcclxuICAgICAgICAucmVwbGFjZSgvXFxyL2dtLCBcIlxcblwiKVxyXG4gICAgO1xyXG5cclxuICAgIGlmIChvcHQuYm9tKSB7XHJcbiAgICAgICAgdGV4dCA9IFwiXFx1ZmVmZlwiICsgdGV4dDtcclxuICAgIH1cclxuICAgIGlmIChcIlxcblwiICE9PSBvcHQuZW9sKSB7XHJcbiAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSgvXFxuL2dtLCBvcHQuZW9sKTtcclxuICAgIH1cclxuICAgIGlmIChvcHQudGFiKSB7XHJcbiAgICAgICAgY29uc3Qgc3BhY2VzID0gKCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IHMgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9wdC50YWI7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcztcclxuICAgICAgICB9KSgpO1xyXG4gICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcdC9nbSwgc3BhY2VzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGV4dDtcclxufVxyXG5cclxuLy9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fLy9cclxuXHJcbi8qKlxyXG4gKiBAaW50ZXJmYWNlIEV4ZWNDb21tYW5kT3B0aW9uc1xyXG4gKiBAYnJpZWYgZXhlY0NvbW1hbmQoKSDjgavmjIflrprjgZnjgovjgqrjg5fjgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgRXhlY0NvbW1hbmRPcHRpb25zIGV4dGVuZHMgU3Bhd25PcHRpb25zIHtcclxuICAgIHNwaW5uZXI/OiB7XHJcbiAgICAgICAgZm9ybWF0Pzogc3RyaW5nOyAgICAvLyBleCkgXCIlc1wiXHJcbiAgICAgICAgaW5kZXg/OiBudW1iZXI7ICAgICAvLyAwIC0gOSDjga7mlbDlgKTjgpLmjIflrppcclxuICAgIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeGVjdXRlIGNvbW1hbmQgbGluZSBieSBzcGF3bi5cclxuICogY2FsbCBzcGF3bi4gaWYgZXJyb3Igb2NjdXJlZCwgY3VpIGlzIGtpbGxlZCBwcm9jY2Vzcy5cclxuICpcclxuICogQHBhcmFtICAge1N0cmluZ30gICAgICAgICAgICAgICBjb21tYW5kICAgIG1haW4gY29tbWFuZC4gZXgpIFwiY29yZG92YVwiXHJcbiAqIEBwYXJhbSAgIHtTdHJpbmdbXX0gICAgICAgICAgICAgYXJncyAgICAgICBjb21tYW5kIGFyZ3MuIGV4KSBbXCJwbHVnaW5cIiwgXCJhZGRcIiwgcGx1Z2luTmFtZV1cclxuICogQHBhcmFtICAge0V4ZWNDb21tYW5kT3B0aW9uc30gICBbb3B0aW9uc10gIGNsaS1zcGlubmVyXCJzIG9wdGlvbnMuXHJcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IGVycm9yIGNvZGVcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBleGVjQ29tbWFuZChjb21tYW5kOiBzdHJpbmcsIGFyZ3M6IHN0cmluZ1tdLCBvcHRpb25zPzogRXhlY0NvbW1hbmRPcHRpb25zKTogSlF1ZXJ5UHJvbWlzZTxudW1iZXI+IHtcclxuICAgIGNvbnN0IGRmID0gJC5EZWZlcnJlZCgpO1xyXG4gICAgY29uc3Qgb3B0OiBFeGVjQ29tbWFuZE9wdGlvbnMgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIHN0ZGlvOiBcImluaGVyaXRcIixcclxuICAgICAgICBzcGlubmVyOiB7IGZvcm1hdDogXCIlc1wiIH0sXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICB3aGljaChjb21tYW5kLCAoZXJyb3IsIHJlc29sdmVkQ29tbWFuZCkgPT4ge1xyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICBoYW5kbGVFcnJvcihKU09OLnN0cmluZ2lmeShlcnJvcikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3Qgc3Bpbm5lciA9IG9wdC5zcGlubmVyID8gZ2V0U3Bpbm5lcihvcHQuc3Bpbm5lci5mb3JtYXQsIG9wdC5zcGlubmVyLmluZGV4KSA6IG51bGw7XHJcbiAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgc3Bpbm5lci5zdGFydCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3Bhd24ocmVzb2x2ZWRDb21tYW5kLCBhcmdzLCBvcHQpXHJcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIGhhbmRsZUVycm9yKVxyXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzcGlubmVyLnN0b3AodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBkZi5yZXNvbHZlKGNvZGUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZi5wcm9taXNlKCk7XHJcbn1cclxuXHJcbi8vX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fXy8vXHJcblxyXG4vKipcclxuICogQGludGVyZmFjZSBDb3B5VGVtcGxhdGVPcHRpb25zXHJcbiAqIEBicmllZiBjb3B5VHBsKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIENvcHlUZW1wbGF0ZU9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBkZWxpbWl0ZXJzPzogXCJ7eyB9fVwiIHwgXCI8JSAlPlwiOyAvLyB0ZW1wbGF0ZSDjgavkvb/nlKjjgZnjgosgZGVsaW1pdGVyLiBkZWZhdWx0OiBcInt7IH19XCJcclxufVxyXG5cclxuLyoqXHJcbiAqIENvcHkgdGVtcGxhdGUgd2l0aCBob2dhbi5cclxuICogc3luYyBmdW5jdGlvblxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgICAgICAgICBzcmMgICAgICAgc291cmNlIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICAgICAgICAgZHN0ICAgICAgIGRlc3RpbmF0aW9uIGZpbGUgcGF0aC5cclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgICAgICAgICAgcGFyYW1zICAgIHRlbXBsYXRlIHBhcmFtZXRlcnMuXHJcbiAqIEBwYXJhbSB7Q29weVRlbXBsYXRlT3B0aW9uc30gIFtvcHRpb25zXSBvcHRpb25zIG9iamVjdC5cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjb3B5VHBsKHNyYzogc3RyaW5nLCBkc3Q6IHN0cmluZywgcGFyYW1zOiBPYmplY3QsIG9wdGlvbnM/OiBDb3B5VGVtcGxhdGVPcHRpb25zKTogdm9pZCB7XHJcbiAgICBjb25zdCBvcHQgPSAkLmV4dGVuZCh7fSwge1xyXG4gICAgICAgIGVvbDogb3MuRU9MLFxyXG4gICAgICAgIGJvbTogdHJ1ZSxcclxuICAgICAgICBkZWxpbWl0ZXJzOiBcInt7IH19XCIsXHJcbiAgICB9LCBvcHRpb25zKTtcclxuXHJcbiAgICBjb25zdCBqc3QgPSBob2dhbi5jb21waWxlKG5vcm1hbGl6ZVRleHQoZnMucmVhZEZpbGVTeW5jKHNyYykudG9TdHJpbmcoKSwgeyBlb2w6IFwiXFxuXCIsIGJvbTogZmFsc2UgfSksIG9wdCk7XHJcbiAgICBjb25zdCBvdXRwdXQgPSBub3JtYWxpemVUZXh0KGpzdC5yZW5kZXIocGFyYW1zKSwgb3B0KTtcclxuXHJcbiAgICBmcy5jb3B5U3luYyhkc3QsIG91dHB1dCwgXCJ1dGY4XCIpO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIEdVSUQgZ2VuZXJhdGUuXHJcbiAqIHJldHVybmVkIGFzIFdpbmRvd3MgcmVnaXN0cnkgdHlwZSBmb3JtYXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHVUlEKCk6IHN0cmluZyB7XHJcbiAgICByZXR1cm4gXCJ7XCIgKyB1dWlkLnY0KCkudG9VcHBlckNhc2UoKSArIFwifVwiO1xyXG59XHJcblxyXG4vL19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX18vL1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBYTUwgRE9NIG5vZGUuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyICBzdHJpbmcgeG1sIGZvcm1hdC4gZXgpICc8cHJlZmVyZW5jZSBuYW1lPVwiRGlzYWxsb3dPdmVyc2Nyb2xsXCIgdmFsdWU9XCJ0cnVlXCIvPidcclxuICogQHJldHVybiB7alF1ZXJ5fSBYTUwgTm9kZSBpbnN0YW5jZVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cjJYbWxOb2RlKHN0cjogc3RyaW5nKTogSlF1ZXJ5IHtcclxuICAgIHJldHVybiAkKCQucGFyc2VYTUwoc3RyKSkuY2hpbGRyZW4oKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBpbnRlcmZhY2UgRm9ybWF0WG1sT3B0aW9uc1xyXG4gKiBAYnJpZWYgZm9ybWF0WE1MKCkg44Gr5oyH5a6a44GZ44KL44Kq44OX44K344On44OzXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1hdFhtbE9wdGlvbnMgZXh0ZW5kcyBOb3JtYWxpemVUZXh0T3B0aW9ucyB7XHJcbiAgICBzdGVwPzogbnVtYmVyOyAgIC8vIOepuueZveOCueODmuODvOOCueaVsC4gZGVmYXVsdDogMlxyXG59XHJcblxyXG4vKipcclxuICogWE1MIGZvcm1hdHRlci5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICAgICAgc3RyICAgICAgIHN0cmluZyB4bWwgZm9ybWF0LiBleCkgJzxwcmVmZXJlbmNlIG5hbWU9XCJEaXNhbGxvd092ZXJzY3JvbGxcIiB2YWx1ZT1cInRydWVcIi8+J1xyXG4gKiBAcGFyYW0gIHtGb3JtYXRYbWxPcHRpb25zfSBbb3B0aW9uc10gb3B0aW9ucyBvYmplY3QuXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gZm9ybWF0dGVkIFhNTFxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFhNTChzdHI6IHN0cmluZywgb3B0aW9ucz86IEZvcm1hdFhtbE9wdGlvbnMpOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0OiBGb3JtYXRYbWxPcHRpb25zID0gJC5leHRlbmQoe30sIHtcclxuICAgICAgICBlb2w6IG9zLkVPTCxcclxuICAgICAgICBib206IHRydWUsXHJcbiAgICAgICAgc3RlcDogMixcclxuICAgIH0sIG9wdGlvbnMpO1xyXG4gICAgbGV0IHhtbCA9IFwiXCI7XHJcbiAgICBsZXQgcGFkID0gMDtcclxuICAgIGxldCBpbmRlbnQ6IG51bWJlcjtcclxuICAgIGxldCBub2RlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3Qgc3RyQXJyID0gbm9ybWFsaXplVGV4dChzdHIsIHsgZW9sOiBcIlxcblwiIH0pXHJcbiAgICAgICAgLnJlcGxhY2UoLyg+KSg8KShcXC8qKS9nLCBcIiQxXFxuJDIkM1wiKSAvLyBpbnNlcnQgTEYgdG8gZWFjaCBub2RlIG9uY2UuXHJcbiAgICAgICAgLnNwbGl0KFwiXFxuXCIpO1xyXG5cclxuICAgIGNvbnN0IHNwYWNlcyA9IChsZW46IG51bWJlcikgPT4ge1xyXG4gICAgICAgIGxldCBzID0gXCJcIjtcclxuICAgICAgICBjb25zdCBfaW5kZW50ID0gbGVuICogb3B0LnN0ZXA7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfaW5kZW50OyBpKyspIHtcclxuICAgICAgICAgICAgcyArPSBcIiBcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHM7XHJcbiAgICB9O1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyQXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaW5kZW50ID0gMDtcclxuICAgICAgICBub2RlID0gJC50cmltKHN0ckFycltpXSk7XHJcbiAgICAgICAgaWYgKG5vZGUubWF0Y2goLy4rPFxcL1xcd1tePl0qPiQvKSkge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5tYXRjaCgvXjxcXC9cXHcvKSkge1xyXG4gICAgICAgICAgICBpZiAocGFkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcGFkIC09IDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUubWF0Y2goL148XFx3W14+XSpbXlxcL10+LiokLykpIHtcclxuICAgICAgICAgICAgaW5kZW50ID0gMTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpbmRlbnQgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB4bWwgKz0gc3BhY2VzKHBhZCkgKyBub2RlICsgb3B0LmVvbDtcclxuICAgICAgICBwYWQgKz0gaW5kZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHhtbCA9IHhtbC5yZXBsYWNlKC9cXG5cXG4vZ20sIFwiXFxuXCIpO1xyXG5cclxuICAgIHJldHVybiBub3JtYWxpemVUZXh0KHhtbCwgb3B0KTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vLi4vc3JjL3V0aWxzL3Rvb2xzLnRzIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcImNoaWxkX3Byb2Nlc3NcIlxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJvc1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcIm9zXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiY2hhbGtcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImNoYWxrXCIsXCJjb21tb25qczJcIjpcImNoYWxrXCJ9XG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImNsaS1zcGlubmVyXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJjbGktc3Bpbm5lclwiLFwiY29tbW9uanMyXCI6XCJjbGktc3Bpbm5lclwifVxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZnMtZXh0cmFcIixcImNvbW1vbmpzMlwiOlwiZnMtZXh0cmFcIn1cbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZ2xvYlwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZ2xvYlwiLFwiY29tbW9uanMyXCI6XCJnbG9iXCJ9XG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzZG9tXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJqc2RvbVwiLFwiY29tbW9uanMyXCI6XCJqc2RvbVwifVxuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXVpZFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwidXVpZFwiLFwiY29tbW9uanMyXCI6XCJ1dWlkXCJ9XG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ3aGljaFwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwid2hpY2hcIixcImNvbW1vbmpzMlwiOlwid2hpY2hcIn1cbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInhtbGRvbVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJjb21tb25qc1wiOlwieG1sZG9tXCIsXCJjb21tb25qczJcIjpcInhtbGRvbVwifVxuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaG9nYW4uanNcIik7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwge1wicm9vdFwiOlwiSG9nYW5cIixcImNvbW1vbmpzXCI6XCJob2dhbi5qc1wiLFwiY29tbW9uanMyXCI6XCJob2dhbi5qc1wiLFwiYW1kXCI6XCJob2dhbi5qc1wifVxuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIGV4dGVybmFsIHtcInJvb3RcIjpcIl9cIixcImNvbW1vbmpzXCI6XCJsb2Rhc2hcIixcImNvbW1vbmpzMlwiOlwibG9kYXNoXCJ9XG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1bmRlcnNjb3JlLnN0cmluZ1wiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJfXCIsXCJjb21tb25qc1wiOlwidW5kZXJzY29yZS5zdHJpbmdcIixcImNvbW1vbmpzMlwiOlwidW5kZXJzY29yZS5zdHJpbmdcIn1cbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpxdWVyeVwiKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCB7XCJyb290XCI6XCJqUXVlcnlcIixcImNvbW1vbmpzXCI6XCJqcXVlcnlcIixcImNvbW1vbmpzMlwiOlwianF1ZXJ5XCIsXCJhbWRcIjpcImpxdWVyeVwifVxuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl19