/**
 * @file 复制
 * @author junmer
 * @see https://clipboardjs.com/
 */


define(function() {

    var isBaidubox = /baiduboxapp/.test(navigator.userAgent);

    /**
     * CLICK_EVENT
     * 也许手机需要 touchend
     *
     * @type {String}
     */
    var CLICK_EVENT = isBaidubox ? 'touchstart' : 'click';

    /**
     * Clipboard
     *
     * @class 复制
     *
     * @param {Object} opt
     * @param {string} opt.text
     * @param {Function} opt.sucess
     * @param {Function} opt.error
     */
    function Clipboard(opt) {

        $.extend(this, opt);

        this.bind();
    }

    Clipboard.prototype = {

        bind: function() {
            $(this.el).on('click', this.handler.bind(this));
        },

        update: function(data) {
            this.text = data;
        },

        unbind: function() {
            $(this.el).off('click', this.handler);
            this.removeFake();
        },

        handler: function() {
            this.selectFake(this.text);
        },

        /**
         * Only removes the fake element after another click event, that way
         * a user can hit `Ctrl+C` to copy because selection still exists.
         */
        removeFake: function() {
            if (this.fakeHandler) {
                document.body.removeEventListener(CLICK_EVENT);
                this.fakeHandler = null;
            }

            if (this.fakeElem) {
                document.body.removeChild(this.fakeElem);
                this.fakeElem = null;
            }

        },

        /**
         * Executes the copy operation based on the current selection.
         */
        copyText: function() {

            var succeeded;
            try {
                succeeded = document.execCommand('copy');
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        },

        handleResult: function(succeeded) {
            if (succeeded) {
                this.success && this.success();
            } else {
                this.error && this.error();
            }
        },

        selectFake: function(text) {
            var isRTL = document.documentElement.getAttribute('dir') === 'rtl';

            this.removeFake();

            this.fakeHandler = document.body.addEventListener(CLICK_EVENT, this.removeFake.bind(this));

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'fixed';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = text;

            document.body.appendChild(this.fakeElem);

            this.selectedText = select(this.fakeElem);

            this.copyText();
        }
    };

    function select(element) {
        var selectedText;

        if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            element.focus();
            element.setSelectionRange(0, element.value.length);

            selectedText = element.value;
        } else {
            if (element.hasAttribute('contenteditable')) {
                element.focus();
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);

            selectedText = selection.toString();
        }

        return selectedText;
    }

    return Clipboard;

});
