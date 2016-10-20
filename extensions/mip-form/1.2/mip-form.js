/**
 * @file form组件
 * @author fengchuantao
 * @time 2016.7.28
 */

define(function() {
    var $ = require('zepto');
    var customElement = require('customElement').create();

    function build() {
        var _element = this.element;
        if (_element.isRender) {
            return;
        }
        _element.isRender = true;

        var vali = validateDom.call(_element);

        if(vali) {
             domcrete.call(_element);
        }

        var isAddClearBtn = _element.getAttribute('clear');
        
        if(isAddClearBtn) {
          const INPUTS = _element.querySelectorAll('input[type=input]');
          var index = 0;
          var cross = document.createElement("div");
          cross.id = 'mip-form-cross';

          for(index = 0; index < INPUTS.length; index ++) {
              INPUTS[index].onfocus = function() {
                var self = this;
                cross.setAttribute("name", self.getAttribute('name'));
                cross.style.top = self.offsetTop + 'px';
                self.parentNode.appendChild(cross);
                if(self.value != '') {
                    cross.style.display = 'block';
                    
                } else {
                    cross.style.display = 'none';
                    self.oninput = function() {
                      cross.style.display = self.value != '' ? 'block' : 'none';
                    }
                }
              }
          }

          cross.addEventListener('click', function() {
              var name = this.getAttribute('name');
              cross.parentNode.querySelector('input[name="' + name + '"]').value = '';
              cross.style.display = 'none';
          });
        }
        

        //验证规则暂定三个
        var valita = {
          email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
          phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|17[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
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
            var formdom = $("<form action="+url+" method="+method+" target='_blank'></form>");
            formdom.append($(this).html());
            $(this).html(formdom);
            domHandle.call(this);
        }

        //提交前验证
        function domHandle() {
            $(this).find('form').on("submit",function(event) {
               
               var cross = $(this).find('#mip-form-cross');
               cross.css('display','none');

               var _parent = this;
               var allinput = $(this).find('input');
               var len = 0;
               allinput.map(function(index,data){
                  if ($(data).attr("type")=="submit") {
                    return ;
                  }
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

    customElement.prototype.init = function() {
        this.build = build;
    };

    return customElement;

});

require(['mip-form'], function (form) {

    MIP.css.mipForm = __inline('./mip-form.less');

    MIP.registerMipElement('mip-form', form, MIP.css.mipForm);
});

