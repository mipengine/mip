/**
 * @file: index.js
 * @author: yanglei07
 * @description ..
 * @create data:   2016-10-10 11:19:25
 * @last modified by:   yanglei07
 * @last modified time: 2016-10-26 18:03:33
 */
/* global Vue, _, yog */

__inline('./lib/video.js');
__inline('./lib/videojs-contrib-hls.js');
__inline('./lib/os.js');

__inline('./mediator.js');
__inline('./tpl-data.js');
__inline('./util.js');

__inline('./player.js');
__inline('./tab.js');
__inline('./catalog.js');
__inline('./share.js');
__inline('./downapp.js');
__inline('./hot.js');
__inline('./details.js');
__inline('./comments.js');


define(function (require) {
    var $ = require('zepto');
    var mediator = require('./mediator');

    return function () {
        var $win = $(window);

        require('./player')();
        require('./tab')();
        require('./catalog')();
        require('./share')();
        require('./downapp')();
        require('./hot')();
        require('./details')();
        require('./comments')();



        $win.on('scroll', function (e) {
            mediator.trigger('window-scroll', e);
        });

        $('#trial-end').on('click', function () {
            $(this).hide();
        });
        $('#play-end, #play-close').on('click', function () {
            $('#play-end').hide();
        });
        $('#trial-next').on('click', function () {
            mediator.trigger('trial-next');
        });
    };
});
