function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = args.toString(); // Convert arguments to string for cache key
    if (cache[key] !== undefined) {
      console.log('Fetching from cache...');
      return cache[key];
    }
    console.log('Calculating...');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const memoizedSum = memoize(function(a, b) {
  return a + b;
});

// Usage
console.log(memoizedSum(2, 3)); // Logs: Calculating... 5
console.log(memoizedSum(2, 3)); // Logs: Fetching from cache... 5
console.log(memoizedSum(4, 5)); // Logs: Calculating... 9
