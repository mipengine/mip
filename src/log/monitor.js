/**
 * @file monitor.js
 * @description 监控数据监控处理
 * @author schoeu
 */

define(function (require) {
    'use strict';
    var ls = require('./logSend');
    var tags = require('./coreTags');
    var rate = 0.1;

    if (!Array.isArray(tags)) {
        tags = [];
    }

    tags = tags.filter(function (it) {
        it = it || '';
        return !!it.trim();
    });

    /**
     * MIP错误捕获处理
     * @param {Object} e 错误事件对象
     */
    function errorHandle(e) {
        e = e || {};
        // 报错文件请求路径, 跨域js文件中错误无信息暂不上报
        var filename = e.filename || '';
        if (!filename) {
            return;
        }

        // 错误信息
        var message = e.message || '';
        // 错误行号
        var lineno = e.lineno || '';
        // 错误列号
        var colno = e.colno || 0;

        // 非百度cnd域名忽略
        if (!/(c\.mipcdn|mipcache\.bdstatic)\.com\/static\/v1/.test(filename)) {
            return;
        }

        var tagInfo = /\/(mip-.+)\//g.exec(filename) || [];
        var tagName = tagInfo[1] || '';

        var sampling = Math.random() <= rate;

        // 只记录官方组件错误
        if (tags.indexOf(tagName) > -1 && sampling) {
            // 数据处理
            var logData = {
                file: filename,
                msg: message,
                ln: lineno,
                col: colno || (window.event && window.event.errorCharacter) || 0,
                href: window.location.href
            };
            setTimeout(function () {
                ls.sendLog('mip-stability', logData);
            }, 0);
            // 其他善后处理
        }
    }

    window.removeEventListener('error', errorHandle);
    window.addEventListener('error', errorHandle);

});
