const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		app: path.resolve('src', 'app.js'),
		vendor: [
			'react',
			'react-dom',
			'bootstrap-sass-loader!./bootstrap-sass.config.js'
		]
	},
	output: {
		path: path.resolve('bin'),
		filename: 'js/[name]-[hash].js',
		chunkFilename: '[id]-[hash].js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		modules: ["node_modules"]
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: path.resolve('src'),
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract(['style-loader', 'css-loader', 'sass-loader'])
			},
			{
				test: /\.(svg|woff|woff2|ttf|eot)$/,
				loader: 'base64-font-loader'
			},
			{
				test: /\.html$/,
				loaders: ['html-loader'],
				include: path.resolve('src'),
				exclude: path.resolve('src', '/index.html')
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, compress: { warnings: false } }),
		new HtmlWebpackPlugin({
			template: path.resolve('src', 'index.html'),
			inject: 'body'
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'js/vendor-[hash].js' }),
		new ExtractTextPlugin('css/[name]-[id]-[contenthash].css')
	]
};
