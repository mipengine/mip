/**
 * 界面可视窗口模块，提供窗口各属性，以及窗口整体scroll、resize等事件接口
 **/
define(['./components/rect', './components/platform', './components/event', './util'], 
    function (rect, platform, Event, util) {

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
    var bindedChangeEvent;
    var init = function () {
        bindedChangeEvent = changeEvent.bind(this);
        (platform.needSpecialScroll ? document.body : win)
            .addEventListener('scroll', scrollEvent.bind(this), false);
        win.addEventListener('resize', resizeEvent.bind(this), false);
        return this;
    };
    var changing = false;
    var oldEvt = null;
    var oldTime, oldTop;
    var scrollEvent = function (event) {
        var scrollTop = this.getScrollTop();
        if (scrollTop < 0) {
            return;
        }
        var now = Date.now();
        // 每次都会强制算时间差，如果大于 20ms，立即计算是否 changeEnd，
        // PS: uc 在手指按住时不执行 timeout
        if (!changing || now - oldTime >= 20) {
            changing = true;
            bindedChangeEvent();
            oldTime = now;
            oldTop = scrollTop;
            oldEvt = event;
        }
        // trigger this.on('scroll', ...);
        this.trigger('scroll', event);
    };
    var resizeEvent = function (event) {
        // trigger this.on('resize', ...)
        this.trigger('resize', event);
    };
    var changeTimer = null;
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


    Event.mixin(Viewport);

    return init.call(Viewport);
});
