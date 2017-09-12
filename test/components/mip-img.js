define(function (require) {
    'use strict';

    var util = require('util');
    var mipPix = require('components/mip-pix');
    var viewport = require('viewport');
    var instance = new mipPix();
    var clickEvent = util.event.create('click');

    var promise = new Promise(function (resolve, reject) {
        var HTML = "<mip-img id='img-fivc' width=350 height=263 alt='mip img' "
               +    "popup src='https://www.mipengine.org/static/img/sample_01.jpg'>"
               + "</mip-img>"
        var ele = util.dom.create(HTML);
        document.body.prepend(ele);
        viewport.setScrollTop(0);
        setTimeout(function () {
            resolve();
        }, 1000);
    });

    var dispatchEvent = function (element, evt, event) {
        if (!element) {
            return;
        }
        if (document.createEventObject) {
            return element.fireEvent('on' + event, evt)
        } else {
            evt.initEvent(event, true, true);
            return !element.dispatchEvent(evt);
        }
    };

    describe('mip img', function () {
        it('firstInviewCallback', function (done) {
            promise.then(function () {
                var renderEle = document.querySelectorAll('#img-fivc img');
                var eles = Array.prototype.slice.call(renderEle);
                expect(eles.length).to.be.at.least(1);
                done();
            }).catch(done);
        });

        it('img event', function (done) {
            promise.then(function () {
                var e = document.getElementById('img-fivc');
                var img = e.querySelector('img');
                dispatchEvent(img, clickEvent, 'click');
                var popupWrapper = document.querySelector('.mip-img-popUp-wrapper');
                dispatchEvent(popupWrapper, clickEvent, 'click');

                // resize
                var resizeEvent = util.event.create('resize');
                dispatchEvent(window, resizeEvent, 'resize');
                done();
            }).catch(done);
        });

        it('repeat pupup', function (done) {
            promise.then(function () {
                var ele = document.getElementById('img-fivc');
                var img = ele.querySelector('img');
                dispatchEvent(img, clickEvent, 'click');
                var eles = document.querySelectorAll('.mip-img-popUp-wrapper');
                expect(eles.length).to.be.equal(1);
                done();
            }).catch(done);
        });
    });
});