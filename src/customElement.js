/**
 * 自定义组件基类
 * @exports factory
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(['./components/event'], function (Event) {
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
    customElement.prototype.expendAttr = function (attrs, element) {
        for (var i = 0; i < attrs.length; i++) {
            if (this.element.hasAttribute(attrs[i])) {
                element.setAttribute(attrs[i], this.element.getAttribute(attrs[i]));
            }
        }
    };

    customElement.prototype.addActionEvent = function () {
        var evt = this._actionEvent;
        if (!evt) {
            evt = this._action = {};
            evt.setEventContext(this);
        }
        
        evt.on.apply(evt, arguments);
    };

    customElement.prototype.excuteActionEvent = function (action) {
        var eventObj = this._actionEvent;
        if (action && eventObj) {
            eventObj.trigger(action.handler, action.event, action.arg);
        }
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
