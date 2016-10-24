define(function (require) {
    'use strict';

    var dom = require('./dom');

    /**
     * Event delegator
     * @param {HTMLElement} element The parent node
     * @param {string} selector
     * @param {string} event Event name
     * @param {Function} handler
     * @param {boolean} capture
     */ 
    function delegate(element, selector, event, handler, capture) {
        capture = !!capture;
        function eventHandler(event) {
            var target = event.target;
            var parent = dom.closestTo(target, selector, this);
            if (parent) {
                handler.call(parent, event);
            }
        };
        element.addEventListener(event, eventHandler, capture);
        return function () {
            element.removeEventListener(event, eventHandler);
            eventHandler = element = handler = null;
        };
    }

    /**
     * Object for getting event's type.
     * @inner
     * @type {Object}
     */
    var specialEvents = {};
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

    /**
     * Create a event object to dispatch
     * @param {string} type Event name
     * @param {?Object} data Custom data
     * @return {Event}
     */
    function createEvent(type, data) {
        var event = document.createEvent(specialEvents[type] || 'Event');
        event.initEvent(type, true, true);
        data && (event.data = data);
        return event;
    }

    return {
        delegate: delegate,
        create: createEvent
    }
});
