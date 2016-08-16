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
    customElement.prototype.applyFillContent = function (ele, isReplaceed) {
        ele.classList.add('mip-fill-content');
        if (isReplaceed) {
          ele.classList.add('mip-replaced-content');
        }
    };
    customElement.prototype.createdCallback = function () {};
    customElement.prototype.attachedCallback = function () {};
    customElement.prototype.detachedCallback = function () {};
    customElement.prototype.attributeChangedCallback = function () {};
    customElement.prototype.inviewCallback = function () {};
    customElement.prototype.viewportCallback = function () {};
    customElement.prototype.prerenderAllowed = function () {return false;}
    // 模板的元素build功能，即元素的默认初始化功能 
    customElement.prototype.build = function () {};

    return {
        create: function () {
            var impl = function (element) {
                customElement.call(this, element);
            };
            impl.prototype = Object.create(customElement.prototype);
            return impl;
        }
    }
});
