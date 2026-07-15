const { format } = require("node:path");
 
module.exports = {
  default: {
    requireModule: [
      "ts-node/register"
    ],
    require: [
      "tests/support/**/*.ts",
      "src/pages/**/*.ts",
      "tests/steps/**/*.ts"
    ],
    paths: [
      "tests/features/**/*.feature"
    ],
    format: [
      "html:reports/cucumber-report.html"
    ],
    timeout: 30000
  }
};