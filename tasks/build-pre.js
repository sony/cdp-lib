'use strict';
const del       = require('del');
const path      = require('path');
const config    = require('../project.config.js');

const DIST_DIR  = path.join(process.cwd(), config.dir.pkg);
const BUILT_DIR = path.join(process.cwd(), config.dir.built);

function clean() {
    del.sync([DIST_DIR, BUILT_DIR]);
}

function main() {
    clean();
}

main();
