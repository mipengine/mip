/**
 * @file: comments.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 14:34:59
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:02:33
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');
    var mediator = require('./mediator');
    var util = require('./util');
    var tplData = require('./tpl-data');

    var $win = $(window);
    var curPage = 0;
    var appraise = 0;
    var finished = false;
    var loading = false;
    var isCommentPage = false;

    var inited = false;

    var $tabComments;
    var $list;


    var courseInfo;
    var courseId;
    var sid;

    function renderComments(html, refresh) {
        if (refresh) {
            $tabComments.html(html);
            $list = $tabComments.find('.comment');
            finished = !$list.length;
        }
        else {
            $list.append(html);
        }
    }
    function loadComments(pn, refresh) {

        var url = util.domain + '/wap/mip/course/comments';
        var data = {
            pn: pn,
            courseId: courseId,
            sid: sid
        };

        if (appraise > 0) {
            data.appraise = appraise;
        }

        loading = true;
        $.ajax({
            url: url,
            data: data,
            dataType: 'jsonp',
            success: function (data, status, xhr) {
                data = data || {};
                var html = $.trim(data.html || '');
                if (html) {
                    renderComments(html, refresh);
                }
                else {
                    finished = true;
                }
                loading = false;

                curPage = pn;
            },
            complete: function () {
                loading = false;
                // console.log('comments jsonp complete');
            }
        });
    }

    function init() {

        courseInfo = tplData.get('courseInfo');
        courseId = courseInfo.courseid;
        sid = courseInfo.sid;

        $tabComments = $('#comments_box');

        mediator.on('tab-switched', function (e, index) {
            if (index === 2) {
                isCommentPage = true;
                if (!inited) {
                    loadComments(1, true);
                }
            }
            else {
                isCommentPage = false;
            }
        });

        mediator.on('window-scroll', function (e, oriEvt) {

            if (finished || loading || !isCommentPage) {
                return;
            }

            var pageBottom = $win.height() + $win.scrollTop();
            var containerBottom = $tabComments.offset().top + $tabComments.height();

            if (containerBottom - pageBottom <= 10) {
                loadComments(curPage + 1);
            }
        });



        $tabComments.on('click', '.comment-complete > a', function () {

            appraise = parseInt($(this).attr('appraise'), 10);

            loadComments(1, true);
        });
    }
    return init;
});
