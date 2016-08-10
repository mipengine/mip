/* inline dep */
__inline('./util');
__inline('./recommend');

/**
 * @file 新闻推荐组件
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {

    var customElem = require('customElement');
    var recommend = require('./recommend');

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = render;
    };

    /**
     * isHttps
     *
     * @type {boolean}
     */
    var isHttps = /^https/.test(location.protocol);

    /**
     * 数据源类型
     *
     * @type {Object}
     */
    var serverMap = {
        'olympic': (isHttps
            ? 'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/olympic.pae.baidu.com'
            : 'http://olympic.pae.baidu.com')
            + '/pae/olympic/api/reclist',
        'headline': '//headline.baidu.com/doc/recommended'
    };

    /**
     * 异步取数据
     *
     * @param  {string}   url      url
     * @return {Promise}
     */
    function fetchData(url) {
        return $.ajax({
            'url': url,
            'dataType': 'jsonp',
            'jsonp': 'cb',
            'data': {
                'url_key': location.href
            }
        });
    }


    /**
     * 渲染
     */
    function render() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var url = this.getAttribute('src');
        var server = this.getAttribute('server') || 'olympic';

        if (!url) {
            url = serverMap[server];
        }

        recommend.init();

        // 推荐列表
        fetchData(url).then(function(res) {
            recommend.render(res.data);
            recommend.renderHot(res.data);
        });

    }

    return customElem;

});
require(['mip-recommend'], function (recommend) {
    // 引入组件需要的css文件，选填
    MIP.css.mipRecommend = __inline('./mip-recommend.less');
    //注册组件
    MIP.registerMipElement('mip-recommend', recommend, MIP.css.mipRecommend);
});
