/**
 * @file logSend.js
 * @description 数据上报处理
 * @author schoeu
 */

define(function () {
    'use strict';

    function MipLog() {
        this.data = {};
    }

    // 数据上报逻辑
    MipLog.prototype.sendLog = function (type, msg) {
        if (!type) {
            return;
        }
        this.data.event = type;
        this.data.data = msg || {};

        if (window !== window.top) {
            window.parent.postMessage(this.data, '*');
        }
    };
    return new MipLog();
});
