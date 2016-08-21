define(function(){
	function Layout(){
        this.Layout = {
            NODISPLAY: 'nodisplay',
            FIXED: 'fixed',
            FIXED_HEIGHT: 'fixed-height',
            RESPONSIVE: 'responsive',
            CONTAINER: 'container',
            FILL: 'fill',
            FLEX_ITEM: 'flex-item'
        };
        this._naturalDimensions = {
          'mip-pix': {width: '1px', height: '1px'},
          'mip-stats': {width: '1px', height: '1px'},
          // TODO: audio should have width:auto.
          'mip-audio': null,
          'mip-share': {width: '60px', height: '44px'}
        };
        this._LOADING_ELEMENTS = {
            'mip-anim': true,
            'mip-brightcove': true,
            'mip-embed': true,
            'mip-iframe': true,
            'mip-img': true,
            'mip-list': true,
            'mip-video': true
        };
    }
    /**
     * @param {string} s
     * @return {Layout|undefined} Returns undefined in case of failure to parse
     *   the layout string.
     */
    Layout.prototype.parseLayout = function(s) {
      for (var i in this.Layout) {
        if (this.Layout[i] == s) {
          return s;
        }
      }
      return undefined;
    }

    /**
     * @param {!Layout} layout
     * @return {string}
     */
    Layout.prototype.getLayoutClass = function(layout) {
      return 'mip-layout-' + layout;
    }

    /**
     * Whether an element with this layout inherently defines the size.
     * @param {!Layout} layout
     * @return {boolean}
     */
    Layout.prototype.isLayoutSizeDefined = function (layout) {
      return (layout == this.Layout.FIXED ||
          layout == this.Layout.FIXED_HEIGHT ||
          layout == this.Layout.RESPONSIVE ||
          layout == this.Layout.FILL ||
          layout == this.Layout.FLEX_ITEM);
    }
    /**
     * Whether the tag is an internal (service) AMP tag.
     * @param {!Node|string} tag
     * @return {boolean}
     */
     Layout.prototype.isInternalElement = function (tag) {
      var tagName = (typeof tag == 'string') ? tag : tag.tagName;
      return tagName && tagName.toLowerCase().indexOf('mip-i-') == 0;
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
     * Returns units from the CSS length value.
     * @param {!LengthDef} length
     * @return {string}
     */
    Layout.prototype.getLengthUnits = function(length) {
      var unit = length.match(/[a-z]+/i);
      return unit[0];
    }


    /**
     * Returns the numeric value of a CSS length value.
     * @param {!LengthDef|string} length
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
      tagName = tagName.toUpperCase();
      return this._naturalDimensions[tagName] !== undefined;
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
      if (!this._naturalDimensions[tagName]) {
        var doc = element.ownerDocument;
        var naturalTagName = tagName.replace(/^mip\-/, '');
        var temp = doc.createElement(naturalTagName);
        // For audio, should no-op elsewhere.
        temp.controls = true;
        temp.style.position = 'absolute';
        temp.style.visibility = 'hidden';
        doc.body.appendChild(temp);
        this._naturalDimensions[tagName] = {
          width: (temp.offsetWidth || 1) + 'px',
          height: (temp.offsetHeight || 1) + 'px',
        };
        doc.body.removeChild(temp);
      }
      return this._naturalDimensions[tagName];
    }


    /**
     * Whether the loading can be shown for the specified elemeent. This set has
     * to be externalized since the element's implementation may not be
     * downloaded yet.
     * @param {string} tagName The element tag name.
     * @return {boolean}
     */
    Layout.prototype.isLoadingAllowed = function(tagName) {
      return this._LOADING_ELEMENTS[tagName.toLowerCase()] || false;
    }
    return new Layout();
});
