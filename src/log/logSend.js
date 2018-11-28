/**
 * @file logSend.js
 * @description 数据上报处理
 * @author schoeu
 */

define(function (require) {
    'use strict';

    var firstScreenLabel = require('./firstScreenLabel');
    var viewer = require('../viewer');
    var OUTER_MESSAGE_PERFORMANCE_ANALYSIS_LOG = 'performance-analysis-log';

    function MipLog() {
        this.data = {};
    }

    // 数据上报逻辑
    MipLog.prototype.sendLog = function (type, msg) {
        if (!type) {
            return;
        }
        msg = msg || {};
        msg.type = type;
        this.data.event = 'log';
        this.data.data = msg || {};

        if (window !== window.top) {
            window.parent.postMessage(this.data, '*');
        }
    };

    /**
     * send first screen label log
     */
    MipLog.prototype.sendFirstScreenLabelLog = function () {
        var info = firstScreenLabel.getFirstScreenLabelInfo();
        viewer.sendMessage(OUTER_MESSAGE_PERFORMANCE_ANALYSIS_LOG, {
            type: 'fslabel',
            info: info
        });
    }

    return new MipLog();
});
