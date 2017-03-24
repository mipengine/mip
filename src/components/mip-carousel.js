/**
 * @file mip-carousel 轮播组件
 *
 * @author fengchuantao
 * @modify wangpei07 2016-11-30
 */
define(function (require) {
    var customElem = require('customElement').create();
    var util = require('util');
    var carouselParas = {
        'boxClass': 'mip-carousel-container',
        'wrapBoxClass': 'mip-carousel-wrapper',
        'slideBox': 'mip-carousel-slideBox',
        'activeitem': 'mip-carousel-activeitem',
        'threshold': 0.2,
        'isDeferNum': 4000
    };
    // 按tagName创建一个固定class的tag
    function createTagWithClass(className, tagName) {
        tagName = tagName || 'div';
        var tag = document.createElement(tagName);
        tag.className = className || '';
        return tag;
    }
    // 获取carouse标签下所有非mip layout引入的元素
    function getChildNodes(element) {
        var allChildNodes = element.children;
        var arrNode = Array.prototype.slice.call(allChildNodes);
        var childList = [];

        arrNode.map(function (ele, i) {
            if (ele.tagName.toLowerCase() !== 'mip-i-space') {
                // 如果是 autoplay，则不允许有 popup 功能
                if (element.hasAttribute('autoplay')) {
                    if (ele.hasAttribute('popup')) {
                        ele.removeAttribute('popup');
                    }
                }
                childList.push(ele);
                element.removeChild(ele);
            }

        });
        if (childList.length > 0) {
            // 拷贝第一个和最后一个节点拼接dom
            var firstCard = childList[0].cloneNode(true);
            var endCard = childList[childList.length - 1].cloneNode(true);
            childList.unshift(endCard);
            childList.push(firstCard);
        }
        return childList;
    }

    // 移动函数
    function translateFn(value, time, wrapBox) {
        wrapBox.style.webkitTransform = 'translate3d(' + value + 'px, 0px, 0px)';
        wrapBox.style.transitionDuration = time;
    }

    // 移出class
    function removeClass(dom, className) {
        if (!dom) {
            return;
        }
        var curClassName = dom.className;
        dom.className = curClassName.replace(className, '').replace(/(^\s*)|(\s*$)/g, "");
    }

    // 追加class
    function addClass(dom, className) {
        if (!dom) {
            return;
        }
        var curClassName = dom.className;
        if (!curClassName) {
            dom.className = className;
        }
        else {
            dom.className = curClassName + ' ' + className;
        }
    }

    /**
     * 计算滚动之后需要到达的坐标 resetPosAndIdx
     * @param {int} curIndex
     * @param {int} totalNum
     * @param {int} deviceWidth
     * @param {int} endPosition
     * @return {Object}
     */
    function resetPosAndIdx(curIndex, totalNum, deviceWidth, endPos) {
        var endInfo = {
            'endPos': 0,
            'endIndex': curIndex
        };
        // 
        if (curIndex === totalNum - 1) {
            endInfo.endPos = -deviceWidth;
            endInfo.endIndex = 1;
        }
        else if (curIndex === 0) {
            // if it is last one
            endInfo.endPos = -(totalNum - 2) * deviceWidth;
            endInfo.endIndex = totalNum - 2;
        }
        else {
            endInfo.endPos = endPos;
        }
        return endInfo;
    }

    // changeIndicatorStyle
    function changeIndicatorStyle(startDot, endDot, className) {
        removeClass(startDot, className);
        addClass(endDot, className);
    }
    
                        
    customElem.prototype.build = function () {
        var ele = this.element;
        var self = this;
        var eleWidth = ele.clientWidth;

        var dotItems = [];

        // 获取用户填写属性
 
        // 是否自动播放
        var isAutoPlay = ele.hasAttribute('autoplay');

        // 图片间隔时长默认为4000
        var isDefer = ele.getAttribute('defer');
        if (!!isDefer) {
            carouselParas.isDeferNum = isDefer;
        }

        // 分页显示器
        var showPageNum = ele.hasAttribute('indicator');

        // 翻页按钮
        var showBtn = ele.hasAttribute('buttonController');

        // 翻页按钮
        var indicatorId = ele.getAttribute('indicatorId');

        // Gesture锁
        var slideLock = {
            'stop': 1
        };

        // btn按钮手势锁
        var btnLock = {
            'stop': 1
        };

        // 缓存上一次手势位置
        var prvGestureClientx = 0;

        // 缓存当前值轮播位置
        var curGestureClientx = -eleWidth;

        // 当前图片显示索引
        var imgIndex = 1;

        // 定时器时间hold
        var moveInterval;

        // 禁止左右滑动配置
        var startPos = {};
        var endPos = {};
        var isScrolling = 0;

        // 获取carousel下的所有节点
        var childNodes = getChildNodes(ele);

        // 图片显示个数
        // 其实图片个数应该为实际个数+2.copy了头和尾的两部分
        var childNum = childNodes.length;

        // length 等于0时，不做任何处理
        if (childNum === 0) {
            return;
        }
        //将getChildNodes获取的元素拼装轮播dom
        var carouselBox = createTagWithClass(carouselParas.boxClass);

        var wrapBox = createTagWithClass(carouselParas.wrapBoxClass);

        childNodes.map(function (ele, i) {
            var slideBox = createTagWithClass(carouselParas.slideBox);
            slideBox.appendChild(ele);
            slideBox.style.width = (100 / childNum) + '%';
            wrapBox.appendChild(slideBox);

            // 遍历mip-img计算布局
            self.applyFillContent(ele, true);
            //inview callback  bug, TODO
            MIP.prerenderElement(ele);
            var allImgs = ele.querySelectorAll('mip-img');
            var len = allImgs.length;
            for (var idx = 0; idx < len; idx++) {
                self.applyFillContent(allImgs[idx], true);
                MIP.prerenderElement(allImgs[idx]);
            }
        });

        wrapBox.style.width = childNum * 100 + '%';

        carouselBox.appendChild(wrapBox);
        ele.appendChild(carouselBox);


        // 初始渲染时应该改变位置到第一张图
        var initPostion = -eleWidth;
        wrapBox.style.webkitTransform = 'translate3d(' + initPostion + 'px, 0, 0)';

        var wrapper = ele.querySelector('.mip-carousel-wrapper');
        
        // 绑定wrapBox的手势事件
        // 手势移动的距离
        var diffNum = 0;

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
            clearInterval(moveInterval);
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
            diffNum = event.targetTouches[0].pageX - prvGestureClientx;

            // 外框同步运动
            translateFn(diffNum + curGestureClientx, '0ms', wrapBox);

            // 滚动手势锁 正在滑动
            slideLock.stop = 0;

        }, false);

        wrapBox.addEventListener('touchend', function (event) {
            // 如果不是图片的时候应该阻止事件
            if (event.target.tagName.toLocaleLowerCase() !== 'img') {
                event.preventDefault();
            }

            var endPosition = 0;

            //  只有滑动之后才会触发
            if (!slideLock.stop) {
                var startIdx = imgIndex;
                var endIdx = startIdx;
                // 如果大于设定阈值
                if (Math.abs(diffNum) > eleWidth*carouselParas.threshold) {
                    endIndex = (diffNum > 0)?imgIndex - 1:imgIndex + 1;
                }
                move(wrapBox, startIdx, endIndex);
                slideLock.stop = 1;
            }

            // 如果存在自动则调用自动轮播
            if (isAutoPlay) {
                autoPlay();
            }

        }, false);


        // 自动轮播
        if (!!isAutoPlay) {
            autoPlay();
        }

        // 指示器
        if (!!showPageNum) {
            indicator();
        }

        // 控制按钮
        if (!!showBtn) {
            cratebutton();
        }

        // 是否关联indicator
        if (!!indicatorId) {
            indicatorDot(indicatorId);
        }

        // 左滑阀值判断，如果超过阀值应该自动滑动
        function thresholdLeft(diffNum) {
            var everyWidtj = eleWidth;
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
            var everyWidtj = eleWidth;
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
            moveInterval = setInterval(function () {
                var everyWidtj = eleWidth;
                move(wrapBox, imgIndex, imgIndex + 1);
            }, carouselParas.isDeferNum);
        }

        // 创建指示器
        function indicator() {
            var indicatorBox = createTagWithClass('mip-carousel-indicatorbox');
            var indicatorBoxWrap = createTagWithClass('mip-carousel-indicatorBoxwrap', 'p');
            var indicatorNow = createTagWithClass('mip-carousel-indicatornow', 'span');
            var indicatorAllNum = createTagWithClass('', 'span');
            indicatorAllNum.innerHTML = '/' + (childNum - 2);
            indicatorNow.innerHTML = imgIndex;
            indicatorBoxWrap.appendChild(indicatorNow);
            indicatorBoxWrap.appendChild(indicatorAllNum);
            indicatorBox.appendChild(indicatorBoxWrap);
            ele.appendChild(indicatorBox);
        }

        // 指示器数字变化
        function indicatorChange(idx) {
            if (!showPageNum) {
                return;
            }
            var indicatorNow = ele.querySelector('.mip-carousel-indicatornow');
            indicatorNow.innerHTML = idx;
        }


        // 创建左右轮播切换btn
        function cratebutton() {
            var preBtn = document.createElement('p');
            preBtn.className = 'mip-carousel-preBtn';
            var nextBtn = document.createElement('p');
            nextBtn.className = 'mip-carousel-nextBtn';

            ele.appendChild(preBtn);
            ele.appendChild(nextBtn);
            bindBtn();
        }


        // 绑定按钮切换事件
        function bindBtn() {
            ele.querySelector('.mip-carousel-preBtn').addEventListener('touchend', function (event) {
                var everyWidtj = eleWidth;
                if (!btnLock.stop) {
                    return;
                }

                btnLock.stop = 0;

                var endPosition = -everyWidtj * (imgIndex - 1);
                imgIndex = imgIndex - 1;

                clearInterval(moveInterval);
                move(wrapBox, imgIndex + 1, imgIndex);
                if (isAutoPlay) {
                    autoPlay();
                }

            }, false);

            ele.querySelector('.mip-carousel-nextBtn').addEventListener('touchend', function (event) {
                var everyWidtj = eleWidth;
                if (!btnLock.stop) {
                    return;
                }

                btnLock.stop = 0;

                var endPosition = -everyWidtj * (imgIndex + 1);
                imgIndex = imgIndex + 1;
                clearInterval(moveInterval);
                move(wrapBox, imgIndex - 1, imgIndex);
                if (isAutoPlay) {
                    autoPlay();
                }

            }, false);
        }

        // 图片滑动处理与手势滑动函数endPosition为最终距离,Duration变换时间
        function move(wrapBox, startIdx, endIdx, Duration) {
            if (!wrapBox) {
                return;
            }
            imgIndex = endIdx;
            var endPosition = -eleWidth * endIdx;
            if (Duration) {
                translateFn(endPosition, '0ms', wrapBox);
                wrapBox.style.transitionDuration = '0ms';
            }
            else {
                translateFn(endPosition, '300ms', wrapBox);
                wrapBox.style.transitionDuration = '300ms';
            }
            // resetPosAndIdx
            var posIdxObj = resetPosAndIdx(imgIndex, childNum, eleWidth, endPosition);
            curGestureClientx = posIdxObj.endPos;
            endIdx = posIdxObj.endIndex;
            imgIndex = endIdx;

            // 如果有指示器，需更新选中位置的样式
            if (dotItems.length > 0) {
                changeIndicatorStyle(dotItems[startIdx - 1], dotItems[endIdx - 1], carouselParas.activeitem);
            }
            // 如果切换了坐标，需要在动画结束后重置translatex位置
            if (curGestureClientx !== endPosition) {
                setTimeout(function () {
                    translateFn(curGestureClientx, '0ms', wrapBox);
                    btnLock.stop = 1;
                }, 300);
            }
            btnLock.stop = 1;
            indicatorChange(imgIndex);
        }

        

        // 处理圆点型指示器
        function indicatorDot(domId) {
            var indicDom = document.getElementById(domId);
            dotItems = indicDom.children;
            var dotLen = dotItems.length;

            if (dotLen === childNum - 2) {
                var everyWidth = eleWidth;
                for (var i = 0; i < dotLen; i++) {
                    dotItems[i].count = i;  
                    dotItems[i].addEventListener('click', function (event) {
                        var count = this.count;
                        clearInterval(moveInterval);
                        move(wrapBox, imgIndex, count + 1);
                        if (isAutoPlay) {
                            autoPlay();
                        }
                    });
                }
            }
            else {
                // 若个数不匹配，则隐藏掉indicator
                indicDom.style.display = 'none';
                dotItems = [];
            }
        }


        // 横竖屏兼容处理
        window.addEventListener('resize', function () {
            eleWidth = ele.clientWidth;
            move(wrapBox, imgIndex, imgIndex, '0ms');
        }, false);

        

    };

    return customElem;
});
