/**
 * @file 回顶gototop
 * 
 * @author wangpei07
 * @time 2016.08.09
 */

define(function() {
    var $ = require('zepto');
    var customElement = require('customElement').create();
    
    __inline('createTween.js');

    var gotopVisible = false;
    var $gototop;
    var $page;
    var isHidden = false;
    var lastPageTop = 0;
    var pageTop = window.pageYOffset;
    /**
     * build
     */
    function build() {
         var _element = this.element;
        if (_element.isRender) {
            return;
        }

        _element.isRender = true;

        var gototop_html = [
            '<div class="mip-gototop">',
            '    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAAA8CAYAAADYIMILAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4N2M5ODc5Zi0xMDMxLTRjZWYtOWViMy1lMmIxNzNkMDU1MTAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUEwOTQ3MUIxMDdEMTFFNkIwNDFFMDRENzk5MUQ2RDIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUEwOTQ3MUExMDdEMTFFNkIwNDFFMDRENzk5MUQ2RDIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxM2I0YTVjYS1mNzQ0LTRhMGEtYjI0Yy02NmM1N2I3NTE2NGIiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozYThhODFlZS01OGQ4LTExNzktYmYwNi1lNTU4YzcyN2M2NTkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FlgSqAAACS0lEQVR42uzbO0hbYRQH8JtLqYKU4ANBO7RQijjooHVx6uRktw6FFju1UIRIBwdFLfZBHcSWFjo5FLfi5pap7eAUB6dCO5RSh0BRQ8CISqn+v3IOhENyE+/DfPfm/OHv43gdft7XdyNJDSOO42TQDie52UffuU0AdciXcZ3mScpg36OFhEP3zGF8CR+20Ilm2LXNdBgrVrEhZQRdQz+iw0nGdqNTaDvaic6hQ0nEGuhrNF02M3eCWXQgSViGdlf4WQu6gPYlAesF5bSii+iNOGPrgXLaCHwtjtjzQDnmfH6B9sYJWw36tcK26+J7c6V+dc4/UsOwXtCVCtube+6GmHWhL+mztdha0H9Vfm8VzYpZD4HTNmL9Qk1O0Q/oZzG/SuArNmGDQDlmm7fopphfp6t0mw3YMKDl4GU0J+Y30We0AGkYNkwo5y+6hG6LeT+ttC43AhsFlHNC5+o3MR9EZ2hNfWHYKKGcY/Q5+kPMb6HTfneSayGUU6Jz9ZeYj6JP/YBdS6GcA3ru3RHz2+gkmooCWw36JUIop4jOo3kxH0MfhY31gr6JGMrZoz28K+Z30IdhYW2Acv7QKxv7Yn4XvRcU22URlJOnQ7oo5vfR8SDYJ5ZBOb9pgVES8wdBsGkLoZyfdFs6FKsv39hP6BF9nbUIyvlODwnm0C7Qk5NnvJZeObrStVa4KNgSs6R8XO/GtdaZh+JQiXX0fz2KVaxiFatYxSpWsYpVrGIVq1jFKlaxilWsYhVrHbb8xfZC0rH8HqL/77O5aOyZAAMARRuDCbImm0EAAAAASUVORK5CYII=">',
            '</div>'
        ].join(''); 

        // 加载dom
        $(_element).append(gototop_html);  
        
        $gototop = $(_element).find('.mip-gototop');
        $page = $('body');

        // 点击时间绑定
        $gototop.on('click', function() {
            animationGotoTop($gototop);
        });   

        // 监听页面滚动，实时记录滚动位置
        $page.on('touchstart', function() {
        }).on('touchmove', function(e) {
            handleScroll(e);
        }).on('touchend', function(e) {
        });  

        // 监听window滚动
        $(window).scroll(function(e){
            handleScroll(e);
        });
    }

    
    /**
     * [showGotoTop 按钮显示控制函数]
     * 
     * @param  {Boolean} visible [是否显示控制参数]
     * @return 
     */
    function showGotoTop(visible) {
        
        if (gotopVisible === visible) return;

        gotopVisible = visible;

        if (visible) {
            $gototop.show().createTween({}, {
                opacity: 1
            }, {
                duration: 300
            });
        } else {
            $gototop.show().createTween({}, {
                opacity: 0
            }, {
                duration: 300
            }, function() {
                $gototop.hide();
            });
        }
    }


    /**
     * [animationGotoTop 动画函数]
     * 
     * @param  {Object} $gototop [回顶按钮]
     * @return 
     */
    function animationGotoTop($gototop) {
        
        $page.createTween({
            '-webkit-transform': 'translateY(0)'
        }, {
            '-webkit-transform': 'translateY(' + pageTop + 'px)'
        }, {
            duration: 500
        }, function() {
            $page.css('-webkit-transform', 'translateY(0)');
            window.scrollTo(0, 0);
            showGotoTop(false);
            $page.css('-webkit-transform', 'none');
        });
    
    }


    /**
     * [handleScroll 页面滚动处理函数]
     * 
     * @param  {Object} e 
     * @return
     */
    function handleScroll(e) {

        if (isHidden) return;
        
        // 获取位置信息
        pageTop = window.pageYOffset; // 页面滚动位置
        var winHeight = window.innerHeight;  // 窗口高度

        // 当滚动位置超过顶部时
        if (pageTop > 0) {
            
            // 当滚动位置超过页面高度+1屏幕高度，并且有回拉动作时，显示回顶按钮
            if (pageTop >= winHeight) {
                if (lastPageTop > pageTop) {
                    showGotoTop(true);
                }
            } else {
                showGotoTop(false);
            }

            // 记录上一次滚动位置
            lastPageTop = pageTop;
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

require(['mip-gototop'], function (gototop) {
    // 引入组件需要的css文件，选填
    MIP.css.gototop = __inline('./mip-gototop.less');
    //注册组件
    MIP.registerMipElement('mip-gototop', gototop, MIP.css.gototop);
});

