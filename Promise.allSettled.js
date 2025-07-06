const funcs = [
  () => Promise.resolve(1),
  () => Promise.reject('err'),
  () => new Promise(resolve => setTimeout(() => resolve(3), 100))
];

promiseAllSettled(funcs).then(console.log);

Output:
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: 'err' },
//   { status: 'fulfilled', value: 3 }
// ]


var promiseAllSettled = function (functions) {
  return new Promise(resolve => {
    const res = [];
    let count = 0;

    for (let i in functions) {
      const idx = i; // Important: capture index in closure
      functions[idx]()
        .then(value => ({ status: 'fulfilled', value }))
        .catch(reason => ({ status: 'rejected', reason }))
        .then(obj => {
          res[idx] = obj;
        })
        .finally(() => {
          count++;
          if (count === functions.length) {
            resolve(res);
          }
        });
    }
  });
};
