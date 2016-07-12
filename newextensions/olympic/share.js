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
 */


define(function () {

    var Clipboard = require('./clipboard');

    var isBaiduHost = /badiu.com$/.test(location.host);
    var isBaidubox = /baiduboxapp/.test(navigator.userAgent) && isBaiduHost;

    var defaultOpt = {
        url: window.location.href,
        title: '百度搜索有惊喜',
        content: '百度搜索有惊喜',
        iconUrl: 'http://m.baidu.com/static/ala/share/bdu.jpg',
        imageUrl: '',
        qzoneCfg: {},
        sinaweiboCfg: {},
        pyqCfg: {},
        wxfriendCfg: {},
        custom: []
    };

    if (isBaidubox) {
        require(['searchbox/openjs/aio']);
    }

    var onSuccess = function(){
    }

    var onFail = function(){
    }

    var nativeShare = function (cfg, encode) {

        if (encode) {
            cfg.url = encodeURIComponent(cfg.url);
            cfg.linkUrl = encodeURIComponent(cfg.url);
        }
        if (Box.os.android) {
            Box.android.invokeApp('Bdbox_android_utils', 'callShare', [JSON.stringify(cfg), window.successFnName || 'console.log', window.errorFnName || 'console.log']);
        }
        else {
            console.log(cfg);

            Box.ios.invokeApp('callShare', {
                options: encodeURIComponent(JSON.stringify(cfg)),
                errorcallback: 'onFail',
                successcallback: 'onSuccess'
            });
        }
    }

    var qzone = {
        type: 'qzone',
        title: 'QQ空间',
        cb: (function () {
            var fn;
            if (isBaidubox) {
                fn = function (opt) {
                    opt.mediaType = 'qqdenglu';
                    var cfg = opt;
                    if (opt.qzoneCfg && !$.isEmptyObject(opt.qzoneCfg)) {
                        cfg = $.extend({}, opt, opt.qzoneCfg);
                    }
                    nativeShare(cfg, false);
                };
            }
            else {
                fn = function (opt) {
                    var qzoneurl = 'http://qzs.qzone.qq.com/open/connect/widget/mobile/qzshare/index.html?page=qzshare.html&loginpage=loginindex.html&logintype=qzone&site=百度&appName=百度&';
                  //  var qzoneurl = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?';

                    window.open(qzoneurl + 'url=' + encodeURIComponent(opt.url)+'&title=' + encodeURIComponent(opt.title)+'&summary='+encodeURIComponent(opt.content));
                };
            }
            return fn;
        })()
    };

    var sinaweibo = {
        type: 'sinaweibo',
        title: '新浪微博',
        cb: (function () {
            var fn;
            if (isBaidubox) {
                fn = function (opt) {
                    opt.mediaType = 'sinaweibo';
                    var cfg = opt;
                    if (opt.sinaweiboCfg && !$.isEmptyObject(opt.sinaweiboCfg)) {
                        cfg = $.extend({}, opt, opt.sinaweiboCfg);
                    }
                    nativeShare(cfg, false);
                };
            }
            else {
                fn = function (opt) {
                    if (opt.sinaweibourl) {
                        window.open(opt.sinaweibourl);
                    } else {
                        window.open('http://v.t.sina.com.cn/share/share.php?url=' + encodeURIComponent(opt.url) + '&title=' + encodeURIComponent(opt.title)+'&pic='+encodeURIComponent(opt.imageUrl));
                    }
                };
            }
            return fn;
        })()
    };

    var pyq = {
        type: 'pyq',
        title: '朋友圈',
        cb: function (opt) {
            opt.mediaType = 'weixin_timeline';
            var cfg = opt;
            if (opt.pyqCfg && !$.isEmptyObject(opt.pyqCfg)) {
                cfg = $.extend({}, opt, opt.pyqCfg);
            }
            nativeShare(cfg, false);
        }
    };

    var wxfriend = {
        type: 'wxfriend',
        title: '微信好友',
        cb: function (opt) {
            opt.mediaType = 'weixin_friend';
            var cfg = opt;
            if (opt.wxfriendCfg && !$.isEmptyObject(opt.wxfriendCfg)) {
                cfg = $.extend({}, opt, opt.wxfriendCfg);
            }
            nativeShare(cfg, false);
        }
    };


    var copylink = {
        type: 'copylink',
        title: '复制链接',
        cb: function () {
            alert('复制成功');
        }
    };

    var Share = function (opt, container, logfn) {
        this.container = container;
        this.logfn = logfn || function() {};

        this.opt = $.extend({}, defaultOpt, opt);
        if (!this.opt.content) {
            this.opt.content = this.opt.title;
        }
        var reg = /^\/\/.+/;
        if (reg.test(this.opt.url)) {
            this.opt.url = 'http:' + this.opt.url;
        }
        this.opt.linkUrl = this.opt.url;
        var list = [];
        if (isBaidubox) {
            list.push(wxfriend);
            list.push(pyq);
        }
        list.push(qzone);
        list.push(sinaweibo);
        list.push(copylink);

        list = list.concat(this.opt.custom);

        // 小屏幕就少一个吧
        if (window.innerWidth < 400 && list.length > 4) {
            list.splice(4, 10);
        }

        this.list = list;

        var str = '',
            num = list.length,
            obj;

        str += '<div class="mip-share-list">';

        for (var i = 0; i < num; i++) {
            obj = list[i];
            str += '<span class="mip-share-btn">';
            if (obj) {
                str += '<div class="mip-share-icon mip-share-icon-' + obj.type + '"></div>';
                str += '<div class="c-line-clamp1 c-gray">' + obj.title + '</div>';
            }
            str += '</span>';
        }
        str += '</div>';

        this.domHtml = str;

        this._init();
    };

    Share.prototype = {
        constructor: Share,

        _init: function () {
            this.container.html(this.domHtml);
            this.share();
        },
        share: function (cb) {

            var _this = this;

            var me = null;

            var hasCopy;

            $('.mip-share-btn', this.container).off();
            $('.mip-share-btn', this.container).each(function (i) {
                me = $(this);

                var handler = _this.list[i];

                if (handler) {

                    // 初始化复制
                    if (handler.type == 'copylink') {

                        new Clipboard(
                            {
                                el: me,
                                text: _this.opt.linkUrl,
                                success: function () {
                                    handler.cb(_this.opt);
                                    _this.logfn(handler, isBaidubox ? 0 : 1)
                                },
                                error: function () {
                                    alert('复制失败');
                                }
                            }
                        );

                        return;

                    }

                    me.on('click', function () {
                        if (isBaidubox) {
                            _this.logfn(handler, 1);
                        }
                        handler.cb(_this.opt);
                    });

                    // 非手百，统计绑定到touchend上
                    if (!isBaidubox) {
                        me.on('touchend', function () {
                            _this.logfn(handler[i], 0);
                        });
                    }


                }
            });

        }
    };

    return Share;
});
