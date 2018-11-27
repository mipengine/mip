/**
 * @file client-prerender.js 在浏览器端预渲染
 * @author liwenqian (liwenqian@baidu.com)
 */
define(function (require) {
    'use strict';

    var hash = require('./hash');
    var fn = require('./utils/fn'); 
    var Messager = require('./messager');
    var MESSAGE_PAGE_ACTIVE = 'page-active';
    var MESSAGE_PRERENDER_INTERACTIVE = 'prerender-interactive';

    /**
     * ClientPrerender
     *
     * @class
     */
    function ClientPrerender() {
        // 预渲染环境标记, 是否是预渲染状态
        this.isPrerendering = false;

        // 是否执行过预渲染
        this.isPrerendered = false;

        // 延迟执行的的函数队列
        this.queue = [];

        // 外层通信
        this.messager = new Messager({
            name: fn.getRootName(window.name)
        });

        this.init();
    }

    ClientPrerender.prototype.init = function () {
        var self = this;
        if (hash.get('prerender') === '1') {
            this.isPrerendering = true;
            new Promise(function (resolve, reject) {
                // set client prerender event
                self.messager.on(MESSAGE_PAGE_ACTIVE, function () {
                    self.isPrerendering = false;
                    resetPrerenderHash();
                    resolve();
                });
                // can interact with container
                self.messager.sendMessage(MESSAGE_PRERENDER_INTERACTIVE, {
                    time: Date.now()
                });
            }).then(function () {
                self.isPrerendered = true;
                // firstscreen show
                var performance = require('./performance');
                performance.recordTiming('MIPPageShow');
                performance.lockFirstScreen();
                performance.recordTiming('MIPElementBuildStart');
                var fn;
                while ((fn = self.queue.shift())) {
                    fn();
                }
            }).then(function () {
                require('./performance').recordTiming('MIPElementBuildEnd');
            }).catch(function (error) {
                throw(error);
            })
        }
    };

    ClientPrerender.prototype.execute = function (fn, ele) {
        if (this.isPrerendering && !parsePrerender(ele)) {
            this.queue.push(fn);
        }
        else {
            fn();
        }
    };

    function resetPrerenderHash() {
        var location = window.location;
        var hash = location.hash.replace(/prerender=1&?/, '');
        window.history.replaceState(
            '', document.title,
            location.pathname + location.search + hash
        );
    }

    function parsePrerender(element) {
        if (!element || !element.getAttribute) {
            return false;
        }
        var prerender = element.getAttribute('prerender');
        var firstScreen = element.getAttribute('firstscreen');
        if (firstScreen) {
            element.viewportCallback && element.viewportCallback(true);            
        }

        return firstScreen != null || prerender != null && prerender !== 'false';
    }

    return new ClientPrerender();
});
