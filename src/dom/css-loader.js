define(function() {
    /**
     * Creates the properly configured style element.
     * @param {Document} doc
     * @param {Element|ShadowRoot} cssRoot
     * @param {string} cssText
     * @param {boolean} isRuntimeCss
     * @param {string} name
     * @return {Element}
    */
    function insertStyleElement(doc, cssRoot, cssText, name, isRuntimeCss) {
        var style = doc.createElement('style');
        style.textContent = cssText;
        var afterElement = null;
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
     * Insert the styleElement in the root element after a element or at the start.
     */
    function insertAfterOrAtStart(styleRoot, styleElement, afterElement) {
        if (afterElement) {
            if (afterElement.nextSibling) {
                styleRoot.insertBefore(styleElement, afterElement.nextSibling);
            } else {
                styleRoot.appendChild(styleElement);
            }
        } else {
            // Add to the styleRoot element as first child
            styleRoot.insertBefore(styleElement, styleRoot.firstChild);
        }
    }
    return {
        insertStyleElement: insertStyleElement
    }
});