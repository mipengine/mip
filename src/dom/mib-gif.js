define(function(){
    var customGif = require('dom/customElement');
   function build(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        var src = this.getAttribute('framesrc');
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
           var mibGifNode = this.parentNode;
           var src = mibGifNode.getAttribute('src');
           var img  = new Image();
           _this = this;
           img.onload = function(){
                mibGifNode.removeChild(_this);
                mibGifNode.appendChild(this);
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
