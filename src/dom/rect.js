define(function (require) {
    'use strict';

    var platform = require('../util/platform');
    var docBody = document.body;
    var docElem = document.documentElement;

    var round = Math.round;
    function patchForIOS(isEnd) {
        if (platform.needSpecialScroll && window !== top) {
            var element = document.createElement('div');
            element.style.cssText = isEnd ?
                'position:absolute;width:0;height:0;visibility:hidden;' :
                'position:absolute;top:0;left:0;width:0;height:0;visibility:hidden;';
            docBody.appendChild(element);
            return element;
        }
        return null;
    };

    // Browsers have some bugs in frame of IOS, the native getBoundingClientRect() also needs to recalculate,
    // so increase the "this" module.
    var rect= {    
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
        scrollingElement: document.scrollingElement || (platform.isWebkit()
            && docBody) || docElem,
        getterElement: patchForIOS(),
        setterElement: patchForIOS(),
        endElement: patchForIOS(true),
        getDomRect: function (element) {
            var clientRect = element.getBoundingClientRect();
            return this.get(clientRect.left + this.getScrollLeft(), clientRect.top + this.getScrollTop(),
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
            return round(
                (this.getterElement && -this.getterElement.getBoundingClientRect().left) ||
                this.scrollingElement.scrollLeft || pageXOffset || 0);
        },
        getScrollTop: function () {
            return round(
                (this.getterElement && -this.getterElement.getBoundingClientRect().top) ||
                this.scrollingElement.scrollTop || pageYOffset || 0);
        },
        setScrollTop: function (top) {
            var ele;
            if (ele = this.setterElement) {
                ele.style.top = top + 'px';
                ele.scrollIntoView(true);
            } else {
                this.scrollingElement.scrollTop = top; 
            }
        },
        getScrollHeight: function () {
            var endElement = this.endElement;
            if (endElement && endElement != docBody.lastElementChild) {
                docBody.appendChild(endElement);
            }
            return round(endElement ? endElement.offsetTop : this.scrollingElement.scrollHeight);
        },
        getScrollWidth: function () {
            return window.innerWidth;
        },
        overlapping: function (rect1, rect2) {
            return rect1.top <= rect2.bottom && rect2.top <= rect1.bottom
                && rect1.left <= rect2.right && rect2.left <= rect1.right;
        }
    };
    return rect;
});

