/**
 * @file 常规统计
 * @author junmer
 */

define(function(){

    var customElem = require('customElement');

    customElem.prototype.init = function() {

        this.build = render;

    };

    function noop () {}

    function render() {
        if (this.isRender) {
            return;
        }

        this.isRender = true;

        // 隐藏
        this.style.display = 'none';

        var url = this.getAttribute('src');

        if (!url) {
            return;
        }

        var img = new Image();

        img.onload = img.onError = noop;

        this.appendChild(img);

        console.log(url);

        img.src = ''
            + url
            + (url.indexOf('?') > -1 ? '&' : '?')
            + '_='
            + (+new Date());


    }

    return customElem;

});
require(["mip-stats-general"], function(stats) {
    //注册组件
    MIP.registerMipElement('mip-stats-general', stats);
});

