/**
 *
 * @file export api
 * @author xx
 * @modify wupeng10@baidu.com 2017-06-15 add parseCacheUrl api
 */
define(function (require) {
    'use strict';

    // Page url
    var pageUrl = location.href;

    /**
     * Exchange a url to cache url.
     *
     * @param {string} url Source url.
     * @param {string} type The url type.
     * @return {string} Cache url.
     */
    function makeCacheUrl(url, type) {
        if (pageUrl.indexOf('mipcache.bdstatic.com') < 0
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
            return;
        }
        if (!(url.indexOf('http') === 0
            || url.indexOf('/') === 0)) {
            return url;
        }
        var reg = new RegExp('^(http[s]:){0,1}(\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}'
            + '(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?){0,1}\/[ic](\/s){0,1}\/(.*)$', 'g');
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
    };
});
