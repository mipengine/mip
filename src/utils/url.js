/**
 *  util for url
 **/
define(function () {
    'use strict';
    var decode = function (str) {
        try {
            return decodeURIComponent(str);
        } catch(e) {
            return str;
        }
    };
    var parseQuery = function (str) {
        var ret = {};
        if (typeof str !== 'string') {
            return ret;
        }
        str = str.trim();
        if (str === '') {
            return ret;
        }
        if (str.search('?') === 0) {
            str = str.slice(1);
        }
        
        var params = str.split('&');
        for (var i = 0; i < params.length; i++) {
            var param = params[i].split('=');
            if (!params.length) {
                continue;
            }
            var key = param[0];
            
        }
    };
});
