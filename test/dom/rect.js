define(function (require) {
    'use strict';

    var platform = require('utils/platform');
    platform.needSpecialScroll = true;
    var rect = require('dom/rect');
    describe('rect', function () {
        it('getElementRect', function () {
            expect(rect.getElementRect(document.body).bottom).to.be.above(0);
        });

        it('getElementOffset', function () {
            var docEle = document.body || document.documentElement;
            expect(rect.getElementOffset(docEle).left).to.be.above(0);
            expect(rect.getElementOffset(docEle).top).to.be.above(0);
            expect(rect.getElementOffset(docEle).width).to.be.above(Math.round(docEle.style.width));
            expect(rect.getElementOffset(docEle).height).to.be.above(Math.round(docEle.style.height));
        });

        it('setScrollTop', function () {
            document.body.style.height = '10000px';
            rect.setScrollTop(500);
            expect(rect.getScrollTop()).to.be.equal(500);
        });
    });
});
