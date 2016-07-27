/**
* 统计标签
* @exports modulename
* @author shenzhou@baidu.com
* @version 1.0
* @copyright 2015 Baidu.com, Inc. All Rights Reserved
*/
define(function(){
    var customElem = require('customElement');

    function build(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        var src = this.getAttribute('src');
        var host = window.location.href;
        var title = (document.querySelector('title') || {}).innerHTML || '';
        var time = (new Date().getTime());
        src = addParas(src, 't', time);
        src = addParas(src, 'title', encodeURIComponent(title));
        src = addParas(src, 'host', encodeURIComponent(host));
        _img.src= src;
        _img.setAttribute('width',0);
        _img.setAttribute('height',0);
        this.setAttribute('width','');
        this.setAttribute('height','');
        this.appendChild(_img);
    }

    function addParas(src, paraName, paraVal) {
        if (src.indexOf('?'+paraName) > -1 || src.indexOf('&'+paraName) > -1) {
            return src;
        }
        src += src.indexOf('?') > -1 ? '&' : '?';
        return src + paraName + '=' + paraVal;
    }

    customElem.prototype.init = function(){
        this.build = build;
        /*
        *覆盖默认inviewCallBack
        * */
        this.inviewCallback = function(){

        }
        this.mipAttachedCallback = function(){
            this.build();
        }

    };
    return customElem;
});
