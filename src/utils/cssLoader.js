define(function() {
  /**
   * Creates the properly configured style element.
   * @param {!Document} doc
   * @param {!Element|!ShadowRoot} cssRoot
   * @param {string} cssText
   * @param {boolean} isRuntimeCss
   * @param {?string} name
   * @return {!Element}
   */
  function insertStyleElement(doc, cssRoot, cssText, name, isRuntimeCss) {
    var style = doc.createElement('style');
    style.textContent = cssText;
    var afterElement = null;
    // 先加载mip-main css
    if (isRuntimeCss) {
      style.setAttribute('mip-main', '');
    } else {
      style.setAttribute('mip-extension', name || '');
      afterElement = cssRoot.querySelector('style[mip-main]');
    }
    insertAfterOrAtStart(cssRoot, style, afterElement);
    return style;
  }

  /**
   * 将标签插入自定义的css标签的后面后者放到styleRoot的第一个标签之前
   * @param styleRoot style标签插入的根节点
   * @param styleElement 要插入的style标签
   * @param afterElement 自定义的css标签，可能为空
   */
  function insertAfterOrAtStart(styleRoot, styleElement, afterElement) {
    if (afterElement) {
      if (afterElement.nextSibling) {
        styleRoot.insertBefore(styleElement, afterElement.nextSibling);
      } else {
        styleRoot.appendChild(styleElement);
      }
    } else {
      // 加入到最开始
      styleRoot.insertBefore(styleElement, styleRoot.firstChild);
    }
  }
  return {
    insertStyleElement : insertStyleElement
  }
});
