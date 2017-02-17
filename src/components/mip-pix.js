/**
 * @file mip-pix 统计组件
 * @author baidu-authors<>, liangjiaying<liangjiaying@baidu.com>
 */
define(function (require) {
    var customElem = require('customElement').create();
    var util = require('util');

    /**
     * 替换请求链接中的参数
     * @param {string} src      用户填写在mip-pix中的src
     * @param {string} paraName key, 如"title"
     * @param {string} paraVal  value, 如当前时间戳
     */
    function addParas(src, paraName, paraVal) {
        if (src.indexOf('?' + paraName) > -1 || src.indexOf('&' + paraName) > -1) {
            var reg = new RegExp(paraName + '=({\\w+})');
            var placeholder = reg.exec(src) ? reg.exec(src)[1] : '';
            return src.replace(placeholder, paraVal);
        }
        src += src.indexOf('?') > -1 ? '&' : '?';
        return src + paraName + '=' + paraVal;
    }

    customElem.prototype.build = function () {
        var image = new Image();
        var ele = this.element;
        var src = ele.getAttribute('src');
        var host = window.location.href;
        var title = (document.querySelector('title') || {}).innerHTML || '';
        var time = Date.now();
        src = addParas(src, 't', time);
        src = addParas(src, 'title', encodeURIComponent(title));
        src = addParas(src, 'host', encodeURIComponent(host));
        image.src = src;
        image.setAttribute('width', 0);
        image.setAttribute('height', 0);
        ele.setAttribute('width', '');
        ele.setAttribute('height', '');
        ele.appendChild(image);
        util.css(ele, {display: 'none'});
    };
    return customElem;
});
