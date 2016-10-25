/**
 * @file 评论
 * @author Zhou
*/
define(function (require) {
    // mip 组件开发支持 zepto
    var $ = require('zepto');
    var customElem = require('customElement').create();
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        comment(element);
    };
    // 按钮效果
    function validate() {
        var text = $('.w-text textarea').val();
        var len = text.length;
        var zh = text.replace(/[\x00-\xff]/g, '').length;
        var tlen = Math.ceil((len + zh) / 2);
        if (tlen < 5) {
            $('#verify').addClass('disable');
        }
        else {
            $('#verify').removeClass('disable');
        }
    }
    function comment(o) {
        var oul = $('#comment-list');
        var oid = $('#app-id').val();
        var oli = oul.find('li');
        var p = Math.floor(oli.length / 5 + 1);
        // 时间函数
        function time(d) {
            var result = '';
            result += [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/');
            return result.replace(/(-|\:)(\d[^\d])/g, '$1' + '0$2');
        }
        // 写入cookies
        function setCookie(name, value) {
            var d = new Date();
            d.setTime(d.getTime() + 60 * 2000);// 设置过期时间2分钟
            document.cookie = name + '=' + escape(value) + ';expires=' + d.toGMTString();
        }
        // 读取cookies
        function getCookie(name) {
            var arr;
            var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
            if (arr = document.cookie.match(reg)) {
                return unescape(arr[2]);
            }
            else {
                return null;
            }
        }
        // 写入评论
        function writeComment() {
            oli = oul.find('li');
            $.ajax({
                data: {
                    content: $('.w-text textarea').val(),
                    SoftID: oid,
                    Action: 2,
                    CommentTpye: $('#CommentTpye').val() || 0
                },
                beforeSend: function () {
                    if ($('#submit #verify').hasClass('disable')) {
                        alert('\u60a8\u8bc4\u8bba\u5199\u7684\u592a\u77ed\u5566\uff01');
                        return false;
                    }
                    else if (getCookie('oldTime' + oid) == 1) {
                        alert('\u60a8\u8bc4\u8bba\u6b21\u6570\u592a\u9891\u7e41\u5566\uff01');
                        return false;
                    }
                },
                success: function () {
                    var html = '<li><p class="user">\u60a8\u53d1\u8868\u7684\u8ddf\u8d34<time><font color="red">' + time(new Date()) + '</font></time></p><p>' + $('.w-text textarea').val() + '<p></li>';
                    oli.length == 0 ? oul.html(html) : oli.first().before(html);
                    $('#comment #submit').hide();
                    $('#view-comment').show();
                    $('.w-text textarea').val('').focus();
                    setCookie('oldTime' + oid, '1');
                }
            });
        }
        $('#submit #verify').click(function () {
            writeComment();
            return false;
        });
        // 读取评论
        function readComment() {
            oli = oul.find('li');
            p = Math.floor(oli.length / 5 + 1);
            $.ajax({
                type: 'get',
                url: '/sajax.asp',
                data: 'action=0&id=' + oid + '&page=' + p + '&CommentTpye=0',
                success: function (data) {
                    var html = '';
                    var data = eval('(' + data + ')');
                    var userName = data.sUserName;
                    var userForm = data.sUserForm;
                    var userData = data.sDateAndTime;
                    var userText = data.sContent;
                    for (var i = 0; i < userName.length; i++) {
                        html += '<li><p class="user">' + userForm[i] + userName[i] + '<time>' + userData[i] + '</time></p><p>' + decodeURIComponent(userText[i]) + '</p></li>';
                    }
                    if (data.RecordCount > 5) {
                        $('#view-comment .button-status-complete').css('display', 'block');
                        $('#comment .button').show();
                    }
                    if (p >= data.PageCount) {
                        $('#view-comment .button').val('\u6ca1\u6709\u66f4\u591a\u8bc4\u8bba\u4e86\uff01').attr('disabled', true);
                    }
                    oli.length == 0 ? oul.html(html) : oli.last().after(html);
                }
            });
        }
        readComment();
        $('#view-comment .button').click(function () {
            readComment();
        });
        // 评论效果
        $('#view-comment header .fb').click(function () {
            $('#view-comment').css('display', 'none');
            $('#submit').css('display', 'block');
        });
        $('#cancel').click(function () {
            $('#view-comment').css('display', 'block');
            $('#submit').css('display', 'none');
        });
        $('.w-text textarea').keyup(validate);
    }
    return customElem;
});
require(['mip-down-comment'], function (plugindemo) {
    MIP.registerMipElement('mip-down-comment', plugindemo);
});