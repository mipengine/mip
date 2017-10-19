/**
 * @file util test case
 * @author yangjun <harttle@harttle.com>, xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var util = require('util');

    describe('util', function () {
        describe('check util static method', function () {
            [
                'fn',
                'dom',
                'event',
                'rect',
                'css',
                'Gesture',
                'EventEmitter',
                'platform',
                'customStorage',
                'naboo'
            ].forEach(function (key) {
                it('.' + key, function () {
                    expect(util[key]).to.be.not.undefined;
                });
            });
        });

        describe('.parseCacheUrl', function () {
            it('error params', function () {
                expect(util.parseCacheUrl()).to.be.undefined;
                expect(util.parseCacheUrl('')).to.equal('');
                expect(util.parseCacheUrl(null)).to.be.null;
                expect(util.parseCacheUrl('', 'MIP')).to.equal('');
            });

            it('not a http or a path', function () {
                expect(util.parseCacheUrl('MIP')).to.equal('MIP');
                expect(util.parseCacheUrl('www.mipengine.org')).to.equal('www.mipengine.org');
            });

            it('not a MIP Cache url', function () {
                expect(util.parseCacheUrl('https://www.mipengine.org')).to.equal('https://www.mipengine.org');
                expect(util.parseCacheUrl('http://www.mipengine.org')).to.equal('http://www.mipengine.org');
                expect(util.parseCacheUrl('//www.mipengine.org')).to.equal('//www.mipengine.org');
            });

            it('MIP Cache http url', function () {
                expect(
                    util.parseCacheUrl('//mipcache.bdstatic.com/c/')
                ).to.equal('//mipcache.bdstatic.com/c/');

                expect(
                    util.parseCacheUrl('//mipcache.bdstatic.com/c/www.mipengine.org')
                ).to.equal('http://www.mipengine.org');

                expect(
                    util.parseCacheUrl('/c/www.mipengine.org')
                ).to.equal('http://www.mipengine.org');

                expect(
                    util.parseCacheUrl('https://mipcache.bdstatic.com/c/www.mipengine.org')
                ).to.equal('http://www.mipengine.org');

                expect(
                    util.parseCacheUrl('https://mipcache.bdstatic.com/c/www.mipengine.org/static/index.html')
                ).to.equal('http://www.mipengine.org/static/index.html');

                expect(
                    util.parseCacheUrl('/c/www.mipengine.org/static/index.html')
                ).to.equal('http://www.mipengine.org/static/index.html');
            });

            it('MIP Cache https url', function () {
                expect(
                    util.parseCacheUrl('//mipcache.bdstatic.com/c/s/')
                ).to.equal('//mipcache.bdstatic.com/c/s/');

                expect(
                    util.parseCacheUrl('//mipcache.bdstatic.com/c/s/www.mipengine.org')
                ).to.equal('https://www.mipengine.org');

                expect(
                    util.parseCacheUrl('/c/s/www.mipengine.org')
                ).to.equal('https://www.mipengine.org');

                expect(
                    util.parseCacheUrl('https://mipcache.bdstatic.com/c/s/www.mipengine.org')
                ).to.equal('https://www.mipengine.org');

                expect(
                    util.parseCacheUrl('https://mipcache.bdstatic.com/c/s/www.mipengine.org/static/index.html')
                ).to.equal('https://www.mipengine.org/static/index.html');

                expect(
                    util.parseCacheUrl('/c/s/www.mipengine.org/static/index.html')
                ).to.equal('https://www.mipengine.org/static/index.html');
            });
        });

        describe('.makeCacheUrl', function () {
            var spy;

            // mock cache url
            beforeEach(function () {
                spy = sinon.stub(util.fn, 'isCacheUrl');
                spy.returns(true);
            });

            afterEach(function () {
                if (spy && spy.restore) {
                    spy.restore();
                }

            });

            it('not cache url', function () {
                spy.returns(false);
                expect(util.makeCacheUrl('https://www.mipengine.com')).to.equal('https://www.mipengine.com');
            });

            it('not url', function () {
                expect(util.makeCacheUrl('www.mipengine.com')).to.equal('www.mipengine.com');

                // is error
                // expect(util.makeCacheUrl('http.mipengine.com')).to.equal('http.mipengine.com');
            });

            // is error
            // it('error url', function () {
            //     expect(util.makeCacheUrl()).to.equal.undefined;
            // });

            it('success url', function () {
                expect(util.makeCacheUrl('https://www.mipengine.com')).to.equal('/c/s/www.mipengine.com');
                expect(util.makeCacheUrl('http://www.mipengine.com')).to.equal('/c/www.mipengine.com');
                expect(util.makeCacheUrl('//www.mipengine.com')).to.equal('/c/s/www.mipengine.com');
            });

            it('img url', function () {
                expect(util.makeCacheUrl('https://www.mipengine.com', 'img')).to.equal('/i/s/www.mipengine.com');
                expect(util.makeCacheUrl('http://www.mipengine.com', 'img')).to.equal('/i/www.mipengine.com');
                expect(util.makeCacheUrl('//www.mipengine.com', 'img')).to.equal('/i/s/www.mipengine.com');
            });

            it('parseCacheUrl https', function () {
                var url = 'https://www.mipengine.com/docs/index.html';
                var cacheUrl = util.makeCacheUrl(url);
                expect(util.parseCacheUrl(cacheUrl)).to.equal(url);
            });

            it('parseCacheUrl http', function () {
                var url = 'http://www.mipengine.com/docs/index.html';
                var cacheUrl = util.makeCacheUrl(url);
                expect(util.parseCacheUrl(cacheUrl)).to.equal(url);
            });
        });
    });
});

/* eslint-enable max-nested-callbacks */
