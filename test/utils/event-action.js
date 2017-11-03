define(function (require) {
    'use strict';

    var EventAction = require('utils/event-action');
    var viewer = require('viewer');

    var mockElement = {
        executeEventAction: function (action) {
            this.arg = action.arg;
        },
        tagName: 'mip-test'
    };

    describe('event-action', function () {
        it('white list', function () {
            var MIP = window.MIP = window.MIP || {};
            MIP.setData = function () {};
            MIP.$set = function () {};
            var action = new EventAction({
                getTarget: function () {
                    return mockElement;
                }
            });
            action.execute('tap', {
                getAttribute: function () {
                    return 'tap:MIP.setData({a:1}})';
                }
            }, 'event');
            action.execute('tap', {
                getAttribute: function () {
                    return 'tap:MIP.$set({a:1}})';
                }
            }, 'event');
            expect(mockElement.arg).to.undefined;
        });

        it('normal', function () {
            var action = new EventAction({
                getTarget: function () {
                    return mockElement;
                }
            });

            action.execute('tap', {
                getAttribute: function () {
                    return 'tap:id.abc(123)';
                }
            }, 'event');
            expect(mockElement.arg).to.equal('123');
        });

        it('error check', function () {
            var action = new EventAction();
            expect(action.execute).to.not.throw();
            expect(action.parse(123)).to.eql([]);
            expect(action.parse('scroll:id.abc(123', 'tab')).to.eql([]);
        });
    });
});
