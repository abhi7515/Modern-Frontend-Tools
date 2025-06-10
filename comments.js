 -offline support -suppoort multiple devices -performance optimizations -security and accessibility sanitazation
-caching  Post Data Flow Model  Post-  -title -string -content -user_id
-thread_id  comment  - upvotes  - downvotes  - timestamp  - comment_id 

Design the nested comments structure  User -write a comment/
-edit a comment 
- delete a comment
-reply to a comment
-threaded view with view more
-infinite scrolling for comments
-map a meta data to aq particular comment
-filter  sort / by upvotes and downvotes






{
  "thread": {
    "thread_id": 123,
    "title": "post 1",
    "content": "cdn link",
    "comments": [
      {
        "id": 56,
        "parent_id": null,
        "thread_id": 123,
        "content": "cdn linkw-",
        "replies": [
          {
            "id": 75,
            "parent_id": 56,
            "thread_id": 123,
            "replies": [
              {
                "id": 190,
                "parent_id": 75,
                "thread_id": 123,
                "replies": []
              },
              {
                "id": 128,
                "parent_id": null,
                "thread_id": 75,
                "replies": []
              }
            ]
          },
          {
            "id": "comment3",
            "parent_id": null,
            "thread_id": 56,
            "replies": []
          }
        ]
      }
    ]
  }
}




