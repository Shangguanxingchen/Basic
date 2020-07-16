/**
 * Created by zhousuyang on 16/10/21.
 */
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        form11: path.resolve(__dirname, './src/form11.jsx'),
        form: path.resolve(__dirname, './src/form.jsx'),
        form2: path.resolve(__dirname, './src/form2.jsx'),
        form3: path.resolve(__dirname, './src/form3.jsx'),
        form4: path.resolve(__dirname, './src/form4.jsx'),
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
        new webpack.DefinePlugin({
           'process.env': {
               'NODE_ENV': JSON.stringify('production')
           }
        }),
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

        new UglifyJSPlugin({
            parallel: 4,
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    warnings: false
                },
            },
            cache: true
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]', //目标资源名称。[file] 会被替换成原资源。[path] 会被替换成原资源路径，[query] 替换成原查询字符串
            algorithm: 'gzip',//算法
            test: new RegExp(
                 '\\.(js|css)$'    //压缩 js 与 css
            ),
            threshold: 10240,//只处理比这个值大的资源。按字节计算
            minRatio: 0.8//只有压缩率比这个值小的资源才会被处理
       })
    ]
}