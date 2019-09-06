/* eslint @typescript-eslint/no-var-requires: 0 */
require('dotenv').config();
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const withCSS = require('@zeit/next-css');

module.exports = () =>
  withCSS({
    // Note: Disabling file-system routing. ref: https://github.com/zeit/next.js#disabling-file-system-routing
    useFileSystemPublicRoutes: false,

    // Note: export /schedule/index.html instead of /schedule.html
    exportTrailingSlash: true,

    // Note: router for static export
    exportPathMap: async () => {
      return {
        '/': { page: '/' },
      };
    },

    webpack: config => {
      // eslint-disable-next-line no-param-reassign
      config.plugins = config.plugins.filter(
        plugin => !(plugin instanceof ForkTsCheckerWebpackPlugin),
      );

      return config;
    },
  });
