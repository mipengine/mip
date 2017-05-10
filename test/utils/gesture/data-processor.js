define(function (require) {
    'use strict';

    var domEvent = require('dom/event');

    function mockTouchEvent(name, clientX, clientY) {
        var evt = domEvent.create(name);
        evt.touches = [{
            clientX: clientX || 0,
            clientY: clientY || 0
        }];
        return evt;
    }

    var dataProcessor = require('utils/gesture/data-processor');

    describe('gesture/data-processor', function () {
        it('touchMove', function () {
            var startEvent = mockTouchEvent('touchstart');
            var moveEvent = mockTouchEvent('touchmove', 2, 1.5);
            var endEvent = mockTouchEvent('touchend', 4, 3);
            dataProcessor.process(startEvent);
            dataProcessor.process(moveEvent, false, true);
            var moveData = dataProcessor.process(mockTouchEvent('touchmove', 1, 3), true)
            var data = dataProcessor.process(endEvent);

            expect(data.distance).to.equal(5);
            expect(moveEvent.defaultPrevented).to.be.true;
            expect(data.direction).to.equal(2);
            expect(moveData.direction).to.equal(3);
        });
        it('pcClickEvent', function () {
            var clickEvent = mockTouchEvent('click');
            var eventState = dataProcessor.process(clickEvent).eventState;
            expect(eventState).to.equal('click');
        });
    });
});
