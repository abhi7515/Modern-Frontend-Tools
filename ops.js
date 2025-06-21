


for (var i = 0; i < 5; i++) {
  setTimeout(console.log.bind(null, i), 1000);
}


----------------------------------------

for (let i = 0; i < 5; i++) {
  setTimeout(() => console.log(i), 1000);
}


--------------using iife--------------
for (var i = 0; i < 5; i++) {
  (function(x) {
    setTimeout(() => console.log(x), 1000);
  })(i);
}


-----------using promises-------------
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(function() {
  for (let i = 0; i < 5; i++) {
  sleep(1000).then(() => console.log(i));
  }
})();

----------using map-------------------

arr.forEach((item, index) => {
  setTimeout(() => {
    console.log(item});
  }, index * 1000);
});

------------using bind method------------

// .bind(null, i) returns a new function where index is set to the current value of i
// So in each iteration, the timer gets a different copy of the function with its own fixed index

for (var i = 0; i < arr.length; i++) {
  setTimeout(
    function(index) {
      console.log(`bind direct: ${arr[index]}`);
    }.bind(null, i),
    i * 1000
  );
}

for (var i = 0; i < arr.length; i++) {
  setTimeout(
    (function(index) {
      return function () {
        console.log(index);
      };
    })(i),
    i * 1000
  );
}




