/**
 * 视频播放组件
 * fengchuantao@baidu.com
 * 7.20
 */
__inline('./video/sbbox');

define(['../util'], function(util){
    var $ = require('zepto');
    var customElem = require('customElement').create();
    var player = require('./video/player');
    

    var bdPlayer;

    var build = function () {
        var _element = this.element;
        if (_element.isRender) {
            return; 
        }
        _element.isRender = true;
        var me = _element;
        var $me = $(_element);
    
        var _Videoconfig = {}; //数据存储

        _Videoconfig = getInfo.call(_element,_Videoconfig);
        listdataValida();

        //本地打开或者外部页打开
        if(_Videoconfig.nowpage) { //在本地打开
            playnowpage.call(_element)
        }else {
             _this = me;
            $(_this).on("click",function(){
                playotherpage.call(_this);
            })
        }
        
 
        //组件信息获取器
        function getInfo() {
            var poster = this.getAttribute("poster");
            var src = this.getAttribute("src");
            var adInfoString = this.getAttribute("adInfo");
            var title = this.getAttribute("title")||"视频";

            //广告信息序列化
            var adInfo = [];
            if (adInfoString) {
                try {
                    adInfo = new Function('return ' + adInfoString)()
                } catch (e) {}
            }

            //过滤ios7.0
            var agent = navigator.userAgent.toLowerCase() ;
            var version;
            if(agent.indexOf("like mac os x") > 0){
                //ios
                var regStr_saf = /os [\d._]*/gi ;
                var verinfo = agent.match(regStr_saf) ;
                version = (verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");
            }

            var version_str = version+"";
            if(version_str != "undefined" && version_str.length >0){
                version=version.substring(0,1);
            }

            if(version<8) {
                adInfo = [];
            }

            return {
                poster : poster,
                src : src,
                adInfo : adInfo,
                title:title
            }
        }

        //HTTPS验证
        function validaHttps(url) {
            var httpsValida;
            var absoluteurl = url.indexOf('/') == 0 ? true : false; //验证省略协议的情况如//www.baidu.com/xxx/xxx;

            if(absoluteurl) {
                httpsValida = httpsurl(location.href.protocol);
            }else {
                httpsValida = httpsurl(url)
            }
            function httpsurl(url) {
                return /^https\:/i.test(url)
            }
            return httpsValida;
        }

        //验证所有参数(视频源与广告源,图片不验证)
        function listdataValida() {
            var all_src = validaHttps(_Videoconfig.src);
            var all_adinfo = _Videoconfig.adInfo.every(function(data, index) {
                return validaHttps(data[0].src);
            })
            if(!all_adinfo || !all_src) {
                _Videoconfig.nowpage = false;
            }else {
                _Videoconfig.nowpage = true;
            }
        }

        /**
         * 客户端验证-短线方案
         * 主要验证手百,以提供调起服务
         */
        function recognitionClient() {
            var userAgentconfig = {};
            var userAgent = navigator.userAgent;
            var baiduboxapp = userAgent.indexOf('baiduboxapp')>0?true:false;

            if(baiduboxapp) {
                userAgentconfig.version = Number(parseFloat(Box.version));
                userAgentconfig.baiduboxapp = baiduboxapp;
            }
            return userAgentconfig;
        }

        //判断是ios/Android
        function iosAndroid() {
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
            if(isAndroid) {
                return "Android"
            }else if(isiOS) {
                return "iOS"
            }else {
                return "other"
            };
        }

        //本页打开
        //该函数源于@赵雷
        function playnowpage() {
            $(this).on('click', function (event) {
                if(event.target.tagName.toLocaleLowerCase()=='video') {
                    event.stopPropagation();
                    return false;
                }
                // 如果有视屏正在播放，则移除视屏
                bdPlayer && bdPlayer.remove();

                bdPlayer = new player({});

                // video容器  如果未设置的话  则传入me
                var container = $me.attr('container');
                if (container && $(container) && $(container).length) {
                    container = $(container);
                } else {
                    container = me;
                }

                // 广告数据信息
                var adInfo = [];
                var adInfoString = $me.attr('adInfo');
                if (adInfoString) {
                    try {
                        adInfo = new Function('return ' + adInfoString)()
                    } catch (e) {}
                }


                //过滤ios qq
                var userAgent = navigator.userAgent;
                var qqbrower = userAgent.indexOf("QQ")>0?true:false;
                var ios = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
                
                //过滤ios7.0
                var agent = navigator.userAgent.toLowerCase() ;
                var version;
                if(agent.indexOf("like mac os x") > 0){
                    //ios
                    var regStr_saf = /os [\d._]*/gi ;
                    var verinfo = agent.match(regStr_saf) ;
                    version = (verinfo+"").replace(/[^0-9|_.]/ig,"").replace(/_/ig,".");
                }

                var version_str = version+"";
                if(version_str != "undefined" && version_str.length >0){
                    version=version.substring(0,1);
                }

                if((qqbrower&&ios)||version < 8) {
                    adInfo = [];
                }

                // 正片播放时 设置多type时 数据处理
                var sources = $me.find('source');
                var playInfo = [];
                sources.each(function () {
                    var src = $(this).attr('src');
                    var type = $(this).attr('type');
                    if (!src) {
                        return;
                    }
                    playInfo.push({
                        type: type,
                        src: src
                    });
                });
                // 加载视频、并播放
                bdPlayer.render({
                    // 播放器容器，必选
                    container: container,

                    height: $me.attr('height'),
                    width: $me.attr('width'),
                    src: $me.attr('src'),
                    type: $me.attr('type'),
                    poster: $me.attr('poster'),
                    autoplay: $me.attr('autoplay'),
                    controls: $me.attr('controls'),
                    loop: $me.attr('loop'),
                    muted: $me.attr('muted'),

                    android: {
                        playMode: $me.attr('android-mode') || ''
                    },
                    ios: {
                        playMode: $me.attr('ios-mode') || ''
                    },

                    // 广告数据信息
                    adInfo: adInfo,

                    // 正片视频数据信息
                    playInfo: playInfo
                    // src: 'http://v1.bdstatic.com/8aa369effe2cc6280c1bd413723ce0ac/mp4/8aa369effe2cc6280c1bd413723ce0ac.mp4'
                });
            });
        }

        //非本页打开
        function playotherpage() {
            var allconfig = getInfo.call(this);
            var baiduappbox = recognitionClient();
            bdPlayer && bdPlayer.remove();

            bdPlayer = new player({});

            //一下为判断终端是否手百,ios与Android
            if(baiduappbox.baiduboxapp) { //手百
                if(iosAndroid()=="Android") {
                    if(baiduappbox.version > "6.4"){
                        var configstr = baiduapp(allconfig,true);
                        Box.android.invokeApp("Bdbox_android_capi_video","playVideo",[configstr]);
                    }else {
                        superpage(allconfig)
                    }   
                    
                }else if(iosAndroid()=="iOS") {
                   
                   if(baiduappbox.version > "6.8") {
                        var configstr = baiduapp(allconfig);
                        Box.ios.invokeApp("video",{"action":"playVideo","params":configstr,"minver":"6.8.0.0"},"");
                   }else {
                        superpage(allconfig)
                   }

                }else {
                    superpage(allconfig)
                }
            }else {
                superpage(allconfig)
            }
        }

        //http承载页跳转
        function superpage(allconfig) {
            var geturl = alignment(allconfig)
            top.location.href = geturl + "&title="+encodeURIComponent(allconfig.title);
        }

        /**
         * 手百调起数据组装
         * encode参数为ios与安卓的配置方式不同
         */
        function baiduapp(allconfig,encode) {
           var geturl = alignment(allconfig)+"&tn=nohead"; //手百调取SF页面需要去掉SF页头部。
           var URL = encode?geturl:encodeURIComponent(geturl)
            var $jsonString = {
                "vid": +new Date(),
                "title": encodeURIComponent(allconfig.title),
                "src": URL,
                "cate": "tvplay",
                "pageUrl": location.herf,
                "type": "other"
            }
            jsonString = JSON.stringify($jsonString);
            return jsonString;
        }

        /**
         * 数据组装函数
         */
        function alignment(allconfig) {
            var PROXYURL ="http://transcoder.baidu.com/sf?pd=mms_mipvideo&dev_tpl=act_mip_video&wd=%E8%A7%86%E9%A2%91&actname=act_mip_video";

            var all_adinfourl = [];
            allconfig.adInfo.map(function(data,index) {
                all_adinfourl.push(encodeURIComponent(data[0].src));
            })
            var geturl = "&poster="+encodeURIComponent(allconfig.poster)+"&src="+encodeURIComponent(allconfig.src)+"&ad=";
            endgeturl = PROXYURL + geturl + all_adinfourl;
            return endgeturl;
        }

    };

    customElem.prototype.init = function(){
        this.build = build; 
    };

    return customElem;

});



