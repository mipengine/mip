// MIP initialization
require(['./components/platform', './element', './builtins/mip_builtins', 
    './viewer', './viewport', './components/css', 'resources', './components/animation'], 
    function (platform, registerMipElement, builtin, viewer, viewport, css, resources, animationRegister) {
    'use strict';
    
    // Register builtin animaters
    animationRegister();
        
    // The global variable of MIP
    !window.MIP && (window.MIP = {});
    MIP.css = {};
    MIP['registerMipElement'] = registerMipElement;
    window.platform = platform;
    MIP.registerMipElement = registerMipElement;
    MIP.viewer = viewer;
    MIP.viewport = viewport;
    MIP.prerenderElement = resources.prerenderElement;

    // Initialize viewer
    viewer.init();

    // Register builtin extensions
    builtin.register();

    // Show page
    viewer.show();
});
