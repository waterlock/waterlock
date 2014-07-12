var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Use',function(){
  var Use = require('../../../lib/models/use').attributes;
  it('should be a function', function(done){
    Use.should.be.type('function');
    done();
  });

  it('should bind extra attributes', function(done){
    var a = Use({shake:'bake'});
    a.should.have.property('shake');
    done();
  });

  describe('properties', function(){
    var use = Use({});
    describe('.remoteAddress', function(){
      it('should exist', function(done){
        use.should.have.property('remoteAddress');
        done();
      });
    });
    describe('.jsonWebToken', function(){
      it('should exist', function(done){
        use.should.have.property('jsonWebToken');
        done();
      });
    });
  });
});