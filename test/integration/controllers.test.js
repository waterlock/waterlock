'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('templates', function(){
  describe('installed', function(){
    describe('controllers', function(){
      describe('AuthController', function(){
        var AuthController = require('../../_testapp/api/controllers/AuthController.js');
        it('should exist', function(done){
          AuthController.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          AuthController.should.have.property('login');
          AuthController.should.have.property('logout');
          done();
        });
      });
      describe('UserController', function(){
        var UserController = require('../../_testapp/api/controllers/UserController.js');
        it('should exist', function(done){
          UserController.should.be.Object;
          done();
        });

        it('should have expected properties', function(done){
          UserController.should.have.property('jwt');
          done();
        });
      });
    });
  });
});