'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('User',function(){
  var User = require('../../../lib/models/user');
  describe('#attributes()', function(){
    var attributes = User.attributes;
   
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
      var user = attributes({});
      describe('.attempts', function(){
        it('should exist', function(done){
          user.should.have.property('attempts');
          done();
        });
      });
      describe('.jsonWebTokens', function(){
        it('should exist', function(done){
          user.should.have.property('jsonWebTokens');
          done();
        });
      });
      describe('.auth', function(){
        it('should exist', function(done){
          user.should.have.property('auth');
          done();
        });
      });
    });
  });
});