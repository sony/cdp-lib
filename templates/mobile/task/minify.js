/* eslint-env node, es6 */
'use strict';
const path      = require('path');
const fs        = require('fs-extra');
const glob      = require('glob');
const uglifyjs  = require('uglify-js');
const cleancss  = require('clean-css');
const htmlmin   = require('html-minifier');
const srcmap    = require('./srcmap');
const config    = require('../project.config');

const PKG_DIR   = path.join(__dirname, '..', config.dir.pkg);

function queryOptions() {
    const argv = process.argv.slice(2);

    let settings = {
        all: true,
        minify: true,
        map: null,          // for map file generate.
        js: false,
        css: false,
        html: false,
    };

    if (0 < argv.length) {
        Object.keys(settings).forEach((key) => {
            argv.forEach((arg) => {
                const option = arg.replace(/^--/, '');
                const name = option.split('=')[0];
                if ('no-minify' === name) {
                    settings.minify = false;
                } else if ('map' === name) {
                    settings.map = option.split('=')[1] || PKG_DIR;
                } else if (name === key) {
                    settings.all = false;
                    settings[key] = true;
                }
            });
        });
    }

    return settings;
}

function minifyJS(map) {
    glob.sync('**/*.js', {
        cwd: PKG_DIR,
        nodir: true,
        ignore: [
            config.dir.external + '/**/*',
            config.dir.res + '/**/*',
            config.dir.stylesheet + '/**/*',
            config.dir.template + '/**/*',
        ],
    }).forEach((file) => {
        console.log('  minify... ' + file);
        const srcPath = path.join(PKG_DIR, file);
        const mapPath = map ? path.join(map, file + '.map') : null;
        const src = fs.readFileSync(srcPath).toString();

        const _map = map ? {
            content: 'inline',
            url: path.basename(file) + '.map',
        } : null;

        const result = uglifyjs.minify(src, {
            sourceMap: _map,
            output: {
                comments: /^!\n/,
            },
        });

        fs.outputFileSync(srcPath, result.code, 'utf8');
        if (map) {
            fs.outputFileSync(mapPath, result.map, 'utf8');
        }
    });
}

function minifyCSS(map) {
    glob.sync('**/*.css', {
        cwd: PKG_DIR,
        nodir: true,
        ignore: [
            config.dir.external + '/**/*',
            config.dir.res + '/**/*',
            config.dir.script + '/**/*',
            config.dir.template + '/**/*',
        ],
    }).forEach((file) => {
        console.log('  minify... ' + file);
        const srcPath = path.join(PKG_DIR, file);
        const mapPath = map ? path.join(map, file + '.map') : null;
        const css = srcmap.separateScriptAndMapFromScriptFile(srcPath, true);

        const result = new cleancss({
            format: {
                breaks: {
                    afterComment: true,
                },
            },
            sourceMap: map || false,
            sourceMapInlineSources: map || false,
        }).minify(css.script, css.map);

        if (map) {
            result.styles += '\n/*# sourceMappingURL=' + path.basename(file) + '.map */';
        }
        fs.outputFileSync(srcPath, result.styles, 'utf8');
        if (map) {
            fs.outputFileSync(mapPath, result.sourceMap, 'utf8');
        }
    });
}

function minifyHTML() {
    glob.sync('**/*.html', {
        cwd: PKG_DIR,
        nodir: true,
        ignore: [
            config.dir.external + '/**/*',
            config.dir.res + '/**/*',
            config.dir.script + '/**/*',
            config.dir.stylesheet + '/**/*',
        ],
    }).forEach((file) => {
        console.log('  minify... ' + file);
        const srcPath = path.join(PKG_DIR, file);
        const src = fs.readFileSync(srcPath).toString();
        const result = htmlmin.minify(src, {
            removeComments: true,
            collapseWhitespace: true,
        });
        fs.outputFileSync(srcPath, result, 'utf8');
    });
}

function copyExternalModueMap() {
    const SRC_DIR = path.join(__dirname, '..', config.dir.src);
    glob.sync(config.dir.external + '/**/*.map', {
        cwd: SRC_DIR,
        nodir: true,
    })
    .forEach((file) => {
        const src = path.join(SRC_DIR, file);
        const dst = path.join(PKG_DIR, file);
        fs.copySync(src, dst);
    });
}

function main() {
    const options = queryOptions();
    if (!options.minify) {
        return;
    }

    if (options.all || options.js) {
        minifyJS(options.map);
    }
    if (options.all || options.css) {
        minifyCSS(options.map);
    }
    if (options.all || options.html) {
        minifyHTML();
    }
    if (options.map) {
        copyExternalModueMap();
    }
}

main();
