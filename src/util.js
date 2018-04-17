/**
 *
 * @file export api
 * @author xx
 * @modify wupeng10@baidu.com 2017-06-15 add parseCacheUrl api
 */
define(function (require) {
    'use strict';

    var fn = require('./utils/fn');
    var hash = require('./hash');

    /**
     * Exchange a url to cache url.
     *
     * @param {string} url Source url.
     * @param {string} type The url type.
     * @return {string} Cache url.
     */
    function makeCacheUrl(url, type) {
        if (!fn.isCacheUrl(location.href)
            || (url && url.length < 8)
            || !(url.indexOf('http') === 0 || url.indexOf('//') === 0)) {
            return url;
        }
        var prefix = (type === 'img') ? '/i/' : '/c/';
        if (url.indexOf('//') === 0 || url.indexOf('https') === 0) {
            prefix += 's/';
        }
        var urlParas = url.split('//');
        urlParas.shift();
        url = urlParas.join('//');
        return prefix + url;
    }


    /**
     * Exchange cache url to origin url.
     * Reg result has many aspects, it's following
     *  reg[0] whole url
     *  reg[1] url protocol
     *  reg[2] url mip cache domain
     *  reg[3] url domain extname
     *  reg[4] /s flag
     *  reg[5] origin url
     *
     * @param {string} url Source url.
     * @return {string} origin url.
     */
    function parseCacheUrl(url) {
        if (!url) {
            return url;
        }
        if (!(url.indexOf('http') === 0
            || url.indexOf('/') === 0)) {
            return url;
        }
        var reg = new RegExp('^(http[s]:)?(\/\/([^\/]+))?\/[ic](\/s)?\/(.*)$', 'g');
        var result = reg.exec(url);
        if (!result) {
            return url;
        }
        var uri = result[4] ? 'https:' : 'http:';
        uri += result[5] ? ('//' + result[5]) : '';
        var urlRegExp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
        if (!urlRegExp.test(uri)) {
            return url;
        }
        return uri;
    }

    /**
     * 获取页面原mip url，可以将页面mip-cache url处理为原页面
     * 由于cache-url可能会被改写，需要还原
     *
     * @return {string} 原mip页URL
     */
    function getOriginalUrl() {
        var parsedUrl = parseCacheUrl(window.location.href);
        if(parsedUrl == window.location.href) {
            // 直接打开MIP页
            return parsedUrl;
        }
        // mip-cache页面
        var urlWithoutHash = parsedUrl.split('#')[0];
        var originHash = hash.get('mipanchor');
        return urlWithoutHash + (originHash.length ? '#' : '') + originHash;
    }

    return {
        parseCacheUrl: parseCacheUrl,
        makeCacheUrl: makeCacheUrl,
        getOriginalUrl: getOriginalUrl,
        fn: fn,
        dom: require('./dom/dom'),
        event: require('./dom/event'),
        rect: require('./dom/rect'),
        css: require('./dom/css'),
        Gesture: require('./utils/gesture'),
        EventEmitter: require('./utils/event-emitter'),
        platform: require('./utils/platform').start(),
        customStorage: require('./utils/customStorage'),
        naboo: require('naboo')
    };
});
