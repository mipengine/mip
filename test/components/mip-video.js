define(function (require) {
    'use strict';

    var util = require('util');
    var video = require('components/mip-video');
    var viewport = require('viewport');
    var clickEvent = util.event.create('click');

    var promise = new Promise(function (resolve, reject) {
        var HTML = '<mip-video id="video-fivc" poster="https://www.mipengine.org/static/img/sample_04.jpg" '
               +    'controls layout="responsive" width="640" height="360" '
               +    'src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
               + '</mip-video>'
        var ele = util.dom.create(HTML);
        setTimeout(function () {
            resolve();
        }, 1000);
        document.body.prepend(ele);
        viewport.setScrollTop(0);
    });

    function colorRGB2Hex(color) {
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);

        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
     }

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

    describe('mip video', function (done) {
        it('firstInviewCallback', function () {
            promise.then(function () {
                var renderEle = document.querySelectorAll('#video-fivc video');
                expect(renderEle.length).to.be.at.least(1);
                done();
            }).catch(done);
        });

        it('renderPlayElsewhere', function (done) {
            promise.then(function () {
                var instance = new video();
                instance.element = document.body;
                instance.attributes = {
                    src: 'https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4'
                }
                var ele = instance.renderPlayElsewhere();
                expect(ele.style.background.indexOf('rgb(51, 51, 51)')).to.be.not.equal(-1);
                dispatchEvent(ele, clickEvent, 'click')

                instance.attributes.poster = 'https://www.mipengine.org/static/img/sample_04.jpg';
                ele = instance.renderPlayElsewhere();
                expect(ele.style.backgroundSize).to.be.equal('cover');
                done();
            }).catch(done);
        });
    });
});