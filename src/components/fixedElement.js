define(['platform', 'layout', 'css'], function(platform, layout, css){
	function fixedElement(){

      /** @private {number} */
      this._paddingTop = 0;

      /** @private @const {boolean} */
      //this._transfer = transfer;

      /** @private {?Element} */
      this._fixedLayer = null;

      /** @private {number} */
      this._count = 0;

      /** @private {Object} */
      this._fixedTypes = {
        'top': 1,
        'bottom': 1,
        'other': 1
      };

      this.isAndroidUc = platform.isUc() && !platform.isIos();

      /** @private {!Array<!FixedElement>} */
      this._fixedElements = [];
  }
  /**
   * fixedElement初始化
   */
  fixedElement.prototype.init = function() {
      var mipFixedElements = document.querySelectorAll('mip-fixed');
      this.setFixedElement(mipFixedElements);
      var fixedLen = this._fixedElements.length;
      var hasParentPage = window.parent !== window;
      if ((platform.isIos()) && fixedLen > 0 && hasParentPage) {
        var fixedLayer = this.getFixedLayer();
        
        for (var i = 0; i < fixedLen; i++) {
          this.moveToFixedLayer(this._fixedElements[i], i);
        }
      }
      if (hasParentPage) {
        this.doUserDefDoms();
      }
  };
  
  /**
   * 处理 fixed 元素
   */
  fixedElement.prototype.setFixedElement = function(fixedElements) {
      var fixedEle = {};
      var fixedTypeCount = {};
      for (var i = 0; i < fixedElements.length; i++) {
        var ele = fixedElements[i];
        /* android uc 下直接变成 absolute */
        if (this.isAndroidUc) {
          css(ele, {
            position: 'absolute'
          });
        }
        var fType = ele.getAttribute('type');
        var transfType = (fType == 'right' || fType == 'left') ? 'other' : fType; 
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
   * @return {?Element}
   */
  fixedElement.prototype.getFixedLayer = function() {
    if (this._fixedLayer) {
      return this._fixedLayer;
    }
    this._fixedLayer = document.createElement('body');
    this._fixedLayer.className = 'mip-fixedlayer';
    var height = (this.isAndroidUc) ? '100%' : 0;
    var width = (this.isAndroidUc) ? '100%' : 0;
    css(this._fixedLayer, {
        position: 'absolute',
        top: 0,
        left: 0,
        height: height,
        width: width, 
        'pointer-events': 'none',
        overflow: 'hidden', 
        animation: 'none',
        '-webkit-animation': 'none',
        border: 'none',
        'box-sizing': 'border-box',
        'box-shadow': 'none',
        display: 'block', 
        float: 'none',
        margin: 0,
        opacity: 1, 
        outline: 'none', 
        transform: 'none', 
        transition: 'none',
        visibility: 'visible',
        background: 'none'
    });
    var html = document.getElementsByTagName('html')[0];
    html.appendChild(this._fixedLayer);
    return this._fixedLayer;
  };

  /**
   * 将 mip-fixed 移到 fixed-layer
   */
  fixedElement.prototype.moveToFixedLayer = function(fixedEle, idx) {
    var element = fixedEle.element;
    if (element.parentElement == this._fixedLayer) {
      return;
    }
    if (!fixedEle.placeholder) {
      css(element, {
        'pointer-events':'initial'
      });
      fixedEle.placeholder = document.createElement('mip-i-ph');
      fixedEle.placeholder.setAttribute('mipdata-fixedIdx', fixedEle.id);
      fixedEle.placeholder.style.display = 'none';
    }

    // Calculate z-index based on the declared z-index and DOM position.
    element.style.zIndex = 10000 - idx;

    element.parentElement.replaceChild(fixedEle.placeholder, element);
    this.getFixedLayer().appendChild(element);

  };

  /**
   * 处理用户自定义的 fixed 元素
   */
  fixedElement.prototype.doUserDefDoms = function() {
      var stylesheets = document.styleSheets;
      if (!stylesheets) {
        return;
      }
      // 找到所有的自定义 `position:fixed` 的元素。
      var fixedSelectors = [];
      for (var i = 0; i < stylesheets.length; i++) {
        var stylesheet = stylesheets[i];
        if (stylesheet.disabled ||
              !stylesheet.ownerNode ||
              stylesheet.ownerNode.tagName != 'STYLE' ||
              stylesheet.ownerNode.hasAttribute('mip-extension')) {
          continue;
        }
        this._findFixedSelectors(stylesheet.cssRules);
      }
  };
  /**
   *  找到所有是 fixed 定位的 selector
   *  CSSRule 参照 https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
   */
  fixedElement.prototype._findFixedSelectors = function (cssRules) {
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
          } catch (e) {
            // todo send error log
          }
        }
      } else if (rType == 4) {
        /* CSSMediaRule */
        this._findFixedSelectors(cssRule.cssRules, foundSelectors);
      } else if (rType == 12) {
        /* CSSSupportsRule */
        this._findFixedSelectors(cssRule.cssRules, foundSelectors);
      }
    }
  };

  /**
   * 处理 fixed 元素
   */
  fixedElement.prototype.setFixedElementRule = function(fixedEle, type) {
      /* mip fixed 规则限制 start */
      switch (type) {
          case "top":
              fixedEle.style.maxHeight = '88px';
              break;
          case "bottom":
              fixedEle.style.maxHeight = '88px';
              break;
          case "right":
              this.setStyle(fixedEle);
              fixedEle.style.maxHeight = '25%';
              fixedEle.style.maxWidth = '10%';
              break;
          case "left":
              this.setStyle(fixedEle);
              fixedEle.style.maxHeight = '25%';
              fixedEle.style.maxWidth = '10%';
              break;
          default:
              fixedEle.style.display = 'none';
      }
      /* mip fixed 规则限制 end */
  };
  fixedElement.prototype.setStyle = function(ele) {
    var top = layout.parseLength(ele.getAttribute('top'));
    if (top) {
      ele.style.top = top;
    }
    var bottom = layout.parseLength(ele.getAttribute('bottom'));
    if (bottom) {
      ele.style.bottom = bottom;
    }
    if (!top && !bottom) {
      ele.parentElement.removeChild(ele);
      /* 不规范的 mip-fixed不计数 */
      this._fixedTypes.other -= 1;
    }
  };

  return new fixedElement();
});
