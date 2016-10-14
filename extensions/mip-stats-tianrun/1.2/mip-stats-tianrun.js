/**
 * @file 天润统计
 *
 * @author wangpei
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {
    var customElement = require('customElement').create();

    customElement.prototype.init = function() {
        this.build = render;
    };


    function render() {
        var _this = this;

        if (_this.element.isRender) {
            return;
        }

        _this.element.isRender = true;
        setStyles(_this.element, {'display': 'none'});

        var node = document.createElement('script');
        node.type = 'text/javascript';
        node.src = '//cl2.webterren.com/webdig.js?z=26';
        _this.element.appendChild(node);

        node.onload = function() {
            var node2 = document.createElement('script');
            node2.type = 'text/javascript';
            node2.innerHTML = 'wd_paramtracker("_wdxid=000000000000000000000000000000000000000000");';
            _this.element.appendChild(node2);
        };
    }


    /**
     * [setStyles CSS样式设置函数]
     * 
     * @param {Html Node} obj html标签
     * @param {Object} params css样式参数
     * @return
     */
    function setStyles(obj, params) {
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                obj.style[key] = params[key];
            }
        }
    }

    return customElement;

});
require(['mip-stats-tianrun'], function (tianRun) {
    //注册组件
    MIP.registerMipElement('mip-stats-tianrun', tianRun);
});

