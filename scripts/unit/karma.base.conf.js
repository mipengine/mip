/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file Karma 基础配置文件
 */

module.exports = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../../',

    // Important: 所有插件必须在此声明
    plugins: ['karma-*'],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // Important: 下列数组中文件将『逆序载入』
    frameworks: ['mocha', 'chai-as-promised', 'chai-sinon', 'chai'],


    // list of files / patterns to load in the browser
    files: [
        'deps/promise.js',
        'deps/document-register-element.max.js',
        'deps/esl.js',
        'scripts/unit/require.config.js',
        {
            pattern: 'src/**/*.js',
            included: false
        },
        {
            pattern: 'deps/**/*.js',
            included: false
        },
        {
            pattern: 'test/**/*.js',
            included: false
        },
        'dist/mip.css'
    ],


    // list of files to exclude
    exclude: [],

    // borwser list
    browsers: ['Chrome'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        // source files, that you wanna generate coverage for
        // do not include tests or libraries
        // (these files will be instrumented by Istanbul)
        'src/**/*.js': ['coverage']
    },

    // htmlReporter: {
    //     outputDir: './dist/test-result' // relative to cwd
    // },

    coverageReporter: {
        dir: './dist/coverage',
        reporters: [
            {
                type: 'html'
            }, {
                type: 'lcovonly',

                // only generate a /dist/coverage/icov.info
                subdir: '../coverage/'
            },
            {
                type: 'text-summary'
            }
        ]
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // browser console options
    browserConsoleLogOptions: {
        // possible values: 'log' || 'error' || 'warn' || 'info' || 'debug'
        level: 'log',
        terminal: true
    },

    // enable / disable watching file and executing tests whenever any file changes
    // Note: 代码改动自动运行测试，需要singleRun为false
    autoWatch: false,

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    // 脚本调用请设为 true
    singleRun: true,

    // browser time out
    browserDisconnectTimeout: 10000,

    // process kill time
    processKillTimeout: 10000,

    // browser no activity time
    browserNoActivityTimeout: 300000
}
