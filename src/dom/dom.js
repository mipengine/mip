define(function (require) {
    'use strict';

    /**
     * Save documentElement.
     * @inner
     * @type {Object}
     */    
    var docElem = document.documentElement;

    /**
     * Get the supported matches method.
     * @inner
     * @type {Function}
     */
    var nativeMatches = docElem.matches
            || docElem.webkitMatchesSelector
            || docElem.mozMatchesSelector
            || docElem.oMatchesSelector
            || docElem.msMatchesSelector
            || docElem.matchesSelector;

    /**
     * Support for matches. Check whether a element matches a selector.
     * @param {HTMLElement} element
     * @param {string} selector
     * @return {boolean}
     */
    function matches(element, selector) {
        if (!element || element.nodeType != 1) {
            return false;
        }
        return nativeMatches.call(element, selector);
    }

    /**
     * Support for closest. Find the closest parent node that matches the selector.
     * @param {HTMLElement} element
     * @param {string} selector
     * @return {?HTMLElement}
     */
    var closest = docElem.closest
            ? function (element, selector) {
                return element.closest(selector);
            }
            : function (element, selector) {
                while (element) {
                    if (matches(element, selector)) {
                        return element;
                    }
                    element = element.parentNode;
                };
                return null;
            };

    /**
     * Support for contains.
     * @param {HTMLElement} element
     * @param {HTMLElement} child
     * @return {boolean}
     */
    var contains = docElem.contains
            ? function (element, child) {
                return element && element.contains(child);
            }
            : function (element, child) {
                while (child) {
                    if (element === child) {
                        return true;
                    }
                    child = child.parentElement;
                };
                return false;
            };

    /**
     * Find the nearest element that matches the selector from current element to target element.
     * @param {HTMLElement} element
     * @param {string} selector
     * @param {HTMLElement} target
     * @return {?HTMLElement}
     */
    function closestTo(element, selector, target) {
        var closestElement = closest(element, selector);
        return contains(target, closestElement) ? closestElement : null;
    }

    /**
     * Temp element for creating element by string.
     * @inner
     * @type {HTMLElement}
     */
    var createTmpElement = document.createElement('div');

    /**
     * Create a element by string
     * @param {string} str Html string
     * @return {HTMLElement}
     */
    function create(str) {
        createTmpElement.innerHTML = str;
        if (!createTmpElement.children.length) {
            return null;
        }
        var children = Array.prototype.slice.call(createTmpElement.children);
        createTmpElement.innerHTML = '';
        return children.length > 1 ? children : children[0]; 
    }

    /**
     * Waits until the dom is ready. Then the
     * callback is executed.
     * @param {!Element} dom
     * @param {function()} callback
     */
    function waitDomReady(dom, cb) {
        if (!!document.body) {
            cb();
            return;
        }
        var domWin = dom.ownerDocument.defaultView;
        // if MutationObserver is available, use this path
        if (domWin.MutationObserver) {
            var mutationObserver = new win.MutationObserver(function () {
                if (!!document.body) {
                  mutationObserver.disconnect();
                  cb();
                }
            });
            mutationObserver.observe(dom, {childList: true});
          } else {
            // if MutationObserver is not available, use polyfill
            var interval = domWin.setInterval(function () {
              if (!!document.body) {
                domWin.clearInterval(interval);
                cb();
              }
            }, 5);
          }
    }


    return {
        closest: closest,
        closestTo: closestTo,
        matches: matches,
        contains: contains,
        create: create,
        waitDomReady, waitDomReady
    }
});
