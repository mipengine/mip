/**
 * initialize mip
 **/
require(['./components/platform', './element', './builtins/mip_builtins', './resources'], 
    function (platform, registerMipElement, builtin) {
    'use strict';

    !window.MIP && (window.MIP = {});
    MIP.css = {};
    MIP['registerMipElement'] = registerMipElement;

    window.platform = platform;


    // viewer
    if (window.parent !== window) {
        // IOS非UC解决方案
        if (platform.needSpecialScroll) {
            $('body,html').css({
                height: '100%',
                overflow: 'auto',
                '-webkit-overflow-scrolling': 'touch'
            });
            $('body').css('position', 'relative');
        }
        //页面传递消息给父页面
        window.parent.postMessage({
            event: 'mippageload',
            data: {
                time: new Date().getTime()
            }
        }, '*');
    }
    // 注册内置组件
    builtin.register();
    //显示 body
    $('body').css({
        opacity: 1,
        animation: 'none'
    });
});
