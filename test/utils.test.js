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


});