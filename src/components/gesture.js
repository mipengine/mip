/**
 * 手势组件
 **/
define(['./event', './gesture-recognizer'], function (Event, Recognizer) {
    var round = Math.round;
    var max = Math.max;
    var abs = Math.abs;

    /**
     * 数据处理，暂不考虑多点触控。接口暂时按照多点预留
     *
     **/
    var dataProcessor = {
        startCenter: null,
        lastCenter: null,
        startTime: null,
        process: function (event, preventX, preventY) {
            var data = {};
            var now = Date.now();
            var touches = event.touches.length ? event.touches : event.changedTouches;
            // 初始化并记录第一个坐标点
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

            // 横轴位移
            var deltaX = data.deltaX = center.x - startCenter.x;
            // 纵轴位移
            var deltaY = data.deltaY = center.y - startCenter.y;

            // 横轴速度
            data.velocityX = deltaX / deltaTime || 0;
            // 纵轴速度
            data.velocityY = deltaY / deltaTime || 0;
            // 速度
            data.velocity = max(abs(data.velocityX), abs(data.velocityY));
            // 角度
            data.angle = this.getAngle(startCenter, center);
            // 距离
            data.distance = this.getDistance(startCenter, center);
            // 方向
            data.direction = this.getDirection(deltaX, deltaY);
            // 类型
            data.eventState = event.type.replace('touch', '');
            // 时间戳
            data.timeStamp = now;

            if (this.preData) {
                var instTime = data.instantDeltaTime = now - this.preData.timeStamp;
                var instX = data.instantVelocityX = (data.x - this.preData.x) / instTime || 0;
                var instY = data.instantVelocityY = (data.y - this.preData.y) / instTime || 0;
                if (data.eventState === 'move' && (preventX || preventY)) {
                    var curDirection = abs(instX) > abs(instY);
                    if ((preventX && curDirection) || (preventY && curDirection)) {
                        event.preventDefault();
                    }
                }
            } else {
                data.instantDeltaTime = data.instantVelocityX = data.instantVelocityY = 0;
            }

            this.preData = data;

            return Object.freeze(data);
        },
        // 计算触摸点的中心点 PS：暂时只做单点，后续看需求是否加多点
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
         *  0: 原位置
         *  1: 上
         *  2: 右
         *  3: 下
         *  4: 左
         **/
        getDirection: function (x, y) {
            if (x === y) {
                return 0;
            }
            // x >= y 时，当前点在 x 轴移动更远，说明是横向滑动
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
        this._recognize(event, data);
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
     * 手势
     * @class
     **/
    var Gesture = function (element, opt) {
        this._eventContext = this._element = element;
        this.startX = this.startY = this.startT = 0;
        opt && (this._opt = opt);

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
        name = RecognizerClass.name;
        var recognizer = this._recognizers[name] = new RecognizerClass(this);
        // 添加冲突关系
        var conflictList = Recognizer.getConflictList(recognizer.name);
        for (var i = 0; i < conflictList.length; i++) {
            name = conflictList[i];
            var conflictRecognizer = this._recognizers[name];
            if (conflictRecognizer) {
                conflictRecognizer.conflictList[recognizer.name] = recognizer;
                recognizer.conflictList[conflictRecognizer.name] = conflictRecognizer;
            }
        }
    };
    proto._removeEventCallback = function (name) {
        if (name === undefined) {
            this._recognizers = {};
        } else {
            var recognizer = this._recognizers[name];
            // 删除冲突关系
            for (var i in recognizer.conflictList) {
                delete recognizer.conflictList[i][name];
            } 
            delete this._recognizers[name];
        }
    };
    proto._hasRegister = function (name) {
        return !!this._recognizers[Recognizer.getByEventname(name)];
    };
    proto._recognize = function (event, data) {
        var recognizers = this._recognizers;
        for (var i in recognizers) {
            var recognizer = recognizers[i];
            recognizer.recognize(data);
        }
    };
    

    return Gesture;
});
