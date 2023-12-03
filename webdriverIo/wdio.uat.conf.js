const merge = require("deepmerge");

const wdioConf = require("./wdio.conf.js");

exports.config = merge(wdioConf.config, {
  //baseUrl: "https://rahulshettyacademy.com",
  waitforTimeout: 5000,
  specs: ["test/specs/uatTest.js"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
    //grep: "Sanity",
  },
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "silent",
  capabilities: [
    {
      browserName: "chrome",
      // "goog:chromeOptions": {
      //   args: ["headless", "disable-gpu"],
      // },
    },
  ],
});
