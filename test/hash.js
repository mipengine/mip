
define(function (require) {
    'use strict';

    var hash = require('hash');
    function changeHash (hashStr) {
    	var stub = sinon.stub(hash, '_getHashRaw', function() {
    		return hashStr;
    	});
    }

    describe('hash', function () {
    	it('case: normal', function(){
    		var stub = sinon.stub(hash, '_getHashRaw', function() {
    			return "#word=123&eqid=321";
    		});
    		expect(hash.getHash('word')).to.be.equal('123');
    		expect(hash.getHash('eqid')).to.be.equal('321');
    		stub.restore();
    	});

		it('case: no key input', function(){
    		var stub = sinon.stub(hash, '_getHashRaw', function() {
    			return "#word=123&eqid=321";
    		});
    		expect(hash.getHash()).to.be.equal('');
    		stub.restore();
    	});

    	it('case: no such key', function(){
    		var stub = sinon.stub(hash, '_getHashRaw', function() {
    			return "#word=123&eqid=321";
    		});
    		expect(hash.getHash('aaaaa')).to.be.equal('');
    		stub.restore();
    	});

    	it('case: multi =', function() {
    		var stub = sinon.stub(hash, '_getHashRaw', function() {
				return "#word==123";
			});
			expect(hash.getHash('word')).to.be.equal('=123');
			stub.restore();
    	});

    	it('case: no value', function(){
    		var stub = sinon.stub(hash, '_getHashRaw', function() {
    			return "#word=";
    		});
    		expect(hash.getHash('word')).to.be.equal('');
    		stub.restore();
    	});
    	it('case: no equal', function(){
    		var stub = sinon.stub(hash, '_getHashRaw', function() {
    			return "#word123";
    		});
    		expect(hash.getHash('word')).to.be.equal('');
			expect(hash.getHash('word123')).to.be.equal('');
    		stub.restore();
    	});
    });
});