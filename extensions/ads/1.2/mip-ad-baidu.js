/**
 * 网盟插件
 * 
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function(){
    var $ = require('zepto');
    
    var render = function(_this, me) {

        var $this = $(_this);
        var cproID = _this.getAttribute("cproid");
        if(!cproID) {
            return;
        }
        // 定制化 特殊处理
        var elem = _this.querySelector('script') || null; 

        if(elem) {

            if(isJsonScriptTag(elem)) {

                var obj = JSON.parse(elem.textContent.toString());

                (window["cproStyleApi"]=window["cproStyleApi"] || {})[cproID] = obj;

            }

        }
        
        var script = initJs();
        initadbaidu($this, cproID, me, script);
    };

    /**
     * [initJs JS初始化函数]
     * 
     * @return
     */
    function initJs() {
        var MIPDUPJS = document.getElementById('MIP_DUP_JS');
        if(MIPDUPJS) return;

        var script = document.createElement('script');
        script.src = '//dup.baidustatic.com/js/dm.js';
        script.id = "MIP_DUP_JS";
        document.body.appendChild(script);  

        return script;

    }

    /**
     * [initadbaidu 广告组件初始化]
     * 
     * @param  {Object} $elemID mip对象
     * @param  {String} cproID  广告id
     * @return
     */
    function initadbaidu($elemID, cproID, me, script) {

        var s = "_" + Math.random().toString(36).slice(2);
        var html = '<div style="" id="' + s + '"></div>';
        $elemID.append(html);

        (window.slotbydup=window.slotbydup || []).push({
            id: cproID,
            container: s,
            display: 'inlay-fix',
            async: true
        });

        script.onload = function() {
            console.log('onload');
            setTimeout(function() {
                var pos = window.getComputedStyle(document.getElementById(s), null)
                        .getPropertyValue('position');

                console.log(pos);
                if(pos == 'fixed') {
                    $elemID.append(document.getElementById(s));
                }
            }, 100);
            
        };

        me.applyFillContent(document.getElementById(s), true);

    }


    /**
     * [isJsonScriptTag 判断是否是定制化script标签]
     * 
     * @param  {Object}  element 节点对象
     * @return {Boolean} 
     */
    function isJsonScriptTag(element){

        return element.tagName == 'SCRIPT' && 

               element.getAttribute('type') &&

               element.getAttribute('type').toUpperCase() == 'APPLICATION/JSON';

    }


    return {
        render: render
    }
});


