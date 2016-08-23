define(function(){
    var customElem = require('customElement').create();

    var css = function (element, obj) {
        for (var i in obj) {
            element.style[i] = obj[i];
        }
    };

    customElem.prototype.build = function () {
        var element = this.element;
        var height = element.getAttribute('height');
        var width = element.getAttribute('width');
        if (height != +height || width != +width) {
            return;
        }
        var childElements = this.children;
        if (childElements.length < 2) {
            return;
        }
        childElements
    };

    var build = function () {

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
            'height':hei+"px"
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
            var _promise;
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

            var nicai = $childs.eq(index)[0];
            // console.log(nicai.inviewCallback())

            isAnimating = true;

            _promise = new Promise(function(resolve,reject){
                $childs.eq(index).animate({
                    left: 0
                }, DURATION, function () {
                    currentIndex = index;
                    resolve();
                    isAnimating = false;
                });
            });

            $childs.eq(currentIndex).fadeOut(DURATION);

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
        if ($this.attr('autoplay') === 'autoplay' || $this.attr('autoplay') === '') {
            if (typeof +_ele.getAttribute('defer') === 'number') {
                defer = +_ele.getAttribute('defer');
            }
            else {
                defer = 2000;
            }
            isAutoPlay = true;
            autoPlay(defer);
        }

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
