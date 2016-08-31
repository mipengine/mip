/**
 * @file 菜单 mip-mipengine-nav
 * @author liangjiaying
 * @time 2016.07
 */
define(function (){
    var customElem = require('customElement').create();

    function sidebarFun (me) {
        initNavWise(); /*初始化导航 高度 class*/
        render(me); /*渲染DOM*/
        bindEvents(me); /*绑定事件*/
        showNavBar(me);
    }

    /*渲染dom*/
    function render(me) {
        var $this = $(me),
            id = $this.data('id'),
            navClass= $this.data('nav-class'),
            brandimg = $this.data('brandimg'),
            brandclass = $this.data('brandclass'),
            $ulNav = $this.find('#' + id),
            $container = $('<div class="container"></div>');
        
        var $btnWrap = '<div class="navbar-header">' + 
                '<button class="navbar-toggle collapsed" type="button" data-target="#' + id + '" aria-controls="' + id + '" aria-expanded="false">' +
                    '<span class="sr-only">导航</span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                    '<span class="icon-bar"></span>' +
                '</button>' +
                '<a href="/" class="navbar-brand">' +
                    '<img src="' + brandimg + '" class="' + brandclass + '">' +
                '</a>' +
            '</div>';
        $container.append($btnWrap).append($ulNav).appendTo($this);
        $('.mip-nav-wrapper').addClass('show');
    }

    /*绑定事件*/
    function bindEvents(me) {
        var body_class = $('body').attr('class');
        $('#bs-navbar').find('.' + body_class).addClass('active');

        $(document).on('click', '.navbar-header .navbar-toggle', navClickHandler);


        $('#bs-navbar .navbar-nav li').on('click', function() {
            $('.navbar-header .navbar-toggle').trigger('click');
        })
        // 主菜单关闭按钮 touchstart touchend mousedown mouseup变色
        addHoverClass($('#navbar-wise-close-btn'));
        $('#navbar-wise-close-btn').on('touchend', function(e){
            $('.navbar-header .navbar-toggle').trigger('click');
            e.preventDefault();
            e.stopPropagation();
        }).on('click', function(){
            $('.navbar-header .navbar-toggle').trigger('click');
        });
    }

    function initNavWise() {
        $('#bs-navbar').css({
            'transition' : 'height 0.3s',
            'height' : '0px'
        });
    }

    /* 展开关闭菜单效果 */
    function navClickHandler(e) {
        if(window.innerWidth > 767) return;
        var $wiseNav = $('#bs-navbar');

        if($wiseNav.hasClass('in')) {
            // 关闭菜单
            $wiseNav.height('0px');
            $('body').css('overflow', 'scroll');
            $('.navbar-wise-close').css('margin-top', '20px');
            $(window).off('orientationchange');
            $('html').add($('body')).removeClass('noscroll');
            setTimeout(function() {
                $wiseNav.removeClass('in');
            }, 500);
        } else {
            /* 打开主菜单 */
            var $wiseNav = $('#bs-navbar');
            var closeBtnTop = 20;

            $('html').add($('body')).addClass('noscroll');
            setNavHeight('open');

            $(window).on('orientationchange', function() {
                window.setTimeout(function() { // hack: orientationchange 取window高度不及时
                    setNavHeight('resize');
                }, 100)
            }).on('resize', function() {
                setNavHeight('resize');
            });
             function setNavHeight(mode) {
                if(mode == 'open') {
                    $wiseNav.addClass('in')
                }
                if(mode == 'resize' && $wiseNav.hasClass('in') || mode == 'open') {
                    $wiseNav.height(window.innerHeight - $('.navbar-header').height());
                    closeBtnTop = window.innerHeight - 50 - ($('.navbar-right .index-body').height()+20) * 4 - 90;
                    if(closeBtnTop > 20) {
                        $('.navbar-wise-close').css('margin-top', closeBtnTop + 'px')
                    } else {
                        $('.navbar-wise-close').css('margin-top', '20px')
                    }
                }
            }
        }
    }

    function addHoverClass($dom) {
        $dom.on('touchstart', function() {
            // 按钮按下时，改变颜色
            $(this).addClass('down');
        }).on('mousedown', function() {
            // 鼠标按下时，改变颜色
            $(this).addClass('down');
        }).on('touchend', function() {
            // 按钮抬起时，改变颜色*2，收起菜单
            $(this).removeClass('down');
        }).on('mouseup', function() {
            // 鼠标抬起时，改变颜色*2，收起菜单
            $(this).removeClass('down');
        });
    }

    function showNavBar(me) {
        var $this = $(me);
        $this.removeAttr('style');
    }

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function() {
        var element = this.element;
        sidebarFun (element);
    };
    return customElem;
});
require(['mip-mipengine-nav'], function (nav) {
    // 引入组件需要的css文件，选填
    MIP.css.mipMipengineNav += __inline('./mip-mipengine-nav.less');

    //注册组件
    MIP.registerMipElement('mip-mipengine-nav', nav, MIP.css.mipMipengineNav);
});