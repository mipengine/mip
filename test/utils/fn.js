define(function (require) {
    'use strict';

    var fn = require('utils/fn');

    describe('fn', function () {
        it('extend', function () {
            var target = {
                test: 1
            };
            fn.extend(target, {
                test: 2
            });

            var source = {
                testProperty: {
                    value: 'source'
                },
                arr: [1, 2]
            };

            fn.extend(true, target, source);
            target.testProperty.value = 'target';
            target.arr.push(3);

            expect(target.test).to.equal(2);
            expect(source.testProperty.value).to.equal('source');
            expect(source.arr).to.eql([1, 2]);
        });

        it('values', function () {
            expect(fn.values({a: 1, b: 2})).to.eql([1, 2]);
        });

        it('throttle', function (done) {
            var count = 0;
            var exec = function () {
                count ++;
            };
            var throttledExec = fn.throttle(exec, 20);
            var interval = setInterval(throttledExec, 1);
            setTimeout(function () {
                clearInterval(interval);
                done(count > 5 ? 'throttle error' : null);
            }, 100);
        });

        it('isPlainObject', function () {
            expect(fn.isPlainObject({})).to.be.true;
            expect(fn.isPlainObject(Object.create({}))).to.be.false;
        });

        it('pick', function () {
            var obj = {
                a: '1',
                b: '2',
                c: '3',
                d: '4'
            };

            expect(fn.pick(obj, ['a', 'c'])).to.eql({
                a: '1',
                c: '3'
            });
            expect(fn.pick(obj, 'b', 'd')).to.eql({
                b: '2',
                d: '4'
            });
        });

        it('isString', function () {
            expect(fn.isString()).to.be.false;
            expect(fn.isString('test')).to.be.true;
        });

        it('del', function () {
            expect(fn.del(null, 'key')).to.be.equal(undefined);
            var obj = {
                a: 1,
                b: 2
            };
            fn.del(obj, 'a');
            expect(obj.a).to.be.equal(undefined);
            try {
                fn.del(Object, 'prototype');
            } catch(e) {}
        });
    });
});
