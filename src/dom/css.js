define(function (require) {
    'use strict';
    var camelReg = /(?:(^-)|-)+(.)?/g;

    /**
     * Temp element for checking css properties.
     */
    var supportElement = document.createElement('div');

    /**
     * Prefix type for browsers.
     * @const
     */
    var PREFIX_TYPE = ['webkit', 'moz', 'ms', 'o', 'Webkit', 'Moz', 'O'];
    /**
     * Storage of css properties' prefix.
     */
    var prefixCache = {};

    /**
     * Make sure a property is supported by adding prefix.
     * @param {string} property A property to be checked
     * @return {string} the property or its prefixed version
     */
    function prefixProperty(property) {
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
    }

    /**
     * Regular expression of checking a string whether has a unit.
     * @const
     */
    var UNIT_REG = /^\d+([a-zA-Z]+)/;

    /**
     * Storage of css properties' units.
     */
    var unitCache = {};

    /**
     * Obtain the unit of a property and add it to the value has no unit if exists.
     * @param {string} property
     * @param {(string|number)} value A value maybe needs unit.
     * @return {(string|number)}
     */
    function unitProperty(property, value) {
        if (value !== +value) {
            return value;
        }
        if (unitCache[property]) {
            return value + unitCache[property];
        }
        supportElement.style[property] = 0;
        var propValue = supportElement.style[property];
        var match = propValue.match && propValue.match(UNIT_REG);
        if (match) {
            return value + (unitCache[property] = match[1]);
        }
        return value;
    }

    /**
     * Set or get the value of the style properties of an element or any elements.
     * Examples:
     *    css(elements, 'left', 0);
     *    css(element, 'left', 0);
     *    css(element, {left: 0, top: 0});
     *    css(element or elements, 'left'); // the value(s) of the computed left property of the element(s)
     * @param {(Array.<HTMLElement>|HTMLElement)} elements The source element(s)
     * @param {(Object|string)} property Object contains style properties or property name
     * @param {?(string|number)} value The value of setting property
     * @return {(Array.<HTMLElement>|HTMLElement|string)}
     */
    function css(elements, property, value) {
        var i;
        if (!property || !elements) {
            return elements;
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
        if (!elements.nodeType) {
            return elements;
        }
        var element = elements;
        if (typeof property !== 'string' || value !== undefined) {
            var prop;
            if (typeof property === 'string') {
                prop = prefixProperty(property);
                element.style[prop] = unitProperty(prop, value);
            } else {
                for (i in property) {
                    value = property[i];
                    prop = prefixProperty(i);
                    element.style[prop] = unitProperty(prop, value);
                }
            }
            return element;
        } else {
            property = prefixProperty(property);
            return element.style[property] || document.defaultView.getComputedStyle(element)[property];
        }
    }

    return css;
});
