// load env variables - this should be the first line of config
require('ts-node/register')

require('dotenv-extended').config({
  path: './configuration/environment/staging.env',
  defaults: './configuration/environment/staging.env',
})

const { configure, cleanReports } = require('codeceptjs-configure')
const { setHeadlessWhen, setWindowSize } = require('@codeceptjs/configure')
const REPORT_OUTPUT_DIR = './reports'

setHeadlessWhen(process.env.HEADLESS === true || process.env.HEADLESS === 'true')

exports.config = {
  ...require('ts-node/register'),
  tests: './test/**/*.test.ts',
  name: 'The automation testing framework applying CodeceptJS',

  repository: 'https://github.com/ofnoah/Automation',

  output: REPORT_OUTPUT_DIR,

  bootstrap: (callback) => {
    cleanReports({ path: REPORT_OUTPUT_DIR, relativePath: '/', callback })
  },
  helpers: {
    Playwright: {
      url: 'https://www.google.com',
      show: true,
      browser: 'chromium',
      waitForAction: 1000,
      waitForTimeout: 5000,
      chrome: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      },
    },
    GraphQL: {
      enabled: true,
      endpoint: 'https://staging-api-sg.noahandzoey.com/graphql',
      onRequest: (request) => {
        request.headers.origin = 'https://noah-staging-sg.vercel.app'
      },
    },
    REST: {
      endpoint: 'google.com',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    PlaywrightHelper: {
      require: 'codeceptjs-configure/lib/helpers/playwright.helper.js',
      enabled: true,
    },
    ChaiWrapper: {
      require: 'codeceptjs-chai',
    },
    FakerHelper: {
      require: './helpers/fragments/faker_helper.ts',
    },
  },
  plugins: {
    tagFilter: {
      require: './helpers/plugins/tagFilter.plugin.ts',
      enabled: true,
    },
    screenshotOnFail: {
      enabled: true,
    },
    allure: {
      enabled: true,
    },
    autoDelay: {
      enabled: true,
      methods: ['amOnPage', 'waitForElement', 'see'],
      delayBefore: 1000,
    },
    tryTo: {
      enabled: true,
      registerGlobal: true,
    },
    retryFailedStep: {
      enabled: false,
    },
  },
}
