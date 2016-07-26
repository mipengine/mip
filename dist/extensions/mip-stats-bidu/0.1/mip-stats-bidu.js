/**
* 百度统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/

define('extensions/mip-stats-bidu/0.1/mip-stats-bidu', ['require', 'customElement'], function(require){

    var customElem = require('customElement');

    customElem.prototype.init = function() {

        this.mipCreatedCallback = render;

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
require(["extensions/mip-stats-bidu/0.1/mip-stats-bidu"], function(statsbidu) {
    //注册组件
    MIP.registerMipElement('mip-stats-bidu', statsbidu);
});

