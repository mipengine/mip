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
        "extensions/ads/0.1/mip-ad-comm": "https://mipcache.bdstatic.com/static/v0.1/ads/mip-ad-comm",
        "extensions/ads/0.1/mip-ad-baidu": "https://mipcache.bdstatic.com/static/v0.1/ads/mip-ad-baidu",
        "extensions/ads/0.1/mip-ad-qwang": "https://mipcache.bdstatic.com/static/v0.1/ads/mip-ad-qwang",
    }
});

define(function (){
    var customElem = require('customElement');
    
    /**
     * render
     *
     */
    function render () {

        var _this = this;
        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var type = this.getAttribute('type');
        var adFile = 'extensions/ads/0.1/mip-' + type;
        require([adFile], function(mipAd) {
            mipAd.render(_this);
        });
    }

    


    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
       
        this.build = render;
    };
    return customElem;
});

require(['mip-ad'], function (mipAdComm) {
    // 引入组件需要的css文件，选填
    MIP.css.mipAd = __inline('./mip-ad.less');
    //注册组件
    MIP.registerMipElement('mip-ad', mipAdComm, MIP.css.mipAd);
});

