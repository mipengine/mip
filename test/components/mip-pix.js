define(function (require) {
    'use strict';

    var util = require('util');
    var mipPix = require('components/mip-pix');
    var viewport = require('viewport');
    var instance = new mipPix();
    var reg = /\$?{.+?}/g;

    var promise1 = new Promise(function (resolve, reject) {
        var HTML = "<mip-pix id='mp' src='https://www.example.org/a.gif?t=${TIME}&title=${TITLE}&host=${HOST}'></mip-pix>";
        var ele = util.dom.create(HTML);
        document.body.prepend(ele);
        viewport.setScrollTop(0);
        setTimeout(function () {
            resolve();
        }, 600);
    });

    var promise2 = new Promise(function (resolve, reject) {
        var HTML = "<mip-pix id='mpe' src='https://www.example.org/a.gif?mip-x-button-color=${MIP-X-BUTTON-COLOR}&mip-x-font-color=${MIP-X-FONT-COLOR}'></mip-pix>";
        var ele = util.dom.create(HTML);
        document.body.prepend(ele);
        viewport.setScrollTop(0);
        setTimeout(function () {
            resolve();
        }, 1000);
    });

    describe('mip pix', function (done) {
        it('firstInviewCallback', function () {
            promise1.then(function () {
                var renderEle = document.querySelector('#mp img');
                expect(reg.test(renderEle.src)).to.be.false;
                done();
            }).catch(done);
        });

        it('experiment', function (done) {
            promise2.then(function () {
                var renderEle = document.querySelector('#mpe img');
                console.log( document.getElementById('#mpe'));
                expect(reg.test(renderEle.src)).to.be.false;
                done();
            }).catch(done);
        });
    });
});