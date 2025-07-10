   
const express = require("express");
const ConnectDB = require("./config/database.js"); 
const app = express();
const User = require("./models/user.js");
app.use(express.json()); // Middleware to parse JSON bodies
app.post("/signup",async (req, res) => {
  // const UserObj = {
  //   firstName: "Rajveer",
  //   lastName: "Choudhary" ,
  //   email: "dasad@gmail.com",
  //   password: "12345678"
  // }
    //creating a new user instance

const user = new User(req.body);
try {
    // Save the user to the database
    await user.save()
  res.send("User created successfully");
  }
 catch (error) {
    console.error("Error creating user:", error);
    res.status(400).send("Error creating user" + error.message);
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


