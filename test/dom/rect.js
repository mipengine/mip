define(function (require) {
    'use strict';
    var platform = require('utils/platform');
    platform.needSpecialScroll = true;
    var rect = require('dom/rect');
    var docEle = document.body || document.documentElement;
    var height = docEle.height;
    describe('rect', function () {
        beforeEach(function () {
            height = docEle.height;
            docEle.style.height = '10000px';
        });

        afterEach(function () {
            docEle.style.height = height;
        });

        it('getElementRect', function () {
            expect(rect.getElementRect(document.body).bottom).to.be.above(0);
        });

        it('getElementOffset', function () {
            var style = getComputedStyle(docEle);
            expect(rect.getElementOffset(docEle).left).to.equal(0);
            expect(rect.getElementOffset(docEle).top).to.equal(0);
            expect(rect.getElementOffset(docEle).width).to.be.least(Math.round(parseInt(style.width, 10)));
            expect(rect.getElementOffset(docEle).height).to.be.least(Math.round(parseInt(style.height, 10)));
        });

        it('setScrollTop', function () {
            rect.setScrollTop(500);
            expect(rect.getScrollTop()).to.be.equal(500);
        });
    });
});
