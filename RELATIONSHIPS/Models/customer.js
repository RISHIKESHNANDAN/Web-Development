const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(() => console.log('Connected to DB'))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}


const orderSchema = new Schema({
  item: String,
  price: Number,
});


const customerSchema = new Schema({
  name: String,
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
],
});

const Order = mongoose.model('Order', orderSchema);
const Customer = mongoose.model("Customer", customerSchema);



const findCustomer = async () => {
let result = await Customer.find({}).populate('orders');
console.log(result[0]);
 };

const addCust = async () => {
  let newCust = new Customer({
    name:"Karan Arjun"
  });

  let newOrder = new Order({
    item:"Pizza",
    price:258,
  });
  
  newCust.orders.push(newOrder);
  
  await newOrder.save();
  await newCust.save();

  console.log("added new customer");
};

const delCust =async() =>{
  let data = await Customer.findByIdAndDelete("689f6f87df30dcdbcc92f52c");
  console.log(data);
}

delCust();