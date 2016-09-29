define(function (require) {
    'use strict';

    var css = require('src/dom/css');

    describe('css', function () {
        var element = document.createElement('div');
        document.body.appendChild(element);

        var element1 = document.createElement('div');
        document.body.appendChild(element1);

        var elements = [element, element1];

        it('single element', function () {
            // Set property
            css(element, 'position', 'absolute');
            expect(css(element, 'position')).to.equal('absolute');
            // Set properties
            css(element, {
                width: 10,
                height: 20
            });
            expect(css(element, 'width')).to.equal('10px');
            expect(css(element, 'height')).to.equal('20px');
            expect(css(element, 'overflow')).to.equal('visible');
        });

        it('multi elements', function () {
            // Set property
            css(elements, 'position', 'relative');
            expect(css(elements, 'position')).to.eql(['relative', 'relative']);

            // Set properties
            css(elements, {
                left: '10px',
                top: '20px'
            });
            expect(css(elements, 'left')).to.eql(['10px', '10px']);
            expect(css(elements, 'top')).to.eql(['20px', '20px']);

            css(element1, 'left', 5);
            expect(css(elements, 'left')).to.eql(['10px', '5px']);
        });

        it('unit', function () {
            css(element, 'opacity', 0);
            expect(css(element, 'opacity')).to.equal('0');

            css(element, 'font-size', 10);
            expect(css(element, 'font-size')).to.equal('10px');
        });

        it('prefix', function () {
            // Find a property that need prefixed.
            var prefix = ['webkit', 'moz', 'o', 'ms'];
            var property = null;
            for (var i = 0; i < prefix.length; i++) {
                var prefixReg = new RegExp('^' + prefix[i]);
                for (var name in element.style) {
                    if (prefixReg.test(name)) {
                        name = name.replace(prefix[i], '');
                        name = name.charAt(0).toLowerCase() + name.slice(1);
                        if (!(name in element.style)) {
                            property = name;
                            break;
                        }
                    }
                }
                if (property) {
                    break;
                }
            }
            expect(property).to.not.be.null;
            css(element, property, 'test');
            expect(element.style[property]).to.not.equal('test');
        });

        it('non-standard', function () {
            var obj = css({test: 1});
            expect(obj.test).to.equal(1);

            obj = css({test: 1}, 'left', 0)
            expect(obj.left).to.be.undefined;

        });

    });
});
