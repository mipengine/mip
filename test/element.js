/**
 * @file Test for elements related modules
 */
define(function () {
    'use strict';
    var viewer = require('src/viewer');
    var registerElement = require('src/element');
    var customElement = require('src/customElement');
    var util = require('src/util');

    viewer.init();

    // Create a custom element for element's tester.
    var MipTestElement = customElement.create();

    MipTestElement.prototype.firstInviewCallback = function () {
        // Add sign.
        this.iaminviewport = true;
    };

    MipTestElement.prototype.prerenderAllowed = function () {
        return this.element.renderTest;
    };

    MipTestElement.prototype.detachedCallback = function () {
        this.removed = true;
    };

    var attrList = ['test', 'test1'];
    MipTestElement.prototype.build = function () {
        var element = this.element;
        element.id = 'id' + Math.round(Math.random() * 100000);
        this.addEventAction('test', function (data, param) {
            this.actionParam = param;
        });
        var clickTester = util.dom.create('<div on="tap:' + element.id + '.test(123)"></div>');
        element.appendChild(clickTester);
        var startEvent = util.event.create('touchstart');
        var endEvent = util.event.create('touchend');
        startEvent.touches = endEvent.touches = [{clientX: 0, clientY: 0}];
        clickTester.dispatchEvent(startEvent);
        clickTester.dispatchEvent(endEvent);

        this.applyFillContent(clickTester, element.getAttribute('applyfillclass') === "yes");
        this.expendAttr(attrList, this);
        this.expendAttr(attrList, clickTester);

        // Build will be runned only once.
        if (!this.count) {
            this.count = 0;
        }
        this.count ++;
    };

    MipTestElement.prototype.init = function () {
        this.inited = true;
    };

    var mipTestCssText = [
        'mip-test { display: block; width: 10px; height: 10px; }'
    ].join('');

    registerElement('mip-test', MipTestElement, mipTestCssText);

    // This will be ignored.
    registerElement('mip-test', MipTestElement, mipTestCssText);

    var mipTest = document.createElement('mip-test');
    mipTest.setAttribute('test', '123');
    mipTest.setAttribute('test1', '456');
    mipTest.setAttribute('applyfillclass', 'yes');
    document.body.appendChild(mipTest);
    
    var mipTestPrerender = document.createElement('mip-test');
    mipTestPrerender.style.cssText = 'visibility: hidden; margin-top: -100px';
    mipTestPrerender.renderTest = true;
    document.body.appendChild(mipTestPrerender);

    var detachTestElement = document.createElement('mip-test');
    document.body.appendChild(detachTestElement);
    document.body.removeChild(detachTestElement);

    describe('element', function () {
        it('firstInviewCallback', function (done) {
            setTimeout(function () {
                done(mipTest.customElement.iaminviewport !== true ? 'firstInviewCallback error!' : undefined);
            // Inviewport is a throttle function. Hold 20ms to wait it complete.
            }, 20);
        });

        it('prerenderAllowed', function (done) {
            setTimeout(function () {
                done(mipTestPrerender.customElement.iaminviewport !== true ? 'prerenderAllowed error!' : undefined);
            }, 20);
        });

        it('addEventAction', function () {
            expect(mipTest.customElement.actionParam).to.equal('123');
        });

        it('applyFillContent', function () {
            expect(
                mipTest.children[0].classList.contains('mip-fill-content') &&
                mipTest.children[0].classList.contains('mip-replaced-content')
                ).to.equal(true);
        });

        it('expendAttr', function () {
            expect(mipTest.customElement.test +  mipTest.customElement.test1).to.equal('123456');
        });

        it('detached', function () {
            expect(detachTestElement.customElement.removed).to.equal(true);
        });

        it('multi build', function () {
            mipTest.build();
            expect(mipTest.customElement.count).to.equal(1);
        });

        it('multi register', function () {
            expect(document.head.getElementsByTagName('style').length).to.equal(1);
        });

        it('init', function () {
            expect(mipTest.customElement.inited).to.equal(true);
        })
    });
});
