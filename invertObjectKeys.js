reduce method provides a more functional approach, emphasizing immutability by returning a new object each iteration. It provides a concise and declarative way to construct the new object.

keys to values and values to key/key array, keeping in mind duplication
// Example usage
const original = {
  a: '1',
  b: '2',
  c: '2', // Duplicate value
  d: '4'
};

const inverted = invertObjectWithArray(original);
console.log(inverted);
// Output: { '1': 'a', '2': ['b', 'c'], '4': 'd' }

// no mutation here
function invertObjectWithArray(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (acc[value]) {
      // If the value already exists, concatenate the new key to the existing array
      acc[value] = [].concat(acc[value], key);
    } else {
      // Otherwise, create an array with the key
      acc[value] = key;
    }
    return acc;
  }, {});
}


function invertObjectWithArray(obj) {
  const inverted = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (inverted[value]) {
      // If the value already exists, push the key to the array
      inverted[value] = [].concat(inverted[value], key);
    } else {
      // Otherwise, create an array with the key
      inverted[value] = key;
    }
  }
  
  return inverted;


//using ES6 SPREAD Operator

function invertObjectWithArray(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (acc[value]) {
      // If the value already exists, concatenate the new key to the existing array
      acc = { ...acc, [value]: [].concat(acc[value], key) };
    } else {
      // Otherwise, create an entry with the value as key and the key as the value
      acc = { ...acc, [value]: key };
    }
    return acc;
  }, {}); // The initial value of acc is an empty object
}

}

