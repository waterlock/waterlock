var utils = require('../utils');

exports.attributes = function(attributes){
  var template = {
    key: {
      type: 'STRING'
    },
    userId:{
      type: 'INTEGER'
    }
  };

  return utils.mergeObjects(template, attributes);
}

exports.beforeCreate = function(values, cb){
  var krypt = require('../waterlock').krypt
  if(typeof values.key === 'undefined'){
    values.key = krypt.random(13);
  }
  var key = krypt.sha256(values.key);
  values.key = key;
  cb();
}