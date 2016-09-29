define(function (require) {
    'use strict';

    var fn = require('./fn');
    var dom = require('../dom/dom');

    var parseReg = /^(\w+):([\w-]+)\.([\w-]+)(?:\(([^\)]+)\))?$/;
    var checkReg = /^mip-/;

    var optKeys = ['get', 'excuteEventAction', 'parse', 'checkTarget', 'attr'];

    /**
     * MIP does not support external JavaScript so we provide EventAction to trigger events between elements.
     * @class
     * @param {?Object} opt Options
     */
    function EventAction(opt) {
        opt && fn.extend(this, fn.pick(opt, optKeys));
    };

    EventAction.prototype = {
        attr: 'on',
        excute: function (type, target, nativeEvent) {
            if (!target) {
                return;
            }
            var attr, parent;
            var attrSelector = '[' + this.attr + ']';
            do {
                if (attr = target.getAttribute(this.attr)) {
                    this._excute(this.parse(attr, type, nativeEvent));
                    target = target.parentElement;
                    if (!target) {
                        return;
                    }
                }
                target = dom.closest(target, attrSelector);
            } while (target);
        },
        checkTarget: function (target) {
            return target && target.tagName && checkReg.test(target.tagName.toLowerCase());
        },
        get: function (id) {
            return document.getElementById(id);
        },
        excuteEventAction: function (action, target) {
            target.excuteEventAction && target.excuteEventAction(action);
        },
        _excute: function (actions) {
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                var target = this.get(action.id);
                if (this.checkTarget(target)) {
                    this.excuteEventAction(action, target);
                }
            }
        },
        // 'tap:a.open tap:b.close tap:c.show(Title)'
        parse: function (actionString, type, nativeEvent) {
            if (typeof actionString !== 'string') {
                return [];
            }
            var actions = actionString.trim().split(' ');
            var result = [];
            for (var i = 0; i < actions.length; i++) {
                var matchedResult = actions[i].match(parseReg);
                if (matchedResult && matchedResult[1] === type) {
                    result.push({
                        type: matchedResult[1],
                        id: matchedResult[2],
                        handler: matchedResult[3],
                        arg: matchedResult[4],
                        event: nativeEvent
                    });
                }
            }
            return result;
        }
    };

    return EventAction;
});
