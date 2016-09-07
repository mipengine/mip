! function(n, o) {
    function e(n, o) {
        return d.cleanObj.toString.call(n).slice(8, -1) === o }

    function t(n) {
        var o = f[n];
        if (o) return o.exports;
        throw "module " + n + " is undefined" }

    function r(n, o) {
        for (var e, r, i = n.split(":"), s = i.pop().split("/"), a = d; e = s.shift();) "bdbox" !== e && (r = e, s.length && (a = a[e] = a[e] || {}));
        var c = f[n] = { exports: {} },
            u = d.isFunction(o) ? o.apply(c, [t, c.exports, c, d]) : o;
        u && (c.exports = u), a[r] = c.exports
    }

    function i() { p.forEach(function(n) { n() }), p.length = 0, v = !0 }

    function s(n) {
        var o;
        return null == n ? o = String(n) : (o = Object.prototype.toString.call(n).toLowerCase(), o = o.substring(8, o.length - 1)), o }

    function a(o) {
        var e = o.success || g,
            t = { imageUrl: "", mediaType: "all", title: "", content: "", linkUrl: location.href },
            r = o.error || g;
        return d.isFunction(o.success) && (e = "_xSHARE_SUCCESS_" + d.getId(), n[e] = o.success, t.success = e), d.isFunction(o.error) && (r = "_xSHARE_FAIL_" + d.getId(), n[r] = o.error, t.error = r), d.each(o, function(n, e) { "success" !== e && "error" !== e && (e in b ? e = b[e] : "content" !== e || o.title || (t.title = n), t[e] = n) }), d.isArray(t.mediaType) && (t.mediaType = "all"), n.BoxShareData || (n.BoxShareData = { successcallback: e, errorcallback: r, options: t }), t
    }
    var c = +new Date,
        u = (c + "").slice(-3),
        l = navigator.userAgent,
        d = {
            isBox: / baiduboxapp\//i.test(l),
            isIOS: /(iPhone|iPod|iPad)/.test(l),
            isAndroid: /(Android);?[\s\/]+([\d.]+)?/.test(l),
            getId: function() {
                return u++ },
            emptyArr: [],
            emptyFn: function() {},
            cleanObj: {},
            byId: function(n) {
                return d.isString(n) ? o.getElementById(n) : n
            },
            toArray: function(n) {
                return d.emptyArr.slice.call(n) },
            $: function(n, e) {
                return e = e && 1 === e.nodeType ? e : o, d.toArray(e.querySelectorAll(n)) }
        };
    "Function,String,Array,Number,RegExp".replace(/[^, ]+/g, function(n) { d["is" + n] = function(o) {
            return e(o, n) } }), d.isBoolean = function(n) {
        return n === !0 || n === !1 }, d.isObject = function(n) {
        return "object" == typeof n
    }, d.isUndefined = function(n) {
        return void 0 === n }, d.isWindow = function(n) {
        return null != n && n == n.window }, d.isPlainObject = function(n) {
        return d.isObject(n) && !d.isWindow(n) && Object.getPrototypeOf(n) == Object.prototype };
    var f = {};
    d.define = r;
    var m = function(n, o, e) {
            for (var t, r, i = n.split("."), s = e || m; t = i.shift();) "Box" !== t && (r = t, i.length && (s = s[t] = s[t] || {}));
            return s[r] = o || {}, s[r]
        },
        p = [],
        v = !1;
    m.init = function(n) {
        return "function" != typeof n ? this : (v ? n() : p.push(n), this) }, "complete,loaded,interactive".indexOf(o.readyState) > -1 && o.body ? i() : o.addEventListener("DOMContentLoaded", i, !1), r("common:bdbox/utils/getVersion", function(o, e, t) {
        var r = function() {
            var o = 0;
            if (n.baiduboxapp_version) o = n.baiduboxapp_version;
            else {
                var e, t = navigator.userAgent;
                (e = /([\d+.]+)_(?:diordna|enohpi)_/.exec(t)) ? (e = e[1].split("."), o = e.reverse().join(".")) : (e = /baiduboxapp\/([\d+.]+)/.exec(t)) && (o = e[1]) }
            return r = function() {
                return o }, o
        };
        t.exports = r
    }), r("common:bdbox/utils/version_compare", function(n, o, e) {
        var t = function(n, o) {
            o += "", n += "";
            for (var e = n.split("."), t = o.split("."), r = 0, i = Math.max(e.length, t.length); i > r; r++) {
                if (e[r] && !t[r] && parseInt(e[r]) > 0 || parseInt(e[r]) > parseInt(t[r])) return 1;
                if (t[r] && !e[r] && parseInt(t[r]) > 0 || parseInt(e[r]) < parseInt(t[r])) return -1 }
            return 0
        };
        e.exports = t
    }), r("common:bdbox/ios/invokeApp", function(e, t, r, i) {
        r.exports = function(e, t, r) {
            if (e && i.isBox) {
                var s = [];
                if (i.isFunction(t)) r = t;
                else
                    for (var a in t) s.push(a + "=" + t[a]);
                if (i.isFunction(r)) {
                    var c = "_bdbox_js_" + i.getId();
                    n[c] = function() { r.apply(n, [].slice.call(arguments, 0)) }, s.push("func=" + c) } else r && s.push("func=" + r);
                s = "baiduboxapp://" + e + "?" + s.join("&");
                var u = "_bdbox_ios_jsbridge",
                    l = o.getElementById(u);
                l ? l.src = s : (l = o.createElement("iframe"), l.style.display = "none", l.id = u, l.src = s, (o.body || o.getElementsByTagName("body")[0]).appendChild(l))
            }
        }
    }), r("common:bdbox/android/invokeApp", function(o, e, t, r) {
        function i(o, e, t) {
            if (t && !r.isArray(t) && (t = Array.prototype.slice.call(arguments, 0).slice(2)), n[o] && n[o][e]) {
                var i = n[o][e].apply(n[o], t);
                return { error: 0, result: i, __from: "js" } }
            var u = c();
            if (a(u, 4.8) >= 0) {
                var l = s(o, e, t);
                return l = l ? JSON.parse(l) : {}, l.__from = "app", l
            }
            if ("4.7.1" === u || "4.7" == u) {
                var d = s(o, e, t);
                return { error: 0, result: d, __from: "app4.7" } }
            return { error: 200 }
        }

        function s(o, e, t) {
            if (!r.isBox) return { error: 201 };
            if (!r.isAndroid) return { error: 202 };
            var i = { obj: o, func: e, args: t ? t : [] };
            try {
                return n.prompt("BdboxApp:" + JSON.stringify(i)) } catch (s) {
                return { error: 201 } } }
        var a = o("common:bdbox/utils/version_compare"),
            c = o("common:bdbox/utils/getVersion");
        t.exports = i
    }), r("common:bdbox/utils/detect", function(o, e, t, r) {
        function i(o) {
            var e = { name: "unknown", version: 0 };
            this === n || this.os || (this.os = e), o = o || navigator.userAgent;
            var t = { Weibo: /weibo/i, Wechat: /micromessenger\//i, QQ: /QQ\// };
            for (var r in t) t.hasOwnProperty(r) && (e["is" + r] = t[r].test(o));
            e.isUC = o.match(/UC/) || n.ucweb || n.ucbrowser;
            var i = o.match(/(Android);?\s+([\d.]+)?/);
            if (i) return e.android = !0, e.version = i[2], e.name = "android", e;
            var s = o.match(/(iPad).*OS\s([\d_]+)/),
                a = o.match(/(iPod)(.*OS\s([\d_]+))?/),
                c = !s && o.match(/(iPhone\sOS)\s([\d_]+)/);
            return c && !a ? (e.ios = e.iphone = !0, e.version = c[2].replace(/_/g, "."), e.name = "ios", e) : s ? (e.ios = e.ipad = !0, e.name = "ios", e.version = s[2].replace(/_/g, "."), e) : a ? (e.name = "ios", e.ios = e.ipod = !0, e.version = a[3] ? a[3].replace(/_/g, ".") : null, e) : e
        }
        i.apply(r), t.exports = i
    }), r("common:bdbox/each", function(n, o, e) {
        function t(n) {
            var o;
            return null == n ? o = String(n) : (o = Object.prototype.toString.call(n).toLowerCase(), o = o.substring(8, o.length - 1)), o }
        e.exports = function(n, o, e) {
            if ("object" == typeof n) {
                var r, i, s = t(n);
                if (e = e || n, "array" === s || "arguments" === s || "nodelist" === s) {
                    for (r = 0, i = n.length; i > r; r++)
                        if (o.call(e, n[r], r, n) === !1) return
                } else
                    for (r in n)
                        if (n.hasOwnProperty(r) && o.call(e, n[r], r, n) === !1) return
            }
        }
    }), r("common:bdbox/client/nativeShare", function(e, t, r, i) {
        function s(o) {
            var e = { wechatIcon: location.protocol + "//m.baidu.com/static/search/logo300.png", type: "url", mediaType: "all", linkUrl: location.href, title: c.title, success: "console.log", error: "console.log" };
            each(o || {}, function(n, o) { e[o] = n }), e.image && (e.imageUrl = e.image), e.iconUrl && !e.imageUrl && "url" === e.type && (e.imageUrl = e.iconUrl);
            var t = {};
            ["success", "error"].forEach(function(o) {
                var r = o;
                i.isFunction(e[o]) && (r = "_xSHARE_SUCCESS_" + i.getId(), n[r] = e[o]), t[o + "callback"] = r, delete e[o] }), t.options = e, t.options.imageUrl && i.isAndroid && a(i.version, "6.5") < 0 && delete t.options.imageUrl, n.BoxShareData = t;
            var r = e.wechatIcon;
            if (/micromessenger\//i.test(navigator.userAgent) && r && r.length > 20) {
                var s = c.createElement("div");
                s.id = "wa-generalevent-wx-logo", s.style.display = "none", s.innerHTML = '<img src="' + r + '"/>';
                var u = c.body.firstChild;
                u ? c.body.insertBefore(s, u) : c.body.appendChild(s) }
        }
        var a = e("common:bdbox/utils/version_compare"),
            c = o;
        r.exports = s
    }), r("common:bdbox/utils/ready", function(n, e, t) {
        function r() { s.forEach(function(n) { n() }), s.length = 0, a = !0 }

        function i(n) { "function" == typeof n && (a ? n() : s.push(n)) }
        var s = [],
            a = !1;
        "complete,loaded,interactive".indexOf(o.readyState) > -1 && o.body ? r() : o.addEventListener("DOMContentLoaded", r, !1), t.exports = i
    });
    if (d.version = d.utils.getVersion(), d.version_compare = d.utils.version_compare, each = d.each, d.nativeShare = d.client.nativeShare, d.type = s, d.canI = function(n, o, e) {
            return d.version_compare(d.version, n) >= 0 ? d.isFunction(o) && o() : d.isFunction(e) && e(), d }, r("common:bdbox/client/o2o", function(n, o, e, t) {
            var r = n("common:bdbox/android/invokeApp"),
                i = n("common:bdbox/ios/invokeApp"),
                s = encodeURIComponent,
                a = n("common:bdbox/each"),
                c = t.isAndroid ? function(n, o) {
                    t.isObject(n) && (o = n, n = n.url, delete o.url);
                    var e = ["S.bdsb_light_start_url=" + s(n)];
                    if (t.isObject(o)) {
                        var i = { color: "i.extra_actionbar_color_id", appid: "S.bdsb_wallet_appid" };
                        a(o, function(n, o) { "color" === o && (n = 4278190080 | parseInt("0x" + n)), o = i[o] || o, e.push(o + "=" + n) }) }
                    e = e.join(";"), r("Bdbox_android_utils", "command", [JSON.stringify({ intent: "intent:#Intent;" + e + ";end", "class": "com.baidu.searchbox.wallet.WalletServiceActivity", min_v: "16783629", mode: "0" })])
                } : function(n, o) { t.isObject(n) && (o = n, n = n.url, delete o.url);
                    var e = { openurl: s(n), minver: "5.3.0.0", isla: 0, opentype: 1, append: 0, rbtnstyle: 2 };
                    if (t.isObject(o)) {
                        var r = { color: "barcolor" };
                        a(o, function(n, o) { o = r[o] || o, e[o] = n }) }
                    e.appid && (e.isla = 1), i("easybrowse", e) };
            e.exports = c
        }), d.o2o = d.client.o2o, "android" === d.os.name ? m("card", {
            query: function(n, o) {
                if (m.version_compare(m.version, "5.0") < 0) return this;
                var e, t;
                m.isArray(n) ? e = [JSON.stringify(n)] : (t = m.toArray(arguments), o = t.pop(), m.isFunction(o) ? e = t : (e = m.toArray(arguments), o = null), e = [JSON.stringify(e)]);
                var r = m.android.invokeApp("Bdbox_android_card", "mquery", e);
                return r = 0 === r.error && r.result ? JSON.parse(r.result) : !1, m.isFunction(o) && o(r), r
            },
            add: function(o, e) {
                if (m.version_compare(m.version, "5.0") < 0) return this;
                var t, r;
                m.isString(o) ? t = [o] : m.isArray(o) ? t = [JSON.stringify(o)] : (r = m.toArray(arguments), e = r.pop(), m.isFunction(e) ? t = r : (t = m.toArray(arguments), e = null), t = [JSON.stringify(t)]);
                var i = null;
                if (m.version_compare(m.version, "5.5") >= 0) {
                    var s = "";
                    m.isFunction(e) && (s = "__box_card_" + m.getId(), n[s] = function(n) {
                        var o = JSON.parse(n),
                            t = !1;
                        for (var r in o) { t = o[r].st;
                            break }
                        e(t)
                    }), i = m.android.invokeApp("Bdbox_android_card", "madd", t.concat([s, 0]))
                } else i = m.android.invokeApp("Bdbox_android_card", "madd", t);
                return i
            }
        }) : m("card", {
            query: function(n, o) {
                if (m.version_compare(m.version, "5.0") < 0) return this;
                var e, t;
                m.isArray(n) ? e = [JSON.stringify(n)] : (t = m.toArray(arguments), o = t.pop(), m.isFunction(o) ? e = t : (e = m.toArray(arguments), o = null), e = [JSON.stringify(e)]);
                var r = function(n) { m.isFunction(o) && o(JSON.parse(n)), r = null };
                m.ios.invokeApp("cardMquery", { params: encodeURIComponent(e) }, r)
            },
            add: function(n, o) {
                if (m.version_compare(m.version, "5.0") < 0) return this;
                var e, t;
                m.isString(n) ? e = [n] : m.isArray(n) ? e = [JSON.stringify(n)] : (t = m.toArray(arguments), o = t.pop(), m.isFunction(o) ? e = t : (e = m.toArray(arguments), o = null), e = [JSON.stringify(e)]);
                var r = function(n) {
                    var e = JSON.parse(n),
                        t = !1;
                    for (var i in e) { t = e[i].st;
                        break }
                    m.isFunction(o) && o(t), r = null };
                return m.ios.invokeApp("cardMadd", { params: encodeURIComponent(e), gohome: "0" }, r), !0
            }
        }), r("common:bdbox/utils/jsonToQuery", function(n, o, e, t) {
            e.exports = function(n) {
                if (t.isString(n)) return n;
                var o = [];
                for (var e in n) o.push(e + "=" + n[e]);
                return o.join("&")
            }
        }), r("common:bdbox/io/loadJS", function(e, t, r, i) {
            function s(e, t, r) {
                var s, u, l, d = o.createElement("script");
                i.isString(e) ? (s = e, i.isFunction(t) && (r = t, t = null)) : (s = e.url, t = e.data, r = e.success, u = e.error || i.emptyFn, l = e.timeout), i.isObject(t) && (t = c(t)), t && (s += (-1 === s.indexOf("?") ? "?" : "&") + t), s = s.replace(/[&?]{1,2}/, "?");
                var f;
                /=\?/.test(s) && (f = "_box_jsonp" + i.getId(), s = s.replace(/=\?/, "=" + f));
                var m = a();
                l = l || 2e4, d.type = "text/javascript", d.src = s;
                var p, v = !0,
                    h = function() { f && delete n[f], p && clearTimeout(p), d.onload = d.onreadystatechange = d.onerror = null, d = null },
                    b = function() {
                        !d || d.readyState && !/loaded|complete/.test(d.readyState) || (h(), v && i.isFunction(r) && r.apply(null, i.toArray(arguments)), v = !1)
                    },
                    g = function(n) { h(), v && u(n), v = !1 };
                f && (n[f] = b), p = setTimeout(function() { h(), v && u("timeout"), v = !1 }, l), d.onload = d.onreadystatechange = d.onerror = b, d.onerror = g, m.appendChild(d)
            }

            function a() {
                return o.head || o.getElementsByTagName("head")[0] || o.documentElement }
            var c = e("common:bdbox/utils/jsonToQuery");
            i.emptyFn, r.exports = s
        }), r("common:bdbox/utils/queryToJson", function(n, o, e) { e.exports = function(n) {
                try { n = n ? decodeURIComponent(n) : "" } catch (o) { n = "" }
                var e = n.split("?"),
                    t = e[1] ? e[1] : e[0],
                    r = t.split("&"),
                    i = {};
                return r.forEach(function(n) { n = n.split("="), n[0].length > 0 && (i[n[0]] = n[1] || "") }), i } }), r("common:bdbox/extend", function(n, o, e, t) {
            function r(n, o, e) {
                for (var t in o) e && (i(o[t]) || s(o[t])) ? (i(o[t]) && !i(n[t]) && (n[t] = {}), s(o[t]) && !s(n[t]) && (n[t] = []), r(n[t], o[t], e)) : c(o[t]) || (n[t] = o[t])
            }
            var i = t.isPlainObject,
                s = t.isArray,
                a = t.isBoolean,
                c = t.isUndefined;
            e.exports = function(n) {
                var o, e = t.emptyArr.slice.call(arguments, 1);
                return a(n) && (o = n, n = e.shift()), e.forEach(function(e) { r(n, e, o) }), n }
        }), r("common:bdbox/utils/ready", function(n, e, t) {
            function r() { s.forEach(function(n) { n() }), s.length = 0, a = !0 }

            function i(n) {
                "function" == typeof n && (a ? n() : s.push(n))
            }
            var s = [],
                a = !1;
            "complete,loaded,interactive".indexOf(o.readyState) > -1 && o.body ? r() : o.addEventListener("DOMContentLoaded", r, !1), t.exports = i
        }), r("common:bdbox/utils/detect", function(o, e, t, r) {
            function i(o) {
                var e = { name: "unknown", version: 0 };
                this === n || this.os || (this.os = e), o = o || navigator.userAgent;
                var t = { Weibo: /weibo/i, Wechat: /micromessenger\//i, QQ: /QQ\// };
                for (var r in t) t.hasOwnProperty(r) && (e["is" + r] = t[r].test(o));
                e.isUC = o.match(/UC/) || n.ucweb || n.ucbrowser;
                var i = o.match(/(Android);?\s+([\d.]+)?/);
                if (i) return e.android = !0, e.version = i[2], e.name = "android", e;
                var s = o.match(/(iPad).*OS\s([\d_]+)/),
                    a = o.match(/(iPod)(.*OS\s([\d_]+))?/),
                    c = !s && o.match(/(iPhone\sOS)\s([\d_]+)/);
                return c && !a ? (e.ios = e.iphone = !0, e.version = c[2].replace(/_/g, "."), e.name = "ios", e) : s ? (e.ios = e.ipad = !0, e.name = "ios", e.version = s[2].replace(/_/g, "."), e) : a ? (e.name = "ios", e.ios = e.ipod = !0, e.version = a[3] ? a[3].replace(/_/g, ".") : null, e) : e
            }
            i.apply(r), t.exports = i
        }), r("common:bdbox/schema", function(n, e, t, r) {
            function i(n, e) {
                if (!n) return void e(!0);
                if (e = e || r.emptyFn, !r.isBox && r.isIOS && c(a.version, "9.0") >= 0) return void u(function() { s(n, e) });
                var t = Date.now(),
                    i = o.createElement("IFRAME");
                i.src = n, i.style.position = "absolute", i.style.left = "-2000px", i.style.top = "-1000px", i.style.width = "1px", i.style.height = "1px", i.style.webkitTransition = "all 0.9s", i.style.transition = "all 0.9s", o.body.appendChild(i);
                var l = function() { o.body.removeChild(i), e(Date.now() - t < 1500 ? !0 : !1) };
                i.addEventListener("webkitTransitionEnd", l, !1), i.addEventListener("transitionEnd", l, !1), setTimeout(function() { i.style.left = "-1000px" }, 20)
            }

            function s(n, o) { location.href = n, l && clearTimeout(l), l = setTimeout(function() { o(!0) }, 3e3) }
            var a = n("common:bdbox/utils/detect")(),
                c = n("common:bdbox/utils/version_compare"),
                u = n("common:bdbox/utils/ready"),
                l = null;
            t.exports = i
        }), r("common:bdbox/monitor", function(o, e, t, r) {
            var i = encodeURIComponent,
                s = function(n, o) { n += n.indexOf("?") < 0 ? "?" : "&", this.url = n, this.options = o };
            s.prototype.report = function(o) {
                o = o || "";
                var e = new Image(1, 1),
                    t = [];
                if (r.isObject(o)) {
                    for (var s in o) t.push(s + "=" + i(String(o[s])));
                    o = t.join("&") }
                var a = "_box_mt" + r.getId();
                n[a] = e, e.onload = e.onerror = e.onabort = function() { e.onload = e.onerror = e.onabort = null, n[a] = e = null };
                var c = this.url + o;
                return r.isFunction(this.options.customHandler) && (c = this.options.customHandler(c)), e.src = c + "&_rnd=" + Math.floor(2147483648 * Math.random()), this
            }, s.prototype.main = function(n, o) {
                return n && r.isFunction(this[n]) && this[n].apply(this, r.toArray(o || [])), this
            }, t.exports = function(n, o) {
                return new s(n, o) }
        }), r("common:bdbox/clone", function(n, o, e) {
            var t = Object.prototype.toString,
                r = function(n, o, e) {
                    var t = 0;
                    for (var r in n)
                        if (n.hasOwnProperty(r))
                            if (e) o[r] = n[r];
                            else if (o(r, n[r], t++)) break },
                i = function(n) {
                    var o;
                    switch (t.call(n)) {
                        case "[object Object]":
                            o = {}, r(n, function(n, e) {
                                o[n] = i(e)
                            });
                            break;
                        case "[object Array]":
                            o = [], n.forEach(function(n) { o.push(i(n)) });
                            break;
                        default:
                            o = n
                    }
                    return o
                };
            e.exports = i
        }), r("common:bdbox/monitor/pblog", function(n, o, e, t) {
            var r = n("common:bdbox/monitor"),
                i = n("common:bdbox/extend"),
                s = n("common:bdbox/utils/queryToJson"),
                a = n("common:bdbox/utils/getVersion"),
                c = n("common:bdbox/clone"),
                u = s(location.search),
                l = navigator.userAgent,
                d = "//m.baidu.com/tcbox",
                f = { service: "bdbox", action: "pblog", ctv: 2, cen: "uid_ua_ut", data: { appid: "1", dataid: "2", actiontype: "1", actionid: "2", actiondata: { ref: u.ref || "", gmv: u.vmgdb || "", source: u.from || u.ref || "", boxVersion: a(), boxPlatform: l.match(/(iPad|iPhone|iPod)/gim) ? "ios" : "android" } } },
                m = encodeURIComponent;
            u.uid && u.osname && ["osname", "ua", "ut", "from", "cfrom", "uid", "pkgname"].forEach(function(n) { u[n] && (f[n] = u[n]) });
            var p, v = r(d, {
                customHandler: function(n) {
                    var o = [];
                    if (p)
                        for (var e in p)
                            if (p.hasOwnProperty(e)) {
                                var r = p[e];
                                t.isPlainObject(r) && (r = JSON.stringify(r)), o.push(e + "=" + m(r)) }
                    return o.length && (n += o.join("&")), n
                }
            });
            v.init = function(n, o) { t.isPlainObject(o) && (f = i(f, o)), f.data.cateid = n }, v.pv = function(n, o) { p = c(f);
                var e = p.data;
                e.actionid = "1";
                var t = {};
                return t.url = n || location.href, o && (t.u = o), e.actiondata = i(e.actiondata, t), v.report() }, v.event = function(n, o, e) {
                if (!n) throw "monitor.tc.event need a evtName";
                if (t.isPlainObject(o) && !e) {
                    var r = { evtName: n };
                    for (var s in o) r[s] = o[s]
                } else var r = { evtName: n, evtType: o || "", evtTag: e || "" };
                p = c(f);
                var a = p.data;
                return a.actionid = "2", a.actiondata = i(a.actiondata, r), v.report()
            }, e.exports = function() { v.main.apply(v, arguments) }
        }), r("common:bdbox/moplus", function(n, o, e, t) {
            var r = n("common:bdbox/utils/jsonToQuery"),
                i = n("common:bdbox/io/loadJS"),
                s = n("common:bdbox/utils/version_compare"),
                a = n("common:bdbox/monitor/pblog"),
                c = n("common:bdbox/schema"),
                u = "com.baidu.searchbox",
                l = "http://127.0.0.1:6259/",
                d = "http://127.0.0.1:40310/",
                f = "inapp_boxserver",
                m = "https:" === location.protocol,
                p = 500,
                v = null,
                h = "__moplus_host__",
                b = {
                    isSendPv: !1,
                    isHit: !1,
                    parseUA: function() {
                        var n, o, e = navigator.userAgent,
                            t = { uc: /UCBrowser\/(\S*) \S*/g, bd: /baidubrowser\/(\S*) \(Baidu/g, qq: /MQQBrowser\/(\S*) Mobile/g, chr: /Chrome\/(\S*) Mobile/g, qh: /360 Aphone Browser \((\S*)\)/g, sg: /SogouMobileBrowser\/(\S*)/g, mi: /MiuiBrowser\/(\S*)/g };
                        for (var r in t) {
                            var i = t[r].exec(e);
                            if (i) { n = r, o = i[1];
                                break } }
                        return n = n ? n : "other", o = o ? o : "0", { t: n, v: o }
                    },
                    parseHost: function() {
                        return g.curHost === d ? 1 : 0 },
                    sendEvt: function(n, o, e, t) { this.isHit && this.send(n, o, e, t) },
                    send: function(n, o, e, t) {
                        var r = this.parseUA(),
                            i = r.t,
                            s = r.v,
                            c = m ? 0 : 1,
                            u = this.parseHost();
                        a("event", [n, { evtType: o || "", brName: i, brVer: s, isHttp: c, isNew: u, source: e || "", intent: t || "" }])
                    },
                    init: function() { this.isHit = Date.now() % 100 === 1, a("init", [2]) }
                },
                g = function(n, o, e) { this.version = "2.0", this.isHttps = m, this.curHost = e || "", this.newHost = d, this.oldHost = this.isHttps ? d : l, this.MCMDF = o || f, this._infoFuncs = [], this._verFuncs = [], this.minVersion = n ? n : 0, this.pkgName = u, b.init() },
                y = function(n, o) {
                    try {
                        sessionStorage.setItem(n, o)
                    } catch (e) {}
                },
                x = function(n) {
                    var o;
                    try { o = sessionStorage.getItem(n) } catch (e) {}
                    return o };
            g.prototype = {
                constructor: g,
                setMcmdf: function(n) {
                    return this.MCMDF = n, this },
                setHost: function(n) {
                    return this.curHost = n, y(h, n), this },
                getHost: function() {
                    if (this.isHttps) return this.curHost = this.newHost, this.newHost;
                    var n = x(h);
                    return n ? (this.curHost = n, this.curHost) : void 0
                },
                api: function(n, o, e, i) {
                    if (!n) throw "Moplus.api need an action";
                    t.isFunction(o) && (i = e, e = o, o = {});
                    var s = n + (~n.indexOf("?") ? "&" : "?") + r(o);
                    return ~s.indexOf("mcmdf") || (s += "&mcmdf=" + this.MCMDF), b.sendEvt("api", "send:" + n, this.MCMDF, s), this.request(s, function(o) {
                        b.sendEvt("api", (t.isPlainObject(o) && 0 == o.error ? "success:" : "fail:") + n, this.MCMDF, s), e(o)
                    }, i)
                },
                getInfo: function(n, o) {
                    if (v) return n(v);
                    if (this._infoFuncs.push(n), !(this._infoFuncs.length > 1)) {
                        var e = this,
                            r = function(n, o) {!o && t.isPlainObject(n) && (v = n);
                                var r;
                                for (o && (n = { error: 33 }); r = e._infoFuncs.shift();) r(n) },
                            s = "getsearchboxinfo?mcmdf=" + this.MCMDF;
                        if (this.getHost()) {
                            var a = {
                                url: this.curHost + s + "&callback=?",
                                success: r,
                                error: function() {
                                    r(null, !0)
                                },
                                timeout: o
                            };
                            i(a)
                        } else this.request(s, function(n) {
                            return 33 === n.error ? r(null, !0) : void r(n) }, o);
                        return this
                    }
                },
                getHVersion: function(n, o) {
                    this._verFuncs.push(n);
                    var e = this;
                    if (!(this._verFuncs.length > 1)) {
                        var t = function(n) {
                            var o;
                            for (n = e.parseInfo(n); o = e._verFuncs.shift();) o(n) };
                        return this.getInfo(t, o), this
                    }
                },
                parseInfo: function(n, o) {
                    n = n || v, o = o || this.minVersion;
                    var e = n.package_infos;
                    if (!e || 0 === e.length) return !1;
                    var t = u,
                        r = { offic: { name: u, version: 0 }, oem: { version: 0 } };
                    return e.forEach(function(n) {
                        var e = n.version_name,
                            i = n.package_name;
                        s(e, o) >= 0 && (i === t ? 1 === s(e, r.offic.version) && (r.offic = { version: e, name: u }) : 1 === s(e, r.oem.version) && (r.oem = { version: e, name: i }))
                    }), 0 === r.oem.version && 0 === r.offic.version ? !1 : 0 !== r.offic.version ? r.offic : 0 !== r.oem.version ? r.oem : void 0
                },
                schema: function(n, o) {
                    if (!n.intent) throw "schema intent is empty";
                    n.mcmdf || (n.mcmdf = this.MCMDF);
                    var e = function() {
                            b.sendEvt("schema", "success", n.source, n.intent), t.isFunction(o) && o({ error: 0, from: "schema" })
                        },
                        r = function() { b.sendEvt("schema", "fail", n.source, n.intent), t.isFunction(o) && o({ error: 20, from: "schema" }) },
                        i = n.schema || "";
                    if (n.intent && !n.schema) {
                        var s = n.intent; - 1 == s.indexOf(u) && (b.sendEvt("defaultPKGName", "fail", n.source || "", n.intent), n.minver = n.minver ? n.minver : "6.9.1") }
                    i || (i = "baiduboxapp://utils?action=sendIntent&params=" + encodeURIComponent(JSON.stringify(n)) + "&minver=" + (n.minver ? n.minver : "6.9")), c(i, function(n) {
                        n ? r() : e()
                    })
                },
                sendIntent: function(n, o, e) {
                    var r = {};
                    if (n && t.isString(n)) {
                        var i, s = this,
                            a = !0;
                        return t.isPlainObject(e) ? (r = e, i = e.source || "", e.needlog ? b.isHit = e.needlog : r.needlog = b.isHit ? 1 : 0, e = e.timeout) : t.isBoolean(e) && (a = e), r.intent = n, b.sendEvt("sendintent", "send", i, n), this.api("sendintent", { intent: encodeURIComponent(n) }, function(e) {
                            !e || e && 33 === e.error || !t.isPlainObject(e) ? (b.sendEvt("sendintent", "fail", i, n), a ? s.schema(r, o) : (e = e || {}, e.from = "moplus", o(e))) : (b.sendEvt("sendintent", "success", i, n), o(e))
                        }, e)
                    }
                    return this
                },
                request: function(n, o, e) {
                    var r, s, a = this,
                        c = { timeout: e };
                    t.isFunction(o) && !~n.indexOf("callback=") && (n += "&callback=?");
                    var u = function(n) { r = "success", t.isFunction(o) && o(n) },
                        l = function() { t.isFunction(o) && o({ error: 33 }) };
                    if (a.getHost()) c.url = a.curHost + n, c.success = u, c.error = l, i(c);
                    else if (c.url = a.newHost + n, c.success = function(n) {
                            "success" !== r && (s && clearTimeout(s), a.setHost(a.newHost), u(n))
                        }, c.error = function() { a.isHttps ? (r = "error", l()) : "error" === r && l(), r = "error" }, i(c), !a.isHttps) {
                        var d = { timeout: e, url: a.oldHost + n, error: c.error };
                        d.success = function(n) { "success" !== r && ("error" === r ? (a.setHost(a.oldHost), u(n)) : s = setTimeout(function() { a.setHost(a.oldHost), u(n) }, p)) }, i(d) }
                    return this
                }
            }, e.exports = function(n, o) {
                return new g(n, o)
            }, e.exports.Moplus = g
        }), d.version_compare(d.version, "5.3.5") >= 0) {
        var h, b = { image: "imageUrl", url: "linkUrl", order: "mediaType" },
            g = "";
        n[g] = d.emptyFn, d.isAndroid ? (h = function(n) {
            if (n.id && d.byId(n.id)) {
                var o = n.eventType || "touchstart";
                d.byId(n.id).addEventListener(o, function() { e(n) }, !0) }
            var e = function(o) {
                o = a(o || n);
                var e = o.error,
                    t = o.success;
                o.iconUrl && o.imageUrl && delete o.imageUrl, d.android.invokeApp("Bdbox_android_utils", "callShare", [JSON.stringify(o), t || "console.log", e || "console.log"])
            };
            return e
        }, m("share", h)) : (h = function(n) {
            if (n.id && d.byId(n.id)) {
                var o = n.eventType || "touchstart";
                d.byId(n.id).addEventListener(o, function() {
                    e(n)
                }, !0)
            }
            var e = function(o) { o = a(o || n);
                var e = o.error,
                    t = o.success;
                o.iconUrl && !o.imageUrl && (o.imageUrl = o.iconUrl), o = JSON.stringify(o), d.ios.invokeApp("callShare", { options: encodeURIComponent(o), errorcallback: e || "console.log", successcallback: t || "console.log" }) };
            return e
        }, m("share", h))
    } else {
        var y = [],
            x = function() {
                m._socShare && m._socShare.init ? y.forEach(function(n) {
                    m._socShare.init(n)
                }) : setTimeout(x, 3e3)
            };
        d.io.loadJS("//m.baidu.com/static/searchbox/openjs/share.js?v=1.2", x);
        var _ = { source: "client_id", id: "dom_id", image: "pic_url", success: "afterRender" },
            h = function(n) {
                var o = { content: "", client_id: "ZVEpDSsmZ0qxa1gmgDAh1Fje", theme: "native", dom_id: "share", animate: !0, pic_url: "", url: encodeURIComponent(location.href) };
                return d.isObject(n) && d.each(n, function(n, e) {
                        if (e in _ && (e = _[e]), "order" === e && d.isArray(n)) {
                            var t = [];
                            n.forEach(function(n) { "email" === n && (n = "mail"), t.push(n) }) }
                        o[e] = n }), delete o.success, delete o.error, delete o.afterRender, "all" === o.order ? o.order = ["qqdenglu", "sinaweibo", "renren", "kaixin", "mail", "sms"] : d.isString(o.order) && (o.order = o.order.split(",")), m._socShare && m._socShare.init ? m._socShare.init(o) : y.push(o),
                    function() {
                        m._socShare.ui._shareBtnClickHandler()
                    }
            };
        m("share", h)
    }
    if (r("common:bdbox/distribute", function(n, o, e, t) {
            var r = n("common:bdbox/schema");
            n("common:bdbox/utils/detect");
            var i = n("common:bdbox/each"),
                s = n("common:bdbox/moplus"),
                a = t.emptyFn,
                c = { qqDownloadUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox", androidDownloadUrl: "", iosDownloadUrl: "", iosFailCallback: a, androidFailCallback: a, iosSchema: "", androidSchema: "", androidIntent: "", inBoxCallback: a },
                u = function(n) {
                    var o = this;
                    n && i(c, function(o, e) { n[e] = n[e] || o });
                    var e = this.url = n.url;
                    e && "" !== e ? (this.androidIntent = "intent://" + e.replace(/^http[s]?:\/\//, "") + "#Intent;scheme=http;action=com.baidu.searchbox.action.VIEW;category=android.intent.category.DEFAULT;end", this.iosSchema = "baiduboxapp://easybrowse?openurl=" + encodeURIComponent(e) + "&opentype=0&isla=0&append=0&minver=5.3.0.0") : ["androidIntent", "iosSchema", "androidSchema"].forEach(function(e) {
                        o[e] = n[e]
                    }), this.options = n, this.fail = function() {
                        if (console.log(t.os.name + " fail"), t.isFunction(n[t.os.name + "FailCallback"])) {
                            var o = n[t.os.name + "FailCallback"]();
                            if (t.isBoolean(o) && !o) return }
                        var e = n[t.os.name + "DownloadUrl"];
                        e && "" !== e && (location.href = n[t.os.name + "DownloadUrl"]) }, this.success = function() {
                        return console.log(t.os.name + " success"), t.isFunction(n[t.os.name + "SuccessCallback"]) ? n[t.os.name + "SuccessCallback"]() : void 0
                    }
                };
            u.prototype.wechat = function() {
                var n = this.options;
                if (t.isFunction(n.wechatCallback)) {
                    var o = n.wechatCallback();
                    if (t.isBoolean(o) && !o) return }
                n.qqDownloadUrl && "" !== n.qqDownloadUrl && (location.href = n.qqDownloadUrl) }, u.prototype.run = function() {
                var n = this,
                    o = (n.url, n.options);
                return t.os.isWechat ? n.wechat() : t.isBox && t.isFunction(o.inBoxCallback) ? o.inBoxCallback() : void this.invoke()
            }, u.prototype.invoke = function() {
                var n = this;
                if (t.os.android) {
                    var o = s();
                    o.getHVersion(function(e) { e ? o.sendIntent(n.androidIntent, function(o) { 0 == o.error ? n.success() : n.fail() }, 1e3) : n.androidSchema ? r(n.androidSchema, function(o) { o ? n.fail() : n.success() }) : n.fail() }) } else r(n.iosSchema, function(o) {
                    o ? n.fail() : n.success()
                })
            }, e.exports = function(n) {
                return new u(n) }
        }), each(d, function(n, o) { m[o] = n }), n.Box && n.Box.$)
        for (var S in m) n.Box[S] = n.Box[S] || m[S];
    else n.Box = m
}(window, document);
define(function() {
    var $ = require('zepto');

    var PopupFrame = function (opt) {
        var me = this;
        // 设置默认值
        me.options = $.extend({
            title: '',              // 标题，支持html和Zepto对象
            content: '',            // 内容，支持html和Zepto对象
            fullView: false,        // 是否全屏
            duration: 400,          // 动画执行时间
            customClassName: '',    // 自定义样式名
            onOpen: function () {},
            onClose: function () {}
        }, opt);
        // 初始化
        me._init();
    };

    PopupFrame.prototype = {

        constructor: PopupFrame,

        version: '0.0.1',

        /*
        *  初始化：渲染父层dom，阻止遮罩的滚动，弹出popup
        */
        _init: function () {
            var me = this;
            // 渲染父层dom单例
            me._preparePopupWrapper();
            // 阻止遮罩滚动
            me._stopScroll();
            me.popup();
        },
        /*
         * 创建.mip-video-popup-wrapper父容器单例,所有pop内容都append到这个dom中
         */
        _preparePopupWrapper: function () {
            var me = this;
            var popWrapperDom = $('.mip-video-popup-wrapper');
            if (popWrapperDom.length) {
                me.$popupFrame = popWrapperDom;
                me.$popupFrame.empty();
            } else {
                me.$popupFrame = $('<div class="mip-video-popup-wrapper"></div>');
                $(document.body).append(me.$popupFrame);
            }
        },
        /*
        *  阻止mask以及结果层的滚动
        */
        _stopScroll: function () {
            var me = this;
            // 阻止遮罩层滚动,不会影响内部touchmove事件
            me.$popupFrame.on('touchmove', function (e) {
                e.preventDefault();
            });
        },
        /*
        * 父层事件绑定
        */
        _bindEvent: function () {
            var me = this;
            // mask遮罩和绑定退场事件
            me.$popupFrame.on('click', '.mip-video-popup-mask,.mip-video-popup-remove', function () {
                me.closePopup();
            });
        },
        /*
        * 装填&&渲染
        */
        _randerContent: function () {
            var me = this;
            // 遮罩层
            me.$popupMask = $('<div class="mip-video-popup-mask"></div>');
            // modal层
            me.$popupModal = $('<div class="mip-video-popup-modal"></div>');
            // modal内content
            me.$popupContent = $('<div class="mip-video-popup-content"></div>');
            // modal内head
            me.$popupHead = $('<div class="mip-video-popup-head"></div>');
            // 装填head内容
            if (me.options.title) {
                var titleWrapper = $('<div class="mip-video-popup-title"></div>');
                titleWrapper.append(me.options.title);
                me.$popupHead.append(titleWrapper);
            }
            var remove = $('<div class="mip-video-popup-remove">X</div>');
            me.$popupHead.append(remove);
            // 装填content
            me.$popupContent.append(me.options.content);
            // 装填modal
            me.$popupModal.append(me.$popupHead).append(me.$popupContent).addClass(me.options.customClassName);
            // 最后装填外层wrapper
            me.$popupFrame.append(me.$popupModal).append(me.$popupMask);
        },
        /*
        * 弹出层
        */
        popup: function () {
            var me = this;
            var wHeight = $(window).height();
            me._randerContent();
            me._bindEvent();
            // mask淡入
            me.$popupMask.show().animate({
                opacity: 1
            }, 'fast', 'linear');
            // 展现modal
            me.$popupModal.show();
            // 计算modal实际高度
            var mHeight = me.$popupModal.height();
            if (me.options.fullView || mHeight > wHeight) {
                me.$popupModal.height('100%');
            }
            // 入场动画
            me.$popupModal.animate({
                '-webkit-transform': 'translate3d(0, 0, 0)',
                'transform': 'translate3d(0, 0, 0)'
            }, me.options.duration, 'linear', function () {
                $(this).css({
                    '-webkit-transform': 'none',
                    'transform': 'none'
                });
                me.options.onOpen();
            });
        },
        /*
        * 关闭弹层
        */
        closePopup: function () {
            var me = this;
            // 退场动画
            me.$popupModal.animate({
                '-webkit-transform': 'translate3d(0, 100%, 0)',
                'transform': 'translate3d(0, 100%, 0)'
            }, me.options.duration, 'linear', function () {
                $(this).css({
                    '-webkit-transform': 'none',
                    'transform': 'none'
                }).hide();
                me.options.onClose();
                me._destroy();
            });
            // mask淡出
            me.$popupMask.animate({
                opacity: 0
            }, 'fast', 'linear', function () {
                $(this).hide();
            });
        },
        /*
        * 解绑事件&清除dom
        */
        _destroy: function () {
            var me = this;
            // 解绑事件
            me.$popupFrame.off('click', '.mip-video-popup-mask,.mip-video-popup-remove');
            // 清除dom
            me.$popupFrame.empty();
        }
    };

    var Popup = PopupFrame;
    /**
     * 构造函数
     *
     * @param {Object}              opt 配置对象
     * @param {Object}              opt.ios   可选 单独配置ios下某个表现形式
     * @param {boolean}             opt.ios.playMode  可选 播放模式
     *** 播放模式字段值说明：
     *** hide 容器中对video的显示进行隐藏 （ios默认为全屏播放，针对ui设定 当前播放区域不显示video）
     *** false || undefined 不使用插件带有的播放容器样式
     * @param {Object}              opt.android   可选  单独配置android下某个表现形式
     * @param {boolean}             opt.android.playMode  可选 播放模式
     *** 播放模式字段值说明：
     *** fullsreen 全屏 (android模拟全屏播放)
     *** false || undefined 不使用插件带有的播放容器样式
     */
    function VideoPlayer(opt) {
        this.params = $.extend(true, {
            // 视频容器   必填
            container: null,

            height: null,
            width: null,
            src: null,
            type: null,
            poster: null,
            autoplay: null,
            controls: null,
            loop: null,
            muted: null,

            ios: {
                playMode: false
            },

            android: {
                playMode: false
            },

            // 广告数据信息
            adInfo: [],

            // 正片视频数据信息
            playInfo: []

        }, opt);

        // 控制视频位置 和 样式 容器
        this.box = {
            normal: $('<div class="mip-video-box"></div>'),
            // ios playmode 设置为hide时使用  视频缩小为1*1px 当前不显示出来
            hide: $('<div class="mip-video-box-ios"></div>')
        };

        // 当前广告播放到第几个  （广告可设置多个）
        this.adIdx = 0;

        // 视频播放到的位置
        this.lastTime = 0;

        // 事件命名空间
        this.eventNS = '.mipvideo';

        // 初始化video
        this.init();

        // 绑定事件
        this.bindEvents();
    }

    VideoPlayer.prototype = {
        constructor: VideoPlayer,

        // 容器代码
        // tplWrap: '<video class="mip-video-player" <%=(poster ? "poster=" + poster : "")%>"></video>',

        // source代码
        tplSource: ['<% for (var i = 0, len = data.length; i < len; i++) { var item = data[i]; %>',
            '<source <%=(item.type ? "type=" + item.type : "")%> src="<%=item.src%>"></source>',
        '<% } %>'].join(''),

        // 模板引擎
        tmpl: (function(){
            var cache = {};

            var tmpl = function tmpl(str, data){
                // Figure out if we’re getting a template, or if we need to
                // load the template – and be sure to cache the result.
                var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                tmpl(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                    // Introduce the data as local variables using with(){}
                    "with(obj){p.push('" +

                    // Convert the template into pure JavaScript
                    str
                        .replace(/[\r\t\n]/g, " ")
                        .split("<%").join("\t") .replace(/((^|%>)[^\t]*)’/g, "$1\r")
                        .replace(/\t=(.*?)%>/g, "',$1,'")
                        .split("\t").join("');")
                        .split("%>").join("p.push('")
                        .split("\r").join("\\'")
                 + "');}return p.join('');");

                // Provide some basic currying to the user
                return data ? fn( data ) : fn;
            };

            return tmpl;
        })(),
        
        // 初始化video标签
        init: function () {
            var me = this;
            me.$video = $('<video autoplay="autoplay"></video>');
            me.video = me.$video[0];

            // 设置video标签默认样式
            me.video.className = 'mip-video-player';

            me.isWorking = false;
        },

        // 初始化各参数
        initParams: function () {
            var me = this;
            me.lastTime = 0;
        },

        // params 同上方 创建时参数
        render: function (options) {
            var me = this;

            // render时 可设置参数 覆盖实例化时设置的信息
            this.options = $.extend({}, me.params, options);

            me.setAttrs();

            me.loadSource();

            me.appendVideo();

            me.play();

            me.isWorking = true;
        },

        // 设置video的各项参数
        setAttrs: function () {
            var me = this;
            var options = me.options;

            // 设置视频宽度 需要考虑height 为0 的时候的处理
            me.setAttr('width', options.width);

            // 需要考虑height 为0 的时候的处理
            me.setAttr('height', options.height);

            // 设置视频资源地址   单一视频资源时使用 ------ 使用source标签实现
            // me.setAttr('src', options.src);

            // 设置视频资源地址   单一视频资源时使用 ------ 使用source标签实现
            // me.setAttr('type', options.type);

            // 设置视频封面
            me.setAttr('poster', options.poster);

            // 设置视频是否自动播放
            me.setAttr('autoplay', options.autoplay);

            // 设置视频是否使用控制条
            me.setAttr('controls', options.controls);
            
            // 设置视频是否循环播放
            me.setAttr('loop', options.loop);

            // 设置视频是否静音
            me.setAttr('muted', options.muted);
        },

        // 设置video属性     字段是否为0, 是否为原始字段名
        setAttr: function (attr, value) {
            var me = this;
            var $video = me.$video;

            if (value || value === 0 || value === '') {
                $video.attr(attr, value);
            } else {
                $video.removeAttr(attr);
            }
        },

        // 插入视频元素   需要区分ios  android是否全屏播放等  TODO
        appendVideo: function () {
            var me = this;
            var video = me.$video;
            var options = me.options;

            var container = $(options.container);
            if (!container.length) {
                return;
            }

            // 如果设置了playMode 且 ios 进行如下操作
            // ios不区分fullscreen || inline, 均为为默认系统全屏播放
            if (me.isIos() && options.ios && options.ios.playMode === 'hide') {
                var html = me.box.hide.html(video);
                container.append(html);
                return;
            }

            // 非ios下 全屏播放
            if (!me.isIos() && options.android && options.android.playMode === 'fullscreen') {
                me.fullscreenForAndriod();
                return;
            }

            // 非ios下 当前区域播放  --- 暂无当前播放规范 尚未开发
            // if (options.playMode === 'inline') { }

            // 如果未设置playMode 则只会简单的插入video节点
            container.append(this.box.normal.html(video));
        },

        // 移除视频 及 其父元素
        // removeVideo: function () {
            // this.box
        // },

        // 播放视频，  兼容手百等无法播放的问题
        play: function () {
            var me = this;
            var uaReg = /(iphone.+mqqbrowser)|(android.*(baidubrowser)|(baiduboxapp))/i;
           
            if (navigator.userAgent.match(uaReg)) {
                setTimeout(function() {
                    me.video.play();
                }, 30);
            } else {
                me.video.play();
            }
        },

        // 加载视频资源
        load: function () {
            // 加载资源  必需  否则切换资源播放时 仍然会播放上次视频
            this.video.load();
        },

        // 加载视频资源  判断要播放的资源是否为广告
        loadSource: function () {
            var me = this;
            var options = me.options;
            var video = me.video;

            // 初始化时间等参数
            me.initParams();

            // 移除广告事件
            me.removeEventsForAD();

            if (me.hasAd(options)) {
                me.playForAD(options);
            } else {
                me.playForNormal(options);
            }

            // 加载资源  必需  否则切换资源播放时 仍然会播放上次视频
            me.load();

        },

        // 正常 - 视频资源
        playForNormal: function () {
            var me = this;
            var options = me.options;
            var playInfo = options.playInfo;
            var video = me.video;
            // 如果没有playInfo时 使用src和type参数 
            if (!playInfo || !playInfo.length) {
                playInfo = [];
                playInfo[0] = {
                    type: options.type,
                    src: options.src
                };
            }

            // 插入视频 开始播放
            me.appendSource(playInfo);
        },

        // 广告 - 资源
        playForAD: function () {
            var me = this;
            var options = me.options;
            var ads = options.adInfo;
            var video = me.video;
            if (!me.hasAd(options)) {
                return;
            }

            // 插入第几组广告 开始播放
            me.appendSource(ads[me.adIdx]);

            me.adIdx++;
            
            // 广告播放事件绑定
            me.eventsForAD();
        },

        // 添加广告事件
        eventsForAD: function () {
            var me = this;
            var adEventNS = me.eventNS + 'forad';
            var video = me.video;

            // 移除事件 防止多次绑定
            me.removeEventsForAD();

            // 广告播放时 不可以拖动快进
            me.$video.on('timeupdate' + adEventNS, function() {
                var currentTime = Math.ceil(video.currentTime);
                var duration = me.getVideoTime();
                    // alert('duration');

                // for ad  can not drag to play
                if (currentTime - me.lastTime > 2) {
                    video.currentTime = me.lastTime;
                    me.lastTime = me.lastTime;

                    // 解决快进拖动到视频结束时触发pause事件 视频暂停播放现象
                    me.play();
                    return;
                }

                me.lastTime = currentTime;
                    // alert(duration);

                // 广告播放结束后 继续播放
                if (duration && currentTime >= duration) {
                    // alert(duration);
                    me.loadSource();
                    me.play();
                }
            });
        },

        // 移除广告事件
        removeEventsForAD: function () {
            var me = this;
            var adEventNS = me.eventNS + 'forad';
            me.$video.off('timeupdate' + adEventNS);
        },

        // 是否有广告
        hasAd: function () {
            var me = this;
            var options = me.options;
            var ads = options.adInfo;
            if (!ads || !ads.length || me.adIdx >= ads.length) {
                return false;
            }

            return true;
        },

        // 插入一组source数据 进行播放使用
        // data array() 为当前一组视频的数据信息
        // data.type  视频资源类型
        // data.src  视频资源地址
        appendSource: function (data) {
            var me = this;
            var $video = me.$video;
            var sources = this.tmpl(this.tplSource, { data: data });
            if (sources) {
                $video.html(sources);
            }
        },

        // 是否ios
        isIos: function () {
            return /iPhone|iPad|iPod/i.test(window.navigator.userAgent); 
        },

        // 未重构部分----------------------------------------------------------------------

        // 绑定事件
        bindEvents: function() {
            var me = this;
            me.$video.on('canplay', function() {
                me.video.play();
            });
        },

        fullscreenForAndriod: function () {
            var self = this;
            var video = self.$video;
            var options = self.options;
            var eventNS = self.eventNS + 'fullscreen';

            //注释原有功能
            // QQ browser由于自有实现的播放器问题 特殊处理
            // 避免2次点击关闭按钮
            // if (navigator.userAgent.match(/(android.+mqqbrowser)/i)) {
            //     return;
            // }

            // 引用通用弹窗组件
            var popup = new Popup({
                title: options.title || '',
                content: '',
                fullView: true,
                customClassName: 'mip-video-player-popup',
                onOpen: function () {
                    popup.$popupContent.html(video);

                    // 设置视频居中显示
                    self.setVideoCenterForFullscreen();
                },
                onClose: function () {
                    // 初始化
                    $(window).off('orientationchange' + eventNS);
                    self.initStyle();
                }
            });

            // 解决android手百关闭时页面抖动问题  待popup组件升级后更改 @士浩
            var remove = $('.mip-video-player-popup .mip-video-popup-remove');
            remove.length && remove.off('click' + eventNS)
                .on('click' + eventNS, function () {
                    popup.$popupContent.length && popup.$popupContent.html('');
            });
        },

        initStyle: function () {
            var self = this;
            var video = self.$video;
            video.removeAttr('style');
        },

        // 设置视频居中显示  and  屏幕旋转时大小控制 - android模拟全屏
        setVideoCenterForFullscreen: function () {
            var self = this;
            var eventNS = self.eventNS + 'fullscreen';

            // 关闭按钮距离上方的距离
            var freesize = 0;
            var remove = $('.mip-video-player-popup .mip-video-popup-remove');
            if (remove.length) {
                freesize = remove.height() + remove.offset().top;
            }

            // 屏幕旋转后，设置video的位置和尺寸
            $(window).off('orientationchange' + eventNS + ' resize' + eventNS)
                .on('orientationchange' + eventNS + ' resize' + eventNS, function () {
                    self.calculateVideo({
                        freesize: freesize
                    });
                });

            // 设置video的位置和尺寸
            self.calculateVideo({
                freesize: freesize
            });
        },

        // android全屏时计算video的高度和位置
        // @param {boolean}    params.freesize  可选 上下需要空闲出来的尺寸
        calculateVideo: function (params) {
            var self = this;
            var video = self.$video;
            var params = params || {};

            // 初始化样式避免被设定影响
            self.initStyle();

            setTimeout(function () {
                var winHeight = $(window).height();
                var winWidth = $(window).width();
                var freesize = params.freesize || 0;
                var h = video.height();

                if (winHeight <= winWidth) {
                    h = winHeight - freesize * 2;
                }
                video.css({
                    'height': h + 'px',
                    'margin-top': - h / 2 + 'px',
                    'visibility': 'visible'
                });

            }, 10);
        },

        pause: function() {
            this.video.pause();
        },

        remove: function() {
            this.$video.parent().remove();
            this.isWorking = false;
        },

        // 获取视频时长
        getVideoTime: function() {
            return Math.ceil(this.video.duration);
        },

        on: function(name, fn) {
            this.$video.on(name, fn);
        },

        off: function(name, fn) {
            this.$video.off(name, fn);
        },

        trigger: function(name) {
            this.$video.trigger(name);
        }
        
    }

    return VideoPlayer;
});
