 var playerQueue = [];
 const delay = 2000;

const startGame = (sessionId) => {  //handler behind rate limiting
	console.log("Starting Game.....")
}

const streamSession = (sessionId, delay=2000) => {
  let lastCallTime = 0;
  
  	if(Date.now() - lastCallTime  > delay){
    		startGame(sessionId);
        lastCallTime = Date.now();  //letting go of requests in between delays
    }
    else {
    	 playerQueue.push(sessionId); //capturing intercepted requests
    }
}

while(!playerQueue.length){   //process queue
  setTimeout(() => startGame(playerQueue[0], delay))
	playerQueue.shift();
}


setInterval(() => streamSession(50), 100) //simulate requests
