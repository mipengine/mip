define(function () {
    var reg = /\s+/;
    var Event = function (opt) {
        if (opt) {
            this.setEventContext(opt.context);
            opt.createEventCallback && (this._createEventCallback = opt.createEventCallback);
            opt.removeEventCallback && (this._removeEventCallback = opt.removeEventCallback);
        }
    };
    var proto = Event.prototype = {
        /**
         *  挂载事件
         *  @param {string} name 事件名
         *  @param {function} callback 事件回调
         *  @return {constructor}
         **/
        on: function (name, callback) {
            this._getEvent(name).push(callback);
            return this;
        },
        off: function (name, callback) {
            if (arguments.length == 0) {
                this.__events = null;
                this._removeEventCallback();
            } else if (arguments.length > 1) {
                var list = this._getEvent(name);
                var index = list.indexOf(callback);
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
        once: function (name, callback) {
            var cb = callback.bind(this);
            var self = this;
            cb.__once = true;
            this.on(name, cb);
            return function () {
                self.off(name, cb);
                cb = self = null;
            }
        },
        trigger: function (name) {
            var args = Array.prototype.slice.call(arguments, 1);
            if (name.search(reg) > -1) {
                name = name.split(reg);
                for (var i = 0; i < name.length; i++) {
                    args.unshift(name[i]);
                    this.trigger.apply(this, args);
                    args.shift();
                }
                return;
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
        setEventContext: function (context) {
            this.__eventContext = context || this;
        },
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
        // 创建事件时的回调，供继承用
        _createEventCallback: function () {

        },
        // 删除事件时的回调，供继承用
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
    Event.mixin = function (obj, context) {
        for (var i = 0; i < keys.length; i++) {
            obj[keys[i]] = proto[keys[i]];
        }
        return obj;
    };

    return Event;
});
