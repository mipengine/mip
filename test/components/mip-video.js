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

        it('renderPlayElsewhere && no poster', function () {
            var HTML = '<mip-video id="video-fivc" controls layout="responsive" width="640" height="360" '
               +    'src="http://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4">'
               + '</mip-video>';
            video.element = util.dom.create(HTML);
            video.firstInviewCallback();
            video.renderPlayElsewhere();
            var ele = video.element.querySelectorAll('.mip-video-poster');
            expect(ele.length).to.be.at.least(1);
        });

        it('renderPlayElsewhere && poster', function () {
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

        it('renderPlayElsewhere && source', function () {
            var HTML = '<mip-video id="video-fivc" poster="https://www.mipengine.org/static/img/sample_04.jpg" '
               +    'controls layout="responsive" width="640" height="360">'
               + '<source src="http://mip-doc.bj.bcebos.com/sample_video.mp4?authorization=bce-auth-v1%2F7f4a0856197f450aa711a2af2d14b9a0%2F2017-08-30T07%3A54%3A22Z%2F-1%2Fhost%2F6332958b3c12e4415fcbfa275b4557c81972010edbf0ce7399700068e6787dd9" type="video/mp4">'
               + '<source src="http://mip-doc.bj.bcebos.com/sample_video.webm?authorization=bce-auth-v1%2F7f4a0856197f450aa711a2af2d14b9a0%2F2017-08-30T08%3A32%3A28Z%2F-1%2Fhost%2F6d893e30e98cb43605600acbcac043d2c05cf761e99fa1c8a932a995e0b52b48" type="video/webm">'
               + '<source src="http://mip-doc.bj.bcebos.com/sample_video.ogv?authorization=bce-auth-v1%2F7f4a0856197f450aa711a2af2d14b9a0%2F2017-08-30T07%3A55%3A00Z%2F300%2Fhost%2Fe877bb7bff39bd30a82ac28c409a0cd5329a4c6a01725ac8fef1b3b2089f2a42" type="video/ogg">'
               + '</mip-video>';
            video.element = util.dom.create(HTML);
            video.firstInviewCallback();
            video.renderPlayElsewhere();
            // playelsewhere 时， 不创建video标签
            var ele = video.element.querySelectorAll('video');
            expect(ele.length).to.be.false;
        });
    });
});