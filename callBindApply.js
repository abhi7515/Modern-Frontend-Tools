const person = {
  name: 'Rajat',
  getName: function () {
    return this.name;
  },
};

const developer = {
  name: 'Dev',
  getName: person.getName, // refers to same function, but not bound
};

const tester = {
  name: 'QA',
};

function execute(fn) {
  console.log('1:', fn()); // `fn()` is called without context
}

execute(person.getName);                  // 1: undefined
execute(developer.getName);              // 1: undefined
execute(person.getName.bind(tester));    // 1: QA
execute(developer.getName.bind(person)); // 1: Rajat
execute(person.getName.call(developer)); // 1: Dev
execute(person.getName.apply(tester));   // 1: QA

You're passing the function itself, not calling it from the object in 1 & 2.
Here's what happens:

const fn = person.getName;  // 👈 you're extracting the function from the object
execute(fn);                // 👈 now calling it as a plain function


console.log('1:', fn());
fn() is no longer associated with person.
  Because when you call a function without an object, JavaScript doesn't know what this should be.

So in fn():

this is not person

It's undefined in strict mode (or the global object in non-strict mode)

Unless you explicitly call it with context (person.getName()), or bind it, this will not refer to person


var obj1 = {
    address : "Mumbai,India",
    getAddress: function(){
    console.log(this.address); 
  }
}
   
var getAddress = obj1.getAddress;
var obj2 = {name:"akshay"};
obj2.getAddress();   
 // Uncaught TypeError: obj2.getAddress is not a function"




