/**
 * @file anim组件
 * @author fengchuantao
 * @time 2016.8.20
 */

define(function() {

    var $ = require('zepto');
    var customElement = require('customElement').create();


    function build() {
        var _element = this.element;
        var g_this = this;
        if (_element.isRender) {
            return;
        }
        _element.isRender = true;

        //手动触发layout
        $(_element).find("mip-img").map(function(i,ele) {
            if(ele.tagName.toLocaleLowerCase()== "mip-img") {
                g_this.applyFillContent(ele, true);       
            }
        });  
        createdom.call(_element);
    }

    function createdom() {
        var _this = this;
        var placeholderlen = $(_this).find('mip-img').length;
        var src = _this.getAttribute('src');
        var alt = _this.getAttribute('alt')||"";

        if(placeholderlen!==0) {

            var _promise = promisegif({"src":src,"alt":alt});
            _promise.then(function(imageobj){
                $(_this).find('mip-img').css("display","none");
                $(_this).append(imageobj);
            });

        }else {
            var str = '<img src="'+src+'" alt="'+alt+'""></img>';
            $(_this).append(str);
        }
    }

    function promisegif(data) {
        var _promise = new Promise(function(resolve,reject) {
            var images = document.createElement("img");
            images.src = data.src;
            images.alt = data.alt;
            images.style.cssText = "position: absolute;top: 0px;left: 0px";
            images.onload = function() {
                resolve(images);
            };
        });
        return _promise;
    }

    customElement.prototype.init = function() {
        this.build = build;
    };

    return customElement;

});

require(['mip-anim'], function (anim) {
    MIP.registerMipElement('mip-anim', anim);
});

