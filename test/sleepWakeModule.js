
define(function (require) {
    'use strict';

    var sleepWakeModule = require('sleepWakeModule');
    var util = require('util');
    var create = util.dom.create;

    describe('sleepWakeModule', function () {
        it('sleepIsTrue', function () {
            sleepWakeModule.init();
            var element = create('<div id="sleep-wake-test"></div>');
            document.body.appendChild(element);
            var script = create('<script id="mip-sleep-wake-module" type="application/json"></script>');
            script.textContent = '{"mip-custom": ".qn3a1ec398ffcdff30db1c748dadb066bd05e3ce0f32ef30e51a226ad4a7e5||#test"}';
            element.appendChild(script);
            sleepWakeModule.init();
            expect(sleepWakeModule._domObj['mip-custom'].length).to.equal(1);
            sleepWakeModule._initConf('||', {"mip-custom-test": ".qn3a1ec398ffcdff30db1c748dadb066bd05e3ce0f32ef30e51a226ad4a7e5||#test||.test"});
            expect(sleepWakeModule._domObj['mip-custom-test'].length).to.equal(1);
        });

        it('wake', function () {
            sleepWakeModule.init();
            sleepWakeModule.wake('mytest');
            expect(sleepWakeModule._isAlreadyWake['mytest']).to.equal(1);
        });

        it('_stateChange', function () {
            expect(sleepWakeModule._stateChange()).to.equal(undefined);
            expect(sleepWakeModule._stateChange('mytest')).to.equal(undefined);
            var element = create('<div id="test"></div>');
            document.body.appendChild(element);
            var script = create('<script id="mip-sleep-wake-module" type="application/json"></script>');
            script.textContent = '{"mip-custom": ".qn3a1ec398ffcdff30db1c748dadb066bd05e3ce0f32ef30e51a226ad4a7e5||#test"}';
            document.body.appendChild(script);
            sleepWakeModule.init();
            sleepWakeModule._stateChange('mip-custom');
        });

        it('close', function () {
            sleepWakeModule._close('mytest');
            expect(sleepWakeModule._isAlreadyWake['mytest']).to.equal(1);
        });

        it('reset', function () {
            sleepWakeModule.reset('mytest');
            expect(sleepWakeModule._isAlreadyWake['mytest']).to.equal(0);
        });
    });
});