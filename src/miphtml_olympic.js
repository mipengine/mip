__inline('./miphtml_base.js');

__inline('../extensions/olympic/util.js');
__inline('../extensions/olympic/mip-link.js');
__inline('../extensions/olympic/clipboard.js');
__inline('../extensions/olympic/share.js');
__inline('../extensions/olympic/mip-share.js');
__inline('../extensions/olympic/recommend.js');
__inline('../extensions/olympic/mip-recommend.js');

require(['mip'], function () {

    var regME = window.registerMipElement;

    /*
     * 注册mip-link组件
     */
    require(['olympic/mip-link'], regME.bind(this, 'mip-link'));

    /*
     * 注册mip-share 组件
     */
    require(['olympic/mip-share'], regME.bind(this, 'mip-share'));

    /*
     * 注册mip-recommend 组件
     */
    require(['olympic/mip-recommend'], regME.bind(this, 'mip-recommend'));

});
