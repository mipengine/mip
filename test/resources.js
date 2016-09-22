/**
 * @file resources tester
 */
define(function () {
    'use strict';
    var mockElement1 = {
        testCount: 0,
        prerenderAllowed: function () {
            this.testCount++;
            return true;
        },
        getBoundingClientRect: function () {
            return {
                left: 0,
                top: -1,
                width: 0,
                height: 0
            }
        },
        inViewport: function () {
            return this.flag;
        },
        viewportCallback: function (flag) {
            this.flag = flag;
        },
        build: function () {
            this.built = true;
        },
        firstInviewCallback: function () {

        }
    }
    var mockElement2 = Object.assign({}, mockElement1, {
        prerenderAllowed: function () {
            return false;
        }
    });
    var Resources = require('src/resources');

    var resources1 = new Resources();
    var resources2 = new Resources();

    resources1.add(mockElement1);
    resources2.add(mockElement2);

    setTimeout(function () {
        resources1._viewport.trigger('changed');
    }, 20);


    describe('resources', function () {
        it('getResources & getResourcesList', function () {
            expect(
                resources1.getResources()[mockElement1._eid] === mockElement1 &&
                resources1.getResourcesList().length === 1).to.equal(true)
        });

        it('setInViewport and update', function () {
            expect(mockElement1.inViewport()).to.equal(true);
        });

        it('prerenderElement', function () {
            var isFalse = mockElement2.inViewport() === false;
            Resources.prerenderElement(mockElement2);
            expect(mockElement2.inViewport() === true && isFalse === true).to.equal(true);
        });

        it('remove', function () {
            expect(resources2.remove(document.body)).to.equal(false);
        });

        it('changed', function (done) {
            setTimeout(function () {
                if (mockElement1.testCount !== 2) {
                    done('changed error');
                    return;
                }
                done();
            }, 30);
        })
    });

});
