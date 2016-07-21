/**
 * @file MIP: mobile instant baidu
 * @author shenzhou@baidu.com
 * @version 1.0
 * @copyright 2015 Baidu.com, Inc. All Rights Reserved
 */
define('builtins/mip-img', ['../utils/util', 'customElement'], function(util){
   var customElem = require('customElement');
   var build = function(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        //var src = util.urlToCacheUrl (document.location.href, this.getAttribute('src'), 'img');
        var src = this.getAttribute('src');
        _img.src = src;

        if(this.getAttribute('alt')) {
            _img.setAttribute('alt', this.getAttribute('alt'));
        }

        this.insertBefore(_img, this.firstChild);
        if ($(this).attr('popup') === '' || $(this).attr('popup') === 'popup') {
            // 弹层dom
            var popUpDom = [
                '<div class="mip-img-popUp-wrapper">',
                    '<div class="mip-img-popUp-bg"></div>',
                    '<img src="' + src + '" />',
                '</div>'
            ].join('');

            var $img = $(_img);
            var $mipImg = $(this);

            var $popUp = $(popUpDom).insertAfter($img);
            var $popUpBg = $popUp.find('.mip-img-popUp-bg');
            var $popUpImg = $popUp.find('img');

            // 动画时长
            var DURATION = 400;

            // 点击弹层任何地方，关闭弹层
            $popUp.on('click', function () {
                // 黑色背景fadeout
                $popUpBg.fadeOut(DURATION);
                // 页面上原始图片当前所处的位置
                var currentLeft = $img.offset().left;
                var currentTop = $img.offset().top - $(window).scrollTop();
                // 弹层图片退回到原始图片的位置和大小
                $popUpImg.animate({
                    left: currentLeft,
                    top: currentTop,
                    width: $img.width(),
                    height: $img.height()
                }, DURATION, function () {
                    $popUp.hide();
                });
            });

            // 点击图片，弹出弹层
            $img.on('click', function () {
                // 图片原始宽高
                var oWid = _img.width;
                var oHei = _img.height;

                // 获取弹层中的图片最终需要的位置和大小
                var info = getPopUpImgInfo({
                    oWid: oWid,
                    oHei: oHei
                });

                // 页面原始图片当前的位置，弹层图片出现时需要与原始图片保持一致的大小和位置，营造一种原始图片弹出的效果
                var currentLeft = $img.offset().left;
                var currentTop = $img.offset().top - $(window).scrollTop();

                $popUpImg.css({
                    left: currentLeft,
                    top: currentTop,
                    width: $img.width(),
                    height: $img.height()
                });

                $popUpBg.show();
                $popUp.show();

                // 弹层图片由原始图片的位置和大小渐变到最终需要的位置和大小
                $popUpImg.animate({
                    left: info.left,
                    top: info.top,
                    width: info.wid,
                    height: info.hei
                }, DURATION);
            });
        }
    };

    /**
     * 获取图片最后展示的宽高和位置
     *
     * @param  {Object} opt [图片的原始信息]
     *                      opt.oWid(origin width): 图片原始宽度
     *                      opt.oHei(origin height): 图片原始高度
     *                      opt.uWid(user width): 用户设置的图片宽度
     *                      opt.uHei(user heigth): 用户设置的图片高度
     *                      opt.$wrapper: 最终的弹层dom
     *
     * @return {Object}     [图片在弹出层中的宽高和位置信息]
     *                      wid: 图片在弹层中的显示宽度
     *                      hei: 图片在弹层中的显示高度
     *                      left: 图片在弹层中的显示位置left
     *                      top: 图片在弹层中的显示位置top
     */
    function getPopUpImgInfo(opt) {
        // 计算前图片的宽高 before width && before height
        var bWid = +opt.oWid;
        var bHei = +opt.oHei;

        var $win = $(window);
        // 计算后图片的宽高 after width && after height
        var aWid = $win.width();
        var aHei = Math.round(aWid * bHei / bWid);

        var top = ($win.height() - aHei) / 2;

        return {
            wid: aWid,
            hei: aHei,
            left: 0,
            top: top
        };
    }


    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});
