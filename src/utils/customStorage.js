/**
 * @file customStorage Function. Support publiser management and localstorage
 * @author wupeng10@baidu.com
 * @modify wupeng10@baidu.com 2017-03-02 Add cookieStorage module, In order to reduce http header
 * size, otherwise page will be a bad request with 40*,Need to be deleted after long-term solution;
 */
define(function (require) {
    'use strict';

    var fn = require('./fn');

    /**
     * Type of storage
     * @const
     * @inner
     * @type {Object}
     */
    var storageType = {
        LOCALSTORAGE: 0,
        ASYNCSTORAGE: 1,
        COOKIESTORAGE: 2
    };

    /**
     * Error code
     * @const
     * @inner
     * @type {Object}
     */
    var eCode = {
        siteExceed: 21,
        lsExceed: 22
    };

    /**
     * When no support local storage, store data temporary
     * @const
     * @inner
     * @type {Object}
     */
    var lsCache = {};

    /**
     * Location href
     * @const
     * @inner
     * @type {string}
     */
    var href = window.location.href;

    /**
     * Domain of website
     * @const
     * @inner
     * @type {string}
     */
    var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;
    var matchArr = href.match(reg);
    var HOST = matchArr && matchArr.length > 1 ? matchArr[1] : '';

    /**
     * Current domain storage size, max is 4k
     * @const
     * @inner
     * @type {number}
     */
    var STORAGESIZE = 4 * 1024;

    /**
     * Update local storage operation time
     *
     * @param {Object} storage it's local storage
     */
    function updateTime(storage) {
        if (!storage) {
            return;
        }
        storage.u = new Date().getTime();
    }

    /**
     * Parse json link JSON.parse
     *
     * @param {string} str parse string
     * @return {string} parsed string
     */
    function parseJson(str) {
        try {
            str = JSON.parse(str);
        } catch (e) {
        }
        return str;
    }

    /**
     * Get error message with error code
     *
     * @param {string} code error code
     * @param {string} name error name
     * @return {string} error message
     */
    function getErrorMess(code, name) {
        var mess;
        switch (code) {
            case eCode.siteExceed:
                mess = 'storage space need less than 4k';
            case eCode.lsExceed:
                mess = 'Uncaught DOMException: Failed to execute setItem on Storage: Setting the value of '
                    + name + ' exceeded the quota at ' + window.location.href;
        }
        return mess;
    }

    /**
     * Generate error object
     *
     * @param {string} code error code
     * @param {string} mess error name
     * @return {string} error object
     */
    function getError(code, mess) {
        return {
            errCode: code,
            errMess: mess
        };
    }

    /**
     * Storage Class
     *
     * @param {number} type type of storage
     * @class
     */
    function customStorage(type) {
        switch (type) {
            case storageType.ASYNCSTORAGE:
                this.storage = new AsyncStorage();
                break;
            case storageType.LOCALSTORAGE:
                this.storage = new LocalStorage();
                break;
            case storageType.COOKIESTORAGE:
                this.storage = new CookieStorage();
                break;
        }
        return this.storage;
    }

    /**
     * Local Storage class
     *
     * @class
     */
    function LocalStorage() {}

    /**
     * Whether support Local Storage
     *
     * @return {boolean} Whether support ls
     */
    LocalStorage.prototype._isCachePage = function () {
        return fn.isCacheUrl(href);
    };

    /**
     * Whether support Local Storage
     *
     * @return {boolean} Whether support ls
     */
    LocalStorage.prototype._isCachePage = function () {
        return fn.isCacheUrl(href);
    };

    /**
     * Whether support Local Storage
     *
     * @return {boolean} Whether support ls
     */
    LocalStorage.prototype._supportLs = function () {
        var support = false;
        if (window.localStorage && window.localStorage.setItem) {
            try {
                window.localStorage.setItem('lsExisted', '1');
                window.localStorage.removeItem('lsExisted');
                support = true;
            } catch (e) {
                support = false;
            }
        }
        return support;
    };

    /**
     * Get local storage
     *
     * @return {Object} value of local storage
     */
    LocalStorage.prototype._getLocalStorage = function () {
        var ls = this._supportLs() ? localStorage.getItem(HOST) : lsCache[HOST];
        ls = ls ? parseJson(ls) : {};
        updateTime(ls);
        return ls;
    };

    /**
     * Delete local storage
     *
     * @param {string} key the key of local storage
     */
    LocalStorage.prototype._rmLocalStorage = function (key) {
        if (!key) {
            key = HOST;
        }
        this._supportLs() ? localStorage.removeItem(key) : fn.del(lsCache, key);
    };

    /**
     * Set current site data in local storage
     *
     * @param {string} name name of storage
     * @param {string} value value of storage
     * @param {string} expire optional
     * @param {string} callback if error callback to publisher
     */
    LocalStorage.prototype.set = function (name, value, expire, callback) {
        if (!name || !value) {
            return;
        }
        callback = typeof expire === 'function' ? expire : callback;
        if (this._isCachePage()) {
            var ls = this._getLocalStorage();
            ls[name] = value;
            expire = parseInt(expire, 10);
            if (!isNaN(expire) && expire > 0) {
                ls.e = new Date().getTime() + expire;
            } else {
                fn.del(ls, 'e');
            }
            ls = JSON.stringify(ls);
            if (ls.length > STORAGESIZE) {
                callback && callback(getError(eCode.siteExceed, getErrorMess(eCode.siteExceed)));
                throw getErrorMess(eCode.siteExceed);
            }
            this._setLocalStorage(HOST, ls, expire, callback);
        } else {
            this._setLocalStorage(name, value, expire, callback);
        }
    };

    /**
     * Set local storage
     *
     * @param {string} key the key of local storage
     * @param {string} value the key of local storage
     * @param {string} expire the expire of local storage
     * @param {string} callback if error callback to publisher
     */
    LocalStorage.prototype._setLocalStorage = function (key, value, expire, callback) {
        var mess = getErrorMess(eCode.lsExceed, key);
        callback = typeof expire === 'function' ? expire : callback;
        if (this._supportLs()) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                if (this._isExceed(e) && this._isCachePage()) {
                    this._exceedHandler(key, value, expire);
                } else if (this._isExceed(e) && !this._isCachePage()) {
                    callback && callback(getError(eCode.lsExceed, mess));
                    throw mess;
                }
            }
        } else {
            var size = value.length / 1024.0 / 1024.0;
            for (var k in lsCache) {
                if (lsCache[k]) {
                    size += lsCache[k].length / 1024.0 / 1024.0;
                }
            }
            if (size > 5.0) {
                callback && callback(eCode.lsExceed, mess);
                throw mess;
            }
            lsCache[key] = value;
        }
    };

    /**
     * Get current site data in local storage
     *
     * @param {string} name name of storage
     * @return {string} get data with key
     */
    LocalStorage.prototype.get = function (name) {
        if (!fn.isString(name)) {
            return;
        }

        var result;
        if (this._isCachePage()) {
            var ls = this._getLocalStorage();
            if (ls && ls[name]) {
                result = ls[name];
            }
        } else {
            result = this._supportLs() ? localStorage.getItem(name) : lsCache[name];
        }
        return result;
    };

    /**
     * Delete current site data in local storage with key
     *
     * @param {string} name name of storage
     */
    LocalStorage.prototype.rm = function (name) {
        if (!fn.isString(name)) {
            return;
        }

        if (this._isCachePage()) {
            var ls = this._getLocalStorage();
            if (ls && ls[name]) {
                fn.del(ls, name);
                this._setLocalStorage(HOST, JSON.stringify(ls));
            }
        } else {
            this._supportLs() ? localStorage.removeItem(name) : fn.del(lsCache, name);
        }
    };

    /**
     * Clear current site local storage
     *
     */
    LocalStorage.prototype.clear = function () {
        if (this._isCachePage()) {
            this._rmLocalStorage();
        } else {
            this._supportLs() ? localStorage.clear() : lsCache = {};
        }
    };

    /**
     * Delete all expire storage, scope is all sites
     *
     * @return {boolean} whether storage has expired
     */
    LocalStorage.prototype.rmExpires = function () {
        var hasExpires = false;
        if (this._isCachePage()) {
            var ls = this._supportLs() ? localStorage : lsCache;
            for (var k in ls) {
                if (ls[k]) {
                    var val;
                    if (typeof ls[k] === 'string') {
                        val = parseJson(ls[k]);
                    }
                    if (val && val.e) {
                        var expire = parseInt(parseJson(ls[k]).e, 10);
                        if (expire && new Date().getTime() >= expire) {
                            hasExpires = true;
                            this._rmLocalStorage(k);
                        }
                    }
                }
            }
        }
        return hasExpires;
    };

    /**
     * Whether local storage is exceed, http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
     *
     * @param {Object} e set local storage error
     * @return {boolean} whether storage exceed
     */
    LocalStorage.prototype._isExceed = function (e) {
        var quotaExceeded = false;
        if (e && e.code) {
            switch (e.code) {
                case 22: {
                    quotaExceeded = true;
                    break;
                }
                case 1014: { // Firefox
                    quotaExceeded = e.name === 'NS_ERROR_DOM_QUOTA_REACHED';
                    break;
                }
            }
        } else if (e && e.number === -2147024882) { // Internet Explorer 8
            quotaExceeded = true;
        }
        return quotaExceeded;
    };

    /**
     * Handle when storage exceed
     *
     * @param {string} name the key of local storage
     * @param {string} value the key of local storage
     * @param {string} expire the expire of local storage
     */
    LocalStorage.prototype._exceedHandler = function (name, value, expire) {
        var minTimeStamp;
        var key;
        if (!this.rmExpires()) {
            var ls = localStorage;
            for (var k in ls) {
                if (ls[k]) {
                    var item = parseJson(ls[k]).u;
                    if (!key || parseInt(item, 10) < minTimeStamp) {
                        key = k;
                        minTimeStamp = parseInt(item, 10);
                    }
                }
            }
            this._rmLocalStorage(key);
        }
        this.set(name, value, expire);
    };

    /**
     * Publisher manage storage, via request
     *
     * @class
     */
    function AsyncStorage() {}

    /**
     * Send request to server with params
     *
     * @param {Object} opt request params
     */
    AsyncStorage.prototype.request = function (opt) {
        if (!opt || !opt.url) {
            return;
        }
        var myInit = {};
        myInit.mode = opt.mode ? opt.mode : null;
        myInit.method = opt.method ? opt.method : 'GET';
        myInit.credentials = opt.credentials ? opt.credentials : 'omit';
        myInit.cache = opt.cache ? opt.cache : 'default';
        if (opt.headers) {
            myInit.headers = opt.headers;
        }
        if (opt.body) {
            myInit.body = opt.body;
        }
        fetch(opt.url, myInit).then(function (res) {
            if (res.ok) {
                res.text().then(function (data) {
                    opt.success && opt.success(parseJson(data));
                });
            } else {
                opt.error && opt.error(res);
            }
        }).catch(function (err) {
            opt.error && opt.error(err);
        });
    };

    /**
     * Cookie storage
     *
     * @class
     */
    function CookieStorage() {}

    /**
     * Delete exceed cookie storage
     *
     * @param {Object} opt request params
     */
    CookieStorage.prototype.delExceedCookie = function () {
        var domain = window.location.host;
        var cks = document.cookie;
        var cksLen = cks.length;
        var MINSIZE = 3 * 1024;
        var MAXSIZE = 5 * 1024;
        if (cksLen < MAXSIZE) {
            return;
        }
        var items = cks.split(';');
        for (var i = 0; i < items.length; i++) {
            var item = items[i].split('=');
            if (item && item.length > 1) {
                cksLen -= items[i].length;
                var exp = new Date();
                exp.setTime(exp.getTime() - 1000);
                this._set({
                    key: item[0],
                    value: item[1],
                    expires: exp,
                    domain: host
                });
                if (this._get(item[0]) && window !== top) {
                    this._set({
                        key: item[0],
                        value: item[1],
                        expires: exp,
                        domain: host.split('.').slice(-2).join('.')
                    });
                }
            }
            if (cksLen <= MINSIZE) {
                break;
            }
        }
    };

    /**
     * Get cookie
     *
     * @param {string} name cookie name
     * @return {string} cookie value
     */
    CookieStorage.prototype._get = function (name) {
        var cks = document.cookie;
        var cookies = cks ? cks.split('; ') : [];
        for (var i = 0; i < cookies.length; i++) {
            var items = cks.split('=');
            if (items[0] === name) {
                return items[1];
            }
        }
    };

    /**
     * Set cookie
     *
     * @param {Object} options cookie option
     */
    CookieStorage.prototype._set = function (options) {
        document.cookie = [
            options.key, '=', options.value,
            '; expires=' + options.expires.toUTCString(),
            '; path=/',
            '; domain=' + options.domain
        ].join('');
    };

    return customStorage;
});
