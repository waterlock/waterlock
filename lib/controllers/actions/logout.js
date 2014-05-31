'use strict';

/**
 * Logout action
 */
module.exports = function (req, res){
  if(req.session.authenticated){
    req.session.authenticated = false;
  }
  res.json(200);
};