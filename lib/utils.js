'use strict';

var _ = require('lodash');

/**
 * various utility methods
 * 
 * @type {Object}
 */
module.exports = {
  /**
   * gathers all params for this request
   * 
   * @param  {Object} req the express request object
   * @return {Object}     all params
   * @api public
   */
  allParams: function(req){
    var params = req.params.all();
    _.merge(params, req.headers);
    return _.merge(req.query, params);
  },

  /**
   * Counts only the top level of a object
   * 
   * @param  {Object} obj plain object to count
   * @return {Integer}     the number of top level elements
   * @api public
   */
  countTopLevel: function(obj){
    if(typeof obj !== 'object'){
      return -1;
    }

    var count = 0;
    for(var key in obj){
      if(obj.hasOwnProperty(key)){
        count++;
      }
    }
    return count;
  },

  /**
   * allows us to access an object like an array [0] == {first object}
   * 
   * @param  {Integer} index the position in the object to look
   * @param  {Object} obj   the object to access
   * @return {Object}       the value at given position
   * @api public
   */
  accessObjectLikeArray: function(index, obj){
    // if obj is not an object just return it nothing to do
    if(typeof obj !== 'object'){
      return obj;
    }

    // if object already is an array return the value at given index
    if(typeof obj[index] !== 'undefined'){
      return obj[index];
    }

    var count = 0;
    for(var key in obj){
      if(count === index){
        return obj[key];
      }
      count++;
    }
  }
};