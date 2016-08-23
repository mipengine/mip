/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function() {

    var customElem = require('customElement');

    /**
     * 点击链接事件
     *
     * @param  {Event} e event
     */
    function onClick (e) {

        e.preventDefault();

        var href = this.getAttribute('href');

        if (!href) { return; }

        if (window.parent !== window) {

            var elem = $(this);
            var message = {
                'event': 'loadiframe',
                'data': {
                    'url': href,
                    'title': (elem.attr('title') || elem.text().trim().split('\n')[0]),
                    'click': elem.data('click'),
		    'enc': 'mip'
                }
            };

            window.parent.postMessage(message, '*');
        }
        else {
            location.href = href;
        }

    }

    /**
     * build
     *
     */
    function build() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        $(this).on('click', onClick.bind(this));
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

require(['mip-link'], function (link) {
    //注册组件
    MIP.registerMipElement('mip-link', link);
});
