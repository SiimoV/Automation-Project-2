const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://jira.ivorreic.com/project/board",
    env: {
      baseUrl: "https://jira.ivorreic.com/",
    },
    defaultCommandTimeout: 30000, // oli 30000
    requestTimeout: 20000, // oli 20000
    // viewportWidth: 1000, // Set your desired width
    viewportHeight: 1100, // Set your desired height
  },
});
