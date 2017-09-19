/**
 * @file customElement test case
 * @author qijian, xieyaowu
 */

/* global sinon */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var customElement = require('customElement');
    var registerElement = require('element');
    var Created = customElement.create();

    describe('customElement', function () {
        var cElement;

        beforeEach(function () {
            cElement = new Created();
        });

        afterEach(function () {
            cElement = null;
        });

        it('default method validation', function () {
            [
                'applyFillContent',
                'createdCallback',
                'attachedCallback',
                'detachedCallback',
                'attributeChangedCallback',
                'firstInviewCallback',
                'viewportCallback',
                'prerenderAllowed',
                'hasResources',
                'expendAttr',
                'addEventAction',
                'executeEventAction',
                'resourcesComplete'
            ].forEach(function (key) {
                expect(cElement[key]).to.be.a('function', key + ' must be a method');
            });

            [
                'createdCallback',
                'attachedCallback',
                'detachedCallback',
                'attributeChangedCallback',
                'firstInviewCallback',
                'viewportCallback',
                'build'
            ].forEach(function (key) {
                expect(cElement[key]).to.not.throw();
            });
        });

        it('the default return value for prerenderAllowed and hasResources', function () {
            [
                'prerenderAllowed',
                'hasResources'
            ].forEach(function (key) {
                expect(cElement[key]()).to.equal(false, key + '() the return value must be false');
            });
        });

        it('init call', function () {
            var Element = customElement.create();
            Element.prototype.init = sinon.spy();

            var initElement = new Element();
            expect(initElement.init).to.have.been.called;
        });

        it('#applyFillContent', function () {
            var Element = customElement.create();
            var initElement = new Element();
            var node = document.createElement('div');

            initElement.applyFillContent(node);
            expect(node.classList.contains('mip-fill-content')).to.be.true;
            expect(node.classList.contains('mip-replaced-content')).to.be.false;

            initElement.applyFillContent(node, true);
            expect(node.classList.contains('mip-replaced-content')).to.be.true;
        });

        it('#resourcesComplete', function (done) {
            var Element = customElement.create();
            var initElement = new Element();

            var context = {
                element: {
                    resourcesComplete: function (data) {
                        expect(data).to.be.undefined;
                        done();
                    }
                }
            };

            initElement.resourcesComplete.call(context);
        });

        it('#build', function (done) {
            var mipTestBuild = customElement.create();

            mipTestBuild.prototype.build = function () {
                expect(this.element).to.not.undefined;
                done();
            };

            registerElement('mip-test-build', mipTestBuild);

            document.body.appendChild(document.createElement('mip-test-build'));
        });

        it('#expendAttr', function (done) {
            var mipTestAttr = customElement.create();

            mipTestAttr.prototype.build = function () {
                var clone = document.createElement('div');
                var result = this.expendAttr([
                    'data-name',
                    'data-version',
                    'data-desc'
                ], clone);

                expect(result).to.deep.equal(clone, 'the return value must be element');

                expect(clone.getAttribute('data-name')).to.equal('MIP');
                expect(clone.getAttribute('data-version')).to.equal('1.0');
                expect(!clone.getAttribute('data-desc')).to.be.true;

                done();
            };

            registerElement('mip-test-attr', mipTestAttr);

            var node = document.createElement('mip-test-attr');
            node.setAttribute('data-name', 'MIP');
            node.setAttribute('data-version', '1.0');
            document.body.appendChild(node);
        });

        describe('event call', function () {
            it('do not bind trigger', function () {
                cElement.executeEventAction({
                    handler: 'open'
                });

                expect(cElement._actionEvent).to.be.undefined;
            });

            it('multiple trigger', function () {
                var index = 0;

                cElement.addEventAction('open', function (event, args) {
                    index += 1;
                });

                cElement.addEventAction('close', function (event, args) {
                    index += 1;
                });

                cElement.executeEventAction({
                    handler: 'open'
                });
                cElement.executeEventAction({
                    handler: 'open'
                });

                cElement.executeEventAction({
                    handler: 'error'
                });

                expect(index).to.equal(2);
            });

            it('trigger parameters is empty', function (done) {
                cElement.addEventAction('open', function (event, args) {
                    expect(event).to.be.undefined;
                    expect(args).to.be.undefined;
                    done();
                });

                cElement.executeEventAction({
                    handler: 'open'
                });
            });

            it('trigger parameters', function (done) {
                cElement.addEventAction('open', function (event, args) {
                    expect(event).to.equal('click');
                    expect(args.name).to.equal('MIP');
                    done();
                });

                cElement.executeEventAction({
                    handler: 'open',
                    event: 'click',
                    arg: {
                        name: 'MIP'
                    }
                });
            });
        });
    });
});
/* eslint-enable max-nested-callbacks */
