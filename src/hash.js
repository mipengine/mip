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
        /**
         * get hash value of specific key
         *
         * @param  {string} key key
         * @return {value}     [description]
         */
        this.getHash = function (key) {
            var curHashObj = this._getHashObj();
            return curHashObj[key] || '';
        };

    }

    /**
     * get hash object from hash
     *
     * @return {Object} object of each hash
     */
    Hash.prototype._getHashObj = function () {
        var hashObj = {};
        var originalHash = window.location.hash;
        if (originalHash) {
            var hashArr = originalHash.slice(1).split('&');
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
    
    return new Hash();
});