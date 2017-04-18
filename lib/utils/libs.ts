import * as fs from "fs-extra";

let $: JQueryStatic = (() => {
    (<any>global).DOMParser = require("xmldom").DOMParser;
    var jsdom = require("jsdom");
    return require("jquery")(jsdom.jsdom().defaultView);
})();

export {
    fs,
    $,
};
