define(function (require) {
    'use strict';

    var index = require('components/index');
    // insert mip.js for extensions in order to keep life cycle running
    var ele = document.createElement('script');
    ele.src = 'https://mipcache.bdstatic.com/static/v1/mip.js';
    document.body.appendChild(ele);

    describe('components entry', function () {
        it('register', function(done){
        	index.register();
        	done();
        });
    });
});