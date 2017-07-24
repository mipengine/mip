/**
 * @file Hash Function. Support hash get function
 * @author Jenny_L
 * @modify wupeng10@baidu.com 2017-07-06 If the hash has only a key, it is not processed
 */
define(function (require) {
    'use strict';

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

        /**
         * get hash value of specific key
         *
         * @param  {string} key key
         * @return {value}     [description]
         */
        this.get = function (key) {
            return this.hashTree[key] || '';
        };
    }

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
     * @param  {string} originalHash hash
     * @return {Object} object of each hash
     */
    Hash.prototype._getHashObj = function (originalHash) {
        var hashObj = {};
        if (originalHash) {
            var hashVal;
            var tmpList = originalHash.split('#');
            hashVal = tmpList.join('&');
            var hashArr = hashVal.split('&');
            var haLen = hashArr.length;
            for (var i = 0; i < haLen; i++) {
                var curOne = hashArr[i];
                var eqIdx = curOne.indexOf('=');
                var key;
                var val;
                if (eqIdx !== -1) {
                    key = decodeURIComponent(curOne.substring(0, eqIdx)).trim();
                    val = decodeURIComponent(curOne.substring(eqIdx + 1)).trim();
                }
                else {
                    key = decodeURIComponent(curOne).trim();
                    val = '';
                }
                if (key) {
                    // rewrite the Repeat Key
                    hashObj[key] = val;
                }
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
                var val = hashTree[key];
                val = val ? key + '=' + encodeURIComponent(val) : key;
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
        try {
            window.sessionStorage.setItem('_t', 1);
            window.sessionStorage.removeItem('_t');
            return true;
        }
        catch (e) {
            return false;
        }
    }

    return new Hash();
});
