/* eslint-env node, es6 */
'use strict';
const path      = require('path');
const fs        = require('fs');
const glob      = require('glob');
const config    = require('../project.config');

function queryOptions() {
    const argv = process.argv.slice(2);

    let settings = {
        all: true,
        chmod: false,
    };

    if (0 < argv.length) {
        settings.all = false;
        Object.keys(settings).forEach((key) => {
            argv.forEach((arg) => {
                const option = arg.replace(/^--/, '');
                if (option === key) {
                    settings[key] = true;
                }
            });
        });
    }

    return settings;
}

function chmod() {
    if (config.permission && config.permission.chmod) {
        const list = config.permission.chmod;
        Object.keys(list).forEach((mode) => {
            list[mode].forEach((targets) => {
                const pathList = glob.sync(targets, {
                    cwd: path.join(__dirname, '..'),
                    nodir: false,
                });
    
                pathList.forEach((filePath) => {
                    fs.chmodSync(filePath, mode);
                });
            });
        });
    }
}

function main() {
    const options = queryOptions();

    if (options.all || options.chmod) {
        // The chmod function does not work at win32.
        // If you want to change permission on Windows, please implement chmodForWin function.
        if ('win32' !== process.platform) {
            chmod();
        }
    }
}

main();
