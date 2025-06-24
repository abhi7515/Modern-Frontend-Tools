function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Existing promise
const existingPromise = fetch('https://jsonplaceholder.typicode.com/posts/1');

console.log(existingPromise)

//delay before execution of promise
// delay(3000)
//   .then(() => existingPromise)
//   .then(res => res.json())
//   .then(data => console.log('Fetched after 3s delay:', data));

//delay after execution of promise
existingPromise
  .then(response => response.json())
  .then(data => {
    console.log('Data received:', data);
     // Delay 3 seconds before next then
  })
  .then(() => delay(3000))
  .then(() => {
    console.log('3 seconds passed after receiving data');
    // Continue your logic here
  });


// existingPromise
//   .then(response => response.json())
//   .then(data => {
//     console.log('Data received:', data);
//     return delay(3000); // Delay 3 seconds before next then
//   })
//   .then(() => {
//     console.log('3 seconds passed after receiving data');
//     // Continue your logic here
//   });
