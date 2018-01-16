/**
 * @file Hash Function. Support hash get function
 * @author Jenny_L
 * @modify wupeng10@baidu.com 2017-08-01
 *  1. If the hash has only a key, it is not processed;
 *  2. Solve the problem of anchor location
 */
define(function (require) {
    'use strict';

    var rect = require('./dom/rect');

    /**
     * Hash class
     *
     * @class
     */
    function Hash() {
        // init sessionStorage status
        this.ssEnabled = ssEnabled();
        this.pageId = window.location.href.split('#').shift();
        var hash = window.location.hash;
        if (this.ssEnabled) {
            var ssHash = window.sessionStorage.getItem(this.pageId) || '';
            // add the window.location.hash
            hash = ssHash + hash;
        }
        this.hashTree = this._getHashObj(hash);
        // if hash is exist, try storage the value into sessionStroage
        if (hash) {
            var curHash = this._getHashValue();
            if (this.ssEnabled) {
                window.sessionStorage.setItem(this.pageId, curHash);
            }
            window.location.hash = curHash;
        }
        this.bindAnchor();
    }

    /**
     * get hash value of specific key
     *
     * @param  {string} key key
     * @return {value}     [description]
     */
    Hash.prototype.get = function (key) {
        var hv = this.hashTree[key];
        return hv && hv.value ? hv.value : '';
    };

    /**
     * If there has anchor, Scroll to it
     *
     */
    Hash.prototype.bindAnchor = function () {
        var anchor = this.hashTree.mipanchor;
        if (anchor && anchor.value) {
            if (document.readyState !== 'loading') {
                this.scrollToAnchor(anchor);
            }
            else {
                var handle = this.scrollToAnchor.bind(null, anchor);
                document.addEventListener('DOMContentLoaded', handle, false);
            }
        }
    };

    /**
     * Scroll to anchor
     *
     * @param {Object} anchor anchor object
     */
    Hash.prototype.scrollToAnchor = function (anchor) {
        var ele = document.getElementById(anchor.value);
        if (ele) {
            var rt = rect.getElementOffset(ele);
            ele && rt.top && rect.setScrollTop(rt.top);
        }
    };

    /**
     * refresh hash object
     */
    Hash.prototype.refreshHashTree = function () {
        var originalHash = window.location.hash;
        this.hashTree = this._getHashObj(originalHash);
    };

    /**
     * get hash object from hash
     *
     * @param  {string} originalHash originalHash
     * @return {Object} object of each hash
     */
    Hash.prototype._getHashObj = function (originalHash) {
        var hashObj = {};
        if (!originalHash) {
            return hashObj;
        }
        var hashString = originalHash.slice(originalHash.indexOf('#') + 1);
        var hashs = hashString.split('&');
        for (var key in hashs) {
            if (hashs.hasOwnProperty(key)) {
                var item = hashs[key];
                var hk = item;
                var hv = '';
                var idx = item.indexOf('=');
                // key invalid
                if (idx === 0) {
                    continue;
                }
                // key valid
                if (idx !== -1) {
                    hk = item.substring(0, idx);
                    hv = item.slice(idx + 1);
                }
                hashObj[hk] = {
                    value: hv,
                    sep: idx !== -1 ? '=' : ''
                };
            }
        }
        return hashObj;
    };

    /**
     * get hash value from hash tree
     *
     * @return {string} hash
     */
    Hash.prototype._getHashValue = function () {
        var hash = [];
        var hashTree = this.hashTree;
        for (var key in hashTree) {
            if (hashTree.hasOwnProperty(key)) {
                var val = hashTree[key].value;
                var sep = hashTree[key].sep;
                val = key + sep + val;
                hash.push(val);
            }
        }
        return hash.join('&');
    };

    /**
     * test ss is available
     *
     * @return {boolean} whether enabled or not
     */
    function ssEnabled() {
        var support = false;
        try {
            window.sessionStorage.setItem('_t', 1);
            window.sessionStorage.removeItem('_t');
            support = true;
        }
        catch (e) {
        }
        return support;
    }

    return new Hash();
});
