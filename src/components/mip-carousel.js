define(function (require) {
    var customElem = require('customElement').create();
    var Gesture = require('util/gesture');
    var util = require('util');
    var css = util.css;
    var naboo = require('naboo');
    var eventHelper = util.event;

    customElem.prototype.build = function () {
        var element = this.element;

        var height = element.getAttribute('height');
        if (!height) {
            return;
        }

        var children = Array.prototype.slice.call(element.children);
        children = children.filter(function (element) {
            return element.tagName.toLowerCase() !== 'mip-i-space';
        });

        if (children.length < 2) {
            return;
        }

        // 当前展示的图片序号
        var currentIndex = 0;

        // 被隐藏的图片的left属性值
        var HIDE_LEFT = -9999;

        // 轮播动画时长
        var DURATION = 300;

        // 轮播思路：轮播只涉及2张图片，分别是当前图片和下一张要出现的图片，把下一张图片放到当前图片的前面或者后面，
        //         然后移动到当前图片的位置，其余不涉及的图片全部设置left:-9999px，具体可以看效果
        css(children, {
            'position': 'absolute',
            'left': HIDE_LEFT,
            'top': 0,
            'height':"100%",
            'width':"100%"
        });

        var mipImgList = element.querySelectorAll('mip-img');
        for (var i = 0; i < mipImgList; i++) {
            this.applyFillContent(mipImgList[i], true);
        }
        css(children[currentIndex], 'left', 0);

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
        function switchItem(forward) {
            var index = forward ? (currentIndex + 1) : (currentIndex - 1);
            if (index < 0) {
                index = children.length - 1;
            }
            else if (index >= children.length) {
                index = 0;
            }
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

            var child = children[index];

            css(child, {
                left: left,
                zIndex: 2
            });

            //手动触发不可见区域的mip-img
            if(child.tagName.toLocaleLowerCase()== "mip-img") {
                MIP.prerenderElement(child);
            }else {
                var imgList = child.querySelectorAll('mip-img');
                for (var i = 0; i < imgList.length; i++) {
                     MIP.prerenderElement(imgList[i]);
                }
            }
            isAnimating = true;

            _promise = new Promise(function(resolve, reject){
                naboo.css(child, {
                    left: 0,
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
                    'opacity': 1,
                    'display': 'none'
                });
            });

            return _promise;
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
        var autoAttr = element.getAttribute('autoplay');
        if (autoAttr === 'autoplay' || autoAttr === '') {
            var deferAttr = element.getAttribute('defer');
            if (typeof +deferAttr === 'number') {
                defer = +deferAttr;
            }
            else {
                defer = 2000;
            }
            isAutoPlay = true;
            autoPlay(defer);
        }

        var gesture = new Gesture(element);
        gesture.on('swipeleft swiperight', function (event, data) {
            if (!isAnimating) {
                autoTimer && clearTimeout(autoTimer);
                switchItem(data.type !== 'swiperight').then(function () {
                    if (isAutoPlay) {
                        autoPlay(defer);
                    }
                })
            }
        });

        if (isAutoPlay) {
            eventHelper.delegate(element, 'mip-img', 'click', function () {
                if (this.hasAttribute('popup')) {
                    autoTimer && clearTimeout(autoTimer);
                    isMipImgPop = true;
                }
            });
            eventHelper.delegate(element, '.mip-img-popUp-wrapper', 'click', function () {
                autoPlay(defer);
                isMipImgPop = false;
                return false;
            });
        }

    };

    return customElem;
});
