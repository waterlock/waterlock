var utils = require('../utils');
module.exports = function(actions){
  var template = {
    login:    function(req, res){
      require('./actions/login')(req, res);
    },
    logout:   function(req, res){
      require('./actions/logout')(req, res);
    } 
  };

  return utils.mergeObjects(template, actions);
}
