const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}


const userSchema = new Schema({
  username: String,
  addresses: [{
    location: String,
    city: String,
  },
],
});

const User = mongoose.model('User', userSchema);

const addUsers = async() => {
  let user1 = new User({
    username: "sherlockholnes",
    address: [{
      location: "2218 Baker Street",
      city: "London"
    }]
  });

  user1.addresses.push({location: "P32 WallStreet", city: "London"});
  let result =await user1.save();
  console.log(result); 
};

addUsers();