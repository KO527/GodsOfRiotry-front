{
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loaders: [
             'style-loader',
             'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
            ]
          }
    ]
  }
}