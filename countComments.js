const comments = {
  text: "some comment",
  replies: [
    { text: "some comment 1", replies: [] },
    { text: "some comment 2", replies: [] },
    { text: "some comment 3", replies: [
      { text: "some comment 5", replies: [] }
    ]}
  ]
};


const countComments = (commentThread) => {
  if(!commentThread.replies.length) return 1;
  
  let count = 1;

  commentThread.replies.forEach((reply => {
    count+=countComments(reply)
    }))
  
  return count;
}

const countComments = (commentThread) => {
   return 1 + commentThread.replies.reduce((total, reply) => {
    total = total + countComments(reply);
   },0)
}




console.log(countComments(comments))
