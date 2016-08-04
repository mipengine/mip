define(['util'], function(util){
    var customElem = require('customElement').create();
    var player = require('./video/player');

    var bdPlayer;
    var build = function () {
        if (this.isRender) {
            return; 
        }
        this.isRender = true;

        var ele = this.element;
        var $ele = $(this.element);

        $ele.on('click', function (event) {
            // 如果有视屏正在播放，则移除视屏
            bdPlayer && bdPlayer.remove();

            // video容器  如果未设置的话  则传入me
            var container = $ele.attr('container');
            if (container && $(container) && $(container).length) {
                container = $(container);
            } else {
                container = ele;
            }

            var mip_video = $(container).parent().find('mip-video');
            
            // 广告数据信息
            var adInfo = [];
            var adInfoString = $ele.attr('adInfo');
            if (adInfoString) {
                try {
                    adInfo = new Function('return ' + adInfoString)()
                } catch (e) {}
            }

            // 正片播放时 设置多type时 数据处理
            var sources = $ele.find('source');
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

                height: $ele.attr('height'),
                width: $ele.attr('width'),
                src: $ele.attr('src'),
                type: $ele.attr('type'),
                poster: $ele.attr('poster'),
                autoplay: $ele.attr('autoplay'),
                controls: $ele.attr('controls'),
                loop: $ele.attr('loop'),
                muted: $ele.attr('muted'),

                android: {
                    playMode: $ele.attr('android-mode') || ''
                },
                ios: {
                    playMode: $ele.attr('ios-mode') || ''
                },

                // 广告数据信息
                adInfo: adInfo,

                // 正片视频数据信息
                playInfo: playInfo
                // src: 'http://v1.bdstatic.com/8aa369effe2cc6280c1bd413723ce0ac/mp4/8aa369effe2cc6280c1bd413723ce0ac.mp4'
            });
            // bdPlayers.push(bdPlayer);
        });

        // 防止点击video区域时 造成重播
        $ele.on('click', 'video', function (event) {
            event.stopPropagation();
            event.preventDefault();
        });

    };

    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});



