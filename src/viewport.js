define(function (require) {
    'use strict';

    var docElem = document.documentElement;
    var win = window;
    var util = require('util');
    var EventEmitter = require('util/event-emitter');
    var fixedElement = require('./fixed-element');
    var rect = util.rect;
    
    /**
     * The object is to solve a series of problems when the page in an iframe and
     * provide some additional methods.
     */
    var  viewport = {
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
            return rect.getScrollLeft();
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
    function init() {
        fixedElement.init();
        bindedChangeEvent = changeEvent.bind(this);
        (util.platform.needSpecialScroll ? document.body : win)
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
    function scrollEvent(event) {
        var scrollTop = this.getScrollTop();

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
    function resizeEvent(event) {
        this.trigger('resize', event);
    };
    var changeTimer = null;
    /**
     * To determine whether to trigger a change event
     */
    function changeEvent() {
        var now = Date.now();
        var delay = now - oldTime || 0;
        clearTimeout(changeTimer);
        if (delay && Math.abs((oldTop - this.getScrollTop()) / delay) < 0.03) {
            changing = false;
            this.trigger('changed', oldEvt, this.getRect());
        } else {
            changeTimer = setTimeout(bindedChangeEvent, delay >= 20 ? 20 : 20 - delay);
        }
    };

    // Mix the methods and attributes of Event into the viewport.
    EventEmitter.mixin(viewport);

    return init.call(viewport);
});
