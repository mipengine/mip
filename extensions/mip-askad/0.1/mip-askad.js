/**
 * @file 120ask广告组件
 * @author fengchuantao
 * @time 2016.7.28
 */

define(function() {
    var customElem = require('customElement');

    function build() {

        if (this.isRender) {
            return;
        }
        this.isRender = true;

        var _this = this;
        var  params = this.getAttribute("paramsid") || "";
        var  otherparamkey = this.getAttribute("otherparamkey") || "0";
        var  otherparamvalue = this.getAttribute("otherparamvalue") || "";
        var callbackconfig = this.getAttribute("cboptions") || [] ;

        //回调配置序列化
        var callbackdata = [];
        if (callbackconfig) {
            try {
                callbackdata = new Function('return ' + callbackconfig)()
            } catch (e) {}
        }


        //根据页面获取推荐内容
        var $title = $(".g-under-ask h1");
        var $dse = $(".g-under-ask .crazy_keyword_inlink");
        
        if($title.length == 0 || $dse.length == 0) {
            var content = "";
        }else {
            var content = $title.html() +" "+ $dse.html().slice(0,30);
        }
        
        innerJs(content,function(){
            getadDate(params,Number(otherparamkey),otherparamvalue.toString(),callbackdata,_this)
        })
    }

    /**
     * 加载120ask网站js
     */
    function innerJs(content,callback) {

        var allurl = ["https://ip.120ask.com/lt?js=m.120ask.com&r=1470735643","https://scws.120ask.com/scws?t=js&content="+content,"a.js"];
        var calbacklen = 3;

        for(var i = 0; i< allurl.length; i++) {

            var script = document.createElement("script");
            
            if($("#MIP-ASK-AD"+i).length > 0) {
                $("#MIP-ASK-AD"+i).remove();
            }

            script.id = "MIP-ASK-AD"+i;
            script.src = allurl[i];

            var firstChild = document.head.firstChild;
            document.head.insertBefore(script,firstChild);

            script.onload = function() {
                if(calbacklen == 1) {
                    callback()
                }
                calbacklen  = calbacklen - 1;
            }
        }
    }

    /**
     * 执行ask网站js获取广告数据
     */
    function getadDate(params,otherparamkey,otherparamvalue,callbackdata,layout) {

        //重写YWBD原型方法以实现标签替换
        YWBD.prototype.YWBD_WRITE =  function(backdata) {
            var code = backdata.code;
            code = code.replace(/<img/gi,'<mip-img'); //替换img为mip-img标签
            $(layout).append(code);

            if(callbackdata&&callbackdata.length != 0 ) {
                renderCallback(callbackdata)
            }

        }

        //以下为广告投放原始代码
        var smallad = new YWBD();
        smallad.YWBD_SET_PARAMS('Id', params);
        smallad.YWBD_SET_OTHER_PARAM(otherparamkey, otherparamvalue);
        smallad.YWBD_SET_AREA_PARAMS();
        smallad.YWBD_SET_LOG();
        smallad.YWBD_AD_AJAX($(layout));
    }

    /**
     * https环境下修正日志链接
     */
    function replaceUrl() {
        if(location.href.indexOf('https') == 0) {
            if(YWBD_LOG_URL.indexOf("eclick.120ask.com/lualog") >= 0) {

                YWBD_LOG_URL = "//eclick.120ask.com/lualog";

            }else if(YWBD_LOG_URL.indexOf("scws.120ask.com") >= 0) {

                YWBD_LOG_URL = "//gss2.bdstatic.com/5bUVf8T-RdYFkdTgoY3K";

            }else if (YWBD_LOG_URL.indexOf("cdn.120askimages.com") >= 0) {

                YWBD_LOG_URL = "//gss2.bdstatic.com/9bA1smf7RAUTmdKfo9eSBHF6hhy";
            }
        }
    }

    /**
     * 渲染回调
     */
    function renderCallback(callbackdata) {
        for(var i = 0; i<callbackdata.length; i++ ) {
            if(callbackdata[i].type == "show") {
                showdom(callbackdata[i].target)
            }else if(callbackdata[i].type == "hide") {
                hidedom(callbackdata[i].target)
            }else if(callbackdata[i].type == "remove") {
                removedom(callbackdata[i].target)
            }
        }
    }

    /**
     * 删除节点
     */
    
    function removedom(obj) {
        $(obj).remove();
    }

    /**
     * 显示节点
     */
    
    function showdom(obj) {
        $(obj).show();
    }

    /**
     * 隐藏节点
     */
    function hidedom(obj) {
        $(obj).hide();
    }
    
    
        

    customElem.prototype.init = function() {
        replaceUrl();
        this.build = build;
    };

    return customElem;

});

require(['mip-askad'], function (askad) {
    MIP.registerMipElement('mip-askad', askad);
});

