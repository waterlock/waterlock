'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

var config = proxyquire.noCallThru().load('../../lib/config', {
  'path': {
    normalize: function(){
      return '../test/fixtures/waterlock.config';
    }
  }
})();

describe('config', function(){
  it('should have a base url', function(){
    config.should.have.property('baseUrl');
  });
  it('should have an authMethod object', function(){
    config.authMethod.should.be.type('object');
  });
  it('should have a jsonWebTokens object', function(){
    config.jsonWebTokens.should.be.type('object');
  });
  it('should have a postActions object', function(){
    config.postActions.should.be.type('object');
  });
  it('should throw an error if config file not defined', function(done){
    var config = proxyquire.noCallThru().load('../../lib/config', {
      'path': {
        normalize: function(){
          return 'NOPE';
        }
      }
    });

    try{
      config();
    }catch(e){
      e.should.be.ok;
      done();
    }
  });
});