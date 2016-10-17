/**
 * Tester for viewer
 */
define(function (require) {
    'use strict';

    var util = require('util');

    var viewer = require('viewer');

    describe('viewer', function () {
        it('patchForIframe', function () {
            util.platform.needSpecialScroll = false;
            document.body.style.cssText = '';
            document.body.style.margin = 0;
            function checkHeight() {
                return document.body.style.height === '100%';
            };
            viewer.patchForIframe();
            var initedHeightEmpty = !checkHeight();
            util.platform.needSpecialScroll = true;
            viewer.patchForIframe();

            expect(initedHeightEmpty).to.be.true;
            expect(checkHeight()).to.be.true;
        });

        it('show', function () {
            viewer.show();

            expect(document.body.style.opacity).to.equal('1');
        });

        it('init', function () {
            viewer.init();
            expect(viewer._gesture).to.be.instanceof(util.Gesture);
        });

        it('sendMessage', function () {
            viewer.isIframed = false;
            expect(viewer.sendMessage.bind(viewer)).to.not.throw(Error);

            viewer.isIframed = true;
            expect(viewer.sendMessage.bind(viewer)).to.not.throw(Error);
        });
    });

});
