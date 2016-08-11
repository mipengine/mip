/**
 * builtins register
 */
define(['element'], function (registerEle) {
    'use strict';
    // 注册内置组件
    var register = function () {
        registerEle('mip-pix', require('./mip-pix'));
        registerEle('mip-gif', require('./mip-gif'));
        registerEle('mip-img', require('./mip-img'));
        registerEle('mip-carousel', require('./mip-carousel'));
        registerEle('mip-iframe', require('./mip-iframe'));
        registerEle('mip-video', require('./mip-video'));
    };

    return {
        register: register
    }
});
