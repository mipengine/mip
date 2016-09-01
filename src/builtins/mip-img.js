define(['util', 'naboo', 'components/rect', 'viewport', 'components/css'], 
    function(util, naboo, rect, viewport, css){

    var customElem = require('customElement').create();

    var getPopupImgPos = function (imgWidth, imgHeight) {
        var width = viewport.getWidth();
        var height = Math.round(width * imgHeight / imgWidth);
        var top = (viewport.getHeight() - height) / 2;
        return {
            width: width,
            height: height,
            left: 0,
            top: top
        }
    };

    // 创建弹层 dom
    var createPopup = function (element, img) {
        var popup = document.createElement('div');
        popup.className = 'mip-img-popUp-wrapper';
        popup.innerHTML = [
            '<div class="mip-img-popUp-bg"></div>',
            '<img src="' + img.src + '" />'
        ].join('');

        element.appendChild(popup);
        return popup;
    };

    var bindPopup = function (element, img) {
        var popup, popupBg, popupImg;
        // 图片点击时展现图片
        img.addEventListener('click', function () {
            // 图片未加载则不弹层
            if (img.width + img.naturalWidth === 0) {
                return;
            }
            if (!popup) {
                popup = createPopup(element, img);
                popupBg = popup.querySelector('.mip-img-popUp-bg');
                popupImg = popup.querySelector('img');

                popup.addEventListener('click', function () {
                    naboo.css(popupBg, {opacity: 0}).start();
                    naboo.css(popupImg, rect.getDomOffset(img)).start(function () {
                        css(popup, 'display', 'none');
                    });
                }, false);
            }

            var imgOffset = rect.getDomOffset(img);

            css(popupImg, imgOffset);
            css(popupBg, 'opacity', 1);
            css(popup, 'display', 'block');

            naboo.css(popupImg, getPopupImgPos(imgOffset.width, imgOffset.height)).start();
        }, false);
    };
    var inviewCallback = function(){
        var _img = new Image();
        this.applyFillContent(_img, true);
        var ele = this.element;
        
        var src = util.urlToCacheUrl(document.location.href, ele.getAttribute('src'), 'img');
        _img.src = src;

        if(ele.getAttribute('alt')) {
            _img.setAttribute('alt', ele.getAttribute('alt'));
        }
        ele.appendChild(_img);
        if (ele.hasAttribute('popup')) {
            bindPopup(ele, _img);
        }
    };
    customElem.prototype.inviewCallback = inviewCallback;


    return customElem;

});
