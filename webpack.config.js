var path = require('path');
var webpack = require('webpack');
var SRC = path.join(__dirname, 'dev/js/');

module.exports = {
    devServer: {
        inline: true,
        contentBase: 'src',
        historyApiFallback: true,
        public: 'ec2-54-164-27-229.compute-1.amazonaws.com',
	host: '0.0.0.0',
        port: 8080
    },
    devtool: 'cheap-module-eval-source-map',
    resolve: {
        root: [SRC]
    },
    entry: './dev/js/index.js',
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                exclude: /node_modules/
            },
            {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
            }
        ]
    },
    output: {
        path: 'src',
        filename: './js/bundle.min.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
};
