const { format } = require("node:path");
 
module.exports = {
  default: {
    requireModule: [
      "ts-node/register"
    ],
    require: [
      "src/support/**/*.ts",
      "src/pages/**/*.ts",
      "src/steps/**/*.ts"
    ],
    paths: [
      "features/**/*.feature"
    ],
    format: [
      "html:reports/cucumber-report.html"
    ],
    timeout: 30000
  }
};