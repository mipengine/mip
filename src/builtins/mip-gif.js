define(function(){
    var customGif = require('customElement');
   function build(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        var src = this.getAttribute('src');
        _img.src = src;
        if(this.getAttribute('width')){
            _img.setAttribute('width',this.getAttribute('width'));
        }
        if(this.getAttribute('height')){
            _img.setAttribute('height',this.getAttribute('height'));
        }
        if(this.getAttribute('srcset')){
            _img.setAttribute('srcset',this.getAttribute('srcset'));
        }

        if(this.getAttribute('sizes')){
            _img.setAttribute('sizes',this.getAttribute('sizes'));
        }
        this.appendChild(_img);
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
