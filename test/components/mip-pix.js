define(function (require) {
    'use strict';

    var util = require('util');
    var mipPix = require('components/mip-pix');
    var viewport = require('viewport');
    var instance = new mipPix();
    var reg = /\$?{.+?}/g;

    function createElement (prop) {
        var HTML = "<mip-pix></mip-pix>";
        var ele = util.dom.create(HTML);
        for (var key in prop) {
            if (prop.hasOwnProperty(key)) {
                ele.setAttribute(key, prop[key]);
            }
        }
        document.body.prepend(ele);
        viewport.setScrollTop(0);
    }
    createElement({
        id: 'mip-pix',
        src: 'https://www.example.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}'
    });
    createElement({
        id: 'mip-pix-experiment',
        src: 'https://www.example.org/a.gif?mip-x-button-color=${MIP-X-BUTTON-COLOR}&mip-x-font-color=${MIP-X-FONT-COLOR}'
    });

    describe('mip pix', function () {
        it('firstInviewCallback', function () {
            var renderEle = document.querySelector('#mip-pix img');
            expect(reg.test(renderEle.src)).to.be.false;
        });

        it('experiment', function () {
            var renderEle = document.querySelector('#mip-pix-experiment img');
            expect(reg.test(renderEle.src)).to.be.false;
        });
    });
});