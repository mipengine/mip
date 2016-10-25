/* inline dep */
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
    var WRAPPER_CLS = 'mip-vd-tabs';
    var CONTENT_CLS = 'mip-vd-tabs-content';
    var SELECTED_CLS = 'mip-vd-tabs-nav-selected';
    var ITEM_CLS = 'mip-vd-tabs-nav-li';
    var NAV_CLS = 'mip-vd-tabs-nav';
    var VIEW_CLS = 'mip-vd-tabs-nav-view';
    var TOGGLE_CLS = 'mip-vd-tabs-nav-toggle';
    var BOTTOM_CLS = 'mip-vd-tabs-nav-bottom';

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
        if (el.isRender) {
            return;
        }

        el.isRender = true;
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
                $dom = $el.children().eq(1).addClass('mip-vd-popup-dom');
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
                    + ' mip-vd-tabs-episode-content" '
                    + (index === tabCurNum ? '' : 'style="display:none;" ')
                    + ' >';
                for (var j = v.from; j <= v.to; j++) {
                    var selectedClass = j === currentNum ? 'mip-vd-tabs-episode-item-selected' : '';
                    var link = (linkTpl ? ' href="' + linkTpl.replace(TPL_REG, j) + '"' : '' );
                    epFragment = epFragment
                        + '<span class="mip-vd-tabs-episode-item '
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
            var tabFragment = '';
            var scrollNum = 4;
            if (tabCount > scrollNum) {
                tabFragment = '<div class="' + VIEW_CLS + '">';
            }
            tabFragment += '<ul class="' + NAV_CLS + ' ' + BOTTOM_CLS + ' ' + 'mip-vd-tabs-episode-bottom-nav">';
            tabFragment += tabList.map(function (v, index) {
                var selectedClass = index === tabCurNum ? SELECTED_CLS : '';
                return '<li class="' + ITEM_CLS + ' ' + selectedClass + '">' + v.text + '</li>';
            }).join('');
            tabFragment += '</ul>';
            if (tabCount > scrollNum) {
                tabFragment += '</div>';
            }
            wrapper.append(tabFragment);
        }
        return wrapper;
    }


    function generatePopup($trigle, $dom) {
        var el = this.element;
        var $el = $(el);
        var pageSize = parseInt($el.attr('page-size'), 10) || EPISODE_PAGE_SIZE;
        var currentNum = parseInt($el.attr('current'), 10) || 1;
        var totalNum = parseInt($el.attr('total'), 10) || 1;
        var tabCount = Math.ceil(totalNum / pageSize);
        $($trigle).on('click', function (e) {
            new Popup({
                title: el.getAttribute('title') || '',
                content: $dom,
                fullView: false,
                customClassName: 'mip-vd-popup-custom-modal',
                onOpen: function () {
                    new Tab($dom, {
                        allowScroll: tabCount > 4,
                        current: Math.floor((currentNum - 1) / pageSize) || 0,
                        currentClass: SELECTED_CLS,
                        navWrapperClass: NAV_CLS,
                        viewClass: VIEW_CLS,
                        contClass: CONTENT_CLS,
                        navClass: ITEM_CLS,
                        logClass: 'mip-vd-tabs-log',
                        toggleClass: TOGGLE_CLS
                    });
                }
            });
        });
    }

    function bindEvent($dom) {
        var $el = $(this.element);
        var headTitle = this.element.getAttribute('head-title');
        $dom.delegate('.mip-vd-tabs-episode-item', 'click' , function(ev) {

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
                    "title": headTitle || head,
                    "click": $el.data('click')
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
require(['mip-vd-popup'], function (popup) {
    // 引入组件需要的css文件，选填
    MIP.css.mipVdPopup = __inline('./mip-vd-popup.less');
    //注册组件
    MIP.registerMipElement('mip-vd-popup', popup, MIP.css.mipVdPopup);
});
