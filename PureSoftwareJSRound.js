#Explain Microfrontends and architecture of app with Product/Search/Cart app and remoteEntry.js
#Cookie vs JWT, advantages of security of cookie over jwt by makinf in non readable with emphasis on XSS attack.
#JS event loop question with res(c) taking 2000 ms, will it affect execution of SetInterwal in Web api environment: No both queues timer are independent and will take 100 ms
#CORS
#Chunk splitting using webpack in a html, css and js project, how to start optimizing with async/defer and preload, prefetch and preconnect.
#Google.com request flow with focus on browser rendering and js engine and rendering engine.
#How to secure JWT in a web application




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

// A
// F
// E
// C
// Web api env 


// D
// B
