define(function (require) {
    'use strict';

    var util = require('util');
    var mipPix = require('components/mip-pix');
    var viewport = require('viewport');
    var instance = new mipPix();
    var reg = /\$?{.+?}/g;

    function createElement (prop, cb) {
        var HTML = "<mip-pix></mip-pix>";
        var ele = util.dom.create(HTML);
        for (var key in prop) {
            if (prop.hasOwnProperty(key)) {
                ele.setAttribute(key, prop[key]);
            }
        }
        document.body.prepend(ele);
        viewport.setScrollTop(0);
        setTimeout(function () {
            cb && cb();
        }, 300);
    }

    describe('mip pix', function () {
        it('firstInviewCallback', function (done) {
            createElement({
                id: 'mip-pix',
                src: 'https://www.example.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}'
            }, function () {
                var renderEle = document.querySelectorAll('#mip-pix img');
                var eles = Array.prototype.slice.call(renderEle);
                expect(eles.length).to.be.at.least(1);
                done();
            });
        });

        it('experiment', function (done) {
            createElement({
                id: 'mip-pix-experiment',
                src: 'https://www.example.org/a.gif?mip-x-button-color=${MIP-X-BUTTON-COLOR}&mip-x-font-color=${MIP-X-FONT-COLOR}'
            }, function () {
                var renderEle = document.querySelector('#mip-pix img');
                expect(reg.test(renderEle.src)).to.be.false;
                done();
            });
        });
    });
});