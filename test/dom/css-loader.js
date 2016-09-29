/**
 * @file For css-loader
 */
define(function (require) {
    'use strict';
    
    var cssLoader = require('src/dom/css-loader');
    var util = require('src/util');
    var create = util.dom.create;

    var cssTest = '#test{margin:0; padding:0; opacity: 0.5}';
    var cssRuntime = '';

    var element = document.createElement('div');
    element.id = 'test';
    document.body.appendChild(element);

    describe('css-loader', function () {
        it('insert', function () {
            // Add runtime style element
            var runtimeStyle = cssLoader.insertStyleElement(document, document.head, cssRuntime, '', true);
            // Add test style element
            var testStyle = cssLoader.insertStyleElement(document, document.head, cssTest, 'mip-test');

            expect(document.defaultView.getComputedStyle(element).opacity).to.equal('0.5');
            expect(runtimeStyle.nextSibling).to.equal(testStyle);

            document.head.removeChild(runtimeStyle);
            document.head.removeChild(testStyle);

            // For testing insert location
            runtimeStyle = cssLoader.insertStyleElement(document, document.head, cssRuntime, '', true);
            document.head.appendChild(runtimeStyle);
            testStyle = cssLoader.insertStyleElement(document, document.head, cssTest, 'mip-test');

            expect(document.head.lastChild).to.equal(testStyle);

            document.head.removeChild(runtimeStyle);
            document.head.removeChild(testStyle);
        });
    });

});