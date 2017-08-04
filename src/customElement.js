/**
 * @file Custom Element
 *
 * @author xx
 * @modify wupeng10@baidu.com 2017-08-03 add layoutIfNeeded api
 */
define(function (require) {
    'use strict';

    var EventEmitter = require('./utils/event-emitter');


    /**
     * The constructor of  base class of custom element
     *
     * @param {MIPElement} element element
     * @class
     */
    function customElement(element) {
        /**
         * @type {MIPElement}
         * @public
         */
        this.element = element;
        if (this.init) {
            this.init();
        }
    }

    /**
     * Apply the fill content style to an element
     *
     * @param {HTMLElement} ele element
     * @param {boolean} isReplaced whether replaced or not
     */
    customElement.prototype.applyFillContent = function (ele, isReplaced) {
        ele.classList.add('mip-fill-content');
        if (isReplaced) {
            ele.classList.add('mip-replaced-content');
        }
    };

    /**
     * Called when the MIPElement is created.
     */
    customElement.prototype.createdCallback = function () {};

    /**
     * Called when the MIPElement is inserted into the DOM.
     */
    customElement.prototype.attachedCallback = function () {};

    /**
     * Called when the MIPElement is removed from the DOM.
     */
    customElement.prototype.detachedCallback = function () {};

    /**
     * Called when the MIPElement's attribute is changed.
     */
    customElement.prototype.attributeChangedCallback = function () {};

    /**
     * Called when the MIPElement first enters the viewport.
     */
    customElement.prototype.firstInviewCallback = function () {};

    /**
     * Called when the MIPElement has entered or exited the viewport.
     */
    customElement.prototype.viewportCallback = function () {};

    /**
     * Control whether the MIPElement is rendred ahead.
     *
     * @return {boolean} If the result is TRUE, the element will be rendred ahead.
     */
    customElement.prototype.prerenderAllowed = function () {
        return false;
    };

    /**
     * Return the current component containing resources.
     * If it returns true, complete should be called.
     *
     * @return {boolean} whether has resource or not
     */
    customElement.prototype.hasResources = function () {
        return false;
    };

    /**
     * Called when the MIPElement is first inserted into the document.
     */
    customElement.prototype.build = function () {};

    /**
     * Reset statue of resource list.
     *
     * @return {boolean} if there need reset reousrce status
     */
    customElement.prototype.layoutIfNeeded = function () {
        return false;
    };

    /**
     * Expend current element's attributes which selected by attrs to an other object.
     *
     * @param {Array.<string>} attrs Attributes' name list
     * @param {Object} element The target element
     * @return {Object}
     */
    customElement.prototype.expendAttr = function (attrs, element) {
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (this.element.hasAttribute(attr)) {
                var val = this.element.getAttribute(attr);
                element.setAttribute
                    ? element.setAttribute(attr, val)
                    : element[attr] = val;
            }
        }
        return element;
    };

    /**
     * Add event actions such as `this.addEventAction("default open", handler)`
     *
     * @param {string} name event name
     * @param {Function} handler event handler
     */
    customElement.prototype.addEventAction = function (/* name, handler */) {
        var evt = this._actionEvent;
        if (!evt) {
            evt = this._actionEvent = new EventEmitter();
            evt.setEventContext(this);
        }

        evt.on.apply(evt, arguments);
    };

    /**
     * Trigger the handlers had been added by `addEventAction` of an action
     *
     * @param {string} action The action's name
     */
    customElement.prototype.executeEventAction = function (action) {
        var eventObj = this._actionEvent;
        if (action && eventObj) {
            eventObj.trigger(action.handler, action.event, action.arg);
        }
    };

    /**
     * Notice that resources are loaded.
     */
    customElement.prototype.resourcesComplete = function () {
        this.element.resourcesComplete();
    };

    return {

        /**
         * Create a class of a new type mip element
         *
         * @return {Function}
         */
        create: function () {
            function impl(element) {
                customElement.call(this, element);
            }
            impl.prototype = Object.create(customElement.prototype);
            return impl;
        }
    };
});
