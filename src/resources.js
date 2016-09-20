define(['./util', 'viewport', './components/rect'], function (util, viewport, rect) {
    'use strict';

    // For storing the resources.
    var resources = {};
    var counter = 0;

    var fn = util.fn;

    /**
     * MIP Elements's controller. It's use to manage all the elements's custom life circle and
     * provide the overall interfaces of the MIP Elements.
     */
    var Resources = function () {
        // resource id
        this._rid = counter ++;
        
        // element id
        this._eid = 0;

        // add to resources
        resources[this._rid] = [];

        // Reduce the frequency of updating viewport state
        var update = this._update.bind(this);
        this.updateState = fn.throttle(update);

        this._viewport = viewport;
        this._bindEvent();
    };

    Resources.prototype = {
        _bindEvent: function () {
            var self = this;
            this._viewport.on('changed', function () {
                self.updateState();
            });
            this.updateState();
        },
        /**
         * Add an element for current object and update all the elements's state
         * @param {MIPElement} mip element
         */
        add: function (element) {
            element._eid = this._eid ++;
            resources[this._rid][element._eid] = element;
            element.build();
            this.updateState();
        },
        /**
         * Remove element from this
         * @param {MIPElement|string} mip element or _eid of element
         * @return {boolean} the removed state of element
         */
        remove: function (element/* or id */) {
            var id = element._eid || element;
            if (Number.isFinite(+id) && resources[this._rid][id]) {
                delete resources[this._rid][id];
                return true;
            } else {
                return false;
            }
        },
        /**
         * Return an object of resources.
         * @return {Array}
         */
        getResources: function () {
            return resources[this._rid];
        },
        /**
         * Return an array of resources.
         */
        getResourcesList: function () {
            return fn.values(this.getResources());
        },
        /**
         * Set an element's viewport state to TRUE or FALSE.
         * @param {MIPElement}
         * @param {boolean}
         */
        setInViewport: function (element, inViewport) {
            if (element.inViewport() !== inViewport) {
                element.viewportCallback(inViewport);
            }
        },
        /**
         * The real function for updating elements's viewport state.
         */
        _update: function () {
            var resources = this.getResources();
            var viewportRect = this._viewport.getRect();
            for (var i in resources) {
                // Compute the viewport state of current element.
                // If current element`s prerenderAllowed returns `true` always set the state to be `true`.
                var inViewport = resources[i].prerenderAllowed() || rect.overlapping(rect.getDomRect(resources[i]), viewportRect);
                this.setInViewport(resources[i], inViewport);
            }
        }
    };

    /**
     * Forced set the element's viewport state to be `true`.
     * @param {MIPElement}
     */
    Resources.prerenderElement = function (element) {
        if (element.inViewport && !element.inViewport()) {
            element.viewportCallback && element.viewportCallback(true);
        }
    };

    return Resources;
});
