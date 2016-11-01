/**
 * @file For fixed-element
 */
define(function (require) {
    'use strict';

    var util = require('util');
    var create = util.dom.create;
    var FixedElement = require('fixed-element').constructor;
    var fixedElement;
    var reset = function () {
        var elements = document.querySelectorAll('mip-fixed');
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode && elements[i].parentNode.removeChild(elements[i]);
        }
        fixedElement = new FixedElement();
    };

    describe('fixed-element', function () {
        it('uc', function () {

            util.platform.isIos = function () {
                return false;
            };
            util.platform.isUc = function () {
                return true;
            };
            reset();
            // For non-standard check.PS: fixedElement._count --;
            document.body.appendChild(create('<mip-fixed type="left" right="20"></mip-fixed>'));

            var element = create('<mip-fixed type="left" top="20"></mip-fixed>');
            document.body.appendChild(element);
            fixedElement.init();

            expect(element.style.position).to.equal('absolute');
            expect(fixedElement._count).to.equal(0);
        });

        it('normal', function () {
            util.platform.isUc = function () {
                return false;
            };
            util.platform.isIos = function () {
                return true;
            };
            reset();
            var elementTop = create('<mip-fixed type="top"></mip-fixed>');
            document.body.appendChild(elementTop);
            var elementBottom = create('<mip-fixed type="bottom"></mip-fixed>');
            document.body.appendChild(elementBottom);
            var elementRight = create('<mip-fixed type="right" bottom="20"></mip-fixed>');
            document.body.appendChild(elementRight);
            var elementNone = create('<mip-fixed></mip-fixed>');
            fixedElement.setFixedElementRule(elementNone);
            document.body.appendChild(elementNone);
            fixedElement.init();

            expect(elementTop.style.maxHeight).to.equal('88px');
            expect(elementBottom.style.maxHeight).to.equal('88px');
            expect(elementRight.style.bottom).to.equal('20px');
            expect(elementNone.style.display).to.equal('none');
            expect(elementNone.parentNode).to.not.equal(document.body);
        });

        it('ios', function () {
            reset();
            var elementTop = create('<mip-fixed type="top"></mip-fixed>');
            document.body.appendChild(elementTop);

            // Custom fixed element
            var style = create('<style type="text/css">\
                    mip-aaa {position:fixed}\
                </style>');
            document.head.appendChild(style);
            var elementCustom = document.createElement('mip-aaa');
            document.body.appendChild(elementCustom);

            fixedElement.init();

            expect(elementTop.style.maxHeight).to.equal('88px');
            // The elementCustom will be removed.
            expect(elementCustom.parentNode).to.not.equal(document.body);

            // Remove the style element in case element.js's tester to be failed.
            document.head.removeChild(style);
        });

     

    });
});
