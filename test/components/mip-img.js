define(function (require) {
    'use strict';

    var util = require('util');
    var viewport = require('viewport');
    var Img = require('components/mip-img');
    var img = new Img();
    var clickEvent = util.event.create('click');

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
            var HTML = "<mip-img width=350 height=263 alt='mip img' popup src='https://www.mipengine.org/static/img/sample_01.jpg'></mip-img>";
            img.element = util.dom.create(HTML);
            img.customElement = {resourcesComplete:function(){}};
            img.firstInviewCallback();
            var ele = img.element.querySelectorAll('img');
            expect(ele.length).to.be.at.least(1);
        });

        it('load error', function () {
            var HTML = "<mip-img width=350 height=263 alt='mip img' popup src='https://www.mipengine.org/static/img/sample_01xx.jpg'></mip-img>";
            img.element = util.dom.create(HTML);
            img.customElement = {resourcesComplete:function(){}};
            img.firstInviewCallback();
            var ele = img.element.querySelectorAll('img');
            expect(ele.length).to.be.at.least(1);
        });

        it('has build', function () {
            var HTML = "<mip-img width=350 height=263 alt='mip img' popup src='https://www.mipengine.org/static/img/sample_01.jpg'><img width=350 height=263 alt='mip img' popup src='https://www.mipengine.org/static/img/sample_01.jpg'></mip-img>";
            img.element = util.dom.create(HTML);
            img.customElement = {resourcesComplete:function(){}};
            var result = img.firstInviewCallback();
            expect(result).to.be.undefined;
        });

        it('event', function (done) {
            var ele = document.createElement('script');
            ele.src = 'https://mipcache.bdstatic.com/static/v1/mip.js';
            document.body.appendChild(ele);
            ele.onload = function () {
                var HTML = "<mip-img id='mfivc' width=350 height=263 alt='mip img' popup src='https://www.mipengine.org/static/img/sample_01.jpg'></mip-img>";
                var ele = util.dom.create(HTML);
                document.body.prepend(ele);
                viewport.setScrollTop(0);
                setTimeout(function () {
                    var renderEle = document.querySelector('#mfivc img');
                    dispatchEvent(renderEle, clickEvent, 'click');
                    var popupWrapper = document.querySelector('.mip-img-popUp-wrapper');
                    dispatchEvent(popupWrapper, clickEvent, 'click');

                    // resize
                    var resizeEvent = util.event.create('resize');
                    dispatchEvent(window, resizeEvent, 'resize');
                    done();
                }, 500);
            }
            ele.onerror = function () {
                done();
            }
        });
    });
});