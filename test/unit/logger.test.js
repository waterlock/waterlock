'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

var logger = proxyquire('../../lib/logger', {
  path:{
    normalize: function(){
      return '../test/fixtures/sails.config';
    }
  }
});

describe('logger', function(){
  describe('#log()', function(){
    it('should exist', function(done){
      logger.should.have.property('log');
      done();
    });
  });
});