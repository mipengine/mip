/**
 * fork from http://gitlab.baidu.com/MIP/mibhtml/raw/master/src/static/js/utils/util.js
 */

define(function() {

    /**
     * @description 极简版模版引擎
     * @param {String} tpl 模版
     * @param {Object} data 渲染数据
     * @return 渲染后的数据
     */
    function format(tpl, data) {
        data = data || {};
        return tpl.replace(/#\{([^\}]+)\}/g, function() {
            if (data[arguments[1]] !== undefined) {
                return data[arguments[1]];
            }
            return '';
        });
    }

    /**
     *  时间转换工具
     *  @params time 传入时间戳
     *  @return 时间字符串
     *  by liwenqian@baidu.com
     * */
    function timeSince(time) {
        var tempSeconds = 1000 * time;
        if((new Date() - tempSeconds) < 60000) {
            return "刚刚";
        }
        var tempMinutes = Math.floor((new Date() - tempSeconds)/60000);
        if(tempMinutes < 60) {
            return tempMinutes + "分钟前";
        }
        var tempHours = Math.floor(tempMinutes/60);
        if(tempHours < 24) {
            return tempHours + "小时前";
        }
        var tempDate = new Date(tempSeconds);
        var month = tempDate.getMonth() + 1;
            month = month < 10 ? "0" + month : month;
        var day = tempDate.getDate() < 10 ? "0" + tempDate.getDate() : tempDate.getDate();
        return  month + "-" + day;
    }

    /**
     *  页面url参数获取工具，hash和参数均生效
     *  @params 要匹配的字符串，要提取的参数
     *  @return 参数值或空
     *  by liwenqian@baidu.com,taoqingqian01@baidu.com
     * */
    function getParam(param, url) {
        var reg = new RegExp(param + '=([^&\?#]+)'),
            href = url;
        var matchs = href.match(reg);
        return matchs ? matchs[1] : "";
    }

//格式化
    function formatBigNumber(num) {
        if (!num) return 0;
        if (num < 1e5) {
            return num;
        }
        else if (num < 1e8) {
            // return (num / 1e4).toFixed(1).replace(/\.0+$/, '') + '万';
            return Math.round(num / 1e4, 10) + '万';
        }
        else {
            return (num / 1e8).toFixed(1).replace(/\.0+$/, '') + '亿';
        }
    }

    return {
        timeSince : timeSince,
        getParam : getParam,
        format: format,
        formatBigNumber: formatBigNumber
    }
});
