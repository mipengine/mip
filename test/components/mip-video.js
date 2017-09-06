define(function (require) {
    'use strict';

    var util = require('util');
    var video = require('components/mip-video');
    var viewport = require('viewport');

    function createElement (prop, cb) {
        var HTML = '<mip-video id="mip-video" poster="https://www.mipengine.org/static/img/sample_04.jpg" '
                   +    'controls layout="responsive" width="640" height="360" '
                   +    'src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
                   + '</mip-video>'

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

    function colorRGB2Hex(color) {
        var rgb = color.split(',');
        var r = parseInt(rgb[0].split('(')[1]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2].split(')')[0]);

        var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        return hex;
     }

    describe('mip video', function () {
        it('firstInviewCallback', function (done) {
            createElement({
                id: 'video-fivc'
            }, function () {
                var renderEle = document.querySelectorAll('#video-fivc video');
                expect(renderEle.length).to.be.at.least(1);
                done();
            });
        });

        it('renderPlayElsewhere', function () {
            var instance = new video();
            instance.element = document.body;
            instance.attributes = {
                src: 'https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4'
            }
            var ele = instance.renderPlayElsewhere();
            expect(ele.style.background).to.be.equal('rgb(51, 51, 51)');
            ele.click();

            instance.attributes.poster = 'https://www.mipengine.org/static/img/sample_04.jpg';
            ele = instance.renderPlayElsewhere();
            expect(ele.style.backgroundSize).to.be.equal('cover');
        });
    });
});