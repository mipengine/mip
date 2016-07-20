__inline('src/miphtml_base.js');

__inline('extensions/olympic/util.js');
__inline('extensions/olympic/mip-link.js');
__inline('extensions/olympic/clipboard.js');
__inline('extensions/olympic/share/aio.js');
__inline('extensions/olympic/share/detect.js');
__inline('extensions/olympic/share/share.js');
__inline('extensions/olympic/share.js');
__inline('extensions/olympic/mip-share.js');
__inline('extensions/olympic/recommend.js');
__inline('extensions/olympic/mip-recommend.js');
__inline('extensions/olympic/mip-sina-tongji.js');
__inline('extensions/olympic/mip-netease-tongji.js');


require(['mip'], function () {

    var regME = MIP.registerMipElement;

    /*
     * 注册mip-link组件
     */
    require(['extensions/olympic/mip-link'], regME.bind(this, 'mip-link'));

    /*
     * 注册mip-share 组件
     */
    require(['extensions/olympic/mip-share'], regME.bind(this, 'mip-share'));

    /*
     * 注册mip-recommend 组件
     */
    require(['extensions/olympic/mip-recommend'], regME.bind(this, 'mip-recommend'));

    /*
     * 注册mip-sina-tongji 组件
     */
    require(['extensions/olympic/mip-sina-tongji'], regME.bind(this, 'mip-sina-tongji'));

    /*
     * 注册mip-netease-tongji 组件
     */
    require(['extensions/olympic/mip-netease-tongji'], regME.bind(this, 'mip-netease-tongji'));

});
