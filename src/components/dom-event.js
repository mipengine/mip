define(['./dom'], function (dom) {
    var delegate = function (element, event, selector, handler, capture) {
        capture = !!capture;
        var eventHandler = function (event) {
            var target = event.target;
            var parent = dom.closest(target, selector);
            if (parent) {
                handler.call(parent, event);
            }
        };
        element.addEventListener(event, eventHandler, capture);
        return function () {
            element.removeEventListener(event, eventHandler);
            eventHandler = element = handler = null;
        };
    };

    var specialEvents = {};
    specialEvents.click = specialEvents.mousedown = specialEvents.mouseup = specialEvents.mousemove = 'MouseEvents';

    // 事件类型，是否冒泡，是否可以被 preventDefault 阻止
    var createEvent = function (type, canBubble, cancelable) {
        var event = document.createElement(specialEvents[type] || 'Event');
        return event.initEvent(type, canBubble, cancelable);
    };
    return {
        delegate: delegate,
        create: createEvent
    }
});
