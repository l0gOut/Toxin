const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext]",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.pug"),
      filename: "index.html",
    }),

    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, "src/assets/image/favicon.ico"),
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
        yandex: true,
      },
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
        test: /\.(png|jpg|svg|jpeg)$/i,
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
