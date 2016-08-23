/* inline dep */

__inline('./share/aio');
__inline('./share/detect');
__inline('./share/share');
// __inline('./clipboard');
__inline('./share');

/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function() {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    var Share = require('./share');


    /**
     * build
     */
    function build() {
        var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        new Share({
            title: _element.getAttribute('title') || document.title,
            url: _element.getAttribute('url') || location.href,
            content: _element.getAttribute('content') || '',
            iconUrl: _element.getAttribute('icon') || ''
        }, $(_element));

    }

    /**
     * 初始化
     *
     */
    customElement.prototype.init = function() {
        this.build = build;
    };

    return customElement;

});

require(['mip-share'], function (share) {
    // 引入组件需要的css文件，选填
    MIP.css.mipShare = __inline('./mip-share.less');
    //注册组件
    MIP.registerMipElement('mip-share', share, MIP.css.mipShare);
});
