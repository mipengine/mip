define(function (require) {
    'use strict';
    
    var EventEmitter = require('./event-emitter');
    var Recognizer = require('./gesture/gesture-recognizer');
    var dataProcessor = require('./gesture/data-processor');
    var fn = require('./fn');


    function touchHandler(event) {
        var opt = this._opt;
        opt.preventDefault && event.preventDefault();
        opt.stopPropagation && event.stopPropagation();
        var data = dataProcessor.process(event, opt.preventX, opt.preventY);
        this._recognize(data);
        this.trigger(event.type, event, data);
    };

    function listenersHelp(element, events, handler, method) {
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
    function Gesture(element, opt) {
        this.__eventContext = this._element = element;
        this.startX = this.startY = this.startT = 0;
        opt && (this._opt = fn.extend({}, this._opt, opt));

        this._boundTouchEvent = touchHandler.bind(this);
        listenersHelp(element, 'touchstart touchmove touchend touchcancel', this._boundTouchEvent);

        this._boundTriggerListener = this.trigger.bind(this);
        this._recognizers = {};
    };

    var proto = EventEmitter.mixin(Gesture.prototype);

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
        var recognizer;
        if (name === undefined) {
            this._recognizers = {};
        } else if (recognizer = this._recognizers[name]) {
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
