/**
 * @file: share.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 16:33:04
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-10 16:47:41
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');

    var $doc = $(document);
    var $shareWrap;
    var $box;
    var isShow = false;


    var noScroll = function (e) {
        e.preventDefault();
    };

    var hideBox = function () {

        var height = $box.height();
        $box.height(height);
        $box.addClass('anim-slide');

        $box.height(0);
        isShow = false;
    };

    function init() {

        $shareWrap = $('#share-layout-container');
        $box = $shareWrap.find('.g-share');


        $('#share').on('click', function (e) {
            $doc.on('touchmove', noScroll);

            $box.addClass('v-hide');
            $shareWrap.show();
            $box.show();
            var height = $box.height();

            $box.height(0);
            $box.removeClass('v-hide');
            $box.addClass('anim-slide');

            $box.height(height);
            isShow = true;
        });
        $shareWrap.on('click', '.c-share-btn', function (e) {
            $doc.off('touchmove', noScroll);

            if ($(this).html()) {
                hideBox();
            }
        });

        $box.on($.fx.transitionEnd, function (e) {
            $box.removeClass('anim-slide');

            if (!isShow) {
                $shareWrap.hide();
            }
            $box.css('height', '');
        });

        $shareWrap.on('click', function (e) {
            var tar = e.target;
            var c = $(tar).attr('data-close');

            if (c === '1') {
                hideBox();
            }
        });
    }
    return init;
});
