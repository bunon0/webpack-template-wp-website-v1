const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

const wpThemeAssets = "./wp-theme/assets/";

const app = {
  mode: "development",
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, wpThemeAssets),
    filename: "js/main.js",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src/js/"),
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     {
      //       loader: "css-loader",
      //       options: {
      //         url: false,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "./src/scss/"),
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
          { loader: "glob-import-loader" },
        ],
      },
    ],
  },

  target: ["web", "es5"],

  plugins: [
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "./css/styles.css",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: `${path.resolve(__dirname, "src")}/images/`,
          to: `${path.resolve(__dirname, wpThemeAssets)}/images/`,
        },
      ],
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        ImageminMozjpeg({
          quality: 89,
          progressive: true,
        }),
      ],
      pngquant: {
        quality: "80-89",
      },
      svgo: {},
    }),
  ],

  //パッケージのライセンス情報をjsファイルの中に含める
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },

  watchOptions: {
    ignored: /node_modules/,
  },
};

module.exports = app;
