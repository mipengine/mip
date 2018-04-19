/**
 * @file mip-img 图片组件
 * @author wangpei07,JennyL
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


    // 取值根据 https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
    var imgAttributes = [
        'alt',
        'ismap',
        'src',
        'sizes',
        'srcset',
        'usemap',
        'title'
    ];

    // XXX: jpg 是 jpeg 的简写，在URL中都有出现，所以有相同的宽高比
    var imgRatio = {
        jpg: 1.33,
        jpeg: 1.33,
        png: 1,
        gif: 1,
        webp: 1,
        other: 1
    };

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

    /**
     * 从mip-img属性列表里获取属性
     *
     * @param {Object} attributes 参考: https://dom.spec.whatwg.org/#interface-namednodemap
     * @return {Object} 属性列表JSON
     * @example
     * {
     *     "src": "http://xx.jpeg"
     *     "width": "720"
     * }
     */
    function getAttributeSet(attributes) {
        var attrs = {};
        Array.prototype.slice.apply(attributes).forEach(function (attr) {
            attrs[attr.name] = attr.value;
        });
        return attrs;
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

        // 创建图片预览图层
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

            var onResize = function () {
                imgOffset = getImgOffset(img);
                css(popupImg, imgOffset);
                naboo.animate(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
            };
            window.addEventListener('resize', onResize);

            css(popupImg, imgOffset);
            css(popupBg, 'opacity', 1);
            css(popup, 'display', 'block');

            naboo.animate(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
            css(img, 'visibility', 'hidden');
            css(img.parentNode, 'zIndex', 'inherit');
        }, false);
    }

    var bindLoad = function (element, img, mipEle) {
        img.addEventListener('load', function () {
            img.classList.remove('mip-img-loading');
            element.classList.add('mip-img-loaded');
            element.customElement.resourcesComplete();
            mipEle.placeholder && mipEle.placeholder.remove();
        }, false);

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
    function errorHandle(img) {
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
    }

    function firstInviewCallback() {
        var ele = this.element.querySelector('img');
        if (ele) {
            return;
        }

        var ele = this.element;
        var img = new Image();

        if (this.placeholder) {
            img.classList.add('mip-img-loading');
        }

        this.applyFillContent(img, true);

         // transfer attributes from mip-img to img tag
        this.attributes = getAttributeSet(this.element.attributes);
        for (var k in this.attributes) {
            if (this.attributes.hasOwnProperty(k) && imgAttributes.indexOf(k) > -1) {
                if (k === 'src') {
                    // src attribute needs to be mip-cached
                    var imgsrc = util.makeCacheUrl(this.attributes.src, 'img');
                    img.setAttribute(k, imgsrc);
                }
                else if (k === 'srcset') {
                    var imgSrcset = this.attributes.srcset;
                    var reg = /[\w-/]+\.(jpg|jpeg|png|gif|webp|bmp|tiff) /g;
                    var srcArr = imgSrcset.replace(reg, function (url) {
                        return util.makeCacheUrl(url, 'img');
                    });
                    img.setAttribute('srcset', srcArr);

                }
                else {
                    img.setAttribute(k, this.attributes[k]);
                }
            }
        }


        ele.appendChild(img);
        if (ele.hasAttribute('popup')) {
            bindPopup(ele, img);
        }

        bindLoad(ele, img, this);
    }

    customElem.prototype.firstInviewCallback = firstInviewCallback;

    /**
    * Placeholder 占位
    *
    * @class
    * @param {Object} element 要添加占位的元素
    */
    var Placeholder = function (element) {
        this.targetEle = element;
    };

    Placeholder.prototype.init = function () {
        this.imgType = this._getImgType(this.targetEle);
        this._add(this.imgType);
    };

    Placeholder.prototype._add = function (type) {
        var placeholder = this.placeholder = document.createElement('div');
        placeholder.classList.add('mip-placeholder');
        placeholder.classList.add('mip-placeholder-' + type);

        this.targetEle.appendChild(placeholder);
    };

    Placeholder.prototype.remove = function () {
        var parent = this.placeholder.parentElement;
        parent && parent.removeChild(this.placeholder);
    };

    /**
     * read img src/srcset and get img type
     *
     * @param  {Object} ele target mip-img element
     * @return {string}     type of img
     */
    Placeholder.prototype._getImgType = function (ele) {
        var srcString = ele.getAttribute('src') || ele.getAttribute('srcset');
        var imgType = '';
        for (var type in imgRatio) {
            if (srcString.match(type)) {
                imgType = type;
            }
        }
        return imgType || 'other';
    };

    customElem.prototype.createdCallback = function () {
        var element = this.element;
        var layoutAttr = element.getAttribute('layout');
        var heightAttr = element.getAttribute('height');
        if (layoutAttr || heightAttr) {
            // do nothing, use layout as placeholder: Layout.applyLayout
        }
        else {
            // 如果没有layout，则增加默认占位
            this.placeholder = new Placeholder(element);
            this.placeholder.init();
        }
    };

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
