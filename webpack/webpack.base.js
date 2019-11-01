const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const appName = require('../package.json').name;

module.exports = {
    entry: {
        sync: './editor/demo.tsx',
        // launcher: './launcher/index.tsx',
        single: './editor/single.tsx',
        editor: './editor/index.tsx',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: `/${appName}/`,
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        rules: [{
            test: /\.(ts|tsx)?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.(css|scss|sass)$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
            }, {
                loader: 'css-loader',
                options: {
                    minimize: true,
                },
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            browsers: ['last 15 versions'],
                        }),
                    ],
                },
            }, {
                loader: 'sass-loader',
            }],
        }, {
            test: /\.less$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }, {
                loader: 'less-loader',
            }],
        }, {
            test: /\.(png|jpg|gif)$/i,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 5120,
                    },
                },
            ],
        }, {
            test: /\.svg$/,
            loader: 'svg-url-loader',
        }, {
            test: /\.(glsl|vs|fs)$/,
            loader: 'shader-loader',
            options: {
                glsl: {
                    chunkPath: path.resolve(__dirname, '../engine/render/shader'),
                },
            },
        }],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './editor/index.html',
            filename: 'sync.html',
            chunks: ['sync'],
            minify: {
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: './editor/index.html',
            filename: 'single.html',
            chunks: ['single'],
            minify: {
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new HtmlWebpackPlugin({
            template: './editor/index.html',
            filename: 'editor.html',
            chunks: ['editor', 'common'],
            minify: {
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
        }),
        new webpack.DefinePlugin({
            // 'process.env.PACKAGE': JSON.stringify(process.env.PACKAGE),
        }),
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'], // 可以省略的后缀名
    },
};
