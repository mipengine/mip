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

    /**
     * Exchange a url to cache url.
     * Reg result are four aspect
     *  reg[0] whole url
     *  reg[1] url protocol
     *  reg[2] url mip cache domain
     *  reg[3] /s flag
     *  reg[4] origin url
     * @param {string} url Source url.
     * @param {string} type The url type.
     * @return {string} Cache url.
     */
    function parseCacheUrl (url, type) {
        if (!url) {
            return url;
        }
        if (!(url.indexOf('http') === 0
            || url.indexOf('/') === 0)) {
            return url;
        }
        var reg = new RegExp("^(http[s]:){0,1}(\/\/mipcache.bdstatic.com){0,1}\/[ic](\/s){0,1}\/(.*)$", 'g');
        var result = reg.exec(url);
        if (!result) {
            return url;
        }
        var uri = 'http:';
        if (result[1]) {
            uri = result[1];
        } else if (result[3]) {
            uri = 'https:';
        }
        if (result && result[4]) {
            uri += '//' + result[4];
        }
        return uri;
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
