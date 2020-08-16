const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//const Dotenv = require("dotenv-webpack");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "[hash].main.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
      scriptLoading: "defer",
      favicon: "./assets/favicon.ico",
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    // enable if needed, add .env file also
    //new Dotenv({ systemvars: true }),
    //new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "build"),
    https: true,
    compress: true,
    hot: true,
    port: 8080,
    open: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    useLocalIp: true,
    historyApiFallback: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin()],
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
