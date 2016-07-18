define(['../../src/utils/util'], function(util){
    // console.log('dfd');
    var customElem = require('../customElement');
    var player = require('./player');
    var build = function () {
        if (this.isRender) {
            return;
        }
        this.isRender = true;

        var me = this;
        var $me = $(this);

        $(this).on('click', function (event) {
            var bdPlayer = new player({});

            // video容器  如果未设置的话  则传入me
            var container = $me.attr('container');
            if (container && $(container) && $(container).length) {
                container = $(container);
            } else {
                container = me;
            }

            // 广告数据信息
            var adInfo = [];
            var adInfoString = $me.attr('adInfo');
            if (adInfoString) {
                try {
                    adInfo = new Function('return ' + adInfoString)()
                } catch (e) {}
            }

            // 正片播放时 设置多type时 数据处理
            var sources = $me.find('source');
            var playInfo = [];
            sources.each(function () {
                var src = $(this).attr('src');
                var type = $(this).attr('type');
                if (!src) {
                    return;
                }
                playInfo.push({
                    type: type,
                    src: src
                });
            });

            // 加载视频、并播放

            bdPlayer.render({
                // 播放器容器，必选
                container: container,

                height: $me.attr('height'),
                width: $me.attr('width'),
                src: $me.attr('src'),
                type: $me.attr('type'),
                poster: $me.attr('poster'),
                autoplay: $me.attr('autoplay'),
                controls: $me.attr('controls'),
                loop: $me.attr('loop'),
                muted: $me.attr('muted'),

                android: {
                    playMode: $me.attr('android-mode') || ''
                },
                ios: {
                    playMode: $me.attr('ios-mode') || ''
                },

                // 广告数据信息
                adInfo: adInfo,

                // 正片视频数据信息
                playInfo: playInfo
                // src: 'http://v1.bdstatic.com/8aa369effe2cc6280c1bd413723ce0ac/mp4/8aa369effe2cc6280c1bd413723ce0ac.mp4'
            });
        });

        // 防止点击video区域时 造成重播
        $(this).on('click', 'video', function (event) {
            event.stopPropagation();
            event.preventDefault();
        });

    };

    customElem.prototype.init = function(){
        this.build = build;
    };

    return customElem;

});



