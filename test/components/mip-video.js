define(function (require) {
    'use strict';

    var util = require('util');
    var viewer = require('viewer');
    var Video = require('components/mip-video');
    var video = new Video();

    describe('mip video', function () {
        it('firstInviewCallback', function () {
            var HTML = '<mip-video id="video-fivc" poster="https://www.mipengine.org/static/img/sample_04.jpg" '
               +    'controls layout="responsive" width="640" height="360" '
               +    'src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
               + '<span></span>'
               + '</mip-video>';
            video.element = util.dom.create(HTML);
            video.firstInviewCallback();
            var ele = video.element.querySelectorAll('video');
            expect(ele.length).to.be.at.least(1);
        });

        it('has mip space', function () {
            var HTML = '<mip-video id="video-fivc" poster="https://www.mipengine.org/static/img/sample_04.jpg" '
               +    'controls layout="responsive" width="640" height="360" '
               +    'src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
               +    '<mip-i-space style="display: block; padding-top: 56.25%;"></mip-i-space>'
               + '</mip-video>';
            video.element = util.dom.create(HTML);
            video.firstInviewCallback();
            var ele = video.element.querySelectorAll('video');
            expect(ele.length).to.be.at.least(1);
        });

        it('renderPlayElsewhere && poster', function () {
            var HTML = '<mip-video id="video-fivc" controls layout="responsive" width="640" height="360" '
               +    'src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
               + '</mip-video>';
            video.element = util.dom.create(HTML);
            video.firstInviewCallback();
            video.renderPlayElsewhere();
            var ele = video.element.querySelectorAll('.mip-video-poster');
            expect(ele.length).to.be.at.least(1);
        });

        it('renderPlayElsewhere && no poster', function () {
            var HTML = '<mip-video id="video-fivc" poster="https://www.mipengine.org/static/img/sample_04.jpg" '
               +    'controls layout="responsive" width="640" height="360" '
               +    'src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
               + '</mip-video>';
            video.element = util.dom.create(HTML);
            video.firstInviewCallback();
            video.renderPlayElsewhere();
            var ele = video.element.querySelectorAll('.mip-video-poster');
            expect(ele.length).to.be.at.least(1);
        });
    });
});