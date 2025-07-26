const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");
const { HotModuleReplacementPlugin } = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  
  return {
    context: __dirname,
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      chunkFilename: isProduction ? "[name].[contenthash].chunk.js" : "[name].chunk.js",
      publicPath: "/",
      clean: true,
    },
    resolve: {
      modules: [path.resolve(__dirname, "./src"), "node_modules"],
      extensions: [".js", ".jsx", ".json"],
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/CommonComponents"),
        "@modules": path.resolve(__dirname, "src/CommonModules"),
        "@template": path.resolve(__dirname, "src/Template"),
        "@context": path.resolve(__dirname, "src/ContextOrRedux"),
        "@services": path.resolve(__dirname, "src/services"),
      },
    },
    optimization: {
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: 10,
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: "mui-vendor",
            chunks: "all",
            priority: 20,
          },
          charts: {
            test: /[\\/]node_modules[\\/](chart\.js|react-chartjs-2|recharts)[\\/]/,
            name: "charts-vendor",
            chunks: "all",
            priority: 15,
          },
          calendar: {
            test: /[\\/]node_modules[\\/]@fullcalendar[\\/]/,
            name: "calendar-vendor",
            chunks: "all",
            priority: 15,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: "react-vendor",
            chunks: "all",
            priority: 25,
          },
        },
      },
      minimize: isProduction,
      minimizer: isProduction ? [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
            },
          },
        }),
      ] : [],
    },
    devServer: {
      historyApiFallback: true,
      hot: true,
      compress: true,
      port: 3000,
      static: {
        directory: path.join(__dirname, "public"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { 
                  modules: false,
                  useBuiltIns: "usage",
                  corejs: 3,
                }],
                "@babel/preset-react",
              ],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-optional-chaining",
              ],
            },
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                modules: {
                  auto: true,
                  localIdentName: isProduction ? "[hash:base64:8]" : "[name]__[local]",
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp4|webp)$/,
          type: "asset",
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "svg-url-loader",
              options: {
                limit: 10000,
                encoding: "base64",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new Dotenv(),
      new HotModuleReplacementPlugin(),
      new HtmlWebPackPlugin({
        template: path.resolve(__dirname, "public/index.html"),
        filename: "index.html",
        favicon: "./public/favicon.ico",
        showErrors: true,
        cache: false,
        minify: isProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        } : false,
      }),
      ...(isProduction ? [
        new CompressionPlugin({
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: "bundle-report.html",
        }),
      ] : []),
    ],
    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  };
};
