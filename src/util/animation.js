define(function (require) {
    var naboo = require('naboo');
    var spark = require('spark');

    var argsFill = {
        duration: {type: 'number', value: 400},
        ease: {type: 'string', value: 'ease'},
        delay: {type: 'number', value: 0},
        tween: {type: 'string', value: 'Linear'}
    };

    var cssArgList = [,,'duration', 'ease', 'delay', 'callback'];
    function fillArgs(list, args) {
        for (var i = 0; i < list.length; i++) {
            var name = list[i];
            if (!name || !argsFill[name]) {
                continue;
            }
            if (typeof args[i] !== argsFill[name].type) {
                args.splice(i, 0, argsFill[name].value);
            }
        }
        return args;
    };

    function register() {
        // Register css animation
        // Example:
        //  naboo.css(element, {left: 0}, 1000, 'ease-in', 0, function () {}).start();
        // The parameters from the second can be omitted
        naboo.register('css', function run(next/*, dom, properties, duration, ease, delay, callback*/) {
            var args = fillArgs(cssArgList, Array.prototype.slice.call(arguments, 1));
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
