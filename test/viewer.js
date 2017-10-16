/**
 * Tester for viewer
 */
define(function (require) {
    'use strict';

    var util = require('util');
    var viewer = require('viewer');
    var viewport = require('viewport');

    var docElement = document.documentElement || document.body;
    var ele = document.createElement('a');
    docElement.appendChild(ele);

    var testLink = 'https://www.mipengine.org';
    var expectData = {
        messageKey: 'loadiframe',
        messageData: {
            url: 'https://www.mipengine.org/',
            title: '',
            click: '{button:1}'
        }
    };

    describe('viewer', function () {
        it('patchForIframe', function () {
            util.platform.needSpecialScroll = false;
            document.body.style.cssText = '';
            document.body.style.margin = 0;
            function checkHeight() {
                return document.body.style.height === '100%';
            };
            viewer.patchForIframe();
            var initedHeightEmpty = !checkHeight();
            util.platform.needSpecialScroll = true;
            viewer.patchForIframe();

            expect(initedHeightEmpty).to.be.true;
            expect(checkHeight()).to.be.true;
        });

        it('needBackReload', function () {
            var stub1 = sinon.stub(util.platform, 'getOsVersion', function () {
                return '9.1.1';
            });
            var stub2 = sinon.stub(util.platform, 'isSafari', function () {
                return true;
            });
            viewer.patchForIframe();
            stub1.restore();
            stub2.restore();

            var eve = document.createEvent("HTMLEvents");
            eve.initEvent("pageshow", true, true);
            window.dispatchEvent(eve);
        });

        it('show', function () {
            viewer.show();

            expect(document.body.style.opacity).to.equal('1');
        });

        it('init', function () {
            viewer.init();
            expect(viewer._gesture).to.be.instanceof(util.Gesture);
        });

        it('sroll up', function () {
            var style = getComputedStyle(document.body);
            var height = style.height;
            viewer.init();
            document.body.style.height = '10000px';
            viewport.setScrollTop(800);
            expect(viewport.getScrollTop()).to.equal(800);
            document.body.style.height = height;
        });

        it('sendMessage', function () {
            viewer.isIframed = false;
            expect(viewer.sendMessage.bind(viewer)).to.not.throw(Error);

            viewer.isIframed = true;
            expect(viewer.sendMessage.bind(viewer)).to.not.throw(Error);
        });

        it('handlePreregisteredExtensions', function () {
            window.MIP.extensions = [{
                name: "mip-form",
                func: function() {
                    document.body.classList.add('handlePreregisteredExtensions');
                }
            }];
            viewer.handlePreregisteredExtensions();
            var result = window.MIP.push({
                name: "mip-form",
                func: function() {
                    document.body.classList.add('handlePreregisteredExtensions');
                }
            });
            expect(document.body === document.querySelector('.handlePreregisteredExtensions')).to.be.true;
            document.body.classList.remove('handlePreregisteredExtensions');
        });

        it('bindEventCallback', function () {
            viewer._bindEventCallback('show', function () {
                document.body.classList.add('_bindEventCallback');
            });
            expect(document.body === document.querySelector('._bindEventCallback')).to.be.true;
            document.body.classList.remove('_bindEventCallback');
        });

        it('mipLinkProxy', function () {
            // test for non href
            ele.click();

            var mipLinkTitle = 'test title for mip-link';

            var childNode = document.createElement('a');
            var parentNode = document.createElement('div');

            parentNode.setAttribute('title', mipLinkTitle);
            parentNode.setAttribute('data-click', '{button:1}');
            childNode.setAttribute('mip-link', '');
            childNode.href = testLink;
            expectData.messageData.title = mipLinkTitle;

            parentNode.appendChild(childNode)
            document.body.appendChild(parentNode);
            expect(viewer._getMessageData.call(childNode)).to.deep.equal(expectData);

            parentNode.setAttribute('title', '');
            var newtext=document.createTextNode("test title for non-set，just text  ");
            parentNode.appendChild(newtext); 
            expectData.messageData.title = newtext.textContent.trim();
            expect(viewer._getMessageData.call(childNode)).to.deep.equal(expectData);

            childNode.click();
        });
        it('dataTypeLinkProxy', function () {
            var dataTypeTitle = 'test title for data-type';

            ele.href = testLink;
            ele.setAttribute('data-type', 'mip');
            ele.setAttribute('data-title', dataTypeTitle);
            ele.setAttribute('data-click', '{button:1}');
            expectData.messageData.title = dataTypeTitle;
            expect(viewer._getMessageData.call(ele)).to.deep.equal(expectData);

            ele.setAttribute('data-title', '');
            ele.innerText = 'test title for non-set，just text  ';
            expectData.messageData.title = ele.innerText;
            expect(viewer._getMessageData.call(ele)).to.deep.equal(expectData);
            ele.click();
        });

    });
});
