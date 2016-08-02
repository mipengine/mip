/**
 * 自定义组件基类
 * @exports factory
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function () {
    function customElement(element) {
        this.element = element;
        if (this.init){
            this.init();
        }    
    }

    // interface
    customElement.prototype.mipCreatedCallback = function () {};
    customElement.prototype.mipAttachedCallback = function () {};
    customElement.prototype.mipDetachedCallback = function () {};
    customElement.prototype.mipAttributeChangedCallback = function () {};
    
    //自定义元素进入可视区域的默认处理函数，此处可以覆写，如果有特殊逻辑
    customElement.prototype.inviewCallback = function () {
        if(this.element.isInviewer()){
            this.build();
        }
    };
   //模板的元素build功能，即元素的默认初始化功能 
    customElement.prototype.build = function () {};


    
    return function () {
        var impl = function (element) {
            customElement.call(this, element);
        };
        impl.prototype = Object.create(customElement.prototype);
        return impl;
    };
});
