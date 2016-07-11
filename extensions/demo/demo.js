/**
 * @file 组件demo示例
 * @author lilangbo
 * @time 2016.07.11
 */

define(function() {

    var customElem = require('../buildins/customElement');

    /**
     * demoFun
     *
     * @param  {Event} e event
     */
    function demoFun (e) {
        console.log('This is a mip componnents demo');
    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = demoFun;
    };

    return customElem;

});

var MIP.css.mip-demo = __inline('demo.less');

MIP.registerMipElement('mip-demo', require('./mip-demo'), CSS);

    /*
     * 注册mip-link组件
     */
    require(['olympic/mip-link'], regME.bind(this, 'mip-link'));