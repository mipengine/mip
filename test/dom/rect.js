define(function (require) {
    'use strict';

    var platform = require('src/util/platform');
    platform.needSpecialScroll = true;
    var rect = require('src/dom/rect');
    describe('rect', function () {
        it('getElementRect', function () {
            expect(rect.getElementRect(document.body).bottom).to.be.above(0);
        });
    });
});
