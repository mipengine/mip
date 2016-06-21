/**
 * 自定义组件类注册组件
 * @exports registerMipElement
 * 说明：自定义组件生生命周期如下：
 *      创建节点：执行createCallback
 *      插入节点：执行attachedCallback
 *      渲染接口：build，用户在可视区域内，才会渲染，如果在build里面定义渲染，
 * @author shenzhou@baidu.com
 * @version 1.0
 * @copyright 2015 Baidu.com, Inc. All Rights Reserved
 */
define(function(){
    if(window['registerMipElement']){
        return window['registerMipElement'];
    }

    var mipTagList = {};


    function registerElement(name, elementClass){
       if(mipTagList[name]){
            return; 
        }
        mipTagList[name] = 1;
        var elemProto = Object.create(HTMLElement.prototype);
        //创建元素实例时候自动调用
        var implClass = new elementClass();
        //elemProto._implementation = new elementClass();
        $.extend(true,elemProto, implClass);
        elemProto.createdCallback = function(){
            this.classList.add('mip-element');
            this.mipCreatedCallback();
        };
        //向文档中插入实例时候调用
        elemProto.attachedCallback = function(){
            this.mipAttachedCallback();
        };
        //删除实例时候调用
        elemProto.detachedCallback = function(){
            this.mipDetachedCallback();
        };
       //属性变化时候调用
        elemProto.attributeChangedCallback = function(){
            this.mipAttributeChangedCallback();
        };
        elemProto.isInviewer = function(){
            var elmTop = $(this).offset().top;
            var pageHight  = $(window).height();
            var scrollTop = pageYOffset;

            if (window.parent !== window && platform.needSpecialScroll) {
                return elmTop <= pageHight;
            }
            if(elmTop - scrollTop>pageHight){
                return false;
            } else {
                return true;
            }
        }

              document.registerElement(name, {prototype:elemProto});
    }

    window['registerMipElement'] = registerElement;
    
    return registerElement;

});
