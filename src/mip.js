/**
 * initialize mip
 **/
require(['./components/platform', './viewport', './element', './builtins/mip_builtins'], function (platform, viewport, registerMipElement, builtin) {
    'use strict';

    !window.MIP && (window.MIP = {});
    MIP.css = {};
    MIP['registerMipElement'] = registerMipElement;

    window.platform = platform;

    //页面初始化后，处理可视区域内元素
    $(function(){
        window.setTimeout(function(){
            $('.mip-element').each(function(){
                this.inviewCallback();
            });
        },100);
    });

    //元素绑定scroll，用于lazy load等场景
    viewport.onScroll(function(){
        $('.mip-element').each(function(){
            this.inviewCallback();
        });
    });

    if (window.parent !== window) {
        // IOS非UC解决方案
        if (platform.needSpecialScroll) {
            $('body,html').css({
                height: '100%',
                overflow: 'auto',
                '-webkit-overflow-scrolling': 'touch'
            });
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
});
