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

    customElem.prototype.init = function() {

        this.build = render;

    };

    function render() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var url = this.getAttribute('src') || '//headline.baidu.com/doc/recommended';

        $.ajax({
            'url': url,
            'dataType': 'jsonp',
            'jsonp': 'cb',
            'data': {
                'url_key': location.href
            },
            'success': function (res) {
                recommend.init();
                recommend.render(res.data);
            }
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
