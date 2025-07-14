// CALM DOWN AND READ DATA STRUCTURES THEN START WITH CREATION AND UPDATION OF NEW DATA STRUCTURE

const objArray = [
  { key: 'Sample 1', data: 'Data1' },
  { key: 'Sample 1', data: 'Data1' },
  { key: 'Sample 2', data: 'Data2' },
  { key: 'Sample 1', data: 'Data1' },
  { key: 'Sample 3', data: 'Data1' },
  { key: 'Sample 4', data: 'Data1' }
];
const obj = {
  "Sample 1": [
    { key: 'Sample 1', data: 'Data1' },
    { key: 'Sample 1', data: 'Data1' },
    { key: 'Sample 1', data: 'Data1' }
  ],
  "Sample 2": [
    { key: 'Sample 2', data: 'Data2' }
  ],
  "Sample 3": [
    { key: 'Sample 3', data: 'Data1' }
  ],
  "Sample 4": [
    { key: 'Sample 4', data: 'Data1' }
  ]
}


const transform = (arr) => {
  const o = {}
  for(let i in arr){
    if(o.hasOwnProperty(arr[i].key)){
      o[arr[i].key].push(arr[i]);
    }
    else{
      o[arr[i].key] = [arr[i]];
    }
  }
  return o;
}

console.log(transform(objArray),obj, "hi")
