/**
 * @author: laoono
 * @date:  2016-09-01
 * @time: 15:35
 * @file: mip-fh-ad.js
 * @contact: laoono.com
 * @description: #
 */

define(['require', 'customElement', 'zepto'], function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();

    // 直投广告请求url
    var ajaxurl = 'https://partners.fh21.com.cn/partners/showcodejsonp?callback=?';
    // 页面广告参数
    var param = $('#adParam');
    var paramObj = param.data('keyword');

    // 初始化直投广告
    var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var posId = [opt.posId] || [1];
        var kw = opt.kw || '';
        var element = opt.element;

        // 接口参数值
        var query = {
            kw: kw,
            pid: posId.join(',')
        };

        // 判断直投广告参数,是否加载直投广告请求
        if (kw && kw.length) {
            $.getJSON(ajaxurl, query, function (json) {
                var adObj = $.parseJSON(json.result);

                // 遍历直投广告ID
                $.each(adObj, function (k, v) {
                    if ($.trim(v)) {
                        $('[id^=BAIDU_DUP_wrapper]').remove();
                        // 根据广告id，判断广告的显示位置
                        switch (+k) {
                            // 底部悬浮广告
                            case 1:
                                element.html('<div id="ad_position_1">' + v + '</div>');
                                // 去除三种广告：顶部网盟嵌入，右上漂浮：猪，右下漂浮：图片
                                // $('div[id*='wrapper_u2311978'],.imagepluspage_entry,#icon_0').remove();
                                $('.direct_ad_effect_style').removeClass('direct_ad_effect_style');
                                break;
                            case 14:
                                $('#liveAdBlock').html(v);
                                break;
                            // 我要提问广告位
                            case 47:
                                $('#i-2-iask').html(v);
                                break;
                            // 向Ta提问广告位
                            case 48:
                                $('div.introduce-list').find('a.btn').remove();
                                $('div.introduce-list').append(v);
                                break;
                            // 底部广告位
                            case 11:
                            // 我要提问下方热图广告位
                            case 49:
                                element.html(v);
                                break;

                            default:
                                element.html(v);
                                break;
                        }
                    }
                    else {
                        // 广告位id为1时，加载底部漂浮的百度广告
                        // if (+k === 1) {
                        // loadBdAd();
                        // }
                    }
                });
                $('.direct_ad_effect_style').remove();
            });
        }
        else {
            $('.direct_ad_effect_style').remove();
        }
    };

    var getOpt = function (element) {
        var $element = $(element);
        // 获取元素绑定的广告位id和关键词
        var posId = $element.attr('fh-ad-pid');
        var keywords = $element.attr('fh-ad-keywords') || paramObj;
        var lazy = $element.attr('lazy');

        // 广告初始化参数
        // 广告位id数组 [1, 11, 14, 47, 48, 49];

        var opt = {
            posId: posId,
            kw: $.trim(keywords),
            lazy: lazy,
            element: $element
        };
        return opt;
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var opt = getOpt(this.element);
        opt.lazy === 'false' && init(opt);
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.lazy !== 'false' && init(opt);
    };

    return customElem;
});

require(['mip-fh-ad'], function (plugindemo) {
    // 注册mip-fh-ad组件
    MIP.registerMipElement('mip-fh-ad', plugindemo);
});
