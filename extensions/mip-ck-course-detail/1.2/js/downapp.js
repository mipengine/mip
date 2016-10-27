/**
 * @file: downapp.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-17 12:56:43
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:03:11
 */
/* global Vue, _, yog */

'use strict';

define(function (require) {
    var $ = require('zepto');
    var mediator = require('./mediator');
    var tplData = require('./tpl-data');
    var osLib = require('./lib/os');
    var os = osLib.os;
    var browser = osLib.browser;

    var $wrap;
    var courseAppDownloadInfo;

    function init(argument) {
        $wrap = $('#down_float_div');
        courseAppDownloadInfo = tplData.get('courseAppDownloadInfo');

        $wrap.find('.close').click(function () {
            mediator.trigger('toggle-app-download-flag', {
                show: false
            });
            $wrap.hide();
        });


        $wrap.find('.btn-app').on('click', function () {
            if (browser.weixin) {
                window.open(courseAppDownloadInfo.weixinUrl);
            }
            else {
                if (os.android) {
                    window.open(courseAppDownloadInfo.adrUrl);
                }
                else if (os.ipad) {
                    window.open(courseAppDownloadInfo.ipadUrl);
                }
                else if (os.ios) {
                    window.open(courseAppDownloadInfo.iosUrl);
                }
                else {
                    window.open(courseAppDownloadInfo.downloadUrl);
                }
            }
        });

        $wrap.find('.g-btn1').on('click', function () {
            if (browser.weixin) {
                window.location = courseAppDownloadInfo.openUrl;
                return false;
            }
            document.location = courseAppDownloadInfo.openUrlx;
            if (!os.ios) {
                window.setTimeout(function () {
                    window.location = courseAppDownloadInfo.downloadUrl;
                }, 1000);
            }
        });

        mediator.on('toggle-app-download-banner', function (e, isHide) {
            $wrap[isHide ? 'hide' : 'show']();
        });
    }

    return init;
});
