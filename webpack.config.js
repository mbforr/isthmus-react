const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// new BundleAnalyzerPlugin()

module.exports = (env) => {
  console.log("env", env)
  const isProduction = env === 'production';
  const CSSExtract = new ExtractTextPlugin('style.css')

  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      },{
        test: /\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }]
    },
    plugins: [
      new BundleAnalyzerPlugin({analyzerPort: 9000}),
      CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist'
    }
  };
};
