const fs = require("fs-extra");

const DIST_DIR          = "./dist/"
const BUILT_DIR         = "./built/"
const TYPES             = "@types/"
const LIBRARY_FILE      = DIST_DIR + 'cdp-lib.js';
const TYPE_DEF_FILE_SRC = BUILT_DIR + 'cdp-lib.d.ts';
const TYPE_DEF_FILE_DST = DIST_DIR + TYPES + 'cdp-lib.d.ts';

function normalize() {
    var src = fs.readFileSync(LIBRARY_FILE).toString();
    src = '\ufeff' + src
        .replace(/\ufeff/gm, '')    // remove bom
        .replace(/\t/gm, '    ')
        .replace(/\r\n/gm, '\n')
    ;
    fs.writeFileSync(LIBRARY_FILE, src);
}

function deploy() {
    fs.copySync(TYPE_DEF_FILE_SRC, TYPE_DEF_FILE_DST);
}

function main() {
    normalize();
    deploy();
}

main();
