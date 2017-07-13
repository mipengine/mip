/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file Karma 配置文件
 */

module.exports = function(config) {
    const customLaunchers = require('./saucelab_browsers.js');
    const coverageReporter = [
        {
            type: 'html'
        }
    ];
    const reporters = [
        'mocha'
    ];
    const browsers = ['Chrome'];
    if (process.env.TRAVIS) {
        coverageReporter.push({
            type: 'lcov',
            subdir: 'lcov',
        });
    }

    if (process.env.SAUCE_USERNAME) {
        console.log('has saucelabs');
        reporters.push('saucelabs');
        browsers.push(Object.keys(customLaunchers));
    } else {
        console.log('no saucelabs');
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: 'dist/',

        // Important: 所有插件必须在此声明
        plugins: [
            // frameworks
            'karma-mocha',
            'karma-chai',
            'karma-chai-as-promised',
            //'karma-sinon',
            'karma-chai-sinon',

            // reporters
            'karma-mocha-reporter',
            'karma-coverage',
            'karma-html-reporter',

            // launchers
            'karma-chrome-launcher',
            "karma-sauce-launcher"
        ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // Important: 下列数组中文件将『逆序载入』
        frameworks: ['mocha', 'chai-as-promised', 'chai-sinon', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'deps/promise.js',
            'deps/document-register-element.max.js',
            'deps/esl.js',
            'deps/zepto.js',
            'test/index.js', {
                pattern: 'src/**/*.js',
                included: false
            }, {
                pattern: 'deps/**/*.js',
                included: false
            }, {
                pattern: 'test/**/*.js',
                included: false
            },
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: reporters,
        htmlReporter: {
            outputDir: './dist/test-result' // relative to cwd
        },
        coverageReporter: {
            dir: './test-coverage', // relative to basePath
            reporters: coverageReporter
        },


        // web server port
        port: 9875,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // Note: 如果要调试Karma，请设置为DEBUG
        logLevel: config.LOG_INFO,

        // browser console options
        browserConsoleLogOptions: {
            // possible values: 'log' || 'error' || 'warn' || 'info' || 'debug'
            level: 'log',
            terminal: true
        },

        // enable / disable watching file and executing tests whenever any file changes
        // Note: 代码改动自动运行测试，需要singleRun为false
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: browsers,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // 脚本调用请设为 true
        singleRun: true
    });

    if (process.env.TRAVIS && process.env.SAUCE_USERNAME) {
        // config headless chrome, it can execute the code without opening browser
        const label = "TRAVIS #" + process.env.TRAVIS_BUILD_NUMBER + " (" + process.env.TRAVIS_BUILD_ID + ")";
        config.sauceLabs = {
            testName: 'MIP Unit Tests',
            startConnect: true,
            build: label,
            startConnect: false,
            recordScreenshots: true,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        };
        config.customLaunchers = customLaunchers;
    }
};