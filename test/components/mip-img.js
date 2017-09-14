define(function (require) {
    'use strict';

    var util = require('util');
    var Img = require('components/mip-img');
    var img = new Img();
    var cEvent = util.event.create('click');

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
        it('firstInviewCallback', function () {
            var HTML = '<mip-img alt="mip img" popup layout="responsive" width="350" height="263" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>';
            img.element = util.dom.create(HTML);
            img.element.customElement = {resourcesComplete: function () {}};
            img.firstInviewCallback();
            var ele = img.element.querySelectorAll('img');
            expect(ele.length).to.be.at.least(1);
        });

        it('img load error', function (done) {
            var HTML = '<mip-img src="https://www.example.com/xx.jpg"></mip-img>';
            img.element = util.dom.create(HTML);
            img.element.customElement = {resourcesComplete: function () {}};
            img.firstInviewCallback();
            var ele = img.element.querySelector('img');
            setTimeout(function () {
                expect(ele.src.indexOf('mip_img_ori')).to.be.at.least(0);
                done();
            }, 1000);
        });

        it('popup hash exist', function (done) {
            var HTML = '<mip-img alt="mip img" popup layout="responsive" width="350" height="263" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>';
            img.element = util.dom.create(HTML);
            img.element.customElement = {resourcesComplete: function () {}};
            img.firstInviewCallback();
            var ele = img.element.querySelector('img');
            img.popupHandle(cEvent, img.element, ele);

            setTimeout(function () {
                var HTML = '<mip-img alt="mip img" popup layout="responsive" width="350" height="263" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>';
                img.element = util.dom.create(HTML);
                img.element.customElement = {resourcesComplete: function () {}};
                img.firstInviewCallback();

                var ele = img.element.querySelector('img');
                var result = img.createPopup(ele);
                var wrapper = document.body.querySelector('.mip-img-popUp-wrapper');
                expect(result).to.be.equal(wrapper);
                done();
            }, 1000);
        });

        it('popupClickHandle', function (done) {
            var HTML = '<mip-img alt="mip img" popup layout="responsive" width="350" height="263" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>';
            img.element = util.dom.create(HTML);
            img.element.customElement = {resourcesComplete: function () {}};
            img.firstInviewCallback();

            setTimeout(function () {
                var popup = document.querySelector('.mip-img-popUp-wrapper');
                var popUpBg = popup.querySelector('.mip-img-popUp-bg');
                var popupImg = popup.querySelector('img');
                var ele = img.element.querySelector('img');
                expect(popup).to.not.be.undefined;
                expect(popUpBg).to.not.be.undefined;
                expect(popupImg).to.not.be.undefined;
                expect(ele).to.not.be.undefined;
                ele.width = 1000;
                img.popupClickHandle({
                    popup: popup,
                    popUpBg: popUpBg,
                    popupImg: popupImg,
                    img: ele
                });
                done();
            }, 1000);
        });

        it('resize', function () {
            var HTML = '<mip-img alt="mip img" popup layout="responsive" width="350" height="263" src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>';
            img.element = util.dom.create(HTML);
            img.element.customElement = {resourcesComplete: function () {}};
            img.firstInviewCallback();

            setTimeout(function () {
                var popup = document.querySelector('.mip-img-popUp-wrapper');
                var popUpBg = popup.querySelector('.mip-img-popUp-bg');
                var popupImg = popup.querySelector('img');
                var ele = img.element.querySelector('img');
                expect(popUpBg).to.not.be.undefined;
                expect(popupImg).to.not.be.undefined;
                expect(ele).to.not.be.undefined;
                img.resizeHandle({
                    img: ele,
                    popupImg: popupImg
                });
            }, 1000);
        })
    });
});