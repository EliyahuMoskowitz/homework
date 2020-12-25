const pathway = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const webpack = require('webpack');
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            title: 'Our Blog!',
            // year: new Date().getFullYear(),
            template: './src/index.html'
        }),
        new ESLintPlugin(),
        new webpack.BannerPlugin({
            banner: 'My BLOG! JavaScript/webpack'
        }),
        new CompressionPlugin(),
        new webpack.ProgressPlugin((percentage, message, ...args) => {
            console.info(percentage, message, ...args);
        })
    ],
    output: {
        filename: 'main.js',
        path: pathway.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}