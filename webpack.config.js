const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "bytebank";
  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal;

  const HOST_URL = process.env.REACT_APP_HOST_URL || "http://localhost:9000";
  const HOME_URL = process.env.REACT_APP_HOME_URL || "http://localhost:8200";

  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });
  console.log("REACT_APP_HOME_URL:", process.env.REACT_APP_HOME_URL);
  return merge(defaultConfig, {
    
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal,
          orgName,
          REACT_APP_HOST_URL: HOST_URL,
          REACT_APP_HOME_URL: HOME_URL,
        },
      }),
      new webpack.DefinePlugin({
        "process.env.REACT_APP_HOST_URL": JSON.stringify(HOST_URL),
        "process.env.REACT_APP_HOME_URL": JSON.stringify(HOME_URL),
      }),
    ],
  });
};