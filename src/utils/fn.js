define(function (require) {
    'use strict';

    /**
     * Throttle a function.
     * @param {Function} fn
     * @param {number} delay The run time interval
     * @return {Function}
     */
    function throttle(fn, delay) {
        var context, args, timerId;
        var execTime = 0;
        !delay && (delay = 10);
        function exec() {
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
    }

    /**
     * Get all values of an object.
     * @param {Object} obj
     * @return {Array}
     */
    function values(obj) {
        var keys = Object.keys(obj);
        var length = keys.length;
        var ret = [];
        for (var i = 0; i < length; i++) {
            ret.push(obj[keys[i]]);
        }
        return ret;
    }

    /**
     * Return an object is a plain object or not.
     * @param {Object} obj
     * @return {boolean}
     */
    function isPlainObject(obj) {
        return !!obj && Object.getPrototypeOf(obj) == Object.prototype;
    }

    /**
     * Extend an object to another object.
     * @inner
     * @param {Object} target
     * @param {Object} source
     * @param {boolean} deep Extend deeply
     */
    function _extend(target, source, deep) {
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
    }

    /**
     * Extend some objects to an object.
     * @param {Object} target
     * @return {Object}
     */
    function extend(target) {
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
    }

    /**
     * Pick some attributes from an object.
     * @param {Object} obj
     * @return {Object}
     */
    function pick(obj/*, key1, key2 or [keys] */) {
        var keys = arguments[1];
        var result = {}; 
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
    }

    /**
     * If varible is string type
     *
     * @param {string} string params string
     * @return {boolean} whehter varible is string
     */
    function isString(string) {
        if (!string) {
            return false;
        }
        return Object.prototype.toString.call(string) === '[object String]';
    }

    /**
     * Empty a property
     *
     * @param {Object} obj object
     * @param {string} key key of object
     */
    function del(obj, key) {
        if (!obj || !obj[key]) {
            return;
        }
        try {
            delete obj[key];
        } catch (e) {
            obj[key] = undefined;
        }
    }

    return {
        throttle: throttle,
        values: values,
        extend: extend,
        pick: pick,
        isPlainObject: isPlainObject,
        isString: isString,
        del: del
    }
});
