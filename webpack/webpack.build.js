const path = require('path');

module.exports = {
    entry: './launcher/index.tsx',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../lib/'),
        filename: 'launcher.js',
        libraryTarget: "umd",
        library: "",
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties', '@babel/plugin-syntax-dynamic-import'],
                },
            },
        }, {
            test: /\.(ts|tsx)?$/,
            use: ['ts-loader'],
            exclude: /node_modules/,
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
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.css'], // 可以省略的后缀名
    },
};
