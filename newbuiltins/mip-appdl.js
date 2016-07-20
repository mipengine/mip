/**
 * @file 下载
 * @author fengchuantao
 * 
 * @time 2016.06.21
 */

define(function() {
    var customElem = require('customElement');
    /**
     * build
     */
    function build() {
        if (this.isRender) {
            return;
        }

        this.isRender = true;
        getallconfig.call(this)
    }

    function getallconfig() {
       var tpl = this.getAttribute('tpl');

       switch(tpl) {
            case 'imageText':
                renderHaveImg.call(this);
                break;
            case 'noneImg':
                renderNoneImg.call(this);
                break;
        }
    }


    /**
     * 图文存在
     */
    function renderHaveImg() {
        var textdom = buildtextdom.call(this);
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr("downsrc");
        var imgsrc = $(this).attr("imgsrc");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+ "'";

        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-contentcell'>"+
                    "<img src="+imgsrc+" class='mip-appdl-downimg'>"+
                "</div>"+
                "<div class='mip-appdl-textbox mip-appdl-contentcell'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downloadbbutton mip-appdl-contentcell'>"+
                    "<a herf="+downsrc+">"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";
        console.log(str)
        $(this).append(str)
    }

    /**
     * 单行文本
     */
    function renderNoneImg() {
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr("downsrc");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+"'";


        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-textbox mip-appdl-contentcell'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downloadbbutton mip-appdl-contentcell'>"+
                    "<a herf="+downsrc+">"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";

        $(this).append(str)
    }

    /**
     * 组装文本行
     */
    function buildtextdom() {
        var textarray = $(this).attr("texttip");
        var tarray = [];
        if (textarray) {
            try {
                tarray = new Function('return ' + textarray)();
            } catch (e) {}
        }
        var domstr = "<div class='mip-appdl-text'>";
        var length = tarray>2 ? 2:tarray.length;

        for(var i=0;i<length;i++) { //限定最大行数两行
            domstr+="<p>"+tarray[i]+"</p>";
        }
        return domstr+"</div>";
    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});
