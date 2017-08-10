define(function(require) {
    'use strict';

    var fn = require('utils/fn');

    describe('fn', function() {
        it('extend', function() {
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

        it('values', function() {
            expect(fn.values({ a: 1, b: 2 })).to.eql([1, 2]);
        });

        it('throttle', function(done) {
            var count = 0;
            var exec = function() {
                count++;
            };
            var throttledExec = fn.throttle(exec, 20);
            var interval = setInterval(throttledExec, 1);
            setTimeout(function() {
                clearInterval(interval);
                done(count > 5 ? 'throttle error' : null);
            }, 100);
        });

        it('isPlainObject', function() {
            expect(fn.isPlainObject({})).to.be.true;
            expect(fn.isPlainObject(Object.create({}))).to.be.false;
        });

        it('pick', function() {
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

        it('isString', function() {
            expect(fn.isString()).to.be.false;
            expect(fn.isString('test')).to.be.true;
        });

        it('del', function() {
            expect(fn.del(null, 'key')).to.be.equal(undefined);
            var obj = {
                a: 1,
                b: 2
            };
            fn.del(obj, 'a');
            expect(obj.a).to.be.equal(undefined);
            try {
                fn.del(Object, 'prototype');
            } catch (e) {}
        });

        it('heightAni', function(done) {
            var dom = document.createElement('div');
            dom.innerHTML = "<h1 style='height:50px;margin:0;padding:0'>bb</h1>" + "<h1 style='height:50px;margin:0;padding:0'>bb</h1>" + "<h1 style='height:50px;margin:0;padding:0'>bb</h1>";
            document.body.appendChild(dom);
            var fullHeight = getComputedStyle(dom).height;

            var p1 = function() {
                return new Promise(function(resolve, reject) {
                    fn.heightAni({
                        ele: dom,
                        type: 'fold',
                        tarHeight: '20px',
                        transitionTime: 0.1,
                        cbFun: function() {
                            dom.style.backgroundColor = 'rgb(0, 0, 123)';
                            resolve();
                        }
                    });
                })
            };
            var p2 = function() {
                return new Promise(function(resolve, reject) {
                    fn.heightAni({
                        ele: dom,
                        type: 'unfold',
                        transitionTime: 0.1,
                        cbFun: function() {
                            dom.style.backgroundColor = 'rgb(0, 123, 0)';
                            resolve();
                        }
                    });
                })
            };
            var p3 = function() {
                return new Promise(function(resolve, reject) {
                    fn.heightAni({
                        ele: dom,
                        type: 'fold',
                        transitionTime: 0.1,
                        cbFun: function() {
                            dom.style.backgroundColor = 'rgb(123, 0, 0)';
                            resolve();
                        }
                    });
                })
            };
            var p4 = function() {
                return new Promise(function(resolve, reject) {
                    fn.heightAni({
                        ele: dom,
                        type: 'unfold',
                        transitionTime: 0.1,
                        cbFun: function() {
                            dom.style.backgroundColor = 'rgb(123, 123, 0)';
                            resolve();
                        }
                    });
                })
            };
            p1().then(function() {
                var heightNum = getComputedStyle(dom).height.replace('px', '') - 0;
                expect(heightNum - 20, 'heightAni.p1 执行fail').to.be.at.most(5);
                expect(getComputedStyle(dom).backgroundColor,'heightAni.p1 执行fail').to.be.equal('rgb(0, 0, 123)');
                return p2();
            }).then(function() {
                var heightNum = getComputedStyle(dom).height.replace('px', '') - 0;
                expect(heightNum - 150, 'heightAni.p2 执行fail').to.be.at.most(5);
                expect(getComputedStyle(dom).backgroundColor,'heightAni.p2 执行fail').to.be.equal('rgb(0, 123, 0)');
                return p3();
            }).then(function() {
                var heightNum = getComputedStyle(dom).height.replace('px', '') - 0;
                expect(heightNum - 0, 'heightAni.p3 执行fail').to.be.at.most(5);
                expect(getComputedStyle(dom).backgroundColor, 'heightAni.p3 执行fail').to.be.equal('rgb(123, 0, 0)');
                return p4();
            }).then(function() {
                var heightNum = getComputedStyle(dom).height.replace('px', '') - 0;
                expect(heightNum - 150, 'heightAni.p4 执行fail').to.be.at.most(5);
                expect(getComputedStyle(dom).backgroundColor, 'heightAni.p4 执行fail').to.be.equal('rgb(123, 123, 0)');
                done();
            }).catch(done);

        });
    });
});