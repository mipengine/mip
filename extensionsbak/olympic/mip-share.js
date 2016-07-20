/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define(function() {

    var customElem = require('buildins/customElement');

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
