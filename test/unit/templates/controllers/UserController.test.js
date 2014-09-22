'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('templates', function(){
  var auth = proxyquire.noCallThru().load('../../../../lib/templates/controllers/UserController.js',
    {'waterlock': {actions: {user: function(){return {};}}}});

  describe('controllers', function(){
    describe('UserController', function(){
      it('should call actions user', function(done){
        auth.should.be.Object;
        done();
      });
    });    
  });
});