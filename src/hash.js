define(function (require) {
    'use strict';
    var hashObj = {};
    var hashRaw = window.location.hash;
    if (hashRaw) {
        var hashArr = hashRaw.slice(1).split('&');
        for (var i = 0; i < hashArr.length; i++) {
            // 特殊情况：=0，a=, a==, &&, key重复
            var hashStr = hashArr[i].split('=');
            var hash = {
                len: hashStr.length,
                key: hashStr[0],
                val: hashStr[1] || ''
            };
            if (hash.len === 2 && hash.key) {
                // except special case: a==, &&, =a
                if (hash.key in hashObj) {
                    // special case: key already exists. Overwrite
                    // if in development, add console.warn to see overlaped key
                }
                hashObj[hash.key] = hash.val;
            }
            else {
            	// special case: a==, &&, =a
                // if in development, add console.warn to see illegal key and value
            }
        }
    }
    return hashObj;
});
