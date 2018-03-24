 module.exports = {
   entry: './dev/js/index.js',
   output: {
     path: __dirname + '/src',
     publicPath: '/',
     filename: '/js/bundle.min.js'
   },
   module: {
     loaders: [{
       exclude: /node_modules/,
       loader: 'babel-loader',
       query: {
         presets: ['react', 'es2015', 'stage-2'],
         plugins: ['transform-decorators-legacy']
       }
     }],
     rules: [{ test: /\.scss$/,
                        use: [{loader: 'sass-loader'}, 
                              {loader: 'css-loader'}, 
                              {loader: 'style-loader'}]}]
   },
   resolve: {
     extensions: ['', '.js', '.jsx']
   },
   devServer: {
     historyApiFallback: true,
     contentBase: './'
   }
 };


 // var path = require('path');
 // var webpack = require('webpack');
 // var SRC = path.join(__dirname, 'dev/js/');

 // module.exports = env => {
 //     devServer: {
 //         inline: true,
 //         contentBase: 'src',
 //         historyApiFallback: true,
 //         public: 'ec2-54-164-27-229.compute-1.amazonaws.com',
 //         host: '0.0.0.0',
 //         port: 8080
 //     },
 //     {   devtool: 'cheap-module-eval-source-map',
 //         test: /\.jsx?$/,
 //         loaders: ['babel'],
 //         exclude: /node_modules/
 //     },
 //     {
 //         test: /\.scss/,
 //         loader: 'style-loader!css-loader!sass-loader'
 //     }
 //         ]
 //     },
 //     output: {
 //         path: 'src',
 //         filename: './js/bundle.min.js',
 //         publicPath: '/'
 //     },
 //     plugins: [
 //         new webpack.optimize.OccurrenceOrderPlugin()
 //     ]
 // };
