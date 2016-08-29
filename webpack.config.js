
const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

process.env.BABEL_ENV = TARGET;

const common  = {
	entry: {
		app: PATHS.app
		},
		//Add Resolve.extensions
		//'' is needed to allow imports without an extension.
		//Note the .'s before extensions as it will fail to match without!!!
	Resolve: {
			extensions: ['', '.js', '.jsx']
		},
	output: {
	path: PATHS.build,
	filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.css$/, //Test expects a RegExp! Note Slashes!
				loaders: ['style','css'], 
				include: PATHS.app //Include accepts either a path or an array of paths.
			},
			// Set up jsx. This accepts js too thanks to RegExp
			{
				test: /\.jsx?$/,
				loader: 'babel',
				query: {
					cacheDirectory: true,
					presets: ['react', 'es2015', 'survivejs-kanban']
				},
				include: PATHS.app
				//Enable caching for improved performance during development
				//It uses default OS directory by default. If you need something
				//more custom, pass a path to it. I.E., babel?cacheDirectory=<path>
				//Parse only app files! Without this it will go through entire project.
				//In addition to being slow, that will most likely result in an error.
				
			}
	]
}
};

//Default configuration
if(TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',
			host: process.env.HOST,
			port: process.env.PORT
		},
		plugins: [
				new webpack.HotModuleReplacementPlugin(),
				new NpmInstallPlugin ({
					save: true // --save
				})
		]	
});
}

if(TARGET === 'build') {
	module.exports = merge(common, {});
}
