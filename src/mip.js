// MIP initialization
require(['./element', './components/index', 
    './viewer', './viewport', 'resources', './util/animation'], 
    function (registerMipElement, components, viewer, viewport, resources, animation) {
    'use strict';

    
    // Register builtin animaters
    animation.register();
        
    // The global variable of MIP
    !window.MIP && (window.MIP = {});
    MIP.css = {};
    MIP.registerMipElement = registerMipElement;
    MIP.viewer = viewer;
    MIP.viewport = viewport;
    MIP.prerenderElement = resources.prerenderElement;

    // Initialize viewer
    viewer.init();

    // Register builtin extensions
    components.register();

    // Show page
    viewer.show();
});
