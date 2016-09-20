/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file Karma 配置文件
 */

module.exports = function(config) {
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
            'karma-chrome-launcher'
        ],

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        // Important: 下列数组中文件将『逆序载入』
        frameworks: ['mocha', 'chai-as-promised', 'chai-sinon', 'chai'],


        // list of files / patterns to load in the browser
        files: [
            'src/polyfills/promise.js',
            'src/polyfills/document-register-element.max.js',
            'src/deps/esl.js',
            'src/deps/esl_config.js',
            'src/deps/zepto.js',
            'test/index.js', {
                pattern: 'src/**/*.js',
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
            'src/!(deps){**/,}*.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],
        htmlReporter: {
            outputDir: './dist/test-result' // relative to cwd
        },
        coverageReporter: {
            dir: './test-coverage'  // relative to basePath
        },


        // web server port
        port: 9875,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // Note: 如果要调试Karma，请设置为DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        // Note: 代码改动自动运行测试，需要singleRun为false
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        // 脚本调用请设为 true
        singleRun: true
    });
};
