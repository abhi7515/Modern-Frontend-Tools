let a = a; // ❌ ReferenceError (accessing itself in TDZ)

function foo(x = y, y = 2) {
  console.log(x, y);
}
foo(); // ❌ ReferenceError (y is in TDZ for x’s default)


---------------------------------------------------------------------

let b = 10;
{
  var b = 20; // ❌ Illegal (var leaks out)[Line 4] Uncaught SyntaxError: Identifier 'b' has already been declared"
}
console.log(b)


---------------------------------------------------------------------

var a = 10;
let a = 20; // ❌ SyntaxError (can't redeclare in same scope)

---------------------------------------------------------------------

let x = 1;
{
  let x = 2; // shadows outer x
  console.log(x); // 2
}
console.log(x); // 1

----------------------------------------------------------------------

foo(); // "hello"
function foo() { console.log("hello"); }

bar(); // ❌ TypeError: bar is not a function
var bar = function() { console.log("hi"); };

-----------------------------------------------------------------------

  

