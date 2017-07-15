/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Saucelabs 浏览器信息配置文件
 */

module.exports = {
    // mobile
    sl_ios_safari_10: {
      base: 'SauceLabs',
      browserName: 'iphone',
      version: '10.3'
    }
    sl_android_6_0: {
      base: 'SauceLabs',
      browserName: 'android',
      version: '6.0'
    },

    // the cool kids
    sl_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox'
    },
    sl_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
    }

    // ie family
    // sl_ie_10: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8',
    //     version: '10'
    // },
    // sl_ie_11: {
    //     base: 'SauceLabs',
    //     browserName: 'internet explorer',
    //     platform: 'Windows 8.1',
    //     version: '11'
    // },
}
