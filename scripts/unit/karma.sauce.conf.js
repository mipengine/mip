/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Suace Labs 配置文件
 */

var base = require('./karma.base.conf.js');
var customLaunchers = {
    sl_android_6_0: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '6.0'
    },
    sl_android_7_1: {
        base: 'SauceLabs',
        browserName: 'Chrome',
        appiumVersion: '1.6.4',
        deviceName: 'Android GoogleAPI Emulator',
        deviceOrientation: 'portrait',
        platformVersion: '7.1',
        platformName: 'Android'
    },
    sl_ios_latest: {
        base: 'SauceLabs',
        browserName: 'iphone',
        version: 'latest'
    },
    sl_ios_10: {
        base: 'SauceLabs',
        browserName: 'Safari',
        appiumVersion: '1.6.4',
        deviceName: 'iPhone 7 Plus',
        deviceOrientation: 'portrait',
        platformVersion: '10.3',
        platformName: 'iOS'
    },
    sl_ios_9: {
        base: 'SauceLabs',
        browserName: 'Safari',
        appiumVersion: '1.6.4',
        deviceName: 'iPhone 6 Plus',
        deviceOrientation: 'portrait',
        platformVersion: '9.3',
        platformName: 'iOS'
    },

    sl_microsoftedge: {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10'
    },

    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10'
    },
    sl_firefox_osx: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.12'
    },

    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7'
    },
    sl_chrome_osx: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.12'
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
            build: buildId,

            // use travis + addons.jwt to connect
            startConnect: false,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        }
    });

    config.set(options);
};
