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

    return {
        makeCacheUrl: makeCacheUrl,
        fn: require('./util/fn'),
        dom: require('./dom/dom'),
        event: require('./dom/event'),
        rect: require('./dom/rect'),
        css: require('./dom/css'),
        Gesture: require('./util/gesture'),
        EventEmitter: require('./util/event-emitter'),
        platform: require('./util/platform')
    }
});
