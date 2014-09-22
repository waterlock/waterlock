'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('Use',function(){
  var Use = require('../../../lib/models/use');
  describe('#attributes()', function(){
    var attributes = Use.attributes;

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
      var use = attributes({});
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
});