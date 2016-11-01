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
        window.Spark = factory();
    }
})(this, function () {
    // 动画工具集
    var Spark = {};

    // css3动画
    /**
 * @fileOverview 工具集之css3动画（animation + transition）
 * @author: zhulei05
 * @email: zhulei05@baidu.com
 */

(function () {
    // 定义一批检测浏览器特性需要的变量
    var prefix = '';
    var eventPrefix;
    var vendors = {
        Webkit: 'webkit',
        Moz: '',
        O: 'o'
    };
    var testEl = document.createElement('div');
    var supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
    var isNaN = Number.isNaN || window.isNaN;
    var transform;
    var transitionProperty;
    var transitionDuration;
    var transitionTiming;
    var transitionDelay;
    var animationName;
    var animationDuration;
    var animationTiming;
    var animationDelay;
    var animationFillMode;
    var transitionEnd;
    var animationEnd;

    function dasherize(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }

    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase();
    }

    // 检测浏览器特性
    if (testEl.style.transform === undefined) {
        for (var prop in vendors) {
            if (testEl.style[prop + 'TransitionProperty'] !== undefined) {
                prefix = '-' + prop.toLowerCase() + '-';
                eventPrefix = vendors[prop];
                break;
            }
        }
    }

    // css tranform属性名
    transform = prefix + 'transform';

    // css transition各属性名
    transitionProperty = prefix + 'transition-property';
    transitionDuration = prefix + 'transition-duration';
    transitionDelay = prefix + 'transition-delay';
    transitionTiming = prefix + 'transition-timing-function';
    transitionEnd = normalizeEvent('TransitionEnd');

    // css animation各属性名
    animationName = prefix + 'animation-name';
    animationDuration = prefix + 'animation-duration';
    animationDelay = prefix + 'animation-delay';
    animationTiming = prefix + 'animation-timing-function';
    animationFillMode = prefix + 'animation-fill-mode';
    animationEnd = normalizeEvent('AnimationEnd');

    // 动画完成后清空设置
    var cssReset = {};
    cssReset[transitionProperty] = '';
    cssReset[transitionDuration] = '';
    cssReset[transitionDelay] = '';
    cssReset[transitionTiming] = '';
    cssReset[animationName] = '';
    cssReset[animationDuration] = '';
    cssReset[animationDelay] = '';
    cssReset[animationTiming] = '';

    // 是否不支持transition
    var off = eventPrefix === undefined && testEl.style.transitionProperty === undefined;

    /**
     * 各种缓动函数
     *
     * 如果有需求，可以通过 cubic-bezier 添加更多类型
     *
     * @type {Object}
     */
    var timing = {
        'linear': 'linear',
        'ease': 'ease',
        'ease-in': 'ease-in',
        'ease-out': 'ease-out',
        'ease-in-out': 'ease-in-out'
    };

    // 获取keyframes的动画名字的正则
    var keyFrameReg = /^@(?:-webkit-)?keyframes\s+(?:['"])?(\w+)(?:['"])?\s*{/;

    /**
     * 设置dom对象的css
     *
     * 实现方法同zepto的css
     *
     * @param {Object} dom 要设置css的dom节点
     * @param {Object} obj 存放css信息的对象
     */
    function setCss(dom, obj) {
        var css = '';

        for (key in obj) {
            if (!obj[key] && obj[key] !== 0) {
                dom.style.removeProperty(dasherize(key));
            }
            else {
                css += dasherize(key) + ':' + obj[key] + ';';
            }
        }

        dom.style.cssText += ';' + css;
    }

    /**
     * 判断一个css属性是否需要px单位
     *
     * @param  {String} prop 属性名
     *
     * @return {Boolean}     true表示需要，false表示不需要
     */
    function needPx(prop) {
        if (prop.indexOf('translate') > -1) {
            return true;
        }
        testEl.style[prop] = 0;
        if (testEl.style[prop].replace(/\d/g, '') === 'px') {
            return true;
        }
        return false;
    }

    /**
     * css3动画函数，供插件开发者调用
     *
     * @param  {Object}   dom      要进行动画的dom对象
     * @param  {Object | String}   property   要改变的css属性键值对或者keyframes字符串
     * @param  {Number}   duration 动画执行时间
     * @param  {String}   ease     缓动函数
     * @param  {Number}   delay    延迟时间
     * @param  {Function} cb       动画完成后的回调函数
     *
     * @return {Undefined}         
     */
    Spark.css3 = function (dom, property, duration, ease, delay, cb) {
        if (dom && property) {
            if (off) {
                duration = 0;
            }
            else {
                // 动画时长默认值2，单位s
                duration = Number(duration) || 2;
            }
            duration = Math.max(duration, 0);
            // 缓动函数默认为 linear
            ease = timing[ease] || 'linear';
            // 延迟时间默认为 0，单位s
            delay = Number(delay) || 0;

            var cssValues = {};
            var endEvent;

            // keyframe动画
            if (typeof property === 'string' && keyFrameReg.test(property)) {
                // 动画名称
                var name = property.match(keyFrameReg)[1];
                var newName = name + '_' + Date.now();
                var styleTag = document.createElement('style');
                styleTag.innerText = property.replace(new RegExp(name, 'g'), newName);
                document.head.appendChild(styleTag);
                cssValues[animationName] = dom.style[animationName] + (dom.style[animationName] ? ', ' : '') + newName;
                cssValues[animationDuration] = dom.style[animationDuration] + (dom.style[animationDuration] ? ', ' : '') + duration + 's';
                cssValues[animationTiming] = dom.style[animationTiming] + (dom.style[animationTiming] ? ', ' : '') + ease;
                cssValues[animationDelay] = dom.style[animationDelay] + (dom.style[animationDelay] ? ', ' : '') + delay + 's';
                cssValues[animationFillMode] = 'both';
                endEvent = animationEnd;
            }
            // transition动画
            else if (Object.prototype.toString.call(property) === '[object Object]') {
                var cssProperty = [];
                var transformCollection = '';
                for (var key in property) {
                    var value = property[key];
                    if (!isNaN(Number(value)) && needPx(key)) {
                        value += 'px';
                    }
                    if (supportedTransforms.test(key)) {
                        transformCollection += key + '(' + value + ') ';
                    }
                    else {
                        cssValues[key] = value;
                        cssProperty.push(dasherize(key));
                    }
                }
                if (transformCollection) {
                    cssValues[transform] = transformCollection;
                    cssProperty.push(transform);
                }
                if (duration > 0) {
                    cssValues[transitionProperty] = dom.style[transitionProperty] + (dom.style[transitionProperty] ? ', ' : '') + cssProperty.join(', ');
                    cssValues[transitionDuration] = dom.style[transitionDuration] + (dom.style[transitionDuration] ? ', ' : '') + duration + 's';
                    cssValues[transitionTiming] = dom.style[transitionTiming] + (dom.style[transitionTiming] ? ', ' : '') + ease;
                    cssValues[transitionDelay] = dom.style[transitionDelay] + (dom.style[transitionDelay] ? ', ' : '') + delay + 's';
                }
                endEvent = transitionEnd;
            }

            // 回调是否执行
            var fired = false;

            // 包装后的回调函数
            var wrappedCallback = function (event) {
                if (event && (event.elapsedTime !== (duration + delay))) {
                    return;
                }
                if (typeof event !== 'undefined') {
                    if (event.target !== event.currentTarget) {
                        // 确保事件不是从底部冒泡上来的
                        return;
                    }
                    event.target.removeEventListener(endEvent, wrappedCallback);
                }
                else {
                    // 由setTimeout触发
                    dom.removeEventListener(endEvent, wrappedCallback);
                }
                fired = true;
                setCss(dom, cssReset);
                cb && cb();
            };

            if (duration > 0) {
                dom.addEventListener(endEvent, wrappedCallback);

                // 在某些老式的android手机上，transitionEnd事件有可能不会触发，这时候我们需要手动执行回调
                setTimeout(function () {
                    if (!fired) {
                        wrappedCallback();
                    }
                }, (duration + delay) * 1000 + 25);
            }

            // 触发reflow让元素可以执行动画
            dom.clientLeft;
            setCss(dom, cssValues);
        }
    };
})();
;

    // js动画
    /**
 * @fileOverview 工具集之js动画（setTimeout or requestAnimationFrame）
 * @author: zhulei05
 * @email: zhulei05@baidu.com
 */

(function () {

    /*
     * Tween.js
     * t: current time（当前时间）；
     * b: beginning value（初始值）；
     * c: change in value（变化量）；
     * d: duration（持续时间）。
     * you can visit 'http://easings.net/zh-cn' to get effect
    */
    var Tween = {
        Linear: {
            easeIn: function(t, b, c, d) { return c*t/d + b; },
            easeOut: function(t, b, c, d) { return c*t/d + b; },
            easeInOut: function(t, b, c, d) { return c*t/d + b; }
        },
        Quad: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c *(t /= d)*(t-2) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t + b;
                return -c / 2 * ((--t) * (t-2) - 1) + b;
            }
        },
        Cubic: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t*t + b;
                return c / 2*((t -= 2) * t * t + 2) + b;
            }
        },
        Quart: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t*t + b;
            },
            easeOut: function(t, b, c, d) {
                return -c * ((t = t/d - 1) * t * t*t - 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
                return -c / 2 * ((t -= 2) * t * t*t - 2) + b;
            }
        },
        Quint: {
            easeIn: function(t, b, c, d) {
                return c * (t /= d) * t * t * t * t + b;
            },
            easeOut: function(t, b, c, d) {
                return c * ((t = t/d - 1) * t * t * t * t + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
                return c / 2*((t -= 2) * t * t * t * t + 2) + b;
            }
        },
        Sine: {
            easeIn: function(t, b, c, d) {
                return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sin(t/d * (Math.PI/2)) + b;
            },
            easeInOut: function(t, b, c, d) {
                return -c / 2 * (Math.cos(Math.PI * t/d) - 1) + b;
            }
        },
        Expo: {
            easeIn: function(t, b, c, d) {
                return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
            },
            easeOut: function(t, b, c, d) {
                return (t==d) ? b + c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
            },
            easeInOut: function(t, b, c, d) {
                if (t==0) return b;
                if (t==d) return b+c;
                if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
                return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        },
        Circ: {
            easeIn: function(t, b, c, d) {
                return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
            },
            easeOut: function(t, b, c, d) {
                return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
            },
            easeInOut: function(t, b, c, d) {
                if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
                return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        },
        Elastic: {
            easeIn: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    s = p / 4;
                    a = c;
                } else {
                    s = p / (2 * Math.PI) * Math.asin(c / a);
                }
                return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            },
            easeOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d) == 1) return b + c;
                if (typeof p == "undefined") p = d * .3;
                if (!a || a < Math.abs(c)) {
                    a = c; 
                    s = p / 4;
                } else {
                    s = p/(2*Math.PI) * Math.asin(c/a);
                }
                return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
            },
            easeInOut: function(t, b, c, d, a, p) {
                var s;
                if (t==0) return b;
                if ((t /= d / 2) == 2) return b+c;
                if (typeof p == "undefined") p = d * (.3 * 1.5);
                if (!a || a < Math.abs(c)) {
                    a = c; 
                    s = p / 4;
                } else {
                    s = p / (2  *Math.PI) * Math.asin(c / a);
                }
                if (t < 1) return -.5 * (a * Math.pow(2, 10* (t -=1 )) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
                return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * .5 + c + b;
            }
        },
        Back: {
            easeIn: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * (t /= d) * t * ((s + 1) * t - s) + b;
            },
            easeOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158;
                return c * ((t = t/d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            easeInOut: function(t, b, c, d, s) {
                if (typeof s == "undefined") s = 1.70158; 
                if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
                return c / 2*((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
            }
        },
        Bounce: {
            easeIn: function(t, b, c, d) {
                return c - Tween.Bounce.easeOut(d-t, 0, c, d) + b;
            },
            easeOut: function(t, b, c, d) {
                if ((t /= d) < (1 / 2.75)) {
                    return c * (7.5625 * t * t) + b;
                } else if (t < (2 / 2.75)) {
                    return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
                } else if (t < (2.5 / 2.75)) {
                    return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
                } else {
                    return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
                }
            },
            easeInOut: function(t, b, c, d) {
                if (t < d / 2) {
                    return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
                } else {
                    return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
                }
            }
        }
    };

    // requestAnimationFrame polyfill
    (function() {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                          window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }
        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
        }
    }());

    /**
     * 对单个属性执行动画
     *
     * @param  {Object}   dom      dom对象
     * @param  {String}   attr     修改的属性
     * @param  {Number}   origin   初始值
     * @param  {Number}   dest     目标值
     * @param  {String}   unit     属性值的单位
     * @param  {Number}   duration 动画时长，单位ms
     * @param  {Function} easeFn   缓动函数
     * @param  {Function} cb       动画结束时的回调
     *
     * @return {Undefined}         
     */
    function _animate(dom, attr, origin, dest, unit, duration, easeFn, cb) {
        var lastTime = Date.now();
        var curTime;
        var change = dest - origin;
        function _run() {
            curTime = Date.now();
            var start = curTime - lastTime;
            var pos = easeFn(start, origin, change, duration);
            if (unit) {
                pos += '' + unit;
            }
            if (dom.style[attr] !== undefined) {
                dom.style[attr] = pos;
            }
            else {
                dom[attr] = pos;
            }
            if (start < duration) {
                window.requestAnimationFrame(_run);
            }
            else {
                cb();
            }
        }
        _run();
    }

    /**
     * js动画函数，供插件开发者调用
     *
     * @param  {Object}   dom      要进行动画的dom对象
     * @param  {Object | String}   property   要改变的css属性键值对或者keyframes字符串
     * @param  {Number}   duration 动画执行时间
     * @param  {String}   ease     缓动函数
     * @param  {Number}   delay    延迟时间
     * @param  {Function} cb       动画完成后的回调函数
     *
     * @return {Object}            当前实例
     */
    Spark.js = function (dom, property, duration, tween, ease, delay, cb) {
        var easeFn = Tween[tween][ease];
        var originProperty = dom.ownerDocument.defaultView.getComputedStyle(dom, null);
        if (!cb) {
            cb = delay;
            delay = 0;
        }
        var reg = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
        setTimeout(function () {
            var n = 0;
            for (var key in property) {
                n++;
                var origin = originProperty[key] || originProperty.getPropertyValue(key);
                if (!origin && origin !== 0) {
                    origin = dom[key];
                }
                var parts = reg.exec(origin);
                var unit = parts[3];
                origin = parseFloat(parts[2]);
                var dest = parseFloat(property[key]);
                _animate(dom, key, origin, dest, unit, duration, easeFn, function () {
                    n--;
                    if (n <= 0) {
                        cb();
                    }
                });
            }
        }, delay);
    };
})();
;

    return Spark;
});
