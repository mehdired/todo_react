const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const dev = process.env.NODE_ENV === 'dev'
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const cssLoader = [
  { loader: 'css-loader', options: { importLoaders: 1, minimize: true } }
]

if (!dev) {
  cssLoader.push({
    loader: 'postcss-loader',
    options: {
      plugins: (loader) => [
        require('autoprefixer')({
          browsers: ['last 3 versions', 'ie >= 11']
        })
      ]
    }
  })
}

const config = {
  entry: {
    app: './src/main.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: '/public/'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    // Pour afficher les erreurs sur la page
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: cssLoader
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [...cssLoader, 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      disable: dev
    }),
    new UglifyJsPlugin({
      sourceMap: true
    })
  ]
}

module.exports = config