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
        contentBase: path.join(__dirname, '../dist/'),
        publicPath: '',
        port: 9001,
        host: '0.0.0.0',
    },
});
