/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(['components/fixedElement'],function (fixedElement){
    var customElement = require('customElement').create();
    var Gesture = require('components/gesture');
    

    /**
     * render
     *
     */
    function render () {

        var _this = this;
        if (_this.element.isRender) {
            return;
        }

        _this.element.isRender = true;
        _this.open = false;

        setStyles(_this.element, {
            'position': 'fixed',
            'z-index': 10001,
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            'transition': 'opacity 0.1s ease-in'
        });
        

        changeParentNode.call(_this);

        /* 事件注册 */
        _this.addEventAction('close', function() {close_.call(_this, event)});
        _this.addEventAction('open', function() {open_.call(_this, event)});

    }

    function changeParentNode() {
        var _this = this;
        var nodes = [];
        var index = 0;
        const CHILDRENS = _this.element.childNodes;

        for(index = 0; index < CHILDRENS.length; index ++) {
            if(CHILDRENS[index].nodeType == 1) {
                nodes.push(CHILDRENS[index]);
            }
        }

        _this.container_ = document.createElement('div');
        _this.applyFillContent(_this.container_);
        
        setStyles(_this.container_, {
            'z-index': 10001,
            'top': 0,
            'right': 0,
            'bottom': 0,
            'left': 0,
            'transition': 'opacity 0.1s ease-in'
        });

        _this.element.appendChild(_this.container_);
        

        for(index = 0; index < nodes.length; index ++) {
            _this.container_.appendChild(nodes[index]);
        }
    }


    /**
     * [open_ 打开 sidebar]
     * 
     * @return
     */
    function open_(event) {

        var _this = this;

        if(_this.open) {
            return;
        }
        
        fixedElement.hideFixedLayer(fixedElement._fixedLayer);
        event.preventDefault();

        new Gesture(_this.element, {
            preventY: true
        })

        _this.open = true;
        setStyles(_this.element, {'display': 'block'});

    }


    /**
     * [close_ 关闭 sidebar]
     * 
     * @return
     */
    function close_(event) {

        var _this = this;

        if(!_this.open) {
            return;
        }
        fixedElement.showFixedLayer(fixedElement._fixedLayer);
        event.preventDefault();

        _this.open = false;

        setStyles(_this.element, {'display': 'none'});
        setStyles(document.body, {'overflow': 'auto'});

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
        this.build = render;
    };
    return customElement;
});

require(['mip-lightbox'], function (mipLightbox) {

    MIP.css.mipLightbox = __inline('./mip-lightbox.less');
    
    //注册组件
    MIP.registerMipElement('mip-lightbox', mipLightbox, MIP.css.mipLightbox);
});
