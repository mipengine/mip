/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file 测试脚本载入器
 */

var TEST_FILES = Object.keys(window.__karma__.files).filter(isTestFile);

/*
 * 依赖配置
 */
var paths = pathMap(TEST_FILES);
paths.naboo = '/base/deps/naboo';
paths.fetch = '/base/deps/fetch';
require.config({
    baseUrl: '/base/src',
    paths: paths
});

/*
 * 启动测试
 */
// Important: 禁用__karma__.loaded()，它会在DOM载入后立即调用 mocha.run()
//     此时esl尚未载入测试脚本。
window.__karma__.loaded = function() {};
var mods = TEST_FILES.map(getModuleId);
require(mods, window.__karma__.start);


/*
 * 工具函数
 */
function pathMap(arr) {
    var map = {};
    arr.forEach(function(file){
        var mod = getModuleId(file);
        map[mod] = file.slice(0, -3);
    });
    return map;
}

function isTestFile(filepath){
    return /\/base\/test\//.test(filepath) && 
        filepath !== '/base/test/index.js';
}

function getModuleId(filepath){
    // 0123456
    // /base/test/xx => test/xx
    return filepath.slice(6, -3);
}
