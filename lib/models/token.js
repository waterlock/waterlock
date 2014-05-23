
exports.attributes = function(attributes){
  var template = {
    resetToken: {
      type: 'STRING'
    },
    expiration:{
      type: 'date'
    },
    owner: {
      model: 'user'
    }
  };

  return utils.mergeObjects(template, attributes);
}