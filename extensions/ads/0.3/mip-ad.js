// __inline('./mip-ad.js');
// __inline('./mip-ad-baidu.js');
// 


/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
require.config({
    paths: {
<<<<<<< HEAD
        "extensions/ads/0.1/mip-ad-comm": "https://mipcache.bdstatic.com/static/v0.1/ads/mip-ad-comm",
        "extensions/ads/0.1/mip-ad-baidu": "https://mipcache.bdstatic.com/static/v0.1/ads/mip-ad-baidu",
        "extensions/ads/0.1/mip-ad-qwang": "https://mipcache.bdstatic.com/static/v0.1/ads/mip-ad-qwang",
=======
        "extensions/ads/0.3/mip-ad-comm": "https://mipcache.bdstatic.com/static/v0.3/ads/mip-ad-comm",
        "extensions/ads/0.3/mip-ad-baidu": "https://mipcache.bdstatic.com/static/v0.3/ads/mip-ad-baidu",
        "extensions/ads/0.3/mip-ad-qwang": "https://mipcache.bdstatic.com/static/v0.3/ads/mip-ad-qwang"
>>>>>>> master
    }
});

define(function (){
<<<<<<< HEAD
    var customElement = require('customElement').create();

=======
    var customElem = require('customElement');
>>>>>>> master
    
    /**
     * render
     *
     */
    function render () {
<<<<<<< HEAD
        var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        var type = _element.getAttribute('type');
        var adFile = 'extensions/ads/0.1/mip-' + type;
        require([adFile], function(mipAd) {
            mipAd.render(_element);
=======

        var _this = this;
        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var type = this.getAttribute('type');
        var adFile = 'extensions/ads/0.3/mip-' + type;
        require([adFile], function(mipAd) {
            mipAd.render(_this);
>>>>>>> master
        });
    }

    


    /**
     * 初始化
     *
     */
<<<<<<< HEAD
    customElement.prototype.init = function() {
        this.build = render;
    };
    return customElement;
=======
    customElem.prototype.init = function() {
       
        this.build = render;
    };
    return customElem;
>>>>>>> master
});

require(['mip-ad'], function (mipAdComm) {
    // 引入组件需要的css文件，选填
    MIP.css.mipAd = __inline('./mip-ad.less');
    //注册组件
    MIP.registerMipElement('mip-ad', mipAdComm, MIP.css.mipAd);
    MIP.registerMipElement('mip-embed', mipAdComm, MIP.css.mipAd);
});

