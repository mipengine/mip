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

    customElem.prototype.build = function () {
        this.attributes = getAttributeSet(this.element.attributes);

        var windowProHttps = !!window.location.protocol.match(/^https:/);
        var windowIsCached = !!window.location.hostname.match('^mipcache');
        var videoProHttps = !!this.attributes.src.match(/^https:/);
        // 页面https         + 视频https  = 当前页播放
        // 页面https(mipcache或在sf里) + 视频http    = 跳出播放
        // 页面https(其它)   + 视频http    = 当前页播放（非mip相关页）
        // 页面http          + 视频任意    = 当前页播放
        if (windowProHttps && (windowIsCached || windowInIframe) && !videoProHttps) {
            this.videoElement = this.renderBaiduTranscoderArea();
        }
        else {
            this.videoElement = this.renderInView();
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
    customElem.prototype.renderBaiduTranscoderArea = function () {
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

        videoEl.addEventListener('click', jumpToTranscoder, false);

        function jumpToTranscoder() {
            var PROXYURL = alignment();

            if (windowInIframe) {
                // mibm-jumplink 为写在结果页card-act_sf_mip模板中定义的方法
                viewer.sendMessage('mibm-jumplink', {
                    url: PROXYURL
                });
            }
            else {
                window.location = PROXYURL;
            }
        }

        /**
         * 数据组装函数
         *
         * @return {Object} formated object
         */
        function alignment() {
            var ext = {
                poster: videoEl.dataset.videoPoster,
                src: videoEl.dataset.videoSrc
            };
            var data = {
                pd: 'mms_mipvideo',
                // 使用数据接口，不能改成驼峰式
                dev_tpl: 'act_mip_video',
                title: '%E8%A7%86%E9%A2%91',
                actname: 'act_mip_video',
                ext: encodeURIComponent(JSON.stringify(ext))
            };

            return getUrl(data);
        }

        function getUrl(params) {
            var url = 'http://transcoder.baidu.com/sf?';
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    url += key + '=' + params[key] + '&';
                }

            }
            return url;
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
