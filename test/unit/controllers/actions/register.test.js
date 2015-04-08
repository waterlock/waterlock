'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');

describe('actions', function(){
  describe('register', function(){
    it('should assume auth method if only one is required', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 1;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
              authType: 'shake'
            };
          }
        },
        methods:{
          shake: {
            actions: {
              register: function(req, res){
                done();
              }
            }
          }
        }
      };
      var req = {};
      var res = {};
      var register = require('../../../../lib/controllers/actions/register');

      register.apply(this, [req, res]);
    });
    it('should call badRequest if authType is not found in waterlock.methods', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 1;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
              authType: 'NOT FOUND'
            };
          }
        },
        methods:{}
      };
      var req = {};
      var res = {
        badRequest: function(){
          done();
        }
      };
      var register = require('../../../../lib/controllers/actions/register');

      register.apply(this, [req, res]);
    });
    it('should call badRequest if authType is undefined', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 1;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
            };
          }
        },
        methods:{}
      };
      var req = {};
      var res = {
        badRequest: function(){
          done();
        }
      };
      var register = require('../../../../lib/controllers/actions/register');

      register.apply(this, [req, res]);
    });
    it('should trigger register on found waterlock.methods.*.actions', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 2;
          },
          allParams: function(){
            return {type: 'shake'};
          },
          accessObjectLikeArray: function(){
            return {
            };
          }
        },
        methods:{
          shake:{
            actions: {
              register: function(){
                done();
              }
            }
          }
        }
      };
      var req = {};
      var res = {};
      var register = require('../../../../lib/controllers/actions/register');

      register.apply(this, [req, res]);
    });
    it('should trigger badRequest if params.type is not defined and multiple auth methods are defined', function(done){
      global.waterlock = {
        _utils: {
          countTopLevel: function(){
            return 2;
          },
          allParams: function(){
            return {};
          },
          accessObjectLikeArray: function(){
            return {
            };
          }
        },
        methods:{}
      };
      var req = {};
      var res = {
        badRequest: function(){
          done();
        }
      };
      var register = require('../../../../lib/controllers/actions/register');

      register.apply(this, [req, res]);
    });
  });
});
