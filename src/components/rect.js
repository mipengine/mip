define(['./platform'], function (platform) {
    'use strict';
    var round = Math.round;
    var patchForIOS = function (isEnd) {
        if (platform.needSpecialScroll && window !== top) {
            var element = document.createElement('div');
            element.style.cssText = isEnd ?
                'position:absolute;width:0;height:0;visibility:hidden;' :
                'position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;';
            document.body.appendChild(element);
            return element;
        }
        return null;
    };

    // Browsers have some bugs in frame of IOS, the native getBoundingClientRect() also needs to recalculate,
    // so increase the "Rect" module.
    var Rect = {    
        get: function (left, top, width, height) {
            left = round(left);
            top = round(top);
            width = round(width);
            height = round(height);
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
        getterElement: patchForIOS(),
        setterElement: patchForIOS(),
        endElement: patchForIOS(true),
        getDomRect: function (element) {
            var clientRect = element.getBoundingClientRect();
            return Rect.get(clientRect.left + Rect.getScrollLeft(), clientRect.top + Rect.getScrollTop(),
                 clientRect.width, clientRect.height);
        },
        getDomOffset: function (element) {
            var clientRect = element.getBoundingClientRect();
            return {
                left: round(clientRect.left),
                top: round(clientRect.top),
                width: round(clientRect.width),
                height: round(clientRect.height)
            }
        },
        getScrollLeft: function () {
            return round(Rect.scrollingElement.scrollLeft || pageXOffset ||
                (Rect.getterElement && -Rect.getterElement.getBoundingClientRect().left) || 0);
        },
        getScrollTop: function () {
            return round(Rect.scrollingElement.scrollTop || pageYOffset ||
                (Rect.getterElement && -Rect.getterElement.getBoundingClientRect().top) || 0);
        },
        setScrollTop: function (top) {
            var ele;
            if (ele = Rect.setterElement) {
                ele.style.top = top + 'px';
                ele.scrollIntoView(true);
            }
        },
        getScrollHeight: function () {
            return round(Rect.endElement ? Rect.endElement.offsetTop : Rect.scrollingElement.scrollHeight);
        },
        getScrollWidth: function () {
            return window.innerWidth;
        },
        overlapping: function (rect1, rect2) {
            return rect1.top <= rect2.bottom && rect2.top <= rect1.bottom
                && rect1.left <= rect2.right && rect2.left <= rect1.right;
        }
    };
    return Rect;
});

