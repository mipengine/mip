/**
 * @date:  2016-09-19
 * @time: 12:18
 * @description: #
 */
define(["require", "zepto", "customElement"], function(require) {
    //var customElem = require('customElement');
    var customElem = require('customElement').create();

    /* 生命周期 function list，根据组件情况选用，（一般情况选用 build、inviewCallback） start */
    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        // this.element 可取到当前实例对应的 dom 元素
        var element = this.element;
        var id = element.getAttribute("asid");
        var n = require("zepto");
        var i = n(element);
        var script = ['<script type="text/javascript" id="ads_'+id+'">', 'ac_as_id = '+id+';ac_format = 0;ac_mode = 1;ac_group_id = 1;ac_server_base_url = "d-test.39.net/";','</script>'];
        i.append(script.join(""));
        ks(id);
    };

    /* 生命周期 function list，根据组件情况选用 end */


    var ks = function(asid) {
        var g, d;
        (function() {
            typeof _acK != "undefined" ? d = window._acK : (d = window._acK = function(a) {
                return new d.prototype.init(a)
            }
            ,
            typeof ac_info_ware == "undefined" && (ac_info_ware = {}),
            g = ac_info_ware,
            d.extend = function(a, b, c) {
                c && d.extend(a, c);
                for (var f in b)
                    b.hasOwnProperty(f) && (a[f] = b[f]);
                return a
            }
            ,
            d.extend(d, {
                ready: function() {
                    d.isReady = 1
                },
                idle: [1, 1],
                getProtocol: function() {
                    return location.protocol + "//"
                },
                joinParameters: function(a, b) {
                    var c = [];
                    if (b == ",")
                        for (var d in a)
                            a.hasOwnProperty(d) && Array.prototype.push.call(c, a[d]);
                    else if (b == "&")
                        for (var e in a)
                            a.hasOwnProperty(e) && Array.prototype.push.call(c, e + "=" + a[e]);
                    return c.join(b)
                },
                createCacheBuster: function() {
                    return Math.ceil(Math.random() * 1E10)
                },
                getCookieEnabled: function() {
                    return navigator.cookieEnabled ? 1 : 0
                },
                getFlashVersion: function() {
                    var a = "0,0,0,0";
                    try {
                        navigator.plugins && navigator.plugins["Shockwave Flash"] ? a = navigator.plugins["Shockwave Flash"].description : window.ActiveXObject && new ActiveXObject("ShockwaveFlash.ShockwaveFlash") && (a = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version"))
                    } catch (b) {}
                    a = a.match(/\d+/g);
                    return a[0]
                },
                getPreviousUrl: function() {
                    var a = "";
                    try {
                        a = top.document.referrer
                    } catch (b) {
                        try {
                            a = document.referrer
                        } catch (c) {}
                    }
                    return encodeURIComponent(a)
                },
                getCurrentUrl: function() {
                    var a = "";
                    try {
                        a = top.document.location
                    } catch (b) {
                        try {
                            a = document.location
                        } catch (c) {}
                    }
                    return encodeURIComponent(a)
                },
                getDomain: function(a) {
                    var b = ""
                      , c = ""
                      , d = /[0-9a-z\-]+\.com\.cn$|[0-9a-z\-]+\.edu\.cn$|[0-9a-z\-]+\.gov\.cn$|[0-9a-z\-]+\.net\.cn$|[0-9a-z\-]+\.org\.cn$|[0-9a-z\-]+\.mil\.cn$|[0-9a-z\-]+\.cn$|[0-9a-z\-]+\.com$|[0-9a-z\-]+\.net$|[0-9a-z\-]+\.org$|[0-9a-z\-]+\.edu$|[0-9a-z\-]+\.gov$|[0-9a-z\-]+\.cc$|[0-9a-z\-]+\.info/;
                    (a = /\/\/([0-9a-z\-\.]+)/.exec(a)) && (b = a[1]);
                    b && (a = d.exec(b)) && (c = a[0]);
                    return c ? c : b
                },
                isSameDomain: function(a, b) {
                    var c = d.getDomain(a)
                      , f = d.getDomain(b);
                    return c && f && c == f ? !0 : !1
                },
                getCharset: function() {
                    var a = "utf-8";
                    return a = window.ActiveXObject ? document.charset : document.characterSet
                },
                load: function(a, b, c, f) {
                    var e, l = /loaded|complete/i, j = "ac_js86_$" + d.createCacheBuster();
                    b ? (e = document.createElement("script"),
                    e.type = "text/javascript",
                    e.async = 1,
                    e.id = j,
                    e.src = a,
                    document.getElementsByTagName("head")[0].appendChild(e)) : (window.ActiveXObject && (l = /complete/i),
                    s2 = document.createElement("script"),s2.type="text/javascript",s2.src = a,s2.id = j,
                    document.getElementById("ads_" + asid).parentNode.appendChild(s2));
                    if (e = d.$(j))
                        e.onload = e.onreadystatechange = function() {
                            if (!e.readyState || e.readyState.match(l))
                                if (typeof c == "function" && (c(),
                                c = null ),
                                e && e.parentNode)
                                    e.onload = e.onreadystatechange = null ,
                                    e.parentNode.removeChild(e),
                                    e = null
                        }
                        ;
                    f && setTimeout(function() {
                        if (e)
                            typeof c == "function" && (c(),
                            c = null ),
                            e.src = "javascript:void(0)"
                    }, f)
                },
                send: function(a, b) {
                    var c;
                    b ? (c = document.createElement("img"),
                    c.style.display = "none") : (c = document.createElement("script"),
                    c.type = "text/javascript",
                    c.async = !0);
                    document.body.insertBefore(c, document.body.firstChild);
                    c.src = a + (a.indexOf("?") > 0 ? "&cb=" : "?cb=") + Math.ceil(Math.random() * 1E9)
                },
                $: function(a) {
                    return typeof a == "string" ? document.getElementById(a) : a
                },
                cookie: function(a, b, c) {
                    if (typeof b !== "undefined") {
                        if (b === null )
                            b = "",
                            c = c || {},
                            c.expires = -1;
                        a = a + "=" + b;
                        c && (c.expires && (a += ";expires=" + c.expires.toUTCString()),
                        c.path && (a += ";path=" + c.path),
                        c.domain && (a += ";domain=" + c.domain),
                        c.secure && (a += ";secure"));
                        document.cookie = a
                    } else
                        return RegExp(";?" + a + "=([^;]*);?").test(document.cookie) ? decodeURIComponent(RegExp.$1) : null
                },
                ga: function(a, b) {
                    typeof ac_info_ware === "undefined" && (ac_info_ware = {});
                    typeof ac_info_ware[a] === "undefined" && (ac_info_ware[a] = {});
                    typeof b !== "undefined" && (ac_info_ware[a].mid = b);
                    typeof ac_info_ware[a].mid === "undefined" && (ac_info_ware[a].mid = -1);
                    return ac_info_ware[a].mid
                },
                gak: function(a, b, c) {
                    typeof ac_info_ware === "undefined" && (ac_info_ware = {});
                    typeof ac_info_ware[a] === "undefined" && (ac_info_ware[a] = {});
                    typeof c !== "undefined" && (ac_info_ware[a][b] = c);
                    return ac_info_ware[a][b]
                },
                gas: function(a, b) {
                    var c = function(a, b) {
                        for (var c = 0, e; e = b[c]; ++c) {
                            var f = d.gak(e, "imids")
                              , h = d.gak(e, "mid");
                            h && a != h && (f ? f.indexOf(h) == -1 && d.gak(e, "imids", [f, h].join(",")) : d.gak(e, "imids", h + ""));
                            d.gak(e, "mid", a)
                        }
                    }
                    ;
                    arguments.length == 1 && (b = 0);
                    for (var f = 0, e = a.length; f < e; f++)
                        if (a[f].length)
                            if (f == b)
                                c(a[f][0], a[f].slice(1));
                            else if (f != b) {
                                var l = {}
                                  , j = a[f][0]
                                  , h = a[f].slice(1);
                                l[j] = h;
                                d.igas(l)
                            }
                },
                igas: function(a) {
                    for (var b in a)
                        for (var c = a[b], f = 0, e = c.length; f < e; f++) {
                            var l = c[f]
                              , j = d.gak(l, "imids");
                            j && j.indexOf(b) == -1 ? j += "," + b : j = b + "";
                            d.gak(l, "imids", j)
                        }
                },
                rcid: function(a) {
                    if (!d._pcids)
                        d._pcids = [];
                    d._pcids.push(a)
                },
                reload: function(a, b, c, f, e, l, j) {
                    if (arguments.length == 1 && window.ac_info_ware && ac_info_ware["$tag_" + a])
                        return ac_info_ware[a].async = 1,
                        ac_info_ware["$tag_" + a].g(),
                        !1;
                    var f = f || 0
                      , e = e || 0
                      , l = l || 0
                      , j = j || 1
                      , h = null
                      , g = null
                      , m = null
                      , g = null
                      , k = ""
                      , n = !1;
                    if (!f && window.ac_info_ware && ac_info_ware["$tag_" + a])
                        ac_info_ware[a].async = 1,
                        setTimeout(function() {
                            ac_info_ware["$tag_" + a].g()
                        }, b * 1E3);
                    if (f && window.ac_info_ware && ac_info_ware["$tag_" + a] && (ac_info_ware[a].async = 1,
                    g = ac_info_ware["$tag_" + a],
                    k = g.info("destid"),
                    g = d.$("ac_js86_" + a),
                    k && d.$(k) ? (m = d.$(k),
                    n = !0) : g && g.parentNode && (d.$("vs_anch_" + a) ? m = d.$("vs_anch_" + a) : (m = d.element("div", {
                        id: "vs_anch_" + a
                    }, {
                        border: "none",
                        background: "none",
                        margin: 0,
                        padding: 0,
                        fontSize: 0,
                        height: "1px",
                        width: "1px",
                        position: "absolute"
                    }),
                    g.parentNode.insertBefore(m, g)),
                    n = !0),
                    n))
                        d["vs_" + a] ? h = d["vs_" + a] : (h = d["vs_" + a] = {},
                        h.t = null ,
                        h.starttm = function() {
                            if (h.t == null )
                                h.t = setTimeout(function() {
                                    window.ac_info_ware["$tag_" + a].g();
                                    h.stoptm()
                                }, b * 1E3)
                        }
                        ,
                        h.stoptm = function() {
                            if (h.t)
                                clearTimeout(h.t),
                                h.t = null ;
                            if (h.interval)
                                clearTimeout(h.interval),
                                h.interval = null
                        }
                        ),
                        h.stoptm(),
                        h.interval = setTimeout(function() {
                            var a = null
                              , a = !0
                              , b = 0
                              , c = 0
                              , f = 0
                              , g = 0;
                            document.hasFocus && (a = document.hasFocus());
                            a ? j ? (f = d.getClient("height"),
                            g = d.getClient("width"),
                            m.getBoundingClientRect && (a = m.getBoundingClientRect(),
                            b = a.top - (document.documentElement.clientLeft || document.body.clientLeft || 0),
                            c = a.left - (document.documentElement.clientTop || document.body.clientTop || 0)),
                            b > -l && b < f && c > -e && c < g ? h.starttm() : h.stoptm()) : h.starttm() : h.stoptm();
                            h.interval = setTimeout(arguments.callee, 1E3)
                        }, 1E3);
                    c == 0 && setTimeout(function() {
                        location.reload()
                    }, b * 1E3)
                },
                vmap: function(a) {
                    var b = new Date;
                    b.setFullYear(b.getFullYear() + 1);
                    d.cookie("acaspvid", a.acvid, {
                        expires: b,
                        path: "/",
                        domain: location.host
                    })
                },
                element: function(a, b, c, f) {
                    a = document.createElement(a);
                    if (b)
                        for (var e in b)
                            a.setAttribute(e, b[e]);
                    c && d.css(a, c);
                    if (f)
                        a.innerHTML = f;
                    return a
                },
                css: function(a, b) {
                    var c = d.$(a);
                    if (typeof b == "string") {
                        if (c.currentStyle)
                            return c.currentStyle[b];
                        if (window.getComputedStyle)
                            return document.defaultView.getComputedStyle(c, null )[b]
                    } else if (typeof b == "object")
                        for (var f in b)
                            c.style[f] = b[f]
                },
                getClient: function(a) {
                    a = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
                    return document.compatMode == "BackCompat" ? document.body["client" + a] : document.documentElement["client" + a]
                },
                getScroll: function(a) {
                    a = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
                    return document.documentElement["scroll" + a] || document.body["scroll" + a]
                },
                getPosition: function(a) {
                    var a = d.$(a)
                      , b = {
                        left: 0,
                        top: 0
                    };
                    if (a.getBoundingClientRect)
                        b.left = Math.round(a.getBoundingClientRect().left + d.getScroll("left") - (document.documentElement.clientLeft || document.body.clientLeft || 0)),
                        b.top = Math.round(a.getBoundingClientRect().top + d.getScroll("top") - (document.documentElement.clientTop || document.body.clientTop || 0));
                    return b
                },
                getCurrentScript: function() {
                    var a = {
                        script: null ,
                        last: !1
                    }, b;
                    if (document.currentScript)
                        a.script = document.currentScript;
                    else {
                        b = document.getElementsByTagName("script");
                        if (/msie \d/i.test(navigator.userAgent))
                            for (i = b.length - 1; i >= 0; i--)
                                if (b[i].readyState === "interactive") {
                                    a.script = b[i];
                                    break
                                }
                        if (!a.script)
                            a.script = b[b.length - 1],
                            a.last = !0
                    }
                    return a
                },
                isFirstScreen: function(a, b, c) {
                    var f = 0
                      , e = d.getClient("height")
                      , g = 0
                      , j = d.$("ac_js86_" + a)
                      , h = null ;
                    if (b && d.$(b))
                        g = d.getPosition(b).top;
                    else if (c)
                        g = c[0];
                    else if (j)
                        h = d.element("div", {
                            id: "vs_anch_" + a
                        }, {
                            border: "none",
                            background: "none",
                            margin: 0,
                            padding: 0,
                            fontSize: 0,
                            height: "1px",
                            width: "1px",
                            position: "absolute"
                        }),
                        j.parentNode.insertBefore(h, j),
                        g = d.getPosition(h).top,
                        h.parentNode.removeChild(h);
                    e && (f = Math.ceil(g / e));
                    return f
                },
                ssp: function(a) {
                    var b = 0
                      , c = a.aid
                      , f = a.vid
                      , e = a.pf
                      , g = a.dAd ? a.dAd : null
                      , j = a.js ? a.js : "http://static.acs86.com/csp.js"
                      , h = a.sburl ? a.sburl : ""
                      , o = a.ext ? a.ext : null
                      , m = a.ssct ? a.ssct : ""
                      , k = a.sdct ? a.sdct : ""
                      , b = window.ac_info_ware && ac_info_ware[c] && ac_info_ware[c].async ? 1 : 0;
                    b == 0 ? (ac_ssp_id = c,
                    ac_ssp_visitor_id = f,
                    ac_ssp_platform = e,
                    ac_ssp_async = b,
                    ac_ssp_default_ad = g,
                    ac_ssp_ad_track = m,
                    ac_ssp_default_ad_track = k,
                    a.sburl && (ac_ssp_server_base_url = h),
                    a.ext && (ac_ssp_ext = o),
                    s3 = document.createElement("script"),s3.type="text/javascript",s3.src = j,
                    document.getElementById("ads_" + asid).parentNode.appendChild(s3)) : d.load(j, 1, function() {
                        var d = {
                            aid: c,
                            vid: f,
                            pf: e,
                            async: b,
                            dAd: g,
                            ssct: m,
                            sdct: k
                        };
                        if (a.sburl)
                            d.serverbaseurl = h;
                        if (a.ext)
                            d.ext = o;
                        _acCSP(d)
                    })
                },
                megax: function(a) {
                    var b = 0, c = a.oid, f = a.aid, e = a.dAd ? a.dAd : null , g = a.js ? a.js : "http://static.mlt01.com/b.js", j = a.sburl ? a.sburl : "", h = a.cburl ? a.cburl : "", o = a.ext ? a.ext : null , m = a.ssct ? a.ssct : "", a = a.sdct ? a.sdct : "", k;
                    if (window.ac_info_ware && ac_info_ware[c]) {
                        if (c = ac_info_ware[c],
                        c.async && (b = 1),
                        c.destid)
                            k = c.destid
                    } else
                        b = 0;
                    if (b == 0)
                        mx_as_id = f,
                        mx_async = b,
                        mx_default_ad = e,
                        mx_ad_track = m,
                        mx_default_ad_track = a,
                        j && (mx_server_base_url = j),
                        h && (mx_static_base_url = h),
                        o && (mx_external = o),
                        k && (mx_dest_id = k),
                        s4 = document.createElement("script"),s4.type="text/javascript",s4.src = g,
                        document.getElementById("ads_" + asid).parentNode.appendChild(s4);
                    else {
                        var n = {
                            aid: f,
                            async: b,
                            dAd: e,
                            ssct: m,
                            sdct: a
                        };
                        if (j)
                            n.serverbaseurl = j;
                        if (h)
                            n.staticbaseurl = h;
                        if (o)
                            n.ex = o;
                        if (k)
                            n.destid = k;
                        window._mxB ? _mxB(n) : d.load(g, 1, function() {
                            _mxB(n)
                        })
                    }
                }
            }),
            d.prototype = {
                init: function(a) {
                    if (a && (a.aids || a.aid)) {
                        if (a.aids)
                            for (var b = 0, c; c = a.aids[b]; ++b)
                                g[c] ? g[c].rl = 0 : g[c] = {
                                    rl: 0
                                };
                        var f = "ac_js86_" + a.aid;
                        (function() {
                            var b = d.getCurrentScript()
                              , c = b.script
                              , b = b.last;
                            if (!d.$(f)) {
                                var s5 = document.createElement("ins");
                                s5.id = f, s5.style = "display:none;";
                                if (b && !a.async && (document.getElementById("ads_" + a.aid).parentNode.appendChild(s5),
                                d.$(f)))
                                    return;
                                b = document.createElement("ins");
                                b.style.display = "none";
                                b.id = f;
                                document.getElementById("ads_" + a.aid).parentNode.appendChild(b)
                            }
                        })();
                        this.timestamp = (new Date).getTime();
                        this.aid = a.aid;
                        g[this.aid] ? d.extend(g[this.aid], a) : g[this.aid] = a;
                        g["$tag_" + this.aid] = this;
                        this.info("mode") === 1 && (this.info("rl") === 0 ? (this.info("rl", 1),
                        g.otlads && g.otlads[this.aid] && (g.otlads[this.aid](),
                        g.otlads[this.aid] = null )) : this.g())
                    }
                },
                jsv: 7,
                info: function(a, b) {
                    typeof g == "undefined" && (g = {});
                    g[this.aid] || (g[this.aid] = {});
                    typeof b != "undefined" && (b === null ? delete g[this.aid][a] : g[this.aid][a] = b);
                    return g[this.aid][a]
                },
                getParameters: function() {
                    var a = ""
                      , b = ""
                      , c = ""
                      , f = !1
                      , e = this.info("pv") || 1
                      , a = this.info("mid") === void 0 ? -1 : this.info("mid")
                      , b = this.info("imids") === void 0 ? 0 : this.info("imids")
                      , c = d.joinParameters({
                        aid: this.info("aid"),
                        gid: this.info("gid") === void 0 ? 0 : this.info("gid"),
                        height: 0,
                        width: 0,
                        format: this.info("format") === void 0 ? 0 : this.info("format"),
                        mode: this.info("mode") === void 0 ? 1 : this.info("mode"),
                        ce: d.getCookieEnabled(),
                        fv: d.getFlashVersion()
                    }, ",")
                      , e = {
                        pv: e,
                        sp: c,
                        ec: d.getCharset(),
                        re: [screen.width, screen.height].join(",")
                    };
                    if (this.info("aids"))
                        e.clt = this.info("aids").join(",");
                    a != -1 && (e.mid = a);
                    b && (e.imids = b);
                    d._pcids && (e.pcids = d._pcids.join(","));
                    if (this.info("gid") === 1 && typeof ac_content_targeting != "undefined" && ac_content_targeting)
                        e.ct = encodeURIComponent(ac_content_targeting);
                    if (this.info("gid") === 1 && typeof ac_content_id != "undefined" && ac_content_id)
                        e.ctid = encodeURIComponent(ac_content_id);
                    if (this.info("sendkeywords") && this.info("gid") === 1 && typeof ac_keywords_targeting != "undefined" && ac_keywords_targeting)
                        e.kw = encodeURIComponent(ac_keywords_targeting);
                    this.info("ex") && d.extend(e, this.info("ex"));
                    if (this.info("sendreferer") === 1) {
                        a = d.cookie("asp_furl");
                        b = d.getPreviousUrl();
                        c = d.getCurrentUrl();
                        if (a)
                            b && !d.isSameDomain(decodeURIComponent(b), decodeURIComponent(c)) && !d.isSameDomain(decodeURIComponent(b), a) ? (f = !0,
                            e.purl = b) : e.purl = encodeURIComponent(a);
                        else if (b)
                            d.isSameDomain(decodeURIComponent(b), decodeURIComponent(c)) || (f = !0),
                            e.purl = b;
                        f && d.cookie("asp_furl", b, {
                            domain: d.getDomain(decodeURIComponent(c)),
                            path: "/"
                        })
                    }
                    if (this.info("currenturl"))
                        e.curl = encodeURIComponent(this.info("currenturl"));
                    e.jsv = this.jsv;
                    e.cb = d.createCacheBuster();
                    d.seq ? d.seq += 1 : d.seq = 1;
                    e.seq = d.seq;
                    if (d.cookie("acaspvid"))
                        e.vid = d.cookie("acaspvid");
                    e.fs = d.isFirstScreen(this.aid, this.info("destid"), this.info("coors"));
                    if (this.info("async"))
                        e.ar = 1;
                    if (this.info("ad_callback"))
                        e.acb = this.info("ad_callback");
                    return d.joinParameters(e, "&")
                },
                getServerUrl: function() {
                    return d.getProtocol() + this.getBaseUrl() + "20160105?"
                },
                getBaseUrl: function() {
                    return this.info("serverbaseurl") ? this.info("serverbaseurl") : this.getLBUrl()
                },
                getLBUrl: function() {
                    return this.info("serverbaseurl", this.info("gid") === 1 ? "afp.acs86.com/" : "acs86.com/")
                },
                g: function(a, b) {
                    var c = this;
                    (new Date).getTime();
                    var f;
                    b || c.info("async") ? (f = function() {
                        d.idle[1] = 1
                    }
                    ,
                    function() {
                        d.idle[1] ? (d.idle[1] = 0,
                        d.load(a || c.getServerUrl() + c.getParameters(), b || c.info("async"), f, 1E4)) : setTimeout(arguments.callee, 0)
                    }()) : (d.idle[0] = 0,
                    f = function() {
                        d.idle[0] = 1
                    }
                    ,
                    d.load(a || c.getServerUrl() + c.getParameters(), b || c.info("async"), f, 1E4))
                }
            },
            d.prototype.init.prototype = d.prototype)
        })();
        (function() {
            typeof _acKOTL == "undefined" && (_acKOTL = function() {
                var a = Array.prototype.slice.call(arguments, 0)
                  , b = 1
                  , c = ""
                  , f = 0
                  , e = null
                  , g = null ;
                typeof a[a.length - 1] != "string" && (b = 2,
                f = 1);
                c = a[a.length - b];
                e = a.slice(0, -b);
                for (g = e.splice(0, 16); g.length; )
                    d({
                        aid: 0,
                        aids: g,
                        gid: 1,
                        format: 0,
                        mode: 1,
                        serverbaseurl: c,
                        sendreferer: f
                    }),
                    g = e.splice(0, 16)
            }
            )
        })();
        (function() {
            var a = {
                pv: 1,
                gid: 0,
                format: 0,
                mode: 1,
                hidetime: 0,
                staticbaseurl: "s.acs86.com/"
            };
            if (typeof ac_as_id == "number") {
                a.aid = ac_as_id;
                a.pv = 1;
                a.sendreferer = 0;
                ac_as_id = null ;
                if (typeof ac_group_id == "number")
                    a.gid = ac_group_id,
                    a.groupid = ac_group_id,
                    ac_group_id = null ;
                if (typeof ac_format == "number")
                    a.format = ac_format,
                    ac_format = null ;
                if (typeof ac_mode == "number")
                    a.mode = ac_mode,
                    ac_mode = null ;
                if (a.gid === 0)
                    a.async = 1;
                if (typeof ac_async == "number")
                    a.async = ac_async,
                    ac_async = null ;
                if (typeof ac_dest_id != "undefined")
                    a.destid = ac_dest_id,
                    ac_dest_id = null ;
                if (typeof ac_anch_id != "undefined")
                    a.anchid = ac_anch_id,
                    ac_anch_id = null ;
                if (typeof ac_coors != "undefined")
                    a.coors = ac_coors,
                    ac_coors = null ;
                if (typeof ac_send_referer != "undefined")
                    a.sendreferer = ac_send_referer,
                    ac_send_referer = null ;
                if (typeof ac_send_keywords != "undefined")
                    a.sendkeywords = ac_send_keywords,
                    ac_send_keywords = null ;
                if (typeof ac_hide_time != "undefined")
                    a.hidetime = ac_hide_time,
                    ac_hide_time = null ;
                if (typeof ac_current_url == "string" && ac_current_url)
                    a.currenturl = ac_current_url,
                    ac_current_url = null ;
                if (typeof ac_static_base_url == "string" && ac_static_base_url)
                    a.staticbaseurl = ac_static_base_url,
                    ac_static_base_url = null ;
                if (typeof ac_server_base_url == "string" && ac_server_base_url)
                    a.serverbaseurl = ac_server_base_url,
                    ac_server_base_url = null ;
                if (typeof ac_ad_none == "function")
                    a.ad_none = ac_ad_none,
                    ac_ad_none = null ;
                if (typeof ac_ad_callback == "string" && ac_ad_callback)
                    a.ad_callback = ac_ad_callback,
                    ac_ad_callback = null ;
                if (typeof ac_show_end == "function")
                    a.show_end = ac_show_end,
                    ac_show_end = null ;
                if (typeof ac_state_change == "function")
                    a.state_change = ac_state_change,
                    ac_state_change = null ;
                d(a)
            }
        })()
    };

    return customElem;
}),
require(["extensions/mip-39ad/0.1/mip-39ad"], function(t) {
    MIP.registerMipElement("mip-39ad", t)
});

