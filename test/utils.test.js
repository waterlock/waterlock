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

  describe('mergeObjects', function(){
    it('should merge objects', function(done){
      var obj1 = {foo: "bar"}
      var obj2 = {faz: "baz"}

      var r = utils.mergeObjects(obj1, obj2);

      r.should.have.property('foo');
      r.should.have.property('faz');

      done();
    });

    it('should merge objects with priority on object 1', function(done){
      var obj1 = {important: "this must not be lost"}
      var obj2 = {important: "i want to override it"}

      var r = utils.mergeObjects(obj1, obj2);

      r.important.should.equal(obj1.important)
      
      done();
    });
  });

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
});