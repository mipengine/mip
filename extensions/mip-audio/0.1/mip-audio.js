/**
 * @file audio
 * @author fengchuantao
 * 
 * @time 2016.8.1
 */

define(function() {
    var customElement = require('customElement').create();
   
    function build() {
        var _element = this.element;
        if (_element.isRender) {
            return;
        }
        _element.isRender = true;

        var url = _element.getAttribute("src")||"";
        if(url=='') {
            return;
        }
        var newauido = new Audio({
            "url": url,
            "layout": _element,
        })
        newauido.init();
    }


    /**
     * [Audio 构造函数]
     * @DateTime  2016-08-04T23:01:23+0800
     * @feng'chuan'tao@baidu.com
     */
    function Audio(config) {
        this.url = config.url;
        this.layout = config.layout;
        this.allstoptime;
        this.viodevalue = 2;
        this.canplaythrough = true;
        this.timeupdate = true;
        this.dragboolen = true;

    }

    Audio.prototype = {

        init: function() {
            var $layout = $(this.layout)
            var audiodom = this.creatdom();

            $(this.layout).append(audiodom)
            this.audio = $layout.find('audio')[0];

            //获取总时长
            this.gettimelen();

            //事件绑定
            this.playaudioEvent();
            this.endaudioEvent();

        },
        creatdom: function(){
            var audioDom =  
               "<div class='mip-audio'>" +
                    "<div class='mip-audio-playbtn mip-audio-voice-play'></div>" +
                    "<div class='mip-audiao-progress'>" +
                        "<div class='mip-audiao-progressshow'></div>" +
                        "<div class='mip-audiao-progresbtn mip-audiao-progres-bar'>"+
                             "<div class='mip-audiao-progresbtn-slide'></div>"+
                        "</div>" +
                    "</div>" +
                    "<div class='mip-audio-timeshow'><p>00:00</p></div>" +
                    "<audio src = "+this.url+">"+
                    "</audio>"
                "</div> ";

            return audioDom;
        },
        playaudioEvent: function() {
            var $layout = $(this.layout);
            var _this = this;
            $layout.on("click",".mip-audio-playbtn",function(){
                _this.playtrgger()
            })
        },
        endaudioEvent: function() {
            var _this = this;
            var $layout = $(this.layout);
            $(_this.audio).on("ended",function(){
                $layout.find(".mip-audio-voice-stop").removeClass("mip-audio-voice-stop").addClass('mip-audio-voice-play');
            })
        },
        viodecontrol: function() {
            var $layout = $(this.layout);
            var _this = this;
            $layout.on("click", ".mip-audio-voice",function() {
                if(_this.viodevalue==0) {
                    _this.viodevalue = 1
                    _this.audio.volume = 0.5;
                    _this.audio.muted = false;
                    $layout.find(".mip-audio-voice0").removeClass('mip-audio-voice1').addClass('mip-audio-voice1');
                    $layout.find(".mip-audiao-progress-viode .mip-audiao-progresbtn").css("left","20%")

                }else if(_this.viodevalue==1) {
                    _this.viodevalue = 2;
                    _this.audio.volume = 1;
                    _this.audio.muted = false;
                    $layout.find(".mip-audio-voice1").removeClass('mip-audio-voice1').addClass('mip-audio-voice2');
                    $layout.find(".mip-audiao-progress-viode .mip-audiao-progresbtn").css("left","52%")
                }else {
                    _this.viodevalue = 0;
                    _this.audio.volume = 0;
                    _this.audio.muted = true;
                    $layout.find(".mip-audio-voice2").removeClass('mip-audio-voice2').addClass('mip-audio-voice0');
                    $layout.find(".mip-audiao-progress-viode .mip-audiao-progresbtn").css("left","0%")
                }
            })
        },
        playtrgger: function() { //区分是否是拖拽产生的暂停
            var $layout = $(this.layout);
            if(this.audio.paused) {
                this.audio.play();
                $layout.find(".mip-audio-voice-play").removeClass("mip-audio-voice-play").addClass('mip-audio-voice-stop');
                this.gettimelen();
                this.progressshow();
                if(!this.dragboolen) {
                    return
                }
                this.drag();
                this.dragboolen = false;
            }else {
                this.audio.pause()
                clearInterval(this.allstoptime)
                $layout.find(".mip-audio-voice-stop").removeClass("mip-audio-voice-stop").addClass('mip-audio-voice-play');
            }
        },
        progressshow: function() {
            var $layout = $(this.layout);
            var _this = this;
            var $progressbar = $layout.find(".mip-audiao-progres-bar");
            var $timeshowtext = $layout.find(".mip-audio-timeshow p")
            _this.allstoptime = setInterval(function(){
                var currentTime = _this.audio.currentTime;
                $timeshowtext.html(_this.millisecondToDate(currentTime))

                var ceil = parseInt(currentTime)/parseInt(_this.duration)*100+"%";
                $progressbar.css("left",ceil)
            },10)
        },
        gettimelen: function() {
            var _this = this;
            var $layout = $(this.layout);
            
            $(_this.audio).on("canplay",function(){
               _this.duration =  _this.audio.duration;
               var milltime = _this.millisecondToDate(_this.duration);
                if(!_this.canplaythrough) {
                    return 
                }
               $layout.find(".mip-audio-timeshow p").html(milltime);
               _this.canplaythrough = false;
            })

            $(_this.audio).on("timeupdate",function(){
               _this.duration =  _this.audio.duration;
               var milltime = _this.millisecondToDate(_this.duration);
                if(!_this.timeupdate) {
                    return 
                }
               $layout.find(".mip-audio-timeshow p").html(milltime);
               _this.timeupdate = false;
            })
        },
        drag: function(obj) {
            var $layout = $(this.layout);
            var btn =  $layout.find(".mip-audiao-progresbtn")[0];
            var parentwidth = $(btn).parent(".mip-audiao-progress").width();
            var _this = this;


            var startx, startok = false;
            btn.addEventListener('touchstart',function(event){
                 startx  = event.touches[0].clientX;
                 startok = true;
                 clearInterval(_this.allstoptime);
            });
            btn.addEventListener('touchmove',function(event){
                event.preventDefault();
                event.stopPropagation();
                if(!startok) return;
                var btnleft = parseInt($(btn).position().left);
               
        		var movexmouse = event.touches[0].clientX-startx;
                var movex = movexmouse+btnleft;
	           	
                if(movex > parentwidth) {
                    btn.style.left = parentwidth+"px";
                    _this.setTimepaly(movex/parentwidth);
                }else if(movex<=0) {
                     btn.style.left = "0px;";
                     _this.setTimepaly(parseInt(0));
                }
                else {
                    btn.style.left = movex+"px";
                    _this.setTimepaly(movex/parentwidth);
                }
		       startx = event.touches[0].clientX;
            })
            btn.addEventListener('touchend',function(event){
                startok = false;
                _this.progressshow()
            })
        },
        setTimepaly: function(ceil) {
            var _this = this;
            var $layout = $(this.layout);
            _this.audio.currentTime = parseInt(_this.duration*ceil);
            var nowtime = _this.millisecondToDate(_this.audio.currentTime);
            $layout.find(".mip-audio-timeshow p").html(nowtime)
        },
        millisecondToDate:function(now) {
            var theTime = parseInt(now);// 秒
            var theTime1 = 0;// 分
            var theTime2 = 0;// 小时
            if(theTime > 60) {
                theTime1 = parseInt(theTime/60);
                theTime = parseInt(theTime%60);
                    if(theTime1 > 60) {
                        theTime2 = parseInt(theTime1/60);
                        theTime1 = parseInt(theTime1%60);
                    }
            }
            if(parseInt(theTime)<10) {
                theTime = "0"+parseInt(theTime);
            }
            var result = ""+ theTime;
            if(theTime1==0) {
                result = "00"+":"+result;
            }
            if(theTime1 > 0) {
                result = ""+parseInt(theTime1)+":"+result;
            }
            if(theTime2 > 0) {
                result = ""+parseInt(theTime2)+":"+result;
            }
            return result;
        }
    }
    
    customElement.prototype.build = build;

    return customElement;

});

require(['mip-audio'], function (audio) {
    
    // 引入组件需要的css文件，选填
    MIP.css.mipaudio = __inline('./mip-audio.less');
    //注册组件
    MIP.registerMipElement('mip-audio', audio, MIP.css.mipaudio);
});

