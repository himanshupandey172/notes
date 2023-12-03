const merge = require("deepmerge");

const wdioConf = require("./wdio.conf.js");

exports.config = merge(wdioConf.config, {
  baseUrl: "http://rahulshettyacademy.com",
  waitforTimeout: 5000,
  specs: ["test/specs/firstTest.js"],
  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
    //grep: "Sanity",
  },
  // Level of logging verbosity: trace | debug | info | warn | error | silent
  logLevel: "debug",
  capabilities: [
    {
      browserName: "msedge",
      //   "ms:edgeOptions": {
      //     args: ["--headless"],
      //   },
    },
  ],
});
