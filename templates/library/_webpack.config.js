var webpack = require('webpack');
var banner = require('./tasks/banner');

module.exports = {
    <%# webpackTarget %>
    target: '<% webpackTarget %>',
    <%/ webpackTarget %>
    entry: [
      './<% structureConfig.built %>/<% mainFileName %>'
    ],
    output: {
        path: process.cwd() + '/<% structureConfig.pkg %>',
        filename: '<% mainFileName %>',
        <%# webpackLibrary %>
        libraryTarget: '<% webpackLibrary %>',
        <%/ webpackLibrary %>
    },
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
