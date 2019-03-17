const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = env => {
  if (!env) {
    env = {}
  }
  let plugins=[
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({template: './app/views/index.html'}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ];
  if(env.production){
    plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new ExtractTextPlugin("style.css", {ignoreOrder: true}),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new UglifyJsPlugin()
    )
  }
  return {
    entry: {
      app: ['./app/viewport.js','./app/main.js']
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      compress: true,
      port: 9000,
      clientLogLevel: "none",
      quiet: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8081',//代理以/api开头的请求地址
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    },
    module: {
      loaders: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
              limit: 8192,
              name: '[path][name].[ext]'
          }
        },
       {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            cssModules: {
              localIdentName: '[path][name]---[local]---[hash:base64:5]',
              camelCase: true
            },
            extractCSS: true,
            loaders: env.production?{
              css: ExtractTextPlugin.extract({use: 'css-loader?minimize!px2rem-loader?remUnit=40&remPrecision=8', fallback: 'vue-style-loader'}),
              scss: ExtractTextPlugin.extract({use: 'css-loader?minimize!px2rem-loader?remUnit=40&remPrecision=8!sass-loader', fallback: 'vue-style-loader'})
            }:{
              css: 'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8',
              scss: 'vue-style-loader!css-loader!px2rem-loader?remUnit=40&remPrecision=8!sass-loader'
            }
          }
        }, {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        }
      ]
    },
    resolve: {
      extensions: [
        '.js', '.vue', '.json'
      ],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins,
    output: {
      filename: '[name].min.js',
      path: path.resolve(__dirname, 'dist')
    }
  }
};
