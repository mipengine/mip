define(['./fn'], function () {
    'use strict';

    var parseReg = /^(\w+):(\w+)\.(\w+)(?:\(([^\)]+)\))?$/;
    var checkReg = /^mip-/;

    var optKeys = ['get', 'excuteEventAction', 'parse', 'checkTarget'];

    var EventAction = function (opt) {
        opt && fn.extend(this, fn.pick(opt, optKeys));
    };

    EventAction.prototype = {
        attr: 'data-action',
        excute: function (type, target, nativeEvent) {
            if (!target) {
                return;
            }
            this._excute(
                this.parse(target.getAttribute(this.attr), type, nativeEvent),
                target
                );
        },
        checkTarget: function (target) {
            return target && target.tagName && checkReg.test(target.tagName.toLowerCase());
        },
        // for override
        get: function (id) {
            return document.getElementById(id);
        },
        excuteActionEvent: function (action, target) {
            target.excuteActionEvent && target.excuteActionEvent(action);
        },
        _excute: function (actions) {
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];
                var target = this.get(action.id);
                if (this.checkTarget(target)) {
                    this.excuteActionEvent(action, target);
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
