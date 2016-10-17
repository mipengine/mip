define(function (require) {
    'use strict';

    var docElem = document.documentElement;
    docElem.closest = docElem.contains = null;

    var dom = require('dom/dom');
    var element = dom.create(
'<div class="dom-test test">\
<div class="dom-closest-target">\
    <div class="dom-closest-source">\
</div>\
</div>'
    );
    document.body.appendChild(element);
    describe(name || 'dom', function () {
        it('matches', function () {
            expect(dom.matches(element, 'div.dom-test')).to.be.true;
            expect(dom.matches('', 'div')).to.be.false;
        });

        it('closest', function () {
            expect(dom.closest(element, 'body')).to.equal(document.body);
        });

        it('contains', function () {
            expect(dom.contains(document.body, element)).to.be.true;
        });

        it('closestTo', function () {
            var sourceElement = element.querySelector('.dom-closest-source');
            var targetElement = element.querySelector('.dom-closest-target');

            expect(dom.closestTo(sourceElement, '.test', targetElement)).to.be.null;
            expect(dom.closestTo(sourceElement, '.test', element)).to.equal(element);
        });

        it('create', function () {
            expect(dom.create('')).to.be.null;
            expect(dom.create('<div></div><div></div>')).to.have.lengthOf(2);
        });
    });

});
