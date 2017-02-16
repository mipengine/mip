/**
 * @file Platform Function. Support identification system, engine, browser type
 * @author wupeng10
 */

define(function () {
    'use strict';
    /**
     * Browser user agent
     *
     * @type {Obejct}
     * @public
     */
    var ua = navigator.userAgent;
    
    /**
     * Browser app version
     *
     * @type {string}
     * @public
     */
    var nver = navigator.appVersion;

    /**
     * OS type
     *
     * @type {Object}
     * @public
     */
    var system = {
        isIos: false,
        isAndroid: false
    };
    
    /**
     * Browser type
     *
     * @type {Object}
     * @public
     */
    var browser = {
        isUc: false,
        isChrome: false,
        isAdr: false,
        isSafari: false,
        isQQ: false,
        isFireFox: false,
        isBaidu: false,
        isBaiduApp: false        
    };

    /**
     * Browser engine type
     *
     * @type {Object}
     * @public
     */
    var engine = {
        isTrident: false,
        isGecko: false,
        isWebkit: false
    };

    /**
     * Judge system, iOS, android
     *
     */
    if (/iPhone|iPad|iPod/i.test(ua)) {
        system.isIos = true;
    } else if (/Android/i.test(ua)) {
        system.isAndroid = true;
    }

    /**
     * Judge browser type
     *
     */
    if (/UCBrowser/i.test(ua)) {        
        browser.isUc = true;
    } else if (/baidubrowser/i.test(ua)) {        
        browser.isBaidu = true;
    } else if (/baiduboxapp/i.test(ua)) {      
        browser.isBaiduApp = true;
    } else if (/qqbrowser\/([0-9.]+)/i.test(ua)) {
        browser.isQQ = true;
    } else if (/android/i.test(ua) && /\bversion\/([0-9.]+(?: beta)?)/i.test(ua)) { // Need to put before chrome
        browser.isAdr = true;
    } else if (/\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(ua)) {
        browser.isSafari = true;
    } else if (/android/i.test(ua) && (/samsung/i.test(ua) || /android.+((sch-i[89]0\d|shw-m380s|gt-p\d{4}|gt-n\d+|sgh-t8[56]9|nexus 10))/i.test(ua) || /((SM-T\w+))/i.test(ua))) {
        browser.isAdr = true;
    } else if (/ (?:chrome|crios|crmo)\/([0-9.]+)/i.test(ua)) {
        browser.isChrome = true;
    } else if (/\bfirefox\/([0-9.ab]+)/i.test(ua) || /FxiOS+\/([0-9.ab]+)/i.test(ua)) {
        browser.isFireFox = true;
    }

    /**
     * Judge browser engine type
     *
     */
    if (/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/i.test(ua)) {
        engine.isTrident = true;
    } else if (/\brv:([\d\w.]+).*\bgecko\/(\d+)/i.test(ua)) {
        engine.isGecko = true;
    } else if (/\bapplewebkit[\/]?([0-9.+]+)/i.test(ua)) {
        engine.isWebkit = true;
    }

    /**
     * OS Version
     *
     * @return {string}     
     */
    function getOsVersion() {
        var osVersion;
        var result;
        if (this.isAndroid()) {
            var result = /Android ([\.\_\d]+)/.exec(ua) || /Android\/([\d.]+)/.exec(ua);
            if (result && result.length > 1) {
                osVersion = result[1];
            }
        } else if (this.isIos()) {
            result = /OS (\d+)_(\d+)_?(\d+)?/.exec(nver);
            if (result && result.length > 3) {
                osVersion = result[1] + '.' + result[2] + '.' + (result[3] | 0);
            }
        }
        return osVersion;
    }

    /**
     * Package result
     *        
     */
    var result = [system, engine, browser];
    var data = {
        'getOsVersion': getOsVersion,
        'needSpecialScroll':system.isIos && window != top
    };
    for (var i = 0; i < result.length; i++) {
        for (var key in result[i]) {
            var handle = function(key) {                
                return key;                
            }.bind(null, result[i][key]);            
            data[key] = handle;
        }
    }

    return data;
});