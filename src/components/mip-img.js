/**
 * @file MIP Image extension
 * @author wangpei07
 * @modify wupeng10 2017-9-14 Refactoring code and add unit test
 */
define(function (require) {
    'use strict';

    // include util function
    var util = require('util');
    var css = util.css;
    var rect = util.rect;
    var Gesture = util.Gesture;
    // include tools
    var naboo = require('naboo');
    var viewer = require('viewer');
    var viewport = require('viewport');
    // include customElement
    var customElem = require('customElement').create();

    /**
     * Trigger when element into visible area
     *
     */
    customElem.prototype.firstInviewCallback = function () {
        var ele = this.element.querySelector('img');
        if (!ele) {
            // create image
            var img = new Image();
            this.applyFillContent(img, true);

            // add attrributes on image
            var e = this.element;
            img.src = util.makeCacheUrl(e.getAttribute('src'), 'img');
            if (e.getAttribute('alt')) {
                img.setAttribute('alt', e.getAttribute('alt'));
            }
            e.appendChild(img);

            // bind event
            this.bindEvent(e, img);
        }
    };

    /**
     * Bind image element event
     *
     * @param {HTMLElement} element mip image element
     * @param {HTMLElement} img image element
     */
    customElem.prototype.bindEvent = function (element, img) {
        var self = this;
        if (element.hasAttribute('popup')) {
            img.addEventListener('click', function (e) {
                self.popupHandle(e, element, img);
            }, false);
        }

        img.addEventListener('load', function () {
            element.classList.add('mip-img-loaded');
            element.customElement.resourcesComplete();
        }, false);

        // Http header accept has 'image/webp', But browser don't support
        // Set image visibility hidden in order to hidden extra style
        self.errHandle = self.errorHandle.bind(self, img);
        img.addEventListener('error', self.errHandle, false);
    };

    /**
     * Trigger when image load error
     *
     * @param {HTMLElement} img image element
     */
    customElem.prototype.errorHandle =  function (img) {
        if (!viewer.isIframed) {
            return;
        }
        var ele = document.createElement('a');
        ele.href = img.src;

        if (/[\?&]mip_img_ori[&]*/.test(ele.search)) {
            return;
        }

        ele.search = ele.search ? ele.search : '?';
        ele.search += (/&$/.test(ele.search) ? '' : '&') + 'mip_img_ori';
        img.src = ele.href;
        img.removeEventListener('error', this.errHandle);
    };

    /**
     * Image popup event handler
     *
     * @param {Object} event event
     * @param {HTMLElement} element mip image element
     * @param {HTMLElement} img image element
     */
    customElem.prototype.popupHandle = function (event, element, img) {
        var self = this;
        event.stopPropagation();

        // if image has not load, then don't popup
        if (img.width + img.naturalWidth === 0) {
            return;
        }

        var popup = self.createPopup(img);
        var popupBg = popup.querySelector('.mip-img-popUp-bg');
        var popupImg = popup.querySelector('img');
        var imgOffset = self.getImgOffset(img);

        css(popupImg, imgOffset);
        css(popupBg, 'opacity', 1);
        css(popup, 'display', 'block');
        naboo.animate(popupImg, self.getPopupImgPos(imgOffset.width, imgOffset.height)).start();
        css(img, 'visibility', 'hidden');
        css(img.parentNode, 'zIndex', 'inherit');

        this.popHandle = this.popupClickHandle.bind(this, {
            popupBg: popupBg,
            popupImg: popupImg,
            img: img,
            popup: popup
        });
        popup.addEventListener('click', this.popHandle, false);

        this.rzHandle = this.resizeHandle.bind(this, {
            img: img,
            popupImg: popupImg,
            imgOffset: imgOffset
        });
        window.addEventListener('resize', this.rzHandle);
    };

    /**
     * Popup image cilck handler
     *
     * @param {Object} opt params
     */
    customElem.prototype.popupClickHandle = function (opt) {
        naboo.animate(opt.popupBg, {
            opacity: 0
        }).start();
        naboo.animate(opt.popupImg, this.getImgOffset(opt.img)).start(function () {
            css(opt.img, 'visibility', 'visible');
            css(opt.popup, 'display', 'none');
        });
        opt.popup.removeEventListener('click', this.popHandle, false);
    };

    /**
     * Resize event handler
     *
     * @param {Object} opt params
     */
    customElem.prototype.resizeHandle = function (opt) {
        var imgOffset = this.getImgOffset(opt.img);
        css(opt.popupImg, imgOffset);
        naboo.animate(opt.popupImg, this.getPopupImgPos(imgOffset.width, imgOffset.height)).start();
    };

    /**
     * Get popup image position rect
     *
     * @param {number} imgWidth image width
     * @param {number} imgHeight image height
     * @return {Object} rect
     */
    customElem.prototype.getPopupImgPos = function (imgWidth, imgHeight) {
        var width = viewport.getWidth();
        var height = Math.round(width * imgHeight / imgWidth);
        var top = (viewport.getHeight() - height) / 2;
        return {
            width: width,
            height: height,
            left: 0,
            top: top
        };
    };

    /**
     * Get image offset
     *
     * @param {HTMLElement} img image element
     * @return {Object} offset
     */
    customElem.prototype.getImgOffset = function (img) {
        var imgOffset = rect.getElementOffset(img);
        return imgOffset;
    };

    /**
     * Create popup
     *
     * @param {HTMLElement} img image element
     * @return {HTMLElement} popup element
     */
    customElem.prototype.createPopup = function (img) {
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

        var popUpBg = document.createElement('div');
        var innerImg = new Image();

        popUpBg.className = 'mip-img-popUp-bg';
        innerImg.className = 'mip-img-popUp-innerimg';
        innerImg.src = img.src;

        popup.appendChild(popUpBg);
        popup.appendChild(innerImg);
        document.body.appendChild(popup);

        return popup;
    };

    /**
     * Has resource, extend from custom element
     *
     * @return {boolean} whether resource existes or not
     */
    customElem.prototype.hasResources = function () {
        return true;
    };

    return customElem;

});
