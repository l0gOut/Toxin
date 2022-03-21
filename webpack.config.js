const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/index.pug"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: `[contenthash].css`,
    }),
    new FaviconsWebpackPlugin({
      logo: "./src/assets/image/favicon.ico",
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        windows: true,
        yandex: true,
      },
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: `src/assets/img`, to: `assets/img` },
        { from: `src/assets/fonts`, to: `assets/fonts` },
      ],
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
        loader: "file-loader",
        options: {
          outputPath: "assets",
        },
      },
      {
        test: /\.(ttg|woff|woff2)$/i,
        loader: "file-loader",
        options: {
          outputPath: "assets",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
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

      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
        ],
      },
    ],
  },
  devServer: {
    port: 9000,
  },
};
