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

    /**
     * if window has Touch event(is mobile) or not (is PC)
     *
     * @return {boolean} if window has Touch event(is mobile) or not (is PC)
     */
    function hasTouch() {
        return ('ontouchstart' in window
            || (window.navigator.maxTouchPoints !== undefined && window.navigator.maxTouchPoints > 0)
            || window.DocumentTouch !== undefined);
    }

    /**
     * Whether pageUrl is mip cache url.
     *
     * @param {string} pageUrl - current page url.
     * @return {Boolean} isCacheUrl.
     */
    function isCacheUrl(pageUrl) {
        return /mipcache.bdstatic.com/.test(pageUrl)
                    ||  /^(\/\/|http:\/\/|https:\/\/)[A-Za-z0-9]{1,}-.*.mipcdn.com\/c\//.test(pageUrl);
    }

    /**
     * Make height transiton for element that has unknown height.
     * height transiton from 0px/40px to whatever height element will be.
     *
     * @param  {Object} opt
     * @example
     * {
     *     "ele": document.getElementById('id1'), // target DOM
     *     "type": "fold",                  // "fold" or "unfold"
     *     "transitionTime": "0.3",         // seconds, animation time
     *     "tarHeight": "140px",            // DOM height when animation ends
     *     "oriHeight": "20px",             // DOM height when animation begins
     *     "cbFun": function() {}.bind()    //callback, exec after animation
     * }
     */
    function heightAni(opt) {
        var element = opt.ele;
        var type = opt.type;

        if (!type || !element) {
            return;
        }

        var transitionTime = opt.transitionTime || 0.3;
        // use ?: to make sure oriHeight won't be rewrite when opt.oriHeight is set to 0
        var oriHeight = (opt.oriHeight != undefined ? opt.oriHeight : getComputedStyle(element).height);
        var tarHeight;
        var cbFun = opt.cbFun || function () {};

        if (type === 'unfold') {
            
            // make sure tarHeight won't be rewrite when opt.tarHeight is set to 0
            if (opt.tarHeight != undefined) {
                tarHeight = opt.tarHeight;
            } else {
                // before set height to auto, remove animation.
                // or bad animation happens in iphone 4s
                element.style.transition = 'height 0s';
                element.style.height = 'auto';
                tarHeight = getComputedStyle(element).height;
            }

            // set height to auto after transition,
            // in case of height change of inside element later.
            setTimeout(function () {
                // before set height to auto, remove animation.
                // or bad animation happens in iphone 4s
                element.style.transition = 'height 0s';
                element.style.height = 'auto';
            }, transitionTime * 1000);
        }
        else if (type === 'fold') {
            tarHeight = opt.tarHeight || 0;
        }
        
        element.style.height = oriHeight;
        // now start the animation
        setTimeout(function () {
            element.style.transition = 'height ' + transitionTime + 's';
            // XXX: in setTimeout, or there won't be any animation
            element.style.height = tarHeight;
        }, 10);
        // after transition, exec callback functions
        setTimeout(function () {
            cbFun();
        }, transitionTime * 1000);
    }

    return {
        throttle: throttle,
        values: values,
        extend: extend,
        pick: pick,
        isPlainObject: isPlainObject,
        isString: isString,
        del: del,
        hasTouch: hasTouch,
        isCacheUrl: isCacheUrl,
        heightAni: heightAni
    }
});
