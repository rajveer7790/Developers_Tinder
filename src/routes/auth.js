const express = require("express");
const app = express();
const{ userAuth } = require("../middlewares/auth.js"); 
const bcrypt = require("bcrypt");
const{ validateSignupData } = require("../utils/validation.js");
const User = require("../models/user.js");
const authRouter = express.Router();

authRouter.post("/signup",async (req, res) => {

try {
  validateSignupData(req);
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    firstName,
    lastName,
    email,
    password:passwordHash,
  });
    // Save the user to the database
    await user.save()

    //const{password} = req.body;
    
 console.log("passwordHash:", passwordHash);
  res.send("User created successfully");
  }
 catch (error) {
   // console.error("Error creating user:", error);
    res.status(400).send("Error creating user" + error.message);
  }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email:email});
    if (!user) {
      return res.status(404).send("User not found");
    } 
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid) {
      //const token = jwt.sign({ _id: user._id},"Rajveer7790@",{ expiresIn: "1d" }); // Generate a token with user ID and secret key
      const token = await user.getJWT(); // Use the getJWT method to generate the token
      console.log("token:", token);




      res.cookie("token", token);
      res.send("Login successful");
    } else {
      res.status(401).send("Invalid password");
    } 
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(400).send("Error logging in" + error.message);
  }
});

authRouter.post("/logout",async (req, res) => {
  res.cookie("token",null, {
    expires: new Date(Date.now()), // Set the cookie to expire immediately
    //httpOnly: true, // Make it inaccessible to client-side scripts
  });
  res.send("Logout successful");
}); 



module.exports = authRouter;
