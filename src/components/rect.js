define(['./platform'], function (platform) {
    'use strict';
    var patchForIOS = function () {
        if (platform.needSpecialScroll && window !== top) {
            var element = document.createElement('div');
            element.style.cssText = 'position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;';
            return document.body.appendChild(element);
        }
        return null;
    };

    
    var Rect = {
        get: function (left, top, width, height) {
            return {
                left: left,
                top: top,
                width: width,
                height: height,
                right: left + width,
                bottom: top + height
            }
        },
        scrollingElement: document.scrollingElement || (document.body && platform.isWebkit() 
            && document.body) || document.documentElement,
        trickyElement: patchForIOS(),
        getFromDom: function (element) {
            var clientRect = element.getBoundingClientRect();
            return Rect.get(clientRect.left + Rect.getScrollLeft(), clientRect.top + Rect.getScrollTop(),
                 clientRect.width, clientRect.height);
        },
        getScrollLeft: function () {
            return Rect.scrollingElement.scrollLeft || pageXOffset ||
                (Rect.trickyElement && -Rect.trickyElement.getBoundingClientRect().left) || 0;
        },
        getScrollTop: function () {
            return Rect.scrollingElement.scrollTop || pageYOffset ||
                (Rect.trickyElement && -Rect.trickyElement.getBoundingClientRect().top) || 0;
        },
        overlapping: function (rect1, rect2) {
            return rect1.top <= rect2.bottom && rect2.top <= rect1.bottom 
                && rect1.left <= rect2.right && rect2.left <= rect1.right;
        }
    }
    return Rect;
});
