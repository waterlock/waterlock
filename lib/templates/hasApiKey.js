/**
 * hasApiKey
 *
 * @module      :: Policy
 * @description :: Assumes that your request has an api key;
 *
 */
module.exports = function(req, res, next) {

  if(req.session.user && req.param('api-key')){
    Api.findOne({"userId": user.id}).done(function(err, api){
      if(api.key == req.param('api-key')){
        return next();
      }
    });
  }

  return res.forbidden('You are not permitted to perform this action.');
};
