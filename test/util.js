/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file 测试src/util.js
 */

// 引入被测模块
define(['src/util'], function(util) {
    // 被测模块名
    describe('util', function() {

        // 被测模块方法
        describe('.urlToCacheUrl()', function() {
            var bdstatic = 'http://mipcache.bdstatic.com';

            // 被测模块行为
            it('should do nothing for non bdstatic pageUrl', function() {
                var url = util.urlToCacheUrl('http://example.com', '/foo', 'type');
                expect(url).to.equal('/foo');
            });
            it('should do nothing for invalid url', function() {
                var url = util.urlToCacheUrl(bdstatic, 'foo', 'type');
                expect(url).to.equal('foo');
            });
            it('should prefix with /c for normal url', function() {
                var url = util.urlToCacheUrl(bdstatic, 'http://foo', 'type');
                expect(url).to.equal('/c/foo');
            });
            it('should prefix with /i for img url', function() {
                var url = util.urlToCacheUrl(bdstatic, 'http://foo', 'img');
                expect(url).to.equal('/i/foo');
            });
            it('should prefix with /s for url begin with //', function() {
                var url = util.urlToCacheUrl(bdstatic, '//foo.bar.com', 'type');
                expect(url).to.equal('/c/s/foo.bar.com');
            });
            it('should prefix with /s for url begin with https://', function() {
                var url = util.urlToCacheUrl(bdstatic, 'https://foo.bar.com', 'type');
                expect(url).to.equal('/c/s/foo.bar.com');
            });
        });

    });
});
