/**
 *  mip element
 *  @exports register
 **/
define(['components/cssLoader'], function (cssLoader) {
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
            this.customElement = new CustomEle(this);
            this.customElement.mipCreatedCallback();
        };
        proto.attachedCallback = function() {
            this.customElement.mipAttachedCallback();
        };
        proto.detachedCallback = function() {
            this.customElement.mipDetachedCallback();
        };
        proto.attributeChangedCallback = function(){
            this.customElement.mipAttributeChangedCallback();
        };
        proto.isInviewer = function() {
            if (this.prerenderAllowed()) {
                return true;
            }
            var elmTop = $(this).offset().top;
            var pageHight  = $(window).height();
            var scrollTop = pageYOffset;

            if (window.parent !== window && platform.needSpecialScroll) {
                return elmTop <= pageHight;
            }
            if(elmTop - scrollTop > pageHight){
                return false;
            } else {
                return true;
            }
        };
        proto.inviewCallback = function () {
            this.customElement.inviewCallback();
        };
        proto.prerenderAllowed = function () {
            return this.customElement.prerenderAllowed();
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
