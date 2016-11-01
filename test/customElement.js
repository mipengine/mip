define(function (require) {
    'use strict';
    var CustomElement = require('customElement').create();

    describe('customElement', function () {
        var cElement = new CustomElement();
        expect(cElement.createdCallback).to.not.throw(Error);
        expect(cElement.attachedCallback).to.not.throw(Error);
        expect(cElement.detachedCallback).to.not.throw(Error);
        expect(cElement.attributeChangedCallback).to.not.throw(Error);
        expect(cElement.firstInviewCallback).to.not.throw(Error);
        expect(cElement.viewportCallback).to.not.throw(Error);
        expect(cElement.prerenderAllowed).to.not.throw(Error);
        expect(cElement.executeEventAction.bind(cElement)).to.not.throw(Error);

        it('init', function () {
            var InitElement = require('customElement').create();
            InitElement.prototype.init = sinon.spy();
            var initElement = new InitElement();
            expect(initElement.init).to.have.been.called;
        });

        it('eventaction', function () {
            var isOpen = false;
            var isClose = false;
            cElement.addEventAction('open', function () {
                isOpen = true;
            });
            cElement.addEventAction('close', function () {
                isClose = true;
            });

            cElement.executeEventAction({
                handler: 'open'
            });
            expect(isOpen).to.be.true;
            expect(isClose).to.be.false;

        });
    });
});
