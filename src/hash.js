/**
 * @file Hash Function. Support hash get function
 * @author Jenny_L
 */
define(function (require) {
    'use strict';

    /**
     * Hash class
     *
     * @class
     */
    function Hash() {
    }

    /**
     * get window hash
     * @return {string} window hash
     */
    Hash.prototype._getHashRaw = function () {
    	return window.location.hash;
    };

    /**
     * get hash object from hash
     *
     * @return {Object} object of each hash
     */
    Hash.prototype._getHashObj = function () {
        var hashObj = {};
        var hashRaw = this._getHashRaw();
        if (hashRaw) {
            var hashArr = hashRaw.slice(1).split('&');
            for (var i = 0; i < hashArr.length; i++) {
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
                    hashObj[key] = val;
                }
            }
        }
        return hashObj;
    };

    /**
     * get hash value of specific key
     *
     * @param  {string} key key
     * @return {value}     [description]
     */
    Hash.prototype.getHash = function (key) {
    	var hashObj = this._getHashObj();
        return hashObj ? hashObj[key] || '' : '';
    };

    return new Hash();
});
