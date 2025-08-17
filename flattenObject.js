function flattenObject(input, parentKey = '', res = {}, sep = '.') {
  if (typeof input !== 'object' || input === null) {
    if (parentKey) res[parentKey] = input;
    return res;
  }

  if (Array.isArray(input)) {
    input.forEach((val, idx) => {
      const newKey = parentKey ? `${parentKey}${sep}${idx}` : String(idx);
      flattenObject(val, newKey, res, sep);
    });
  } else {
    for (const key in input) {
      const newKey = parentKey ? `${parentKey}${sep}${key}` : key;
      flattenObject(input[key], newKey, res, sep);
    }
  }

  return res;
}

// Example usage:
const obj = {
  a: { b: 1, c: { d: 2 } },
  e: [3, { f: 4, g: [5, 6] }]
};

console.log(flattenObject(obj));
/*
{
  "a.b": 1,
  "a.c.d": 2,
  "e.0": 3,
  "e.1.f": 4,
  "e.1.g.0": 5,
  "e.1.g.1": 6
}
*/

// Custom separator:
console.log(flattenObject(obj, '', {}, '_'));
/*
{
  "a_b": 1,
  "a_c_d": 2,
  "e_0": 3,
  "e_1_f": 4,
  "e_1_g_0": 5,
  "e_1_g_1": 6
}
*/
