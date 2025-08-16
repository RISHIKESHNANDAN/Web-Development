const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

const checkToken = (req,res,next) => {
  let {token} = req.query;
  if (token === "giveaccess") {
    next();
  }
  throw new ExpressError(404,"ACCESS DENIED!");
};

// app.use((req,res,next) => {
//   console.log("hi , I am using a 1st middlware");
//   // res.send("Hello, I am a 1st middleware response");
//   next();
// });
// app.use((req,res,next) => {
//   req.responseTime =new Date(Date.now()).toString();
//   console.log(req.method, req.path, req.responseTime);
//   next();
// });
// app.use("/api",(req,res,next) => {
//   let {token} = req.query;
//   if (token === "giveaccess") {
//     next();
//  }
//   throw new ExpressError(401,"Access Denied!");
// });

app.get("/api", checkToken, (req,res) => {
  res.send("data");
});

app.get('/',(req,res) => {
  res.send("Hi,i am root");
});

// app.get("/api",(req,res) => {
//   res.send("Data");
// });

app.get("/random",(req,res) => {
  res.send("This is a random page");
});
// app.get("/just",(req,res) => {
//   res.send("Just checking");
// });

app.get("/err",(req,res) => {
  abcd=abcd;
});
app.get("/admin",(req,res) => {
  throw new ExpressError(403,"Access is Denied");
})

app.use((err,req,res,next) =>{
  let {status =500,message ="Some error occured" } = err;
  res.status(status).send(message);
});

// app.use((req,res) =>{
//   res.status(404).send("Page not found!");
// });

app.listen(3000,() => {
  console.log("server is listtinig on 3000");
});