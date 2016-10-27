/**
 * @file: tab.js
 * @author: yanglei07
 * @description 页面tab切换组件部分， 纯业务， 非通用组件
 * @create data:   2016-10-09 17:41:51
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:05:09
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');
    var mediator = require('./mediator');
    var Gesture = require('components/gesture');

    var $win = $(window);
    var $tabControl;
    var $tabControlWrap;
    var $tabControls;
    var $tabContentWrap;
    var $tabContents;
    var currentIndex = 0;
    var tabCount;

    function needFixedTabContainer() {
        var scrollHeight = $win.scrollTop();
        var tabHeight = $tabControlWrap.offset().top;
        return scrollHeight > tabHeight;
    }

    function init() {
        $tabControl = $('#details-tab');
        $tabControlWrap = $tabControl.closest('.detail-tab-controls-wrap');
        $tabControls = $tabControl.find('.tab-control');
        $tabContentWrap = $('.swiper-container');
        $tabContents = $tabContentWrap.find('.swiper-slide');
        tabCount = $tabControls.size();

        // tab切换
        $tabControl.on('click', '.tab-control', function (e) {
            var $tab = $(this);

            var index = $tabControls.index(this);
            var $content = $tabContents.eq(index);

            if (index !== currentIndex) {
                $tabControls.removeClass('cur');
                $tab.addClass('cur');

                $tabContents.removeClass('cur');
                $content.addClass('cur');

                currentIndex = index;

                mediator.trigger('tab-switched', index);
            }
        });

        var gesture = new Gesture($tabContentWrap.get(0));
        gesture.on('swipeleft swiperight', function (e, data) {
            var index = currentIndex;

            if (data.type === 'swiperight') {
                index = Math.max(0, index - 1);
            }
            else {
                index = Math.min(tabCount, index + 1);
            }

            mediator.trigger('tab-switch', index);
        });

        $('#course_comments').on('click', function (e) {
            mediator.trigger('tab-switch', 2);
        });
        $('#course_details').on('click', function (e) {
            mediator.trigger('tab-switch', 1);
        });

        mediator.on('tab-switch', function (e, index) {

            if (index !== currentIndex) {
                $tabControls.eq(index).trigger('click');
            }
        });

        // 滚动固定
        mediator.on('window-scroll', function () {
            var method = 'removeClass';
            if (needFixedTabContainer()) {
                method = 'addClass';
            }
            $tabControl[method]('fixed-details-tab');
        });
    }

    return init;
});
