/**
 * @file 分享
 *
 * @description
 * fork from:  yaohao_share by yuanxueran
 *
 * @update
 * 2017-07-02 by menglingjun
 * 着急上，先在别人的东西上改，有空重写
 *
 * @update
 * 2017-07-18 by menglingjun
 * 使用 pmd
 *
 */


define(function () {

    var Clipboard = require('./clipboard');
    var PMDShare = require('./share/share');

    /**
     * 重写 sendLog 方法
     *
     * @param  {string} key key
     */
    PMDShare.prototype._sendLog = function (key) {
        var me = this;

        var appKeyList = {
            pyq:       {'ct': 40, 'cst': 2},
            wxfriend:  {'ct': 40, 'cst': 1},
            qqfriend:  {'ct': 40, 'cst': 5},
            qzone:     {'ct': 40, 'cst': 3},
            sinaweibo: {'ct': 40, 'cst': 4},
            more:      {'ct': 40, 'cst': 9},
            close:     {'ct': 40, 'cst': 0}     // 关闭
        };

        if (key && appKeyList[key]) {
            var obj = appKeyList[key];
            if (me.opt && typeof me.opt.loginfo == 'object') {
                obj = $.extend(obj, me.opt.loginfo);
            }

            // 结果页日志发送接口
            // console && console.log(obj);
        }
    };


    /**
     * 复制链接
     *
     * @type {Object}
     */
    var copylink = {
        key: 'copylink',
        icon: __inline('/extensions/olympic/img/copylink.png'),
        title: '复制链接',
        cb: function () {}
    };

    /**
     * initCopyLink
     *
     * @param  {HTMLElement} container container
     * @param  {Object} opt       options
     */
    function initCopyLink(container, opt) {

        var elem = $(container).find('.c-share-btn-copylink');

        if (!Clipboard.support || !elem.get(0)) {
            return;
        }

        new Clipboard(
            {
                el: elem,
                text: opt.url,
                success: function () {
                    alert('复制成功');
                },
                error: function () {
                    alert('复制失败');
                }
            }
        );
    }

    /**
     * defaultOpt
     *
     * @type {Object}
     */
    var defaultOpt = {
        iconUrl: '//m.baidu.com/se/static/pmd/pmd/share/images/bdu.jpg',
        custom: Clipboard.support ? [copylink] : []
    };


    /**
     * MIP Share CLASS
     *
     * @param {Object} opt       options
     * @param {HTMLElement} container container
     */
    function Share (opt, container) {

        opt = $.extend({}, defaultOpt, opt);

        var share = new PMDShare(opt);

        // render方法可以直接在页面中渲染分享ICON
        // 由于为js渲染会出现抖动,请注意执行时机
        share.render(
            container,
            {
                onRender: function() {
                    // 初始化 分享
                    initCopyLink(container, opt);
                }
            }
        );

        this.share = share;

    }

    return Share;
});
