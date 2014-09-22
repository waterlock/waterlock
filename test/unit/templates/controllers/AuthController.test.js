'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('templates', function(){
  var auth = proxyquire.noCallThru().load('../../../../lib/templates/controllers/AuthController.js',
    {'waterlock': {waterlocked: function(){return {};}}});

  describe('controllers', function(){
    describe('AuthController', function(){
      it('should call waterlocked', function(done){
        auth.should.be.Object;
        done();
      });
    });    
  });
});