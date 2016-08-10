/**
 * 一些功能 function
 * 后续看需求决定是否需要引入 underscore 或者 lodash
 **/
define(function () {
    'use strict';
    var throttle = function (fn, delay) {
        var context, args, timerId;
        var execTime = 0;
        !delay && (delay = 10);
        var exec = function () {
            timerId = 0;
            execTime = Date.now();
            fn.apply(context, args);
        };
        return function () {
            var delta = Date.now() - execTime;
            context = this;
            args = arguments;
            clearTimeout(timerId);
            if (delta >= delay) {
                exec();
            } else {
                timerId = setTimeout(exec, delay - delta);
            }
        }
    };

    var values = function (obj) {
        var keys = Object.keys(obj);
        var length = keys.length;
        var ret = Array(length);
        for (var i = 0; i < length; i++) {
            ret[i] = obj[keys[i]];
        }
        return ret;
    };

    return {
        throttle: throttle,
        values: values
    }
});
