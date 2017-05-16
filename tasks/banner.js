﻿/* eslint-env node, es6 */
'use strict';
const fs        = require('fs');
const path      = require('path');
const config    = require('../project.config.js');

const BANNER_FILE       = config.banner.fileName;
const D_TS_DESCRIPTION  = config.banner.d_ts_desc;  // @VERSION replaced this string.

function buildDate() {
    return new Date().toISOString();
}

function banner(extension) {
    let pkg = require(path.join(process.cwd(), 'package.json'));
    let bannerPath = path.join(process.cwd(), BANNER_FILE);
    if (fs.existsSync(bannerPath)) {
        let banner = fs.readFileSync(bannerPath).toString()
            .replace('@MODULE_NAME', pkg.name + extension)
            .replace('@VERSION', ('.d.ts' !== extension) ? pkg.version : D_TS_DESCRIPTION)
            .replace('@DATE', buildDate())
            .replace(/ $/gm, '')
            .replace(/\r\n/gm, '\n')    // normalize line feed
        ;
        return banner;
    } else {
        return '/*!\n * ' + pkg.name + extension + '\n * ' + buildDate() + '\n */\n';
    }
}

module.exports = banner;
