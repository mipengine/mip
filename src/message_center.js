define(function(){
    /**
    * @des 消息中心 如果初始化时候，不指定target，则只会监听当前页面，不可以发送请求，否则会报错
    * @author shenzhou@baidu.com
    * @version 1.0
    * @copyright 2015 Baidu.com, Inc. All Rights Reserved
    */
    //发送postMessage时候，目标response的回掉函数
    responseHandlers = {};
    var messageObserver = require('observable');

    var isListener = false;
    var sentinel = '__MIB__';
    var sentinelRequest = sentinel + 'REQUEST'; 
    var sentinelResponse = sentinel + 'RESPONSE'; 
    /**
    * {send request to targe frame}
    * 
    * @param data {type json} 
    * @param responseHandler {type function} 
    * @return nothing return
    */
    function sendRequest(target,data,responseHandler){
        var sessionID = ((new Date()).getTime()+parseInt(Math.random()*1000)).toString(); 
        data.requestData = {};
        data.sentinel = sentinelRequest;
        data.requestData.sessionID = sessionID;
        if(typeof responseHandler != undefined){
            responseHandlers[sessionID] = responseHandler;
        }
        target.postMessage(data, '*');

        //TODO 响应页面消息逻辑，需要额外函数处理
    }

    function onMessage(messageHandler){
        if(!isListener) {
            window.addEventListener('message', function(event){
                messageFire(event);
            } , false);
            isListener = true;
        }
        messageObserver.add(messageHandler);
    }

    function messageFire(event){
        var data = event.data;
        if(data.sentinel == sentinelRequest){
            messageObserver.fire(event);
        } else if(data.sentinel == sentinelResponse){
            var sessionID =  data.sessionID;
            if(responseHandlers[sessionID]){
                responseHandlers[sessionID](event);
            } 
        }
    }

    function sendResponse(target, requestData, responseData) {
        var sessionID = requestData.sessionID;
        var data = responseData;
        data.sessionID = sessionID;
        data.sentinel = sentinelResponse;
        target.postMessage(data, '*');
    }
    return {
        sendRequest:sendRequest,
        sendResponse:sendRequest,
        onMessage:onMessage
    };
});
