/**
 * initialize mip
 **/
require(['./components/platform', './element', './builtins/mip_builtins', 
    './viewer', './viewport', './components/css', 'resources', './components/animation'], 
    function (platform, registerMipElement, builtin, viewer, viewport, css, resources, animationRegister) {
    'use strict';
    
    animationRegister();
        
    // mip 初始化
    !window.MIP && (window.MIP = {});
    MIP.css = {};
    MIP['registerMipElement'] = registerMipElement;
    window.platform = platform;
    MIP.registerMipElement = registerMipElement;
    MIP.viewer = viewer;
    MIP.viewport = viewport;
    MIP.prerenderElement = resources.prerenderElement;

    viewer.init();

    // 注册内置组件
    builtin.register();

    // 显示页面
    viewer.show();
});
