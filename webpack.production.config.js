/**
 * Created by admini on 2016/10/8.
 */

var path = require("path");
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
        filename: "js/[name].bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css', 'sass')
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', "stage-1"]
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/style.bundle.css", {allChunks: true}),
        new HtmlWebpackPlugin({
            template: 'src/template/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new webpack.optimize.UglifyJsPlugin({    //压缩代码
            compress: {
                warnings: false
            },
            except: ['$super', '$', 'exports', 'require']    //排除关键字
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
};