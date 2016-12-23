define('fixed-element', ['require', 'util', 'layout'], function(require) {
    'use strict';

    var util = require('util');
    var layout = require('layout');
    var platform = util.platform;
    var css = util.css;

    /**
     * The fixed element processor.
     * @class
     */
    function FixedElement() {
        /**
         * @private
         * @type {HTMLElement}
         */
        this._fixedLayer = null;

        /**
         * @private
         * @type {number}
         */
        this._count = 0;

        /**
         * @private
         * @type {Object}
         */
        this._fixedTypes = {
            'top': 1,
            'bottom': 1,
            'gototop': 1,
            'other': 1
        };

        /**
         * Whether the platform is android and uc browser.
         * @private
         * @type {boolean}
         */
        this._isAndroidUc = platform.isUc() && !platform.isIos();

        /**
         * @private
         * @type {Array.<FixedElement>}
         */
        this._fixedElements = [];
    }

    /**
     * Initializition of current fixed element processor.
     */
    FixedElement.prototype.init = function () {
        var mipFixedElements = document.querySelectorAll('mip-fixed');
        this.setFixedElement(mipFixedElements);
        var fixedLen = this._fixedElements.length;
        var hasParentPage = window.parent !== window;
        if ((platform.isIos()) && hasParentPage) {
            var fixedLayer = this.getFixedLayer();

            for (var i = 0; i < fixedLen; i++) {
                this.moveToFixedLayer(this._fixedElements[i], i);
            }
        }
        if (hasParentPage) {
            this.doCustomElements();
        }
    };

    /**
     * Process some fixed elements.
     * @param {Array.<MIPElement>} fixedElements
     */
    FixedElement.prototype.setFixedElement = function (fixedElements) {
        var fixedEle = {};
        var fixedTypeCount = {};
        for (var i = 0; i < fixedElements.length; i++) {
            var ele = fixedElements[i];
            // Calculate z-index based on the declared z-index and DOM position.
            css(ele, {
                'z-index': 10000 - i
            });
            // While platform is android-uc, change the position to 'absolute'.
            if (this._isAndroidUc) {
                css(ele, {
                    position: 'absolute'
                });
            }
            var fType = ele.getAttribute('type');
            var transfType = (fType == 'right' || fType == 'left') ? 'other': fType;
            if (transfType === 'gototop' && ele.firstElementChild.tagName.toLowerCase() !== 'mip-gototop') {
                continue;
            }
            if (this._fixedTypes[transfType] && this._fixedTypes[transfType] < 2) {
                this._fixedTypes[transfType] += 1;
                this.setFixedElementRule(ele, fType);
                if (this._fixedTypes[transfType] < 2) {
                    this._count--;
                    continue;
                }
                var eleId = 'Fixed' + (this._count++);
                fixedEle = {
                    id: eleId,
                    element: fixedElements[i]
                };
                fixedEle.element.setAttribute('mipdata-fixedIdx', eleId);
                this._fixedElements.push(fixedEle);
            } else {
                ele.parentElement.removeChild(ele);
            }
        }
    };

    /**
     * Create the fixed layer of current object if it does not exsit and return it.
     * @return {Element}
     */
    FixedElement.prototype.getFixedLayer = function () {
        if (this._fixedLayer) {
            return this._fixedLayer;
        }
        this._fixedLayer = document.createElement('body');
        this._fixedLayer.className = 'mip-fixedlayer';
        var height = (this._isAndroidUc) ? '100%': 0;
        var width = (this._isAndroidUc) ? '100%': 0;
        css(this._fixedLayer, {
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'height': height,
            'width': width,
            'pointer-events': 'none',
            'overflow': 'hidden',
            'animation': 'none',
            '-webkit-animation': 'none',
            'border': 'none',
            'box-sizing': 'border-box',
            'box-shadow': 'none',
            'display': 'block',
            'float': 'none',
            'margin': 0,
            'opacity': 1,
            'outline': 'none',
            'transform': 'none',
            'transition': 'none',
            'visibility': 'visible',
            'background': 'none'
        });
        var html = document.getElementsByTagName('html')[0];
        html.appendChild(this._fixedLayer);
        return this._fixedLayer;
    };

    /**
     * Move a fixed element to the fixed layer.
     * @param {MIPElement} fixedEle
     * @param {string} idx
     */
    FixedElement.prototype.moveToFixedLayer = function (fixedEle, idx) {
        var element = fixedEle.element;
        if (element.parentElement == this._fixedLayer) {
            return;
        }
        if (!fixedEle.placeholder) {
            css(element, {
                'pointer-events': 'initial'
            });
            fixedEle.placeholder = document.createElement('mip-i-ph');
            fixedEle.placeholder.setAttribute('mipdata-fixedIdx', fixedEle.id);
            fixedEle.placeholder.style.display = 'none';
        }

        element.parentElement.replaceChild(fixedEle.placeholder, element);
        this.getFixedLayer().appendChild(element);

    };

    /**
     * Process custom elements created by user.
     */
    FixedElement.prototype.doCustomElements = function () {
        var stylesheets = document.styleSheets;
        if (!stylesheets) {
            return;
        }
        // Find the 'position: fixed' elements.
        var fixedSelectors = [];
        for (var i = 0; i < stylesheets.length; i++) {
            var stylesheet = stylesheets[i];
            if (stylesheet.disabled || !stylesheet.ownerNode || stylesheet.ownerNode.tagName != 'STYLE' || stylesheet.ownerNode.hasAttribute('mip-extension')) {
                continue;
            }
            this._findFixedSelectors(stylesheet.cssRules);
        }
    };

    /**
     * Find the selectors of 'position: fixed' elements.
     * CSSRule: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
     */
    FixedElement.prototype._findFixedSelectors = function (cssRules) {
        for (var i = 0; i < cssRules.length; i++) {
            var cssRule = cssRules[i];
            var rType = cssRule.type;
            if (rType == 1) {
                /* CSSStyleRule */
                if (cssRule.selectorText != '*' && cssRule.style.position == 'fixed') {
                    try {
                        var fixedSelector = cssRule.selectorText;
                        var elements = document.querySelectorAll(fixedSelector);
                        for (var j = 0; j < elements.length; j++) {
                            // remove ?
                            elements[j].parentElement.removeChild(elements[j]);
                        }
                    } catch(e) {
                        console.warn('Cannot find the selector of custom fixed elements');
                    }
                }
            } else if (rType == 4) {
                /* CSSMediaRule */
                this._findFixedSelectors(cssRule.cssRules);
            } else if (rType == 12) {
                /* CSSSupportsRule */
                this._findFixedSelectors(cssRule.cssRules);
            }
        }
    };

    /**
     * Set styles of a fixed element with type.
     * @param {MIPElement} fixedEle
     * @param {string} type Layout type of the fixedEle.
     */
    FixedElement.prototype.setFixedElementRule = function (fixedEle, type) {
        switch (type) {
            case "top":
            case "bottom":
                fixedEle.style.maxHeight = '90px';
                break;
            case "right":
            case "left":
                this.setStyle(fixedEle);
                fixedEle.style.maxHeight = '25%';
                fixedEle.style.maxWidth = '10%';
                break;
            case 'gototop':
                fixedEle.style.bottom = '90px';
                fixedEle.style.right = '10%';
                break;
            default:
                fixedEle.style.display = 'none';
        }
    };

    /**
     * Set styles of a fixed element.
     * @param {MIPElement} fixedEle
     */
    FixedElement.prototype.setStyle = function (fixedEle) {
        var bottom = layout.parseLength(fixedEle.getAttribute('bottom'));
        if (bottom) {
            fixedEle.style.bottom = bottom;
            return;
        }
        var top = layout.parseLength(fixedEle.getAttribute('top'));
        if (top) {
            fixedEle.style.top = top;
            return;
        }
        if (!top && !bottom) {
            fixedEle.parentElement.removeChild(fixedEle);
            // It will not be counted if the elements's type is non-standard.
            this._fixedTypes.other -= 1;
        }
    };

    /**
     * Show fixed layer
     * @param {HTMLElement} layer
     */
    FixedElement.prototype.showFixedLayer = function(layer) {
        if(layer) {
            css(layer, {
                display: 'block'
            });
        }
    };

    /**
     * Hide fixed layer
     * @param {HTMLElement} layer
     */
    FixedElement.prototype.hideFixedLayer = function(layer) {
        if(layer) {
            css(layer, {
                display: 'none'
            });
        }
    };

    return new FixedElement();
});

