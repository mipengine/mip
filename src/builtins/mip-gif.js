define(function(){
    var customGif = require('customElement').create();
    function build(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        var ele = this.element;
        var src = ele.getAttribute('src');
        _img.src = src;
        if(ele.getAttribute('width')){
            _img.setAttribute('width', ele.getAttribute('width'));
        }
        if (ele.getAttribute('height')){
            _img.setAttribute('height', ele.getAttribute('height'));
        }
        if (ele.getAttribute('srcset')){
            _img.setAttribute('srcset', ele.getAttribute('srcset'));
        }

        if (ele.getAttribute('sizes')){
            _img.setAttribute('sizes', ele.getAttribute('sizes'));
        }
        ele.appendChild(_img);
        $(_img).on('click',function(){
           var mipGifNode = this.parentNode;
           var src = mipGifNode.getAttribute('src');
           var img  = new Image();
           _this = this;
           img.onload = function(){
                mipGifNode.removeChild(_this);
                mipGifNode.appendChild(this);
                _this = null;
           };
           img.src = src;
        });
    }
    customGif.prototype.init = function(){
        this.build = build; 
    };
    return customGif;

});
