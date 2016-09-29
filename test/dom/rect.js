define(function (require) {
    'use strict';

    var platform = require('src/util/platform');
    platform.needSpecialScroll = true;
    var rect = require('src/dom/rect');
    describe('rect', function () {
        it('getDomRect', function () {
            expect(rect.getDomRect(document.body).bottom).to.be.above(0);
        });
    });
});