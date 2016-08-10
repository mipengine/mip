/**
 * @file 常规统计
 * @author junmer
 */

define(function(){

   var customElement = require('customElement').create();


    customElement.prototype.init = function() {

        this.build = render;

    };

    function noop () {}

    function render() {
        var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        // 隐藏
        _element.style.display = 'none';

        var url = _element.getAttribute('src');

        if (!url) {
            return;
        }

        var img = new Image();

        img.onload = img.onError = noop;

        _element.appendChild(img);

        img.src = ''
            + url
            + (url.indexOf('?') > -1 ? '&' : '?')
            + '_='
            + (+new Date());


    }

    return customElement;

});
require(["mip-stats-general"], function(stats) {
    //注册组件
    MIP.registerMipElement('mip-stats-general', stats);
});

