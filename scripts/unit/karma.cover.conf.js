/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Cover Alls 配置文件
 */

var base = require('./karma.base.conf.js');

module.exports = function(config) {
    var options = Object.assign(base, {
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage', 'coveralls'],
        coverageReporter: {
            dir: './test-coverage', // relative to basePath
            reporters: [{
                type: 'html'
            }, {
                type: 'lcov',
                dir: './coverage'
            }]
        },

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // Note: 如果要调试Karma，请设置为DEBUG
        logLevel: config.LOG_INFO
    });

    config.set(options);
};
