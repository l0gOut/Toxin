const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: {
    pageOne: "./src/index.js",
    pageTwo: "./src/daterange.js",
  },
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.pug"),
      favicon: "src/assets/image/favicon.ico",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/login.pug"),
      favicon: "src/assets/image/favicon.ico",
      filename: "login.html",
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/registration.pug"),
      favicon: "src/assets/image/favicon.ico",
      filename: "registration.html",
      inject: "body",
    }),
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.pug$/i,
        use: {
          loader: "pug-loader",
          options: {
            pretty: process.env.NODE_ENV === "development",
          },
        },
      },

      {
        test: /\.(png|jpg|svg|jpeg|ico)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(ttf|ttg|woff|woff2)$/i,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              import: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 9000,
  },
};
