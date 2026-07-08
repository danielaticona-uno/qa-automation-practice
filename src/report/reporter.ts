const reporter = require("multiple-cucumber-html-reporter");

reporter.generate({
    jsonDir:"reports/json",
    reportPath: "reports/html",
    metadata:{
        browser:{
            name:"chrome",
            version: "lastest"
        },
        device:"Local test machine",
        platform:{
            name: "windows", 
            version:"11"
        }
    }
})