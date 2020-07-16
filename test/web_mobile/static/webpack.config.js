/**
 * Created by zhousuyang on 16/10/21.
 */
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        analysis: path.resolve(__dirname, './src/analysis.jsx'),
        vendor: ["react", "react-dom"],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?/,
                loaders: ['babel']
            },{
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            },
              { test: /\.(woff|woff2)$/,  loader: "url-loader?limit=10000&mimetype=application/font-woff" },
              { test: /\.png$/,    loader: "url-loader?limit=10000&minetype=image/png" },
              { test: /\.jpg$/,    loader: "url-loader?limit=10000&minetype=image/jpg" },
              { test: /\.ttf$/,    loader: "file-loader" },
              { test: /\.eot$/,    loader: "file-loader" },
              { test: /\.svg$/,    loader: "file-loader" }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        //去除moment下的非zh-cn的locale信息
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
        }),
        new webpack.optimize.UglifyJsPlugin({
            warnings: {
                compress: false
            },
            except: ['$super', '$', 'exports', 'require']
        })
    ]
}