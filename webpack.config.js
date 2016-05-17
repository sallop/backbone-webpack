var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
    app: ["webpack/hot/dev-server","./main.js"]
  },
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      '_': 'underscore',
      'Backbone': 'backbone'
    })
  ],
  //externals: {
  //   $: "jquery",
  //   jQuery: "jquery",
  //   '_': 'underscore',
  //   'Backbone': 'backbone'
  //},
  devtool: '#inline-source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  }
};
