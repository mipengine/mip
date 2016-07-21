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
        var proxy = this.getAttribute("proxy-title");
        var time = (new Date().getTime());
        var _src = "";
        if(proxy) { //如果是要开启代理
            src = _src+"?t="+time+"&"+"title="+proxy+"&host=mip.bdstatic.com&from=baidu";
        }else {
            src = _src+"?t="+time;
        }
        _img.src= src;
        _img.setAttribute('width',0);
        _img.setAttribute('height',0);
        this.setAttribute('width','');
        this.setAttribute('height','');
        this.appendChild(_img);
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
