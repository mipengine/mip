/**
 * @file 下载
 * @author fengchuantao
 * 
 * @time 2016.06.21
 */

define(function() {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    /**
     * build
     */
    function build() {
         var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;
        getallconfig.call(_element)
        BindClose.call(_element)
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
        var downsrc  = $(this).attr(recognition()+"-downsrc");
        var imgsrc = $(this).attr("src");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+ "'";

        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-imgbox'>"+
                    "<img src="+imgsrc+" class='mip-appdl-downimg'>"+
                "</div>"+
                "<div class='mip-appdl-textbox'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downbtn '>"+
                    "<a href="+downsrc+" >"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";

        
        if(downsrc) {
            $(this).append(str)
        }
    }

    /**
     * 单行文本
     */
    function renderNoneImg() {
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr(recognition()+"-downsrc");
        var postiontye = "'mip-appdl-box mip-appdl-pm10 mip-appdl-"+$(this).attr("postiontye")+"'";
        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-textbox'>"+
                    textdom+
                "</div>"+
                "<div class=' mip-appdl-downbtn'>"+
                    "<a target='_blank' href="+downsrc+">"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";

        if(downsrc) {
            $(this).append(str)
        }
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
     * 绑定关闭事件
     */
    function BindClose() {
        $(this).on("click",".mip-appdl-closebutton",function(){
            $(this).parents(".mip-element").remove()
        })
    }

    /**
     * 客户端判断
     */
    function recognition(){
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid?"Android":"Ios"
    }

    /**
     * 初始化
     *
     */
    customElement.prototype.init = function() {
        this.build = build;
    };

    return customElement;

});

require(['mip-appdl'], function (appdl) {
    // 引入组件需要的css文件，选填
    MIP.css.mipAppdl = __inline('./mip-appdl.less');
    //注册组件
    MIP.registerMipElement('mip-appdl', appdl, MIP.css.mipAppdl);
});

