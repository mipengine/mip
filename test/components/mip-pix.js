define(function (require) {
    'use strict';

    var $ = require('jquery');
    var util = require('util');
    var mipPix = require('components/mip-pix');
    var viewport = require('viewport');
    var instance = new mipPix();
    var reg = /\$?{.+?}/g;

    var promise = new Promise(function (resolve, reject) {
        var HTML = "<mip-pix id='mp' src='https://www.example.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}'></mip-pix>"
                    + "<mip-pix id='mpe' src='https://www.example.org/a.gif?mip-x-button-color=${MIP-X-BUTTON-COLOR}&mip-x-font-color=${MIP-X-FONT-COLOR}'></mip-pix>";
        $(document.body).prepend(HTML);
        viewport.setScrollTop(0);
        setTimeout(function () {
            resolve();
        }, 1000);
    });

    describe('mip pix', function (done) {
        it('firstInviewCallback', function () {
            promise.then(function () {
                var renderEle = $('#mp img').get(0);
                expect(reg.test(renderEle.src)).to.be.false;
                done();
            }).catch(done);
        });

        it('experiment', function (done) {
            promise.then(function () {
                var renderEle = $('#mpe img').get(0);
                expect(reg.test(renderEle.src)).to.be.false;
                done();
            }).catch(done);
        });
    });
});