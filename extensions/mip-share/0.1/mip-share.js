/* inline dep */

__inline('./share/aio');
__inline('./share/detect');
__inline('./share/share');
__inline('./clipboard');
__inline('./share');

/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function() {

    var customElem = require('customElement');

    var Share = require('./share');


    /**
     * build
     */
    function build() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        new Share({
            title: this.getAttribute('title') || document.title,
            url: this.getAttribute('url') || location.href,
            content: this.getAttribute('content') || '',
            iconUrl: this.getAttribute('icon') || ''
        }, $(this));

    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});

require(['mip-share'], function (share) {
    // 引入组件需要的css文件，选填
    MIP.css.mipShare = __inline('./mip-share.less');
    //注册组件
    MIP.registerMipElement('mip-share', share, MIP.css.mipShare);
});
