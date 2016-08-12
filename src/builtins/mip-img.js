define(['util'], function(util){
   var customElem = require('customElement').create();
   var build = function(){
        if(this.isRender){
            return; 
        }
        this.isRender = true;
        var _img = new Image();
        this.applyFillContent(_img, true);
        var ele = this.element;
        var src = util.urlToCacheUrl (document.location.href, ele.getAttribute('src'), 'img');
        _img.src = src;

        if(ele.getAttribute('alt')) {
            _img.setAttribute('alt', ele.getAttribute('alt'));
        }

        ele.insertBefore(_img, ele.firstChild);
        if ($(ele).attr('popup') === '' || $(ele).attr('popup') === 'popup') {
            // 弹层dom
            var popUpDom = [
                '<div class="mip-img-popUp-wrapper">',
                    '<div class="mip-img-popUp-bg"></div>',
                    '<img src="' + src + '" />',
                '</div>'
            ].join('');

            var $img = $(_img);
            var $mipImg = $(ele);

            var $popUp = $(popUpDom).insertAfter($img);
            var $popUpBg = $popUp.find('.mip-img-popUp-bg');
            var $popUpImg = $popUp.find('img');

            // 动画时长
            var DURATION = 400;

            // 点击弹层任何地方，关闭弹层
            $popUp.on('click', function () {
                // 黑色背景fadeout
                $popUpBg.fadeOut(DURATION);
                // 页面上原始图片当前所处的位置
                var currentLeft = $img.offset().left;
                var currentTop = $img.offset().top - $(window).scrollTop();
                // 弹层图片退回到原始图片的位置和大小
                $popUpImg.animate({
                    left: currentLeft,
                    top: currentTop,
                    width: $img.width(),
                    height: $img.height()
                }, DURATION, function () {
                    $popUp.hide();
                });
            });

            // 点击图片，弹出弹层
            $img.on('click', function () {
                // 图片原始宽高
                var oWid = _img.width;
                var oHei = _img.height;

                // 获取弹层中的图片最终需要的位置和大小
                var info = getPopUpImgInfo({
                    oWid: oWid,
                    oHei: oHei
                });

                // 页面原始图片当前的位置，弹层图片出现时需要与原始图片保持一致的大小和位置，营造一种原始图片弹出的效果
                var currentLeft = $img.offset().left;
                var currentTop = $img.offset().top - $(window).scrollTop();

                $popUpImg.css({
                    left: currentLeft,
                    top: currentTop,
                    width: $img.width(),
                    height: $img.height()
                });

                $popUpBg.show();
                $popUp.show();

                // 弹层图片由原始图片的位置和大小渐变到最终需要的位置和大小
                $popUpImg.animate({
                    left: info.left,
                    top: info.top,
                    width: info.wid,
                    height: info.hei
                }, DURATION);
            });
        }
    };

    /**
     * 获取图片最后展示的宽高和位置
     *
     * @param  {Object} opt [图片的原始信息]
     *                      opt.oWid(origin width): 图片原始宽度
     *                      opt.oHei(origin height): 图片原始高度
     *                      opt.uWid(user width): 用户设置的图片宽度
     *                      opt.uHei(user heigth): 用户设置的图片高度
     *                      opt.$wrapper: 最终的弹层dom
     *
     * @return {Object}     [图片在弹出层中的宽高和位置信息]
     *                      wid: 图片在弹层中的显示宽度
     *                      hei: 图片在弹层中的显示高度
     *                      left: 图片在弹层中的显示位置left
     *                      top: 图片在弹层中的显示位置top
     */
    function getPopUpImgInfo(opt) {
        // 计算前图片的宽高 before width && before height
        var bWid = +opt.oWid;
        var bHei = +opt.oHei;

        var $win = $(window);
        // 计算后图片的宽高 after width && after height
        var aWid = $win.width();
        var aHei = Math.round(aWid * bHei / bWid);

        var top = ($win.height() - aHei) / 2;

        return {
            wid: aWid,
            hei: aHei,
            left: 0,
            top: top
        };
    }


    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});
