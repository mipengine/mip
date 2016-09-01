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
        var cpropswidth = _this.getAttribute("cpro_pswidth")||"auto";
        var cpropsheight = _this.getAttribute("cpro_psheight")||"230";

        var scriptstr = 'var cpro_psid = "' +cpropsid+ '" ;var cpro_pswidth = "'+cpropswidth+ '";var cpro_psheight="' + cpropsheight + '";';
        var ele = document.createElement("script");
        ele.innerHTML = scriptstr;
       
        _this.appendChild(ele);
        initJs(me);
    }

    /**
     * [initJs JS初始化函数]
     * 
     * @return
     */
    function initJs(me) {
        var WEBADVISEJS = document.getElementById('MIP_WEBADVISE_JS');
        if(WEBADVISEJS) return;
        
        var script = document.createElement('script');
        script.src = '//su.bdimg.com/static/dspui/js/um.js';
        script.id = "WEBADVISEJS";
        
        document.body.appendChild(script);

        script.onload = function(){

            var children = script.parentNode.childNodes;

            children.forEach(function(parent){
                if(parent.nodeName === 'MIP-AD' || parent.nodeName === 'MIP-EMBED') {

                    parent.childNodes.forEach(function(node) {

                        if(node.nodeType == 1 && node.nodeName !== 'MIP-I-SPACE' && node.nodeName !== 'SCRIPT') {
                            me.applyFillContent(node, true);
                        }
                        
                    });
                }
            });
        };     
    }

    return {
        render:render
    };

});



