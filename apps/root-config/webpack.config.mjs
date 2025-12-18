import path from "path";
import { fileURLToPath } from "url";
import { merge } from "webpack-merge";
import singleSpaDefaults from "webpack-config-single-spa-ts";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../../");

export default (webpackConfigEnv, argv) => {
  const orgName = "avla";

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  return merge(defaultConfig, {
    output: {
      path: path.resolve(rootPath, "dist/"),
      filename: "avla-root-config.js",
      publicPath: "/",
      library: {
        type: "module",
      },
      clean: false,
    },
    experiments: {
      outputModule: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.isLocal": JSON.stringify(
          webpackConfigEnv.isLocal || false
        ),
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
    devServer: {
      port: 9000,
      historyApiFallback: { index: "/index.html" },
      static: [
        {
          directory: path.resolve(
            rootPath,
            "dist/mf-angular-app-esm/mf-angular-app-esm"
          ),
          publicPath: "/mf-angular-app-esm/",
        },
        {
          directory: path.resolve(
            rootPath,
            "dist/mf-angular-app-umd/mf-angular-app-umd"
          ),
          publicPath: "/mf-angular-app-umd/",
        },
      ],
      proxy: [
        {
          context: ["/assets"],
          target: "http://localhost:4200",
          changeOrigin: true,
          secure: false,
          logLevel: "silent",
        },
      ],
    },
  });
};