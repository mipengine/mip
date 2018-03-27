/**
 * @file MIP 主入口
 * @author MIP <mip-support@baidu.com>
 */

define(function (require) {
    'use strict';

    console.time('mip.js');

    // 稳定性监控
    require('./log/monitor');

    // 前置依赖
    var performance = require('./performance');
    var viewer = require('./viewer');
    var prerender = require('./prerender');
    var extensions = require('./extensions');
    var dom = require('./dom/dom');

    // 资源监控
    performance.start(window._mipStartTiming);
    performance.on('update', function (timing) {
        viewer.sendMessage('performance_update', timing);
    });

    // 初始化组件注入
    extensions.init();

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

        // 加载核心组件，不分 CSS 样式和组件 JS
        prerender('components.core', function () {
            console.time('components.core');

            require('./components/index').register();

            console.timeEnd('components.core');
        });

        // 加载扩展组件 CSS 样式
        prerender('components.css', function () {
            console.time('components.css');

            extensions.exec('css');

            console.timeEnd('components.css');
        });

        // 注册扩展组件 JS
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

            console.timeEnd('render.after');
        });

        console.timeEnd('mip.js');
    });

    return MIP;
});
