/**
 * @file dom/rect test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon */

/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var rect = require('dom/rect');
    var util = require('util');

    describe('rect', function () {
        it('.get', function () {
            var left = 1;
            var top = 2;
            var width = 3;
            var height = 4;

            expect(rect.get(left, top, width, height)).to.deep.equal({
                left: left,
                top: top,
                width: width,
                height: height,
                right: left + width,
                bottom: top + height
            });
        });

        it('.scrollingElement', function () {
            expect(rect.scrollingElement).to.not.be.null;
        });

        it('.getElementRect', function () {
            var node = util.dom.create([
                '<div style="width: 10px; height: 10px; left: 10px; top: 10px; position: absolute"></div>'
            ].join(''));

            document.body.appendChild(node);

            expect(rect.getElementRect(node)).to.deep.equal({
                left: 10,
                top: 10,
                width: 10,
                height: 10,
                right: 20,
                bottom: 20
            });
            document.body.removeChild(node);
        });

        it('.getElementOffset', function () {
            var node = util.dom.create([
                '<div style="width: 10px; height: 10px; left: 10px; top: 10px; position: absolute"></div>'
            ].join(''));

            document.body.appendChild(node);

            expect(rect.getElementOffset(node)).to.deep.equal({
                left: 10,
                top: 10,
                width: 10,
                height: 10
            });
            document.body.removeChild(node);
        });

        it('.getScrollLeft', function () {
            expect(rect.getScrollLeft()).to.be.a('number');
        });

        it('.getScrollTop', function () {
            expect(rect.getScrollTop()).to.be.a('number');
        });

        it('.setScrollTop', function () {
            expect(rect.setScrollTop).to.be.a('function');
        });

        it('.getScrollHeight', function () {
            expect(rect.getScrollHeight()).to.be.a('number');
        });

        it('.getScrollWidth', function () {
            expect(rect.getScrollWidth()).to.be.a('number');
        });

        it('.overlapping', function () {
            expect(rect.overlapping({
                top: 1
            }, {
                bottom: 0
            })).to.be.false;

            expect(rect.overlapping({
                top: 1,
                bottom: 0
            }, {
                bottom: 1,
                top: 1
            })).to.be.false;

            expect(rect.overlapping({
                top: 1,
                bottom: 1,
                left: 1
            }, {
                bottom: 1,
                top: 1,
                right: 0
            })).to.be.false;

            expect(rect.overlapping({
                top: 1,
                bottom: 1,
                left: 1,
                right: 0
            }, {
                bottom: 1,
                top: 1,
                right: 1,
                left: 1
            })).to.be.false;

            expect(rect.overlapping({
                top: 1,
                bottom: 1,
                left: 1,
                right: 1
            }, {
                bottom: 1,
                top: 1,
                right: 1,
                left: 1
            })).to.be.true;
        });
    });
});
