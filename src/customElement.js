define(['./components/event'], function (Event) {
    /**
     * The constructor of  base class of custom element
     * @param {HTMLElement}
     */
    function customElement(element) {
        this.element = element;
        if (this.init){
            this.init();
        }    
    }

    /**
     * Apply the fill content style to an element
     * @param {HTMLElement} element
     * @param {boolean} replaced?
     */
    customElement.prototype.applyFillContent = function (ele, isReplaced) {
        ele.classList.add('mip-fill-content');
        if (isReplaced) {
          ele.classList.add('mip-replaced-content');
        }
    };
    customElement.prototype.createdCallback = function () {};
    customElement.prototype.attachedCallback = function () {};
    customElement.prototype.detachedCallback = function () {};
    customElement.prototype.attributeChangedCallback = function () {};
    customElement.prototype.firstInviewCallback = function () {};
    customElement.prototype.viewportCallback = function () {};
    customElement.prototype.prerenderAllowed = function () {return false;}
    customElement.prototype.build = function () {};
    /**
     * Expend current element's attributes which selected by attrs to an other object.
     * @param {Array.<string>} attributes' name list
     * @param {Object} target
     * @return {Object} the target obj
     */
    customElement.prototype.expendAttr = function (attrs, element) {
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (this.element.hasAttribute(attr)) {
                var val = this.element.getAttribute('attr');
                element.setAttribute ?
                    element.setAttribute(attr, val) :
                    element[attr] = val;
            }
        }
        return element;
    };

    /**
     * Add event actions such as `this.addEventAction("default open", handler)`
     * @param {string} name
     * @param {Function} handler
     */
    customElement.prototype.addEventAction = function (/* name, handler */) {
        var evt = this._actionEvent;
        if (!evt) {
            evt = this._actionEvent = new Event();
            evt.setEventContext(this);
        }
        
        evt.on.apply(evt, arguments);
    };

    /**
     * Trigger the handlers had been added by `addEventAction` of an action
     * @param {string} action name
     */
    customElement.prototype.excuteEventAction = function (action) {
        var eventObj = this._actionEvent;
        if (action && eventObj) {
            eventObj.trigger(action.handler, action.event, action.arg);
        }
    };

    return {
        /**
         * Create a class of a new type mip element
         * @return {Function}
         */
        create: function () {
            var impl = function (element) {
                customElement.call(this, element);
            };
            impl.prototype = Object.create(customElement.prototype);
            return impl;
        }
    }
});
