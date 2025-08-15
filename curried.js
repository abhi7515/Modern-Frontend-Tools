const func = (a, b, c, d, e) => a + b + c + d + e;


const yourFunction = (fn) => {       //using arrow function
   const inner = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...next) => inner(...args, ...next);
  };

  return inner;
}

function curry(fn){       //using regular func
  return function curried(...args){
    if(args.length >= fn.length){
      return fn.apply(this, args);
    }
    else{
      return function(...args2){
        return curried.apply(this, args2.concat(args));
      }
    }
  }
}

// const hof = yourFunction(func);
const hof = curry(func);


console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35









