JS Problem
//Web api environment

console.log('A');
setTimeout(() => {
  console.log('B');
}, 100);
 
const prom1 = new Promise((res, rej)=>{
console.log('F')
res('C') 
})
prom1.then((val)=>{console.log(val)})

setTimeout(() => {
  console.log('D');
}, 0);
console.log('E');

#Security considerations JWT vs Cookie, making cookie read only to make it more secure and ways to sanitize inputs in context of XSS


