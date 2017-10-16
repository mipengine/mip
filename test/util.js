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
            location.hash = "https://mipcache.bdstatic.com/";
            expect(util.makeCacheUrl(url, '')).to.equal('/c/s/example.com');
            expect(util.makeCacheUrl(url, 'img')).to.equal('/i/s/example.com');

            url = 'https://example.com';
            expect(util.makeCacheUrl(url, 'img')).to.equal('/i/s/example.com');
        });

        it('parseCacheUrl', function() {
            expect(util.parseCacheUrl('')).to.be.equal('');
            expect(util.parseCacheUrl('aaa')).to.equal('aaa');
            expect(util.parseCacheUrl('http://baidu.com')).to.equal('http://baidu.com');
            expect(util.parseCacheUrl('/i/image79.360doc.cn/DownloadImg/2014/10/0922/45981023_1', 'img')).to.equal('http://image79.360doc.cn/DownloadImg/2014/10/0922/45981023_1');
            expect(util.parseCacheUrl('//mipcache.bdstatic.com/c/www.360doc.cn/mip/415640292.html')).to.equal('http://www.360doc.cn/mip/415640292.html');
            expect(util.parseCacheUrl('//mipcache.bdstatic.com/c/s/a')).to.equal('//mipcache.bdstatic.com/c/s/a');
            expect(util.parseCacheUrl('//mipcache.bdstatic.com/c/s/www.360doc.cn/mip/415640292.html')).to.equal('https://www.360doc.cn/mip/415640292.html');
            expect(util.parseCacheUrl('https://mipcache.bdstatic.com/c/www.360doc.cn/mip/415640292.html')).to.equal('http://www.360doc.cn/mip/415640292.html');
            expect(util.parseCacheUrl('https://mipcache.bdstatic.com/c/harttle.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).to.equal('http://harttle.com/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        });
    });
});
