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

runWithConcurrencyLimit(tasks, 2).then((results) => {
  console.log("All tasks completed:", results);
});

#########################################################

async function runWithConcurrencyLimit(tasks, limit) {
  const results = [];
  let running = 0;
  let currentIndex = 0;

  return new Promise((resolve, reject) => {
    const queue = [];

    const runNext = () => {
      // If all tasks have been started and completed, resolve the results
      if (results.length === tasks.length) {
        resolve(results);
        return;
      }

      // Start tasks as long as the concurrency limit isn't reached
      while (running < limit && currentIndex < tasks.length) {
        const i = currentIndex++;
        const task = tasks[i];
        running++;

        // Wrap in Promise.resolve in case it's a sync function
        Promise.resolve()
          .then(() => task())
          .then((result) => {
            results[i] = result;
          })
          .catch(reject) // fail fast
          .finally(() => {
            running--;
            runNext(); // Start the next task after one finishes
          });
      }
    };

    runNext(); // Initial kick-off
  });
}



