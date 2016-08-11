/**
 *  mip element
 *  @exports register
 **/
define(['./components/cssLoader', './resources'], function (cssLoader, resources) {
    var customElements = {};

    var baseElementProto;
    var createBaseElementProto = function () {
        if (baseElementProto) {
            return baseElementProto;
        }

        var proto = Object.create(HTMLElement.prototype);
        proto.createdCallback = function() {
            var CustomEle = customElements[this.name];
            this.classList.add('mip-element');
            this._inViewport = false;
            this._firstInViewport = false;
            this._resources = resources();
            this.customElement = new CustomEle(this);
            this.customElement.createdCallback();
        };
        proto.attachedCallback = function() {
            this.customElement.attachedCallback();
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
                this.customElement.inviewCallback();
            }
            this.customElement.viewportCallback(inViewport);
        };
        proto.isBuilt = function () {
            return this._built;
        };
        proto.build = function () {
            if (this.isBuilt()) {
                return;
            }
            try {
                this.customElement.build();
                this._built = true;
            } catch (e) {
                console.warn('build error:', this);
            }
        };
        return baseElementProto = proto;
    };

    var createMipElementProto = function (name) {
        var proto = Object.create(createBaseElementProto());
        proto.name = name;
        return proto;
    };

    var loadCss = function (css) {
        if (css) {
            cssLoader.insertStyleElement(document, document.head, css, name, false);
        }
    };

    var registerElement = function (name, elementClass, css) {
        if (customElements[name]) {
            return;
        }
        customElements[name] = elementClass;
        loadCss(css);
        document.registerElement(name, {
            prototype: createMipElementProto(name)
        });
    };
    
    return registerElement;
});
