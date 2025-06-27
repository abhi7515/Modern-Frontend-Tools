// BETTER APPROACH - using a more explicit tracking mechanism
const runWithConcurrencyLimitBetter = async (tasks, concLimit) => {
  const results = Array(tasks.length);
  const executing = new Set();
  
  for (let i = 0; i < tasks.length; i++) {
    // Create wrapper that removes itself when done
    const promise = tasks[i]()
      .then(result => {
        results[i] = { status: 'fulfilled', value: result };
      })
      .catch(error => {
        results[i] = { status: 'rejected', reason: error };
      })
      .finally(() => {
        executing.delete(promise); // Remove self when done
      });
    
    executing.add(promise);
    
    // If we've hit the limit, wait for any one to finish
    if (executing.size >= concLimit) {
      await Promise.race([...executing]);
    }
  }
  
  // Wait for all remaining tasks
  await Promise.all([...executing]);
  return results;
};

console.log("=== Testing Better Implementation ===");
runWithConcurrencyLimitBetter(tasks, 2).then((results) => {
  console.log("Results:", results);
});


------------------------------------------------------------------------------------
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



############################################################

This implementation waits for a full batch to finish before moving on.

That means even if Task 2 finishes in 2s, Task 3 won’t start until Task 1 (3s) is done.

If your goal is maximum throughput, consider the above pool-based approach , where tasks start as soon as a slot frees up.

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

const runWithConcurrencyLimit = async (tasks, concLimit) => {
  const results = [];
  
  for (let i = 0; i < tasks.length; i += concLimit) {
    // Get the current batch of tasks
    const batch = tasks.slice(i, i + concLimit);
    
    // Execute the task functions to get promises
    const promises = batch.map(taskFn => taskFn());
    
    // Wait for all tasks in this batch to complete
    const batchResults = await Promise.allSettled(promises);
    
    // Add results to the main results array
    results.push(...batchResults);
  }
  
  return results;
}

// Usage
runWithConcurrencyLimit(tasks, 2).then((results) => {
  console.log("All tasks completed:", results);
}).catch(err => {
  console.error("Error:", err);
});
