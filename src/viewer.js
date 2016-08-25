/** 
 * viewer
 **/
define(['./components/platform', './components/event', './components/css'], function (platform, Event, css) {
    'use strict';
    var win = window;
    var Viewer = {
        init: function () {
            this.patchForIframe();
            this.sendMessage('mippageload', {
                time: Date.now()
            });
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
            //显示 body
            css(document.body, {
                'opacity': 1,
                'animation': 'none',
                '-webkit-animation': 'none',
                '-moz-animation': 'none',
                '-ms-animation': 'none'
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
        }
    };

    Event.mixin(Viewer);

    return Viewer;
});

