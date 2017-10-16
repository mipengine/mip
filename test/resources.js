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

    // Mock Object assign
    var mockElement2 = {};
    for (var key in mockElement1) {
        if (mockElement1.hasOwnProperty(key)) {
            mockElement2[key] = mockElement1[key];
        }
    }
    mockElement2.prerenderAllowed = function () {
        return false;
    }

    var Resources = require('resources');

    var resources1 = new Resources();
    var resources2 = new Resources();

    resources1.add(mockElement1);
    resources2.add(mockElement2);

    setTimeout(function () {
        resources1._viewport.trigger('changed');
    }, 20);


    describe('resources', function () {
        it('getResources & getResourcesList', function () {
            expect(resources1.getResources()[mockElement1._eid]).to.equal(mockElement1);
            expect(resources1.getResourcesList().length).to.at.least(1);
        });

        it('setInViewport and update', function () {
            expect(mockElement1.inViewport()).to.be.true;
        });

        it('prerenderElement', function () {
            var isFalse = mockElement2.inViewport() === false;
            Resources.prerenderElement(mockElement2);

            expect(isFalse).to.be.true;
            expect(mockElement2.inViewport()).to.be.true;

            expect(Resources.prerenderElement.bind(Resources, {})).to.not.throw(Error);
        });

        it('remove', function () {
            expect(resources2.remove(document.body)).to.be.false;
        });

        it('changed', function (done) {
            setTimeout(function () {
                if (mockElement1.testCount < 2) {
                    done('changed error');
                    return;
                }
                done();
            }, 30);
        })
    });

});
