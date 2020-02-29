const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: path.resolve(__dirname, 'src/index'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src'),
            use: ['babel-loader']
        },
        {
            test: /\.scss$/,
            loaders: [
                require.resolve('style-loader'),
                require.resolve('css-loader'),
                require.resolve('sass-loader')
            ]
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(jpg|png)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[path][name].[hash].[ext]",
              },
            },
        },
        ]
    },
    devServer: {
        contentBase:  path.resolve(__dirname, 'dist'),
        port: 8000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html" //source html
        })
    ]
  };