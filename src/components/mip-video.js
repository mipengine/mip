/**
 * @file 视频播放组件
 * @author @author harttle<yangjun14@baidu.com>, liangjiaying<jennyliang220@github>
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function (require) {
    var customElem = require('customElement').create();
    var viewer = require('viewer');

    var videoAttributes = [
        'ads',
        'src',
        'controls',
        'loop',
        'autoplay',
        'autoplay',
        'autobuffer',
        'crossorigin',
        'height',
        'muted',
        'preload',
        'poster',
        'width'
    ];
    var windowInIframe = window.parent !== window;

    customElem.prototype.firstInviewCallback = function () {
        this.attributes = getAttributeSet(this.element.attributes);

        var windowProHttps = !!window.location.protocol.match(/^https:/);
        var videoProHttps = !!this.attributes.src.match(/^https:/);
        // 页面https         + 视频https  = 当前页播放
        // 页面https(在iframe里) + 视频http    = 跳出播放
        // 页面https(其它)   + 视频http    = 当前页播放（非mip相关页）
        // 页面http          + 视频任意    = 当前页播放
        if (videoProHttps || (windowInIframe && !videoProHttps && !windowProHttps)) {
            this.videoElement = this.renderInView();
        }
        else {
            this.videoElement = this.renderPlayElsewhere();
        }
        this.applyFillContent(this.videoElement, true);
    };

    // Render the `<video>` element, and append to `this.element`
    customElem.prototype.renderInView = function () {
        var videoEl = document.createElement('video');
        for (var k in this.attributes) {
            if (this.attributes.hasOwnProperty(k) && videoAttributes.indexOf(k) > -1) {
                videoEl.setAttribute(k, this.attributes[k]);
                videoEl.setAttribute('playsinline', 'playsinline');
                videoEl.setAttribute('webkit-playsinline', 'webkit-playsinline');
            }
        }
        Array.prototype.slice.apply(this.element.childNodes).forEach(function (node) {
            // FIXME: mip layout related, remove this!
            if (node.nodeName.toLowerCase() === 'mip-i-space') {
                return;
            }
            videoEl.appendChild(node);
        });
        this.element.appendChild(videoEl);
        return videoEl;
    };

    // Render the `<a>` element with poster and play btn, and append to `this.element`
    customElem.prototype.renderPlayElsewhere = function () {
        var videoEl = document.createElement('div');
        videoEl.setAttribute('class', 'mip-video-poster');
        if (this.attributes.poster) {
            videoEl.style.backgroundImage = 'url(' + this.attributes.poster + ')';
            videoEl.style.backgroundSize = 'cover';
        }
        else {
            videoEl.style.background = '#333';
        }

        var playBtn = document.createElement('span');
        playBtn.setAttribute('class', 'mip-video-playbtn');
        videoEl.appendChild(playBtn);
        videoEl.dataset.videoSrc = this.attributes.src;
        videoEl.dataset.videoPoster = this.attributes.poster;
        videoEl.addEventListener('click', sendVideoMessage, false);

        function sendVideoMessage() {
            if (windowInIframe) {
                // mip_video_jump 为写在外层的承接方法
                viewer.sendMessage('mip_video_jump', {
                    poster: videoEl.dataset.videoPoster,
                    src: videoEl.dataset.videoSrc
                });
            }
        }
        this.element.appendChild(videoEl);
        return videoEl;
    };

    /**
     * Get attribute Set from attribute List
     *
     * @param {NamedNodeMap} attributes the attribute list, spec: https://dom.spec.whatwg.org/#interface-namednodemap
     * @return {Object} the attribute set, legacy:
     * @example
     * {
     *     "src": "http://xx.mp4",
     *     "autoplay": "",
     *     "width": "720"
     * }
     */
    function getAttributeSet(attributes) {
        var attrs = {};
        Array.prototype.slice.apply(attributes).forEach(function (attr) {
            attrs[attr.name] = attr.value;
        });
        return attrs;
    }

    return customElem;
});