;
define('builtins/mip-gif', ['require', 'customElement'], function(require){
    var customGif = require('customElement');
   function build(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        var src = this.getAttribute('framesrc');
        _img.src = src;
        if(this.getAttribute('width')){
            _img.setAttribute('width',this.getAttribute('width'));
        }
        if(this.getAttribute('height')){
            _img.setAttribute('height',this.getAttribute('height'));
        }
        if(this.getAttribute('srcset')){
            _img.setAttribute('srcset',this.getAttribute('srcset'));
        }

        if(this.getAttribute('sizes')){
            _img.setAttribute('sizes',this.getAttribute('sizes'));
        }
        this.appendChild(_img);
        $(_img).on('click',function(){
           var mipGifNode = this.parentNode;
           var src = mipGifNode.getAttribute('src');
           var img  = new Image();
           _this = this;
           img.onload = function(){
                mipGifNode.removeChild(_this);
                mipGifNode.appendChild(this);
                _this = null;
           };
           img.src = src;
        });
    }
    customGif.prototype.init = function(){
        this.build = build; 
    };
    return customGif;

});
;
/**
* 统计标签
* @exports modulename
* @author shenzhou@baidu.com
* @version 1.0
* @copyright 2015 Baidu.com, Inc. All Rights Reserved
*/
define('builtins/mip-pix', ['require', 'customElement'], function(require){
    var customElem = require('customElement');

    function build(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        var src = this.getAttribute('src');
        var time = (new Date().getTime());
        _img.src = src+"?"+time;
        _img.setAttribute('width',0);
        _img.setAttribute('height',0);
        this.setAttribute('width','');
        this.setAttribute('height','');
        this.appendChild(_img);
    }

    customElem.prototype.init = function(){
        this.build = build;
        /*
        *覆盖默认inviewCallBack
        * */
        this.inviewCallback = function(){

        }
        this.mipAttachedCallback = function(){
            this.build();
        }

    };
    return customElem;
});
;
define('extensions/mip-carousel', ['require', 'customElement', 'gesture'], function(require){
    var customElem = require('customElement');

    var build = function () {
        // 避免多次渲染
        if(this.isRender){
            return; 
        }
        this.isRender = true;

        var $this = $(this);

        var hei = $this.attr('height');
        var wid = $this.attr('width');

        if (!wid || !hei || typeof +hei !== 'number' || typeof +wid !== 'number') {
            return;
        }

        // padding-bottom
        var pdb = +hei / +wid * 100 + '%';
        $this.css('padding-bottom', pdb);

        // 如果子节点少于2个，则不需要轮播
        var $childs = $this.children();
        if ($childs.length < 2) {
            return;
        }

        // 当前展示的图片序号
        var currentIndex = 0;

        // 被隐藏的图片的left属性值
        var HIDE_LEFT = -9999;

        // 轮播动画时长
        var DURATION = 800;

        // 轮播思路：轮播只涉及2张图片，分别是当前图片和下一张要出现的图片，把下一张图片放到当前图片的前面或者后面，
        //         然后移动到当前图片的位置，其余不涉及的图片全部设置left:-9999px，具体可以看效果
        $childs.css({
            'position': 'absolute',
            'left': HIDE_LEFT,
            'top': 0,
        });
        $childs.eq(currentIndex).css('left', 0);

        // 如果mip-carousel里子节点是mip-img，并且mip-img弹出了浮层
        var isMipImgPop = false;

        // 当前是否处于轮播动画中
        var isAnimating = false;

        /**
         * 切换图片函数
         *
         * @param  {Boolean} forward 前进(true)或者后退(false)
         *
         * @return {Object}         Deferred/Promise对象
         */
        var switchItem = function (forward) {
            var index = forward ? (currentIndex + 1) : (currentIndex - 1);
            if (index < 0) {
                index = $childs.length - 1;
            }
            else if (index >= $childs.length) {
                index = 0;
            }
            // 图片占据的一屏宽度
            var perWid = $this.width();
            var left = (forward ? 1 : -1) * perWid;
            $childs.filter(function (i) {
                return (i !== currentIndex && i !== index);
            }).css('left', HIDE_LEFT);
            $childs.css({
                'display': 'block',
                'opacity': 1,
                'z-index': 1
            });
            $childs.eq(index).css({
                'left': left,
                'z-index': 2
            });
            var def = $.Deferred();
            isAnimating = true;
            $childs.eq(index).animate({
                left: 0
            }, DURATION, function () {
                currentIndex = index;
                isMipImgPop ? def.reject() : def.resolve();
                isAnimating = false;
            });
            $childs.eq(currentIndex).fadeOut(DURATION);
            return def.promise();
        };

        // 是否需要自动轮播
        var autoTimer;

        function autoPlay(time) {
            autoTimer = setTimeout(function () {
                switchItem(true).then(function () {
                    autoPlay(time);
                });
            }, time);
        }

        var defer;
        var isAutoPlay = false;
        if ($this.attr('autoplay') === 'autoplay' || $this.attr('autoplay') === '') {
            if (typeof +this.getAttribute('defer') === 'number') {
                defer = +this.getAttribute('defer');
            }
            else {
                defer = 2000;
            }
            isAutoPlay = true;
            autoPlay(defer);
        }

        var gesture = require('gesture');
        gesture.init();
        gesture.bind(function (evt, data) {
            // 用户手指滑动结束且手势为横向滑动且当前不处于动画播放状态
            if (data.event === 'touchend' && Math.abs(data.x) > Math.abs(data.y) && !isAnimating) {
                autoTimer && clearTimeout(autoTimer);
                // 向右滑（上一张）or 向左滑(下一张)
                var forward = !(data.x > 0);
                switchItem(forward).then(function () {
                    if (isAutoPlay) {
                        autoPlay(defer);
                    }
                });
            }
        });

        if (isAutoPlay) {
            $this.delegate('mip-img', 'click', function () {
                if ($(this).attr('popup') === 'popup' || $(this).attr('popup') === '') {
                    autoTimer && clearTimeout(autoTimer);
                    isMipImgPop = true;
                }
            });

            $this.delegate('.mip-img-popUp-wrapper', 'click', function () {
                autoPlay(defer);
                isMipImgPop = false;
                return false;
            });
        }

    };

    customElem.prototype.init = function () {
        this.build = build;
    };

    return customElem;
});
;
define('extensions/mip-iframe', ['require', 'customElement'], function (require) {
    var customElem = require('customElement');
    var build = function () {
        // 防止多次渲染
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var $this = $(this);
        // 获取src属性的值，如果用户传递了srcdoc，则将src内容转为base64编码用于iframe的src
        var src = $this.attr('src');
        if ($this.attr('srcdoc')) {
            src = 'data:text/html;charset=utf-8;base64,' + window.btoa($this.attr('srcdoc'));
        }
        var hei = $this.attr('height');
        var wid = $this.attr('width');

        if (!src || !wid || !hei) {
            return;
        }

        if (hei && wid && typeof +hei === 'number' && typeof +wid === 'number') {
            // padding-bottom
            var pdb = +hei / +wid * 100 + '%';
            $this.append('<div style="padding-bottom: ' + pdb + ';"></div>');
        }
        var $iframe = $('<iframe frameBorder="0" scrolling="no"></iframe>');
        $iframe.attr('src', src);
        if ($this.attr('allowfullscreen') === '') {
            $iframe.attr('allowfullscreen', '');
        }
        if ($this.attr('allowtransparency') === 'true') {
            $iframe.attr('allowtransparency', 'true');
        }
        var sandbox = $this.attr('sandbox');
        if (sandbox || sandbox === '') {
            $iframe.attr('sandbox', sandbox);
        }
        $this.append($iframe);
    };

    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;
});
;
;
/**
 * @file 下载
 * @author fengchuantao
 * 
 * @time 2016.06.21
 */

