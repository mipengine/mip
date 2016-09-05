/** 
 * viewer
 **/
define(['./components/platform', './components/event', './components/css', './components/event-action',
    './components/gesture'], function (platform, Event, css, EventAction, Gesture) {
    'use strict';
    var win = window;
    var Viewer = {
        init: function () {
            this.patchForIframe();
            this._gesture = new Gesture(document, {
                preventX: false
            });
            this.sendMessage('mippageload', {
                time: Date.now(),
                title: encodeURIComponent(document.title)
            });
            this.setupEventAction();
        },
        isIframed: win !== top,
        patchForIframe: function () {
            if (platform.needSpecialScroll) {
                css([document.documentElement, document.body], {
                    height: '100%',
                    overflow: 'auto'
                });
                css(document.body, 'position', 'relative');
            }
        },
        show: function () {
            // 显示 body
            css(document.body, {
                'opacity': 1,
                'animation': 'none'
            });
            this.trigger('load', Date.now());
        },
        sendMessage: function (eventName, data) {
            if (this.isIframed) {
                window.parent.postMessage({
                    event: eventName,
                    data: data
                }, '*');
            }
        },
        setupEventAction: function () {
            var eventAction = this.eventAction = new EventAction();
            this._gesture.on('tap', function (event) {
                eventAction.excute('tap', event.target, event);
            });
        }
    };

    Event.mixin(Viewer);

    return Viewer;
});

