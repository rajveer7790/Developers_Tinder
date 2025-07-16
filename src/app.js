const express = require("express");
const ConnectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("./models/user.js");
const { userAuth } = require("./middlewares/auth.js");

// Express app setup
const app = express();
app.use(express.json()); // To parse JSON
app.use(cookieParser()); // ✅ Make sure this is called as a function

// Routes
const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestsRouter = require("./routes/requests.js");


// Mount routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/requests", requestsRouter);

// 🧠 Fix: /user route has incorrect field: `emailId` should be `email`
app.get("/user", userAuth, async (req, res) => {
  const userEmail = req.body.email; // ✅ Corrected key
  try {
    const user = await User.findOne({ email: userEmail }); // ✅ findOne instead of find
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error fetching user: " + err.message);
  }
});

// Delete user by ID
app.delete("/delete", userAuth, async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId); // ✅ cleaner way
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(400).send("Error deleting user: " + error.message);
  }
});

// Update allowed fields
app.patch("/update", userAuth, async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  const ALLOWED_UPDATES = ["firstName", "lastName"];
  const isUpdateAllowed = Object.keys(data).every((key) => ALLOWED_UPDATES.includes(key));

  if (!isUpdateAllowed) {
    return res.status(400).send("Invalid updates");
  }

  try {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(400).send("Error updating user: " + error.message);
  }
});

// Connect to DB and start server
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
