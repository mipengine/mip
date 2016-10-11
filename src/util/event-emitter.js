define(function (require) {
    'use strict';

    /**
     * For determining whether a string is splitted by space or not.
     * @const
     * @inner
     * @type {RegExp}
     */
    var MULTI_REG = /\s+/;

    /**
     * If a string is splitted by space, convert string to array and
     * execute function N(n = Array.length) times with the args.
     * Return the result that the string is multiple or not.
     * @param {Object} obj The execute context
     * @param {Function} fn The function to be runned
     * @param {string} name 
     * @param {Array} args
     * @return {boolean}
     */
    function multiArgs(obj, fn, name, args) {
        if (MULTI_REG.test(name)) {
            var nameList = name.split(MULTI_REG);
            var isApply = typeof args !== 'function';
            for (var i = 0; i < nameList.length; i++) {
                isApply ? fn.apply(obj, [nameList[i]].concat(args)) :
                    fn.call(obj, nameList[i], args);
            }
            return true;
        }
        return false;
    };


    /**
     * Custom event
     * @class
     * @param {?Object} opt Options
     */
    function EventEmitter(opt) {
        if (opt) {
            this.setEventContext(opt.context);
            opt.createEventCallback && (this._createEventCallback = opt.createEventCallback);
            opt.removeEventCallback && (this._removeEventCallback = opt.removeEventCallback);
        }
    };
    var proto = EventEmitter.prototype = {
        /**
         * Add handler to events
         * @param {string} name 
         * @param {Function} handler
         * @return {Object}
         */
        on: function (name, handler) {
            if (multiArgs(this, this.on, name, handler)) {
                return this;
            }
            this._getEvent(name).push(handler);
            return this;
        },

        /**
         * Remove handler from events.
         * @param {?string} name
         * @param {?Function} handler
         * @return {?Object}
         */
        off: function (name, handler) {
            // If arguments` length is 0, remove all handlers.
            if (!name) {
                if (!handler) {
                    this.off(Object.keys(this.__events).join(' '), handler);
                }
                return null;
            }
            if (multiArgs(this, this.off, name, handler)) {
                return null;
            }

            if (handler) {
                var list = this._getEvent(name);
                var index = list.indexOf(handler);
                if (index > -1) {
                    list.splice(index, 1);
                }
            }
            if (!handler || (list && list.length === 0)) {
                delete this.__events[name];
                this._removeEventCallback(name);
            } 
            return name ? this.__events && this.__events[name] : null;
        },

        /**
         * Add a one-off handler to events
         * @param {string} name
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
         * @param {string} name
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
         * @param {Function} context
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

        /**
         * Called when an event is created.
         * @param {string} name Event name
         * @param {Array.<Function>} handlers The bound handlers
         */
        _createEventCallback: function (name, handlers) {

        },

        /**
         * Called when an event is removed.
         * @param {string} name Event name
         */
        _removeEventCallback: function (name) {

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

    /**
     * Keys for extending to another object.
     * @inner
     * @type {Ojbect}
     */
    var keys = Object.keys(proto);

    /**
     * Mix EventEmitter's prototype into target object
     * @param {Object} obj
     * @return {Object}
     */
    EventEmitter.mixin = function (obj) {
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = proto[keys[i]];
        }
        return obj;
    };

    return EventEmitter;
});
