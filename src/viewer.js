/** 
 * viewer
 **/
define(['./components/platform', './components/document'], function (platform, doc) {
    'use strict';
    var Viewer = {
        isIframed: window !== top,
        init: function () {
            doc.ready(this.patchForIframe);
        },
        patchForIframe: function () {
            if (platform.needSpecialScroll) {
                document.documentElement.style.cssText = 'height: 100%; overflow: auto;';
                document.body.style.cssText = 'height: 100%; overflow: auto; position: relative;';
            }
            //页面传递消息给父页面
            window.parent.postMessage({
                event: 'mippageload',
                data: {
                    time: new Date().getTime()
                }
            }, '*');
        }
    };
    return Viewer;
});
