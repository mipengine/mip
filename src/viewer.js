define(function (require) {
    'use strict';

    var util = require('./util');
    var viewport = require('./viewport');
    var Gesture = util.Gesture;
    var css = util.css;
    var platform = util.platform;
    var EventAction = require('./utils/event-action');
    var EventEmitter = require('./utils/event-emitter');
    var fn = require('./utils/fn');

    /**
     * Save window.
     * @inner
     * @type {Object}
     */
    var win = window;

    var isInMIP2
    try {
        if (window.parent.MIP.version === '2') {
            isInMIP2 = true
        } else {
            isInMIP2 = false
        }
    } catch (e) {
        isInMIP2 = false
    }

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
            // handle preregistered  extensions
            this.handlePreregisteredExtensions();

            // add normal scroll class to body. except ios in iframe.
            // Patch for ios+iframe is default in mip.css
            if (!platform.needSpecialScroll) {
                document.documentElement.classList.add('mip-i-android-scroll');
                document.body.classList.add('mip-i-android-scroll');
            }

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

            // Force reload mainly for MIP2
            window.addEventListener('popstate', function (e) {
                // 在 SF 情况下 window.top 是跨域的，不操作即可
                try {
                    window.top.location.reload()
                } catch (e) {}
            })
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

            // Fix iphone 5s UC and ios 9 safari bug.
            // While the back button is clicked,
            // the cached page has some problems.
            // So we are forced to load the page in iphone 5s UC
            // and iOS 9 safari.
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

            // Framed by MIP2
            if (this.isIframed && isInMIP2) {
                window.parent.postMessage({
                    type: 'load-from-mip1'
                }, '*')
            }
        },

        /**
         * Send message to parent page.
         * @param {string} eventName
         * @param {Object} data Message body
         */
        sendMessage: function (eventName, data) {
            if (this.isIframed) {
                // When framed by MIP2, send message to SF (window.top) rather than MIP2 (window.parent)
                let target = isInMIP2 ? window.top : window.parent
                target.postMessage({
                    event: eventName,
                    data: data
                }, '*');
            }
        },

        /**
         * Setup event-action of viewer. To handle `on="tap:xxx"`.
         */
        setupEventAction: function () {
            var hasTouch = fn.hasTouch();
            var eventAction = this.eventAction = new EventAction();
            if (hasTouch) {
                // In mobile phone, bind Gesture-tap which listen to touchstart/touchend event
                /* istanbul ignore next */
                this._gesture.on('tap', function (event) {
                    eventAction.execute('tap', event.target, event);
                });
            } else {
                // In personal computer, bind click event, then trigger event. eg. `on=tap:sidebar.open`, when click, trigger open() function of #sidebar
                document.addEventListener('click', function (event) {
                    eventAction.execute('tap', event.target, event);
                }, false);
            }

            document.addEventListener('click', function (event) {
                eventAction.execute('click', event.target, event);
            }, false);

            /* istanbul ignore next */
            util.event.delegate(document, 'input', 'change', function (e) {
                eventAction.execute('change', event.target, event);
            });
        },

        /**
         * Setup event-action of viewer. To handle `on="tap:xxx"`.
         */
        handlePreregisteredExtensions: function () {
            window.MIP = window.MIP || {};
            window.MIP.push = function (extensions) {
                if (extensions && typeof extensions.func == 'function') {
                    extensions.func();
                }
            };
            var preregisteredExtensions = window.MIP.extensions;
            if (preregisteredExtensions && preregisteredExtensions.length) {
                for (var i = 0; i < preregisteredExtensions.length; i++) {
                    var curExtensionObj = preregisteredExtensions[i];
                    if (curExtensionObj && typeof curExtensionObj.func == 'function') {
                        curExtensionObj.func();
                    }
                }
            }
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
                else if (scrollTop === 0) {
                    self.sendMessage('mipscroll', { 'direct': 0 });
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
            var telRegexp = /^tel:/;
            util.event.delegate(document, 'a', 'click', function (e) {
                if (!this.href) {
                    return;
                }
                // For mail、phone、market、app ...
                // Safari failed when iframed. So add the `target="_top"` to fix it. except uc and tel.
                /* istanbul ignore next */
                if (platform.isUc() && telRegexp.test(this.href)) {
                    return;
                }
                if (!regexp.test(this.href)) {
                    this.setAttribute('target', '_top');
                    return;
                }
                e.preventDefault();
                if (this.hasAttribute('mip-link') || this.getAttribute('data-type') === 'mip') {
                    if (self.isIframed && isInMIP2) {
                        // Framed by standalone MIP2
                        // MIP2 framed by SF can also be dealt by sendMessage
                        if (window.parent.MIP.standalone) {
                            top.location.href = this.href
                            return
                        }
                    }

                    var message = self._getMessageData.call(this);
                    self.sendMessage(message.messageKey, message.messageData);
                } else {
                    // other jump through '_top'
                    top.location.href = this.href;
                }

            }, false);
        },
        /**
         * get alink postMessage data
         * @return {Object} messageData
         */
        _getMessageData: function () {
            var messageKey = 'loadiframe';
            var messageData = {};
            messageData.url = this.href;
            if (this.hasAttribute('mip-link')) {
                var parent = this.parentNode;
                messageData.title = parent.getAttribute('title') || parent.innerText.trim().split('\n')[0];
                messageData.click = parent.getAttribute('data-click');
            } else {
                messageData.title = this.getAttribute('data-title') || this.innerText.trim().split('\n')[0];
                messageData.click = this.getAttribute('data-click');
            }
            return {
                'messageKey': messageKey,
                'messageData': messageData
            };
        }
    };

    EventEmitter.mixin(viewer);

    return viewer;
});
