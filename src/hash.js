define(function (require) {
    'use strict';

    /**
     * Hash class
     *
     * @class
     */
    function Hash() {
        this._hashRaw = window.location.hash;
        this._hashObj = this._getHashObj();
    }

    /**
     * get hash object from hash
     *
     * @return {Object} object of each hash
     */
    Hash.prototype._getHashObj = function () {
        var hashObj = {};
        var hashRaw = this._hashRaw;
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
        return this._hashObj ? this._hashObj[key] || '' : '';
    };

    return new Hash();
});
