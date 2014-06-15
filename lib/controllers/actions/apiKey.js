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

/**
 * assumes posting to this action will create a new apiKey for user
 * @param  {object} req    express req
 * @param  {object} res    express res
 * @param  {object} ApiKey waterline model
 */
function handlePost(req, res, ApiKey){
  ApiKey.create({owner: req.session.user.id}).done(function(err, key){
    if(err){
      console.log(err);
    }

    res.json(key);
  });
}

/**
 * assumes performing a get request queries the keys
 * @param  {object} req    express req
 * @param  {object} res    express res
 * @param  {object} ApiKey waterline model
 */
function handleGet(req, res, ApiKey){
  ApiKey.find({owner: req.session.user.id}).done(function(err, keys){
    if(err){
      console.log(err);
    }

    res.json(keys);
  });
}