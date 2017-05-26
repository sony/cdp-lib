const webpack   = require('webpack');
const path      = require('path');
const banner    = require('./<% taskPath %>/banner');
const config    = require('./project.config');

const TARGET            = config.target.env;
const MAIN_ENTRY        = path.join(__dirname, config.dir.built, config.main.basename + '.js');
const OUTPUT_PATH       = path.join(__dirname, config.dir.pkg);
const OUTPUT_FILE_NAME  = config.main.basename + '.js';
const OUTPUT_LIB_TARGET = ('commonjs' === config.target.module) ? 'commonjs2' : config.target.module;

module.exports = {
    target: TARGET,
    entry: [
      MAIN_ENTRY,
    ],
    output: {
        path: OUTPUT_PATH,
        filename: OUTPUT_FILE_NAME,
        libraryTarget: OUTPUT_LIB_TARGET,
    },
    <%# nodejs %>
    node: {
        __dirname: false,
        __filename: false,
    },
    <%/ nodejs %>
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["source-map-loader"],
                enforce: "pre",
            },
        ],
    },
    externals: {
    <%# guide %>
        // external module defs here:
        //'jquery': {
        //    root: 'jQuery',
        //    commonjs: 'jquery',
        //    commonjs2: 'jquery',
        //    amd: 'jquery'
        //},
    <%/ guide %>
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
        new webpack.BannerPlugin({
            banner: banner('.js'),
            raw: true,
            ntryOnly: true,
        }),
    ],
};
