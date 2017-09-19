/**
 * @file 测试脚本载入器
 * @author yangjun14(yangjun14@baidu.com) , xieyaowu
 */

var TEST_FILES = Object.keys(window.__karma__.files).filter(isTestFile);

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
var mods = TEST_FILES.map(getModuleId);
require(mods, function () {
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