define('builtins/mip-appdl', ['require', 'customElement'], function(require) {
    var customElem = require('customElement');
    /**
     * build
     */
    function build() {
        if (this.isRender) {
            return;
        }

        this.isRender = true;
        getallconfig.call(this)
        BindClose.call(this)
    }

    function getallconfig() {
       var tpl = this.getAttribute('tpl');

       switch(tpl) {
            case 'imageText':
                renderHaveImg.call(this);
                break;
            case 'noneImg':
                renderNoneImg.call(this);
                break;
        }
    }


    /**
     * 图文存在
     */
    function renderHaveImg() {
        var textdom = buildtextdom.call(this);
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr("downsrc");
        var imgsrc = $(this).attr("imgsrc");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+ "'";

        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-contentcell'>"+
                    "<img src="+imgsrc+" class='mip-appdl-downimg'>"+
                "</div>"+
                "<div class='mip-appdl-textbox mip-appdl-contentcell'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downloadbbutton mip-appdl-contentcell'>"+
                    "<a herf="+downsrc+">"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";
        $(this).append(str)
    }

    /**
     * 单行文本
     */
    function renderNoneImg() {
        var textdom = buildtextdom.call(this);
        var downtext = $(this).attr("downbtntext");
        var downsrc  = $(this).attr("downsrc");
        var postiontye = "'mip-appdl-box mip-appdl-"+$(this).attr("postiontye")+"'";


        var str = "<div class= "+postiontye+" >"+
            "<div class='mip-appdl-content'>"+
                "<div class='mip-appdl-textbox mip-appdl-contentcell'>"+
                    textdom+
                "</div>"+
                "<div class='mip-appdl-downloadbbutton mip-appdl-contentcell'>"+
                    "<a herf="+downsrc+">"+downtext+"</a>"+
                "</div>"+
                "<div class='mip-appdl-closebutton'></div>"+
            "</div>"+
        "</div>";

        $(this).append(str)
    }

    /**
     * 组装文本行
     */
    function buildtextdom() {
        var textarray = $(this).attr("texttip");
        var tarray = [];
        if (textarray) {
            try {
                tarray = new Function('return ' + textarray)();
            } catch (e) {}
        }
        var domstr = "<div class='mip-appdl-text'>";
        var length = tarray>2 ? 2:tarray.length;

        for(var i=0;i<length;i++) { //限定最大行数两行
            domstr+="<p>"+tarray[i]+"</p>";
        }
        return domstr+"</div>";
    }

    /**
     * 绑定关闭事件
     */
    function BindClose() {
        $(this).on("click",".mip-appdl-closebutton",function(){
            $(this).parents(".mip-element").remove()
        })
    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});
;
define('builtins/img-viewer', ['deps/emit'], function (EventEmitter) {
    var $win = $(window);
    var winInfo = {
        width: $win.width(),
        height: $win.height()
    };

    function MipViewer(opt) {
        this.opt = $.extend({
            selector: '[data-carousel]',
            viewerClass: '.mip-viewer',
            // 影藏header的延迟
            timeoutHideHeader: 3000,
            // 竖屏滑动阈值
            verticalThreshold: .2,
            // 横屏滑动阈值
            horizontalThreshold: .2,
            // 页面中只会保留最多3张图片，供预览
            maxShowItem: 3
        }, opt);

        this.init();
        this.createDom();
        this.bindEv();
    }

    $.extend(MipViewer.prototype, {
        init: function () {
            this.imgs = $(this.opt.selector);
            this.urlList = [];

            this.wrapper = $(this.opt.viewerClass);

            if (!this.wrapper.length) {
                this.wrapper = $('<div class="mip-viewer"/>');
                $('body').append(this.wrapper);
            }

            this.updateDirection();
        },
        createDom: function () {
            var tplSidebar = '<div class="mip-viewer-header">' +
                                '<a href="javascript:;" class="mip-viewer-header-ret"><i class="c-icon">&#xe783</i></a>' +
                                '<div class="mip-viewer-header-inner">' +
                                    '<span class="mip-viewer-header-txt"></span>' +
                                '</div>' +
                             '</div>';
            var tplHeader = '<div class="mip-viewer-viewer">' +
                                '<div class="mip-viewer-list mip-viewer-normal">';
            var tplItem = '<div class="mip-viewer-item">' +
                            '<div class="mip-viewer-item-inner">' +
                                '<img src="" />' +
                            '</div>' +
                          '</div>';
            var tplFooter = '</div></div>';
            var html = '';

            this.updateList();

            html += tplSidebar;
            html += tplHeader;

            for (var i = 0, len = this.opt.maxShowItem; i < len; i++) {
                html += tplItem;
            }

            html += tplFooter;

            this.wrapper.html(html);
            this.viewer = this.wrapper.find('.mip-viewer-viewer');
            this.list = this.viewer.find('.mip-viewer-list');
            this.items = this.list.find('.mip-viewer-item');

            this.header = this.wrapper.find('.mip-viewer-header');
            this.pager = this.header.find('.mip-viewer-header-txt');
            // 关闭按钮
            this.ret = this.header.find('.mip-viewer-header-ret');
        },
        show: function () {
            var self = this;

            window.parent.postMessage({
                event: 'jqHandle',
                data: {
                    selector: '.sf-header',
                    handle: 'hide'
                }
            }, '*');
            // BUGFIX ios下iframe window高度获取bug
            $('.main').hide(0, function () {
                $win.trigger('resize');
                self.wrapper.height(winInfo.height).show();
                self.replaceDom(self.getShowList(self.carouselId));
            });

            this.updatePager();
            this.hideHeader();
        },
        hide: function () {
            this.wrapper.hide();
            $('.main').show();

            window.parent.postMessage({
                event: 'jqHandle',
                data: {
                    selector: '.sf-header',
                    handle: 'show'
                }
            }, '*');
        },
        updateDirection: function () {
            var horizonClassName = 'mip-viewer-horizon';
            if (winInfo.width > winInfo.height) {
                this.phoneDirection = 'horizontal';
                this.wrapper.addClass(horizonClassName);
            }
            else {
                this.phoneDirection = 'vertical';
                this.wrapper.removeClass(horizonClassName);
            }
        },
        getShowList: function (carouselId) {
            var list = [];
            // prev
            list.push({
                src: this.urlList[carouselId - 1] || ''
            })
            // active
            list.push({
                src: this.urlList[carouselId]
            });
            // next
            list.push({
                src: this.urlList[carouselId + 1] || ''
            });
            return list;
        },
        replaceDom: function (list) {
            this.items.each(function (index) {
                var $img = $(this).find('img');
                $img.removeAttr('style').attr('src', list[index].src);
                !list[index].src && $img.hide();
            });
        },
        showHeader: function () {
            this.headerTimer && window.clearTimeout(this.headerTimer);
            this.header.show();
            this.hideHeader();
        },
        hideHeader: function () {
            var self = this;
            this.headerTimer = setTimeout(function () {
                self.header.hide();
            }, this.opt.timeoutHideHeader);
        },
        updatePager: function() {
            this.pager.text((this.carouselId + 1) + '/' + this.urlList.length);
        },
        updateList: function ($container) {
            var $dom = $container || this.imgs;
            var self = this;
            self.urlList.length = 0;
            $dom.each(function (index) {
                var $this = $(this);
                self.urlList.push($this.attr('src'));
                $this.attr('carouselId', index);
            });
        },
        bindEv: function () {
            var self = this;
            var xPos;
            var initTransX;

            // TODO 事件代理
            // this.wrapper.on('click', this.opt.selector, function () {
            this.imgs.on('click', function () {
                var $this = $(this);
                var carouselId = $this.attr('carouselId');
                self.carouselId = +carouselId;
                self.show();
            });

            this.ret.on('click', function () {
                self.hide();
                return false;
            });

            // 点击显示header
            this.viewer.on('click', function () {
                self.showHeader();
            });
            this.viewer.on('touchstart', function (e) {
                // prevent(e);
                // 交互锁：可多状态组合，目前只有动画状态
                self.locked = !!self.animationStatus;

                if (self.locked) return;

                xPos = e.originalEvent.touches[0].pageX;
                initTransX = self.list.css('-webkit-transform').match(/(-?[0-9\.]+)/g);
                
                self.initTransX = initTransX && +initTransX[4] || 0;
            })
            .on('touchmove', function (e) {
                if (self.locked) return;

                var x = e.originalEvent.touches[0].pageX;
                var diff = x - xPos + self.initTransX;
                prevent(e);

                self.list.css({
                    '-webkit-transition-duration': '0s',
                    '-webkit-transform': 'translateX(' + diff + 'px)'
                });
            })
            .on('touchend', function (e) {
                if (self.locked) return;

                var x = e.originalEvent.changedTouches[0].pageX;
                var diff = x - xPos;
                // prevent(e);

                var needChange = (Math.abs(diff) > winInfo.width * self.opt[self.phoneDirection + 'Threshold']);

                if (needChange) {
                    (diff > 0) ? self._goPrev() : self._goNext();
                }
                else {
                    self._goNormal();
                }
            })
            .on('touchcancel', function (e) {
            });

            this.list.on('transitionend webkitTransitionEnd', function () {
                self.replaceDom(self.getShowList(self.carouselId));
                self._goCommon();

                self.animationStatus = '';
                self.updatePager();
            });

            $win.on('viewport_resize.img_viewer', function (e, info) {
                winInfo = info;
                self.updateDirection();
                self.wrapper.height(winInfo.height);
            });

            function prevent(e) {
                // e.stopPropagation();
                e.preventDefault();
            }
        },
        // TODO 可优化 -- 目前的策略：如果在动画中，则不处理后续请求
        // 停止动画，立即完成动画
        stop: function () {
        },
        _goNormal: function () {
            this.animationStatus = '_goNormal';
            this.list.css({
                '-webkit-transition-duration': '400ms',
                '-webkit-transform': 'translateX(-33.33%)'
            });
        },
        _goNext: function () {
            this.animationStatus = '_goNext';
            if (!this.urlList[this.carouselId + 1]) {
                this._goNormal();
                return;
            }
            this.list.removeAttr('style').addClass('mip-viewer-toright');
            this.carouselId++;
        },
        _goPrev: function () {
            this.animationStatus = '_goPrev';
            if (!this.urlList[this.carouselId - 1]) {
                this._goNormal();
                return;
            }
            this.list.removeAttr('style').addClass('mip-viewer-toleft');
            this.carouselId--;
        },
        _goCommon: function () {
            this.list.removeAttr('style').removeClass('mip-viewer-toright mip-viewer-toleft');
        },
        destroy: function () {
        }
    }, EventEmitter.prototype);

    return MipViewer;
});
;
define('builtins/mip-video', ['utils/util', 'customElement', 'builtins/video/player'], function(util){
    var customElem = require('customElement');
    var player = require('builtins/video/player');

    var bdPlayer;
    var build = function () {
        if (this.isRender) {
            return; 
        }
        this.isRender = true;

        var me = this;
        var $me = $(this);

        $(this).on('click', function (event) {
            // 如果有视屏正在播放，则移除视屏
            bdPlayer && bdPlayer.remove();
            // if(bdPlayers.length) {
            //     for(var index = 0; index < bdPlayers.length; index ++) {
            //         bdPlayers[index].pause();
            //     }
            // }
            bdPlayer = new player({});

            // video容器  如果未设置的话  则传入me
            var container = $me.attr('container');
            if (container && $(container) && $(container).length) {
                container = $(container);
            } else {
                container = me;
            }

            var mip_video = $(container).parent().find('mip-video');
            
            // 广告数据信息
            var adInfo = [];
            var adInfoString = $me.attr('adInfo');
            if (adInfoString) {
                try {
                    adInfo = new Function('return ' + adInfoString)()
                } catch (e) {}
            }

            // 正片播放时 设置多type时 数据处理
            var sources = $me.find('source');
            var playInfo = [];
            sources.each(function () {
                var src = $(this).attr('src');
                var type = $(this).attr('type');
                if (!src) {
                    return;
                }
                playInfo.push({
                    type: type,
                    src: src
                });
            });

            // 加载视频、并播放

            bdPlayer.render({
                // 播放器容器，必选
                container: container,

                height: $me.attr('height'),
                width: $me.attr('width'),
                src: $me.attr('src'),
                type: $me.attr('type'),
                poster: $me.attr('poster'),
                autoplay: $me.attr('autoplay'),
                controls: $me.attr('controls'),
                loop: $me.attr('loop'),
                muted: $me.attr('muted'),

                android: {
                    playMode: $me.attr('android-mode') || ''
                },
                ios: {
                    playMode: $me.attr('ios-mode') || ''
                },

                // 广告数据信息
                adInfo: adInfo,

                // 正片视频数据信息
                playInfo: playInfo
                // src: 'http://v1.bdstatic.com/8aa369effe2cc6280c1bd413723ce0ac/mp4/8aa369effe2cc6280c1bd413723ce0ac.mp4'
            });
            // bdPlayers.push(bdPlayer);
        });

        // 防止点击video区域时 造成重播
        $(this).on('click', 'video', function (event) {
            event.stopPropagation();
            event.preventDefault();
        });

    };

    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});



;
/**
 * h5 video播放器
 *
 * @file player.js
 * @author songgenlei@baidu.com
 */
define('builtins/video/player', ['require'], function(require) {

    /**
     * 构造函数
     *
     * @param {Object}              opt 配置对象
     * @param {Object}              opt.ios   可选 单独配置ios下某个表现形式
     * @param {boolean}             opt.ios.playMode  可选 播放模式
     *** 播放模式字段值说明：
     *** hide 容器中对video的显示进行隐藏 （ios默认为全屏播放，针对ui设定 当前播放区域不显示video）
     *** false || undefined 不使用插件带有的播放容器样式
     * @param {Object}              opt.android   可选  单独配置android下某个表现形式
     * @param {boolean}             opt.android.playMode  可选 播放模式
     *** 播放模式字段值说明：
     *** fullsreen 全屏 (android模拟全屏播放)
     *** false || undefined 不使用插件带有的播放容器样式
     */
    function VideoPlayer(opt) {
        this.params = $.extend(true, {
            // 视频容器   必填
            container: null,

            height: null,
            width: null,
            src: null,
            type: null,
            poster: null,
            autoplay: null,
            controls: null,
            loop: null,
            muted: null,

            ios: {
                playMode: false
            },

            android: {
                playMode: false
            },

            // 广告数据信息
            adInfo: [],

            // 正片视频数据信息
            playInfo: []

        }, opt);

        // 控制视频位置 和 样式 容器
        this.box = {
            normal: $('<div class="mip-video-box"></div>'),
            // ios playmode 设置为hide时使用  视频缩小为1*1px 当前不显示出来
            hide: $('<div class="mip-video-box-ios"></div>')
        }

        // 当前广告播放到第几个  （广告可设置多个）
        this.adIdx = 0;

        // 视频播放到的位置
        this.lastTime = 0;

        // 事件命名空间
        this.eventNS = '.mipvideo';

        // 初始化video
        this.init();

        // 绑定事件
        this.bindEvents();
    }

    VideoPlayer.prototype = {
        constructor: VideoPlayer,

        // 容器代码
        // tplWrap: '<video class="mip-video-player" <%=(poster ? "poster=" + poster : "")%>"></video>',

        // source代码
        tplSource: ['<% for (var i = 0, len = data.length; i < len; i++) { var item = data[i]; %>',
            '<source <%=(item.type ? "type=" + item.type : "")%> src="<%=item.src%>"></source>',
        '<% } %>'].join(''),

        // 模板引擎
        tmpl: (function(){
            var cache = {};

            var tmpl = function tmpl(str, data){
                // Figure out if we’re getting a template, or if we need to
                // load the template – and be sure to cache the result.
                var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t") .replace(/((^|%>)[^\t]*)’/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                    + "');}return p.join('');");

                // Provide some basic currying to the user
                return data ? fn( data ) : fn;
            };

            return tmpl;
        })(),
        
        // 初始化video标签
        init: function () {
            var me = this;
            me.$video = $('<video></video>');
            me.video = me.$video[0];

            // 设置video标签默认样式
            me.video.className = 'mip-video-player';

            me.isWorking = false;
        },

        // 初始化各参数
        initParams: function () {
            var me = this;
            me.lastTime = 0;
        },

        // params 同上方 创建时参数
        render: function (options) {
            var me = this;

            // render时 可设置参数 覆盖实例化时设置的信息
            this.options = $.extend({}, me.params, options);

            me.setAttrs();

            me.loadSource();

            me.appendVideo();

            me.play();

            me.isWorking = true;
        },

        // 设置video的各项参数
        setAttrs: function () {
            var me = this;
            var options = me.options;

            // 设置视频宽度 需要考虑height 为0 的时候的处理
            me.setAttr('width', options.width);

            // 需要考虑height 为0 的时候的处理
            me.setAttr('height', options.height);

            // 设置视频资源地址   单一视频资源时使用 ------ 使用source标签实现
            // me.setAttr('src', options.src);

            // 设置视频资源地址   单一视频资源时使用 ------ 使用source标签实现
            // me.setAttr('type', options.type);

            // 设置视频封面
            me.setAttr('poster', options.poster);

            // 设置视频是否自动播放
            me.setAttr('autoplay', options.autoplay);

            // 设置视频是否使用控制条
            me.setAttr('controls', options.controls);

            // 设置视频是否循环播放
            me.setAttr('loop', options.loop);

            // 设置视频是否静音
            me.setAttr('muted', options.muted);
        },

        // 设置video属性     字段是否为0, 是否为原始字段名
        setAttr: function (attr, value) {
            var me = this;
            var $video = me.$video;

            if (value || value === 0 || value === '') {
                $video.attr(attr, value);
            } else {
                $video.removeAttr(attr);
            }
        },

        // 插入视频元素   需要区分ios  android是否全屏播放等  TODO
        appendVideo: function () {
            var me = this;
            var video = me.$video;
            var options = me.options;

            var container = $(options.container);
            if (!container.length) {
                return;
            }

            // 如果设置了playMode 且 ios 进行如下操作
            // ios不区分fullscreen || inline, 均为为默认系统全屏播放
            if (me.isIos() && options.ios && options.ios.playMode === 'hide') {
                var html = me.box.hide.html(video);
                container.append(html);
                return;
            }

            // 非ios下 全屏播放
            if (!me.isIos() && options.android && options.android.playMode === 'fullscreen') {
                me.fullscreenForAndriod();
                return;
            }

            // 非ios下 当前区域播放  --- 暂无当前播放规范 尚未开发
            // if (options.playMode === 'inline') { }

            // 如果未设置playMode 则只会简单的插入video节点
            container.append(this.box.normal.html(video));
        },

        // 移除视频 及 其父元素
        // removeVideo: function () {
            // this.box
        // },

        // 播放视频，  兼容手百等无法播放的问题
        play: function () {
            var me = this;
            var uaReg = /(iphone.+mqqbrowser)|(android.*(baidubrowser)|(baiduboxapp))/i;

            if (navigator.userAgent.match(uaReg)) {
                setTimeout(function() {
                    me.video.play();
                }, 30);
            } else {
                me.video.play();
            }
        },

        // 加载视频资源
        load: function () {
            // 加载资源  必需  否则切换资源播放时 仍然会播放上次视频
            this.video.load();
        },

        // 加载视频资源  判断要播放的资源是否为广告
        loadSource: function () {
            var me = this;
            var options = me.options;
            var video = me.video;

            // 初始化时间等参数
            me.initParams();

            // 移除广告事件
            me.removeEventsForAD();

            if (me.hasAd(options)) {
                me.playForAD(options);
            } else {
                me.playForNormal(options);
            }

            // 加载资源  必需  否则切换资源播放时 仍然会播放上次视频
            me.load();

        },

        // 正常 - 视频资源
        playForNormal: function () {
            var me = this;
            var options = me.options;
            var playInfo = options.playInfo;
            var video = me.video;
            // 如果没有playInfo时 使用src和type参数 
            if (!playInfo || !playInfo.length) {
                playInfo = [];
                playInfo[0] = {
                    type: options.type,
                    src: options.src
                };
            }

            // 插入视频 开始播放
            me.appendSource(playInfo);
        },

        // 广告 - 资源
        playForAD: function () {
            var me = this;
            var options = me.options;
            var ads = options.adInfo;
            var video = me.video;
            if (!me.hasAd(options)) {
                return;
            }

            // 插入第几组广告 开始播放
            me.appendSource(ads[me.adIdx]);

            me.adIdx++;
            
            // 广告播放事件绑定
            me.eventsForAD();
        },

        // 添加广告事件
        eventsForAD: function () {
            var me = this;
            var adEventNS = me.eventNS + 'forad';
            var video = me.video;

            // 移除事件 防止多次绑定
            me.removeEventsForAD();

            // 广告播放时 不可以拖动快进
            me.$video.on('timeupdate' + adEventNS, function() {
                var currentTime = Math.ceil(video.currentTime);
                var duration = me.getVideoTime();
                    // alert('duration');

                // for ad  can not drag to play
                if (currentTime - me.lastTime > 2) {
                    video.currentTime = me.lastTime;
                    me.lastTime = me.lastTime;

                    // 解决快进拖动到视频结束时触发pause事件 视频暂停播放现象
                    me.play();
                    return;
                }

                me.lastTime = currentTime;
                    // alert(duration);

                // 广告播放结束后 继续播放
                if (duration && currentTime >= duration) {
                    // alert(duration);
                    me.loadSource();
                    me.play();
                }
            });
        },

        // 移除广告事件
        removeEventsForAD: function () {
            var me = this;
            var adEventNS = me.eventNS + 'forad';
            me.$video.off('timeupdate' + adEventNS);
        },

        // 是否有广告
        hasAd: function () {
            var me = this;
            var options = me.options;
            var ads = options.adInfo;
            if (!ads || !ads.length || me.adIdx >= ads.length) {
                return false;
            }

            return true;
        },

        // 插入一组source数据 进行播放使用
        // data array() 为当前一组视频的数据信息
        // data.type  视频资源类型
        // data.src  视频资源地址
        appendSource: function (data) {
            var me = this;
            var $video = me.$video;
            var sources = this.tmpl(this.tplSource, { data: data });
            if (sources) {
                $video.html(sources);
            }
        },

        // 是否ios
        isIos: function () {
            return /iPhone|iPad|iPod/i.test(window.navigator.userAgent); 
        },

        // 未重构部分----------------------------------------------------------------------

        // 绑定事件
        bindEvents: function() {
            var me = this;
            me.$video.on('loadeddata', function() {
                me.video.play();
            });
        },

        fullscreenForAndriod: function () {
            var self = this;
            var video = self.$video;
            var options = self.options;
            var eventNS = self.eventNS + 'fullscreen';

            //注释原有功能
            // QQ browser由于自有实现的播放器问题 特殊处理
            // 避免2次点击关闭按钮
            // if (navigator.userAgent.match(/(android.+mqqbrowser)/i)) {
            //     return;
            // }

            // 引用通用弹窗组件
            require(['builtins/video/popup'], function (Popup) {
                var popup = new Popup({
                    title: options.title || '',
                    content: '',
                    fullView: true,
                    customClassName: 'mip-video-player-popup',
                    onOpen: function () {
                        popup.$popupContent.html(video);

                        // 设置视频居中显示
                        self.setVideoCenterForFullscreen();
                    },
                    onClose: function () {
                        // 初始化
                        $(window).off('orientationchange' + eventNS);
                        self.initStyle();
                    }
                });

                // 解决android手百关闭时页面抖动问题  待popup组件升级后更改 @士浩
                var remove = $('.mip-video-player-popup .mip-video-popup-remove');
                remove.length && remove.off('click' + eventNS)
                    .on('click' + eventNS, function () {
                        popup.$popupContent.length && popup.$popupContent.html('');
                    });
            });
        },

        initStyle: function () {
            var self = this;
            var video = self.$video;
            video.removeAttr('style');
        },

        // 设置视频居中显示  and  屏幕旋转时大小控制 - android模拟全屏
        setVideoCenterForFullscreen: function () {
            var self = this;
            var eventNS = self.eventNS + 'fullscreen';

            // 关闭按钮距离上方的距离
            var freesize = 0;
            var remove = $('.mip-video-player-popup .mip-video-popup-remove');
            if (remove.length) {
                freesize = remove.height() + remove.offset().top;
            }

            // 屏幕旋转后，设置video的位置和尺寸
            $(window).off('orientationchange' + eventNS + ' resize' + eventNS)
                .on('orientationchange' + eventNS + ' resize' + eventNS, function () {
                    self.calculateVideo({
                        freesize: freesize
                    });
                });

            // 设置video的位置和尺寸
            self.calculateVideo({
                freesize: freesize
            });
        },

        // android全屏时计算video的高度和位置
        // @param {boolean}    params.freesize  可选 上下需要空闲出来的尺寸
        calculateVideo: function (params) {
            var self = this;
            var video = self.$video;
            var params = params || {};

            // 初始化样式避免被设定影响
            self.initStyle();

            setTimeout(function () {
                var winHeight = $(window).height();
                var winWidth = $(window).width();
                var freesize = params.freesize || 0;
                var h = video.height();

                if (winHeight <= winWidth) {
                    h = winHeight - freesize * 2;
                }
                video.css({
                    'height': h + 'px',
                    'margin-top': - h / 2 + 'px',
                    'visibility': 'visible'
                });

            }, 10);
        },

        pause: function() {
            this.video.pause();
        },

        remove: function() {
            this.$video.parent().remove();
            this.isWorking = false;
        },

        // 获取视频时长
        getVideoTime: function() {
            return Math.ceil(this.video.duration);
        },

        on: function(name, fn) {
            this.$video.on(name, fn);
        },

        off: function(name, fn) {
            this.$video.off(name, fn);
        },

        trigger: function(name) {
            this.$video.trigger(name);
        }
        
    }

    return VideoPlayer;
});;
/**
 * @file popup上滑弹窗
 * @author dongshihao
 */
define('builtins/video/popup', ['require'], function (require) {

    var PopupFrame = function (opt) {
        var me = this;
        // 设置默认值
        me.options = $.extend({
            title: '',              // 标题，支持html和Zepto对象
            content: '',            // 内容，支持html和Zepto对象
            fullView: false,        // 是否全屏
            duration: 400,          // 动画执行时间
            customClassName: '',    // 自定义样式名
            onOpen: function () {},
            onClose: function () {}
        }, opt);
        // 初始化
        me._init();
    };

    PopupFrame.prototype = {

        constructor: PopupFrame,

        version: '0.0.1',

        /*
        *  初始化：渲染父层dom，阻止遮罩的滚动，弹出popup
        */
        _init: function () {
            var me = this;
            // 渲染父层dom单例
            me._preparePopupWrapper();
            // 阻止遮罩滚动
            me._stopScroll();
            me.popup();
        },
        /*
         * 创建.mip-video-popup-wrapper父容器单例,所有pop内容都append到这个dom中
         */
        _preparePopupWrapper: function () {
            var me = this;
            var popWrapperDom = $('.mip-video-popup-wrapper');
            if (popWrapperDom.length) {
                me.$popupFrame = popWrapperDom;
                me.$popupFrame.empty();
            } else {
                me.$popupFrame = $('<div class="mip-video-popup-wrapper"></div>');
                $(document.body).append(me.$popupFrame);
            }
        },
        /*
        *  阻止mask以及结果层的滚动
        */
        _stopScroll: function () {
            var me = this;
            // 阻止遮罩层滚动,不会影响内部touchmove事件
            me.$popupFrame.on('touchmove', function (e) {
                e.preventDefault();
            });
        },
        /*
        * 父层事件绑定
        */
        _bindEvent: function () {
            var me = this;
            // mask遮罩和绑定退场事件
            me.$popupFrame.on('click', '.mip-video-popup-mask,.mip-video-popup-remove', function () {
                me.closePopup();
            });
        },
        /*
        * 装填&&渲染
        */
        _randerContent: function () {
            var me = this;
            // 遮罩层
            me.$popupMask = $('<div class="mip-video-popup-mask"></div>');
            // modal层
            me.$popupModal = $('<div class="mip-video-popup-modal"></div>');
            // modal内content
            me.$popupContent = $('<div class="mip-video-popup-content"></div>');
            // modal内head
            me.$popupHead = $('<div class="mip-video-popup-head"></div>');
            // 装填head内容
            if (me.options.title) {
                var titleWrapper = $('<div class="mip-video-popup-title"></div>');
                titleWrapper.append(me.options.title);
                me.$popupHead.append(titleWrapper);
            }
            var remove = $('<div class="mip-video-popup-remove">X</div>');
            me.$popupHead.append(remove);
            // 装填content
            me.$popupContent.append(me.options.content);
            // 装填modal
            me.$popupModal.append(me.$popupHead).append(me.$popupContent).addClass(me.options.customClassName);
            // 最后装填外层wrapper
            me.$popupFrame.append(me.$popupModal).append(me.$popupMask);
        },
        /*
        * 弹出层
        */
        popup: function () {
            var me = this;
            var wHeight = $(window).height();
            me._randerContent();
            me._bindEvent();
            // mask淡入
            me.$popupMask.show().animate({
                opacity: 1
            }, 'fast', 'linear');
            // 展现modal
            me.$popupModal.show();
            // 计算modal实际高度
            var mHeight = me.$popupModal.height();
            if (me.options.fullView || mHeight > wHeight) {
                me.$popupModal.height('100%');
            }
            // 入场动画
            me.$popupModal.animate({
                '-webkit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
            }, me.options.duration, 'linear', function () {
                $(this).css({
                    '-webkit-transform': 'none',
                    'transform': 'none'
                });
                me.options.onOpen();
            });
        },
        /*
        * 关闭弹层
        */
        closePopup: function () {
            var me = this;
            // 退场动画
            me.$popupModal.animate({
                '-webkit-transform': 'translate3d(0, 100%, 0)',
                'transform': 'translate3d(0, 100%, 0)'
            }, me.options.duration, 'linear', function () {
                $(this).css({
                    '-webkit-transform': 'none',
                    'transform': 'none'
                }).hide();
                me.options.onClose();
                me._destroy();
            });
            // mask淡出
            me.$popupMask.animate({
                opacity: 0
            }, 'fast', 'linear', function () {
                $(this).hide();
            });
        },
        /*
        * 解绑事件&清除dom
        */
        _destroy: function () {
            var me = this;
            // 解绑事件
            me.$popupFrame.off('click', '.mip-video-popup-mask,.mip-video-popup-remove');
            // 清除dom
            me.$popupFrame.empty();
        }
    };
    return PopupFrame;
});
;

define('builtins/mip_builtins', ['require', 'gesture', 'viewport', 'registerMipElement', 'builtins/mip-gif', 'builtins/mip-img', 'extensions/mip-carousel', 'extensions/mip-iframe', 'builtins/mip-video', 'builtins/mip-appdl'], function(require){
    /**
    * 初始化相关JS
    */
    window.MIP = {};

    MIP.css = {};

    /**
     *  初始化touch手势
     * */
    var gesture = require('gesture');
    gesture.init();

    /**
     *  初始化视图
     * */
    var viewport = require('viewport');

    /*
    if (window.parent && window.parent != window){
        var target = window.parent;
        var pageMessageCenter = require('message_center');
        gesture.onChange(function(event){
            //console.log("in iframe: start postMessage");
            //console.log(event);
            pageMessageCenter.sendRequest(target,event);
        });
    }
    */

    /**
     *  订阅相关逻辑
     *  TODO:封装成模块
     * */
    /*
    function subscribe(){
        var isSub = false;
        $('.subscrib-action').on("click",function(ev){
            var clickEv = ev;
            $this = $(this);
            $this.children("div").fadeOut(400,"linear",function(){
                $this.children(".subscrib-ok").fadeIn(200);
                clickEv.stopPropagation();
            });
        });
    }
    $(subscribe);
    */

    /**
     *  web compenent组件初始化
     * */
    require('registerMipElement');

    /***
     *  注册统计组件
     * /
    require(['dom/mip-pix'],function(mipPix){
        window.registerMipElement('mip-pix',mipPix);
    });

    /*
     *注册mip-gif组件
     */
    MIP.registerMipElement('mip-gif', require('builtins/mip-gif'));

    /*
     * 注册mip-img组件
     */
    MIP.registerMipElement('mip-img',require('builtins/mip-img'));

    /*
     * 注册mip-carousel组件
     */
    MIP.registerMipElement('mip-carousel',require('extensions/mip-carousel'));

    /*
     * 注册mip-iframe组件
     */
    MIP.registerMipElement('mip-iframe',require('extensions/mip-iframe'));

    /*
     * 注册mip-video组件
     */
    MIP.registerMipElement('mip-video',require('builtins/mip-video'));

    /**
     * 注册mip-appdl下载组件
     */
    
    MIP.registerMipElement('mip-appdl',require('builtins/mip-appdl'));




    //页面初始化后，处理可视区域内元素
    $(function(){
        window.setTimeout(function(){
            $('.mip-element').each(function(){
                this.inviewCallback();
            });
        },100);
    });

    //元素绑定scroll，用于lazy load等场景
    viewport.onScroll(function(){
        $('.mip-element').each(function(){
            this.inviewCallback();
        });
    });

    //页面传递消息给父页面
    window.parent.postMessage({
        event: 'mippageload',
        data: {
            time: new Date().getTime()
        }
    }, '*');

    /**
     *  初始化图片浏览组件，并处理viewport中的事件冲突
     * */
    /*
    require(['dom/mip-carousel'],function(mipCarousel){
        mipCarousel.initData();
        $(window).bind("mip.carousel.open", function() {
            viewport.setViewportNormal(false);
        });
        $(window).bind("mip.carousel.close", function() {
            viewport.setViewportNormal(true);
        });
    });
    */

   /*
    require(['dom/img-viewer'], function (mipViewer) {
        new mipViewer();
    });
    */

});
require(['builtins/mip_builtins']);
