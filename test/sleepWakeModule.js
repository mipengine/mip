
define(function (require) {
    'use strict';

    var sleepWakeModule = require('sleepWakeModule');

    describe('sleepWakeModule', function () {
        describe('changeStatusTestCase', function () {
            it('sleepIsTrue', function () {
                /*var script = document.createElement('script');
                script.type = 'application/json';
                script.id = 'mip-sleep-wake-module';
                script.textContent = '{"mip-custom": ".qn3a1ec398ffcdff30db1c748dadb066bd05e3ce0f32ef30e51a226ad4a7e5||#test"}';
                document.body.appendChild(script);
                var div = document.createElement('div');
                div.id = 'test';
                document.body.appendChild(div);
                function checkSleep() {
                    return document.querySelector('#test') === null;
                };
                sleepWakeModule.init();
                //expect(sleepWakeModule._domObj['mip-custom'].length).to.equal('1');
                expect(checkSleep()).to.be.false;*/
            });

            /*it('needBackReload', function () {
                var stub1 = sinon.stub(util.platform, 'getOsVersion', function () {
                    return '9.1.1';
                });
                var stub2 = sinon.stub(util.platform, 'isSafari', function () {
                    return true;
                });
                viewer.patchForIframe();
                stub1.restore();
                stub2.restore();

                var eve = document.createEvent("HTMLEvents");
                eve.initEvent("pageshow", true, true);
                window.dispatchEvent(eve);
            });*/
        });

        /*it('wake', function () {
            sleepWakeModule.wake('mytest');
            expect(sleepWakeModule._isAlreadyWake['mytest']).to.equal(1);
        });

        it('close', function () {
            sleepWakeModule._close('mytest');
            expect(sleepWakeModule._isAlreadyWake['mytest']).to.equal(1);
        });

        it('reset', function () {
            sleepWakeModule.reset('mytest');
            expect(sleepWakeModule._isAlreadyWake['mytest']).to.equal(0);
        });*/
    });
});