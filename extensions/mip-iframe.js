define(function () {
    var customElem = require('buildins/customElement');
    var build = function () {
        // 防止多次渲染
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var $this = $(this);
        // 获取src属性的值，如果用户传递了srcdoc，则将src内容转为base64编码用于iframe的src
        var src = $this.attr('src');
        if ($this.attr('srcdoc')) {
            src = 'data:text/html;charset=utf-8;base64,' + window.btoa($this.attr('srcdoc'));
        }
        var hei = $this.attr('height');
        var wid = $this.attr('width');

        if (!src || !wid || !hei) {
            return;
        }

        if (hei && wid && typeof +hei === 'number' && typeof +wid === 'number') {
            // padding-bottom
            var pdb = +hei / +wid * 100 + '%';
            $this.append('<div style="padding-bottom: ' + pdb + ';"></div>');
        }
        var $iframe = $('<iframe frameBorder="0" scrolling="no"></iframe>');
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
