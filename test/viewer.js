/**
 * @file viewer test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon, MIP */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var util = require('util');
    var viewer = require('viewer');
    var viewport = require('viewport');
    var platform = util.platform;
    var fn = util.fn;

    describe('viewer', function () {
        var spy;

        afterEach(function () {
            if (spy && spy.restore) {
                spy.restore();
            }
        });

        describe('.init', function () {
            var isIframed;

            beforeEach(function () {
                isIframed = viewer.isIframed;
            });

            afterEach(function () {
                viewer.isIframed = isIframed;
            });

            it('isIframed', function () {
                spy = sinon.spy(viewer, 'sendMessage');

                viewer.isIframed = true;
                viewer.init();

                expect(spy).to.have.been.called;
                expect(spy).to.have.been.calledWith('mippageload');
            });

            it('isIframed is false', function () {
                spy = sinon.spy(viewer, 'sendMessage');

                viewer.isIframed = false;
                viewer.init();

                expect(spy).to.not.have.been.called;
            });
        });

        describe('.patchForIframe', function () {
            it('ios8 && uc', function () {
                sinon.stub(platform, 'getOsVersion', function () {
                    return '8.0';
                });
                sinon.stub(platform, 'isUc', function () {
                    return true;
                });

                spy = sinon.spy(window, 'addEventListener');
                viewer.patchForIframe();

                platform.getOsVersion.restore();
                platform.isUc.restore();

                expect(spy).to.not.have.been.called;
            });

            it('ios9 && safari', function () {
                sinon.stub(platform, 'getOsVersion', function () {
                    return '9.0';
                });
                sinon.stub(platform, 'isSafari', function () {
                    return true;
                });
                spy = sinon.spy(window, 'addEventListener');

                // exec
                viewer.patchForIframe();

                platform.getOsVersion.restore();
                platform.isSafari.restore();

                expect(spy).to.have.been.calledOnce;
                expect(spy).to.have.been.calledWith('pageshow');

                // expect pageshow callback
                expect(function () {
                    spy.getCall(0).args[1]({});
                }).to.not.throw();
            });
        });

        it('.show', function () {
            spy = sinon.spy(viewer, 'trigger');
            viewer.show();

            expect(spy).to.have.been.calledOnce;
            expect(spy).to.have.been.calledWith('show');
        });

        // 只针对谷歌浏览器测试 sendMessage ，因为其他浏览器有的不支持 mock window.parent.postMessage
        if (platform.isChrome() && !platform.isIos()) {
            describe('.sendMessage', function () {
                var isIframed;

                beforeEach(function () {
                    isIframed = viewer.isIframed;
                    spy = sinon.spy(window.parent, 'postMessage');
                });

                afterEach(function () {
                    viewer.isIframed = isIframed;
                });

                it('isIframed', function () {
                    viewer.isIframed = true;
                    viewer.sendMessage('name', 'MIP');

                    expect(spy).to.have.been.calledOnce;
                    expect(spy).to.deep.have.been.calledWith({
                        event: 'name',
                        data: 'MIP'
                    }, '*');
                });

                it('isIframed is false', function () {
                    viewer.isIframed = false;
                    viewer.sendMessage('name', 'MIP');

                    expect(spy).to.not.have.been.called;
                });
            });
        }

        describe('.setupEventAction', function () {
            beforeEach(function () {
                viewer.init();
            });

            afterEach(function () {
                if (fn.hasTouch.restore) {
                    fn.hasTouch.restore();
                }
            });

            it('hasTouch', function () {
                sinon.stub(fn, 'hasTouch', function () {
                    return true;
                });
                spy = sinon.spy(viewer._gesture, 'on');

                viewer.setupEventAction();

                expect(spy).to.have.been.calledOnce;
                expect(spy).to.have.been.calledWith('tap');

                // check eventAction.execute
                var eventAction = sinon.spy(viewer.eventAction, 'execute');
                spy.getCall(0).args[1]({});
                eventAction.restore();

                expect(eventAction).to.have.been.calledOnce;
                expect(eventAction).to.deep.have.been.calledWith('tap', undefined, {});
            });

            it('hasTouch is false', function () {
                sinon.stub(fn, 'hasTouch', function () {
                    return false;
                });
                spy = sinon.spy(document, 'addEventListener');

                viewer.setupEventAction();

                expect(spy).to.have.been.called;
                expect(spy).to.have.been.calledWith('click');

                // check eventAction.execute
                var eventAction = sinon.spy(viewer.eventAction, 'execute');
                spy.getCall(0).args[1]({});
                eventAction.restore();

                expect(eventAction).to.have.been.called;
                expect(eventAction).to.deep.have.been.calledWith('tap', undefined, {});
            });
        });

        describe('.handlePreregisteredExtensions', function () {
            var old;

            beforeEach(function () {
                old = window.MIP;
            });

            beforeEach(function () {
                window.MIP = old;
            });

            it('window.MIP exists', function () {
                window.MIP = {};
                expect(viewer.handlePreregisteredExtensions).to.not.throw();
            });

            it('window.MIP not exists', function () {
                window.MIP = null;
                expect(viewer.handlePreregisteredExtensions).to.not.throw();
            });

            it('MIP.push', function (done) {
                viewer.handlePreregisteredExtensions();

                expect(MIP.push).to.be.a('function');
                expect(function () {
                    MIP.push();
                    MIP.push({});
                    MIP.push({
                        func: true
                    });
                }).to.not.throw();

                MIP.push({
                    func: done
                });
            });

            it('MIP.extensions', function (done) {
                window.MIP = {
                    extensions: [
                        null,
                        '',
                        [],
                        {},
                        {
                            func: []
                        },
                        {
                            func: done
                        }
                    ]
                };

                viewer.handlePreregisteredExtensions();
            });
        });


        describe('._bindEventCallback', function () {
            var old;

            beforeEach(function () {
                old = viewer.isShow;
            });

            afterEach(function () {
                viewer.isShow = old;
            });

            it('error params', function () {
                expect(function () {
                    viewer._bindEventCallback();
                    viewer._bindEventCallback('show', []);
                    viewer._bindEventCallback('hide', function () {});
                }).to.not.throw();
            });

            it('isShow', function () {
                // isShow
                viewer.isShow = true;
                viewer._bindEventCallback('show', function (num) {
                    expect(this).to.deep.equal(viewer);
                    expect(num).to.be.a('number');
                });
            });

            it('isShow is false', function () {
                // isShow
                viewer.isShow = false;
                viewer._bindEventCallback('show', function (num) {
                    throw new TypeError('viewer.isShow is error');
                });
            });
        });

        describe('._proxyLink', function () {
            it('empty url', function () {
                spy = sinon.spy(util.event, 'delegate');
                viewer._proxyLink();

                expect(spy).to.have.been.calledOnce;
                expect(spy).to.deep.have.been.calledWith(
                    document,
                    'a',
                    'click'
                );
                expect(spy.getCall(0).args[3].call({})).to.be.undefined;
            });

            it('tel url', function (done) {
                spy = sinon.spy(util.event, 'delegate');
                viewer._proxyLink();

                expect(spy.getCall(0).args[3].call({
                    href: 'tel: 10010',
                    setAttribute: function (key, value) {
                        expect(key).to.equal('target');
                        expect(value).to.equal('_top');
                        done();
                    }
                })).to.be.undefined;
            });

            it('preventDefault', function (done) {
                spy = sinon.spy(util.event, 'delegate');
                viewer._proxyLink();

                // mock create
                spy.getCall(0).args[3].call({
                    href: 'http://www.mipengine.org'
                }, {
                    preventDefault: done
                });
            });

            it('mip-link', function () {
                var message = sinon.spy(viewer, 'sendMessage');
                sinon.stub(viewer, '_getMessageData', function () {
                    return {};
                });
                spy = sinon.spy(util.event, 'delegate');
                viewer._proxyLink();

                // mock create
                var result = spy.getCall(0).args[3].call({
                    href: 'http://www.mipengine.org',
                    hasAttribute: function (key) {
                        return key === 'mip-link';
                    }
                }, {
                    preventDefault: function () {}
                });

                viewer._getMessageData.restore();
                message.restore();

                expect(result).to.be.undefined;
                expect(message).to.have.been.calledOnce;
                expect(message).to.deep.have.been.calledWith(
                    undefined,
                    undefined
                );
            });

            it('data-type is mip', function () {
                var message = sinon.spy(viewer, 'sendMessage');
                sinon.stub(viewer, '_getMessageData', function () {
                    return {};
                });
                spy = sinon.spy(util.event, 'delegate');
                viewer._proxyLink();

                // mock create
                var result = spy.getCall(0).args[3].call({
                    href: 'http://www.mipengine.org',
                    hasAttribute: function (key) {
                        return false;
                    },
                    getAttribute: function (key) {
                        return key === 'data-type' ? 'mip' : '';
                    }
                }, {
                    preventDefault: function () {}
                });

                viewer._getMessageData.restore();
                message.restore();

                expect(result).to.be.undefined;
                expect(message).to.have.been.calledOnce;
                expect(message).to.deep.have.been.calledWith(
                    undefined,
                    undefined
                );
            });
        });

        describe('._getMessageData', function () {
            var url = 'http://www.mipengine.org/';
            var $node;

            beforeEach(function () {
                $node = $('<div><a href="' + url + '"></a></div>').appendTo('body');
            });

            afterEach(function () {
                $node.remove();
                $node = null;
            });

            it('attr has mip-link', function () {
                $node.attr('title', 'MIP');
                $node.attr('data-click', 'OK');
                $node.children('a').attr('mip-link', true);

                expect(viewer._getMessageData.call($node.children('a').get(0))).to.deep.equal({
                    messageKey: 'loadiframe',
                    messageData: {
                        url: url,
                        title: 'MIP',
                        click: 'OK'
                    }
                });
            });

            it('attr has mip-link and innerText', function () {
                $node.attr('data-click', 'OK');
                $node.children('a').attr('mip-link', true).html('Hello\nMIP');

                expect(viewer._getMessageData.call($node.children('a').get(0))).to.deep.equal({
                    messageKey: 'loadiframe',
                    messageData: {
                        url: url,
                        title: 'Hello',
                        click: 'OK'
                    }
                });
            });

            it('attr not has mip-link', function () {
                $node.children('a').attr('data-title', 'MIP').attr('data-click', 'OK');

                expect(viewer._getMessageData.call($node.children('a').get(0))).to.deep.equal({
                    messageKey: 'loadiframe',
                    messageData: {
                        url: url,
                        title: 'MIP',
                        click: 'OK'
                    }
                });
            });

            it('attr not has mip-link and innerText', function () {
                $node.children('a').attr('data-click', 'OK').html('Hello\nMIP');

                expect(viewer._getMessageData.call($node.children('a').get(0))).to.deep.equal({
                    messageKey: 'loadiframe',
                    messageData: {
                        url: url,
                        title: 'Hello',
                        click: 'OK'
                    }
                });
            });
        });

        describe('._viewportScroll', function () {
            var old;

            beforeEach(function (done) {
                old = platform.needSpecialScroll;

                // Let each test before the top of the top
                viewport.setScrollTop(0);
                setTimeout(done);
            });
            afterEach(function () {
                platform.needSpecialScroll = old;
            });

            it('platform.needSpecialScroll', function () {
                spy = sinon.spy(document.body, 'addEventListener');

                platform.needSpecialScroll = true;
                viewer._viewportScroll();

                expect(spy).to.have.been.calledThrice;
            });

            it('platform.needSpecialScroll is false', function () {
                spy = sinon.spy(window, 'addEventListener');

                platform.needSpecialScroll = false;
                viewer._viewportScroll();

                expect(spy).to.have.been.calledThrice;
            });

            it('bind event', function () {
                platform.needSpecialScroll = false;
                spy = sinon.spy(window, 'addEventListener');
                viewer._viewportScroll();

                expect(spy).to.have.been.calledThrice;
                expect(spy.getCall(0).args[0]).to.equal('touchstart');
                expect(spy.getCall(0).args[1]).to.not.throw();
                expect(spy.getCall(1).args[0]).to.equal('touchmove');
                expect(spy.getCall(1).args[1]).to.not.throw();
                expect(spy.getCall(2).args[0]).to.equal('touchend');
                expect(spy.getCall(2).args[1]).to.not.throw();
            });

            it('trigger down', function () {
                var message = sinon.spy(viewer, 'sendMessage');
                platform.needSpecialScroll = false;
                spy = sinon.spy(window, 'addEventListener');
                viewer._viewportScroll();
                sinon.stub(viewport, 'getScrollTop', function () {
                    return 20;
                });
                sinon.stub(viewport, 'getScrollHeight', function () {
                    return 100;
                });

                // exec
                spy.getCall(2).args[1]();

                viewport.getScrollTop.restore();
                viewport.getScrollHeight.restore();
                message.restore();

                expect(message).to.have.been.calledOnce;
                expect(message).to.deep.have.been.calledWith('mipscroll');
                expect(message.getCall(0).args[1].direct).to.be.a('number');
                expect(message.getCall(0).args[1].dist).to.be.a('number');
            });

            it('trigger up', function () {
                var message = sinon.spy(viewer, 'sendMessage');
                platform.needSpecialScroll = false;
                spy = sinon.spy(window, 'addEventListener');
                viewer._viewportScroll();

                var getScrollTop = sinon.stub(viewport, 'getScrollTop');
                var getScrollHeight = sinon.stub(viewport, 'getScrollHeight');

                // exec down
                getScrollTop.returns(50);
                getScrollHeight.returns(100);
                spy.getCall(2).args[1]();

                // exec down
                getScrollTop.returns(50);
                getScrollHeight.returns(100);
                spy.getCall(2).args[1]();

                // exec up
                getScrollTop.returns(20);
                getScrollHeight.returns(100);
                spy.getCall(2).args[1]();

                 // exec up
                getScrollTop.returns(0);
                spy.getCall(2).args[1]();

                getScrollTop.restore();
                getScrollHeight.restore();
                message.restore();

                expect(message).to.deep.have.been.calledWith('mipscroll');
                expect(message.getCall(1).args[1].direct).to.be.a('number');
                expect(message.getCall(1).args[1].dist).to.be.a('number');
            });
        });
    });
});
/* eslint-enable max-nested-callbacks */
