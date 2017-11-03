/**
 * @file performance test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var performance = require('performance');
    var dom = require('dom/dom');
    var registerElement = require('element');
    var customElement = require('customElement');

    registerElement('mip-test-performance', customElement.create());

    describe('performance', function () {
        it('.start', function (done) {
            performance.start();
            performance.start();

            dom.waitDocumentReady(function () {
                setTimeout(function () {
                    expect(performance.getTiming()).to.include.all.keys([
                        'MIPFirstScreen',
                        'MIPStart',
                        'MIPDomContentLoaded'
                    ]);

                    done();
                }, 500);
            });
        });

        it('.getTiming', function () {
            var old = window.performance;

            expect(performance.getTiming()).to.be.a('object');

            window.performance = null;
            expect(performance.getTiming()).to.be.a('object');

            window.performance = {};
            expect(performance.getTiming()).to.be.a('object');

            window.performance = {
                timing: {}
            };
            expect(performance.getTiming()).to.be.a('object');

            window.performance = {
                timing: {
                    toJSON: function () {
                        return {};
                    }
                }
            };
            expect(performance.getTiming()).to.be.a('object');

            window.performance = old;
        });

        it('.addFsElement', function () {
            expect(performance.addFsElement).to.be.a('function');
            expect(function () {
                performance.addFsElement(document.createElement('mip-test-performance'));
            }).to.not.throw();
        });

        it('.fsElementLoaded', function () {
            expect(performance.fsElementLoaded).to.be.a('function');
            expect(function () {
                performance.fsElementLoaded(document.createElement('mip-test-performance'));
            }).to.not.throw();
        });

        it('.on', function () {
            expect(performance.on).to.be.a('function');
            expect(function () {
                performance.on('name');
            }).to.not.throw();
        });
    });
});

/* eslint-enable max-nested-callbacks */
