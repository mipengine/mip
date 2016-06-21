/**
 * @file MIP: mobile instant baidu
 * @author shenzhou@baidu.com
 * @version 1.0
 * @copyright 2015 Baidu.com, Inc. All Rights Reserved
 */
define(function(){
    /**
    * 初始化相关JS
    */

    /**
     *  初始化touch手势
     * */
    var gesture = require('gesture');
    gesture.init();

    /**
     *  初始化视图
     * */
    var viewport = require('viewport');

    /*
    if (window.parent && window.parent != window){
        var target = window.parent;
        var pageMessageCenter = require('message_center');
        gesture.onChange(function(event){
            //console.log("in iframe: start postMessage");
            //console.log(event);
            pageMessageCenter.sendRequest(target,event);
        });
    }
    */

    /**
     *  订阅相关逻辑
     *  TODO:封装成模块
     * */
    /*
    function subscribe(){
        var isSub = false;
        $('.subscrib-action').on("click",function(ev){
            var clickEv = ev;
            $this = $(this); 
            $this.children("div").fadeOut(400,"linear",function(){
                $this.children(".subscrib-ok").fadeIn(200);
                clickEv.stopPropagation();
            });
        });  
    }
    $(subscribe);
    */
    
    /**
     *  web compenent组件初始化
     * */
    require(['dom/registerMipElement']);
    
    /***
     *  注册统计组件
     * /
    require(['dom/mip-pix'],function(mipPix){
        window.registerMipElement('mip-pix',mipPix);
    });

    /*
     *注册mip-gif组件
     */
    require(['dom/mip-gif'],function(mipGif){
        window.registerMipElement('mip-gif',mipGif);
    });

    /*
     * 注册mip-img组件
     */
    require(['dom/mip-img'],function(mipImg){
        window.registerMipElement('mip-img',mipImg);
    }); 

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
    
    /**
     *  初始化图片浏览组件，并处理viewport中的事件冲突
     * */
    /*
    require(['dom/mip-carousel'],function(mipCarousel){
        mipCarousel.initData(); 
        $(window).bind("mip.carousel.open", function() {
            viewport.setViewportNormal(false);
        });
        $(window).bind("mip.carousel.close", function() {
            viewport.setViewportNormal(true);
        });
    });
    */

   /*
    require(['dom/img-viewer'], function (mipViewer) {
        new mipViewer();
    });
    */

});
