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
     * render
     *
     */
    function render () {

        var _this = this;
        if (_this.element.isRender) {
            return;
        }

        _this.element.isRender = true;
        _this.maskElement = false;
        _this.side_ = _this.element.getAttribute('side');
        _this.ANIMATION_TIMEOUT = 100; 

        if(_this.side_ != 'left' && _this.side_ != 'right') {
            _this.side_ = 'left';
            _this.element.setAttribute('side', _this.side_);
        }

        if(isOpen_.call(_this)) {
            open_.call(_this);
        } else {
            _this.element.setAttribute('aria-hidden', 'true');
        }


        document.addEventListener('keydown', function(evt) {
            if(evt.keyCode == 27) {
                close_.call(_this);
            }
        }, false);

        _this.addActionEvent('toggle', function() {
            toggle_.call(_this);
        });
        _this.addActionEvent('open', function() {open_.call(_this);});
        _this.addActionEvent('close', function() {close_.call(_this);})

    }


    /**
     * [isOpen_ sidebar 状态判断]
     * 
     * @return
     */
    function isOpen_() {

        return this.element.hasAttribute('open');

    }


    /**
     * [toggle_ 打开或关闭 sidebar 入口]
     * 
     * @return {[type]}
     */
    function toggle_() {

        isOpen_.call(this) ? close_.call(this) : open_.call(this);

    }


    /**
     * [open_ 打开 sidebar]
     * 
     * @return
     */
    function open_() {

        var _this = this;

        if(isOpen_.call(this)) { 
            return; 
        }

        setStyles(_this.element, {'display': 'block'});
        openMask_.call(_this);

        /* 动画效果 */
        var openTimer = setTimeout(function() {

            _this.element.setAttribute('open', '');
            _this.element.setAttribute('aria-hidden', 'false');
            clearTimeout(openTimer);

        }, _this.ANIMATION_TIMEOUT);

    }


    /**
     * [close_ 关闭 sidebar]
     * 
     * @return
     */
    function close_() {

        var _this = this;

        _this.element.removeAttribute('open');
        _this.element.setAttribute('aria-hidden', 'true');

        closeMask_.call(_this);

        /* 动画效果 */
        var closeTimer = setTimeout(function() {

            setStyles(_this.element, {'display': 'none'});
            clearTimeout(closeTimer);

        }, _this.ANIMATION_TIMEOUT);

    }


    /**
     * [openMask_ 打开遮盖层]
     * 
     * @return
     */
    function openMask_() {
        
        var _this = this;

        /* 不存在遮盖层时先创建 */
        if(!_this.maskElement) {

            const mask = document.createElement('div');
            mask.id = 'MIP-SIDEBAR-MASK';
            mask.setAttribute('on', 'tap:sidebar.close');
            mask.style.display = 'block';

            /* 与mip-sidebar 同级dom */
            _this.element.parentNode.appendChild(mask);
            mask.addEventListener('touchmove', function(evt) {
                e.preventDefault();
            }, false);

            _this.maskElement = mask;

        }

        /* 样式设置 */
        setStyles(_this.element.parentNode, {'overflow': 'hidden'});
        setStyles(_this.maskElement, {'display': 'block'});

    }


    /**
     * [closeMask_ 关闭遮盖层]
     * 
     * @return
     */
    function closeMask_() {
        if(this.maskElement) {
            setStyles(this.element.parentNode, {'overflow': 'auto'});
            setStyles(this.maskElement, {'display': 'none'});
        }
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

    function print(data) {
        console.log(data);
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

require(['mip-sidebar'], function (mipSidebar) {
    
    // 引入组件需要的css文件，选填
    MIP.css.mipSidebar = __inline('./mip-sidebar.less');
    
    //注册组件
    MIP.registerMipElement('mip-sidebar', mipSidebar, MIP.css.mipSidebar);
});
