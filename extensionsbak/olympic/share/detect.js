/**
 * @file detect
 * @根据ua判断操作系统、浏览器、版本号
 * @author yangfan16
 */

define(function () {

    // 获取ua并转换为小写
    var UA = navigator.userAgent.toLowerCase();

    /*
     * return {ios:''} || {android:''}
     */
    function getOS () {
        if (!UA) {
            return;
        }

        var OS,
            version = '';

        // 优先使用zepto方法,否则通过ua匹配
        if ($ && $.os) {
            if ($.os.ios) {
                OS = 'ios';
            } else if ($.os.android) {
                OS = 'android';
            }
        } else {
            if ((UA.indexOf('iphone') > -1 || UA.indexOf('ipod') > -1)) {
                OS = 'ios';
            } else {
                OS = 'android';
            }
        }

        return {
            n: OS,
            v: version
        };
    }

    /*
     * return {zbios:''} || 
     *        {bmbadr:'4.1.0.332'} || 
     *        {qq:'6.7.2'} || 
     *        {wechat:''} || 
     *        {uc:'10.9.17.807'} || 
     *        {sogou:'4.5.0'} || 
     *        {chrome:'51.0.2704.104'} || 
     *        {other:''}
     */
    function getBrowser () {
        if (!UA) {
            return;
        }
        var browser,
            version = '';

        if (UA.indexOf('baiduboxapp/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13f69 baiduboxapp/0_0.0.3.7_enohpi_6433_046/2.3.9_2c2%256enohpi/1099a/a303ae3a9fe88283cc14cc84c7e55b3630c7a4ca6fcnnddartd/1
            browser = 'zbios';
        } else if (UA.indexOf('baidubrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) version/9.3 mobile/13f69 safari/600.1.4 baidubrowser/4.1.0.332 (baidu; p29.3.2)
            browser = 'bmbadr';
            version = UA.match(/baidubrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('mqqbrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone 5sglobal; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) version/6.0 mqqbrowser/6.7.2 mobile/13f69 safari/8536.25 mttcustomua/2
            browser = 'qq';
            version = UA.match(/mqqbrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('micromessenger/') != -1) {
            browser = 'wechat';
            version = UA.match(/micromessenger\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('ucbrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x; zh-cn) applewebkit/537.51.1 (khtml, like gecko) mobile/13f69 ucbrowser/10.9.17.807 mobile
            browser = 'uc';
            version = UA.match(/ucbrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('sogoumobilebrowser/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1.46 (khtml, like gecko) mobile/13f69 sogoumobilebrowser/4.5.0
            browser = 'sogou';
            version = UA.match(/sogoumobilebrowser\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else if (UA.indexOf('crios/') != -1) {
            // ios e.g. = mozilla/5.0 (iphone; cpu iphone os 9_3_2 like mac os x) applewebkit/601.1 (khtml, like gecko) crios/51.0.2704.104 mobile/13f69 safari/601.1.46
            // android e.g. = mozilla/5.0 (linux; android 5.1.1; yq601 build/lmy47v) applewebkit/537.36 (khtml, like gecko) chrome/47.0.2526.83 mobile safari/537.36
            browser = 'chrome';
            version = UA.match(/crios\/([\d\.]*)/);
            version = version && version[1] ? version[1] : '';
        } else {
            browser = 'other';
        }

        return {
            n: browser,
            v: version
        };
    }

    return {
        os:      getOS(),
        browser: getBrowser()
    };
});