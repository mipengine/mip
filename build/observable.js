define('observable', ['require'], function(require){
    function Observable(){
        this.handlers_ = []; 
    }

    /**
    * Adds the observer to this instance.
    * @param {function(TYPE)} handler Observer's handler.
    * @return {!Unlisten}
    */

    Observable.prototype.add = function(handler){
        var _this = this;
        this.handlers_.push(handler);
        return function () {
            _this.remove(handler);
        };
    }

    /**
    * Removes the observer from this instance.
    * @param {function(TYPE)} handler Observer's instance.
    */

    Observable.prototype.remove = function(handler){
        for (var i = 0; i < this.handlers_.length; i++) {
            if (handler == this.handlers_[i]) {
                this.handlers_.splice(i, 1);
                break;
            }
        }
    }
    /**
    * Fires an event. All observers are called.
    * @param {TYPE} event
    */

    Observable.prototype.fire = function(){
        var args = Array.prototype.slice.call(arguments);
        this.handlers_.forEach(function (handler) {
            handler.apply(null,args);
        });

    }
    /**
    * Returns number of handlers. Mostly needed for tests.
    * @return {number}
    */

    Observable.prototype.getHandlerCount = function(){

        return this.handlers_.length;
    }
    return new Observable();
});
