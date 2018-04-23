/**
 * @file 预渲染
 * @author xuexb <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var hash = require('./hash');
    var Messenger = require('./utils/messenger');
    var isPreRender = !!hash.get('prerender');
    var event = new Messenger({
    });

    return function (name, callback) {
        if (!isPreRender) {
            return callback();
        }

        event.once(name, callback);
    };
});
