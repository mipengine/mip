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
    var viewer = require('viewer');
    var errHandle;

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
        if (!!mipPopWrap && mipPopWrap.getAttribute('data-name') === 'mip-img-popUp-name'
            && mipPopWrap.parentNode.tagName.toLowerCase() === 'body') {
            mipPopWrap.querySelector('img').setAttribute('src', img.src);
            return mipPopWrap;
        }

        var popup = document.createElement('div');
        // 阻止纵向滑动
        new Gesture(popup, {
            preventY: true
        });
        popup.className = 'mip-img-popUp-wrapper';
        popup.setAttribute('data-name', 'mip-img-popUp-name');

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
                naboo.animate(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
            };
            window.addEventListener('resize', onResize);

            popup = createPopup(element, img);
            popupBg = popup.querySelector('.mip-img-popUp-bg');
            popupImg = popup.querySelector('img');

            popup.addEventListener('click', imagePop, false);

            function imagePop() {
                naboo.animate(popupBg, {
                    opacity: 0
                }).start();
                naboo.animate(popupImg, getImgOffset(img)).start(function () {
                    css(img, 'visibility', 'visible');
                    css(popup, 'display', 'none');
                });
                popup.removeEventListener('click', imagePop, false);
            }

            var imgOffset = getImgOffset(img);

            css(popupImg, imgOffset);
            css(popupBg, 'opacity', 1);
            css(popup, 'display', 'block');

            naboo.animate(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
            css(img, 'visibility', 'hidden');
            css(img.parentNode, 'zIndex', 'inherit');
        }, false);
    }

    var bindEvent = function (element, img) {
        img.addEventListener('load', function () {
            element.classList.add('mip-img-loaded');
            element.customElement.resourcesComplete();
        });

        // Http header accept has 'image/webp', But browser don't support
        // Set image visibility hidden in order to hidden extra style
        errHandle = errorHandle.bind(null, img);
        img.addEventListener('error', errHandle, false);
    };

    /**
     * Trigger when image load error
     *
     * @param {HTMLElement} img image element
     */
    function errorHandle (img) {
        if (!viewer.isIframed) {
            return;
        }
        var ele = document.createElement('a');
        ele.href = img.src;
        if (!/(\?|&)mip_img_ori=1(&|$)/.test(ele.search)) {
            var search = ele.search || '?';
            ele.search += (/[\?&]$/.test(search) ? '' : '&') + 'mip_img_ori=1';
            img.src = ele.href;
        }
        img.removeEventListener('error', errHandle);
    };

    function firstInviewCallback() {
        var ele = this.element.querySelector('img');
        if (ele) {
            return;
        }
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

        bindEvent(ele, _img);
    }

    customElem.prototype.firstInviewCallback = firstInviewCallback;

    customElem.prototype.attributeChangedCallback = function (attributeName, oldValue, newValue, namespace) {
        if (attributeName === 'src' && oldValue !== newValue) {
            this.element.querySelector('img').src = newValue;
        }
    };

    customElem.prototype.hasResources = function () {
        return true;
    };

    return customElem;

});