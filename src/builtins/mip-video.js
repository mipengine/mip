define(function() {
    var customElem = require('customElement').create();

    // videoAttributes are applied to <video> directory,
    // while managed attributes: ['ads', 'src', 'controls', 'loop', 'autoplay'] are not applied directly.
    var videoAttributes = ['autoplay', 'autobuffer', 'crossorigin', 'height', 'muted', 'preload', 'poster', 'width'];

    customElem.prototype.build = function() {
        this.attributes = getAttributeSet(this.element.attributes);
        this.normalVideo = {
            sources: this.getNormalSources(),
            forceStart: false
        };
        this.videoElement = this.render();
        this.applyFillContent(this.videoElement, true);
        this.startPlaySequence();
    };

    /*
     * parse "ads" attribute, as JSON format
     */
    customElem.prototype.parseAds = function() {
        var ads = [];

        var str = this.attributes.ads;
        if (str) ads = JSON.parse(str);

        ads.forEach(function(ad, i) {
            ad.disableSeeking = true;
            ad.forceStart = (i > 0);
        });
        return ads;
    };

    /*
     * Prepare <video> attributes and styles for Ad play
     */
    customElem.prototype.setupAdEnvironment = function() {
        var el = this.videoElement;
        el.removeAttribute('loop');
        el.setAttribute('controls', 'controls');
        this.videoStyle.innerHTML = 'video#' + el.getAttribute('id') +
            '::-webkit-media-controls-timeline {display: none!important;}';
    };

    /*
     * Prepare <video> attributes and styles for Normal play
     */
    customElem.prototype.setupNormalEnvironment = function() {
        var el = this.videoElement;
        if (this.attributes.controls !== undefined) {
            el.setAttribute('controls', 'controls');
        } else {
            el.removeAttribute('controls');
        }
        if (this.attributes.loop !== undefined) {
            el.setAttribute('loop', 'loop');
        } else {
            el.removeAttribute('loop');
        }
        this.videoStyle.innerHTML = '';
    };

    /*
     * Start the play sequence: play ads if any, then play the origin video
     */
    customElem.prototype.startPlaySequence = function() {
        this.playAds(this.playNormal);
    };

    /*
     * Play the ad list, one by one.
     * @param {Function} onEnded will be called (on this customElement)
     *      when all ads have been played
     */
    customElem.prototype.playAds = function(onEnded) {
        var ads = this.parseAds();
        if (ads.length === 0) {
            return onEnded && onEnded.call(this);
        }

        // force start when there'are ads before
        this.normalVideo.forceStart = true;
        this.setupAdEnvironment();
        this.doPlay(ads, onEnded);
    };

    /*
     * Play the origin video
     */
    customElem.prototype.playNormal = function(onEnded) {
        this.setupNormalEnvironment();
        this.doPlay([this.normalVideo], onEnded);
    };

    /*
     * Do play the video queue
     * @param {Array} queue the video sequence
     * @param {Array} onEndedCb will be called (on this customElement) 
     *      when videos within the queue have been all played
     * Legacy:
     *      doPlay([{
     *          disableSeeking: true,
     *          forceStart: false,
     *          sources: [{
     *              type: 'video/mp4',
     *              src: 'http://xxx.com/xx.mp4'
     *      }], function(){
     *          console.log('all videos have been played');
     *      });
     */
    customElem.prototype.doPlay = function(queue, onEndedCb) {
        if (!queue.length) {
            return onEndedCb && onEndedCb.call(this);
        }
        var video = queue.shift();

        // clearing
        var videoEl = this.videoElement;
        videoEl.pause();
        videoEl.removeAttribute('src');
        Array.prototype.forEach.call(videoEl.querySelectorAll('source'), function(el) {
            videoEl.removeChild(el);
        });

        // setup player context
        var supposedCurrentTime = 0;
        video.sources.forEach(function(source) {
            var el = document.createElement('source');
            el.setAttribute('src', source.src);
            source.type && el.setAttribute('type', source.type);
            videoEl.appendChild(el);
        });

        var onSeeking = function() {
            if (video.disableSeeking) {
                var delta = videoEl.currentTime - supposedCurrentTime;
                if (Math.abs(delta) > 0.01) {
                    videoEl.currentTime = supposedCurrentTime;
                }
            }
        };
        var onTimeupdate = function() {
            if (!videoEl.seeking) {
                supposedCurrentTime = videoEl.currentTime;
            }
        };
        var onEnded = function() {
            videoEl.removeEventListener('timeupdate', onTimeupdate);
            videoEl.removeEventListener('ended', onEnded);
            videoEl.removeEventListener('error', onEnded);
            videoEl.removeEventListener('seeking', onSeeking);
            this.doPlay(queue, onEndedCb);
        }.bind(this);

        videoEl.addEventListener('timeupdate', onTimeupdate);
        videoEl.addEventListener('ended', onEnded);
        videoEl.addEventListener('error', onEnded);
        videoEl.addEventListener('seeking', onSeeking);
        videoEl.load();
        if (video.forceStart) videoEl.play();
    };

    /*
     * Get sources from "src" attribute and <source> childrens of this.videoElement
     * @return {Array} the source list, legacy:
     *      [{
     *          src: 'http://xxx/x.mp4',
     *          type: 'video/mp4'
     *      },{
     *          src: 'http://foo.avi',
     *          typ: ''
     *      }]
     */
    customElem.prototype.getNormalSources = function() {
        var sources = [];
        if (this.attributes.src) {
            sources.push({
                src: this.attributes.src
            });
        }
        Array.prototype.forEach.call(this.element.querySelectorAll('source'), function(el) {
            sources.push({
                src: el.getAttribute('src'),
                type: el.getAttribute('type')
            });
        });
        return sources;
    };

    /*
     * Render the <video> element, and set `this.videoStyle`
     */
    customElem.prototype.render = function() {
        var videoEl = document.createElement('video');
        for (var k in this.attributes) {
            if (!this.attributes.hasOwnProperty(k)) continue;
            if (videoAttributes.indexOf(k) > -1) {
                videoEl.setAttribute(k, this.attributes[k]);
            }
        }
        Array.prototype.slice.apply(this.element.childNodes).forEach(function(node) {
            if (node.nodeName.toLowerCase() === 'mip-i-space') return;    // mip layout related
            videoEl.appendChild(node);
        });
        videoEl.setAttribute('id', 'mip-video-' + Date.now());
        var style = document.createElement('style');
        this.element.appendChild(style);
        this.element.appendChild(videoEl);
        this.videoStyle = style;
        return videoEl;
    };

    /*
     * Get attribute Set from attribute List
     * @param {NamedNodeMap} attributes the attribute list, spec: https://dom.spec.whatwg.org/#interface-namednodemap
     * @return {Object} the attribute set, legacy:
     *      {
     *          "src": "http://xx.mp4",
     *          "autoplay": "",
     *          "width": "720"
     *      }
     */
    function getAttributeSet(attributes) {
        var attrs = {};
        Array.prototype.slice.apply(attributes).forEach(function(attr) {
            attrs[attr.name] = attr.value;
        });
        return attrs;
    }

    return customElem;
});
