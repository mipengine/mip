define(function (require) {
    'use strict';
    window.location.hash = 'word=1123&mipanchor=anchor';
    var hash = require('hash');
    window.location.hash = '';
    var achorEle = document.createElement('div');
    achorEle.setAttribute('id', 'anchor');
    achorEle.setAttribute('name', 'anchor');
    document.body.appendChild(achorEle);

    describe('hash', function () {
        it('case: scroll to anchor', function(){
            window.location.hash = 'mipanchor=anchor';
            hash.refreshHashTree();
            hash.scrollToAnchor({
                value: 'anchor',
                sep: '='
            });
            expect(hash.get('mipanchor')).to.be.equal('anchor');
        });

        it('case: normal', function(){
            window.location.hash = 'word=123&eqid=321';
            hash.refreshHashTree();
            expect(hash.get('word')).to.be.equal('123');
            expect(hash.get('eqid')).to.be.equal('321');
        });

        it('case: no key input', function(){
            window.location.hash = 'word=123&eqid=321';
            hash.refreshHashTree();
            expect(hash.get()).to.be.equal('');
        });

        it('case: no such key', function(){
            window.location.hash = 'word=123';
            hash.refreshHashTree();
            expect(hash.get('eqid')).to.be.equal('');
        });

        it('case: multi =', function() {
            window.location.hash = 'word==123';
            hash.refreshHashTree();
            expect(hash.get('word')).to.be.equal('=123');
        });

        it('case: no value', function(){
            window.location.hash = 'word=';
            hash.refreshHashTree();
            expect(hash.get('word')).to.be.equal('');
        });

        it('case: no key', function(){
            window.location.hash = '=123';
            hash.refreshHashTree();
            expect(hash.get('')).to.be.equal('');
        });

        it('case: no equal', function(){
            window.location.hash = 'word123';
            hash.refreshHashTree();
            expect(hash.get('word')).to.be.equal('');
            expect(hash.get('word123')).to.be.equal('');
        });

        it('case: no hash', function(){
            window.location.hash = '';
            hash.refreshHashTree();
            expect(hash.get('word')).to.be.equal('');
        });

    });
});
