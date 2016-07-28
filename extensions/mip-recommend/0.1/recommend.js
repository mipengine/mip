/**
 * @file 推荐
 *
 * fork from http://gitlab.baidu.com/MIP/mibhtml/raw/master/src/static/js/dom/recommend.js
 */


define(function() {

    // 此处判断iframe用了较为tricky的逻辑，后续需要通过父页面message来确认
    var inIframe = (window.parent !== window);

    var _ = require('./util');

    /**
    * 推荐模块
    */
    function render(data) {

        //相关推荐
        var recommendData = data.recommend ? data.recommend : data;
        var moreUrl = data.moreUrl || '//m.baidu.com';

        if (recommendData && recommendData.length) {

            var logClass = inIframe ? '' : 'MIP_LOG_BTN';

            $.each(recommendData, function(i, item) {
                $(".recommends").append(
                    '<div class="' + logClass + ' recommends-box' + (!i ? ' recommends-box-first' : '') + '" data-click=\'{"action":"recommend", "order":"' + i + '", "href":"' + item.url + '", "type": "sf"}\'>'+
                    '<a class="recommends-href" href='+ item.url + '>' +
                    '<div class="recommends-title">' + item.title + '</div>' +
                    '<div class="recommends-info">' +
                    '<span>' + _.timeSince(item.time) + '</span>' +
                    '<span class="recommends-provider">' + item.provider + '</span></div></a></div>'
                );
            });

            //重设高度兼容手百
            $(".recommends").css("height", "100%");

        }
        else {
            $(".recommends").append(''
                + '<p class="recommends-empty">'
                + '暂无相关资讯'
                + '</p>'
            );
        }




    }

    /**
     * 热词推荐
     */
    function renderHot(data) {

        var hotpointData = data.hot_card;

        if (hotpointData && hotpointData.length) {

            var html = '';
            var len = hotpointData.length;
            var tpl = ''
                + '<div class="c-span6 hotpoint-item">'
                +     '<a target="#{target}" class="MIP_LOG_BTN c-bloaka c-color c-urljump c-line-clamp1#{hotClass}" href="#{href}" data-click=\'{"action":"hotpoint", "order":"#{index}", "href":"#{href}"}\' data-urljump=\'#{urljump}\'>#{text}</a>'
                + '</div>';

            $.each(hotpointData, function(i, item) {

                var typeStr = item.type
                    ? '<i class="c-text-box c-text-box-red">新</i>'
                    : '';

                if (!(i % 2)) {
                    if (i) {
                        html += '</div>';
                    }
                    html += '<div class="c-row hotpoint-row">';
                }

                html += _.format(tpl, {
                    index: i,
                    target: inIframe ? '_top' : '_self',
                    hotClass: '', //item.type ? ' hotpoint-href-word-hot' : '',
                    href: item.url,
                    text: item.query, // item.query + typeStr,
                    urljump: JSON.stringify({
                        t: 'mdd',
                        lid: _.getParam('lid', location.href)
                    })
                });

                if (i === len - 1) {
                    html += '</div>';
                }
            });

            $('.hotpoint').append('<div class="hotpoint-box">'+html+'</div>');
            $(".hotpoint").css("height", "100%");
        }
        else {
            $(".hotpoint").remove();
        }
    }


    /**
     * 热点容器
     *
     * @type {String}
     */
    var tplHotWrapper = ''
        + '<div class="hotpoint">'
        +     '<div class="hotpoint-header">新闻热点</div>'
        + '</div>';

    function init() {

        if(!$('.hotpoint').length) {
            $(".recommends").after(tplHotWrapper);
        }

        $(".recommends").delegate('.recommends-box','click',function(ev) {

            ev.preventDefault();
            var href = $(this).find(".recommends-href").attr("href");

            var message = {
                "event": "loadiframe",
                "data": {
                    "url": href,
                    "enc": "no",
                    "title": $(this).find(".recommends-provider").text(),
                    "click": $(this).data('click')
                }
            };

            if (inIframe) {
                window.parent.postMessage(message, '*');
            }
            else {
                location.href = href;
            }

        });

    }

    return {
        init : init,
        render: render,
        renderHot: renderHot
    }
});
