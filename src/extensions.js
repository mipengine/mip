/**
 * @file 管理 MIP 组件运行周期
 * @author MIP <mip-support@baidu.com>
 */

define(function (require) {
    'use strict';

    var templates = require('./templates');
    var registerElement = require('./element');
    var cssLoader = require('./dom/css-loader');
    var extensions = window.extensions = {};

    /**
     * 缓存的样式和脚本，在执行 exec(type) 后会清空，后续再 MIP.push 时将直接执行
     *
     * @type {Object}
     */
    extensions.cache = {
        js: [],
        css: []
    };

    /**
     * 注入 MIP.push 并执行组件回调
     */
    extensions.init = function () {
        // 拦截注册元素
        window.MIP.registerMipElement = function (name, customClass, css) {
            if (templates.isTemplateClass(customClass)) {
                return templates.register(name, customClass);
            }

            // 注入拆分加载，否则直接加载
            if (css && extensions.cache.css) {
                extensions.cache.css.push({
                    name: name,
                    css: css
                });
            }
            else if (css) {
                cssLoader.insertStyleElement(document, document.head, css, name, false);
            }

            // 注入拆分加载，否则直接加载
            if (extensions.cache.js) {
                extensions.cache.js.push({
                    name: name,
                    customClass: customClass
                });
            }
            else {
                registerElement(name, customClass);
            }
        };

        // 加载 mip.js 前的组件
        if (MIP.extensions.length) {
            MIP.extensions.forEach(function (ext) {
                if (ext && 'function' === typeof ext.func) {
                    ext.func();
                    ext.loaded = true;
                }
            });
            delete MIP.extensions;
        }

        // 拦截组件回调
        MIP.push = function (ext) {
            if (ext && 'function' === typeof ext.func) {
                ext.func();
            }
        };
    };

    /**
     * 执行组件分区代码，执行完毕后清空缓存，下次组件再执行则切换为直接加载
     *
     * @param  {string} type 类型，js、css
     */
    extensions.exec = function (type) {
        if (type === 'css' && extensions.cache.css) {
            extensions.cache.css.forEach(function (data) {
                cssLoader.insertStyleElement(document, document.head, data.css, data.name, false);
            });
            extensions.cache.css = null;
        }
        else if (type === 'js' && extensions.cache.js) {
            extensions.cache.js.forEach(function (data) {
                registerElement(data.name, data.customClass);
            });

            extensions.cache.js = null;
        }

    };

    return extensions;
});
