/**
 * 广告扩展组件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
define(function(){
    
    var render = function(_this, me) {

        var self = _this;
        var domain = self.getAttribute('domain');
        var token = self.getAttribute('token');

        if(domain && token) {

            var script = document.createElement('script');
            script.src = document.location.protocol + domain + token + '.js';
            document.body.appendChild(script);

        } else {
            console.error('请输入正确的 domain 或者 token');
        }
    };

    return {
        render: render
    }
});


