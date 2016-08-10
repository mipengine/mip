/**
 * @file form组件
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

        var vali = validateDom.call(this);

        if(vali) {
             domcrete.call(this);
        }

        //验证规则暂定三个
        var valita = {
          email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          phone: /^1[3|4|5|7|8]\d{9}$/,
          idcar: /^\d{15}|\d{18}$/
        };

        function validatefn(type, data) {
          if(type == "must") {
            return data == "" ? false : true;
          }
          var reg = valita[type];
          return reg.test(data);
        }


        //过滤password与input标签
        function validateDom () {
            var passwordlen = $(this).find('input[type|="password"]').length > 0 ? false : true;
            var filelen = $(this).find('input[type|="file"]').length ? false : true;
            if(!passwordlen || !filelen) {
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
            domHandle.call(this);
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
                         var reg = value == ""? false : regtest.test(value);
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
               if(len !== 0) { //验证未全部通过
                 event.preventDefault();
               }
            })
        }
    }

    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});

require(['mip-form'], function (form) {
    MIP.registerMipElement('mip-form', form);
});

