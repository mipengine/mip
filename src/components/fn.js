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

    var likeArray = function (obj) {
        return obj && (+obj.length === obj.length) && ((obj.length - 1) in obj);
    };

    var isPlainObject = function (obj) {
        return obj && Object.getPrototypeOf(obj) == Object.prototype;
    };

    var _extend = function (target, source, deep) {
        for (var key in source) {
            if (deep) {
                if (isPlainObject(source[key])) {
                    !isPlainObject(target[key]) && (target[key] = {});
                } else if (Array.isArray(source[key])) {
                    !Array.isArray(target[key]) && (target[key] = []); 
                } else {
                    source[key] !== undefined && (target[key] = source[key]);
                    continue;
                }
                _extend(target[key], source[key], deep);
            } else if (source[key] !== undefined) {
                target[key] = source[key];
            }
        }
    };
    var extend = function (target) {
        var hasDeep = typeof target === 'boolean';
        var deep = false;
        if (hasDeep) {
            deep = target;
            target = arguments[1];
        }
        for (var i = hasDeep ? 2 : 1; i < arguments.length; i++) {
            _extend(target, arguments[i], deep);
        }
        return target;
    };

    var pick = function (obj/*, key1, key2 or [keys] */) {
        var keys = arguments[1];
        var result = [];
        if (!Array.isArray(keys)) {
            keys = Array.prototype.slice.call(arguments, 1); 
        }
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key in obj) {
                result[key] = obj[key];
            }
        }
        return result;
    };

    return {
        throttle: throttle,
        values: values,
        extend: extend,
        pick: pick,
        isPlainObject: isPlainObject
    }
});
