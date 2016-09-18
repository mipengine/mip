/*
 * @file scroll.js
 * @author lilangbo
 * @note 对原生scroll简单封装,适合baidu结果页使用
 */

define(function () {

    var Scroll = function (el, opt) {
        if (!el) {
            return;
        };
        var me = this;
        me.el = el;
        //var ele = el || '';
        me.options = opt || {};
        me._events = {};
        //fixed uc左右横滑默认回退前进
        me.control = navigator.control || {};
        //me.imgHandle = false;
        //可后续扩展
        /*me.options = $.extend({
         }, opt);*/
        var $wapper = $(me.el);
        $wapper.children().eq(0).wrap('<div class="mip-tabs-scroll-touch"></div>');
        // UC浏览器对overflow-x兼容性太差,只能用元素占位的方式来解决
        if ($wapper.children().eq(1).hasClass('mip-tabs-nav-toggle')) {
            $wapper.find('.mip-tabs-nav').append(
                '<div class="mip-tabs-nav-toggle-holder"></div>'
            );
        }

        var timeout = me.options.timeout || 300;
        if (typeof me.el === 'string') {
            me.el = document.querySelector(el);
        }
        if (!(me.el  instanceof HTMLElement)) {
            throw Error('parameter 1 is not of type Element or valid string');
        }
        var scrollEndCb = me.options.scrollEnd || function () {};

        var direcObj = {};
        me.el.addEventListener('touchstart', function (e) {
            if (me.control.gesture) {
                me.control.gesture(false);
            }

            direcObj.sx = e.touches[0].clientX;
            direcObj.ex = e.touches[0].clientX;
            direcObj.sy = e.touches[0].clientY;
        });
        me.el.addEventListener('touchmove', function (e) {
            direcObj.ex = e.touches[0].clientX;
            direcObj.ey = e.touches[0].clientY;
        });
        me.el.addEventListener('touchend', function (e) {
            /**
             * 只考虑横滑,纵向滑动忽略
             * **/
            if (me.control.gesture) {
                me.control.gesture(true);
            }
            if (Math.abs(direcObj.ex - direcObj.sx) > 30) {
                me._execEvent('scrollEnd');
            }
        });
    };


    /**
     * 尽量与原来接口一致,降低迁移成本
     * @param {String|Object} el 滑动DOM节点选择字符串或节点
     * @param {Object} options 配置项
     * **/
    Scroll.prototype = {
        on: function (type, fn) {
            if(!this._events){
                return;
            }
            if ( !this._events[type] ) {
                this._events[type] = [];
            }
            this._events[type].push(fn);
        },

        off: function (type, fn) {
            if(!this._events){
                return;
            }
            if ( !this._events[type] ) {
                return;
            }
            var index = this._events[type].indexOf(fn);
            if ( index > -1 ) {
                this._events[type].splice(index, 1);
            }
        },
        _execEvent: function (type) {
            if ( !this._events[type] ) {
                return;
            }
            var i = 0,
                l = this._events[type].length;
            if ( !l ) {
                return;
            }
            for ( ; i < l; i++ ) {
                this._events[type][i].apply(this, [].slice.call(arguments, 1));
            }
        },
        refresh: function () {
        }
    };

    return Scroll;
});
