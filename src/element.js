/**
 *  mip element
 *  @exports register
 **/
define(['./components/css-loader', './components/layout', './resources'], function (cssLoader, layoutObj, Resources) {
    var customElements = {};
    var resources;

    var baseElementProto;
    
    function applyLayout_(element) {
        var layoutAttr = element.getAttribute('layout');
        var widthAttr = element.getAttribute('width');
        var heightAttr = element.getAttribute('height');
        var sizesAttr = element.getAttribute('sizes');
        var heightsAttr = element.getAttribute('heights');

        // Input layout attributes.
        var inputLayout = layoutAttr ? layoutObj.parseLayout(layoutAttr) : null;
        var inputWidth = (widthAttr && widthAttr != 'auto') ?
            layoutObj.parseLength(widthAttr) : widthAttr;
        var inputHeight = heightAttr ? layoutObj.parseLength(heightAttr) : null;

        // Effective layout attributes. These are effectively constants.
        var width;
        var height;
        var layout;

        // Calculate effective width and height.
        if ((!inputLayout || inputLayout == layoutObj.Layout.FIXED ||
            inputLayout == layoutObj.Layout.FIXED_HEIGHT) &&
            (!inputWidth || !inputHeight) && layoutObj.hasNaturalDimensions(element.tagName)) {
          // Default width and height: handle elements that do not specify a
          // width/height and are defined to have natural browser dimensions.
          var dimensions = layoutObj.getNaturalDimensions(element);
          width = (inputWidth || inputLayout == layoutObj.Layout.FIXED_HEIGHT) ? inputWidth :
              dimensions.width;
          height = inputHeight || dimensions.height;
        } else {
          width = inputWidth;
          height = inputHeight;
        }

        // Calculate effective layout.
        if (inputLayout) {
          layout = inputLayout;
        } else if (!width && !height) {
          layout = layoutObj.Layout.CONTAINER;
        } else if (height && (!width || width == 'auto')) {
          layout = layoutObj.Layout.FIXED_HEIGHT;
        } else if (height && width && (sizesAttr || heightsAttr)) {
          layout = layoutObj.Layout.RESPONSIVE;
        } else {
          layout = layoutObj.Layout.FIXED;
        }

        

        // Apply UI.
        element.classList.add(layoutObj.getLayoutClass(layout));
        if (layoutObj.isLayoutSizeDefined(layout)) {
          element.classList.add('mip-layout-size-defined');
        }
        if (layout == layoutObj.Layout.NODISPLAY) {
          element.style.display = 'none';
        } else if (layout == layoutObj.Layout.FIXED) {
          element.style.width = width;
          element.style.height = height;
        } else if (layout == layoutObj.Layout.FIXED_HEIGHT) {
          element.style.height = height;
        } else if (layout == layoutObj.Layout.RESPONSIVE) {
          var space = element.ownerDocument.createElement('mip-i-space');
          space.style.display = 'block';
          space.style.paddingTop =
              ((layoutObj.getLengthNumeral(height) / layoutObj.getLengthNumeral(width)) * 100) + '%';
          element.insertBefore(space, element.firstChild);
          element._spaceElement = space;
        } else if (layout == layoutObj.Layout.FILL) {
          // Do nothing.
        } else if (layout == layoutObj.Layout.CONTAINER) {
          // Do nothing. Elements themselves will check whether the supplied
          // layout value is acceptable. In particular container is only OK
          // sometimes.
        } else if (layout == layoutObj.Layout.FLEX_ITEM) {
          // Set height and width to a flex item if they exist.
          // The size set to a flex item could be overridden by `display: flex` later.
          if (width) {
            element.style.width = width;
          }
          if (height) {
            element.style.height = height;
          }
        }
        return layout;
    }

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
            this._resources = resources;
            this.customElement = new CustomEle(this);
            this.customElement.createdCallback();
        };
        proto.attachedCallback = function() {
            this._layout = applyLayout_(this);
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
        proto.prerenderAllowed = function () {
            return this.customElement.prerenderAllowed();
        };
        proto.build = function () {
            if (this.isBuilt()) {
                return;
            }
            try {
                this.customElement.build();
                this._built = true;
            } catch (e) {
                console.warn('build error:', e);
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
