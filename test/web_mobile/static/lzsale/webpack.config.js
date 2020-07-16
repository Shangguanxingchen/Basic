var webpack = require('webpack');
var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.join(__dirname),
    entry:{
        form11: path.resolve(__dirname, "./src/form11.jsx"),
        form: path.resolve(__dirname, "./src/form.jsx"),
        form2: path.resolve(__dirname, "./src/form2.jsx"),
        form3: path.resolve(__dirname, "./src/form3.jsx"),
        form4: path.resolve(__dirname, "./src/form4.jsx")//可配置多个文件.
    },
    output:{
        path: path.resolve(__dirname,"./build"),  //  打包存放地址.
        publicPath:'/',  // 调试或者 CDN 之类的域名
        filename: "[name].js"  //  [name] 的值是entry的键值.[hash].
    },
    resolve:{
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "react", "es2015"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [{
                            loader: "css-loader",
                            // options: {
                            //     modules: true,
                            //     localIdentName: '[name]__[local]--[hash:base64:5]'
                            // }
                        }
                        // , {
                        //     loader: "postcss-loader"
                        // }
                        ],
                    })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin('common.css'),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        })
    ]
    // plugins:[
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoErrorsPlugin()
    // ]
};
