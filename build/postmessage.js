/**
 * @file iframe通信组件
 * @author luofei02
 */
define('postmessage', ['require'], function (require) {
    // 等待响应的defer
    var deferQueue = {};
    // 请求处理队列
    var requestHandles = {};
    // 特殊消息
    var SPECIAL_MESSAGE = {
        TWO_WAY: 'two-way'
    };

    var sentinelRequest = 'PM_REQUEST';
    var sentinelResponse = 'PM_RESPONSE';

    window.addEventListener('message', function (e) {
        var data = e.data || {};
        // 只处理双向通信的需求
        if (data.type === SPECIAL_MESSAGE.TWO_WAY) {
            if (data.sentinel === sentinelRequest) {
                sendMessage(e.source, $.extend({}, data, {
                    // update sentinel
                    sentinel: sentinelResponse,
                    // append response data
                    data: callRequestHandle(data.event, data) || {}
                }), false);
            }
            else if (data.sentinel === sentinelResponse) {
                data.deferTimer && window.clearTimeout(data.deferTimer);
                deferQueue[data.sessionId] && deferQueue[data.sessionId].resolve(data);
                delete deferQueue[data.sessionId];
                delete data.deferTimer;
            }
        }
        else {
            callRequestHandle(data.event, data);
        }
    }, false);

    /**
     * 消息发送模块
     * @param {Window} target
     * @param {Object} data 发送数据
     * @param {Boolean} optional waitResponse 是否等待响应
     * @param {Function} optional responseHandle 等待响应的函数
     */
    function sendMessage(target, data, waitResponse) {
        var requestData = {};
        var sessionId = getSessionId();

        if (waitResponse) {
            $.extend(requestData, data, {
                type: SPECIAL_MESSAGE.TWO_WAY,
                sentinel: sentinelRequest,
                sessionId: sessionId
            });

            deferQueue[sessionId] = $.Deferred();

            requestData.deferTimer = setTimeout(function () {
                deferQueue[sessionId].reject('timeout');
            }, 1000);
        }
        else {
            requestData = data;
        }

        target.postMessage(requestData, '*');

        return waitResponse && deferQueue[sessionId].promise();
    }

    /**
     * 获取sessionId
     */
    function getSessionId() {
        return ((+new Date) * 1000 + Math.ceil(Math.random() * 1000)).toString(36);
    }

    /**
     * 添加对应事件的响应函数
     * update = add
     */
    function addRequestHandle(event, callback) {
        requestHandles[event] = callback;
    }

    /**
     * 删除对应事件响应函数
     */
    function deleteRequestHandle(event) {
        delete requestHandles[event];
    }

    /**
     * 调用函数
     */
    function callRequestHandle(event, args) {
        if (typeof requestHandles[event] === 'function') {
            return requestHandles[event](args);
        }
    }

    return {
        addRequestHandle: addRequestHandle,
        deleteRequestHandle: deleteRequestHandle,
        sendMessage: sendMessage
    };
});
