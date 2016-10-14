/**
 * Builtins register
 */
define(function (require) {
    'use strict';
    /**
     * Register the builtin components.
     */
    function register() {
        var registerEle = require('../element');
        registerEle('mip-pix', require('./mip-pix'));
        registerEle('mip-img', require('./mip-img'));
        registerEle('mip-carousel', require('./mip-carousel'));
        registerEle('mip-iframe', require('./mip-iframe'));
    };

    return {
        register: register
    }
});
