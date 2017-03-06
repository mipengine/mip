/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file 测试util.js
 */

define(function(util) {

	var util = require('util');

    describe('util', function() {
        it('makeCacheUrl', function() {
            expect(util.makeCacheUrl('example', 'img')).to.equal('example');

            var url = '//example.com';
            location.href += "#https://mipcache.bdstatic.com/";
            expect(util.makeCacheUrl(url, '')).to.equal('/c/s/example.com');
            expect(util.makeCacheUrl(url, 'img')).to.equal('/i/s/example.com');

            var url = 'https://example.com';
            expect(util.makeCacheUrl(url, 'img')).to.equal('/i/s/example.com');
        });
    });
});
