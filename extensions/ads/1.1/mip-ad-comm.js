/**
 * 通用广告
 * 
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function (){

    var $ = require('zepto');
    /**
     * render
     *
     */
    var render = function(_this, me) {

        var tpl = _this.getAttribute('tpl');

        switch(tpl) {
            case 'onlyImg':
                renderOnlyImg(_this, me);
                break;
            case 'noneImg':
                renderNoneImg(_this, me);
                break;
            case 'oneImg':
                renderOneImg(_this, me);
                break;
            case 'moreImg':
                renderMoreImg(_this, me);
                break;
        }
    };


    /**
     * [renderOnlyImg banner样式渲染函数]
     * 
     * @return
     */
    function renderOnlyImg(_this, me) {
        var $this = $(_this);

        var url = _this.getAttribute('href');
        var src = _this.getAttribute('src');
        var size = $this.data('size').trim().split(' ');
        var ratio = (size[1]/size[0]*100).toFixed(2);

        var html = [
            '<div class="mip-ad-bannerbox" style="padding-bottom:'+ ratio +'%;">',
            '    <img src="'+ src +'">',
            '</div>'
        ].join('');

        var node = document.createElement("a");
        node.setAttribute('href', url);
        node.classList.add('c-urljump');
        node.innerHTML = html;

        $this.append(node);

        me.applyFillContent(node, true);
        
    }


    /**
     * [renderNoneImg 无图样式渲染函数]
     * 
     * @return
     */
    function renderNoneImg(_this, me) {
        var $this = $(_this);

        var url = _this.getAttribute('href');
        var title = $this.data('title');

        var html = [
            '<div class="mip-ad-row">',
            '    <div class="c-span12 c-line-clamp2">',
            '        ' + title,
            '    </div>',
            '</div>'
        ].join('');

        var node = document.createElement("a");
        node.setAttribute('href', url);
        node.className += 'c-blocka c-urljump mip-ad-box';
        node.innerHTML = html;

        $this.append(node);

        me.applyFillContent(node, true);
    }


    /**
     * [renderOneImg 单图样式渲染函数]
     * 
     * @return 
     */
    function renderOneImg(_this, me) {
        var $this = $(_this);

        var url = _this.getAttribute('href');
        var src = _this.getAttribute('src');
        var title = $this.data('title');
        var size = $this.data('size').trim().split(' ');
        var ratio = (size[1]/size[0]*100).toFixed(2);

        var html = [
            '<div class="mip-ad-row">',
            '    <div class="c-span4">',
            '        <div class="c-img c-img-x" style="padding-bottom:'+ ratio +'%;">',
            '            <img src="'+ src +'">',
            '        </div>',
            '    </div>',
            '    <div class="c-span8 c-line-clamp2">',
            '        ' + title,
            '    </div>',
            '</div>'
        ].join(''); 

        var node = document.createElement("a");
        node.setAttribute('href', url);
        node.className += 'c-blocka c-urljump mip-ad-box';
        node.innerHTML = html;

        $this.append(node);

        me.applyFillContent(node, true);
    }


    /**
     * [renderMoreImg 多图样式渲染函数]
     * 
     * @return
     */
    function renderMoreImg(_this, me) {
        var $this = $(_this);

        var url = _this.getAttribute('href');
        var src = _this.getAttribute('src').split(';');
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
                '<div class="mip-ad-row c-gap-bottom-small">',
                '    <div class="c-span12 c-title">' + title + '</div>',
                '</div>',
                '<div class="mip-ad-row">',
                '    ' + img_html,
                '</div>'
            ].join('');

            var node = document.createElement("a");
            node.setAttribute('href', url);
            node.className += 'c-blocka c-urljump mip-ad-box';
            node.innerHTML = html;

            $this.append(node);

            me.applyFillContent(node, true);
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
