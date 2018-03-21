const path = require('path');
const webpack = require('webpack');
module.exports = {
	entry: 'app.js',

	output: {
		filename: '[name].js'
	},

	context: path.join(__dirname, 'src'),

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor-[hash].min.js'
		})
	]
};
