'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Jwt',function(){
  var Jwt = require('../../../lib/models/jwt');

  describe('#attributes()', function(){
    var attributes = Jwt.attributes;
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
      var jwt = attributes({});
      describe('.token', function(){
        it('should exist', function(done){
          jwt.should.have.property('token');
          done();
        });
      });
      describe('.uses', function(){
        it('should exist', function(done){
          jwt.should.have.property('uses');
          done();
        });
      });
      describe('.owner', function(){
        it('should exist', function(done){
          jwt.should.have.property('owner');
          done();
        });
      });
      describe('.revoked', function(){
        it('should exist', function(done){
          jwt.should.have.property('revoked');
          done();
        });
      });
    });
  });
});