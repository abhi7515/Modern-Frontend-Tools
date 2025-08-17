"A shallow copy only duplicates the top-level properties of an object
nested objects remain references. A deep copy recursively clones every level,
 so modifications in the copy don’t affect the original. Modern JS has structuredClone for deep copies,
 but in older codebases you’ll see JSON.parse(JSON.stringify()) or custom recursive implementations."


const obj = { a: 1, b: { c: 2 } };

const shallow = Object.assign({}, obj);
shallow.b.c = 42;

console.log(obj.b.c); // 42 😱 (changed in original!)

//The nested object b was not cloned, only its reference was copied.

##################################################

const arr = [1, [2, 3]];

const shallowArr = [...arr];
shallowArr[1][0] = 99;

console.log(arr[1][0]); // 99 😱 (affected original)

   Object.assign({}, obj)

  { ...obj }

  [...arr]

…all produce shallow copies.


##################################################

const obj = { a: 1, b: { c: 2 }, d: new Date() };

const deep = JSON.parse(JSON.stringify(obj));
deep.b.c = 42;

console.log(obj.b.c); // 2 ✅

//Loses Date, Map, Set, functions, Infinity, undefined, NaN.

##################################################


const obj = { a: 1, b: { c: 2 } };

const deep = structuredClone(obj);
deep.b.c = 42;

console.log(obj.b.c); // 2 ✅

##################################################

//Manual Recursive Deep Clone

function deepClone(value) {
  if (value === null || typeof value !== 'object') {
    return value; // primitive
  }

  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const clone = {};
  for (const key in value) {
    clone[key] = deepClone(value[key]);
  }
  return clone;
}

const obj = { a: 1, b: { c: 2 } };
const deep = deepClone(obj);

deep.b.c = 42;
console.log(obj.b.c); // 2 ✅


#######################################################
JSON.stringify polyfill

/**
 * @param {*} value
 * @return {string}
 */
export default function jsonStringify(value) {
  if (Array.isArray(value)) {
    const arrayValues = value.map((item) => jsonStringify(item));
    return `[${arrayValues.join(',')}]`;
  }

  if (typeof value === 'object' && value !== null) {
    const objectEntries = Object.entries(value).map(
      ([key, value]) => `"${key}":${jsonStringify(value)}`,
    );
    return `{${objectEntries.join(',')}}`;
  }

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  return String(value);
}











