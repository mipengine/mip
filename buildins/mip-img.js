define(['../src/utils/util'], function(util){
    var customElem = require('./customElement');
       var build = function(){
            if(this.isRender){
                return; 
            }
            this.isRender = true;
            var _img = new Image();
            var src = util.urlToCacheUrl (document.location.href, this.getAttribute('src'), 'img');
           
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

            //this.appendChild(_img);
            this.insertBefore(_img, this.firstChild);

        };
    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});
