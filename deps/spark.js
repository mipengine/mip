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



    return Spark;
});
