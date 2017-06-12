'use strict';

const path  = require('path');
const pkg   = require('./package.json');

const target = {
    type: '<% projectType %>',
    es: '<% es %>',
    <%# module %>
    module: '<% module %>',
    <%/ module %>
    <%# env %>
    env: '<% env %>',
    <%/ env %>
};

const dir = {
    src: '<% structureConfig.src %>',
    pkg: '<% structureConfig.pkg %>',
    built: '<% structureConfig.built %>',
    doc: '<% structureConfig.doc %>',
    task: '<% structureConfig.task %>',
    test: '<% structureConfig.test %>',
    types: '<% structureConfig.types %>',
    temp: '<% structureConfig.temp %>',
};

const main = {
    <%# namespace %>
    namespace: '<% namespace %>',
    <%/ namespace %>
    basename: '<% mainBaseName %>',
    bundle_d_ts: 'index.d.ts',
};

const built_cleanee = {
    ts: ['**/*.js', '**/*.d.ts', '**/*.map'],
};

const d_ts_bundle = {
    name: pkg.name,
    main: path.join(dir.built, main.basename + '.d.ts'),
    baseDir: dir.built,
    out: path.join('..', dir.pkg, dir.types, pkg.name, main.bundle_d_ts),
    externals: false,
    verbose: false,
};

const banner = {
    fileName: 'BANNER',
    d_ts_desc: '\n * This file is generated by the CDP package build process.',
};

// project configuration
module.exports = {
    target: target,

    pkg: pkg,
    dir: dir,
    main: main,

    built_cleanee: built_cleanee,

    dts_bundle: d_ts_bundle,

    banner: banner,
};