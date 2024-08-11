/* eslint-disable no-undef */
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {}
  },
  numTestsKeptInMemory: 0,
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:3000"
  }
});
