/**
 * @file 组件demo示例
 * @author lilangbo
 * @time 2016.07.11
 */

define(function (){
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
    };
    customElement.prototype.viewportCallback = function (inview) {
        console.log(this.id, inview);
    };
    return customElement;
});
require(['demo'], function (demo) {
    // 引入组件需要的css文件，选填
    MIP.css.mipDemo = __inline('./demo.less');
    //注册组件
    MIP.registerMipElement('mip-demo', demo, MIP.css.mipDemo);
});

