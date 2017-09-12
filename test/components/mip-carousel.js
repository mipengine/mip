define(function (require) {
    'use strict';

    var resource = require('resources');
    var util = require('util');
    var carouselHTML = "<mip-carousel id='mip-carousel' indicatorId='mip-carousel-example' width=600 height=400 defer=200 layout='responsive'"
                        +    "autoplay buttonController indicator popup src='https://www.mipengine.org/static/img/sample_01.jpg'>"
                        +   '<div popup><mip-img popup src=""></mip-img></div>'
                        +   '<div><mip-img src=""></mip-img></div>'
                        +   '<div><mip-img src=""></mip-img></div>'
                        + "</mip-img>"

    var indicatorHTML = '<div class="mip-carousel-indicator-wrapper">'
                        +   '<div class="mip-carousel-indicatorDot" id="mip-carousel-example">'
                        +       '<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>'
                        +       '<div class="mip-carousel-indecator-item"></div>'
                        +       '<div class="mip-carousel-indecator-item"></div>'
                        +   '</div>'
                        + '</div>'
    var clickEvent = util.event.create('click');
    var dom = util.dom.create(indicatorHTML);
    document.body.appendChild(dom);

    var promise = new Promise(function (resolve, reject) {
        var ele = util.dom.create(carouselHTML);
        document.body.appendChild(ele);
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

    describe('mip carousel', function () {
        it('carousel event', function () {
            promise.then(function (done) {
                var ele = document.querySelector('#mip-carousel .mip-carousel-slideBox');
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
                dispatchEvent(ele, startEvent, 'touchstart');
                dispatchEvent(ele, moveEvent, 'touchmove');
                dispatchEvent(ele, endEvent, 'touchend');

                // resize
                var resizeEvent = util.event.create('resize');
                dispatchEvent(window, resizeEvent, 'resize');

                // indicators
                var indicators = document.querySelectorAll('.mip-carousel-indecator-item');
                dispatchEvent(indicators[1], clickEvent, 'click');

                // buttonController
                var ele = document.querySelector('#mip-carousel');
                var next = ele.querySelector('.mip-carousel-nextBtn');
                var pre = ele.querySelector('.mip-carousel-preBtn');
                dispatchEvent(next, clickEvent, 'click');
                dispatchEvent(pre, clickEvent, 'click');
                expect(!!next).to.be.true;
                expect(!!pre).to.be.true;
                done();
            });
        });
    });
});