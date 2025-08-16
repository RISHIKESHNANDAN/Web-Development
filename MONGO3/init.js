const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then(() =>{
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

}


let allchats = [
  {
  from: "neha",
  to: "priya",
  msg: "send me your exam sheet",
  created_at: new Date()
},
  {
    from:"rishi",
    to: "rhitik",
    msg:"let's meet at the cafe",
    created_at: new Date()
  },
  {
    from: "sita",
    to: "gita",
    msg: "how are you?",
    created_at: new Date()
  },
  {
    from: "ram",
    to: "laxman",
    msg: "see you tomorrow",
    created_at: new Date()
  },
  {
    from: "john",
    to: "doe",
    msg: "hello, how's it going?",
    created_at: new Date()
  },
];

Chat.insertMany(allchats);