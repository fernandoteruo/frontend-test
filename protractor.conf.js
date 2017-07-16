exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    './tests/e2e/search.e2e.js',
    './tests/e2e/favorites.e2e.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
