define(['components/dom', 'components/css'], function (dom, css) {
    var customElem = require('customElement').create();

    var property = ['allowfullscreen', 'allowtransparency', 'sandbox'];
    customElem.prototype.build = function () {
        var element = this.element;
        var src;
        var srcdoc = element.getAttribute('srcdoc');
        if (srcdoc) {
            src = 'data:text/html;charset=utf-8;base64,' + window.btoa(srcdoc);
        } else {
            src = element.getAttribute('src');
        }

        var height = element.getAttribute('height');
        var width = element.getAttribute('width') || '100%';

        if (!src || !width || !height) {
            return;
        }

        if (element.getAttribute('allowfullscreen') === '') {
            var allowfullscreen = '';
        }
        if (element.getAttribute('allowtransparency') === 'true') {
            var allowtransparency = 'true';
        }

        var iframe = document.createElement('iframe');
        css(iframe, {
            width: width,
            height: height
        });
        this.expendAttr(property, iframe);
        iframe.setAttribute('frameBorder', '0');
        iframe.setAttribute('scrolling', 'no');
        iframe.src = src;

        element.appendChild(iframe);
    };

    return customElem;
});
