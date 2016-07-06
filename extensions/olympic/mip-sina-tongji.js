/**
 * @file 新浪统计
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {

    var customElem = require('/buildins/customElement');

    // suda config
    window.sudaLogConfig = {
        uId: '',
        url: '',
        prevPageClickTime: ''
    };

    // SUDA地图统计
    window.sudaMapConfig = {
        uId: '', // 用户uid，如果用户没登陆，可以为空
        pageId: '' // 必填
    };

    function elemKeysToObj(elem, keys, obj) {
        var $elem = $(elem);
        $.each(keys, function (i, key) {
            obj[key] = $(elem).attr(key) || '';
        });
    }

    customElem.prototype.init = function() {
        this.build = build;
    };

    var SINA_TONGJI_ROOT = 'https://mjss.sinaimg.cn/wap/public/suda/201604140930/';

    function build() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        elemKeysToObj(this, ['uId', 'url', 'prevPageClickTime'], window.sudaLogConfig);
        $.getScript(SINA_TONGJI_ROOT + 'suda_log.min.js');


        elemKeysToObj(this, ['uId', 'pageId'], window.sudaMapConfig);
        $.getScript(SINA_TONGJI_ROOT + 'suda_map.min.js');

    }

    return customElem;

});

