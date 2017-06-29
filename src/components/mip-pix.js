/**
 * @file mip-pix 统计组件
 * @author baidu-authors<>, liangjiaying<jiaojiaomao220@163.com>
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

    /**
     * 从body获取mip-expeirment实验分组
     * @param  {string} attr 实验名
     * @return {string}      实验分组
     */
    function getBodyAttr(attr) {
        var body = document.getElementsByTagName('body')[0];
        return body.getAttribute(attr) || 'default'
    }

    customElem.prototype.firstInviewCallback = function () {
        // 获取统计所需参数
        var ele = this.element;
        var src = ele.getAttribute('src');
        var host = window.location.href;
        var title = (document.querySelector('title') || {}).innerHTML || '';
        var time = Date.now();

        // 替换通用参数
        src = addParas(src, 't', time);
        src = addParas(src, 'title', encodeURIComponent(title));
        src = addParas(src, 'host', encodeURIComponent(host));

        // 增加对<mip-experiment>支持，获取实验分组
        var expReg = /mip-x-((\w|-|\d|_)+)/g;
        var matchExpArr = src.match(expReg);
        for (i in matchExpArr) {
            var matchExp = matchExpArr[i];
            src = addParas(src, matchExp, getBodyAttr(matchExp));
        }

        // 创建请求img
        var image = new Image();
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
