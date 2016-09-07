/**
 * @accordion
 * @author fengchuantao
 * 
 * @time 2016.08.12
 */

define(function() {
   var $ = require('zepto');
   var customElement = require('customElement').create();
   var localurl = location.href;

    /**
     * build
     */
    function build() {
        var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;
        
        var MIPID = $(_element).attr("sessions-key");
        initDom.call(_element,MIPID);
        bindEven(_element);
    }

    /**
     * initDom
     * 初始化元素
     */
    function initDom(MIPID) {

        var $selection = $(this).find("section");

        $selection.map(function(index, elem) {
            var header = $(elem.children.item(0));
            var headerid = "MIP_"+MIPID+"_content_"+index;
            var nextdom = header.next(); 
            
            header.addClass('mip-accordion-header');
            header.attr("aria-controls", headerid);
            nextdom.addClass('mip-accordion-content');
            nextdom.attr({"id":headerid});
        });

        userselect.call(this,MIPID);
    }

    /**
     * 恢复用户上次选择
     */
    
    function userselect(MIPID) {
         var _this = this;
         var sessionsKey = "MIP-"+MIPID+"-"+localurl;
         var datajson = getsession(sessionsKey);
         
         for(var i in datajson) {
            var expand = datajson[i];
            if(expand) {
                var content = $("#"+i,_this);
                content.attr("aria-expanded","open");
                content.parents("section").attr("expanded","open");
            }
         }
    }

    /**
     * 绑定事件
     */
    function bindEven(_element) {
        var $element = $(_element);
        $element.on("click",".mip-accordion-header",function() {
            var tarid = $(this).attr("aria-controls");
            var $targetdom = $("#"+tarid);
            var expanded =  $targetdom.attr("aria-expanded");

            if(expanded=="open") {
                $targetdom.attr("aria-expanded","close");
                $(this).parents("section").removeAttr("expanded");
                setsession(_element,tarid,false);
            }else {
                $targetdom.attr("aria-expanded","open");
                $(this).parents("section").attr("expanded","open");
                setsession(_element,tarid,true);
            }
        });
    }


    /**
     * 设置session storage
     * 存储
     */
    
    function setsession(ele,tarid,expand) {
        var Key = ele.getAttribute("sessions-key");
        var sessionsKey = "MIP-"+Key+"-"+localurl;
        var objname = tarid;

        var objsession = getsession(sessionsKey);
        objsession[objname] = expand;
        sessionStorage[sessionsKey]  = JSON.stringify(objsession);
        
    }

    /**
     * 获取sission
     */
    
    function getsession(sessionskey) {
        var data = sessionStorage[sessionskey];
        if(data) {
            return JSON.parse(data);
        }else {
            return {};
        }
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

require(['mip-accordion'], function (accordion) {

     // 引入组件需要的css文件，选填
    MIP.css.mipaccordion = __inline('./mip-accordion.less');

    //注册组件
    MIP.registerMipElement('mip-accordion', accordion, MIP.css.mipaccordion);
});

