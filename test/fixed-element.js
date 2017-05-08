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
        var elements = document.querySelectorAll('mip-fixed,div[mip-semi-fixed-fixedSatus]');
        for (var i = 0; i < elements.length; i++) {
            elements[i].parentNode && elements[i].parentNode.removeChild(elements[i]);
        }
        fixedElement = new FixedElement();
    };
    var style = document.createElement('style');
    style.textContent = "@media screen and (max-width:240px){ body {} }";
    var supportStyle = document.createElement('style');
    supportStyle.textContent = "@supports not (border-color: red) {}";
    document.head.appendChild(supportStyle);
    document.head.appendChild(style);

    describe('fixed-element', function () {
        after(function () {
            document.head.removeChild(style);
            document.head.removeChild(supportStyle);
        });

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
            expect(fixedElement._count).to.equal(1);
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
            var elementGoto = create('<mip-fixed type="gototop"><mip-gototop></mip-gototop></mip-fixed>');
            document.body.appendChild(elementGoto);
            var elementGotoInvalid = create('<mip-fixed type="gototop"><div></div></mip-fixed>');
            document.body.appendChild(elementGotoInvalid);
            var elementNone = create('<mip-fixed></mip-fixed>');
            fixedElement.setFixedElementRule(elementNone);
            document.body.appendChild(elementNone);
            fixedElement.init();

            expect(elementRight.style.bottom).to.equal('20px');
            expect(elementNone.style.display).to.equal('none');
            expect(elementNone.parentNode).to.not.equal(document.body);
        });

        it('ios', function () {
            util.platform.isIos = function () {
                return true;
            };
            util.platform.isUc = function () {
                return false;
            };
            fixedElement._isAndroidUc = false;
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

            // The elementCustom will be removed.
            expect(elementCustom.parentNode).to.not.equal(document.body);

            // Remove the style element in case element.js's tester to be failed.
            document.head.removeChild(style);
        });

        it('move mip-semi-fixed dom to fixedLayer', function () {
            var node = create([
                '<mip-semi-fixed id="semi-fixed" threshold="0" fixedClassNames="fixedStyle">',
                    '<div mip-semi-fixed-container id="mip-semi-fixed-fixed-container" class="absoluteStyle">',
                        'This is the mip-semi-fixed dom',
                    '</div>',
                '</mip-semi-fixed>'
            ].join(''));
            document.body.appendChild(node);

            fixedElement.init();

            var fixedelem = fixedElement._fixedLayer.querySelector('#semi-fixed');
            expect(node).to.equal(fixedelem);
        });

        it('showFixedLayer', function () {
            fixedElement.showFixedLayer(document.body);
        });

        it('hideFixedLayer', function () {
            fixedElement.hideFixedLayer(document.body);
        });
    });
});
