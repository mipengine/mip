define(function () {
    'use strict';

    /**
     * Save the userAgent.
     * @inner
     * @type {string}
     */
    var ua = navigator.userAgent;

    /**
     * Ios
     * @return {boolean}
     */
    function isIos() {
        return /iPhone|iPad|iPod/i.test(ua); 
    }

    /**
     * Safari
     * @return {boolean}
     */
    function isSafari() {
        return /Safari/i.test(ua) && !isChrome(); 
    }

    /**
     * Chrome
     * @return {boolean}
     */
    function isChrome() {
        return /Chrome|CriOS/i.test(ua);
    }

    /**
     * Uc
     * @return {boolean}
     */
    function isUc() {
        return /UCBrowser/i.test(ua);
    }

    /**
     * Webkit
     * @return {boolean}
     */
    function isWebkit() {
        return /WebKit/i.test(ua);
    }

    return {
        isIos:isIos,
        isSafari:isSafari,
        isChrome:isChrome,
        isUc: isUc,
        isWebkit: isWebkit,
        needSpecialScroll: isIos() && window != top
    }
});
