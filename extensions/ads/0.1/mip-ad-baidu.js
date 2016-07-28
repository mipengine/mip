/**
 * 网盟插件
 * 
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function(){
    
    var render = function(_this) {
        // if (this.isRender) {
        //     return;
        // }
        // this.isRender = true;
        // 
        var $this = $(_this);
        var cproID = _this.getAttribute("cproid");
        if(!cproID) {
            return;
        }
        
        initJs();
        initadbaidu($this, cproID);
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
    }

    /**
     * [initadbaidu 广告组件初始化]
     * 
     * @param  {Object} $elemID mip对象
     * @param  {String} cproID  广告id
     * @return
     */
    function initadbaidu($elemID, cproID) {

        var s = "_" + Math.random().toString(36).slice(2);
        var html = '<div style="" id="' + s + '"></div>';
        $elemID.append(html);

        (window.slotbydup=window.slotbydup || []).push({
            id: cproID,
            container: s,
            display: 'inlay-fix',
            async: true
        });
    }

    return {
        render: render
    }
});


