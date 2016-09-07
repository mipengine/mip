/**
 * 样式相关逻辑
 **/
define(function () {
    'use strict';
    var camelReg = /(?:(^-)|-)+(.)?/g;

    var supportElement = document.createElement('div');

    var PREFIX_TYPE = ['webkit', 'moz', 'ms', 'o', 'Webkit', 'Moz', 'O'];
    var prefixCache = {};
    var prefixProperty = function (property) {
        property = property.replace(camelReg, function (match, first, char) {
            return first ? char : char.toUpperCase();
        });
        if (prefixCache[property]) {
            return prefixCache[property];
        }
        if (!(property in supportElement.style)) {
            for (var i = 0; i < PREFIX_TYPE.length; i++) {
                var prefixedProp = PREFIX_TYPE[i] + 
                    property.charAt(0).toUpperCase() + property.slice(1);
                if (prefixedProp in supportElement.style) {
                    var prop = prefixedProp;
                    break;
                }
            }
        }
        return prefixCache[property] = prop || property;
    };

    var unitCache = {};
    var unitReg = /^\d+([a-zA-Z]+)/;
    var unitProperty = function (property, value) {
        if (value !== +value) {
            return value;
        }
        if (unitCache[property]) {
            return value + unitCache[property];
        }
        supportElement.style[property] = 0;
        var propValue = supportElement.style[property];
        var match = propValue.match && propValue.match(unitReg);
        if (match) {
            return value + (unitCache[property] = match[1]);
        }
        return value;
    };

    /**
     * 对dom元素设置css属性，或着返回css属性
     * 用法：
     *   1、css(element, 'left', -20);  // 设置元素的 left 属性为 20px
     *   2、css(element, 'user-select', 'none'); // 如果在 webkit 下，会自动加上 -webkit 前缀
     *   3、css(element, 'marginTop', 20);  // 可以使用驼峰式属性名
     *   4、// 可使用 object
     *      css(element, {
     *         'margin': 0,
     *         'padding-left': 0
     *      });
     *   5、css(elements, 'left', -20); // 设置一些元素的 left 为 -20px
     *   6、css(document.body, 'margin-top');  // returns '0px'
     *   7、css(elements, 'margin-top');    //  returns ['Npx', 'Npx', 'Npx']
     * TODO: 优化代码结构，目前比较冗余
     **/
    var css = function (elements, property, value) {
        var i;
        if (!property) {
            return element;
        };
        if (elements.length && elements[0]) {
            if (property && value !== undefined) {
                for (i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    css(element, property, value);
                }
                return elements;
            } else {
                var ret = [];
                for (i = 0; i < elements.length; i++) {
                    ret.push(css(elements[i], property));
                }
                return ret;
            }
        }
        var element = elements;
        if (typeof property !== 'string' || value !== undefined) {
            var prop;
            if (typeof property === 'string') {
                prop = prefixProperty(property);
                element.style[prop] = value === +value ? unitProperty(prop, value) : value;
            } else {
                for (i in property) {
                    value = property[i];
                    prop = prefixProperty(i);
                    element.style[prop] = value === +value ? unitProperty(prop, value) : value;
                }
            }
            return element;
        } else {
            property = prefixProperty(property);
            return element.style[property] || document.defaultView.getComputedStyle(element)[property];
        }
    };

    return css;
});
