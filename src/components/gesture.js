/**
 * 手势组件
 **/
define(['./event'], function (Event) {

    var touchEvent = function (event) {
        var isEnd = event.type === 'touchend';
        var pointX, pointY;
        if (isEnd) {
            touch = event.changedTouches[0];
            pointX = touch.screenX - this.startX;
            pointY = touch.screenY - this.startY;
        } else {
            touch = event.touches;
            pointX = touch.screenX;
            pointY = touch.screenY;
            if (event.type === 'touchstart') {
                this.startX = pointX;
                this.startY = pointY;
                this.startT = event.timeStamp;
            }
        }

        // trigger this.on('gesture | touchstart | touchend', point)
        this.trigger('gesture ' + event.type, {
            'event': event.type,
            'x': pointX,
            'y': pointY,
            '_t': event.timeStamp
        }, event);
    };

    /**
     * 手势
     * @class
     **/
    var Gesture = function (element) {
        this._eventContext = this._element = element;
        this.startX = this.startY = this.startT = 0;

        this._boundTouchEvent = touchEvent.bind(this);
        element.addEventListener('touchstart', this._boundTouchEvent, false);
        element.addEventListener('touchmove', this._boundTouchEvent, false);
        element.addEventListener('touchend', this._boundTouchEvent, false);

        this._boundTriggerListener = this.trigger.bind(this);
    };

    // add event functions to gesture.prototype
    Event.mixin(Gesture.prototype);

    Gesture.prototype.cleanup = function () {
        element.removeEventListener('touchstart', this._boundTouchEvent);
        element.removeEventListener('touchmove', this._boundTouchEvent);
        element.removeEventListener('touchend', this._boundTouchEvent);
    };

    return Gesture;
});
