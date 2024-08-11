const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  configureWebpack: (config) => {
    if (process.env.VUE_APP_SSR !== "true") {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/node": false
      };
    }
  }
});
