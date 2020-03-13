const path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    host: "0.0.0.0",
    port: 8080
  },
  entry: './src/bootstrap.js',
  mode: "development",
  output: {
    filename: 'main.js',
    publicPath: '/js/',
    path: path.resolve(__dirname, 'dist/js/'),
  },
};