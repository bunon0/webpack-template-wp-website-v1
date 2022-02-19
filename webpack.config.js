const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const wpThemeName = 'wptheme'
const wpDomain = `http://${wpThemeName}.local/`
const wpThemeRoot = `./${wpThemeName}/`
const wpThemeAssets = `./${wpThemeName}/assets/`;

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
    new BrowserSyncPlugin({
      proxy: wpDomain,
      files:[
        `${wpThemeRoot}**/*.php`,
        `src/`,
      ]
    }),
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
    // new ImageMinimizerPlugin({
    //   test: /\.(png|jpe?g)$/i,
    //   minimizer: {
    //     filename: '[path][name][ext].webp',
    //     implementation: ImageMinimizerPlugin.squooshMinify,
    //     options: {
    //       encodeOptions: {
    //         webp: {
    //           lossless: 1,
    //         },
    //       },
    //     },
    //   },
    // }),
    new ImageMinimizerPlugin({
      test: /\.(png|jpe?g)$/i,
      minimizer: {
        implementation: ImageMinimizerPlugin.squooshMinify,
        options: {
          encodeOptions: {
            mozjpeg: {
              quality: 85,
            },
            oxipng: {
              level: 3,
              interlace: false,
            }
          },
        },
      },
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
