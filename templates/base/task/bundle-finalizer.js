﻿/* eslint-env node, es6 */
/* eslint-disable no-regex-spaces */
'use strict';
const fs        = require('fs');
const path      = require('path');
const dts       = require('dts-bundle');
const tsfmt     = require('typescript-formatter');
const banner    = require('./banner');
const srcmap    = require('./srcmap');
const config    = require('../project.config');

const PACKAGE_NAME  = config.pkg.name;
const NAMESPACE     = config.main.namespace;

const SOURCE_DIR_NAME = config.dir.src;

const D_TS_SETTING  = config.dts_bundle;
const MAIN_FILE     = path.join(__dirname, '..', config.dir.pkg, config.main.basename + '.js');
const TYPE_DEF_FILE = path.join(__dirname, '..', config.dir.pkg, config.dir.types, PACKAGE_NAME, config.main.bundle_d_ts);

function update_srcmap_namespace(code) {
    const namespace = (() => {
        if (NAMESPACE) {
            return NAMESPACE + ':///' + PACKAGE_NAME + '/';
        } else {
            return PACKAGE_NAME + ':///';
        }
    })();

    let srcNode = srcmap.getNodeFromCode(code);

    return srcmap.getCodeFromNode(srcNode, (srcPath) => {
        return srcPath
            .replace('webpack:///' + SOURCE_DIR_NAME + '/', namespace)
            .replace('webpack:/webpack', 'webpack:///webpack')
            .replace('webpack:/external', 'webpack:///external/')
            .replace('webpack:///~', 'webpack:///node_modules')
        ;
    });
}

function normalize_src() {
    let src = fs.readFileSync(MAIN_FILE).toString();

    src = '\ufeff' + update_srcmap_namespace(src)
        .replace(/^\ufeff/gm, '')    // remove bom
        .replace(/\t/gm, '    ')
        .replace(/\r\n/gm, '\n')
    ;

    fs.writeFileSync(MAIN_FILE, src, 'utf8');
}

function normalize_d_ts() {
    // concat d.ts
    dts.bundle(D_TS_SETTING);

    // format d.ts
    tsfmt.processStream(TYPE_DEF_FILE, fs.createReadStream(TYPE_DEF_FILE), {
        tsfmt: tsfmt,
    })
    .then((content) => {
        let src = '\ufeff' + banner('.d.ts') + content.message
            .replace(/^\ufeff/gm, '')    // remove bom
            .replace(/\r\n/gm, '\n')
            .replace(/^\/\/ Generated by dts\-bundle[\s\S]*?\n/g, '')
            .replace(/^        \*/gm, '     *')
            .replace(/^            \*/gm, '         *')
            .replace(/^                \*/gm, '             *')
            .replace(/'/gm, '"')
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
