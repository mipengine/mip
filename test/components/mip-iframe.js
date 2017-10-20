define(function (require) {
    'use strict';

    var util = require('util');
    var Iframe = require('components/mip-iframe');
    var iframe = new Iframe();

    describe('mip iframe', function () {
        it('build', function () {
            var iframeHTML = '<mip-iframe width=400 height=300 src="https://www.mipengine.org/article/instant-pageview.html" srcdoc="This is mip iframe!"></mip-iframe>'
            iframe.element = util.dom.create(iframeHTML);
            iframe.build();
            var ele = iframe.element.querySelectorAll('iframe');
            expect(ele.length).to.be.at.least(1);
        });

        it('no src', function () {
            var iframeHTML = '<mip-iframe width=400 height=300></mip-iframe>'
            iframe.element = util.dom.create(iframeHTML);
            var result = iframe.build();
            expect(result).to.be.undefined;
        });

        it('no height and width', function () {
            var iframeHTML = '<mip-iframe srcdoc="This is mip iframe"></mip-iframe>'
            iframe.element = util.dom.create(iframeHTML);
            var result = iframe.build();
            expect(result).to.be.undefined;
        });
    });
});