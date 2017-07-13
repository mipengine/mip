/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Saucelabs 浏览器信息配置文件
 */

module.exports = {
    // the cool kids
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7'
    },
    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    sl_mac_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.10'
    },
    // ie family
    sl_ie_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
    },
    sl_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: '10'
    },
    sl_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    // mobile
    sl_ios_safari_9: {
        base: 'SauceLabs',
        browserName: 'iphone',
        version: '10.3'
    },
    sl_android_6_0: {
        base: 'SauceLabs',
        browserName: 'android',
        version: '6.0'
    }
}