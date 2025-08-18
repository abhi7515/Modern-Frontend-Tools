


Array.prototype.bind = function(context, ...args){
  const fn = this;
  return function (...newArgs){
        return fn.apply(context, [...args, ...newArgs])
  }
}
