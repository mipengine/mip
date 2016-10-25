define(function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();

    // 直投广告请求url
    var ajaxurl = 'https://s.cnkang.com/ad/showcodejsonp';

    // 页面广告参数
    var $tags = $('#tags');
    var cateid = $tags.data('cateid');

    // 初始化直投广告
    var init = function (opt) {
        opt = opt || {};
        // 设置配置项默认值
        var posId = [opt.posId] || [1];
        var cateId = opt.cateId || '';
        var element = opt.element;

        // 接口参数值
        var query = {
            cateid: cateId,
            pid: posId.join(',')
        };

        // 直投广告物料
        var material = null;
        $.ajax({
            type: 'get',
            dataType: 'jsonp',
            async: false,
            url: ajaxurl,
            data: query,
            success: function (data) {
                material = data.result || '';
                var json = JSON.parse(material);
                $.each(json, function (k, v) {
                    if ($.trim(v)) {
                        switch (+k) {
                            case 52:
                                element.append(v);
                                break;
                            default:
                                element.html(v);
                                break;
                        }
                    }
                    else {
                        switch (+k) {
                            case 52:
                                var $body = $('body');
                                element.html('<mip-ad layout="container"'
                                    + 'cpro_psid="u2422282" type="ad-qwang" cpro_psheight="120">'
                                    + '</mip-ad>');
                                $body.css('padding-bottom', '120px !important;');
                                break;
                        }
                    }
                });
            }
        });
    };

    var getOpt = function (element) {
        var $element = $(element);
        // 获取元素绑定的广告位id和关键词
        var posId = $element.attr('ck-ad-pid');
        var adCateId = $element.attr('ck-ad-cateid') || cateid;
        var lazy = $element.attr('lazy');

        // 广告初始化参数
        var opt = {
            posId: posId,
            cateId: $.trim(adCateId),
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
        // 页面js的交互效果
    };
    // 第一次进入可视区回调,只会执行一次，做懒加载，利于网页速度
    customElem.prototype.firstInviewCallback = function () {
        var opt = getOpt(this.element);
        opt.lazy !== 'false' && init(opt);
    };

    return customElem;
});

require(['mip-ck-ad'], function (plugindemo) {
    // 注册mip-ck-ad组件
    MIP.registerMipElement('mip-ck-ad', plugindemo);
});
