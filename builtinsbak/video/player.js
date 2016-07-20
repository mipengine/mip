/**
 * h5 video播放器
 *
 * @file player.js
 * @author songgenlei@baidu.com
 */
define(function() {

    /**
     * 构造函数
     *
     * @param {Object}              opt 配置对象
     * @param {Object}              opt.ios   可选 单独配置ios下某个表现形式
     * @param {boolean}             opt.ios.playMode  可选 播放模式
     *** 播放模式字段值说明：
     *** hide 容器中对video的显示进行隐藏 （ios默认为全屏播放，针对ui设定 当前播放区域不显示video）
     *** false || undefined 不使用插件带有的播放容器样式
     * @param {Object}              opt.android   可选  单独配置android下某个表现形式
     * @param {boolean}             opt.android.playMode  可选 播放模式
     *** 播放模式字段值说明：
     *** fullsreen 全屏 (android模拟全屏播放)
     *** false || undefined 不使用插件带有的播放容器样式
     */
    function VideoPlayer(opt) {
        this.params = $.extend(true, {
            // 视频容器   必填
            container: null,

            height: null,
            width: null,
            src: null,
            type: null,
            poster: null,
            autoplay: null,
            controls: null,
            loop: null,
            muted: null,

            ios: {
                playMode: false
            },

            android: {
                playMode: false
            },

            // 广告数据信息
            adInfo: [],

            // 正片视频数据信息
            playInfo: []

        }, opt);

        // 控制视频位置 和 样式 容器
        this.box = {
            normal: $('<div class="mip-video-box"></div>'),
            // ios playmode 设置为hide时使用  视频缩小为1*1px 当前不显示出来
            hide: $('<div class="mip-video-box-ios"></div>')
        }

        // 当前广告播放到第几个  （广告可设置多个）
        this.adIdx = 0;

        // 视频播放到的位置
        this.lastTime = 0;

        // 事件命名空间
        this.eventNS = '.mipvideo';

        // 初始化video
        this.init();

        // 绑定事件
        this.bindEvents();
    }

    VideoPlayer.prototype = {
        constructor: VideoPlayer,

        // 容器代码
        // tplWrap: '<video class="mip-video-player" <%=(poster ? "poster=" + poster : "")%>"></video>',

        // source代码
        tplSource: ['<% for (var i = 0, len = data.length; i < len; i++) { var item = data[i]; %>',
            '<source <%=(item.type ? "type=" + item.type : "")%> src="<%=item.src%>"></source>',
        '<% } %>'].join(''),

        // 模板引擎
        tmpl: (function(){
            var cache = {};

            var tmpl = function tmpl(str, data){
                // Figure out if we’re getting a template, or if we need to
                // load the template – and be sure to cache the result.
                var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t") .replace(/((^|%>)[^\t]*)’/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

                // Provide some basic currying to the user
                return data ? fn( data ) : fn;
            };

            return tmpl;
        })(),
        
        // 初始化video标签
        init: function () {
            var me = this;
            me.$video = $('<video></video>');
            me.video = me.$video[0];

            // 设置video标签默认样式
            me.video.className = 'mip-video-player';

            me.isWorking = false;
        },

        // 初始化各参数
        initParams: function () {
            var me = this;
            me.lastTime = 0;
        },

        // params 同上方 创建时参数
        render: function (options) {
            var me = this;

            // render时 可设置参数 覆盖实例化时设置的信息
            this.options = $.extend({}, me.params, options);

            me.setAttrs();

            me.loadSource();

            me.appendVideo();

            me.play();

            me.isWorking = true;
        },

        // 设置video的各项参数
        setAttrs: function () {
            var me = this;
            var options = me.options;

            // 设置视频宽度 需要考虑height 为0 的时候的处理
            me.setAttr('width', options.width);

            // 需要考虑height 为0 的时候的处理
            me.setAttr('height', options.height);

            // 设置视频资源地址   单一视频资源时使用 ------ 使用source标签实现
            // me.setAttr('src', options.src);

            // 设置视频资源地址   单一视频资源时使用 ------ 使用source标签实现
            // me.setAttr('type', options.type);

            // 设置视频封面
            me.setAttr('poster', options.poster);

            // 设置视频是否自动播放
            me.setAttr('autoplay', options.autoplay);

            // 设置视频是否使用控制条
            me.setAttr('controls', options.controls);

            // 设置视频是否循环播放
            me.setAttr('loop', options.loop);

            // 设置视频是否静音
            me.setAttr('muted', options.muted);
        },

        // 设置video属性     字段是否为0, 是否为原始字段名
        setAttr: function (attr, value) {
            var me = this;
            var $video = me.$video;

            if (value || value === 0 || value === '') {
                $video.attr(attr, value);
            } else {
                $video.removeAttr(attr);
            }
        },

        // 插入视频元素   需要区分ios  android是否全屏播放等  TODO
        appendVideo: function () {
            var me = this;
            var video = me.$video;
            var options = me.options;

            var container = $(options.container);
            if (!container.length) {
                return;
            }

            // 如果设置了playMode 且 ios 进行如下操作
            // ios不区分fullscreen || inline, 均为为默认系统全屏播放
            if (me.isIos() && options.ios && options.ios.playMode === 'hide') {
                var html = me.box.hide.html(video);
                container.append(html);
                return;
            }

            // 非ios下 全屏播放
            if (!me.isIos() && options.android && options.android.playMode === 'fullscreen') {
                me.fullscreenForAndriod();
                return;
            }

            // 非ios下 当前区域播放  --- 暂无当前播放规范 尚未开发
            // if (options.playMode === 'inline') { }

            // 如果未设置playMode 则只会简单的插入video节点
            container.append(this.box.normal.html(video));
        },

        // 移除视频 及 其父元素
        // removeVideo: function () {
            // this.box
        // },

        // 播放视频，  兼容手百等无法播放的问题
        play: function () {
            var me = this;
            var uaReg = /(iphone.+mqqbrowser)|(android.*(baidubrowser)|(baiduboxapp))/i;

            if (navigator.userAgent.match(uaReg)) {
                setTimeout(function() {
                    me.video.play();
                }, 30);
            } else {
                me.video.play();
            }
        },

        // 加载视频资源
        load: function () {
            // 加载资源  必需  否则切换资源播放时 仍然会播放上次视频
            this.video.load();
        },

        // 加载视频资源  判断要播放的资源是否为广告
        loadSource: function () {
            var me = this;
            var options = me.options;
            var video = me.video;

            // 初始化时间等参数
            me.initParams();

            // 移除广告事件
            me.removeEventsForAD();

            if (me.hasAd(options)) {
                me.playForAD(options);
            } else {
                me.playForNormal(options);
            }

            // 加载资源  必需  否则切换资源播放时 仍然会播放上次视频
            me.load();

        },

        // 正常 - 视频资源
        playForNormal: function () {
            var me = this;
            var options = me.options;
            var playInfo = options.playInfo;
            var video = me.video;
            // 如果没有playInfo时 使用src和type参数 
            if (!playInfo || !playInfo.length) {
                playInfo = [];
                playInfo[0] = {
                    type: options.type,
                    src: options.src
                };
            }

            // 插入视频 开始播放
            me.appendSource(playInfo);
        },

        // 广告 - 资源
        playForAD: function () {
            var me = this;
            var options = me.options;
            var ads = options.adInfo;
            var video = me.video;
            if (!me.hasAd(options)) {
                return;
            }

            // 插入第几组广告 开始播放
            me.appendSource(ads[me.adIdx]);

            me.adIdx++;
            
            // 广告播放事件绑定
            me.eventsForAD();
        },

        // 添加广告事件
        eventsForAD: function () {
            var me = this;
            var adEventNS = me.eventNS + 'forad';
            var video = me.video;

            // 移除事件 防止多次绑定
            me.removeEventsForAD();

            // 广告播放时 不可以拖动快进
            me.$video.on('timeupdate' + adEventNS, function() {
                var currentTime = Math.ceil(video.currentTime);
                var duration = me.getVideoTime();
                    // alert('duration');

                // for ad  can not drag to play
                if (currentTime - me.lastTime > 2) {
                    video.currentTime = me.lastTime;
                    me.lastTime = me.lastTime;

                    // 解决快进拖动到视频结束时触发pause事件 视频暂停播放现象
                    me.play();
                    return;
                }

                me.lastTime = currentTime;
                    // alert(duration);

                // 广告播放结束后 继续播放
                if (duration && currentTime >= duration) {
                    // alert(duration);
                    me.loadSource();
                    me.play();
                }
            });
        },

        // 移除广告事件
        removeEventsForAD: function () {
            var me = this;
            var adEventNS = me.eventNS + 'forad';
            me.$video.off('timeupdate' + adEventNS);
        },

        // 是否有广告
        hasAd: function () {
            var me = this;
            var options = me.options;
            var ads = options.adInfo;
            if (!ads || !ads.length || me.adIdx >= ads.length) {
                return false;
            }

            return true;
        },

        // 插入一组source数据 进行播放使用
        // data array() 为当前一组视频的数据信息
        // data.type  视频资源类型
        // data.src  视频资源地址
        appendSource: function (data) {
            var me = this;
            var $video = me.$video;
            var sources = this.tmpl(this.tplSource, { data: data });
            if (sources) {
                $video.html(sources);
            }
        },

        // 是否ios
        isIos: function () {
            return /iPhone|iPad|iPod/i.test(window.navigator.userAgent); 
        },

        // 未重构部分----------------------------------------------------------------------

        // 绑定事件
        bindEvents: function() {
            var me = this;
            me.$video.on('loadeddata', function() {
                me.video.play();
            });
        },

        fullscreenForAndriod: function () {
            var self = this;
            var video = self.$video;
            var options = self.options;
            var eventNS = self.eventNS + 'fullscreen';

            //暂时注释掉by fengchuantao
            // QQ browser由于自有实现的播放器问题 特殊处理
            // // 避免2次点击关闭按钮
            // if (navigator.userAgent.match(/(android.+mqqbrowser)/i)) {
            //     return;
            // }

            // 引用通用弹窗组件
            require(['./popup'], function (Popup) {
                var popup = new Popup({
                    title: options.title || '',
                    content: '',
                    fullView: true,
                    customClassName: 'mip-video-player-popup',
                    onOpen: function () {
                        popup.$popupContent.html(video);

                        // 设置视频居中显示
                        self.setVideoCenterForFullscreen();
                    },
                    onClose: function () {
                        // 初始化
                        $(window).off('orientationchange' + eventNS);
                        self.initStyle();
                    }
                });

                // 解决android手百关闭时页面抖动问题  待popup组件升级后更改 @士浩
                var remove = $('.mip-video-player-popup .mip-video-popup-remove');
                remove.length && remove.off('click' + eventNS)
                    .on('click' + eventNS, function () {
                        popup.$popupContent.length && popup.$popupContent.html('');
                    });
            });
        },

        initStyle: function () {
            var self = this;
            var video = self.$video;
            video.removeAttr('style');
        },

        // 设置视频居中显示  and  屏幕旋转时大小控制 - android模拟全屏
        setVideoCenterForFullscreen: function () {
            var self = this;
            var eventNS = self.eventNS + 'fullscreen';

            // 关闭按钮距离上方的距离
            var freesize = 0;
            var remove = $('.mip-video-player-popup .mip-video-popup-remove');
            if (remove.length) {
                freesize = remove.height() + remove.offset().top;
            }

            // 屏幕旋转后，设置video的位置和尺寸
            $(window).off('orientationchange' + eventNS + ' resize' + eventNS)
                .on('orientationchange' + eventNS + ' resize' + eventNS, function () {
                    self.calculateVideo({
                        freesize: freesize
                    });
                });

            // 设置video的位置和尺寸
            self.calculateVideo({
                freesize: freesize
            });
        },

        // android全屏时计算video的高度和位置
        // @param {boolean}    params.freesize  可选 上下需要空闲出来的尺寸
        calculateVideo: function (params) {
            var self = this;
            var video = self.$video;
            var params = params || {};

            // 初始化样式避免被设定影响
            self.initStyle();

            setTimeout(function () {
                var winHeight = $(window).height();
                var winWidth = $(window).width();
                var freesize = params.freesize || 0;
                var h = video.height();

                if (winHeight <= winWidth) {
                    h = winHeight - freesize * 2;
                }
                video.css({
                    'height': h + 'px',
                    'margin-top': - h / 2 + 'px',
                    'visibility': 'visible'
                });

            }, 10);
        },

        pause: function() {
            this.video.pause();
        },

        remove: function() {
            this.$video.parent().remove();
            this.isWorking = false;
        },

        // 获取视频时长
        getVideoTime: function() {
            return Math.ceil(this.video.duration);
        },

        on: function(name, fn) {
            this.$video.on(name, fn);
        },

        off: function(name, fn) {
            this.$video.off(name, fn);
        },

        trigger: function(name) {
            this.$video.trigger(name);
        }
        
    }

    return VideoPlayer;
});