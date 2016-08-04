define(function () {
    function isIos() {
        return /iPhone|iPad|iPod/i.test(window.navigator.userAgent); 
    }

    function isSafari() {
        return /Safari/i.test(window.navigator.userAgent) && !isChrome(); 
    }
    function isChrome() {
        return /Chrome|CriOS/i.test(window.navigator.userAgent);
    }
    function isUc() {
        return /UCBrowser/i.test(window.navigator.userAgent);
    }

    return {
        isIos:isIos,
        isSafari:isSafari,
        isChrome:isChrome,
        isUc: isUc,
        needSpecialScroll: isIos() && !isUc()
    }
});
