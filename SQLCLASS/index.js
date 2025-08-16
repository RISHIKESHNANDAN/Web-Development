import { faker } from '@faker-js/faker';
import mysql from "mysql2/promise";
import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

app.use(methodOverride("_method")); // For method override
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'Lion!Run2Fast'
});
let  createRandomUser = () => {
  return [
     faker.string.uuid(),
     faker.internet.username(), // before version 9.1.0, use userName()
     faker.internet.email(),
     faker.internet.password(),
  ];
}

app.get('/', async (req, res) => {
  let q = "SELECT count(*) FROM user";
  try {
    const [result] = await connection.query(q);
    let count = result[0]['count(*)'];
    res.render("home.ejs",{ count});
  } catch (err) {
    console.log(err);
    res.send("some error in db");
  }
});
  
//show route
app.get('/user', async (req, res) => {
  let q = "SELECT * FROM user";
  try {
    const [users] = await connection.query(q);
    //console.log(result);
    //res.send(result); // or res.render("users.ejs", { users: result }) if you want to use a template
    res.render("showusers.ejs" , {users});
  } catch (err) {
    console.log(err);
    res.send("some error in db");
  }
});

//update route
app.patch("/user/:id", async (req, res) => {
  let id = req.params.id;
  let { password: formPass, name: newUsername } = req.body;

  let q = `SELECT * FROM user WHERE id = ?`;

  try {
    const [users] = await connection.query(q, [id]);
    if (users.length === 0) {
      res.send("User not found");
      return;
    }

    let user = users[0];
    if (formPass !== user.password) {
      res.send("WRONG password");
      return;
    }

    let q2 = `UPDATE user SET name = ? WHERE id = ?`;
    await connection.query(q2, [newUsername, id]);
    res.send("User updated successfully");
  } catch (err) {
    console.log(err);
    res.send("An error occurred");
  }
});



app.get("/user/:id/edit", async (req, res) => {
  let id = req.params.id;
  let q = "SELECT * FROM user WHERE id = ?";
  try {
    const [users] = await connection.query(q, [id]);
    //console.log(users); // This will print the user data
    res.render("edit.ejs", { user: users[0] }); // Pass the user to your template
  } catch (err) {
    console.log(err);
    res.send("some error in db");
  }
});
  


app.listen("3000",() =>{
  console.log("Server is running on port 3000");
 });
