/**
 * Tester for viewer
 */
define(function (require) {
    'use strict';

    var util = require('util');
    var viewer = require('viewer');
    var viewport = require('viewport');

    var docElement = document.documentElement || document.body;
    var ele = document.createElement('a');
    ele.href =  'http://baidu.com';
    ele.id = 'delegateLink';
    docElement.appendChild(ele);

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

        it('needBackReload', function () {
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
        });

        it('show', function () {
            viewer.show();

            expect(document.body.style.opacity).to.equal('1');
        });

        it('init', function () {
            viewer.init();
            expect(viewer._gesture).to.be.instanceof(util.Gesture);
        });

        it('sroll up', function () {
            var style = getComputedStyle(document.body);
            var height = style.height;
            viewer.init();
            document.body.style.height = '10000px';
            viewport.setScrollTop(800);
            expect(viewport.getScrollTop()).to.equal(800);
            document.body.style.height = height;
        });

        it('sendMessage', function () {
            viewer.isIframed = false;
            expect(viewer.sendMessage.bind(viewer)).to.not.throw(Error);

            viewer.isIframed = true;
            expect(viewer.sendMessage.bind(viewer)).to.not.throw(Error);
        });
    });

});
