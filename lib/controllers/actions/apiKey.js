'use strict';

/**
 * ApiKey action
 */
module.exports = function(req, res){
  switch(req.method){
    case 'GET':
      handleGet(req, res, ApiKey);
    break;
    case 'POST':
      handlePost(req, res, ApiKey);
    break;
    default:
      res.json(404);
    break;
  }
};

function handlePost(req, res, ApiKey){
  ApiKey.create({owner: req.session.user.id}).done(function(err, key){
    res.json(key);
  });
}

function handleGet(req, res, ApiKey){
  ApiKey.find({owner: req.session.user.id}).done(function(err, keys){
    res.json(keys);
  });
}