/**
 * @file resources test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var Resources = require('resources');
    var viewport = require('viewport');
    var rect = require('dom/rect');
    var customElement = require('customElement');
    var registerElement = require('element');

    describe('resources', function () {
        var app;

        beforeEach(function () {
            app = new Resources();
        });

        // reset
        afterEach(function () {
            app._gesture.cleanup();
            app.getResourcesList().forEach(function (element) {
                app.remove(element);
            });
            app._viewport.off('changed resize', app.updateState);
            app._gesture.off('swipe', app.updateState);
            app = null;
        });

        describe('#_bindEvent', function () {
            it('changed event', function () {
                var spy = sinon.spy(app, 'updateState');
                app._bindEvent();
                viewport.trigger('changed');

                expect(spy).to.have.been.calledTwice;
            });

            it('resize event', function () {
                var spy = sinon.spy(app, 'updateState');
                app._bindEvent();
                viewport.trigger('resize');

                expect(spy).to.have.been.calledTwice;
            });

            // Verify that the delay event was successful
            describe('swipe event', function () {
                it('first call', function () {
                    var spy = sinon.spy(app, 'updateState');
                    app._bindEvent();

                    expect(spy).to.have.been.calledOnce;
                    expect(spy).to.have.been.calledWith();
                });

                it('velocity min', function (done) {
                    var spy = sinon.spy(app, 'updateState');
                    app._bindEvent();
                    app._gesture.trigger('swipe', {}, {
                        velocity: 0.1
                    });

                    setTimeout(function () {
                        var count = spy.callCount;
                        expect(spy).to.have.been.calledOnce;

                        setTimeout(function () {
                            expect(spy.callCount).to.be.above(count);
                            done();
                        }, 100);
                    }, 90);
                });

                it('velocity max', function (done) {
                    var spy = sinon.spy(app, 'updateState');
                    app._bindEvent();
                    app._gesture.trigger('swipe', {}, {
                        velocity: 3
                    });

                    setTimeout(function () {
                        var count = spy.callCount;
                        expect(spy).to.have.been.calledOnce;

                        setTimeout(function () {
                            expect(spy.callCount).to.be.above(count);
                            done();
                        }, 100);
                    }, 590);
                });
            });
        });

        it('#add', function (done) {
            var MipTestElement = customElement.create();
            MipTestElement.prototype.build = done;
            MipTestElement.prototype.prerenderAllowed = function () {
                return true;
            };

            registerElement('mip-test-resources', MipTestElement);

            var node = document.createElement('mip-test-resources');
            document.body.appendChild(node);
            document.body.removeChild(node);
        });

        describe('#remove', function () {
            // is error
            // it('true', function () {
            //     var data = {
            //         build: function () {}
            //     };

            //     app.add(data);
            //     expect(app.remove(data)).to.be.true;
            // });

            it('element', function () {
                /* eslint-disable fecs-camelcase */
                expect(app.remove({
                    _eid: 10086
                })).to.be.false;

                expect(app.remove({
                    _eid: 'str'
                })).to.be.false;
                /* eslint-enable fecs-camelcase */
            });

            it('_eid', function () {
                expect(app.remove(10086)).to.be.false;
            });
        });

        it('#getResources', function () {
            expect(app.getResources()).to.be.a('object').and.be.empty;
        });

        it('#getResourcesList', function () {
            expect(app.getResourcesList()).to.be.a('array').and.be.empty;
        });

        describe('#setInViewport', function () {
            it('inViewport', function (done) {
                app.setInViewport({
                    inViewport: function () {
                        return true;
                    },
                    viewportCallback: function (args) {
                        expect(args).to.be.undefined;
                        done();
                    }
                });
            });

            it('not inViewport', function (done) {
                app.setInViewport({
                    inViewport: function () {},
                    viewportCallback: function () {
                        done('error');
                    }
                });

                done();
            });

            it('repeat', function () {
                var element = {
                    viewportCallback: function () {},
                    inViewport: function () {
                        return true;
                    }
                };
                var spy = sinon.spy(element, 'viewportCallback');

                app.setInViewport(element);
                app.setInViewport(element, false);
                app.setInViewport(element, true);

                expect(spy).have.been.calledTwice;
            });
        });

        describe('#_update', function () {
            it('not resources', function () {
                expect(app._update()).to.be.undefined;
            });

            it('prerenderAllowed', function (done) {
                sinon.stub(app, 'getResources', function () {
                    return {
                        MIP: {
                            prerenderAllowed: function () {
                                return true;
                            }
                        }
                    };
                });

                app.setInViewport = function (element, flag) {
                    expect(flag).to.be.true;
                    done();
                };

                app._update();
            });

            it('overlapping', function (done) {
                // mock
                sinon.stub(app, 'getResources', function () {
                    return {
                        MIP: {
                            prerenderAllowed: function () {
                                return false;
                            }
                        }
                    };
                });
                sinon.stub(rect, 'overlapping', function (getElementRect, viewportRect) {
                    expect(getElementRect).to.equal('getElementRect');
                    expect(viewportRect).to.be.a('object');
                    return true;
                });
                sinon.stub(rect, 'getElementRect', function () {
                    return 'getElementRect';
                });

                app.setInViewport = function (element, flag) {
                    expect(flag).to.be.true;
                    done();
                };

                app._update();
                rect.overlapping.restore();
                rect.getElementRect.restore();
            });
        });

        describe('.prerenderElement', function () {
            it('empty param', function () {
                expect(function () {
                    Resources.prerenderElement();
                }).to.throw();
            });

            it('inViewport', function (done) {
                Resources.prerenderElement({
                    viewportCallback: done,
                    inViewport: function () {
                        return true;
                    }
                });
                done();
            });

            it('not inViewport', function (done) {
                Resources.prerenderElement({
                    inViewport: function () {
                        return false;
                    }
                });
                Resources.prerenderElement({
                    viewportCallback: function (flag) {
                        expect(flag).to.be.true;
                        done();
                    },
                    inViewport: function () {
                        return false;
                    }
                });
            });
        });
    });

});

/* eslint-enable max-nested-callbacks */
