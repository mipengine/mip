/*
 * @author yangjun14(yangjun14@baidu.com)
 * @file 测试util.js
 */

// 引入被测模块
define(['util'], function(util) {
    // 被测模块名
    describe('util', function() {

        it('makeCacheUrl', function() {
            var url = 'http://example.com';
            expect(util.makeCacheUrl(url, 'img')).to.equal(url);
            location.href += '#mipcache.bdstatic.com';
            
        });

    });
});
