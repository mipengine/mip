/**
 * share
 *
 * fork from:  yaohao_share
 */


define(function () {

    function getUrl (name) {
        return '//m.baidu.com/se'
    }

    var isBaidubox = (navigator.userAgent.indexOf('baiduboxapp') > -1) ? true : false;
    var isBaidubox =true;
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
            Box.ios.invokeApp('callShare', {
                options: encodeURIComponent(JSON.stringify(cfg)),
                errorcallback: 'onFail',
                successcallback: 'onSuccess'
            });
        }
    }

    var qzone = {
        icon: getUrl('/static/aladdin/yaohao_share/qzone.png'),
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
        icon: getUrl('/static/aladdin/yaohao_share/sinaweibo.png'),
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
        icon: getUrl('/static/aladdin/yaohao_share/pyq.png'),
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
        icon: getUrl('/static/aladdin/yaohao_share/weixin.png'),
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
        icon: getUrl('/static/aladdin/yaohao_share/copy.png'),
        title: '微信好友',
        cb: function (opt) {
            opt.mediaType = 'copylink';
            opt.pannel = 'copylink';
            var cfg = opt;
            nativeShare(cfg, false);
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

        list = list.concat(this.opt.custom);
        this.list = list;

        var str = '',
            num = list.length,
            obj;

        str += '<div class="waui-yaohao-share-list" style="width: 100%; margin: 0 auto;">';
        for (var i = 0; i < num; i++) {
            obj = list[i];
            str += '<span class="waui-yaohao-share-btn" style="display:inline-block;margin-right:.14rem;text-align: center;">';
            if (obj) {
                str += '<div class="c-img c-img-s  c-gap-top-small c-gap-bottom-small" style="width: 51px; height: 51px; padding-bottom: 0;background:#fff;">';
                str += '    <img src="' + obj.icon + '" />';
                str += '</div>';
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
            $('.waui-yaohao-share-btn').off();
            $('.waui-yaohao-share-btn').each(function (i) {
                me = $(this);

                if (_this.list[i]) {
                    me.on('click', function () {
                        if (isBaidubox) {
                            _this.logfn(_this.list[i], 1);
                        }
                        _this.list[i].cb(_this.opt);
                    });
                    // 非手百，统计绑定到touchend上
                    if (!isBaidubox) {
                        me.on('touchend', function () {
                            _this.logfn(_this.list[i], 0);
                        });
                    }
                }
            });
        }
    };

    return Share;
});
