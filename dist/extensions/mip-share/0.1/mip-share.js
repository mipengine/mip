/* inline dep */

define('extensions/mip-share/0.1/share/aio', ['require'], function(require){!function(n,o){function e(n,o){return d.cleanObj.toString.call(n).slice(8,-1)===o}function t(n){var o=f[n];if(o)return o.exports;throw"module "+n+" is undefined"}function r(n,o){for(var e,r,i=n.split(":"),s=i.pop().split("/"),a=d;e=s.shift();)"bdbox"!==e&&(r=e,s.length&&(a=a[e]=a[e]||{}));var c=f[n]={exports:{}},u=d.isFunction(o)?o.apply(c,[t,c.exports,c,d]):o;
u&&(c.exports=u),a[r]=c.exports}function i(){p.forEach(function(n){n()}),p.length=0,v=!0}function s(n){var o;return null==n?o=String(n):(o=Object.prototype.toString.call(n).toLowerCase(),o=o.substring(8,o.length-1)),o}function a(o){var e=o.success||g,t={imageUrl:"",mediaType:"all",title:"",content:"",linkUrl:location.href},r=o.error||g;
return d.isFunction(o.success)&&(e="_xSHARE_SUCCESS_"+d.getId(),n[e]=o.success,t.success=e),d.isFunction(o.error)&&(r="_xSHARE_FAIL_"+d.getId(),n[r]=o.error,t.error=r),d.each(o,function(n,e){"success"!==e&&"error"!==e&&(e in b?e=b[e]:"content"!==e||o.title||(t.title=n),t[e]=n)}),d.isArray(t.mediaType)&&(t.mediaType="all"),n.BoxShareData||(n.BoxShareData={successcallback:e,errorcallback:r,options:t}),t
}var c=+new Date,u=(c+"").slice(-3),l=navigator.userAgent,d={isBox:/ baiduboxapp\//i.test(l),isIOS:/(iPhone|iPod|iPad)/.test(l),isAndroid:/(Android);?[\s\/]+([\d.]+)?/.test(l),getId:function(){return u++},emptyArr:[],emptyFn:function(){},cleanObj:{},byId:function(n){return d.isString(n)?o.getElementById(n):n
},toArray:function(n){return d.emptyArr.slice.call(n)},$:function(n,e){return e=e&&1===e.nodeType?e:o,d.toArray(e.querySelectorAll(n))}};"Function,String,Array,Number,RegExp".replace(/[^, ]+/g,function(n){d["is"+n]=function(o){return e(o,n)}}),d.isBoolean=function(n){return n===!0||n===!1},d.isObject=function(n){return"object"==typeof n
},d.isUndefined=function(n){return void 0===n},d.isWindow=function(n){return null!=n&&n==n.window},d.isPlainObject=function(n){return d.isObject(n)&&!d.isWindow(n)&&Object.getPrototypeOf(n)==Object.prototype};var f={};d.define=r;var m=function(n,o,e){for(var t,r,i=n.split("."),s=e||m;t=i.shift();)"Box"!==t&&(r=t,i.length&&(s=s[t]=s[t]||{}));
return s[r]=o||{},s[r]},p=[],v=!1;m.init=function(n){return"function"!=typeof n?this:(v?n():p.push(n),this)},"complete,loaded,interactive".indexOf(o.readyState)>-1&&o.body?i():o.addEventListener("DOMContentLoaded",i,!1),r("common:bdbox/utils/getVersion",function(o,e,t){var r=function(){var o=0;if(n.baiduboxapp_version)o=n.baiduboxapp_version;
else{var e,t=navigator.userAgent;(e=/([\d+.]+)_(?:diordna|enohpi)_/.exec(t))?(e=e[1].split("."),o=e.reverse().join(".")):(e=/baiduboxapp\/([\d+.]+)/.exec(t))&&(o=e[1])}return r=function(){return o},o};t.exports=r}),r("common:bdbox/utils/version_compare",function(n,o,e){var t=function(n,o){o+="",n+="";
for(var e=n.split("."),t=o.split("."),r=0,i=Math.max(e.length,t.length);i>r;r++){if(e[r]&&!t[r]&&parseInt(e[r])>0||parseInt(e[r])>parseInt(t[r]))return 1;if(t[r]&&!e[r]&&parseInt(t[r])>0||parseInt(e[r])<parseInt(t[r]))return-1}return 0};e.exports=t}),r("common:bdbox/ios/invokeApp",function(e,t,r,i){r.exports=function(e,t,r){if(e&&i.isBox){var s=[];
if(i.isFunction(t))r=t;else for(var a in t)s.push(a+"="+t[a]);if(i.isFunction(r)){var c="_bdbox_js_"+i.getId();n[c]=function(){r.apply(n,[].slice.call(arguments,0))},s.push("func="+c)}else r&&s.push("func="+r);s="baiduboxapp://"+e+"?"+s.join("&");var u="_bdbox_ios_jsbridge",l=o.getElementById(u);l?l.src=s:(l=o.createElement("iframe"),l.style.display="none",l.id=u,l.src=s,(o.body||o.getElementsByTagName("body")[0]).appendChild(l))
}}}),r("common:bdbox/android/invokeApp",function(o,e,t,r){function i(o,e,t){if(t&&!r.isArray(t)&&(t=Array.prototype.slice.call(arguments,0).slice(2)),n[o]&&n[o][e]){var i=n[o][e].apply(n[o],t);return{error:0,result:i,__from:"js"}}var u=c();if(a(u,4.8)>=0){var l=s(o,e,t);return l=l?JSON.parse(l):{},l.__from="app",l
}if("4.7.1"===u||"4.7"==u){var d=s(o,e,t);return{error:0,result:d,__from:"app4.7"}}return{error:200}}function s(o,e,t){if(!r.isBox)return{error:201};if(!r.isAndroid)return{error:202};var i={obj:o,func:e,args:t?t:[]};try{return n.prompt("BdboxApp:"+JSON.stringify(i))}catch(s){return{error:201}}}var a=o("common:bdbox/utils/version_compare"),c=o("common:bdbox/utils/getVersion");
t.exports=i}),r("common:bdbox/utils/detect",function(o,e,t,r){function i(o){var e={name:"unknown",version:0};this===n||this.os||(this.os=e),o=o||navigator.userAgent;var t={Weibo:/weibo/i,Wechat:/micromessenger\//i,QQ:/QQ\//};for(var r in t)t.hasOwnProperty(r)&&(e["is"+r]=t[r].test(o));e.isUC=o.match(/UC/)||n.ucweb||n.ucbrowser;
var i=o.match(/(Android);?\s+([\d.]+)?/);if(i)return e.android=!0,e.version=i[2],e.name="android",e;var s=o.match(/(iPad).*OS\s([\d_]+)/),a=o.match(/(iPod)(.*OS\s([\d_]+))?/),c=!s&&o.match(/(iPhone\sOS)\s([\d_]+)/);return c&&!a?(e.ios=e.iphone=!0,e.version=c[2].replace(/_/g,"."),e.name="ios",e):s?(e.ios=e.ipad=!0,e.name="ios",e.version=s[2].replace(/_/g,"."),e):a?(e.name="ios",e.ios=e.ipod=!0,e.version=a[3]?a[3].replace(/_/g,"."):null,e):e
}i.apply(r),t.exports=i}),r("common:bdbox/each",function(n,o,e){function t(n){var o;return null==n?o=String(n):(o=Object.prototype.toString.call(n).toLowerCase(),o=o.substring(8,o.length-1)),o}e.exports=function(n,o,e){if("object"==typeof n){var r,i,s=t(n);if(e=e||n,"array"===s||"arguments"===s||"nodelist"===s){for(r=0,i=n.length;i>r;r++)if(o.call(e,n[r],r,n)===!1)return
}else for(r in n)if(n.hasOwnProperty(r)&&o.call(e,n[r],r,n)===!1)return}}}),r("common:bdbox/client/nativeShare",function(e,t,r,i){function s(o){var e={wechatIcon:location.protocol+"//m.baidu.com/static/search/logo300.png",type:"url",mediaType:"all",linkUrl:location.href,title:c.title,success:"console.log",error:"console.log"};
each(o||{},function(n,o){e[o]=n}),e.image&&(e.imageUrl=e.image),e.iconUrl&&!e.imageUrl&&"url"===e.type&&(e.imageUrl=e.iconUrl);var t={};["success","error"].forEach(function(o){var r=o;i.isFunction(e[o])&&(r="_xSHARE_SUCCESS_"+i.getId(),n[r]=e[o]),t[o+"callback"]=r,delete e[o]}),t.options=e,t.options.imageUrl&&i.isAndroid&&a(i.version,"6.5")<0&&delete t.options.imageUrl,n.BoxShareData=t;
var r=e.wechatIcon;if(/micromessenger\//i.test(navigator.userAgent)&&r&&r.length>20){var s=c.createElement("div");s.id="wa-generalevent-wx-logo",s.style.display="none",s.innerHTML='<img src="'+r+'"/>';var u=c.body.firstChild;u?c.body.insertBefore(s,u):c.body.appendChild(s)}}var a=e("common:bdbox/utils/version_compare"),c=o;
r.exports=s}),r("common:bdbox/utils/ready",function(n,e,t){function r(){s.forEach(function(n){n()}),s.length=0,a=!0}function i(n){"function"==typeof n&&(a?n():s.push(n))}var s=[],a=!1;"complete,loaded,interactive".indexOf(o.readyState)>-1&&o.body?r():o.addEventListener("DOMContentLoaded",r,!1),t.exports=i
});if(d.version=d.utils.getVersion(),d.version_compare=d.utils.version_compare,each=d.each,d.nativeShare=d.client.nativeShare,d.type=s,d.canI=function(n,o,e){return d.version_compare(d.version,n)>=0?d.isFunction(o)&&o():d.isFunction(e)&&e(),d},r("common:bdbox/client/o2o",function(n,o,e,t){var r=n("common:bdbox/android/invokeApp"),i=n("common:bdbox/ios/invokeApp"),s=encodeURIComponent,a=n("common:bdbox/each"),c=t.isAndroid?function(n,o){t.isObject(n)&&(o=n,n=n.url,delete o.url);
var e=["S.bdsb_light_start_url="+s(n)];if(t.isObject(o)){var i={color:"i.extra_actionbar_color_id",appid:"S.bdsb_wallet_appid"};a(o,function(n,o){"color"===o&&(n=4278190080|parseInt("0x"+n)),o=i[o]||o,e.push(o+"="+n)})}e=e.join(";"),r("Bdbox_android_utils","command",[JSON.stringify({intent:"intent:#Intent;"+e+";end","class":"com.baidu.searchbox.wallet.WalletServiceActivity",min_v:"16783629",mode:"0"})])
}:function(n,o){t.isObject(n)&&(o=n,n=n.url,delete o.url);var e={openurl:s(n),minver:"5.3.0.0",isla:0,opentype:1,append:0,rbtnstyle:2};if(t.isObject(o)){var r={color:"barcolor"};a(o,function(n,o){o=r[o]||o,e[o]=n})}e.appid&&(e.isla=1),i("easybrowse",e)};e.exports=c}),d.o2o=d.client.o2o,"android"===d.os.name?m("card",{query:function(n,o){if(m.version_compare(m.version,"5.0")<0)return this;
var e,t;m.isArray(n)?e=[JSON.stringify(n)]:(t=m.toArray(arguments),o=t.pop(),m.isFunction(o)?e=t:(e=m.toArray(arguments),o=null),e=[JSON.stringify(e)]);var r=m.android.invokeApp("Bdbox_android_card","mquery",e);return r=0===r.error&&r.result?JSON.parse(r.result):!1,m.isFunction(o)&&o(r),r},add:function(o,e){if(m.version_compare(m.version,"5.0")<0)return this;
var t,r;m.isString(o)?t=[o]:m.isArray(o)?t=[JSON.stringify(o)]:(r=m.toArray(arguments),e=r.pop(),m.isFunction(e)?t=r:(t=m.toArray(arguments),e=null),t=[JSON.stringify(t)]);var i=null;if(m.version_compare(m.version,"5.5")>=0){var s="";m.isFunction(e)&&(s="__box_card_"+m.getId(),n[s]=function(n){var o=JSON.parse(n),t=!1;
for(var r in o){t=o[r].st;break}e(t)}),i=m.android.invokeApp("Bdbox_android_card","madd",t.concat([s,0]))}else i=m.android.invokeApp("Bdbox_android_card","madd",t);return i}}):m("card",{query:function(n,o){if(m.version_compare(m.version,"5.0")<0)return this;var e,t;m.isArray(n)?e=[JSON.stringify(n)]:(t=m.toArray(arguments),o=t.pop(),m.isFunction(o)?e=t:(e=m.toArray(arguments),o=null),e=[JSON.stringify(e)]);
var r=function(n){m.isFunction(o)&&o(JSON.parse(n)),r=null};m.ios.invokeApp("cardMquery",{params:encodeURIComponent(e)},r)},add:function(n,o){if(m.version_compare(m.version,"5.0")<0)return this;var e,t;m.isString(n)?e=[n]:m.isArray(n)?e=[JSON.stringify(n)]:(t=m.toArray(arguments),o=t.pop(),m.isFunction(o)?e=t:(e=m.toArray(arguments),o=null),e=[JSON.stringify(e)]);
var r=function(n){var e=JSON.parse(n),t=!1;for(var i in e){t=e[i].st;break}m.isFunction(o)&&o(t),r=null};return m.ios.invokeApp("cardMadd",{params:encodeURIComponent(e),gohome:"0"},r),!0}}),r("common:bdbox/utils/jsonToQuery",function(n,o,e,t){e.exports=function(n){if(t.isString(n))return n;var o=[];for(var e in n)o.push(e+"="+n[e]);
return o.join("&")}}),r("common:bdbox/io/loadJS",function(e,t,r,i){function s(e,t,r){var s,u,l,d=o.createElement("script");i.isString(e)?(s=e,i.isFunction(t)&&(r=t,t=null)):(s=e.url,t=e.data,r=e.success,u=e.error||i.emptyFn,l=e.timeout),i.isObject(t)&&(t=c(t)),t&&(s+=(-1===s.indexOf("?")?"?":"&")+t),s=s.replace(/[&?]{1,2}/,"?");
var f;/=\?/.test(s)&&(f="_box_jsonp"+i.getId(),s=s.replace(/=\?/,"="+f));var m=a();l=l||2e4,d.type="text/javascript",d.src=s;var p,v=!0,h=function(){f&&delete n[f],p&&clearTimeout(p),d.onload=d.onreadystatechange=d.onerror=null,d=null},b=function(){!d||d.readyState&&!/loaded|complete/.test(d.readyState)||(h(),v&&i.isFunction(r)&&r.apply(null,i.toArray(arguments)),v=!1)
},g=function(n){h(),v&&u(n),v=!1};f&&(n[f]=b),p=setTimeout(function(){h(),v&&u("timeout"),v=!1},l),d.onload=d.onreadystatechange=d.onerror=b,d.onerror=g,m.appendChild(d)}function a(){return o.head||o.getElementsByTagName("head")[0]||o.documentElement}var c=e("common:bdbox/utils/jsonToQuery");i.emptyFn,r.exports=s
}),r("common:bdbox/utils/queryToJson",function(n,o,e){e.exports=function(n){try{n=n?decodeURIComponent(n):""}catch(o){n=""}var e=n.split("?"),t=e[1]?e[1]:e[0],r=t.split("&"),i={};return r.forEach(function(n){n=n.split("="),n[0].length>0&&(i[n[0]]=n[1]||"")}),i}}),r("common:bdbox/extend",function(n,o,e,t){function r(n,o,e){for(var t in o)e&&(i(o[t])||s(o[t]))?(i(o[t])&&!i(n[t])&&(n[t]={}),s(o[t])&&!s(n[t])&&(n[t]=[]),r(n[t],o[t],e)):c(o[t])||(n[t]=o[t])
}var i=t.isPlainObject,s=t.isArray,a=t.isBoolean,c=t.isUndefined;e.exports=function(n){var o,e=t.emptyArr.slice.call(arguments,1);return a(n)&&(o=n,n=e.shift()),e.forEach(function(e){r(n,e,o)}),n}}),r("common:bdbox/utils/ready",function(n,e,t){function r(){s.forEach(function(n){n()}),s.length=0,a=!0}function i(n){"function"==typeof n&&(a?n():s.push(n))
}var s=[],a=!1;"complete,loaded,interactive".indexOf(o.readyState)>-1&&o.body?r():o.addEventListener("DOMContentLoaded",r,!1),t.exports=i}),r("common:bdbox/utils/detect",function(o,e,t,r){function i(o){var e={name:"unknown",version:0};this===n||this.os||(this.os=e),o=o||navigator.userAgent;var t={Weibo:/weibo/i,Wechat:/micromessenger\//i,QQ:/QQ\//};
for(var r in t)t.hasOwnProperty(r)&&(e["is"+r]=t[r].test(o));e.isUC=o.match(/UC/)||n.ucweb||n.ucbrowser;var i=o.match(/(Android);?\s+([\d.]+)?/);if(i)return e.android=!0,e.version=i[2],e.name="android",e;var s=o.match(/(iPad).*OS\s([\d_]+)/),a=o.match(/(iPod)(.*OS\s([\d_]+))?/),c=!s&&o.match(/(iPhone\sOS)\s([\d_]+)/);
return c&&!a?(e.ios=e.iphone=!0,e.version=c[2].replace(/_/g,"."),e.name="ios",e):s?(e.ios=e.ipad=!0,e.name="ios",e.version=s[2].replace(/_/g,"."),e):a?(e.name="ios",e.ios=e.ipod=!0,e.version=a[3]?a[3].replace(/_/g,"."):null,e):e}i.apply(r),t.exports=i}),r("common:bdbox/schema",function(n,e,t,r){function i(n,e){if(n){if(e=e||r.emptyFn,!r.isBox&&r.isIOS&&c(a.version,"9.0")>=0)return void u(function(){s(n,e)
});var t=Date.now(),i=o.createElement("IFRAME");i.src=n,i.style.position="absolute",i.style.left="-2000px",i.style.top="-1000px",i.style.width="1px",i.style.height="1px",i.style.webkitTransition="all 0.9s",i.style.transition="all 0.9s",o.body.appendChild(i);var l=function(){o.body.removeChild(i),e(Date.now()-t<1500?!0:!1)
};i.addEventListener("webkitTransitionEnd",l,!1),i.addEventListener("transitionEnd",l,!1),setTimeout(function(){i.style.left="-1000px"},20)}}function s(n,o){location.href=n,l&&clearTimeout(l),l=setTimeout(function(){o(!0)},1200)}var a=n("common:bdbox/utils/detect")(),c=n("common:bdbox/utils/version_compare"),u=n("common:bdbox/utils/ready"),l=null;
t.exports=i}),r("common:bdbox/monitor",function(o,e,t,r){var i=encodeURIComponent,s=function(n,o){n+=n.indexOf("?")<0?"?":"&",this.url=n,this.options=o};s.prototype.report=function(o){o=o||"";var e=new Image(1,1),t=[];if(r.isObject(o)){for(var s in o)t.push(s+"="+i(String(o[s])));o=t.join("&")}var a="_box_mt"+r.getId();
n[a]=e,e.onload=e.onerror=e.onabort=function(){e.onload=e.onerror=e.onabort=null,n[a]=e=null};var c=this.url+o;return r.isFunction(this.options.customHandler)&&(c=this.options.customHandler(c)),e.src=c+"&_rnd="+Math.floor(2147483648*Math.random()),this},s.prototype.main=function(n,o){return n&&r.isFunction(this[n])&&this[n].apply(this,r.toArray(o||[])),this
},t.exports=function(n,o){return new s(n,o)}}),r("common:bdbox/clone",function(n,o,e){var t=Object.prototype.toString,r=function(n,o,e){var t=0;for(var r in n)if(n.hasOwnProperty(r))if(e)o[r]=n[r];else if(o(r,n[r],t++))break},i=function(n){var o;switch(t.call(n)){case"[object Object]":o={},r(n,function(n,e){o[n]=i(e)
});break;case"[object Array]":o=[],n.forEach(function(n){o.push(i(n))});break;default:o=n}return o};e.exports=i}),r("common:bdbox/monitor/pblog",function(n,o,e,t){var r=n("common:bdbox/monitor"),i=n("common:bdbox/extend"),s=n("common:bdbox/utils/queryToJson"),a=n("common:bdbox/utils/getVersion"),c=n("common:bdbox/clone"),u=s(location.search),l=navigator.userAgent,d="//m.baidu.com/tcbox",f={service:"bdbox",action:"pblog",ctv:2,cen:"uid_ua_ut",data:{appid:"1",dataid:"2",actiontype:"1",actionid:"2",actiondata:{ref:u.ref||"",gmv:u.vmgdb||"",source:u.from||u.ref||"",boxVersion:a(),boxPlatform:l.match(/(iPad|iPhone|iPod)/gim)?"ios":"android"}}},m=encodeURIComponent;
u.uid&&u.osname&&["osname","ua","ut","from","cfrom","uid","pkgname"].forEach(function(n){u[n]&&(f[n]=u[n])});var p,v=r(d,{customHandler:function(n){var o=[];if(p)for(var e in p)if(p.hasOwnProperty(e)){var r=p[e];t.isPlainObject(r)&&(r=JSON.stringify(r)),o.push(e+"="+m(r))}return o.length&&(n+=o.join("&")),n
}});v.init=function(n,o){t.isPlainObject(o)&&(f=i(f,o)),f.data.cateid=n},v.pv=function(n,o){p=c(f);var e=p.data;e.actionid="1";var t={};return t.url=n||location.href,o&&(t.u=o),e.actiondata=i(e.actiondata,t),v.report()},v.event=function(n,o,e){if(!n)throw"monitor.tc.event need a evtName";if(t.isPlainObject(o)&&!e){var r={evtName:n};
for(var s in o)r[s]=o[s]}else var r={evtName:n,evtType:o||"",evtTag:e||""};p=c(f);var a=p.data;return a.actionid="2",a.actiondata=i(a.actiondata,r),v.report()},e.exports=function(){v.main.apply(v,arguments)}}),r("common:bdbox/moplus",function(n,o,e,t){var r=n("common:bdbox/utils/jsonToQuery"),i=n("common:bdbox/io/loadJS"),s=n("common:bdbox/utils/version_compare"),a=n("common:bdbox/monitor/pblog"),c=n("common:bdbox/schema"),u="com.baidu.searchbox",l="http://127.0.0.1:6259/",d="http://127.0.0.1:40310/",f="inapp_boxserver",m="https:"===location.protocol,p=500,v=null,h="__moplus_host__",b={isSendPv:!1,isHit:!1,parseUA:function(){var n,o,e=navigator.userAgent,t={uc:/UCBrowser\/(\S*) \S*/g,bd:/baidubrowser\/(\S*) \(Baidu/g,qq:/MQQBrowser\/(\S*) Mobile/g,chr:/Chrome\/(\S*) Mobile/g,qh:/360 Aphone Browser \((\S*)\)/g,sg:/SogouMobileBrowser\/(\S*)/g,mi:/MiuiBrowser\/(\S*)/g};
for(var r in t){var i=t[r].exec(e);if(i){n=r,o=i[1];break}}return n=n?n:"other",o=o?o:"0",{t:n,v:o}},parseHost:function(){return g.curHost===d?1:0},sendEvt:function(n,o,e,t){this.isHit&&this.send(n,o,e,t)},send:function(n,o,e,t){var r=this.parseUA(),i=r.t,s=r.v,c=m?0:1,u=this.parseHost();a("event",[n,{evtType:o||"",brName:i,brVer:s,isHttp:c,isNew:u,source:e||"",intent:t||""}])
},init:function(){this.isHit=Date.now()%100===1,a("init",[2])}},g=function(n,o,e){this.version="2.0",this.isHttps=m,this.curHost=e||"",this.newHost=d,this.oldHost=this.isHttps?d:l,this.MCMDF=o||f,this._infoFuncs=[],this._verFuncs=[],this.minVersion=n?n:0,this.pkgName=u,b.init()},y=function(n,o){try{sessionStorage.setItem(n,o)
}catch(e){}},x=function(n){var o;try{o=sessionStorage.getItem(n)}catch(e){}return o};g.prototype={constructor:g,setMcmdf:function(n){return this.MCMDF=n,this},setHost:function(n){return this.curHost=n,y(h,n),this},getHost:function(){if(this.isHttps)return this.curHost=this.newHost,this.newHost;var n=x(h);
return n?(this.curHost=n,this.curHost):void 0},api:function(n,o,e,i){if(!n)throw"Moplus.api need an action";t.isFunction(o)&&(i=e,e=o,o={});var s=n+(~n.indexOf("?")?"&":"?")+r(o);return~s.indexOf("mcmdf")||(s+="&mcmdf="+this.MCMDF),b.sendEvt("api","send:"+n,this.MCMDF,s),this.request(s,function(o){b.sendEvt("api",(t.isPlainObject(o)&&0==o.error?"success:":"fail:")+n,this.MCMDF,s),e(o)
},i)},getInfo:function(n,o){if(v)return n(v);if(this._infoFuncs.push(n),!(this._infoFuncs.length>1)){var e=this,r=function(n,o){!o&&t.isPlainObject(n)&&(v=n);var r;for(o&&(n={error:33});r=e._infoFuncs.shift();)r(n)},s="getsearchboxinfo?mcmdf="+this.MCMDF;if(this.getHost()){var a={url:this.curHost+s+"&callback=?",success:r,error:function(){r(null,!0)
},timeout:o};i(a)}else this.request(s,function(n){return 33===n.error?r(null,!0):void r(n)},o);return this}},getHVersion:function(n,o){this._verFuncs.push(n);var e=this;if(!(this._verFuncs.length>1)){var t=function(n){var o;for(n=e.parseInfo(n);o=e._verFuncs.shift();)o(n)};return this.getInfo(t,o),this
}},parseInfo:function(n,o){n=n||v,o=o||this.minVersion;var e=n.package_infos;if(!e||0===e.length)return!1;var t=u,r={offic:{name:u,version:0},oem:{version:0}};return e.forEach(function(n){var e=n.version_name,i=n.package_name;s(e,o)>=0&&(i===t?1===s(e,r.offic.version)&&(r.offic={version:e,name:u}):1===s(e,r.oem.version)&&(r.oem={version:e,name:i}))
}),0===r.oem.version&&0===r.offic.version?!1:0!==r.offic.version?r.offic:0!==r.oem.version?r.oem:void 0},schema:function(n,o){if(!n.intent)throw"schema intent is empty";n.mcmdf||(n.mcmdf=this.MCMDF);var e=function(){b.send("schema","success",n.source,n.intent),t.isFunction(o)&&o({error:0,from:"schema"})
},r=function(){b.send("schema","fail",n.source,n.intent),t.isFunction(o)&&o({error:20,from:"schema"})},i=n.schema||"";if(n.intent&&!n.schema){var s=n.intent;-1==s.indexOf(u)&&(b.sendEvt("defaultPKGName","fail",n.source||"",n.intent),n.minver=n.minver?n.minver:"6.9.1")}i||(i="baiduboxapp://utils?action=sendIntent&params="+encodeURIComponent(JSON.stringify(n))+"&minver="+(n.minver?n.minver:"6.9")),c(i,function(n){n?r():e()
})},sendIntent:function(n,o,e){var r={};if(n&&t.isString(n)){var i,s=this,a=!0;return t.isPlainObject(e)?(r=e,i=e.source||"",e.needlog?b.isHit=e.needlog:r.needlog=b.isHit?1:0,e=e.timeout):t.isBoolean(e)&&(a=e),r.intent=n,b.send("sendintent","send",i,n),this.api("sendintent",{intent:encodeURIComponent(n)},function(e){!e||e&&33===e.error||!t.isPlainObject(e)?(b.send("sendintent","fail",i,n),a?s.schema(r,o):(e=e||{},e.from="moplus",o(e))):(b.send("sendintent","success",i,n),o(e))
},e)}return this},request:function(n,o,e){var r,s,a=this,c={timeout:e};t.isFunction(o)&&!~n.indexOf("callback=")&&(n+="&callback=?");var u=function(n){r="success",t.isFunction(o)&&o(n)},l=function(){t.isFunction(o)&&o({error:33})};if(a.getHost())c.url=a.curHost+n,c.success=u,c.error=l,i(c);else if(c.url=a.newHost+n,c.success=function(n){"success"!==r&&(s&&clearTimeout(s),a.setHost(a.newHost),u(n))
},c.error=function(){a.isHttps?(r="error",l()):"error"===r&&l(),r="error"},i(c),!a.isHttps){var d={timeout:e,url:a.oldHost+n,error:c.error};d.success=function(n){"success"!==r&&("error"===r?(a.setHost(a.oldHost),u(n)):s=setTimeout(function(){a.setHost(a.oldHost),u(n)},p))},i(d)}return this}},e.exports=function(n,o){return new g(n,o)
},e.exports.Moplus=g}),d.version_compare(d.version,"5.3.5")>=0){var h,b={image:"imageUrl",url:"linkUrl",order:"mediaType"},g="";n[g]=d.emptyFn,d.isAndroid?(h=function(n){if(n.id&&d.byId(n.id)){var o=n.eventType||"touchstart";d.byId(n.id).addEventListener(o,function(){e(n)},!0)}var e=function(o){o=a(o||n);
var e=o.error,t=o.success;o.iconUrl&&o.imageUrl&&delete o.imageUrl,d.android.invokeApp("Bdbox_android_utils","callShare",[JSON.stringify(o),t||"console.log",e||"console.log"])};return e},m("share",h)):(h=function(n){if(n.id&&d.byId(n.id)){var o=n.eventType||"touchstart";d.byId(n.id).addEventListener(o,function(){e(n)
},!0)}var e=function(o){o=a(o||n);var e=o.error,t=o.success;o.iconUrl&&!o.imageUrl&&(o.imageUrl=o.iconUrl),o=JSON.stringify(o),d.ios.invokeApp("callShare",{options:encodeURIComponent(o),errorcallback:e||"console.log",successcallback:t||"console.log"})};return e},m("share",h))}else{var y=[],x=function(){m._socShare&&m._socShare.init?y.forEach(function(n){m._socShare.init(n)
}):setTimeout(x,3e3)};d.io.loadJS("//m.baidu.com/static/searchbox/openjs/share.js?v=1.2",x);var _={source:"client_id",id:"dom_id",image:"pic_url",success:"afterRender"},h=function(n){var o={content:"",client_id:"ZVEpDSsmZ0qxa1gmgDAh1Fje",theme:"native",dom_id:"share",animate:!0,pic_url:"",url:encodeURIComponent(location.href)};
return d.isObject(n)&&d.each(n,function(n,e){if(e in _&&(e=_[e]),"order"===e&&d.isArray(n)){var t=[];n.forEach(function(n){"email"===n&&(n="mail"),t.push(n)})}o[e]=n}),delete o.success,delete o.error,delete o.afterRender,"all"===o.order?o.order=["qqdenglu","sinaweibo","renren","kaixin","mail","sms"]:d.isString(o.order)&&(o.order=o.order.split(",")),m._socShare&&m._socShare.init?m._socShare.init(o):y.push(o),function(){m._socShare.ui._shareBtnClickHandler()
}};m("share",h)}if(r("common:bdbox/distribute",function(n,o,e,t){var r=n("common:bdbox/schema");n("common:bdbox/utils/detect");var i=n("common:bdbox/each"),s=n("common:bdbox/moplus"),a=t.emptyFn,c={qqDownloadUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=com.baidu.searchbox",androidDownloadUrl:"",iosDownloadUrl:"",iosFailCallback:a,androidFailCallback:a,iosSchema:"",androidSchema:"",androidIntent:"",inBoxCallback:a},u=function(n){var o=this;
n&&i(c,function(o,e){n[e]=n[e]||o});var e=this.url=n.url;e&&""!==e?(this.androidIntent="intent://"+e.replace(/^http[s]?:\/\//,"")+"#Intent;scheme=http;action=com.baidu.searchbox.action.VIEW;category=android.intent.category.DEFAULT;end",this.iosSchema="baiduboxapp://easybrowse?openurl="+encodeURIComponent(e)+"&opentype=0&isla=0&append=0&minver=5.3.0.0"):["androidIntent","iosSchema","androidSchema"].forEach(function(e){o[e]=n[e]
}),this.options=n,this.fail=function(){if(console.log(t.os.name+" fail"),t.isFunction(n[t.os.name+"FailCallback"])){var o=n[t.os.name+"FailCallback"]();if(t.isBoolean(o)&&!o)return}var e=n[t.os.name+"DownloadUrl"];e&&""!==e&&(location.href=n[t.os.name+"DownloadUrl"])},this.success=function(){return console.log(t.os.name+" success"),t.isFunction(n[t.os.name+"SuccessCallback"])?n[t.os.name+"SuccessCallback"]():void 0
}};u.prototype.wechat=function(){var n=this.options;if(t.isFunction(n.wechatCallback)){var o=n.wechatCallback();if(t.isBoolean(o)&&!o)return}n.qqDownloadUrl&&""!==n.qqDownloadUrl&&(location.href=n.qqDownloadUrl)},u.prototype.run=function(){var n=this,o=(n.url,n.options);return t.os.isWechat?n.wechat():t.isBox&&t.isFunction(o.inBoxCallback)?o.inBoxCallback():void this.invoke()
},u.prototype.invoke=function(){var n=this;if(t.os.android){var o=s();o.getHVersion(function(e){e?o.sendIntent(n.androidIntent,function(o){0==o.error?n.success():n.fail()},1e3):n.androidSchema?r(n.androidSchema,function(o){o?n.fail():n.success()}):n.fail()})}else r(n.iosSchema,function(o){o?n.fail():n.success()
})},e.exports=function(n){return new u(n)}}),each(d,function(n,o){m[o]=n}),n.Box&&n.Box.$)for(var S in m)n.Box[S]=n.Box[S]||m[S];else n.Box=m}(window,document);});
;
/**
 * @file detect
 * @根据ua判断操作系统、浏览器、版本号
 * @author yangfan16
 */

define('extensions/mip-share/0.1/share/detect', ['require'], function (require) {

    // 获取ua并转换为小写
    var UA = navigator.userAgent.toLowerCase();

    /*
     * return {ios:''} || {android:''}
     */
    function getOS () {
        if (!UA) {
            return;
        }

        var OS,
            version = '';

        // 优先使用zepto方法,否则通过ua匹配
        if ($ && $.os) {
            if ($.os.ios) {
                OS = 'ios';
            } else if ($.os.android) {
                OS = 'android';
            }
        } else {
            if ((UA.indexOf('iphone') > -1 || UA.indexOf('ipod') > -1)) {
                OS = 'ios';
            } else {
                OS = 'android';
            }
        }

        return {
            n: OS,
            v: version
        };
    }

    /*
     * return {zbios:''} || 
     *        {bmbadr:'4.1.0.332'} || 
     *        {qq:'6.7.2'} || 
     *        {wechat:''} || 
     *        {uc:'10.9.17.807'} || 
     *        {sogou:'4.5.0'} || 
     *        {chrome:'51.0.2704.104'} || 
     *        {other:''}
     */
    function getBrowser () {
        if (!UA) {
            return;
        }
        var browser,
            version = '';

        if (UA.indexOf('baiduboxapp/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13f69 baiduboxapp/0_0.0.3.7_enohpi_6433_046/2.3.9_2c2%256enohpi/1099a/a303ae3a9fe88283cc14cc84c7e55b3630c7a4ca6fcnnddartd/1
            browser = 'zbios';
        } else if (UA.indexOf('baidubrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) version/9.3 mobile/13f69 safari/600.1.4 baidubrowser/4.1.0.332 (baidu; p29.3.2)
            browser = 'bmbadr';
            version = UA.match(/baidubrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('mqqbrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone 5sglobal; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) version/6.0 mqqbrowser/6.7.2 mobile/13f69 safari/8536.25 mttcustomua/2
            browser = 'qq';
            version = UA.match(/mqqbrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('micromessenger/') != -1) {
            browser = 'wechat';
            version = UA.match(/micromessenger\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('ucbrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x; zh-cn) applewebkit/537.51.1 (khtml, like gecko) mobile/13f69 ucbrowser/10.9.17.807 mobile
            browser = 'uc';
            version = UA.match(/ucbrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('sogoumobilebrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13f69 sogoumobilebrowser/4.5.0
            browser = 'sogou';
            version = UA.match(/sogoumobilebrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('crios/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1 (khtml, like gecko) crios/51.0.2704.104 mobile/13f69 safari/601.1.46
            // android e.g. = mozilla/5.0 (linux; android 5.1.1; yq601 build/lmy47v) applewebkit/537.36 (khtml, like gecko) chrome/47.0.2526.83 mobile safari/537.36
            browser = 'chrome';
            version = UA.match(/crios\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else {
            browser = 'other';
        }

        return {
            n: browser,
            v: version
        };
    }

    return {
        os:      getOS(),
        browser: getBrowser()
    };
});;

/**
 * @file sharebase
 * @author yangfan16
 * @UC & QQ share based on https://github.com/JefferyWang/nativeShare.js
 */

define('extensions/mip-share/0.1/share/share', ['require', 'extensions/mip-share/0.1/share/detect'], function (require) {

    // 加载share公共css
    var $shareStyle = $('<style data-for="pmd/share/share"></style>');
    $shareStyle.text("/* 分享列表容器 */\n.c-share-list {\n    overflow: hidden;\n}\n\n.c-share-list .c-share-btn {\n    color: #333;\n    text-align: center;\n    font-size: 12px;\n}\n\n.c-share-list .c-share-btn .c-img {\n    background: #fff;\n    border: 1px solid #f0f0f0;\n    border-radius: 50%;\n}\n\n\n/* 分享取消按钮,只在popup打开时展现 */\n.c-share-cancel-btn {\n    border-color: #f0f0f0;\n}\n\n\n/* 微信分享提示tips */\n.c-share-wechat-tips {\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 999;\n    width: 100%;\n    height: 100%;\n    background: rgba(0, 0, 0, 0.6) url(//m.baidu.com/se/static/pmd/pmd/share/images/wxtips.png) right 32px top 10px/50% no-repeat;\n}\n\n\n/* popup打开时自定义容器背景色,需要提高选择器优先级 */\n.c-popup-wrapper .c-share-popup-modal {\n    background-color: #f0f0f0;\n}\n\n.c-share-popup-modal .c-popup-head {\n    display: none;\n}\n\n.c-share-popup-modal .c-popup-content {\n    margin: 0 auto;\n    padding: 21px;\n}");
    $('head').append($shareStyle);

    var defaultOpt = {
        url: window.location.href,
        title: '百度搜索有惊喜',       // 分享至外站的title,必选
        content: '百度搜索有惊喜',     // 分享至外站的摘要,可选,默认用title替代
        iconUrl: '//m.baidu.com/se/static/pmd/pmd/share/images/bdu.jpg',
        custom: []
    };

    // 加载适配组件并获取当前适配信息
    var detect = require('extensions/mip-share/0.1/share/detect');
    var OS = detect.os;
    var Browser = detect.browser;
    var isZbios = (Browser.n == 'zbios') ? 1 : 0;
    var isUC = (Browser.n == 'uc' && (typeof(ucweb) != 'undefined' || typeof(ucbrowser) != 'undefined')) ? 1 : 0;
    var isQQ = (Browser.n == 'qq' && Browser.v && Browser.v > '5.4') ? 1 : 0;
    var isWechat = (Browser.n == 'wechat') ? 1 : 0;

    // 在qq浏览器5.4版本以上需要加载qq shareapi
    var dtd = $.Deferred();
    if (isQQ) {
        // zepto $.ajax在qq浏览器上无法加载这个api url,永远返回fail,jquery以及直接请求均可以,原因不明,采用原生方法实现异步加载
        // TODO: 查清原因！！！！！！！！！
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.onload = script.onreadystatechange = function() {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete" ) {
                dtd.resolve();
            }
        };
        script.src = '//jsapi.qq.com/get?api=app.share';
        $('head').append(script);
    }

    // 手百分享接口
    var nativeShare = function (cfg, encode) {
        var onSuccess = function(){}
        var onFail = function(){}
        if (encode) {
            cfg.url = encodeURIComponent(cfg.url);
            cfg.linkUrl = encodeURIComponent(cfg.url);
        }
        // 以这种方式require是为了避免过早加载aio组件
        require(['extensions/mip-share/0.1/share/aio'], function() {
            if (Box.os.android) {
                Box.android.invokeApp('Bdbox_android_utils', 'callShare', [JSON.stringify(cfg), window.successFnName || 'console.log', window.errorFnName || 'console.log']);
            } else {
                Box.ios.invokeApp('callShare', {
                    options: encodeURIComponent(JSON.stringify(cfg)),
                    errorcallback: 'onFail',
                    successcallback: 'onSuccess'
                });
            }
        });

    };

    // UC分享接口
    var ucShare = function (to_app, opt) {
        var ucAppList = {
            sinaweibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
            wxfriend: ['kWeixin', 'WechatFriends', 1, '微信好友'],
            pyq: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
            qqfriend: ['kQQ', 'QQ', '4', 'QQ好友'],
            qzone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        var url = opt.url;
        var title = opt.title;
        var from = '';
        var img = '';
        var desc = opt.content;

        to_app = to_app == '' ? '' : (OS.n == 'ios' ? ucAppList[to_app][0] : ucAppList[to_app][1]);

        // 安卓uc qq空间分享特殊逻辑
        // 伪协议失效，目前该伪协议只能打开QQ apk，并不能打开分享页面，uc端调用的sdk方法未知
        // if (to_app == 'QZone') {
        //     B = "mqqapi://share/to_qzone?src_type=web&version=1&file_type=news&req_type=1&image_url="+img+"&title="+title+"&description="+desc+"&url="+url+"&app_name="+from;
        //     k = document.createElement("div"), k.style.visibility = "hidden", k.innerHTML = '<iframe src="' + B + '" scrolling="no" width="1" height="1"></iframe>', document.body.appendChild(k), setTimeout(function () {
        //         k && k.parentNode && k.parentNode.removeChild(k)
        //     }, 5E3);
        // }

        if (typeof(ucweb) != 'undefined') {
            // 判断ucweb方法是否存在,安卓uc中可以使用
            ucweb.startRequest('shell.page_share', [title, title, url, to_app, '', '@' + from, '']);
        } else if (typeof(ucbrowser) != 'undefined') {
            // 判断ucbrowser方法是否存在,ios uc中可以使用
            ucbrowser.web_share(title, title, url, to_app, '', '@' + from, '');
        }
    };

    // QQ浏览器分享接口
    var qqShare = function (to_app, opt) {
        var qqAppList = {
            sinaweibo: ['kSinaWeibo', 'SinaWeibo', 11, '新浪微博'],
            wxfriend: ['kWeixin', 'WechatFriends', 1, '微信好友'],
            pyq: ['kWeixinFriend', 'WechatTimeline', '8', '微信朋友圈'],
            qqfriend: ['kQQ', 'QQ', '4', 'QQ好友'],
            qzone: ['kQZone', 'QZone', '3', 'QQ空间']
        };

        to_app = to_app == '' ? '' : qqAppList[to_app][2];
        var ah = {
            url: opt.url,
            title: opt.title,
            description: opt.content,
            img_url: '',
            img_title: '',
            to_app: to_app,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
            cus_txt: "请输入此时此刻想要分享的内容"
        };
        ah = to_app == '' ? '' : ah;

        // qq share api加载完毕后执行
        $.when(dtd).done(function () {
            if (typeof(browser) != "undefined" && typeof(browser.app) != "undefined") {
                browser.app.share(ah);
            }
        });
    };

    // 微信显示分享提示浮层
    var TIME;
    var wechatTips = function () {
        if ($('.c-share-wechat-tips').length) {
            $('.c-share-wechat-tips').show();
        } else {
            $('body').append($('<div class="c-share-wechat-tips"></div>'));
            $('.c-share-wechat-tips').on('click', function () {
                $(this).hide();
                clearTimeout(TIME);
            });
        }

        TIME = setTimeout(function () {
            $('.c-share-wechat-tips').hide();
            clearTimeout(TIME);
        }, 2000);
    };

    // 朋友圈分享按钮配置
    var pyq = {
        key: 'pyq',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/pyq.png',
        title: '朋友圈',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'weixin_timeline';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('pyq', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('pyq', opt);
                };
            } else if (isWechat) {
                fn = function (opt) {
                    wechatTips();
                };
            }
            return fn;
        })()
    };

    // 微信好友分享按钮配置
    var wxfriend = {
        key: 'wxfriend',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/wxfriend.png',
        title: '微信好友',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'weixin_friend';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('wxfriend', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('wxfriend', opt);
                };
            } else if (isWechat) {
                fn = function (opt) {
                    wechatTips();
                };
            }
            return fn;
        })()
    };

    // qq好友分享按钮配置
    var qqfriend = {
        key: 'qqfriend',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/qqfriend.png',
        title: 'QQ好友',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'qqfriend';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('qqfriend', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('qqfriend', opt);
                };
            }
            return fn;
        })()
    };

    // qq空间分享按钮配置
    var qzone = {
        key: 'qzone',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/qzone.png',
        title: 'QQ空间',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'qqdenglu';
                    nativeShare(opt, false);
                };
            } else if (isUC && OS.n == 'ios') {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('qzone', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('qzone', opt);
                };
            } else {
                // 普通浏览器
                fn = function (opt) {
                    var qqUrl = 'url=' + encodeURIComponent(opt.url) + '&successurl=' + encodeURIComponent(window.location.href) + '&summary=' + opt.content + '&title=' + opt.title + '&pics=' + encodeURIComponent(opt.iconUrl);
                    window.open('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + qqUrl);
                };
            }
            return fn;
        })()
    };

    // 新郎微博分享按钮配置
    var sinaweibo = {
        key: 'sinaweibo',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/sinaweibo.png',
        title: '新浪微博',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'sinaweibo';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('sinaweibo', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('sinaweibo', opt);
                };
            } else {
                // 普通浏览器
                fn = function (opt) {
                    window.open('http://v.t.sina.com.cn/share/share.php?url=' + encodeURIComponent(opt.url) + '&title=' + encodeURIComponent(opt.title));
                };
            }
            return fn;
        })()
    };

    var more = {
        key: 'more',
        icon: '//m.baidu.com/se/static/pmd/pmd/share/images/more.png',
        title: '更多',
        cb: (function () {
            var fn;
            if (isZbios) {
                // 手百调起逻辑
                fn = function (opt) {
                    opt.mediaType = 'all';
                    nativeShare(opt, false);
                };
            } else if (isUC) {
                // uc调起逻辑
                fn = function (opt) {
                    ucShare('', opt);
                };
            } else if (isQQ) {
                // qq调起逻辑
                fn = function (opt) {
                    qqShare('', opt);
                };
            }
            return fn;
        })()
    }

    var Share = function (opt) {
        // 参数校验并设置默认值
        this.opt = $.extend({}, defaultOpt, opt);
        if (!this.opt.content) {
            this.opt.content = this.opt.title;
        }
        if (/^\/\/.+/.test(this.opt.url)) {
            this.opt.url = 'http:' + this.opt.url;
        }
        this.opt.linkUrl = this.opt.url;

        // init
        this._init();
    };


    Share.prototype = {

        version: '1.0.0',

        _init: function () {
            var me = this;

            me.isRender = false;    // 标记当前渲染状态

            me._initShareList();
        },

        _initShareList: function () {
            var me = this;

            // 处理分享图标list,并拼装dom
            var list = [];
            if (isZbios || isUC || isQQ || isWechat) {
                list.push(pyq, wxfriend);
            }
            if (isZbios || isUC || isQQ) {
                list.push(qqfriend);
            }
            list.push(qzone, sinaweibo);
            if (isZbios || isUC || (isQQ && OS.n == 'ios')) {
                list.push(more);
            }
            list = list.concat(me.opt.custom);
            me.list = list;

            var str = '';
            if ($.type(list) == 'array' && list.length > 0) {
                str += '<div class="c-share-list">';
                var num = list.length;
                var lines = Math.ceil(num / 4);
                for (var j = 0; j < lines; j++) {
                    str += '<div class="c-row c-gap-bottom">';
                    for (var i = 0; i < 4; i++) {
                        var index = j * 4 + i;
                        var obj = list[index];


                        if (obj) {
                            str += '<div class="c-span3 c-share-btn c-share-btn-' + obj.key + '">';
                            str += '<div class="c-img c-img-s">';
                            str +=     '<img src="' + obj.icon + '" />';
                            str += '</div>';
                            str += '<div class="c-line-clamp1">' + obj.title + '</div>';
                        }
                        else {
                            str += '<div class="c-span3 c-share-btn">';
                        }

                        str += '</div>';
                    }
                    str += '</div>';
                }
                str += '</div>';
            }
            me.$dom_shareList = $(str);
            me._bindEvent();
        },

        // 绑定分享按钮点击事件
        _bindEvent: function () {
            var me = this;

            // key = ['pyq', 'wxfriend', 'qqfriend', 'qzone', 'sinaweibo', 'more'];
            me.$dom_shareList.find('.c-share-btn').each(function (i) {
                if (me.list[i]) {
                    $(this).on('click', function () {
                        me.list[i].cb(me.opt);
                        me._sendLog(me.list[i].key);
                    });
                }
            });
        },

        // 结果页_sendLog方法,依赖B.log.send方法
        _sendLog: function (key) {
            var me = this;

            var appKeyList = {
                pyq:       {'ct': 40, 'cst': 2},
                wxfriend:  {'ct': 40, 'cst': 1},
                qqfriend:  {'ct': 40, 'cst': 5},
                qzone:     {'ct': 40, 'cst': 3},
                sinaweibo: {'ct': 40, 'cst': 4},
                more:      {'ct': 40, 'cst': 9},
                close:     {'ct': 40, 'cst': 0}     // 关闭
            };
            if (key && appKeyList[key] && typeof B == 'object' && B.log && B.log.send) {
                var obj = appKeyList[key];
                if (me.opt && typeof me.opt.loginfo == 'object') {
                    obj = $.extend(obj, me.opt.loginfo);
                }
                // 结果页日志发送接口
                B.log.send(obj);
            }
        },

        // 将分享list dom插入用户选定的dom中
        render: function ($dom, renderOpts) {
            var me = this;

            // $dom为必选
            if (!($dom && $($dom).length)) {
                return;
            }

            var $customDom = $($dom);

            // add自定义classname
            if (renderOpts && renderOpts.customClassName) {
                me.$dom_shareList.addClass(renderOpts.customClassName);
            }

            // 插入用户dom
            $customDom.append(me.$dom_shareList);
            // 标记dom已经被插入页面
            me.isRender = true;

            if (renderOpts && typeof renderOpts.onRender == 'function') {
                renderOpts.onRender();
            }
        },

        // 调用popup并以popup方式打开
        popup: function (popupOpts) {
            var me = this;

            var popupOpts = popupOpts || {};

            // 若已经执行过render方法在页面中渲染,则默认需要clone一份
            // zepto clone不支持clone事件,需要重新绑定
            if (me.isRender) {
                me.$dom_shareList = me.$dom_shareList.clone();
                me._bindEvent();
            }

            // add自定义classname
            if (popupOpts && popupOpts.customClassName) {
                me.$dom_shareList.addClass(popupOpts.customClassName);
            }

            // 初始化"取消"按钮dom
            var $dom_cancelBtn = $('<div class="c-row c-gap-top-large"><div class="c-span12"><div class="c-btn c-share-cancel-btn">取消</div></div></div>');


            // 改全局 pmd
            // 以这种方式require是为了避免过早加载popup组件
            require(['pmd/popup/popup'], function (Popup) {
                me.sharePopup = new Popup({
                    content: me.$dom_shareList.add($dom_cancelBtn),
                    customClassName: 'c-share-popup-modal',
                    onOpen:  popupOpts.onOpen  || function(){},
                    onClose: popupOpts.onClose || function(){}
                });

                // 执行横竖屏补丁,为popup容器设置最大宽度,避免横屏时显示内容过大
                me.sharePopup.$popupContent.css({
                    'max-width': me._horizontalHack() + 'px'
                });

                // 点击"取消"按钮时关闭浮层
                $dom_cancelBtn.on('click', function () {
                    me.sharePopup.closePopup();
                    me._sendLog('close');
                });
            });
        },

        // 关闭popup方法
        close: function () {
            var me = this;
            if (me.sharePopup) {
                me.sharePopup.closePopup();
            }
        },

        // 横竖屏补丁
        // 判断屏幕的最小边长并返回
        _horizontalHack: function () {
            var verticalScreenWidth;
            if (window.orientation != undefined) {
                if (window.orientation == 0 || window.orientation == 180) {
                    verticalScreenWidth = Math.min(window.screen.width, $(window).width());
                }
                else if (window.orientation == 90 || window.orientation == -90) {
                    verticalScreenWidth = Math.min(window.screen.width, window.screen.height);
                    verticalScreenWidth = verticalScreenWidth * $(window).width() / Math.max(window.screen.width, window.screen.height);
                }
            }
            else {
                verticalScreenWidth = Math.min(window.screen.width, window.screen.height);
            }
            return verticalScreenWidth;
        },

        constructor: Share
    };

    return Share;
});
;
/**
 * @file 复制
 * @author junmer
 * @see https://clipboardjs.com/
 */


define('extensions/mip-share/0.1/clipboard', ['require', 'extensions/mip-share/0.1/share/detect'], function(require) {

    /**
     * CLICK_EVENT
     * 也许手机需要 touchend
     *
     * @type {String}
     */
    var CLICK_EVENT = 'click';

    /**
     * Clipboard
     *
     * @class 复制
     *
     * @param {Object} opt
     * @param {string} opt.text
     * @param {Function} opt.sucess
     * @param {Function} opt.error
     */
    function Clipboard(opt) {

        $.extend(this, opt);

        this.bind();
    }

    var detect = require('extensions/mip-share/0.1/share/detect');


    /**
     * 安卓 非手百 能用
     *
     * @type {Boolean}
     */
    Clipboard.support = true
        && detect.os.n == 'android'
        && detect.browser.n !== 'zbios';

    Clipboard.prototype = {

        bind: function() {
            $(this.el).on('click', this.handler.bind(this));
        },

        update: function(data) {
            this.text = data;
        },

        unbind: function() {
            $(this.el).off('click', this.handler);
            this.removeFake();
        },

        handler: function() {
            this.selectFake(this.text);
        },

        /**
         * Only removes the fake element after another click event, that way
         * a user can hit `Ctrl+C` to copy because selection still exists.
         */
        removeFake: function() {
            if (this.fakeHandler) {
                document.body.removeEventListener(CLICK_EVENT, this.fakeHandlerCallback);
                this.fakeHandler = null;
                this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
                document.body.removeChild(this.fakeElem);
                this.fakeElem = null;
            }

        },

        /**
         * Executes the copy operation based on the current selection.
         */
        copyText: function() {

            var succeeded;
            try {
                succeeded = document.execCommand('copy');
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        },

        handleResult: function(succeeded) {
            if (succeeded) {
                this.success && this.success();
            } else {
                this.error && this.error();
            }
        },

        selectFake: function(text) {
            var isRTL = document.documentElement.getAttribute('dir') === 'rtl';

            this.removeFake();

            this.fakeHandlerCallback = this.removeFake.bind(this);
            this.fakeHandler = document.body.addEventListener(CLICK_EVENT, this.fakeHandlerCallback);

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'fixed';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = text;

            document.body.appendChild(this.fakeElem);

            this.selectedText = select(this.fakeElem);

            this.copyText();
        }
    };

    function select(element) {
        var selectedText;

        if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            element.focus();
            element.setSelectionRange(0, element.value.length);

            selectedText = element.value;
        } else {
            if (element.hasAttribute('contenteditable')) {
                element.focus();
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);

            selectedText = selection.toString();
        }

        return selectedText;
    }

    return Clipboard;

});
;
/**
 * @file 分享
 *
 * @description
 * fork from:  yaohao_share by yuanxueran
 *
 * @update
 * 2017-07-02 by menglingjun
 * 着急上，先在别人的东西上改，有空重写
 *
 * @update
 * 2017-07-18 by menglingjun
 * 使用 pmd
 *
 */


define('extensions/mip-share/0.1/share', ['require', 'extensions/mip-share/0.1/clipboard', 'extensions/mip-share/0.1/share/share'], function (require) {

    var Clipboard = require('extensions/mip-share/0.1/clipboard');
    var PMDShare = require('extensions/mip-share/0.1/share/share');

    /**
     * 重写 sendLog 方法
     *
     * @param  {string} key key
     */
    PMDShare.prototype._sendLog = function (key) {
        var me = this;

        var appKeyList = {
            pyq:       {'ct': 40, 'cst': 2},
            wxfriend:  {'ct': 40, 'cst': 1},
            qqfriend:  {'ct': 40, 'cst': 5},
            qzone:     {'ct': 40, 'cst': 3},
            sinaweibo: {'ct': 40, 'cst': 4},
            more:      {'ct': 40, 'cst': 9},
            close:     {'ct': 40, 'cst': 0}     // 关闭
        };

        if (key && appKeyList[key]) {
            var obj = appKeyList[key];
            if (me.opt && typeof me.opt.loginfo == 'object') {
                obj = $.extend(obj, me.opt.loginfo);
            }

            // 结果页日志发送接口
            // console && console.log(obj);
        }
    };


    /**
     * 复制链接
     *
     * @type {Object}
     */
    var copylink = {
        key: 'copylink',
        icon: 'data:image/png;base64,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',
        title: '复制链接',
        cb: function () {}
    };

    /**
     * initCopyLink
     *
     * @param  {HTMLElement} container container
     * @param  {Object} opt       options
     */
    function initCopyLink(container, opt) {

        var elem = $(container).find('.c-share-btn-copylink');

        if (!Clipboard.support || !elem.get(0)) {
            return;
        }

        new Clipboard(
            {
                el: elem,
                text: opt.url,
                success: function () {
                    alert('复制成功');
                },
                error: function () {
                    alert('复制失败');
                }
            }
        );
    }

    /**
     * defaultOpt
     *
     * @type {Object}
     */
    var defaultOpt = {
        iconUrl: '//m.baidu.com/se/static/pmd/pmd/share/images/bdu.jpg',
        custom: Clipboard.support ? [copylink] : []
    };


    /**
     * MIP Share CLASS
     *
     * @param {Object} opt       options
     * @param {HTMLElement} container container
     */
    function Share (opt, container) {

        opt = $.extend({}, defaultOpt, opt);

        var share = new PMDShare(opt);

        // render方法可以直接在页面中渲染分享ICON
        // 由于为js渲染会出现抖动,请注意执行时机
        share.render(
            container,
            {
                onRender: function() {
                    // 初始化 分享
                    initCopyLink(container, opt);
                }
            }
        );

        this.share = share;

    }

    return Share;
});
;

/**
 * @file 分享
 * @author junmer
 * @time 2016.06.21
 */

define('extensions/mip-share/0.1/mip-share', ['require', 'customElement', 'extensions/mip-share/0.1/share'], function(require) {

    var customElem = require('customElement');

    var Share = require('extensions/mip-share/0.1/share');


    /**
     * build
     */
    function build() {

        if (this.isRender) {
            return;
        }

        this.isRender = true;

        new Share({
            title: this.getAttribute('title') || document.title,
            url: this.getAttribute('url') || location.href,
            content: this.getAttribute('content') || '',
            iconUrl: this.getAttribute('icon') || ''
        }, $(this));

    }

    /**
     * 初始化
     *
     */
    customElem.prototype.init = function() {
        this.build = build;
    };

    return customElem;

});

require(['extensions/mip-share/0.1/mip-share'], function (share) {
    // 引入组件需要的css文件，选填
    MIP.css.mipShare = ".mip-share-container {\n  background: #fff;\n  padding: 17px 21px;\n  margin-top: 13px;\n}\n";
    //注册组件
    MIP.registerMipElement('mip-share', share, MIP.css.mipShare);
});
