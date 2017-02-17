/**
 * @file mip-carousel 轮播组件
 *
 * @author fengchuantao
 * @modify wangpei07 2016-11-30
 */
define(function (require) {
    var customElem = require('customElement').create();
    customElem.prototype.build = function () {
        var constElementObj = this.element;
        var constSelf = this;
        var constEleWidth = constElementObj.clientWidth;

        // 获取用户填写属性
 
        // 是否自动播放
        var constAutoPlayCard = constElementObj.hasAttribute('autoplay');

        // 图片间隔时长默认为4000
        var constDefer = constElementObj.getAttribute('defer');
        var constDeferNum = !!constDefer ? constDefer : 4000;

        // 分页显示器
        var constIndicatorShow = constElementObj.hasAttribute('indicator');

        // 翻页按钮
        var constButtonController = constElementObj.hasAttribute('buttonController');

        // Gesture锁
        var LockGesture = {
            'stop': 1
        };

        // btn按钮手势锁
        var btnLock = {
            'stop': 1
        };

        // 缓存上一次手势位置
        var prvGestureClientx = 0;

        // 缓存当前值轮播位置
        var NowGestureClientx = -constEleWidth;

        // 当前图片显示索引
        var imgIndex = 1;

        // 图片显示个数
        // 其实图片个数应该为实际个数+2.copy了头和尾的两部分
        var childImgNum = 0;

        // 定时器时间hold
        var setTimeHold;

        // 获取carousel下的所有节点
        var domHtmlArray = getChildNode(constElementObj);

        // 拼接html
        pieceDom(domHtmlArray);

        // 禁止左右滑动配置
        var startPos = {};
        var endPos = {};
        var isScrolling = 0;

        // 绑定手势事件
        bindGesture();


        // 自动轮播
        if (!!constAutoPlayCard) {
            autoPlay();
        }

        // 指示器
        if (!!constIndicatorShow) {
            indicator();
        }

        // 控制按钮
        if (!!constButtonController) {
            cratebutton();
        }

        // 获取carouse标签下所有非mip-i-space元素
        function getChildNode(element) {
            var allChild = element.children;
            var arrNode = Array.prototype.slice.call(allChild);
            var domHtmlArray = [];

            arrNode.map(function (ele, i) {
                if (ele.tagName.toLowerCase() !== 'mip-i-space') {
                    if (element.hasAttribute('autoplay')) {
                        if (ele.hasAttribute('popup')) {
                            ele.removeAttribute('popup');
                        }
                    }

                    domHtmlArray.push(ele);
                    element.removeChild(ele);
                }

            });

            // 拷贝第一个和最后一个节点拼接dom
            var firstCard = domHtmlArray[0].cloneNode(true);
            var endCard = domHtmlArray[domHtmlArray.length - 1].cloneNode(true);
            domHtmlArray.unshift(endCard);
            domHtmlArray.push(firstCard);
            return domHtmlArray;
        }

        // 将getChildNode获取的元素拼装轮播dom节点输出到文档
        function pieceDom(domArray) {
            // 如何dom数组长度为0,则返回,否则拼接dom元素输出到页面
            if (domHtmlArray.length === 0) {
                return;
            }

            childImgNum = domHtmlArray.length;

            var carouselBox = document.createElement('div');
            carouselBox.className = 'mip-carousel-container';

            var wrapBox = document.createElement('div');
            wrapBox.className = 'mip-carousel-wrapper';

            domArray.map(function (ele, i) {
                var slideBox = document.createElement('div');
                slideBox.className = 'mip-carousel-slideBox';
                slideBox.appendChild(ele);
                slideBox.style.width = (100 / childImgNum) + '%';
                wrapBox.appendChild(slideBox);
            });

            wrapBox.style.width = childImgNum * 100 + '%';

            carouselBox.appendChild(wrapBox);
            constElementObj.appendChild(carouselBox);


            // 初始渲染时应该改变位置到第一张图
            var initPostion = -constEleWidth;
            wrapBox.style.webkitTransform = 'translate3d(' + initPostion + 'px, 0, 0)';


            // 遍历mip-img计算布局
            domArray.map(function (ele, i) {
                constSelf.applyFillContent(ele, true);
                var allImg = ele.querySelectorAll('mip-img');
                 MIP.prerenderElement(ele);
                for (var index = 0; index < allImg.length; index++) {
                    constSelf.applyFillContent(allImg[index], true);
                    MIP.prerenderElement(allImg[index]);
                }
            });
        }

        // 监听轮播手势滚动
        function bindGesture() {
            // 手势移动的距离
            var diffNum = 0;

            // 获取到轮播节点与图片父节点
            var wrapBox = constElementObj.querySelector('.mip-carousel-wrapper');

            // 绑定手势点击事件
            wrapBox.addEventListener('touchstart', function (event) {
                // 以下兼容横屏时禁止左右滑动
                var touch = event.targetTouches[0];
                startPos = {
                    x: touch.pageX,
                    y: touch.pageY,
                    time: (+new Date)
                };
                isScrolling = 0; // 这个参数判断是垂直滚动还是水平滚动

                // 获取手势点击位置
                prvGestureClientx = touch.pageX;
                clearInterval(setTimeHold);
            }, false);

            wrapBox.addEventListener('touchmove', function (event) {
                
                // 阻止触摸事件的默认行为，即阻止滚屏
                var touch = event.targetTouches[0];
                endPos = {
                    x: touch.pageX - startPos.x,
                    y: touch.pageY - startPos.y
                };
                isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; // isScrolling为1时，表示纵向滑动，0为横向滑动
                if (isScrolling === 0) {
                    event.preventDefault();
                }

                // 获取手指移动的距离
                diffNum = event.targetTouches[0].pageX - prvGestureClientx + NowGestureClientx;

                // 外框同步运动
                translateFn(diffNum, '0ms');

                // 滚动手势锁 正在滑动
                LockGesture.stop = 0;

            }, false);

            wrapBox.addEventListener('touchend', function (event) {
                // 如果不是图片的时候应该阻止事件
                if (event.target.tagName.toLocaleLowerCase() !== 'img') {
                    event.preventDefault();
                }

                var endPosition = 0;

                //  只有滑动之后才会触发
                if (!LockGesture.stop) {
                    // 判断滑动方向
                    // 右滑
                    if (diffNum > NowGestureClientx) {
                        endPosition = thresholdRight(diffNum);
                    }
                    else {
                        endPosition = thresholdLeft(diffNum);
                    }

                    imgSlide(endPosition);
                    LockGesture.stop = 1;
                }

                // 如果存在自动则调用自动轮播
                if (constAutoPlayCard) {
                    autoPlay();
                }

            }, false);
        }

        // 左滑阀值判断，如果超过阀值应该自动滑动
        function thresholdLeft(diffNum) {
            var everyWidtj = constEleWidth;
            var thresholdNum = -(imgIndex * everyWidtj + (everyWidtj * 0.2));
            var endPosition = 0;

            if (thresholdNum > diffNum) {
                endPosition = -everyWidtj * (imgIndex + 1);
                imgIndex = imgIndex + 1;
            }
            else {
                endPosition = -everyWidtj * (imgIndex);
            }

            return endPosition;
        }

        // 右滑阀值判断，如果超过阀值应该自动滑动
        function thresholdRight(diffNum) {
            var everyWidtj = constEleWidth;
            var thresholdNum = -((imgIndex - 1) * everyWidtj + (everyWidtj * 0.8));
            var endPosition = 0;

            if (thresholdNum > diffNum) {
                endPosition = -everyWidtj * (imgIndex);
            }
            else {
                endPosition = -everyWidtj * (imgIndex - 1);
                imgIndex = imgIndex - 1;
            }

            return endPosition;
        }

        // 自动轮播
        function autoPlay() {
            setTimeHold = setInterval(function () {
                var everyWidtj = constEleWidth;
                var endPosition = -everyWidtj * (imgIndex + 1);
                imgIndex = imgIndex + 1;
                imgSlide(endPosition);
            }, constDeferNum);
        }

        // 创建指示器
        function indicator() {
            var indicatorBox = document.createElement('div');
            var indicatorBoxWrap = document.createElement('p');
            var indicatorNow = document.createElement('span');
            var indicatorAllNum = document.createElement('span');

            indicatorBox.className = 'mip-carousel-indicatorbox';
            indicatorBoxWrap.className = 'mip-carousel-indicatorBoxwrap';
            indicatorNow.className = 'mip-carousel-indicatornow';

            indicatorAllNum.innerHTML = '/' + (childImgNum - 2);

            indicatorNow.innerHTML = imgIndex;

            indicatorBoxWrap.appendChild(indicatorNow);
            indicatorBoxWrap.appendChild(indicatorAllNum);

            indicatorBox.appendChild(indicatorBoxWrap);

            constElementObj.appendChild(indicatorBox);
        }

        // 指示器数字变化
        function indicatorChange() {
            if (!constIndicatorShow) {
                return;
            }

            var nowIndex = imgIndex;
            if (nowIndex <= 0) {
                nowIndex = childImgNum - 2;
            }
            else if (nowIndex > childImgNum - 2) {
                nowIndex = 1;
            }

            var indicatorNow = constElementObj.querySelector('.mip-carousel-indicatornow');
            indicatorNow.innerHTML = nowIndex;
        }


        // 创建左右轮播切换btn
        function cratebutton() {
            var preBtn = document.createElement('p');
            preBtn.className = 'mip-carousel-preBtn';
            var nextBtn = document.createElement('p');
            nextBtn.className = 'mip-carousel-nextBtn';

            constElementObj.appendChild(preBtn);
            constElementObj.appendChild(nextBtn);
            bindBtn();
        }


        // 绑定按钮切换事件
        function bindBtn() {
            constElementObj.querySelector('.mip-carousel-preBtn').addEventListener('touchend', function (event) {
                var everyWidtj = constEleWidth;
                if (!btnLock.stop) {
                    return;
                }

                btnLock.stop = 0;

                var endPosition = -everyWidtj * (imgIndex - 1);
                imgIndex = imgIndex - 1;

                clearInterval(setTimeHold);
                imgSlide(endPosition);
                if (constAutoPlayCard) {
                    autoPlay();
                }

            }, false);

            constElementObj.querySelector('.mip-carousel-nextBtn').addEventListener('touchend', function (event) {
                var everyWidtj = constEleWidth;
                if (!btnLock.stop) {
                    return;
                }

                btnLock.stop = 0;

                var endPosition = -everyWidtj * (imgIndex + 1);
                imgIndex = imgIndex + 1;
                clearInterval(setTimeHold);
                imgSlide(endPosition);
                if (constAutoPlayCard) {
                    autoPlay();
                }

            }, false);
        }

        // 图片滑动处理与手势滑动函数endPosition为最终距离,Duration变换时间
        function imgSlide(endPosition, Duration) {
            var wrapBox = constElementObj.querySelector('.mip-carousel-wrapper');

            if (Duration) {
                translateFn(endPosition, '0ms');
                wrapBox.style.transitionDuration = '0ms';
            }
            else {
                translateFn(endPosition, '300ms');
                wrapBox.style.transitionDuration = '300ms';
            }

            if (imgIndex === childImgNum - 1) {
                NowGestureClientx = -constEleWidth;
                imgIndex = 1;
                setTimeout(function () {
                    translateFn(NowGestureClientx, '0ms');
                    btnLock.stop = 1;
                }, 300);
            }
            else if (imgIndex === 0) {
                // 如果是最后一个图
                NowGestureClientx = -(childImgNum - 2) * constEleWidth;
                imgIndex = childImgNum - 2;
                setTimeout(function () {
                    translateFn(NowGestureClientx, '0ms');
                    btnLock.stop = 1;

                }, 300);
            }
            else {
                NowGestureClientx = endPosition;
                btnLock.stop = 1;
            }
            indicatorChange();
        }


        // 横竖屏兼容处理
        window.addEventListener('resize', function () {
            constEleWidth = constElementObj.clientWidth;
            var endPosition = -constEleWidth * (imgIndex);
            imgSlide(endPosition, '0ms');
        }, false);

        // 移动函数
        function translateFn(value, time) {
            var wrapBox = constElementObj.querySelector('.mip-carousel-wrapper');
            wrapBox.style.webkitTransform = 'translate3d(' + value + 'px, 0px, 0px)';
            wrapBox.style.transitionDuration = time;
        }

    };

    return customElem;
});
