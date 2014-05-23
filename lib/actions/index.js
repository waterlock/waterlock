var utils = require('../utils');

/**
 * actions/index wraps all actions so they can be more easily used
 * @param  {[type]} actions [description]
 * @return {[type]}         [description]
 */
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
