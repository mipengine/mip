/**
 * @file: player.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 14:37:19
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:04:48
 */
/* global Vue, _, yog */

define(function (require) {
    var $ = require('zepto');
    var mediator = require('./mediator');
    var tplData = require('./tpl-data');

    var videojs = require('./lib/video.js');

    window.videojs = videojs;

    var videojsHls = require('./lib/videojs-contrib-hls.js');

    // videojsHls();


    var $wrap;
    var $video;
    var player;
    var showDownloadAppBox = true;


    var courseTplData;
    var courseid;
    var sid;
    var cid;
    var uid;
    var type;

    var playerInfo;
    var hasVideo;
    var preVideoSrc;
    var vodSource;
    var coverUrl;

    var autoPlayVideoTimer;

    function getTplData() {

        courseTplData = tplData.get('courseInfo');
        courseid = courseTplData.courseid;
        sid = courseTplData.sid;
        cid = courseTplData.cid;
        uid = courseTplData.uid;
        type = courseTplData.type;

        playerInfo = tplData.get('playerInfo');
        hasVideo = playerInfo.hasVideo;
        preVideoSrc = playerInfo.preVideoSrc;
        vodSource = playerInfo.vodSource;
        coverUrl = playerInfo.coverUrl;
    }

    function loadH5Video(source) {
        player = videojs('video');

        // 必须转成字符串， 也是醉了
        player.src({
            src: source.src,
            code: source.key,
            courseid: courseid + '',
            sid: sid + '',
            cid: (source.cid || cid) + '',
            uid: uid + '',
            type: source.src.indexOf('.mp4') > -1 ? '' : 'application/x-mpegURL'
        });
    }

    function renderVideo() {

        $wrap = $('.video');
        $video = $(
            '<video id="video" class="video-js vjs-default-skin link" poster="' + coverUrl + '" controls></video>'
        );

        $wrap.prepend($video);
    }

    function firstLoad() {
        if (vodSource.length > 0) {
            loadH5Video(vodSource[0]);
        }
        else {
            loadH5Video({src: preVideoSrc[0], key: ''});
        }
    }


    function getNextClassInfo() {
        if (type === 1) {
            mediator.trigger('trial-next');
        }
    }

    function autoPlayVideo(i) {
        if (i <= 0) {
            clearTimeout(autoPlayVideoTimer);
            autoPlayVideoTimer = null;
            $('#play-end').hide();
            getNextClassInfo();
            return;
        }

        $('#auto_play_num').text(i);
        autoPlayVideoTimer = setTimeout(function () {
            autoPlayVideo(i - 1);
        }, 1000);
    }

    function playPause() {
        if (showDownloadAppBox) {
            mediator.trigger('toggle-app-download-banner');
        }
    }

    function playEnd() {

        var v = $video[0];

        if (player.currentTime() >= parseInt(player.duration(), 10) - 1) {
            if (type === 1) {
                v.load();
                autoPlayVideo(3);
                mediator.trigger('toggle-end-pop');
            }
            else if (type === 2) {
                v.load();
                $('#trial-end').show();
            }
        }
    }

    function playMobiTrail() {
        // player.on('play', beginToPlay);
        player.on('pause', playPause);
        player.on('ended', playEnd);
    }

    function disposeVideo() {
        player.off('pause', playPause);
        player.off('ended', playEnd);
        player.dispose();
    }


    function init() {

        getTplData();

        if (!hasVideo) {
            return;
        }

        mediator.on('toggle-app-download-flag', function (e, data) {
            var show = data.show;
            showDownloadAppBox = !!show;
        });
        mediator.on('change-video-src', function (e, data) {

            if (player) {
                disposeVideo();
            }

            renderVideo();
            loadH5Video(data.data);
            playMobiTrail();
            $('#video_loading').remove();

            mediator.trigger('toggle-app-download-banner', true);
            showDownloadAppBox = true;
        });


        $('#play-next-class').on('click', function () {
            getNextClassInfo();
        });

        renderVideo();
        firstLoad();
        playMobiTrail();
    }
    return init;
});
