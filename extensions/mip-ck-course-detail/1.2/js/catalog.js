/**
 * @file: catalog.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 16:48:40
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:02:11
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');
    var util = require('./util');
    var mediator = require('./mediator');
    var tplData = require('./tpl-data');

    var $win = $(window);
    var $box;
    var $list;
    var $wrap;
    var $unfold;

    var courseInfo;
    var courseId;
    var sid;
    var type;

    function getVideoUrl(cid, $li) {

        var url = util.domain + '/wap/mip/course/catalog';

        $.ajax({
            url: url,
            data: {
                courseId: courseId,
                sid: sid,
                cid: cid
            },
            dataType: 'jsonp',
            success: function (data, status, xhr) {

                data = data || {};
                var code = parseInt(data.code, 10) || 0;
                if (code > 0) {
                    $list.find('.d-list-directory .cur').removeClass('cur');
                    $li.addClass('cur');

                    mediator.trigger('change-video-src', {
                        data: data.data
                    });
                    $win.scrollTop(0);
                    toggleTrialNext();
                }
                else {
                    alert(data.data || '获取播放信息失败，请重试！');
                }
            }
        });
    }
    function fixHeight() {

        var boxHeight = $box.height();
        var listHeight = $list.height();

        if (listHeight > boxHeight) {
            $unfold
                .show()
                .on('click', function (e) {
                    $box.animate({height: listHeight}, function () {
                        $unfold.hide();
                    });
                });
        }
        else {
            $box.height(listHeight);
        }
    }

    function isLastVideo() {
        var $cur = $list.find('.cur');
        var $all = $list.find('.video_list');
        var isLast = $cur.get(0) === $all.last().get(0);

        return isLast;
    }

    function toggleTrialNext() {
        if (type === 2) {
            var isLast = isLastVideo();
            $('#trial-next')[isLast ? 'hide' : 'show']();
        }
    }


    function toggleEndPop() {
        var isLast = isLastVideo();

        if (type === 1) {
            $('#play-end')[isLast ? 'hide' : 'show']();
        }
    }

    function init() {


        $box = $('#list_box');
        $list = $box.find('.details-list');
        $wrap = $box.parent();
        $unfold = $wrap.find('.ico-unfold');

        courseInfo = tplData.get('courseInfo');
        courseId = courseInfo.courseid;
        sid = courseInfo.sid;
        type = courseInfo.type;

        fixHeight();


        mediator.on('toggle-end-pop', function (e) {
            toggleEndPop();
        });

        mediator.on('trial-next', function (e) {

            var $cur = $list.find('.cur');
            var $all = $list.find('.video_list');

            var index = $all.indexOf($cur[0]);
            var $next = $all.eq(index + 1);

            if ($next.length) {
                $next.find('.preview').trigger('click');
            }
        });

        toggleTrialNext();


        $list.on('click', '.video_list .preview', function (e) {
            e.preventDefault();

            var $this = $(this);
            var $li = $this.parent('li');
            var cid = parseInt($li.attr('cid'), 10) || 0;

            if (cid === 0) {
                return;
            }

            getVideoUrl(cid, $li);
        });

    }
    return init;
});
