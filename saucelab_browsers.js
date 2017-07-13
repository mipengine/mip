/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Saucelabs 浏览器信息配置文件
 */

module.exports = {
    "SL_Chrome": {
        base: "SauceLabs",
        browserName: "Chrome",
        platform: "Windows 8.1"
    },
    "SL_Firefox": {
        base: "SauceLabs",
        browserName: "Firefox",
        platform: "Windows 8.1"
    },
    "SL_IE_9": {
        base: "SauceLabs",
        browserName: "Internet Explorer",
        platform: "Windows 7",
        version: "9"
    },
    "SL_Safari_5": {
        base: "SauceLabs",
        browserName: "Safari",
        platform: "OS X 10.6",
        version: "5"
    }
}