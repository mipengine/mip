define(function (require) {
    'use strict';

    window.location.href += '#mipcache.bdstatic.com';
    var CustomStorage = require('utils/customStorage');
    var LocalStorage = new CustomStorage(0);
    var AsyncStorage = new CustomStorage(1);
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
                    localStorage.setItem('test', 'test');
                    LocalStorage._setLocalStorage(exceedName, exceedNameValue, function (data) {});
                    expect(!!LocalStorage.get(exceedName)).to.be.false;
                } catch (e) {}
            });

            it('noCache', function () {
                LocalStorage._isCachePage('http://example/com');
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
                LocalStorage._isCachePage('http://example/com');
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
                LocalStorage._isCachePage('mipcache.bdstatic.com');
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
            });
        });

        describe('asyncstorage', function () {
            it('request1', function (done) {
                // Check boundary condition
                AsyncStorage.request();

                var server = sinon.fakeServer.create();
                server.respondWith("POST", "/",
                [200, {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, OPTIONS"
                }, '{ok:1}']);
                AsyncStorage.request({
                    url: '/',
                    method: 'POST',
                    body: 'content',
                    headers: {
                        'Access-Control-Request-Headers': 'X-PINGOTHER',
                    },
                    success: function (data) {
                        done(data);
                    },
                    error: function (err) {
                        done(err);
                    }
                });
                server.respond();
                setTimeout(function () {
                    done();
                }, 1000);
            });
            it('request2', function (done) {
                AsyncStorage.request({
                    url: 'http://baidu.com',
                    mode: 'cors',
                    credentials: 'omit',
                    cache: 'default',
                    headers: {
                        'Access-Control-Request-Headers': 'X-PINGOTHER',
                    },
                    success: function (data) {
                        console.log(1111111);
                        console.log(JSON.parse(data));
                        done(data);
                    },
                    error: function (err) {
                        console.log(JSON.parse(err));
                        done(err);
                    }
                });
                setTimeout(function () {
                    done();
                }, 1000);
            });
            it('request3', function (done) {
                var server = sinon.fakeServer.create();
                server.respondWith("POST", "/",
                [200, {
                    "Content-Type": "application/json"
                }, '{}']);
                AsyncStorage.request({
                    url: '/a',
                    method: 'POST',
                    success: function (data) {
                        done();
                    },
                    error: function (err) {
                        done();
                    }
                });
                server.respond();
                setTimeout(function () {
                    done();
                }, 1000);
            });
        });
    });
});
