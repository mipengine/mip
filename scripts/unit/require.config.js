/**
 * @file 测试脚本载入器
 * @author yangjun14<harttle@harttle.com> , xuexb<fe.xiaowu@gmail.com>
 */

var TEST_FILES = Object.keys(window.__karma__.files).filter(isTestFile).map(getModuleId);

// 依赖配置
require.config({
    baseUrl: '/base/src',
    paths: {
        'test': '../test',
        'jquery': '../deps/jquery',
        'zepto': '../deps/zepto',
        'naboo': '../deps/naboo',
        'fetch': '../deps/fetch',
        'fetch-jsonp': '../deps/fetch-jsonp'
    }
});

// 启动测试
// Important: 禁用__karma__.loaded()，它会在DOM载入后立即调用 mocha.run()
//     此时esl尚未载入测试脚本。
window.__karma__.loaded = function () {};

// 设置DEBUG环境
window.DEBUG || (window.DEBUG = false);

// 依赖提前加载
require(['naboo', 'fetch', 'fetch-jsonp']);

require(TEST_FILES, function () {
    window.__karma__.start();
});

function isTestFile(filepath) {
    return /\/base\/test\//.test(filepath) && filepath.indexOf('.js') > -1;
}

function getModuleId(filepath) {
    // 0123456
    // /base/test/xx.js => test/xx
    return filepath.slice(6, -3);
}
