/**
 * @file mip-meishij
 * @author yangjun14(yangjun14@baidu.com)
 */

define(function() {
    var URL = 'http://m.meishij.net';
    var id = $('.addfav_box').data('id');

    /*
     * 工具方法
     */
    function jsonpPost(url, data, cb) {
        return $.ajax({
            type: 'POST',
            data: data,
            url: url,
            dataType: 'jsonp',
            success: cb
        });
    }

    /*
     * 百分点统计
     */
    function initBaifendian($el) {
        var config = {
            clientId: $el.data('client-id'),
            path: $el.data('path'),
        };
        var prefix = 'https:' == document.location.protocol ?
            'https://ssl-static1' : 'http://static1';

        window["_BFD"] = window["_BFD"] || {};
        _BFD.BFD_USER = {
            "user_id": "",
            "user_cookie": ""
        };
        _BFD.client_id = config.clientId;
        _BFD.script = document.createElement("script");
        _BFD.script.type = "text/javascript";
        _BFD.script.async = true;
        _BFD.script.charset = "utf-8";
        _BFD.script.src = prefix + '.baifendian.com' + config.path;
        document.getElementsByTagName("head")[0].appendChild(_BFD.script);
    }

    /*
     * 微博分享点击处理函数
     */
    function initWeiboShare($el) {
        var config = {
            appkey: $el.data('appkey'),
            title: $el.data('title'),
            pic: $el.data('pic'),
            url: $el.data('url'),
            relateUid: $el.data('relate-uid')
        };
        var url = 'http://service.t.sina.com.cn/share/share.php?' +
            'appkey=' + config.appkey +
            '&title=' + encodeURIComponent(config.title) +
            '&pic=' + config.pic +
            '&url=' + config.url +
            '&ralateUid=' + config.ralateUid;
        $el.click(function() {
            window.open(url);
        });
    }

    /*
     * 初始化QQ空间分享
     */
    function initQQShare($el) {
        var config = {
            url: $el.data('url'),
            desc: $el.data('desc'),
            pics: $el.data('pics'),
            summary: $el.data('summary'),
            title: $el.data('title'),
            site: $el.data('site'),
        };
        var query = 'url=' + encodeURIComponent(config.url) +
            '&desc=' + encodeURIComponent(config.desc) +
            '&pics=' + encodeURIComponent(config.pics) +
            '&summary=' + encodeURIComponent(config.summary) +
            '&title=' + encodeURIComponent(config.title) +
            '&site=' + encodeURIComponent(config.site);
        var url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + query;

        $el.click(function() {
            window.open(url, 'newQQwindow', 'height=330,width=550,top=' + (screen.height - 280) / 2 + ',left=' + (screen.width - 550) / 2 + ', toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=no, status=no');
        });
    }

    /*
     * 初始化社会化分享
     */
    function initShare($el) {
        var $weibo = $el.find('.weibo');
        var $qq = $el.find('.qq');

        initWeiboShare($weibo);
        initQQShare($qq);

        $el.find("#share_box_shutbtn").click(function() {
            $("#share_box").animate({
                "bottom": "-210px"
            }, 300, function() {
                $("#blackbg").remove();
            });
        });

        $("#sharebtn_in_con").on("click", function() {
            $("body").append("<div style='height:100%;width:100%;position:fixed;left:0px;top:0px;background:rgba(0,0,0,0.75);z-index:20000;' id='blackbg'></div>");
            $("#share_box").animate({
                "bottom": "0px"
            }, 300);
        });
    }

    /*
     * 添加到收藏
     */
    function initFavorite() {
        $(document).on("click", ".addfav_box_c2_item", function() {
            if (!($(this).hasClass("current"))) {
                $(this).addClass("current");
            } else {
                $(this).removeClass("current");
            }
        });

        $("#addfav_box_b2").on("click", function() {
            var cdids = "";
            $.each($(".addfav_box_c2_item.current"), function() {
                cdids = cdids + $(this).attr("cdid") + ",";
            });
            if (cdids === "" && !$("#addfavbtn_in_con").hasClass("cbicon1_cur")) {
                $("#addfav_box_shutbtn").click();
            } else {
                jsonpPost(URL + "/ajax/do_user_caidans.php?id=" + id + "&act=modi&rids=" + cdids, function(data) {
                    if (data == 1) {
                        $("body").append("<div class='con_tips1' id='con_tips1'>收藏成功</div>");
                        var st2 = setTimeout(function() {
                            $("#con_tips1").remove();
                        }, 3000);
                        $("#addfav_box_shutbtn").trigger("click");
                    } else {
                        $("body").append("<div class='con_tips1' id='con_tips1'>取消收藏成功</div>");
                        st2 = setTimeout(function() {
                            $("#con_tips1").remove();
                        }, 3000);
                        $("#addfav_box_shutbtn").trigger("click");
                        $("#addfavbtn_in_con").removeClass("cbicon1_cur").addClass("cbicon1").html("收藏");
                    }
                });
            }
        });

        $("#addfavbtn_in_con").on("click", function() {
            $("body").append("<div style='height:100%;width:100%;position:fixed;left:0px;top:0px;background:rgba(0,0,0,0.75);z-index:20000;' id='blackbg'></div>");
            $("#addfav_box").animate({
                "bottom": "0px"
            }, 300, function() {});
        });
        $("#addfavbtn_in_con").on("click", function() {
            $('#addfav_box').show();
            $('#addnewcd_box').show();
            if (!$(this).hasClass("cbicon1_cur")) {
                jsonpPost(URL + "/ajax/do_user_caidans.php?id=" + id, function(data) {
                    var obj = eval('(' + data + ')');
                    if (obj.code == 1) {
                        jsonpPost(URL + "/ajax/add_nfav.php?obj_id=" + id, function(data) {
                            $("#addfavbtn_in_con img").attr("src", "images/rd_b_sc_h@3x.png");
                            $("#addfavbtn_in_con strong").css("color", "#ff4c35").html("已收藏");
                        });
                        $('#addfav_box #addfav_box_c2').html(obj.data);
                        $("#addfav_box").animate({
                            "bottom": "0px"
                        }, 300);
                    } else if (obj.code === 0) {
                        location.href = "/login.php?redirect=" + encodeURIComponent(location.href);
                    }
                });
            } else {
                jsonpPost(URL + "/ajax/add_nfav.php?act=cancel&obj_id=" + id, function(data) {
                    $("body").append("<div class='con_tips1' id='con_tips1'>取消收藏成功</div>");
                    var st2 = setTimeout(function() {
                        $("#con_tips1").remove();
                    }, 3000);
                    $("#addfav_box_shutbtn").click();

                    $("#addfavbtn_in_con img").attr("src", "http://site.meishij.net/p2/20160307/20160307180334_918.png");
                    $("#addfavbtn_in_con strong").css("color", "#a5a5a5").html("收藏");
                });
            }
        });
        $("#addfav_box_shutbtn").on("click", function() {
            $("#addfav_box").animate({
                "bottom": "-320px"
            }, 300, function() {
                $("#blackbg").remove();
            });
        });
    }


    /*
     * 初始化菜单
     */
    function initMenu() {
        $("#addfav_box_b1").on("click", function() {
            $("#addnewcd_box").animate({
                "top": "74px"
            }, 300);
        });

        $("#addnewcd_box_a1").on("click", function() {
            $("#addnewcd_box").animate({
                "top": "-400px"
            }, 300, function() {});
        });
        $("#addnewcd_box_a2").on("click", function() {
            var t = $("#addnewcd_box_input").html();
            jsonpPost(URL + "/ajax/create_caidan.php?t=" + encodeURIComponent(t), function(data) {
                var obj = eval('(' + data + ')');
                if (obj.code == 2) {
                    $("#addfav_box_c2").prepend(obj.msg);
                    $("#addnewcd_box_a1").trigger("click");
                    $("#addnewcd_box_input").val("");
                } else {
                    alert(obj.msg);
                }
            });
        });
        $("#addnewcd_box_input").focus(function() {
            var _this = $(this);
            var txt = _this.html();
            if (txt == "请输入菜单名称") {
                _this.html("");
                _this.css("color", "#333");
                $("#addnewcd_box_input").focus();
            }
        });
    }

    var customElem = require('customElement').create();

    customElem.prototype.attachedCallback = function() {
        var $el = $(this.element);

        // DOM元素列表
        var $share = $el.find('.share_box');
        var $baifendian = $el.find('.baifendian');

        // 初始化各模块
        initBaifendian($baifendian);
        initShare($share);
        initFavorite();
        initMenu();
    };

    return customElem;
});

require(["mip-meishij"], function(Meishij) {
    MIP.registerMipElement('mip-meishij', Meishij);
});
