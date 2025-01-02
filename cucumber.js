const PropertiesReader = require('properties-reader');
const properties = PropertiesReader('./config/appConfig.properties')

module.exports = {

    default: {
        require: ["./dist/step_definitions/",
            'dist/support/Hooks.js'],
        format: [
            'progress',
            'json:dist/reports/result.json'
        ],
        tags: properties.get("SUITES"),
        publish: false,
        snippets: 'sufficient',
        timeout: 60000,
        defaultTimeout: 30000,
    },
}

// require: ['./features/step_definitions/*.js'], // Step definitions
// format: ['json:reports/cucumber-report.json', 'html:reports/cucumber-report.html'], // Multiple report formats
// paths: ['./features/*.feature'], // Feature files}