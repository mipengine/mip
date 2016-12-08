/**
 * @file mip-carousel 轮播组件
 *
 * @author fengchuantao
 * @modify wangpei07 2016-11-30
 */
define(function (require) {
    var customElem = require('customElement').create();
    var Gesture = require('utils/gesture');
    var util = require('util');
    var css = util.css;
    var naboo = require('naboo');
    var eventHelper = util.event;

    customElem.prototype.build = function () {
        var self = this;
        var element = self.element;

        // 元素高度判断
        var height = element.getAttribute('height');
        if (!height) {
            return;
        }

        // 获取图片子节点
        var children = Array.prototype.slice.call(element.children);

        children = children.filter(function (element) {
            return element.tagName.toLowerCase() !== 'mip-i-space'
            && element.tagName.toLowerCase() !== 'div';
        });

        // 子节点个数
        var len = children.length;

        // 子节点个数判断
        if (len < 2) {
            console.error('mip-img 元素的个数必须大于 1 个');
            return;
        }

        // 被隐藏的图片的left属性值
        var HIDE_LEFT = -9999;

        // 轮播动画时长
        var DURATION = 300;

        // 当前展示的图片序号
        var currentIndex = 0;

        // 指示器容器
        var indicators;

        // 如果mip-carousel里子节点是mip-img，并且mip-img弹出了浮层
        var isMipImgPop = false;

        // 当前是否处于轮播动画中
        var isAnimating = false;

        // 自动轮播时间间隔
        var defer = 2000;

        // 是否需要自动轮播
        var autoTimer;

        // 自动播放控制开关
        var isAutoPlay = false;

        // 自控播放属性
        var autoAttr = element.getAttribute('autoplay');

        // 图片列表
        var mipImgList = element.querySelectorAll('mip-img');

        // 指示器
        var hasIndicator = element.hasAttribute('indicator');

        // 指示器节点
        var indicatorNode;

        var prenode;
        var nextnode;

        var indicatorWrap;

        var subtitle;

        /**
         * 轮播思路：轮播只涉及2张图片，分别是当前图片和下一张要出现的图片，把下一张图片放到当前图片的前面或者后面
         * 然后移动到当前图片的位置，其余不涉及的图片全部设置left:-9999px，当前图片设置left:0，具体可以看效果
         */
        css(children, {
            position: 'absolute',
            left: HIDE_LEFT,
            top: 0,
            height: '100%',
            width: '100%'
        });
        css(children[currentIndex], 'left', 0);

        // 图片布局设置
        for (var i = 0; i < len; i++) {
            self.applyFillContent(mipImgList[i], true);
            
            // 屏蔽popup 事件
            if (mipImgList[i].hasAttribute('popup')) {
                mipImgList[i].removeAttribute('popup')
            }
        }

        /**
         * [change 翻页操作]
         *
         * @param  {boolean} flag [向前翻页还是向后]
         */
        function change(flag) {
            if (!isAnimating) {
                autoTimer && clearTimeout(autoTimer);
                switchItem(flag).then(function () {
                    if (isAutoPlay) {
                        autoPlay(defer);
                    }
                });
            }
        }

        // 如果需要翻页按钮，则创建
        if (element.hasAttribute('buttonController')) {
            prenode = document.createElement('a');
            nextnode = document.createElement('a');

            prenode.classList.add('preBtn');
            nextnode.classList.add('nextBtn');
            element.appendChild(prenode);
            element.appendChild(nextnode);

            prenode.addEventListener('touchend', function (event) {
                event.preventDefault(); 
                change(false);
            });

            nextnode.addEventListener('touchend', function (event) {
                event.preventDefault(); 
                change(true);
            });
        }

        // 如果需要指示器，则创建
        if (hasIndicator) {
            var cnt = len;
            var html = [];
            while (cnt--) {
                html.push('<span></span>');
            }

            indicatorNode = document.createElement('div');
            indicatorNode.classList.add('mip-carousel-indicator');
            indicatorNode.innerHTML = html.join('');
            element.appendChild(indicatorNode);
            indicators = indicatorNode.querySelectorAll('span');
            indicators[currentIndex].classList.add('mip-carousel-current-indicator');

            // 浮层背景色设置
            indicatorWrap = element.querySelector('.mip-carousel-indicator');
            subtitle = mipImgList[currentIndex].querySelector('.mip-carousle-subtitle');
            css(indicatorWrap, {'background-color': subtitle ? '' : 'rgba(0, 0, 0, 0.3)'});
            css(subtitle, {'background-color': subtitle ? 'rgba(0, 0, 0, 0.3)' : ''});
        }

        /**
         * 切换图片函数
         *
         * @param  {boolean} forward 前进(true)或者后退(false)
         *
         * @return {Object}         Deferred/Promise对象
         */
        function switchItem(forward) {
            var index = forward ? (currentIndex + 1) : (currentIndex - 1);
            if (index < 0) {
                index = len - 1;
            }
            else if (index >= len) {
                index = 0;
            }

            // 指示器效果
            if (hasIndicator) {
                indicators[currentIndex].classList.remove('mip-carousel-current-indicator');
                indicators[index].classList.add('mip-carousel-current-indicator');
            }

            var child = children[index];
            subtitle = child.querySelector('.mip-carousle-subtitle');

            css(indicatorWrap, {'background-color': subtitle ? '' : 'rgba(0, 0, 0, 0.3)'});
            css(subtitle, {'background-color': subtitle ? 'rgba(0, 0, 0, 0.3)' : ''});

            // 图片占据的一屏宽度
            var perWid = element.offsetWidth || window.innerWidth;
            var left = (forward ? 1 : -1) * perWid;
            var _promise;
            var filterElements = children.filter(function (element, i) {
                return (i !== currentIndex && i !== index);
            });
            css(filterElements, 'left', HIDE_LEFT);
            css(children, {
                display: 'block',
                opacity: 1,
                zIndex: 1
            });

            css(child, {
                left: left,
                zIndex: 2
            });

            // 手动触发不可见区域的mip-img
            if (child.tagName.toLocaleLowerCase() === 'mip-img') {
                MIP.prerenderElement(child);
            }
            else {
                var imgList = child.querySelectorAll('mip-img');
                for (var i = 0; i < imgList.length; i++) {
                    MIP.prerenderElement(imgList[i]);
                }
            }
            isAnimating = true;

            _promise = new Promise(function (resolve, reject) {
                naboo.css(child, {
                    left: 0
                }, DURATION, function () {
                    currentIndex = index;
                    resolve();
                    isAnimating = false;
                }).start();
            });
            var currChild = children[currentIndex];
            css(currChild, 'opacity', 1);
            naboo.css(currChild, {
                opacity: 0
            }, DURATION).start(function () {
                css(currChild, {
                    opacity: 1,
                    display: 'none'
                });
            });

            return _promise;
        }

        function autoPlay(time) {
            autoTimer = setTimeout(function () {
                switchItem(true).then(function () {
                    autoPlay(time);
                });
            }, time);
        }

        if (autoAttr === 'autoplay' || autoAttr === '') {
            var deferAttr = element.getAttribute('defer');
            defer = deferAttr && (typeof +deferAttr === 'number') ? +deferAttr : defer;
            isAutoPlay = true;
            autoPlay(defer);
        }
        else {
            element.removeAttribute('autoplay');
        }

        var gesture = new Gesture(element);
        gesture.on('swipeleft swiperight', function (event, data) {
            change(data.type !== 'swiperight');
        });

        if (isAutoPlay) {
            var nodes = [prenode, nextnode, indicatorNode]
            eventHelper.delegate(element, 'mip-img', 'click', function () {
                if (this.hasAttribute('popup')) {
                    autoTimer && clearTimeout(autoTimer);
                    isMipImgPop = true;
                    css(nodes, {display: 'none'});
                }
            });
            eventHelper.delegate(element, '.mip-img-popUp-wrapper', 'click', function () {
                autoPlay(defer);
                isMipImgPop = false;
                css(nodes, {display: 'block'});
                return false;
            });
        }

    };

    return customElem;
});
