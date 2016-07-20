
/**
 * @file sharebase
 * @author yangfan16
 * @UC & QQ share based on https://github.com/JefferyWang/nativeShare.js
 */

define('dist/dist/dist/dist/dist/dist/dist/dist/extensions/olympic/share/share', ['require', 'olympic/share/detect', 'olympic/share/detect'], function (require) {

    // 加载share公共css
    var $shareStyle = $('<style data-for="pmd/share/share"></style>');
    $shareStyle.text("/* 分享列表容器 */\n.c-share-list {\n    overflow: hidden;\n}\n\n.c-share-list .c-share-btn {\n    color: #333;\n    text-align: center;\n    font-size: 12px;\n}\n\n.c-share-list .c-share-btn .c-img {\n    background: #fff;\n    border: 1px solid #f0f0f0;\n    border-radius: 50%;\n}\n\n\n/* 分享取消按钮,只在popup打开时展现 */\n.c-share-cancel-btn {\n    border-color: #f0f0f0;\n}\n\n\n/* 微信分享提示tips */\n.c-share-wechat-tips {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 999;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.6) url(//m.baidu.com/se/static/pmd/pmd/share/images/wxtips.png) right 32px top 10px/50% no-repeat;\n}\n\n\n/* popup打开时自定义容器背景色,需要提高选择器优先级 */\n.c-popup-wrapper .c-share-popup-modal {\n    background-color: #f0f0f0;\n}\n\n.c-share-popup-modal .c-popup-head {\n    display: none;\n}\n\n.c-share-popup-modal .c-popup-content {\n    margin: 0 auto;\n    padding: 21px;\n}");
    $('head').append($shareStyle);

    var defaultOpt = {
        url: window.location.href,
        title: '百度搜索有惊喜',       // 分享至外站的title,必选
        content: '百度搜索有惊喜',     // 分享至外站的摘要,可选,默认用title替代
        iconUrl: '//m.baidu.com/se/static/pmd/pmd/share/images/bdu.jpg',
        custom: []
    };

    // 加载适配组件并获取当前适配信息
    var detect = require('olympic/share/detect');
    var OS = detect.os;
    var Browser = detect.browser;
    var isZbios = (Browser.n == 'zbios') ? 1 : 0;
    var isUC = (Browser.n == 'uc' && (typeof(ucweb) != 'undefined' || typeof(ucbrowser) != 'undefined')) ? 1 : 0;
    var isQQ = (Browser.n == 'qq' && Browser.v && Browser.v > '5.4') ? 1 : 0;
    var isWechat = (Browser.n == 'wechat') ? 1 : 0;

    // 在qq浏览器5.4版本以上需要加载qq shareapi
    var dtd = $.Deferred();
    if (isQQ) {
        // zepto $.ajax在qq浏览器上无法加载这个api url,永远返回fail,jquery以及直接请求均可以,原因不明,采用原生方法实现异步加载
        // TODO: 查清原因！！！！！！！！！
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                dtd.resolve();
            }
        };
        script.src = '//jsapi.qq.com/get?api=app.share';
        $('head').append(script);
    }

    // 手百分享接口
    var nativeShare = function (cfg, encode) {
        var onSuccess = function(){}
        var onFail = function(){}
        if (encode) {
            cfg.url = encodeURIComponent(cfg.url);
            cfg.linkUrl = encodeURIComponent(cfg.url);
        }
        // 以这种方式require是为了避免过早加载aio组件
        require(['olympic/share/aio'], function() {
            if (Box.os.android) {
                Box.android.invokeApp('Bdbox_android_utils', 'callShare', [JSON.stringify(cfg), window.successFnName || 'console.log', window.errorFnName || 'console.log']);
            } else {
                Box.ios.invokeApp('callShare', {
                    options: encodeURIComponent(JSON.stringify(cfg)),
                    errorcallback: 'onFail',
                    successcallback: 'onSuccess'
                });
            }
        });

    };

    // UC分享接口
    var ucShare = function (to_app, opt) {
        var ucAppList = {
            sinaweibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
            wxfriend: ['kWeixin', 'WechatFriends', 1, '微信好友'],
            pyq: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
            qqfriend: ['kQQ', 'QQ', '4', 'QQ好友'],
            qzone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        var url = opt.url;
        var title = opt.title;
        var from = '';
        var img = '';
        var desc = opt.content;

        to_app = to_app == '' ? '' : (OS.n == 'ios' ? ucAppList[to_app][0] : ucAppList[to_app][1]);

        // 安卓uc qq空间分享特殊逻辑
        // 伪协议失效，目前该伪协议只能打开QQ apk，并不能打开分享页面，uc端调用的sdk方法未知
        // if (to_app == 'QZone') {
        //     B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+img+"&title="+title+"&description="+desc+"&url="+url+"&app_name="+from;
        //     k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
        //         k && k.parentNode && k.parentNode.removeChild(k)
        //     }, 5E3);
        // }

        if (typeof(ucweb) != 'undefined') {
            // 判断ucweb方法是否存在,安卓uc中可以使用
            ucweb.startRequest('shell.page_share', [title, title, url, to_app, '', '@' + from, '']);
        } else if (typeof(ucbrowser) != 'undefined') {
            // 判断ucbrowser方法是否存在,ios uc中可以使用
            ucbrowser.web_share(title, title, url, to_app, '', '@' + from, '');
        }
    };

    // QQ浏览器分享接口
    var qqShare = function (to_app, opt) {
        var qqAppList = {
            sinaweibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
            wxfriend: ['kWeixin', 'WechatFriends', 1, '微信好友'],
            pyq: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
            qqfriend: ['kQQ', 'QQ', '4', 'QQ好友'],
            qzone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        to_app = to_app == '' ? '' : qqAppList[to_app][2];
        var ah = {
            url: opt.url,
            title: opt.title,
            description: opt.content,
            img_url: '',
            img_title: '',
            to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
            cus_txt: "请输入此时此刻想要分享的内容"
        };
        ah = to_app == '' ? '' : ah;

        // qq share api加载完毕后执行
        $.when(dtd).done(function () {
            if (typeof(browser) != "undefined" && typeof(browser.app) != "undefined") {
                browser.app.share(ah);
            }
        });
    };

    // 微信显示分享提示浮层
    var TIME;
    var wechatTips = function () {
        if ($('.c-share-wechat-tips').length) {
            $('.c-share-wechat-tips').show();
        } else {
            $('body').append($('<div class="c-share-wechat-tips"></div>'));
            $('.c-share-wechat-tips').on('click', function () {
                $(this).hide();
                clearTimeout(TIME);
            });
        }

        TIME = setTimeout(function () {
            $('.c-share-wechat-tips').hide();
            clearTimeout(TIME);
        }, 2000);
    };

    // 朋友圈分享按钮配置
    var pyq = {
        key: 'pyq',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/pyq.png',
        title: '朋友圈',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'weixin_timeline';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('pyq', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('pyq', opt);
                };
            } else if (isWechat) {
                fn = function (opt) {
                    wechatTips();
                };
            }
            return fn;
        })()
    };

    // 微信好友分享按钮配置
    var wxfriend = {
        key: 'wxfriend',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/wxfriend.png',
        title: '微信好友',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'weixin_friend';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('wxfriend', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('wxfriend', opt);
                };
            } else if (isWechat) {
                fn = function (opt) {
                    wechatTips();
                };
            }
            return fn;
        })()
    };

    // qq好友分享按钮配置
    var qqfriend = {
        key: 'qqfriend',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/qqfriend.png',
        title: 'QQ好友',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'qqfriend';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('qqfriend', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('qqfriend', opt);
                };
            }
            return fn;
        })()
    };

    // qq空间分享按钮配置
    var qzone = {
        key: 'qzone',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/qzone.png',
        title: 'QQ空间',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'qqdenglu';
                    nativeShare(opt, false);
                };
            } else if (isUC && OS.n == 'ios') {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('qzone', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('qzone', opt);
                };
            } else {
                // 普通浏览器
                fn = function (opt) {
                    var qqUrl = 'url=' + encodeURIComponent(opt.url) + '&successurl=' + encodeURIComponent(window.location.href) + '&summary=' + opt.content + '&title=' + opt.title + '&pics=' + encodeURIComponent(opt.iconUrl);
                    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + qqUrl);
                };
            }
            return fn;
        })()
    };

    // 新郎微博分享按钮配置
    var sinaweibo = {
        key: 'sinaweibo',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/sinaweibo.png',
        title: '新浪微博',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'sinaweibo';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('sinaweibo', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('sinaweibo', opt);
                };
            } else {
                // 普通浏览器
                fn = function (opt) {
                    window.open('http://v.t.sina.com.cn/share/share.php?url=' + encodeURIComponent(opt.url) + '&title=' + encodeURIComponent(opt.title));
                };
            }
            return fn;
        })()
    };

    var more = {
        key: 'more',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/more.png',
        title: '更多',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'all';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('', opt);
                };
            }
            return fn;
        })()
    }

    var Share = function (opt) {
        // 参数校验并设置默认值
        this.opt = $.extend({}, defaultOpt, opt);
        if (!this.opt.content) {
            this.opt.content = this.opt.title;
        }
        if (/^\/\/.+/.test(this.opt.url)) {
            this.opt.url = 'http:' + this.opt.url;
        }
        this.opt.linkUrl = this.opt.url;

        // init
        this._init();
    };


    Share.prototype = {

        version: '1.0.0',

        _init: function () {
            var me = this;

            me.isRender = false;    // 标记当前渲染状态

            me._initShareList();
        },

        _initShareList: function () {
            var me = this;

            // 处理分享图标list,并拼装dom
            var list = [];
            if (isZbios || isUC || isQQ || isWechat) {
                list.push(pyq, wxfriend);
            }
            if (isZbios || isUC || isQQ) {
                list.push(qqfriend);
            }
            list.push(qzone, sinaweibo);
            if (isZbios || isUC || (isQQ && OS.n == 'ios')) {
                list.push(more);
            }
            list = list.concat(me.opt.custom);
            me.list = list;

            var str = '';
            if ($.type(list) == 'array' && list.length > 0) {
                str += '<div class="c-share-list">';
                var num = list.length;
                var lines = Math.ceil(num / 4);
                for (var j = 0; j < lines; j++) {
                    str += '<div class="c-row c-gap-bottom">';
                    for (var i = 0; i < 4; i++) {
                        var index = j * 4 + i;
                        var obj = list[index];


                        if (obj) {
                            str += '<div class="c-span3 c-share-btn c-share-btn-' + obj.key + '">';
                            str += '<div class="c-img c-img-s">';
                            str +=     '<img src="' + obj.icon + '" />';
                            str += '</div>';
                            str += '<div class="c-line-clamp1">' + obj.title + '</div>';
                        }
                        else {
                            str += '<div class="c-span3 c-share-btn">';
                        }

                        str += '</div>';
                    }
                    str += '</div>';
                }
                str += '</div>';
            }
            me.$dom_shareList = $(str);
            me._bindEvent();
        },

        // 绑定分享按钮点击事件
        _bindEvent: function () {
            var me = this;

            // key = ['pyq', 'wxfriend', 'qqfriend', 'qzone', 'sinaweibo', 'more'];
            me.$dom_shareList.find('.c-share-btn').each(function (i) {
                if (me.list[i]) {
                    $(this).on('click', function () {
                        me.list[i].cb(me.opt);
                        me._sendLog(me.list[i].key);
                    });
                }
            });
        },

        // 结果页_sendLog方法,依赖B.log.send方法
        _sendLog: function (key) {
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
            if (key && appKeyList[key] && typeof B == 'object' && B.log && B.log.send) {
                var obj = appKeyList[key];
                if (me.opt && typeof me.opt.loginfo == 'object') {
                    obj = $.extend(obj, me.opt.loginfo);
                }
                // 结果页日志发送接口
                B.log.send(obj);
            }
        },

        // 将分享list dom插入用户选定的dom中
        render: function ($dom, renderOpts) {
            var me = this;

            // $dom为必选
            if (!($dom && $($dom).length)) {
                return;
            }

            var $customDom = $($dom);

            // add自定义classname
            if (renderOpts && renderOpts.customClassName) {
                me.$dom_shareList.addClass(renderOpts.customClassName);
            }

            // 插入用户dom
            $customDom.append(me.$dom_shareList);
            // 标记dom已经被插入页面
            me.isRender = true;

            if (renderOpts && typeof renderOpts.onRender == 'function') {
                renderOpts.onRender();
            }
        },

        // 调用popup并以popup方式打开
        popup: function (popupOpts) {
            var me = this;

            var popupOpts = popupOpts || {};

            // 若已经执行过render方法在页面中渲染,则默认需要clone一份
            // zepto clone不支持clone事件,需要重新绑定
            if (me.isRender) {
                me.$dom_shareList = me.$dom_shareList.clone();
                me._bindEvent();
            }

            // add自定义classname
            if (popupOpts && popupOpts.customClassName) {
                me.$dom_shareList.addClass(popupOpts.customClassName);
            }

            // 初始化"取消"按钮dom
            var $dom_cancelBtn = $('<div class="c-row c-gap-top-large"><div class="c-span12"><div class="c-btn c-share-cancel-btn">取消</div></div></div>');


            // 改全局 pmd
            // 以这种方式require是为了避免过早加载popup组件
            require(['pmd/popup/popup'], function (Popup) {
                me.sharePopup = new Popup({
                    content: me.$dom_shareList.add($dom_cancelBtn),
                    customClassName: 'c-share-popup-modal',
                    onOpen:  popupOpts.onOpen  || function(){},
                    onClose: popupOpts.onClose || function(){}
                });

                // 执行横竖屏补丁,为popup容器设置最大宽度,避免横屏时显示内容过大
                me.sharePopup.$popupContent.css({
                    'max-width': me._horizontalHack() + 'px'
                });

                // 点击"取消"按钮时关闭浮层
                $dom_cancelBtn.on('click', function () {
                    me.sharePopup.closePopup();
                    me._sendLog('close');
                });
            });
        },

        // 关闭popup方法
        close: function () {
            var me = this;
            if (me.sharePopup) {
                me.sharePopup.closePopup();
            }
        },

        // 横竖屏补丁
        // 判断屏幕的最小边长并返回
        _horizontalHack: function () {
            var verticalScreenWidth;
            if (window.orientation != undefined) {
                if (window.orientation == 0 || window.orientation == 180) {
                    verticalScreenWidth = Math.min(window.screen.width, $(window).width());
                }
                else if (window.orientation == 90 || window.orientation == -90) {
                    verticalScreenWidth = Math.min(window.screen.width, window.screen.height);
                    verticalScreenWidth = verticalScreenWidth * $(window).width() / Math.max(window.screen.width, window.screen.height);
                }
            }
            else {
                verticalScreenWidth = Math.min(window.screen.width, window.screen.height);
            }
            return verticalScreenWidth;
        },

        constructor: Share
    };

    return Share;
});
