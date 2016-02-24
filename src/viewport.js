define(function(){

    /**
        界面可视窗口模块，提供窗口各属性，以及窗口整体scroll、resize等事件接口
    */
    var Viewport = {};

    /**
        Viewer对象，用于做父页面和子页面的通信代理
    */
    var viewer  = null;

    var _scrollTop = null,
        _scrollLeft = null,
        _size = null,
        _scrollCount = 0,
        _scrollTracking = false,
        _swapTracking = false,
        _isViewportNormal = true,
        _changeObservable = require('observable'),
        _scrollObservable = require('observable'),
        _touchObservable = require('observable');

    var gesture = require('gesture');

    gesture.init();

    Viewport.getTop = function() {
        return this.getScrollTop();
    };

    Viewport.getScrollTop = function() {
        _scrollTop = $(window).scrollTop();
        return _scrollTop;
    };

    Viewport.getScrollLeft = function() {
        if(_scrollLeft == null) {
            _scrollLeft = $(window).scrollLeft();
        }
        return _scrollLeft;
    };

    /**
     *  
     * */
    Viewport.setScrollTop = function(scrollPos) {
        _scrollTop = null;
        $(window).scrollTop(scrollPos);
    };

    /**
     * Returns the size of the viewport.
     * @return {!{width: number, height: number}}
    */
    Viewport.getSize = function() {
        if (_size) {
            return _size;
        }
        return _size = {
            "width" : $(window).width(),
            "height" : $(window).height()
        };
    };

    Viewport.getWidth = function() {
        return this.getSize().width;
    };

    Viewport.getScrollWidth = function() {
        return _getScrollingElement.scrollWidth;
    };

    Viewport.onChanged = function(handler) {
        return _changeObservable.add(handler);
    };

    Viewport.onScroll = function(handler) {
        return _scrollObservable.add(handler);
    };

    Viewport.onTouch = function(handler) {
        return _touchObservable.add(handler);
    }

    Viewport.resetTouchZoom = function(){
        var windowHeight = window.innerHeight;
        var documentHeight = window.document.documentElement.clientHeight;
        
        if(windowHeight && documentHeight && windowHeight === documentHeight) {
            return;
        }

        if(disableTouchZoom()) {
            //restore touch zoom
        }

    };

    Viewport.disableTouchZoom = function() {
        var viewportMeta = _getViewportMeta();
    };

    Viewport.setViewportNormal = function(flag) {
        _isViewportNormal = flag;
    };

    function _touch(evt, data) {
         if(_isViewportNormal) {
            //正常浏览时执行
            //此处应该调用recognizeGesture来识别
            _recognizeGesture(evt, data);
         } else {
            //图片浏览、全屏视频播放时，不触发viewport的touch
            return;
         }
    }

    function _recognizeGesture(evt, data) {


        if(typeof data === "object") {
            var eventType = data.event;

            switch(eventType) {
                case "touchstart" :
                    window.parent.postMessage(data,'*');
                    break;
                case "touchmove" :

                    if (Math.abs(data.x) > 15 && Math.abs(data.x/data.y) >= 3 && !_scrollTracking ) {
                        evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                        _swapTracking = true;
                        window.parent.postMessage(data,'*');
                    } else if(Math.abs(data.y/data.x) >= 3 && !_swapTracking) {
                        _scrollTracking = true; 
                    }
                    if(data.y != 0 && _swapTracking) {
                        evt.preventDefault && evt.preventDefault();
                        evt.stopPropagation && evt.stopPropagation();
                    }
                    break;
                case "touchend" :
                    window.parent.postMessage(data,'*');
                    _swapTracking = false;
                    _scrollTracking = false;
                    break;
            } 
        }
    }

    function _changed() {
        var size = Viewport.getSize();
        var scrollTop = Viewport.getScrollTop();
        _changeObservable.fire({
            top: scrollTop,
            width: size.width,
            height: size.height
        });
    }

    function _getScrollingElement() {
        var doc = this.win.document;
        if (doc.scrollingElement) {
          return doc.scrollingElement;
        }
        if (doc.body) {
          return doc.body;
        }
        return doc.documentElement;
    }

    /**
     *  触发scroll，并向observerfire事件
     * */
    function _scroll() {

        _scrollCount ++;
        _scrollObservable.fire();
        _scrollLeft = Viewport.getScrollLeft();
        
        /*
        if(_scrollTracking) {
            return;
        }
        */

        var newScrollTop = Viewport.getScrollTop();
        if(newScrollTop < 0) {
            return;
        }

        //正在进行scroll，scrollTracking设为true
        //TODO 
        //计算滚动速度，速度为0的时候，
        //_scrollTracking = true;
        _scrollTop = newScrollTop;

    }

    Viewport.hasScrolled = function() {
        return _scrollCount > 0;
    };

    function _init() {
        $(window).on("scroll",_scroll);
        
        if (window.parent !== window && platform.needSpecialScroll) {
            $('body').on('scroll', _scroll);
        }
        gesture.bind(_touch);
        return Viewport;
    }

    return _init();

});
