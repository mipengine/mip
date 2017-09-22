/**
 * @file viewport test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var viewport = require('viewport');
    var util = require('util');

    describe('viewport', function () {
        var spy;

        afterEach(function () {
            if (spy && spy.restore) {
                spy.restore();
            }
        });

        it('.getScrollTop', function () {
            spy = sinon.stub(util.rect, 'getScrollTop');
            spy.returns(true);

            expect(viewport.getScrollTop()).to.be.true;
            expect(spy).to.have.been.calledWith();
        });

        it('.getScrollLeft', function () {
            spy = sinon.stub(util.rect, 'getScrollLeft');
            spy.returns(true);

            expect(viewport.getScrollLeft()).to.be.true;
            expect(spy).to.have.been.calledWith();
        });

        it('.getScrollWidth', function () {
            spy = sinon.stub(util.rect, 'getScrollWidth');
            spy.returns(true);

            expect(viewport.getScrollWidth()).to.be.true;
            expect(spy).to.have.been.calledWith();
        });

        it('.getScrollHeight', function () {
            spy = sinon.stub(util.rect, 'getScrollHeight');
            spy.returns(true);

            expect(viewport.getScrollHeight()).to.be.true;
            expect(spy).to.have.been.calledWith();
        });

        it('.setScrollTop', function () {
            spy = sinon.spy(util.rect, 'setScrollTop');

            expect(viewport.setScrollTop(true)).to.be.undefined;
            expect(spy).to.have.been.calledOnce;
            expect(spy).to.have.been.calledWith(true);
        });

        it('.getRect', function () {
            spy = sinon.stub(util.rect, 'get');
            spy.returns({});

            expect(viewport.getRect()).to.deep.equal({});
        });

        it('.getWidth', function () {
            var old = window.innerWidth;

            window.innerWidth = true;
            expect(viewport.getWidth()).to.be.true;

            window.innerWidth = false;
            expect(viewport.getWidth()).to.be.a('number');

            window.innerWidth = old;
        });

        it('.getHeight', function () {
            var old = window.innerHeight;

            window.innerHeight = true;
            expect(viewport.getHeight()).to.be.true;

            window.innerHeight = false;
            expect(viewport.getHeight()).to.be.a('number');

            window.innerHeight = old;
        });

        describe('event', function () {
            it('scroll', function (done) {
                spy = sinon.stub(viewport, 'getScrollTop');

                viewport.once('scroll', function (event) {
                    expect(event).to.not.be.undefined;
                    done();
                });

                spy.returns(10);
                window.dispatchEvent(new Event('scroll'));
            });

            it('resize', function (done) {
                viewport.once('resize', function (event) {
                    expect(event).to.not.be.undefined;
                    done();
                });

                window.dispatchEvent(new Event('resize'));
            });

            it('changed', function (done) {
                spy = sinon.stub(viewport, 'getScrollTop');

                viewport.once('changed', function (event) {
                    expect(event).to.not.be.undefined;
                    done();
                });

                spy.returns(10);
                window.dispatchEvent(new Event('scroll'));
            });

            it('mock multiple scroll', function (done) {
                spy = sinon.stub(viewport, 'getScrollTop');

                var data = [
                    {
                        timeout: 5,
                        scrollTop: 1
                    },
                    {
                        timeout: 10,
                        scrollTop: 10
                    },
                    {
                        timeout: 15,
                        scrollTop: 1
                    },
                    {
                        timeout: 30,
                        scrollTop: 100
                    },
                    {
                        timeout: 200,
                        scrollTop: 2000
                    }
                ];

                var exec = function () {
                    var current = data.shift();

                    spy.returns(current.scrollTop);
                    window.dispatchEvent(new Event('scroll'));

                    if (data.length) {
                        setTimeout(exec, current.timeout);
                    }
                    else {
                        expect(data.length).to.equal(0);
                        done();
                    }
                };

                exec();
            });
        });
    });
});
/* eslint-enable max-nested-callbacks */
