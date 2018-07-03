define(function (require) {
    var customElem = require('customElement').create();
    var util = require('util');

    var attrList = ['allowfullscreen', 'allowtransparency', 'sandbox', 'scrolling'];
    customElem.prototype.build = function () {
        var element = this.element;
        var src = element.getAttribute('src');
        var srcdoc = element.getAttribute('srcdoc');
        if (srcdoc) {
            src = 'data:text/html;charset=utf-8;base64,' + window.btoa(srcdoc);
        }

        var height = element.getAttribute('height');
        var width = element.getAttribute('width') || '100%';

        if (!src || !height) {
            return;
        }

        var iframe = document.createElement('iframe');
        iframe.frameBorder = '0';
        iframe.scrolling = 'no';
        util.css(iframe, {
            width: width,
            height: height
        });

        this.applyFillContent(iframe);
        iframe.src = src;

        this.expendAttr(attrList, iframe);
        element.appendChild(iframe);
    };

    return customElem;
});
