'use strict';

const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');
const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
    contentBase: path.resolve(__dirname, './dist'),
    historyApiFallback: true,
    port: 9090,
    publicPath: "/"
});

server.listen(9090, 'localhost', function (err) {
    if (err)
        throw err;
});
