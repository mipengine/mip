define(function (require) {
    'use strict';

    /**
     * The mip viewer.Complement native viewer, and solve the page-level problems.
     */
    function SleepWakeModule() {
        this._domObj = {};
        this._isAlreadyWake = {};
    }

    /**
     * The initialise method of sleepWakeModule
     */
    SleepWakeModule.prototype.init = function () {
        var confCon = '';
        try {
            var moduleConf = document.querySelector('#mip-sleep-wake-module');
            confCon = JSON.parse(moduleConf.textContent);
        }
        catch (e) {
            console.warn('json is illegal'); // eslint-disable-line
            console.warn(e); // eslint-disable-line
            return;
        }
        if (!confCon) {
            return;
        }
        this._initConf('||', confCon);
        // init
        for (var key in confCon) {
            this._stateChange(key, true);
        }
        
    }

    /**
     * init page conf.
     * @param {string} split
     * @param {Object} confContent
     */
    SleepWakeModule.prototype._initConf = function (split, confContent) {
        // default value
        split = split || '||';
        for (var key in confContent) {
            var val = confContent[key];
            var valList = val.split(split);
            var len = valList.length;
            this._domObj[key] = [];
            for (var i = 0; i < len; i++) {
                try {
                    var idx = i;
                    var sleepDom = document.querySelector(valList[i]);
                    var domInfo = {
                        par: sleepDom.parentNode,
                        cln: 'mip-sleep-wake-textarea-' + key + '-' + idx
                    }
                    sleepDom.setAttribute('data-cln', domInfo.cln);
                    this._domObj[key].push(domInfo);
                }
                catch (e) {
                    continue;
                }
            }
            
        }
    }

    /**
     * wake the doms which are sleeped in conf by key
     * @param {string} key
     */
    SleepWakeModule.prototype.wake = function (key) {
        this._stateChange(key);
        this._close(key);
    }

    /**
     * reset the stutas of doms by the key
     * @param {string} key
     */
    SleepWakeModule.prototype.reset = function (key) {
        this._isAlreadyWake[key] = 0;
    }

    /**
     * close the operation of doms by the key
     * @param {string} key
     */
    SleepWakeModule.prototype._close = function (key) {
        this._isAlreadyWake[key] = 1;
    }

    /**
     * change the status of doms by paras[key, isSleep]
     * @param {string} key
     * @param {Boolean} isSleep
     */
    SleepWakeModule.prototype._stateChange = function (key, isSleep) {
        if (!key) {
            return;
        }
        var domList = this._domObj[key];
        if (!domList) {
            return;
        }
        var len = domList.length;
        if (len < 1) {
            return;
        }
        for (var i = 0; i < len; i++) {
            var sleepDom = domList[i];
            if (isSleep && !this._isAlreadyWake[key]) {
                var self = (sleepDom.par && sleepDom.cln) ? sleepDom.par.querySelector('[data-cln=' + sleepDom.cln + ']') : null;
                var parent = sleepDom.par;
                var tmpTextArea = document.createElement('textarea');
                var idx = i;
                if (self && self.tagName.toLowerCase() === ('textarea')){
                    continue;
                }
                if (!self) {
                    continue;
                }
                tmpTextArea.textContent = self.outerHTML;
                tmpTextArea.style.display = 'none';
                tmpTextArea.setAttribute('data-cln', sleepDom.cln);

                self.outerHTML = tmpTextArea.outerHTML;
            }
            if (!isSleep  && !this._isAlreadyWake[key]) {
                var par = sleepDom.par;
                if (par) {
                    var tmpdom = par.querySelector('[data-cln=' + sleepDom.cln + ']');
                    if (tmpdom && tmpdom.tagName.toLowerCase() === ('textarea')){
                        tmpdom.outerHTML = tmpdom.textContent;
                    }
                }
            }
        }
    }

    return new SleepWakeModule();
});

