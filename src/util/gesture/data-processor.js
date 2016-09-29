define(function () {
    'use strict';
    var round = Math.round;
    var max = Math.max;
    var abs = Math.abs;

    // Data processor of touch event object.
    var dataProcessor = {
        startCenter: null,
        lastCenter: null,
        startTime: null,
        process: function (event, preventX, preventY) {
            var data = {};
            var now = Date.now();
            var touches = event.touches.length ? event.touches : event.changedTouches;
            if (event.type === 'touchstart') {
                this.startCenter = this.getCenter(touches);
                this.startTime = now;
                this.startData = data;
                this.preData = null;
            }
            var startCenter = this.startCenter;
            var center = this.getCenter(touches);
            var deltaTime = data.deltaTime = now - this.startTime;

            data.pointers = touches;

            data.x = center.x;
            data.y = center.y;

            var deltaX = data.deltaX = center.x - startCenter.x;
            var deltaY = data.deltaY = center.y - startCenter.y;

            data.velocityX = deltaX / deltaTime || 0;
            data.velocityY = deltaY / deltaTime || 0;
            data.velocity = max(abs(data.velocityX), abs(data.velocityY));
            data.angle = this.getAngle(startCenter, center);
            data.distance = this.getDistance(startCenter, center);
            data.direction = this.getDirection(deltaX, deltaY);
            data.eventState = event.type.replace('touch', '');
            data.timeStamp = now;

            if (this.preData) {
                var instTime = data.instantDeltaTime = now - this.preData.timeStamp;
                var instX = data.instantVelocityX = (data.x - this.preData.x) / instTime || 0;
                var instY = data.instantVelocityY = (data.y - this.preData.y) / instTime || 0;
                if (data.eventState === 'move' && (preventX || preventY)) {
                    var curDirection = abs(instX) > abs(instY);
                    if ((preventX && curDirection) || (preventY && !curDirection)) {
                        event.preventDefault();
                    }
                }
            } else {
                data.instantDeltaTime = data.instantVelocityX = data.instantVelocityY = 0;
            }

            this.preData = data;

            data.event = event;
            return Object.freeze(data);
        },
        getCenter: function (points) {
            return {
                x: round(points[0].clientX),
                y: round(points[0].clientY)
            }
        },
        getAngle: function (point1, point2) {
            return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
        },
        getDistance: function (point1, point2) {
            var x = point2.x - point1.x;
            var y = point2.y - point1.y
            return Math.sqrt(x * x + y * y);
        },
        /**
         * 0: origin
         * 1: up
         * 2: right
         * 3: down
         * 4: left
         */
        getDirection: function (x, y) {
            if (x === y) {
                return 0;
            }
            if (abs(x) >= abs(y)) {
                return x > 0 ? 2 : 4;
            }
            return y < 0 ? 1 : 3;
        }
    };

    return dataProcessor;
});
