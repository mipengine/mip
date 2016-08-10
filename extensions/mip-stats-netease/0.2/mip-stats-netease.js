/**
 * @file 网易统计
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {

    var customElement = require('customElement').create();

    customElement.prototype.init = function() {
        this.build = render;
    };


    function render() {
        var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        var $_element = $(_element);
        var id = _element.getAttribute('id') || '';

        $.getScript(location.protocol + '//analytics.163.com/ntes_ex.js', function() {
            // 网易小伙伴 居然支持 amd
            require(['NTES'], function (NTES) {
                NTES(id).pageTracker();
            });

        });

    }

    return customElement;

});
require(['mip-stats-netease'], function (netease) {
    //注册组件
    MIP.registerMipElement('mip-stats-netease', netease);
    MIP.registerMipElement('mip-netease-tongji', netease);
});

