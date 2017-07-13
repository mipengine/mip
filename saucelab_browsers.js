/*
 * @author wupeng(wupeng10@baidu.com)
 * @file Saucelabs 浏览器信息配置文件
 */

module.exports = {
    'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '51'
    },
    'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '47'
    },
    'SL_Safari_8': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.10',
        version: '8'
    },
    'SL_Safari_9': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.11',
        version: '9'
    },
    'SL_IE_9': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2008',
        version: '9'
    },
    'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 2012',
        version: '10'
    },
    'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    'SL_EDGE': {
        base: 'SauceLabs',
        browserName: 'microsoftedge',
        platform: 'Windows 10',
        version: '14'
    },
    'SL_iOS': {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.10',
        version: '8.1'
    }
}