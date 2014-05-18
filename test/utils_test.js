var should = require('should');

describe('utils',function(){
  var utils = require('../lib/utils');

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