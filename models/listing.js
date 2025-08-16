const mongoose = require("mongoose");
const Schema = mongoose.Schema;  //schema define the structure of the document within collection.

const listingSchema = new Schema({
  title: {
    type : String,
    require:true,
  },
  description:String,
image: {
  filename: String,
  url: {
    type: String,
    default: "https://allfreshwallpaper.blogspot.com/2013/09/new-hd-images-of-hanumanji-free-download.html",
    set: (v) => v === "" ? "https://allfreshwallpaper.blogspot.com/2013/09/new-hd-images-of-hanumanji-free-download.html" : v,
  }
},
  price:Number,
  location:String,
  country:String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports =Listing;