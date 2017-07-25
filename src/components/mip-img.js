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

    // according to https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement
    var imgAttributes = [
        'alt',
        'ismap',
        'src',
        'sizes',
        'srcset',
        'usemap',
        'title'
    ];

    // XXX: jpg is abbreviation of jpge, they both appear in url and have same ratio
    var imgRatio = {
        jpg: 1.33,
        jpge: 1.33,
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
     * Get attribute Set from attribute List
     *
     * @param {NamedNodeMap} attributes the attribute list, spec: https://dom.spec.whatwg.org/#interface-namednodemap
     * @return {Object} the attribute set, legacy:
     * @example
     * {
     *     "src": "http://xx.mp4",
     *     "autoplay": "",
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
        var popAttrLegal =  mipPopWrap.getAttribute('data-name') === 'mip-img-popUp-name';
        var inBody = mipPopWrap.parentNode.tagName.toLowerCase() === 'body';

        if (!!mipPopWrap && popAttrLegal && inBody) {
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
    };

    function firstInviewCallback() {
        // if image has been initialized, stop doing it again.
        var imgEle = this.element.querySelector('img');
        if (imgEle && imgEle.length > 0) {
            return;
        }

        // initialize mip-img element
        var ele = this.element;

        var img = new Image();


        if (this.placeholder) {
            img.classList.add('mip-img-loading');
        }

        // use layout to make placeholder
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
                    var reg = /[\w-/]+.(jpg|jpeg|png|gif|webp|bmp|tiff) /g;
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

        this.targetEle.append(placeholder);
    };

    Placeholder.prototype.remove = function () {
        this.placeholder.remove();
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
        var widthAttr = element.getAttribute('width');
        var heightAttr = element.getAttribute('height');
        if (layoutAttr || (widthAttr && heightAttr)) {
            // do nothing, use layout as placeholder: Layout.applyLayout
        }
        else {
            // if no layout, add default placeholder
            this.placeholder = new Placeholder(element);
            this.placeholder.init();
        }
    };

    customElem.prototype.firstInviewCallback = firstInviewCallback;
    customElem.prototype.hasResources = function () {
        return true;
    };

    return customElem;

});
