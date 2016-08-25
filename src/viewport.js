/**
 * 界面可视窗口模块，提供窗口各属性，以及窗口整体scroll、resize等事件接口
 **/
define(['./components/rect', './components/platform', './components/event', './util'], 
    function (rect, platform, Event, util) {
    'use strict';

    var docElem = document.documentElement;
    var win = window;
    var  Viewport = {
        getScrollTop: function () {
            return this._scrollTop = rect.getScrollTop();
        },
        getScrollLeft: function () {
            if (this._scrollLeft == null) {
                this._scrollLeft = rect.getScrollLeft();
            }
            return this._scrollLeft;
        },
        setScrollTop: function (top) {
            rect.setScrollTop(top);
        },
        getWidth: function () {
            return win.innerWidth || docElem.clientWidth;
        },
        getHeight: function () {
            return win.innerHeight || docElem.clientHeight;
        },
        getScrollWidth: function () {
            return rect.getScrollWidth();
        },
        getScrollHeight: function () {
            return rect.getScrollHeight();
        },
        getRect: function () {
            return rect.get(
                this.getScrollLeft(),
                this.getScrollTop(),
                this.getWidth(),
                this.getHeight());
        }
    };
    var _throttleChangeEvent;
    var _scrolling;
    var _init = function () {
        _throttleChangeEvent = util.fn.throttle(_changeEvent.bind(this), 20);
        win.addEventListener('scroll', _scrollEvent.bind(this), false);
        win.addEventListener('resize', _resizeEvent.bind(this), false);
        return this;
    };
    var _scrollEvent = function (event) {
        if (this.getScrollTop() < 0) {
            return;
        }
        if (!this._scrolling) {
            _scrolling = true;
            _throttleChangeEvent(event);
        }
        // trigger this.on('scroll', ...);
        this.trigger('scroll', event);
    };
    var _resizeEvent = function (event) {
        // trigger this.on('resize', ...)
        this.trigger('resize', event);
    };
    var _changeEvent = function (event, oldTop, oldTime) {
        var now = Date.now();
        var scrollTop = this.getScrollTop();
        if (Math.abs((oldTop - scrollTop) / (oldTime - now)) < 0.03) {
            _scrolling = false;
            this.trigger('changed', event, this.getRect());
        } else {
            _throttleChangeEvent(event, scrollTop, now);
        }
    };


    Event.mixin(Viewport);

    return _init.call(Viewport);
});
