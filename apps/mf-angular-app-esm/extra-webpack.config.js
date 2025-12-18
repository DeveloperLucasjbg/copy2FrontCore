const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Cambiar a formato ESM
  singleSpaWebpackConfig.output.library = {
    type: "module",
  };

  // Desactivar IIFE para módulos ES
  singleSpaWebpackConfig.output.iife = false;

  // Cambiar filename si quieres, puede ser .js o .mjs
  singleSpaWebpackConfig.output.filename = "mf-angular-app-esm.js";

  const isDev = config.mode === "development";

  singleSpaWebpackConfig.output.publicPath = isDev
    ? "http://localhost:4200/" // Puerto usado en dev
    : "/mf-angular-app-esm/"; // Ruta usada en prod

  // Habilitar experimentos para output módulo ES
  singleSpaWebpackConfig.experiments = {
    outputModule: true,
  };

  // Eliminar libraryTarget si está
  delete singleSpaWebpackConfig.output.libraryTarget;
  // Se agrega la regla de postcss-loader
  singleSpaWebpackConfig.module.rules.push({
    test: /\.css$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "postcss-loader",
        options: {
          postcssOptions: {
            plugins: ["@tailwindcss/postcss"],
          },
        },
      },
    ],
  });

  return singleSpaWebpackConfig;
};
