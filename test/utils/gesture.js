define(function (require) {
    'use strict';

    var platform = require('utils/platform');

    var Gesture = require('utils/gesture');
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
    
    function dispatch(name, clientX, clientY) {
        docBody.dispatchEvent(mockTouchEvent(name, clientX, clientY));
    }

    // 重置Platform里的各项属性为FALSE
    function resetPlatform() {
        for(var key in platform) {
            if(platform.hasOwnProperty(key) && typeof platform[key] == 'function') {
                platform[key] = function(){
                    return false;
                }
            }
        };
    }

    function changeUa (ua) {
        resetPlatform();
        var stub = sinon.stub(platform, '_ua', function() {
            return ua;
        });
        platform.start();
        stub.restore();
    }    

    var data = {};
    describe('gesture', function () {
        it('on & off', function () {
            var gesture = new Gesture(docBody);
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
            var gesture = new Gesture(docBody);
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
            var gesture = new Gesture(docBody);
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
            var gesture = new Gesture(docBody);
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
            var gesture = new Gesture(docBody);
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

        describe('function: getPlatformEvent',function () {
            before(function (){
                changeUa('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36');
            });
            after(function (){
                changeUa('Mozilla/5.0 (Linux; Android 5.0.2; vivo X5M Build/LRX22G) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/38.0.0.0 Mobile Safari/537.36');
            });
            it('tapInPc', function () {
                var gesture = new Gesture(docBody);
                var tapCheck = false;
                gesture.on('tap', function () {
                    tapCheck = true;
                });

                dispatch('touchstart');
                dispatch('touchend');

                expect(tapCheck).to.be.false;
            });
            it('clickInPc', function () {
                var gesture = new Gesture(docBody);
                var clickCheck = false;
                gesture.on('click', function () {
                    clickCheck = true;
                });

                dispatch('click');

                expect(clickCheck).to.be.true;
            });
        });
    });

});
