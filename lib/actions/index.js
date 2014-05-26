var utils = require('../utils');

/**
 * actions/index wraps all actions so they can be more easily used
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
exports.auth = function(actions){
  var template = {
    login:    function(req, res){
      require('./login')(req, res);
    },
    logout:   function(req, res){
      require('./logout')(req, res);
    } 
  };

  return utils.mergeObjects(template, actions);
}

exports.user = function(actions){
  var template = {
    reset: function(req, res){
      require('./reset')(req, res);            
    }
  };
 return utils.mergeObjects(template, actions); 
}
