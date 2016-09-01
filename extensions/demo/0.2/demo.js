/**
 * @file 组件demo示例
 * @author lilangbo
 * @time 2016.07.11
 */

define(['components/gesture'], function (Gesture) {
    var customElement = require('customElement').create();
    var index = 0;
    customElement.prototype.build = function () {
        var element = this.element;
        this.id = index ++;
        if (element.getAttribute('width')) {
            element.style.width = element.getAttribute('width') + 'px';
        }
        if (element.getAttribute('height')) {
            element.style.height = element.getAttribute('height') + 'px';
        }
        console.log(this.id, 'build');
        if (this.id === 6) {
            this.prerender = true;
        }
        if (this.id === 3) {
            var ges = new Gesture(element);
            ges.on('tap', function () {
                console.log('test_tap');
            });
            // ges.on('doubletap', function () {
            //     console.log('test_doubletap');
            // });
            ges.on('swipeleft', function (data) {
                console.log(data);
            });
        }
    };
    customElement.prototype.viewportCallback = function (inview) {
        console.log(this.id, inview);
    };
    customElement.prototype.prerenderAllowed = function () {
        return this.prerender || false;
    };
    customElement.prototype.inviewCallback = function () {
        this.element.style.background = '#333';
    };
    return customElement;
});
require(['demo'], function (demo) {
    // 引入组件需要的css文件，选填
    MIP.css.mipDemo = __inline('./demo.less');
    //注册组件
    MIP.registerMipElement('mip-demo', demo, MIP.css.mipDemo);
});

