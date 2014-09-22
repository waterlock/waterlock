'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Attempt',function(){
  var Attempt = require('../../../lib/models/attempt');

  describe('#attributes()', function(){
    var attributes = Attempt.attributes;

    it('should be a function', function(done){
      attributes.should.be.type('function');
      done();
    });

    it('should bind extra attributes', function(done){
      var a = attributes({shake:'bake'});
      a.should.have.property('shake');
      done();
    });

    describe('template attributes', function(){
      var attempt = attributes({});
      describe('.user', function(){
        it('should exist', function(done){
          attempt.should.have.property('user');
          done();
        });
      });
      describe('.successful', function(){
        it('should exist', function(done){
          attempt.should.have.property('successful');
          done();
        });
      });
      describe('.ip', function(){
        it('should exist', function(done){
          attempt.should.have.property('ip');
          done();
        });
      });
      describe('.port', function(){
        it('should exist', function(done){
          attempt.should.have.property('port');
          done();
        });
      });
    });
  });
});