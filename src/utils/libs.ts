import * as fs from "fs-extra";
import * as glob from "glob";
import * as hogan from "hogan.js";
import * as _l from "lodash";
import * as _s from "underscore.string";
import * as which from "which";
import * as uuid from "uuid";
import chalk from "chalk";
import * as semverRegex from "semver-regex";
import { Spinner } from "cli-spinner";

const $: JQueryStatic = (() => {
    const _window = (() => {
        const jsdom = require("jsdom");
        if ("function" === typeof jsdom.JSDOM) {    // v10+
            return new jsdom.JSDOM().window;
        } else {                                    // v9.12.x
            return jsdom.jsdom().defaultView;
        }
    })();

    // patch scope:
    ((root: any) => {
        /*
         * jsdom 9.4.0 - 9.12.0 に実装されている DOMParser は XML の serialize ができないため,
         * xmldom に置き換える
         * jsdom 10.1.0 まで動かないことを確認
         */
        const xmldom = require("xmldom");
        root.DOMParser = xmldom.DOMParser;
        // xmldom には dom.toString() が実装されているが、global にも export する
        (<any>global).XMLSerializer = root.XMLSerializer = xmldom.XMLSerializer;
    })(_window);

    return require("jquery")(_window);
})();

export type MixinedUnderscoreStatic = typeof _s & typeof _l;
const _m: MixinedUnderscoreStatic = <any>_l.mixin(<any>_s.exports());

export {
    fs,
    glob,
    hogan,
    $,
    _m as _,
    which,
    uuid,
    chalk,
    semverRegex,
    Spinner,
};
