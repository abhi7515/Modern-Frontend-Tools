Build a UI for the Chat page similar to the mock - Chat Mocks
The data for the page can be fetched from - 
https://my-json-server.typicode.com/codebuds-fk/chat/chats
Product Features
Chat List
The chat list loads with a list of chats as fetched from the api source.
Clicking on a chat list opens the respective chat with the messages for that particular chat.
Each chat list item shows basic chat information about that chat like Product Image, Chat Title, Order ID, Date in DD/MM/YYYY format of the last message.
You can filter the Chat List via Chat Title / Order ID.
The current selected chat is highlighted.
Single Chat View
Shows the messages for a particular chat in bottom to top order, i.e., The latest message is at the bottom of the chat.
There are two message types - ‘text’ and ‘optionedMessage’. Both are displayed differently. Please refer to the mocks for the same.
The messages are either left aligned or right aligned depending on the ‘sender’. If the ‘sender’ is ‘BOT’ the message is left aligned, else if the ‘sender’ is ‘USER’, it is right aligned.
Show an input box similar to the mock. The message sent from here should get added to that particular chat as a ‘USER’ side message of type ‘text’.
If there are no messages for a chat, a message is displayed - “Send a message to start chatting”.
Show an inline Date label as a separation between messages on different dates in DD/MM/YYYY format. You can show labels like ‘Today’, ‘Yesterday’, etc. for dates upto a week before the current date.
The message options for an ‘optionedMessage’ are disabled if it’s not the latest message (it’s not the message at the bottom end of the chat).
On clicking “Request a Call” a message is added from the USER side (right side) saying “I want a callback”.





Color Code Legend: 

Headings (Filter by Title/Order ID)- #212121
Primary Text Color (Flipkart Support , Order OD121898535971680000) - #000000
Secondary Text Color (Start typing to search ) - #878787
ChatList Highlighted background and Single Chat View Background - #f1f3f6
ChatList  Divider Color- #f0f0f0
Flipkart Blue - #027CD5
OptionedMessage Background - #f5f5f5


Must Haves:
Show the list of chat after fetching response from API
The UI should be as close as possible to the mocks
Clicking on a chat should open the chat with the list of messages for that chat with proper styling and alignment.
Filter chats list via Chat Title / Order ID
Show an input box similar to the mock. The message sent from here should get added to that particular chat as a ‘USER’ side message of type ‘text’.


Good to Haves:

Show an inline Date label as a separation between messages on different dates in DD/MM/YYYY format. You can show labels like ‘Today’, ‘Yesterday’, etc. for dates upto a week before the current date. 
Disabling ‘optionedMessage’ if it’s not the latest message in a chat.
On clicking “Request a Call” a message is added from the USER side (right side) saying “I want a callback”.
Implement sort based on timestamp on messages for a given chat. The API response is sorted based on the timestamp, but assume that it won’t be sorted in the real world.




Points to consider:
You may use any framework of your choice—such as React, Angular, etc—or opt for Vanilla JavaScript to best showcase your core skills. Use of build tools like webpack, rollup, is encouraged. However, please refrain from using tools/libraries like bootstrap.
Focus on the modularity of code and design of the solution. Keep the performance of the application in mind.
The final solution should work without errors.
Ensure the solution’s look and feel matches the mocks as much as possible.
Focus on using the right semantic html tags. Using the right HTML tag may be faster than building your own implementation!
You will be evaluated based on: 
Correctness and completeness of the solution, and understanding of the problem statement.
Code design and quality.
Visual aesthetics and your ability to extract styling and UX information from a mock. (the UI should be as close as possible to the given design)






JSON response for https://my-json-server.typicode.com/codebuds-fk/chat/chats



