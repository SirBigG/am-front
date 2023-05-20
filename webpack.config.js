const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const OptimizePlugin = require('optimize-plugin');
const webpack = require('webpack');

module.exports = {
    mode: "production",
    entry: {
        "main": './src/scss/main.scss',
        "detail": './src/scss/detail.scss',
        "add": './src/scss/add.scss',
        "categories": './src/scss/categories.scss',
        "index": './src/scss/index.scss',
        "list": './src/scss/list.scss',
        "form": './src/scss/form.scss',
        "gallery": './src/scss/gallery.scss',
        "j-index": './src/js/index.js',
        "j-detail": './src/js/detail.js',
        "j-gallery": './src/js/gallery.js'
    },
    target: ['web', 'es2017'],
    output: {
        module: true,
        path: '/static/posts/',
        filename: "[name].js"
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimize: true,
        mangleWasmImports: true,
        concatenateModules: true,
        minimizer: [new TerserJSPlugin({
            terserOptions: {
                output: {comments: false},
                toplevel: true
            }
        }),
            new CssMinimizerPlugin()
        ],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                MiniCssExtractPlugin.loader,
                // "postcss-loader",
                "css-loader", // translates CSS into CommonJS
                "sass-loader", // compiles Sass to CSS, using Node Sass by default
            ]
        },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, {loader: 'css-loader', options: {url: false}}],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        // new OptimizePlugin(),
    ]
};
