define(function (require) {
    // 稳定性监控
    require('./log/monitor');
    require('zepto');
    require('naboo');

    /* dom */
    var dom = require('./dom/dom');

    // The global variable of MIP
    var Mip = {};
    if (window.MIP) {
        var exts = window.MIP;
        window.MIP = Mip;
        MIP.extensions = exts;
    } else
    {
        window.MIP = Mip;
    }

    // before document ready
    MIP.push = function (extensions) {
        if (!MIP.extensions) {
            MIP.extensions = [];
        }
        MIP.extensions.push(extensions);
    };

    dom.waitDocumentReady(function () {

        require('fetch-jsonp');
        require('fetch');

        require('./utils/fn');
        require('./utils/gesture/gesture-recognizer');
        require('./utils/gesture/data-processor');
        require('./utils/gesture');
        require('./utils/platform');
        require('./utils/event-emitter');
        require('./utils/event-action');


        require('./dom/css-loader');
        require('./dom/rect');
        require('./dom/event');
        require('./dom/css');

        var CustomStorage = require('./utils/customStorage');
        var sleepWakeModule = require('./sleepWakeModule');



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

        /* mip hash */
        var hash = require('./hash');

        /* builtin components */
        require('./components/mip-img');
        require('./components/mip-pix');
        require('./components/mip-carousel');
        require('./components/mip-iframe');
        var components = require('./components/index');


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
        MIP.hash = hash;


        // Initialize sleepWakeModule
        sleepWakeModule.init();
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

        // clear cookie
        var storage = new CustomStorage(2);
        storage.delExceedCookie();
    });

    return Mip;
});

