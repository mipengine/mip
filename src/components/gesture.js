define(['./event', './gesture-recognizer', './fn'], function (Event, Recognizer, fn) {
    var round = Math.round;
    var max = Math.max;
    var abs = Math.abs;

    // Data processor of touch event object.
    var dataProcessor = {
        startCenter: null,
        lastCenter: null,
        startTime: null,
        process: function (event, preventX, preventY) {
            var data = {};
            var now = Date.now();
            var touches = event.touches.length ? event.touches : event.changedTouches;
            if (event.type === 'touchstart') {
                this.startCenter = this.getCenter(touches);
                this.startTime = now;
                this.startData = data;
                this.preData = null;
            }
            var startCenter = this.startCenter;
            var center = this.getCenter(touches);
            var deltaTime = data.deltaTime = now - this.startTime;

            data.pointers = touches;

            data.x = center.x;
            data.y = center.y;

            var deltaX = data.deltaX = center.x - startCenter.x;
            var deltaY = data.deltaY = center.y - startCenter.y;

            data.velocityX = deltaX / deltaTime || 0;
            data.velocityY = deltaY / deltaTime || 0;
            data.velocity = max(abs(data.velocityX), abs(data.velocityY));
            data.angle = this.getAngle(startCenter, center);
            data.distance = this.getDistance(startCenter, center);
            data.direction = this.getDirection(deltaX, deltaY);
            data.eventState = event.type.replace('touch', '');
            data.timeStamp = now;

            if (this.preData) {
                var instTime = data.instantDeltaTime = now - this.preData.timeStamp;
                var instX = data.instantVelocityX = (data.x - this.preData.x) / instTime || 0;
                var instY = data.instantVelocityY = (data.y - this.preData.y) / instTime || 0;
                if (data.eventState === 'move' && (preventX || preventY)) {
                    var curDirection = abs(instX) > abs(instY);
                    if ((preventX && curDirection) || (preventY && !curDirection)) {
                        event.preventDefault();
                    }
                }
            } else {
                data.instantDeltaTime = data.instantVelocityX = data.instantVelocityY = 0;
            }

            this.preData = data;

            data.event = event;
            return Object.freeze(data);
        },
        getCenter: function (points) {
            return {
                x: round(points[0].clientX),
                y: round(points[0].clientY)
            }
        },
        getAngle: function (point1, point2) {
            return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
        },
        getDistance: function (point1, point2) {
            var x = point2.x - point1.x;
            var y = point2.y - point1.y
            return Math.sqrt(x * x + y * y);
        },
        /**
         * 0: origin
         * 1: up
         * 2: right
         * 3: down
         * 4: left
         */
        getDirection: function (x, y) {
            if (x === y) {
                return 0;
            }
            if (abs(x) >= abs(y)) {
                return x > 0 ? 2 : 4;
            }
            return y < 0 ? 1 : 3;
        }
    };

    var touchHandler = function (event) {
        var opt = this._opt;
        opt.preventDefault && event.preventDefault();
        opt.stopPropagation && event.stopPropagation();
        var data = dataProcessor.process(event, opt.preventX, opt.preventY);
        this._recognize(data);
        this.trigger(event.type, event, data);
    };

    var listenersHelp = function (element, events, handler, method) {
        var list = events.split(' ');
        for (var i = 0; i < list.length; i++) {
            if (method === false) {
                element.removeEventListener(list[i], handler);
            } else {
                element.addEventListener(list[i], handler, false);
            }
        }
    };

    /**
     * Gesture
     * @class
     * @param {HTMLElement} element Element that need gestures
     * @param {Object} opt Options
     */
    var Gesture = function (element, opt) {
        this.__eventContext = this._element = element;
        this.startX = this.startY = this.startT = 0;
        opt && (this._opt = fn.extend({}, this._opt, opt));

        this._boundTouchEvent = touchHandler.bind(this);
        listenersHelp(element, 'touchstart touchmove touchend touchcancel', this._boundTouchEvent);

        this._boundTriggerListener = this.trigger.bind(this);
        this._recognizers = {};
    };

    var proto = Event.mixin(Gesture.prototype);

    proto._opt = {
        preventDefault: false,
        stopPropagation: false,
        preventX: true,
        preventY: false
    };
    proto.cleanup = function () {
        var element = this._element;
        listenersHelp(element, 'touchstart touchmove touchend touchcancel', this._boundTouchEvent, false);
        this.off();
    };
    proto._createEventCallback = function (name) {
        if (this._hasRegister(name)) {
            return;
        }
        var RecognizerClass = Recognizer.getByEventname(name);
        if (!RecognizerClass) {
            return;
        }
        name = RecognizerClass.recName;
        var recognizer = this._recognizers[name] = new RecognizerClass(this);
        var conflictList = Recognizer.getConflictList(recognizer.recName);
        for (var i = 0; i < conflictList.length; i++) {
            name = conflictList[i];
            var conflictRecognizer = this._recognizers[name];
            if (conflictRecognizer) {
                conflictRecognizer.conflictList[recognizer.recName] = recognizer;
                recognizer.conflictList[conflictRecognizer.recName] = conflictRecognizer;
            }
        }
    };
    proto._removeEventCallback = function (name) {
        if (name === undefined) {
            this._recognizers = {};
        } else {
            var recognizer = this._recognizers[name];
            for (var i in recognizer.conflictList) {
                delete recognizer.conflictList[i][name];
            } 
            delete this._recognizers[name];
        }
    };
    proto._hasRegister = function (name) {
        return !!this._recognizers[Recognizer.getByEventname(name)];
    };
    proto._recognize = function (data) {
        var recognizers = this._recognizers;
        for (var i in recognizers) {
            var recognizer = recognizers[i];
            recognizer.recognize(data);
        }
    };
    

    return Gesture;
});
