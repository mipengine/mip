define(function () {
    'use strict';

    /**
     * Layout types.
     * @inner
     * @const
     * @type {Object}
     */
    var LAYOUT = {
        NODISPLAY: 'nodisplay',
        FIXED: 'fixed',
        FIXED_HEIGHT: 'fixed-height',
        RESPONSIVE: 'responsive',
        CONTAINER: 'container',
        FILL: 'fill',
        FLEX_ITEM: 'flex-item'
    };

    /**
     * Natural dimensions.
     * @inner
     * @const
     * @type {Object}
     */
    var NATURAL_DIMENSIONS = {
        'mip-pix': {width: '1px', height: '1px'},
        'mip-stats': {width: '1px', height: '1px'},
        'mip-audio': null
    };

    /**
     * Loading elements.
     * @inner
     * @const
     * @type {Object}
     */
    var LOADING_ELEMENTS = {
        'mip-anim': true,
        'mip-brightcove': true,
        'mip-embed': true,
        'mip-iframe': true,
        'mip-img': true,
        'mip-list': true,
        'mip-video': true
    };

    /**
     * Layout for MIPElement.
     * @class
     */
	function Layout() {
    }

    /**
     * @param {string} s
     * @return {Layout|undefined} Returns undefined in case of failure to parse
     *   the layout string.
     */
    Layout.prototype.parseLayout = function(s) {
      for (var i in LAYOUT) {
        if (LAYOUT[i] == s) {
          return s;
        }
      }
      return undefined;
    }

    /**
     * @param {Layout} layout
     * @return {string}
     */
    Layout.prototype.getLayoutClass = function(layout) {
      return 'mip-layout-' + layout;
    }

    /**
     * Whether an element with this layout inherently defines the size.
     * @param {Layout} layout
     * @return {boolean}
     */
    Layout.prototype.isLayoutSizeDefined = function (layout) {
      return (layout == LAYOUT.FIXED ||
          layout == LAYOUT.FIXED_HEIGHT ||
          layout == LAYOUT.RESPONSIVE ||
          layout == LAYOUT.FILL ||
          layout == LAYOUT.FLEX_ITEM);
    }

    /**
     * Parses the CSS length value. If no units specified, the assumed value is
     * "px". Returns undefined in case of parsing error.
     * @param {string|undefined} s
     * @return {!LengthDef|undefined}
     */
    Layout.prototype.parseLength = function(s) {
      if (typeof s == 'number') {
        return s + 'px';
      }
      if (!s) {
        return undefined;
      }
      if (!/^\d+(\.\d+)?(px|em|rem|vh|vw|vmin|vmax|cm|mm|q|in|pc|pt)?$/.test(s)) {
        return undefined;
      }
      if (/^\d+(\.\d+)?$/.test(s)) {
        return s + 'px';
      }
      return s;
    }


    /**
     * Returns the numeric value of a CSS length value.
     * @param {string} length
     * @return {number}
     */
    Layout.prototype.getLengthNumeral = function(length) {
      return parseFloat(length);
    }


    /**
     * Determines whether the tagName is a known element that has natural dimensions
     * in our runtime or the browser.
     * @param {string} tagName The element tag name.
     * @return {DimensionsDef}
     */
    Layout.prototype.hasNaturalDimensions = function(tagName) {
      tagName = tagName.toLowerCase();
      return NATURAL_DIMENSIONS[tagName] !== undefined;
    }


    /**
     * Determines the default dimensions for an element which could vary across
     * different browser implementations, like <audio> for instance.
     * This operation can only be completed for an element whitelisted by
     * `hasNaturalDimensions`.
     * @param {!Element} element
     * @return {DimensionsDef}
     */
    Layout.prototype.getNaturalDimensions = function(element) {
      var tagName = element.tagName.toLowerCase();
      if (!NATURAL_DIMENSIONS[tagName]) {
        var doc = element.ownerDocument;
        var naturalTagName = tagName.replace(/^mip\-/, '');
        var temp = doc.createElement(naturalTagName);
        // For audio, should no-op elsewhere.
        temp.controls = true;
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        doc.body.appendChild(temp);
        NATURAL_DIMENSIONS[tagName] = {
          width: (temp.offsetWidth || 1) + 'px',
          height: (temp.offsetHeight || 1) + 'px',
        };
        doc.body.removeChild(temp);
      }
      return NATURAL_DIMENSIONS[tagName];
    }


    /**
     * Whether the loading can be shown for the specified elemeent. This set has
     * to be externalized since the element's implementation may not be
     * downloaded yet.
     * @param {string} tagName The element tag name.
     * @return {boolean}
     */
    Layout.prototype.isLoadingAllowed = function(tagName) {
      return LOADING_ELEMENTS[tagName.toLowerCase()] || false;
    }

    /**
     * Apply layout for a MIPElement.
     * @param {MIPElement} element
     * @return {string}
     */
    Layout.prototype.applyLayout = function (element) {
        if (element._layoutInited) {
            return;
        }
        element._layoutInited = true;
        var layoutAttr = element.getAttribute('layout');
        var widthAttr = element.getAttribute('width');
        var heightAttr = element.getAttribute('height');
        var sizesAttr = element.getAttribute('sizes');
        var heightsAttr = element.getAttribute('heights');

        // Input layout attributes.
        var inputLayout = layoutAttr ? this.parseLayout(layoutAttr) : null;
        var inputWidth = (widthAttr && widthAttr != 'auto') ?
            this.parseLength(widthAttr) : widthAttr;
        var inputHeight = heightAttr ? this.parseLength(heightAttr) : null;

        // Effective layout attributes. These are effectively constants.
        var width;
        var height;
        var layout;

        // Calculate effective width and height.
        if ((!inputLayout || inputLayout == LAYOUT.FIXED ||
            inputLayout == LAYOUT.FIXED_HEIGHT) &&
            (!inputWidth || !inputHeight) && this.hasNaturalDimensions(element.tagName)) {
          // Default width and height: handle elements that do not specify a
          // width/height and are defined to have natural browser dimensions.
          var dimensions = this.getNaturalDimensions(element);
          width = (inputWidth || inputLayout == LAYOUT.FIXED_HEIGHT) ? inputWidth :
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
          layout = LAYOUT.CONTAINER;
        } else if (height && (!width || width == 'auto')) {
          layout = LAYOUT.FIXED_HEIGHT;
        } else if (height && width && (sizesAttr || heightsAttr)) {
          layout = LAYOUT.RESPONSIVE;
        } else {
          layout = LAYOUT.FIXED;
        }



        // Apply UI.
        element.classList.add(this.getLayoutClass(layout));
        if (this.isLayoutSizeDefined(layout)) {
          element.classList.add('mip-layout-size-defined');
        }
        if (layout == LAYOUT.NODISPLAY) {
          element.style.display = 'none';
        } else if (layout == LAYOUT.FIXED) {
          element.style.width = width;
          element.style.height = height;
        } else if (layout == LAYOUT.FIXED_HEIGHT) {
          element.style.height = height;
        } else if (layout == LAYOUT.RESPONSIVE) {
          var space = element.ownerDocument.createElement('mip-i-space');
          space.style.display = 'block';
          space.style.paddingTop =
              ((this.getLengthNumeral(height) / this.getLengthNumeral(width)) * 100) + '%';
          element.insertBefore(space, element.firstChild);
          element._spaceElement = space;
        } else if (layout == LAYOUT.FILL) {
          // Do nothing.
        } else if (layout == LAYOUT.CONTAINER) {
          // Do nothing. Elements themselves will check whether the supplied
          // layout value is acceptable. In particular container is only OK
          // sometimes.
        } else if (layout == LAYOUT.FLEX_ITEM) {
          // Set height and width to a flex item if they exist.
          // The size set to a flex item could be overridden by `display: flex` later.
          if (width) {
            element.style.width = width;
          }
          if (height) {
            element.style.height = height;
          }
        }
        if (element.classList.contains('mip-hidden')) {
            element.classList.remove('mip-hidden');
        }
        return layout;
    };

    /**
     * 初始化页面的 MIP 组件布局
     */
    Layout.prototype.init = function () {
        var self = this;

        // 前置处理 layout
        [].slice.call(document.all || document.querySelectorAll('*')).forEach(function (el) {
            if (el.tagName.toLowerCase().indexOf('mip-') === 0) {
                self.applyLayout(el);
            }
        });
    };

    return new Layout();
});
