define(function (require) {
    'use strict';

    var EventEmitter = require('src/util/event-emitter');

    var emitter = new EventEmitter({
        createEventCallback: function (name) {
            if (!this.created) {
                this.created = {};
            }
            this.created[name] = true;
        },
        removeEventCallback: function (name) {
            if (!this.removed) {
                this.removed = {};
            }
            this.removed[name] = true
        }
    });

    describe('event-emitter', function () {
        it('single', function () {
            emitter.on('single', function (data) {
                this.data = data;
            });
            emitter.trigger('single', 'test');
            emitter.off();

            emitter.once('once', function () {
                if (!this.count) {
                    this.count = 0;
                }
                this.count ++;
            });
            emitter.trigger('once');
            emitter.trigger('once');

            expect(emitter.data).to.equal('test');
            expect(emitter.created['single']).to.be.true;
            expect(emitter.removed['single']).to.be.true;
            expect(emitter.count).to.equal(1);


            emitter.off_test = 0;
            var handler = function () {
                this.off_test += 100;
            };
            emitter.on('off_test', function () {
                this.off_test += 1;
            });
            emitter.on('off_test', handler);

            emitter.off('off_test', handler);
            emitter.trigger('off_test');
            expect(emitter.off_test).to.equal(1);

            var offOnce = emitter.once('once_off_test', function () {
                this.once_off_test = true;
            });
            offOnce();
            emitter.trigger('once_off_test');
            expect(emitter.once_off_test).to.be.undefined;
        });

        it('multi', function () {
            emitter.multi = '';
            emitter.on('a b c', function (name) {
                this.multi += name;
            });
            emitter.trigger('a', 'a');
            emitter.trigger('c', 'c');
            emitter.trigger('b c', 'bc');

            emitter.off('a b');
            emitter.count = 0;
            emitter.once('once_a once_b', function () {
                this.count ++;
            });
            emitter.trigger('once_a once_b');
            emitter.trigger('once_a once_b');

            expect(emitter.multi).to.equal('acbcbc');
            expect(emitter.removed['a']).to.be.true;
            expect(emitter.removed['b']).to.be.true;
            expect(emitter.count).to.equal(2);
        });

    })
});