[
  {
    "id": 1,
    "title": "Flipkart Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/k0vbgy80pkrrdj/speaker/mobile-tablet-speaker/4/n/n/boat-stone-grenade-original-imafg96ffpnpgdv4.jpeg?q=90",
    "orderId": "OD1234567890",
    "latestMessageTimestamp": 1632205237669,
    "messageList": [
      {
        "messageId": "msg1",
        "message": "Hi, what can I help you with?",
        "timestamp": 1632205137669,
        "sender": "BOT",
        "messageType": "text"
      },
      {
        "messageId": "msg2",
        "message": "Need help with this order",
        "timestamp": 1632205237669,
        "sender": "USER",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 2,
    "title": "Flipkart Experts",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/k547l3k0/watch/x/h/t/ft7001-fastag-original-imafnvj82funvjyp.jpeg?q=90",
    "orderId": "OD1234567891",
    "latestMessageTimestamp": 1632105237669,
    "messageList": []
  },
  {
    "id": 3,
    "title": "Flipkart Furniture Experts",
    "imageURL": "https://rukminim1.flixcart.com/www/300/300/promos/29/01/2019/84186c71-a505-46fa-a9cb-93e6e9382c47.png?q=90",
    "orderId": "OD1234567892",
    "latestMessageTimestamp": 1631105237669,
    "messageList": [
      {
        "messageId": "msg3",
        "message": "Hi, what can I help you with?",
        "timestamp": 1631105137669,
        "sender": "BOT",
        "messageType": "optionedMessage",
        "options": [
          {
            "optionText": "Request a call",
            "optionSubText": "Response time: Within 5 minutes"
          },
          {
            "optionText": "Go to My Orders"
          }
        ]
      },
      {
        "messageId": "msg4",
        "message": "I want a callback",
        "timestamp": 1631105237669,
        "sender": "USER",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 4,
    "title": "Flipkart Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/kmax8y80/mobile/o/4/z/note-10-mobhwasd2-redmi-original-imagf8hpzgar5mgs.jpeg?q=90",
    "orderId": "OD1234567893",
    "latestMessageTimestamp": 1630005237669,
    "messageList": [
      {
        "messageId": "msg5",
        "message": "Hi, what can I help you with?",
        "timestamp": 1629799837669,
        "sender": "BOT",
        "messageType": "optionedMessage",
        "options": [
          {
            "optionText": "Request a call",
            "optionSubText": "Response time: Within 5 minutes"
          },
          {
            "optionText": "Go to My Orders"
          }
        ]
      },
      {
        "messageId": "msg6",
        "message": "I want a callback",
        "timestamp": 1629799937669,
        "sender": "USER",
        "messageType": "text"
      },
      {
        "messageId": "msg7",
        "message": "Hi, what can I help you with?",
        "timestamp": 1629899937669,
        "sender": "BOT",
        "messageType": "text"
      },
      {
        "messageId": "msg8",
        "message": "Need help with this order",
        "timestamp": 1629999937669,
        "sender": "USER",
        "messageType": "text"
      },
      {
        "messageId": "msg9",
        "message": "Hi, what can I help you with?",
        "timestamp": 1630000037669,
        "sender": "BOT",
        "messageType": "text"
      },
      {
        "messageId": "msg10",
        "message": "Need help with this order",
        "timestamp": 1630001037669,
        "sender": "USER",
        "messageType": "text"
      },
      {
        "messageId": "msg5",
        "message": "Hi, what can I help you with?",
        "timestamp": 1630002037669,
        "sender": "BOT",
        "messageType": "optionedMessage",
        "options": [
          {
            "optionText": "Request a call",
            "optionSubText": "Response time: Within 5 minutes"
          },
          {
            "optionText": "Go to My Orders"
          }
        ]
      },
      {
        "messageId": "msg6",
        "message": "I want a callback",
        "timestamp": 1630003037669,
        "sender": "USER",
        "messageType": "text"
      },
      {
        "messageId": "msg11",
        "message": "Hi, what can I help you with?",
        "timestamp": 1630004037669,
        "sender": "BOT",
        "messageType": "text"
      },
      {
        "messageId": "msg12",
        "message": "Need help with this order",
        "timestamp": 1630004137669,
        "sender": "USER",
        "messageType": "text"
      },
      {
        "messageId": "msg13",
        "message": "Hi, what can I help you with?",
        "timestamp": 1630005137669,
        "sender": "BOT",
        "messageType": "text"
      },
      {
        "messageId": "msg14",
        "message": "Need help with this order",
        "timestamp": 1630005237669,
        "sender": "USER",
        "messageType": "text"
      }
    ]
  },
  {
    "id": 5,
    "title": "Samsung Experts",
    "imageURL": "https://rukminim1.flixcart.com/www/300/300/promos/21/08/2019/aac6c36a-fde8-4730-bfaa-52a0c87b6cff.jpg?q=90",
    "orderId": "OD1234567894",
    "latestMessageTimestamp": 1620005237669,
    "messageList": [
      {
        "messageId": "msg1",
        "message": "Hi, what can I help you with?",
        "timestamp": 1620001237669,
        "sender": "BOT"
      },
      {
        "messageId": "msg2",
        "message": "Need help with this order",
        "timestamp": 1620005237669,
        "sender": "USER"
      }
    ]
  },
  {
    "id": 6,
    "title": "Flipkart Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/k65d18w0/shoe/v/f/h/6hgf-6-saczer-black-original-imafgf5tzfy7hhcd.jpeg?q=90",
    "orderId": "OD1234567895",
    "latestMessageTimestamp": 1598523369945,
    "messageList": []
  },
  {
    "id": 7,
    "title": "Customer Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/k9yjb0w0/mask-respirator/q/m/b/12540-black-l-wildcraft-original-imafrmy4xuzgm8sa.jpeg?q=90",
    "orderId": "OD1234567896",
    "latestMessageTimestamp": 1598517840547,
    "messageList": []
  },
  {
    "id": 8,
    "title": "Flipkart Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/helmet/d/h/u/1067-1-vega-58-open-face-crux-original-imae2yyxghjgkfmw.jpeg?q=90",
    "orderId": "OD1234567897",
    "latestMessageTimestamp": 1590576854189,
    "messageList": []
  },
  {
    "id": 9,
    "title": "Flipkart Order Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/k8ro3gw0/hand-wash-sanitizer/f/g/2/500-total-hand-sanitizer-bottle-lifebuoy-original-imafqpcsnxfb7qxr.jpeg?q=90",
    "orderId": "OD1234567898",
    "latestMessageTimestamp": 1589519579618,
    "messageList": []
  },
  {
    "id": 10,
    "title": "Flipkart Support",
    "imageURL": "https://rukminim1.flixcart.com/image/300/300/kalecnk0/hand-wash-sanitizer/f/g/2/500-total-hand-sanitizer-bottle-lifebuoy-original-imafs4yfahvcag5v.jpeg?q=90",
    "orderId": "OD1234567899",
    "latestMessageTimestamp": 1589468548314,
    "messageList": []
  }
]


