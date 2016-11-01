/**
 * @file For viewport
 */
define(function (require) {
    'use strict';
    var viewport = require('viewport');
    viewport.on('scroll', function () {
        this.scrolled = true;
    });
    viewport.on('changed', function () {
        this.changed = true;
    });
    viewport.on('resize', function () {
        this.resized = true;
    });

    describe('viewport', function () {
        // Getter and setter of scrollTop.
        it('scrollTop', function () {
            var element = document.createElement('div');
            element.style.cssText= 'height: 10000px;';
            document.body.appendChild(element);
            viewport.setScrollTop(1000);
            expect(viewport.getScrollTop()).to.equal(1000);
        });

        // Rect
        it('getRect', function () {
            var rect = viewport.getRect();
            var width = window.innerWidth || document.documentElement.clientWidth;
            var height = window.innerHeight || document.documentElement.clientHeight;
            expect(width).to.above(0);
            expect(height).to.above(0);
            expect(width).to.equal(rect.width);
            expect(height).to.equal(rect.height);
            expect(rect.left).to.equal(0);
        });

        it('scroll width & height', function () {
            expect(viewport.getScrollWidth()).to.equal(window.innerWidth || document.documentElement.clientWidth);
            expect(viewport.getScrollHeight()).to.be.at.least(10000);
        });

        // Events
        it('scroll&changed&resized', function (done) {
            window.dispatchEvent(new Event('resize'));
            viewport.setScrollTop(1001);
            setTimeout(function () {
                viewport.setScrollTop(1002);
            }, 25)
            setTimeout(function () {
                done(viewport.scrolled && viewport.changed && viewport.resized ? null : 'viewport events check failed');
            }, 30);
        });

    });

});
