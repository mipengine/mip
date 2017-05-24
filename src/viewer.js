define(function (require) {
    'use strict';

    var util = require('./util');
    var viewport = require('./viewport');
    var Gesture = util.Gesture;
    var css = util.css;
    var platform = util.platform;
    var EventAction = require('./utils/event-action');
    var EventEmitter = require('./utils/event-emitter');

    /**
     * Save window.
     * @inner
     * @type {Object}
     */
    var win = window;

    /**
     * The mip viewer.Complement native viewer, and solve the page-level problems.
     */
    var viewer = {
        /**
         * The initialise method of viewer
         */
        init: function () {
            /**
             * The gesture of document.Used by the event-action of Viewer.
             * @private
             * @type {Gesture}
             */
            this._gesture = new Gesture(document, {
                preventX: false
            });

            this.setupEventAction();

            if (this.isIframed) {
                this.patchForIframe();
                // proxy links
                this._proxyLink();
                this._viewportScroll();
                // Tell parent page the current page is loaded.
                this.sendMessage('mippageload', {
                    time: Date.now(),
                    title: encodeURIComponent(document.title)
                });
            }
        },

        /**
         * The iframed state.
         * @type {Boolean}
         * @public
         */
        isIframed: win !== top,

        /** 
         * Patch for iframe
         */
        patchForIframe: function () {
            // When page in an iframe and browser is IOS, page can not be scrollable. So we need
            // set the style to be `height: 100%; overflow: auto` for solving this problem.
            if (platform.needSpecialScroll) {
                css([document.documentElement, document.body], {
                    'height': '100%',
                    'overflow-y': 'auto',
                    '-webkit-overflow-scrolling': 'touch'
                });
                css(document.body, 'position', 'relative');
            }

            // Fix iphone 5s UC and ios 9 safari bug. While the back button is clicked, the cached page has some problems.
            // So we are forced to load the page in iphone 5s UC and ios 9 safari.
            var iosVersion = platform.getOsVersion();
            iosVersion = iosVersion ? iosVersion.split('.')[0] : '';
            var needBackReload = (iosVersion == '8' && platform.isUc() && screen.width === 320)
                || (iosVersion == '9' && platform.isSafari());
            if (needBackReload) {
                window.addEventListener('pageshow', function (e) {
                    if (e.persisted) {
                        document.body.style.display = 'none';
                        location.reload();
                    }
                });
            }
        },

        /**
         * Show contents of page. The contents will not be displayed until the components are registered.
         */
        show: function () {
            css(document.body, {
                'opacity': 1,
                'animation': 'none'
            });
            this.isShow = true;
            this._showTiming = Date.now();
            this.trigger('show', this._showTiming);
        },

        /**
         * Send message to parent page.
         * @param {string} eventName
         * @param {Object} data Message body
         */
        sendMessage: function (eventName, data) {
            if (this.isIframed) {
                window.parent.postMessage({
                    event: eventName,
                    data: data
                }, '*');
            }
        },

        /**
         * Setup event-action of viewer. To handle `on="tap:xxx"`.
         */
        setupEventAction: function () {
            var eventAction = this.eventAction = new EventAction();
            this._gesture.on('tap', function (event) {
                eventAction.execute('tap', event.target, event);
            });
        },

        /**
         * Event binding callback.
         * For overridding _bindEventCallback of EventEmitter.
         *
         * @private
         * @param {string} name
         * @param {Function} handler
         */
        _bindEventCallback: function (name, handler) {
            if (name === 'show' && this.isShow && typeof handler === 'function') {
                handler.call(this, this._showTiming);
            }
        },

        /**
         * Listerning viewport scroll
         * @private
         */
        _viewportScroll: function () {

            var self = this;
            var dist = 0;
            var direct = 0;
            var scrollTop = viewport.getScrollTop();
            var lastDirect = 0;
            var scrollHeight = viewport.getScrollHeight();
            var lastScrollTop = 0;
            var wrapper = (util.platform.needSpecialScroll ? document.body : win);

            wrapper.addEventListener('touchstart',function(event){
                scrollTop = viewport.getScrollTop();
                scrollHeight = viewport.getScrollHeight();
            });

            function pagemove () {
                scrollTop = viewport.getScrollTop();
                scrollHeight = viewport.getScrollHeight();
                if (scrollTop > 0 && scrollTop < scrollHeight) {
                    if (lastScrollTop < scrollTop) {
                        // down
                        direct = 1;
                    }
                    else if (lastScrollTop > scrollTop) {
                        // up
                        direct = -1;
                    }
                    dist = lastScrollTop - scrollTop;
                    lastScrollTop = scrollTop;
                    if (dist > 10 || dist < -10) {
                        // 转向判断，暂时没用到，后续升级需要
                        lastDirect = dist/Math.abs(dist);
                        self.sendMessage('mipscroll', { 'direct': direct, 'dist': dist});
                    }
                }
            }
            wrapper.addEventListener('touchmove',function(event){
                pagemove();
            });
            wrapper.addEventListener('touchend',function(event){
                pagemove();
            });
        },

        /**
         * Agent all the links in iframe.
         * @private
         */ 
         _proxyLink: function () {
            var self = this;
            var regexp = /^http/;
            util.event.delegate(document, 'a', 'click', function (e) {
                if (!this.href) {
                    return;
                }
                // For mail、phone、market、app ...
                // Safari failed when iframed. So add the `target="_top"` to fix it.
                if (!regexp.test(this.href)) {
                    this.setAttribute('target', '_top');
                    return;
                }
                e.preventDefault();
                if (this.hasAttribute('mip-link')) {
                    var parent = this.parentNode;
                    self.sendMessage('loadiframe', {
                        'url': this.href,
                        'title': parent.getAttribute('title') || parent.innerText.trim().split('\n')[0],
                        'click': parent.getAttribute('data-click'),
                        'pageType': parent.getAttribute('pageType')
                    });
                }
                else {
                    self.sendMessage('mibm-jumplink', {
                        'url': this.href
                    });
                }
            }, false); 
        }
    };

    EventEmitter.mixin(viewer);

    return viewer;
});

