define(function (require) {
    require('zepto');
    require('naboo');
    require('spark');
    require('fetch-jsonp');


    require('./utils/fn');
    require('./utils/gesture/gesture-recognizer');
    require('./utils/gesture/data-processor');
    require('./utils/gesture');
    require('./utils/platform');
    require('./utils/event-emitter');
    var animation = require('./utils/animation');
    require('./utils/event-action');

    /* dom */
    require('./dom/css-loader');
    require('./dom/rect');
    require('./dom/event');
    require('./dom/css');
    require('./dom/dom');


    /* mip frame */
    require('./layout');
    require('./fixed-element');
    var viewport = require('./viewport');
    require('./customElement');
    var registerMipElement = require('./element');
    require('./util');
    var resources = require('./resources');
    var viewer = require('./viewer');

    /* builtin components */
    require('./components/mip-img');
    require('./components/mip-pix');
    require('./components/mip-carousel');
    require('./components/mip-iframe');
    var components = require('./components/index');

    // Register builtin animaters
    animation.register();

    // The global variable of MIP
    var Mip = {};
    if (!window.MIP) {
        window.MIP = Mip;
    }

    Mip.css = {};
    Mip.registerMipElement = registerMipElement;
    Mip.viewer = viewer;
    Mip.viewport = viewport;
    Mip.prerenderElement = resources.prerenderElement;

    // Initialize viewer
    viewer.init();

    // Register builtin extensions
    components.register();

    // Show page
    viewer.show();

    return Mip;
});

