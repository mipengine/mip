/**
 * @file MIP 组件处理
 * @author MIP <mip-support@baidu.com>
 */

define(function (require) {
    'use strict';

    var templates = require('./templates');
    var registerElement = require('./element');
    var cssLoader = require('./dom/css-loader');
    var extensions = {};

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
     * 注入 MIP.push
     */
    extensions.init = function () {
        // 已经初始化
        if (window.MIP && (MIP.extensions || MIP.registerMipElement)) {
            return;
        }

        window.MIP = {
            extensions: window.MIP || [],
            push: function (ext) {
                MIP.extensions.push(ext);
            },
            registerMipElement: function (name, customClass, css) {
                if (templates.isTemplateClass(customClass)) {
                    return templates.register(name, customClass);
                }

                // 如果有组件样式分步加载
                if (extensions.cache.css && css) {
                    extensions.cache.css.push({
                        name: name,
                        css: css
                    });
                }
                else if (css) {
                    cssLoader.insertStyleElement(document, document.head, css, name, false);
                }

                // 如果有组件代码分步加载
                if (extensions.cache.js) {
                    extensions.cache.js.push({
                        name: name,
                        customClass: customClass
                    });
                }
                else {
                    registerElement(name, customClass);
                }
            }
        };
    };

    /**
     * 执行组件分区代码
     *
     * @param  {string} type 类型，js、css
     */
    extensions.exec = function (type) {
        // 拦截 MIP.push
        if (window.MIP && MIP.extensions) {
            MIP.extensions.forEach(function (ext) {
                if (ext && 'function' === typeof ext.func) {
                    ext.func();
                }
            });
            MIP.push = function (ext) {
                if (ext && 'function' === typeof ext.func) {
                    ext.func();
                }
            };
            delete MIP.extensions;
        }

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
