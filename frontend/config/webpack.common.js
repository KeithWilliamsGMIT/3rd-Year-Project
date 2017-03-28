var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
	entry: {
		'polyfills': './src/polyfills.ts',
		'vendor': './src/vendor.ts',
		'app': './src/main.ts',
		'fa': 'font-awesome-sass-loader!./config/font-awesome.config.js'
	},

	resolve: {
		extensions: ['.ts', '.js']
	},
	
	module: {
		rules: [
			{
				test: /\.ts$/,
				loaders: ['awesome-typescript-loader', 'angular2-template-loader']
			},
			{
				test: /\.html$/,
				loader: 'html-loader'
			},
			/*{
				test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
				loader: 'file-loader?name=assets/[name].[hash].[ext]'
			},*/
			{
				test: /\.css$/,
				exclude: helpers.root('src', 'app'),
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?sourceMap' })
			},
			{
				test: /\.css$/,
				include: helpers.root('src', 'app'),
				loader: 'raw-loader'
			},
			{
				test: /\.scss$/,
				loaders: ['raw-loader', 'sass-loader']
			},
			// Change url to url-loaded to fix
			// throw new Error("Module '" + loader.path + "' is not a loader (must have normal or pitch function)");
			{
				test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff"
			},
			{
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader"
			},
			// Bootstrap 4
			{
				test: /bootstrap\/dist\/js\/umd\//,
				loader: 'imports?jQuery=jquery'
			}
		]
	},
	
	plugins: [
		// Workaround for angular/angular#11580
		new webpack.ContextReplacementPlugin(
			// The (\\|\/) piece accounts for path separators in *nix and Windows
			/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
			helpers.root('./src'), // location of your src
			{} // a map of your routes
		),
		
		new webpack.optimize.CommonsChunkPlugin({
			name: ['app', 'vendor', 'polyfills']
		}),
		
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		
		// JQuery for bootstrap
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		})
	]
};