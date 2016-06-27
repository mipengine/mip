/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function() {

    var customElem = require('dom/customElement');

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
            var message = {
                'event': 'loadiframe',
                'data': {
                    'url': href,
                    'title': this.getAttribute('title'),
                    'click': $(this).data('click')
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
