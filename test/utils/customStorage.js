define(function(require) {
    'use strict';

    require('fetch');
    var util = require('util');
    var platform = util.platform;
    var CustomStorage = require('utils/customStorage');
    var fn = require('utils/fn');
    var LocalStorage = new CustomStorage(0);
    var AsyncStorage = new CustomStorage(1);
    var CookieStorage = new CustomStorage(2);
    var name = 'name';
    var nameValue = 'testName';
    var expireName = 'expireName';
    var expireNameValue = 'expireTestName';
    var age = 'age';
    var ageValue = '22';
    var expire = 1;
    var $ = require('zepto');
    var exceedName = 'exceedName';
    var exceedNameValue;
    for (var i = 0; i < 1024 * 1024 * 5; i++) {
        exceedNameValue += 'a';
    };

    var cacheStub;

    // describe('customStorage', function() {
    describe('localstorage', function() {
        beforeEach(function() {
            cacheStub = sinon.stub(LocalStorage, '_isCachePage', function() {
                return true;
            });
        });

        afterEach(function() {
            cacheStub.restore();
        });

        it('set', function() {
            // Check boundary condition
            LocalStorage.set(null, null);

            LocalStorage.set(name, nameValue);
            LocalStorage.set(age, ageValue, expire);
            expect(LocalStorage.get(name)).to.be.equal(nameValue);
        });

        it('get', function() {
            // Check boundary condition
            LocalStorage.get(null);

            expect(LocalStorage.get(name)).to.be.equal(nameValue);
        });

        it('rm', function() {
            // Check boundary condition
            LocalStorage.rm(null);

            LocalStorage.set(name, nameValue);
            LocalStorage.rm(name);
            expect(!!LocalStorage.get(name)).to.be.false;
        });

        it.skip('rmExpires', function(done) {
            LocalStorage.set(expireName, expireNameValue, 1);
            setTimeout(function() {
                LocalStorage.rmExpires();
                expect(!!LocalStorage.get(expireName)).to.be.false;
                done();
            }, 50);
        });

        it('clear', function() {
            LocalStorage.clear();
            expect(!!LocalStorage.get(name)).to.be.false;
            expect(!!LocalStorage.get(age)).to.be.false;
        });

        it('exceed', function(done) {
            if (LocalStorage._supportLs()) {
                try {
                    localStorage.setItem(name, nameValue, 20000);
                    localStorage.setItem(age, ageValue, 20000);
                    localStorage.setItem('test', 'test');
                    LocalStorage._setLocalStorage(exceedName, exceedNameValue, function(data) {});
                    !!LocalStorage.get(exceedName);
                } catch (e) {
                    done();
                }
            } else {
                done();
            }
        });

        it('coverBranch', function() {
            var stub = sinon.stub(LocalStorage, '_supportLs', function() {
                return false;
            });
            LocalStorage._getLocalStorage();
            LocalStorage._rmLocalStorage(name);
            LocalStorage.rmExpires();
            LocalStorage._isExceed({
                name: 'NS_ERROR_DOM_QUOTA_REACHED',
                code: 1014
            });
            LocalStorage._isExceed({
                number: -2147024882
            });
            stub.restore();
        });
    });

    describe('localstorage-nocache', function() {
        beforeEach(function() {
            cacheStub = sinon.stub(LocalStorage, '_isCachePage', function() {
                return false;
            });
        });

        afterEach(function() {
            cacheStub.restore();
        });

        it('noSupportLs', function() {
            var stub = sinon.stub(LocalStorage, '_supportLs', function() {
                return false;
            });
            LocalStorage.set(name, nameValue);
            LocalStorage.set(age, ageValue);
            expect(!!LocalStorage.get(name)).to.be.true;
            LocalStorage.rm(name);
            expect(!!LocalStorage.get(name)).to.be.false;
            LocalStorage.clear();
            expect(!!LocalStorage.get(age)).to.be.false;
            try {
                LocalStorage.set(exceedName, exceedNameValue, function() {});
                expect(!!LocalStorage.get(exceedName)).to.be.false;
            } catch (e) {}
            stub.restore();
        });

        it('supportLs', function() {
            var stub = sinon.stub(LocalStorage, '_supportLs', function() {
                return true;
            });
            LocalStorage.set(name, nameValue);
            LocalStorage.set(age, ageValue);
            expect(!!LocalStorage.get(name)).to.be.true;
            LocalStorage.rm(name);
            expect(!!LocalStorage.get(name)).to.be.false;
            LocalStorage.clear();
            expect(!!LocalStorage.get(age)).to.be.false;
            try {
                LocalStorage.set(exceedName, exceedNameValue, function() {});
                expect(!!LocalStorage.get(exceedName)).to.be.false;
            } catch (e) {}
            stub.restore();
        });
    });

    describe('localstorage-isCachePage', function() {
        it('isCachePage', function() {
            expect(LocalStorage._isCachePage()).to.be.false;
        });
    });

    describe('asyncstorage', function() {
        it('request1', function(done) {
            // Check boundary condition
            AsyncStorage.request();

            var server = sinon.fakeServer.create();
            server.respondWith("POST", "/req1", [200, {
                "Content-Type": "application/json",
                "Access-Control-Allow-origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
            }, '{ok:1}']);
            AsyncStorage.request({
                url: '/req1',
                method: 'POST',
                body: 'content',
                headers: {
                    'Access-Control-Request-Headers': 'X-PINGOTHER',
                },
                success: function(data) {
                    done();
                },
                error: function(err) {
                    done();
                }
            });
            setTimeout(function() {
                server.respond();
            }, 100);
        });
        it('request2', function(done) {
            AsyncStorage.request({
                url: 'http://localhost:3000/req2',
                mode: 'cors',
                credentials: 'omit',
                cache: 'default',
                success: function(data) {
                    done();
                },
                error: function(err) {
                    done();
                }
            });
            setTimeout(function() {
                done();
            }, 200);
        });
        it('request3', function(done) {
            var server = sinon.fakeServer.create();
            server.respondWith("POST", "/req3", [200, {
                "Content-Type": "application/json"
            }, '{}']);
            AsyncStorage.request({
                url: '/req3',
                method: 'POST',
                success: function(data) {
                    done();
                },
                error: function(err) {
                    done();
                }
            });
            setTimeout(function() {
                server.respond();
            }, 300);
        });
    });

    // 先针对谷歌浏览器测试，后续需要优化方法
    if (platform.isChrome() && !platform.isIos()) {
        describe('asyncstorage', function() {
            it('delExceedCookie', function() {
                var exceedNameValue = '';
                for (var i = 0; i < 1024 * 3; i++) {
                    exceedNameValue += 'a';
                };
                document.cookie = 'test1=' + exceedNameValue + ';path=/;domain=' + window.location.hostname;
                CookieStorage.delExceedCookie();
                document.cookie = 'test2=' + exceedNameValue + ';path=/;domain=' + window.location.hostname;
                document.cookie = 'test3=' + exceedNameValue + ';path=/;domain=' + window.location.hostname;
                document.cookie = 'test4=' + exceedNameValue + ';path=/;domain=' + window.location.hostname;
                document.cookie = 'test5=' + exceedNameValue + ';path=/;domain=' + window.location.hostname;
                document.cookie = 'test6=' + exceedNameValue + ';path=/;domain=' + window.location.hostname;
                CookieStorage.delExceedCookie();
                expect(document.cookie.length / 1024).to.be.below(3);
            });

            it('not isIframed', function() {
                var stub = sinon.stub(CookieStorage, '_notIframed', function() {
                    return true;
                });
                CookieStorage.delExceedCookie();
                stub.restore();
            });
        });
    }
});
