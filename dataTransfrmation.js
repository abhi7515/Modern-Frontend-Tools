const obj = [{
	key: 'Sample 1',
  data: 'Data 1'
},{
	key: 'Sample 1',
  data: 'Data 1'
},{
	key: 'Sample 2',
  data: 'Data 2'
},{
	key: 'Sample 1',
  data: 'Data 1'
},{
	key: 'Sample 3',
  data: 'Data 1'
},{
	key: 'Sample 3',
  data: 'Data 1'
}]

/* const result = {
    "Sample 1": [{
      key: 'Sample 1',
      data: 'Data 1'
    },{
      key: 'Sample 1',
      data: 'Data 1'
    },{
      key: 'Sample 1',
      data: 'Data 1'
    }],
    "Sample 2": []
} */

const result = {}

obj.reduce((accumulator,item) => {
    		if(result.hasOwnProperty(item.key)){
        		accumulator[item.key].push(item);
        }else{
        		accumulator[item.key] = [item];
        }
     return accumulator;
}, result)

console.log(result)





