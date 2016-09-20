/**
 * @fileOverview: naboo framework core code
 * @author: zhulei05
 * @email: zhulei05@baidu.com
 * @version 1.0
 * @copyright 2015 Baidu.com, Inc. All Rights Reserved
 */

(function (window, factory) {
    if (typeof define === 'function' && define.amd) {    
        define(factory);
    } else {
        window.Naboo = factory();
    }
})(this, function () {
    
    function Naboo() {
        this.steps = [];
        this._index = -1;
        this._handlers = {};
    }

    Naboo.prototype.start = function (fn) {
        if (fn) {
            this.on('end', fn);
        }
        this.trigger('start');
        this.next();
    };

    Naboo.prototype.next = function () {
        this._index++;
        if (this._index >= this.steps.length) {
            this.trigger('end');
        }
        else {
            var currentStep = this.steps[this._index];
            currentStep.call(this);
        }
    };

    Naboo.prototype.cancel = function () {
        this._index = this.steps.length;
    };

    // 事件机制 - 绑定
    Naboo.prototype.on = function (name, fn) {
        this._handlers[name] || (this._handlers[name] = []);
        this._handlers[name].push(fn);
    };

    // 事件机制 - 解绑
    Naboo.prototype.off = function (name, fn) {
        if (!name) {
            this._handlers = {};
        }
        else {
            var handlers = this._handlers[name];
            if (!fn) {
                this._handlers[name] = [];
            }
            else if (Object.prototype.toString.call(handlers) === '[object Array]') {
                for (var i = 0, len = handlers.length; i < len; i++) {
                    if (handlers[i] === fn) {
                        break;
                    }
                }
                this._handlers[name].splice(i, 1);
            }
        }
    };

    // 事件机制 - 触发
    Naboo.prototype.trigger = function (name, data) {
        var handlers = this._handlers[name];
        if (handlers) {
            handlers.forEach(function (fn, i) {
                fn.call(null, data);
            });
        }
    };

    // 插件注册函数
    Naboo.register = function (name, fn) {
        Naboo[name] = function () {
            var ret = new Naboo();
            ret[name].apply(ret, arguments);
            return ret;
        };
        Naboo.prototype[name] = function () {
            var args = Array.prototype.slice.call(arguments, 0);
            args.unshift(this.next.bind(this));
            this.steps.push(function () {
                fn.apply(this, args);
            });
            return this;
        };
    }

    // 注册并行动画函数 p 
    // 使用方法 Naboo.p() 或者 Naboo.xxx().p()
    Naboo.register('p', function (next) {
        var args = Array.prototype.slice.call(arguments, 1);
        var n = args.length;
        args.forEach(function (naboo) {
            naboo.start(function () {
                n--;
                if (n === 0) {
                    next();
                }
            });
        });
    });

    return Naboo;
});

