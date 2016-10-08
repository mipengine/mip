/**
 * @file 跳转链接
 * @author junmer
 * @time 2016.06.21
 */

define(function() {
    var $ = require('zepto');

    var customElement = require('customElement').create();

    /**
     * [is_noCache 判断是否禁止缓存]
     * 
     * @return {Boolean} 
     */
    function is_noCache() {
        var cache_meta = document.querySelector('meta[property="mip:use_cache"]');
        if(cache_meta && cache_meta.getAttribute('content') === 'no') {
            return true;
        }
        return false
    }


    /**
     * 点击链接事件
     *
     * @param  {Event} e event
     */
    function onClick (e) {

        e.preventDefault();

        var href = this.getAttribute('href');
        var pageType = is_noCache() ? 2 : 1;

        if (!href) { return; }

        if (window.parent !== window) {

            var elem = $(this);
            var message = {
                'event': 'loadiframe',
                'data': {
                    'url': href,
                    'title': (elem.attr('title') || elem.text().trim().split('\n')[0]),
                    'click': elem.data('click'),
                    'pageType': pageType 
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
        var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        $(_element).on('click', onClick.bind(_element));
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

require(['mip-link'], function (link) {
    //注册组件
    MIP.registerMipElement('mip-link', link);
});
