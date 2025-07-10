   
const express = require("express");
const ConnectDB = require("./config/database.js"); 
const app = express();
const User = require("./models/user.js");
app.post("/signup",async (req, res) => {
  const UserObj = {
    firstName: "Rajveer",
    lastName: "Choudhary" ,
    email: "dasad@gmail.com",
    password: "12345678"
  }
    //creating a new user instance

const user = new User(UserObj);
try {
    // Save the user to the database
    await user.save()
  res.send("User created successfully");
  }
 catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send("Error creating user");
  }
});






ConnectDB()
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
