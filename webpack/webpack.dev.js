const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const appName = require('../package.json').name;

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: 'source-map',
    watch: true,
    watchOptions: {
        ignored: /node_modules/,
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        publicPath: `/${appName}/`,
        port: 9000,
        host: '0.0.0.0',
        proxy: {
            /* 代理在这 */
        },
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //     },
    // },
});
