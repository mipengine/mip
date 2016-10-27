/**
 * @file: details.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-17 16:36:26
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:02:51
 */
/* global Vue, _, yog */

'use strict';

define(function (require) {
    var $ = require('zepto');
    var util = require('./util');
    var mediator = require('./mediator');
    var tplData = require('./tpl-data');

    var isLoaded = false;

    function loadDetails() {

        var courseInfo = tplData.get('courseInfo');
        var courseId = courseInfo.courseid;
        var sid = courseInfo.sid;

        var url = util.domain + '/wap/mip/course/details';

        $.ajax({
            url: url,
            data: {
                courseId: courseId,
                sid: sid
            },
            dataType: 'jsonp',
            success: function (data, status, xhr) {
                isLoaded = true;
                data = data || {};
                var html = data.html || '';
                if (html) {
                    $('#details_box').append(html);
                }
            }
        });
    }

    function init() {

        mediator.on('tab-switched', function (e, index) {
            if (index === 1 && !isLoaded) {
                loadDetails();
            }
        });
    }
    return init;
});
