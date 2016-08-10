/**
 *  资源管理
 **/
define(['./util', './components/document', 'viewport', './components/rect'], function (util, doc, viewport, rect) {
    var resources = {};
    var counter = 0;
    var fn = util.fn;

    var hasNextNode = function(element) {
        do {
            if (element.nextSibling) {
                return true;
            }
        } while (element = element.parentNode);
        return false;
    }


    var Resources = function () {
        // resource id
        this._rid = counter ++;
        
        // element id
        this._eid = 0;

        // add to resources
        resources[this._rid] = [];

        var  update = this._update.bind(this);
        this.updateState = fn.throttle(update);

        this._viewport = viewport;
        this._holdReadyList = [];
        this._bind();
    };

    Resources.prototype = {
        _bind: function () {
            var self = this;
            this._viewport.onChanged(function () {
                self._update();
            });

            this._viewport.onScroll(function () {
                self._scrollTime = Date.now();
            });

            doc.ready(function () {
                self._ready = true;
                self._runBuild();
                self._update();
            });
        },
        // 元素加入列表
        add: function (element) {
            element._eid = this._eid ++;
            resources[this._rid][element._eid] = element;
            if (this._ready) {
                element.build();
                this.updateState();
            } else if (!element.isBuilt()) {
                this._holdReadyList.push(element);
                this._runBuild();
            }
        },
        // 从列表中移除元素
        remove: function (element/* or id */) {
            var id = element._eid || element;
            if (Number.isFinite(+id) && resources[this._rid][id]) {
                delete resources[this._rid][id];
                return true;
            } else {
                return false;
            }
        },
        getSources: function () {
            return resources[this._rid];
        },
        getSourcesList: function () {
            return fn.values(this.getSources());
        },
        setInViewport: function (element, inViewport) {
            if (element.inViewport() == inViewport) {
                return;
            } else {
                element.viewportCallback(inViewport);
            }
        },
        // 批量执行元素的 build
        _runBuild: function () {
            if (this._building) {
                return;
            }
            this._building = true;
            try {
                for (var i = 0; i < this._holdReadyList.length; i++) {
                    var element = this._holdReadyList[i];
                    if (this._ready && hasNextNode(element)) {
                        this._holdReadyList.splice(i--, 1);
                        element.build();
                    }
                }
            } finally {
                this._building = false;
            }
        },
        _update: function () {
            var resources = this.getSources();
            var viewportRect = this._viewport.getRect();
            for (var i in resources) {
                var inViewport = rect.overlapping(rect.getFromDom(resources[i]), viewportRect);
                this.setInViewport(resources[i], inViewport);
            }
        }
    };

    var _resources; 
    return function (resources) {
        return _resources || (_resources = new Resources());
    };
});
