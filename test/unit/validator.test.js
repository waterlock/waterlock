'use strict';

var proxyquire = require('proxyquire');
var should = require('should');
var mocha = require('mocha');
var jwt = require('jwt-simple');
var Validator = require('../../lib/validator');

describe('validator', function(){
  describe('#validateToken', function(){
    it('should return error if token cannot be decoded', function(done){
      var scope = {
        jwt: {
          decode: function(){
            throw new Error('butts');
          }
        },
        config: {
          jsonWebTokens: {
            secret: 'farts'
          }
        }
      };

      var validator = Validator.apply(scope);

      validator.validateToken('butts', function(err){
        err.should.be.Error;
        done();
      });
    });
    it('should return error if token is expired', function(done){
      var scope = {
        jwt: {
          decode: function(){
            return {
              'exp': 1410283836707
            };
          }
        },
        logger: {
          debug: function(){
            // nothing
          }
        },
        config: {
          jsonWebTokens: {
            secret: 'farts'
          }
        }
      };

      var validator = Validator.apply(scope);

      validator.validateToken('butts', function(err){
        err.should.be.String;
        done();
      });

    });
    it('should return error if token is early', function(done){
      var scope = {
        jwt: {
          decode: function(){
            return {
              'exp': Date.now() + 100000,
              'nbf': Date.now() + 100000
            };
          }
        },
        logger: {
          debug: function(){
            // nothing
          }
        },
        config: {
          jsonWebTokens: {
            secret: 'farts'
          }
        }
      };

      var validator = Validator.apply(scope);

      validator.validateToken('butts', function(err){
        err.should.be.String;
        done();
      });
    });
    it('should return error if audience does not match', function(done){
      var scope = {
        jwt: {
          decode: function(){
            return {
              'exp': Date.now() + 100000,
              'nbf': Date.now() - 100,
              'aud': 'butts'
            };
          }
        },
        logger: {
          debug: function(){
            // nothing
          }
        },
        config: {
          jsonWebTokens: {
            secret: 'farts',
            audience: 'no butts'
          }
        }
      };

      var validator = Validator.apply(scope);

      validator.validateToken('butts', function(err){
        err.should.be.String;
        done();
      });
    });
    it('should find the user from a valid token', function(done){
      var scope = {
        jwt: {
          decode: function(){
            return {
              'exp': Date.now() + 100000,
              'nbf': Date.now() - 100,
              'aud': 'butts'
            };
          }
        },
        logger: {
          debug: function(){
            // nothing
          }
        },
        config: {
          jsonWebTokens: {
            secret: 'farts',
            audience: 'butts'
          }
        }
      };

      var validator = Validator.apply(scope);

      validator.validateToken.apply({findUserFromToken: function(token, cb){
        cb(null, {farts: 'butts'});
      }}, ['butts', function(err, usr){
        usr.should.be.Object;
        done();
      }]);
    });
  });
  describe('#findUserFromToken', function(){
    it('should log and callback error if user cannot be found', function(done){
      var scope = {
        User: {
          findOne: function(){
            return {
              exec: function(cb){
                cb('barf');
              }
            };
          }
        },
        logger: {
          debug: function(){
            // nothing
          }
        }
      };
      var validator = Validator.apply(scope);
      validator.findUserFromToken({iss:'foo|bar'}, function(err, usr){
        err.should.be.String;
        done();
      });
    });
    it('should find and return user', function(done){
      var scope = {
        User: {
          findOne: function(){
            return {
              exec: function(cb){
                cb(null, {foo:'bar'});
              }
            };
          }
        },
        logger: {
          debug: function(){
            // nothing
          }
        }
      };
      var validator = Validator.apply(scope);
      validator.findUserFromToken({iss:'foo|bar'}, function(err, usr){
        usr.should.be.Object;
        done();
      });
    });
  });
  describe('#validateTokenRequest', function(){
    it('should callback error if no token is present', function(done){
      var scope = {
        _utils: {
          getAccessToken: function(){
            return null;
          }
        },
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.validateTokenRequest({}, function(err){
        err.should.be.String;
        done();
      });
    });
    it('should callback error if there was an issue while validating token', function(done){
      var scope = {
        _utils: {
          getAccessToken: function(){
            return 'barf';
          }
        },
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.validateTokenRequest.apply({validateToken: function(token, cb){
        cb('butts');
      }}, [{}, function(err){
        err.should.be.String;
        done();
      }]);
    });
    it('should call #bindToSession if the user has selected that option', function(done){
      var scope = {
        _utils: {
          getAccessToken: function(){
            return 'butts';
          }
        },
        logger: {
          debug: function(){

          }
        },
        config:{
          jsonWebTokens:{
            stateless: false,
            trackUsage: false
          }
        }
      };
      var validator = Validator.apply(scope);
      var bindToSessionCalled = false;
      validator.validateTokenRequest.apply({
        validateToken: function(token, cb){
          cb(null, {});
        },
        bindToSession: function(){
          bindToSessionCalled = true;
        }
      }, [{}, function(err, usr){
        bindToSessionCalled.should.be.ok;
        done();
      }]);
    });
    it('should call #trackTokenUsage if the user has selected that option', function(done){
      var scope = {
        _utils: {
          getAccessToken: function(){
            return 'butts';
          }
        },
        logger: {
          debug: function(){

          }
        },
        config:{
          jsonWebTokens:{
            stateless: true,
            trackUsage: true
          }
        },
        cycle: {
          _addressFromRequest: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      var trackTokenUsageCalled = false;
      validator.validateTokenRequest.apply({
        validateToken: function(token, cb){
          cb(null, {});
        },
        trackTokenUsage: function(){
          done();
        }
      }, [{}, function(err, usr){
      }]);
    });
    it('should validate a token from a valid request', function(done){
      var scope = {
        _utils: {
          getAccessToken: function(){
            return 'butts';
          }
        },
        logger: {
          debug: function(){

          }
        },
        config:{
          jsonWebTokens:{
            stateless: true,
            trackUsage: false
          }
        }
      };
      var validator = Validator.apply(scope);
      var trackTokenUsageCalled = false;
      validator.validateTokenRequest.apply({
        validateToken: function(token, cb){
          cb(null, {});
        }
      }, [{}, function(err, usr){
        usr.should.be.Object;
        done();
      }]);
    });
    it('should validate a token from a valid request for HTTP Bearer authorization', function(done){
      var req = {
        headers: {
          authorization: 'Bearer butts'
        }
      };
      var scope = {
        _utils: {
          getAccessToken: function(){
            return 'butts';
          }
        },
        logger: {
          debug: function(){

          }
        },
        config:{
          jsonWebTokens:{
            stateless: true,
            trackUsage: false
          }
        }
      };
      var validator = Validator.apply(scope);
      var trackTokenUsageCalled = false;
      validator.validateTokenRequest.apply({
        validateToken: function(token, cb){
          cb(null, {});
        }
      }, [req, function(err, usr){
        usr.should.be.Object;
        done();
      }]);
    });
  });
  describe('#bindToSession', function(){
    it('should authenticate and add the user to the session', function(){
      var validator = new Validator();
      var obj = {session: {}};
      var user = {};
      validator.bindToSession(obj, user);
      obj.session.should.have.property('authenticated');
    });
  });
  describe('#findAndTrackJWT', function(){
    it('should callback an error if the JWT could not be found', function(done){
      var scope = {
        Jwt: {
          findOne: function(obj, cb){
            cb();
          }
        },
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.findAndTrackJWT('','', function(err){
        err.should.be.String;
        done();
      });
    });
    it('should callback an error if there is a Waterline error', function(done){
      var scope = {
        Jwt: {
          findOne: function(obj, cb){
            cb('Waterline error');
          }
        },
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.findAndTrackJWT('','', function(err){
        err.should.be.String;
        done();
      });
    });
    it('should callback an error if the JWT is revoked', function(done){
      var scope = {
        Jwt: {
          findOne: function(obj, cb){
            cb(null, {revoked: true});
          }
        },
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.findAndTrackJWT('','', function(err){
        err.should.be.String;
        done();
      });
    });
    it('should create a Use entry if token is found', function(done){
      var scope = {
        Jwt: {
          findOne: function(obj, cb){
            cb(null, {revoked: false});
          }
        },
        Use: {
          create: function(){
            return {
              exec: function(cb){
                done();
              }
            };
          }
        },
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.findAndTrackJWT('',{ip: ''}, function(err){
      });
    });
  });
  describe('#trackTokenUsage', function(){
    it('should callback an error if there were any while finding and tracking jwt', function(done){
      var scope = {
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.trackTokenUsage.apply({findAndTrackJWT: function(token, address, cb){
        cb('farts');
      }}, ['',{},{}, function(err){
        err.should.be.String;
        done();
      }]);
    });
    it('should return the user if we were able to find and track jwt usage', function(done){
      var scope = {
        logger: {
          debug: function(){

          }
        }
      };
      var validator = Validator.apply(scope);
      validator.trackTokenUsage.apply({findAndTrackJWT: function(token, address, cb){
        cb(null, {});
      }}, ['',{},{}, function(err, user){
        user.should.be.Object;
        done();
      }]);
    });
  });
});
