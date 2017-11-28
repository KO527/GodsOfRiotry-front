var path = require('path');
var webpack = require('webpack');

module.exports = env => {
    devServer: {
        inline: true,
        contentBase: './src',
        historyApiFallback: true,
        port: 8080
    },
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'webpack-dev-server/client?http://0.0.0.0:80',
        'webpack/hot/only-dev-server',
        './dev/js/index.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
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
