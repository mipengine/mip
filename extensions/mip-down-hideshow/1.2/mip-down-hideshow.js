/**
 * @file 菜单显示隐藏切换
 * @author Zhou
*/
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        var hsId = $(element).attr('hsId');
        if (hsId == 0) {
            hideshow(
                element,
                {
                    fn: function (flag) {
                        $('.bdcs-search-form').show();
                        $('.xq-top .title ,#mcate em').remove();
                        $('#mcate').css('width', '35px');
                        $('.xq-top').css('padding-right', '51px');
                    }
                }
            );
        }
        else if (hsId == 1) {
            hideshow(
                element,
                {
                    fn: function (flag) {
                        $('.xq-nav').fadeToggle(200);
                    }
                }
            );
        }
        else if (hsId == 2) {
            hideshow(
                element,
                {
                    text: '\u6536\u8d77\u5185\u5bb9',
                    fn: function (flag) {
                        if (flag == true) {
                            $('#summary').hide();
                            $('#details').show();
                        }
                        else {
                            $('#summary').show();
                            $('#details').hide();
                        }
                    }
                }
            );
        }
    };
    function hideshow(element, options) {
        var defaults = {
            event: 'click',
            isFn: true,
            text: null,
            fn: function () {}
        };
        var option = $.extend({}, defaults, options);
        var temp = true;
        var obj = $(element).find('.hideshow-btn');
        var ohtml = obj.text();
        obj.on(option.event, function () {
            temp == true ? $(this).html(option.text).addClass('active') : $(this).html(ohtml).removeClass('active');
            if (option.isFn) {
                option.fn(temp);
            }
            temp = !temp;
        });
    }
    return customElem;
});
require(['mip-down-hideshow'], function (plugindemo) {
    MIP.registerMipElement('mip-down-hideshow', plugindemo);
});