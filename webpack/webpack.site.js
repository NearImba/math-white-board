const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base');

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].js',
        publicPath: `./`,
    },
});
