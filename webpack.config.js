const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "bytebank";
  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal;

  // Pegando variáveis de ambiente corretamente
  const HOST_URL = process.env.REACT_APP_HOST_URL || "http://localhost:9000";
  const ACCOUNT_URL = process.env.REACT_APP_ACCOUNT_URL || "http://localhost:8500";
  const HOME_URL = process.env.REACT_APP_HOME_URL || "http://localhost:8200";
  const DASHBOARD_URL = process.env.REACT_APP_DASHBOARD_URL || "http://localhost:8300";

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });
  console.log("🚀 Variáveis de ambiente Webpack:");
  console.log("REACT_APP_HOME_URL:", process.env.REACT_APP_HOME_URL);
  console.log("REACT_APP_ACCOUNT_URL:", process.env.REACT_APP_ACCOUNT_URL);
  console.log("REACT_APP_DASHBOARD_URL:", process.env.REACT_APP_DASHBOARD_URL);
  return merge(defaultConfig, {
    
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal,
          orgName,
          REACT_APP_HOST_URL: HOST_URL,
          REACT_APP_ACCOUNT_URL: ACCOUNT_URL,
          REACT_APP_HOME_URL: HOME_URL,
          REACT_APP_DASHBOARD_URL: DASHBOARD_URL,
        },
      }),
      new webpack.DefinePlugin({
        "process.env.REACT_APP_HOST_URL": JSON.stringify(HOST_URL),
        "process.env.REACT_APP_ACCOUNT_URL": JSON.stringify(ACCOUNT_URL),
        "process.env.REACT_APP_HOME_URL": JSON.stringify(HOME_URL),
        "process.env.REACT_APP_DASHBOARD_URL": JSON.stringify(DASHBOARD_URL),
      }),
    ],
  });
};