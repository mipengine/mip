define(function() {
    var customElem = require('customElement').create();

    // Allowed attributes list
    var videoAttributes = ['ads', 'src', 'controls', 'loop', 'autoplay', 'autoplay', 'autobuffer', 'crossorigin', 'height', 'muted', 'preload', 'poster', 'width'];

    customElem.prototype.build = function() {
        this.attributes = getAttributeSet(this.element.attributes);
        this.videoElement = this.render();
        this.applyFillContent(this.videoElement, true);
    };

    /*
     * Render the `<video>` element, and append to `this.element`
     */
    customElem.prototype.render = function() {
        var videoEl = document.createElement('video');
        for (var k in this.attributes) {
            if (this.attributes.hasOwnProperty(k) && videoAttributes.indexOf(k) > -1) {
                videoEl.setAttribute(k, this.attributes[k]);
            }
        }
        Array.prototype.slice.apply(this.element.childNodes).forEach(function(node) {
            // FIXME: mip layout related, remove this!
            if (node.nodeName.toLowerCase() === 'mip-i-space') return; 
            videoEl.appendChild(node);
        });
        this.element.appendChild(videoEl);
        return videoEl;
    };

    /*
     * Get attribute Set from attribute List
     * @param {NamedNodeMap} attributes the attribute list, spec: https://dom.spec.whatwg.org/#interface-namednodemap
     * @return {Object} the attribute set, legacy:
     * @example 
     * {
     *     "src": "http://xx.mp4",
     *     "autoplay": "",
     *     "width": "720"
     * }
     */
    function getAttributeSet(attributes) {
        var attrs = {};
        Array.prototype.slice.apply(attributes).forEach(function(attr) {
            attrs[attr.name] = attr.value;
        });
        return attrs;
    }

    return customElem;
});
