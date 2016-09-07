require.config({
    paths: {
        'builtins/video/player': __uri('./video/player').replace(/\.js$/g, '')
    }
});
define(['../util'], function(util){
    var customElem = require('customElement').create();
    var player;
    var bdPlayer;

    var playerAttr = ['height', 'width', 'src', 'type', 'poster', 'autoplay', 'controls', 'loop', 'muted'];
    customElem.prototype.build = function () {
        var self = this;
        var element = this.element;

        self.ext = {};
        self.iframeSrc = '';
        self.applyFillContent(element, true);

        var children = element.childNodes;
        for(var index = 0; index < children.length; index ++) {
            if(children[index].nodeType == 1 && children[index].nodeName != 'MIP-I-SPACE') {
                self.applyFillContent(children[index], true);
            }
        }
        
        getVideoInfo.call(self);

        self.isBlank = isBlank.call(self);
        
        require(['builtins/video/player'], function (Player) {
            if (!player) {
                player = Player;
            }
            if(!self.isBlank) {
                playnowpage.call(self)
            } else {
                var str = '';
                self.ext.adInfo.map(function(data, index) {
                    if(index) {
                        str += ',';
                    }
                    str += encodeURIComponent(data[0].src);
                });
                self.ext.adInfo = str;

                self.element.addEventListener('click', function() {
                    toTranscoder.call(self);
                });
            }
        });
    };

    //本页打开
    function playnowpage() {
        var element = this.element;
        var self = this;
        element.addEventListener('click', function (event) {
            if(event.target.tagName == 'VIDEO') {
                event.stopPropagation();
                return false;
            }
            // 如果有视屏正在播放，则移除视屏
            bdPlayer && bdPlayer.remove();
            bdPlayer = new player({});

            var container = document.querySelector(element.getAttribute('container'));
            if (!container) {
                container = element;
            }

            // 广告数据信息
            var adInfo = [];
            var adInfoString = element.getAttribute('adInfo');
            if (adInfoString) {
                try {
                    adInfo = new Function('return ' + adInfoString)()
                } catch (e) {}
            }

            //过滤ios qq
            var userAgent = navigator.userAgent;
            var qqbrower = userAgent.indexOf("QQ") > 0 ? true : false;
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

            var sources = element.querySelectorAll('source');
            var playInfo = [];

            for (var i = 0; i < sources.length; i++) {
                var src = sources[i].getAttribute('src');
                var type = sources[i].getAttribute('type');
                if (!src) {
                    continue;
                }
                playInfo.push({
                    type: type,
                    src: src
                });
            }

            var conf = self.expendAttr(playerAttr, {});
            conf.container = container;
            conf.android = {
                playMode: element.getAttribute('android-mode') || ''
            };
            conf.ios = {
                playMode: element.getAttribute('ios-mode') || ''
            };
            conf.adInfo = adInfo;
            conf.playInfo = playInfo;
            bdPlayer.render(conf);
        });
    }

    //非本页打开
    function toTranscoder() {
        var self = this;

        var baiduappbox = recognitionClient();
        bdPlayer && bdPlayer.remove();

        bdPlayer = new player({});
        //一下为判断终端是否手百,ios与Android
        if(baiduappbox.baiduboxapp) { //手百
            if(getOS() == "Android" && baiduappbox.version > "6.4") {
                var configstr = baiduapp.call(self, true);
                Box.android.invokeApp("Bdbox_android_capi_video","playVideo",[configstr]);
            } else if(getOS() == "IOS" && baiduappbox.version > "6.8") {
                var configstr = baiduapp.call(self);
                Box.ios.invokeApp("video",{"action":"playVideo","params": configstr, "minver":"6.8.0.0"},"");
            } else {
                superpage.call(self);
            }
        } else {
            superpage.call(self);
        }
    }

    //http承载页跳转
    function superpage() {
        top.location.href = alignment.call(this);
    }

    /**
     * 手百调起数据组装
     * encode参数为ios与安卓的配置方式不同
     */
    function baiduapp(encode) {
        var url = alignment.call(this) + 'tn=nohead';

        var data = {
            "vid": +new Date(),
            "title": encodeURIComponent(self.title),
            "src": encodeURIComponent(url),
            "cate": "tvplay",
            "pageUrl": location.href,
            "type": "other"
        };
        return JSON.stringify(data);
    }

    /**
     * 数据组装函数
     */
    function alignment() {

        var self = this;
        var ext = !!self.iframeSrc ? {iframeSrc: self.iframeSrc}
                                    : self.ext;
        var data = {
            'pd': 'mms_mipvideo',
            'title': encodeURIComponent(self.title),
            'dev_tpl': 'act_mip_video',
            'wd': '%E8%A7%86%E9%A2%91',
            'actname': 'act_mip_video',
            'ext': encodeURIComponent(JSON.stringify(ext))
        };

        return getUrl(data);
    }


    /**
     * [getUrl splice URL by params]
     * 
     * @param  {Object} params
     * @return {String} url
     */
    function getUrl(params) {
        var url = 'http://cp01-sys-rath4-c32-qa270.cp01.baidu.com:8003/sf?'
        // var url = "http://transcoder.baidu.com/sf?";
        
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                url += key + '=' + params[key] + '&';
            }
        }

        return url;
    }    


    /**
     * [getVideoInfo video params init]
     * 
     * @return
     */
    function getVideoInfo() {
        var self = this;

        var poster = self.element.getAttribute("poster") || '';
        var src = self.element.getAttribute("src") || '';
        var adInfo = self.element.getAttribute("adInfo") || '';
        var title = self.element.getAttribute("title") || "视频";
        var iSrc = self.element.getAttribute("iframeSrc") || '';
        var adInfoAry = [];
        var adInfoStr = '';

        //广告信息序列化
        if (adInfo && !isLtIOS8()) {
            try {
                adInfoAry = new Function('return ' + (adInfo))();
            } catch (e) {}
        }

        self.title = title;
        self.iframeSrc = encodeURIComponent(iSrc);
        self.ext = {
            poster : encodeURIComponent(poster),
            src : encodeURIComponent(src),
            adInfo : adInfoAry
        };
    }


    /**
     * [isLtIOS8 is ios version left then 8]
     * 
     * @return {Boolean} true or false
     */
    function isLtIOS8() {

        var agent = navigator.userAgent.toLowerCase() ;
        var version = '';
            
        if(agent.indexOf("like mac os x") > 0){
            
            version = agent.match(/os [\d._]*/gi).toString()
                        .replace(/[^0-9|_.]/ig,"")
                        .replace(/_/ig,".").toString();
        }

        if(version != "undefined" && version.length > 0){
            version = version.substring(0, 1);
        }

        return version < 8;
    }


    /**
     * [isBlank open new page]
     * 
     * @return {Boolean} true or false
     */
    function isBlank() {

        var self = this;
        if(self.iframeSrc) return true;

        var info = self.ext.adInfo;
        var flag = !isHttps(self.ext.src);

        for(var index = 0; index < info.length; index ++) {
            flag = flag && !isHttps(info[index][0].src);
        }

        return flag;
    }


    /**
     * [isHttps is url a https url]
     * 
     * @param  {String}  url a source url or src 
     * @return {Boolean} true or false
     */
    function isHttps(url) {

        var reg = /^https/;
        return reg.test(url) || reg.test(location.protocol);

    }


    /**
     * [getOS get OS name]
     * 
     * @return {String} 
     */
    function getOS() {
        var agent = navigator.userAgent;
        var isAdr = agent.match(/(Android)|(Adr)/g);
        var isIOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 

        return isAdr ? "Android" : (isIOS ? "IOS" : "other");

    }  


    /**
     * 客户端验证-短线方案
     * 主要验证手百,以提供调起服务
     */
    function recognitionClient() {
        var userAgentconfig = {};
        var userAgent = navigator.userAgent;
        var baiduboxapp = userAgent.indexOf('baiduboxapp') > 0 ? true : false;

        if(baiduboxapp) {
            userAgentconfig.version = Number(parseFloat(Box.version));
            userAgentconfig.baiduboxapp = baiduboxapp;
        }
        return userAgentconfig;
    }  

    return customElem;

});



