define(function (require) {
    'use strict';

    var platform = require('../utils/platform').start();

    // Save the native object or method.
    var docBody = document.body;
    var docElem = document.documentElement;
    var round = Math.round;

    /**
     * When page in IOS-IFRAME, scroll and rect have some bugs.
     * So we need add some elements to solve this problem.
     * @inner
     * @param {boolean} isEnd Create a ending element or not.
     * @return {?HTMLElement}
     */
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
    }

    /**
     * Element for getting scroll values.
     * @inner
     * @type {HTMLElement}
     */
    var getterElement = patchForIOS();

    /**
     * Element for setting scroll values.
     * @inner
     * @type {HTMLElement}
     */
    var setterElement = patchForIOS();

    /**
     * Element for get page height.
     * @inner
     * @type {HTMLElement}
     */
    var endElement = patchForIOS(true);

    /**
     * Browsers have some bugs in frame of IOS, the native getBoundingClientRect() also needs to recalculate,
     * so increase the "this" module.
     */
    var rect= {

        /**
         * Get rect by left,top,width,height.
         * @param {number} left
         * @param {number} top
         * @param {number} width
         * @param {number} height
         * @return {Object}
         */
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

        /**
         * The scrollingElement
         * @type {HTMLElement}
         */
        scrollingElement: document.scrollingElement || (platform.isWebkit()
            && docBody) || docElem,

        /**
         * Get an element's rect.
         * @param {HTMLElement} element
         * @return {Object}
         */
        getElementRect: function (element) {
            var clientRect = element.getBoundingClientRect();
            return this.get(clientRect.left + this.getScrollLeft(), clientRect.top + this.getScrollTop(),
                 clientRect.width, clientRect.height);
        },
 
        /**
         * Get an element's offset.
         * @param {HTMLElement} element
         * @return {Object}
         */
        getElementOffset: function (element) {
            var clientRect = element.getBoundingClientRect();
            return {
                left: round(clientRect.left),
                top: round(clientRect.top),
                width: round(clientRect.width),
                height: round(clientRect.height)
            }
        },

        /**
         * Get scrollLeft
         * @return {number}
         */
        getScrollLeft: function () {
            return round(
                (getterElement && -getterElement.getBoundingClientRect().left) ||
                this.scrollingElement.scrollLeft || pageXOffset || 0);
        },

        /**
         * Get scrollTop
         * @return {number}
         */
        getScrollTop: function () {
            return round(
                (getterElement && -getterElement.getBoundingClientRect().top) ||
                this.scrollingElement.scrollTop || pageYOffset || 0);
        },

        /**
         * Set scrollTop
         * @param {number} top
         */
        setScrollTop: function (top) {
            if (setterElement) {
                setterElement.style.top = top + 'px';
                setterElement.scrollIntoView(true);
            } else {
                this.scrollingElement.scrollTop = top; 
            }
        },

        /**
         * Get scrollHeight
         * @return {number}
         */
        getScrollHeight: function () {
            if (endElement && endElement != docBody.lastElementChild) {
                docBody.appendChild(endElement);
            }
            return round(endElement ? endElement.offsetTop : this.scrollingElement.scrollHeight);
        },

        /**
         * Get scrollWidth.
         * @return {number}
         */
        getScrollWidth: function () {
            return window.innerWidth;
        },

        /**
         * Whether two rect object are overlapped.
         * @param {Object} rect1
         * @param {Object} rect2
         * @return {boolean}
         */
        overlapping: function (rect1, rect2) {
            return rect1.top <= rect2.bottom && rect2.top <= rect1.bottom
                && rect1.left <= rect2.right && rect2.left <= rect1.right;
        }
    };
    return rect;
});

