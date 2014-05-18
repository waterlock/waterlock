var utils = require('../utils');

exports.attributes = function(attributes){
  var template = {
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'STRING',
      maxLength: 20,
      minLength: 8,
      required: true
    }
  };

  return utils.mergeObjects(template, attributes);
}

exports.beforeCreate = function(values, cb){
  var krypt = require('../waterlock').krypt
  var pass = krypt.hash(values.password);
  values.password = pass;
  cb();
}