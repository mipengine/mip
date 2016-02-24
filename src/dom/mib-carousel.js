define(function(){
    /**
    * 说明,如果需要触发图片浏览，需要在对应图片上加data-carousel="carousel' 属性
    * 在图片浏览模式打开时候，会触发：mib.carousel.open;在图片浏览模式关闭时候，会触发：mib.carousel.close
    */
    var index = 0;
    var itemNum = 0;
    var left = 0;
    var screenWidth = $(window).width();
    var perDistance = screenWidth;
    var switchMinDist = 200;
    var maxSlidDist = 0;
    var curentLeft = 0;
    var urlList = [];
    var isDisplay = false;
    var isRender = false;
    var gesture = require('gesture');

    /**
    * 组件初始化工作
    */
    function init(url){
        for(var i =0;i<urlList.length;i++){
            if(urlList[i] == url){
                index = i;
                break;
            } 
        }
        itemNum = urlList.length; 
        maxSlidDist = perDistance * (itemNum - 1)
        left = perDistance*index;

        if($('.mib-img-box').length <= 0) {
            $('body').append('<div class="mib-img-box" style="display:none">');
        }

        render();
        $('.mib-img-box').attr("style",'display:block');
        $('.box-item').each(function(){
            this.style.width = perDistance + 'px';
        });
        $('.box-img-wrap img').each(function(){
            this.style.width = perDistance + 'px';
        });
        moveTo(-1*index*perDistance,0);   
        isDisplay = true;
        $(window).trigger('mib.carousel.open');
        gesture.init();
        gesture.bind(bindGesture);
    }

    /*
    * 初始化事件工作，组件require后，需要初始化数据
    */

    function initData(){
        $('[data-carousel]').each(function(){
            var src = this.getAttribute('src');
            urlList.push(src);
            $(this).on('click',function(){
                var src = this.getAttribute('src');
                init(src);
            });
        })
    }

    function render(){
        var resultStr =  "";
        for(var i=0; i<urlList.length;i++){
            resultStr = resultStr + '<div class = "box-item"><div class="box-img-wrap"> <img src="'+ urlList[i] +'"> </div> </div>';
        }
        var renderStr = '<div class = "box-line"><div class = "box-container">' + resultStr + '</div></div>'+ '<div class="mib-box-page">'+(index+1)+'/'+itemNum+'</div>';
        $('.mib-img-box').html(renderStr); 
    }

    function close(){
        $('.mib-img-box').attr("style","display:none");
        $(window).trigger('mib.carousel.close');
        isDisplay = false;
        gesture.unbind(bindGesture);
    }

    /*
    * 左右移动函数，移动到对应的距离
    */
    function moveTo(x,y){
        $('.box-container').attr('style','transform:translate3d('+x+'px, '+ y +'px, 0px);');
        $('.box-container').attr('style','-webkit-transform:translate3d('+ x +'px, '+ y +'px, 0px);');
    }

    function positionTo(imgEle,x,y){
        imgEle.style.top = x+'px';
        imgEle.style.left = y+'px';
    }
/**
 * 拖动
 * */
    function dragTo(event,data){
        var ele = event.srcElement;
        if(data.x>0 && data.x < x){
           ele.style.left = -1*(x - data.x)+'px';
           return true;
        }else{
            if(data.x <0 &&(Math.abs(data.x)+x+srcWidth)<startWidth){
                ele.style.left = (-1*x + data.x)+'px';
                return true;
            }else {
                return false;
            }
        }
    }
    /*
    *  处理左右滑动，切换图片
    */

    function switchItem(data,event){
        if(data.event == 'touchmove'){
            var ele = event.srcElement;
            var distance = (-1 * data.x) + left;
            if(distance > -perDistance && distance < maxSlidDist + perDistance){
                moveTo(-1*distance,0);
                var ele = event.srcElement;
                if(srcWidth !=0){
                    resetStaus(ele);
                    srcWidth = 0;
                }
            }
        }else if(data.event == 'touchend'){
            if(Math.abs(data.x) < 10){
                close(); 
            } 
            if(Math.abs(data.x) > switchMinDist && left >= 0 && left <= maxSlidDist){
                if(data.x > 0 && left !=0){
                    left = left - perDistance;
                }else if(data.x <0 && left != maxSlidDist){
                    left = left + perDistance;
                }
            }
            var num = Math.abs(left/perDistance);
            moveTo(-1*left,0);
            $('.mib-box-page').html((num+1)+"/"+itemNum);
        }
        event.stopPropagation();
        event.preventDefault();

    }
    /*
    * 获取触摸移动距离，
    *dist: 2点间距离，x、y为横坐标、纵坐标移动距离
    */
    function calTouchDist(e) {
        var x1 = 0,
        y1 = 0,
        x2 = 0,
        y2 = 0,
        x3 = 0,
        y3 = 0,
        result = {};
        x1 = e.touches[0].pageX;
        x2 = e.touches[1].pageX;
        y1 = e.touches[0].pageY - document.body.scrollTop;
        y2 = e.touches[1].pageY - document.body.scrollTop;
        if (!x1 || !x2) return;
        if (x1 <= x2) {
            x3 = (x2 - x1) / 2 + x1;
        } else {
            x3 = (x1 - x2) / 2 + x2;
        }
        if (y1 <= y2) {
            y3 = (y2 - y1) / 2 + y1;
        } else {
            y3 = (y1 - y2) / 2 + y2;
        }
        result = {
            dist: Math.round(Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))),
            x: Math.round(x3),
            y: Math.round(y3)
        };
        return result;

    }
    /*
    * 重置放到的缩放状态
    */
    function resetStaus(ele){
        ele.style.width = srcWidth+"px";
        ele.style.left = "0";
        ele.style.top = "0";
    }

    /*
    * 缩放服务
    */
    var startDist = {};
    var startWidth = 0;
    var srcWidth = 0;
    var srcHeight = 0;
    var startHeight = 0;
    var x = 0;
    var y = 0;
    var isZoom = false;
    var maxZoomNum = 2;

    function zoom(data,event){
        if(data.event == "touchstart"){
            isZoom = true;
            startDist = calTouchDist(event);
            var ele = event.srcElement;
            startWidth = ele.clientWidth;
            startHeight = ele.clientHeight;
            if(srcWidth ==0){
                srcWidth = startWidth;
                srcHeight = startHeight;
            }
        }
        if(data.event == "touchmove"){
            var ele = event.srcElement;
            var moveDist = calTouchDist(event);
            var ratio = moveDist.dist/startDist.dist;
            var newWidth = Math.round(ratio * startWidth);
            var newHeight = Math.round(ratio * startHeight);

            if(newWidth < srcWidth || newWidth > srcWidth*maxZoomNum){
                return; 
            }
             
            x = (newWidth - srcWidth)/2;
           console.log(startDist);
           console.log(ratio);
            ele.style.left = -1* x + 'px';
            ele.style.width = newWidth+"px";
        }
        if(data.event =="touchend"){
            if(event.targetTouches.length == 0){
                isZoom = false;
            }
            var ele = event.srcElement;
            startWidth = ele.clientWidth;
        }
        event.preventDefault();
        event.stopPropagation();
    }

    /*
    * 手势识别统一处理
    */

    function bindGesture(event,data){
        if(!isDisplay){
            return; 
        }
        if(event.targetTouches.length>1 || isZoom == true){
            zoom(data,event); 
        }else{
            switchItem(data,event);
        } 

    }
    return{
        initData:initData
    }
});
