// Deep equality means comparing objects recursively, not just by reference. I’d start with primitive checks,
//  then handle arrays and objects by keys, and extend to special types like Date, Map, and Set. JSON.stringify
//  works for simple cases, but a true deepEqual must recurse properly.



function isDeepEqual(a, b) {
  if (a === b) return true; // primitives or same reference

  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, i) => isDeepEqual(val, b[i]));
  }

  // Different types (array vs object)
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // Handle plain objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  return keysA.every(key => keysB.includes(key) && isDeepEqual(a[key], b[key]));
}
