var webpack = require('webpack');

 module.exports = {
   entry: './dev/js/index.js',
   output: {
     path: __dirname + '/src',
     publicPath: __dirname + '/src',
     filename: './js/bundle.min.js'
   },
   module: {
      rules: [
         {
           exclude: /node_modules/,
           test: /\.js$/,
           loader: 'babel-loader',
           options: {
             presets: ['react', 'es2015'],
             plugins: ['transform-decorators-legacy', 'transform-decorators']
           }
         },
         {
           test: /\.(html)$/,
           use: {
              loader: 'html-loader',
              options: {
                attrs: [':data-src']
              }
           }
         },
         { test: /\.scss$/,
                    exclude: '/node_modules/',
                    use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                    }]
         },
         {test: /\.(png|jpg|gif)$/,
          exclude: '/node_modules/',
          use: [{ loader: 'file-loader',
                  options: {
                      publicPath: __dirname + '/dev/images',
                      names: ['./btn-connect-m.png', './btn-disconnect-m.png']
                    }
                },
                {
                  loader: 'image-webpack-loader',
                  options: {
                      gifsicle: {
                        optimizationLevel: 7,
                        interlaced: false
                      },
                      optipng: {
                        optimizationLevel: 7,
                        interlaced: false
                      }
                  }
                }]
          }
      ]
   },
   resolve: {
     extensions: ['.js', '.jsx'],
     modules: ['node_modules']
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
