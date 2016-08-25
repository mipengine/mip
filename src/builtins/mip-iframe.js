define(function () {
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var build = function () {
    var _element = this.element;
        
    // 防止多次渲染
        if(_element.isRender){
            return; 
        }
        _element.isRender = true;
        
        var $this = $(_element);

        // 获取src属性的值，如果用户传递了srcdoc，则将src内容转为base64编码用于iframe的src
        
        var src = $this.attr('src');
        if ($this.attr('srcdoc')) {
            src = 'data:text/html;charset=utf-8;base64,' + window.btoa($this.attr('srcdoc'));
        }
        var hei = $this.attr('height');
        var wid = $this.attr('width')||"100%";

        if (!src || !wid || !hei) {
            return;
        }

    var ele = [
        '<iframe ',
            'frameBorder="0" ',
            'scrolling="no" ',
            'style="width:' + wid + '; height:' + hei + '">',
        '</iframe>'
    ].join('');

    var $iframe = $(ele);

    this.applyFillContent($iframe[0]);

    $iframe.attr('src', src);
        if ($this.attr('allowfullscreen') === '') {
            $iframe.attr('allowfullscreen', '');
        }
        if ($this.attr('allowtransparency') === 'true') {
            $iframe.attr('allowtransparency', 'true');
        }
        var sandbox = $this.attr('sandbox');
        if (sandbox || sandbox === '') {
            $iframe.attr('sandbox', sandbox);
        }
        $this.append($iframe);
    };

    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;
});
