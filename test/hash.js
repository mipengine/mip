
define(function (require) {
    'use strict';

    var hash = require('hash');

    describe('hash', function () {
        it('case: normal', function(){
            window.location.hash = 'word=123&eqid=321';
            hash.refreshHashTree();
            expect(hash.getHash('word')).to.be.equal('123');
            expect(hash.getHash('eqid')).to.be.equal('321');
        });

        it('case: no key input', function(){
            window.location.hash = 'word=123&eqid=321';
            hash.refreshHashTree();
            expect(hash.getHash()).to.be.equal('');
        });

        it('case: no such key', function(){
            window.location.hash = 'word=123';
            hash.refreshHashTree();
            expect(hash.getHash('eqid')).to.be.equal('');
        });

        it('case: multi =', function() {
            window.location.hash = 'word==123';
            hash.refreshHashTree();
            expect(hash.getHash('word')).to.be.equal('=123');
        });

        it('case: no value', function(){
            window.location.hash = 'word=';
            hash.refreshHashTree();
            expect(hash.getHash('word')).to.be.equal('');
        });

        it('case: no key', function(){
            window.location.hash = '=123';
            hash.refreshHashTree();
            expect(hash.getHash('')).to.be.equal('');
        });

        it('case: no equal', function(){
            window.location.hash = 'word123';
            hash.refreshHashTree();
            expect(hash.getHash('word')).to.be.equal('');
            expect(hash.getHash('word123')).to.be.equal('');
        });

        it('case: no hash', function(){
            window.location.hash = '';
            hash.refreshHashTree();
            expect(hash.getHash('word')).to.be.equal('');
        });

    });
});