define(function (require) {
    'use strict';

    // Page url
    var pageUrl = location.href;
    /**
     * Exchange a url to cache url.
     * @param {string} url Source url.
     * @param {string} type The url type.
     * @return {string} Cache url.
     */
    function makeCacheUrl(url, type) {
        if (pageUrl.indexOf('mipcache.bdstatic.com') < 0
            || (url && url.length < 8)
            || !(url.indexOf('http') == 0 || url.indexOf('//') == 0)) {
            return url;
        }
        var prefix = (type === 'img') ? '/i/' : '/c/';
        if (url.indexOf('//') == 0 || url.indexOf('https') == 0) {
            prefix += 's/';
        }
        var urlParas = url.split('//');
        urlParas.shift();
        url = urlParas.join('//');
        return prefix + url;
    }

    function parseCacheUrl (url, type) {
        if (!url) {
            return url;
        }
        if (!(url.indexOf('http') === 0
            || url.indexOf('/') === 0)) {
            return url;
        }
        var hp = (type === 'img') ? '/i/' : '/c/';
        var hps = hp + 's/';
        var hpItems = url.split(hp);
        var hspItems = url.split(hps);
        if (hspItems.length === 2) {
            url = 'https://' + hspItems[1];
        } else if (hpItems.length === 2) {
            url = 'http://' + hpItems[1];
        }
        return url;
    }

    return {
        parseCacheUrl: parseCacheUrl,
        makeCacheUrl: makeCacheUrl,
        fn: require('./utils/fn'),
        dom: require('./dom/dom'),
        event: require('./dom/event'),
        rect: require('./dom/rect'),
        css: require('./dom/css'),
        Gesture: require('./utils/gesture'),
        EventEmitter: require('./utils/event-emitter'),
        platform: require('./utils/platform').start(),
        customStorage: require('./utils/customStorage'),
        naboo: require('naboo')
    }
});
