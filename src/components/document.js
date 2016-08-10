/**
 * document 相关功能
 **/
define(function () {
    'use strict';

    // from zepto
    var reg = /complete|loaded|interactive/;
    var doc = {
        isReady: function () {
            return doc.loaded || reg.test(document.readyState) && document.body && (doc.loaded = true);
        } 
    };

    doc.ready = function (callback) {
        if (doc.isReady()) {
            callback();
        } else {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
    };

    return doc;
});
