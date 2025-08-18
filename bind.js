

//using apply
Function.prototype.bind = function(context, ...args){
  const fn = this;
  return function (...newArgs){
        return fn.apply(context, [...args, ...newArgs])
  }
}

//using call
Function.prototype.bind = function(context, ...args) {
  const fn = this;
  return function(...newArgs) {
    return fn.call(context, ...args, ...newArgs);
  };
};
