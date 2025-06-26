const DeepMerge = (obj1, obj2) => {
  const resultObject = {};

  Object.keys(obj1).forEach(key1 => {
    const value1 = obj1[key1];

    if (obj2.hasOwnProperty(key1)) {
      if (Array.isArray(value1) && Array.isArray(obj2[key1])) {
        // Concatenate arrays if both values are arrays
        resultObject[key1] = [...value1, ...obj2[key1]];
      } else if (typeof value1 === 'object' && typeof obj2[key1] === 'object') {
        // If both values are objects, merge recursively
        resultObject[key1] = DeepMerge(value1, obj2[key1]);
      } else {
        // Otherwise, overwrite value from obj2 (for primitive types)
        resultObject[key1] = obj2[key1];
      }
    } else {
      // If the key is only in obj1, add it to the result
      resultObject[key1] = value1;
    }
  });

  // Add remaining keys from obj2 (that aren't in obj1)
  Object.keys(obj2).forEach(key2 => {
    if (!obj1.hasOwnProperty(key2)) {
      resultObject[key2] = obj2[key2];
    }
  });

  return resultObject;
};



##########################################################

// inplace version

const DeepMergeInPlace = (obj1, obj2) => {
  Object.keys(obj2).forEach(key => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (Array.isArray(val1) && Array.isArray(val2)) {
      // Concatenate arrays in-place
      obj1[key] = [...val1, ...val2];
    } else if (
      val1 && val2 &&
      typeof val1 === 'object' &&
      typeof val2 === 'object' &&
      !Array.isArray(val1) &&
      !Array.isArray(val2)
    ) {
      // Deep merge objects recursively
      DeepMergeInPlace(val1, val2);
    } else {
      // Primitive or mismatched types → overwrite
      obj1[key] = val2;
    }
  });

  return obj1;
};


// const a = { foo: [1], bar: { x: 1 }, baz: "old" };
// const b = { foo: [2, 3], bar: { y: 2 }, baz: "new" };

// DeepMergeInPlace(a, b);
// console.log(a);
// { foo: [1, 2, 3], bar: { x: 1, y: 2 }, baz: "new" }

