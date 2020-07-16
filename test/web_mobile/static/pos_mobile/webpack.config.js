var ExtractTextPlugin = require('extract-text-webpack-plugin')
var webpack = require('webpack')
module.exports = {

	entry: "./src/analysis.jsx",
	output: {
		path: './build',
		filename: 'analysis.js'
	},
	module:{
		loaders: [
			{test: /.jsx?$/,loader: "babel"},
			{test: /.css?$/,loader: ExtractTextPlugin.extract('style-loader', 'css-loader')}
		]
	},
	resolve:{
		extensions: ['', '.jsx', '.js']
	},
	plugins:[
		new ExtractTextPlugin('common.css'),
		new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
    }),
	]

}