/**
 * @file MIP 视图相关方法集合
 * @author MIP <mip-support@baidu.com>, xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var util = require('./util');
    var EventEmitter = require('./utils/event-emitter');
    var fixedElement = require('./fixed-element');
    var rect = util.rect;

    // Native objects.
    var docElem = document.documentElement;
    var win = window;

    /**
     * The object is to solve a series of problems when the page in an iframe and
     * provide some additional methods.
     */
    var viewport = {

        /**
         * Get the current vertical position of the page
         *
         * @return {number}
         */
        getScrollTop: function () {
            return rect.getScrollTop();
        },

        /**
         * Get the current horizontal position of the page
         *
         * @return {number}
         */
        getScrollLeft: function () {
            return rect.getScrollLeft();
        },

        /**
         * Set the current vertical position of the page
         *
         * @param {number} top The target scrollTop
         */
        setScrollTop: function (top) {
            rect.setScrollTop(top);
        },

        /**
         * Get the width of the viewport
         *
         * @return {number}
         */
        getWidth: function () {
            return win.innerWidth || docElem.clientWidth;
        },

        /**
         * Get the height of the viewport
         *
         * @return {number}
         */
        getHeight: function () {
            return win.innerHeight || docElem.clientHeight;
        },

        /**
         * Get the scroll width of the page
         *
         * @return {number}
         */
        getScrollWidth: function () {
            return rect.getScrollWidth();
        },

        /**
         * Get the scroll height of the page
         *
         * @return {number}
         */
        getScrollHeight: function () {
            return rect.getScrollHeight();
        },

        /**
         * Get the rect of the viewport.
         *
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

    /**
     * 触发 scroll 事件
     */
    var scrollEvent = util.fn.throttle(function (event) {
        this.trigger('scroll', event);
    }, 1000 / 60);

    /**
     * 触发 changed 事件
     */
    var changedEvent = util.fn.throttle(function (event) {
        this.trigger('changed', event);
    }, 200);

    /**
     * 滚动事件回调
     *
     * @param {Object} event 事件对象
     */
    var scrollHandle = function (event) {
        scrollEvent.call(this, event);
        changedEvent.call(this, event);
    };

    /**
     * 窗口改变事件回调
     *
     * @param {Object} event 事件对象
     */
    var resizeEvent = util.fn.throttle(function (event) {
        this.trigger('resize', event);
    }, 200);

    /**
     * Initialize the viewport
     *
     * @return {Viewport}
     */
    function init() {
        fixedElement.init();
        (util.platform.needSpecialScroll ? document.body : win)
            .addEventListener('scroll', scrollHandle.bind(this), false);

        win.addEventListener('resize', resizeEvent.bind(this));

        return this;
    }

    // Mix the methods and attributes of Event into the viewport.
    EventEmitter.mixin(viewport);

    return init.call(viewport);
});
