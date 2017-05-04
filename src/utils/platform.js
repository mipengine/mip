/**
 * @file Platform Function. Support identification system, engine, browser type
 * @author wupeng10
 */

define(function (require) {
    'use strict';

    /**
     * Platform class
     *
     * @class
     */
    function Platform() {
        // system
        this.isIos = false;
        this.isAndroid = false;
        this.isPc = false;
        // browser
        this.isWechatApp = false;
        this.isBaiduApp = false;
        this.isWeiboApp = false;
        this.isQQApp = false;
        this.isUc = false;
        this.isBaidu = false;
        this.isQQ = false;
        this.isAdr = false;
        this.isSafari = false;
        this.isChrome = false;
        this.isFireFox = false;
        // engine
        this.isTrident = false;
        this.isGecko = false;
        this.isWebkit = false;
    }

    /**
     * Judge system, iOS, android
     *
     */
    Platform.prototype._matchOs = function () {
        if (/iPhone|iPad|iPod/i.test(this._ua())) {
            this.isIos = true;
        } else if (/Android/i.test(this._ua())) {
            this.isAndroid = true;
        } else if (!/Mobile/i.test(this._ua())) {
            this.isPc = true;
    };

    /**
     * Judge browser type
     *
     */
    Platform.prototype._matchBrowser = function () {
        var uaArray = this._ua().split('Mobile');
        var apps = uaArray && uaArray.length > 1 ? uaArray[1] : null;

        if (/\bmicromessenger\/([\d.]+)/i.test(apps)) {
            this.isWechatApp = true;
        } else if (/baiduboxapp/i.test(apps)) {
            this.isBaiduApp = true;
        } else if (/weibo/i.test(apps)) {
            this.isWeiboApp = true;
        } else if (/\sQQ/i.test(apps)) {
            this.isQQApp = true;
        } else if (/UCBrowser/i.test(this._ua())) {
            this.isUc = true;
        } else if (/baidubrowser/i.test(this._ua())) {
            this.isBaidu = true;
        } else if (/qqbrowser\/([0-9.]+)/i.test(this._ua())) {
            this.isQQ = true;
        } else if (!/android/i.test(this._ua())
            && /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//i.test(this._ua())) {
            this.isSafari = true;
        } else if (/(?:Chrome|CrMo|CriOS)\/([0-9]{1,2}\.[0-9]\.[0-9]{3,4}\.[0-9]+)/i.test(this._ua())
            && !/samsung/i.test(this._ua())) {
            this.isChrome = true;
        } else if (/(firefox|FxiOS+)\/([0-9.ab]+)/i.test(this._ua())) {
            this.isFireFox = true;
        } else if (/android/i.test(this._ua())
            && /Android[\s\_\-\/i686]?[\s\_\-\/](\d+[\.\-\_]\d+[\.\-\_]?\d*)/i.test(this._ua())) {
            this.isAdr = true;
        }
    };

    /**
     * Judge browser engine type
     *
     */
    Platform.prototype._matchEngine = function () {
        if (/\b(?:msie |ie |trident\/[0-9].*rv[ :])([0-9.]+)/i.test(this._ua())) {
            this.isTrident = true;
        } else if (/\brv:([\d\w.]+).*\bgecko\/(\d+)/i.test(this._ua())) {
            this.isGecko = true;
        } else if (/\bapplewebkit[\/]?([0-9.+]+)/i.test(this._ua())) {
            this.isWebkit = true;
        }
    };

    /**
     * OS Version
     *
     * @return {string}
     */
    Platform.prototype.getOsVersion = function () {
        var osVersion;
        var result;
        if (this.isAndroid()) {
            result = /Android ([\.\_\d]+)/.exec(this._ua()) || /Android\/([\d.]+)/.exec(this._ua());
            if (result && result.length > 1) {
                osVersion = result[1];
            }
        } else if (this.isIos()) {
            result = /OS (\d+)_(\d+)_?(\d+)?/.exec(this._appVersion());
            if (result && result.length > 3) {
                osVersion = result[1] + '.' + result[2] + '.' + (result[3] | 0);
            }
        }
        return osVersion;
    };

    /**
     * Wrap engine, browser, engine varible to function
     *
     */
    Platform.prototype._wrapFun = function () {
        var self = this;
        for (var key in self) {
            if (self.hasOwnProperty(key) && typeof self[key] !== 'function') {
                var handle = function (key) {
                    return key;
                }.bind(null, self[key]);
                self[key] = handle;
            }
        }
        self.needSpecialScroll = self.isIos() && window !== top;
    };

    /**
     * Get user agent
     *
     * @return {string} user agent
     */
    Platform.prototype._ua = function () {
        return navigator.userAgent;
    };

    /**
     * Get app version
     *
     * @return {string} app version
     */
    Platform.prototype._appVersion = function () {
        return navigator.appVersion;
    };

    /**
     * Start match user agent
     *
     * @return {Object} self object
     */
    Platform.prototype.start = function () {
        this._matchOs();
        this._matchBrowser();
        this._matchEngine();
        this._wrapFun();
        return this;
    };

    return new Platform();
});
