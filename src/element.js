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
            this._resources = resources();
            this.customElement = new CustomEle(this);
            this.customElement.mipCreatedCallback();
        };
        proto.attachedCallback = function() {
            console.log(document.readyState);
            this.customElement.mipAttachedCallback();
            this._resources.add(this);
        };
        proto.detachedCallback = function() {
            this.customElement.mipDetachedCallback();
        };
        proto.attributeChangedCallback = function(){
            this.customElement.mipAttributeChangedCallback();
        };
        proto.inViewport = function () {
            return this._inViewport;
        };
        proto.viewportCallback = function (inViewport) {
            this._inViewport = inViewport;
            this.customElement.viewportCallback(inViewport);
        };
        proto.prerenderAllowed = function () {
            return this.customElement.prerenderAllowed();
        };
        proto.isBuilt = function () {
            return this._built;
        };
        proto.build = function () {
            console.log('built');
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
