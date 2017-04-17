var webpack = require('webpack');

module.exports = {
    target: 'node',
    entry: [
      './built/cdp-lib.js'
    ],
    output: {
        path: process.cwd() + '/dist',
        filename: 'cdp-lib.js',
        libraryTarget: 'commonjs2',
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
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,
        }),
    ],
};
