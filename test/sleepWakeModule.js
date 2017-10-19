/**
 * @file sleepWakeModule test case
 * @author xuexb <fe.xiaowu@gmail.com>
 */

/* global sinon */
/* eslint-disable max-nested-callbacks */

define(function (require) {
    'use strict';

    var sleepWakeModule = require('sleepWakeModule');
    var util = require('util');

    var createNode = function (str, parent) {
        var node = util.dom.create(str);
        return (parent || document.body).appendChild(node);
    };

    var removeNode = function () {
        var node = document.querySelector('#mip-sleep-wake-module');
        if (node && node.parentNode) {
            node.parentNode.removeChild(node);
        }
    };

    describe('sleepWakeModule', function () {
        afterEach(removeNode);
        beforeEach(removeNode);

        describe('.init', function () {
            it('element does not exist', function () {
                expect(document.querySelector('#mip-sleep-wake-module')).to.be.null;
                expect(sleepWakeModule.init()).to.be.undefined;
            });

            it('JSON parse error', function () {
                createNode('<script id="mip-sleep-wake-module" type="application/json">{error}</script>');
                expect(document.querySelector('#mip-sleep-wake-module')).to.not.be.null;
                expect(sleepWakeModule.init()).to.be.undefined;
            });

            it('empty data', function () {
                createNode('<script id="mip-sleep-wake-module" type="application/json">null</script>');
                expect(document.querySelector('#mip-sleep-wake-module')).to.not.be.null;
                expect(sleepWakeModule.init()).to.be.undefined;
            });

            it('success', function () {
                var data = {
                    mip: '.cl||#id'
                };
                var initConf = sinon.spy(sleepWakeModule, '_initConf');
                var stateChange = sinon.spy(sleepWakeModule, '_stateChange');

                createNode([
                    '<script id="mip-sleep-wake-module" type="application/json">' + JSON.stringify(data) + '</script>'
                ].join(''));

                sleepWakeModule.init();

                // reset
                initConf.restore();
                stateChange.restore();

                expect(initConf).to.have.been.calledOnce;
                expect(initConf).to.have.been.calledWith('||', data);
                expect(stateChange).to.have.been.calledOnce;
                expect(stateChange).to.have.been.calledWith('mip', true);
            });
        });

        describe('._initConf', function () {
            it('error params', function () {
                expect(sleepWakeModule._initConf()).to.be.undefined;
                expect(sleepWakeModule._initConf(null, {})).to.be.undefined;
            });

            it('error selector', function () {
                var key = 'test-error-selector-' + Date.now();
                var data = {};
                data[key] = '.error-class|#error-id';

                expect(sleepWakeModule._domObj[key]).to.be.undefined;
                expect(sleepWakeModule._initConf('|', data)).to.be.undefined;
                expect(sleepWakeModule._domObj[key]).to.be.a('array').and.be.empty;

                delete sleepWakeModule._domObj[key];
            });

            it('success', function () {
                var span = createNode('<span class="test-success-span">span</span>');
                var div = createNode('<div id="test-success-id">span</div>');
                var key = 'test-success-' + Date.now();
                var data = {};
                data[key] = '.test-success-span|#test-success-id';

                expect(sleepWakeModule._domObj[key]).to.be.undefined;
                expect(sleepWakeModule._initConf('|', data)).to.be.undefined;
                expect(sleepWakeModule._domObj[key]).to.be.a('array').and.have.lengthOf(2);

                // validate attr class
                expect(span.getAttribute('data-cln')).to.equal(sleepWakeModule._domObj[key][0].cln);
                expect(div.getAttribute('data-cln')).to.equal(sleepWakeModule._domObj[key][1].cln);

                // validate parentNode
                expect(sleepWakeModule._domObj[key][0].par).to.equal(document.body);
                expect(sleepWakeModule._domObj[key][1].par).to.equal(document.body);
            });
        });

        describe('._stateChange', function () {
            it('error params', function () {
                expect(sleepWakeModule._stateChange()).to.be.undefined;
            });

            it('key does not exist', function () {
                expect(sleepWakeModule._stateChange('key-not')).to.be.undefined;

                var key = 'test-sleepWakeModule-element-not';
                sleepWakeModule._domObj[key] = [];

                expect(sleepWakeModule._stateChange(key)).to.be.undefined;

                delete sleepWakeModule._domObj[key];
            });

            it('element does not exist', function () {
                var key = 'test-sleepWakeModule-isSleep-not';
                var data = {
                    cln: 'test-isSleep-error',
                    par: document.body
                };

                sleepWakeModule._domObj[key] = [data];
                sleepWakeModule._stateChange(key, true);
                delete sleepWakeModule._domObj[key];

                expect(document.body.querySelector('[data-cln="' + data.cln + '"]')).to.be.null;
            });

            describe('isSleep is true', function () {
                it('error selector', function () {
                    var key = 'test-sleepWakeModule-isSleep-true-error';
                    var data = [
                        {
                            cln: 'test-isSleep-true-error',
                            par: document.body
                        },
                        {
                            par: document.body
                        },
                        {
                            cln: 'classname'
                        }
                    ];

                    sleepWakeModule._domObj[key] = data;
                    expect(sleepWakeModule._stateChange(key, true)).to.be.undefined;
                    delete sleepWakeModule._domObj[key];
                });

                it('div', function () {
                    var key = 'test-sleepWakeModule-isSleep-true';
                    var data = {
                        cln: 'test-isSleep-true',
                        par: document.body
                    };
                    createNode('<div data-cln="' + data.cln + '"><span></span></div>');

                    var node = document.body.querySelector('[data-cln="' + data.cln + '"]');
                    expect(node.querySelector('span')).to.not.be.null;
                    expect(node.tagName.toLowerCase()).to.equal('div');

                    sleepWakeModule._domObj[key] = [data];
                    sleepWakeModule._stateChange(key, true);
                    delete sleepWakeModule._domObj[key];

                    node = document.body.querySelector('[data-cln="' + data.cln + '"]');
                    expect(node.querySelector('span')).to.be.null;
                    expect(node.tagName.toLowerCase()).to.equal('textarea');
                });

                it('textarea', function () {
                    var key = 'test-sleepWakeModule-isSleep-true-textarea';
                    var data = {
                        cln: 'test-isSleep-true',
                        par: document.body
                    };
                    createNode('<textarea data-cln="' + data.cln + '"><span></span></textarea>');

                    sleepWakeModule._domObj[key] = [data];
                    sleepWakeModule._stateChange(key, true);
                    delete sleepWakeModule._domObj[key];

                    var node = document.body.querySelector('[data-cln="' + data.cln + '"]');
                    expect(node.tagName.toLowerCase()).to.equal('textarea');
                });
            });

            describe('isSleep is false', function () {
                it('error selector', function () {
                    var key = 'test-sleepWakeModule-isSleep-false-error';
                    var data = [
                        {
                            cln: 'test-isSleep-false-error',
                            par: document.body
                        },
                        {
                            par: document.body
                        },
                        {
                            cln: 'classname'
                        }
                    ];

                    sleepWakeModule._domObj[key] = data;
                    expect(sleepWakeModule._stateChange(key)).to.be.undefined;
                    delete sleepWakeModule._domObj[key];
                });
                it('div', function () {
                    var key = 'test-sleepWakeModule-isSleep-false';
                    var data = {
                        cln: 'test-isSleep-false-div',
                        par: document.body
                    };

                    createNode('<div data-cln="' + data.cln + '"><span></span></div>');

                    sleepWakeModule._domObj[key] = [data];
                    sleepWakeModule._stateChange(key);
                    delete sleepWakeModule._domObj[key];

                    expect(document.body.querySelector('[data-cln="' + data.cln + '"]')).to.not.be.null;
                });

                it('textarea', function () {
                    var key = 'test-sleepWakeModule-isSleep-false-textarea';
                    var data = {
                        cln: 'test-isSleep-false-textarea',
                        par: document.body
                    };

                    createNode('<textarea data-cln="' + data.cln + '"><span></span></textarea>');

                    sleepWakeModule._domObj[key] = [data];
                    sleepWakeModule._stateChange(key);
                    delete sleepWakeModule._domObj[key];

                    expect(document.body.querySelector('[data-cln="' + data.cln + '"]')).to.be.null;
                });
            });
        });

        it('.wake', function () {
            var close = sinon.spy(sleepWakeModule, '_close');
            var stateChange = sinon.spy(sleepWakeModule, '_stateChange');

            sleepWakeModule.wake('MIP');

            // reset
            stateChange.restore();
            close.restore();

            expect(close).to.have.been.calledOnce;
            expect(close).to.have.been.calledWith('MIP');
            expect(stateChange).to.have.been.calledOnce;
            expect(stateChange).to.have.been.calledWith('MIP');
        });

        it('.reset', function () {
            var key = 'test-sleepWakeModule-reset';

            expect(sleepWakeModule._isAlreadyWake[key]).to.be.undefined;
            sleepWakeModule.reset(key);
            expect(sleepWakeModule._isAlreadyWake[key]).to.equal(0);

            delete sleepWakeModule._isAlreadyWake[key];
        });

        it('._close', function () {
            var key = 'test-sleepWakeModule-close';

            expect(sleepWakeModule._isAlreadyWake[key]).to.be.undefined;
            sleepWakeModule._close(key);
            expect(sleepWakeModule._isAlreadyWake[key]).to.equal(1);

            delete sleepWakeModule._isAlreadyWake[key];
        });
    });
});
/* eslint-enable max-nested-callbacks */
