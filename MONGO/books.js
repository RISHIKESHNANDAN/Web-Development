// getting-started.js
const mongoose = require('mongoose');

main()
  .then(() => {
  console.log("connection successful");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/amazon');
}
const bookSchema = new mongoose.Schema({
  title:{ 
    type: String,
    required: true,
  },
  auther:{
    type: String,
  },
  price:{ 
    type: String,
  },
});
const Book = mongoose.model("Book", bookSchema);

let book1= new Book(
  {
    title: "math xii",
    auther: "rma",
    price: 234,
  });
  book1.save().then(res => {
    console.log(res);
  })
  .catch( (err)=>{
    console.log(err);
  });
