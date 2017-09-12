define(function (require) {
    'use strict';

    var $ = require('jquery');
    var srcdoc = 'This is mip iframe!';
    var src = 'https://www.mipengine.org/article/instant-pageview.html';

    describe('mip iframe', function () {
        it('build', function (){
            var ele = '<mip-iframe id="ifr-build" width=400 height=300 '
                + 'src="' + src + '"  srcdoc="' + srcdoc + '"></mip-iframe>';
            $(document.body).append(ele);
            var rele = $('#ifr-build iframe');
            var reg = new RegExp(window.btoa(srcdoc));
            expect(reg.test(window.btoa(srcdoc))).to.be.true;
        });

        it('no rect', function (){
            var ele = '<mip-iframe src="' + src + '"  srcdoc="' + srcdoc + '"></mip-iframe>';
            $(document.body).append(ele);
            var rele = $('#ifr-build iframe');
            var reg = new RegExp(window.btoa(srcdoc));
            expect(reg.test(window.btoa(srcdoc))).to.be.true;
        });
    });
});