'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');
var utils = require('../../lib/utils');

describe('utils', function(){
  describe('#allParams()', function(){
    it('should collect all request parameter including headers', function(done){
      var req = {
        params: {
          all: function(){
            return {
              foo: 'bar'
            };
          }
        },
        headers: {
          faz: 'baz'
        },
        query: {
          shake: 'bake'
        }
      };

      var results = utils.allParams(req);

      results.should.have.property('foo');
      results.should.have.property('faz');
      results.should.have.property('shake');
      done();
    });
  });

  describe('#countTopLevel()', function(){
    it('should count only the top level of an object', function(done){
      var obj = {
        foo: 'bar',
        faz: {
          shake: 'bake'
        }
      };
      var count = utils.countTopLevel(obj);
      count.should.eql(2);
      done();
    });

    it('should return -1 if given param is not an object', function(done){
      var shake = 'bake';
      var count = utils.countTopLevel(shake);
      count.should.eql(-1);
      done();
    });
  });

  describe('#accessObjectLikeArray()', function(){
    it('should return 2nd parameter if it\'s not an object', function(done){
      var shake = 'bake';
      var result = utils.accessObjectLikeArray(2, shake);
      result.should.eql('bake');
      done();
    });
    it('should return value at position if given array', function(done){
      var shake = ['bake'];
      var result = utils.accessObjectLikeArray(0, shake);
      result.should.eql('bake');
      done();
    });
    it('should return 2nd object in object', function(done){
      var shake = {shake:'bake',magic:'man'};
      var result = utils.accessObjectLikeArray(1, shake);
      result.should.eql('man');
      done();
    });
  });
});