define(function (require) {
    'use strict';

    var util = require('./util');
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
            this.patchForIframe();

            /**
             * The gesture of document.Used by the event-action of Viewer.
             * @private
             * @type {Gesture}
             */
            this._gesture = new Gesture(document, {
                preventX: false
            });

            // Tell parent page the current page is loaded.
            this.sendMessage('mippageload', {
                time: Date.now(),
                title: encodeURIComponent(document.title)
            });
            this.setupEventAction();
            this.aClick();
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
                if (platform.isUc()) {
                    css(document.body, 'transform', 'translate3d(0,0,0)');
                }
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
         * @param {string} name
         * @param {Function} handler
         */
        _bindEventCallback: function (name, handler) {
            if (name === 'show' && this.isShow && typeof handler === 'function') {
                handler.call(this, this._showTiming);
            }
        },

        /**
         * handle tag a
         */
        aClick: function() {
            if(this.isIframed) {
                var tagA = document.getElementsByTagName('a');
                var index = 0;
                var self = this;
                for(index = 0; index < tagA.length; index ++) {
                    tagA[index].addEventListener('click', function(event) {
                        event.preventDefault();
                        self.sendMessage('mibm-jumplink', {
                            'url': this.href
                        });
                    });
                }
            }
        }
    };

    EventEmitter.mixin(viewer);

    return viewer;
});

