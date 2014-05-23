/**
 * [mergeObjects description]
 * @param  {[type]} obj1 [description]
 * @param  {[type]} obj2 [description]
 * @return {[type]}      [description]
 */
exports.mergeObjects = function(obj1, obj2){
  for(var key in obj1){
    if(obj1.hasOwnProperty(key)){
      obj2[key] = obj1[key];
    }
  }

  return obj2;
}