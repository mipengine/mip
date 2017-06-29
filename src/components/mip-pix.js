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
        var paraNameQ = new RegExp('\\$?{' + paraName + '}', 'g');
        if (src.search(paraNameQ) > -1) {
            return src.replace(paraNameQ, paraVal);
        }
        src += src.indexOf('?') > -1 ? '&' : '?';
        return src + paraName + '=' + paraVal;
    }
    
    function addExperimentPara(src) {
        var expReg = /\$?{mip-x-(\w|-|\d|_)+}/gi;        
        var matchExpArr = src.match(expReg);
        for (i in matchExpArr) {
            var matchStr = matchExpArr[i];
            var matchExp = matchStr.replace(/{|}|\${/g, '');
            src = src.replace(matchStr, getBodyAttr(matchExp));
        }
        return src;
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
        src = addParas(src, 'TIME', time);
        src = addParas(src, 'TITLE', encodeURIComponent(title));
        src = addParas(src, 'HOST', encodeURIComponent(host));
        
        // 增加对<mip-experiment>支持，获取实验分组
        src = src.addExperimentPara(src);

        // 去除匹配失败的其餘{參數}
        src = src.replace(/\$?{.+?}/g, '');
        // 去除其餘 '${', '{', '}' 確保輸出不包含 MIP 定义的语法
        src = src.replace(/\$?{|}/g, '');
        
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
