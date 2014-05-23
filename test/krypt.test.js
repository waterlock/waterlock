var should = require('should');

describe('krypt',function(){
  var Krypt = require('../lib/krypt');
  var krypt = new Krypt();

  it('should have default length', function(done){
    krypt.should.have.property('saltLength');
    done();
  });

  it('should be a instance of krypt', function(done){
    krypt.should.be.an.instanceof(Krypt);
    done();
  });

  describe('hash', function(){
    var hash;
    it('should exist', function(done){
      krypt.should.have.property('hash')
      done();
    }); 
    
    it('should hash', function(done){
      hash = krypt.hash("test");
      hash.should.be.a.String;
      done();
    });

    describe('validate', function(){
      it('should exist', function(done){
        krypt.should.have.property('validate');
        done();
      });

      it('should validate', function(done){
        krypt.validate(hash, "test").should.be.ok;
        done();
      });
    });
  })
  
  describe('generateSalt', function(){
    it('should exist', function(done){
      krypt.should.have.property('generateSalt');
      done();
    });

    it('should generate a salt', function(done){
      krypt.generateSalt(10).length.should.equal(20);
      done();
    });
  });
  

  describe('sha256', function(){
    it('should exist', function(done){
      krypt.should.have.property('sha256');
      done();
    });

    it('should hash', function(done){
      krypt.sha256("test").should.be.String;
      done();
    });
  });

  describe('random', function(){
    it('should exist', function(done){
      krypt.should.have.property('random');
      done();
    });

    it('should generate random number', function(done){
      krypt.random(10).length.should.equal(10)
      done();
    });
  });

  describe('generateApiKey', function(){
    it('should exist', function(done){
      krypt.should.have.property('generateApiKey');
      done();
    });
    it('should generateApiKey', function(done){
      krypt.generateApiKey().should.be.String
      done();
    });
  });
});