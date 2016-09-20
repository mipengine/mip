define(['./fn'], function (fn) {
    var abs = Math.abs;
    var create = Object.create;

    var STATE_START = 1;
    // Wait timer or other recognizer
    var STATE_WAIT = 2;
    // Maybe emitting
    var STATE_PENDING = 3;
    // Can emit
    var STATE_END = 4;
    // Hold until new circle
    var STATE_HOLD = 5;

    var state = {
        'start': STATE_START,
        'wait': STATE_WAIT,
        'pending': STATE_PENDING,
        'end': STATE_END,
        'hold': STATE_HOLD
    };

    var direction = {
        0: '',
        1: 'up',
        2: 'right',
        3: 'down',
        4: 'left'
    };

    // Reference hammer.js to a certain extent. Because the hammer.js is too heavy,
    // we have to implement our own recognizers to reduce the amount of code.
    var Recognizer = function (gesture) {
        this.state = STATE_START;
        this.gesture = gesture;
        this.conflictList = {};
    };
    fn.extend(Recognizer.prototype, {
        name: '',
        eventList: [],
        needAutoReset: true,
        recognize: function (data) {
            var eventState = data.eventState;
            if (eventState === 'start' && this.state === STATE_HOLD) {
                this.state = STATE_START;
                this.needReset && this.reset();
            }
            if (this.state === STATE_HOLD) {
                return;
            }
            var state = this.process(data);
            if (this.state === STATE_HOLD) {
                return;
            }
            this.state = state;

            if (this.emitCheck()) {
                this.emit(data);
            }
        },
        isState: function () {
            var args = arguments;
            for (var i = 0; i < args.length; i++) {
                var st = typeof args[i] === 'string' ? state[args[i]] : args[i];
                if (st === this.state) {
                    return true;
                }
            }
            return false;
        },
        setState: function (st) {
            st = typeof st === 'string' ? state[st] : st;
            if (st > 0 || st < 6) {
                this.state = st;
            }
            return this.state;
        },
        emitCheck: function () {
            if (this.state === STATE_START || this.state === STATE_HOLD) {
                return false;
            }
            for (var i in this.conflictList) {
                var conflictRecognizer = this.conflictList[i];
                if (conflictRecognizer.level > this.level && this.conflictList[i].state !== STATE_HOLD) {
                    return false;
                }
            }

            return true;
        },
        emit: function () {
            // emtting
        },
        reset: function () {
        },
        hold: function () {
            return this.state = STATE_HOLD;
        },
        trigger: function (data) {
            this.gesture.trigger(data.type, data.event, data);
        }
    });

    var recognizerList = {};
    var eventList = {};
    Recognizer.register = function (Rec, name) {
        !Rec.conflictList && (Rec.conflictList = []);
        Rec.recName = Rec.prototype.recName = name;
        recognizerList[name] = Rec;
        var evlist = Rec.prototype.eventList;
        for (var i = 0; i < evlist.length; i++) {
            eventList[evlist[i]] = Rec;
        }
    };
    Recognizer.getConflictList = function (name) {
        return recognizerList[name].conflictList || null;
    };
    Recognizer.get = function (name) {
        return recognizerList[name];
    };
    Recognizer.getByEventname = function (event) {
        return eventList[event];
    };
    Recognizer.conflict = function (a, b) {
        if (typeof a === 'string') {
            a = Recognizer.get(a);
            b = Recognizer.get(b);
        }
        if (!a || !b) {
            return;
        }
        a.conflictList.push(b.recName);
        b.conflictList.push(a.recName);
    };



    /* --------------    Recognizers  --------------- */

    // Tap Recognizer
    var TapRecognizer = function () {
        Recognizer.apply(this, arguments);
        this.boundHoldTimeFn = holdTimeFn.bind(this);
    };
    var holdTimeFn = function () {
        this.state = STATE_END;
        this.emit();
    };
    TapRecognizer.prototype = fn.extend(create(Recognizer.prototype), {
        eventList: ['tap'],
        taps: 1,
        count: 0,
        holdTime: 300,
        time: 250,
        moveRange: 10,
        level: 1,

        needAutoReset: false,
        process: function (data) {
            if (data.deltaTime > this.time || data.distance > this.moveRange || data.pointers.length > 1) {
                this.reset();
                return this.hold();
            }
            if (data.eventState === 'start') {
                clearTimeout(this.holdTimer);
            }
            if (data.eventState !== 'end') {
                return STATE_WAIT;
            }
            var holdTime = this.preTime && (data.timeStamp - this.preTime);
            this.preTime = data.timeStamp;
            // 记录点击的次数
            if (holdTime < this.holdTime) {
                this.count ++;
            } else {
                this.count = 1;
            }
            this._data = data;

            if (this.count === this.taps) {
                if (this.emitCheck()) {
                    return STATE_END;
                } else {
                    this.holdTimer = setTimeout(this.boundHoldTimeFn, this.holdTime);
                    return STATE_WAIT;
                }
            }
        },
        reset: function () {
            this.preTime = null;
            this.count = 0;
            this.state = STATE_START;
            clearTimeout(this.holdTimer);
        },
        emit: function () {
            if (this.state === STATE_END) {
                var data = this._data;
                var eventData = create(data);
                eventData.type = this.eventList[0];
                this._data = null;
                this.trigger(eventData);
                this.reset();
            }
        }
    });

    
    var DoubleTapRecognizer = function () {
        TapRecognizer.apply(this, arguments);
    };
    DoubleTapRecognizer.prototype = fn.extend(create(TapRecognizer.prototype), {
        taps: 2,
        eventList: ['doubletap'],
        level: 2
    });

    
    var SwipeRecognizer = function () {
        Recognizer.apply(this, arguments);
    };
    SwipeRecognizer.prototype = fn.extend(create(Recognizer.prototype), {
        eventList: ['swipe', 'swipeup', 'swipedown', 'swipeleft', 'swipedown'],
        velocity: 0.03,
        distance: 30,   
        duration: 1000,
        process: function (data) {
            if (data.pointers.length > 1 || data.deltaTime > this.duration) {
                return STATE_HOLD;
            }
            if (data.eventState === 'end') {
                if (data.velocity >= this.velocity && data.distance > this.distance) {
                    return STATE_END;
                }
            }
        },
        emit: function (data) {
            if (this.state === STATE_END) {
                var dataSwipe = create(data);
                dataSwipe.type = 'swipe';
                dataSwipe.swipeDirection = direction[data.direction];
                this.trigger(dataSwipe);

                var dataSwipeDir = create(data);
                dataSwipeDir.type = 'swipe' + direction[data.direction];
                dataSwipeDir.swipeDirection = direction[data.direction];
                this.trigger(dataSwipeDir);
            }
        }
    });

    Recognizer.register(TapRecognizer, 'tap');
    Recognizer.register(DoubleTapRecognizer, 'doubletap');
    Recognizer.register(SwipeRecognizer, 'swipe');

    Recognizer.conflict(DoubleTapRecognizer, TapRecognizer);
    return Recognizer;
});
