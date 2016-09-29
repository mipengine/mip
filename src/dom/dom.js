define(function () {
    var docElem = document.documentElement;
    var nativeMatches = docElem.matches ||
                docElem.webkitMatchesSelector ||
                docElem.mozMatchesSelector ||
                docElem.oMatchesSelector ||
                docElem.msMatchesSelector ||
                docElem.matchesSelector;
    function matches(element, selector) {
        if (!element || element.nodeType != 1) {
            return false;
        }
        return nativeMatches.call(element, selector);
    };

    // Support for closest
    var closest = docElem.closest ? 
        function (element, selector) {
            return element.closest(selector);
        } :
        function (element, selector) {
            while (element) {
                if (matches(element, selector)) {
                    return element;
                }
                element = element.parentNode;
            };
            return null;
        };

    // Support for contains
    var contains = docElem.contains ?
        function (element, child) {
            return element && element.contains(child);
        } :
        function (element, child) {
            while (child) {
                if (element === child) {
                    return true;
                }
                child = child.parentElement;
            };
            return false;
        };

    /**
     * Find a element by selector until the target element
     * @param {HTMLElement} element
     * @param {string} selector
     * @param {HTMLElement} target
     * @return {?HTMLElement}
     */
    function closestTo(element, selector, target) {
        var closestElement = closest(element, selector);
        return contains(target, closestElement) ? closestElement : null;
    };

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
    };


    return {
        closest: closest,
        closestTo: closestTo,
        matches: matches,
        contains: contains,
        create: create
    }
});
