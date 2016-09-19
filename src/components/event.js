define(function () {
    var reg = /\s+/;
    /**
     * Custom event
     * @class
     * @param {?Object} options
     */
    var Event = function (opt) {
        if (opt) {
            this.setEventContext(opt.context);
            opt.createEventCallback && (this._createEventCallback = opt.createEventCallback);
            opt.removeEventCallback && (this._removeEventCallback = opt.removeEventCallback);
        }
    };
    var multiReg = /\s+/;
    var multiArgs = function (obj, fn, name, args) {
        if (multiReg.test(name)) {
            var nameList = name.split(multiReg);
            var isApply = typeof args !== 'function';
            for (var i = 0; i < nameList.length; i++) {
                isApply ? fn.apply(obj, [nameList[i]].concat(args)) :
                    fn.call(obj, nameList[i], args);
            }
            return true;
        }
        return false;
    };
    var proto = Event.prototype = {
        /**
         * Add handler to events
         * @param {string} events' name
         * @param {Function} handler
         * @return {Object}
         */
        on: function (name, handler) {
            if (multiArgs(this, this.on, name, handler)) {
                return null;
            }
            this._getEvent(name).push(handler);
            return this;
        },
        /**
         * Remove handler from events.
         * @param {?string} events' name
         * @param {?Function} handler
         * @return {?Object}
         */
        off: function (name, handler) {
            // If arguments` length is 0, remove all handlers.
            if (arguments.length == 0) {
                this.__events = null;
                this._removeEventCallback();
            // If no handlers, remove all handlers from the event(s)
            } else if (arguments.length > 1) {
                if (multiArgs(this, this.off, name, handler)) {
                    return null;
                }
                var list = this._getEvent(name);
                var index = list.indexOf(handler);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
            if (arguments.length == 1 || (list && list.length === 0)) {
                delete this.__events[name];
                this._removeEventCallback(this._removeEventCallback(name));
            } 
            return this.__events[name];
        },
        /**
         * Add a one-off handler to events
         * @param {string} events' name
         * @param {Function} handler
         * @return {Function} the unbinder of the handler
         */
        once: function (name, handler) {
            var cb = handler.bind(this);
            var self = this;
            cb.__once = true;
            this.on(name, cb);
            return function () {
                self.off(name, cb);
                cb = self = null;
            }
        },
        /**
         * Trigger events.
         * @param {string} events' name
         */
        trigger: function (name) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (multiArgs(this, this.trigger, name, args)) {
                return null;
            }
            var list = this._getEvent(name);
            var context = this.__eventContext || this;
            for (var i = 0; i < list.length; i++) {
                list[i].apply(context, args);
                if (list[i].__once) {
                    list.splice(i, 1);
                }
            }
        },
        /**
         * Set the handlers' context
         * @param {Function}
         */
        setEventContext: function (context) {
            this.__eventContext = context || this;
        },
        /**
         * Get an event's handler list. If not exist, create it.
         * @param {string} name
         * @return {Object}
         */
        _getEvent: function (name) {
            if (!this.__events) {
                this.__events = {};
            }
            if (!this.__events[name]) {
                this.__events[name] = [];
                this._createEventCallback(name, this.__events[name]);
            }
            return this.__events[name];
        },
        _createEventCallback: function () {

        },
        _removeEventCallback: function () {

        }
    };

    [
        'on bind',
        'off unbind',
        'once one',
        'trigger fire emit'
    ].forEach(function (value) {
        var value = value.split(' ');
        for (var i = 1; i < value.length; i++) {
            proto[value[i]] = proto[value[0]];
        }
    });

    var keys = Object.keys(proto);
    /**
     * Mix Event's prototype into target object
     * @param {Object}
     * @return {Object}
     */
    Event.mixin = function (obj) {
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = proto[keys[i]];
        }
        return obj;
    };

    return Event;
});
