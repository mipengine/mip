/**
 * @file 新闻推荐组件
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {

    var customElem = require('/buildins/customElement');
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

