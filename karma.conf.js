/* eslint import/no-extraneous-dependencies: "off" */
/* eslint no-console: "off" */

const sauceLaunchers = {
  'chrome-latest-macos': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest',
    platform: 'macOS 10.13',
  },
  'chrome-previous-macos': {
    base: 'SauceLabs',
    browserName: 'chrome',
    version: 'latest-1',
    platform: 'macOS 10.13',
  },
  'firefox-latest-macos': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest',
    platform: 'macOS 10.13',
  },
  'firefox-previous-macos': {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: 'latest-1',
    platform: 'macOS 10.13',
  },
  'safari-latest-macos': {
    base: 'SauceLabs',
    browserName: 'safari',
    version: 'latest',
    platform: 'macOS 10.13',
  },
  'edge-latest-win10': {
    base: 'SauceLabs',
    browserName: 'microsoftedge',
    version: 'latest',
    platform: 'Windows 10',
  },
  'safari-ios-11.2': {
    base: 'SauceLabs',
    browserName: 'safari',
    platformName: 'iOS',
    platformVersion: '11.2',
    deviceName: 'iPad Simulator',
  },
};

const getTestFiles = (config) => {
  if (config.file) {
    return config.file.split(',');
  }

  const defaultTestDirs = [
    'test/specs',
  ];

  const testDirs = config.dir ? config.dir.split(',') : defaultTestDirs;

  return testDirs.map(dir => `${dir}/**/*.+(js|jsx)`);
};

module.exports = function karma(config) {
  let browsers = [];
  let customLaunchers = {};

  if (process.env.TRAVIS_BUILD_NUMBER) {
    if (process.env.TRAVIS_SECURE_ENV_VARS === 'true' &&
        process.env.SAUCE_USERNAME &&
        process.env.SAUCE_ACCESS_KEY) {
      // We're on Travis, and Sauce Labs environment variables are available.
      // Run on the Sauce Labs cloud using the full set of browsers.

      console.log('Running on Sauce Labs.');

      customLaunchers = sauceLaunchers;
      browsers = Object.keys(customLaunchers);
    } else {
      // We're on Travis, but Sauce Labs environment variables aren't available.
      // Run on Travis, using Firefox.

      console.log('Running on Travis.');

      browsers = [
        'Firefox',
      ];
    }
  } else {
    // This is a local run. Use Chrome.

    console.log('Running locally.');

    browsers = [
      'Chrome',
    ];
  }

  config.set({
    browsers,
    customLaunchers,
    files: getTestFiles(config),

    frameworks: [
      'mocha',
      'chai',
    ],

    reporters: [
      'mocha',
      'coverage',
      'saucelabs',
    ],

    autoWatch: true,
    singleRun: config.singleRun === 'true',

    preprocessors: {
      'test/**/*.js': [
        'webpack',
        'sourcemap',
      ],
    },

    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
              },
            ],
          },
        ],
      },
    },

    port: 9876,
    colors: true,

    // Code will have been instrumented via Babel and babel-plugin-istanbul
    // when NODE_ENV is 'test' (see .babelrc).

    coverageReporter: {
      type: 'json',
      dir: 'coverage/',
    },

    // Sauce Labs configuration.

    sauceLabs: {
      testName: 'cspace-refname tests',
      recordScreenshots: false,
      public: true,
    },

    // Tolerate Sauce Labs slowness/flakiness.

    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 1,
    browserNoActivityTimeout: 4 * 60 * 1000,
    captureTimeout: 4 * 60 * 1000,
  });
};
