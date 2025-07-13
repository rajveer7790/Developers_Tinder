   
const express = require("express");
const ConnectDB = require("./config/database.js"); 
const app = express();
const bcrypt = require("bcrypt"); // Importing bcrypt for password hashing
const{ validateSignupData } = require("./utils/validation.js"); // Importing validation function
// Importing User model
const User = require("./models/user.js");
 // Assuming you have a validation module
app.use(express.json()); // Middleware to parse JSON bodies
app.post("/signup",async (req, res) => {

 // Validate signup data
  // const UserObj = {
  //   firstName: "Rajveer",
  //   lastName: "Choudhary" ,
  //   email: "dasad@gmail.com",
  //   password: "12345678"
  // }
    //creating a new user instance


try {
  validateSignupData(req);
  const user = new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
  });
    // Save the user to the database
    await user.save()

    const{password} = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
 console.log("passwordHash:", passwordHash);
  res.send("User created successfully");
  }
 catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send("Error creating user" + error.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email:email});
    if (!user) {
      return res.status(404).send("User not found");
    } 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid) {
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid password");
    } 
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).send("Error logging in" + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const user = await User.find({ emailId: userEmail });
    res.send(user);
  } catch (err) {
    res.status(400).send("Error fetching user");
  }
});
 
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({_id:userId});
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send("Error deleting user" + error.message);
  }
});

app.patch("/update", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  const ALLOWED_UPDATES = ["firstName", "lastName", ];
  const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));
  try {
    const user = await User.findByIdAndUpdate({_id: userId},data);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send("Error updating user" + error.message);
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


