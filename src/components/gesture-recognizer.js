define(['./fn'], function (fn) {
    var abs = Math.abs;
    var create = Object.create;
    /**
     * Recognizer(tap、swipe .. 手势类)
     *     |
     *     |    register
     *     ↓
     * GlobalController(全局手势控制器)
     *     |
     *     |    get
     *     ↓
     * gestureController (gesture实例)
     *     |
     *     |    create recognizer
     *     ↓
     * recognizer 
     **/

    var STATE_START = 1;
    // wait timer or other recognizer
    var STATE_WAIT = 2;
    // maybe emitting
    var STATE_PENDING = 3;
    // can emit
    var STATE_END = 4;
    // hold new circle
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

    // RecognizerController & base class
    var Recognizer = function (gesture) {
        this.state = STATE_START;
        this.gesture = gesture;
        this.conflictList = {};
    };
    Recognizer.prototype = {
        name: '',
        eventList: [],
        needAutoReset: true,
        recognize: function (data) {
            var eventState = data.eventState;
            if (eventState === 'start' && this.state === STATE_HOLD) {
                this.state = STATE_START;
                this.needReset && this.reset();
            }
            // 如果是 hold，停止计算
            if (this.state === STATE_HOLD) {
                return;
            }
            var state = this.process(data);
            // process 中可能会执行 hold
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
        // 默认每个点击周期都会 reset
        reset: function () {

        },
        // 如果失败或者执行完毕，暂时 hold。等待下一轮事件
        hold: function () {
            return this.state = STATE_HOLD;
        },
        trigger: function (data) {
            this.gesture.trigger(data.type, data.event, data);
        }
    };

    var recognizerList = {};
    var eventList = {};
    Recognizer.register = function (Rec) {
        !Rec.conflictList && (Rec.conflictList = []);
        var name = Rec.name;
        Rec.prototype.name = name;
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
    // 把 a 类与 b 类设置为冲突
    Recognizer.conflict = function (a, b) {
        if (typeof a === 'string') {
            a = Recognizer.get(a);
            b = Recognizer.get(b);
        }
        if (!a || !b) {
            return;
        }
        a.conflictList.push(b.name);
        b.conflictList.push(a.name);
    };



    /* --------------    手势类 --------------- */

    // Tap Recognizer
    var TapRecognizer = function () {
        Recognizer.apply(this, arguments);
    };
    var holdTimeFn = function () {
        this.state = STATE_END;
        this.emit();
    };
    TapRecognizer.prototype = fn.extend(create(Recognizer.prototype), {
        eventList: ['tap'],
        // 点击次数限制
        taps: 1,
        count: 0,
        // 双击的等待时间
        holdTime: 300,
        // 单击的等待时间，超过时间将会置为 hold
        time: 250,
        // 距离原点的移动范围
        moveRange: 10,
        // 优先级
        level: 1,

        // 不需要自动 reset
        needAutoReset: false,
        process: function (data) {
            // 如果时间超过等待时间，或者移动了位置，或者N指点击。置为 hold 状态
            if (data.deltaTime > this.time || data.distance > this.moveRange || data.pointers.length > 1) {
                this.reset();
                return this.hold();
            }
            if (data.eventState === 'start') {
                clearTimeout(this.holdTimer);
            }
            // 如果不是 end 事件，返回 wait 状态，直到 end 触发
            if (data.eventState !== 'end') {
                return STATE_WAIT;
            }
            // 计算两次点击的时间差
            var holdTime = this.preTime && (data.timeStamp - this.preTime);
            // 记录上一次时间戳
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
                    this.holdTimer = setTimeout(holdTimeFn.bind(this), this.holdTime);
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

    // DoubleTap Recognizer
    var DoubleTapRecognizer = function () {
        TapRecognizer.apply(this, arguments);
    };
    DoubleTapRecognizer.prototype = fn.extend(create(TapRecognizer.prototype), {
        taps: 2,
        eventList: ['doubletap'],
        level: 2
    });

    // Swipe Recognizer
    var SwipeRecognizer = function () {
        Recognizer.apply(this, arguments);
    };
    SwipeRecognizer.prototype = fn.extend(create(Recognizer.prototype), {
        eventList: ['swipe', 'swipeup', 'swipedown', 'swipeleft', 'swipedown'],
        velocity: 0.03,
        distance: 30,   
        duration: 1000,
        process: function (data) {
            // 超时或者N个点都会执行 HOLD
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
                this.trigger(dataSwipeDir);
            }
        }
    });

    Recognizer.register(TapRecognizer);
    Recognizer.register(DoubleTapRecognizer);
    Recognizer.register(SwipeRecognizer);

    Recognizer.conflict(DoubleTapRecognizer, TapRecognizer);
    return Recognizer;
});
