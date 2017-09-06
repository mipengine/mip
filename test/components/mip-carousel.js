define(function (require) {
    'use strict';

    var resource = require('resources');
    var util = require('util');
    var carouselHTML = "<mip-carousel width=600 height=400 defer=200 layout='responsive'"
                        +    "autoplay buttonController indicator popup src='https://www.mipengine.org/static/img/sample_01.jpg'>"
                        +   '<mip-img popup src=""></mip-img>'
                        +   '<mip-img src=""></mip-img>'
                        +   '<mip-img src=""></mip-img>'
                        + "</mip-img>"

    var indicatorHTML = '<div class="mip-carousel-indicator-wrapper">'
                        +   '<div class="mip-carousel-indicatorDot" id="mip-carousel-example">'
                        +       '<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>'
                        +       '<div class="mip-carousel-indecator-item"></div>'
                        +       '<div class="mip-carousel-indecator-item"></div>'
                        +   '</div>'
                        + '</div>'

    function createElement (prop, cb) {
        var ele = util.dom.create(carouselHTML);
        for (var key in prop) {
            if (prop.hasOwnProperty(key)) {
                ele.setAttribute(key, prop[key]);
            }
        }
        document.body.appendChild(ele);
        setTimeout(function () {
            cb && cb();
        }, 200);
    }

    describe('mip carousel', function () {
        it('build', function (done) {
            var id = 'cl-build';
            var ele = createElement({
                id: id
            }, function () {
                var renderEle = document.querySelectorAll('#cl-build .mip-carousel-wrapper');
                expect(renderEle.length).to.be.at.least(1);
                done();
            });
        });

        it('carousel indicator', function (done) {
            var id = 'cl-indicator';
            var dom = util.dom.create(indicatorHTML);
            document.body.appendChild(dom);
            var ele = createElement({
                id: id,
                indicatorId: 'mip-carousel-example'
            }, function () {
                var wrapper = document.querySelector('#cl-indicator');
                var indicators = document.querySelectorAll('.mip-carousel-indecator-item');
                indicators[1].click();
                var renderEle = document.querySelectorAll('#cl-indicator .mip-carousel-wrapper');
                done();
            });
        });

        it('carousel touch event', function (done) {
            var clickTester = createElement({
                id: 'mc'
            }, function () {
                var ele = document.querySelector('#mc .mip-carousel-slideBox');
                var startEvent = util.event.create('touchstart');
                var moveEvent = util.event.create('touchmove');
                var endEvent = util.event.create('touchend');
                startEvent.touches
                    = moveEvent.touches
                    = endEvent.touches
                    = [{clientX: 0, clientY: 0}];
                startEvent.targetTouches
                    = moveEvent.targetTouches
                    = endEvent.targetTouches
                    = [{pageX: 0, pageY: 0}];
                ele.dispatchEvent(startEvent);
                ele.dispatchEvent(moveEvent);
                ele.dispatchEvent(endEvent);
                done();
            });
        });

        it('resize', function () {
            var resizeEvent = util.event.create('resize');
            window.dispatchEvent(resizeEvent);
        });

        it('carousel buttonController', function () {
            var ele = createElement({
                id: 'bcs',
                indicatorId: 'mip-carousel-example'
            }, null);

            var ele = document.querySelector('#bcs');
            var next = ele.querySelector('.mip-carousel-nextBtn');
            var pre = ele.querySelector('.mip-carousel-preBtn');
            next.click();
            pre.click();
        });
    });
});