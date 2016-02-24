define(['deps/emit'], function (EventEmitter) {
    var $win = $(window);
    var winInfo = {
        width: $win.width(),
        height: $win.height()
    };

    function MibViewer(opt) {
        this.opt = $.extend({
            selector: '[data-carousel]',
            viewerClass: '.mib-viewer',
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

    $.extend(MibViewer.prototype, {
        init: function () {
            this.imgs = $(this.opt.selector);
            this.urlList = [];

            this.wrapper = $(this.opt.viewerClass);

            if (!this.wrapper.length) {
                this.wrapper = $('<div class="mib-viewer"/>');
                $('body').append(this.wrapper);
            }

            this.updateDirection();
        },
        createDom: function () {
            var tplSidebar = '<div class="mib-viewer-header">' +
                                '<a href="javascript:;" class="mib-viewer-header-ret"><i class="c-icon">&#xe783</i></a>' +
                                '<div class="mib-viewer-header-inner">' +
                                    '<span class="mib-viewer-header-txt"></span>' +
                                '</div>' +
                             '</div>';
            var tplHeader = '<div class="mib-viewer-viewer">' +
                                '<div class="mib-viewer-list mib-viewer-normal">';
            var tplItem = '<div class="mib-viewer-item">' +
                            '<div class="mib-viewer-item-inner">' +
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
            this.viewer = this.wrapper.find('.mib-viewer-viewer');
            this.list = this.viewer.find('.mib-viewer-list');
            this.items = this.list.find('.mib-viewer-item');

            this.header = this.wrapper.find('.mib-viewer-header');
            this.pager = this.header.find('.mib-viewer-header-txt');
            // 关闭按钮
            this.ret = this.header.find('.mib-viewer-header-ret');
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
            var horizonClassName = 'mib-viewer-horizon';
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
            this.list.removeAttr('style').addClass('mib-viewer-toright');
            this.carouselId++;
        },
        _goPrev: function () {
            this.animationStatus = '_goPrev';
            if (!this.urlList[this.carouselId - 1]) {
                this._goNormal();
                return;
            }
            this.list.removeAttr('style').addClass('mib-viewer-toleft');
            this.carouselId--;
        },
        _goCommon: function () {
            this.list.removeAttr('style').removeClass('mib-viewer-toright mib-viewer-toleft');
        },
        destroy: function () {
        }
    }, EventEmitter.prototype);

    return MibViewer;
});
