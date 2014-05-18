exports.mergeObjects = function(obj1, obj2){
  for(var key in obj1){
    if(obj1.hasOwnProperty(key)){
      obj2[key] = obj1[key];
    }
  }

  return obj2;
}