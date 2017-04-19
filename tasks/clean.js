'use strict';
const fs = require('fs-extra');
const path  = require('path');
const glob  = require('glob');

const BUILT_DIR     = './built/';
const COVERAGE_DIR  = './docs/reports/coverage/';
const TYPEDOC_DIR   = './docs/typedoc';
const TEST_DIR      = './tests/jasmine/';

function main() {
    fs.removeSync(BUILT_DIR);
    fs.removeSync(TYPEDOC_DIR);
    fs.removeSync(COVERAGE_DIR);

    let files = glob.sync('{*.js,*.map}', {
        cwd: TEST_DIR,
        nodir: true,
    });

    files.forEach(function (file) {
        fs.unlinkSync(path.join(TEST_DIR, file));
        console.log('removed: ' + file);
    });
}

main();
