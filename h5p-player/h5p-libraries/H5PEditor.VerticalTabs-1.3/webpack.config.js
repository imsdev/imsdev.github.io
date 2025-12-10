const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  output: {
    path: path.resolve(__dirname, "styles/css")
  },
  entry: {
    index: [path.join(path.resolve(__dirname, 'styles'), "scss", "vertical-tabs.scss")]
  },
  mode: nodeEnv,
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "vertical-tabs.css"
    })
  ]
};