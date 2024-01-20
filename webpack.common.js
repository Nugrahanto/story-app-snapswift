const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const htmlWebpackPluginConfig = {
  meta: {
    viewport: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    'theme-color': '#ffc0cb',
  },
  templateParameters: {
    brandName: 'Snapswift',
  },
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/js/index.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac]ss)$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [require('autoprefixer')],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dashboard',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/views/dashboard.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Add Story',
      filename: 'addstory.html',
      template: path.resolve(__dirname, 'src/views/addstory.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Register',
      filename: 'accounts/register.html',
      template: path.resolve(__dirname, 'src/views/accounts/register.html'),
      ...htmlWebpackPluginConfig,
    }),
    new HtmlWebpackPlugin({
      title: 'Login',
      filename: 'accounts/login.html',
      template: path.resolve(__dirname, 'src/views/accounts/login.html'),
      ...htmlWebpackPluginConfig,
    }),

    new CleanWebpackPlugin(),
  ],
};
