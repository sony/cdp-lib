'use strict';
const fs = require("fs-extra");

const DIST_DIR  = "./dist/";
const BUILT_DIR = "./built/";

function clean() {
    fs.removeSync(DIST_DIR);
    fs.removeSync(BUILT_DIR);
}

function main() {
    clean();
}

main();
