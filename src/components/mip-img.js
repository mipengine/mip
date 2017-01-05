/**
 * @file mip-img 图片组件
 * @author wangpei07
 */

define(function (require) {
    'use strict';

    var util = require('util');
    var customElem = require('customElement').create();
    var Gesture = util.Gesture;
    var css = util.css;
    var rect = util.rect;
    var naboo = require('naboo');
    var viewport = require('viewport'); 

    function getPopupImgPos(imgWidth, imgHeight) {
        var width = viewport.getWidth();
        var height = Math.round(width * imgHeight / imgWidth);
        var top = (viewport.getHeight() - height) / 2;
        return {
            width: width,
            height: height,
            left: 0,
            top: top
        };
    }

    var getImgOffset = function (img) {
        var imgOffset = rect.getElementOffset(img);
        return imgOffset;
    };

    // 创建弹层 dom
    function createPopup(element, img) {
        var mipPopWrap = document.querySelector('.mip-img-popUp-wrapper');
        if (mipPopWrap) {
            mipPopWrap.querySelector('img').setAttribute('src', img.src);
            return mipPopWrap;
        }

        var popup = document.createElement('div');
        // 阻止纵向滑动
        new Gesture(popup, {
            preventY: true
        });
        popup.className = 'mip-img-popUp-wrapper';

        /*
        * 创建图片预览图层
        */
        var popUpBg = document.createElement('div');
        var innerImg = new Image();

        popUpBg.className = 'mip-img-popUp-bg';
        innerImg.className = 'mip-img-popUp-innerimg';
        innerImg.src = img.src;

        popup.appendChild(popUpBg);
        popup.appendChild(innerImg);
        document.body.appendChild(popup);

        return popup;
    }

    function bindPopup(element, img) {
        var popup;
        var popupBg;
        var popupImg;
        // 图片点击时展现图片
        img.addEventListener('click', function (event) {
            event.stopPropagation();
            // 图片未加载则不弹层
            if (img.width + img.naturalWidth === 0) {
                return;
            }

            var onResize = function () {
                imgOffset = getImgOffset(img);
                css(popupImg, imgOffset);
                naboo.css(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
            };
            window.addEventListener('resize', onResize);
            popup = createPopup(element, img);
            popupBg = popup.querySelector('.mip-img-popUp-bg');
            popupImg = popup.querySelector('img');

            popup.addEventListener('touchend', function () {
                naboo.css(popupBg, {
                    opacity: 0
                }).start();
                naboo.css(popupImg, getImgOffset(img)).start(function () {
                    css(img, 'visibility', 'visible');
                    css(popup, 'display', 'none');
                });
            }, false);

            var imgOffset = getImgOffset(img);

            css(popupImg, imgOffset);
            css(popupBg, 'opacity', 1);
            css(popup, 'display', 'block');

            naboo.css(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
            css(img, 'visibility', 'hidden');
            css(img.parentNode, 'zIndex', 'inherit');
        }, false);
    }

    var bindLoad = function (element, img) {
        img.addEventListener('load', function () {
            element.classList.add('mip-img-loaded');
            element.customElement.resourcesComplete();
        });
    };

    function firstInviewCallback() {
        var _img = new Image();
        this.applyFillContent(_img, true);
        var ele = this.element;

        var src = util.makeCacheUrl(ele.getAttribute('src'), 'img');
        _img.src = src;

        if (ele.getAttribute('alt')) {
            _img.setAttribute('alt', ele.getAttribute('alt'));
        }

        ele.appendChild(_img);
        if (ele.hasAttribute('popup')) {
            bindPopup(ele, _img);
        }

        bindLoad(ele, _img);
    }

    customElem.prototype.firstInviewCallback = firstInviewCallback;
    customElem.prototype.hasResources = function () {
        return true;
    };

    return customElem;

});
