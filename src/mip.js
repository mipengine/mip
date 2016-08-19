/**
 * initialize mip
 **/
require(['./components/platform', './element', './builtins/mip_builtins', './viewer'], 
    function (platform, registerMipElement, builtin, viewer) {
    'use strict';

    !window.MIP && (window.MIP = {});
    MIP.css = {};
    MIP['registerMipElement'] = registerMipElement;

    window.platform = platform;

    // viewer 初始化
    viewer.init();

    // 注册内置组件
    builtin.register();
    //显示 body
    $('body').css({
        'opacity': 1,
        'animation': 'none',
        '-webkit-animation': 'none',
        '-moz-animation': 'none',
        '-ms-animation': 'none'
    });
});
