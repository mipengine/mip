/**
 * @file 新浪统计
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {

    var customElem = require('/buildins/customElement');

    // SUDA地图统计
    window.sudaMapConfig = {
        uId: '', // 用户uid，如果用户没登陆，可以为空
        pageId: '' // 必填
    };

    /**
     * elemKeysToObj
     *
     * @param  {HTMLElement} elem elem
     * @param  {Array} keys keys
     * @param  {Object} obj  obj
     */
    function elemKeysToObj(elem, keys, obj) {
        var $elem = $(elem);
        $.each(keys, function (i, key) {
            obj[key] = $(elem).attr(key) || '';
        });
    }

    customElem.prototype.init = function() {
        this.build = build;
    };

    /**
     * protocol
     *
     * @type {string}
     */
    var protocol = location.protocol;

    /**
     * SINA_TONGJI_ROOT
     *
     * @type {string}
     */
    var SINA_TONGJI_ROOT = ''
        + protocol
        + '//mjs'
        + (protocol === 'https' ? 's' : '')
        + '.sinaimg.cn/wap/public/suda/201607111020/';

    /**
     * getScript promise
     *
     * @param  {string} src 地址
     * @return {promise}     promise
     */
    function getScriptPromise (src) {
        var dfd = $.Deferred();
        $.getScript(src, function () {
            dfd.resolve();
        });
        return dfd;
    }


    function build() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var elem = this;

        $.when(
            getScriptPromise(SINA_TONGJI_ROOT + 'suda_log.min.js'),
            getScriptPromise(SINA_TONGJI_ROOT + 'suda_map.min.js')
        ).then(function () {
            elemKeysToObj(elem, ['uId', 'pageId'], window.sudaMapConfig);

            if (window.suda_init) {
                window.suda_init(window.sudaMapConfig.pageId, 100);
            }

        });

    }

    return customElem;

});

