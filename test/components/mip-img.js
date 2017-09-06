define(function (require) {
    'use strict';

    var util = require('util');
    var mipPix = require('components/mip-pix');
    var viewport = require('viewport');
    var instance = new mipPix();

    function createElement (prop, cb) {
        var HTML = "<mip-img width=350 height=263 alt='mip img' "
                   +    "popup src='https://www.mipengine.org/static/img/sample_01.jpg'>"
                   + "</mip-img>"
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
        }, 200);
    }

    describe('mip img', function () {
        it('firstInviewCallback', function (done) {
            createElement({
                id: 'img-fivc'
            }, function () {
                var renderEle = document.querySelectorAll('#img-fivc img');
                expect(renderEle.length).to.be.at.least(1);
                done();
            });
        });

        it('img click', function (done) {
            var id = 'img-click';
            createElement({
                id: id
            }, function () {
                var e = document.getElementById(id);
                var img = e.querySelector('img');
                img.click();
                var popupWrapper = document.querySelector('.mip-img-popUp-wrapper');
                expect(popupWrapper.style.display).to.be.equal('block');
                popupWrapper.click();
                done();
            });
        });

        it('repeat pupup', function () {
            var id = 'repeat-popup';
            createElement({
                id: id
            }, function () {
                var ele = document.getElementById(id);
                var img = ele.querySelector('img');
                img.click();
                createElement({
                    'alt': 'mip img'
                }, null);
                var eles = document.querySelectorAll('.mip-img-popUp-wrapper');
                expect(eles.length).to.be.equal(1);
            });
        });
    });
});