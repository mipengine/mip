
(function() {

    var mergeTransition = function(params) {
        var transition = params.name || 'all';

        transition += ' ' + (params.duration || 1000) / 1000 + 's';
        transition += ' ' + (params.ease || 'ease');

        return transition;
    }

    jQuery.fn.createTween = function(start, end, params, callback) {
        var $this = this;
        var transition = mergeTransition(params);
        var transitionEnd = 'webkitTransitionEnd.feed';

        $this.css('transition', 'none').css(start);
        $this[0].getBoundingClientRect();
        setTimeout(function() {
            $this.css('transition', transition).css(end);
        }, params.delay || 0);

        $this.off(transitionEnd).on(transitionEnd, function(e) {
            if (e.target === this) {
                $this.off(transitionEnd);
                $this.css('transition', 'none');
                callback && callback();
            }
        });
    }
})();

