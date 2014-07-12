var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Jwt',function(){
  var Jwt = require('../../../lib/models/jwt').attributes;
  it('should be a function', function(done){
    Jwt.should.be.type('function');
    done();
  });

  it('should bind extra attributes', function(done){
    var a = Jwt({shake:'bake'});
    a.should.have.property('shake');
    done();
  });

  describe('properties', function(){
    var jwt = Jwt({});
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