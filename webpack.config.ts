import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./client/src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
  },
  output: {
    path: path.resolve(__dirname, "client", "dist"),
    filename: "bundle.js",
  },
  // devServer: {
  //   static: path.join(__dirname, "client", "dist"),
  //   compress: true,
  //   port: 4000,
  // },
};

export default config;