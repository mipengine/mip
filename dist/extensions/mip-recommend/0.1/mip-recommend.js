/* inline dep */
/**
 * fork from http://gitlab.baidu.com/MIP/mibhtml/raw/master/src/static/js/utils/util.js
 */

define('extensions/mip-recommend/0.1/util', ['require'], function(require) {

    /**
     * @description 极简版模版引擎
     * @param {String} tpl 模版
     * @param {Object} data 渲染数据
     * @return 渲染后的数据
     */
    function format(tpl, data) {
        data = data || {};
        return tpl.replace(/#\{([^\}]+)\}/g, function() {
            if (data[arguments[1]] !== undefined) {
                return data[arguments[1]];
            }
            return '';
        });
    }

    /**
     *  时间转换工具
     *  @params time 传入时间戳
     *  @return 时间字符串
     *  by liwenqian@baidu.com
     * */
    function timeSince(time) {
        var tempSeconds = 1000 * time;
        if((new Date() - tempSeconds) < 60000) {
            return "刚刚";
        }
        var tempMinutes = Math.floor((new Date() - tempSeconds)/60000);
        if(tempMinutes < 60) {
            return tempMinutes + "分钟前";
        }
        var tempHours = Math.floor(tempMinutes/60);
        if(tempHours < 24) {
            return tempHours + "小时前";
        }
        var tempDate = new Date(tempSeconds);
        var month = tempDate.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
        var day = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
        return  month + "-" + day;
    }

    /**
     *  页面url参数获取工具，hash和参数均生效
     *  @params 要匹配的字符串，要提取的参数
     *  @return 参数值或空
     *  by liwenqian@baidu.com,taoqingqian01@baidu.com
     * */
    function getParam(param, url) {
        var reg = new RegExp(param + '=([^&\?#]+)'),
            href = url;
        var matchs = href.match(reg);
        return matchs ? matchs[1] : "";
    }

//格式化
    function formatBigNumber(num) {
        if (!num) return 0;
        if (num < 1e5) {
            return num;
        }
        else if (num < 1e8) {
            // return (num / 1e4).toFixed(1).replace(/\.0+$/, '') + '万';
            return Math.round(num / 1e4, 10) + '万';
        }
        else {
            return (num / 1e8).toFixed(1).replace(/\.0+$/, '') + '亿';
        }
    }

    return {
        timeSince : timeSince,
        getParam : getParam,
        format: format,
        formatBigNumber: formatBigNumber
    }
});
;
/**
 * @file 推荐
 *
 * fork from http://gitlab.baidu.com/MIP/mibhtml/raw/master/src/static/js/dom/recommend.js
 */


define('extensions/mip-recommend/0.1/recommend', ['require', 'extensions/mip-recommend/0.1/util'], function(require) {

    var _ = require('extensions/mip-recommend/0.1/util');

    /**
    * 推荐模块
    */
    function render(data) {

        //相关推荐
        var recommendData = data.recommend ? data.recommend : data;
        var logClass = window.parent !== window ? '' : 'MIP_LOG_BTN';

        $.each(recommendData, function(i, item) {
            $(".recommends").append(
                '<div class="' + logClass + ' recommends-box' + (!i ? ' recommends-box-first' : '') + '" data-click=\'{"action":"recommend", "order":"' + i + '", "href":"' + item.url + '", "type": "sf"}\'>'+
                '<a class="recommends-href" href='+ item.url + '>' +
                '<div class="recommends-title">' + item.title + '</div>' +
                '<div class="recommends-info">' +
                '<span>' + _.timeSince(item.time) + '</span>' +
                '<span class="recommends-provider">' + item.provider + '</span></div></a></div>'
            );
        });

        //重设高度兼容手百
        $(".recommends").css("height", "100%");


    }

    function init() {

        $(".recommends").delegate('.recommends-box','click',function(ev) {

            ev.preventDefault();
            var href = $(this).find(".recommends-href").attr("href");

            var message = {
                "event": "loadiframe",
                "data": {
                    "url": href,
                    "title": $(this).find(".recommends-provider").text(),
                    "click": $(this).data('click')
                }
            };

            //此处判断iframe用了较为tricky的逻辑，后续需要通过父页面message来确认
            if(window.parent !== window) {
                window.parent.postMessage(message, '*');
            }
            else {
                location.href = href;
            }


        });

    }

    return {
        init : init,
        render: render
    }
});
;

/**
 * @file 新闻推荐组件
 *
 * @author menglingjun
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define('extensions/mip-recommend/0.1/mip-recommend', ['require', 'customElement', 'extensions/mip-recommend/0.1/recommend'], function(require) {

    var customElem = require('customElement');
    var recommend = require('extensions/mip-recommend/0.1/recommend');

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
require(['extensions/mip-recommend/0.1/mip-recommend'], function (recommend) {
    // 引入组件需要的css文件，选填
    MIP.css.mipRecommend = ".recommends {\n  width: 100%;\n  min-height: 230px;\n  padding: 16px 0 14px;\n  margin-top: 13px;\n  background-color: #fff;\n  overflow: hidden;\n  text-align: left;\n}\n.recommends > div {\n  margin: 0 16px;\n}\n.recommends-box a {\n  display: block;\n  overflow: hidden;\n  text-decoration: none;\n  color: #333333;\n}\n.recommends-header {\n  font-size: 13px;\n  color: #999;\n}\ndiv.recommends-keywords {\n  display: block;\n  margin-top: 12px;\n  padding: 10px 0;\n  overflow: hidden;\n}\n.recommends-keywords-href {\n  padding: 6px 13px;\n  overflow: hidden;\n  border-radius: 20px;\n  margin-right: 14px;\n  border: 1px solid #e6e6e6;\n}\n.recommends-keywords span {\n  font-size: 14px;\n  color: #666;\n}\n.recommends-box {\n  overflow: hidden;\n  padding: 16px 0 15px;\n  border-bottom: #eee 1px solid;\n}\n.recommends-box-first {\n  padding-top: 15px;\n}\n.recommends-box:last-child {\n  border-bottom: none;\n  padding-bottom: 5px;\n}\n.recommends-title {\n  font-size: 16px;\n  margin-bottom: 10px;\n  display: -webkit-box;\n  -webkit-line-clamp: 1;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n}\n.recommends-info {\n  font-size: 13px;\n  color: #999;\n}\n.recommends-more {\n  text-align: center;\n  line-height: 45px;\n  font-size: 13px;\n  color: #999;\n}\n.recommends-provider {\n  padding-left: 18px;\n}\n.recommends-entry {\n  text-align: center;\n  font-size: 16px;\n  padding: 15px 0 0;\n}\n.recommends-entry-tag {\n  color: #0099ff;\n}\n.recommends-entry-link {\n  color: #999;\n  display: block;\n}\n";
    //注册组件
    MIP.registerMipElement('mip-recommend', recommend, MIP.css.mipRecommend);
});
