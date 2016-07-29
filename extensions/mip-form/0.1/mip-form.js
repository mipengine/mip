/**
 * @file form
 * @author fengchuantao
 * 
 * @time 2016.06.28
 */

require.config({
    paths: {
        "extensions/mip-form/0.1/mip-form-validate": "http://127.0.0.1:8056/dist/extensions/mip-form/0.1/mip-form-validate"
    }
});


define(function() {
    var customElem = require('customElement');
    var validatefn = require("extensions/mip-form/0.1/mip-form-validate")
    /**
     * build
     */
    function build() {
        if (this.isRender) {
            return;
        }
        this.isRender = true;
        $this = $(this);

        var vali = validateDom.call(this)

        if(vali) {
             domcrete.call(this)
        }

        //过滤password与input标签
        function validateDom () {
            var passwordlen = $(this).find('input[type|="password"]').length>0?false:true;
            var filelen = $(this).find('input[type|="file"]').length?false:true;
            if(!passwordlen||!filelen) {
                console.log("禁止使用password与file输入框");
                return false;
            }
            return true;
        }

        //生成dom
        function domcrete() {
            var url = this.getAttribute("url");
            var method = this.getAttribute("method");
            var formdom = $("<form url="+url+" method="+method+" target='_blank'></form>");
            formdom.append($(this).html());
            $(this).html(formdom);
            domHandle.call(this)
        }

        //提交前验证
        function domHandle() {
            $(this).find('form').on("submit",function(event) {
               var _parent = this;
               var allinput = $(this).find('input[type!="submit"]');
               var len = 0;
               allinput.map(function(index,data){
                  var validatetatget = data.getAttribute("validatetarget");
                  var validatetype = data.getAttribute("validatetype");
                  var value = data.value;
                  var validatereg = data.getAttribute("validatereg");

                  if(validatetype) {
                      //验证自定义属性
                      if(validatereg) {
                         var regtest = new RegExp(validatereg);
                         console.log(regtest)
                         var reg = regtest.test(value);
                      }else {
                         var reg = validatefn(validatetype,value);
                      }
                     
                      if(!reg) {
                          $(_parent).find("div[target="+validatetatget+"]").css("display","block");
                          len +=1;
                      }else  {
                          $(_parent).find("div[target="+validatetatget+"]").css("display","none");
                      }
                  }
               })
               if(len!==0) { //验证未全部通过
                 event.preventDefault();
               }
            })
        }
    }

    /**
     * 初始化
     */
    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});

require(['mip-form'], function (form) {

    //注册组件
    MIP.registerMipElement('mip-form', form);
});

