define(function (require) {
    'use strict';

    var platform = require('src/util/platform');

    describe('platform', function () {
        expect(platform.isIos()).to.be.false;
        expect(platform.isSafari()).to.be.false;
        expect(platform.isChrome()).to.be.true;
        expect(platform.isUc()).to.be.false;
        expect(platform.isWebkit()).to.be.true;
    });

});