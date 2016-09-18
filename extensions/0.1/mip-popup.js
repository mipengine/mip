/* inline dep */
__inline('./iscroll');
__inline('./tab');
__inline('./popup');

/**
 * @file tab组件
 *
 * @author zhangjignfeng
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */

define(function() {
    var $ = require('zepto');

    var customElement = require('customElement').create();
    var Tab = require('./tab');
    var Popup = require('./popup');
    var WRAPPER_CLS = 'mip-tabs';
    var CONTENT_CLS = 'mip-tabs-content';
    var SELECTED_CLS = 'mip-tabs-nav-selected';
    var ITEM_CLS = 'mip-tabs-nav-li';
    var NAV_CLS = 'mip-tabs-nav';
    var VIEW_CLS = 'mip-tabs-nav-view';
    var TOGGLE_CLS = 'mip-tabs-nav-toggle';
    var BOTTOM_CLS = 'mip-tabs-nav-bottom';

    var EPISODE_PAGE_SIZE = 50;
    var TPL_REG = /\{\{\w}}/g;

    /**
     * 初始化
     *
     */
    customElement.prototype.init = function() {
        this.build = render;
    };


    /**
     * 渲染
     */
    function render() {
        var el = this.element;
        var $el = $(el);
        var type = el.getAttribute('type');
        var linkTpl = el.getAttribute('link-tpl');
        var $dom = null;
        var $trigle = null;
        switch (type) {
            case 'episode':
                $dom = generateEpisode.call(this, linkTpl);
                $trigle = $el;
                bindEvent.call(this, $dom);
                break;
            default:
                $trigle = $el.children().eq(0);
                $dom = $el.children().eq(1).addClass('mip-popup-dom');
        }
        generatePopup.call(this, $trigle, $dom);
    }

    function generateEpisode(linkTpl) {
        var $el = $(this.element);
        var pageSize = parseInt($el.attr('page-size'), 10) || EPISODE_PAGE_SIZE;
        var currentNum = parseInt($el.attr('current'), 10) || 1;
        var totalNum = parseInt($el.attr('total'), 10) || 1;
        var tabCount = Math.ceil(totalNum / pageSize);
        var tabCurNum = Math.floor((currentNum - 1) / pageSize);
        var tabList = [];


        for (var i = 0; i < tabCount; i++) {
            var from = pageSize * i + 1;
            var to = Math.min(totalNum, pageSize * (i + 1));
            tabList.push({
                from: from,
                to : to,
                text: '' + from + (from < to ? ' - ' + to : '')
            });
        }


        var wrapper = $('<div class="' + WRAPPER_CLS + '"></div>');
        wrapper.append(tabList.map(function (v, index) {
                var epFragment = '<div class="'
                    + CONTENT_CLS
                    + ' mip-tabs-episode-content" '
                    + (index === tabCurNum ? '' : 'style="display:none;" ')
                    + ' >';
                for (var j = v.from; j <= v.to; j++) {
                    var selectedClass = j === currentNum ? 'mip-tabs-episode-item-selected' : '';
                    var link = (linkTpl ? ' href="' + linkTpl.replace(TPL_REG, j) + '"' : '' );
                    epFragment = epFragment
                        + '<span class="mip-tabs-episode-item '
                        + selectedClass + '" '
                        + link + '>'
                        + j
                        + '</span>';
                }
                epFragment += '</div>';
                return epFragment;
            }).join(''))
            .append();

        if (tabCount > 1) {
            var tabFragment = '<div class="' + VIEW_CLS + '">'
                + '<ul class="' + NAV_CLS + ' ' + BOTTOM_CLS + '">';
            tabFragment += tabList.map(function (v, index) {
                var selectedClass = index === tabCurNum ? SELECTED_CLS : '';
                return '<li class="' + ITEM_CLS + ' ' + selectedClass + '">' + v.text + '</li>';
            }).join('');
            tabFragment += '</ul></div>';
            wrapper.append(tabFragment);

            new Tab(wrapper, {
                allowScroll: true,
                current: Math.floor((currentNum - 1) / pageSize) || 1,
                currentClass: SELECTED_CLS,
                navWrapperClass: NAV_CLS,
                viewClass: VIEW_CLS,
                contClass: CONTENT_CLS,
                navClass: ITEM_CLS,
                logClass: 'mip-tabs-log',
                toggleClass: TOGGLE_CLS
            })
        }
        return wrapper;
    }


    function generatePopup($trigle, $dom) {
        var el = this.element;
        $($trigle).on('click', function (e) {
            new Popup({
                title: el.getAttribute('title') || '',
                content: $dom,
                fullView: false,
                customClassName: 'mip-popup-custom-modal'
            });
        });
    }

    function bindEvent($dom) {
        var headTitle = this.element.getAttribute('head-title');
        $dom.delegate('.mip-tabs-episode-item', 'click' , function(ev) {

            ev.preventDefault();

            var href = $(this).attr("href");

            if (!href) {
                return;
            }


            // 顶部标题
            var head = $(this).text() || '';


            var message = {
                "event": "loadiframe",
                "data": {
                    "url": href,
                    "enc": "no",
                    "title": headTitle || head
                }
            };

            if (window.parent !== window) {
                window.parent.postMessage(message, '*');
            }
            else {
                location.href = href;
            }

        });
    }

    return customElement;

});
require(['mip-popup'], function (popup) {
    // 引入组件需要的css文件，选填
    MIP.css.mipPopup = __inline('./mip-popup.less');
    //注册组件
    MIP.registerMipElement('mip-popup', popup, MIP.css.mipPopup);
});