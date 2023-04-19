const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: false,
    baseUrl: "https://www.saucedemo.com",
    chromeWebSecurity: false,
    supportFile: false,
  },
});
