define(function (require) {
    'use strict';

    var event = require('src/dom/event');

    describe('event', function () {
        it('delegate', function () {
            var flag = false;
            function handler () {
                flag = this.tagName.toLowerCase() === 'div';
            };
            var undelegate = event.delegate(document.body, 'div', 'click', handler);
            var customEvent = new Event('click');
            customEvent.initEvent('click', true, true);

            var element = document.body.appendChild(document.createElement('div'));
            element.dispatchEvent(customEvent);
            expect(flag).to.be.true;

            // div
            flag = false;
            var spanElement = document.body.appendChild(document.createElement('span'));
            spanElement.dispatchEvent(customEvent);
            expect(flag).to.be.false;

            undelegate();
            element.dispatchEvent(customEvent);
            expect(flag).to.be.false;

            
        });

        it('create', function () {
            var element = document.body.appendChild(document.createElement('div'));
            var data;
            element.addEventListener('click', function (evt) {
                data = evt.data;
            }, false);
            element.dispatchEvent(event.create('click', 'mock data'));
            expect(data).to.equal('mock data');
        });
    });
});