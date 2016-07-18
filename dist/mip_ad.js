/**
 * @file MIP_ADS_REGISTER: 广告组件注册器
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define('mip_ads_register', ['require', 'viewport', 'buildins/registerMipElement', 'ads/mip-ad'], function(require){
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
;
/**
* 广告插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define('ads/mip-ad', ['require', 'buildins/customElement'], function(require){
    var customElem = require('buildins/customElement');
    
    function render() {
        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var tpl = this.getAttribute('tpl');

        switch(tpl) {
            case 'onlyImg':
                renderOnlyImg.call(this);
                break;
            case 'noneImg':
                renderNoneImg.call(this);
                break;
            case 'oneImg':
                renderOneImg.call(this);
                break;
            case 'moreImg':
                renderMoreImg.call(this);
                break;
        }
    }

    function renderOnlyImg() {
        var $this = $(this);

        var url = this.getAttribute('src');
        var img = $this.data('img');
        var size = $this.data('size').trim().split(' ');
        var width = size[0];
        var height = size[1];
        var ratio = (height/width*100).toFixed(2);

        var html = [
            '<a href="'+ url +'" class="c-urljump">',
                '<div style="position:relative;width:100%;padding-bottom:'+ ratio +'%;overflow:hidden;">',
                    '<img src="'+ img +'" style="position:absolute;left:0;top:0;width:100%;">',
                '</div>',
            '</a>'
        ].join('');

        $this.append(html);
    }

    function renderNoneImg() {
    	var $this = $(this);

        var url = this.getAttribute('src');
        var img = $this.data('img');
        var size = $this.data('size').trim().split(' ');
        var width = size[0];
        var height = size[1];
        var ratio = (height/width*100).toFixed(2);
        var title = $this.data('title');

        var html = [
            '<a class="c-blocka" href="'+ url +'" class="c-urljump" style="padding: 0 21px;font-size: 18px;line-height: 26px;">',
                '<div class="c-row">',
                    '<div class="c-span12">',
                        '<div class="sf-news-feed-content">',
                            '<div class="c-line-clamp2">',
                                '<span>' + title + '</span>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            '</a>'
        ].join('');

        $this.append(html);

    }

    function renderOneImg() {
    	var $this = $(this);

        var url = this.getAttribute('src');
        var img = $this.data('img');
        var size = $this.data('size').trim().split(' ');
        var width = size[0];
        var height = size[1];
        var ratio = (height/width*100).toFixed(2);
        var title = $this.data('title');

        var html = [
            '<a class="c-blocka" href="'+ url +'" class="c-urljump" style="padding: 0 21px;font-size: 18px;line-height: 26px;">',
                '<div class="c-row" style="-webkit-box-align: center;-webkit-align-items: center;">',
                    '<div class="c-span4">',
                        '<div class="c-img c-img-x">',
                            '<img src="'+ img +'">',
                        '</div>',
                    '</div>',
                    '<div class="c-span8">',
                        '<div>',
                            '<div class="c-line-clamp2">',
                                '<span>' + title + '</span>',
                            '</div>',
                        '</div>',
                    '</div>',
                '</div>',
            '</a>'
        ].join('');

        $this.append(html);
    }

    function renderMoreImg() {

    }

    customElem.prototype.init = function() {

        this.build = render;

    };

    return customElem;

});

;

require(['mip_ads_register']);


