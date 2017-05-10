import * as fs from "fs-extra";
import * as glob from "glob";
import * as hogan from "hogan.js";
import * as _l from "lodash";
import * as _s from "underscore.string";
import * as which from "which";
import * as uuid from "uuid";
import * as chalk from "chalk";
import * as semverRegex from "semver-regex";
import { Spinner } from "cli-spinner";

const $: JQueryStatic = (() => {
    (<any>global).DOMParser = require("xmldom").DOMParser;
    const _window = (() => {
        const jsdom = require("jsdom");
        if ("function" === typeof jsdom.JSDOM) {    // v10+
            return new jsdom.JSDOM().window;
        } else {                                    // v9.12.x
            return jsdom.jsdom().defaultView;
        }
    })();
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
