const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://jira.ivorreic.com/project/board',
    env: {
      baseUrl: 'https://jira.ivorreic.com/',
    },
    defaultCommandTimeout: 30000,
    requestTimeout: 20000,
  },
});
/* const webpackPreprocessor = require("@cypress/webpack-preprocessor");

module.exports = (on) => {
  const options = webpackPreprocessor.defaultOptions;
  options.webpackOptions.module.rules[0].exclude = {
    and: [/node_modules/],
    not: [/@faker-js/],
  };
  options.webpackOptions.resolve = {
    alias: {
      "@faker-js/faker": require.resolve("@faker-js/faker"),
    },
  };

  on("file:preprocessor", webpackPreprocessor(options));
}; */