/**
 * @file 39net添加广告
 * @author www.39.net技术部
 */
// 定义广告的全局变量

var MIP39GlobNode = {};
// 定义了广告的通用模块
define(['require', 'zepto', 'customElement'], function (require) {
    // var customElem = require('customElement');
    var customElem = require('customElement').create();
    var ks = function (asid) {
        var g;
        var d;
        (function () {
            // 自执行引导函数
            typeof MIP39GlobNode.ack !== 'undefined' ? d =  MIP39GlobNode.ack : (d =  MIP39GlobNode.ack = function (a) {
                var constructor = d.prototype.init;
                return new constructor(a);
            }
            ,
            typeof MIP39GlobNode.ackInfoWare === 'undefined' && (MIP39GlobNode.ackInfoWare = {}),
            g = MIP39GlobNode.ackInfoWare,
            // 继承的钩子函数
            d.extend = function (a, b, c) {
                c && d.extend(a, c);
                for (var f in b) {
                    if (b.hasOwnProperty(f)) {
                        b.hasOwnProperty(f) && (a[f] = b[f]);
                    }
                }
                return a;
            }
            ,
            // 继承的工具方法
            d.extend(d, {
                ready: function () {
                    d.isReady = 1;
                },
                idle: [1, 1],
                getProtocol: function () {
                    return location.protocol + '//';
                },
                joinParameters: function (a, b) {
                    var c = [];
                    if (b === ',') {
                        for (var d in a) {
                            if (a.hasOwnProperty(d)) {
                                a.hasOwnProperty(d) && Array.prototype.push.call(c, a[d]);
                            }
                        }
                    }
                    else if (b === '&') {
                        for (var e in a) {
                            if (a.hasOwnProperty(e)) {
                                a.hasOwnProperty(e) && Array.prototype.push.call(c, e + '=' + a[e]);
                            }
                        }
                    }
                    return c.join(b);
                },
                createCacheBuster: function () {
                    return Math.ceil(Math.random() * 1E10);
                },
                getCookieEnabled: function () {
                    return navigator.cookieEnabled ? 1 : 0;
                },
                getPreviousUrl: function () {
                    var a = '';
                    try {
                        a = top.document.referrer;
                    } catch (b) {
                        try {
                            a = document.referrer;
                        } catch (c) {}
                    }
                    return encodeURIComponent(a);
                },
                getCurrentUrl: function () {
                    var a = '';
                    try {
                        a = top.document.location;
                    } catch (b) {
                        try {
                            a = document.location;
                        } catch (c) {}
                    }
                    return encodeURIComponent(a);
                },
                getDomain: function (a) {
                    var b = '';
                    var c = '';
                    var d = /[0-9a-z\-]+\.com\.cn$|[0-9a-z\-]+\.edu\.cn$|[0-9a-z\-]+\.gov\.cn$|[0-9a-z\-]/
                    + /\.net\.cn$|[0-9a-z\-]+\.org\.cn$|[0-9a-z\-]+\.mil\.cn$|[0-9a-z\-]+\.cn$|[0-9a-z\-]/
                    + /\.com$|[0-9a-z\-]+\.net$|[0-9a-z\-]+\.org$|[0-9a-z\-]+\.edu$|[0-9a-z\-]/
                    + /\.gov$|[0-9a-z\-]+\.cc$|[0-9a-z\-]+\.info/;
                    (a = /\/\/([0-9a-z\-\.]+)/.exec(a)) && (b = a[1]);
                    b && (a = d.exec(b)) && (c = a[0]);
                    return c ? c : b;
                },
                isSameDomain: function (a, b) {
                    var c = d.getDomain(a);
                    var f = d.getDomain(b);
                    return c && f && c === f ? !0 : !1;
                },
                load: function (a, b, c, f) {
                    var e;
                    var l = /loaded|complete/i;
                    var  j = 'ac_js86_$' + d.createCacheBuster();
                    if (b === null) {
                        l = /complete/i;
                        MIP39GlobNode.s2 = document.createElement('script');
                        MIP39GlobNode.s2.type = 'text/javascript';
                        MIP39GlobNode.s2.src = a;
                        MIP39GlobNode.s2.id = j;
                        document.getElementById('ads_' + asid).parentNode.appendChild(MIP39GlobNode.s2);
                    } else {
                        e = document.createElement('script');
                        e.type = 'text/javascript';
                        e.async = 1;
                        e.id = j;
                        e.src = a;
                        document.getElementsByTagName('head')[0].appendChild(e);
                    }
                    if (e = d.$(j)) {
                        e.onload = e.onreadystatechange = function () {
                            if (!e.readyState || e.readyState.match(l)) {
                                if (typeof c === 'function' && (c(),
                                    c = null),
                                    e && e.parentNode) {
                                    e.onload = e.onreadystatechange = null,
                                    e.parentNode.removeChild(e),
                                    e = null;
                                }
                            }
                        };
                    }
                    f && setTimeout(function () {
                        if (e) {
                            typeof c === 'function' && (c(),
                            c = null),
                            e.src = 'javascript:void(0)';
                        }
                    }, f);
                },
                send: function (a, b) {
                    var c;
                    b ? (c = document.createElement('img'),
                    c.style.display = 'none') : (c = document.createElement('script'),
                    c.type = 'text/javascript',
                    c.async = !0);
                    document.body.insertBefore(c, document.body.firstChild);
                    c.src = a + (a.indexOf('?') > 0 ? '&cb=' : '?cb=') + Math.ceil(Math.random() * 1E9);
                },
                $: function (a) {
                    return typeof a === 'string' ? document.getElementById(a) : a;
                },
                cookie: function (a, b, c) {
                    if (typeof b !== 'undefined') {
                        if (b === null) {
                            b = '',
                            c = c || {},
                            c.expires = -1;
                        }
                        a = a + '=' + b;
                        c && (c.expires && (a += ';expires=' + c.expires.toUTCString()),
                        c.path && (a += ';path=' + c.path),
                        c.domain && (a += ';domain=' + c.domain),
                        c.secure && (a += ';secure'));
                        document.cookie = a;
                    } else {
                        return RegExp(';?' + a + '=([^;]*);?').test(document.cookie)
                        ? decodeURIComponent(RegExp.$1) : null;
                    }
                },
                ga: function (a, b) {
                    typeof MIP39GlobNode.ackInfoWare === 'undefined' && (MIP39GlobNode.ackInfoWare = {});
                    typeof MIP39GlobNode.ackInfoWare[a] === 'undefined' && (MIP39GlobNode.ackInfoWare[a] = {});
                    typeof b !== 'undefined' && (MIP39GlobNode.ackInfoWare[a].mid = b);
                    typeof MIP39GlobNode.ackInfoWare[a].mid === 'undefined' && (MIP39GlobNode.ackInfoWare[a].mid = -1);
                    return MIP39GlobNode.ackInfoWare[a].mid;
                },
                gak: function (a, b, c) {
                    typeof MIP39GlobNode.ackInfoWare === 'undefined' && (MIP39GlobNode.ackInfoWare = {});
                    typeof MIP39GlobNode.ackInfoWare[a] === 'undefined' && (MIP39GlobNode.ackInfoWare[a] = {});
                    typeof c !== 'undefined' && (MIP39GlobNode.ackInfoWare[a][b] = c);
                    return MIP39GlobNode.ackInfoWare[a][b];
                },
                gas: function (a, b) {
                    var c = function (a, b) {
                        for (var c = 0, e; e = b[c]; ++c) {
                            var f = d.gak(e, 'imids');
                            var  h = d.gak(e, 'mid');
                            h && a !== h && (f ? f.indexOf(h) === -1 && d.gak(e, 'imids', [f, h].join(',')) : d.gak(e, 'imids', h + ''));
                            d.gak(e, 'mid', a);
                        }
                    }
                   ;
                    arguments.length === 1 && (b = 0);
                    for (var f = 0, e = a.length; f < e; f++) {
                        if (a[f].length) {
                            if (f === b) {
                                c(a[f][0], a[f].slice(1));
                            }
                            else if (f !== b) {
                                var l = {};
                                var j = a[f][0];
                                var h = a[f].slice(1);
                                l[j] = h;
                                d.igas(l);
                            }
                        }
                    }
                },
                igas: function (a) {
                    for (var b in a) {
                        for (var c = a[b], f = 0, e = c.length; f < e; f++) {
                            var l = c[f];
                            var j = d.gak(l, 'imids');
                            j && j.indexOf(b) === -1 ? j += ',' + b : j = b + '';
                            d.gak(l, 'imids', j);
                        }
                    }
                },
                rcid: function (a) {
                    if (!d._pcids) {
                        d._pcids = [];
                    }
                    d._pcids.push(a);
                },
                reload: function (a, b, c, f, e, l, j) {
                    if (arguments.length === 1 &&  MIP39GlobNode.ackInfoWare && MIP39GlobNode.ackInfoWare['$tag_' + a]) {
                        return MIP39GlobNode.ackInfoWare[a].async = 1,
                        MIP39GlobNode.ackInfoWare['$tag_' + a].g(),
                        !1;
                    }
                    var f = f || 0;
                    var e = e || 0;
                    var l = l || 0;
                    var j = j || 1;
                    var h = null;
                    var g = null;
                    var m = null;
                    var g = null;
                    var k = '';
                    var n = !1;
                    if (!f &&  MIP39GlobNode.ackInfoWare && MIP39GlobNode.ackInfoWare[' ' + a]) {
                        MIP39GlobNode.ackInfoWare[a].async = 1,
                        setTimeout(function () {
                            MIP39GlobNode.ackInfoWare['$tag_' + a].g();
                        }, b * 1E3);
                    }
                    if (f &&  MIP39GlobNode.ackInfoWare && MIP39GlobNode.ackInfoWare['$tag_' + a]
                        && (MIP39GlobNode.ackInfoWare[a].async = 1,
                    g = MIP39GlobNode.ackInfoWare['$tag_' + a],
                    k = g.info('destid'),
                    g = d.$('ac_js86_' + a),
                    k && d.$(k) ? (m = d.$(k),
                    n = !0) : g && g.parentNode && (d.$('vs_anch_' + a) ? m = d.$('vs_anch_' + a) : (m = d.element('div', {
                        id: 'vs_anch_' + a
                    }, {
                        border: 'none',
                        background: 'none',
                        margin: 0,
                        padding: 0,
                        fontSize: 0,
                        height: '1px',
                        width: '1px',
                        position: 'absolute'
                    }),
                    g.parentNode.insertBefore(m, g)),
                    n = !0),
                    n)) {
                        d['vs_' + a] ? h = d['vs_' + a] : (h = d['vs_' + a] = {},
                        h.t = null,
                        h.starttm = function () {
                            if (h.t === null) {
                                h.t = setTimeout(function () {
                                    MIP39GlobNode.ackInfoWare['$tag_' + a].g();
                                    h.stoptm();
                                }, b * 1E3);
                            }
                        }
                        ,
                        h.stoptm = function () {
                            if (h.t) {
                                clearTimeout(h.t),
                                h.t = null;
                            }
                            if (h.interval) {
                                clearTimeout(h.interval),
                                h.interval = null;
                            }
                        }
                        );
                        h.stoptm();
                        h.interval = setTimeout(function () {
                            var a = null;
                            var a = !0;
                            var b = 0;
                            var c = 0;
                            var f = 0;
                            var g = 0;
                            document.hasFocus && (a = document.hasFocus());
                            a ? j ? (f = d.getClient('height'),
                            g = d.getClient('width'),
                            m.getBoundingClientRect && (a = m.getBoundingClientRect(),
                            b = a.top - (document.documentElement.clientLeft || document.body.clientLeft || 0),
                            c = a.left - (document.documentElement.clientTop || document.body.clientTop || 0)),
                            b > -l && b < f && c > -e && c < g ? h.starttm() : h.stoptm()) : h.starttm() : h.stoptm();
                            h.interval = setTimeout(arguments.callee, 1E3);
                        }, 1E3);
                    }
                    c === 0 && setTimeout(function () {
                        location.reload();
                    }, b * 1E3);
                },
                vmap: function (a) {
                    var b = new Date;
                    b.setFullYear(b.getFullYear() + 1);
                    d.cookie('acaspvid', a.acvid, {
                        expires: b,
                        path: '/',
                        domain: location.host
                    });
                },
                element: function (a, b, c, f) {
                    a = document.createElement(a);
                    if (b) {
                        for (var e in b) {
                            a.setAttribute(e, b[e]);
                        }
                    }
                    c && d.css(a, c);
                    if (f) {
                        a.innerHTML = f;
                    }
                    return a;
                },
                css: function (a, b) {
                    var c = d.$(a);
                    if (typeof b === 'string') {
                        if (c.currentStyle) {
                            return c.currentStyle[b];
                        }
                        if (getComputedStyle) {
                            return document.defaultView.getComputedStyle(c, null)[b];
                        }
                    } else if (typeof b === 'object') {
                        for (var f in b) {
                            c.style[f] = b[f];
                        }
                    }
                },
                getClient: function (a) {
                    a = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
                    return document.compatMode === 'BackCompat' ? document.body['client' + a] : document.documentElement['client' + a];
                },
                getScroll: function (a) {
                    a = a.charAt(0).toUpperCase() + a.substr(1).toLowerCase();
                    return document.documentElement['scroll' + a] || document.body['scroll' + a];
                },
                getPosition: function (a) {
                    var a = d.$(a);
                    var b = {
                        left: 0,
                        top: 0
                    };
                    if (a.getBoundingClientRect) {
                        b.left = Math.round(a.getBoundingClientRect().left + d.getScroll('left') - (document.documentElement.clientLeft || document.body.clientLeft || 0));
                        b.top = Math.round(a.getBoundingClientRect().top + d.getScroll('top') - (document.documentElement.clientTop || document.body.clientTop || 0));
                    }
                    return b;
                },
                getCurrentScript: function () {
                    var a = {
                        script: null,
                        last: !1
                    };
                    var b;
                    if (document.currentScript) {
                        a.script = document.currentScript;
                    }
                    else {
                        b = document.getElementsByTagName('script');
                        if (/msie \d/i.test(navigator.userAgent)) {
                            for (var i = b.length - 1; i >= 0; i--) {
                                if (b[i].readyState === 'interactive') {
                                    a.script = b[i];
                                    break;
                                }
                            }
                        }
                        if (!a.script) {
                            a.script = b[b.length - 1];
                            a.last = !0;
                        }
                    }
                    return a;
                },
                isFirstScreen: function (a, b, c) {
                    var f = 0;
                    var e = d.getClient('height');
                    var g = 0;
                    var j = d.$('ac_js86_' + a);
                    var h = null;
                    if (b && d.$(b)) {
                        g = d.getPosition(b).top;
                    }
                    else if (c) {
                        g = c[0];
                    }
                    else if (j) {
                        h = d.element('div', {
                            id: 'vs_anch_' + a
                        }, {
                            border: 'none',
                            background: 'none',
                            margin: 0,
                            padding: 0,
                            fontSize: 0,
                            height: '1px',
                            width: '1px',
                            position: 'absolute'
                        }),
                        j.parentNode.insertBefore(h, j),
                        g = d.getPosition(h).top,
                        h.parentNode.removeChild(h);
                    }
                    e && (f = Math.ceil(g / e));
                    return f;
                },
                ssp: function (a) {
                    var c = a.aid;
                    var f = a.vid;
                    var e = a.pf;
                    var g = a.dAd ? a.dAd : null;
                    var j = a.js ? a.js : 'http://static.acs86.com/csp.js';
                    var h = a.sburl ? a.sburl : '';
                    var o = a.ext ? a.ext : null;
                    var m = a.ssct ? a.ssct : '';
                    var k = a.sdct ? a.sdct : '';
                    var b =  MIP39GlobNode.ackInfoWare && MIP39GlobNode.ackInfoWare[c] && MIP39GlobNode.ackInfoWare[c].async ? 1 : 0;
                    b === 0 ? (MIP39GlobNode.acSspId = c,
                    MIP39GlobNode.acSspVisitorId = f,
                    MIP39GlobNode.acSspPlatform = e,
                    MIP39GlobNode.acSspAsync = b,
                    MIP39GlobNode.acSspDefaultAd = g,
                    MIP39GlobNode.acSspAdTrack = m,
                    MIP39GlobNode.acSspDefaultAdTrack = k,
                    a.sburl && (MIP39GlobNode.acSspServerBaseUrl = h),
                    a.ext && (MIP39GlobNode.acSspExt = o),
                    MIP39GlobNode.s3 = document.createElement('script'), MIP39GlobNode.s3.type='text/javascript', MIP39GlobNode.s3.src = j,
                    document.getElementById('ads_' + asid).parentNode.appendChild(MIP39GlobNode.s3)) : d.load(j, 1, function () {
                        var d = {
                            aid: c,
                            vid: f,
                            pf: e,
                            async: b,
                            dAd: g,
                            ssct: m,
                            sdct: k
                        };
                        if (a.sburl) {
                            d.serverbaseurl = h;
                        }
                        if (a.ext) {
                            d.ext = o;
                        }
                        MIP39GlobNode.acCSP(d);
                    });
                },
                megax: function (a) {
                    var b = 0;
                    var c = a.oid;
                    var f = a.aid;
                    var e = a.dAd ? a.dAd : null;
                    var g = a.js ? a.js : 'http://static.mlt01.com/b.js';
                    var j = a.sburl ? a.sburl : '';
                    var h = a.cburl ? a.cburl : '';
                    var o = a.ext ? a.ext : null;
                    var m = a.ssct ? a.ssct : '';
                    var a = a.sdct ? a.sdct : '';
                    var k;
                    if (MIP39GlobNode.ackInfoWare && MIP39GlobNode.ackInfoWare[c]) {
                        if (c = MIP39GlobNode.ackInfoWare[c],
                        c.async && (b = 1),
                        c.destid) {
                            k = c.destid;
                        }
                    } else {
                        b = 0;
                    }
                    if (b === 0) {
                        MIP39GlobNode.mxAsId = f;
                        MIP39GlobNode.mxAsync = b;
                        MIP39GlobNode.mxDefaultAd = MIP39GlobNode.e;
                        MIP39GlobNode.mxAdTrack = m;
                        MIP39GlobNode.mxDefaultAdTrack = a;
                        j && (MIP39GlobNode.mxServerBaseUrl = j);
                        h && (MIP39GlobNode.mxStaticBaseUrl = h);
                        o && (MIP39GlobNode.mxExternal = o);
                        k && (MIP39GlobNode.mxDestId = k);
                        MIP39GlobNode.s4 = document.createElement('script');
                        MIP39GlobNode.s4.type = 'text/javascript';
                        MIP39GlobNode.s4.src = g;
                        document.getElementById('ads_' + asid).parentNode.appendChild(MIP39GlobNode.s4);
                    }
                    else {
                        var n = {
                            aid: f,
                            async: b,
                            dAd: e,
                            ssct: m,
                            sdct: a
                        };
                        if (j) {
                            n.serverbaseurl = j;
                        }
                        if (h) {
                            n.staticbaseurl = h;
                        }
                        if (o) {
                            n.ex = o;
                        }
                        if (k) {
                            n.destid = k;
                        }
                        MIP39GlobNode.mxB ? MIP39GlobNode.mxB(n) : d.load(g, 1, function () {
                            MIP39GlobNode.mxB(n);
                        });
                    }
                }
            }),
            // 广告单例的具体实体化类
            d.prototype = {
                init: function (a) {
                    if (a && (a.aids || a.aid)) {
                        if (a.aids) {
                            for (var b = 0, c; c = a.aids[b]; ++b) {
                                g[c] ? g[c].rl = 0 : g[c] = {
                                    rl: 0
                                };
                            }
                        }
                        var f = 'ac_js86_' + a.aid;
                        (function () {
                            var b = d.getCurrentScript();
                            var b = b.last;
                            if (!d.$(f)) {
                                var s5 = document.createElement('ins');
                                s5.id = f, s5.style = 'display:none;';
                                if (b && !a.async
                                    && (document.getElementById('ads_' + a.aid).parentNode.appendChild(s5), d.$(f))) {
                                    return;
                                }
                                b = document.createElement('ins');
                                b.style.display = 'none';
                                b.id = f;
                                document.getElementById('ads_' + a.aid).parentNode.appendChild(b);
                            }
                        })();
                        this.timestamp = (new Date()).getTime();
                        this.aid = a.aid;
                        g[this.aid] ? d.extend(g[this.aid], a) : g[this.aid] = a;
                        g['$tag_' + this.aid] = this;
                        this.info('mode') === 1 && (this.info('rl') === 0 ? (this.info('rl', 1),
                        g.otlads && g.otlads[this.aid] && (g.otlads[this.aid](),
                        g.otlads[this.aid] = null)) : this.g());
                    }
                },
                jsv: 7,
                info: function (a, b) {
                    typeof g === 'undefined' && (g = {});
                    g[this.aid] || (g[this.aid] = {});
                    typeof b !== 'undefined' && (b === null ? delete g[this.aid][a] : g[this.aid][a] = b);
                    return g[this.aid][a];
                },
                // 获得业务参数方法
                getParameters: function () {
                    var a = '';
                    var b = '';
                    var c = '';
                    var f = !1;
                    var e = this.info('pv') || 1;
                    var a = this.info('mid') === void 0 ? -1 : this.info('mid');
                    var b = this.info('imids') === void 0 ? 0 : this.info('imids');
                    var c = d.joinParameters({
                        aid: this.info('aid'),
                        gid: this.info('gid') === void 0 ? 0 : this.info('gid'),
                        height: 0,
                        width: 0,
                        format: this.info('format') === void 0 ? 0 : this.info('format'),
                        mode: this.info('mode') === void 0 ? 1 : this.info('mode'),
                        ce: d.getCookieEnabled(),
                        fv: ''
                    }, ',');
                    var e = {
                        pv: e,
                        sp: c,
                        ec: 'utf-8',
                        re: [screen.width, screen.height].join(',')
                    };
                    if (this.info('aids')) {
                        e.clt = this.info('aids').join(',');
                    }
                    a !== -1 && (e.mid = a);
                    b && (e.imids = b);
                    d._pcids && (e.pcids = d._pcids.join(','));
                    if (this.info('gid') === 1 && typeof MIP39GlobNode.acContentTargeting !== 'undefined' && MIP39GlobNode.acContentTargeting) {
                        e.ct = encodeURIComponent(MIP39GlobNode.acContentTargeting);
                    }
                    if (this.info('gid') === 1 && typeof MIP39GlobNode.acContentId !== 'undefined' && MIP39GlobNode.acContentId) {
                        e.ctid = encodeURIComponent(MIP39GlobNode.acContentId);
                    }
                    if (this.info('sendkeywords') && this.info('gid') === 1 && typeof MIP39GlobNode.acKeywordsTargeting !== 'undefined' && MIP39GlobNode.acKeywordsTargeting) {
                        e.kw = encodeURIComponent(MIP39GlobNode.acKeywordsTargeting);
                    }
                    this.info('ex') && d.extend(e, this.info('ex'));
                    if (this.info('sendreferer') === 1) {
                        a = d.cookie('asp_furl');
                        b = d.getPreviousUrl();
                        c = d.getCurrentUrl();
                        if (a) {
                            b && !d.isSameDomain(decodeURIComponent(b), decodeURIComponent(c))
                            && !d.isSameDomain(decodeURIComponent(b), a) ? (f = !0,
                            e.purl = b) : e.purl = encodeURIComponent(a);
                        }
                        else if (b) {
                            d.isSameDomain(decodeURIComponent(b), decodeURIComponent(c)) || (f = !0),
                            e.purl = b;
                        }
                        f && d.cookie('asp_furl', b, {
                            domain: d.getDomain(decodeURIComponent(c)),
                            path: '/'
                        });
                    }
                    if (this.info('currenturl')) {
                        e.curl = encodeURIComponent(this.info('currenturl'));
                    }
                    e.jsv = this.jsv;
                    e.cb = d.createCacheBuster();
                    d.seq ? d.seq += 1 : d.seq = 1;
                    e.seq = d.seq;
                    if (d.cookie('acaspvid')) {
                        e.vid = d.cookie('acaspvid');
                    }
                    e.fs = d.isFirstScreen(this.aid, this.info('destid'), this.info('coors'));
                    if (this.info('async')) {
                        e.ar = 1;
                    }
                    if (this.info('ad_callback')) {
                        e.acb = this.info('ad_callback');
                    }
                    return d.joinParameters(e, '&');
                },
                // 获得服务器url地址
                getServerUrl: function () {
                    return d.getProtocol() + this.getBaseUrl() + '20160105?';
                },
                // 获得基础路径
                getBaseUrl: function () {
                    return this.info('serverbaseurl') ? this.info('serverbaseurl') : this.getLBUrl();
                },
                getLBUrl: function () {
                    return this.info('serverbaseurl', this.info('gid') === 1 ? 'afp.acs86.com/' : 'acs86.com/');
                },
                g: function (a, b) {
                    var c = this;
                    (new Date()).getTime();
                    var f;
                    b || c.info('async') ? (f = function () {
                        d.idle[1] = 1;
                    }
                    ,
                    function () {
                        d.idle[1] ? (d.idle[1] = 0,
                            d.load(a || c.getServerUrl() + c.getParameters(), b
                            || c.info('async'), f, 1E4)) : setTimeout(arguments.callee, 0);
                    }()) : (d.idle[0] = 0,
                    f = function () {
                        d.idle[0] = 1;
                    }
                    ,
                    d.load(a || c.getServerUrl() + c.getParameters(), b || c.info('async'), f, 1E4));
                }
            },
            d.prototype.init.prototype = d.prototype);
        })();
        (function () {
            typeof MIP39GlobNode.ackOTL === 'undefined' && (MIP39GlobNode.ackOTL = function () {
                var a = Array.prototype.slice.call(arguments, 0);
                var b = 1;
                var c = '';
                var f = 0;
                var e = null;
                var g = null;
                typeof a[a.length - 1] !== 'string' && (b = 2,
                f = 1);
                c = a[a.length - b];
                e = a.slice(0, -b);
                for (g = e.splice(0, 16); g.length;) {
                    d({
                        aid: 0,
                        aids: g,
                        gid: 1,
                        format: 0,
                        mode: 1,
                        serverbaseurl: c,
                        sendreferer: f
                    }),
                    g = e.splice(0, 16);
                }
            }
            );
        })();
        (function () {
            var a = {
                pv: 1,
                gid: 0,
                format: 0,
                mode: 1,
                hidetime: 0,
                staticbaseurl: 's.acs86.com/'
            };
            // 根据具体业务条件实例化参数vo
            if (typeof MIP39GlobNode.acAsId === 'number') {
                a.aid = MIP39GlobNode.acAsId;
                a.pv = 1;
                a.sendreferer = 0;
                MIP39GlobNode.acAsId = null;
            }
            if (typeof MIP39GlobNode.acGroupId === 'number') {
                a.gid = MIP39GlobNode.acGroupId,
                a.groupid = MIP39GlobNode.acGroupId,
                MIP39GlobNode.acGroupId = null;
            }
            if (typeof MIP39GlobNode.acFormat === 'number') {
                a.format = MIP39GlobNode.acFormat,
                MIP39GlobNode.acFormat = null;
            }
            if (typeof MIP39GlobNode.acMode === 'number') {
                a.mode = MIP39GlobNode.acMode,
                MIP39GlobNode.acMode = null;
            }
            if (a.gid === 0) {
                a.async = 1;
            }
            if (typeof MIP39GlobNode.acAsync === 'number') {
                a.async = MIP39GlobNode.acAsync,
                MIP39GlobNode.acAsync = null;
            }
            if (typeof MIP39GlobNode.acDestId !== 'undefined') {
                a.destid = MIP39GlobNode.acDestId,
                MIP39GlobNode.acDestId = null;
            }
            if (typeof MIP39GlobNode.acAnchId !== 'undefined') {
                a.anchid = MIP39GlobNode.acAnchId,
                MIP39GlobNode.acAnchId = null;
            }
            if (typeof MIP39GlobNode.acCoors !== 'undefined') {
                a.coors = MIP39GlobNode.acCoors,
                MIP39GlobNode.acCoors = null;
            }
            if (typeof MIP39GlobNode.acSendReferer !== 'undefined') {
                a.sendreferer = MIP39GlobNode.acSendReferer,
                MIP39GlobNode.acSendReferer = null;
            }
            if (typeof MIP39GlobNode.acSendKeywords !== 'undefined') {
                a.sendkeywords = MIP39GlobNode.acSendKeywords,
                MIP39GlobNode.acSendKeywords = null;
            }
            if (typeof MIP39GlobNode.acHideTime !== 'undefined') {
                a.hidetime = MIP39GlobNode.acHideTime,
                MIP39GlobNode.acHideTime = null;
            }
            if (typeof MIP39GlobNode.acCurrentUrl === 'string' && MIP39GlobNode.acCurrentUrl) {
                a.currenturl = MIP39GlobNode.acCurrentUrl,
                MIP39GlobNode.acCurrentUrl = null;
            }
            if (typeof MIP39GlobNode.acStaticBaseUrl === 'string' && MIP39GlobNode.acStaticBaseUrl) {
                a.staticbaseurl = MIP39GlobNode.acStaticBaseUrl,
                MIP39GlobNode.acStaticBaseUrl = null;
            }
            if (typeof MIP39GlobNode.acServerBaseUrl === 'string' && MIP39GlobNode.acServerBaseUrl) {
                a.serverbaseurl = MIP39GlobNode.acServerBaseUrl,
                MIP39GlobNode.acServerBaseUrl = null;
            }
            if (typeof MIP39GlobNode.acAdNone === 'function') {
                a.ad_none = MIP39GlobNode.acAdNone,
                MIP39GlobNode.acAdNone = null;
            }
            if (typeof MIP39GlobNode.acAdCallback === 'string' && MIP39GlobNode.acAdCallback) {
                a.ad_callback = MIP39GlobNode.acAdCallback,
                MIP39GlobNode.acAdCallback = null;
            }
            if (typeof MIP39GlobNode.acShowEnd === 'function') {
                a.show_end = MIP39GlobNode.acShowEnd,
                MIP39GlobNode.acShowEnd = null;
            }
            if (typeof MIP39GlobNode.acStateChange === 'function') {
                a.stateChange = MIP39GlobNode.acStateChange,
                MIP39GlobNode.acStateChange = null;
            }
            d(a);
        }
        )();
    };

    // build 方法，元素插入到文档时执行，仅会执行一次
    customElem.prototype.build = function () {
        var element2 = this.element;
        var hideLayerId = element2.getAttribute('hide-layer-id');
        var adid = element2.getAttribute('adid'); 
        MIP39GlobNode.callbackfunction = function (data) {
            var id = data;
            var n = require('zepto');
            var i = n(element2);            
            var script = [
                '<script type="text/javascript" id="ads_' + id + '">',
                'MIP39GlobNode.acAsId = ' + id + ';MIP39GlobNode.acFormat = 0;MIP39GlobNode.acMode = 1;MIP39GlobNode.acGroupId = 1;MIP39GlobNode.acServerBaseUrl = "d-mip.39.net/";',
                '</script>'];
            i.append(script.join(''));
            ks(id);
            setTimeout(function () {
             if (hideLayerId) {
            i.find(".close").click(function () {window.document.getElementById(hideLayerId).style.display = "none";});
           }
        }, 3000);
        };
        // this.element 可取到当前实例对应的 dom 元素               
        var url = 'https://app-g-mip.39.net/rel/k14.php?id=' + adid + '&jsonpcallback=MIP39GlobNode.callbackfunction';
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    };
    return customElem;
});
// 注册mip业务标签组件
require(['mip-39appgad'], function (appgad) {
    MIP.registerMipElement('mip-39appgad', appgad);
});


