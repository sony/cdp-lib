'use strict';
const del       = require('del');
const path      = require('path');
const config    = require('../project.config.js');

const BUILT_DIR     = path.join(process.cwd(), config.dir.built);
const COVERAGE_DIR  = path.join(process.cwd(), config.dir.doc, 'reports', 'coverage');
const TYPEDOC_DIR   = path.join(process.cwd(), config.dir.doc, 'typedoc');
const TEST_DIR      = path.join(process.cwd(), config.dir.test, 'jasmine');

function main() {
    del.sync(TYPEDOC_DIR);
    del.sync(COVERAGE_DIR);

    const removeGeneratedFiles = (root) => {
        del.sync(['**/*.js', '**/*.map'], {
            cwd: root,
        });
    };

    removeGeneratedFiles(BUILT_DIR);
    removeGeneratedFiles(TEST_DIR);
}

main();
