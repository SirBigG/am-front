const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
    output: {
        path: __dirname + '/build/',
        filename: "[name].js"
    },
    optimization: {
        minimize: true,
        mangleWasmImports: true,
        concatenateModules: true,
        minimizer: [new TerserJSPlugin({terserOptions: { output: {comments: false}, toplevel: true}}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /(node_modules|bower_components)/,
            use: [
                // "style-loader", // creates style nodes from JS strings
                // {
                //     loader: 'postcss-loader', // Run post css actions
                //     options: {
                //         plugins: function () { // post css plugins, can be exported to postcss.config.js
                //             return [
                //                 require('postcss-import'),
                //                 require('postcss-preset-env'),
                //                 require('cssnano'),
                //                 require('precss'),
                //                 require('autoprefixer')
                //             ];
                //         }
                //     }
                // },
                MiniCssExtractPlugin.loader,
                // "postcss-loader",
                "css-loader", // translates CSS into CommonJS
                "sass-loader", // compiles Sass to CSS, using Node Sass by default
            ]
        },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicPath: '/static/posts/fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
