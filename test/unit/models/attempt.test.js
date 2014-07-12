var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Attempt',function(){
  var Attempt = require('../../../lib/models/attempt').attributes;
  it('should be a function', function(done){
    Attempt.should.be.type('function');
    done();
  });

  it('should bind extra attributes', function(done){
    var a = Attempt({shake:'bake'});
    a.should.have.property('shake');
    done();
  });

  describe('properties', function(){
    var attempt = Attempt({});
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