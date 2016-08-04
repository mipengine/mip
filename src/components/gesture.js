define(function(){
    
    var state = {
    }
    
    var gestureObserver = require('./observable');
    
    function message(data,event){
       gestureObserver.fire(data,event);
    }
    
    function bind(handler){
        gestureObserver.add(handler);
    }
    
    function unbind(handler){
        gestureObserver.remove(handler);
    }
     
    var point = {
        "startX" : 0,
        "startY" : 0,
        "lastX" : 0,
        "lastY" : 0,
        "startT" : 0
    };

    
    function touchStart(evt){
        try {
            var touch = evt.touches[0];
            point.startX = Number(touch.screenX);
            point.startY = Number(touch.screenY);
            point.startT = evt.timeStamp;
            var data = {"event" : "touchstart", "x" : point.startX, "y" : point.startY, "_t" : evt.timeStamp};
            message(evt,data);
        }
        catch (e) {

        }
    }
    
    function touchEnd(evt){

        try {
            nChangX = evt.changedTouches[0].screenX;
            nChangY = evt.changedTouches[0].screenY;

            var distX = nChangX - point.startX;
            var distY = nChangY - point.startY;

            var speed = (evt.timeStamp - point.startT)/distX;
            message(evt, {"event" : "touchend", "x" : distX, "y" : distY, "_t" : evt.timeStamp, "speed" : speed});

        }
        catch (e) {

        }

    }

    function touchMove(evt){
        try {
            var touch = evt.touches[0]; 
            var x = Number(touch.screenX);
            var y = Number(touch.screenY);
            var data = {"event" : "touchmove", "x" : x - point.startX, "y" : y - point.startY, "_t" : evt.timeStamp};
            message(evt,data);

        }
        catch (e) {

        }
    }

    //绑定事件
    var isBind = false;
    function bindEvent(){
        if(!isBind) {
            window.addEventListener('touchstart', touchStart, false);
            window.addEventListener('touchmove', touchMove, false);
            window.addEventListener('touchend', touchEnd, false);
            isBind = true;
        }
    }
    
    function init(){
        bindEvent();
    }
    return {
        init:init,
        bind:bind,
        unbind:unbind
    }
});
