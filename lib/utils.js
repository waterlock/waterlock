'use strict';

var _ = require('lodash');

/**
 * gathers all params for this request
 * @param  object req the express request object
 * @return object     all params
 */
exports.allParams = function(req){
  var params = req.params.all();
  return _.merge(req.query, params);
};

/**
 * Counts only the top level of a object
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
exports.countTopLevel = function(obj){
  var count = 0;
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      count++;
    }
  }
  return count;
};

/**
 * allows us to access an object like an array [0] == {first object}
 * @param  {[type]} index [description]
 * @param  {[type]} obj   [description]
 * @return {[type]}       [description]
 */
exports.accessObjectLikeArray = function(index, obj){
  var count = 0;
  for(var key in obj){
    if(count === index){
      return obj[key];
    }
    count++;
  }
};