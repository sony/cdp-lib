﻿import * as fs from "fs-extra";
import * as glob from "glob";
import * as hogan from "hogan.js";
import * as _l from "lodash";
import * as _s from "underscore.string";
import * as which from "which";
import * as chalk from "chalk";
import { Spinner } from "cli-spinner";

let $: JQueryStatic = (() => {
    (<any>global).DOMParser = require("xmldom").DOMParser;
    let jsdom = require("jsdom");
    return require("jquery")(jsdom.jsdom().defaultView);
})();

export type MixinedUnderscoreStatic = typeof _s & typeof _l;
let _m: MixinedUnderscoreStatic = <any>_l.mixin(<any>_s.exports());

export {
    fs,
    glob,
    hogan,
    $,
    _m as _,
    which,
    chalk,
    Spinner,
};