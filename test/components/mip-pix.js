define(function (require) {
    'use strict';

    var util = require('util');
    var Pix = require('components/mip-pix');
    var pix = new Pix();
    var reg = /\$?{.+?}/g;

    describe('mip pix', function () {
        it('firstInviewCallback', function () {
            var HTML = "<mip-pix src='https://www.example.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}'></mip-pix>"
            pix.element = util.dom.create(HTML);
            pix.firstInviewCallback();
            var ele = pix.element.querySelectorAll('img');
            expect(reg.test(ele.src)).to.be.false;
        });

        it('experiment', function () {
            var HTML = "<mip-pix src='https://www.example.org/a.gif?mip-x-button-color=${MIP-X-BUTTON-COLOR}&mip-x-font-color=${MIP-X-FONT-COLOR}'></mip-pix>"
            pix.element = util.dom.create(HTML);
            pix.firstInviewCallback();
            var ele = pix.element.querySelectorAll('img');
            expect(reg.test(ele.src)).to.be.false;
        });
    });
});