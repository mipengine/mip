/**
 * 全网推荐
 * 
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */


define(function() {
    var customElem = require('customElement');

    function build() {
        if (this.isRender) {
            return;
        }

        this.isRender = true;

        var cpropsid = this.getAttribute("cpro_psid");
        var cpropswidth = this.getAttribute("cpro_pswidth")||"auto";
        var cpropsheight = this.getAttribute("cpro_psheight")||"230";

        var scriptstr = 'var cpro_psid = "' +cpropsid+ '" ;var cpro_pswidth = "'+cpropswidth+ '";var cpro_psheight="' + cpropsheight + '";';
        var ele = document.createElement("script");
        ele.innerHTML = scriptstr;
        this.appendChild(ele)

        initJs();
    }

    /**
     * [initJs JS初始化函数]
     * 
     * @return
     */
    function initJs() {
        var WEBADVISEJS = document.getElementById('MIP_WEBADVISE_JS');
        if(WEBADVISEJS) return;
        var script = document.createElement('script');
        script.src = '//su.bdimg.com/static/dspui/js/um.js';
        script.id = "WEBADVISEJS";
        document.body.appendChild(script);     
    }


    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});

require(['mip-qwang'], function (qwang) {
    MIP.registerMipElement('mip-qwang', qwang);
});


