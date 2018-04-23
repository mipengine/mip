/**
 * @file MIP 主入口
 * @author MIP <mip-support@baidu.com>
 */

define(function (require) {
    'use strict';

    console.time('mip.js');

    // 前置依赖
    var performance = require('./performance');
    var viewer = require('./viewer');
    var prerender = require('./prerender');
    var extensions = require('./extensions');
    var dom = require('./dom/dom');

    // 资源监控，viewer.show 时用到
    performance.start(window._mipStartTiming);
    performance.on('update', function (timing) {
        viewer.sendMessage('performance_update', timing);
    });

    /**
     * 提前拦截，下面需要向 window.MIP 空间注入方法
     *
     * @type {Object}
     */
    window.MIP = {
        extensions: window.MIP || [],
        push: function (ext) {
            MIP.extensions.push(ext);
        }
    };

    // 注入依赖
    MIP.prerenderElement = require('./resources').prerenderElement;
    MIP.hash = require('./hash');

    dom.waitDocumentReady(function () {
        // 初始化页面组件的 layout
        prerender('layout.init', function () {
            console.time('layout.init');

            require('./fixed-element');
            require('./layout').init();

            console.timeEnd('layout.init');
        });

        // 加载视图
        prerender('viewer.init', function () {
            console.time('viewer.init');

            viewer.init();

            console.timeEnd('viewer.init');
        });

        // 加载核心组件 JS ，样式统一打包在 mip.css 中
        prerender('components.core', function () {
            console.time('components.core');

            require('./components/index').register();

            console.timeEnd('components.core');
        });

        // 初始化组件执行环境
        prerender('components.init', function () {
            console.time('components.init');

            // 初始化组件注入
            extensions.init();

            console.timeEnd('components.init');
        });

        // 加载扩展组件 CSS 样式
        prerender('components.css', function () {
            console.time('components.css');

            extensions.exec('css');

            console.timeEnd('components.css');
        });

        // 加载扩展组件 JS
        prerender('components.js', function () {
            console.time('components.js');

            extensions.exec('js');

            console.timeEnd('components.js');
        });

        // 显示视图
        prerender('viewer.show', function () {
            console.time('viewer.show');

            viewer.show();

            console.timeEnd('viewer.show');
        });

        // 渲染后置处理
        prerender('render.after', function () {
            console.time('render.after');

            // 清理缓存
            var CustomStorage = require('./utils/customStorage');
            new CustomStorage(2).delExceedCookie();

            // 定制化清理
            require('./sleepWakeModule').init();

            // 稳定性监控
            require('./log/monitor');

            // 引入其他依赖，因为 zepto,fetch 只要被 require 一次，全局$就会存在，为了保证使用无diff，这里优先 require 下
            require('zepto');
            require('fetch-jsonp');
            require('fetch');

            console.timeEnd('render.after');
        });

        console.timeEnd('mip.js');
    });

    return MIP;
});
