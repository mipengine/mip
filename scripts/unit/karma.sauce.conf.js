/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Suace Labs 配置文件
 */

var base = require('./karma.base.conf.js');
var customLaunchers = {
    // mobile
    sl_android_6_0: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '6.0'
    },

    // the cool kids
    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
    },
    sl_mac_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        version: '10'
    }
};

module.exports = function(config) {
    var buildId =
        'MIP TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER;
    var options = Object.assign(base, {
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: process.env.CI ? ['mocha', 'dots', 'saucelabs'] : ['mocha', 'progress', 'saucelabs'],
        coverageReporter: {
            dir: './test-coverage', // relative to basePath
            reporters: [{
                type: 'lcov',
                dir: './coverage'
            }]
        },

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: process.env.TRAVIS
            ? base.browsers.concat(Object.keys(customLaunchers))
            : base.browsers,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // Note: 如果要调试Karma，请设置为DEBUG
        logLevel: config.LOG_INFO,

        // config headless chrome, it can execute the code without opening browser
        customLaunchers: customLaunchers,

        sauceLabs: {
            testName: 'MIP Unit Tests',
            recordScreenshots: false,
            connectOptions: {
                'no-ssl-bump-domains': 'all' // Ignore SSL error on Android emulator
            },
            build: buildId
        },

        captureTimeout: 300000,
        browserNoActivityTimeout: 300000
    });

    config.set(options);
};
