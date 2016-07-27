/**
 * 广告插件
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (){
    // var customElem = require('customElement');
    
    /**
     * render
     *
     */
    var render = function(_this) {
        // if (this.isRender) {
        //     return;
        // }

        // this.isRender = true;

        var tpl = _this.getAttribute('tpl');
        // console.log('tpl');
        // console.log(tpl);

        switch(tpl) {
            case 'onlyImg':
                renderOnlyImg.call(_this);
                break;
            case 'noneImg':
                renderNoneImg.call(_this);
                break;
            case 'oneImg':
                renderOneImg.call(_this);
                break;
            case 'moreImg':
                renderMoreImg.call(_this);
                break;
        }
    };

    /**
     * [renderOnlyImg banner样式渲染函数]
     * 
     * @return
     */
    function renderOnlyImg() {
        var $this = $(this);

        var url = this.getAttribute('href');
        var src = this.getAttribute('src');
        var size = $this.data('size').trim().split(' ');
        var ratio = (size[1]/size[0]*100).toFixed(2);

        var html = [
            '<a href="'+ url +'" class="c-urljump">',
                '<div class="mip-ad-bannerbox" style="padding-bottom:'+ ratio +'%;">',
                    '<img src="'+ src +'">',
                '</div>',
            '</a>'
        ].join('');

        $this.append(html);
    }

    /**
     * [renderNoneImg 无图样式渲染函数]
     * 
     * @return
     */
    function renderNoneImg() {
        var $this = $(this);

        var url = this.getAttribute('href');
        var title = $this.data('title');

        var html = [
            '<a class="c-blocka mip-ad-box" href="'+ url +'" class="c-urljump">',
            '    <div class="mip-ad-row">',
            '        <div class="c-span12 c-line-clamp2">',
            '            ' + title,
            '        </div>',
            '    </div>',
            '</a>'
        ].join('');

        $this.append(html);

    }

    /**
     * [renderOneImg 单图样式渲染函数]
     * 
     * @return 
     */
    function renderOneImg() {
        var $this = $(this);

        var url = this.getAttribute('href');
        var src = this.getAttribute('src');
        var title = $this.data('title');
        var size = $this.data('size').trim().split(' ');
        var ratio = (size[1]/size[0]*100).toFixed(2);

        var html = [
            '<a class="c-blocka mip-ad-box" href="'+ url +'" class="c-urljump">',
            '    <div class="c-row">',
            '        <div class="c-span4">',
            '            <div class="c-img c-img-x" style="padding-bottom:'+ ratio +'%;">',
            '                <img src="'+ src +'">',
            '            </div>',
            '        </div>',
            '        <div class="c-span8 c-line-clamp2">',
            '            ' + title,
            '        </div>',
            '    </div>',
            '</a>'
        ].join('');

        $this.append(html);
    }

    /**
     * [renderMoreImg 多图样式渲染函数]
     * 
     * @return
     */
    function renderMoreImg() {
        var $this = $(this);

        var url = this.getAttribute('href');
        var src = this.getAttribute('src').split(';');
        var txt = $this.data('txt') ? $this.data('txt').split(';') : [];
        var abs = $this.data('ads') ? $this.data('ads').split(';') : [];
        var title = $this.data('title') || '';
        var size = $this.data('size').trim().split(' ');
        var ratio = (size[1]/size[0]*100).toFixed(2);
        
        var len = src.length < 3 ? src.length : 3;

        var img_html = '';

        if(len >= 3) {
            for(var index = 0; index < len; index ++) {
                img_html += [
                    '<div class="c-span4">',
                    '    <div class="mip-ad-imgbox">',
                    '        <div class="c-img c-img-x" style="padding-bottom:'+ ratio +'%;">',
                    '            <img src="'+ src[index] +'">',
                    '        </div>',
                    '        ' + getLineHtml(abs[index],' mip-ad-abs'),
                    '    </div>',
                    '' + getLineHtml(txt[index],''),
                    '</div>',
                ].join('');
            }

            var html = [
                '<a class="c-blocka  mip-ad-box" href="'+ url +'" class="c-urljump">',
                '    <div class="c-row c-gap-bottom-small">',
                '        <div class="c-span12 c-title">' + title + '</div>',
                '    </div>',
                '    <div class="c-row">',
                '         ' + img_html,
                '    </div>',
                '</a>'
            ].join('');

            $this.append(html);
        }
    }

    function getLineHtml(txt, clsname) {
        if(txt) {
            return [
                '<div class="c-line-clamp1' + clsname + '">',
                '    ' + txt,
                '</div>'
            ].join('');
        }
        return '';
    }

    return {
        render: render
    };
});
