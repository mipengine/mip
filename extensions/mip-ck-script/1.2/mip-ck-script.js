define(function (require) {

    var $ = require('zepto');

    var customElem = require('customElement').create();

    // 页面交互效果
    var effects = {
        // 标签切换
        switchBlock: function () {
            var $switchBlock = $('#week_hot_switch');
            $switchBlock.on('click', '.switch_tabs a', function(event) {
                event.preventDefault();
                var $currEle = $(this);
                $currEle.addClass('curr').siblings().removeClass('curr');
                var idx = $switchBlock.find('.switch_tabs a').index(this);
                $switchBlock.find('.switch_content').hide().eq(idx).show();
            });
        },
        // 换一换
        changMore: function () {
            $('.useful').on('click', function (event) {
                event.preventDefault();
                var clicked = $(this).attr('clicked');
                if (clicked) {
                    return;
                }
                var countEle = $(this).find('.count');
                var currCount = Number(countEle.text());
                countEle.text(currCount + 1);
                $(this).attr('clicked', 'yes');
            });
        },
        // 变换颜色
        changeColor: function () {
            $('.c_ad_title p,.c_ad_title p a').css('color', $('.navigate').css('background-color'));
        },
        // 加载两性ad列表
        init: function () {
            this.switchBlock();
            this.changMore();
            this.changeColor();
        }
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        // 页面js的交互效果
        effects.init();
    };

    return customElem;
});

require(['mip-ck-script'], function (plugindemo) {
    // 注册mip-ck-script组件
    MIP.registerMipElement('mip-ck-script', plugindemo);
});
