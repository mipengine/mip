/**
 * @author: Qi
 * @date: 2016-09-26
 * @file: mip-html-os.js
 */

define(['require', 'customElement'], function (require) {
    var customElem = require('customElement').create();
	
    // 判断OS，执行显示移除操作
    function setHtmlOS(elem, osType) {
        var isOS = false;
        var osUA = navigator.userAgent.toLowerCase();

        switch (osType) {
            case 'android':
                // 判断是否为安卓
                isOS = osUA.indexOf('android') > -1;
                break;
            case 'ios':
                // 判断是否为IOS
                isOS = !!osUA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/i);
                break;
        }
        if (isOS) {
            // 真 显示元素
            elem.style.display = 'block';
        }
        else {
            // 假 移除元素
            elem.parentNode.removeChild(elem);
        }
    }
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var _this = this;
        if (_this.element.isRender) {
            return;
        }

        _this.element.isRender = true;

        var osType = _this.element.getAttribute('os');
        setHtmlOS(_this.element, osType);
    };
    return customElem;
});

require(['mip-html-os'], function (mipHtmlOs) {
    MIP.registerMipElement('mip-html-os', mipHtmlOs);
});
