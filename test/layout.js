/**
 * @file layout test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var util = require('util');
    var layout = require('layout');

    describe('layout', function () {
        describe('.parseLayout', function () {
            describe('check the whitelist', function () {
                [
                    'nodisplay',
                    'fixed',
                    'fixed-height',
                    'responsive',
                    'container',
                    'fill',
                    'flex-item'
                ].forEach(function (key) {
                    it(key, function () {
                        expect(layout.parseLayout(key)).to.equal(key);
                    });
                });
            });

            it('error key', function () {
                expect(layout.parseLayout()).to.be.undefined;
                expect(layout.parseLayout('MIP')).to.be.undefined;
            });
        });

        it('.getLayoutClass', function () {
            expect(layout.getLayoutClass('MIP')).to.equal('mip-layout-MIP');
        });

        describe('.isLayoutSizeDefined', function () {
            describe('check the whitelist', function () {
                [
                    'fixed',
                    'fixed-height',
                    'responsive',
                    'fill',
                    'flex-item'
                ].forEach(function (key) {
                    it(key, function () {
                        expect(layout.isLayoutSizeDefined(key)).to.be.true;
                    });
                });
            });

            it('error key', function () {
                expect(layout.isLayoutSizeDefined()).to.be.false;
                expect(layout.isLayoutSizeDefined('MIP')).to.be.false;
            });
        });

        describe('.parseLength', function () {
            it('null', function () {
                expect(layout.parseLength()).to.be.undefined;
                expect(layout.parseLength(null)).to.be.undefined;
                expect(layout.parseLength('')).to.be.undefined;
            });

            it('number', function () {
                expect(layout.parseLength(100)).to.equal('100px');
                expect(layout.parseLength('100')).to.equal('100px');
                expect(layout.parseLength(1)).to.equal('1px');
                expect(layout.parseLength('1')).to.equal('1px');
                expect(layout.parseLength(0)).to.equal('0px');
                expect(layout.parseLength('0')).to.equal('0px');
            });

            it('decimal', function () {
                expect(layout.parseLength(100.1)).to.equal('100.1px');
                expect(layout.parseLength('100.1')).to.equal('100.1px');
                expect(layout.parseLength(1.01)).to.equal('1.01px');
                expect(layout.parseLength('1.01')).to.equal('1.01px');
                expect(layout.parseLength(0.01)).to.equal('0.01px');
                expect(layout.parseLength('0.01')).to.equal('0.01px');
            });

            it('units', function () {
                [
                    '10.1px',
                    '10em',
                    '10.01rem',
                    '10vh',
                    '10vw',
                    '10.001vmin',
                    '10vmax',
                    '10cm',
                    '10mm',
                    '10q',
                    '10in',
                    '10pc',
                    '10pt'
                ].forEach(function (key) {
                    expect(layout.parseLength(key)).to.equal(key);
                });
            });

            it('error key', function () {
                expect(layout.parseLength('100-px')).to.be.undefined;
                expect(layout.parseLength('100MIP')).to.be.undefined;
            });
        });

        it('.getLengthNumeral', function () {
            var spy = sinon.spy(window, 'parseFloat');
            layout.getLengthNumeral('MIP');
            spy.restore();

            expect(spy).to.have.been.calledOnce;
            expect(spy).to.have.been.calledWith('MIP');
        });

        it('.hasNaturalDimensions', function () {
            expect(layout.hasNaturalDimensions('mip-pix')).to.be.true;
            expect(layout.hasNaturalDimensions('mip-stats')).to.be.true;
            expect(layout.hasNaturalDimensions('mip-audio')).to.be.true;
            expect(layout.hasNaturalDimensions('mip-test-false')).to.be.false;
        });

        describe('.getNaturalDimensions', function () {
            it('exist', function () {
                var pix = document.createElement('mip-pix');
                var stats = document.createElement('mip-stats');
                expect(layout.getNaturalDimensions(pix)).to.be.a('object');
                expect(layout.getNaturalDimensions(stats)).to.be.a('object');
            });

            it('not exist', function () {
                var test = document.createElement('mip-test-div');
                var div = document.createElement('div');
                expect(layout.getNaturalDimensions(test)).to.be.a('object');
                expect(layout.getNaturalDimensions(div)).to.be.a('object');
            });
        });

        describe('.isLoadingAllowed', function () {
            describe('check the whitelist', function () {
                [
                    'mip-anim',
                    'mip-brightcove',
                    'mip-embed',
                    'mip-iframe',
                    'mip-img',
                    'mip-list',
                    'mip-video'
                ].forEach(function (key) {
                    it(key, function () {
                        expect(layout.isLoadingAllowed(key)).to.be.true;
                    });
                });
            });

            it('error key', function () {
                expect(layout.isLoadingAllowed('')).to.be.false;
                expect(layout.isLoadingAllowed('MIP')).to.be.false;
            });
        });

        describe('.applyLayout', function () {
            it('inited', function () {
                var node = util.dom.create('<div layout="fixed"></div>');

                expect(layout.applyLayout(node)).to.equal('fixed');
                expect(layout.applyLayout(node)).to.be.undefined;
            });

            it('className has mip-layout-size-defined', function () {
                var node = util.dom.create('<div layout="fixed"></div>');
                layout.applyLayout(node);

                expect(node.classList.contains('mip-layout-size-defined')).to.be.true;
            });

            it('className has mip-hidden', function () {
                var node = util.dom.create('<div class="mip-hidden"></div>');
                layout.applyLayout(node);

                expect(node.classList.contains('mip-hidden')).to.be.false;
            });

            describe('attr layout', function () {
                it('null', function () {
                    var node = util.dom.create('<mip-img></mip-img>');
                    expect(layout.applyLayout(node)).to.equal('container');
                });

                it('error', function () {
                    var node = util.dom.create('<mip-img layout="MIP" width="10" height="10"></mip-img>');
                    sinon.stub(layout, 'parseLayout', function (attr) {
                        return attr;
                    });

                    expect(layout.applyLayout(node)).to.equal('MIP');
                    expect(node.classList.contains(layout.getLayoutClass('MIP'))).to.be.true;

                    layout.parseLayout.restore();
                });

                it('error auto fix', function () {
                    var node = util.dom.create('<mip-img layout="MIP" width="10" height="10"></mip-img>');

                    expect(layout.applyLayout(node)).to.not.equal('MIP');
                    expect(node.classList.contains(layout.getLayoutClass('MIP'))).to.be.false;
                });

                it('fixed', function () {
                    var node = util.dom.create('<div layout="fixed"></div>');
                    expect(layout.applyLayout(node)).to.equal('fixed');
                });

                it('fixed-height', function () {
                    var node = util.dom.create('<div height="10px" layout="fixed-height"></div>');
                    expect(layout.applyLayout(node)).to.equal('fixed-height');
                    expect(node.style.height).to.equal('10px');
                });

                it('fill', function () {
                    var node = util.dom.create('<div layout="fill"></div>');
                    expect(layout.applyLayout(node)).to.equal('fill');
                });

                it('responsive', function () {
                    var node = util.dom.create('<div layout="responsive"></div>');
                    expect(layout.applyLayout(node)).to.equal('responsive');
                });

                it('container', function () {
                    var node = util.dom.create('<div layout="container"></div>');
                    expect(layout.applyLayout(node)).to.equal('container');
                });

                it('nodisplay', function () {
                    var node = util.dom.create('<div layout="nodisplay"></div>');
                    expect(layout.applyLayout(node)).to.equal('nodisplay');
                    expect(node.style.display).to.equal('none');
                });

                it('flex-item', function () {
                    var node = util.dom.create('<div layout="flex-item" width="10" height="10"></div>');
                    expect(layout.applyLayout(node)).to.equal('flex-item');
                    expect(node.style.height).to.equal('10px');
                    expect(node.style.width).to.equal('10px');
                });
            });

            describe('attr', function () {
                it('width, height is null', function () {
                    var node = util.dom.create('<div layout="flex-item"></div>');
                    expect(layout.applyLayout(node)).to.equal('flex-item');
                });

                it('width, height is auto', function () {
                    var node = util.dom.create('<div width="auto" height="auto"></div>');
                    expect(layout.applyLayout(node)).to.equal('fixed-height');
                });

                it('height and width is auto', function () {
                    var node = util.dom.create('<div width="auto" height="10px"></div>');
                    expect(layout.applyLayout(node)).to.equal('fixed-height');
                });

                it('height', function () {
                    var node = util.dom.create('<mip-img height="10px"></mip-img>');
                    expect(layout.applyLayout(node)).to.equal('fixed-height');
                    expect(node.style.height).to.equal('10px');
                });

                it('sizes', function () {
                    var node = util.dom.create('<div width="10px" height="10px" sizes="on"><span>MIP</span></div>');
                    expect(layout.applyLayout(node)).to.equal('responsive');
                    expect(node.querySelector('mip-i-space')).to.not.be.null;
                    expect(node.firstChild).to.deep.equal(node.querySelector('mip-i-space'));
                });
            });
        });
    });
});

/* eslint-enable max-nested-callbacks */
