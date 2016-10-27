/**
 * @file: hot.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 14:46:07
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-17 17:05:31
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');
    var util = require('./util');
    var tplData = require('./tpl-data');

    function init() {

        var courseInfo = tplData.get('courseInfo');
        var courseId = courseInfo.courseid;
        var sid = courseInfo.sid;

        var url = util.domain + '/wap/mip/course/hot';

        $.ajax({
            url: url,
            data: {
                courseId: courseId,
                sid: sid
            },
            dataType: 'jsonp',
            success: function (data, status, xhr) {
                data = data || {};
                var html = data.html || '';
                if (html) {
                    $('#dir_box').append(html);
                }
            }
        });
    }
    return init;
});
