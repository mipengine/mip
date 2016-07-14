/**
* 网盟插件
* @exports modulename
* @author fengchuantao@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/
define(function(){
    var customElem = require('buildins/customElement');
    function render() {
        if (this.isRender) {
            return;
        }
        this.isRender = true;
        var $elemib = $(this);
        var cproid = $elemib.data("cproid");
        if(!cproid) {
            return;
        }
        initJs();
        initadbaidu($elemib,cproid)
    }

    function initJs() {
        var MIPDUPJS = document.getElementById('MIP_DUP_JS');
        if(MIPDUPJS) return;

        var script = document.createElement('script');
        script.src = '//dup.baidustatic.com/js/dm.js';
        script.id = "MIP_DUP_JS";
        document.body.appendChild(script);     
    }

    function initadbaidu($elemib,cproid) {
        var s = "_" + Math.random().toString(36).slice(2);
        var html = '<div style="" id="' + s + '"></div>';
        $elemib.append(html);

        (window.slotbydup=window.slotbydup || []).push({
            id: cproid,
            container: s,
            display: 'inlay-fix',
            async: true
        });
    }

    customElem.prototype.init = function() {
        this.build = render;
    };

    return customElem;

});

