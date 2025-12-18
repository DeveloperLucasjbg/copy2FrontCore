const singleSpaAngularWebpack = require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Forzamos UMD
  singleSpaWebpackConfig.output.libraryTarget = 'umd';
  singleSpaWebpackConfig.output.filename = 'mf-angular-app-umd.js';
  singleSpaWebpackConfig.output.publicPath = '/mf-angular-app-umd/';

  // ✅ Activar IIFE para que sea compatible con UMD
  singleSpaWebpackConfig.output.iife = true;

  return singleSpaWebpackConfig;
};
