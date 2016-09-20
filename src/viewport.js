define(['./components/rect', './components/platform', './components/event', './components/fixedElement', './util'], 
    function (rect, platform, Event, fixedElement, util) {
    'use strict';

    var docElem = document.documentElement;
    var win = window;
    
    /**
     * The object is to solve a series of problems when the page in an iframe and
     * provide some additional methods.
     */
    var  Viewport = {
        /**
         * Get the current vertical position of the page
         * @return {number}
         */
        getScrollTop: function () {
            return rect.getScrollTop();
        },
        /**
         * Get the current horizontal position of the page
         * @return {number}
         */
        getScrollLeft: function () {
            if (this._scrollLeft == null) {
                this._scrollLeft = rect.getScrollLeft();
            }
            return this._scrollLeft;
        },
        /**
         * Set the current vertical position of the page
         * @param {number} top The target scrollTop
         */
        setScrollTop: function (top) {
            rect.setScrollTop(top);
        },
        /**
         * Get the width of the viewport
         * @return {number}
         */
        getWidth: function () {
            return win.innerWidth || docElem.clientWidth;
        },
        /**
         * Get the height of the viewport
         * @return {number}
         */
        getHeight: function () {
            return win.innerHeight || docElem.clientHeight;
        },
        /**
         * Get the scroll width of the page
         * @return {number}
         */
        getScrollWidth: function () {
            return rect.getScrollWidth();
        },
        /**
         * Get the scroll height of the page
         * @return {number}
         */
        getScrollHeight: function () {
            return rect.getScrollHeight();
        },
        /**
         * Get the rect of the viewport.
         * @return {Object}
         */
        getRect: function () {
            return rect.get(
                this.getScrollLeft(),
                this.getScrollTop(),
                this.getWidth(),
                this.getHeight());
        }
    };
    var bindedChangeEvent;
    /**
     * Initialize the viewport
     * @return {Viewport}
     */
    var init = function () {
        // deal width fixed element
        fixedElement.init();
        bindedChangeEvent = changeEvent.bind(this);
        (platform.needSpecialScroll ? document.body : win)
            .addEventListener('scroll', scrollEvent.bind(this), false);
        win.addEventListener('resize', resizeEvent.bind(this), false);
        return this;
    };
    var changing = false;
    var oldEvt = null;
    var oldTime, oldTop;
    /**
     * The scroll handler
     * @param {Event} event
     */
    var scrollEvent = function (event) {
        var scrollTop = this.getScrollTop();
        if (scrollTop < 0) {
            return;
        }
        var now = Date.now();
        // If the delta time >= 20ms, immediately calculate whether to trigger changed
        // PS: UC browser does not dispatch the scroll event, when the finger is pressed.
        if (!changing || now - oldTime >= 20) {
            changing = true;
            bindedChangeEvent();
            oldTime = now;
            oldTop = scrollTop;
            oldEvt = event;
        }
        this.trigger('scroll', event);
    };
    var resizeEvent = function (event) {
        this.trigger('resize', event);
    };
    var changeTimer = null;
    /**
     * To determine whether to trigger a change event
     */
    var changeEvent = function () {
        var now = Date.now();
        var delay = oldTime - now || 0;
        clearTimeout(changeTimer);
        if (delay && Math.abs((oldTop - this.getScrollTop()) / delay) < 0.03) {
            changing = false;
            this.trigger('changed', oldEvt, this.getRect());
        } else {
            changeTimer = setTimeout(bindedChangeEvent, delay >= 20 ? 20 - delay : 20);
        }
    };

    // Mix the methods and attributes of Event into the viewport.
    Event.mixin(Viewport);

    return init.call(Viewport);
});
