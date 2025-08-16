// getting-started.js
const mongoose = require('mongoose');

main()
  .then(() => {
  console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String
});
const User = mongoose.model("User", userSchema);

const user2 = new User({
  name: "rammji", 
  age: 25,
  email: "ramji@example.com"
});
//user2.save();

