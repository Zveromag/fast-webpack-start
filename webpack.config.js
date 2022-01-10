const path = require('path');
const webapck = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

const templateName = 'main';
const srcPath  = './frontend/src';
const distPath = `./local/templates/${templateName}`;
const config = {
  port: 8888,
  hostName: 'https://example',
  src: {
    root    : `${srcPath}`,
    html    : `${srcPath}/templates`,
    sass    : `${srcPath}/scss`,
    js      : `${srcPath}/js`,
    img     : `${srcPath}/img`,
    icons   : `${srcPath}/icons`,
    fonts   : `${srcPath}/fonts`,
    media   : `${srcPath}/media`
  },
  dist: {
    root  : distPath,
    css   : `${distPath}/css`,
    js    : `${distPath}/js`,
    img   : `${distPath}/img`,
    icons : `${distPath}/img`,
    fonts : `${distPath}/fonts`,
    media : `${distPath}/media`
  }
};

module.exports = (env, arg) => {
  const { mode } = arg;
  const isDev = mode === 'development';

  const webpackConfig = {
    mode,
    entry: {
      app: [
        path.resolve(config.src.sass, './app.scss'),
        path.resolve(config.src.js, './app.js')
      ]
    },
    output: {
      path: path.join(__dirname, config.dist.root),
      publicPath: `/local/templates/${templateName}/`,
      filename: isDev ? 'js/[name].js' : 'js/[name].[contenthash].js'
    },
    devtool: mode === 'development' ? 'source-map' : false,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue': 'vue/dist/vue.esm-bundler.js'
      }
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
            filename: isDev ? 'js/vendor.js' : 'js/vendor.[contenthash].js'
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [
            path.resolve(__dirname, 'node_modules')
          ],
          options: {
            cacheDirectory: true
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                postcssOptions: {
                  plugins: [
                    'postcss-sort-media-queries',
                    'autoprefixer'
                  ]
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new WebpackBar(),
      new CleanWebpackPlugin({
        verbose: true,
        cleanOnceBeforeBuildPatterns: [
          path.resolve(config.dist.root, 'css'),
          path.resolve(config.dist.root, 'js'),
          path.resolve(config.dist.root, 'img'),
          path.resolve(config.dist.root, 'fonts'),
          path.resolve(config.dist.root, 'media'),
          path.resolve(config.dist.root, './frontend-bundles.php')
        ],
        cleanStaleWebpackAssets: false
      }),
      new CopyPlugin({
        patterns: [
          { from: config.src.media, to: 'media' },
          { from: config.src.fonts, to: 'fonts' },
          { from: config.src.img, to: 'img' }
        ]
      }),
      new SVGSpritemapPlugin(`${config.src.icons}/**/*.svg`, {
        output: {
          filename: 'img/symbol.svg',
          svgo: {
            plugins: [
              { removeDoctype: true },
              { removeDesc: true },
              {
                cleanupIDs: {
                  remove: true
                }
              },
              { mergePaths: false },
              { removeStyleElement: true },
              { cleanupNumericValues: { floatPrecision: 2 } },
              { removeTitle: true },
              { collapseGroups: true }
            ]
          }
        },
        sprite: {
          prefix: false
        }
      }),
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: path.resolve(config.src.html, 'frontend-bundles.html'),
        filename: path.resolve(config.dist.root, 'frontend-bundles.php')
      }),
      new webapck.EnvironmentPlugin({
        NODE_ENV: mode,
        BUILD: 'web'
      })
    ]
  };

  if (mode === 'production') {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: path.join(__dirname, 'report.html')
      })
    );
  }

  if (mode === 'development') {
    webpackConfig.plugins.push(
      new BrowserSyncPlugin({
        proxy: config.hostName,
        port: config.port,
        ui: false,
        online: false,
        watchEvents: ['add', 'change'],
        files: [
          `**/*.php`,
          `!.git`,
          `!.vscode`,
          `!api`,
          `!bitrix`,
          `!node_modules`,
          `!upload`,
          `!desktop_app`,
          `!cache`,
          `!vendor`,
          `!${config.dist.root}/frontend-bundles.php`,
          `${config.dist.css}/*.css`,
          `${config.dist.js}/*.js`,
          `${config.dist.img}/**/*`,
          `${config.src.js}/**/*.vue`
        ]
      }, {
        injectCss: true
      })
    );
  }

  return webpackConfig;
};
