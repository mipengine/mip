define(function (require) {
    'use strict';

    window.location.href += '#mipcache.bdstatic.com';
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

    describe('customStorage', function () {
        describe('localstorage', function () {
            it('set', function () {
                // Check boundary condition
                LocalStorage.set(null, null);

                LocalStorage.set(name, nameValue);
                LocalStorage.set(age, ageValue, expire);
                expect(LocalStorage.get(name)).to.be.equal(nameValue);
            });

            it('get', function () {
                // Check boundary condition
                LocalStorage.get(null);

                expect(LocalStorage.get(name)).to.be.equal(nameValue);
            });

            it('rm', function () {
                // Check boundary condition
                LocalStorage.rm(null);

                LocalStorage.set(name, nameValue);
                LocalStorage.rm(name);
                expect(!!LocalStorage.get(name)).to.be.false;
            });

            it('rmExpires', function (done) {
                LocalStorage.set(expireName, expireNameValue, 1);
                setTimeout(function () {
                    LocalStorage.rmExpires();
                    expect(!!LocalStorage.get(expireName)).to.be.false;
                    done();
                }, 50);
            });

            it('clear', function () {
                LocalStorage.clear();
                expect(!!LocalStorage.get(name)).to.be.false;
                expect(!!LocalStorage.get(age)).to.be.false;
            });

            it('exceed', function () {
                try {
                    localStorage.setItem(name, nameValue, 20000);
                    localStorage.setItem(age, ageValue, 20000);
                    localStorage.setItem('test', 'test');
                    LocalStorage._setLocalStorage(exceedName, exceedNameValue, function (data) {});
                    expect(!!LocalStorage.get(exceedName)).to.be.false;
                } catch (e) {}
            });

            it('noCache', function () {
                fn.isCacheUrl('http://example/com');
                LocalStorage.set(name, nameValue);
                LocalStorage.set(age, ageValue);
                expect(localStorage.getItem(name)).to.be.equal(nameValue);
                expect(LocalStorage.get(name)).to.be.equal(nameValue);

                LocalStorage.rm(name);
                expect(!!LocalStorage.get(name)).to.be.false;

                LocalStorage.clear();
                expect(!!LocalStorage.get(age)).to.be.false;


                try {
                    LocalStorage.set(exceedName, exceedNameValue, function () {});
                    expect(!!LocalStorage.get(exceedName)).to.be.false;
                } catch (e) {};
            });

            it('noSupportLs', function () {
                fn.isCacheUrl('http://example/com');
                var stub = sinon.stub(LocalStorage, '_supportLs', function () {
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
                    LocalStorage.set(exceedName, exceedNameValue, function () {});
                    expect(!!LocalStorage.get(exceedName)).to.be.false;
                } catch (e) {}
                stub.restore();
            });

            it('coverBranch', function () {
                fn.isCacheUrl('mipcache.bdstatic.com');
                var stub = sinon.stub(LocalStorage, '_supportLs', function () {
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

                window.localStorage.removeItem = null;
                LocalStorage._supportLs();
            });
        });

        describe('asyncstorage', function () {
            it('request1', function (done) {
                // Check boundary condition
                AsyncStorage.request();

                var server = sinon.fakeServer.create();
                server.respondWith("POST", "/req1",
                [200, {
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
                    success: function (data) {
                        done();
                    },
                    error: function (err) {
                        done();
                    }
                });
                setTimeout(function () {
                    server.respond();
                }, 100);
            });
            it('request2', function (done) {
                var server = sinon.fakeServer.create();
                server.respondWith("POST", "/req2",
                [200, {
                    "Content-Type": "application/json"
                }, '{}']);
                AsyncStorage.request({
                    url: '/req2',
                    method: 'POST',
                    success: function (data) {
                        done();
                    },
                    error: function (err) {
                        done();
                    }
                });
                setTimeout(function () {
                    server.respond();
                }, 300);
            });
        });

        describe('asyncstorage', function () {
            it('delExceedCookie', function () {
                var exceedNameValue;
                for (var i = 0; i < 1024 * 3; i++) {
                    exceedNameValue += 'a';
                };
                document.cookie = 'test1=' + exceedNameValue + ';';
                document.cookie = 'test2=' + exceedNameValue + ';';
                CookieStorage.delExceedCookie();
                expect(document.cookie.length / 1024).to.be.below(3);
            });
        });
    });
});
