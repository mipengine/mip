define(function (require) {
    'use strict';

    var platform = require('util/platform');
    platform.needSpecialScroll = true;
    var rect = require('dom/rect');
    describe('rect', function () {
        it('getElementRect', function () {
            expect(rect.getElementRect(document.body).bottom).to.be.above(0);
        });
    });
});
