// reportGenerator.ts
import PropertiesReader from 'properties-reader';
const properties = PropertiesReader('./config/appConfig.properties');
const REPORT_PATH = './dist/reports/';
const Reporter = require('multiple-cucumber-html-reporter');
const os = require('os');

export function GenerateReport() {
    // try {
        // Generate the report
        Reporter.generate({
            jsonDir: REPORT_PATH,
            reportPath: REPORT_PATH,
            displayDuration: true,
            disableLog: true,
            pageFooter: " ",
            pageTitle: "Automation Report",
            reportName: "Automation Report",
            metadata: {
                browser: {
                    name: 'chrome',
                    version: properties.get('BROWSER_VERSION') // Update with the actual version used
                },
                device: os.platform(),
                platform: {
                    name: getOSType(os.type()),
                    version: os.release()
                }
            },
            customData: {
                title: 'Run Information',
                data: [
                    { label: 'Project', value: 'Automation Project' },
                    // { label: 'Release', value: properties.get("branch_name") },
                    { label: 'Purpose', value: 'Regression Suite UI verification' },
                    { label: 'Instance', value: properties.get('BASE_URL') },
                    { label: 'Date', value: new Date().toLocaleString() },
                    { label: 'Suite', value: properties.get("SUITES") },
                ]
            }
        });
    // } catch (error) {
    //     console.error('Error during report generation or browser closing:', error);
    // }
}

function getOSType(type: string) {
    if (type == 'Windows_NT') {
        return 'windows';
    } else if (type == 'Linux' || type == 'linux') {
        return 'linux'
    } else if (type == 'Darwin') {
        return 'osx';
    }
}

GenerateReport();

