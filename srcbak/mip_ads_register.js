/**
 * @file MIP_ADS_REGISTER: 广告组件注册器
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function(require){
    /**
    * 初始化相关JS
    */

    /**
     *  初始化视图
     * */
    var viewport = require('viewport');


    /**
     *  web compenent组件初始化
     * */
    require('buildins/registerMipElement');

    /*
     * 注册mip-ad 组件
     */
    window.registerMipElement('mip-ad', require('ads/mip-ad'));

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

});
