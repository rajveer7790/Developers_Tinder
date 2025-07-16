const express = require("express");
const{ userAuth } = require("../middlewares/auth.js"); 
const User = require("../models/user.js");
const profileRouter = express.Router();
const { validateEditProfileData } = require("../utils/validation.js");


profileRouter.get("/profile", userAuth, async (req, res) => {
  //const userId = req.user._id; // Get user ID from authenticated user
  try {
    const user = req.user; // Use the user object from the request
   
    res.send(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(400).send("Error fetching user profile" + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
try{ 
  if(!validateEditProfileData(req)) {
    return res.status(400).send("Invalid profile fields");
  }
  const loggedInUser = req.user; // Get the logged-in user from the request

console.log("Logged-in user:", loggedInUser);
Object.keys(req.body).forEach((key) => { loggedInUser[key] = req.body[key]; }); // Update the user object with the new data
  await loggedInUser.save(); // Save the updated user object to the database
  res.json({
    message: `${loggedInUser.firstName},Profile updated successfully`,
    data: loggedInUser,
  });
}
catch (error) {
  console.error("Error editing profile:", error);
  res.status(400).send("Error editing profile: " + error.message);
}  
});


module.exports = profileRouter;