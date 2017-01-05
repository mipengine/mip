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
    var layout = require('./layout');
    require('./fixed-element');
    var viewport = require('./viewport');
    require('./customElement');
    var registerElement = require('./element');
    require('./util');
    var resources = require('./resources');
    var viewer = require('./viewer');
    var performance = require('./performance');
    var templates = require('./templates');

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
    Mip.viewer = viewer;
    Mip.viewport = viewport;
    Mip.prerenderElement = resources.prerenderElement;    
    Mip.registerMipElement = function (name, customClass, css) {
        if (templates.isTemplateClass(customClass)) {
            templates.register(name, customClass);
        } else {
            registerElement(name, customClass, css);
        }
    };

    // Initialize viewer
    viewer.init();

    // Find the default-hidden elements.
    var hiddenElements = Array.prototype.slice.call(document.getElementsByClassName('mip-hidden'));
    // Regular for checking mip elements.
    var mipTagReg = /mip-/i;
    // Apply layout for default-hidden elements.
    hiddenElements.forEach(function (element) {
        if (element.tagName.search(mipTagReg) > -1) {
            layout.applyLayout(element);
        }
    });

    // Register builtin extensions
    components.register();

    performance.start(window._mipStartTiming);

    performance.on('update', function (timing) {
        viewer.sendMessage('performance_update', timing);
    });

    // Show page
    viewer.show();

    return Mip;
});

