const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Add bundle analyzer in production
      if (env === 'production') {
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: 'bundle-report.html',
          }),
          new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
          })
        );
      }

      // Optimize split chunks
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui-vendor',
            chunks: 'all',
            priority: 20,
          },
          charts: {
            test: /[\\/]node_modules[\\/](chart\.js|react-chartjs-2|recharts)[\\/]/,
            name: 'charts-vendor',
            chunks: 'all',
            priority: 15,
          },
          calendar: {
            test: /[\\/]node_modules[\\/]@fullcalendar[\\/]/,
            name: 'calendar-vendor',
            chunks: 'all',
            priority: 15,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react-vendor',
            chunks: 'all',
            priority: 25,
          },
        },
      };

      // Add resolve aliases
      webpackConfig.resolve.alias = {
        ...webpackConfig.resolve.alias,
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/CommonComponents'),
        '@modules': path.resolve(__dirname, 'src/CommonModules'),
        '@template': path.resolve(__dirname, 'src/Template'),
        '@context': path.resolve(__dirname, 'src/ContextOrRedux'),
        '@services': path.resolve(__dirname, 'src/services'),
      };

      return webpackConfig;
    },
  },
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          useBuiltIns: 'usage',
          corejs: 3,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      ['@babel/plugin-transform-class-properties', { loose: true }],
      ['@babel/plugin-transform-private-methods', { loose: true }],
      ['@babel/plugin-transform-private-property-in-object', { loose: true }],
      '@babel/plugin-proposal-optional-chaining',
    ],
  },
};