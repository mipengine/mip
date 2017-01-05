/**
 * @file Storage Function. Support publiser management and localstorage
 * @author wupeng10@baidu.com
 */
define(function (require) {
    'use strict';

    var fn = require('./fn');

    /**
     * Type of storage
     *
     * @type {object}
     * @public
     */
    var storageType = {
        ASYNCSTORAGE: 0,
        LOCALSTORAGE: 1
    };

    /**
     * When no support local storage, store data temporary
     *
     * @type {object}
     * @public
     */
    var lsCache = {};

    /**
     * Url regex
     *
     * @type {RegExp}
     * @public
     */
    var urlReg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/g;

    /**
     * Domain of website
     *
     * @type {object}
     * @public
     */
    var HOST = window.location.toString().match(urlReg)[1];

    /**
     * Current domain storage size, max is 4k
     *
     * @type {object}
     * @public
     */
    var STORAGESIZE = 4 * 1024;

    /**
     * Storage exceed
     *
     * @type {string}
     * @public
     */
    var EXCEEDTEXT = 'storage space need less than 4k';

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
     * Get local storage
     *
     * @return {Object} value of local storage
     */
    function getLocalStorage() {
        var ls;
        if (supportLs()) {
            ls = localStorage.getItem(HOST);
        } else {
            ls = lsCache[HOST];
        }
        ls = ls ? JSON.parse(ls) : {};
        updateTime(ls);
        return ls;
    }

    /**
     * Delete local storage
     *
     * @param {string} key the key of local storage
     */
    function rmLocalStorage(key) {
        if (!key) {
            key = HOST;
        }
        if (supportLs()) {
            localStorage.removeItem(key);
        } else {
            fn.del(lsCache, key);
        }
    }

    /**
     * Whether support Local Storage
     *
     * @return {boolean} Whether support ls
     */
    function supportLs() {
        var support = false;
        if (window.localStorage && window.localStorage.setItem) {
            support = true;
        }
        return support;
    }

    /**
     * Storage Class
     *
     * @param {number} type type of storage
     * @class
     */
    function Storage(type) {
        switch (type) {
            case storageType.ASYNCSTORAGE:
                var mipAccess = document.querySelector('script[mip-access-config]');
                var storageback = JSON.parse(mipAccess.textContent).storageback;
                this.storage = new AsyncStorage(storageback);
                break;
            case storageType.LOCALSTORAGE:
                this.storage = new LocalStorage();
                break;
        }
        return this.storage;
    }

    /**
     * Local Storage class
     *
     * @class
     */
    function LocalStorage() {
    }

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

        var ls = getLocalStorage();
        ls[name] = value;
        expire = parseInt(expire, 10);
        if (!isNaN(expire) && expire > 0) {
            ls.e = new Date().getTime() + expire * 1000;
        } else {
            fn.del(ls, 'e');
        }
        ls = JSON.stringify(ls);
        if (ls.length > STORAGESIZE) {
            callback && callback(EXCEEDTEXT);
            throw EXCEEDTEXT;
        }
        this._setLocalStorage(HOST, ls, expire, callback);
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
        if (supportLs()) {
            try {
                localStorage.setItem(key, value);
            } catch (e) {
                if (this._isExceed(e)) {
                    this._exceedHandler(key, value, expire);
                }
            }
        } else {
            var size = 0;
            for (var k in lsCache) {
                if (lsCache[k]) {
                    size += lsCache[k].length / 1024.0 / 1024.0;
                }
            }
            if (size > 5.0) {
                var mess = 'Uncaught DOMException: Failed to execute setItem on Storage: Setting the value of '
                + key + 'exceeded the quota at ' + window.location.href;
                callback && callback(mess);
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
        var ls = getLocalStorage();
        if (ls && ls[name]) {
            result = ls[name];
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

        var ls = getLocalStorage();
        if (ls && ls[name]) {
            fn.del(ls, name);
            this._setLocalStorage(HOST, JSON.stringify(ls));
        }
    };

    /**
     * Clear current site local storage
     *
     */
    LocalStorage.prototype.clear = function () {
        rmLocalStorage();
    };

    /**
     * Delete all expire storage, scope is all sites
     *
     * @return {boolean} whether storage has expired
     */
    LocalStorage.prototype.rmExpires = function () {
        var ls = localStorage;
        var hasExpires = false;
        for (var k in ls) {
            if (ls[k]) {
                var expire = parseInt(JSON.parse(ls[k]).e, 10);
                if (expire && new Date().getTime() >= expire) {
                    hasExpires = true;
                    rmLocalStorage(k);
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
        if (e) {
            if (e.code) {
                switch (e.code) {
                    case 22: {
                        quotaExceeded = true;
                        break;
                    }
                    case 1014: { // Firefox
                        if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                            quotaExceeded = true;
                        }
                        break;
                    }
                }
            } else if (e.number === -2147024882) { // Internet Explorer 8
                quotaExceeded = true;
            }
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
                    var item = JSON.parse(ls[k]).u;
                    if (!key || parseInt(item, 10) < minTimeStamp) {
                        key = k;
                        minTimeStamp = item ? parseInt(item, 10) : 0;
                    }
                }
            }
            rmLocalStorage(key);
        }
        this.set(name, value, expire);
    };

    /**
     * Publisher manage storage, via request
     *
     * @param {string} storageback it's a url for manage storage
     * @class
     */
    function AsyncStorage(storageback) {
        this.eventQueue = {};
        this.eventId = 0;
        this.storageback = storageback;
    }

    /**
     * Get event callback id
     *
     * @return {string} id event id
     */
    AsyncStorage.prototype._getEventId = function () {
        var time = new Date().getTime();
        return time.toString().concat(this.eventId++);
    };

    /**
     * Send request to server with params
     *
     * @param {Object} params request params
     * @param {Object} headers http headers
     * @param {Function} callback request callback
     */
    AsyncStorage.prototype.request = function (params, headers, callback) {
        var eventId = this._getEventId();
        if (callback) {
            this.eventQueue[eventId] = callback;
        }
        params = params ? params : {};
        params.eventId = eventId;
        headers = headers ? headers : {};

        fetch(this.storageback, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        }).then(function (res) {
            return res.text();
        }).then(function (text) {
            var id = JSON.parse(text).eventId;
            if (this.eventQueue[id]) {
                this.eventQueue[id]();
                fn.del(this.eventQueue, id);
            }
        }.bind(this));
    };

    return Storage;
});
