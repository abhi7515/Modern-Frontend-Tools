const func = (a, b, c, d, e) => a + b + c + d + e;


const yourFunction = (fn) => {
   const argsLength = fn.length;
   const inner = (...args) => {
    if (args.length >= argsLength) {
      return fn(...args);
    }
    return (...next) => inner(...args, ...next);
  };

  return inner;
}

const hof = yourFunction(func);


console.log(hof(1, 2, 3, 4, 5));

console.log(hof(1, 2, 3, 4, 5)); // 15
console.log(hof(2, 3, 4)(5, 6)); // 20
console.log(hof(3, 4)(5, 6)(7)); // 25
console.log(hof(4, 5)(6)(7, 8)); // 30
console.log(hof(5)(6)(7)(8)(9)); // 35









