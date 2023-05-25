const path = require('path');
const { Configuration } = require('webpack');
const { merge } = require('webpack-merge');

const baseConfig = {
  entry: ['./client/src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'client', 'dist'),
    filename: 'bundle.js',
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.(ts|tsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },

    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
    alias: {
      "@emotion/react": path.resolve(__dirname, "node_modules/@emotion/react"),
    },
  },
};

const additionalConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
        type: "asset",
      },
    ],
  },
};

module.exports = merge(baseConfig, additionalConfig);
