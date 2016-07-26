/**
 * 网盟插件
 * 
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define('extensions/ads/0.1/mip-ad-baidu', ['require', 'customElement'], function(require){
    var customElem = require('customElement');
    
    function render() {
        if (this.isRender) {
            return;
        }
        this.isRender = true;
        var $this = $(this);
        var cproID = this.getAttribute("cproid");
        
        if(!cproID) {
            return;
        }
        
        initJs();
        initadbaidu($this, cproID);
    }

    /**
     * [initJs JS初始化函数]
     * 
     * @return
     */
    function initJs() {
        var MIPDUPJS = document.getElementById('MIP_DUP_JS');
        if(MIPDUPJS) return;

        var script = document.createElement('script');
        script.src = '//dup.baidustatic.com/js/dm.js';
        script.id = "MIP_DUP_JS";
        document.body.appendChild(script);     
    }

    /**
     * [initadbaidu 广告组件初始化]
     * 
     * @param  {Object} $elemID mip对象
     * @param  {String} cproID  广告id
     * @return
     */
    function initadbaidu($elemID, cproID) {

        var s = "_" + Math.random().toString(36).slice(2);
        var html = '<div style="" id="' + s + '"></div>';
        $elemID.append(html);

        (window.slotbydup=window.slotbydup || []).push({
            id: cproID,
            container: s,
            display: 'inlay-fix',
            async: true
        });
    }

    customElem.prototype.init = function() {
        this.build = render;
    };

    return customElem;

});

require(['extensions/ads/0.1/mip-ad-baidu'], function (mipAdBaidu) {
    // 引入组件需要的css文件，选填
    //注册组件
    MIP.registerMipElement('mip-ad-baidu', mipAdBaidu);
});

