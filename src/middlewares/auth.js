const jwt = require("jsonwebtoken");
const User = require("../models/user.js");  
const userAuth = async (req, res, next) => {
  const cookies = req.cookies;
  const { token } = cookies;

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    const isValidToken = jwt.verify(token, "Rajveer7790@");
    console.log("isValidToken:", isValidToken);

    if (!isValidToken) {
      return res.status(401).send("Unauthorized: Invalid token");
    }
    const{ _id } = isValidToken;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send("User not found");
    }
    req.user = user; // Attach user object to request
    //req.userId = isValidToken._id; // Attach user ID to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(400).send("Error verifying token: " + error.message);
  }
}

module.exports = {
    userAuth,
};