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
    customElement.prototype.viewportCallback = function () {};
    // 模板的元素build功能，即元素的默认初始化功能 
    customElement.prototype.build = function () {};
    /**
     * 预渲染接口
     * @return {boolean}
     **/
    customElement.prototype.prerenderAllowed = function () {
        return false;
    };

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
