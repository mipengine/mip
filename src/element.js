define(['./components/css-loader', './components/layout', './resources'], function (cssLoader, layout, Resources) {
    'use strict';

    // To save custom Classes
    var customElements = {};

    var resources;

    // Save the base element prototype to avoid duplicate initialization.
    var baseElementProto;

    /**
     * Create a basic prototype of mip elements classes
     * @return {Object}
     */
    var createBaseElementProto = function () {
        if (baseElementProto) {
            return baseElementProto;
        }

        // Base element inherits from HTMLElement
        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function() {
            var CustomEle = customElements[this.name];
            this.classList.add('mip-element');
            this._inViewport = false;
            this._firstInViewport = false;
            this._resources = resources;
            this.customElement = new CustomEle(this);
            this.customElement.createdCallback();
        };
        proto.attachedCallback = function() {
            // Apply layout for this.
            this._layout = layout.applyLayout(this);
            this.customElement.attachedCallback();
            // Add to resource manager.
            this._resources.add(this);
        };
        proto.detachedCallback = function() {
            this.customElement.detachedCallback();
            this._resources.remove(this);
        };
        proto.attributeChangedCallback = function(){
            this.customElement.attributeChangedCallback();
        };
        proto.inViewport = function () {
            return this._inViewport;
        };
        proto.viewportCallback = function (inViewport) {
            this._inViewport = inViewport;
            if (!this._firstInViewport) {
                this._firstInViewport = true;
                this.customElement.firstInviewCallback();
            }
            this.customElement.viewportCallback(inViewport);
        };
        proto.isBuilt = function () {
            return this._built;
        };
        proto.prerenderAllowed = function () {
            return this.customElement.prerenderAllowed();
        };

        // Build of lifecycle.
        // This will be runned only once.
        proto.build = function () {
            if (this.isBuilt()) {
                return;
            }
            // Add `try ... catch` avoid the executing build list being interrupted by errors.
            try {
                this.customElement.build();
                this._built = true;
            } catch (e) {
                console.warn('build error:', e);
            }
        };

        // Method of executing event actions of the custom Element 
        proto.excuteEventAction = function (action) {
            this.customElement.excuteEventAction(action);
        };
        return baseElementProto = proto;
    };

    /**
     * Create a mip element prototype by name
     * @param {string} name The mip element's name
     * @return {Object}
     */
    var createMipElementProto = function (name) {
        var proto = Object.create(createBaseElementProto());
        proto.name = name;
        return proto;
    };

    /**
     * Add a style tag to head by csstext
     * @param {string} css Css code
     */
    var loadCss = function (css) {
        if (css) {
            cssLoader.insertStyleElement(document, document.head, css, name, false);
        }
    };

    var registerElement = function (name, elementClass, css) {
        if (customElements[name]) {
            return;
        }

        if (!resources) {
            resources = new Resources();
        }
        customElements[name] = elementClass;
        loadCss(css);
        document.registerElement(name, {
            prototype: createMipElementProto(name)
        });
    };
    
    return registerElement;
});
