﻿/* eslint-disable no-regex-spaces */
'use strict';
const fs = require('fs-extra');
const path = require('path');
const dts = require('dts-bundle');
const tsfmt = require('typescript-formatter');
const banner = require('./banner');

const PACKAGE_NAME = require(path.join(process.cwd(), 'package.json')).name;

const DIST_DIR      = './dist/';
const TYPES         = '@types/';
const D_TS_SETTING  = 'dts-bundle.json';
const LIBRARY_FILE  = DIST_DIR + PACKAGE_NAME + '.js';
const TYPE_DEF_FILE = DIST_DIR + TYPES + PACKAGE_NAME + '.d.ts';

function normalize_src() {
    let src = fs.readFileSync(LIBRARY_FILE).toString();
    src = '\ufeff' + src
        .replace(/\ufeff/gm, '')    // remove bom
        .replace(/\t/gm, '    ')
        .replace(/\r\n/gm, '\n')
    ;
    fs.writeFileSync(LIBRARY_FILE, src);
}

function normalize_d_ts() {
    // concat d.ts
    dts.bundle(require(path.join(process.cwd(), D_TS_SETTING)));

    // format d.ts
    tsfmt.processStream(TYPE_DEF_FILE, fs.createReadStream(TYPE_DEF_FILE), {
        tsfmt: tsfmt,
    })
    .then((content) => {
        let src = '\ufeff' + banner('.d.ts') + content.message
            .replace(/\ufeff/gm, '')    // remove bom
            .replace(/\r\n/gm, '\n')
            .replace(/^\/\/ Generated by dts\-bundle[\s\S]*?\n/g, '')
            .replace(/^        \*/gm, '     *')
            .replace(/^            \*/gm, '         *')
            .replace(/^                \*/gm, '             *')
        ;
        fs.writeFileSync(TYPE_DEF_FILE, src);
    })
    .catch((error) => {
        console.error(error);
    });
}

function main() {
    normalize_src();
    normalize_d_ts();
}

main();
