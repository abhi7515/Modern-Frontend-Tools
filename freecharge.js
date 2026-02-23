//Draw concentric circles

.outer {
  display: grid;
  place-items: center;
  width: 200px;
  height: 200px;
  background: red;
  border-radius: 50%;
}
.inner {
  width: 100px;
  height: 100px;
  background: blue;
  border-radius: 50%;
}



const a = {
  x: 10,
  y: { z: 20 }
};

const b = Object.assign({}, a);

b.y.z = 50;

console.log(a.y.z);



--------------------------
const obj1 = {
  name: "Alice",
  details: {
    age: 25
  }
};

const obj2 = JSON.parse(JSON.stringify(obj1));

obj2.details.age = 30;

console.log(obj1.details.age);
console.log(obj2.details.age);

-----------------------





const arr = [1, 0, -2, 5, 2]; 
            [2, 3, 5, -2, 1]

const calc = (arr, sum) => {
    
    let comp = arr.map((item, idx) => {
      return sum - item;
    })

    console.log(comp);
    
  
    
    
    
}


console.log(calc(arr, 3))






------------------------------


console.log("A");

setTimeout(() => {
  console.log("B");

  Promise.resolve().then(() => {
    console.log("C");
  });

}, 0);

Promise.resolve().then(() => {
  console.log("D");
});

console.log("E");

A
E
D
B
C

------------------------------------------

console.log("1");

async function test() {
  console.log("2");
  await Promise.resolve();
  console.log("3");
}

test();

console.log("4");

1
2
4
3


------------------------------------------

const obj = {
  name: "Tom"
};

const greet = () => {
  console.log(this.name);
};

greet.call(obj);


---------------------

  //implement a custom hook to throttle a response







