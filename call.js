const obj = {
  _name: 'Alice'
};

Object.defineProperty(obj, 'name', {
  get: function() {
    return this._name;
  },
  set: function(value) {
    this._name = value.toUpperCase();
  },
  enumerable: true,
  configurable: true
});

console.log(obj.name); // Alice (getter)
obj.name = 'Bob'; // setter (converts 'Bob' to uppercase)
console.log(obj.name); // BOB (getter)

const obj = {};

Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false, // Read-only
  enumerable: true, //property will appea in for loops and Object.keys 
  configurable: true
});

console.log(obj.name); // Alice
obj.name = 'Bob'; // This will not change the value.
console.log(obj.name); // Alice

// Function.prototype.callPolyfill = function(context, ...args) {
//      return this.bind(context)(...args);  
// }
//invokes this new function immediately, passing the arguments.
//for call we have to invoke, as bind returns a method we have to manually invoke it

// Function.prototype.callPolyfill = function(context, ...args) {
//      return this.apply(context, args);
// }
//for case of apply it will be default invoke it on creation

Function.prototype.callPolyfill = function(context, ...args) {
  Object.defineProperty(context, 'fn', {
    value: this,
    enumerable: false,
  });

  return context.fn(...args);
}
