/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function() {

    var customElem = require('dom/customElement');


    // require('//m.baidu.com/se/static/activity/yaohao_share/share_8053019');
    var Share = require('activity/yaohao_share/share');

    /**
     * build
     */
    function build() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        new Share({
            title: document.title,
            url: this.getAttribute('url')
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
