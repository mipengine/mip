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

        // init sessionStorage status
        this.ssEnabled = ssEnabled();

        this.pageId = createPageUrlId(window.location.href.split('#').shift());

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
            if (!hashVal) {
                return;
            }
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
        var hashTree = this.hashTree;
        var hash = '';
        for (var key in hashTree) {
            var val = hashTree[key];
            hash += '&' + key + '=' + encodeURIComponent(val);
        }
        return hash.slice(1);
    };

    /**
     * test ss is available
     */
    function ssEnabled() {
        try {
            window.sessionStorage.setItem('_t', 1);
            window.sessionStorage.removeItem('_t');
            return true;
        } catch (e) {
            return false;
        }  
    }

    /**
     * create the page id 
     * Use GUID，Globally Unique Identifier  xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
     * @param  {string} url
     * @return {value}  uuid  default:mip
     */
    function createPageUrlId(url) {
        return url;
        var s = [];
        if (!url) {
            return 'mip';
        }
        var hexDigits = encodeURIComponent(url);
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(i, 1);
        }
        // bits 12-15 of the time_hi_and_version field to 0010
        s[14] = "4";
        // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "_";
      
        var uuid = s.join("");
        return uuid;
    }

    return new Hash();
});
