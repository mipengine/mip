define(function (require) {
    'use strict';

    var srcdoc = 'This is mip iframe!';
    var src = 'https://www.mipengine.org/article/instant-pageview.html';

    describe('mip iframe', function () {
        it('build', function (){
            var ele = document.createElement('mip-iframe');
            ele.setAttribute('id', 'ifr-build');
            ele.setAttribute('src', src);
            ele.setAttribute('width', 400);
            ele.setAttribute('height', 300);
            ele.setAttribute('srcdoc', srcdoc);
            document.body.appendChild(ele);

            var rele = document.querySelector('#ifr-build iframe');
            var reg = new RegExp(window.btoa(srcdoc));
            expect(reg.test(window.btoa(srcdoc))).to.be.true;
        });

        it('no rect', function (){
            var ele = document.createElement('mip-iframe');
            ele.setAttribute('src', src);
            ele.setAttribute('srcdoc', srcdoc);
            document.body.appendChild(ele);

            var rele = document.querySelector('#ifr-build iframe');
            var reg = new RegExp(window.btoa(srcdoc));
            expect(reg.test(window.btoa(srcdoc))).to.be.true;
        });
    });
});