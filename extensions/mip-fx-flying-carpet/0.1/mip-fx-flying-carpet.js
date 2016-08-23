/**
 * @file 组件mip-fx-flying-carpet
 * @author lilangbo
 * @time 2016.08.02
 */

define(function (){
    var customElem = require('customElement');
    /**
     * buildCallback
     *
     * @param  {Event} e event
     */
    function buildCallback (e) {
        if (this.isRender) {
            return;
        }
        this.isRender = true;
        var container = document.createElement('div');
        var wapper = document.createElement('div');

        wapper.setAttribute('class', 'mip-fx-flying-carpet-wapper');
        container.setAttribute('class', 'mip-fx-flying-carpet-container');
        wapper.appendChild(container);
        this.appendChild(wapper); 
        container.appendChild(this.childNodes[1]);  

    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        //如果在build里面定义渲染,用户在可视区域内，才会渲染
        this.build = buildCallback;
    };
    return customElem;
});
require(['mip-fx-flying-carpet'], function (carpet) {
    // 引入组件需要的css文件，选填
    MIP.css.flyCarpet = __inline('./mip-fx-flying-carpet.less');
    //注册组件
    MIP.registerMipElement('mip-fx-flying-carpet', carpet, MIP.css.flyCarpet);
});

