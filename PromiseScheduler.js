class PromiseScheduler{
  constructor(functionsArray, options = {}){
    this.functionsArray = functionsArray;
    this.startIndex = options.startIndex;
    this.callbacks = options.callbacks || {};
    this.results = [];
    this.currentIndex = this.startIndex;
    this.status = 'default';
    this.paused = false;
    this.isRunning = false;
  }

  async run (){
    if(this.status === 'completed' || this.isRunning) return;

    this.status = 'in-progress' 
    this.paused = false;
    this.isRunning = true;

    for(; this.currentIndex < this.functionsArray.length; this.currentIndex++){
      const func = this.functionsArray[this.currentIndex];
      try{
        const result = await Promise.resolve(func())
        this.results[this.currentIndex] = result;
      }
      catch(err){
        this.results[this.currentIndex] = err;
      }
      if(this.paused){
        this.status = 'paused'
        this.isRunning = false;
        return;
      }
    }
    this.status = 'completed';
    this.isRunning = false;
    if(this.callbacks.onCompleted){
      this.callbacks.onCompleted(this.results);
    }
  }

  async pause(){
    this.paused = true;
  }

  getState(){
    let unexecutedFunctionsIndices = []
    for(let i = this.currentIndex; i < this.functionsArray.length; i++){
      unexecutedFunctionsIndices.push(i);
    }

    return {
      status: this.status,
      unexecutedFunctionsIndices,
    };
  }

  async runAllUnexecutedFunctions(){
    if(this.status === 'completed'){
      return;
    }
    this.paused = false;
    this.isRunning = false;
    await this.run();
  
  }
}

//usage

options = {
  startIndex: 0,
  callbacks: {
    onCompleted: (results) => {console.log(results)}
  }
}

const schedulerInstance = new PromiseScheduler(asyncfunctions, options);

// const wait = (ms) => new Promise(res => setTimeout(res,ms));

// const tasks = [() => wait(1000)]

//exposed 4 methods in the class as described in problem statement



















