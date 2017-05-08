define(function (require) {
    'use strict';

    var Gesture = require('utils/gesture');
    var platform = require('utils/platform');
    var domEvent = require('dom/event');
    var docBody = document.body;

    function mockTouchEvent(name, clientX, clientY) {
        var evt = domEvent.create(name);
        evt.touches = [{
            clientX: clientX || 0,
            clientY: clientY || 0
        }];
        return evt;
    }
    var gesture = new Gesture(docBody);
    var data = {};
    function dispatch(name, clientX, clientY) {
        docBody.dispatchEvent(mockTouchEvent(name, clientX, clientY));
    }
    function changeUa(ua) {
        var uaStub = sinon.stub(platform, '_ua');
            uaStub.returns(ua);
        platform.start();
        uaStub.restore();
    }

    describe('gesture', function () {
        it('on & off', function () {
            data.touchstart = 0;
            gesture.on('touchstart', function () {
                data.touchstart ++;
            });

            dispatch('touchstart');
            // Check native event bind.
            expect(data.touchstart).to.equal(1);

            gesture.off('touchstart');
            dispatch('touchstart');
            // Check native event unbind.
            expect(data.touchstart).to.equal(1);
        });

        it('tap', function () {
            var tapCheck = false;
            gesture.on('tap', function () {
                tapCheck = true;
            });

            dispatch('touchstart');
            dispatch('touchend');

            expect(tapCheck).to.be.true;
        });

        it('tap & doubletap', function (done) {
            data.tap = data.doubletap = 0;
            var gesture = new Gesture(document.body);
            gesture.on('tap', function () {
                data.tap ++;
            });
            gesture.on('doubletap', function () {
                data.doubletap ++;
            });

            dispatch('touchstart');
            dispatch('touchend');
            dispatch('touchstart');
            dispatch('touchend');
            setTimeout(function () {
                if (data.tap !== 0 || data.doubletap !== 1) {
                    return done('tap & doubletap check error');
                }
                done();
            });
        });

        it('swipe', function () {
            data.swipe = data.swipeother = data.swipeleft = 0;
            gesture.on('swipe', function () {
                data.swipe ++;
            });
            gesture.on('swipeup swiperight swipedown', function () {
                data.swipeother ++;
            });
            gesture.on('swipeleft', function () {
                data.swipeleft ++;
            })

            dispatch('touchstart', 100, 0);
            dispatch('touchend', 50, 0);

            dispatch('touchstart', 100, 0);
            dispatch('touchend', 50, 0);

            expect(data.swipe).to.equal(2);
            expect(data.swipeother).to.equal(0);
            expect(data.swipeleft).to.equal(2);
        });

        it('recognizer', function () {
            var gesture = new Gesture(docBody);

            gesture.on('tap doubletap', function () {

            });
            expect(!!(gesture._recognizers.tap && gesture._recognizers.doubletap)).to.be.true;

            gesture.off('doubletap');
            expect(!!(gesture._recognizers.tap && !gesture._recognizers.doubletap)).to.be.true;

            gesture.off();
            expect(gesture._recognizers).to.eql({});
        });

        it('cleanup', function () {
            data.cleanup = 0;

            gesture.on('touchstart', function () {
                data.cleanup ++;
            });

            dispatch('touchstart');
            expect(data.cleanup).to.equal(1);

            gesture.cleanup();
            dispatch('touchstart');
            expect(data.cleanup).to.equal(1);
        });

        it('preventDefault', function () {
            var gesture = new Gesture(docBody, {
                preventDefault: true,
                stopPropagation: true
            });
            data.preventDefault = 0;

            gesture.on('touchend', function (event) {
                if (event.defaultPrevented) {
                    data.preventDefault ++;
                }
            });
            dispatch('touchend');

            expect(data.preventDefault).to.equal(1);
        });
    });
    describe('function: getPlatformEvent',function () {
        // it('ua: pc', function(){
        //     // change ua into a PC ua
        //     changeUA('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
        //     expect(getPlatformEvent()).to.equal('click');
        // });
        // it('ua: mobile', function(){
        //     // change ua into a mobile ua
        //     changeUA('Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1');
        //     expect(getPlatformEvent()).to.equal('touchstart touchmove touchend touchcancel');
        // });
    });
});
