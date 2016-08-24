/**
 * @file 文档导航 docmenu
 * @author liangjiaying
 * @time 2016.08
 */

define(function (){
    __inline("./dep/bootstrap.min.js");
    __inline("./dep/metisMenu.min.js");
    
    var customElem = require('customElement');

    function main(e) {
        var me = this;
        if (this.isRender) {
            return;
        }
        me.isRender = true;

        var firstDoc = $(me).data('default-doc'); //文档默认地址

        var curentPath = "";

        $('#side-menu').metisMenu();
        //设置默认右侧菜单
        var url = window.location;
        // var hash = location.hash;
        // if(hash == '') window.location = url = url + '#' + firstDoc;

        var element = $('#sidebar-container a').filter(function() {
            return this.href == url;
        }).addClass('active');
        var parentUl = element.parents('ul').filter(function(){
            if($(this).attr('data-level')){
                $(this).addClass('in');
                $(this).parent().addClass('active');
            }
        });
        
        // wise自动折叠菜单
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        // hack 防止mip组件加载前后样式闪动
        window.setTimeout(function() {
            $('.mip-element-docmenu').addClass('show');
        }, 10);

        //Loads the correct sidebar on window load,
        //collapses the sidebar on window resize.
        // Sets the min-height of #page-wrapper to window size
        $(window).bind("load resize", function() {
            var topOffset = 50;
            var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
            /*移动端导航折叠 pc端导航展开*/
            if (width < 768) {
                $('div.navbar-collapse').addClass('collapse');
                topOffset = 100; // 2-row-menu
            } else {
                $('div.navbar-collapse').removeClass('collapse');
            }

            var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height) + "px");
            }
        });
    };

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        //如果在build里面定义渲染,用户在可视区域内，才会渲染
        this.build = main;

    };
    return customElem;
});
require(['mip-mipengine-docmenu'], function (docmenu) {
    // 引入组件需要的css文件，选填123
    MIP.css.mipMipengineDocmenu += __inline('./dep/css/metisMenu.css');
    MIP.css.mipMipengineDocmenu += __inline('./mip-mipengine-docmenu.less');
    //注册组件
    MIP.registerMipElement('mip-mipengine-docmenu', docmenu, MIP.css.mipMipengineDocmenu);
});


