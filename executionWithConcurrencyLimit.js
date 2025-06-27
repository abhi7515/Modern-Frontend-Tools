function createTask(id, delay) {
  return () =>
    new Promise((resolve) => {
      console.log(`Task ${id} started`);
      setTimeout(() => {
        console.log(`Task ${id} finished`);
        resolve(`Result ${id}`);
      }, delay);
    });
}

const tasks = [
  createTask(1, 3000),
  createTask(2, 2000),
  createTask(3, 1000),
  createTask(4, 500),
  createTask(5, 1500)
];

const runWithConcurrencyLimit = async (taskFns, limit) => {
  const results = [];
  let index = 0;

  const runNext = async () => {
    if (index >= taskFns.length) return;
    const currentIndex = index++;
    const result = await taskFns[currentIndex]()
      .then((res) => ({ status: 'fulfilled', value: res }))
      .catch((err) => ({ status: 'rejected', reason: err }));
    results[currentIndex] = result;
    await runNext();
  };

  const runners = Array.from({ length: Math.min(limit, taskFns.length) }, runNext);
  await Promise.all(runners);
  return results;
};

runWithConcurrencyLimit(tasks, 2).then((results) => {
  console.log("All tasks completed:", results);
});
