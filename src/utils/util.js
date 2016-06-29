define(function() {
    /**
     *  页面资源url转成可用的cache url
     *  @pageUrl 当前页面url地址
     *  @url 需要替换的url地址，默认全局路径
     *  @return url
     *  by lilangbo@baidu.com
     * */
    function urlToCacheUrl (pageUrl, url, type) { 
        //线下联调 http://cq02-super-god.cq02.baidu.com   mipcache.bdstatic.com
        // 不合法的url 或 pageUrl非mip cache域名 直接return 
        if (pageUrl.indexOf('cq02-super-god.cq02.baidu.com') < 0 
            || (url && url.length < 8) 
            || !(url.indexOf('http') == 0 || url.indexOf('//') == 0)) {
            return url;
        }
        var prefix = (type === 'img') ? '/i/' : '/c/';
        if (url.indexOf('//') == 0 || url.indexOf('https') == 0) {
            prefix += 's/';
        }
        //去掉http头
        urlParas = url.split('//');
        urlParas.shift();
        url = urlParas.join('//');
        return prefix + url;
    }
    return {
        urlToCacheUrl : urlToCacheUrl
    }
});
