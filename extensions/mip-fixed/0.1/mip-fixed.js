/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (){
    var customElement = require('customElement').create();
    
    /**
     * build
     *
     */
    function build () {

        var _this = this;
        if (_this.element.isRender) {
            return;
        }

        _this.element.isRender = true;

        _this.addEventAction('close', function() {
            setStyles(_this.element, {'display': 'none'});
        });

    }


    /**
     * [setStyles CSS样式设置函数]
     * 
     * @param {Html Node} obj html标签
     * @param {Object} params css样式参数
     * @return
     */
    function setStyles(obj, params) {
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                obj.style[key] = params[key];
            }
        }
    }


    /**
     * 初始化
     *
     */
    customElement.prototype.init = function() {
        this.build = build;
    };
    
    return customElement;
});

require(['mip-fixed'], function (mipFixed) {
    
    // 引入组件需要的css文件，选填
    MIP.css.mipFixed = __inline('./mip-fixed.less');
    
    //注册组件
    MIP.registerMipElement('mip-fixed', mipFixed, MIP.css.mipFixed);
});
