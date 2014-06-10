var testHelper = require('./test_helper');
var should = testHelper.should;
var waterlock = testHelper.waterlock;
var proxyquire = testHelper.proxyquire;

describe('utils',function(){
  var utils = proxyquire('../lib/utils', 
    {'./waterlock': waterlock, 
    'path':{normalize: function(str){
      return __dirname+"/email.test.jade";
    }}});

  describe('getHtmlEmail', function(){
    it('should exist', function(done){
      utils.should.have.property('getHtmlEmail');
      done();
    });

    it('should return html', function(done){
      utils.getHtmlEmail({owner: "test", resetToken: "token"}).should.be.String
      done()
    });
  });

  describe('mailCallback', function(){
    it('should exist', function(done){
      utils.should.have.property('mailCallback');
      done();
    });
  });
});