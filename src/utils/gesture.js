define(function (require) {
    'use strict';
    
    var EventEmitter = require('./event-emitter');
    var Recognizer = require('./gesture/gesture-recognizer');
    var dataProcessor = require('./gesture/data-processor');
    var fn = require('./fn');


    /**
     * Handle touch event.
     * @inner
     * @param {Event} event
     */
    function touchHandler(event) {
        var opt = this._opt;
        opt.preventDefault && event.preventDefault();
        opt.stopPropagation && event.stopPropagation();
        var data = dataProcessor.process(event, opt.preventX, opt.preventY);
        this._recognize(data);
        this.trigger(event.type, event, data);
    }

    /**
     * Add or remove listeners from an element.
     * @inner
     * @param {HTMLElement} element
     * @param {string} events Events' name that are splitted by space
     * @param {Function} handler Event handler
     * @param {?boolean} method Add or remove.
     */
    function listenersHelp(element, events, handler, method) {
        var list = events.split(' ');
        for (var i = 0; i < list.length; i++) {
            if (method === false) {
                element.removeEventListener(list[i], handler);
            } else {
                element.addEventListener(list[i], handler, false);
            }
        }
    }

    /**
     * Gesture
     * @class
     * @param {HTMLElement} element Element that need gestures
     * @param {Object} opt Options
     */
    function Gesture(element, opt) {
        /**
         * The events' context.
         * @private
         * @type {?Object}
         */
        this.__eventContext = this._element = element;

        opt && (this._opt = fn.extend({}, this._opt, opt));

        /**
         * Touch handler.
         * @private
         * @type {Function}
         */
        this._boundTouchEvent = touchHandler.bind(this);

        listenersHelp(element, 'touchstart touchmove touchend touchcancel', this._boundTouchEvent);

        /**
         * For storing the recoginzers.
         * @private
         * @type {Object}
         */
        this._recognizers = {};
    }

    var proto = EventEmitter.mixin(Gesture.prototype);

    /**
     * Default options.
     * @private
     * @type {Object}
     */
    proto._opt = {
        preventDefault: false,
        stopPropagation: false,
        preventX: true,
        preventY: false
    };

    /**
     * Cleanup the events.
     */
    proto.cleanup = function () {
        var element = this._element;
        listenersHelp(element, 'touchstart touchmove touchend touchcancel', this._boundTouchEvent, false);
        this.off();
    };

    /**
     * Instantiate a recoginzer and add the recoginzer to the _recognizer and handle the conflicting list when
     * event is created.
     * @param {string} name
     */
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

    /**
     * When event is removed, cleanup the recognizer.
     * @param {string} name
     */
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

    /**
     * Determine whether a recognizer has been registered.
     * @param {string} name
     */
    proto._hasRegister = function (name) {
        return !!this._recognizers[Recognizer.getByEventname(name)];
    };

    /**
     * Recognize the gesture data.
     * @param {Object} data
     */
    proto._recognize = function (data) {
        var recognizers = this._recognizers;
        for (var i in recognizers) {
            var recognizer = recognizers[i];
            recognizer.recognize(data);
        }
    };
    

    return Gesture;
});
