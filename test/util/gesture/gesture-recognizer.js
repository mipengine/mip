define(function (require) {
    'use strict';

    var Recognizer = require('util/gesture/gesture-recognizer');

    var mockGesture = {
        trigger: function () {

        }
    };

    describe('gesture/recognizer', function () {
        var TapRecognizer = Recognizer.get('tap');
        var DoubleTapRecognizer = Recognizer.get('doubletap');
        var SwipeRecognizer = Recognizer.get('swipe');

        expect(TapRecognizer.name).to.equal('TapRecognizer');

        Recognizer.conflict('tap', 'doubletap');
        expect(Recognizer.getConflictList('tap')).to.have.lengthOf(2);
        expect(Recognizer.getConflictList('swipe')).to.eql([]);

        Recognizer.getConflictList('tap').pop();
        Recognizer.getConflictList('doubletap').pop();

        expect(Recognizer.conflict).to.not.throw(Error);

        it('base', function () {
            var base = new Recognizer(mockGesture);
            // isState
            expect(base.isState('start') && base.isState(1)).to.be.true;

            // setState
            expect(base.setState(2)).to.equal(2);
            expect(base.setState(7)).to.equal(2);

            // Auto reset & process & emit
            base.setState('hold');
            var data = {
                eventState: 'start'
            };
            sinon.spy(base, 'reset');
            sinon.spy(base, 'process');
            sinon.spy(base, 'emit');
            base.recognize(data);
            expect(base.reset).to.have.been.called;
            expect(base.process).to.have.been.called;
            base.process = function () {
                // Return end state
                return 4;
            };
            base.recognize(data);
            expect(base.emit).to.have.been.calledWith(data);
            
            base.setState('hold');
            base.recognize({
                eventState: 'move'
            });
            expect(base.emit).to.have.been.calledOnce;

        });

        it('tap', function (done) {
            var tap = new TapRecognizer(mockGesture);
            var doubletap = new DoubleTapRecognizer(mockGesture);
            var data = {
                eventState: 'end',
                pointers: [''],
                deltaTime: 10,
                distance: 0
            };

            tap.conflictList.doubletap = doubletap;
            doubletap.conflictList.tap = tap;

            doubletap.setState('wait');
            tap.recognize(data);

            // While doubletap is wait, tap also should be wait.
            expect(tap.isState('wait')).to.be.true;


            doubletap.setState('hold');
            tap.recognize(data);
            setTimeout(function () {
                done(tap.isState('end'));
            }, tap.holdTime + 10);
        });

        it('swipe', function () {
            var swipe = new SwipeRecognizer(mockGesture);
            var data = {
                eventState: 'end',
                pointers: ['', ''],
                deltaTime: 10,
                distance: 40,
                direction: 3,
                velocity: 0.04
            };
            swipe.recognize(data);
            expect(swipe.isState('hold')).to.be.true;

            data.pointers.pop();
            swipe.setState('start');
            swipe.recognize(data);
            expect(swipe.isState('end')).to.be.true;
        });
    });
});
