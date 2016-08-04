/**
 * builtins register
 */
define(['element'], function (registerEle) {
    'use strict';
    // 注册内置组件
    var register = function () {
        registerEle('mip-pix', require('builtins/mip-pix'));
        registerEle('mip-gif', require('builtins/mip-gif'));
        registerEle('mip-img', require('builtins/mip-img'));
        registerEle('mip-carousel', require('extensions/mip-carousel'));
        registerEle('mip-iframe', require('extensions/mip-iframe'));
        registerEle('mip-video', require('builtins/mip-video'));
    };

    return {
        register: register
    }
});
