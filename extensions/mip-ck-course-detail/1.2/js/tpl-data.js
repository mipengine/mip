/**
 * @file: tpl-data.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 13:25:00
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-17 13:00:41
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');

    var tplData = {};
    var fixFnMap = {
        courseInfo: function (data) {

            data.courseid = +data.courseid;
            data.sid = +data.sid;
            data.cid = +data.cid;
            data.userid = +data.uid || 0;
            data.uid = +data.uid || 0;
            data.cost = +data.cost || 0;
            data.type = +data.type;
            data.ucid = +data.ucid;

            return data;
        },
        courseAppDownloadInfo: function (data) {
            data.isInCoursePage = !!data.isInCoursePage;
            return data;
        },
        playerInfo: function (data) {

            data.hasVideo = !!data.hasVideo;
            data.boundTips = !!data.boundTips;

            var hlsList = data.vodSource;
            if (hlsList) {
                try {
                    var fn = new Function('return [' + hlsList + '];');
                    hlsList = fn();
                }
                catch (ex) {
                    hlsList = [];
                }
            }
            else {
                hlsList = [];
            }
            data.vodSource = hlsList;

            return data;
        }
    };

    $('script.tpl-json-data').each(function (i, script) {
        var $s = $(script);
        var dataStr = $s.text();
        var dataKey = $s.attr('data-key');

        var data;

        try {
            data = $.parseJSON(dataStr);
        }
        catch (ex) {
            data = {};
        }

        if (fixFnMap[dataKey]) {
            data = fixFnMap[dataKey](data);
        }

        tplData[dataKey] = data;
    });

    return {
        get: function (key) {
            return tplData[key];
        },
        set: function (key, val) {
            tplData[key] = val;
        }
    };
});
