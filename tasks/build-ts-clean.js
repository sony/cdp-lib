/* eslint-env node, es6 */
'use strict';
const del       = require('del');
const path      = require('path');
const config    = require('../project.config.js');

const DIST_DIR  = path.join(process.cwd(), config.dir.pkg);
const BUILT_DIR = path.join(process.cwd(), config.dir.built);

function removeGeneratedFiles(root) {
    del.sync(['**/*.js', '**/*.d.ts', '**/*.map'], {
        cwd: root,
    });
}

function main() {
    removeGeneratedFiles(DIST_DIR);
    removeGeneratedFiles(BUILT_DIR);
}

main();
