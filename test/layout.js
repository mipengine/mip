/**
 * @file For layout
 */
define(function (require) {
    'use strict';

    var util = require('util');
    var layout = require('layout');
    var elementFixed = util.dom.create('<div layout="fixed"></div>');
    var elementNoDisplay = util.dom.create('<div layout="nodisplay"></div>');
    var elementFixedHeight = util.dom.create('<div height="100"></div>');
    var elementFixedResponsive = util.dom.create('<div width="100px" height="100px" sizes="on"></div>');
    var elementFlexItem = util.dom.create('<div layout="flex-item" width="100" height="200"></div>');
    var elementNoNo = util.dom.create('<mip-pix></mip-pix>');
    var elementDimensions = util.dom.create('<mip-audio></mip-audio>');

    layout.applyLayout(elementFixed);
    layout.applyLayout(elementNoDisplay);
    layout.applyLayout(elementFixedHeight);
    layout.applyLayout(elementFixedResponsive);
    layout.applyLayout(elementFlexItem);
    layout.applyLayout(elementNoNo);
    describe('layout', function () {
        it('applyLayout', function () {
            expect(elementFixed.classList.contains('mip-layout-size-defined')).to.be.true;
            expect(elementNoDisplay.style.display).to.equal('none');
            expect(elementFixedHeight.style.height).to.equal('100px');
            expect(elementFixedResponsive.children.length).to.equal(1);
            expect(elementFlexItem.style.width).to.equal('100px'); 
            expect(elementNoNo.style.width).to.equal('1px'); 
        });

        it('isLoadingAllowed', function () {
            expect(layout.isLoadingAllowed('mip-pix')).to.be.false;
        });

        it('elementDimensions', function () {
            var dimension = layout.getNaturalDimensions(elementDimensions);
            expect(dimension.width.length).to.above(0);
        });

        it('parseLength', function () {
            expect(layout.parseLength(10)).to.equal('10px');
            expect(layout.parseLength(null)).to.be.undefined;
            expect(layout.parseLength('10test')).to.be.undefined;
        });
    });
});
