
(function loop(i = 0) {
  setTimeout(() => {
    Promise.resolve(i)
      .then((n) => {
        console.log("🔵 macro → micro:", n);
        return Promise.resolve(n + 1);
      })
      .then((n) =>
        setTimeout(() => { 
          Promise.resolve(n)
            .then((m) => console.log("🟢 macro → macro → micro:", m))
            .then((m) => loop(m)); // recursion here is key chaos
        }, 0)
      );
  }, 0);

  Promise.resolve().then(() => {
    console.log("🟡 micro:", i);
    setTimeout(() =>
      Promise.resolve(i + 0.5).then((v) =>
        console.log("🟠 micro → macro → micro:", v)
      ), 0);
  });
})();


//expectd output by candidate
//🟡 micro:" 0
//🔵 macro → micro: 0
//🟠 micro → macro → micro: 0.5
//🟢 macro → macro → micro: 1


//🟡 micro:" 1
//🔵 macro → micro: 1
//🟠 micro → macro → micro: 1.5
//🟢 macro → macro → micro: 2

//and so on no base condition to break recursion




