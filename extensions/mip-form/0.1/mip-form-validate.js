/**
 * @file form 验证
 * @author fengchuantao
 * 
 * @time 2016.06.28
 */

define(function() {
    
    //验证规则暂定三个
    var valita = {
    	email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
    	phone: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
    	idcar: /^\d{15}|\d{18}$/
    }

    function validatefn(type,data) {
    	if(type=="must") {
    		return data==""?false:true
    	}
    	var reg = valita[type];
    	return reg.test(data)
    }
    return validatefn;
});

