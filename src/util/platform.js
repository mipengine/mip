define(function () {
    var ua = navigator.userAgent;
    function isIos() {
        return /iPhone|iPad|iPod/i.test(ua); 
    }

    function isSafari() {
        return /Safari/i.test(ua) && !isChrome(); 
    }
    function isChrome() {
        return /Chrome|CriOS/i.test(ua);
    }
    function isUc() {
        return /UCBrowser/i.test(ua);
    }
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
