/**
* 百度统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define(function(){

    var customElem = require('dom/customElement');

    customElem.prototype.init = function() {

        this.mibCreatedCallback = render;

    };

    function render() {
        if (this.isRender) {
            return; 
        }

        this.isRender = true;
        
        var token = this.getAttribute('token');

        var $this = $(this);
        var html = [
            '<script type="text/javascript">',
                'var _hmt = _hmt || []; (function() { var hm = document.createElement("script"); hm.src = "//hm.baidu.com/hm.js?'+token+'"; var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s); })();',
            '</script>'
        ];

        $this.append(html.join(''));
    }

    return customElem;

});
require(["mip-stats-bidu"], function(mip-stats-bidu) {
    //注册组件
    MIP.registerMipElement('mip-stats-bidu', mip-stats-bidu);
});

