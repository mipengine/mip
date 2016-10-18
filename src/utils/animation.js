define(function (require) {
    'use strict';

    var naboo = require('naboo');
    var spark = require('spark');

    /**
     * Types of filling arguments.
     * @const
     * @inner
     * @type {Object}
     */
    var FILL_TYPES = {
        duration: {type: 'number', value: 400},
        ease: {type: 'string', value: 'ease'},
        delay: {type: 'number', value: 0},
        tween: {type: 'string', value: 'Linear'}
    };

    /**
     * The arg list of css method.
     * @const
     * @inner
     * @type {Array}
     */
    var CSS_ARG_LIST = [,,'duration', 'ease', 'delay', 'callback'];

    /**
     * Fill the args from user.
     * @param {Array} list The examine listing of args
     * @param {Array} args The list to be examined
     * @return {Array}
     */
    function fillArgs(list, args) {
        for (var i = 0; i < list.length; i++) {
            var name = list[i];
            if (!name || !FILL_TYPES[name]) {
                continue;
            }
            if (typeof args[i] !== FILL_TYPES[name].type) {
                args.splice(i, 0, FILL_TYPES[name].value);
            }
        }
        return args;
    };

    /**
     * Register built-in naboo methods.
     */
    function register() {
        // Register css animation
        // Example:
        //  naboo.css(element, {left: 0}, 1000, 'ease-in', 0, function () {}).start();
        // The parameters from the second can be omitted
        naboo.register('css', function run(next/*, dom, properties, duration, ease, delay, callback*/) {
            var args = fillArgs(CSS_ARG_LIST, Array.prototype.slice.call(arguments, 1));
            args[2] = args[2] / 1000;
            args[4] = args[4] / 1000;
            var cb = args[5];
            args[5] = function () {
                cb && cb();
                next();
            };
            spark.css3.apply(spark, args);
        });
    };

    return {
        register: register
    };
});
