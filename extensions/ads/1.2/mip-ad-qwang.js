/**
 * 全网推荐
 * 
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */


define(function() {

    function render(_this, me) {

        var cpropsid = _this.getAttribute("cpro_psid");
        var cpropswidth = _this.getAttribute("cpro_pswidth") || "auto";
        var cpropsheight = _this.getAttribute("cpro_psheight") || "230";

        var scriptHtml = [
            '<script>',
            '    var cpro_psid ="' + cpropsid + '";',
            '    var cpro_pswidth ="' + cpropswidth + '";',
            '    var cpro_psheight="' + cpropsheight + '";',
            '</script>'
        ].join('');

        var node = document.createElement("div");
        node.innerHTML = scriptHtml;
       
        _this.appendChild(node);
        initJs(node, me);
    }
    

    /**
     * [initJs JS初始化函数]
     * 
     * @return
     */
    function initJs(node, me) {

        var WEBADVISEJS = document.getElementById('MIP_WEBADVISE_JS');

        if(WEBADVISEJS) return;

        var script = document.createElement('script');
        script.src = '//su.bdimg.com/static/dspui/js/um.js';
        script.id = "WEBADVISEJS";

        document.body.appendChild(script);

        script.onload = function(){

            me.applyFillContent(node, true);

        };     
    }

    return {
        render:render
    };

});



