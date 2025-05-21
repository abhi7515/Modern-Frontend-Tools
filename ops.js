


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
